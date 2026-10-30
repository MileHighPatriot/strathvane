import type { Metadata } from "next";
import Link from "next/link";
import { pageMeta } from "@/lib/meta";
import { phoneHref } from "@/lib/paths";

export const metadata: Metadata = pageMeta(
  "Page Not Found | Strathvane",
  "We couldn't find what you were looking for. Head back home, check our services, or call (555) 555-0142 and we'll point you the right way.",
  "/404/",
);

export default function NotFound() {
  return (
    <section className="section">
      <div className="section-inner">
        <h1>This page blew off the roof.</h1>
        <p>
          We couldn&apos;t find what you were looking for. Head back home, check our services, or call (555) 555-0142 and
          we&apos;ll point you the right way.
        </p>
        <div className="actions">
          <Link className="btn btn-primary" href="/">
            Go to the home page
          </Link>
          <Link className="btn btn-ghost" href="/services/">
            See services
          </Link>
          <a className="btn btn-ghost" href={phoneHref}>
            Call (555) 555-0142
          </a>
        </div>
      </div>
    </section>
  );
}
