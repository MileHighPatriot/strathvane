export const site = {
  name: "Strathvane",
  origin: "https://milehighpatriot.github.io",
  base: "/strathvane",
  url: "https://milehighpatriot.github.io/strathvane/",
  phoneDisplay: "(555) 555-0142",
  phoneHref: "tel:+15555550142",
  phoneSchema: "+1-555-555-0142",
  email: "hello@strathvane.example",
  buildSha: process.env.NEXT_PUBLIC_BUILD_SHA ?? "dev",
};

/** Public file path with the GitHub Pages base path (plain <img> and <link> tags need it). */
export const asset = (path: string) => `${site.base}${path}`;

/** Full https URL for a route path such as "/services/". */
export const absolute = (path: string) => `${site.origin}${site.base}${path}`;
