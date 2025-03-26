import { test, expect } from "@playwright/test";
import { POManager } from "../pageobjects/POManager";
import { customTest } from "../utils/test-base";
const dataSet = JSON.parse(
  JSON.stringify(require("../testData/placeOrderTestData.json"))
);

for (const data of dataSet) {
  test.only(`Login and order a product in RSAcademy website - ${data.testCaseNo}`, async ({
    browser,
  }) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    const pageObjManager = new POManager(page);
    const loginPageObj = pageObjManager.getLoginPage();
    const dashboardPage = pageObjManager.getDashboardPage();
    const cartPageObj = pageObjManager.getCartPage();
    const checkoutPageObj = pageObjManager.getCheckoutPage();
    const confirmPageObj = pageObjManager.getConfirmPage();
    const orderPageObj = pageObjManager.getOrderPage();

    const emailId = data.emailId;
    const password = data.password;

    //Login Page
    await loginPageObj.GotoPage();
    await loginPageObj.validLogin(emailId, password);

    //Dashboard Page
    const productObj = await dashboardPage.searchAndAddProductToCart(
      data.productName
    );

    //Cart Page
    await cartPageObj.clickOnCartAndValidateProduct(
      productObj.selectedProductName
    );
    await cartPageObj.clickOnCheckoutButton();

    //Checkout page
    await checkoutPageObj.provideCustomerDetailsAndCouponCode(
      data.custName,
      data.couponCode
    );
    await checkoutPageObj.validateEmailAndSelectCountry(
      emailId,
      data.countryParText,
      data.country
    );

    //Confirmation page
    const orderIdComp = await confirmPageObj.getOrderIdAndClickOnConfirm();

    //Order page
    await orderPageObj.searchOrderIdAndViewOrderDetails(orderIdComp);

    console.log("done");
  });
}

customTest(
  `Login and order a product in RSAcademy website`,
  async ({ browser, testDataForOrder }) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    const pageObjManager = new POManager(page);
    const loginPageObj = pageObjManager.getLoginPage();
    const dashboardPage = pageObjManager.getDashboardPage();
    const cartPageObj = pageObjManager.getCartPage();
    const checkoutPageObj = pageObjManager.getCheckoutPage();
    const confirmPageObj = pageObjManager.getConfirmPage();
    const orderPageObj = pageObjManager.getOrderPage();

    const emailId = testDataForOrder.emailId;
    const password = testDataForOrder.password;

    //Login Page
    await loginPageObj.GotoPage();
    await loginPageObj.validLogin(emailId, password);

    //Dashboard Page
    const productObj = await dashboardPage.searchAndAddProductToCart(
      testDataForOrder.productName
    );

    //Cart Page
    await cartPageObj.clickOnCartAndValidateProduct(
      productObj.selectedProductName
    );
    await cartPageObj.clickOnCheckoutButton();

    //Checkout page
    await checkoutPageObj.provideCustomerDetailsAndCouponCode(
      testDataForOrder.custName,
      testDataForOrder.couponCode
    );
    await checkoutPageObj.validateEmailAndSelectCountry(
      emailId,
      testDataForOrder.countryParText,
      testDataForOrder.country
    );

    //Confirmation page
    const orderIdComp = await confirmPageObj.getOrderIdAndClickOnConfirm();

    //Order page
    await orderPageObj.searchOrderIdAndViewOrderDetails(orderIdComp);

    console.log("done");
  }
);
