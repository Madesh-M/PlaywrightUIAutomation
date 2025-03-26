import { test, expect } from "@playwright/test"; //importing module
import { randStr } from "../utils/Utilities";
import { exit } from "process";

//test('test name', function(){});
9;
test("@web First Playwright test", async ({ browser }) => {
  //using context, browser state like plugins can be provided instead of using new and empty browser
  //Step 8-9 can be option based on your usage- if you don't need any special browser sessions including cookie or plugins directly go to Step 10
  const context = await browser.newContext();
  const page = await context.newPage();
  const username = page.locator("input#username");
  const password = page.locator("[name='password']");
  const signIn = page.locator("input.btn-md");
  const errMessageEle = page.locator("[style*='block']");
  const productTitles = page.locator("div.card-body h4 a");

  await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
  //provides title
  console.log(await page.title());
  //validates whether page title is what we provide and return boolean
  await expect(page).toHaveTitle("LoginPage Practise | Rahul Shetty Academy");
  // xpath or css selectors(predominantly used) are used
  await username.pressSequentially("rahulshettyacademy", { delay: 100 });
  await password.pressSequentially("learning", { delay: 100 });
  await signIn.click();
  // const errText = await errMessageEle.textContent();
  // console.log(errText);
  // await expect(errMessageEle).toContainText("Incorrect username/password");

  console.log(await productTitles.first().textContent());
  // console.log(await productTitles.nth(1).textContent());
  // console.log(await productTitles.last().textContent());

  const allTitles = await productTitles.allTextContents();

  for (let i = 0; i < allTitles.length; i++) {
    console.log("arrayElement " + i + " : " + allTitles[i]);
    if (allTitles[i] == "Blackberry") {
      await productTitles.nth(i).click();
      console.log("done");
    }
  }
});

test("@web Register and login user to RSWebsite", async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();
  const registerLink = page.locator("div.p-5 p a");
  const firstNameEle = page.locator("input#firstName");
  const lastNameEle = page.locator("input#lastName");
  const emailIdEle = page.locator("[placeholder='email@example.com']");
  const phoneNumEle = page.locator("[formcontrolname='userMobile']");
  const occupationEle = page.locator("select[formcontrolname='occupation']");
  const genderEle = page.locator("input[value='Male']");
  const passwordEle = page.locator("#userPassword");
  const confirmPasswordEle = page.locator("#confirmPassword");
  const ageConfCheckboxEle = page.locator("input[type='checkbox']");
  const registerButtonEle = page.locator("input[value='Register']");
  const errMesageEle = page.locator("div#toast-container div[role='alert']");
  const userCreatedSuccessMsg = page.locator("h1.headcolor");
  const loginButtonAfterRegEle = page.locator("div.login-wrapper button");
  const loginButton = page.locator("input#login");
  const productHeadingElems = page.locator("div.card-body h5");
  const viewButtonElems = page.locator("button.w-40");

  const firstName = await randStr(4);
  const lastName = await randStr(4);
  const emailText = firstName + lastName + "@gmail.com";
  const password =
    firstName.charAt(0).toUpperCase() + firstName.slice(1) + lastName + "@123";
  let errMessage = "";

  await page.goto("https://rahulshettyacademy.com/client/");
  await expect(page).toHaveTitle("Let's Shop");

  //Register
  await registerLink.click();
  await expect(page).toHaveURL(
    "https://rahulshettyacademy.com/client/auth/register"
  );

  await firstNameEle.pressSequentially(firstName, { delay: 100 });
  await lastNameEle.pressSequentially(lastName, { delay: 100 });
  await emailIdEle.pressSequentially(emailText, { delay: 100 });
  await phoneNumEle.pressSequentially("9998880000", { delay: 100 });
  await occupationEle.selectOption("Engineer");
  await genderEle.click();
  await passwordEle.pressSequentially(password, { delay: 100 });
  await confirmPasswordEle.pressSequentially(password, { delay: 100 });
  await ageConfCheckboxEle.click();
  await registerButtonEle.click();

  try {
    errMessage = await errMesageEle.textContent({ timeout: 4000 });
  } catch (err) {
    console.error("error element was not found");
  }

  if (errMessage.length > 0) {
    console.log("user was not created due to following error: " + errMessage);
    await page.close();
  } else {
    console.log(
      "user was created!! and user name is " + firstName + " " + lastName
    );
    await expect(userCreatedSuccessMsg).toHaveText(
      "Account Created Successfully"
    );
    await loginButtonAfterRegEle.click();
  }

  //Login
  await emailIdEle.pressSequentially(emailText, { delay: 100 });
  await passwordEle.pressSequentially(password, { delay: 100 });
  await loginButton.click();

  //await page.waitForLoadState("networkidle");
  await viewButtonElems.first().waitFor();
  const allProductTitles = await productHeadingElems.allTextContents();
  for (let i = 0; i < allProductTitles.length; i++) {
    console.log("arrayElement " + i + " : " + allProductTitles[i]);
    if (allProductTitles[i] == "ADIDAS ORIGINAL") {
      await viewButtonElems.nth(i).click();
      break;
    }
  }

  console.log("done");
});

test("@web UI Controls", async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();
  const username = page.locator("input#username");
  const password = page.locator("[name='password']");
  const signIn = page.locator("input.btn-md");
  const dropdownEle = page.locator("select.form-control");
  const userCheckBoxEle = page.locator("input[value='user']");
  const webBasedPopupEle = page.locator("button#okayBtn");
  const termsEle = page.locator("#terms");
  const blinkingLinkEle = page.locator("[href*='documents-request']");

  await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
  await expect(page).toHaveTitle("LoginPage Practise | Rahul Shetty Academy");

  await username.pressSequentially("rahulshettyacademy", { delay: 100 });
  await password.pressSequentially("learnin", { delay: 100 });
  await dropdownEle.selectOption("Consultant");
  await userCheckBoxEle.click();
  await webBasedPopupEle.click({ delay: 5000 });
  //Assertions
  console.log(await userCheckBoxEle.isChecked());
  await expect(userCheckBoxEle).toBeChecked();
  await termsEle.click();
  expect(await termsEle.isChecked()).toBeTruthy();
  await expect(blinkingLinkEle).toHaveAttribute("class", "blinkingText");

  console.log("done");
});

test("Child Window Handles", async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();
  const blinkingLinkEle = page.locator("[href*='documents-request']");
  const username = page.locator("input#username");

  await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
  await expect(page).toHaveTitle("LoginPage Practise | Rahul Shetty Academy");

  //Listens for any new page pending, rejected, fulfilled--(Event listners should be before the event happens)
  const [newPage] = await Promise.all([
    context.waitForEvent("page"),
    blinkingLinkEle.click(),
  ]);

  console.log(await newPage.locator(".red").textContent());
  const mentorGmail = await newPage.locator(".red a").textContent();
  console.log(mentorGmail);
  await username.pressSequentially(mentorGmail, { delay: 100 });

  console.log("done");
});

test("Login and order a product in RSAcademy website", async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();
  const emailIdEle = page.locator("[placeholder='email@example.com']");
  const passwordEle = page.locator("#userPassword");
  const loginButton = page.locator("input#login");
  const loginMessageEle = page.locator("div.toast-title");
  const productAddedToCartMessage = page.locator("div[role='alert']");
  const productElems = page.locator("div.card-body");
  // const viewButtonElems = page.locator("button.w-40");
  // const addToCartButtonEle = page.locator("button.w-10");
  const cartButton = page.locator("button[routerlink*='cart']");
  const countryOptions = page.locator(".ta-results");

  await page.goto("https://rahulshettyacademy.com/client/");
  await expect(page).toHaveTitle("Let's Shop");

  //Login
  await emailIdEle.pressSequentially("testmadu@gmail.com", { delay: 100 });
  await passwordEle.pressSequentially("Testmadu@123", { delay: 100 });
  await loginButton.click();
  await expect(loginMessageEle).toHaveText("Login Successfully");

  //search product and add to cart
  await productElems.first().waitFor();
  const allProductTitles = await productElems.locator("h5").allTextContents();
  let selectedProductName = "";
  let productAmt = "";
  for (let i = 0; i < allProductTitles.length; i++) {
    console.log("arrayElement " + i + " : " + allProductTitles[i]);
    if (allProductTitles[i] == "ADIDAS ORIGINAL") {
      selectedProductName = allProductTitles[i];
      productAmt = await productElems
        .locator(".text-muted")
        .nth(i)
        .textContent();
      await productElems.locator(".w-10").nth(i).click({ delay: 500 });
      await expect(productAddedToCartMessage).toHaveText(
        "Product Added To Cart"
      );
      break;
    }
  }

  if ((await cartButton.locator("label").textContent()) == 1) {
    await cartButton.click();
  }

  await page.locator("div li").first().waitFor();
  expect(
    await page.locator("h3:has-text('" + selectedProductName + "')").isVisible()
  ).toBeTruthy();
  await page.locator("button:has-text('Checkout')").click();

  //Checkout page
  await page.locator("select.ddl").first().selectOption("01");
  await page.locator("select.ddl").last().selectOption("18");
  await page.locator("div.small input").first().fill("012");
  await page.locator("input[class='input txt']").last().fill("Madesh");
  await page.locator("div.small input").last().fill("rahulshettyacademy");
  await page.locator("button:has-text('Apply Coupon')").click();
  const couponSuccessMsg = await page
    .locator("p[style='color: green;']")
    .textContent();
  console.log(couponSuccessMsg);
  await expect(page.locator("p[style='color: green;']")).toHaveText(
    "* Coupon Applied"
  );

  await expect(page.locator("label[style*='lightgray']")).toHaveText(
    "testmadu@gmail.com"
  );
  await page.locator("[placeholder='Select Country']").waitFor();
  await page
    .locator("[placeholder='Select Country']")
    .pressSequentially("Ind", { delay: 100 });
  await countryOptions.waitFor();
  const countryDrpDwnCount = await countryOptions.locator("button").count();
  for (let i = 0; i < countryDrpDwnCount; i++) {
    let countryText = await countryOptions
      .locator("button")
      .nth(i)
      .textContent();
    if (countryText === " India") {
      await countryOptions.locator("button").nth(i).click();
      break;
    }
  }
  await page.locator("a.action__submit").click();

  //Confirmation page
  await expect(page.locator("h1")).toHaveText(" Thankyou for the order. ");
  const orderId = await page
    .locator("td.em-spacer-1 label.ng-star-inserted")
    .textContent();
  const orderIdComp = orderId.split(" ")[2];
  console.log(orderIdComp);
  await page.locator("button[routerlink*='myorders']").click();

  //Order page
  const orderTableRow = page.locator("table tr");
  await orderTableRow.first().waitFor();
  const rowCount = await orderTableRow.count();
  for (let i = 0; i < rowCount; i++) {
    const orderIdRowText = await orderTableRow
      .locator("th[scope='row']")
      .nth(i)
      .textContent();
    if (orderIdRowText.trim() === orderIdComp.trim()) {
      await orderTableRow.locator("td:has-text('View')").nth(i).click();
      break;
    }
  }

  console.log("done");
});

test("Other Playwright Locators", async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();
  const username = page.locator("input#username");
  const password = page.locator("[name='password']");
  const signIn = page.locator("input.btn-md");
  const errMessageEle = page.locator("[style*='block']");
  const productTitles = page.locator("div.card-body h4 a");

  await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
  console.log(await page.title());
  await expect(page).toHaveTitle("LoginPage Practise | Rahul Shetty Academy");

  await username.pressSequentially("rahulshettyacademy", { delay: 100 });
  await password.pressSequentially("learning", { delay: 100 });
  await signIn.click();

  await productTitles.first().waitFor();
  const allTitles = await productTitles.allTextContents();

  for (let i = 0; i < allTitles.length; i++) {
    console.log("arrayElement " + i + " : " + allTitles[i]);
    if (allTitles[i] == "Blackberry") {
      await productTitles.nth(i).click();
      break;
    }
  }

  await page.getByLabel("Check me out if you Love IceCreams!").check();
  await page.getByLabel("Employed").check();
  await page.getByLabel("Gender").selectOption("Female");
  await page.getByLabel("Password").fill("Abc@123");
  await page.getByRole("button", { name: "Submit" }).click();
  await page
    .getByText("Success! The Form has been submitted successfully!.")
    .isVisible();
  await page.getByRole("link", { name: "Shop" }).click();
  await page
    .locator("app-card")
    .filter({ hasText: "Nokia Edge" })
    .getByRole("button", { name: "Add" })
    .click();
});
