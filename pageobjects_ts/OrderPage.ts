import { test, expect, Page, Locator } from "@playwright/test";

export class OrderPage {
  page: Page;
  orderTableRow: Locator;

  constructor(page: Page) {
    this.page = page;
    this.orderTableRow = page.locator("table tr");
  }

  async searchOrderIdAndViewOrderDetails(orderIdComp: any) {
    await this.orderTableRow.first().waitFor();
    const rowCount = await this.orderTableRow.count();
    for (let i = 0; i < rowCount; i++) {
      const orderIdRowText: any = await this.orderTableRow
        .locator("th[scope='row']")
        .nth(i)
        .textContent();
      if (orderIdRowText.trim() === orderIdComp.trim()) {
        await this.orderTableRow.locator("td:has-text('View')").nth(i).click();
        break;
      }
    }
  }
}
