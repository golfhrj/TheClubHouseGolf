"use client";

import { useEffect, useState } from "react";
import {
  BRANDS,
  BRAND_QUERY_PARAM,
  BRAND_STORAGE_KEY,
  DEFAULT_BRAND,
  isBrand,
  type BrandId,
} from "@/lib/brand";

/**
 * Floating switch for comparing today's look with the brand directions
 * under review on the real site. On phones it sits above the social links
 * (bottom-right) so the two never collide. It deliberately keeps its own neutral look (and Manrope) so it
 * reads the same under every brand. The choice is saved and written to
 * `?brand=` so a link opens in the same direction.
 */
export function BrandToggle() {
  const [brand, setBrand] = useState<BrandId>(DEFAULT_BRAND);

  useEffect(() => {
    // Reads what the pre-paint script in layout.tsx already applied.
    const current = document.documentElement.getAttribute("data-brand");
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (isBrand(current)) setBrand(current);
  }, []);

  function choose(next: BrandId) {
    setBrand(next);
    document.documentElement.setAttribute("data-brand", next);
    try {
      localStorage.setItem(BRAND_STORAGE_KEY, next);
    } catch {
      // Storage blocked (private mode) - the choice just won't persist.
    }
    const url = new URL(window.location.href);
    url.searchParams.set(BRAND_QUERY_PARAM, next);
    window.history.replaceState(window.history.state, "", url);
  }

  return (
    <div
      role="group"
      aria-label="Brand preview"
      className="fixed bottom-[6.5rem] left-4 z-40 flex items-center gap-1 rounded-full border border-white/15 bg-[#141614]/92 p-1 font-[family-name:var(--font-manrope)] text-white shadow-lg backdrop-blur-md sm:bottom-6 sm:left-6"
    >
      <span className="hidden pl-3 pr-1 text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-white/75 sm:inline">
        Brand preview
      </span>
      {BRANDS.map((b) => {
        const active = b.id === brand;
        return (
          <button
            key={b.id}
            type="button"
            aria-pressed={active}
            onClick={() => choose(b.id)}
            className={`h-11 rounded-full px-4 text-[0.8rem] font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white ${
              active
                ? "bg-white text-[#141614]"
                : "text-white/85 hover:bg-white/10 hover:text-white"
            }`}
          >
            {/* Short labels on phones keep every option on one line. */}
            <span className="sm:hidden" aria-hidden="true">
              {b.shortLabel}
            </span>
            <span className="max-sm:sr-only">{b.label}</span>
          </button>
        );
      })}
    </div>
  );
}
