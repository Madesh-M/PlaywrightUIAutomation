import { test, expect } from "@playwright/test";
import { Page, Locator } from "@playwright/test";

export class CartPage {
  page: Page;
  cartButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.cartButton = page.locator("button[routerlink*='cart']");
  }

  async clickOnCartAndValidateProduct(selectedProductName: string) {
    const textComp: any = await this.cartButton.locator("label").textContent();
    if (textComp == 1) {
      await this.cartButton.click();
    }
    await this.page.locator("div li").first().waitFor();
    expect(
      await this.page
        .locator("h3:has-text('" + selectedProductName + "')")
        .isVisible()
    ).toBeTruthy();
  }

  async clickOnCheckoutButton() {
    await this.page.locator("button:has-text('Checkout')").click();
  }
}
