package simple;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.firefox.FirefoxDriver;
public class Login {
	
	// browserType String
	public String browserType;
	public WebDriver handle;
	
	// browserVersion String ( cus it fits with the example)
	private String browserVersion;
	
	public String getBrowserType() {
		return browserType;
	}
	
	public WebDriver getHandle(){
		return handle;
	}
}// end Class
