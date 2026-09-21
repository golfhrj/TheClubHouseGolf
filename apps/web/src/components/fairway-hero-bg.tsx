"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { FlagIcon } from "@/components/golf-field";

const SLIDES = [
  "/images/hero-course-sunset.jpg",
  "/images/hero-coastal-polo.png",
  "/images/hero-aerial-sunset.jpg",
  "/images/hero-golden-fairway.jpg",
  "/images/hero-treelined-fairway.jpg",
];

const SLIDE_DURATION_MS = 6000;

/**
 * Golf hero background: an auto-rotating, crossfading carousel of course
 * photos, with the built (no-stock-photo) contour rings, ball, and flag
 * mark layered on top for brand consistency, all in the brand palette.
 */
export function FairwayHeroBg() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setActive((i) => (i + 1) % SLIDES.length);
    }, SLIDE_DURATION_MS);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden bg-brand-green">
      {/* Auto-rotating course photos, crossfaded */}
      {SLIDES.map((src, i) => (
        <Image
          key={src}
          src={src}
          alt=""
          fill
          priority={i === 0}
          sizes="100vw"
          className={`object-cover transition-opacity duration-[1500ms] ease-in-out ${
            i === active ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}

      {/* Brand-green wash over the photos so they read as "golden" without fighting page text */}
      <div className="absolute inset-0 bg-brand-green/45 mix-blend-multiply" />

      {/* Slide indicators - tucked under the navbar, clear of the centered copy and the floating widget bar */}
      <div className="absolute right-4 top-20 z-10 flex flex-col gap-1.5 sm:right-8 sm:top-24">
        {SLIDES.map((src, i) => (
          <button
            key={src}
            type="button"
            aria-label={`Show slide ${i + 1}`}
            onClick={() => setActive(i)}
            className={`w-1.5 rounded-full transition-all duration-300 ${
              i === active
                ? "h-6 bg-[color:var(--color-ink-on-photo)]"
                : "h-1.5 bg-[color:var(--color-ink-on-photo)]/40"
            }`}
          />
        ))}
      </div>

      {/* Contour rings, echoing the section-level GolfField */}
      <svg
        className="absolute inset-0 h-full w-full opacity-40"
        viewBox="0 0 1600 1000"
        preserveAspectRatio="xMidYMid slice"
        fill="none"
        aria-hidden="true"
      >
        <ellipse
          cx="1150"
          cy="230"
          rx="620"
          ry="440"
          stroke="#F5F1E7"
          strokeOpacity="0.18"
          strokeWidth="1"
        />
        <ellipse
          cx="1150"
          cy="230"
          rx="430"
          ry="300"
          stroke="#F5F1E7"
          strokeOpacity="0.22"
          strokeWidth="1"
        />
        <ellipse
          cx="1150"
          cy="230"
          rx="210"
          ry="140"
          stroke="#C49A43"
          strokeOpacity="0.4"
          strokeWidth="1"
        />
        {/* Dotted flight path, tee (top-left club) arcing toward the ball (bottom-right) */}
        <path
          d="M150 140 C 480 60, 850 220, 1160 560"
          stroke="#F5F1E7"
          strokeOpacity="0.2"
          strokeDasharray="2 8"
          strokeWidth="1.4"
        />
        <path
          d="M260 760 C 620 900, 900 900, 1150 660"
          stroke="#F5F1E7"
          strokeOpacity="0.16"
          strokeDasharray="2 8"
          strokeWidth="1.4"
        />
      </svg>

      {/* Golf-club silhouette, top left - balances the ball bottom right */}
      <svg
        className="absolute -left-4 -top-4 h-60 w-60 opacity-[0.2] sm:h-72 sm:w-72"
        viewBox="0 0 200 200"
        fill="none"
        aria-hidden="true"
      >
        <line
          x1="30"
          y1="12"
          x2="150"
          y2="132"
          stroke="#F5F1E7"
          strokeWidth="3.5"
          strokeLinecap="round"
        />
        <circle cx="30" cy="12" r="7" fill="#F5F1E7" />
        <path
          d="M146 126 L182 141 Q190 152 180 161 Q170 168 162 160 L142 136 Z"
          fill="none"
          stroke="#F5F1E7"
          strokeWidth="3.5"
          strokeLinejoin="round"
        />
      </svg>

      {/* Large soft golf-ball silhouette, bottom right */}
      <svg
        className="absolute -bottom-24 -right-24 h-[32rem] w-[32rem] opacity-[0.14] sm:h-[40rem] sm:w-[40rem]"
        viewBox="0 0 200 200"
        fill="none"
        aria-hidden="true"
      >
        <circle cx="100" cy="100" r="92" fill="#F5F1E7" />
        {Array.from({ length: 7 }).map((_, row) =>
          Array.from({ length: 7 }).map((_, col) => {
            const cx = 30 + col * 23;
            const cy = 30 + row * 23;
            const dx = cx - 100;
            const dy = cy - 100;
            if (Math.sqrt(dx * dx + dy * dy) > 85) return null;
            return (
              <circle
                key={`${row}-${col}`}
                cx={cx}
                cy={cy}
                r="4.5"
                fill="#0B2F24"
                opacity="0.5"
              />
            );
          }),
        )}
      </svg>

      {/* Flag-on-a-green mark, bottom left */}
      <div className="absolute bottom-10 left-8 opacity-70 sm:bottom-16 sm:left-16">
        <FlagIcon className="h-14 w-14 text-accent sm:h-20 sm:w-20" />
      </div>

      {/* Vignette for text legibility */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-brand-green/75 via-brand-green/25 to-brand-green/85" />
    </div>
  );
}
