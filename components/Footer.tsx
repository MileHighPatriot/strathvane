import Link from "next/link";
import { phoneHref } from "@/lib/paths";

const links = [
  ["/", "Home"],
  ["/services/", "Services"],
  ["/emergency/", "Emergency"],
  ["/estimate/", "Estimate"],
  ["/membership/", "Membership"],
  ["/book/", "Book"],
] as const;

export function Footer() {
  return (
    <footer className="site-footer on-dark">
      <div className="footer-inner">
        <p>Strathvane · Colorado roofing · Denver metro (concept)</p>
        <p className="footer-contact">
          <a href={phoneHref}>(555) 555-0142</a>
          <span aria-hidden="true">·</span>
          <a href="mailto:hello@strathvane.example">hello@strathvane.example</a>
        </p>
        <p>Sample license # (not real)</p>
        <nav className="footer-nav" aria-label="Footer">
          {links.map(([href, label]) => (
            <Link key={href} href={href}>
              {label}
            </Link>
          ))}
        </nav>
        <p className="concept-note">
          Concept project: Strathvane is a fictional company designed as a portfolio piece. Prices, reviews, license numbers, storm data, and photos are illustrative. Not affiliated with any other business named Strathvane.
        </p>
      </div>
    </footer>
  );
}

export function CallBar() {
  return (
    <div className="callbar on-dark">
      <a href={phoneHref}>Call (555) 555-0142</a>
      <Link href="/estimate/">Estimate</Link>
    </div>
  );
}

export function ConceptBar() {
  return (
    <div className="concept-bar">
      <span className="concept-dot" aria-hidden="true" />
      <p>
        Concept project: Strathvane is a fictional Colorado roofing contractor, made to show what a roofing contractor site can do. It&apos;s not a real company, and it isn&apos;t connected to any other business using the name.
      </p>
    </div>
  );
}
