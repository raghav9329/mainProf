package dcConsoleAutoTest;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.PageFactory;

public class ReturnALogin {

//    @FindBy(id = "username")
//    private WebElement username;
//
//    @FindBy(id = "password")
//    private WebElement password;
//
//    @FindBy(id = "submitButton")
//    private WebElement submitButton;

    private WebDriver driver;

    public Object Login(WebDriver driver){
        this.driver = driver;
 //   }

    return PageFactory.initElements(driver, null);
    }
    
//    public AdminWelcome loginAsAdmin(String user, String pw){
//        username.sendKeys(user);
//        password.sendKeys(pw);
//        submitButton.click();
//        return PageFactory.initElements(driver, AdminWelcome.class);
//    }
//
//    public CustomerWelcome loginAsCustomer(String user, String pw){
//        username.sendKeys(user);
//        password.sendKeys(pw);
//        submitButton.click();
//        return PageFactory.initElements(driver, CustomerWelcome.class);
//    }
//	
//	
	
//	public static void main(String[] args) {
//		String uidFieldId = "username";
//		String pidFieldID = "password"; 
//		String testUID = "mark.atkinson@sentient.ai";
//		String testPswd = "mark1";
//		WebDriver driver = new FirefoxDriver();
//		driver.get("http://gmqe.geneticfinance.com");
//		System.out.println(" Here we are: Login.java ");
//		
//		driver.manage().window().setSize(new Dimension(1350, 550));
//		driver.get("http://gmqe.geneticfinance.com");
//		WebElement login = driver.findElement(By.id(uidFieldId)) ;
//		login.sendKeys(testUID);
//		//debugSleep( sleepVal);	
//		
//		WebElement password = driver.findElement(By.id(pidFieldID));
//		password.sendKeys(testPswd);
//		//debugSleep( sleepVal);	
//		
//		WebElement loginButton = driver.findElement(By.id("login"));
//		loginButton.click();
//		return driver;


//	}

}
