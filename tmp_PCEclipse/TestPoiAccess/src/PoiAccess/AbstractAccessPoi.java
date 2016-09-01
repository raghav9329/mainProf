package PoiAccess;

import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;

import org.apache.poi.hssf.usermodel.HSSFCell;
import org.apache.poi.hssf.usermodel.HSSFRow;
import org.apache.poi.hssf.usermodel.HSSFSheet;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;

public abstract class AbstractAccessPoi {
	
	private String inputSourcefile = "inputExcelFile.xls";
	private String defaultInputFileName = "inputFile.xls";
	private String workSheetName = "AbstractTest";
	private HSSFWorkbook myWorkbook = null;
	private HSSFSheet myWorksheet = null;
	private HSSFRow rowRef = null;
	private HSSFCell cellRef = null;
	public int rowNumber = 0;
	public int cellNumber = 0;
	
	/* Constructor  */
	public AbstractAccessPoi(//String fileName, 
			                 //String workSheetName, 
			                 /* String debug */  )
	{ /* Begin */
	try{
		 
 		FileInputStream inputFile = new FileInputStream(inputSourcefile);
		myWorkbook = new HSSFWorkbook(inputFile);
		myWorksheet = myWorkbook.getSheet(workSheetName); 
 		}
		catch (FileNotFoundException e) { 	
			//e.printStackTrace();
			System.out.println("The Input file was not found");
			System.out.println("Exiting:");
			System.exit(0);
		}
	
		catch (IOException e) { e.printStackTrace();
		}//end try
	System.out.println("finish constructor");
	}
	
	public void setRowRef(int nextRowNum){
		rowRef = myWorksheet.getRow(nextRowNum);
		System.out.println("finished setRowRef");
	}
	
	public void setRowNumber(){
		rowNumber = rowRef.getRowNum();
	}
	
	public void setCellRef(int cellNumber){
		cellRef = rowRef.getCell(cellNumber);
		System.out.println("finished setCellRef");
	}
		
	public String getStringAtCell(int numberedRow, int zeroBasedCell){
		String returnStrValue =null;
		setRowRef(numberedRow);
		setCellRef(zeroBasedCell);
		// set string for the cell
		returnStrValue = cellRef.getStringCellValue();
		/*
		Could be a null return value to handle
		*/
		System.out.println("About to finish getStringAtCell returning returnStrValue " +returnStrValue);
		return returnStrValue;
		
	}
	
	public int getNumAtCell(int numberedRow, int zeroBasedCell){
		int numVal = 0;
		double temp = 0;
		setRowRef(numberedRow);
		setCellRef(zeroBasedCell);
		temp = cellRef.getNumericCellValue();
		/*
				Could be a null return value to handle
		*/
		System.out.println("About to finish getNumAtCell returning temp after int cast " +temp);

		return numVal  = (int) temp;	
	}
	
	public void setCellNumber(){
		cellNumber = cellRef.getColumnIndex();
	}
	
	public void admin(){
		//myWorkbook.
		//myWorksheet.
	System.out.println(rowRef.getRowNum());
		//cellRef.
	}
}
