import type { MetadataRoute } from "next";

export const dynamic = "force-static";

const pages = ["/", "/services/", "/emergency/", "/estimate/", "/membership/", "/book/"];

export default function sitemap(): MetadataRoute.Sitemap {
  return pages.map((path) => ({
    url: `https://milehighpatriot.github.io/strathvane${path === "/" ? "/" : path}`,
  }));
}
