package Pkg_One;

import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Date;

import org.apache.poi.hssf.usermodel.HSSFCell;
import org.apache.poi.hssf.usermodel.HSSFRow;
import org.apache.poi.hssf.usermodel.HSSFSheet;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.openqa.selenium.By;
import org.openqa.selenium.Dimension;
import org.openqa.selenium.Keys;
import org.openqa.selenium.NoSuchElementException;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.firefox.FirefoxDriver;

public class TestOne_Continuation {

	public static void main(String[] args) {
		
		String testURL = "https://qa6.sf.credit.com/login/";  // should put in Excel
		String qaRootUrl = "https://qa6.sf.credit.com";       // Additionally should put in Excel
		String newCRC_URL = "https://qa6.sf.credit.com/my-credit-report-card/#/overview";  // line above
		String automatedUID ="012914-2.BARRAS_PEGGY@credit.com";                            // line above
		String uidFieldId = "EMAIL";
		String pidFieldID = "PASSWORDCS";  // This is not a particurlarly good field name !!
		String automatedPID = "password1"; // might be good to have in the excel file
		//String logInBtnClassName = "btn btn-primary-blue track-login-button";
		//String logInBtnClassName = "btn-primary-blue";
		String logInBtnClassName = "btn";
		
		
		Date date = new Date();
		SimpleDateFormat formatter = new SimpleDateFormat("MM-dd-yyyy'@'HH-mm-ss");
		Date myDate = new Date();
		String myDateString = formatter.format(myDate);
		String testSourceFile="userLogins.xls";
		String testResultsFile = myDateString +"_RedirectTestResults.xls";  // I may want this to be same as sourceFile
		
		String srcTestData,plannedDestTestData, sourceURL, destURL, redirectedURL; 
		String workSheetName = "LoginUID", resultsWrkSheetName= "TestResults";
		String rootSourceURL = null , rootDestURL ;//= "https://www.credit.com", rootDestURL = "https://www.credit.com";
		HSSFRow row, outputRow;
		HSSFCell countCell,sourceCell, plannedDestCell,outputSrcCell,outputDestCell,outputActualCell,outputPassFailCell, /*outputFormulaCell,*/ rootDomainCell;
		HSSFWorkbook workbook,resultsWrkBk;
		HSSFSheet worksheet,resultsWrkSheet;
		int loopCount = 0;
		
		final int ZERO=0, ONE=1,TWO=2,THREE=3,FOUR=4,FIVE=5;
		
		try {
			FileInputStream fileInputStream = new FileInputStream(testSourceFile);
			FileOutputStream fileOut = new FileOutputStream(testResultsFile);
			workbook = new HSSFWorkbook(fileInputStream);
			resultsWrkBk = new HSSFWorkbook(); 					// Turns out there is no argument necessary !
			worksheet = workbook.getSheet(workSheetName);
			resultsWrkSheet = resultsWrkBk.createSheet("TestWorkSheetString");
			row = worksheet.getRow(ZERO); 						// zero based, get the first row where I put count of rows in 0th col
			countCell = row.getCell( ZERO );  					// zero based get the cell reference where I put the count
			loopCount = (int)  countCell.getNumericCellValue();	// extract the value from the referenced cell
		
		//
		// Right Here I need to start looping !
		//
			row = worksheet.getRow(FOUR);						// zero based, get the next row 0th col where test domain will be
			rootDomainCell = row.getCell(ONE);					// zero bases, get the cell reference where the test domain string is
			rootSourceURL  = rootDomainCell.getStringCellValue(); 
			
			
			
			
		} catch (FileNotFoundException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}
		
		System.out.println("LoopCount = " +loopCount);
		System.out.println("First username is " +rootSourceURL);
		
		WebDriver driver = new FirefoxDriver();
		driver.manage().window().setSize(new Dimension(850, 450));
		
		driver.get(testURL);
		//driver.get(qaRootUrl);
		
		//WebElement rootLoginBtn = driver.findElement(By.id("login"));
		//rootLoginBtn.click();
		
		WebElement login = driver.findElement(By.id(uidFieldId)) ;
		login.sendKeys(automatedUID);
		
		WebElement password = driver.findElement(By.id(pidFieldID));
		password.sendKeys(automatedPID);
		
//		try { Thread.sleep(1200L);} 
//		catch (InterruptedException e){// TODO Auto-generated catch block
//			e.printStackTrace(); }
		
		
		WebElement loginButton = null;
	                  //	System.out.println("loginButton variable instantiated, set to null");
		loginButton = driver.findElement(By.id("Login_execute"));
		
		             //System.out.println("finElement.by.id(Login_execute) completed ???");
		
		             //System.out.println(loginButton.toString());


		loginButton.click();
		
/*		driver.get(newCRC_URL);
		System.out.println("about to sleep haveing put in the trick URL");
	   try { Thread.sleep(5300L);} 
		catch (InterruptedException e){// TODO Auto-generated catch block
			e.printStackTrace(); } */

		
//	   WebElement gradePayHist = driver.findElement(By.id("grade-payment-history"));
//	   String letterGrade =  gradePayHist.getText();
		
		   WebElement gradePayHist = null ;
		   String letterGrade = null ;
		   
//		   System.out.println("entering the loop to check if dirver element has been rendered ???");
		   for (int x = 1; x< 100; x++ ){
			   		//System.out.println("Top Of Loop");   
			   		
			   try { gradePayHist = driver.findElement(By.id("grade-payment-history"));
			   } // end try
			   catch (NoSuchElementException e){
			   		//System.out.println("NoSuchElementException caught, continuing...");
			   		continue;
			   } // end catch
			   
			   
			   //System.out.println("try-catch complete");
			   letterGrade =  gradePayHist.getText();	
			  // System.out.println("lettergrade check: value currently is: " +letterGrade);
			  
			   if (letterGrade.equals("")){
				   //System.out.println("sleep 1/2 sec");
				   try { Thread.sleep(500L);} 
				    catch (InterruptedException e){
						e.printStackTrace(); } 
			   } // end if
			   else 
				   {
				   System.out.println("breaking out, and X = " +x);
				  	break;
				   }
			   //System.out.println("end of loop " +x);
		       
		   }// end for
		   
	if (gradePayHist.equals(""))
		System.out.println("We still don't have the grades");
		
		
		
	   System.out.println("The Pay History grade is "+letterGrade);
	  
 
	   
	   WebElement gradeDebtUsaget = driver.findElement(By.id("grade-debt-usage"));

	   letterGrade =  gradeDebtUsaget.getText();
	   System.out.println("The Debt Usage grade is "+letterGrade);
	   
	   
	   WebElement gradeCreditAge = driver.findElement(By.id("grade-credit-age"));

	   letterGrade =  gradeCreditAge.getText();
	   System.out.println("The Credit Age grade is "+letterGrade);
	   
	   
	   WebElement gradeAccountMix = driver.findElement(By.id("grade-account-mix"));

	   letterGrade =  gradeAccountMix.getText();
	   System.out.println("The Account Mix grade is "+letterGrade);   
	   
	   WebElement gradeCreditIng = driver.findElement(By.id("grade-credit-inquiries"));
	   
	   letterGrade =  gradeCreditIng.getText();
	   System.out.println("The Inquiries grade is "+letterGrade); 
// web page source code is missing an ID for the Credit Inquiries
	   
	   
	   

		
	
	
		

	}

}
