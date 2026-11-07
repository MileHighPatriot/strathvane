import Link from "next/link";
import Icon from "@/components/Icon";
import { callTodayItems, type Faq, getOutItems } from "@/lib/content";
import { site } from "@/lib/site";

export const Dial911 = () => <strong className="dial911">Dial 911</strong>;

export function CallButton({ suffix = "", className = "" }: { suffix?: string; className?: string }) {
  return (
    <a href={site.phoneHref} className={`btn btn-call ${className}`}>
      <Icon name="phone" />
      Call {site.phoneDisplay}
      {suffix}
    </a>
  );
}

/** The downed power line row: always its own boxed row. */
export function DownedLine({ id }: { id?: string }) {
  return (
    <div className="downed" id={id}>
      <Icon name="warning" size={28} />
      <p>
        <strong>Power line down on the roof or in the yard?</strong> Stay at least 30 feet away from it and anything
        it&apos;s touching, and keep people and pets back. Treat it as live. <Dial911 />, then report it to your electric
        utility. If a line is on your car, stay inside until first responders say it&apos;s safe.
      </p>
    </div>
  );
}

/** Home S3, also the urgent route on the services page. */
export function EmergencyChecklist({ id = "emergency-check" }: { id?: string }) {
  return (
    <section id={id} className="section band-alert" aria-labelledby={`${id}-title`}>
      <div className="wrap narrow">
        <h2 id={`${id}-title`}>Is this an emergency?</h2>
        <p className="lead">Safety first. If any of these is happening, don&apos;t wait for us.</p>
        <div className="tier tier-hot">
          <p className="tier-key">
            Get out now, then <Dial911 /> from outside:
          </p>
          <ul className="tier-list">
            {getOutItems.map((item) => (
              <li key={item}>
                <Icon name="warning" size={20} />
                {item}
              </li>
            ))}
          </ul>
        </div>
        <DownedLine />
        <div className="tier">
          <p className="tier-key">
            <strong>Call us today (not an emergency, but don&apos;t put it off):</strong>
          </p>
          <ul className="tier-rows">
            {callTodayItems.map((item) => (
              <li key={item}>
                <Icon name="check" size={20} />
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div className="stack-btns">
          <CallButton className="btn-block" />
          <Link href="/book/" className="btn btn-outline-dark btn-block">
            Book an inspection
          </Link>
        </div>
        <p className="fine">
          This checklist is general safety guidance, not a diagnosis. Never climb on a wet or damaged roof. When in
          doubt, get out and <Dial911 />.
        </p>
      </div>
    </section>
  );
}

/** Accordion rows: native <details>, so every answer is in the page without JS. */
export function FaqList({ items, className = "" }: { items: Faq[]; className?: string }) {
  return (
    <div className={`faq ${className}`}>
      {items.map((f) => (
        <details key={f.q} className="faq-row">
          <summary>
            <span>{f.q}</span>
            <span className="faq-plus" aria-hidden="true" />
          </summary>
          <p>
            {f.a}
            {f.dial911 ? (
              <>
                {" "}
                <Dial911 />.
              </>
            ) : null}
          </p>
        </details>
      ))}
    </div>
  );
}

/** S13 Strathvane Roof Care card (home two-up pair and the book page). */
export function RoofCareCard({ titleId = "roof-care-title" }: { titleId?: string }) {
  return (
    <article className="pair-card glass" aria-labelledby={titleId}>
      <Icon name="shield" size={32} className="pair-icon" />
      <h2 id={titleId}>Strathvane Roof Care (concept)</h2>
      <p>One drone checkup a year to catch problems early, plus a few perks when you need us.</p>
      <ul className="ticks">
        <li>A yearly drone inspection with a photo report</li>
        <li>A free check after any big hail storm</li>
        <li>[X]% off repairs (sample)</li>
        <li>Reminder text before your yearly check</li>
      </ul>
      <p className="price-big">$[X]/yr (sample; the client sets real prices)</p>
      <Link href="/membership/" className="btn btn-iris">
        See Strathvane Roof Care
      </Link>
      <p className="fine">Example plan for a concept site. Not a real offer.</p>
    </article>
  );
}
