"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import Icon from "@/components/Icon";
import { commercial, emergencyButtons, residential } from "@/lib/content";
import { asset } from "@/lib/site";

type Path = "emergency" | "residential" | "commercial";
const paths: { id: Path; label: string }[] = [
  { id: "emergency", label: "Emergency" },
  { id: "residential", label: "Residential" },
  { id: "commercial", label: "Commercial" },
];

/**
 * S2: a numbered schematic index with three paths. Phones get tabs, desktop gets three columns joined by
 * drawn roof lines. Residential rows pick a service; "No" shows its result card, "Yes" jumps to the checklist.
 * Without JS all three paths show stacked and Yes/No are plain links.
 */
export default function ServiceFinder() {
  const [tab, setTab] = useState<Path>("residential");
  const [chosen, setChosen] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const resultRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const card = residential[chosen];

  const onTabKey = (e: React.KeyboardEvent, i: number) => {
    const dir = e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0;
    if (!dir) return;
    e.preventDefault();
    const next = (i + dir + paths.length) % paths.length;
    setTab(paths[next].id);
    tabRefs.current[next]?.focus();
  };

  return (
    <div className="finder">
      <div className="finder-tabs js-only" role="tablist" aria-label="Service paths">
        {paths.map((p, i) => (
          <button
            key={p.id}
            ref={(el) => {
              tabRefs.current[i] = el;
            }}
            type="button"
            role="tab"
            id={`finder-tab-${p.id}`}
            aria-selected={tab === p.id}
            aria-controls={`finder-${p.id}`}
            tabIndex={tab === p.id ? 0 : -1}
            className="tab"
            onClick={() => setTab(p.id)}
            onKeyDown={(e) => onTabKey(e, i)}
          >
            {p.label}
          </button>
        ))}
      </div>

      <svg className="finder-roof" viewBox="0 0 1200 90" preserveAspectRatio="none" aria-hidden="true" data-reveal>
        <path d="M200 88 L600 10 L1000 88" className="draw" pathLength={1} />
        <path d="M200 88 V60 M600 10 V60 M1000 88 V60" className="draw draw-late" pathLength={1} />
      </svg>

      <div className="finder-cols">
        <section
          id="finder-emergency"
          className="finder-col"
          role="tabpanel"
          aria-labelledby="finder-tab-emergency"
          data-active={tab === "emergency" ? "" : undefined}
        >
          <p className="col-head">
            <Icon name="warning" />
            Emergency
          </p>
          <ol className="nodes" data-reveal>
            {emergencyButtons.map((b) => (
              <li key={b.key}>
                <Link href={`/emergency/#${b.target}`} className="node">
                  <span className="node-key">{b.key}</span>
                  <span className="node-label">{b.label}</span>
                  <Icon name="arrow" size={18} />
                </Link>
              </li>
            ))}
          </ol>
        </section>

        <section
          id="finder-residential"
          className="finder-col"
          role="tabpanel"
          aria-labelledby="finder-tab-residential"
          data-active={tab === "residential" ? "" : undefined}
        >
          <p className="col-head">
            <Icon name="roof" />
            Residential
          </p>
          <ol className="nodes" data-reveal>
            {residential.map((r, i) => (
              <li key={r.key}>
                <button
                  type="button"
                  className="node"
                  aria-pressed={chosen === i}
                  onClick={() => {
                    setChosen(i);
                    setShowResult(false);
                  }}
                >
                  <span className="node-key">{r.key}</span>
                  <span className="node-label">{r.title}</span>
                  <span className="node-tick" aria-hidden="true">
                    <Icon name="check" size={18} />
                  </span>
                </button>
              </li>
            ))}
          </ol>
        </section>

        <section
          id="finder-commercial"
          className="finder-col"
          role="tabpanel"
          aria-labelledby="finder-tab-commercial"
          data-active={tab === "commercial" ? "" : undefined}
        >
          <p className="col-head">
            <Icon name="shield" />
            Commercial
          </p>
          <ol className="nodes" data-reveal>
            {commercial.map((c) => (
              <li key={c.key}>
                <Link href={`/services/#${c.key.toLowerCase()}`} className="node">
                  <span className="node-key">{c.key}</span>
                  <span className="node-label">{c.title}</span>
                  <Icon name="arrow" size={18} />
                </Link>
              </li>
            ))}
          </ol>
        </section>
      </div>

      <div className="safety glass-light">
        <p className="safety-q">Is anything unsafe or leaking right now?</p>
        <div className="safety-btns">
          <a href="#emergency-check" className="btn btn-outline">
            Yes
          </a>
          <a
            href={asset("/services/")}
            className="btn btn-outline"
            onClick={(e) => {
              e.preventDefault();
              setShowResult(true);
              requestAnimationFrame(() => resultRef.current?.focus());
            }}
          >
            No
          </a>
        </div>
        <div aria-live="polite">
          {showResult ? (
            <div ref={resultRef} tabIndex={-1} className="result-card">
              <p className="result-title">
                <Icon name={card.icon} />
                {card.title}
              </p>
              <p>
                Typical scope: {card.scope}
                {card.price ? <span className="price-line"> {card.price}</span> : null}
              </p>
              <div className="result-links">
                <Link href="/estimate/" className="btn btn-primary">
                  See a price range
                </Link>
                <Link href={`/book/?service=${encodeURIComponent(card.title)}`} className="btn btn-outline">
                  Book an inspection
                </Link>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
