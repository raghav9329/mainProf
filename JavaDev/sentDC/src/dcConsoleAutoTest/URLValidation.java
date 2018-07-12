package dcConsoleAutoTest;

import org.junit.Test;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;

public class URLValidation {
	
	static SleepDuration someSleep = new SleepDuration();
	
    @Test	
	public void begin(WebDriver driver) {
		
		
		String 	dashboard = "http://gmqe.geneticfinance.com/#/dashboard" , 
				users ="http://gmqe.geneticfinance.com/#/users" , 
				hosts = "http://gmqe.geneticfinance.com/#/hosts" ,
				projects = "http://gmqe.geneticfinance.com/#/projects",
				accounting = "http://gmqe.geneticfinance.com/#/accounting",
				utilization = "http://gmqe.geneticfinance.com/#/utilization",
				reports = "http://gmqe.geneticfinance.com/#/reports",
				notifications = "http://gmqe.geneticfinance.com/#/notifications",
				settings = "http://gmqe.geneticfinance.com/#/settings" ,
				test = "http://gmqe.geneticfinance.com/#/test" ,
				debug = "http://gmqe.geneticfinance.com/#/debug",
				projects_new = "http://gmqe.geneticfinance.com/#/new-project",
				projMngRsrc = "http://gmqe.geneticfinance.com/#/manage-resources";


		String next, next2, next3, next4;
		String yetAnother, andTheLast;
		String currentURL, dashboardURL ;
		
		currentURL = "AAA";
		dashboardURL= "xx";
		
		
	
		if (currentURL.equals(dashboardURL)) {
			System.out.println("TheDashboard URL was equal to " + dashboardURL);	
		
		}else {
			System.out.println("it was NOT EQUAL");
			System.out.println("the current URL is: " + currentURL);
			System.out.println("the expected URL was: " + dashboardURL);
		//System.exit(0);
		} // else	
		
		someSleep.tiny();
		clickAndNavToLink( "nav-users", driver);
		clickAndNavToLink( "nav-hosts", driver);
		clickAndNavToLink( "nav-projects", driver);
		clickAndNavToLink( "nav-accounting", driver);
		clickAndNavToLink( "nav-utilization", driver);
		clickAndNavToLink( "nav-reports", driver);
		clickAndNavToLink( "nav-settings", driver);
		clickAndNavToLink( "nav-test", driver);
		clickAndNavToLink( "nav-debug", driver);
 /* 
special case at dev time clickAndNavToLink( "nav-notifications", driver);  // ** Put this back in **
		driver.switchTo().alert().dismiss();
  */

		System.out.println("Last line of code:  Done with URLValidation.");
		
		
	} // end of begin
    
    public void evalURL(String currentURL, String proposedURL){
    	
    	
    }

    public void clickAndNavToLink(String linkID , WebDriver currentdriver) {
 	   try { WebElement currentLink = currentdriver.findElement(By.id(linkID));
 	   		currentLink.click();
 	   		System.out.println("Select: "+linkID);
 	   		}
 	   catch ( org.openqa.selenium.UnhandledAlertException uae ) { String alertText = uae.getAlertText(); 
 	   		System.out.println("Try-Catch uae: "+alertText);
 	   		currentdriver.switchTo().alert().dismiss();
 	   		}
 	  someSleep.longer();
    } // end clickAndNavToLink
	
    
}// end of class
