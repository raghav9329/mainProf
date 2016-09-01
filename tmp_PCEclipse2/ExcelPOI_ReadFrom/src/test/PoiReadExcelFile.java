package test;

import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.util.Date;

import org.apache.poi.hssf.usermodel.HSSFCell;
import org.apache.poi.hssf.usermodel.HSSFRow;
import org.apache.poi.hssf.usermodel.HSSFSheet;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;

public class PoiReadExcelFile {
	public static void main(String[] args) {
		try {
			FileInputStream fileInputStream = new FileInputStream("C:\\SeleniumTrainingVids\\POI_TutorialInfo\\ReadFrom\\poi-test.xls");
			
			HSSFWorkbook workbook = new HSSFWorkbook(fileInputStream);
			
			//HSSFSheet worksheet = workbook.getSheet("POI Worksheet");
			HSSFSheet worksheet = workbook.getSheet("Sep 2013");
			
			HSSFRow row1 = worksheet.getRow(11);
			
			HSSFCell cellA1 = row1.getCell((short) 0);
			
			Date a1Val = cellA1.getDateCellValue(); 			
			System.out.println("A1: " + a1Val);
			
			HSSFCell cellB1 = row1.getCell((short) 7);
			
			String b1Val = cellB1.getStringCellValue();             
			System.out.println("B1: " + b1Val);
			
			HSSFCell cellC1 = row1.getCell((short) 8);
			
			String c1Val = cellC1.getStringCellValue();             
			System.out.println("C1: " + c1Val);
	
			HSSFCell cellD1 = row1.getCell((short) 9);
	
			String d1Val = cellD1.getStringCellValue();

			System.out.println("A1: " + a1Val);
			System.out.println("B1: " + b1Val);
			System.out.println("C1: " + c1Val);
			System.out.println("D1: " + d1Val);
		} catch (FileNotFoundException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
}