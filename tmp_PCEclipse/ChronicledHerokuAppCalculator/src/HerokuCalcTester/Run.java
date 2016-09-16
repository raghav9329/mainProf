package HerokuCalcTester;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.firefox.FirefoxDriver;
import org.openqa.selenium.firefox.FirefoxProfile;

public class Run {

	public static void main(String[] args) {
		String testURL = "http://www.cnn.com" ;
		
		WebDriver browserHandle = null;
		System.out.println(browserHandle);
		FirefoxProfile profile = new FirefoxProfile();	
		browserHandle = new FirefoxDriver(profile);		
		System.out.println(browserHandle);	
		
		System.out.println("Trying to GET Test URL = " +testURL);
		browserHandle.get("http://www.cnn.com");
		
//		WebElement testElement =  browserHandle.findElement(By.className("calculator-display"));
		System.out.println("");	
		
		
		
		
//		Calculator myCalcTest = new Calculator();
		
//		myCalcTest.connect();
	}

}
