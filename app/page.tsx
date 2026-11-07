import Link from "next/link";
import { preload } from "react-dom";
import { CallButton, EmergencyChecklist, FaqList, RoofCareCard } from "@/components/Blocks";
import { DroneStory } from "@/components/Drone";
import { DroneDiagram } from "@/components/DroneDiagram";
import { baArt, StormMap } from "@/components/Art";
import { EstimatorTeaser } from "@/components/Estimator";
import HeroPoster, { heroSizes, heroSrcSet } from "@/components/HeroPoster";
import Icon from "@/components/Icon";
import { BeforeAfter, BookingCta, JobTracker } from "@/components/Interactive";
import Photo from "@/components/Photo";
import { FinancingCard, Materials, ProcessRail, ProofStrip, Reviews, SatelliteDrawing } from "@/components/Sections";
import ServiceFinder from "@/components/ServiceFinder";
import { homeFaq } from "@/lib/content";
import { pageMeta } from "@/lib/meta";
import { asset, site } from "@/lib/site";

export const metadata = pageMeta({
  title: "Strathvane | Roofing Done Right, Backed by Data",
  description:
    "Strathvane replaces and repairs roofs with drone inspections, clear photo reports, and crews who clean up every nail. Get a free estimate.",
  path: "/",
});

const business = {
  "@context": "https://schema.org",
  "@type": "RoofingContractor",
  name: "Strathvane",
  url: site.url,
  telephone: site.phoneSchema,
  email: site.email,
  areaServed: "Denver metro, Colorado",
  description: "Concept project: Strathvane is a fictional Colorado roofing contractor and not a real company.",
};

const faqLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: homeFaq.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.dial911 ? `${f.a} Dial 911.` : f.a },
  })),
};

export default function Home() {
  preload(asset("/brand/hero-1200.webp"), {
    as: "image",
    fetchPriority: "high",
    imageSrcSet: heroSrcSet,
    imageSizes: heroSizes,
  });

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(business) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />

      {/* S1 Hero */}
      <section className="hero" aria-labelledby="hero-title">
        <HeroPoster />
        <div className="wrap hero-inner">
          <div className="hero-copy">
            <p className="eyebrow eyebrow-hero">Concept project · Colorado roofing, Denver metro</p>
            <h1 id="hero-title">Roofs measured from the sky and built right on the ground.</h1>
            <p className="hero-sub">
              Roof replacement, storm and hail repair, and inspections for Denver-metro homes and businesses, with a
              written price before work starts.
            </p>
            <div className="hero-ctas">
              <CallButton className="btn-block btn-hero" />
              <div className="hero-ctas-2">
                <Link href="/services/" className="btn btn-ghost">
                  Find a service
                </Link>
                <Link href="/estimate/" className="text-cta">
                  Get a free estimate
                  <Icon name="arrow" size={18} />
                </Link>
              </div>
            </div>
            <ul className="trust">
              <li>
                <Icon name="shield" size={18} />
                Sample license # (not real)
              </li>
              <li>
                <Icon name="check" size={18} />
                Insured
              </li>
              <li>
                <Icon name="drone" size={18} />
                Drone inspection on every job (example)
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* S2 Service finder */}
      <section id="service-finder" className="section light" aria-labelledby="finder-title">
        <div className="wrap">
          <h2 id="finder-title">What does your roof need?</h2>
          <ServiceFinder />
        </div>
      </section>

      {/* S3 Is this an emergency? */}
      <EmergencyChecklist />

      {/* S4 Proof strip */}
      <ProofStrip />

      {/* S5 Estimate teaser */}
      <section className="section dark split-section" aria-labelledby="teaser-title">
        <div className="wrap split">
          <div className="split-copy">
            <h2 id="teaser-title">See a price range before anyone climbs a ladder.</h2>
            <svg viewBox="0 0 320 180" className="teaser-art" aria-hidden="true" data-reveal>
              <path d="M20 160 L160 40 L300 160" className="draw" pathLength={1} />
              <path d="M60 160 V126 M260 160 V126 M20 172 H300 M20 166 V178 M300 166 V178" className="draw draw-late" pathLength={1} />
              <path d="M160 40 V160" className="dash" />
            </svg>
          </div>
          <div className="split-tool glass">
            <EstimatorTeaser />
          </div>
        </div>
      </section>

      {/* S6 Drone inspection */}
      <section id="drone-inspection" className="section dark drone" aria-labelledby="drone-title">
        <div className="wrap">
          <h2 id="drone-title">A drone inspection on every roof</h2>
          <DroneStory />
          <DroneDiagram />
          <Link href="/book/" className="btn btn-iris">
            Book a drone inspection
          </Link>
        </div>
      </section>

      {/* S7 Satellite measurement */}
      <section className="section light sat-section" aria-labelledby="sat-title">
        <div className="wrap sat-grid-wrap">
          <SatelliteDrawing />
          <div>
            <h2 id="sat-title">Measured by satellite before we arrive</h2>
            <ul className="sat-bullets">
              <li>
                <Icon name="satellite" />
                Roof area in squares, plane by plane, so the material order is right the first time
              </li>
              <li>
                <Icon name="tape" />
                Pitch for every plane, which changes the labor and the safety gear
              </li>
              <li>
                <Icon name="ridgeVent" />
                Ridge, valley, and eave lengths, so trim and flashing are on the truck
              </li>
            </ul>
            <p className="fine">Sample measurements for a concept site.</p>
          </div>
        </div>
      </section>

      {/* S8 Materials */}
      <section className="section graphite" aria-labelledby="mat-title">
        <div className="wrap">
          <h2 id="mat-title">Pick the roof, not just the color</h2>
          <Materials />
        </div>
      </section>

      {/* S9 Process timeline */}
      <section className="section light" aria-label="Process">
        <div className="wrap">
          <ProcessRail />
        </div>
      </section>

      {/* S10 Job tracker */}
      <section className="section dark tracker-section" aria-labelledby="tracker-title">
        <div className="wrap split split-tracker">
          <div>
            <h2 id="tracker-title">Know where your roof job is.</h2>
            <p className="lead">Every job gets a tracker you can check from your phone.</p>
            <p className="fine">Sample job. Times and numbers are examples.</p>
          </div>
          <JobTracker />
        </div>
      </section>

      {/* S11 Before / after */}
      <section className="section light" aria-label="Before and after">
        <div className="wrap">
          <BeforeAfter art={baArt} />
        </div>
      </section>

      {/* S12 Reviews */}
      <section className="section dark reviews-section" aria-label="Sample reviews">
        <div className="wrap">
          <Reviews />
        </div>
      </section>

      {/* S13 Roof Care + S14 Financing, a two-up glass pair */}
      <section className="section pair-section" aria-label="Roof care and financing">
        <div className="wrap pair">
          <RoofCareCard />
          <FinancingCard />
        </div>
      </section>

      {/* S15 Hail and storm map */}
      <section id="storm-map" className="section dark storm-section" aria-labelledby="storm-title">
        <div className="storm-photo" aria-hidden="true">
          <Photo name="storm" sizes="100vw" />
        </div>
        <div className="wrap">
          <h2 id="storm-title">Did the storm hit your roof?</h2>
          <p className="lead">Strathvane works across the Denver metro.</p>
          <StormMap />
        </div>
      </section>

      {/* S16 Booking CTA */}
      <section className="section light book-band" aria-labelledby="book-title">
        <div className="wrap split">
          <div className="book-band-media">
            <Photo name="roofline" sizes="(min-width: 1024px) 560px, 100vw" />
          </div>
          <div>
            <h2 id="book-title">Book an inspection</h2>
            <BookingCta />
          </div>
        </div>
      </section>

      {/* S17 FAQ */}
      <section className="section light faq-section" aria-labelledby="faq-title">
        <div className="wrap narrow">
          <h2 id="faq-title">Questions before you call</h2>
          <FaqList items={homeFaq} />
        </div>
      </section>
    </>
  );
}
