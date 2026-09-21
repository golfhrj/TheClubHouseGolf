import { expect, test } from "@playwright/test";

const STRATEGY = /\/TheClubHouseGolf\/reports\/marketing\/strategy\/$/;

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
    "Marketing Strategy Report V2 - Marketing | Clubhouse Golf",
  );

  const report = page.frameLocator(
    'iframe[title="Marketing Strategy Report V2"]',
  );
  await expect(report.locator("h1")).toContainText("Marketing");
  await expect(report.getByText("Competitive Landscape").first()).toBeVisible();
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
    "/TheClubHouseGolf/reports/marketing/strategy-report-v2-2026-09-20.html",
  );
  const res = await request.get(href!);
  expect(res.status()).toBe(200);
  expect(await res.text()).toContain("Competitor Profiles");
});

test("site theme is mirrored into the embedded report", async ({ page }) => {
  await page.goto("./reports/marketing/strategy/");
  const reportRoot = page
    .frameLocator('iframe[title="Marketing Strategy Report V2"]')
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
