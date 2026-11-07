import type { Metadata } from "next";
import { absolute } from "@/lib/site";

const ogImage = { url: absolute("/og.png"), width: 1200, height: 630, alt: "Strathvane concept roofing site" };

/** Title, description, canonical, Open Graph and Twitter tags for one route. og:url equals the canonical. */
export function pageMeta({
  title,
  description,
  path,
  noindex,
}: {
  title: string;
  description: string;
  path: string;
  noindex?: boolean;
}): Metadata {
  const url = absolute(path);
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: url },
    openGraph: { type: "website", siteName: "Strathvane", locale: "en_US", title, description, url, images: [ogImage] },
    twitter: { card: "summary_large_image", title, description, images: [ogImage.url] },
    ...(noindex && { robots: { index: false, follow: true } }),
  };
}
