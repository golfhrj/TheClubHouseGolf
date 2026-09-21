/**
 * The canonical URL this site is deployed at. Defaults to the production
 * domain (chgolfco.com) since that's where this project is meant to live -
 * override with SITE_URL in .env.local for local/staging testing so email
 * links and images point at the right place.
 */
export function siteUrl(): string {
  return (process.env.SITE_URL ?? "https://chgolfco.com").replace(/\/$/, "");
}
