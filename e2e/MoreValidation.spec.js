const { test, expect } = require("@playwright/test");

test("Browser forward backward and refresh options", async ({ page }) => {
  await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
  await page.goto("https://google.com");
  await page.goBack(); //goes backt to AutomationPractice page
  await page.goForward(); //goes forward from Automation page back to google page
  await page.reload(); //like browser refresh
});

test("Element hidden or visible validations", async ({ page }) => {
  await page.goto("https://rahulshettyacademy.com/AutomationPractice/");

  await expect(page.getByPlaceholder("Hide/Show Example")).toBeVisible();
  await page.locator("[value='Hide']").click();
  await expect(page.getByPlaceholder("Hide/Show Example")).toBeHidden();
  await page.locator("[value='Show']").click();
  await expect(page.getByPlaceholder("Hide/Show Example")).toBeVisible();
});

test("Popup validations and hower", async ({ page }) => {
  await page.goto("https://rahulshettyacademy.com/AutomationPractice/");

  page.on("dialog", (dialog) => dialog.accept());
  await page.locator("#confirmbtn").click();
  await page.locator("#mousehover").hover();
  await page.getByRole("link", { name: "Top" }).click({ delay: 300 });
});

test("iframes handling", async ({ page }) => {
  await page.goto("https://rahulshettyacademy.com/AutomationPractice/");

  const framesPage = page.frameLocator("#courses-iframe");
  await framesPage.locator("li a[href='lifetime-access']:visible").click(); // ---> for any locator if you want to filter element based on visibility.
  const subscibers = (
    await framesPage.locator("div.content-side h2").textContent()
  ).split(" ")[1];
  console.log(subscibers);
});

test("Taking screenshots and visual validations", async ({ page }) => {
  await page.goto("https://rahulshettyacademy.com/AutomationPractice/");

  await expect(page.getByPlaceholder("Hide/Show Example")).toBeVisible();
  await page.locator("[value='Hide']").click();
  await expect(page.getByPlaceholder("Hide/Show Example")).toBeHidden();
  await page.screenshot({ path: "screenshot.png" });
  await page.locator("[value='Show']").click();
  await expect(page.getByPlaceholder("Hide/Show Example")).toBeVisible();
  await page
    .getByPlaceholder("Hide/Show Example")
    .screenshot({ path: "hiddeleScreenshot.png" });

  // Visual validation
  expect(await page.screenshot()).toMatchSnapshot("expScreenshot.png");
});
