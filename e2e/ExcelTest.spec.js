import { test, expect } from "@playwright/test";
import {
  readExcel,
  writeExcel,
  updateCellbasedOnColumnNameForSearchTextExcel,
  moveFileFromSourceToDest,
  divTableHeaderColumnFinder,
} from "../utils/ExcelUtils";
import fs from "fs-extra";

test.only("Upload download excel validation", async ({ page }) => {
  await page.goto(
    "https://rahulshettyacademy.com/upload-download-test/index.html"
  );

  const downloadPromise = page.waitForEvent("download");
  await page.locator("#downloadButton").click();
  const download = await downloadPromise;

  const src = "C:/Users/mades/Downloads/download.xlsx";
  const dest = "D:/Playwright/Projects/PlaywrightTestProject/ExcelTest.xlsx";
  await download.saveAs(
    "C:/Users/mades/Downloads/" + download.suggestedFilename()
  );
  await page.waitForTimeout(4000);
  if (fs.existsSync(src)) {
    await moveFileFromSourceToDest(src, dest);
  }

  await updateCellbasedOnColumnNameForSearchTextExcel(
    "Mango",
    "price",
    "143",
    "ExcelTest.xlsx",
    "Sheet1"
  );

  await page.locator("#fileinput").setInputFiles(dest);
  await expect(page.locator("div[role='alert']")).toHaveText(
    "Updated Excel Data Successfully."
  );

  const columnNumber = await divTableHeaderColumnFinder(
    page,
    ".rdt_TableCol",
    "Price"
  );

  const rowCount = await page.locator(".rdt_TableRow").count();
  for (let i = 0; i < rowCount; i++) {
    const rowEle = page.locator("#row-" + i);
    const columnEle = rowEle.locator("[role='cell']");
    const columnCount = await columnEle.count();
    for (let j = 0; j < columnCount; j++) {
      const actCellRefValue = await columnEle.nth(j).textContent();
      if (actCellRefValue.trim() === "Mango") {
        await expect(columnEle.nth(columnNumber)).toHaveText("143");
        break;
      }
    }
    break;
  }

  // or you can use filter function
});
