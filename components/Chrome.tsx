import Link from "next/link";
import BrandMark from "@/components/BrandMark";
import Icon from "@/components/Icon";
import { conceptBar, footerConceptNote, footerLinks } from "@/lib/content";
import { site } from "@/lib/site";

/** G0: top of every page, before the header. */
export function ConceptBar() {
  return (
    <aside className="concept-bar" aria-label="Concept project notice">
      <p className="wrap">
        <span className="dot" aria-hidden="true" />
        <span>{conceptBar}</span>
      </p>
    </aside>
  );
}

/** S18 footer, with plain links to all six pages so Emergency is always one tap away. */
export function Footer() {
  return (
    <footer className="site-footer">
      <div className="wrap footer-grid">
        <div className="footer-brand">
          <BrandMark size={40} />
          <div>
            <p className="footer-name">Strathvane · Colorado roofing · Denver metro (concept)</p>
            <p>
              <a href={site.phoneHref} className="text-link">
                {site.phoneDisplay}
              </a>{" "}
              ·{" "}
              <a href={`mailto:${site.email}`} className="text-link">
                {site.email}
              </a>
            </p>
            <p>Sample license # (not real)</p>
          </div>
        </div>
        <nav aria-label="Footer">
          <ul className="footer-links">
            {footerLinks.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="footer-link">
                  {item.label}
                  <Icon name="arrow" size={18} />
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <p className="footer-note">{footerConceptNote}</p>
      </div>
    </footer>
  );
}

/** G2: tap-to-call bar on phones, fixed to the bottom from first paint. */
export function CallBar() {
  return (
    <div className="call-bar" role="region" aria-label="Call or get an estimate">
      <a href={site.phoneHref} className="call-bar-call">
        <Icon name="phone" size={20} />
        Call {site.phoneDisplay}
      </a>
      <Link href="/estimate/" className="call-bar-est">
        Estimate
      </Link>
    </div>
  );
}
