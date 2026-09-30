/**
 * Brand directions the site can be previewed in (see the Rebrand Ideas
 * report). The choice lives on `<html data-brand>`; globals.css swaps the
 * palette and type for each one while the logo stays the same.
 */
export const BRANDS = [
  { id: "evolve", label: "Evolve", shortLabel: "Evolve" },
  { id: "sunday", label: "Sunday Sessions", shortLabel: "Sunday" },
] as const;

export type BrandId = (typeof BRANDS)[number]["id"];

export const DEFAULT_BRAND: BrandId = "evolve";
export const BRAND_STORAGE_KEY = "chg-brand";
/** `?brand=sunday` opens the site in that direction - handy for sharing. */
export const BRAND_QUERY_PARAM = "brand";

export function isBrand(value: unknown): value is BrandId {
  return BRANDS.some((b) => b.id === value);
}

/** The URL wins over a saved choice, so a shared link always shows what was sent. */
export function resolveBrand(
  fromQuery: string | null,
  fromStorage: string | null,
): BrandId {
  if (isBrand(fromQuery)) return fromQuery;
  if (isBrand(fromStorage)) return fromStorage;
  return DEFAULT_BRAND;
}

/**
 * Runs before first paint (see layout.tsx) so neither direction flashes
 * before the other. Mirrors resolveBrand().
 */
export const BRAND_INIT_SCRIPT = `
try {
  var ids = ${JSON.stringify(BRANDS.map((b) => b.id))};
  var q = new URLSearchParams(location.search).get(${JSON.stringify(BRAND_QUERY_PARAM)});
  var saved = localStorage.getItem(${JSON.stringify(BRAND_STORAGE_KEY)});
  var brand = ids.indexOf(q) >= 0 ? q : ids.indexOf(saved) >= 0 ? saved : ${JSON.stringify(DEFAULT_BRAND)};
  document.documentElement.setAttribute("data-brand", brand);
  if (ids.indexOf(q) >= 0) localStorage.setItem(${JSON.stringify(BRAND_STORAGE_KEY)}, q);
} catch (e) {}
`;
