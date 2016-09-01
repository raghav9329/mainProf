package signup;

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
import org.openqa.selenium.By;
import org.openqa.selenium.Dimension;
import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.Keys;
import org.openqa.selenium.NoSuchElementException;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.firefox.FirefoxDriver;
import org.openqa.selenium.support.ui.Select;

public class TheTest {
	String baseURL = "";
	String oldVerURL = "";
	String newVerURL = "";
	String testURL = "https://qa6.sf.credit.com/signup/#/main";  // should put in Excel
	String qaRootUrl = "https://qa6.sf.credit.com";       // Additionally should put in Excel
	String newCRC_URL = "https://qa6.sf.credit.com/my-credit-report-card/#/overview";  // line above
	String urlTest = null;
	String automatedUID = "012914-2.BARRAS_PEGGY@credit.com";                            // line above
	String uidFieldId = "EMAIL";
	String pidFieldID = "PASSWORDCS";  // This is not a particurlarly good field name !!
	String automatedPID = "password1"; // might be good to have in the excel file
	//String logInBtnClassName = "btn btn-primary-blue track-login-button";
	//String logInBtnClassName = "btn-primary-blue";
	String logInBtnClassName = "btn";
	String xlUserName ="";
	
	
	//Date date = new Date();
	SimpleDateFormat simpleDateFormatter = new SimpleDateFormat("MM-dd-yyyy'@'HH-mm-ss");
	Date myDate = new Date();
	String myDateString = simpleDateFormatter.format(myDate);
	
	
	String myFinishTimeStamp = "";
	String testSourceFile="userLogins.xls";
	String testResultsFile = myDateString +"_RedirectTestResults.xls";  // I may want this to be same as sourceFile
	
	String srcTestData,plannedDestTestData, sourceURL, destURL, redirectedURL; 
	String workSheetName = "LoginUID", resultsWrkSheetName= "TestResults";
/*  String rootSourceURL = null , rootDestURL ;//= "https://www.credit.com", rootDestURL = "https://www.credit.com"; */ 
	String userNameStr = null, userEmail ,stChrsString = null;
	HSSFRow inputRowRef, outputRow;
	HSSFCell cellRef ;
	HSSFCell countCell, inputCellRef, sourceCell, plannedDestCell,outputSrcCell,outputDestCell,outputActualCell,outputPassFailCell, /*outputFormulaCell,*/ rootDomainCell;
	HSSFWorkbook workbook,resultsWrkBk;
	HSSFSheet worksheet,resultsWrkSheet;
	int loopCount = 0;
	WebDriver driver = new FirefoxDriver(); 
	
	final int ZERO=0, ONE=1,TWO=2,THREE=3,FOUR=4,FIVE=5, SIX=6, SEVEN=7, EIGHT=8, NINE=9, TEN=10, ELEVEN=11, TWELVE=12;
	final int LCV=0;//FNAME=1,LNAME=2,EMAIL=3,PASSWD=4,ADDR=5, CITY=6, STATE=7, ZIP=8, MONTH=9, DAY=10, YEAR=11, SSN=12;
	String debug = "debug";  // or could ==  "debug"  ;
	
	@BeforeClass
	void getDataAndSetupNewUsers(int debugOn){
		//driver.manage().window().setSize(new Dimension(775, 1050));	
		setDriverWindowDimensions(775, 1050 );
		
		if (debugOn != 0 ) 
		{	debug = "debug"; }
		System.out.println("Start:  " +myDate);

	try {
		FileInputStream fileInputStream = new FileInputStream(testSourceFile);
/*		FileOutputStream fileOut = new FileOutputStream(testResultsFile);      */ // Don't currently need a results file
		workbook = new HSSFWorkbook(fileInputStream);
		resultsWrkBk = new HSSFWorkbook(); 					// Turns out there is no argument necessary !
		worksheet = workbook.getSheet(workSheetName);
		resultsWrkSheet = resultsWrkBk.createSheet("TestWorkSheetString");
	
/*		inputRowRef = worksheet.getRow(ONE); 						// zero based, get the first row where I put count of rows in 0th col
		countCell = inputRowRef.getCell( ZERO );  					// zero based get the cell reference where I put the count
		loopCount = (int)  countCell.getNumericCellValue();	        // extract the value from the referenced cell
*/		
		loopCount = (int) getIntegerFromFile(ONE, ZERO);
		
		String loginURL = getStringFromFile(TWO, ZERO);
		String page1URL = getStringFromFile(THREE, ZERO); 
		String page2URL	= getStringFromFile(FOUR, ZERO); 
		String v1LandPage = getStringFromFile(FIVE, ZERO); 
		String v2LandPage = getStringFromFile(SIX, ZERO); 
		
		System.out.println(" Login, page1, page2 are:");
		System.out.println(loginURL);
		System.out.println(page1URL);
		System.out.println(page2URL);
		System.out.println(v1LandPage);
		System.out.println(v2LandPage);
		
		
/*		driver.manage().window().setSize(new Dimension(775, 1050));		*/	
		
		
		/* Get the next cell in the first col, Under the loop count
		 * This is on the second row
		 * This is the Base URL - server webApp root  eg: qa6.sf.credit.com */
		// inputRowRef = worksheet.getRow(ONE); // ONE is the zero based identification as ONE for 2nd row
		// cellRef = inputRowRef.getCell( ONE );
		// variableName = inputRowRef.getCell( ONE );
		//

		/* Get the next cell in the first col
		 * This is the Base URL - server webApp root  eg: qa6.sf.credit.com */
		// inputRowRef = worksheet.getRow(ONE); 
		// cellRef = inputRowRef.getCell( ONE );
		// variableName = inputRowRef.getCell( ONE );
		//
		
		
		
		// The following was test steps
		//inputRowRef= worksheet.getRow(FOUR);						// zero based, get the next row 0th col where test domain will be
		//rootDomainCell = inputRow.getCell(ONE);					// zero bases, get the cell reference where the test domain string is
		//rootSourceURL  = rootDomainCell.getStringCellValue();   Was not really a sourceURL  it was a user name !!
		
		// Special case in order to control window SCROLLING !!!
		JavascriptExecutor js = (JavascriptExecutor)driver;
		
		if (debugOn != 0 ) System.out.println("debug: LoopCount = " +loopCount);
		

		//for( int loopVar = 0; loopVar < loopCount ; loopVar++){
		for( int loopVar = 1; loopVar <= loopCount ; loopVar++){
			driver.get(testURL);  // opens the browser on the URL for Login Dialog
			
			if (debugOn != 0 ) System.out.println("debug: loopvar = " +loopVar);
			
/*			inputRowRef= worksheet.getRow(loopVar); 
			inputCellRef = inputRowRef.getCell(ONE);
			userNameStr = inputCellRef.getStringCellValue();*/
			
			userNameStr = getStringFromFile(loopVar, ONE);
			
			/* Issue resolved ( supposedly ) with this sleep
			 * Upon return from bottom of loop, there needs to 
			 * be enough time for FNAME to be rendered    */
			debugSleep(2500L); 
			
			WebElement fNameField = driver.findElement(By.id("FNAME"));
			fNameField.sendKeys(userNameStr);

/*Need Better*/			
/*var name */
/*inputCellRef*/
/*			inputCellRef = inputRowRef.getCell(TWO);
			userNameStr = inputCellRef.getStringCellValue();*/
			
			userNameStr = getStringFromFile(loopVar, TWO);
			WebElement lNameField = driver.findElement(By.id("LNAME"));
			lNameField.sendKeys(userNameStr);
			if (debugOn != 0 ) System.out.println("debug: The user Lname is " +userNameStr);
			
/*Need Better*/			
/*var name */
/*inputCellRef*/
/*			inputCellRef = inputRowRef.getCell(THREE);
			userEmail = inputCellRef.getStringCellValue();*/
			userEmail = getStringFromFile(loopVar, THREE);
			WebElement emailField = driver.findElement(By.id("EMAIL"));
			emailField.sendKeys(userEmail);
			if (debugOn != 0 ) System.out.println("debug: The user EMAIL is " +userEmail);
			
/*			inputCellRef = inputRowRef.getCell(FOUR);
			userNameStr = inputCellRef.getStringCellValue();*/
			userNameStr = getStringFromFile(loopVar, FOUR);
			WebElement passwdField1 = driver.findElement(By.id("PASSWORDCS"));
			passwdField1.sendKeys(userNameStr);
			
			WebElement passwdField2 = driver.findElement(By.id("PASSWORDCS2"));
			passwdField2.sendKeys(userNameStr);			
		
			
			WebElement nextStepButton = driver.findElement(By.id("submit-to-ufg"));
			nextStepButton.click();
			
			debugSleep(2000L);   // how small can I make this
					

/* *************************************************************************************
 *                                                                                     *
 *                               We have completed Page One                            *
 *                                                                                     *
 * *************************************************************************************/
 
			
			   
			   ///https://qa6.sf.credit.com/signup/#/page2
			int signupPage2=0;
			while (true)
			{
			debugSleep(800L);
					
				urlTest = driver.getCurrentUrl(); signupPage2++;
				//urlTest.equals("");
				if (urlTest.contains("/signup/#/page2"))
				{	if (debugOn != 0 )
					{ 	System.out.println("We got to URL with /signup/#/page2" ); 	}
					break; /// Break, NOT EXIT...  This exits the While Loop
				}
				else 
				{ if (debugOn != 0 )
					System.out.println("we are looking for /signup/#/page2 " +signupPage2 +" many times now.");
				}
					
			}//~while
				
			debugSleep(800L);
				//inputCellRef = inputRowRef.getCell(FIVE);
				//userNameStr = inputCellRef.getStringCellValue();
				
			   /* tmpAddrField because of it's an unusual use case       */
				WebElement tmpAddrField = driver.findElement(By.id("ADDR"));
				tmpAddrField.sendKeys("000000000");
				
			debugSleep(200L); 	
				
				String mySelAllStr = Keys.chord(Keys.CONTROL, "a");
				tmpAddrField.sendKeys(mySelAllStr);
				   
				   
			debugSleep(200L);		   
				
				mySelAllStr = Keys.chord(Keys.CONTROL, "x");
				tmpAddrField.sendKeys(mySelAllStr);
				
			debugSleep(200L);
				
					   
/*necessary ?*/ //inputCellRef = inputRowRef.getCell(TWELVE); 
/*necessary ?*/ //userNameStr = inputCellRef.getStringCellValue();
				//System.out.println("SSN value " +userNameStr);
				WebElement ssnField = driver.findElement(By.id("SSN"));	
				mySelAllStr = Keys.chord(Keys.CONTROL, "v");
				ssnField.sendKeys(mySelAllStr);
								
			debugSleep(200L);
				   
				inputCellRef = inputRowRef.getCell(FIVE);
				userNameStr = inputCellRef.getStringCellValue();
					
				WebElement addrField = driver.findElement(By.id("ADDR"));
				addrField.sendKeys(userNameStr);				   
				   
				   
				inputCellRef = inputRowRef.getCell(SIX);
				userNameStr = inputCellRef.getStringCellValue();
				
				WebElement cityField = driver.findElement(By.id("CITY"));
				cityField.sendKeys(userNameStr);		
			
			debugSleep(400L);
				
				inputCellRef = inputRowRef.getCell(SEVEN);
				userNameStr = inputCellRef.getStringCellValue();
				
				WebElement stateField = driver.findElement(By.id("STATE"));
				stateField.sendKeys(userNameStr);
				//Select dropDownAccessor = new Select(driver.findElement(By.id("STATE")));
								//dropDownAccessor.selectByValue("7");     //do we still scroll off the screen
				
			debugSleep(150L);			
				
//js.executeScript("window.scrollTo(0,Math.max(document.documentElement.scrollHeight," + "document.body.scrollHeight,document.documentElement.clientHeight));");
			
			    if (debugOn != 0 ) System.out.println("next we execute JS to handls scrolling");
				js.executeScript("window.scrollTo(0,0);");
				if (debugOn != 0 ) System.out.println("Just finished scrolling to 0,0 after State");
		
			debugSleep(200L);			
				   
				inputCellRef = inputRowRef.getCell(EIGHT);
				inputCellRef.setCellType(1);
				userNameStr = inputCellRef.getStringCellValue();
				
				WebElement zipField = driver.findElement(By.id("ZIPCODE"));
				zipField.sendKeys(userNameStr);				
					
			debugSleep(200L);
				
			
				
				inputCellRef = inputRowRef.getCell(NINE);
				userNameStr = inputCellRef.getStringCellValue();	//   DOBMONTH
				
				WebElement dobMonField = driver.findElement(By.id("DOBMONTH"));
				dobMonField.sendKeys(userNameStr);
				
//				dropDownAccessor = new Select(driver.findElement(By.id("DOBMONTH")));
//				dropDownAccessor.selectByVisibleText(userNameStr);
				
				if (debugOn != 0 ) System.out.println("next we execute JS to handls scrolling");
				   js.executeScript("window.scrollTo(0,0);");
				if (debugOn != 0 ) System.out.println("Just finished scrolling to 0,0 after Month" );
				
			debugSleep(200L);	
				
				/* The following value is number.  for now just hard code the number  */
				inputCellRef = inputRowRef.getCell(TEN);
				inputCellRef.setCellType(1);
				userNameStr = inputCellRef.getStringCellValue();	//   DOBDAY
				
				WebElement dobDayField = driver.findElement(By.id("DOBDAY"));
				dobDayField.sendKeys(userNameStr);
				
				
				//dropDownAccessor = new Select(driver.findElement(By.id("DOBDAY")));
				//dropDownAccessor.selectByValue(userNameStr);   //selectByVisibleText("3");
				
				if (debugOn != 0 ) System.out.println("next we execute JS to handls scrolling");
				   js.executeScript("window.scrollTo(0,0);");
				if (debugOn != 0 ) System.out.println("Just finished scrolling to 0,0  after DAY");
				
			debugSleep(200L);
				
				
				/*
				inputCellRef = inputRowRef.getCell(ELEVEN);
				inputCellRef.setCellType(1);
				userNameStr = inputCellRef.getStringCellValue();
				*/
				userNameStr = getStringFromFile(loopVar, ELEVEN);
				
				WebElement dobYrField = driver.findElement(By.id("DOBYEAR"));
				dobYrField.sendKeys(userNameStr);
				

				
				
			WebElement temp4AuthCkBox = driver.findElement(By.className("checkbox"));   
			if (debugOn != 0 )
			{	System.out.println("driver.findElement(By.className( checkbox ))");
			  	System.out.println("");
			  	System.out.println("Where is FOCUS");
			  	System.out.println("");
			}
			
			debugSleep(800L);
			temp4AuthCkBox.click();
			   
			debugSleep(800L);

			js.executeScript("window.scrollTo(0,0);");			   
			WebElement submitToUFGButton = driver.findElement(By.id("submit-to-ufg"));
			js.executeScript("window.scrollTo(0,0);");
			submitToUFGButton.click();
			
/*			
			if (submitToUFGButton.findElement(By.className("disabled")) !=null ) {
				System.out.println("Found the simpler check of disabled . system.exit(0) ");
				System.exit(0);
			}else if (submitToUFGButton.findElement(By.ById.className("disabled")) != null){
				System.out.println("Found the more complecated version of disabled . system.exit()");
				System.exit(0);
			}else {
				System.out.println("We did not find a button at all, exiting");
				System.exit(0);
			}
*/			
			if (debugOn != 0 )System.out.println("next we execute JS to handls scrolling after finding findElement(By.id(submit-to-ufg)) ");
			   js.executeScript("window.scrollTo(0,0);");
			if (debugOn != 0 )System.out.println("Just submitToUFGButton.click(); ");
			
			if (debugOn != 0 )
			{
			   System.out.println("");
			   System.out.println("Sleeping 0.8 sec ");
			   System.out.println("Where is FOCUS");
			   System.out.println("");
			}
			   debugSleep(800L);
			

			// Now we need to wait until the page completes
			// Error Page
			//  https://qa6.sf.credit.com/identity_verification/error/new/no_credit_file_found.jsp?DEST=MATCH_CREDIT
			   // what is the new version landing page URL ???
			   
			   //boolean enrollSuccessful = false;
			boolean goodConditionA = false, goodConditionB = false;
			int testingAfter2ndPageSubmit = 0;
			
			while (true)
			{	int x = 0;
				if (testingAfter2ndPageSubmit > 40) // this is not a debug level output
				{	for(int y = 0; y< 5; y++) 		// we would always want this to output
						System.out.println("");
					System.out.println("Houston !  We have a problem ! We are out of here");
					//  System.exit(0);
					// I don't want to kill it, I want to break out 
					break;  // because we didn't get to the proper location
				}
				   
				debugSleep(1800L);  // I don't mind a long sleep here.  We're in trouble
									// maybe I can fix it manually at run time 
				urlTest = driver.getCurrentUrl();
				//urlTest.equals("");
/*				if (urlTest.contains("/signup/#/page2")){
					System.out.println("We got to URL with /signup/#/page2" );
					goodConditionA = true;
				}
				else
				{System.out.println("no /signup/#/page2  yet");    }*/
				
				//  if (urlTest.contains("member/match/dashboard.jsp")){//Ver 1 landing page
				if (urlTest.contains("my-credit-report-card/#/overview")){   // Ver 2 Landing Page
					if (debugOn != 0 ) System.out.println("We got to the final destination");
					System.out.println("Success for: " +userEmail);
					goodConditionB = true ;
					break;
				}
				else
				{ 	if (debugOn != 0 ) System.out.println("searching for URL member/match/dashboard.jsp " +testingAfter2ndPageSubmit +" many times"); 
				if (debugOn != 0 ) System.out.println("It's not looking good for this user: " +userEmail);
				}
				
				testingAfter2ndPageSubmit++;
			}//~while
			
			if (debugOn != 0 ) System.out.println("Broke out");
			
			//https://qa6.sf.credit.com/signup/#/page2
			
			// https://qa6.sf.credit.com/member/match/dashboard.jsp#col1
			//id="crc_title" 
			//id="score_num"
			
			//Failure problem at this 
			//https://qa6.sf.credit.com/identity_verification/error/new/error.jsp?DEST=MATCH_CREDIT

	   

		driver.get("https://qa6.sf.credit.com/logoutUser");  
	
		}// end of LoopCount For Loop
		if (debugOn != 0 ) System.out.println("Closing Firefox driver.");
		myDate = new Date();
		System.out.println("Finish: " +myDate );
		debugSleep(800L);
		driver.close(); 	
		
	} catch (FileNotFoundException e) {
		e.printStackTrace();
	} catch (IOException e) {
		e.printStackTrace();
	}
	///  System.out.println(   );//myFinishTimeStamp  Put this in later.
	}
		
		public void debugSleep(long duration){
			   try { Thread.sleep(duration ); }
			   catch (InterruptedException e)
			   {     e.printStackTrace(); }	
		}
		
		public String getStringFromFile(int row, int col){
			String returnVar = "";
			inputRowRef = worksheet.getRow(row); 
			inputCellRef = inputRowRef.getCell(col);
			inputCellRef.setCellType(1);
			returnVar = inputCellRef.getStringCellValue();
			return returnVar;
			//or
			// return inputCellRef.getStringCellValue();
			
		}//~getStringFromFile
		
		public int getIntegerFromFile(int row, int col){
			int intVal = 0;
			inputRowRef = worksheet.getRow(row); 
			inputCellRef = inputRowRef.getCell(col);		
			intVal  = (int)  inputCellRef.getNumericCellValue();;
			return intVal;			
		}//~getIngegerFromFile
		
		public void setDriverWindowDimensions(int x, int y ){
			driver.manage().window().setSize(new Dimension(x, y));	
			
		}//~setDriverWindowDimensions
		
		
		
		
	}//~Class
	
