"use client";

import { useEffect, type ReactNode } from "react";
import { useBrand } from "@/lib/use-brand";

/**
 * Swaps the home page between the standard layout and the GolfMerce one.
 * Only one is ever mounted, so section ids (#course, #team...) stay unique.
 * The static HTML always holds the standard layout; globals.css hides it
 * before first paint when GolfMerce is chosen, until this swaps it out.
 */
export function BrandLayout({
  children,
  golfmerce,
}: {
  children: ReactNode;
  golfmerce: ReactNode;
}) {
  const brand = useBrand();
  const isGolfmerce = brand === "golfmerce";

  // The browser jumped to #hash in the standard layout before the swap, so
  // jump again once the GolfMerce sections exist.
  useEffect(() => {
    if (!isGolfmerce || !location.hash) return;
    document.getElementById(location.hash.slice(1))?.scrollIntoView();
  }, [isGolfmerce]);

  return isGolfmerce ? (
    golfmerce
  ) : (
    <div className="brand-default-layout flex flex-1 flex-col">{children}</div>
  );
}
