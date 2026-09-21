import { defineConfig, devices } from "@playwright/test";

// E2E runs against the built static export (npm run build first), served
// under the GitHub Pages sub-path by tests/e2e/serve-out.mjs.
const PORT = 4173;

export default defineConfig({
  testDir: "tests/e2e",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  reporter: "list",
  use: {
    baseURL: `http://localhost:${PORT}/TheClubHouseGolf/`,
    trace: "retain-on-failure",
  },
  projects: [
    { name: "desktop", use: { ...devices["Desktop Chrome"] } },
    { name: "mobile", use: { ...devices["Pixel 7"] } },
  ],
  webServer: {
    command: "node tests/e2e/serve-out.mjs",
    url: `http://localhost:${PORT}/TheClubHouseGolf/`,
    reuseExistingServer: !process.env.CI,
    env: { PORT: String(PORT) },
  },
});
