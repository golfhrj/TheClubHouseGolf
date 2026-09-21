import { afterEach, describe, expect, it, vi } from "vitest";

// site.ts reads env vars at import time, so each case re-imports it fresh.
async function loadSite(env: Record<string, string | undefined>) {
  vi.resetModules();
  for (const [key, value] of Object.entries(env)) vi.stubEnv(key, value);
  return import("../../src/lib/site");
}

afterEach(() => {
  vi.unstubAllEnvs();
});

describe("asset()", () => {
  it("returns the path unchanged when no base path is set", async () => {
    const { asset, BASE_PATH } = await loadSite({
      NEXT_PUBLIC_BASE_PATH: undefined,
    });
    expect(BASE_PATH).toBe("");
    expect(asset("/images/hero.jpg")).toBe("/images/hero.jpg");
  });

  it("prefixes the GitHub Pages sub-path", async () => {
    const { asset } = await loadSite({
      NEXT_PUBLIC_BASE_PATH: "/TheClubHouseGolf",
    });
    expect(asset("/brand/logo.png")).toBe("/TheClubHouseGolf/brand/logo.png");
  });
});

describe("siteUrl()", () => {
  it("defaults to the github.io project URL", async () => {
    const { siteUrl } = await loadSite({ NEXT_PUBLIC_SITE_URL: undefined });
    expect(siteUrl()).toBe("https://golfhrj.github.io/TheClubHouseGolf");
  });

  it("uses NEXT_PUBLIC_SITE_URL and strips a trailing slash", async () => {
    const { siteUrl } = await loadSite({
      NEXT_PUBLIC_SITE_URL: "https://chgolfco.com/",
    });
    expect(siteUrl()).toBe("https://chgolfco.com");
  });
});
