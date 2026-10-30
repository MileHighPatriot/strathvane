"use client";

import { useEffect, useState } from "react";

type NavExtra = Navigator & { deviceMemory?: number; connection?: { saveData?: boolean } };

export function HeroCanvas() {
  const [host, setHost] = useState<HTMLDivElement | null>(null);

  useEffect(() => {
    const nav = navigator as NavExtra;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (nav.connection?.saveData) return;
    if (typeof nav.deviceMemory === "number" && nav.deviceMemory < 4) return;
    let dead = false;
    let stop = () => {};
    const start = () => {
      const idle = window.requestIdleCallback ?? ((cb: IdleRequestCallback) => window.setTimeout(() => cb({} as IdleDeadline), 50));
      idle(() => {
        if (dead || !host) return;
        const canvas = document.createElement("canvas");
        canvas.className = "hero-gl";
        canvas.setAttribute("aria-hidden", "true");
        canvas.width = 2;
        canvas.height = 2;
        const gl = canvas.getContext("webgl", { alpha: true, antialias: false, powerPreference: "low-power" });
        if (!gl) return;
        const info = gl.getExtension("WEBGL_debug_renderer_info");
        const renderer = info ? String(gl.getParameter(info.UNMASKED_RENDERER_WEBGL) ?? "") : "";
        if (/swiftshader|llvmpipe|softpipe|software/i.test(renderer)) return;
        void import("./scene").then((mod) => {
          if (dead) return;
          host.appendChild(canvas);
          requestAnimationFrame(() => canvas.classList.add("is-on"));
          stop = mod.startScene(canvas, gl);
        });
      });
    };
    if (document.readyState === "complete") start();
    else window.addEventListener("load", start, { once: true });
    return () => {
      dead = true;
      stop();
      window.removeEventListener("load", start);
    };
  }, [host]);

  return <div ref={setHost} className="hero-gl-host" />;
}
