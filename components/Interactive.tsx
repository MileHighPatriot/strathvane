"use client";

import { type FormEvent, type ReactNode, useEffect, useRef, useState } from "react";
import DemoForm from "@/components/DemoForm";
import Icon from "@/components/Icon";
import { beforeAfter, chips, trackerSteps } from "@/lib/content";
import { asset } from "@/lib/site";

const reduced = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/** S10: phone-frame tracker that steps every 2.5s while in view. No JS or reduced motion: all four steps done. */
export function JobTracker() {
  const [step, setStep] = useState(3);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || reduced()) return;
    let timer = 0;
    let s = 0;
    const tick = () => {
      s = (s + 1) % 5; // four steps plus a beat on "done" before it starts over
      setStep(Math.min(s, 3));
    };
    const io = new IntersectionObserver(([e]) => {
      window.clearInterval(timer);
      if (e.isIntersecting) {
        s = 0;
        setStep(0);
        timer = window.setInterval(tick, 2500);
      }
    });
    io.observe(el);
    return () => {
      io.disconnect();
      window.clearInterval(timer);
    };
  }, []);
  return (
    <div className="phone-frame" ref={ref}>
      <div className="phone-notch" aria-hidden="true" />
      <div className="phone-screen">
        <div className="tracker-bar" aria-hidden="true">
          <span style={{ transform: `scaleX(${(step + 1) / 4})` }} />
        </div>
        <ol className="tracker">
          {trackerSteps.map((t, i) => (
            <li key={t.name} className={i < step ? "is-done" : i === step ? "is-now" : "is-next"} aria-current={i === step ? "step" : undefined}>
              <span className="tracker-dot" aria-hidden="true">
                {i < step ? <Icon name="check" size={14} /> : null}
              </span>
              <div>
                <p className="tracker-name">{t.name}</p>
                <p className="tracker-body">{t.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}

/** S11: draggable, keyboard-operable slider; 5 pairs picked by thumbnails. No JS: before and after side by side. */
export function BeforeAfter({ art }: { art: { before: ReactNode; after: ReactNode; thumb: ReactNode }[] }) {
  const [pair, setPair] = useState(0);
  const [x, setX] = useState(50);
  return (
    <div className="ba">
      {beforeAfter.map((b, i) => (
        <figure key={b.title} className={`ba-pair${pair === i ? "" : " is-off"}`}>
          <div className="ba-stage" style={{ "--x": `${x}%` } as React.CSSProperties}>
            <div className="ba-layer ba-after">
              <span className="ba-tag">After</span>
              {art[i].after}
            </div>
            <div className="ba-layer ba-before">
              <span className="ba-tag">Before</span>
              {art[i].before}
            </div>
            <div className="ba-handle js-only" aria-hidden="true">
              <span className="ba-knob">
                <Icon name="arrow" size={18} className="flip" />
                <Icon name="arrow" size={18} />
              </span>
            </div>
            {pair === i ? (
              <input
                type="range"
                min={0}
                max={100}
                value={x}
                onChange={(e) => setX(Number(e.target.value))}
                className="ba-range js-only"
                aria-label="Before and after"
                aria-valuetext={`${x}%`}
              />
            ) : null}
          </div>
          <figcaption>
            <strong>{b.title}</strong> {b.before} {b.after}
          </figcaption>
        </figure>
      ))}
      <div className="ba-thumbs js-only" role="group" aria-label="Before and after pairs">
        {beforeAfter.map((b, i) => (
          <button key={b.title} type="button" className="ba-thumb" aria-pressed={pair === i} aria-label={b.title} onClick={() => setPair(i)}>
            {art[i].thumb}
          </button>
        ))}
      </div>
      <p className="fine">Sample images for a concept site. Not real jobs.</p>
    </div>
  );
}

/** S15 ZIP check: highlights the inner ring on the map (by id) for an in-area ZIP. */
export function ZipCheck() {
  const [result, setResult] = useState<"in" | "out" | null>(null);
  const [err, setErr] = useState(false);
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const zip = String(new FormData(e.currentTarget).get("zip") ?? "").trim();
    const ok = /^\d{5}$/.test(zip);
    const inArea = ok && /^80[012]/.test(zip);
    setErr(!ok);
    setResult(ok ? (inArea ? "in" : "out") : null);
    document.getElementById("storm-map-fig")?.classList.toggle("is-in", inArea);
  };
  return (
    <form className="zip js-only" method="get" action={asset("/demo-sent/")} noValidate onSubmit={onSubmit}>
      <label htmlFor="zip-check" className="field-label">
        ZIP
      </label>
      <div className="zip-row">
        <input
          id="zip-check"
          name="zip"
          className="input"
          placeholder="Enter your ZIP"
          inputMode="numeric"
          autoComplete="postal-code"
          maxLength={5}
          aria-invalid={err ? true : undefined}
          aria-describedby={err ? "zip-err" : undefined}
        />
        <button type="submit" className="btn btn-iris btn-square">
          Check
        </button>
      </div>
      {err ? (
        <p id="zip-err" className="field-error">
          Enter a 5-digit ZIP.
        </p>
      ) : null}
      <p className="zip-result" aria-live="polite">
        {result === "in" ? "Yes, you're in our area. Book a free storm check." : null}
        {result === "out" ? "You may be outside our usual area. Call and we'll tell you straight." : null}
      </p>
    </form>
  );
}

/** S16: booking band. With JS, "Pick a time" carries the values to the book page; without JS, the demo page. */
export function BookingCta() {
  return (
    <DemoForm
      className="cta-form"
      fields={[
        { kind: "name", label: "Name", name: "name" },
        { kind: "phone", label: "Phone", name: "phone" },
        { kind: "select", label: "What does your roof need?", name: "service", options: chips },
      ]}
      submit="Pick a time"
      confirmation=""
      onValid={(v) => {
        const q = new URLSearchParams(v).toString();
        window.location.assign(asset(`/book/?${q}`));
        return true;
      }}
    />
  );
}
