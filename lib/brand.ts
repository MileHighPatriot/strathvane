export const palette = {
  basalt: "#15181c",
  graphite: "#2c323a",
  vapor: "#eef0f3",
  alloy: "#c8cdd4",
  iris: "#8b82f2",
  irisDeep: "#4a3fc0",
  lilac: "#cfcaf9",
} as const;

export function hexToRgb(hex: string): [number, number, number] {
  const value = hex.replace("#", "");
  const n = Number.parseInt(value, 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}
