/**
 * Sample estimator model for a concept site. Labels are from the copy; the numbers only drive the meter.
 * Price text is never computed: it stays "$[low] to $[high] (sample)".
 */
export type Opt = { label: string; value: number };
export type Group = { name: string; legend: string; options: Opt[]; stormOnly?: boolean; teaser?: boolean };

export const types = ["Full roof replacement", "Storm or hail repair"] as const;

export const groups: Group[] = [
  {
    name: "size",
    legend: "About how big is the roof?",
    teaser: true,
    options: [
      { label: "Under 15 squares", value: 12 },
      { label: "15 to 25 squares", value: 20 },
      { label: "25 to 35 squares", value: 30 },
      { label: "Over 35 squares", value: 40 },
      { label: "Not sure, measure it by satellite", value: 24 },
    ],
  },
  {
    name: "pitch",
    legend: "How steep is it?",
    options: [
      { label: "Low, walkable", value: 1 },
      { label: "Medium", value: 1.12 },
      { label: "Steep", value: 1.3 },
    ],
  },
  {
    name: "material",
    legend: "Which material?",
    options: [
      { label: "Architectural shingle", value: 0.16 },
      { label: "Impact-resistant shingle", value: 0.24 },
      { label: "Standing seam metal", value: 0.4 },
      { label: "Concrete tile", value: 0.48 },
    ],
  },
  {
    name: "layers",
    legend: "Layers to tear off",
    options: [
      { label: "1", value: 0 },
      { label: "2", value: 0.1 },
      { label: "Not sure", value: 0.06 },
    ],
  },
  {
    name: "stories",
    legend: "How many stories?",
    options: [
      { label: "1", value: 0 },
      { label: "2", value: 0.08 },
      { label: "3", value: 0.16 },
    ],
  },
  {
    name: "damage",
    legend: "What damage do you see?",
    stormOnly: true,
    options: [
      { label: "Missing shingles", value: 0.04 },
      { label: "Hail dents", value: 0.06 },
      { label: "Leak inside", value: 0.1 },
      { label: "Not sure", value: 0.05 },
    ],
  },
  {
    name: "claim",
    legend: "Filing an insurance claim?",
    stormOnly: true,
    options: [
      { label: "Yes", value: 0.04 },
      { label: "No", value: 0 },
      { label: "Not sure", value: 0.02 },
    ],
  },
];

/** Default pick per group: the second option for size and pitch, the first elsewhere. */
export const defaults: Record<string, number> = { size: 1, pitch: 1, material: 0, layers: 0, stories: 0, damage: 1, claim: 1 };

export function model(pick: Record<string, number>, storm: boolean) {
  const val = (name: string) => {
    const g = groups.find((x) => x.name === name)!;
    return g.options[pick[name] ?? defaults[name]].value;
  };
  const factor = val("pitch");
  const squares = Math.round(val("size") * factor * 10) / 10;
  let c = 0.12 + val("material") + (factor - 1) * 1.1 + val("layers") + val("stories");
  if (storm) c += 0.04 + val("damage") + val("claim");
  const complexity = Math.max(5, Math.min(100, Math.round(c * 100)));
  return { squares, factor, complexity };
}
