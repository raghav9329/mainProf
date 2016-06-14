package simple;
import org.openqa.selenium.firefox.FirefoxDriver;
public class FireFoxLogin extends Login {
	public FireFoxLogin(String currentType){
	//	System.out.println("I am " +currentType);
		handle = new FirefoxDriver();

	}
}
