import Icon from "@/components/Icon";
import Photo from "@/components/Photo";
import DemoForm from "@/components/DemoForm";
import { demoLine, materials, processSteps, reviews } from "@/lib/content";

/** S4 proof strip: slim single row on desktop, scroll snap on phones. */
export function ProofStrip() {
  return (
    <section className="proof" aria-label="Proof">
      <ul className="wrap proof-row">
        <li>
          <Icon name="shield" />
          <p>
            <strong>10-year workmanship warranty (example)</strong>
          </p>
        </li>
        <li>
          <Icon name="drone" />
          <p>
            <strong>Photo report after every inspection (example)</strong>
          </p>
        </li>
        <li>
          <Icon name="check" />
          <p>
            <strong>Licensed and insured</strong> · Sample license # (not real)
          </p>
        </li>
      </ul>
    </section>
  );
}

/** S7: top-down roof outline with plane areas, pitch labels, and dimension lines that draw on scroll. */
export function SatelliteDrawing() {
  return (
    <figure className="sat" data-reveal>
      <svg viewBox="0 0 560 400" className="sat-svg" aria-hidden="true">
        <defs>
          <pattern id="sat-grid" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M20 0H0V20" className="sat-grid" />
          </pattern>
        </defs>
        <rect width="560" height="400" fill="url(#sat-grid)" />
        <path d="M80 90H480V310H80Z" className="sat-out draw" pathLength={1} />
        <path d="M80 90L190 200L80 310M480 90L370 200L480 310M190 200H370" className="sat-hip draw draw-late" pathLength={1} />
        <path d="M80 90L190 200H370L480 90Z" className="sat-plane" />
        <path d="M80 310L190 200H370L480 310Z" className="sat-plane sat-plane-b" />
        <g className="sat-labels">
          <text x="280" y="150">A 9.4 sq</text>
          <text x="280" y="262">B 9.4 sq</text>
          <text x="128" y="206">C 3.1</text>
          <text x="432" y="206">D 3.1</text>
          <text x="280" y="172" className="sat-pitch">6/12</text>
          <text x="280" y="284" className="sat-pitch">6/12</text>
        </g>
        <g className="sat-dim draw draw-later">
          <path d="M80 50H480M80 42V58M480 42V58" pathLength={1} />
          <path d="M520 90V310M512 90H528M512 310H528" pathLength={1} />
          <path d="M190 350H370M190 342V358M370 342V358" pathLength={1} />
        </g>
        <g className="sat-dimtext">
          <text x="280" y="40">52 ft</text>
          <text x="536" y="204" transform="rotate(90 536 204)">
            30 ft
          </text>
          <text x="280" y="378">24 ft</text>
        </g>
      </svg>
    </figure>
  );
}

/** Small roof swatches for the materials switcher (viewBox 0 0 160 100). */
function Swatch({ id }: { id: (typeof materials)[number]["id"] }) {
  const lines: Record<string, string> = {
    architectural: "M8 30h144M8 50h144M8 70h144M30 30v20M74 30v20M118 30v20M52 50v20M96 50v20M140 50v20M20 70v22M64 70v22M108 70v22",
    impact: "M8 30h144M8 50h144M8 70h144M30 30v20M74 30v20M118 30v20M52 50v20M96 50v20M140 50v20M20 70v22M64 70v22M108 70v22M128 18l6 6M134 18l-6 6",
    metal: "M24 18v76M48 18v76M72 18v76M96 18v76M120 18v76M144 18v76",
    tile: "M8 40q12 -14 24 0q12 -14 24 0q12 -14 24 0q12 -14 24 0q12 -14 24 0q12 -14 24 0M8 66q12 -14 24 0q12 -14 24 0q12 -14 24 0q12 -14 24 0q12 -14 24 0q12 -14 24 0M8 92q12 -14 24 0q12 -14 24 0q12 -14 24 0q12 -14 24 0q12 -14 24 0q12 -14 24 0",
  };
  return (
    <svg viewBox="0 0 160 100" className={`swatch swatch-${id}`} aria-hidden="true">
      <rect x="4" y="12" width="152" height="84" rx="10" />
      <path d={lines[id]} />
    </svg>
  );
}

/** S8: a CSS-only segmented switcher (radio + :has). Without JS all four show as a list. */
export function Materials() {
  return (
    <div className="materials">
      <div className="seg seg-tabs mat-seg js-only" role="radiogroup" aria-label="Pick the roof">
        {materials.map((m, i) => (
          <label key={m.id} className="seg-opt seg-tall">
            <input type="radio" name="material-pick" id={`mat-${m.id}`} defaultChecked={i === 0} />
            <span>{m.name}</span>
          </label>
        ))}
      </div>
      <ul className="mat-list">
        {materials.map((m) => (
          <li key={m.id} className={`mat mat-${m.id}`}>
            <Swatch id={m.id} />
            {m.id === "metal" ? <Photo name="install" sizes="(min-width: 768px) 280px, 90vw" className="mat-photo" /> : null}
            <div>
              <p className="mat-name">{m.name}</p>
              <p>{m.line}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

/** S9: horizontal rail (vertical on phones) that fills as you scroll. */
export function ProcessRail() {
  return (
    <div className="rail" data-reveal>
      <div className="rail-track" aria-hidden="true">
        <span className="rail-fill" />
      </div>
      <ol className="rail-steps">
        {processSteps.map((s) => (
          <li key={s.name}>
            <span className="rail-node">
              <Icon name={s.icon} />
            </span>
            <p className="rail-name">{s.name}</p>
            <p>{s.body}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}

/** S12: three sample reviews in a swipe row (scroll snap, no auto-advance). */
export function Reviews() {
  return (
    <ul className="swipe" aria-label="Sample reviews">
      {reviews.map((r) => (
        <li key={r.who} className="review glass-dark">
          <p className="review-label">
            <strong>Sample review.</strong> Strathvane is a concept company.
          </p>
          <blockquote>
            <p>{r.quote}</p>
          </blockquote>
          <p className="review-who">{r.who}</p>
        </li>
      ))}
    </ul>
  );
}

/** S14 financing card; "Check options" opens an inline demo form (never a lender site). */
export function FinancingCard({ titleId = "financing-title" }: { titleId?: string }) {
  return (
    <article className="pair-card glass" aria-labelledby={titleId}>
      <Icon name="calendar" size={32} className="pair-icon" />
      <h2 id={titleId}>Pay over time</h2>
      <p className="price-big">As low as $[X]/mo for [N] months (sample)</p>
      <p className="fine">Subject to credit approval. Terms vary. Sample only; no lender is connected.</p>
      <details className="inline-form">
        <summary className="btn btn-iris">Check options</summary>
        <DemoForm
          fields={[
            { kind: "name", label: "Name", name: "name" },
            { kind: "phone", label: "Phone", name: "phone" },
          ]}
          submit="Check options"
          confirmation={demoLine}
        />
      </details>
    </article>
  );
}
