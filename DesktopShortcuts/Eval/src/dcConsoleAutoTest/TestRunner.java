package dcConsoleAutoTest;
import org.openqa.selenium.By;
import org.openqa.selenium.Dimension;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.firefox.FirefoxDriver;


public class TestRunner {
	
	static SleepDuration someSleep = new SleepDuration();
	
	public static void main(String[] args) { // args is an array of Strings !

/* Parse Command line Args */
// debug 3.14159265 I don't know if that's the c o r r e c t representation of PI
//		if ( args.length > 0) {
//		if (args[0].equals("debug")){
//			
//	    // start i at 1 and dont pickup "debug"	
//		for ( int i = 1; i < args.length; i++ )      
//	   	    System.out.print( args[i]+" " );
//		System.out.println();
//		}	
//		System.out.println("There were arguments. Exiting");
//		System.exit(0);
//	}
//
		
/* Evaluate and Act on appropriate execution cycle */
	final WebDriver browserHandle;
		
		
	if ( args.length < 1) {
	//S
	System.out.println("Currently this --ONLY-- work if you give it an argument");
	System.out.println("< chrome > launches the test in -guess- that's right Chrome Browser");
	System.out.println("any other argument will launch in Firefox.");
	System.out.println("No argument gets you this message.");
	System.exit(0);
	}
    System.out.println("args==" +args[0]);	
	if (args[0].equals("chrome")){
			System.out.println("We've detected Chrome Argument ");
			System.setProperty("webdriver.chrome.driver", "/Users/matkinson/ChromeDriver/chromedriver");
			/*WebDriver*/ browserHandle = new ChromeDriver();
			browserHandle.manage().window().setSize(new Dimension(1350, 550));	
			browserHandle.get("http://gmqe.geneticfinance.com");	
	}else {
	System.out.println("No --Chrome-- Argument: defaulting to Firefox");
		/*WebDriver*/ browserHandle = new FirefoxDriver();
		browserHandle.get("http://gmqe.geneticfinance.com");	
		
		}

		
/* So, I need a list of the execution cycles*/		
		
	//	All  (call all modules )
	// Seleciton 1 ( Call select modules )
	// seleciton 2	 etc...
		
/* runSetup */		

		String UID = "mark.atkinson@sentient.ai";
		String Pswd = "mark1";
		String uidFieldId = "username";
		String pidFieldID = "password"; 
/* runSetup */		


/* runSetup */		

//		try { Thread.sleep(30L); }
//		catch (InterruptedException e) {  e.printStackTrace(); }	
/* runSetup */		
		someSleep.a50();
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
		
//		A_4Accounting evaluateAccountingPage = new A_4Accounting();
//		evaluateAccountingPage.begin(browserHandle);	
//		
//		A_5Utilization evaluateUtilizaitonPage = new A_5Utilization();
//		evaluateUtilizaitonPage.begin(browserHandle);	
//		
//		A_6Reports evaluateReportsPage = new A_6Reports();
//		evaluateReportsPage.begin(browserHandle);	
		
		
		
//		
//		A_7Notifications evaluateNotificationsPage = new A_7Notifications();
//		evaluateNotificationsPage.begin(browserHandle);	
//		
		
		
//		A_8Settings evaluateSettingsPage = new A_8Settings();
//		evaluateSettingsPage.begin(browserHandle);	
//		
//		A_9Test evaluateTestPage = new A_9Test();
//		evaluateTestPage.begin(browserHandle);	
		
//		A10_Debug evaluateDebugPage = new A10_Debug();
//		evaluateDebugPage.begin(browserHandle);	
//		
//		A11_restApi runApiTest = new A11_restApi();
//		runApiTest.begin(browserHandle);	
	/*
	 setup argument handling
	 	* Handle a number : of similar things to do
	 	* Handle a string : some what more focused thing to do
	 		* UID,PID are possibilities 
	 		* give you useraccess control testing
	 	* Thinking a case statement jumping off point to do stuff
	 	* 
	 	
	 	* Stub out several test files similar to "initialNavigation"
	 		* set up mechanism in this file to launch those naviagations
	 	* 
	 */
		
		
		
/*  Temp Task List  *	 
 * First Prove navigation on page links on the left of each page 
 *   2nd level  Vlidate you go to the designated URL
 * Make each trip to a page in a source_file/Junit Test of it's own (See Vid )
 * Expand within each file/test execution of the page's controls
 * Later: Refactor the project with better package names, src files, class, etc.
 * Dashboard
 */	
		

	}

}
