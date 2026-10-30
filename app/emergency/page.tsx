import type { Metadata } from "next";
import Link from "next/link";
import { Photo } from "@/components/Photo";
import { Rich } from "@/components/Rich";
import { pageMeta } from "@/lib/meta";
import { phoneHref } from "@/lib/paths";

export const metadata: Metadata = pageMeta(
  "Roof Emergency? | Strathvane",
  "What to do about an active leak, a sagging ceiling, a tree on the roof, or a downed line. General safety guidance on a concept roofing site, not a real company.",
  "/emergency/",
);

const questions = [
  ["n1", "e1", "Is water coming through a ceiling right now?"],
  ["n2", "", "Is a ceiling sagging or bulging?"],
  ["n3", "", "Is water near a light, outlet, or the electrical panel?"],
  ["n4", "e2", "Did a tree or limb break through the roof?"],
  ["n5", "e3", "Are shingles or roof pieces missing after a storm?"],
  ["n6", "", "Can you see daylight through the attic boards?"],
] as const;

const tiles = [
  ["e1", "E1", "Active leak inside"],
  ["e2", "E2", "Tree or limb on the roof"],
  ["e3", "E3", "Storm or hail damage"],
  ["e4", "E4", "Line down on the roof"],
] as const;

const downed =
  "Power line down on the roof or in the yard? Stay at least 30 feet away from it and anything it's touching, and keep people and pets back. Treat it as live. Dial 911, then report it to your electric utility. If a line is on your car, stay inside until first responders say it's safe.";

export default function EmergencyPage() {
  return (
    <>
      <section className="section on-dark">
        <div className="section-inner">
          <h1>Roof emergency?</h1>
          <p className="call-card">
            <a className="btn btn-primary" href={phoneHref}>
              Call (555) 555-0142
            </a>
          </p>
          <p>
            <Rich text="If a ceiling is sagging, water is near wiring, or a tree came through the roof, get out now, then Dial 911 from outside." />
          </p>
          <div className="tile-grid">
            {tiles.map(([id, key, label]) => (
              <a key={id} className="tile" href={id === "e4" ? "#downed-line" : `#${id}`}>
                {id === "e3" ? (
                  <>
                    <Photo name="storm" sizes="50vw" />
                    <span className="scrim" />
                  </>
                ) : null}
                <span>
                  <span className="key">{key}</span> {label}
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>
      <section className="section">
        <div className="section-inner check">
          {questions.map(([id, row, label]) => (
            <div className="yn" id={row || undefined} key={id}>
              <p>{label}</p>
              <label className="seg">
                <input className="yes" type="radio" name={id} />
                <span>Yes</span>
              </label>
              <label className="seg">
                <input id={id} type="radio" name={id} />
                <span>No</span>
              </label>
            </div>
          ))}
          <div className="yes-out">
            <p>If you answered yes</p>
            <a className="btn btn-primary" href={phoneHref}>
              Call (555) 555-0142 now
            </a>
            <p>
              <Rich text="For a sagging ceiling, water near wiring, or a tree through the roof: get out first, then Dial 911 from outside." />
            </p>
          </div>
          <div className="no-out">
            <p>If you answered no</p>
            <p>Sounds like it can wait a day. Book an inspection.</p>
            <Link className="btn btn-primary" href="/book/">
              Book an inspection
            </Link>
          </div>
          <div className="boxed" id="downed-line">
            <p>
              <Rich text={downed} />
            </p>
          </div>
          <ul className="clean">
            <li>Don&apos;t climb on the roof, wet or dry, after a storm.</li>
            <li>Move furniture and electronics away from the leak and catch drips in a bucket.</li>
            <li>If water is near lights or outlets, stay out of that room.</li>
            <li>Keep people and pets away from any sagging ceiling.</li>
          </ul>
          <p>Hours: to be set (concept). This concept site doesn&apos;t list 24/7 service.</p>
          <p className="fine">
            <Rich text="This page is general safety guidance for a concept site, not a diagnosis. When in doubt, get out and Dial 911." />
          </p>
        </div>
      </section>
    </>
  );
}
