import { CallButton, EmergencyChecklist, FaqList } from "@/components/Blocks";
import DemoForm from "@/components/DemoForm";
import Icon from "@/components/Icon";
import { FinderBar, HomeBusiness, ResultCard } from "@/components/ServicesBits";
import { demoLine, residential, servicesFaq } from "@/lib/content";
import { pageMeta } from "@/lib/meta";

export const metadata = pageMeta({
  title: "Roofing Services | Strathvane",
  description:
    "Roof replacement, storm and hail repair, inspections, gutters, and ventilation. Every job starts with a drone inspection and a photo report you can read.",
  path: "/services/",
});

export default function ServicesPage() {
  return (
    <>
      <section className="page-hero" aria-labelledby="svc-title">
        <div className="wrap">
          <h1 id="svc-title">Roofs built right, inspected with the latest tech</h1>
        </div>
      </section>

      <FinderBar />

      <section id="urgent" className="section light urgent" aria-label="Urgent">
        <div className="wrap narrow">
          <div className="call-card">
            <Icon name="phone" size={32} />
            <CallButton className="btn-block btn-hero" />
          </div>
        </div>
      </section>
      <EmergencyChecklist id="urgent-check" />

      <section id="residential" className="section light" aria-label="Residential services">
        <div className="wrap svc-grid">
          {residential.map((r) => (
            <ResultCard key={r.key} card={r} kind="home" />
          ))}
        </div>
      </section>

      <section id="commercial" className="section graphite" aria-label="Commercial services">
        <div className="wrap">
          <HomeBusiness />
        </div>
      </section>

      <section className="section light" aria-label="Not listed">
        <div className="wrap narrow">
          <p className="lead">Not listed? Tell us what&apos;s going on and we&apos;ll call you back.</p>
          <DemoForm
            fields={[
              { kind: "name", label: "Name", name: "name" },
              { kind: "phone", label: "Phone", name: "phone" },
              { kind: "notes", label: "Notes", name: "notes" },
            ]}
            submit="Book an inspection"
            confirmation={demoLine}
          />
        </div>
      </section>

      <section className="section light faq-section" aria-label="Questions">
        <div className="wrap narrow">
          <FaqList items={servicesFaq} />
        </div>
      </section>
    </>
  );
}
