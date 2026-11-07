"use client";

import Link from "next/link";
import { useLayoutEffect, useRef, useState } from "react";
import Icon from "@/components/Icon";
import { chips, commercial, emergencyButtons, residential, type ServiceCard } from "@/lib/content";
import { site } from "@/lib/site";

type Path = "emergency" | "residential" | "commercial";

/** S1: sticky finder bar with path tabs, node chips, and the unsafe Yes/No toggle. */
export function FinderBar() {
  const [tab, setTab] = useState<Path>("residential");
  const groups: { id: Path; label: string; items: { key: string; label: string; href: string }[] }[] = [
    {
      id: "emergency",
      label: "Emergency",
      items: emergencyButtons.map((b) => ({ key: b.key, label: b.label, href: `/emergency/#${b.target}` })),
    },
    {
      id: "residential",
      label: "Residential",
      items: residential.map((r, i) => ({ key: r.key, label: chips[i], href: `#${r.key.toLowerCase()}` })),
    },
    {
      id: "commercial",
      label: "Commercial",
      items: commercial.map((c) => ({ key: c.key, label: c.title, href: `#${c.key.toLowerCase()}` })),
    },
  ];
  return (
    <div className="finder-bar glass">
      <div className="wrap">
        <div className="finder-tabs js-only" role="tablist" aria-label="Service paths">
          {groups.map((g) => (
            <button
              key={g.id}
              type="button"
              role="tab"
              id={`fb-tab-${g.id}`}
              aria-selected={tab === g.id}
              aria-controls={`fb-${g.id}`}
              tabIndex={tab === g.id ? 0 : -1}
              className="tab"
              onClick={() => setTab(g.id)}
            >
              {g.label}
            </button>
          ))}
        </div>
        {groups.map((g) => (
          <div
            key={g.id}
            id={`fb-${g.id}`}
            role="tabpanel"
            aria-labelledby={`fb-tab-${g.id}`}
            className="fb-panel"
            data-active={tab === g.id ? "" : undefined}
          >
            <p className="fb-head nojs-only">{g.label}</p>
            <ul className="chip-row">
              {g.items.map((it) => (
                <li key={it.key}>
                  <Link href={it.href} className="chip">
                    <span className="node-key">{it.key}</span>
                    {it.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
        <div className="fb-safety">
          <p>Is anything unsafe or leaking right now?</p>
          <a href="#urgent" className="btn btn-outline-dark btn-sm">
            Yes
          </a>
          <a href="#residential" className="btn btn-outline-dark btn-sm">
            No
          </a>
        </div>
      </div>
    </div>
  );
}

export function ResultCard({ card, kind, anchor = true }: { card: ServiceCard; kind: "home" | "business"; anchor?: boolean }) {
  return (
    <article id={anchor ? card.key.toLowerCase() : undefined} className="svc-card">
      <p className="svc-top">
        <span className="node-key">{card.key}</span>
        <Icon name={card.icon} />
      </p>
      <p className="svc-title">{card.title}</p>
      <p>{card.scope}</p>
      {card.price ? <p className="price-line">{card.price}</p> : null}
      <div className="svc-btns">
        {kind === "home" ? (
          <>
            <Link href={`/book/?service=${encodeURIComponent(card.title)}`} className="btn btn-primary">
              Book
            </Link>
            <Link href="/estimate/" className="btn btn-outline">
              Estimate
            </Link>
          </>
        ) : (
          <>
            <Link href="/book/" className="btn btn-primary">
              Request a walkthrough
            </Link>
            <a href={site.phoneHref} className="btn btn-outline">
              Call {site.phoneDisplay}
            </a>
          </>
        )}
      </div>
    </article>
  );
}

/** S4: Home / Business toggle; cards move with a 180ms FLIP. Without JS both sets show. */
export function HomeBusiness() {
  const [mode, setMode] = useState<"home" | "business">("business");
  const grid = useRef<HTMLDivElement>(null);
  const before = useRef<Map<string, DOMRect>>(new Map());

  const choose = (next: "home" | "business") => {
    const map = new Map<string, DOMRect>();
    grid.current?.querySelectorAll<HTMLElement>("[data-flip]").forEach((el) => map.set(el.dataset.flip!, el.getBoundingClientRect()));
    before.current = map;
    setMode(next);
  };

  useLayoutEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    grid.current?.querySelectorAll<HTMLElement>("[data-flip]").forEach((el) => {
      const prev = before.current.get(el.dataset.flip!);
      const now = el.getBoundingClientRect();
      if (!prev) {
        el.animate([{ opacity: 0, transform: "translateY(12px)" }, { opacity: 1, transform: "none" }], {
          duration: 180,
          easing: "cubic-bezier(0.2, 0.8, 0.2, 1)",
        });
        return;
      }
      const dx = prev.left - now.left;
      const dy = prev.top - now.top;
      if (dx || dy)
        el.animate([{ transform: `translate(${dx}px, ${dy}px)` }, { transform: "none" }], {
          duration: 180,
          easing: "cubic-bezier(0.2, 0.8, 0.2, 1)",
        });
    });
  }, [mode]);

  const list = mode === "home" ? residential : commercial;
  return (
    <div className="hb">
      <div className="seg seg-tabs js-only" role="radiogroup" aria-label="Home or business">
        {(["home", "business"] as const).map((m) => (
          <label key={m} className="seg-opt seg-tall">
            <input type="radio" name="hb" checked={mode === m} onChange={() => choose(m)} />
            <span>{m === "home" ? "Home" : "Business"}</span>
          </label>
        ))}
      </div>
      {/* Business is the default, so without JS the commercial cards show and the toggle is hidden. */}
      <div className="svc-grid" ref={grid}>
        {list.map((c) => (
          <div key={c.key} data-flip={c.key}>
            <ResultCard card={c} kind={mode} anchor={mode === "business"} />
          </div>
        ))}
      </div>
    </div>
  );
}
