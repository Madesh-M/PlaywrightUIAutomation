const { test, expect } = require("@playwright/test");

test("@web Calendar Validations", async ({ page }) => {
  const monthNum = "3";
  const date = "10";
  const year = "2025";

  await page.goto("https://rahulshettyacademy.com/seleniumPractise/#/offers");

  await page.locator(".react-date-picker__inputGroup").click();
  await page.locator(".react-calendar__navigation__label").click();
  await page.locator(".react-calendar__navigation__label").click();
  await page.getByRole("button", { name: year }).click();
  await page
    .locator(".react-calendar__year-view__months__month")
    .nth(Number(monthNum) - 1)
    .click();
  const monthNameArr = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  await page
    .locator(
      "abbr[aria-label*='" +
        monthNameArr[Number(monthNum) - 1] +
        " " +
        date +
        "']"
    )
    .click();

  const deliveryDateEle = page.locator(".react-date-picker__inputGroup input");
  //Approach 1
  await expect(deliveryDateEle.first()).toHaveAttribute(
    "value",
    year + "-" + ("0" + monthNum).slice(-2) + "-" + date
  );
});
