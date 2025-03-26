// @ts-check
import { chromium, defineConfig, devices } from "@playwright/test";

/**
 * @see https://playwright.dev/docs/test-configuration
 */
const config = {
  testDir: "./e2e",
  timeout: 60 * 1000,
  expect: { timeout: 20 * 1000 },
  reporter: "html",

  use: {
    browserName: "chromium",
    headless: false,
    screenshot: "on",
    trace: "only-on-failure",
  },
};

module.exports = config;
