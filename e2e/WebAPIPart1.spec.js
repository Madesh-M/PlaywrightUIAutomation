import { test, expect, request } from "@playwright/test";
import { APIUtils } from "../utils/APIUtils";
const loginPayload = {
  userEmail: "testmadu@gmail.com",
  userPassword: "Testmadu@123",
};
const orderPayload = {
  orders: [{ country: "Japan", productOrderedId: "67a8df56c0d3e6622a297ccd" }],
};
let response;
//
test.beforeAll(async () => {
  const apiContext = await request.newContext();
  const apiUtilsObj = new APIUtils(apiContext, loginPayload);
  response = await apiUtilsObj.createOrder(orderPayload);
});
//

test("Login and order a product in RSAcademy website", async ({ page }) => {
  page.addInitScript((value) => {
    window.localStorage.setItem("token", value);
  }, response.token);

  const productElems = page.locator("div.card-body");

  await page.goto("https://rahulshettyacademy.com/client/");
  //search product and add to cart
  await productElems.first().waitFor();

  //Confirmation page
  await page.locator("button[routerlink*='myorders']").click();

  //Order page
  const orderTableRow = page.locator("table tr");
  await orderTableRow.first().waitFor({ state: "visible" });
  const rowCount = await orderTableRow.count();
  for (let i = 0; i < rowCount; i++) {
    const orderIdRowText = await orderTableRow
      .locator("th[scope='row']")
      .nth(i)
      .textContent();
    if (orderIdRowText == response.orderId) {
      await orderTableRow.locator("td:has-text('View')").nth(i).click();
      break;
    }
  }

  console.log("done");
});
