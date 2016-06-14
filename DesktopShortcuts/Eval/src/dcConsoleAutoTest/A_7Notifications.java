package dcConsoleAutoTest;

import org.openqa.selenium.By;
import org.openqa.selenium.Dimension;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.firefox.FirefoxDriver;

public class A_7Notifications {
	
	static SleepDuration someSleep = new SleepDuration();
	
	public static void main (String[] args){
		System.out.println("Running single class in debugRunner Mode.");
		
		//SleepDuration someSleep = new SleepDuration();
//		WebDriver browserHandle = new FirefoxDriver();
		
		System.setProperty("webdriver.chrome.driver", "/Users/matkinson/ChromeDriver/chromedriver");
		WebDriver browserHandle = new ChromeDriver();
		browserHandle.manage().window().setSize(new Dimension(1350, 550));
		
		browserHandle.get("http://gmqe.geneticfinance.com");	
		
		WebElement login = browserHandle.findElement(By.id("username")) ;
			login.sendKeys("mark.atkinson@sentient.ai");
	
		WebElement password = browserHandle.findElement(By.id("password"));
			password.sendKeys("mark1");
			someSleep.medium();
		
		WebElement loginButton = browserHandle.findElement(By.id("login"));
			loginButton.click();
			someSleep.tiny();	

			A_7Notifications testRunner = new A_7Notifications();
			testRunner.begin(browserHandle);
			someSleep.tenSeconds();
			testRunner.end(browserHandle);
	}	
	
	public void end(WebDriver currentdriver) {
		System.out.println("Executing A_7Notificationst(Public void end(); to close the browser.");
		currentdriver.close();
	}		
	
	
	public void begin(WebDriver currentdriver) {
		System.out.println("A_7Notifications starting");
/*	
		currentdriver.get("http://gmqe.geneticfinance.com/#/notifications");
 */     System.out.println("Ahem....... Remember A_7Notifications does a 404 and so we've commented out : ) ");		
		System.out.println("Well there just really isn't much here yet");
		
		System.out.println("Last line of code: Done with A_7Notifications.begin()");
	}

}
