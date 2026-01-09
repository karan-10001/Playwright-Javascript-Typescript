//import {ExcelJs} from "exceljs";
const ExcelJs = require("exceljs");
const { test, expect, request } = require("@playwright/test");

async function excelReadWrite(searchItem, replaceItem, change, filePath) {
  //create the object of Exceljs class of workbook()
  const workbook = new ExcelJs.Workbook();

  //read the file of xlsx type
  await workbook.xlsx.readFile(filePath);

  //create the object of worksheet
  const workSheet = workbook.getWorksheet("Sheet1"); // here sheet name should be  given

  let quardinates = await Search(workSheet, searchItem);
  console.log("quardinates: ", quardinates);

  await replaceValue(workSheet, quardinates, replaceItem, change);

  //updating the workbook
  const outputFilePath =
    "K:/QA Automation in CAPGEMINI/UI Automation Testing/Playwright Javascript/Learning Playwright Automation/testData/ExcelDownload_updated.xlsx";
  await workbook.xlsx.writeFile(outputFilePath);
}

//search method
async function Search(workSheet, searchItem) {
  let quardinates = { row: -1, col: -1 };

  workSheet.eachRow((row, rowNumber) => {
    row.eachCell((cell, colNumber) => {
      if (cell.value === searchItem) {
        quardinates.row = rowNumber;
        quardinates.col = colNumber;
      }
    });
  });
  console.log("item has search successfully.");
  return quardinates;
}

//replace method
async function replaceValue(workSheet, quardinates, replaceItem, change) {
  const cell = await workSheet.getCell(
    quardinates.row + change.rowChange,
    quardinates.col + change.colChange
  );
  cell.value = replaceItem;
 console.log("value replaced successfully.");
}

//calling the read-write function
// excelReadWrite(
//   "Mango",
//   "Sakshi",
//   {rowChange:0, colChange:0}, //sending js object as parameter
//   "K:/QA Automation in CAPGEMINI/UI Automation Testing/Playwright Javascript/Learning Playwright Automation/testData/ExcelDownload.xlsx"
// );

test.only("upload & download the excel file ", async ({ page }) => {
  await page.goto("https://rahulshettyacademy.com/upload-download-test/");
 
  const downloadPromsie = page.waitForEvent('download');
  await page.getByRole("button", { name: "Download" }).click();
  await downloadPromsie;
  //calling the read-write function
 await excelReadWrite(
    "Mango",
    "Sakshi",
    { rowChange: 0, colChange: 0 }, //sending js object as parameter
    "K:/QA Automation in CAPGEMINI/UI Automation Testing/Playwright Javascript/Learning Playwright Automation/testData/ExcelDownload.xlsx"
  );

  await page.waitForSelector('#fileinput');
  await page.locator('#fileinput').setInputFiles(
  'K:/QA Automation in CAPGEMINI/UI Automation Testing/Playwright Javascript/Learning Playwright Automation/testData/ExcelDownload_updated.xlsx'
);
   
  await expect(page.getByText('Sakshi')).toBeVisible();
});
