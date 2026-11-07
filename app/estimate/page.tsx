import Link from "next/link";
import DemoForm from "@/components/DemoForm";
import { EstimatorFull } from "@/components/Estimator";
import { demoLine, timeWindows } from "@/lib/content";
import { pageMeta } from "@/lib/meta";

export const metadata = pageMeta({
  title: "Free Roof Estimate | Strathvane",
  description:
    "Tell us about your roof and get a clear, itemized estimate. Satellite measurements and a drone inspection mean no surprises later.",
  path: "/estimate/",
});

const steps = [
  { n: "1", label: "Type", href: "#type" },
  { n: "2", label: "Details", href: "#details" },
  { n: "3", label: "Range", href: "#range" },
  { n: "4", label: "Send", href: "#send" },
];

export default function EstimatePage() {
  return (
    <>
      <section className="page-hero" aria-labelledby="est-title">
        <div className="wrap">
          <h1 id="est-title">Get a clear roof estimate, no guesswork</h1>
          <ol className="step-dots" aria-label="Steps">
            {steps.map((s) => (
              <li key={s.n}>
                <a href={s.href}>
                  <span className="step-dot">{s.n}</span>
                  {s.label}
                </a>
              </li>
            ))}
          </ol>
        </div>
      </section>
      <section className="section light" aria-label="Estimator">
        <div className="wrap est-wrap">
          <EstimatorFull />
          <section id="send" className="est-step send-card" aria-label="4 Send">
            <DemoForm
              fields={[
                { kind: "name", label: "Name", name: "name" },
                { kind: "phone", label: "Phone", name: "phone" },
                { kind: "zip", label: "ZIP", name: "zip" },
                { kind: "chips", label: "Best time", name: "time", options: timeWindows },
              ]}
              submit="Book an inspection"
              confirmation={demoLine}
            />
            <Link href="/book/#financing" className="text-cta">
              See financing
            </Link>
          </section>
        </div>
      </section>
    </>
  );
}
