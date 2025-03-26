import { LoginPage } from "./LoginPage";
import { DashboardPage } from "./DashboardPage";
import { CartPage } from "./CartPage";
import { CheckoutPage } from "./CheckoutPage";
import { ConfirmationPage } from "./ConfirmationPage";
import { OrderPage } from "./OrderPage";
import { Page } from "@playwright/test";

export class POManager {
  page: Page;
  loginPageObj: LoginPage;
  dashboardPage: DashboardPage;
  cartPageObj: CartPage;
  checkoutPageObj: CheckoutPage;
  confirmPageObj: ConfirmationPage;
  orderPageObj: OrderPage;

  constructor(page: Page) {
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
