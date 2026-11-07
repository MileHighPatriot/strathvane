import Icon from "@/components/Icon";

const hotspots = [
  { name: "Shingles", line: "Hail hits, cracks, and lifted tabs, photographed up close.", x: 34, y: 46, icon: "shingle" as const },
  {
    name: "Flashing",
    line: "The metal around chimneys, walls, and skylights, where most leaks start.",
    x: 66,
    y: 30,
    icon: "chimneyFlashing" as const,
  },
  { name: "Vents", line: "Ridge and box vents checked for dents and gaps.", x: 52, y: 17, icon: "ridgeVent" as const },
  { name: "Gutters", line: "Dents, sagging runs, and granule buildup.", x: 22, y: 80, icon: "gutter" as const },
];

/**
 * S6 diagram: an SVG roof with four pulsing hotspots. Each hotspot is a radio, so tapping, focusing, or
 * arrowing to one reveals its line through CSS :has() with no script. Without JS all four lines show.
 */
export function DroneDiagram() {
  return (
    <div className="hotspot-wrap">
      <div className="hotspot-stage" role="radiogroup" aria-label="Drone inspection hotspots">
        <svg viewBox="0 0 600 340" className="hs-roof" aria-hidden="true">
          <path d="M60 280 L300 70 L540 280Z" className="hs-plane" />
          <path d="M300 70 L540 280 L590 250 L360 44Z" className="hs-plane hs-plane-side" />
          <path d="M300 70 L360 44" className="hs-ridge" />
          <path d="M380 150v-56h34v86" className="hs-chimney" />
          <path d="M268 74h64" className="hs-vent" />
          <path d="M60 284h480M60 284v14h480v-14" className="hs-gutter" />
          <path d="M120 230h60M150 205h70M190 180h60M230 155h50M100 255h90" className="hs-courses" />
        </svg>
        {hotspots.map((h, i) => (
          <label key={h.name} className="hotspot" style={{ left: `${h.x}%`, top: `${h.y}%` }}>
            <input
              type="radio"
              name="drone-hotspot"
              value={i}
              defaultChecked={i === 0}
              aria-label={h.name}
              aria-describedby={`hs-${i}`}
            />
            <span className="hs-dot" aria-hidden="true" />
          </label>
        ))}
      </div>
      <ul className="hs-list">
        {hotspots.map((h, i) => (
          <li key={h.name} id={`hs-${i}`} className={`hs-item hs-${i}`}>
            <Icon name={h.icon} />
            <div>
              <p className="hs-name">{h.name}</p>
              <p>{h.line}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
