import type { Metadata } from "next";
import Link from "next/link";
import { FlipStage } from "@/components/Bits";
import { EmptyForm } from "@/components/forms";
import { Faq } from "@/components/Faq";
import { Photo } from "@/components/Photo";
import { SafetyBlock } from "@/components/SafetyBlock";
import { commercial, residential, type Card } from "@/lib/catalog";
import { pageMeta } from "@/lib/meta";
import { phoneHref } from "@/lib/paths";

export const metadata: Metadata = pageMeta(
  "Roofing Services | Strathvane",
  "Roof replacement, storm and hail repair, inspections, gutters, and ventilation. Every job starts with a drone inspection and a photo report you can read.",
  "/services/",
);

const faqs = [
  {
    q: "Can I get a price before you come out?",
    a: "You'll get a range on the phone or from the estimator, and a written price before any work starts.",
  },
  {
    q: "Repair or replace?",
    a: "It depends on the roof's condition, the damage, and the deck. The drone report shows you what we see, and we tell you straight.",
  },
  {
    q: "Do you work with property managers?",
    a: "Yes. One contact for every building, and a written scope for each job.",
  },
] as const;

function ServiceCard({ card, commercialCard = false }: { card: Card; commercialCard?: boolean }) {
  return (
    <article id={card.id} className={commercialCard ? "card c-card flip-card" : "card r-card flip-card"}>
      <p className="key">{card.key}</p>
      <p><strong>{card.title}</strong></p>
      {card.shot ? <Photo name={card.shot} sizes="(min-width: 768px) 320px, 100vw" /> : null}
      <p>{card.body}</p>
      {card.price ? <p>{card.price}</p> : null}
      {commercialCard ? (
        <div className="actions">
          <Link className="btn btn-primary" href="/book/">Request a walkthrough</Link>
          <a className="btn btn-ghost" href={phoneHref}>Call (555) 555-0142</a>
        </div>
      ) : (
        <div className="actions">
          <Link className="btn btn-primary" href="/book/">Book</Link>
          <Link className="btn btn-ghost" href="/estimate/">Estimate</Link>
        </div>
      )}
    </article>
  );
}

export default function ServicesPage() {
  return (
    <>
      <section className="section">
        <div className="section-inner">
          <h1>Roofs built right, inspected with the latest tech</h1>
          <p>Is anything unsafe or leaking right now?</p>
          <div className="segment">
            {residential.map((card) => (
              <a key={card.id} className="seg" href={`#${card.id}`}>
                <span>{card.title}</span>
              </a>
            ))}
          </div>
          <div className="actions">
            <a className="btn btn-primary" href="#emergency-check">Yes</a>
            <a className="btn btn-ghost" href="#catalog">No</a>
          </div>
        </div>
      </section>
      <SafetyBlock callFirst />
      <section className="section" id="catalog">
        <div className="section-inner">
          <FlipStage>
            <div className="segment">
              <label className="seg">
                <input type="radio" name="audience" defaultChecked />
                <span>Home</span>
              </label>
              <label className="seg">
                <input type="radio" name="audience" id="biz" />
                <span>Business</span>
              </label>
            </div>
            <div className="pair">
              {residential.map((card) => (
                <ServiceCard key={card.id} card={card} />
              ))}
              {commercial.map((card) => (
                <ServiceCard key={card.id} card={card} commercialCard />
              ))}
            </div>
          </FlipStage>
          <p>Not listed? Tell us what&apos;s going on and we&apos;ll call you back.</p>
          <EmptyForm />
          <Faq items={faqs} />
        </div>
      </section>
    </>
  );
}
