import type { Metadata } from "next";
import { IBM_Plex_Sans, Michroma } from "next/font/google";
import Script from "next/script";
import { CallBar, ConceptBar, Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import "./globals.css";

const michroma = Michroma({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-michroma",
  display: "swap",
  preload: false,
});

const plex = IBM_Plex_Sans({
  weight: ["400", "500", "600"],
  subsets: ["latin"],
  variable: "--font-plex",
  display: "swap",
  preload: false,
});

export const metadata: Metadata = {
  metadataBase: new URL("https://milehighpatriot.github.io"),
  other: {
    "build-hash": process.env.NEXT_PUBLIC_BUILD_SHA || "dev",
  },
  icons: {
    icon: [{ url: "/strathvane/icon.svg", type: "image/svg+xml" }],
    apple: [{ url: "/strathvane/apple-touch-icon.png", sizes: "180x180" }],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${michroma.variable} ${plex.variable}`} suppressHydrationWarning>
      <body>
        <Script id="js-flag" strategy="beforeInteractive">
          {`document.documentElement.classList.add("js");if(matchMedia("(prefers-reduced-motion: reduce)").matches)document.documentElement.classList.add("reduce");`}
        </Script>
        <ConceptBar />
        <Header />
        <main>{children}</main>
        <Footer />
        <CallBar />
      </body>
    </html>
  );
}
