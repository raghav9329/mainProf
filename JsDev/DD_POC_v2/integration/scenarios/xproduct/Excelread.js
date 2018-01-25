
const XlsxPopulate = require('xlsx-populate');

//Reading a Single Cell from Excel
XlsxPopulate.fromFileAsync("c:/DD_Repos/dd-cx-test/integration/testData/Direct_Buying_Content.xlsx")
    .then(workbook => {
        // Modify the workbook. 
		var cellReference = "";
		var workSheet = "";
		var cellValue = "";
		
		cellReference = "B4";
		workSheet = "Fraud Statement";
		console.log();
		console.log();
		console.log("Tab: "+workSheet);
		console.log("Cell "+cellReference );
		console.log();
      //Fraud_Statement = workbook.sheet(workSheet).cell(cellReference).value();
        cellValue= workbook.sheet(workSheet).cell(cellReference).value();
      //console.log(Fraud_Statement);
        console.log(cellValue);
		
		cellReference = "C6";
		workSheet = "Fraud Statement";
		console.log();
		console.log();
		console.log("Tab: Fraud Statement");
		console.log("Cell "+cellReference );
		console.log();
        cellValue= workbook.sheet(workSheet).cell(cellReference).value();
      //Fraud_Statement = workbook.sheet("Fraud Statement").cell(cellReference).value();
        console.log(cellValue);
		
		cellReference = "A1";
		workSheet = "Zip Code Text";
		console.log();
		console.log();
		console.log("Tab: "+workSheet);
		console.log("Cell "+cellReference );
		console.log();
      //const value = workbook.sheet("Zip Code Text").cell("A1").value();
      //value = workbook.sheet("Zip Code Text").cell("A1").value();
      //value = workbook.sheet("Zip Code Text").cell(cellReference).value();
        cellValue= workbook.sheet(workSheet).cell(cellReference).value();
        // Log the value. 
        console.log(cellValue);

		
		cellReference = "B2";
		workSheet = "Bank Account ";
		console.log();
		console.log();
		console.log("TAB: "+workSheet);
		console.log("Cell "+cellReference );
		console.log();
        cellValue= workbook.sheet(workSheet).cell(cellReference).value();
        console.log(cellValue);

		cellReference = "B2";
		workSheet = "Recurring Payments Agreement";
		console.log();
		console.log();
		console.log("TAB: "+workSheet);
		console.log("Cell "+cellReference );
		console.log();
        cellValue= workbook.sheet(workSheet).cell(cellReference).value();
        console.log(cellValue);
		

		cellReference = "C2";
		workSheet = "Recurring Payments Agreement";
		console.log();
		console.log();
		console.log("TAB: "+workSheet);
		console.log("Cell "+cellReference );
		console.log();
        cellValue= workbook.sheet(workSheet).cell(cellReference).value();
        console.log(cellValue);
		
		
		cellReference = "A2";
		workSheet = "Expense ratio";
		console.log();
		console.log();
		console.log("TAB: "+workSheet);
		console.log("Cell "+cellReference );
		console.log();
        cellValue= workbook.sheet(workSheet).cell(cellReference).value();
        console.log(cellValue);
		
		
		cellReference = "B5";
		workSheet = "Medical Release";
		console.log();
		console.log();
		console.log("TAB: "+workSheet);
		console.log("Cell "+cellReference );
		console.log();
        cellValue= workbook.sheet(workSheet).cell(cellReference).value();
        console.log(cellValue);
		
		cellReference = "C3";
		workSheet = "Medical Release";
		console.log();
		console.log();
		console.log("TAB: "+workSheet);
		console.log("Cell "+cellReference );
		console.log();
        cellValue= workbook.sheet(workSheet).cell(cellReference).value();
        console.log(cellValue);
		
		cellReference = "C9";
		workSheet = "Medical Release";
		console.log();
		console.log();
		console.log("TAB: "+workSheet);
		console.log("Cell "+cellReference );
		console.log();
        cellValue= workbook.sheet(workSheet).cell(cellReference).value();
        console.log(cellValue);
		
		cellReference = "B3";
		workSheet = "Footer Text";
		console.log();
		console.log();
		console.log("TAB: "+workSheet);
		console.log("Cell "+cellReference );
		console.log();
        cellValue= workbook.sheet(workSheet).cell(cellReference).value();
        console.log(cellValue);
		
		
		
});

//Writing a single cell to Excel
//XlsxPopulate.fromFileAsync('../../testData/Direct_Buying_Content.xlsx').then(workbook => {
        //Modify the workbook. 
//        workbook.sheet("Zip Code Text").cell("A2").value("Writing into Excel Cell");
//        return workbook.toFileAsync("../../testData/Direct_Buying_Content.xlsx");      
//});
