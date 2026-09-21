import { color, radius, space, type as typeScale } from "@chg/design-tokens";

/**
 * React Native theme derived from @chg/design-tokens.
 * type.size/lineHeight are already in pt-equivalent numbers, so they pass
 * straight into RN's numeric fontSize/lineHeight — no rem conversion needed.
 */
export const theme = {
  color,
  radius,
  space,
  type: typeScale,
} as const;

export type Theme = typeof theme;
