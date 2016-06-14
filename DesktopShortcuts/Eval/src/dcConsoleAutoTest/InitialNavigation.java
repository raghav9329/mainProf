package dcConsoleAutoTest;

import org.junit.Test;
import org.openqa.selenium.By;
import org.openqa.selenium.Dimension;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.firefox.FirefoxDriver;

public class InitialNavigation {
    // @Test
	static SleepDuration someSleep = new SleepDuration();
    
	public static void main (String[] args){
		System.out.println("Running single class in debugRunner Mode.");
		
		WebDriver browserHandle = new FirefoxDriver();
		browserHandle.get("http://gmqe.geneticfinance.com");	
		
		someSleep.medium();
		WebElement login = browserHandle.findElement(By.id("username")) ;
			login.sendKeys("mark.atkinson@sentient.ai");
	
		WebElement password = browserHandle.findElement(By.id("password"));
			password.sendKeys("mark1");
			someSleep.medium();
		
		WebElement loginButton = browserHandle.findElement(By.id("login"));
			loginButton.click();
			someSleep.tiny();//50L

		InitialNavigation testRunner = new InitialNavigation();
			testRunner.begin(browserHandle,"mark.atkinson@sentient.ai","mark1");
			someSleep.longer();
			testRunner.end(browserHandle);
	}	
	
	public void end(WebDriver currentdriver) {
		System.out.println("Executing A_7Notificationst(Public void end(); to close the browser.");
			currentdriver.close();
	}	 
	
	public void navToAndClickLink(String linkID , WebDriver currentdriver) {
 	   WebElement currentLink = currentdriver.findElement(By.id(linkID));
 	   		System.out.println("Select: "+linkID);
 	   		someSleep.tiny();
 	   		currentLink.click();
 	   if (isAlertPresent(currentdriver)) { System.out.println( "Alert detected on " 
 		   +linkID +" at " +currentdriver.switchTo().alert().getText());
 		  	currentdriver.switchTo().alert().accept();
 	   } // fi

 	   someSleep.medium();
    } // end navToAndClickLink
    
    
    
    public boolean isAlertPresent(WebDriver currentdriver){
        try{ currentdriver.switchTo().alert();
            return true;
        } catch(Exception e){ return false;  }
    } // end isAlertPresent
    
	public /*static*/ void begin (WebDriver driver, String UID, String PID) {
		System.out.println(" Here we are in Initial Navigation");

		someSleep.medium();
		navToAndClickLink( "nav-users", driver);
		navToAndClickLink( "nav-hosts", driver);
		navToAndClickLink( "nav-projects", driver);
		navToAndClickLink( "nav-accounting", driver);
		navToAndClickLink( "nav-utilization", driver);
		navToAndClickLink( "nav-reports", driver);
		navToAndClickLink( "nav-settings", driver);
		navToAndClickLink( "nav-test", driver);
		navToAndClickLink( "nav-debug", driver);	
	/*
		navToAndClickLink( "nav-notifications", driver);
	 */	
		/* ...alert().dismiss(); is just to handle the current 404 returned. */
		// driver.switchTo().alert().dismiss();
		
		
		
//		driver.quit();
		System.out.println("Last line of code:  Done with InitialNavigation.");
		System.out.println("driver.toString == " +driver.toString() );
		
		//end(driver);
	}
}  		


/* *****************************************************************************
********************************************************************************
********************************************************************************
      
		import org.openqa.selenium.Keys;
		import org.openqa.selenium.NoSuchElementException;
      
      Stuff at the end of the file kept or posterity ( just a short while )
	
		try {	WebElement notificationsLink = driver.findElement(By.id("nav-notifications")); 
				notificationsLink.click();
				System.out.println("Select: Notifications");
				}
		catch  ( org.openqa.selenium.UnhandledAlertException uae ) { 
				String alertText = uae.getAlertText();  
				System.out.println("UAE caught = "+alertText);
				}

		currentURL = driver.getCurrentUrl();
		//assert(currentURL.equals(dashboardURL));

// comment block because newer framework passes
// many of these concepts in
//
//		//driver.get("http://gmqe.geneticfinance.com");
//		
//		//driver.manage().window().setSize(new Dimension(1350, 550));
//		


*/
