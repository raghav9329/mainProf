package PoiTesting;

import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;

import org.apache.poi.hssf.usermodel.HSSFRow;
import org.apache.poi.hssf.usermodel.HSSFSheet;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.firefox.FirefoxDriver;

public abstract class AbstractTestSetup {

	private String inputSourcefile = "inputExcelFile.xls";
	private String workSheetName = "AbstractTest";
	private WebDriver driver;
	
	// The Proverbial CONSTRUCOTR
	public AbstractTestSetup() {//throws FileNotFoundException,IOException{
		//how do I tell if any one of these things worked corerrectly ??
		driver = new FirefoxDriver();
		
		System.out.println("just completed a new FirefoxDriver() ");
		
		try{
		FileInputStream inputFile = new FileInputStream(inputSourcefile);
		HSSFWorkbook myWorkbook = new HSSFWorkbook(inputFile);
		HSSFSheet worksheet = myWorkbook.getSheet(workSheetName);
		HSSFRow row = worksheet.getRow(0);
		
		//additionally put inthe setion on output setup
		// problem tht  addumes your want to put put to excel 
		
		}
		catch (FileNotFoundException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		} 
		driver.close();
		System.out.println("just closed the driver");
	}
	//end of try
	
	
	

	public void getStringValueAtCell(){
	}
	//Absolute call
	public void getCell( int col, int row){	
	}
	//Assumes you are staying in the column your in
	public void getNextRow(){	
	}
	public void getPrevRow(){	
	}
	//Asumes you are staying int he row you are on.
	public void getNextCell(){
	}
	public void getPrevCell(){
	}
}

