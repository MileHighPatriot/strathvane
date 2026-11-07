"use client";

import { type FormEvent, type ReactNode, useId, useRef, useState } from "react";
import { formNote, validation } from "@/lib/content";
import { asset } from "@/lib/site";

export type Field =
  | { kind: "name" | "phone" | "zip"; label: string; name: string; defaultValue?: string }
  | { kind: "notes"; label: string; name: string; defaultValue?: string }
  | { kind: "select"; label: string; name: string; options: string[]; defaultValue?: string }
  | { kind: "chips"; label: string; name: string; options: string[] };

/**
 * Demo form. With JS: validates inline, then shows the confirmation in place, focuses it, and announces it.
 * Without JS: a plain GET to /strathvane/demo-sent/. Nothing is ever sent anywhere.
 */
export default function DemoForm({
  fields,
  submit,
  confirmation,
  onValid,
  className = "",
  children,
}: {
  fields: Field[];
  submit: string;
  /** Text shown after a valid submit; gets the form values when it needs them. */
  confirmation: string | ((values: Record<string, string>) => string);
  /** Optional: take over after validation (for example, go to the book page). Return true to skip the confirmation. */
  onValid?: (values: Record<string, string>) => boolean;
  className?: string;
  children?: ReactNode;
}) {
  const id = useId();
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [done, setDone] = useState<string | null>(null);
  const doneRef = useRef<HTMLParagraphElement>(null);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const values: Record<string, string> = {};
    const errs: Record<string, string> = {};
    for (const f of fields) {
      const v = String(data.get(f.name) ?? "").trim();
      values[f.name] = v;
      if (f.kind === "name" && !v) errs[f.name] = validation.name;
      if (f.kind === "phone" && v.replace(/\D/g, "").length !== 10) errs[f.name] = validation.phone;
      if (f.kind === "zip" && !/^\d{5}$/.test(v)) errs[f.name] = validation.zip;
      if ((f.kind === "select" || f.kind === "chips") && !v) errs[f.name] = validation.choice;
    }
    setErrors(errs);
    const firstBad = fields.find((f) => errs[f.name]);
    if (firstBad) {
      const el = e.currentTarget.querySelector<HTMLElement>(`[name="${firstBad.name}"]`);
      el?.focus();
      return;
    }
    if (onValid?.(values)) return;
    setDone(typeof confirmation === "function" ? confirmation(values) : confirmation);
    requestAnimationFrame(() => doneRef.current?.focus());
  };

  return (
    <div className={`demo-form ${className}`}>
      {done ? null : (
        <form method="get" action={asset("/demo-sent/")} noValidate onSubmit={onSubmit}>
          {children}
          {fields.map((f) => {
            const fid = `${id}-${f.name}`;
            const err = errors[f.name];
            const errId = `${fid}-err`;
            const describedBy = err ? errId : undefined;
            if (f.kind === "chips") {
              return (
                <fieldset key={f.name} className="field" aria-describedby={describedBy}>
                  <legend className="field-label">{f.label}</legend>
                  <div className="seg seg-wrap">
                    {f.options.map((o) => (
                      <label key={o} className="seg-opt">
                        <input type="radio" name={f.name} value={o} />
                        <span>{o}</span>
                      </label>
                    ))}
                  </div>
                  {err ? (
                    <p id={errId} className="field-error">
                      {err}
                    </p>
                  ) : null}
                </fieldset>
              );
            }
            return (
              <div key={f.name} className="field">
                <label htmlFor={fid} className="field-label">
                  {f.label}
                </label>
                {f.kind === "select" ? (
                  <select
                    id={fid}
                    name={f.name}
                    className="input"
                    defaultValue={f.defaultValue ?? ""}
                    aria-invalid={err ? true : undefined}
                    aria-describedby={describedBy}
                  >
                    <option value="" disabled>
                      {f.label}
                    </option>
                    {f.options.map((o) => (
                      <option key={o} value={o}>
                        {o}
                      </option>
                    ))}
                  </select>
                ) : f.kind === "notes" ? (
                  <textarea
                    id={fid}
                    name={f.name}
                    className="input textarea"
                    rows={3}
                    defaultValue={f.defaultValue}
                  />
                ) : (
                  <input
                    id={fid}
                    name={f.name}
                    className="input"
                    defaultValue={f.defaultValue}
                    type={f.kind === "phone" ? "tel" : "text"}
                    autoComplete={f.kind === "name" ? "name" : f.kind === "phone" ? "tel" : "postal-code"}
                    inputMode={f.kind === "zip" ? "numeric" : undefined}
                    maxLength={f.kind === "zip" ? 5 : undefined}
                    aria-invalid={err ? true : undefined}
                    aria-describedby={describedBy}
                  />
                )}
                {err ? (
                  <p id={errId} className="field-error">
                    {err}
                  </p>
                ) : null}
              </div>
            );
          })}
          <p className="form-note">{formNote}</p>
          <button type="submit" className="btn btn-primary btn-block">
            {submit}
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
