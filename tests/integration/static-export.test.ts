import { execSync } from "node:child_process";
import { existsSync, readFileSync, readdirSync } from "node:fs";
import path from "node:path";
import { beforeAll, describe, expect, it } from "vitest";

/**
 * Builds the real static export exactly as the GitHub Pages workflow does,
 * then checks the output: every local URL in the HTML must resolve to a
 * file in out/, and nothing server-only may be left behind.
 */
const ROOT = path.resolve(__dirname, "../..");
const OUT = path.join(ROOT, "out");
const BASE = "/TheClubHouseGolf";
const SITE = "https://golfhrj.github.io/TheClubHouseGolf";

let html = "";

beforeAll(() => {
  execSync("npm run build", {
    cwd: ROOT,
    stdio: "pipe",
    env: {
      ...process.env,
      NEXT_PUBLIC_BASE_PATH: BASE,
      NEXT_PUBLIC_SITE_URL: SITE,
      MSYS_NO_PATHCONV: "1",
    },
  });
  html = readFileSync(path.join(OUT, "index.html"), "utf8");
}, 240_000);

/** Maps a site URL like /TheClubHouseGolf/brand/logo.png to its file in out/. */
function fileFor(url: string): string {
  const clean = url.split(/[?#]/)[0].slice(BASE.length);
  return path.join(OUT, decodeURIComponent(clean));
}

function listFiles(dir: string): string[] {
  return readdirSync(dir, { withFileTypes: true }).flatMap((e) =>
    e.isDirectory()
      ? listFiles(path.join(dir, e.name))
      : [path.join(dir, e.name)],
  );
}

describe("static export", () => {
  it("produces index.html and a 404 page", () => {
    expect(existsSync(path.join(OUT, "index.html"))).toBe(true);
    expect(existsSync(path.join(OUT, "404.html"))).toBe(true);
  });

  it("prefixes every local href/src with the base path", () => {
    const local = [...html.matchAll(/(?:href|src)="(\/[^"]*)"/g)].map(
      (m) => m[1],
    );
    expect(local.length).toBeGreaterThan(0);
    for (const url of local) expect(url.startsWith(`${BASE}/`)).toBe(true);
  });

  it("points every local asset in the HTML at a file that exists", () => {
    const urls = new Set([
      ...[...html.matchAll(/(?:href|src)="(\/TheClubHouseGolf\/[^"]+)"/g)].map(
        (m) => m[1],
      ),
      ...[...html.matchAll(/url\((\/TheClubHouseGolf\/[^)]+)\)/g)].map(
        (m) => m[1],
      ),
    ]);
    const missing = [...urls].filter(
      (u) => !u.endsWith("/") && !existsSync(fileFor(u)),
    );
    expect(missing).toEqual([]);
  });

  it("bundles the golf cursors into the CSS", () => {
    const css = listFiles(path.join(OUT, "_next"))
      .filter((f) => f.endsWith(".css"))
      .map((f) => readFileSync(f, "utf8"))
      .join("\n");
    expect(css).toMatch(/golf-club\.[^)]*\.svg/);
    expect(css).toMatch(/golf-ball\.[^)]*\.svg/);
    expect(css).not.toContain('url("/cursors/');
  });

  it("emits absolute SEO URLs without a doubled base path", () => {
    expect(html).toContain(`<link rel="canonical" href="${SITE}/"`);
    expect(html).toContain(`content="${SITE}/opengraph-image.png`);
    expect(html).not.toContain(`${BASE}${BASE}`);
    expect(existsSync(path.join(OUT, "opengraph-image.png"))).toBe(true);
  });

  it("contains no waitlist/contact forms or API calls", () => {
    expect(html).not.toMatch(/<form[\s>]/);
    const js = listFiles(OUT)
      .filter((f) => f.endsWith(".js"))
      .map((f) => readFileSync(f, "utf8"))
      .join("\n");
    expect(js).not.toContain("/api/waitlist");
    expect(js).not.toContain("/api/contact");
  });
});

describe("reports", () => {
  const PAGES = [
    "reports/index.html",
    "reports/marketing/index.html",
    "reports/marketing/strategy/index.html",
    "reports/marketing/demographics-device-mix/index.html",
    "reports/marketing/membership/index.html",
    "reports/marketing/website-feedback/index.html",
  ];

  it("exports a page for Reports, Marketing and each report", () => {
    for (const page of PAGES)
      expect(existsSync(path.join(OUT, page))).toBe(true);
  });

  it("points every local link on the report pages at a real file", () => {
    for (const page of PAGES) {
      const pageHtml = readFileSync(path.join(OUT, page), "utf8");
      const urls = [
        ...pageHtml.matchAll(/(?:href|src)="(\/TheClubHouseGolf\/[^"#]+)"/g),
      ].map((m) => m[1]);
      const missing = urls.filter((u) => {
        const file = fileFor(u);
        return !existsSync(
          u.endsWith("/") ? path.join(file, "index.html") : file,
        );
      });
      expect(missing, page).toEqual([]);
    }
  });

  it("embeds the strategy report", () => {
    const pageHtml = readFileSync(
      path.join(OUT, "reports/marketing/strategy/index.html"),
      "utf8",
    );
    expect(pageHtml).toContain(
      '<iframe src="/TheClubHouseGolf/reports/marketing/strategy-report-v3-2026-09-21.html"',
    );
    const embedded = readFileSync(
      path.join(OUT, "reports/marketing/strategy-report-v3-2026-09-21.html"),
      "utf8",
    );
    expect(embedded).toContain("Competitor Profiles");
  });

  it("strategy report V3 covers all 20 competitors and declares UTF-8", () => {
    const embedded = readFileSync(
      path.join(OUT, "reports/marketing/strategy-report-v3-2026-09-21.html"),
      "utf8",
    );
    expect(embedded.match(/<details class="profile"/g)).toHaveLength(20);
    for (const id of [
      "p-18birdies",
      "p-skillest",
      "p-aiassistants",
      "p-forums",
      "p-arccos",
    ]) {
      expect(embedded).toContain(`id="${id}"`);
    }
    expect(embedded.slice(0, 120)).toMatch(/<meta charset="utf-8">/i);
  });

  it("uses the corrected strategy report name", () => {
    const embedded = readFileSync(
      path.join(OUT, "reports/marketing/strategy-report-v3-2026-09-21.html"),
      "utf8",
    );
    expect(embedded).toContain(
      "<h1>Clubhouse Golf Marketing Strategy Report V3 - Sept 21 2026</h1>",
    );
    expect(embedded).not.toMatch(/Startegy|Spet/);
  });

  it("embeds the Demographics · Device Mix scorecard", () => {
    const pageHtml = readFileSync(
      path.join(OUT, "reports/marketing/demographics-device-mix/index.html"),
      "utf8",
    );
    expect(pageHtml).toContain(
      '<iframe src="/TheClubHouseGolf/reports/marketing/demographics-device-mix-2026-09.html"',
    );
    const embedded = readFileSync(
      path.join(OUT, "reports/marketing/demographics-device-mix-2026-09.html"),
      "utf8",
    );
    expect(embedded).toContain("<h1>Demographics · Device Mix</h1>");
    expect(embedded).not.toContain("Clubhouse Scorecard");
    expect(embedded).toContain("The 19th hole");
  });
});
