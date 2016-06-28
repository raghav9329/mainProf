package dcConsoleAutoTest;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.firefox.FirefoxDriver;

public class A_5Utilization {
	
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

			A_5Utilization testRunner = new A_5Utilization();
			testRunner.begin(browserHandle);
			someSleep.tenSeconds();
			testRunner.end(browserHandle);
	}	
	
	public void end(WebDriver currentdriver) {
		System.out.println("Executing A_5Utilization(Public void end(); to close the browser.");
		currentdriver.close();
	}		
		
		
	public void begin(WebDriver currentdriver) {
		
		String bodyText = "";
		System.out.println("A_5Utilization starting");
		currentdriver.get("http://gmqe.geneticfinance.com/#/utilization");
		
		bodyText = currentdriver.findElement(By.tagName("body")).getText();
		
		System.out.println("Let's see if I got any text from the Utilization page.");	
		System.out.println("Current URL should be: " +currentdriver.getCurrentUrl());
		System.out.println(bodyText);
		
		
		//currentdriver.getPageSource().contains("# of cores used, per projct over time.");
		//System.out.println("Well there just really isn't much here yet");
		
		System.out.println("Last line of code: Done with A_5Utilization.begin()");
	
	}
	
	
}
