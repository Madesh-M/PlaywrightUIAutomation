const { Given, When, Then } = require("@cucumber/cucumber");
const { POManager } = require("../../pageobjects/POManager.js");

Given(
  "User logins to Ecommerce website with following login creds- {string} and {string}",
  { timeout: 100 * 1000 },
  async function (username, password) {
    const loginPageObj = this.pageObjManager.getLoginPage();
    await loginPageObj.GotoPage();
    await loginPageObj.validLogin(username, password);
  }
);

When("User Add {string} product to Cart", async function (productName) {
  const dashboardPage = this.pageObjManager.getDashboardPage();
  this.productObj = await dashboardPage.searchAndAddProductToCart(productName);
});

Then("User verify {string} product in the Cart", async function (productName) {
  const cartPageObj = this.pageObjManager.getCartPage();
  await cartPageObj.clickOnCartAndValidateProduct(
    this.productObj.selectedProductName
  );
  await cartPageObj.clickOnCheckoutButton();
});

Then("User fills his details and place the Order", async function () {
  const checkoutPageObj = this.pageObjManager.getCheckoutPage();
  await checkoutPageObj.provideCustomerDetailsAndCouponCode(
    "Madesh",
    "rahulshettyacademy"
  );
  await checkoutPageObj.validateEmailAndSelectCountry(
    "testmadu@gmail.com",
    "Ind",
    " India"
  );
});

Then(
  "User verify order is present in the confirmation page",
  async function () {
    const confirmPageObj = this.pageObjManager.getConfirmPage();
    this.orderIdComp = await confirmPageObj.getOrderIdAndClickOnConfirm();
  }
);

Then("User verify order in myOrder page", async function () {
  const orderPageObj = this.pageObjManager.getOrderPage();
  await orderPageObj.searchOrderIdAndViewOrderDetails(this.orderIdComp);
});
