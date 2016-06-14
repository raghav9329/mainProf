package giveMeALogin;

//import org.junit.Test;
import org.openqa.selenium.By;
import org.openqa.selenium.Dimension;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.firefox.FirefoxDriver;


public class TestFactoryPattern {

	public static void main(String[] args) {
		// TODO Auto-generated method stub
	System.out.println("Guessing at the steps.......");
	System.out.println("");
		System.out.println("TestFacgtoryPattern- Step1 TestFactoryPattern.java before starting");
	
//System.out.println(TestLoginFactory.generateLogin(LoginType.FIREFOX));
System.out.println("TestFactoryPattern.java initiating TestLoginFactory.generate " +TestLoginFactory.generateLogin(LoginType.CHROME) +" step-7");
System.out.println(TestLoginFactory.generateLogin(LoginType.UNDEFINED));
/*System.out.println(TestLoginFactory.generateLogin(LoginType.FIREFOX));
System.out.println(TestLoginFactory.generateLogin(LoginType.CHROME));
System.out.println(TestLoginFactory.generateLogin(LoginType.WEEJUN));
System.out.println("");
System.out.println("");*/
	}

}
