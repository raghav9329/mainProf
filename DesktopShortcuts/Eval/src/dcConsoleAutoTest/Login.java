package dcConsoleAutoTest;

import org.junit.Test;
import org.openqa.selenium.By;
import org.openqa.selenium.Dimension;
//import org.openqa.selenium.Keys;
//import org.openqa.selenium.NoSuchElementException;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.firefox.FirefoxDriver;

public class Login {
	static SleepDuration someSleep = new SleepDuration();
	
    @Test
	public static void main(String[] args) {
		 
		
		String uidFieldId = "username";
		String pidFieldID = "password"; 
		String logInBtnId = "login";
		String testUID = "mark.atkinson@sentient.ai";
		String testPswd = "mark1";
//		String driverStrValue;
		Long sleepVal = 400L ;
		String currentURL;
		String dashboardURL= "http://gmqexx.geneticfinance.com/#/dashboard";
	
		
		WebDriver driver = new FirefoxDriver();
		
		driver.get("http://gmqe.geneticfinance.com");
		System.out.println(" Here we are: Login.java ");
		
	  //driver.manage().window().setSize(new Dimension(1375, 750));
		driver.manage().window().setSize(new Dimension(1350, 550));
		
		WebElement login = driver.findElement(By.id(uidFieldId)) ;
		login.sendKeys(testUID);
		//someSleep.a500();
		
		WebElement password = driver.findElement(By.id(pidFieldID));
		password.sendKeys(testPswd);
		//someSleep.a500();
		
		WebElement loginButton = driver.findElement(By.id(logInBtnId));
		loginButton.click();
		someSleep.a500();
		currentURL = driver.getCurrentUrl();
		//assert(currentURL.equals(dashboardURL));
		if (currentURL.equals(dashboardURL)) {
		System.out.println("TheDashboard URL was equal to" +" "+ dashboardURL);	
			
		}else {
			System.out.println("it was NOT EQUAL");
			System.out.println("the current URL is: " + currentURL);
			System.out.println("the expected URL was: " + dashboardURL);
			//System.exit(0);
		}

		System.out.println("Last line of code:  Done.");
	}
	
}


///*		WebElement usersLink = driver.findElement(By.id("nav-users"));
//usersLink.click();
//someSleep.a500();
///*		WebElement hostsLink = driver.findElement(By.id("nav-hosts"));
//hostsLink.click();
//someSleep.a500();
///*		WebElement projectsLink = driver.findElement(By.id("nav-projects"));
//projectsLink.click();
//someSleep.a500();
///*		WebElement accountingLink = driver.findElement(By.id("nav-accounting"));
//accountingLink.click();
//someSleep.a500();
///*		WebElement utilizationLink = driver.findElement(By.id("nav-utilization"));
//utilizationLink.click();
//someSleep.a500();
///*		WebElement reportsLink = driver.findElement(By.id("nav-reports"));
//reportsLink.click();
//someSleep.a500();
///*		WebElement settingsLink = driver.findElement(By.id("nav-settings")); 
//settingsLink.click();
//someSleep.a500();
///*		WebElement testLink = driver.findElement(By.id("nav-test"));
//testLink.click();
//someSleep.a500();
///*		WebElement debugLink = driver.findElement(By.id("nav-debug"));
//debugLink.click();
//someSleep.a500();
///*		try {	WebElement notificationsLink = driver.findElement(By.id("nav-notifications")); 
//		notificationsLink.click(); }
//catch  ( org.openqa.selenium.UnhandledAlertException uae ) { String alertText = uae.getAlertText();  }
////driver.close();
