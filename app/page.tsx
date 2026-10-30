import type { Metadata } from "next";
import Link from "next/link";
import { BeforeAfter, ScrollCue, Tracker, ZipCheck } from "@/components/Bits";
import { Estimator } from "@/components/Estimator";
import { Faq } from "@/components/Faq";
import { FinanceForm, PickTimeForm } from "@/components/forms";
import { HeroCanvas } from "@/components/hero/HeroCanvas";
import { Icon, type IconName } from "@/components/Icons";
import { Photo } from "@/components/Photo";
import { Rich } from "@/components/Rich";
import { SafetyBlock } from "@/components/SafetyBlock";
import { emergencyPaths, residential } from "@/lib/catalog";
import { pageMeta } from "@/lib/meta";
import { asset, phoneHref } from "@/lib/paths";

export const metadata: Metadata = pageMeta(
  "Strathvane | Roofing Done Right, Backed by Data",
  "Strathvane replaces and repairs roofs with drone inspections, clear photo reports, and crews who clean up every nail. Get a free estimate.",
  "/",
);

const faqs = [
  {
    q: "How do I know if it's an emergency?",
    a: 'Use the "Is this an emergency?" checklist above. For a sagging ceiling, water near wiring, or a tree through the roof, get out and Dial 911.',
  },
  {
    q: "Will I get a price before work starts?",
    a: "Yes. You'll get a range first, then a written, itemized price before any work begins.",
  },
  {
    q: "Do I have to be home for the drone inspection?",
    a: "No. We'll text you when it starts and send the photo report when it's done.",
  },
  {
    q: "Do you help with hail claims?",
    a: "We document the damage with photos and measurements you can share with your insurer. Your insurer decides the claim.",
  },
  {
    q: "Do you handle permits?",
    a: "When the work needs one, we apply for it and book the inspection.",
  },
  {
    q: "Is this a real company?",
    a: "No. Strathvane is a concept project built to show what a roofing contractor's site can do.",
  },
] as const;

const materials = [
  ["mat-arch", "Architectural shingle", "The most common roof in the Denver metro. Layered, good looking, and quick to install."],
  ["mat-impact", "Impact-resistant shingle", "Rated to stand up to hail better, and some insurers give a discount for it. (Example. Check with your insurer.)"],
  ["mat-metal", "Standing seam metal", "Long panels with hidden fasteners. Sheds snow and lasts a long time."],
  ["mat-tile", "Concrete tile", "Heavy and durable. Needs a roof deck built to carry it."],
] as const;

const process: { icon: IconName; title: string; body: string }[] = [
  { icon: "phone", title: "Call", body: "Tell us what's going on. We give you a price range and an inspection window." },
  { icon: "drone", title: "Inspect", body: "A drone inspection and a hands-on check, with a photo report." },
  { icon: "tape", title: "Quote", body: "You get a written, itemized price before any work starts." },
  { icon: "check", title: "Done", body: "Old roof off, new roof on, magnet sweep for nails, final walkthrough with you." },
];

const hotspots = [
  ["Shingles", "Hail hits, cracks, and lifted tabs, photographed up close."],
  ["Flashing", "The metal around chimneys, walls, and skylights, where most leaks start."],
  ["Vents", "Ridge and box vents checked for dents and gaps."],
  ["Gutters", "Dents, sagging runs, and granule buildup."],
] as const;

const reviews = [
  '"The drone report showed the hail hits on our roof before anyone climbed up. The new roof went on in two days." Homeowner, Lakewood (sample)',
  '"They told us the range up front, and the final bill landed inside it." Homeowner, Westminster (sample)',
  '"The crew swept the whole yard with a magnet. We didn\'t find a single nail." Homeowner, Centennial (sample)',
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "RoofingContractor",
  name: "Strathvane",
  url: "https://milehighpatriot.github.io/strathvane/",
  telephone: "+1-555-555-0142",
  email: "hello@strathvane.example",
  areaServed: "Denver metro, Colorado",
  description: "Concept project: Strathvane is a fictional Colorado roofing contractor and not a real company.",
  subjectOf: {
    "@type": "FAQPage",
    mainEntity: faqs.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  },
};

export default function HomePage() {
  return (
    <>
      <link rel="preload" as="image" href={asset("/brand/hero-800.webp")} fetchPriority="high" />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <ScrollCue />
      <section className="hero on-dark">
        <div className="hero-media">
          <div className="hero-blur" aria-hidden="true" />
          <img
            className="hero-photo"
            src={asset("/brand/hero-1200.webp")}
            srcSet={`${asset("/brand/hero-240.webp")} 240w, ${asset("/brand/hero-800.webp")} 800w, ${asset("/brand/hero-1200.webp")} 1200w, ${asset("/brand/hero-1600.webp")} 1600w, ${asset("/brand/hero-2048.webp")} 2048w`}
            sizes="100vw"
            width={1200}
            height={675}
            alt="A drone scan line sweeping across glowing roof planes on a dark house outline, Strathvane concept"
            fetchPriority="high"
            decoding="async"
          />
          <div className="hero-scrim" aria-hidden="true" />
          <svg className="hero-lines" viewBox="0 0 1200 675" width="1200" height="675" aria-hidden="true">
            <path d="M180 430 L600 220 L1020 430" strokeWidth="2" />
            <path d="M260 470 L600 280 L940 470" strokeWidth="1.5" />
            <path d="M600 220 V470" strokeWidth="1.5" />
            <path className="draw" pathLength={1} d="M220 400 C 400 300, 760 300, 980 410" strokeWidth="1.75" />
            <path d="M360 330 V360 M480 280 V310 M720 280 V310 M860 340 V370" strokeWidth="1.5" />
          </svg>
          <HeroCanvas />
        </div>
        <div className="hero-copy">
          <p className="eyebrow">Concept project · Colorado roofing, Denver metro</p>
          <h1>Roofs measured from the sky and built right on the ground.</h1>
          <p>Roof replacement, storm and hail repair, and inspections for Denver-metro homes and businesses, with a written price before work starts.</p>
          <div className="actions">
            <a className="btn btn-primary" href={phoneHref}>
              Call (555) 555-0142
            </a>
            <Link className="btn btn-ghost" href="/services/">
              Find a service
            </Link>
          </div>
          <p>
            <Link className="text-link" href="/estimate/">
              Get a free estimate
            </Link>
          </p>
          <div className="trust">
            <span><Icon name="shield" /> Sample license # (not real)</span>
            <span><Icon name="check" /> Insured</span>
            <span><Icon name="drone" /> Drone inspection on every job (example)</span>
          </div>
        </div>
      </section>

      <section className="section" id="finder">
        <div className="section-inner">
          <h2>What does your roof need?</h2>
          <div className="finder home-finder" data-cue>
            <fieldset className="choice">
              <legend>Is anything unsafe or leaking right now?</legend>
              <div className="segment">
                <label className="seg">
                  <input type="radio" name="safe" />
                  <span>Yes</span>
                </label>
                <label className="seg">
                  <input type="radio" name="safe" id="safe-no" defaultChecked />
                  <span>No</span>
                </label>
              </div>
            </fieldset>
            <div className="tabs">
              <label className="seg">
                <input type="radio" name="htab" id="tab-e" />
                <span>Emergency</span>
              </label>
              <label className="seg">
                <input type="radio" name="htab" id="tab-r" defaultChecked />
                <span>Residential</span>
              </label>
            </div>
            <div className="finder-grid">
              <div className="path path-e">
                {emergencyPaths.map((item) => (
                  <div key={item.id}>
                    <label className="node">
                      <input type="radio" name="pick" id={`pick-${item.id}`} />
                      <span className="key">{item.key}</span>
                      <span>{item.title}</span>
                    </label>
                    <article className={`result result-${item.id}`}>
                      <p>
                        {item.title} · Typical scope: <Rich text={item.body} />
                      </p>
                      <div className="actions">
                        <Link className="btn btn-ghost" href="/estimate/">See a price range</Link>
                        <Link className="btn btn-primary" href="/book/">Book an inspection</Link>
                      </div>
                    </article>
                  </div>
                ))}
              </div>
              <div className="path path-r">
                {residential.map((item, index) => (
                  <div key={item.id}>
                    <label className="node">
                      <input type="radio" name="pick" id={`pick-${item.id}`} defaultChecked={index === 0} />
                      <span className="key">{item.key}</span>
                      <span>{item.title}</span>
                    </label>
                    <article className={`result result-${item.id}`}>
                      <p>
                        {item.title} · Typical scope: {item.body}
                      </p>
                      {item.price ? <p>{item.price}</p> : null}
                      <div className="actions">
                        <Link className="btn btn-ghost" href="/estimate/">See a price range</Link>
                        <Link className="btn btn-primary" href="/book/">Book an inspection</Link>
                      </div>
                    </article>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <SafetyBlock />

      <section className="section">
        <div className="section-inner">
          <div className="proof">
            <article className="card">10-year workmanship warranty (example)</article>
            <article className="card">Photo report after every inspection (example)</article>
            <article className="card">Licensed and insured · Sample license # (not real)</article>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="section-inner split">
          <div>
            <h2>See a price range before anyone climbs a ladder.</h2>
            <Estimator variant="teaser" />
            <p>
              <Link className="btn btn-primary" href="/estimate/">Open the full estimator</Link>
            </p>
          </div>
        </div>
      </section>

      <section className="section on-dark" id="drone-inspection">
        <div className="section-inner split">
          <div className="sticky-col">
            <h2>A drone inspection on every roof</h2>
            <Photo name="drone" sizes="(min-width: 768px) 420px, 100vw" />
            <div className="diagram">
              <svg viewBox="0 0 640 360" width="640" height="360" aria-hidden="true">
                <path d="M80 250 L320 90 L560 250 V300 H80 Z" />
                <path d="M320 90 V250" />
                <path className="draw" pathLength={1} d="M120 210 C 240 140, 420 140, 540 220" />
              </svg>
              {hotspots.map(([title, tip]) => (
                <button key={title} type="button" className="hot">
                  {title}
                  <span className="tip">{tip}</span>
                </button>
              ))}
            </div>
          </div>
          <div data-steps>
            <p data-step="fly" className="layer layer-fly"><strong>Fly.</strong> A drone photographs every plane, ridge, and valley, so no one has to walk a fragile roof to find the damage.</p>
            <p data-step="map" className="layer layer-map"><strong>Map.</strong> Each photo is pinned to its spot on a roof diagram, so you can see exactly where the problem is.</p>
            <p data-step="report" className="layer layer-report"><strong>Report.</strong> You get a photo report you can read, with what we found and what it means.</p>
            <p>
              <Link className="btn btn-primary" href="/book/">Book a drone inspection</Link>
            </p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="section-inner split">
          <div>
            <h2>Measured by satellite before we arrive</h2>
            <ul className="clean">
              <li>Roof area in squares, plane by plane, so the material order is right the first time</li>
              <li>Pitch for every plane, which changes the labor and the safety gear</li>
              <li>Ridge, valley, and eave lengths, so trim and flashing are on the truck</li>
            </ul>
            <p className="fine">Sample measurements for a concept site.</p>
          </div>
          <svg className="sat" data-cue viewBox="0 0 640 420" width="640" height="420" aria-hidden="true">
            <path className="draw" pathLength={1} d="M80 300 L240 140 L400 140 L560 300 Z" />
            <path className="draw" pathLength={1} d="M240 140 V300 M400 140 V300 M80 300 H560" />
            <path d="M120 270 H200 M460 270 H540 M300 180 V250" />
          </svg>
        </div>
      </section>

      <section className="section on-dark">
        <div className="section-inner">
          <h2>Pick the roof, not just the color</h2>
          <div className="materials">
            <div className="segment">
              {materials.map(([id, label], index) => (
                <label key={id} className="seg">
                  <input type="radio" name="mat" id={id} defaultChecked={index === 0} />
                  <span>{label}</span>
                </label>
              ))}
            </div>
            {materials.map(([id, label, body]) => (
              <article key={id} className={`mat mat-${id.replace("mat-", "")}`}>
                <p><strong>{label}</strong></p>
                <p>{body}</p>
                {id === "mat-metal" ? <Photo name="install" sizes="(min-width: 768px) 420px, 100vw" className="mat-photo" /> : (
                  <svg viewBox="0 0 320 80" width="320" height="80" aria-hidden="true">
                    <path d="M10 60 L80 20 H240 L310 60" fill="none" stroke="currentColor" strokeWidth="1.75" />
                  </svg>
                )}
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="section-inner rail" data-cue>
          {process.map((step) => (
            <article key={step.title}>
              <div className="rail-fill" />
              <p><Icon name={step.icon} /> {step.title}</p>
              <p>{step.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section on-dark">
        <div className="section-inner">
          <h2>Know where your roof job is.</h2>
          <p>Every job gets a tracker you can check from your phone.</p>
          <Tracker />
          <p className="fine">Sample job. Times and numbers are examples.</p>
        </div>
      </section>

      <section className="section">
        <div className="section-inner">
          <BeforeAfter />
          <p className="fine">Sample images for a concept site. Not real jobs.</p>
        </div>
      </section>

      <section className="section on-dark">
        <div className="section-inner">
          <div className="swipe">
            {reviews.map((review) => (
              <article key={review} className="card glass">
                <p>Sample review. Strathvane is a concept company.</p>
                <p>{review}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="section-inner pair">
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
          <article className="card" id="financing-home">
            <h2>Pay over time</h2>
            <p className="price">As low as $[X]/mo for [N] months (sample)</p>
            <p className="fine">Subject to credit approval. Terms vary. Sample only; no lender is connected.</p>
            <FinanceForm />
          </article>
        </div>
      </section>

      <section className="section on-dark" id="storm-map">
        <div className="section-inner split">
          <div>
            <h2>Did the storm hit your roof?</h2>
            <p>Strathvane works across the Denver metro.</p>
            <Photo name="storm" sizes="(min-width: 768px) 50vw, 100vw" />
            <p className="towns">Denver · Aurora · Lakewood · Arvada · Westminster · Thornton · Centennial · Littleton · Englewood · Golden (example area)</p>
            <p className="fine">Storm paths on this map are examples. A real site would use live weather data.</p>
          </div>
          <div>
            <svg id="storm-svg" className="storm-svg" viewBox="0 0 640 420" width="640" height="420" role="img" aria-label="Sample storm paths (not real data)">
              <circle className="ring" cx="300" cy="210" r="64" />
              <circle className="ring" cx="300" cy="210" r="120" />
              <circle className="ring" cx="300" cy="210" r="176" />
              <path className="swath" d="M20 90 C 180 140, 360 40, 630 120" />
              <path className="swath" d="M10 210 C 200 160, 400 250, 640 190" />
              <path className="swath" d="M40 320 C 220 280, 420 360, 620 300" />
              <text x="24" y="36">Sample storm paths (not real data)</text>
            </svg>
            <ZipCheck />
          </div>
        </div>
      </section>

      <section className="section">
        <div className="section-inner split">
          <div className="plan">
            <Photo name="roofline" sizes="(min-width: 768px) 50vw, 100vw" />
            <div className="scrim" />
            <div className="plan-copy on-dark">
              <h2>Book an inspection</h2>
              <p>Name · Phone · What does your roof need?</p>
            </div>
          </div>
          <PickTimeForm />
        </div>
      </section>

      <section className="section">
        <div className="section-inner">
          <h2>Questions before you call</h2>
          <Faq items={faqs} />
        </div>
      </section>
    </>
  );
}
