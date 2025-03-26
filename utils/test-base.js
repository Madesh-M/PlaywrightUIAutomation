import { test } from "@playwright/test";

export const customTest = test.extend({
  testDataForOrder: {
    testCaseNo: 1,
    custName: "Madesh",
    emailId: "testmadu@gmail.com",
    password: "Testmadu@123",
    productName: "ADIDAS ORIGINAL",
    couponCode: "rahulshettyacademy",
    country: " India",
    countryParText: "Ind",
  },
});
