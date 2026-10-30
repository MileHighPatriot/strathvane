"use client";

import { useEffect, useRef, useState } from "react";

export function ScrollCue() {
  useEffect(() => {
    const nodes = Array.from(document.querySelectorAll<HTMLElement>("[data-cue]"));
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      nodes.forEach((node) => node.classList.add("is-in"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("is-in");
        });
      },
      { threshold: 0.35 },
    );
    nodes.forEach((node) => io.observe(node));
    const stepsRoot = document.querySelector<HTMLElement>("[data-steps]");
    let stepIo: IntersectionObserver | undefined;
    if (stepsRoot) {
      stepIo = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            const step = (entry.target as HTMLElement).dataset.step;
            if (step) stepsRoot.dataset.active = step;
          });
        },
        { rootMargin: "-35% 0px -45% 0px" },
      );
      stepsRoot.querySelectorAll<HTMLElement>("[data-step]").forEach((el) => stepIo?.observe(el));
    }
    return () => {
      io.disconnect();
      stepIo?.disconnect();
    };
  }, []);
  return null;
}

const trackerSteps = [
  "Booked: You're on the schedule. Inspection window: [Tue, 8 to 10 AM] (example).",
  "Drone inspection: The drone is up. Your photo report is ready in about [40 minutes] (example).",
  "Tear off: Crew on site, old roof coming off. Permit #[000000] (example).",
  "Final walkthrough: Roof done, yard swept for nails, and the photos are in your account.",
];

export function Tracker() {
  const [index, setIndex] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const root = ref.current;
    if (!root) return;
    let timer = 0;
    const io = new IntersectionObserver(([entry]) => {
      window.clearInterval(timer);
      if (!entry.isIntersecting) return;
      timer = window.setInterval(() => setIndex((value) => (value + 1) % trackerSteps.length), 2500);
    }, { threshold: 0.4 });
    io.observe(root);
    return () => {
      io.disconnect();
      window.clearInterval(timer);
    };
  }, []);
  return (
    <div className="phone" ref={ref}>
      <ol>
        {trackerSteps.map((step, stepIndex) => (
          <li key={step} className={stepIndex === index ? "tracker-step is-on" : "tracker-step"}>
            {step}
          </li>
        ))}
      </ol>
    </div>
  );
}

const pairs = [
  ["Hail damage. Before: bruised shingles and dented vents after a storm. After: a new impact-resistant roof with new vents.", "Hail damage"],
  ["Worn shingles. Before: curled, cracked shingles losing granules. After: a new architectural shingle roof.", "Worn shingles"],
  ["Chimney leak. Before: cracked caulk where the chimney meets the roof. After: new step and counter flashing.", "Chimney leak"],
  ["Gutters. Before: sagging gutters pulling off the fascia. After: new seamless gutters with hidden hangers.", "Gutters"],
  ["Metal roof. Before: a patched low-slope roof. After: a standing seam metal roof.", "Metal roof"],
] as const;

export function BeforeAfter() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const onInput = (event: Event) => {
      const target = event.target;
      if (!(target instanceof HTMLInputElement) || target.type !== "range") return;
      target.closest<HTMLElement>(".ba-frame")?.style.setProperty("--pos", `${target.value}%`);
    };
    root.addEventListener("input", onInput);
    return () => root.removeEventListener("input", onInput);
  }, []);
  return (
    <div className="ba-root" ref={ref}>
      <div className="ba-thumbs" role="radiogroup" aria-label="Before and after examples">
        {pairs.map(([, title], index) => (
          <label key={title} className="thumb">
            <input type="radio" name="ba" defaultChecked={index === 0} />
            <span>{title}</span>
          </label>
        ))}
      </div>
      {pairs.map(([caption, title], index) => (
        <article key={title} className={`ba-set ba-${index}`}>
          <p className="ba-title">{caption}</p>
          <div className="ba-frame">
            <div className="ba-pane ba-before">
              <Sketch kind={title} after={false} />
              <p>Before</p>
            </div>
            <div className="ba-pane ba-after">
              <Sketch kind={title} after />
              <p>After</p>
            </div>
            <label className="ba-handle">
              <span className="sr">Before and after</span>
              <input type="range" min={0} max={100} defaultValue={50} aria-label="Before and after" />
            </label>
          </div>
        </article>
      ))}
    </div>
  );
}

function Sketch({ kind, after }: { kind: string; after: boolean }) {
  return (
    <svg viewBox="0 0 320 180" className={after ? "sketch is-after" : "sketch"} aria-hidden="true">
      <path d="M20 120 L160 40 L300 120 V160 H20 Z" />
      <path d="M160 40 V120" />
      {kind === "Hail damage" && !after ? <path d="M70 100 h8 M110 90 h10 M200 110 h8 M240 95 h12" /> : null}
      {kind === "Worn shingles" && !after ? <path d="M40 130 q20 -16 40 0 M100 140 q20 -18 40 0 M180 128 q24 -20 40 0" /> : null}
      {kind === "Chimney leak" && !after ? <path d="M210 70 h30 v34 h-30 z M208 104 h34" /> : null}
      {kind === "Chimney leak" && after ? <path d="M206 68 h38 v40 h-38 z M200 112 h50" /> : null}
      {kind === "Gutters" && !after ? <path d="M24 150 q80 24 140 -6 q60 20 120 -8" /> : null}
      {kind === "Gutters" && after ? <path d="M20 148 H300" /> : null}
      {kind === "Metal roof" && after ? <path d="M40 130 H280 M60 110 H280 M80 90 H270" /> : null}
      {kind === "Metal roof" && !after ? <path d="M50 140 H180 M70 120 H160 M190 150 H260" /> : null}
      {after ? <path d="M40 150 H280" /> : null}
    </svg>
  );
}

const inArea = "Yes, you're in our area. Book a free storm check.";
const outArea = "You may be outside our usual area. Call and we'll tell you straight.";

export function ZipCheck() {
  const [line, setLine] = useState<"in" | "out" | "">("");
  return (
    <form
      className="zip"
      onSubmit={(event) => {
        event.preventDefault();
        const zip = String(new FormData(event.currentTarget).get("zip") ?? "").trim();
        const ok = /^(800|801|802)/.test(zip);
        setLine(ok ? "in" : "out");
        const map = document.getElementById("storm-svg");
        map?.classList.toggle("is-hot", ok);
        const zone = zip.startsWith("802") ? "core" : zip.startsWith("801") ? "mid" : "outer";
        map?.setAttribute("data-zone", ok ? zone : "");
      }}
    >
      <label htmlFor="zip-check">Enter your ZIP</label>
      <div className="zip-row">
        <input id="zip-check" name="zip" inputMode="numeric" placeholder="Enter your ZIP" autoComplete="postal-code" />
        <button className="btn btn-primary" type="submit">
          Check
        </button>
      </div>
      <p className={line === "in" ? "zip-in is-on" : "zip-in"}>{inArea}</p>
      <p className={line === "out" ? "zip-out is-on" : "zip-out"}>{outArea}</p>
    </form>
  );
}

export function FlipStage({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    let old: DOMRect[] = [];
    const snap = () => {
      old = Array.from(root.querySelectorAll<HTMLElement>(".flip-card"))
        .filter((el) => el.offsetParent)
        .map((el) => el.getBoundingClientRect());
    };
    snap();
    const onDown = () => snap();
    const onChange = () => {
      requestAnimationFrame(() => {
        const next = Array.from(root.querySelectorAll<HTMLElement>(".flip-card")).filter((el) => el.offsetParent);
        next.forEach((el, index) => {
          const prev = old[Math.min(index, old.length - 1)];
          if (!prev) return;
          const box = el.getBoundingClientRect();
          const dx = prev.left - box.left;
          const dy = prev.top - box.top;
          if (Math.abs(dx) < 1 && Math.abs(dy) < 1) return;
          el.animate(
            [{ transform: `translate(${dx}px, ${dy}px)` }, { transform: "translate(0, 0)" }],
            { duration: 180, easing: "cubic-bezier(0.2, 0.8, 0.2, 1)" },
          );
        });
      });
    };
    root.addEventListener("pointerdown", onDown, true);
    root.addEventListener("change", onChange);
    return () => {
      root.removeEventListener("pointerdown", onDown, true);
      root.removeEventListener("change", onChange);
    };
  }, []);
  return (
    <div ref={ref} className="stage">
      {children}
    </div>
  );
}
