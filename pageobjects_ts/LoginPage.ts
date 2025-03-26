import { test, expect, Page, Locator } from "@playwright/test";

export class LoginPage {
  page: Page;
  emailIdEle: Locator;
  passwordEle: Locator;
  loginButton: Locator;
  loginMessageEle: Locator;

  constructor(page: Page) {
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

  async validLogin(testEmail: string, testPassword: string) {
    await this.emailIdEle.pressSequentially(testEmail, { delay: 100 });
    await this.passwordEle.pressSequentially(testPassword, { delay: 100 });
    await this.loginButton.click();
    await expect(this.loginMessageEle).toHaveText("Login Successfully");
  }
}
