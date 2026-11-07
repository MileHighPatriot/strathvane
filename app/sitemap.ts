import type { MetadataRoute } from "next";
import { absolute } from "@/lib/site";

export const dynamic = "force-static";

/** The six real pages; demo-sent is noindex and left out. */
export default function sitemap(): MetadataRoute.Sitemap {
  return ["/", "/services/", "/emergency/", "/estimate/", "/membership/", "/book/"].map((path) => ({
    url: absolute(path),
    changeFrequency: "monthly",
    priority: path === "/" ? 1 : 0.7,
  }));
}
