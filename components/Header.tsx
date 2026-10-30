"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { BrandMark } from "@/components/BrandMark";
import { Icon } from "@/components/Icons";
import { phoneHref } from "@/lib/paths";

const links = [
  { href: "/services/", label: "Services" },
  { href: "/estimate/", label: "Estimate" },
  { href: "/#drone-inspection", label: "Drone inspection" },
  { href: "/membership/", label: "Membership" },
  { href: "/#storm-map", label: "Storm map" },
  { href: "/book/", label: "Book" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const panel = panelRef.current;
    if (!panel) return;
    const items = Array.from(panel.querySelectorAll<HTMLElement>("a, button"));
    const first = items[0];
    const last = items[items.length - 1];
    first?.focus();
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
        return;
      }
      if (event.key !== "Tab" || items.length === 0) return;
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last?.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first?.focus();
      }
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="site-header on-dark">
      <div className="header-inner">
        <Link href="/" className="brand-lockup" aria-label="Strathvane home">
          <span className="mark-desktop">
            <BrandMark size={40} />
          </span>
          <span className="mark-phone">
            <BrandMark size={32} />
          </span>
          <span>
            <span className="wordmark">
              <span className="wm-strath">Strath</span>
              <span className="wm-vane">vane</span>
            </span>
            <span className="wm-sub" aria-hidden="true">Roofing systems</span>
            <span className="wm-desc" aria-hidden="true">Colorado roofing · Denver metro</span>
          </span>
        </Link>
        <span className="badge">Concept project</span>
        <nav ref={panelRef} className={open ? "nav-panel is-open" : "nav-panel"} id="site-nav" aria-label="Primary">
          {links.map((link) => (
            <Link key={link.href} href={link.href} onClick={() => setOpen(false)}>
              {link.label}
            </Link>
          ))}
          <Link href="/estimate/" className="btn btn-primary nav-cta" onClick={() => setOpen(false)}>
            Get a free estimate
          </Link>
        </nav>
        <div className="header-tools">
          <a className="icon-btn header-call" href={phoneHref} aria-label="Call (555) 555-0142">
            <Icon name="phone" />
          </a>
          <button
            ref={buttonRef}
            className="icon-btn menu-btn"
            type="button"
            aria-expanded={open}
            aria-controls="site-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((value) => !value)}
          >
            <Icon name={open ? "check" : "arrow"} />
          </button>
          <Link href="/estimate/" className="btn btn-primary header-cta">
            Get a free estimate
          </Link>
        </div>
      </div>
    </header>
  );
}
