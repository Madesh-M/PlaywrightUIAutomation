const playwright = require("@playwright/test");
const { POManager } = require("../../pageobjects/POManager.js");
const { Before, After, AfterStep, Status } = require("@cucumber/cucumber");
const path = require("path");

Before(async function () {
  const browser = await playwright.chromium.launch({ headless: false });
  const context = await browser.newContext();
  this.page = await context.newPage();
  this.pageObjManager = new POManager(this.page);
});

After(function () {
  console.log("Test is executed");
});

AfterStep(async function ({ result }) {
  // This hook will be executed after all steps, and take a screenshot on step failure
  if (result.status === Status.FAILED) {
    await this.page.screenshot({
      path: "features/screenshots/failedStepSS.png",
    });
  }
});
