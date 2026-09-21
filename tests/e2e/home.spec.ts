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
