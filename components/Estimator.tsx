"use client";

import { useMemo, useState } from "react";
import {
  CLAIMS,
  DAMAGES,
  LAYERS,
  MATERIALS,
  PITCHES,
  SIZES,
  STORIES,
  computeEstimate,
  fullDefaults,
  teaserDefaults,
  type EstimateInput,
  type JobType,
} from "@/lib/estimate";

function Seg({
  name,
  legend,
  options,
  value,
  onChange,
}: {
  name: string;
  legend: string;
  options: readonly { id: string; label: string }[];
  value: string;
  onChange: (id: string) => void;
}) {
  return (
    <fieldset className="choice">
      <legend>{legend}</legend>
      <div className="segment">
        {options.map((option) => (
          <label key={option.id} className="seg">
            <input
              type="radio"
              name={name}
              value={option.id}
              checked={value === option.id}
              onChange={() => onChange(option.id)}
            />
            <span>{option.label}</span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}

export function Estimator({ variant }: { variant: "teaser" | "full" }) {
  const defaults = variant === "teaser" ? teaserDefaults : fullDefaults;
  const [input, setInput] = useState<EstimateInput>(defaults);
  const result = useMemo(() => computeEstimate(input), [input]);
  const set = (key: keyof EstimateInput) => (value: string) => setInput((prev) => ({ ...prev, [key]: value }));

  return (
    <div className={`estimator ${input.type === "storm" ? "is-storm" : ""}`}>
      <div className="type-row" role="group" aria-label="Type">
        {(
          [
            ["replacement", "Full replacement"],
            ["storm", "Storm or hail repair"],
          ] as const
        ).map(([id, label]) => (
          <label key={id} className={variant === "full" ? "type-tile" : "seg"}>
            <input
              type="radio"
              name={variant === "full" ? "job-type" : "teaser-type"}
              checked={input.type === id}
              onChange={() => set("type")(id as JobType)}
            />
            <span>{variant === "full" && id === "replacement" ? "Full roof replacement" : label}</span>
          </label>
        ))}
      </div>
      <Seg name={variant + "-size"} legend="About how big is the roof?" options={SIZES} value={input.size} onChange={set("size")} />
      {variant === "full" ? (
        <>
          <Seg name="pitch" legend="How steep is it?" options={PITCHES} value={input.pitch} onChange={set("pitch")} />
          <Seg name="material" legend="Which material?" options={MATERIALS} value={input.material} onChange={set("material")} />
          <Seg name="layers" legend="Layers to tear off" options={LAYERS} value={input.layers} onChange={set("layers")} />
          <Seg name="stories" legend="How many stories?" options={STORIES} value={input.stories} onChange={set("stories")} />
          <div className="storm-only">
            <Seg name="damage" legend="What damage do you see?" options={DAMAGES} value={input.damage} onChange={set("damage")} />
            <Seg name="claim" legend="Filing an insurance claim?" options={CLAIMS} value={input.claim} onChange={set("claim")} />
          </div>
          <p>Permits: we handle them.</p>
        </>
      ) : null}
      <div className="meter" aria-live="polite">
        <div>
          <p className="meter-label">Squares, adjusted for pitch</p>
          <p className="stat">{result.squares}</p>
        </div>
        <div>
          <p className="meter-label">Pitch factor</p>
          <p className="stat">{result.factor}</p>
        </div>
        <div>
          <p className="meter-label">Job complexity</p>
          <p className="stat">{result.complexity}%</p>
          <div className="meter-bar" role="img" aria-label={`Job complexity ${result.complexity} percent`}>
            <span style={{ width: `${result.complexity}%` }} />
          </div>
        </div>
      </div>
      <p className="helper">1 square = 100 square feet of roof.</p>
      {variant === "full" ? (
        <>
          <p>Your estimate: $[low] to $[high] (sample).</p>
          <p>What&apos;s included: [list].</p>
          <p>What could change it: decking condition, number of layers, pitch, and permit requirements.</p>
        </>
      ) : (
        <p>$[low] to $[high] (sample)</p>
      )}
      <p className="disclaimer">
        Range is an estimate only, not a quote. Final price set after an on-site inspection, decking condition, permits, and local code requirements.
      </p>
      <table className="static-model">
        <caption>Sample options</caption>
        <tbody>
          <tr>
            <th scope="row">About how big is the roof?</th>
            <td>{SIZES.map((item) => item.label).join(" / ")}</td>
          </tr>
          <tr>
            <th scope="row">How steep is it?</th>
            <td>Low, walkable / Medium / Steep</td>
          </tr>
          <tr>
            <th scope="row">Which material?</th>
            <td>Architectural shingle / Impact-resistant shingle / Standing seam metal / Concrete tile</td>
          </tr>
          <tr>
            <th scope="row">Layers to tear off</th>
            <td>1 / 2 / Not sure</td>
          </tr>
          <tr>
            <th scope="row">How many stories?</th>
            <td>1 / 2 / 3</td>
          </tr>
          <tr>
            <th scope="row">What damage do you see?</th>
            <td>Missing shingles / Hail dents / Leak inside / Not sure</td>
          </tr>
          <tr>
            <th scope="row">Filing an insurance claim?</th>
            <td>Yes / No / Not sure</td>
          </tr>
          <tr>
            <th scope="row">Your estimate</th>
            <td>$[low] to $[high] (sample)</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
