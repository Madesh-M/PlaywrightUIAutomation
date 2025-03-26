const { test, expect } = require("@playwright/test");

class LoginPage {
  constructor(page) {
    this.page = page;
    this.emailIdEle = page.locator("[placeholder='email@example.com']");
    this.passwordEle = page.locator("#userPassword");
    this.loginButton = page.locator("input#login");
    this.loginMessageEle = page.locator("div.toast-title");
  }

  async GotoPage() {
    await this.page.goto("https://rahulshettyacademy.com/client/");
    await expect(this.page).toHaveTitle("Let's Shop");
  }

  async validLogin(testEmail, testPassword) {
    await this.emailIdEle.pressSequentially(testEmail, { delay: 100 });
    await this.passwordEle.pressSequentially(testPassword, { delay: 100 });
    await this.loginButton.click();
    await expect(this.loginMessageEle).toHaveText("Login Successfully");
  }
}
module.exports = { LoginPage };
