package dcConsoleAutoTest;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.firefox.FirefoxDriver;

public class A11_restApi {
	
	public static void main (String[] args){
		System.out.println("Running single class in debugRunner Mode.");
		WebDriver browserHandle = new FirefoxDriver();
		browserHandle.get("http://gmqe.geneticfinance.com");	
		
		A11_restApi testRunner = new A11_restApi();
		testRunner.begin(browserHandle);
		
	}

	// Here I should run a test sequence like my 301 run
	public void begin(WebDriver currentdriver) {
		System.out.println("A11_Debug starting");
	
		currentdriver.get("http://gmqe.geneticfinance.com/#/accounting");
		
		System.out.println("Well there just really isn't much here yet");
		
		System.out.println("Last line of code: Done with A11_Debug");
		
	}
}
