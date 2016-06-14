package dcConsoleAutoTest;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.firefox.FirefoxDriver;

public class A_9Test {
	
	public static void main (String[] args){
		System.out.println("Running single class in debugRunner Mode.");
		
		SleepDuration someSleep = new SleepDuration();
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

		A_9Test testRunner = new A_9Test();
			testRunner.begin(browserHandle);
			testRunner.end(browserHandle);
	}		
	
	public void end(WebDriver currentdriver) {
		System.out.println("Executing A_9Test(Public void end(); to close the browser.");
		currentdriver.close();
	}	
	
	
	
	public void begin(WebDriver currentdriver) {
	
		System.out.println("A_9Test starting");

		currentdriver.get("http://gmqe.geneticfinance.com/#/test");

		System.out.println("Well there just really isn't much here yet");
		
		System.out.println("Last line of code: Done with A_9Test.begin();");
	}

	

}
