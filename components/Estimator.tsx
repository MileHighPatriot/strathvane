"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { estimateDisclaimer, rangeLine } from "@/lib/content";
import { defaults, groups, model, types } from "@/lib/estimator";

function Meter({ squares, factor, complexity }: { squares: number; factor: number; complexity: number }) {
  const rows = [
    { label: "Squares, adjusted for pitch", value: squares.toFixed(1), pct: Math.min(100, (squares / 52) * 100) },
    { label: "Pitch factor", value: factor.toFixed(2), pct: 20 + ((factor - 1) / 0.3) * 80 },
    { label: "Job complexity", value: `${complexity}%`, pct: complexity },
  ];
  return (
    <dl className="meter js-only">
      {rows.map((r) => (
        <div key={r.label} className="meter-row">
          <dt>{r.label}</dt>
          <dd>
            <span className="meter-num">{r.value}</span>
            <span className="meter-bar" aria-hidden="true">
              <span style={{ transform: `scaleX(${r.pct / 100})` }} />
            </span>
          </dd>
        </div>
      ))}
    </dl>
  );
}

function Seg({
  name,
  legend,
  options,
  pick,
  onPick,
  hideLegend,
}: {
  name: string;
  legend: string;
  options: { label: string }[];
  pick: number;
  onPick: (i: number) => void;
  hideLegend?: boolean;
}) {
  return (
    <fieldset className="field">
      <legend className={hideLegend ? "sr" : "field-label"}>{legend}</legend>
      <div className="seg seg-wrap">
        {options.map((o, i) => (
          <label key={o.label} className="seg-opt">
            <input type="radio" name={name} value={o.label} defaultChecked={i === pick} onChange={() => onPick(i)} />
            <span>{o.label}</span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}

/** Static version for no-JS: every option, the range line, and the disclaimer. */
export function EstimatorTable() {
  return (
    <div className="nojs-only">
      <table className="opt-table">
        <tbody>
          {groups.map((g) => (
            <tr key={g.name}>
              <th scope="row">{g.legend}</th>
              <td>{g.options.map((o) => o.label).join(" · ")}</td>
            </tr>
          ))}
          <tr>
            <td colSpan={2}>Permits: we handle them.</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

/** Home S5 teaser: type tabs, one live row (roof size), the meter, range line, and disclaimer. */
export function EstimatorTeaser() {
  const [storm, setStorm] = useState(false);
  const [size, setSize] = useState(defaults.size);
  const m = useMemo(() => model({ ...defaults, size }, storm), [size, storm]);
  const size0 = groups[0];
  return (
    <div className="est-teaser">
      <div className="seg seg-tabs" role="radiogroup" aria-label="Estimate type">
        {["Full replacement", "Storm or hail repair"].map((label, i) => (
          <label key={label} className="seg-opt seg-tall">
            <input type="radio" name="teaser-type" value={label} defaultChecked={i === 0} onChange={() => setStorm(i === 1)} />
            <span>{label}</span>
          </label>
        ))}
      </div>
      <Seg name="teaser-size" legend={size0.legend} options={size0.options} pick={size} onPick={setSize} />
      <Meter {...m} />
      <p className="range-line">{rangeLine}</p>
      <p className="disclaimer">{estimateDisclaimer}</p>
      <Link href="/estimate/" className="btn btn-iris">
        Open the full estimator
      </Link>
    </div>
  );
}

/** Estimate page S2 to S4: type tiles, every detail as a segmented row, and the live range card. */
export function EstimatorFull() {
  const [storm, setStorm] = useState(false);
  const [pick, setPick] = useState<Record<string, number>>(defaults);
  const m = useMemo(() => model(pick, storm), [pick, storm]);
  return (
    <div className="est-full">
      <section id="type" className="est-step" aria-label="1 Type">
        <fieldset className="field">
          <legend className="sr">Type</legend>
          <div className="type-tiles">
            {types.map((t, i) => (
              <label key={t} className="type-tile">
                <input type="radio" name="type" value={t} defaultChecked={i === 0} onChange={() => setStorm(i === 1)} />
                <span>{t}</span>
              </label>
            ))}
          </div>
        </fieldset>
      </section>

      <section id="details" className="est-step" aria-label="2 Details">
        {groups.map((g) => (
          <div key={g.name} className={g.stormOnly ? `storm-only${storm ? " is-on" : ""}` : undefined}>
            <Seg
              name={g.name}
              legend={g.legend}
              options={g.options}
              pick={pick[g.name]}
              onPick={(i) => setPick((p) => ({ ...p, [g.name]: i }))}
            />
          </div>
        ))}
        <p className="permits">Permits: we handle them.</p>
      </section>

      <section id="range" className="est-step range-card glass" aria-label="3 Range">
        <Meter {...m} />
        <p className="helper">1 square = 100 square feet of roof.</p>
        <EstimatorTable />
        <p className="range-big">Your estimate: {rangeLine}.</p>
        <p>What&apos;s included: [list].</p>
        <p>What could change it: decking condition, number of layers, pitch, and permit requirements.</p>
        <p className="disclaimer">{estimateDisclaimer}</p>
      </section>
    </div>
  );
}
