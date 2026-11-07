"use client";

import { type FormEvent, useEffect, useRef, useState } from "react";
import { chips, formNote, timeWindows, validation } from "@/lib/content";
import { asset } from "@/lib/site";

type Day = { value: string; dow: string; date: string; label: string };

function nextDays(n: number): Day[] {
  const out: Day[] = [];
  const d = new Date();
  for (let i = 1; i <= n; i++) {
    const x = new Date(d.getFullYear(), d.getMonth(), d.getDate() + i);
    out.push({
      value: x.toISOString().slice(0, 10),
      dow: x.toLocaleDateString("en-US", { weekday: "short" }),
      date: x.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
      label: x.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" }),
    });
  }
  return out;
}

/**
 * Book S1. Dates are built in the browser after load (a static build can't know "today"); before that, and
 * with JS off, a native date input stands in. Prefills Name, Phone, and Service from the home booking band.
 */
export default function BookForm() {
  const [days, setDays] = useState<Day[] | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [done, setDone] = useState<string | null>(null);
  const [prefill, setPrefill] = useState<Record<string, string>>({});
  const doneRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const q = new URLSearchParams(window.location.search);
    // Reading the URL and the clock is only possible after mount in a static export.
    setPrefill({ name: q.get("name") ?? "", phone: q.get("phone") ?? "", service: q.get("service") ?? "" });
    setDays(nextDays(14));
  }, []);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const v = (k: string) => String(f.get(k) ?? "").trim();
    const errs: Record<string, string> = {};
    if (!v("service")) errs.service = validation.choice;
    if (!v("date")) errs.date = validation.choice;
    if (!v("time")) errs.time = validation.choice;
    if (!v("name")) errs.name = validation.name;
    if (v("phone").replace(/\D/g, "").length !== 10) errs.phone = validation.phone;
    setErrors(errs);
    const first = ["service", "date", "time", "name", "phone"].find((k) => errs[k]);
    if (first) {
      e.currentTarget.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }
    const day = days?.find((d) => d.value === v("date"))?.label ?? v("date");
    setDone(
      `Demo booking: ${v("service")}, ${day}, inspection window ${v("time")} (example). On a real site, this is where you'd get a text before the drone goes up. Nothing was sent, and no one is booked or charged.`,
    );
    requestAnimationFrame(() => doneRef.current?.focus());
  };

  const err = (k: string) =>
    errors[k] ? (
      <p id={`bk-${k}-err`} className="field-error">
        {errors[k]}
      </p>
    ) : null;
  const desc = (k: string) => (errors[k] ? `bk-${k}-err` : undefined);

  return (
    <div className="demo-form book-form glass-light">
      {done ? null : (
        <form method="get" action={asset("/demo-sent/")} noValidate onSubmit={onSubmit} key={prefill.service ?? "x"}>
          <div className="field">
            <label htmlFor="bk-service" className="field-label">
              Service
            </label>
            <select
              id="bk-service"
              name="service"
              className="input"
              defaultValue={chips.includes(prefill.service) ? prefill.service : ""}
              aria-describedby={desc("service")}
              aria-invalid={errors.service ? true : undefined}
            >
              <option value="" disabled>
                Service
              </option>
              {chips.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
            {err("service")}
          </div>

          <fieldset className="field" aria-describedby={desc("date")}>
            <legend className="field-label">Date</legend>
            {days ? (
              <div className="date-strip">
                {days.map((d) => (
                  <label key={d.value} className="date-cell">
                    <input type="radio" name="date" value={d.value} />
                    <span>
                      <span className="date-dow">{d.dow}</span>
                      <span className="date-day">{d.date}</span>
                    </span>
                  </label>
                ))}
              </div>
            ) : (
              <input type="date" name="date" className="input" aria-label="Date" />
            )}
            {err("date")}
          </fieldset>

          <fieldset className="field" aria-describedby={desc("time")}>
            <legend className="field-label">Time</legend>
            <div className="slots">
              {timeWindows.map((t) => (
                <label key={t} className="seg-opt">
                  <input type="radio" name="time" value={t} />
                  <span>{t}</span>
                </label>
              ))}
            </div>
            {err("time")}
          </fieldset>

          <div className="field">
            <label htmlFor="bk-name" className="field-label">
              Name
            </label>
            <input
              id="bk-name"
              name="name"
              className="input"
              autoComplete="name"
              defaultValue={prefill.name}
              aria-describedby={desc("name")}
              aria-invalid={errors.name ? true : undefined}
            />
            {err("name")}
          </div>
          <div className="field">
            <label htmlFor="bk-phone" className="field-label">
              Phone
            </label>
            <input
              id="bk-phone"
              name="phone"
              type="tel"
              className="input"
              autoComplete="tel"
              defaultValue={prefill.phone}
              aria-describedby={desc("phone")}
              aria-invalid={errors.phone ? true : undefined}
            />
            {err("phone")}
          </div>
          <div className="field">
            <label htmlFor="bk-notes" className="field-label">
              Notes
            </label>
            <textarea id="bk-notes" name="notes" className="input textarea" rows={3} />
          </div>
          <p className="form-note">{formNote}</p>
          <button type="submit" className="btn btn-primary btn-block">
            Book my inspection
          </button>
        </form>
      )}
      <div aria-live="polite">
        {done ? (
          <p ref={doneRef} tabIndex={-1} className="confirm">
            {done}
          </p>
        ) : null}
      </div>
    </div>
  );
}
