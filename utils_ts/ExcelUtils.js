import ExcelJs from "exceljs";
import fs from "fs-extra";

async function writeExcel(searchText, replaceValue, filePath, sheetName) {
  try {
    const workbook = new ExcelJs.Workbook();
    if (fs.existsSync(filePath)) {
      await workbook.xlsx.readFile(filePath);
      const sheetNames = workbook.worksheets.map((ws) => ws.name);
      const worksheet = workbook.getWorksheet(sheetName);
      if (worksheet) {
        const output = await readExcel(searchText, worksheet);
        const cell = worksheet.getCell(output.row, output.column);
        cell.value = replaceValue;
        await workbook.xlsx.writeFile(filePath);
      } else {
        console.log(
          "worksheet is not available please check the names of available sheets : ",
          sheetNames
        );
      }
    } else {
      console.log("file or filepath is incorrect");
    }
  } catch (err) {
    console.error("Error found", err);
  }
}
export { writeExcel };

async function readExcel(searchText, worksheet) {
  let output = { row: -1, column: -1 };
  let rowCount = 0;
  worksheet.eachRow(() => rowCount++);
  if (!(rowCount === 0)) {
    worksheet.eachRow((row, rowNumber) => {
      row.eachCell((cell, colNumber) => {
        if (cell.value === searchText) {
          output.row = rowNumber;
          output.column = colNumber;
        }
      });
    });
  } else {
    console.log("cell values are empty");
  }
  return output;
}
export { readExcel };

async function updateCellbasedOnColumnNameForSearchTextExcel(
  searchText,
  columnHeaderText,
  replaceValue,
  filePath,
  sheetName
) {
  const workbook = new ExcelJs.Workbook();
  if (fs.existsSync(filePath)) {
    await workbook.xlsx.readFile(filePath);
    const sheetNames = workbook.worksheets.map((ws) => ws.name);
    const worksheet = workbook.getWorksheet(sheetName);
    if (worksheet) {
      const searchHeaderColumnoutput = await readExcel(
        columnHeaderText,
        worksheet
      );
      const rowValueForSearchCellOutput = await readExcel(
        searchText,
        worksheet
      );
      const cell = worksheet.getCell(
        rowValueForSearchCellOutput.row,
        searchHeaderColumnoutput.column
      );
      cell.value = replaceValue;
      await workbook.xlsx.writeFile(filePath);
    } else {
      console.log(
        "worksheet is not available please check the names of available sheets : ",
        sheetNames
      );
    }
  } else {
    console.log("file or filepath is incorrect");
  }
}
export { updateCellbasedOnColumnNameForSearchTextExcel };

async function moveFileFromSourceToDest(src, dest) {
  fs.move(src, dest, { overwrite: true })
    .then(() =>
      console.log("File moved to the destination folder successfully")
    )
    .catch((e) => console.log(e));
}
export { moveFileFromSourceToDest };

async function divTableHeaderColumnFinder(page, locatorStr, searchColumnText) {
  let index;
  const tableHeaderEle = page.locator(locatorStr); //".rdt_TableCol"
  const tableHeaderCount = await tableHeaderEle.count();
  for (let i = 0; i < tableHeaderCount; i++) {
    const actHeaderText = await tableHeaderEle.nth(i).textContent();
    if (actHeaderText.includes(searchColumnText)) {
      index = i;
      console.log(
        "search element '" +
          searchColumnText +
          "' is found in :" +
          index +
          " column"
      );
      break;
    }
  }
  return index;
}
export { divTableHeaderColumnFinder };

//moveFileFromSourceToDest();
//writeExcel("Banana", "Mada", "./TestExcel.xlsx", "Sheet1");
// updateCellbasedOnColumnNameForSearchTextExcel(
//   "Mango",
//   "price",
//   "143",
//   "./TestExcel.xlsx",
//   "Sheet1"
// );
