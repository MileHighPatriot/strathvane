import type { Metadata } from "next";
import Link from "next/link";
import { pageMeta } from "@/lib/meta";

export const metadata: Metadata = {
  ...pageMeta("Demo Only | Strathvane", "Demo only. Nothing was sent, and no one is booked or charged.", "/demo-sent/"),
  robots: "noindex",
};

export default function DemoSentPage() {
  return (
    <section className="section">
      <div className="section-inner">
        <h1>Demo only</h1>
        <p>Demo only. Nothing was sent, and no one is booked or charged.</p>
        <p>
          <Link className="btn btn-primary" href="/">
            Go to the home page
          </Link>
        </p>
      </div>
    </section>
  );
}
