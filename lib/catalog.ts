export type Card = {
  id: string;
  key: string;
  title: string;
  body: string;
  price?: string;
  shot?: "install" | "storm" | "drone";
};

export const residential: Card[] = [
  {
    id: "r01",
    key: "R01",
    title: "Roof replacement",
    body: "Full tear off down to the deck, new underlayment, and a new roof in the material you pick. We apply for the permit and book the inspection.",
    price: "$[low] to $[high] (sample)",
    shot: "install",
  },
  {
    id: "r02",
    key: "R02",
    title: "Storm and hail repair",
    body: "Drone photos of every hit, a written scope, and repairs or a full roof depending on what we find.",
    price: "$[low] to $[high] (sample)",
    shot: "storm",
  },
  {
    id: "r03",
    key: "R03",
    title: "Leak repair",
    body: "We trace the water back to where it gets in, then fix the flashing, shingles, or seal that failed.",
  },
  {
    id: "r04",
    key: "R04",
    title: "Inspection",
    body: "A drone inspection and a hands-on check, with a photo report you can read.",
    shot: "drone",
  },
  {
    id: "r05",
    key: "R05",
    title: "Gutters",
    body: "Seamless gutters, downspouts, and guards, sized for the roof above them.",
  },
  {
    id: "r06",
    key: "R06",
    title: "Ventilation",
    body: "Ridge and intake vents balanced so the attic stays dry in winter and cooler in summer.",
  },
  {
    id: "r07",
    key: "R07",
    title: "Skylights and flashing",
    body: "New or resealed skylights, and chimney and wall flashing done right.",
  },
];

export const commercial: Card[] = [
  {
    id: "c01",
    key: "C01",
    title: "Flat and low-slope roofs",
    body: "TPO and modified bitumen roofs for offices, shops, and warehouses.",
  },
  {
    id: "c02",
    key: "C02",
    title: "Roof coatings",
    body: "A coating that seals an aging flat roof and buys it more service life.",
  },
  {
    id: "c03",
    key: "C03",
    title: "Maintenance programs",
    body: "Scheduled drone inspections and a repair log for every building you manage.",
  },
  {
    id: "c04",
    key: "C04",
    title: "Storm response",
    body: "Drone photos and a written scope across your buildings after a hail storm.",
    price: "$[low] to $[high] (sample)",
  },
  {
    id: "c05",
    key: "C05",
    title: "Rooftop unit flashing",
    body: "Curbs and flashing around HVAC units sealed so they stop leaking.",
  },
];

export const emergencyPaths = [
  {
    id: "e1",
    key: "E1",
    title: "Active leak inside",
    body: "A new water stain on a ceiling or wall. A drip that comes back every time it rains.",
  },
  {
    id: "e2",
    key: "E2",
    title: "Tree or limb on the roof",
    body: "A tree or large limb that came through the roof.",
  },
  {
    id: "e3",
    key: "E3",
    title: "Storm or hail damage",
    body: "Shingles torn off or lying in the yard after wind. Dents in gutters, vents, or downspouts after hail.",
  },
  {
    id: "e4",
    key: "E4",
    title: "Line down on the roof",
    body: "Power line down on the roof or in the yard? Stay at least 30 feet away from it and anything it's touching, and keep people and pets back. Treat it as live. Dial 911, then report it to your electric utility. If a line is on your car, stay inside until first responders say it's safe.",
  },
] as const;
