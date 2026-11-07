import { ZipCheck } from "@/components/Interactive";
import { towns } from "@/lib/content";

// Schematic before/after line art (viewBox 0 0 320 200). Before: worn, curled, patched. After: tidy.
const base = "M30 150L90 50H230L290 150Z";
const tidy = "M50 116H270M70 83H250M38 136H282M110 50V83M170 50V83M140 83V116M200 83V116M90 116V136M160 116V136M230 116V136";
const art: { before: string; after: string; extra?: { before?: string; after?: string } }[] = [
  {
    before: `${tidy}M120 64a4 4 0 1 0 .1 0M180 100a4 4 0 1 0 .1 0M215 70a4 4 0 1 0 .1 0M95 126a4 4 0 1 0 .1 0M240 126a4 4 0 1 0 .1 0M196 40q8 -8 14 0t14 0v14h-28z`,
    after: `${tidy}M196 40h28v14h-28zM196 47h28`,
  },
  {
    before: "M50 116q30 -10 60 0t60 0t60 0t40 0M70 83q30 10 60 0t60 0t60 0M38 136q40 -12 80 0t80 0t84 0M110 50l4 33M200 83l-6 33M150 140h2M162 146h2M174 142h2",
    after: tidy,
  },
  {
    before: `${tidy}M180 20h40v70h-40zM180 90l6 -6 5 7 6 -7 5 7 6 -7 5 7 7 -7M200 96v10`,
    after: `${tidy}M180 20h40v70h-40zM172 92h56M172 92l8 -8M228 92l-8 -8M176 70h48M176 80h48`,
  },
  {
    before: `${tidy}M24 152H296M24 164q136 26 272 0M280 168l6 28M24 164l-6 -10`,
    after: `${tidy}M24 152H296M24 164H296V174H24ZM56 164v10M96 164v10M136 164v10M176 164v10M216 164v10M256 164v10M286 174v22`,
  },
  {
    before: "M30 150L80 92H240L290 150ZM60 140h60v-14h-60zM170 120h50v-12h-50zM120 104h30v10h-30z",
    after: "M30 150L80 92H240L290 150ZM70 92V150M110 92V150M150 92V150M190 92V150M230 92V150M270 120V150",
  },
];

export function Art({ i, side }: { i: number; side: "before" | "after" }) {
  const a = art[i];
  const roof = i === 4 ? "" : base;
  return (
    <svg viewBox="0 0 320 200" className={`ba-art ba-${side}-art`} aria-hidden="true">
      {roof ? <path d={roof} className="ba-plane" /> : null}
      <path d={a[side]} className={side === "before" ? "ba-worn" : "ba-tidy"} />
    </svg>
  );
}

/** Rendered on the server and handed to the client slider, so the drawings never ship as JS. */
export const baArt = [0, 1, 2, 3, 4].map((i) => ({
  before: <Art i={i} side="before" />,
  after: <Art i={i} side="after" />,
  thumb: <Art i={i} side="after" />,
}));

// Generic metro: towns as relative points (no streets, no real geography beyond west/east/north/south).
const townPts: [string, number, number][] = [
  ["Denver", 300, 200],
  ["Aurora", 410, 210],
  ["Lakewood", 220, 215],
  ["Arvada", 225, 160],
  ["Westminster", 265, 120],
  ["Thornton", 335, 105],
  ["Centennial", 350, 290],
  ["Littleton", 260, 285],
  ["Englewood", 300, 255],
  ["Golden", 160, 185],
];

/** S15: stylized metro map (server-rendered) with pulsing rings and drifting sample hail swaths, plus the ZIP check. */
export function StormMap() {
  return (
    <div className="storm">
        <figure id="storm-map-fig" className="storm-map">
          <svg viewBox="0 0 560 400" aria-hidden="true">
            <defs>
              <pattern id="map-grid" width="28" height="28" patternUnits="userSpaceOnUse">
                <path d="M28 0H0V28" className="map-grid" />
              </pattern>
              <filter id="swath-blur" x="-20%" y="-50%" width="140%" height="200%">
                <feGaussianBlur stdDeviation="14" />
              </filter>
            </defs>
            <rect width="560" height="400" fill="url(#map-grid)" />
            <path d="M40 120 Q90 90 120 150 T130 260 Q110 330 60 360" className="map-foothills" />
            <g className="swaths" filter="url(#swath-blur)">
              <path d="M-40 120 L600 230" className="swath s1" />
              <path d="M-40 230 L600 330" className="swath s2" />
              <path d="M-40 40 L600 150" className="swath s3" />
            </g>
            <g className="rings">
              {[60, 120, 180].map((r, i) => (
                <circle key={r} cx="300" cy="200" r={r} className={`ring ring-${i}`} />
              ))}
            </g>
            {townPts.map(([name, x, y]) => (
              <g key={name} className="town">
                <circle cx={x} cy={y} r="4" />
                <text x={x + 8} y={y + 4}>
                  {name}
                </text>
              </g>
            ))}
          </svg>
          <figcaption className="map-label">Sample storm paths (not real data)</figcaption>
        </figure>
      <div className="storm-side">
        <ZipCheck />
        <p className="towns">{towns}</p>
        <p className="fine">Storm paths on this map are examples. A real site would use live weather data.</p>
      </div>
    </div>
  );
}
