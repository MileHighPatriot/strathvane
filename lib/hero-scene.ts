/**
 * Hero WebGL layer: the roof planes traced over the photo assemble in depth, a drone flies its path, a scan
 * band lights each plane as it passes, and measurement ticks appear behind it. The camera drifts slowly,
 * leans toward the pointer on desktop, and tilts as the page scrolls through the first viewport.
 * Plain WebGL 1, no library. Loaded only by components/HeroScene.tsx after load + idle.
 */
import { brand, rgb } from "@/lib/brand";
import { bezier, edges, IMG_H, IMG_W, type P3, planes, ticks } from "@/lib/roof";

type RGBA = [number, number, number, number];

const IRIS = rgb(brand.colors.iris);
const LILAC = rgb(brand.colors.lilac);
const VAPOR = rgb(brand.colors.vapor);

const VS = `attribute vec2 p;attribute vec4 c;uniform vec2 r;varying vec4 v;
void main(){v=c;gl_Position=vec4(p.x/r.x*2.-1.,1.-p.y/r.y*2.,0.,1.);}`;
const FS = `precision mediump float;varying vec4 v;void main(){gl_FragColor=vec4(v.rgb*v.a,v.a);}`;

const CENTER: [number, number] = [830, 395];
const DEPTH = 150; // image px of depth for z = 1
const FOCAL = 1500;
const SCAN_FROM = 470;
const SCAN_TO = 1170;
const CYCLE = 7.5; // seconds per drone pass

export function startHeroScene(canvas: HTMLCanvasElement): () => void {
  const gl = canvas.getContext("webgl", { alpha: true, premultipliedAlpha: true, antialias: true });
  if (!gl) return () => {};

  const compile = (type: number, src: string) => {
    const s = gl.createShader(type)!;
    gl.shaderSource(s, src);
    gl.compileShader(s);
    return s;
  };
  const prog = gl.createProgram()!;
  gl.attachShader(prog, compile(gl.VERTEX_SHADER, VS));
  gl.attachShader(prog, compile(gl.FRAGMENT_SHADER, FS));
  gl.linkProgram(prog);
  gl.useProgram(prog);
  const locP = gl.getAttribLocation(prog, "p");
  const locC = gl.getAttribLocation(prog, "c");
  const locR = gl.getUniformLocation(prog, "r");
  const buf = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buf);
  gl.enableVertexAttribArray(locP);
  gl.enableVertexAttribArray(locC);
  gl.vertexAttribPointer(locP, 2, gl.FLOAT, false, 24, 0);
  gl.vertexAttribPointer(locC, 4, gl.FLOAT, false, 24, 8);
  gl.enable(gl.BLEND);
  gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);

  const data = new Float32Array(6 * 6000);
  let n = 0;
  const vert = (x: number, y: number, c: RGBA) => {
    const i = n * 6;
    data[i] = x;
    data[i + 1] = y;
    data[i + 2] = c[0];
    data[i + 3] = c[1];
    data[i + 4] = c[2];
    data[i + 5] = c[3];
    n++;
  };
  const tri = (a: number[], b: number[], c: number[], col: RGBA) => {
    vert(a[0], a[1], col);
    vert(b[0], b[1], col);
    vert(c[0], c[1], col);
  };
  // A segment drawn as a quad, with a soft wide glow underneath.
  const seg = (a: number[], b: number[], w: number, col: RGBA, glow = 0) => {
    const dx = b[0] - a[0];
    const dy = b[1] - a[1];
    const d = Math.hypot(dx, dy) || 1;
    const draw = (width: number, c: RGBA) => {
      const nx = (-dy / d) * width * 0.5;
      const ny = (dx / d) * width * 0.5;
      const p1 = [a[0] + nx, a[1] + ny];
      const p2 = [a[0] - nx, a[1] - ny];
      const p3 = [b[0] + nx, b[1] + ny];
      const p4 = [b[0] - nx, b[1] - ny];
      tri(p1, p2, p3, c);
      tri(p2, p4, p3, c);
    };
    if (glow > 0) draw(w * 6, [col[0], col[1], col[2], col[3] * glow]);
    draw(w, col);
  };

  // Layout: cover-fit the 1200x675 image space, anchored right (matches object-position and the SVG poster).
  let W = 0;
  let H = 0;
  let scale = 1;
  let offX = 0;
  let offY = 0;
  let dpr = 1;
  const resize = () => {
    const rect = canvas.getBoundingClientRect();
    dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    W = Math.max(1, Math.round(rect.width * dpr));
    H = Math.max(1, Math.round(rect.height * dpr));
    canvas.width = W;
    canvas.height = H;
    scale = Math.max(W / IMG_W, H / IMG_H);
    offX = W - IMG_W * scale;
    offY = (H - IMG_H * scale) / 2;
    gl.viewport(0, 0, W, H);
  };
  resize();
  const ro = new ResizeObserver(resize);
  ro.observe(canvas);

  // Camera: slow drift, pointer lean (desktop), and scroll tilt over the first viewport.
  let yaw = 0;
  let pitch = 0;
  let pointerX = 0;
  let pointerY = 0;
  const fine = window.matchMedia("(pointer: fine)").matches;
  const onPointer = (e: PointerEvent) => {
    pointerX = e.clientX / window.innerWidth - 0.5;
    pointerY = e.clientY / window.innerHeight - 0.5;
  };
  if (fine) window.addEventListener("pointermove", onPointer, { passive: true });

  // Rest position is the exact trace; the camera only adds the difference it makes.
  const project = (p: P3, lift: number): number[] => {
    const X = p[0] - CENTER[0];
    const Y = p[1] - CENTER[1];
    const Z = (p[2] + lift) * DEPTH;
    const cy = Math.cos(yaw);
    const sy = Math.sin(yaw);
    const X1 = X * cy + Z * sy;
    const Z1 = -X * sy + Z * cy;
    const cp = Math.cos(pitch);
    const sp = Math.sin(pitch);
    const Y1 = Y * cp - Z1 * sp;
    const Z2 = Y * sp + Z1 * cp;
    const k = FOCAL / (FOCAL - (Z2 - p[2] * DEPTH));
    const ix = CENTER[0] + X1 * k;
    const iy = CENTER[1] + Y1 * k;
    return [offX + ix * scale, offY + iy * scale];
  };

  const tickList = ticks();
  const start = performance.now();
  let raf = 0;
  let running = false;
  let shown = false;

  const frame = (now: number) => {
    raf = 0;
    const t = (now - start) / 1000;
    const scroll = Math.min(1, Math.max(0, window.scrollY / window.innerHeight));
    const targetYaw = 0.05 * Math.sin(t * 0.17) + pointerX * 0.1;
    const targetPitch = 0.035 * Math.sin(t * 0.13) + pointerY * 0.06 + scroll * 0.32;
    yaw += (targetYaw - yaw) * 0.06;
    pitch += (targetPitch - pitch) * 0.06;

    const phase = (t % CYCLE) / CYCLE;
    const scanX = SCAN_FROM + (SCAN_TO - SCAN_FROM) * Math.min(1, phase * 1.15);
    const lw = 1.6 * dpr * Math.max(0.75, scale / dpr);
    n = 0;

    // Planes: faint fill that brightens while the scan band crosses them.
    planes.forEach((pts, i) => {
      const asm = assembly(t, i * 0.25);
      const xs = pts.map((p) => p[0]);
      const mid = (Math.min(...xs) + Math.max(...xs)) / 2;
      const lit = Math.max(0, 1 - Math.abs(scanX - mid) / 260);
      const col: RGBA = [LILAC[0], LILAC[1], LILAC[2], (0.05 + 0.16 * lit) * asm];
      const lift = (1 - asm) * 2.2;
      const q = pts.map((p) => project(p, lift));
      for (let k = 1; k < q.length - 1; k++) tri(q[0], q[k], q[k + 1], col);
    });

    // Edges: Vane Iris, the ridge in Frost Lilac; each glows as the band passes.
    edges.forEach((e, i) => {
      const asm = assembly(t, 0.15 + i * 0.09);
      const lift = (1 - asm) * 2.2;
      const mx = (e.a[0] + e.b[0]) / 2;
      const lit = Math.max(0, 1 - Math.abs(scanX - mx) / 120);
      const base = e.kind === "ridge" ? LILAC : IRIS;
      seg(project(e.a, lift), project(e.b, lift), lw * (e.kind === "ridge" ? 1.3 : 1), [base[0], base[1], base[2], (0.75 + 0.25 * lit) * asm], 0.1 + 0.25 * lit);
    });

    // Measurement ticks appear once the scan has passed them.
    tickList.forEach((tk) => {
      const seen = Math.min(1, Math.max(0, (scanX - tk.a[0]) / 60)) * assembly(t, 1.4);
      if (seen <= 0) return;
      seg(project(tk.a, 0), project(tk.b, 0), lw * 0.8, [LILAC[0], LILAC[1], LILAC[2], 0.9 * seen]);
    });

    // Scan band: a soft vertical sheet with a bright core line, across the roof area.
    const bandTop = project([scanX, 300, 0.6], 0);
    const bandBot = project([scanX, 470, 0], 0);
    const bandAlpha = phase < 0.87 ? 1 : Math.max(0, 1 - (phase - 0.87) / 0.13);
    seg(bandTop, bandBot, 34 * scale, [IRIS[0], IRIS[1], IRIS[2], 0.1 * bandAlpha]);
    seg(bandTop, bandBot, lw, [VAPOR[0], VAPOR[1], VAPOR[2], 0.65 * bandAlpha], 0.35);

    // Drone path: faint full curve, a bright trail behind the drone, and the drone itself.
    const dt = Math.min(1, phase * 1.15);
    let prev = project([...bezier(0), 1.6] as P3, 0);
    for (let s = 1; s <= 48; s++) {
      const u = s / 48;
      const cur = project([...bezier(u), 1.6] as P3, 0);
      const trail = u <= dt ? Math.max(0, 1 - (dt - u) * 4) : 0;
      seg(prev, cur, lw * 0.9, [IRIS[0], IRIS[1], IRIS[2], 0.22 + 0.7 * trail], trail * 0.3);
      prev = cur;
    }
    const d = project([...bezier(dt), 1.6] as P3, 0);
    const r = 7 * scale;
    seg([d[0] - r, d[1]], [d[0] + r, d[1]], lw, [VAPOR[0], VAPOR[1], VAPOR[2], bandAlpha], 0.3);
    seg([d[0], d[1] - r * 0.5], [d[0], d[1] + r * 0.5], lw, [VAPOR[0], VAPOR[1], VAPOR[2], bandAlpha]);

    gl.clearColor(0, 0, 0, 0);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.uniform2f(locR, W, H);
    gl.bufferData(gl.ARRAY_BUFFER, data.subarray(0, n * 6), gl.DYNAMIC_DRAW);
    gl.drawArrays(gl.TRIANGLES, 0, n);

    if (!shown) {
      shown = true;
      canvas.parentElement?.classList.add("gl-on");
    }
    if (running) raf = requestAnimationFrame(frame);
  };

  const play = () => {
    if (running) return;
    running = true;
    raf = requestAnimationFrame(frame);
  };
  const pause = () => {
    running = false;
    if (raf) cancelAnimationFrame(raf);
    raf = 0;
  };

  // Only render while the hero is on screen and the tab is visible.
  let onScreen = true;
  const io = new IntersectionObserver(([entry]) => {
    onScreen = entry.isIntersecting;
    if (onScreen && !document.hidden) play();
    else pause();
  });
  io.observe(canvas);
  const onVis = () => (document.hidden || !onScreen ? pause() : play());
  document.addEventListener("visibilitychange", onVis);
  play();

  return () => {
    pause();
    io.disconnect();
    ro.disconnect();
    document.removeEventListener("visibilitychange", onVis);
    window.removeEventListener("pointermove", onPointer);
    canvas.parentElement?.classList.remove("gl-on");
  };
}

/** 0 to 1 over 1.6s after a delay, eased out: planes and edges assemble in depth on first load. */
function assembly(t: number, delay: number) {
  const x = Math.min(1, Math.max(0, (t - delay) / 1.6));
  return 1 - (1 - x) ** 3;
}
