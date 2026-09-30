import { expect, test, type Page } from "@playwright/test";

/** Opens the home page and records console errors and failed requests. */
async function openHome(page: Page) {
  const problems: string[] = [];
  page.on("console", (msg) => {
    if (msg.type() === "error") problems.push(`console: ${msg.text()}`);
  });
  page.on("pageerror", (err) => problems.push(`pageerror: ${err.message}`));
  page.on("response", (res) => {
    if (res.status() >= 400) problems.push(`${res.status()} ${res.url()}`);
  });
  page.on("requestfailed", (req) => {
    const reason = req.failure()?.errorText ?? "";
    // Next.js cancels superseded link prefetches on purpose - not a failure.
    if (/ERR_ABORTED|NS_BINDING_ABORTED|cancelled/i.test(reason)) return;
    problems.push(`failed ${req.url()} (${reason})`);
  });

  await page.goto("./");
  await page.waitForLoadState("networkidle");
  return problems;
}

test("loads with no console errors or broken requests", async ({ page }) => {
  const problems = await openHome(page);
  await expect(page).toHaveTitle(/Clubhouse Golf/);
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "Everything golf. One clubhouse.",
  );
  expect(problems).toEqual([]);
});

test("hero carousel images all load", async ({ page }) => {
  await openHome(page);
  const heroImages = page.locator('#course img[src*="/images/hero-"]');
  await expect(heroImages).toHaveCount(5);
  const broken = await heroImages.evaluateAll((imgs) =>
    (imgs as HTMLImageElement[])
      .filter((img) => img.complete && img.naturalWidth === 0)
      .map((img) => img.src),
  );
  expect(broken).toEqual([]);
});

test("countdown shows four ticking fields", async ({ page }) => {
  await openHome(page);
  const values = page.locator("#course span.block");
  await expect(values).toHaveCount(4);
  for (const text of await values.allTextContents()) {
    expect(text).toMatch(/^\d{2,}$/);
  }
});

test("contact CTAs lead to the footer email link", async ({ page }) => {
  await openHome(page);
  await page.getByRole("link", { name: "Get in touch" }).click();
  await expect(page).toHaveURL(/#contact$/);

  const email = page.getByRole("link", { name: "Email us" });
  await expect(email).toBeVisible();
  await expect(email).toHaveAttribute("href", "mailto:hello@chgolfco.com");
  // Root-relative so the header CTA also works from the Reports pages.
  await expect(page.getByRole("link", { name: "Contact Us" })).toHaveAttribute(
    "href",
    "/TheClubHouseGolf/#contact",
  );
});

test("has no forms and no waitlist remnants", async ({ page }) => {
  await openHome(page);
  await expect(page.locator("form")).toHaveCount(0);
  await expect(page.locator('a[href="#waitlist"]')).toHaveCount(0);
  await expect(page.getByText(/waitlist/i)).toHaveCount(0);
});

test("social links open the brand profiles safely", async ({ page }) => {
  await openHome(page);
  const footer = page.locator("footer");
  for (const [name, host] of [
    ["LinkedIn", "linkedin.com"],
    ["Instagram", "instagram.com"],
    ["TikTok", "tiktok.com"],
  ]) {
    const link = footer.getByRole("link", { name, exact: true });
    await expect(link).toHaveAttribute("href", new RegExp(host));
    await expect(link).toHaveAttribute("target", "_blank");
    await expect(link).toHaveAttribute("rel", /noopener/);
  }
});

test("theme toggle switches to dark and persists across reload", async ({
  page,
}) => {
  await openHome(page);
  const html = page.locator("html");
  await expect(html).not.toHaveAttribute("data-theme", "dark");

  await page.getByRole("button", { name: "Switch to dark theme" }).click();
  await expect(html).toHaveAttribute("data-theme", "dark");

  await page.reload();
  await expect(html).toHaveAttribute("data-theme", "dark");
});

test("unknown pages get the 404 page", async ({ page }) => {
  const res = await page.goto("./does-not-exist/");
  expect(res?.status()).toBe(404);
  await expect(page.getByText(/404|could not be found/i).first()).toBeVisible();
});

test("brand preview switches direction, persists, and keeps the logo", async ({
  page,
}) => {
  await openHome(page);
  const html = page.locator("html");
  const preview = page.getByRole("group", { name: "Brand preview" });
  const evolve = preview.getByRole("button", { name: "Evolve" });
  const sunday = preview.getByRole("button", { name: "Sunday Sessions" });
  const wordmark = page.locator("header a[href$='/']").first();
  const logoFont = () =>
    wordmark.locator("span").last().evaluate((el) => getComputedStyle(el).fontFamily);
  const bodyFont = () =>
    page.evaluate(() => getComputedStyle(document.body).fontFamily);

  await expect(html).toHaveAttribute("data-brand", "evolve");
  await expect(evolve).toHaveAttribute("aria-pressed", "true");
  const evolveLogo = await logoFont();
  const evolveBody = await bodyFont();

  await sunday.click();
  await expect(html).toHaveAttribute("data-brand", "sunday");
  await expect(sunday).toHaveAttribute("aria-pressed", "true");
  await expect(page).toHaveURL(/[?&]brand=sunday/);
  expect(await logoFont()).toBe(evolveLogo);
  expect(await bodyFont()).not.toBe(evolveBody);

  await page.reload();
  await expect(html).toHaveAttribute("data-brand", "sunday");

  // "Existing" falls back to today's chgolfco.com tokens.
  await preview.getByRole("button", { name: "Existing" }).click();
  await expect(html).toHaveAttribute("data-brand", "existing");
  const accent = await page.evaluate(() =>
    getComputedStyle(document.documentElement)
      .getPropertyValue("--color-accent")
      .trim(),
  );
  expect(accent).toBe("#a97f2c");
  expect(await logoFont()).toBe(evolveLogo);
});

test("a ?brand= link opens in that direction", async ({ page }) => {
  await page.goto("./?brand=sunday");
  await expect(page.locator("html")).toHaveAttribute("data-brand", "sunday");
  await page.goto("./?brand=bogus");
  await expect(page.locator("html")).toHaveAttribute("data-brand", "sunday");
});

test("Sunday Sessions keeps its daytime palette in dark mode", async ({
  page,
}) => {
  await openHome(page);
  await page.getByRole("button", { name: "Switch to dark theme" }).click();
  await page.goto("./?brand=sunday");
  const html = page.locator("html");
  await expect(html).toHaveAttribute("data-theme", "dark");
  await expect(html).toHaveAttribute("data-brand", "sunday");
  // Sky ground and navy ink, not a dark variant.
  const colors = await page.evaluate(() => ({
    bg: getComputedStyle(document.body).backgroundColor,
    ink: getComputedStyle(document.querySelector("h1")!).color,
  }));
  expect(colors).toEqual({ bg: "rgb(191, 227, 245)", ink: "rgb(27, 35, 64)" });
  // The theme switch does nothing under Sunday, so it's hidden.
  await expect(page.locator(".theme-toggle")).toBeHidden();
});
