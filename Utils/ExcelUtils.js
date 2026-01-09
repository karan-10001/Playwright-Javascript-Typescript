//import {ExcelJs} from "exceljs";
const ExcelJs = require("exceljs");

async function excelReadWrite(searchItem, replaceItem, change, filePath) {
  //create the object of Exceljs class of workbook()
  const workbook = new ExcelJs.Workbook();

  //read the file of xlsx type
  await workbook.xlsx.readFile(filePath);

  //create the object of worksheet
  const workSheet = workbook.getWorksheet("Sheet1"); // here sheet name should be  given

  let quardinates = await Search(workSheet, searchItem);
  console.log("quardinates: ", quardinates);

  await replaceValue(workSheet, quardinates, replaceItem,change);

  //updating the workbook
  const outputFilePath = "K:/QA Automation in CAPGEMINI/UI Automation Testing/Playwright Javascript/Learning Playwright Automation/testData/ExcelDownload_updated.xlsx";
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
  return quardinates;
}

//replace method
async function replaceValue(workSheet, quardinates, replaceItem,change) {
  const cell = await workSheet.getCell(quardinates.row+change.rowChange, quardinates.col+change.colChange);
  cell.value = replaceItem;
}

//calling the read-write function
excelReadWrite(
  "Mango",
  "Sakshi",
  {rowChange:0, colChange:0}, //sending js object as parameter
  "K:/QA Automation in CAPGEMINI/UI Automation Testing/Playwright Javascript/Learning Playwright Automation/testData/ExcelDownload.xlsx"
);

//tip : always update in diffent file otherwise file get corrupted.