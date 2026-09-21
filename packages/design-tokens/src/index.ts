/**
 * Clubhouse Golf — "Modern Tour" design tokens.
 * Single source of truth, consumed by:
 *   - apps/web  (via tailwind-preset.js)
 *   - apps/mobile (via theme.ts, React Native StyleSheet / NativeWind)
 */

export const color = {
  // Base surfaces — onyx, tiered for depth. Green-cast, never neutral gray.
  black: "#0A0D0C", // page background (Almost Black / Onyx)
  surface: "#10140F", // raised surface (cards, sheets)
  surfaceHigh: "#171D16", // modals, popovers, top nav on scroll
  border: "#252B28", // hairlines on dark surfaces (Charcoal)
  borderSubtle: "#171A17",

  // Text
  white: "#F2EFE8", // primary text on dark (Warm Ivory)
  offBlack: "#0A0D0C", // primary text on light chips/buttons
  muted: "#A6A79A", // secondary text — ivory stepped down
  mutedDark: "#6B6D62", // tertiary / disabled text, captions

  // Brand — Deep Clubhouse Green is the primary brand color; Muted Masters Gold
  // is the accent used sparingly: CTAs, price emphasis, eyebrows, live/status dots.
  brandGreen: "#0B2F24",
  sage: "#53695C", // secondary green, lifestyle graphics
  charcoal: "#252B28", // supporting neutral

  accent: "#C49A43",
  accentHover: "#AD8636",
  accentSubtle: "#2A2214", // accent-tinted dark surface, e.g. badge background

  // Semantic (independent of brand accent — do not reuse accent for status)
  success: "#16A34A",
  warning: "#D97706",
  danger: "#DC2626",

  // Absolute
  white100: "#FFFFFF",
  black100: "#000000",
} as const;

export const gradient = {
  heroFade: "linear-gradient(180deg, rgba(10,13,12,0) 0%, #0A0D0C 100%)",
  cardSheen: "linear-gradient(135deg, rgba(242,239,232,0.05) 0%, rgba(242,239,232,0) 60%)",
  greenGlow: "radial-gradient(600px circle at var(--gx,72%) var(--gy,30%), rgba(196,154,67,0.18), transparent 62%)",
} as const;

export const font = {
  // Unbounded for display (bold, editorial, premium-club energy), Manrope for body,
  // JetBrains Mono for numerals/eyebrows/countdown — matches the coming-soon reference.
  display: '"Unbounded", "Arial Narrow", sans-serif',
  sans: '"Manrope", -apple-system, "Helvetica Neue", Arial, sans-serif',
  mono: '"JetBrains Mono", "SF Mono", ui-monospace, monospace', // prices, order #s, SKUs, countdown
} as const;

export const type = {
  // rem-based scale for web; mobile packages consume the raw pt values.
  display: { size: 56, lineHeight: 60, tracking: -1.5, weight: "600" },
  h1: { size: 40, lineHeight: 44, tracking: -1, weight: "600" },
  h2: { size: 28, lineHeight: 34, tracking: -0.5, weight: "600" },
  h3: { size: 20, lineHeight: 26, tracking: -0.2, weight: "600" },
  bodyLg: { size: 17, lineHeight: 26, tracking: 0, weight: "400" },
  body: { size: 15, lineHeight: 22, tracking: 0, weight: "400" },
  caption: { size: 13, lineHeight: 18, tracking: 0.1, weight: "500" },
  eyebrow: { size: 12, lineHeight: 16, tracking: 1.5, weight: "600" }, // uppercase labels
} as const;

export const space = {
  0: 0,
  1: 4,
  2: 8,
  3: 12,
  4: 16,
  5: 20,
  6: 24,
  8: 32,
  10: 40,
  12: 48,
  16: 64,
  20: 80,
  24: 96,
  32: 128,
} as const;

export const radius = {
  sm: 6,
  md: 10,
  lg: 16,
  xl: 24,
  pill: 999,
} as const;

export const shadow = {
  // Dark-mode shadows read as depth via light leakage, not drop-shadow — subtle by design.
  card: "0 1px 0 rgba(255,255,255,0.04) inset, 0 8px 24px rgba(0,0,0,0.4)",
  raised: "0 1px 0 rgba(255,255,255,0.06) inset, 0 16px 40px rgba(0,0,0,0.5)",
} as const;

export const motion = {
  fast: 120,
  base: 200,
  slow: 320,
  easeOut: "cubic-bezier(0.16, 1, 0.3, 1)",
} as const;

export const tokens = { color, gradient, font, type, space, radius, shadow, motion };
export default tokens;
