import HeroScene from "@/components/HeroScene";
import { dronePathD, edges, IMG_H, IMG_W, planeD, planes, ticks } from "@/lib/roof";
import { asset } from "@/lib/site";

export const heroSrcSet = [
  `${asset("/brand/hero-240.webp")} 240w`,
  `${asset("/brand/hero-1200.webp")} 1200w`,
  `${asset("/brand/hero-1600.webp")} 1600w`,
  `${asset("/brand/hero-2048.webp")} 2048w`,
].join(", ");
export const heroSizes = "100vw";

/**
 * Static poster: the hero photo, a Basalt scrim, and an SVG trace of the roof planes, drone path, and
 * measurement ticks. Renders with zero JS and stays for reduced motion, Save-Data, and no-WebGL devices.
 * The WebGL layer (HeroScene) fades in over it when allowed.
 */
export default function HeroPoster() {
  return (
    <div className="hero-media" style={{ backgroundImage: `url(${asset("/brand/hero-160.webp")})` }}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        className="hero-img"
        src={asset("/brand/hero-1200.webp")}
        srcSet={heroSrcSet}
        sizes={heroSizes}
        width={1200}
        height={675}
        alt="A drone scan line sweeping across glowing roof planes on a dark house outline, Strathvane concept"
        fetchPriority="high"
        decoding="async"
      />
      <div className="hero-scrim" aria-hidden="true" />
      <svg
        className="hero-lines"
        viewBox={`0 0 ${IMG_W} ${IMG_H}`}
        preserveAspectRatio="xMaxYMid slice"
        aria-hidden="true"
        focusable="false"
      >
        {planes.map((pts, i) => (
          <path key={`p${i}`} d={planeD(pts)} className="hl-plane" />
        ))}
        {edges.map((e, i) => (
          <line key={`e${i}`} x1={e.a[0]} y1={e.a[1]} x2={e.b[0]} y2={e.b[1]} className={`hl-edge hl-${e.kind}`} />
        ))}
        {ticks().map((t, i) => (
          <line key={`t${i}`} x1={t.a[0]} y1={t.a[1]} x2={t.b[0]} y2={t.b[1]} className="hl-tick" />
        ))}
        <path d={dronePathD} className="hl-path" />
        <circle cx="880" cy="235" r="5" className="hl-drone" />
      </svg>
      <HeroScene />
    </div>
  );
}
