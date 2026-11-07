"use client";

import { useEffect } from "react";

/**
 * Fallback for browsers without CSS scroll-driven animations: adds .in to [data-reveal] blocks as they
 * enter the viewport. Where animation-timeline is supported, CSS does the work and this does nothing.
 */
export default function ScrollFx() {
  useEffect(() => {
    if (CSS.supports("animation-timeline: view()")) return;
    const items = document.querySelectorAll<HTMLElement>("[data-reveal]");
    if (!("IntersectionObserver" in window)) {
      items.forEach((el) => el.classList.add("in"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            io.unobserve(entry.target);
          }
        }
      },
      { rootMargin: "0px 0px -12% 0px" },
    );
    items.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
  return null;
}
