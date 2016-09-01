package TestCases;


import static org.junit.Assert.*;

import org.junit.BeforeClass;
//import org.junit.Rule;
import org.junit.Test;

//import org.junit.rules.ErrorCollector;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Date;

import org.openqa.selenium.Dimension;
import org.openqa.selenium.firefox.FirefoxDriver;
import org.apache.poi.hssf.usermodel.HSSFCell;
import org.apache.poi.hssf.usermodel.HSSFRow;
import org.apache.poi.hssf.usermodel.HSSFSheet;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;



public class SecondTestCaseCleanedUP {
		// I should put in a get dateTimeStamp routine for naming the output file.
	//	static String testSourceFile="C:\\mark\\EclipseWorkSpace1-j2ee\\xx_Module8_Junit_MarkStartsURLRedirects\\" +toString(date) +"url_Redirect.xls";
	// I could put in a formula at the bottom of the file to represent how many passes and fails !
	static Date date = new Date();
	
	//static SimpleDateFormat formatter = new SimpleDateFormat("yy-MM-dd'__'HH-mm"); // This date format is wierd
	static SimpleDateFormat formatter = new SimpleDateFormat("MM-dd-yyyy'@'HH-mm-ss"); 
	
	static Date myDate = new Date();
	static String myDateString = formatter.format(myDate);
	static String debugInfoStr = "";
	

	// \" +myDateString +"_RedirectTestResults.xls";	
	
	static int loopCount, column = 1;
	static int passCount=0, failCount=0; 

	
	//static String testSourceFile="C:\\mark\\EclipseWorkSpace1-j2ee\\xx_Module8_Junit_MarkStartsURLRedirects\\url_Redirect.xls";
	static String testSourceFile="url_Redirect.xls";
	//static String testResultsFile="C:\\mark\\EclipseWorkSpace1-j2ee\\xx_Module8_Junit_MarkStartsURLRedirects\\" +myDateString +"_RedirectTestResults.xls";
	static String testResultsFile = myDateString +"_RedirectTestResults.xls";
	
	
	static String srcTestData,plannedDestTestData, sourceURL, destURL, redirectedURL; 
	static String workSheetName = "URL2Test", resultsWrkSheetName= "TestResults";
	static String rootSourceURL , rootDestURL ;//= "https://www.credit.com", rootDestURL = "https://www.credit.com";
	static HSSFRow row, outputRow;
	static HSSFCell countCell,sourceCell, plannedDestCell,outputSrcCell,outputDestCell,outputActualCell,outputPassFailCell/*outputFormulaCell,*/ ;
	static HSSFCell rootDomainCell, debugInfoCell, browserExecuteCell ;
	static HSSFCell startTime, finishTime;
	static HSSFWorkbook workbook,resultsWrkBk;
	static HSSFSheet worksheet,resultsWrkSheet;
	static FileInputStream fileInputStream;
	static FileOutputStream fileOut;
	static FirefoxDriver d1;
	final static int ZERO=0, ONE=1,TWO=2,THREE=3,FOUR=4,FIVE=5;
	
//	@Rule
//	public ErrorCollector errCollector = new ErrorCollector();
	
	@BeforeClass  //URL2Test
		public static void getPoiEnvironmentTest(){

	//	System.out.println(myDateString);
		//System.out.println(myDateString);
		
	//public void getPoiEnvironmentTest(){
		try {
			fileInputStream = new FileInputStream(testSourceFile);
			fileOut = new FileOutputStream(testResultsFile);
			workbook = new HSSFWorkbook(fileInputStream);
			
			resultsWrkBk = new HSSFWorkbook(); 					// Turns out there is no argument necessary !
			worksheet = workbook.getSheet(workSheetName);
			resultsWrkSheet = resultsWrkBk.createSheet("TestWorkSheetString");
			
			row = worksheet.getRow(ONE); 						// zero based, get the first row where I put count of rows in 0th col
			countCell = row.getCell( ZERO );  					// zero based get the cell reference where I put the count
		    loopCount = (int)  countCell.getNumericCellValue();	// extract the value from the referenced cell
		
		    row = worksheet.getRow(TWO);						// zero based, get the next row 0th col where test domain will be 
			rootDomainCell = row.getCell(ZERO);					// zero bases, get the cell reference where the test domain string is
			rootSourceURL  = rootDomainCell.getStringCellValue(); 
			rootDestURL = rootSourceURL;
		
			row = worksheet.getRow(THREE);
			debugInfoCell= row.getCell(ZERO);
			debugInfoStr = debugInfoCell.getStringCellValue();
			//debugInfoStr.
			
/* I should put in some defensive if rootSourceURL == NULL  or len < 1  Error     */
/* I've set up the input file with data in order to decide what browser to test.  */			
		    d1 = new FirefoxDriver(); // This will open a Firefox Window
		    
		    d1.manage().window().setSize(new Dimension(600, 80));
			
			//System.out.println("Any Problems ???");	
			//System.out.println("Ending the @BeforeClass public static void getPoiEnvironment()");
		} catch (FileNotFoundException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
	
	
	@Test
	public void manyURLsTest(){
		try{
			System.out.println("Starting to test all the URLs");
			System.out.println("We will be testing " +loopCount +" URLs");
			
			
			
			// put in the output header row
			
			outputRow = resultsWrkSheet.createRow( 0 ); 				// row always corresponds to x
			
			outputPassFailCell = outputRow.createCell(ZERO);// was two	and was prev between where two and three are now.
			outputSrcCell = outputRow.createCell(ONE); // was zero 	// Cells, ie. column are fixed at A, B, C or 0, 1, 2// end if else block
			outputDestCell = outputRow.createCell(TWO);// was ONE
			outputActualCell = outputRow.createCell(THREE); // This is new
			startTime  = outputRow.createCell(FOUR); // This is new
			finishTime  = outputRow.createCell(FIVE); // This is new
			
			// outputFormulaCell = outputRow.createCell(FOUR); // This is new tesing output formula technology  ???
			
			outputPassFailCell.setCellValue("Status");
			outputSrcCell.setCellValue("sourceURL");
			outputDestCell.setCellValue("destURL");		
			outputActualCell.setCellValue("redirectedURL");  // This is new
			startTime.setCellValue(myDateString);
			
		for (int x = 1; x <= loopCount; x++){ 							// get test data
			row = worksheet.getRow(x);									// get the row our data is on   
			sourceCell = row.getCell(ONE);								// get cell reference from our row for the source data
			srcTestData = sourceCell.getStringCellValue();				// get the raw source test string
			plannedDestCell = row.getCell(TWO);							// get cell reference from our row for the destination data
			plannedDestTestData = plannedDestCell.getStringCellValue();	// get the raw dest string
		
			// concatenate strings creating test and compare URLs	
			sourceURL = rootSourceURL.concat(srcTestData);
			destURL = rootDestURL.concat(plannedDestTestData);
			
			// Debug: System.out.println(sourceURL +" " +destURL);
					
			
			d1.get(rootSourceURL);  									// go to the root (home page )
			//Debug: System.out.println("d1.get(rootSourceURL)");
			
			debugSleep( 30L);		
	//		try { Thread.sleep(30L);} 
	//		catch (InterruptedException e){// TODO Auto-generated catch block
	//			e.printStackTrace(); }
			
			d1.get(sourceURL);											// go to the test URL ( this will redirect )
			try { Thread.sleep(30L); } 
			catch (InterruptedException e) {// TODO Auto-generated catch block
				e.printStackTrace(); }
			
			redirectedURL = d1.getCurrentUrl();							// get the resulting redirected URL
			//d1.close();

			/*This block previously inside both if else blocks ( twice ! ) */
			outputRow = resultsWrkSheet.createRow( x ); 				// row always corresponds to x
			
			outputPassFailCell = outputRow.createCell(ZERO);// was two	and was prev between where two and three are now.
			
			outputSrcCell = outputRow.createCell(ONE); // was zero 	// Cells, ie. column are fixed at A, B, C or 0, 1, 2// end if else block
			
			outputDestCell = outputRow.createCell(TWO);// was ONE
			
			outputActualCell = outputRow.createCell(THREE); // This is new
			
			// outputFormulaCell = outputRow.createCell(FOUR); // This is new tesing output formula technology  ???
			
			outputSrcCell.setCellValue(sourceURL);
			
			outputDestCell.setCellValue(destURL);		
			
			outputActualCell.setCellValue(redirectedURL);  // This is new
			
			//  =IF(C1=D1,"ok","Err")  genericOutputCell.setCellValue('=IF('+( x+1 ) +'=D' +( x+1 ) +',"ok","Err")');
			
			
//			try{
//			assertEquals(redirectedURL,destURL );
//			}catch(Throwable t) {System.out.println("ERROR ENCOUNTERED");
//			errCollector.addError(t);
//			}
		
			/* For the following we use the val of x as it is vs previous
			 * iteration of code that put out x+1 because we were 
			 * zero based for some reason.  
			 * This iteration has a Header row on Zeroth row so X by itself
			 * now works
			 */
			System.out.print( x +" "); // Test Item number
			
			
			
//			if ( redirectedURL.equals(destURL) ){
//				System.out.println("Source and Dest are equal");
//				/*	Code previously in this block pulled and placed in the block above*/
//				outputPassFailCell.setCellValue("Pass");
//				
//			} else {
//				System.out.println("Something was different");
//				/*	Code previously in this block pulled and placed in the block above*/
//				outputPassFailCell.setCellValue("FAIL");
//			}// end if else block
			
			//static int passCount=0, failCount=0; 
			
			if (!redirectedURL.equals(destURL) ){ // if Not Equal is True.. they are not the same
				if(redirectedURL.contains(destURL)){ // They are not the same, but one might be in the other
					passCount++;
					System.out.println("Source and Dest are equal: " + passCount);
					outputPassFailCell.setCellValue("PASS ");
//					System.out.println("is thefirst     In the other");
//					System.out.println(destURL +"  " +redirectedURL);
//					System.out.println("redirectedURL.contains(destURL) Worked !");
//					System.out.println("Exiting");
//					System.exit(0);
				}else{
					failCount++;
					System.out.println("Something was different: " + failCount);
					outputPassFailCell.setCellValue("FAIL ");
//					System.out.println("Testing Contains didn't work. Exiting");
//					System.exit(0);
				}
				
		/*  Think this does not belong here   */		
//				System.out.println("Source and Dest are equal");
//				/*	Code previously in this block pulled and placed in the block above*/
//				outputPassFailCell.setCellValue("PASS ");
			
			
			
			} else {  	//(!redirectedURL.equals(destURL)) == FALSE
				      	// Which means that the two string were equal  
				 		// So we need to treat the output as true
				passCount++;
				System.out.println("Source and Dest are equal: " + passCount);
			//System.out.println("Source and Dest are equal");
						/*	Code previously in this block pulled and placed in the block above*/
			outputPassFailCell.setCellValue("PASS ");
			}// end if else block	
			
			
			
		}//end ForLoop
		myDate = new Date();
		myDateString = formatter.format(myDate);
		finishTime.setCellValue(myDateString);
		System.out.println(myDateString);
		
		resultsWrkSheet.autoSizeColumn( 40);
		resultsWrkBk.write(fileOut);
		fileOut.flush();
		fileOut.close();
		
		} catch (FileNotFoundException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}
		System.out.println("Finished Testing all the URLs and recording results.");
		System.out.println("Passes  : " +passCount);
		System.out.println("Failures: " +failCount);

		d1.close();
	}// end of public void manyURLsTest()
	
	public void debugSleep(long duration){
		   try { Thread.sleep(duration ); }
		   catch (InterruptedException e)
		   {     e.printStackTrace(); }	
	}
}
