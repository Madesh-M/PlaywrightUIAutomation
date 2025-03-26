const { test, expect } = require("@playwright/test");

class OrderPage {
  constructor(page) {
    this.page = page;
    this.orderTableRow = page.locator("table tr");
  }

  async searchOrderIdAndViewOrderDetails(orderIdComp) {
    await this.orderTableRow.first().waitFor();
    const rowCount = await this.orderTableRow.count();
    for (let i = 0; i < rowCount; i++) {
      const orderIdRowText = await this.orderTableRow
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
module.exports = { OrderPage };
