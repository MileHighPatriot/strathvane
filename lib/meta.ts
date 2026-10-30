import type { Metadata } from "next";

const origin = "https://milehighpatriot.github.io/strathvane";
const image = "https://milehighpatriot.github.io/strathvane/og.png";
const imageAlt = "Strathvane concept roofing site";

export function pageMeta(title: string, description: string, path: string): Metadata {
  const url = `${origin}${path}`;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      type: "website",
      images: [{ url: image, width: 1200, height: 630, alt: imageAlt }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}
