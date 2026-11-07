import { asset } from "@/lib/site";

export type PhotoName = "drone" | "storm" | "install" | "roofline";

/**
 * Kit photo (4:3) with its srcset. Decorative: each one sits beside copy that describes it, so alt="".
 * Lazy and async; only the hero photo loads eagerly.
 */
export default function Photo({ name, sizes, className = "" }: { name: PhotoName; sizes: string; className?: string }) {
  const src = (w: number) => asset(`/brand/${name}-${w}.webp`);
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      className={`photo ${className}`}
      src={src(1200)}
      srcSet={`${src(160)} 160w, ${src(240)} 240w, ${src(1200)} 1200w`}
      sizes={sizes}
      width={1200}
      height={900}
      alt=""
      loading="lazy"
      decoding="async"
    />
  );
}
