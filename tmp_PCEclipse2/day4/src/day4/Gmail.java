package day4;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.firefox.FirefoxDriver;

public class Gmail {

	public static void main(String[] args) {


		WebDriver driver = new FirefoxDriver();
		driver.get("http://gmail.com");
		
		WebElement signInLnk = driver.findElement(By.id("gmail-sign-in"));
		signInLnk.click();
		
		WebElement username = driver.findElement(By.name("Email"));
		username.sendKeys("matkinson@credit.com");
		
		WebElement password = driver.findElement(By.name("Passwd"));
		password.sendKeys("**pswddd");
		
		WebElement signInBtn = driver.findElement(By.id("signIn"));
		signInBtn.click();
		
		System.out.println("done");
	}

}
