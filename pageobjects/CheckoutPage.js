const { test, expect } = require("@playwright/test");

class CheckoutPage {
  constructor(page) {
    this.page = page;
    this.cardExpDateEle = page.locator("select.ddl");
    this.cardCVVAndCouponEle = page.locator("div.small input");
    this.customerNameEle = page.locator("input[class='input txt']");
    this.applyCouponBtn = page.locator("button:has-text('Apply Coupon')");
    this.actEmailIDDisplayedEle = page.locator("label[style*='lightgray']");
    this.couponSuccessMsgele = page.locator("p[style='color: green;']");
    this.countryNameDynamicDPEle = page.locator(
      "[placeholder='Select Country']"
    );
    this.countryOptions = page.locator(".ta-results");
    this.submitBtn = page.locator("a.action__submit");
  }

  async provideCustomerDetailsAndCouponCode(custName, couponCode) {
    await this.cardExpDateEle.first().selectOption("01");
    await this.cardExpDateEle.last().selectOption("18");
    await this.cardCVVAndCouponEle.first().fill("012");
    await this.customerNameEle.last().fill(custName);
    await this.cardCVVAndCouponEle.last().fill(couponCode);
    await this.applyCouponBtn.click();
    const couponSuccessMsg = await this.couponSuccessMsgele.textContent();
    console.log(couponSuccessMsg);
    await expect(this.couponSuccessMsgele).toHaveText("* Coupon Applied");
  }

  async validateEmailAndSelectCountry(emailId, initText, country) {
    await this.actEmailIDDisplayedEle.waitFor();
    await expect(this.actEmailIDDisplayedEle).toHaveText(emailId);
    await this.countryNameDynamicDPEle.pressSequentially(initText, {
      delay: 100,
    });
    await this.countryOptions.waitFor();
    const countryDrpDwnCount = await this.countryOptions
      .locator("button")
      .count();
    for (let i = 0; i < countryDrpDwnCount; i++) {
      let countryText = await this.countryOptions
        .locator("button")
        .nth(i)
        .textContent();
      if (countryText === country) {
        await this.countryOptions.locator("button").nth(i).click();
        break;
      }
    }
    await this.submitBtn.click();
  }
}
module.exports = { CheckoutPage };
