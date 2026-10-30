import { hexToRgb, palette } from "@/lib/brand";

function perspective(fov: number, aspect: number, near: number, far: number) {
  const f = 1 / Math.tan(fov / 2);
  const nf = 1 / (near - far);
  const out = new Float32Array(16);
  out[0] = f / aspect;
  out[5] = f;
  out[10] = (far + near) * nf;
  out[11] = -1;
  out[14] = 2 * far * near * nf;
  return out;
}

function lookAt(eye: number[], target: number[], up: number[]) {
  const z = norm([eye[0] - target[0], eye[1] - target[1], eye[2] - target[2]]);
  const x = norm(cross(up, z));
  const y = cross(z, x);
  const out = new Float32Array(16);
  out[0] = x[0];
  out[1] = y[0];
  out[2] = z[0];
  out[4] = x[1];
  out[5] = y[1];
  out[6] = z[1];
  out[8] = x[2];
  out[9] = y[2];
  out[10] = z[2];
  out[12] = -dot(x, eye);
  out[13] = -dot(y, eye);
  out[14] = -dot(z, eye);
  out[15] = 1;
  return out;
}

function multiply(a: Float32Array, b: Float32Array) {
  const out = new Float32Array(16);
  for (let c = 0; c < 4; c += 1) {
    for (let r = 0; r < 4; r += 1) {
      out[c * 4 + r] = a[r] * b[c * 4] + a[4 + r] * b[c * 4 + 1] + a[8 + r] * b[c * 4 + 2] + a[12 + r] * b[c * 4 + 3];
    }
  }
  return out;
}

function cross(a: number[], b: number[]) {
  return [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];
}
function dot(a: number[], b: number[]) {
  return a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
}
function norm(v: number[]) {
  const l = Math.hypot(v[0], v[1], v[2]) || 1;
  return [v[0] / l, v[1] / l, v[2] / l];
}

const lines = [
  -1.1, 0, -0.7, 1.1, 0, -0.7,
  1.1, 0, -0.7, 1.1, 0, 0.7,
  1.1, 0, 0.7, -1.1, 0, 0.7,
  -1.1, 0, 0.7, -1.1, 0, -0.7,
  -0.55, 0.48, 0, 0.55, 0.48, 0,
  -1.1, 0, -0.7, -0.55, 0.48, 0,
  1.1, 0, -0.7, 0.55, 0.48, 0,
  1.1, 0, 0.7, 0.55, 0.48, 0,
  -1.1, 0, 0.7, -0.55, 0.48, 0,
  -0.2, 0.2, -0.35, 0.7, 0.2, -0.35,
  0.7, 0.2, -0.35, 0.7, 0, 0.15,
  -0.2, 0.2, -0.35, -0.2, 0, 0.15,
  -0.2, 0, 0.15, 0.7, 0, 0.15,
  -0.2, 0.2, -0.35, 0.15, 0.48, 0,
];

const ticks: number[] = [];
for (let i = 0; i < 7; i += 1) {
  const x = -0.5 + i * 0.16;
  ticks.push(x, 0.48, 0, x, 0.58, 0);
  const e = -1.05 + i * 0.34;
  ticks.push(e, 0, -0.7, e, -0.1, -0.7);
}

export function startScene(canvas: HTMLCanvasElement, gl: WebGLRenderingContext) {
  const vs = gl.createShader(gl.VERTEX_SHADER)!;
  gl.shaderSource(
    vs,
    "attribute vec3 a; uniform mat4 uMvp; uniform float uReveal; varying float vLit; uniform float uScan; void main(){ float glide=clamp(uReveal*1.35-a.y*0.4,0.0,1.0); vec3 p=mix(a+vec3(0.0,0.7,0.0),a,glide); float along=(a.x+1.2)/2.4; vLit=smoothstep(0.22,0.0,abs(along-uScan)); gl_Position=uMvp*vec4(p,1.0); gl_PointSize=8.0; }",
  );
  gl.compileShader(vs);
  const fs = gl.createShader(gl.FRAGMENT_SHADER)!;
  gl.shaderSource(
    fs,
    "precision mediump float; varying float vLit; uniform vec3 uA; uniform vec3 uB; void main(){ gl_FragColor=vec4(mix(uA,uB,vLit), 0.55+vLit*0.45); }",
  );
  gl.compileShader(fs);
  const program = gl.createProgram()!;
  gl.attachShader(program, vs);
  gl.attachShader(program, fs);
  gl.linkProgram(program);
  gl.useProgram(program);

  const buffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  const data = new Float32Array([...lines, ...ticks, 0, 0.5, 0]);
  gl.bufferData(gl.ARRAY_BUFFER, data, gl.DYNAMIC_DRAW);
  const loc = gl.getAttribLocation(program, "a");
  gl.enableVertexAttribArray(loc);
  gl.vertexAttribPointer(loc, 3, gl.FLOAT, false, 0, 0);
  const uMvp = gl.getUniformLocation(program, "uMvp");
  const uReveal = gl.getUniformLocation(program, "uReveal");
  const uScan = gl.getUniformLocation(program, "uScan");
  const uA = gl.getUniformLocation(program, "uA");
  const uB = gl.getUniformLocation(program, "uB");
  const iris = hexToRgb(palette.iris).map((n) => n / 255);
  const lilac = hexToRgb(palette.lilac).map((n) => n / 255);
  gl.uniform3f(uA, iris[0], iris[1], iris[2]);
  gl.uniform3f(uB, lilac[0], lilac[1], lilac[2]);
  gl.enable(gl.BLEND);
  gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
  gl.clearColor(0, 0, 0, 0);

  let raf = 0;
  let running = true;
  let mouseX = 0;
  let mouseY = 0;
  const started = performance.now();
  const lineCount = (lines.length + ticks.length) / 3;
  const droneIndex = lineCount;

  function resize() {
    const rect = canvas.getBoundingClientRect();
    const dpr = Math.min(1.5, window.devicePixelRatio || 1);
    const w = Math.max(1, Math.floor(rect.width * dpr));
    const h = Math.max(1, Math.floor(rect.height * dpr));
    if (canvas.width !== w || canvas.height !== h) {
      canvas.width = w;
      canvas.height = h;
    }
    gl.viewport(0, 0, canvas.width, canvas.height);
  }

  function draw(now: number) {
    if (!running) return;
    resize();
    const t = (now - started) / 1000;
    const reveal = Math.min(1, t / 2.4);
    const scan = (Math.sin(t * 0.45) + 1) / 2;
    const scroll = Math.min(1, Math.max(0, window.scrollY / window.innerHeight));
    const eye = [Math.sin(t * 0.18) * 0.28 + mouseX * 0.35, 0.95 + scroll * 0.45 + mouseY * 0.12, 2.55 - scroll * 0.55];
    const mvp = multiply(perspective(0.9, canvas.width / canvas.height, 0.1, 20), lookAt(eye, [0, 0.2, 0], [0, 1, 0]));
    const droneX = -1 + scan * 2;
    const drone = new Float32Array([droneX, 0.62 + Math.sin(scan * Math.PI) * 0.08, 0.05]);
    gl.bufferSubData(gl.ARRAY_BUFFER, lineCount * 3 * 4, drone);
    gl.uniformMatrix4fv(uMvp, false, mvp);
    gl.uniform1f(uReveal, reveal);
    gl.uniform1f(uScan, scan);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.drawArrays(gl.LINES, 0, lineCount);
    gl.drawArrays(gl.POINTS, droneIndex, 1);
    raf = requestAnimationFrame(draw);
  }

  function setRun(on: boolean) {
    running = on;
    if (on && !raf) raf = requestAnimationFrame(draw);
    if (!on && raf) {
      cancelAnimationFrame(raf);
      raf = 0;
    }
  }

  const hero = canvas.closest(".hero") ?? canvas;
  const heroSeen = () => {
    const box = hero.getBoundingClientRect();
    return box.bottom > 0 && box.top < window.innerHeight;
  };
  const io = new IntersectionObserver(([entry]) => setRun(entry.isIntersecting && !document.hidden));
  io.observe(hero);
  const onVis = () => setRun(!document.hidden && heroSeen());
  document.addEventListener("visibilitychange", onVis);
  const onMove = (event: PointerEvent) => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    mouseX = event.clientX / window.innerWidth - 0.5;
    mouseY = event.clientY / window.innerHeight - 0.5;
  };
  window.addEventListener("pointermove", onMove, { passive: true });
  raf = requestAnimationFrame(draw);

  return () => {
    cancelAnimationFrame(raf);
    io.disconnect();
    document.removeEventListener("visibilitychange", onVis);
    window.removeEventListener("pointermove", onMove);
  };
}
