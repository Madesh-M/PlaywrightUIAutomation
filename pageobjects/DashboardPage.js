const { test, expect } = require("@playwright/test");

class DashboardPage {
  constructor(page) {
    this.page = page;
    this.productElems = page.locator("div.card-body");
    this.productAddedToCartMessage = page.locator("div[role='alert']");
  }

  async searchAndAddProductToCart(searchProduct) {
    //search product and add to cart
    let productObj = {};
    await this.productElems.first().waitFor();
    const allProductTitles = await this.productElems
      .locator("h5")
      .allTextContents();
    for (let i = 0; i < allProductTitles.length; i++) {
      console.log("arrayElement " + i + " : " + allProductTitles[i]);
      if (allProductTitles[i] == searchProduct) {
        productObj.selectedProductName = allProductTitles[i];
        productObj.productAmt = await this.productElems
          .locator(".text-muted")
          .nth(i)
          .textContent();
        await this.productElems.locator(".w-10").nth(i).click({ delay: 500 });
        await expect(this.productAddedToCartMessage).toHaveText(
          "Product Added To Cart"
        );
        break;
      }
    }
    return productObj;
  }
}
module.exports = { DashboardPage };
