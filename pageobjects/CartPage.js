const { test, expect } = require("@playwright/test");

class CartPage {
  constructor(page) {
    this.page = page;
    this.cartButton = page.locator("button[routerlink*='cart']");
  }

  async clickOnCartAndValidateProduct(selectedProductName) {
    if ((await this.cartButton.locator("label").textContent()) == 1) {
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
module.exports = { CartPage };
