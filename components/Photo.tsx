import { asset } from "@/lib/paths";

type Shot = "drone" | "storm" | "install" | "roofline";

export function Photo({
  name,
  sizes,
  className,
  priority = false,
}: {
  name: Shot;
  sizes: string;
  className?: string;
  priority?: boolean;
}) {
  return (
    <img
      className={className}
      src={asset(`/brand/${name}-1200.webp`)}
      srcSet={`${asset(`/brand/${name}-160.webp`)} 160w, ${asset(`/brand/${name}-240.webp`)} 240w, ${asset(`/brand/${name}-800.webp`)} 800w, ${asset(`/brand/${name}-1200.webp`)} 1200w`}
      sizes={sizes}
      width={1200}
      height={900}
      alt=""
      loading={priority ? "eager" : "lazy"}
      fetchPriority={priority ? "high" : "low"}
      decoding="async"
    />
  );
}
