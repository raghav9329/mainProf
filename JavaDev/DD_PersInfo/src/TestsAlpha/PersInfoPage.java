package TestsAlpha;

import java.io.File;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.firefox.FirefoxDriver;
import org.openqa.selenium.firefox.FirefoxProfile;
import org.openqa.selenium.firefox.internal.ProfilesIni;
import org.openqa.selenium.remote.DesiredCapabilities;

public class PersInfoPage {

// constructor
	
	public PersInfoPage(){
		System.out.println("coming to you from the constructor");
		}
	
	public void someOtherMethod(){
		System.out.println("Just some other method");
	}// end of someOtherMethod
	
	
	public void openBrowser(){
		System.setProperty("webdriver.gecko.driver","C:\\SeleniumWebDriver\\FireFoxDriver\\geckodriver.exe");


		/* Third Try from: 
		 * http://stackoverflow.com/questions/19158473/selenium-webdriver-surpressing-untrusted-connection-message-in-firefox */
		FirefoxProfile firefoxProfile = new FirefoxProfile(new File("C:\\Users\\CA60212\\AppData\\Roaming\\Mozilla\\Firefox\\Profiles\\eubf6o8s.default"));
		
		DesiredCapabilities capabilities = DesiredCapabilities.firefox();
		
		capabilities.setCapability(FirefoxDriver.PROFILE, firefoxProfile);
		
		FirefoxDriver driver = new FirefoxDriver(capabilities);
		
        driver.get("https://dit3.deltadentalins.com");

        System.out.println("Application title is ============="+driver.getTitle());
        
        WebElement getQuotesButton = driver.findElement(By.id("getPlans"));
        
       //getQuotesButton.click();
        
        driver.get("https://dit3.deltadentalins.com/indEnroll?issuerCode=DELTA");
        
        WebElement initialZipCd = driver.findElement(By.id("zip"));
        
        initialZipCd.sendKeys("94949");

        //driver.quit();
        
        
	}

}// End of Class
