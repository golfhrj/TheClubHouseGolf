/**
 * Sub-path the site is served under (e.g. "/TheClubHouseGolf" on GitHub
 * Pages). Next.js prefixes its own routes and scripts with it, but not
 * plain asset URLs - so anything under public/ must go through asset().
 */
export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

/** Prefixes a public/ path, e.g. asset("/images/hero.jpg"). */
export function asset(path: string): string {
  return `${BASE_PATH}${path}`;
}

/**
 * The public URL the site is deployed at, used for SEO metadata. Override
 * with NEXT_PUBLIC_SITE_URL once a custom domain (e.g. chgolfco.com) is live.
 */
export function siteUrl(): string {
  return (
    process.env.NEXT_PUBLIC_SITE_URL ??
    "https://golfhrj.github.io/TheClubHouseGolf"
  ).replace(/\/$/, "");
}
