import type { Metadata } from "next";
import { Faq } from "@/components/Faq";
import { JoinForm } from "@/components/JoinForm";
import { Icon, type IconName } from "@/components/Icons";
import { Photo } from "@/components/Photo";
import { pageMeta } from "@/lib/meta";
import { asset } from "@/lib/paths";

export const metadata: Metadata = pageMeta(
  "Strathvane Roof Care Plan | Strathvane",
  "A sample yearly drone roof inspection plan with storm checks and priority scheduling. Example plan on a concept roofing site, not a real offer.",
  "/membership/",
);

const included: { icon: IconName; text: string }[] = [
  { icon: "drone", text: "A yearly drone inspection with a photo report" },
  { icon: "hail", text: "A free check after any big hail storm" },
  { icon: "calendar", text: "Priority scheduling when something leaks" },
  { icon: "shield", text: "[X]% off repairs (sample)" },
  { icon: "gutter", text: "A gutter and vent check, so water keeps moving off the roof" },
  { icon: "phone", text: "A reminder text before your yearly visit" },
];

const faqs = [
  {
    q: "Can I cancel?",
    a: "Sample terms: cancel anytime before your next renewal. A real company sets its own terms.",
  },
  {
    q: "Does it renew on its own?",
    a: "Sample terms: it renews yearly, with a reminder first. A real company sets its own terms.",
  },
  {
    q: "What happens at the yearly inspection?",
    a: "A drone photographs the whole roof, a roofer checks the flashing, vents, and gutters, and you get a photo report of what, if anything, needs work.",
  },
  {
    q: "Is this a real plan?",
    a: "No. Strathvane is a concept project, and this plan is a sample.",
  },
] as const;

const rows = [
  ["Yearly drone inspection", "Included", "$[X] (sample)"],
  ["Storm check", "Included", "$[X] (sample)"],
  ["Scheduling", "Priority", "Next open slot"],
  ["Repairs", "[X]% off (sample)", "Standard price (sample)"],
] as const;

export default function MembershipPage() {
  return (
    <>
      <link rel="preload" as="image" href={asset("/brand/roofline-800.webp")} fetchPriority="high" />
      <section className="section">
        <div className="section-inner">
          <div className="plan on-dark">
            <Photo name="roofline" sizes="100vw" priority />
            <div className="scrim" />
            <div className="plan-copy">
              <h1>Strathvane Roof Care (concept)</h1>
              <p>One drone inspection a year, plus a free check after big hail storms.</p>
              <p className="price">$[X]/yr (sample)</p>
              <p>
                <a className="btn btn-primary" href="#join">
                  Join Strathvane Roof Care
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="section">
        <div className="section-inner split">
          <ul className="include">
            {included.map((item) => (
              <li key={item.text}>
                <Icon name={item.icon} />
                <span>{item.text}</span>
              </li>
            ))}
          </ul>
          <div className="compare">
            <table>
              <thead>
                <tr>
                  <th scope="col"><span className="sr">Benefit</span></th>
                  <th scope="col">Member</th>
                  <th scope="col">Non-member</th>
                </tr>
              </thead>
              <tbody>
                {rows.map(([label, member, guest]) => (
                  <tr key={label}>
                    <th scope="row">{label}</th>
                    <td data-col="Member">{member}</td>
                    <td data-col="Non-member">{guest}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
      <section className="section" id="join">
        <div className="section-inner">
          <JoinForm />
          <Faq items={faqs} />
        </div>
      </section>
    </>
  );
}
