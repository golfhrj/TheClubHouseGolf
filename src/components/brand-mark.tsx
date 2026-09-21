import { asset } from "@/lib/site";

const LOGO_MASK = `url(${asset("/brand/logo.png")})`;

/**
 * The Clubhouse Golf mark (golf ball merging into a clubhouse, inside a "C"),
 * rendered as a CSS mask so it always inherits `currentColor` - meaning it
 * automatically matches whatever text color its wrapper already uses (deep
 * green on light surfaces, ivory over the dark hero photo, etc.) with zero
 * extra theme logic.
 */
export function BrandMark({ className }: { className?: string }) {
  return (
    <span
      role="img"
      aria-label="Clubhouse Golf"
      className={`inline-block shrink-0 bg-current ${className ?? ""}`}
      style={{
        WebkitMaskImage: LOGO_MASK,
        maskImage: LOGO_MASK,
        WebkitMaskSize: "contain",
        maskSize: "contain",
        WebkitMaskRepeat: "no-repeat",
        maskRepeat: "no-repeat",
        WebkitMaskPosition: "center",
        maskPosition: "center",
      }}
    />
  );
}
