"use client";

import { useEffect, useRef } from "react";

type Nav = Navigator & { connection?: { saveData?: boolean }; deviceMemory?: number };

/**
 * Loads the WebGL roof scene only after the load event plus an idle callback, and only when the device
 * can afford it: WebGL available, no reduced motion, no Save-Data, deviceMemory missing or 4+.
 */
export default function HeroScene() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const nav = navigator as Nav;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (nav.connection?.saveData) return;
    if (typeof nav.deviceMemory === "number" && nav.deviceMemory < 4) return;
    const probe = document.createElement("canvas");
    if (!(probe.getContext("webgl") || probe.getContext("experimental-webgl"))) return;

    let stop: (() => void) | undefined;
    let cancelled = false;
    const start = () => {
      import("@/lib/hero-scene").then(({ startHeroScene }) => {
        if (!cancelled) stop = startHeroScene(canvas);
      });
    };
    const idle = () => {
      if (typeof window.requestIdleCallback === "function") window.requestIdleCallback(start, { timeout: 2500 });
      else setTimeout(start, 600);
    };
    if (document.readyState === "complete") idle();
    else window.addEventListener("load", idle, { once: true });
    return () => {
      cancelled = true;
      window.removeEventListener("load", idle);
      stop?.();
    };
  }, []);

  return <canvas ref={canvasRef} className="hero-canvas" width={1200} height={675} aria-hidden="true" />;
}
