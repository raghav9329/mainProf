package dcConsoleAutoTest;

import org.openqa.selenium.By;
import org.openqa.selenium.Platform;
import org.openqa.selenium.Dimension;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
// import org.openqa.selenium.chrome.ChromeDriver;
// import org.openqa.selenium.firefox.FirefoxDriver;
import org.openqa.selenium.safari.SafariDriver;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;


public class TestSafariRunner {
	
	static SleepDuration someSleep = new SleepDuration();
	
	public static void main(String[] args) { // args is an array of Strings !

/* Parse Command line Args */
// debug 3.14159265 I don't know if that's the c o r r e c t representation of PI
	if ( args.length > 0) {
		if (args[0].equals("debug")){
			
	    // start i at 1 and dont pickup "debug"	
		for ( int i = 1; i < args.length; i++ )      
	   	    System.out.print( args[i]+" " );
		System.out.println();
		}	
		System.out.println("There were arguments. Exiting");
		System.exit(0);
	}
	
//	System.setProperty("webdriver.chrome.driver", "/Users/matkinson/ChromeDriver/chromedriver");
	WebDriver browserHandle = new SafariDriver();
	//browserHandle.manage().window().setSize(new Dimension(1350, 550));
	
/* runSetup */		

		String UID = "mark.atkinson@sentient.ai";
		String Pswd = "mark1";
		String uidFieldId = "username";
		String pidFieldID = "password"; 
/* runSetup */		

		
//		WebDriver browserHandle = new FirefoxDriver();
		System.out.println("next move browserHandle.get(gmqe.RL) ");
		browserHandle.get("http://gmqe.geneticfinance.com");	
/* runSetup */		

//		try { Thread.sleep(30L); }
//		catch (InterruptedException e) {  e.printStackTrace(); }	
		someSleep.tiny(); //50L
/* runSetup */		

		WebElement login = browserHandle.findElement(By.id(uidFieldId)) ;
		login.sendKeys(UID);
		/*System.out.println("sentKeys UID");*/
/* runSetup */		

		WebElement password = browserHandle.findElement(By.id(pidFieldID));
		//password.sendKeys(testPswd);
		password.sendKeys(Pswd);
		/*System.out.println("sendKeys PASSWD");*/
/* runSetup */		

		WebElement loginButton = browserHandle.findElement(By.id("login"));
		loginButton.click();

		
/* runTest */		
		InitialNavigation testRun = new InitialNavigation();
		testRun.begin(browserHandle,UID, Pswd);
		
		URLValidation validate = new URLValidation();
		validate.begin(browserHandle);
	
		A_1Users evaluateUserPage = new A_1Users();
		evaluateUserPage.begin(browserHandle);
		
		A_2Hosts evaluateHostsPage = new A_2Hosts();
		evaluateHostsPage.begin(browserHandle);	
		
		A_3ProjRsrc evaluateProjectsPage = new A_3ProjRsrc();
		evaluateProjectsPage.begin(browserHandle);	
		
		A_4Accounting evaluateAccountingPage = new A_4Accounting();
		evaluateAccountingPage.begin(browserHandle);	
		
		A_5Utilization evaluateUtilizaitonPage = new A_5Utilization();
		evaluateUtilizaitonPage.begin(browserHandle);	
		
		A_6Reports evaluateReportsPage = new A_6Reports();
		evaluateReportsPage.begin(browserHandle);	

	/*  Running Notifications is going to Blow up ANY browser due to 404 on Notifications URL
		A_7Notifications evaluateNotificationsPage = new A_7Notifications();
		evaluateNotificationsPage.begin(browserHandle);	
	 */
		
		A_8Settings evaluateSettingsPage = new A_8Settings();
		evaluateSettingsPage.begin(browserHandle);	
		
		A_9Test evaluateTestPage = new A_9Test();
		evaluateTestPage.begin(browserHandle);	
		
		A10_Debug evaluateDebugPage = new A10_Debug();
		evaluateDebugPage.begin(browserHandle);	
		
		A11_restApi runApiTest = new A11_restApi();
		runApiTest.begin(browserHandle);	
		
	
	}

}
