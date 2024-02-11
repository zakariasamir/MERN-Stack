const ExcelJS = require("exceljs");

async function readAndModifyExcelFile(filePath) {
  const workbook = new ExcelJS.Workbook();
  try {
    await workbook.xlsx.readFile(filePath);
    const worksheet = workbook.getWorksheet(1);
    const headers = worksheet.getRow(1).values;
    worksheet.getRow(1).getCell(headers.length).value = "BonusPercentage";
    worksheet.getRow(1).getCell(headers.length + 1).value = "BonusAmount";
    for (let i = 2; i <= worksheet.rowCount; i++) {
      const row = worksheet.getRow(i);
      const annualSalary = row.getCell(headers.indexOf("AnnualSalary")).value;
      let bonusPercentage, bonusAmount;
      if (parseInt(annualSalary) < 50000) {
        bonusPercentage = 0.05;
      } else if (parseInt(annualSalary) <= 100000) {
        bonusPercentage = 0.07;
      } else {
        bonusPercentage = 0.1;
      }
      bonusAmount = parseInt(annualSalary) * bonusPercentage;
      row.getCell(headers.length).value = bonusPercentage;
      row.getCell(headers.length + 1).value = bonusAmount;
    }
    await workbook.xlsx.writeFile("./employee_data_.xlsx");
    console.log("Bonus calculation completed. Check the modified Excel file.");
  } catch (error) {
    console.error("Error reading or modifying Excel file:", error.message);
  }
}

const excelFilePath = "./employee_data_.xlsx";
readAndModifyExcelFile(excelFilePath);
