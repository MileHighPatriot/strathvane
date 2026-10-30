import type { Metadata } from "next";
import Link from "next/link";
import { Faq } from "@/components/Faq";
import { BookForm, FinanceForm } from "@/components/forms";
import { nextDays } from "@/lib/days";
import { pageMeta } from "@/lib/meta";

export const metadata: Metadata = pageMeta(
  "Book a Roof Inspection | Strathvane",
  "Pick a time that works and we'll inspect your roof, photograph what we find, and walk you through it.",
  "/book/",
);

const financeFaq = [
  { q: "Who's the lender?", a: "None. This is a demo, and no lender is connected." },
  { q: "Does checking hurt my credit?", a: "Depends on the lender. Ask before you apply." },
  { q: "Can I pay off early?", a: "Depends on the lender's terms." },
] as const;

export default function BookPage() {
  const days = nextDays(14);
  return (
    <>
      <section className="section">
        <div className="section-inner split">
          <div>
            <h1>Book your roof inspection</h1>
            <h2>Pick a time</h2>
            <BookForm days={days} />
          </div>
          <ul className="clean">
            <li>You get an inspection window, not an all-day wait.</li>
            <li>We inspect with a drone and by hand before we quote.</li>
            <li>You get a written price before any work starts.</li>
          </ul>
        </div>
      </section>
      <section className="section" id="financing">
        <div className="section-inner pair">
          <article className="card">
            <h2>Pay over time</h2>
            <p className="price">As low as $[X]/mo for [N] months (sample)</p>
            <p className="fine">Subject to credit approval. Terms vary. Sample only; no lender is connected.</p>
            <FinanceForm />
          </article>
          <article className="card">
            <h2>Strathvane Roof Care (concept)</h2>
            <p>One drone checkup a year to catch problems early, plus a few perks when you need us.</p>
            <ul className="clean">
              <li>A yearly drone inspection with a photo report</li>
              <li>A free check after any big hail storm</li>
              <li>[X]% off repairs (sample)</li>
              <li>Reminder text before your yearly check</li>
            </ul>
            <p className="price">$[X]/yr (sample; the client sets real prices)</p>
            <p>
              <Link className="btn btn-primary" href="/membership/">See Strathvane Roof Care</Link>
            </p>
            <p className="fine">Example plan for a concept site. Not a real offer.</p>
          </article>
        </div>
      </section>
      <section className="section">
        <div className="section-inner">
          <Faq items={financeFaq} />
        </div>
      </section>
    </>
  );
}
