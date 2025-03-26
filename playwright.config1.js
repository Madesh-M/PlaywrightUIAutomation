// @ts-check
import { chromium, defineConfig, devices } from "@playwright/test";

/**
 * @see https://playwright.dev/docs/test-configuration
 */
const config = {
  testDir: "./e2e",
  outputDir: "videos",
  retries: 1,
  workers: 3,
  timeout: 60 * 1000,
  expect: { timeout: 20 * 1000 },
  reporter: [["html", { outputFolder: "ui-report" }]],
  projects: [
    {
      name: "safari",
      use: {
        browserName: "webkit",
        headless: true,
        screenshot: "off",
        trace: "only-on-failure",
        //...devices["iPad (gen 5)"],
      },
    },
    {
      name: "chrome",
      use: {
        browserName: "chromium",
        headless: false,
        screenshot: "only-on-failure",
        trace: "only-on-failure",
        ignoreHttpsErrors: true,
        permissions: ["geolocation"],
        video: "retain-on-failure",
        // ...devices["Pixel 2"],
        // viewport: { width: 720, height: 720 },
      },
    },
    {
      name: "firefox",
      use: {
        browserName: "firefox",
        headless: true,
        screenshot: "off",
        trace: "only-on-failure",
      },
    },
  ],
};

module.exports = config;
