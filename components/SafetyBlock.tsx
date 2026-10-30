import Link from "next/link";
import { Rich } from "@/components/Rich";
import { phoneHref } from "@/lib/paths";

const downed =
  "Power line down on the roof or in the yard? Stay at least 30 feet away from it and anything it's touching, and keep people and pets back. Treat it as live. Dial 911, then report it to your electric utility. If a line is on your car, stay inside until first responders say it's safe.";

export function SafetyBlock({ callFirst = false }: { callFirst?: boolean }) {
  return (
    <section className="section on-dark" id="emergency-check">
      <div className="section-inner">
        {callFirst ? (
          <p className="call-card">
            <a className="btn btn-primary" href={phoneHref}>
              Call (555) 555-0142
            </a>
          </p>
        ) : null}
        <h2>Is this an emergency?</h2>
        <p>Safety first. If any of these is happening, don&apos;t wait for us.</p>
        <p>
          <Rich text="Get out now, then Dial 911 from outside:" />
        </p>
        <ul className="clean">
          <li>A ceiling that&apos;s sagging, bulging, or cracking under water</li>
          <li>Water dripping into or near light fixtures, outlets, or the electrical panel</li>
          <li>A tree or large limb that came through the roof</li>
        </ul>
        <div className="boxed">
          <p>
            <Rich text={downed} />
          </p>
        </div>
        <p>Call us today (not an emergency, but don&apos;t put it off):</p>
        <ul className="clean">
          <li>A new water stain on a ceiling or wall</li>
          <li>Shingles torn off or lying in the yard after wind</li>
          <li>Dents in gutters, vents, or downspouts after hail</li>
          <li>Granules piling up at the bottom of the downspouts</li>
          <li>Daylight showing through the attic boards</li>
          <li>A drip that comes back every time it rains</li>
        </ul>
        <div className="actions">
          <a className="btn btn-primary" href={phoneHref}>
            Call (555) 555-0142
          </a>
          <Link className="btn btn-ghost" href="/book/">
            Book an inspection
          </Link>
        </div>
        <p className="fine">
          <Rich text="This checklist is general safety guidance, not a diagnosis. Never climb on a wet or damaged roof. When in doubt, get out and Dial 911." />
        </p>
      </div>
    </section>
  );
}
