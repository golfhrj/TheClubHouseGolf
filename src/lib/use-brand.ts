"use client";

import { useSyncExternalStore } from "react";
import { isBrand, type BrandId } from "@/lib/brand";

function subscribe(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["data-brand"],
  });
  return () => observer.disconnect();
}

function getSnapshot(): BrandId | null {
  const value = document.documentElement.getAttribute("data-brand");
  return isBrand(value) ? value : null;
}

/**
 * The brand on `<html data-brand>`, kept live as the toggle changes it.
 * It's null during prerender and hydration (the static HTML can't know the
 * visitor's choice), so callers should render the default layout for null.
 */
export function useBrand(): BrandId | null {
  return useSyncExternalStore(subscribe, getSnapshot, () => null);
}
