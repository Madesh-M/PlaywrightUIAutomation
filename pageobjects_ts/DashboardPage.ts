import { test, expect, Page, Locator } from "@playwright/test";

export class DashboardPage {
  page: Page;
  productElems: Locator;
  productAddedToCartMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.productElems = page.locator("div.card-body");
    this.productAddedToCartMessage = page.locator("div[role='alert']");
  }

  async searchAndAddProductToCart(searchProduct: string) {
    //search product and add to cart
    let productObj: { selectedProductName: string; productAmt: any } = {
      selectedProductName: "",
      productAmt: "",
    };
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
