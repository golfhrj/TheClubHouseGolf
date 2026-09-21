"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { BrandMark } from "@/components/brand-mark";
import { ThemeToggle } from "@/components/theme-toggle";

// Root-relative so they work from any page, not just the home page.
const NAV_LINKS = [
  { label: "The Course", href: "/#course" },
  { label: "Shop", href: "/#catalogue" },
  { label: "What's Coming", href: "/#whats-coming" },
  { label: "The Team", href: "/#team", italic: true },
  { label: "Reports", href: "/reports/" },
];

/**
 * `solid` renders the scrolled (opaque) style from the start - for pages
 * without a hero photo behind the bar.
 */
export function Navbar({ solid = false }: { solid?: boolean }) {
  const pathname = usePathname();
  const [scrolledPastTop, setScrolled] = useState(false);
  const scrolled = solid || scrolledPastTop;
  const ticking = useRef(false);

  useEffect(() => {
    function onScroll() {
      if (ticking.current) return;
      ticking.current = true;
      requestAnimationFrame(() => {
        setScrolled(window.scrollY > 40);
        ticking.current = false;
      });
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const state = scrolled ? "scrolled" : "top";

  return (
    <header
      data-state={state}
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled
          ? "bg-background/92 backdrop-blur-md text-ink"
          : "bg-transparent text-[color:var(--color-ink-on-photo)]"
      }`}
    >
      {/* Row 1 — utility bar */}
      <div
        className={`relative flex items-stretch border-b transition-colors duration-300 ${
          scrolled
            ? "border-border-subtle"
            : "border-[color:var(--color-hairline-on-photo)]"
        }`}
      >
        <div className="flex flex-1 items-center justify-between gap-2 px-2.5 py-3 sm:gap-4 sm:px-8 sm:py-5">
          {/* Left cluster - hidden on the smallest screens so the centered
              lockup has room to breathe; reappears from sm up. */}
          <div className="hidden items-center gap-3 sm:flex sm:gap-4">
            <BrandMark className="h-5 w-5 text-accent" />
            <span
              className={`pl-3 text-[0.68rem] uppercase tracking-[0.16em] sm:border-l ${
                scrolled
                  ? "border-border-subtle text-ink-muted"
                  : "border-[color:var(--color-hairline-on-photo)] opacity-90"
              }`}
            >
              Rebuilding - Live Oct 15
            </span>
          </div>

          {/* Right cluster: theme toggle (space reserved for CTA) */}
          <div className="flex items-center gap-3 sm:gap-5">
            <ThemeToggle className="opacity-90 transition-opacity hover:opacity-100" />
          </div>
        </div>

        {/* Centered lockup - logo + wordmark, centered on the full bar,
            independent of the CTA's width */}
        <Link
          href="/"
          className="pointer-events-auto absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center gap-1.5 sm:gap-2.5"
        >
          <BrandMark className="h-5 w-5 sm:h-7 sm:w-7" />
          <span className="max-w-[10.5rem] truncate font-display text-[0.72rem] font-semibold uppercase tracking-[0.12em] sm:max-w-none sm:text-lg sm:tracking-[0.18em]">
            Clubhouse Golf
          </span>
        </Link>

        {/* CTA — flush to the far edge, full bar height, no radius */}
        <Link
          href="/#contact"
          className={`flex shrink-0 items-center whitespace-nowrap border-l px-2.5 text-[0.62rem] font-semibold uppercase tracking-[0.06em] transition-colors sm:px-9 sm:text-caption sm:tracking-[0.1em] ${
            scrolled
              ? "border-border-subtle bg-cta text-cta-ink hover:bg-cta-hover"
              : "border-[color:var(--color-hairline-on-photo)] bg-cta text-cta-ink hover:bg-cta-hover"
          }`}
        >
          Contact Us
        </Link>
      </div>

      {/* Row 2 — nav links */}
      <div
        className={`border-b transition-colors duration-300 ${
          scrolled
            ? "border-border-subtle"
            : "border-[color:var(--color-hairline-on-photo)]"
        }`}
      >
        <nav className="mx-auto flex max-w-6xl items-center gap-3 overflow-x-auto px-4 py-2.5 text-[0.7rem] uppercase tracking-[0.05em] sm:gap-4 sm:px-8 sm:py-3 sm:text-caption sm:tracking-[0.06em]">
          {NAV_LINKS.map((l) => {
            const active = !l.href.includes("#") && pathname.startsWith(l.href);
            return (
              <Link
                key={l.label}
                href={l.href}
                aria-current={active ? "page" : undefined}
                className={`whitespace-nowrap transition-opacity hover:opacity-100 ${
                  l.italic
                    ? "font-display italic normal-case tracking-normal"
                    : ""
                } ${active ? "opacity-100 underline underline-offset-4" : "opacity-80"}`}
              >
                {l.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
