"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import Icon from "@/components/Icon";
import Wordmark from "@/components/Wordmark";
import { nav } from "@/lib/content";
import { site } from "@/lib/site";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  // Header turns into Basalt glass after 40px of scroll.
  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      setScrolled(window.scrollY > 40);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Full-screen menu: trap focus, close on Escape, lock page scroll, return focus to the toggle.
  useEffect(() => {
    if (!open) return;
    const menu = menuRef.current;
    const toggle = toggleRef.current;
    const focusables = () =>
      Array.from(menu?.querySelectorAll<HTMLElement>("a[href], button:not([disabled])") ?? []);
    focusables()[0]?.focus();
    document.documentElement.classList.add("menu-open");
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        return;
      }
      if (e.key !== "Tab") return;
      const items = focusables();
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.documentElement.classList.remove("menu-open");
      toggle?.focus();
    };
  }, [open]);

  return (
    <header className="site-header" data-scrolled={scrolled ? "" : undefined}>
      <div className="wrap hdr-row">
        <Wordmark />
        <div className="hdr-meta">
          <p className="hdr-desc">Colorado roofing · Denver metro</p>
          <p className="badge">
            <span className="dot" aria-hidden="true" />
            Concept project
          </p>
        </div>
        <nav className="hdr-nav" aria-label="Main">
          <ul>
            {nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="nav-link">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <Link href="/estimate/" className="btn btn-primary hdr-cta">
          Get a free estimate
        </Link>
        <a href={site.phoneHref} className="icon-btn hdr-call" aria-label={`Call ${site.phoneDisplay}`}>
          <Icon name="phone" />
        </a>
        <button
          ref={toggleRef}
          type="button"
          className="icon-btn hdr-menu js-only"
          aria-expanded={open}
          aria-controls="site-menu"
          aria-label="Open menu"
          onClick={() => setOpen(true)}
        >
          <Icon name="menu" />
        </button>
      </div>

      {/* Without JS the menu button is hidden and these links show as a plain list on smaller screens. */}
      <nav className="nojs-nav wrap" aria-label="Main (list)">
        <ul>
          {nav.map((item) => (
            <li key={item.href}>
              <Link href={item.href}>{item.label}</Link>
            </li>
          ))}
          <li>
            <Link href="/estimate/">Get a free estimate</Link>
          </li>
        </ul>
      </nav>

      {open ? (
        <div id="site-menu" ref={menuRef} className="menu glass" role="dialog" aria-modal="true" aria-label="Menu">
          <div className="wrap menu-top">
            <Wordmark />
            <button type="button" className="icon-btn" aria-label="Close menu" onClick={() => setOpen(false)}>
              <Icon name="close" />
            </button>
          </div>
          <nav className="wrap menu-nav" aria-label="Menu">
            <ul>
              {nav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="menu-link" onClick={() => setOpen(false)}>
                    <span>{item.label}</span>
                    <Icon name="arrow" />
                  </Link>
                </li>
              ))}
            </ul>
            <Link href="/estimate/" className="btn btn-primary btn-block" onClick={() => setOpen(false)}>
              Get a free estimate
            </Link>
            <a href={site.phoneHref} className="btn btn-ghost btn-block">
              <Icon name="phone" />
              Call {site.phoneDisplay}
            </a>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
