package HerokuCalcTester;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.firefox.FirefoxDriver;

public class Calculator {
//	String testURL = "http://pocket-calculator.herokuapp.com/" ;
	String testURL = "http://www.cnn.com" ;

	
	//void Calculator();
	
/*  Class Method  */	
	void connect (){
	WebDriver browserHandle = null;
	System.out.println(browserHandle);
		
	browserHandle = new FirefoxDriver();		
	System.out.println(browserHandle);	
	
	System.out.println("Trying to GET Test URL = " +testURL);
	browserHandle.get(testURL);
	
//	WebElement testElement =  browserHandle.findElement(By.className("calculator-display"));
	System.out.println("");
	}// end of MethodConnect
}// endofClass
	
