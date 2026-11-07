import Link from "next/link";
import { CallButton, Dial911, DownedLine } from "@/components/Blocks";
import Icon from "@/components/Icon";
import Photo from "@/components/Photo";
import { emergencyButtons } from "@/lib/content";
import { pageMeta } from "@/lib/meta";

export const metadata = pageMeta({
  title: "Roof Emergency? | Strathvane",
  description:
    "What to do about an active leak, a sagging ceiling, a tree on the roof, or a downed line. General safety guidance on a concept roofing site, not a real company.",
  path: "/emergency/",
});

const questions = [
  { id: "q-ceiling-water", q: "Is water coming through a ceiling right now?" },
  { id: "q-sagging", q: "Is a ceiling sagging or bulging?" },
  { id: "q-wiring", q: "Is water near a light, outlet, or the electrical panel?" },
  { id: "q-tree", q: "Did a tree or limb break through the roof?" },
  { id: "q-missing", q: "Are shingles or roof pieces missing after a storm?" },
  { id: "q-daylight", q: "Can you see daylight through the attic boards?" },
];

/**
 * Emergency: fast and calm, no 3D. The yes/no checklist is radios plus CSS :has(), so it works with no
 * page JS at all; with scripts off, both outcomes show under "If you answered yes / no".
 */
export default function EmergencyPage() {
  const anyYes = (
    <div className="outcome outcome-yes">
      <CallButton suffix=" now" className="btn-block" />
      <p>
        For a sagging ceiling, water near wiring, or a tree through the roof: get out first, then <Dial911 /> from
        outside.
      </p>
    </div>
  );
  const allNo = (
    <div className="outcome outcome-no">
      <p>Sounds like it can wait a day. Book an inspection.</p>
      <Link href="/book/" className="btn btn-outline btn-block">
        Book an inspection
      </Link>
    </div>
  );
  return (
    <>
      <section className="page-hero page-hero-alert" aria-labelledby="em-title">
        <div className="wrap narrow">
          <h1 id="em-title">Roof emergency?</h1>
          <CallButton className="btn-block btn-hero" />
          <p className="lead">
            If a ceiling is sagging, water is near wiring, or a tree came through the roof, get out now, then{" "}
            <Dial911 /> from outside.
          </p>
        </div>
      </section>

      <section className="section light em-tiles-section" aria-label="Emergency types">
        <ul className="wrap narrow em-tiles">
          {emergencyButtons.map((b) => (
            <li key={b.key}>
              <a href={`#${b.target}`} className={`em-tile em-${b.key.toLowerCase()}`}>
                {b.key === "E3" ? <Photo name="storm" sizes="120px" className="em-tile-photo" /> : null}
                <span className="node-key">{b.key}</span>
                <Icon name={b.icon} />
                <strong>{b.label}</strong>
              </a>
            </li>
          ))}
        </ul>
      </section>

      <section className="section light em-check-section" aria-labelledby="em-check-title">
        <div className="wrap narrow">
          <h2 id="em-check-title">Is this an emergency?</h2>
          <div className="yn">
            <ol className="yn-list">
              {questions.map((item) => (
                <li key={item.id} id={item.id} className="yn-row">
                  <fieldset>
                    <legend>{item.q}</legend>
                    <div className="yn-toggle">
                      <label>
                        <input type="radio" name={item.id} value="yes" className="yn-yes" />
                        <span>Yes</span>
                      </label>
                      <label>
                        <input type="radio" name={item.id} value="no" className="yn-no" />
                        <span>No</span>
                      </label>
                    </div>
                  </fieldset>
                </li>
              ))}
            </ol>
            <div className="yn-live" aria-live="polite">
              {anyYes}
              {allNo}
            </div>
            <div className="yn-static">
              <div>
                <p className="yn-if">If you answered yes</p>
                {anyYes}
              </div>
              <div>
                <p className="yn-if">If you answered no</p>
                {allNo}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section light em-downed" aria-label="Downed line">
        <div className="wrap narrow">
          <DownedLine id="downed-line" />
        </div>
      </section>

      <section className="section dark" aria-labelledby="stay-title">
        <div className="wrap narrow">
          <h2 id="stay-title">Stay safe while you wait</h2>
          <ul className="ticks ticks-dark">
            <li>Don&apos;t climb on the roof, wet or dry, after a storm.</li>
            <li>Move furniture and electronics away from the leak and catch drips in a bucket.</li>
            <li>If water is near lights or outlets, stay out of that room.</li>
            <li>Keep people and pets away from any sagging ceiling.</li>
          </ul>
          <p className="hours">Hours: to be set (concept). This concept site doesn&apos;t list 24/7 service.</p>
          <p className="fine">
            This page is general safety guidance for a concept site, not a diagnosis. When in doubt, get out and{" "}
            <Dial911 />.
          </p>
        </div>
      </section>
    </>
  );
}
