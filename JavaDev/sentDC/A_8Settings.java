package dcConsoleAutoTest;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.firefox.FirefoxDriver;

public class A_8Settings {
	
	static SleepDuration someSleep = new SleepDuration();
	
	public static void main (String[] args){
		System.out.println("Running single class in debugRunner Mode.");
		
//		SleepDuration someSleep = new SleepDuration();
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

			A_8Settings testRunner = new A_8Settings();
			testRunner.begin(browserHandle);
			someSleep.longer();
			testRunner.end(browserHandle);
	}	

	public void end(WebDriver currentdriver) {
		System.out.println("Executing A_8Settings(Public void end(); to close the browser.");
		currentdriver.close();
	}		

	public void begin(WebDriver currentdriver) {
		someSleep.tiny();
		System.out.println("A_8Settings starting");
	
		currentdriver.get("http://gmqe.geneticfinance.com/#/settings");
		
		System.out.println("Well there just really isn't much here yet");
		
		System.out.println("Last line of code: Done with A_8Settings.begin()");
	}

}
