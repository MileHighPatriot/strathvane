/**
 * Strathvane brand tokens for TypeScript (WebGL colors, metadata). The CSS copy of the same values
 * lives in app/globals.css; change both together when the kit changes.
 */
export const brand = {
  name: "Strathvane",
  colors: {
    basalt: "#15181c",
    graphite: "#2c323a",
    vapor: "#eef0f3",
    alloy: "#c8cdd4",
    iris: "#8b82f2",
    irisDeep: "#4a3fc0",
    lilac: "#cfcaf9",
  },
  radius: { card: 14, button: 10 },
} as const;

/** "#rrggbb" to [r, g, b] in 0..1, for WebGL. */
export function rgb(hex: string): [number, number, number] {
  const n = parseInt(hex.slice(1), 16);
  return [((n >> 16) & 255) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255];
}
