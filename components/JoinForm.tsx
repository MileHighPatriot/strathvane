"use client";

import { useEffect, useId, useRef, useState, type FormEvent } from "react";
import { formAction } from "@/lib/paths";

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const messages: Record<string, string> = {
  name: "Enter your name.",
  phone: "Enter your phone number.",
  zip: "Enter your ZIP.",
  month: "Choose a start month.",
};

export function JoinForm() {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [done, setDone] = useState("");
  const liveRef = useRef<HTMLParagraphElement>(null);
  const base = useId();

  useEffect(() => {
    if (done) liveRef.current?.focus();
  }, [done]);

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const next: Record<string, string> = {};
    ["name", "phone", "zip"].forEach((name) => {
      const field = form.elements.namedItem(name);
      if (field instanceof HTMLInputElement && !field.value.trim()) next[name] = messages[name];
    });
    const month = form.querySelector<HTMLInputElement>('input[name="month"]:checked');
    if (!month) next.month = messages.month;
    setErrors(next);
    if (Object.keys(next).length) return;
    setDone("Demo only. Nothing was sent, and no one is booked or charged.");
  }

  if (done) {
    return (
      <p ref={liveRef} tabIndex={-1} className="confirm" aria-live="polite">
        {done}
      </p>
    );
  }

  return (
    <form method="get" action={formAction} noValidate onSubmit={onSubmit}>
      {(["name", "phone", "zip"] as const).map((name) => {
        const id = `${base}-${name}`;
        const err = errors[name];
        return (
          <div className="field" key={name}>
            <label htmlFor={id}>{name === "zip" ? "ZIP" : name === "phone" ? "Phone" : "Name"}</label>
            <input
              id={id}
              name={name}
              type={name === "phone" ? "tel" : "text"}
              required
              autoComplete={name === "phone" ? "tel" : name === "zip" ? "postal-code" : "name"}
              aria-invalid={err ? true : undefined}
              aria-describedby={err ? `${id}-error` : undefined}
            />
            {err ? <p id={`${id}-error`} className="field-error">{err}</p> : null}
          </div>
        );
      })}
      <fieldset className="choice" aria-describedby={errors.month ? `${base}-month-error` : undefined}>
        <legend>Start month</legend>
        <div className="segment">
          {months.map((month) => (
            <label key={month} className="seg">
              <input type="radio" name="month" value={month} required />
              <span>{month}</span>
            </label>
          ))}
        </div>
        {errors.month ? <p id={`${base}-month-error`} className="field-error">{errors.month}</p> : null}
      </fieldset>
      <p className="form-note">Demo form: nothing is sent and no one is booked or charged.</p>
      <button className="btn btn-primary" type="submit">
        Join Strathvane Roof Care
      </button>
    </form>
  );
}
