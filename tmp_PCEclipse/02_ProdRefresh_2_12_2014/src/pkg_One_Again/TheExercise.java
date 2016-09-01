package pkg_One_Again;

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
import org.junit.BeforeClass;
import org.junit.Test;
import org.openqa.selenium.By;
import org.openqa.selenium.Dimension;
import org.openqa.selenium.NoSuchElementException;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.firefox.FirefoxDriver;

public class TheExercise {
	String testURL = "https://qa6.sf.credit.com/login/";  // should put in Excel
	String qaRootUrl = "https://qa6.sf.credit.com";       // Additionally should put in Excel
	String newCRC_URL = "https://qa6.sf.credit.com/my-credit-report-card/#/overview";  // line above
	String automatedUID = "012914-2.BARRAS_PEGGY@credit.com";                            // line above
	String uidFieldId = "EMAIL";
	String pidFieldID = "PASSWORDCS";  // This is not a particurlarly good field name !!
	String automatedPID = "password1"; // might be good to have in the excel file
	//String logInBtnClassName = "btn btn-primary-blue track-login-button";
	//String logInBtnClassName = "btn-primary-blue";
	String logInBtnClassName = "btn";
	String xlUserName ="";
	
	
	Date date = new Date();
	SimpleDateFormat formatter = new SimpleDateFormat("MM-dd-yyyy'@'HH-mm-ss");
	Date myDate = new Date();
	String myDateString = formatter.format(myDate);
	String testSourceFile="userLogins.xls";
	String testResultsFile = myDateString +"_RedirectTestResults.xls";  // I may want this to be same as sourceFile
	
	String srcTestData,plannedDestTestData, sourceURL, destURL, redirectedURL; 
	String workSheetName = "LoginUID", resultsWrkSheetName= "TestResults";
/*  String rootSourceURL = null , rootDestURL ;//= "https://www.credit.com", rootDestURL = "https://www.credit.com"; */ 
	String userNameStr = null ;
	HSSFRow inputRow, outputRow;
	HSSFCell countCell, inputCell, sourceCell, plannedDestCell,outputSrcCell,outputDestCell,outputActualCell,outputPassFailCell, /*outputFormulaCell,*/ rootDomainCell;
	HSSFWorkbook workbook,resultsWrkBk;
	HSSFSheet worksheet,resultsWrkSheet;
	int loopCount = 0;
	WebDriver driver = new FirefoxDriver(); 
	
	final int ZERO=0, ONE=1,TWO=2,THREE=3,FOUR=4,FIVE=5;
	
	String debug = null;  // or could ==  "debug"  ;
	
	@BeforeClass
	void getDataAndRunTheExercise(){
		
		System.out.println(".....From within'The Exercise' ");
		
		
		try {
			FileInputStream fileInputStream = new FileInputStream(testSourceFile);
			FileOutputStream fileOut = new FileOutputStream(testResultsFile);
			workbook = new HSSFWorkbook(fileInputStream);
			resultsWrkBk = new HSSFWorkbook(); 					// Turns out there is no argument necessary !
			worksheet = workbook.getSheet(workSheetName);
			resultsWrkSheet = resultsWrkBk.createSheet("TestWorkSheetString");
		
			inputRow = worksheet.getRow(ZERO); 						// zero based, get the first row where I put count of rows in 0th col
			countCell = inputRow.getCell( ZERO );  					// zero based get the cell reference where I put the count
			loopCount = (int)  countCell.getNumericCellValue();	// extract the value from the referenced cell
			driver.manage().window().setSize(new Dimension(700, 750));			
			// The following was test steps
			//inputRow = worksheet.getRow(FOUR);						// zero based, get the next row 0th col where test domain will be
			//rootDomainCell = inputRow.getCell(ONE);					// zero bases, get the cell reference where the test domain string is
			//rootSourceURL  = rootDomainCell.getStringCellValue();   Was not really a sourceURL  it was a user name !!
						if (debug !=null ) System.out.println("LoopCount = " +loopCount);		
			
//		} catch (FileNotFoundException e) {
//			e.printStackTrace();
//		} catch (IOException e) {
//			e.printStackTrace();
//		}	//	 }// end of setup
//	
//	@Test
//	public void remainderOfTheExercise(){ 
//		try{
//		
		
/*			
	Starting 9:40 2_18 I being the for loop to read from the excel file		
	This after removing the multiple method construction and
	resolving the exception throwing issues.
	*/		
		for( int loopVar = 0; loopVar < loopCount ; loopVar++){
			driver.get(testURL);  // opens the browser on the URL for Login Dialog
			
		if (debug !=null ) System.out.println("debug: loopvar = " +loopVar);
		inputRow = worksheet.getRow(loopVar); // Set Row Pointer: starts at Zero equating to Zeroth Row in excel(row 1 )
		inputCell = inputRow.getCell(ONE);// Get the Cell pointer ONE(as a const) because we're in the 2nd cloumn
		userNameStr = inputCell.getStringCellValue();// get the string value in the cell
		System.out.println("The user name is " +userNameStr);

		
		WebElement login = driver.findElement(By.id(uidFieldId));
		login.sendKeys(userNameStr);
		
		WebElement password = driver.findElement(By.id(pidFieldID));
		password.sendKeys(automatedPID);
		
		WebElement loginButton = null;
		
		loginButton = driver.findElement(By.id("Login_execute"));
				loginButton.click();
		System.out.println("LoginButton Clicked");
		
	
		WebElement gradePayHist = null ;
		String letterGrade = null ;
		if (debug !=null ) System.out.println("just set gradePayHist to NULL, printing value next line.");
		if (debug !=null ) System.out.println(gradePayHist);
		for (int x = 1; x< 200; x++ ){ 
			  try { gradePayHist = driver.findElement(By.id("grade-payment-history"));
			        if (gradePayHist == null){
			        	if (debug !=null ) System.out.println("gradePayHist var still Null in Loop right after trying to get VAL");
			        }
			        else
			        { if (debug !=null ) System.out.println("Right after assignment gradePayHist has a VAL");
			          if (debug !=null ) System.out.println(gradePayHist);
			        }
			   		// System.out.println("FINISHED: inside for( inside Try findElement-ByID(grade pay history)))");
			  } // end try
			  catch (NoSuchElementException e){
			   		//System.out.println("NoSuchElementException caught, continuing..." +x);
				  if (debug !=null ) System.out.println("NoSuchElementException caught, breaking inner..." +x);
			   		//continue;  // I may want to exit the loop righ here
				    break ;
			  } // end catch
			  catch (NullPointerException e) {
				  if (debug !=null )  System.out.println("Null pointer exception:  Thin Report.  Bail out");
				   continue;
			  }
			   
			  letterGrade =  gradePayHist.getText();	
			  if (debug !=null ) System.out.println("lettergrade check outside TRY-CATCH Block: value currently is: " +letterGrade);
			  
			   if (letterGrade.equals("")){
				   if (debug !=null ) System.out.println("Inside test if letterGrade == nothing ");
				   //System.out.println("sleep some portion of sec");
				   try { Thread.sleep(75L); if (debug !=null ) System.out.println("sleeping for 75 milis");} /* Sleep in Miliseconds */
				    catch (InterruptedException e){
						e.printStackTrace(); } 
			   } // end if
			   else
			   {	if (debug !=null ) System.out.println("breaking out, and X = " +x);
				   	break;
			   }
			   //System.out.println("end of loop " +x);
		       
		   }// end for
		if (debug !=null ) System.out.println("AfterBreakingOut");
		if (debug !=null ) System.out.println(gradePayHist);
		
		
		if (gradePayHist == null){
			if (debug !=null ){
				System.out.println("We still don't have the grades");
				System.out.println("I need to breakout with a 'continue', and get the next user");
				System.out.println("should also cleanup and log out");
			}
			driver.get("https://qa6.sf.credit.com/logoutUser");
			if (debug !=null ) System.out.println("just Logged Out.  Now continuing");
			continue ;
		}
			
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
	   
	   	driver.get("https://qa6.sf.credit.com/logoutUser");
	
		}// end of LoopCount For Loop
		driver.close(); 
		
	} catch (FileNotFoundException e) {
		e.printStackTrace();
	} catch (IOException e) {
		e.printStackTrace();
	}
	   


		
		
		
	}// End of getDataAndRunTheExercise()
}// End of class TheExercise

