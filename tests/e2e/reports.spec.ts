import { expect, test } from "@playwright/test";

const STRATEGY = /\/TheClubHouseGolf\/reports\/marketing\/strategy\/$/;
const STRATEGY_TITLE =
  "Clubhouse Golf Marketing Strategy Report V3 - Sept 21 2026";
const SCORECARD_TITLE = "Demographics · Device Mix";

test("Reports › Marketing › Strategy tabs lead to the report", async ({
  page,
}) => {
  const failed: string[] = [];
  page.on("response", (res) => {
    if (res.status() >= 400) failed.push(`${res.status()} ${res.url()}`);
  });

  await page.goto("./");
  await page
    .getByRole("navigation")
    .getByRole("link", { name: "Reports", exact: true })
    .click();
  await expect(page).toHaveURL(/\/TheClubHouseGolf\/reports\/$/);
  await expect(page).toHaveTitle("Reports | Clubhouse Golf");

  const sections = page.getByRole("navigation", { name: "Report sections" });
  await sections.getByRole("link", { name: "Marketing" }).click();
  await expect(page).toHaveURL(/\/reports\/marketing\/$/);
  await expect(
    sections.getByRole("link", { name: "Marketing" }),
  ).toHaveAttribute("aria-current", "page");

  const reports = page.getByRole("navigation", { name: "Marketing reports" });
  await reports.getByRole("link", { name: "Strategy" }).click();
  await expect(page).toHaveURL(STRATEGY);
  await expect(reports.getByRole("link", { name: "Strategy" })).toHaveAttribute(
    "aria-current",
    "page",
  );
  await expect(page).toHaveTitle(
    `${STRATEGY_TITLE} - Marketing | Clubhouse Golf`,
  );
  await expect(page.getByRole("heading", { level: 2 })).toHaveText(
    STRATEGY_TITLE,
  );

  const report = page.frameLocator(`iframe[title="${STRATEGY_TITLE}"]`);
  await expect(report.locator("h1")).toHaveText(STRATEGY_TITLE);
  await expect(report.getByText("Competitive Landscape").first()).toBeVisible();
  await expect(report.locator("details.profile")).toHaveCount(20);
  await expect(report.getByRole("button", { name: "All 20" })).toBeVisible();
  expect(failed).toEqual([]);
});

test("strategy report deep link loads and offers a full-screen view", async ({
  page,
  request,
}) => {
  await page.goto("./reports/marketing/strategy/");
  await expect(page.getByRole("heading", { name: "Reports" })).toBeVisible();

  const fullScreen = page.getByRole("link", { name: /Open full screen/ });
  const href = await fullScreen.getAttribute("href");
  expect(href).toBe(
    "/TheClubHouseGolf/reports/marketing/strategy-report-v3-2026-09-21.html",
  );
  const res = await request.get(href!);
  expect(res.status()).toBe(200);
  expect(await res.text()).toContain("Competitor Profiles");
});

test("site theme is mirrored into the embedded report", async ({ page }) => {
  await page.goto("./reports/marketing/strategy/");
  const reportRoot = page
    .frameLocator(`iframe[title="${STRATEGY_TITLE}"]`)
    .locator("html");
  await expect(reportRoot).toHaveAttribute("data-theme", "light");

  await page.getByRole("button", { name: "Switch to dark theme" }).click();
  await expect(reportRoot).toHaveAttribute("data-theme", "dark");
});

test("navbar links from a report page return to the home sections", async ({
  page,
}) => {
  await page.goto("./reports/marketing/strategy/");
  await page.getByRole("link", { name: "Contact Us" }).click();
  await expect(page).toHaveURL(/\/TheClubHouseGolf\/#contact$/);
  await expect(page.getByRole("link", { name: "Email us" })).toBeVisible();
});

test("unknown report sections are 404", async ({ page }) => {
  const res = await page.goto("./reports/finance/");
  expect(res?.status()).toBe(404);
});

test("Marketing › Demographics · Device Mix shows the scorecard", async ({
  page,
}) => {
  const failed: string[] = [];
  page.on("response", (res) => {
    if (res.status() >= 400) failed.push(`${res.status()} ${res.url()}`);
  });

  await page.goto("./reports/marketing/strategy/");
  const reports = page.getByRole("navigation", { name: "Marketing reports" });
  await reports
    .getByRole("link", { name: "Demographics · Device Mix" })
    .click();
  await expect(page).toHaveURL(
    /\/TheClubHouseGolf\/reports\/marketing\/demographics-device-mix\/$/,
  );
  await expect(
    reports.getByRole("link", { name: "Demographics · Device Mix" }),
  ).toHaveAttribute("aria-current", "page");
  await expect(page).toHaveTitle(
    `${SCORECARD_TITLE} - Marketing | Clubhouse Golf`,
  );

  for (const [label, value] of [
    ["Prepared for", "Clubhouse Golf (chgolfco)"],
    ["Carded", "September 2026"],
    ["Holes played", "3 + the 19th"],
  ]) {
    const item = page.locator("article dl > div", { hasText: label });
    await expect(item.locator("dd")).toHaveText(value);
  }

  const scorecard = page.frameLocator(`iframe[title="${SCORECARD_TITLE}"]`);
  await expect(scorecard.locator("h1")).toHaveText(SCORECARD_TITLE);
  await expect(
    scorecard.getByRole("heading", { name: /The 19th hole/ }),
  ).toBeVisible();
  expect(failed).toEqual([]);
});

test("Marketing section lists every report with its details", async ({
  page,
}) => {
  await page.goto("./reports/marketing/");
  await expect(
    page.getByRole("link", { name: /Strategy Report V3/ }),
  ).toHaveAttribute("href", "/TheClubHouseGolf/reports/marketing/strategy/");
  // The tab shares the card's name, so pick the card by its details.
  const card = page.getByRole("link", {
    name: /Demographics · Device Mix.*Prepared for/,
  });
  await expect(card).toHaveAttribute(
    "href",
    "/TheClubHouseGolf/reports/marketing/demographics-device-mix/",
  );
  await expect(card).toContainText("Clubhouse Golf (chgolfco)");
  await expect(card).toContainText("3 + the 19th");

  const membership = page.getByRole("link", { name: /Membership Approach/ });
  await expect(membership).toHaveAttribute(
    "href",
    "/TheClubHouseGolf/reports/marketing/membership/",
  );
  await expect(membership).toContainText("29 Sep (feature freeze)");

  const feedback = page.getByRole("link", { name: /Website Feedback Report/ });
  await expect(feedback).toHaveAttribute(
    "href",
    "/TheClubHouseGolf/reports/marketing/website-feedback/",
  );
  await expect(feedback).toContainText("5 changes, ~80% of impact");
});

test("Marketing › Website Feedback leads with the suggested fixes", async ({
  page,
}) => {
  const failed: string[] = [];
  page.on("response", (res) => {
    if (res.status() >= 400) failed.push(`${res.status()} ${res.url()}`);
  });

  await page.goto("./reports/marketing/strategy/");
  const reports = page.getByRole("navigation", { name: "Marketing reports" });
  await reports.getByRole("link", { name: "Website Feedback" }).click();
  await expect(page).toHaveURL(
    /\/TheClubHouseGolf\/reports\/marketing\/website-feedback\/$/,
  );
  await expect(page).toHaveTitle(
    "Website Feedback Report - Marketing | Clubhouse Golf",
  );

  const report = page.frameLocator('iframe[title="Website Feedback Report"]');
  await expect(report.locator("h1")).toHaveText("Website Feedback Report");
  await expect(
    report.getByRole("heading", {
      name: "Five changes deliver about 80% of the impact",
    }),
  ).toBeVisible();
  await expect(
    report.getByRole("heading", {
      name: "Take the demo store offline until launch",
    }),
  ).toBeVisible();
  expect(failed).toEqual([]);
});

test("Marketing › Membership shows the Phase 1 recommendation", async ({
  page,
}) => {
  const failed: string[] = [];
  page.on("response", (res) => {
    if (res.status() >= 400) failed.push(`${res.status()} ${res.url()}`);
  });

  await page.goto("./reports/marketing/strategy/");
  const reports = page.getByRole("navigation", { name: "Marketing reports" });
  await reports.getByRole("link", { name: "Membership" }).click();
  await expect(page).toHaveURL(
    /\/TheClubHouseGolf\/reports\/marketing\/membership\/$/,
  );
  await expect(page).toHaveTitle(
    "Membership Approach - Phase 1 - Marketing | Clubhouse Golf",
  );

  const brief = page.frameLocator(
    'iframe[title="Membership Approach - Phase 1"]',
  );
  await expect(brief.locator("h1")).toHaveText("Membership Approach — Phase 1");
  await expect(
    brief.getByRole("heading", { name: "The recommendation" }),
  ).toBeVisible();
  await expect(
    brief.getByText("Ship Founding Member as a badge and an account flag"),
  ).toBeVisible();
  expect(failed).toEqual([]);
});

test("site theme is mirrored into the scorecard", async ({ page }) => {
  await page.goto("./reports/marketing/demographics-device-mix/");
  const root = page
    .frameLocator(`iframe[title="${SCORECARD_TITLE}"]`)
    .locator("html");
  await expect(root).toHaveAttribute("data-theme", "light");
  await page.getByRole("button", { name: "Switch to dark theme" }).click();
  await expect(root).toHaveAttribute("data-theme", "dark");
});
