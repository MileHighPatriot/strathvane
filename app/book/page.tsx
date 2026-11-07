import { FaqList, RoofCareCard } from "@/components/Blocks";
import BookForm from "@/components/BookForm";
import Icon from "@/components/Icon";
import { FinancingCard } from "@/components/Sections";
import { financingFaq } from "@/lib/content";
import { pageMeta } from "@/lib/meta";

export const metadata = pageMeta({
  title: "Book a Roof Inspection | Strathvane",
  description:
    "Pick a time that works and we'll inspect your roof, photograph what we find, and walk you through it.",
  path: "/book/",
});

export default function BookPage() {
  return (
    <>
      <section className="page-hero" aria-labelledby="book-h1">
        <div className="wrap">
          <h1 id="book-h1">Book your roof inspection</h1>
        </div>
      </section>

      <section className="section light" aria-labelledby="pick-title">
        <div className="wrap narrow">
          <h2 id="pick-title">Pick a time</h2>
          <BookForm />
        </div>
      </section>

      <section className="section dark" aria-labelledby="expect-title">
        <div className="wrap">
          <h2 id="expect-title">What to expect</h2>
          <ul className="expect">
            <li>
              <Icon name="calendar" />
              You get an inspection window, not an all-day wait.
            </li>
            <li>
              <Icon name="drone" />
              We inspect with a drone and by hand before we quote.
            </li>
            <li>
              <Icon name="tape" />
              You get a written price before any work starts.
            </li>
          </ul>
        </div>
      </section>

      <section id="financing" className="section pair-section" aria-label="Financing and roof care">
        <div className="wrap pair">
          <FinancingCard titleId="book-fin-title" />
          <RoofCareCard titleId="book-care-title" />
        </div>
      </section>

      <section className="section light faq-section" aria-label="Financing questions">
        <div className="wrap narrow">
          <FaqList items={financingFaq} />
        </div>
      </section>
    </>
  );
}
