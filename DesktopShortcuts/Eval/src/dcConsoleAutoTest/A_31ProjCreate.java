package dcConsoleAutoTest;

import org.openqa.selenium.By;
import org.openqa.selenium.Dimension;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.firefox.FirefoxDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.support.ui.Select;

public class A_31ProjCreate {

	static SleepDuration someSleep = new SleepDuration();
	
	public static void main (String[] args){
		System.out.println("Running single class in debugRunner Mode.");
		
/*		
		System.setProperty("webdriver.chrome.driver", "/Users/matkinson/ChromeDriver/chromedriver");
		WebDriver browserHandle = new ChromeDriver();
		browserHandle.manage().window().setSize(new Dimension(1350, 550));	
		browserHandle.get("http://gmqe.geneticfinance.com");
		*/
		
		
		WebDriver browserHandle = new FirefoxDriver();
		browserHandle.get("http://gmqe.geneticfinance.com");	
		
		someSleep.a150();
		WebElement login = browserHandle.findElement(By.id("username")) ;
			login.sendKeys("mark.atkinson@sentient.ai");
	
		WebElement password = browserHandle.findElement(By.id("password"));
			password.sendKeys("mark1");
			someSleep.medium();
		
		WebElement loginButton = browserHandle.findElement(By.id("login"));
			loginButton.click();
			someSleep.tiny();	

			A_31ProjCreate testRunner = new A_31ProjCreate();
			testRunner.begin(browserHandle);
			//someSleep.tenSeconds();
			testRunner.end(browserHandle);
	}	
	
	public void end(WebDriver currentdriver) {
		System.out.println("Executing A_3Projects(Public void end(); to close the browser.");
		currentdriver.close();
	}		
	
	public void begin(WebDriver currentdriver) {
		System.out.println("");
		System.out.println("A_3Projects starting");
		
		String uiElement = "project-new";
		someSleep.a150();
		currentdriver.get("http://gmqe.geneticfinance.com/#/projects");
		someSleep.a500();
		WebElement clickLink = currentdriver.findElement(By.id(uiElement)) ;
		clickLink.click();
		//System.out.println("Well there just really isn't much here yet");
	
		// project-new-add-resources	
		someSleep.a1000();
		Select droplist = new Select(currentdriver.findElement(By.id("project-new-add-resources")));   
		someSleep.a1000();
		droplist.selectByVisibleText("Application");
		//droplist.selectByValue("1");
		
		System.out.println("Last line of code: Done with A_3Projects.begin()");
	
	}
}
