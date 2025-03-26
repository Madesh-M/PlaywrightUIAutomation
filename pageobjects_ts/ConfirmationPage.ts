import { test, expect, Page, Locator } from "@playwright/test";

export class ConfirmationPage {
  page: Page;
  orderIdEle: Locator;
  confirmBtn: Locator;

  constructor(page: Page) {
    this.page = page;
    this.orderIdEle = page.locator("td.em-spacer-1 label.ng-star-inserted");
    this.confirmBtn = page.locator("button[routerlink*='myorders']");
  }

  async getOrderIdAndClickOnConfirm() {
    await expect(this.page.locator("h1")).toHaveText(
      " Thankyou for the order. "
    );
    const orderId: any = await this.orderIdEle.textContent();
    const orderIdComp = orderId.split(" ")[2];
    console.log(orderIdComp);
    await this.confirmBtn.click();
    return orderIdComp;
  }
}
