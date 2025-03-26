import { test as baseTest } from "@playwright/test";
interface TestDataForOrder {
  testCaseNo: number;
  custName: string;
  emailId: string;
  password: string;
  productName: string;
  couponCode: string;
  country: string;
  countryParText: string;
}

export const customTest = baseTest.extend<{
  testDataForOrder: TestDataForOrder;
}>({
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
