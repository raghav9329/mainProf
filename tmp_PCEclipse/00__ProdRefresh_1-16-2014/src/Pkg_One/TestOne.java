package Pkg_One;

import org.openqa.selenium.By;
import org.openqa.selenium.Dimension;
import org.openqa.selenium.Keys;
import org.openqa.selenium.NoSuchElementException;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.firefox.FirefoxDriver;

public class TestOne {

	public static void main(String[] args) {
		
		String testURL = "https://qa6.sf.credit.com/login/";
		String qaRootUrl = "https://qa6.sf.credit.com";
		String newCRC_URL = "https://qa6.sf.credit.com/my-credit-report-card/#/overview";
		String automatedUID ="020414.BADILLO_RICARDO@credit.com";
		String uidFieldId = "EMAIL";
		String pidFieldID = "PASSWORDCS";  // This is not a particurlarly good field name !!
		String automatedPID = "password1";
		//String logInBtnClassName = "btn btn-primary-blue track-login-button";
		//String logInBtnClassName = "btn-primary-blue";
		String logInBtnClassName = "btn";
			
		
		WebDriver driver = new FirefoxDriver();
		driver.manage().window().setSize(new Dimension(850, 950));
		
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
		
	//  driver.get(newCRC_URL);  // Possibly no longer needed
		// Now that production takes new users to CRC_v3
		
//		System.out.println("about to sleep haveing put in the trick URL");
//	   try { Thread.sleep(6300L);} 
//		catch (InterruptedException e){
//			e.printStackTrace(); } 
//System.out.println("Set webelement pointer to null and letter grade to null");
	   WebElement gradePayHist = null ;
	   String letterGrade = null ;
	   
//	   System.out.println("entering the loop to check if dirver element has been rendered ???");
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
	   
   
//	   gradePayHist = driver.findElement(By.id("grade-payment-history"));
//	   String letterGrade =  gradePayHist.getText();
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
	   
	   
	   
		WebElement alertCenter = null;
		 if(driver.getPageSource().contains("Good Debt Levels")){
			 
			// System.out.println("see it?");
		 }
		 //else System.out.println("did not see it.");
		
	
	
		

	}

}
