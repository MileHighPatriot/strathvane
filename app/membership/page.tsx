import { FaqList } from "@/components/Blocks";
import DemoForm from "@/components/DemoForm";
import Icon, { type IconName } from "@/components/Icon";
import Photo from "@/components/Photo";
import { demoLine, membershipFaq } from "@/lib/content";
import { pageMeta } from "@/lib/meta";

export const metadata = pageMeta({
  title: "Strathvane Roof Care Plan | Strathvane",
  description:
    "A sample yearly drone roof inspection plan with storm checks and priority scheduling. Example plan on a concept roofing site, not a real offer.",
  path: "/membership/",
});

const included: [IconName, string][] = [
  ["drone", "A yearly drone inspection with a photo report"],
  ["hail", "A free check after any big hail storm"],
  ["calendar", "Priority scheduling when something leaks"],
  ["tape", "[X]% off repairs (sample)"],
  ["gutter", "A gutter and vent check, so water keeps moving off the roof"],
  ["phone", "A reminder text before your yearly visit"],
];

const rows = [
  ["Yearly drone inspection", "Included", "$[X] (sample)"],
  ["Storm check", "Included", "$[X] (sample)"],
  ["Scheduling", "Priority", "Next open slot"],
  ["Repairs", "[X]% off (sample)", "Standard price (sample)"],
];

const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

export default function MembershipPage() {
  return (
    <>
      <section className="page-hero plan-hero" aria-labelledby="plan-title">
        <div className="plan-hero-photo" aria-hidden="true">
          <Photo name="roofline" sizes="100vw" />
        </div>
        <div className="wrap plan-hero-inner">
          <div className="glass plan-hero-card">
            <h1 id="plan-title">Strathvane Roof Care (concept)</h1>
            <p className="lead">One drone inspection a year, plus a free check after big hail storms.</p>
            <p className="price-big">$[X]/yr (sample)</p>
            <a href="#signup" className="btn btn-iris btn-block">
              Join Strathvane Roof Care
            </a>
          </div>
        </div>
      </section>

      <section className="section light" aria-labelledby="inc-title">
        <div className="wrap">
          <h2 id="inc-title">What&apos;s included</h2>
          <ul className="inc-grid">
            {included.map(([icon, text]) => (
              <li key={text}>
                <Icon name={icon} />
                {text}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section graphite" aria-labelledby="cmp-title">
        <div className="wrap narrow">
          <h2 id="cmp-title">Member vs non-member</h2>
          <table className="cmp">
            <thead>
              <tr>
                <td />
                <th scope="col">Member</th>
                <th scope="col">Non-member</th>
              </tr>
            </thead>
            <tbody>
              {rows.map(([label, m, n]) => (
                <tr key={label}>
                  <th scope="row">{label}</th>
                  <td data-label="Member">{m}</td>
                  <td data-label="Non-member">{n}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section id="signup" className="section light" aria-label="Sign up">
        <div className="wrap narrow">
          <DemoForm
            fields={[
              { kind: "name", label: "Name", name: "name" },
              { kind: "phone", label: "Phone", name: "phone" },
              { kind: "zip", label: "ZIP", name: "zip" },
              { kind: "chips", label: "Start month", name: "month", options: months },
            ]}
            submit="Join Strathvane Roof Care"
            confirmation={demoLine}
          />
        </div>
      </section>

      <section className="section light faq-section" aria-label="Questions">
        <div className="wrap narrow">
          <FaqList items={membershipFaq} />
        </div>
      </section>
    </>
  );
}
