/**
 * Roof planes traced over hero-1200.webp (1200x675 image space). The static SVG poster overlay and the
 * WebGL scene both draw from these points, so the two line up. z is height above the eave (0 to 1).
 */
export type P3 = readonly [number, number, number];

export const IMG_W = 1200;
export const IMG_H = 675;

const v = {
  A: [522, 431, 0], // front eave, left end
  B: [1000, 413, 0], // front eave, right end
  E: [1106, 433, 0], // right rake, bottom
  R1: [612, 386, 1], // ridge, left end
  R2: [1034, 338, 1], // ridge, right end
  D1: [662, 413, 0.05], // raised section, eave left
  D2: [822, 410, 0.05], // raised section, eave right
  D3: [702, 384, 0.5], // raised section, ridge left
  D4: [818, 381, 0.5], // raised section, ridge right
} as const satisfies Record<string, P3>;

export type Kind = "eave" | "hip" | "ridge" | "valley";

export const edges: { a: P3; b: P3; kind: Kind }[] = [
  { a: v.A, b: v.B, kind: "eave" },
  { a: v.B, b: v.E, kind: "eave" },
  { a: v.A, b: v.R1, kind: "hip" },
  { a: v.B, b: v.R2, kind: "hip" },
  { a: v.E, b: v.R2, kind: "hip" },
  { a: v.R1, b: v.R2, kind: "ridge" },
  { a: v.D1, b: v.D3, kind: "valley" },
  { a: v.D2, b: v.D4, kind: "valley" },
  { a: v.D3, b: v.D4, kind: "ridge" },
];

/** Roof planes as polygons; the scan band lights each one as it passes. */
export const planes: P3[][] = [
  [v.A, v.B, v.R2, v.R1],
  [v.B, v.E, v.R2],
  [v.D1, v.D2, v.D4, v.D3],
];

/** Measurement ticks: short marks across the ridge and the front eave. */
export function ticks(): { a: P3; b: P3 }[] {
  const out: { a: P3; b: P3 }[] = [];
  const along = (p: P3, q: P3, n: number, len: number) => {
    const dx = q[0] - p[0];
    const dy = q[1] - p[1];
    const d = Math.hypot(dx, dy);
    const nx = -dy / d;
    const ny = dx / d;
    for (let i = 0; i <= n; i++) {
      const t = i / n;
      const x = p[0] + dx * t;
      const y = p[1] + dy * t;
      const z = p[2] + (q[2] - p[2]) * t;
      const l = i % 2 ? len * 0.55 : len;
      // Whole pixels keep the SVG markup short.
      const r = (n: number) => Math.round(n);
      out.push({ a: [r(x - nx * l), r(y - ny * l), z], b: [r(x + nx * l), r(y + ny * l), z] });
    }
  };
  along(v.R1, v.R2, 8, 9);
  along(v.A, v.B, 10, 9);
  return out;
}

/** Drone flight path: a cubic curve from the open sky on the left, low across the roof. */
export const dronePath = {
  p0: [300, 250] as const,
  c1: [560, 170] as const,
  c2: [880, 250] as const,
  p3: [1170, 300] as const,
};

export function bezier(t: number): [number, number] {
  const { p0, c1, c2, p3 } = dronePath;
  const u = 1 - t;
  return [
    u * u * u * p0[0] + 3 * u * u * t * c1[0] + 3 * u * t * t * c2[0] + t * t * t * p3[0],
    u * u * u * p0[1] + 3 * u * u * t * c1[1] + 3 * u * t * t * c2[1] + t * t * t * p3[1],
  ];
}

export const dronePathD = `M${dronePath.p0} C${dronePath.c1} ${dronePath.c2} ${dronePath.p3}`;
export const planeD = (pts: P3[]) => `M${pts.map((p) => `${p[0]},${p[1]}`).join("L")}Z`;
