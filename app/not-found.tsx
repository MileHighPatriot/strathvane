import type { Metadata } from "next";
import Link from "next/link";
import { CallButton } from "@/components/Blocks";
import { absolute } from "@/lib/site";

const line =
  "We couldn't find what you were looking for. Head back home, check our services, or call (555) 555-0142 and we'll point you the right way.";
const og = { url: absolute("/og.png"), width: 1200, height: 630, alt: "Strathvane concept roofing site" };

// No canonical or og:url: a not-found page has no address of its own.
export const metadata: Metadata = {
  title: { absolute: "Page Not Found | Strathvane" },
  description: line,
  openGraph: { type: "website", siteName: "Strathvane", title: "Page Not Found | Strathvane", description: line, images: [og] },
  twitter: { card: "summary_large_image", title: "Page Not Found | Strathvane", description: line, images: [og.url] },
};

export default function NotFound() {
  return (
    <section className="page-hero page-min" aria-labelledby="nf-title">
      <div className="wrap narrow">
        <h1 id="nf-title">This page blew off the roof.</h1>
        <p className="lead">{line}</p>
        <div className="stack-btns">
          <Link href="/" className="btn btn-iris btn-block">
            Go to the home page
          </Link>
          <Link href="/services/" className="btn btn-ghost btn-block">
            See services
          </Link>
          <CallButton className="btn-block" />
        </div>
      </div>
    </section>
  );
}
