export const SIZES = [
  { id: "u15", label: "Under 15 squares", squares: 12 },
  { id: "s15", label: "15 to 25 squares", squares: 20 },
  { id: "s25", label: "25 to 35 squares", squares: 30 },
  { id: "s35", label: "Over 35 squares", squares: 40 },
  { id: "sat", label: "Not sure, measure it by satellite", squares: 22 },
] as const;

export const PITCHES = [
  { id: "low", label: "Low, walkable", factor: 1, load: 0 },
  { id: "med", label: "Medium", factor: 1.12, load: 14 },
  { id: "steep", label: "Steep", factor: 1.3, load: 30 },
] as const;

export const MATERIALS = [
  { id: "arch", label: "Architectural shingle", load: 0 },
  { id: "impact", label: "Impact-resistant shingle", load: 8 },
  { id: "metal", label: "Standing seam metal", load: 16 },
  { id: "tile", label: "Concrete tile", load: 22 },
] as const;

export const LAYERS = [
  { id: "l1", label: "1", load: 0 },
  { id: "l2", label: "2", load: 12 },
  { id: "lunsure", label: "Not sure", load: 6 },
] as const;

export const STORIES = [
  { id: "st1", label: "1", load: 0 },
  { id: "st2", label: "2", load: 8 },
  { id: "st3", label: "3", load: 16 },
] as const;

export const DAMAGES = [
  { id: "missing", label: "Missing shingles", load: 8 },
  { id: "hail", label: "Hail dents", load: 10 },
  { id: "leak", label: "Leak inside", load: 12 },
  { id: "unsure", label: "Not sure", load: 4 },
] as const;

export const CLAIMS = [
  { id: "yes", label: "Yes", load: 4 },
  { id: "no", label: "No", load: 0 },
  { id: "unsure", label: "Not sure", load: 2 },
] as const;

export type JobType = "replacement" | "storm";

export type EstimateInput = {
  type: JobType;
  size: string;
  pitch: string;
  material: string;
  layers: string;
  stories: string;
  damage: string;
  claim: string;
};

export type EstimateResult = {
  squares: string;
  factor: string;
  complexity: number;
};

function pick<T extends { id: string }>(list: readonly T[], id: string): T {
  return list.find((item) => item.id === id) ?? list[0];
}

export function computeEstimate(input: EstimateInput): EstimateResult {
  const size = pick(SIZES, input.size);
  const pitch = pick(PITCHES, input.pitch);
  const material = pick(MATERIALS, input.material);
  const layers = pick(LAYERS, input.layers);
  const stories = pick(STORIES, input.stories);
  const damage = pick(DAMAGES, input.damage);
  const claim = pick(CLAIMS, input.claim);
  const adjusted = size.squares * pitch.factor;
  let complexity = 18 + pitch.load + material.load + layers.load + stories.load;
  if (input.type === "storm") complexity += 8 + damage.load + claim.load;
  complexity = Math.max(12, Math.min(94, complexity));
  return {
    squares: adjusted.toFixed(1),
    factor: pitch.factor.toFixed(2),
    complexity,
  };
}

export const teaserDefaults: EstimateInput = {
  type: "replacement",
  size: "s15",
  pitch: "med",
  material: "arch",
  layers: "l1",
  stories: "st1",
  damage: "unsure",
  claim: "unsure",
};

export const fullDefaults: EstimateInput = {
  type: "replacement",
  size: "s15",
  pitch: "low",
  material: "arch",
  layers: "l1",
  stories: "st1",
  damage: "missing",
  claim: "no",
};
