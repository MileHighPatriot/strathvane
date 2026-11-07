import type { Metadata, Viewport } from "next";
import { IBM_Plex_Sans, Michroma } from "next/font/google";
import type { ReactNode } from "react";
import { CallBar, ConceptBar, Footer } from "@/components/Chrome";
import Header from "@/components/Header";
import ScrollFx from "@/components/ScrollFx";
import { brand } from "@/lib/brand";
import { asset, site } from "@/lib/site";
import "./globals.css";

// Display face: one weight only (the kit's Michroma has no bold).
const michroma = Michroma({ weight: "400", subsets: ["latin"], variable: "--font-michroma", display: "swap" });
const plex = IBM_Plex_Sans({
  weight: ["400", "500", "600"],
  subsets: ["latin"],
  variable: "--font-plex",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: brand.colors.basalt,
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export const metadata: Metadata = {
  metadataBase: new URL(site.origin),
  icons: { icon: [{ url: asset("/icon.svg"), type: "image/svg+xml" }], apple: asset("/apple-touch-icon.png") },
  other: { "build-hash": site.buildSha },
};

// Runs before first paint: marks the page as JS-capable so the no-JS layouts (stacked panels,
// side-by-side slider, static estimator table) only show when scripts are really off.
const jsFlag = "document.documentElement.classList.add('js')";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${michroma.variable} ${plex.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: jsFlag }} />
      </head>
      <body>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <ConceptBar />
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <CallBar />
        <ScrollFx />
      </body>
    </html>
  );
}
