const { LoginPage } = require("./LoginPage.js");
const { DashboardPage } = require("./DashboardPage.js");
const { CartPage } = require("./CartPage.js");
const { CheckoutPage } = require("./CheckoutPage.js");
const { ConfirmationPage } = require("./ConfirmationPage.js");
const { OrderPage } = require("./OrderPage.js");

class POManager {
  constructor(page) {
    this.page = page;
    this.loginPageObj = new LoginPage(page);
    this.dashboardPage = new DashboardPage(page);
    this.cartPageObj = new CartPage(page);
    this.checkoutPageObj = new CheckoutPage(page);
    this.confirmPageObj = new ConfirmationPage(page);
    this.orderPageObj = new OrderPage(page);
  }

  getLoginPage() {
    return this.loginPageObj;
  }
  getDashboardPage() {
    return this.dashboardPage;
  }
  getCartPage() {
    return this.cartPageObj;
  }
  getCheckoutPage() {
    return this.checkoutPageObj;
  }
  getConfirmPage() {
    return this.confirmPageObj;
  }
  getOrderPage() {
    return this.orderPageObj;
  }
}
module.exports = { POManager };
