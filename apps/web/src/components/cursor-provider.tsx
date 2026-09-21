"use client";

import { useEffect } from "react";

/**
 * Swaps the OS cursor for the golf-club / golf-ball SVGs (see globals.css),
 * but only on fine-pointer devices — touch stays native.
 */
export function CursorProvider() {
  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    if (fine) {
      document.documentElement.classList.add("has-golf-cursor");
    }
  }, []);

  return null;
}
