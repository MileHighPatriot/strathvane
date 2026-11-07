/**
 * Site copy that repeats across pages or feeds interactive pieces. Word for word from the copy deck;
 * one-off lines live in the page that shows them.
 */
import type { IconName } from "@/components/Icon";

export const conceptBar =
  "Concept project: Strathvane is a fictional Colorado roofing contractor, made to show what a roofing contractor site can do. It's not a real company, and it isn't connected to any other business using the name.";

export const footerConceptNote =
  "Concept project: Strathvane is a fictional company designed as a portfolio piece. Prices, reviews, license numbers, storm data, and photos are illustrative. Not affiliated with any other business named Strathvane.";

export const formNote = "Demo form: nothing is sent and no one is booked or charged.";
export const demoLine = "Demo only. Nothing was sent, and no one is booked or charged.";
export const estimateDisclaimer =
  "Range is an estimate only, not a quote. Final price set after an on-site inspection, decking condition, permits, and local code requirements.";
export const rangeLine = "$[low] to $[high] (sample)";

export const nav = [
  { label: "Services", href: "/services/" },
  { label: "Estimate", href: "/estimate/" },
  { label: "Drone inspection", href: "/#drone-inspection" },
  { label: "Membership", href: "/membership/" },
  { label: "Storm map", href: "/#storm-map" },
  { label: "Book", href: "/book/" },
];

export const footerLinks = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services/" },
  { label: "Emergency", href: "/emergency/" },
  { label: "Estimate", href: "/estimate/" },
  { label: "Membership", href: "/membership/" },
  { label: "Book", href: "/book/" },
];

export const chips = [
  "Roof replacement",
  "Storm and hail repair",
  "Leak repair",
  "Inspection",
  "Gutters",
  "Ventilation",
  "Skylights and flashing",
];

export type ServiceCard = { key: string; title: string; scope: string; price?: string; icon: IconName };

export const residential: ServiceCard[] = [
  {
    key: "R01",
    title: "Roof replacement",
    scope:
      "Full tear off down to the deck, new underlayment, and a new roof in the material you pick. We apply for the permit and book the inspection.",
    price: rangeLine,
    icon: "roof",
  },
  {
    key: "R02",
    title: "Storm and hail repair",
    scope: "Drone photos of every hit, a written scope, and repairs or a full roof depending on what we find.",
    price: rangeLine,
    icon: "hail",
  },
  {
    key: "R03",
    title: "Leak repair",
    scope: "We trace the water back to where it gets in, then fix the flashing, shingles, or seal that failed.",
    icon: "shingle",
  },
  {
    key: "R04",
    title: "Inspection",
    scope: "A drone inspection and a hands-on check, with a photo report you can read.",
    icon: "drone",
  },
  {
    key: "R05",
    title: "Gutters",
    scope: "Seamless gutters, downspouts, and guards, sized for the roof above them.",
    icon: "gutter",
  },
  {
    key: "R06",
    title: "Ventilation",
    scope: "Ridge and intake vents balanced so the attic stays dry in winter and cooler in summer.",
    icon: "ridgeVent",
  },
  {
    key: "R07",
    title: "Skylights and flashing",
    scope: "New or resealed skylights, and chimney and wall flashing done right.",
    icon: "skylight",
  },
];

export const commercial: ServiceCard[] = [
  {
    key: "C01",
    title: "Flat and low-slope roofs",
    scope: "TPO and modified bitumen roofs for offices, shops, and warehouses.",
    icon: "roof",
  },
  {
    key: "C02",
    title: "Roof coatings",
    scope: "A coating that seals an aging flat roof and buys it more service life.",
    icon: "shield",
  },
  {
    key: "C03",
    title: "Maintenance programs",
    scope: "Scheduled drone inspections and a repair log for every building you manage.",
    icon: "calendar",
  },
  {
    key: "C04",
    title: "Storm response",
    scope: "Drone photos and a written scope across your buildings after a hail storm.",
    price: rangeLine,
    icon: "stormCloud",
  },
  {
    key: "C05",
    title: "Rooftop unit flashing",
    scope: "Curbs and flashing around HVAC units sealed so they stop leaking.",
    icon: "chimneyFlashing",
  },
];

export const emergencyButtons = [
  { key: "E1", label: "Active leak inside", target: "q-ceiling-water", icon: "warning" as IconName },
  { key: "E2", label: "Tree or limb on the roof", target: "q-tree", icon: "roof" as IconName },
  { key: "E3", label: "Storm or hail damage", target: "q-missing", icon: "hail" as IconName },
  { key: "E4", label: "Line down on the roof", target: "downed-line", icon: "warning" as IconName },
];

export const getOutItems = [
  "A ceiling that's sagging, bulging, or cracking under water",
  "Water dripping into or near light fixtures, outlets, or the electrical panel",
  "A tree or large limb that came through the roof",
];

export const callTodayItems = [
  "A new water stain on a ceiling or wall",
  "Shingles torn off or lying in the yard after wind",
  "Dents in gutters, vents, or downspouts after hail",
  "Granules piling up at the bottom of the downspouts",
  "Daylight showing through the attic boards",
  "A drip that comes back every time it rains",
];

export type Faq = { q: string; a: string; dial911?: boolean };

export const homeFaq: Faq[] = [
  {
    q: "How do I know if it's an emergency?",
    a: 'Use the "Is this an emergency?" checklist above. For a sagging ceiling, water near wiring, or a tree through the roof, get out and',
    dial911: true,
  },
  {
    q: "Will I get a price before work starts?",
    a: "Yes. You'll get a range first, then a written, itemized price before any work begins.",
  },
  {
    q: "Do I have to be home for the drone inspection?",
    a: "No. We'll text you when it starts and send the photo report when it's done.",
  },
  {
    q: "Do you help with hail claims?",
    a: "We document the damage with photos and measurements you can share with your insurer. Your insurer decides the claim.",
  },
  { q: "Do you handle permits?", a: "When the work needs one, we apply for it and book the inspection." },
  {
    q: "Is this a real company?",
    a: "No. Strathvane is a concept project built to show what a roofing contractor's site can do.",
  },
];

export const servicesFaq: Faq[] = [
  {
    q: "Can I get a price before you come out?",
    a: "You'll get a range on the phone or from the estimator, and a written price before any work starts.",
  },
  {
    q: "Repair or replace?",
    a: "It depends on the roof's condition, the damage, and the deck. The drone report shows you what we see, and we tell you straight.",
  },
  { q: "Do you work with property managers?", a: "Yes. One contact for every building, and a written scope for each job." },
];

export const membershipFaq: Faq[] = [
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
  { q: "Is this a real plan?", a: "No. Strathvane is a concept project, and this plan is a sample." },
];

export const financingFaq: Faq[] = [
  { q: "Who's the lender?", a: "None. This is a demo, and no lender is connected." },
  { q: "Does checking hurt my credit?", a: "Depends on the lender. Ask before you apply." },
  { q: "Can I pay off early?", a: "Depends on the lender's terms." },
];

export const materials = [
  {
    id: "architectural",
    name: "Architectural shingle",
    line: "The most common roof in the Denver metro. Layered, good looking, and quick to install.",
  },
  {
    id: "impact",
    name: "Impact-resistant shingle",
    line: "Rated to stand up to hail better, and some insurers give a discount for it. (Example. Check with your insurer.)",
  },
  {
    id: "metal",
    name: "Standing seam metal",
    line: "Long panels with hidden fasteners. Sheds snow and lasts a long time.",
  },
  { id: "tile", name: "Concrete tile", line: "Heavy and durable. Needs a roof deck built to carry it." },
] as const;

export const processSteps = [
  { name: "Call", body: "Tell us what's going on. We give you a price range and an inspection window.", icon: "phone" as IconName },
  { name: "Inspect", body: "A drone inspection and a hands-on check, with a photo report.", icon: "drone" as IconName },
  { name: "Quote", body: "You get a written, itemized price before any work starts.", icon: "tape" as IconName },
  {
    name: "Done",
    body: "Old roof off, new roof on, magnet sweep for nails, final walkthrough with you.",
    icon: "check" as IconName,
  },
];

export const trackerSteps = [
  { name: "Booked", body: "You're on the schedule. Inspection window: [Tue, 8 to 10 AM] (example)." },
  { name: "Drone inspection", body: "The drone is up. Your photo report is ready in about [40 minutes] (example)." },
  { name: "Tear off", body: "Crew on site, old roof coming off. Permit #[000000] (example)." },
  { name: "Final walkthrough", body: "Roof done, yard swept for nails, and the photos are in your account." },
];

export const beforeAfter = [
  {
    title: "Hail damage.",
    before: "Before: bruised shingles and dented vents after a storm.",
    after: "After: a new impact-resistant roof with new vents.",
  },
  {
    title: "Worn shingles.",
    before: "Before: curled, cracked shingles losing granules.",
    after: "After: a new architectural shingle roof.",
  },
  {
    title: "Chimney leak.",
    before: "Before: cracked caulk where the chimney meets the roof.",
    after: "After: new step and counter flashing.",
  },
  {
    title: "Gutters.",
    before: "Before: sagging gutters pulling off the fascia.",
    after: "After: new seamless gutters with hidden hangers.",
  },
  {
    title: "Metal roof.",
    before: "Before: a patched low-slope roof.",
    after: "After: a standing seam metal roof.",
  },
];

export const reviews = [
  {
    quote:
      '"The drone report showed the hail hits on our roof before anyone climbed up. The new roof went on in two days."',
    who: "Homeowner, Lakewood (sample)",
  },
  { quote: '"They told us the range up front, and the final bill landed inside it."', who: "Homeowner, Westminster (sample)" },
  { quote: '"The crew swept the whole yard with a magnet. We didn\'t find a single nail."', who: "Homeowner, Centennial (sample)" },
];

export const towns = "Denver · Aurora · Lakewood · Arvada · Westminster · Thornton · Centennial · Littleton · Englewood · Golden (example area)";

/** Two-hour windows (gap fill approved by Kohlton), used by the estimate "Best time" choice and the book page. */
export const timeWindows = ["8 to 10 AM", "10 AM to 12 PM", "12 to 2 PM", "2 to 4 PM"];

export const validation = {
  name: "Enter your name.",
  phone: "Enter a 10-digit phone number.",
  zip: "Enter a 5-digit ZIP.",
  choice: "Pick an option.",
};
