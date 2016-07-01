package dcConsoleAutoTest;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.firefox.FirefoxDriver;

public class A_1Users {

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

			A_1Users testRunner = new A_1Users();
			testRunner.begin(browserHandle);
			someSleep.tenSeconds();
			testRunner.end(browserHandle);
	}	
	
	public void end(WebDriver currentdriver) {
		System.out.println("Executing A_1Users(Public void end(); to close the browser.");
		currentdriver.close();
	}	
	
	public void begin(WebDriver currentdriver) {
		System.out.println("A_1Users starting");
		String linkId = "nav-users";
	
		//currentdriver.get("http://gmqe.geneticfinance.com/#/users");
		
		WebElement currentLink = currentdriver.findElement(By.id(linkId));
		currentLink.click();
		
		System.out.println("sleep here for a little bit");
		System.out.println("Last line of code: Done with A_1Users.begin();");
		
	} // end of begin


} // end A_1Users



