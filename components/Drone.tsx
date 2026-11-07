"use client";

import { useEffect, useRef, useState } from "react";
import Photo from "@/components/Photo";

const steps = [
  {
    name: "Fly",
    body: "A drone photographs every plane, ridge, and valley, so no one has to walk a fragile roof to find the damage.",
  },
  {
    name: "Map",
    body: "Each photo is pinned to its spot on a roof diagram, so you can see exactly where the problem is.",
  },
  { name: "Report", body: "You get a photo report you can read, with what we found and what it means." },
];

// Top-down roof plan used by the Map and Report layers (viewBox 0 0 400 300).
const plan = {
  outline: "M40 60H360V240H40Z",
  hips: "M40 60L120 150L40 240M360 60L280 150L360 240M120 150H280",
  pins: [
    [90, 110],
    [200, 95],
    [300, 205],
    [150, 200],
  ],
};

/** S6: three steps; on desktop the illustration panel sticks and changes as each step scrolls past. */
export function DroneStory() {
  const [active, setActive] = useState(0);
  const refs = useRef<(HTMLLIElement | null)[]>([]);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setActive(Number((e.target as HTMLElement).dataset.step));
        }
      },
      { rootMargin: "-45% 0px -45% 0px" },
    );
    refs.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <div className="drone-story">
      <div className="drone-panel glass" data-step={active} aria-hidden="true">
        <div className="dp-layer dp-fly">
          <Photo name="drone" sizes="(min-width: 1024px) 560px, 100vw" />
          <svg viewBox="0 0 400 300" className="dp-overlay">
            <path d="M20 250 C120 120 260 80 380 60" className="dp-path" pathLength={1} />
          </svg>
        </div>
        <svg viewBox="0 0 400 300" className="dp-layer dp-map">
          <path d={plan.outline} className="plan-line" />
          <path d={plan.hips} className="plan-line plan-thin" />
          {plan.pins.map(([x, y], i) => (
            <g key={i} className="pin" style={{ animationDelay: `${i * 120}ms` }}>
              <circle cx={x} cy={y} r="11" />
              <path d={`M${x - 4} ${y}h8M${x} ${y - 4}v8`} />
            </g>
          ))}
        </svg>
        <svg viewBox="0 0 400 300" className="dp-layer dp-report">
          <rect x="70" y="24" width="260" height="252" rx="14" className="sheet" />
          <rect x="94" y="48" width="96" height="72" rx="6" className="sheet-photo" />
          <rect x="210" y="48" width="96" height="72" rx="6" className="sheet-photo" />
          <path d="M94 146h212M94 168h170M94 190h196M94 212h120" className="sheet-line" />
          <path d="M94 244l10 10 18-22" className="sheet-check" />
        </svg>
      </div>
      <ol className="drone-steps">
        {steps.map((s, i) => (
          <li
            key={s.name}
            ref={(el) => {
              refs.current[i] = el;
            }}
            data-step={i}
            className={`drone-step${active === i ? " is-on" : ""}`}
          >
            <span className="step-num">{i + 1}</span>
            <div>
              <p className="step-name">{s.name}</p>
              <p>{s.body}</p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
