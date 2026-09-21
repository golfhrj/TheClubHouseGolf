import { BrandMark } from "@/components/brand-mark";

/** Decorative fixed-position contour/orbit background, echoing a green's undulation. */
export function GolfField() {
  return (
    <>
      <svg
        className="pointer-events-none fixed inset-0 z-0 h-full w-full opacity-70"
        viewBox="0 0 1600 1000"
        preserveAspectRatio="xMidYMid slice"
        fill="none"
        aria-hidden="true"
      >
        <ellipse cx="1150" cy="260" rx="600" ry="420" stroke="#252B28" strokeWidth="1" />
        <ellipse cx="1150" cy="260" rx="420" ry="290" stroke="#252B28" strokeWidth="1" />
        <ellipse cx="1150" cy="260" rx="200" ry="130" stroke="#53695C" strokeWidth="1" />
        <path
          d="M300 120 C 620 40, 900 40, 1180 260"
          stroke="#3a3f38"
          strokeDasharray="2 8"
          strokeWidth="1.4"
        />
        <circle cx="1180" cy="260" r="5" fill="#C49A43" />
        <circle cx="300" cy="120" r="3" fill="#53695C" />
      </svg>

      {/* Huge, very faint brand mark watermark - subtle texture, never
          competes with foreground content or text legibility. */}
      <BrandMark className="pointer-events-none fixed -right-[18vw] top-[18vh] z-0 h-[70vw] w-[70vw] max-h-[900px] max-w-[900px] text-ink opacity-[0.035] sm:-right-[12vw]" />
    </>
  );
}

/** A single golf flag — used as a section marker / accent icon. */
export function FlagIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <line x1="5" y1="21" x2="5" y2="3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      <path d="M5 4 L18 8 L5 12 Z" fill="currentColor" />
      <circle cx="5" cy="21" r="1.6" fill="currentColor" />
    </svg>
  );
}

/** A dimpled golf ball icon — used as a bullet / list marker. */
export function BallIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <circle cx="12" cy="12" r="9" fill="currentColor" opacity="0.12" />
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.2" />
      <circle cx="9" cy="9" r="0.9" fill="currentColor" />
      <circle cx="12" cy="8" r="0.9" fill="currentColor" />
      <circle cx="15" cy="9" r="0.9" fill="currentColor" />
      <circle cx="8" cy="12" r="0.9" fill="currentColor" />
      <circle cx="16" cy="12" r="0.9" fill="currentColor" />
      <circle cx="9" cy="15" r="0.9" fill="currentColor" />
      <circle cx="15" cy="15" r="0.9" fill="currentColor" />
    </svg>
  );
}

/** A golf tee — used as a small decorative divider. */
export function TeeIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M8 4 L16 4 L13.2 10 L10.8 10 Z" fill="currentColor" />
      <line x1="12" y1="10" x2="12" y2="20" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}
