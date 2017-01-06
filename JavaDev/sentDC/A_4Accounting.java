package dcConsoleAutoTest;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.firefox.FirefoxDriver;


public class A_4Accounting {
	
	static SleepDuration someSleep = new SleepDuration();
	
	public static void main (String[] args){
		System.out.println("Running single class in debugRunner Mode.");
		
		WebDriver browserHandle = new FirefoxDriver();
		browserHandle.get("http://gmqe.geneticfinance.com");	
		
		WebElement login = browserHandle.findElement(By.id("username")) ;
			login.sendKeys("mark.atkinson@sentient.ai");
	
		WebElement password = browserHandle.findElement(By.id("password"));
			password.sendKeys("mark1");
			someSleep.medium();
		
		WebElement loginButton = browserHandle.findElement(By.id("login"));
			loginButton.click();
			someSleep.tiny();	

			A_4Accounting testRunner = new A_4Accounting();
			testRunner.begin(browserHandle);
			someSleep.tenSeconds();
			testRunner.end(browserHandle);
	}	
	
	public void end(WebDriver currentdriver) {
		System.out.println("Executing A_4Accounting(Public void end(); to close the browser.");
		currentdriver.close();
	}	
	
	
	public void begin(WebDriver currentdriver) {
		System.out.println("A_4Accounting starting");
	
		currentdriver.get("http://gmqe.geneticfinance.com/#/accounting");
		
		System.out.println("Well there just really isn't much here yet");
		
		System.out.println("Last line of code: Done with A_4Accounting");
	}

}
