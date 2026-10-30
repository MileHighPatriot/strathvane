import type { Metadata } from "next";
import { Estimator } from "@/components/Estimator";
import { SendForm } from "@/components/forms";
import { pageMeta } from "@/lib/meta";

export const metadata: Metadata = pageMeta(
  "Free Roof Estimate | Strathvane",
  "Tell us about your roof and get a clear, itemized estimate. Satellite measurements and a drone inspection mean no surprises later.",
  "/estimate/",
);

export default function EstimatePage() {
  return (
    <section className="section">
      <div className="section-inner">
        <h1>Get a clear roof estimate, no guesswork</h1>
        <p className="steps">
          <span>1 Type</span>
          <span>2 Details</span>
          <span>3 Range</span>
          <span>4 Send</span>
        </p>
        <Estimator variant="full" />
        <SendForm />
      </div>
    </section>
  );
}
