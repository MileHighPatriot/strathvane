"use client";

import Link from "next/link";
import { createContext, useContext, useEffect, useId, useRef, useState, type FormEvent, type ReactNode } from "react";
import { formAction } from "@/lib/paths";

const Errors = createContext<Record<string, string>>({});

const messages: Record<string, string> = {
  name: "Enter your name.",
  phone: "Enter your phone number.",
  zip: "Enter your ZIP.",
  need: "Tell us what your roof needs.",
  service: "Choose a service.",
  day: "Choose a day.",
  time: "Choose a time.",
  month: "Choose a start month.",
  best: "Choose a time.",
};

export function Field({
  name,
  label,
  type = "text",
  required = false,
  autoComplete,
}: {
  name: string;
  label: string;
  type?: string;
  required?: boolean;
  autoComplete?: string;
}) {
  const errors = useContext(Errors);
  const id = useId();
  const err = errors[name];
  const errId = `${id}-error`;
  return (
    <div className="field">
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        name={name}
        type={type}
        required={required}
        autoComplete={autoComplete}
        aria-invalid={err ? true : undefined}
        aria-describedby={err ? errId : undefined}
      />
      {err ? (
        <p id={errId} className="field-error">
          {err}
        </p>
      ) : null}
    </div>
  );
}

export function Choice({
  name,
  legend,
  options,
  required = false,
}: {
  name: string;
  legend: string;
  options: readonly string[];
  required?: boolean;
}) {
  const errors = useContext(Errors);
  const err = errors[name];
  const errId = `${name}-choice-error`;
  return (
    <fieldset className="choice" aria-describedby={err ? errId : undefined}>
      <legend>{legend}</legend>
      <div className="segment">
        {options.map((option) => (
          <label key={option} className="seg">
            <input type="radio" name={name} value={option} required={required} />
            <span>{option}</span>
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

function readErrors(form: HTMLFormElement) {
  const next: Record<string, string> = {};
  const seen = new Set<string>();
  form.querySelectorAll<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>("input, textarea, select").forEach((el) => {
    if (el instanceof HTMLInputElement && el.type === "radio") {
      if (seen.has(el.name)) return;
      seen.add(el.name);
      const group = form.querySelectorAll<HTMLInputElement>(`input[type="radio"][name="${CSS.escape(el.name)}"]`);
      const must = Array.from(group).some((item) => item.required);
      const picked = Array.from(group).some((item) => item.checked);
      if (must && !picked) next[el.name] = messages[el.name] ?? "Choose one option.";
      return;
    }
    if (el.required && !el.value.trim()) next[el.name] = messages[el.name] ?? "This field is required.";
  });
  return next;
}

export function DemoForm({
  children,
  confirm,
  onSuccess,
  onReady,
}: {
  children: ReactNode;
  confirm: string;
  onSuccess?: (data: FormData) => string;
  onReady?: (form: HTMLFormElement) => void;
}) {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [done, setDone] = useState("");
  const liveRef = useRef<HTMLParagraphElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (done) liveRef.current?.focus();
  }, [done]);

  useEffect(() => {
    if (formRef.current && onReady) onReady(formRef.current);
  }, [onReady]);

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const found = readErrors(event.currentTarget);
    setErrors(found);
    if (Object.keys(found).length) return;
    const data = new FormData(event.currentTarget);
    setDone(onSuccess ? onSuccess(data) : confirm);
  }

  if (done) {
    return (
      <p ref={liveRef} tabIndex={-1} className="confirm" aria-live="polite">
        {done}
      </p>
    );
  }

  return (
    <Errors.Provider value={errors}>
      <form ref={formRef} method="get" action={formAction} onSubmit={onSubmit} noValidate>
        {children}
      </form>
    </Errors.Provider>
  );
}

export function PickTimeForm() {
  const [errors, setErrors] = useState<Record<string, string>>({});
  return (
    <Errors.Provider value={errors}>
      <form
        method="get"
        action={formAction}
        noValidate
        onSubmit={(event) => {
          event.preventDefault();
          const found = readErrors(event.currentTarget);
          setErrors(found);
          if (Object.keys(found).length) return;
          const data = new FormData(event.currentTarget);
          const q = new URLSearchParams({
            name: String(data.get("name") ?? ""),
            phone: String(data.get("phone") ?? ""),
            need: String(data.get("need") ?? ""),
          });
          window.location.href = `/strathvane/book/?${q.toString()}`;
        }}
      >
        <Field name="name" label="Name" required autoComplete="name" />
        <Field name="phone" label="Phone" type="tel" required autoComplete="tel" />
        <Field name="need" label="What does your roof need?" required />
        <p className="form-note">Demo form: nothing is sent and no one is booked or charged.</p>
        <button className="btn btn-primary" type="submit">
          Pick a time
        </button>
      </form>
    </Errors.Provider>
  );
}

const services = [
  "Roof replacement",
  "Storm and hail repair",
  "Leak repair",
  "Inspection",
  "Gutters",
  "Ventilation",
  "Skylights and flashing",
];

const times = ["8 to 10 AM", "10 AM to 12 PM", "12 to 2 PM", "2 to 4 PM"];

function prefillBook(form: HTMLFormElement) {
  const q = new URLSearchParams(window.location.search);
  const name = q.get("name");
  const phone = q.get("phone");
  const need = q.get("need");
  if (name) {
    const input = form.querySelector<HTMLInputElement>('input[name="name"]');
    if (input) input.value = name;
  }
  if (phone) {
    const input = form.querySelector<HTMLInputElement>('input[name="phone"]');
    if (input) input.value = phone;
  }
  if (need) {
    const select = form.querySelector<HTMLSelectElement>('select[name="service"]');
    const notes = form.querySelector<HTMLTextAreaElement>('textarea[name="notes"]');
    if (select && services.includes(need)) select.value = need;
    else if (notes) notes.value = need;
  }
}

export function BookForm({ days }: { days: { value: string; wd: string; day: string; month: string }[] }) {
  return (
    <DemoForm
      confirm="Demo booking: [Service], [day], inspection window [time] (example). On a real site, this is where you'd get a text before the drone goes up. Nothing was sent, and no one is booked or charged."
      onReady={prefillBook}
      onSuccess={(data) =>
        `Demo booking: ${data.get("service")}, ${data.get("day")}, inspection window ${data.get("time")} (example). On a real site, this is where you'd get a text before the drone goes up. Nothing was sent, and no one is booked or charged.`
      }
    >
      <div className="field">
        <label htmlFor="book-service">Service</label>
        <select id="book-service" name="service" required defaultValue={services[0]}>
          {services.map((service) => (
            <option key={service}>{service}</option>
          ))}
        </select>
      </div>
      <fieldset className="choice">
        <legend>Date</legend>
        <div className="days">
          {days.map((day, index) => (
            <label key={day.value} className="day">
              <input type="radio" name="day" value={day.value} required={index === 0} defaultChecked={index === 0} />
              <span>
                <small>{day.wd}</small>
                {day.day}
                <small>{day.month}</small>
              </span>
            </label>
          ))}
        </div>
      </fieldset>
      <Choice name="time" legend="Time" options={times} required />
      <Field name="name" label="Name" required autoComplete="name" />
      <Field name="phone" label="Phone" type="tel" required autoComplete="tel" />
      <div className="field">
        <label htmlFor="book-notes">Notes</label>
        <textarea id="book-notes" name="notes" rows={3} />
      </div>
      <p className="form-note">Demo form: nothing is sent and no one is booked or charged.</p>
      <button className="btn btn-primary" type="submit">
        Book my inspection
      </button>
    </DemoForm>
  );
}

const demoLine = "Demo only. Nothing was sent, and no one is booked or charged.";
const bestTimes = ["8 to 10 AM", "10 AM to 12 PM", "12 to 2 PM", "2 to 4 PM"];

export function FinanceForm() {
  return (
    <DemoForm confirm={demoLine}>
      <Field name="name" label="Name" required autoComplete="name" />
      <Field name="phone" label="Phone" type="tel" required autoComplete="tel" />
      <p className="form-note">Demo form: nothing is sent and no one is booked or charged.</p>
      <button className="btn btn-primary" type="submit">
        Check options
      </button>
    </DemoForm>
  );
}

export function SendForm() {
  return (
    <DemoForm confirm={demoLine}>
      <Field name="name" label="Name" required autoComplete="name" />
      <Field name="phone" label="Phone" type="tel" required autoComplete="tel" />
      <Field name="zip" label="ZIP" required autoComplete="postal-code" />
      <Choice name="best" legend="Best time" options={bestTimes} required />
      <p className="form-note">Demo form: nothing is sent and no one is booked or charged.</p>
      <button className="btn btn-primary" type="submit">
        Book an inspection
      </button>
      <p>
        <Link className="text-link" href="/book/#financing">See financing</Link>
      </p>
    </DemoForm>
  );
}

export function EmptyForm() {
  return (
    <DemoForm confirm={demoLine}>
      <Field name="name" label="Name" required autoComplete="name" />
      <Field name="phone" label="Phone" type="tel" required autoComplete="tel" />
      <Field name="need" label="What does your roof need?" required />
      <p className="form-note">Demo form: nothing is sent and no one is booked or charged.</p>
      <button className="btn btn-primary" type="submit">
        Not listed? Tell us what&apos;s going on and we&apos;ll call you back.
      </button>
    </DemoForm>
  );
}
