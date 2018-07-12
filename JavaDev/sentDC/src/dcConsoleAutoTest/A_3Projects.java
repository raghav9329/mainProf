package dcConsoleAutoTest;

import javax.swing.plaf.synth.SynthSliderUI;

import org.openqa.selenium.By;
import org.openqa.selenium.Keys;
import org.openqa.selenium.Dimension;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.firefox.FirefoxDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.support.ui.Select;

public class A_3Projects {

	static SleepDuration someSleep = new SleepDuration();
	
	public static void main (String[] args){
		
		System.out.println("Running single class in debugRunner Mode.");
		
		WebDriver browserHandle = new FirefoxDriver();
		browserHandle.get("http://gmdev.geneticfinance.com");	
		
		someSleep.a150();
		WebElement login = browserHandle.findElement(By.id("username")) ;
			login.sendKeys("mark.atkinson@sentient.ai");
	
		WebElement password = browserHandle.findElement(By.id("password"));
			password.sendKeys("mark1");
			someSleep.medium();
		
		WebElement loginButton = browserHandle.findElement(By.id("login"));
			loginButton.click();
			someSleep.tiny();	

			A_3Projects testRunner = new A_3Projects();
			testRunner.begin(browserHandle);
			//someSleep.tenSeconds();
			//testRunner.end(browserHandle);
	}	
	
	public void end(WebDriver currentdriver) {
		System.out.println("Executing A_3Projects(Public void end(); to close the browser.");
		currentdriver.close();
	}	
	
	public void waitForAndNavTo(){
		
		
	}
	
	public void accessDropListAndOption(String listID, WebDriver currentdriver, String listSelection ){
		Select droplist = new Select(currentdriver.findElement(By.id(listID)));  
	    someSleep.a1000();	
	    droplist.selectByVisibleText(listSelection);
	}
	
	public void navToAndClick(String linkID , WebDriver currentdriver){
		WebElement clickLink = currentdriver.findElement(By.id(linkID));
		clickLink.click();
		
	}
	
	public void begin(WebDriver currentdriver) {
		System.out.println("");
		System.out.println("A_3Projects starting");
		
		String uiElement		= "";
		String newProjButton	= "project-new";
		String dropLstObject	= "project-new-add-resources";
		String dropLstItem		= "Application";
		String appRscNameId		= "project-new-resource-name";
		String appRscDescId		= "project-new-container-uri";
		String projNameId		= "project-new-name";
		String projDescId		= "project-new-description" ;
		String projWusId		= "project-new-work-unit-servers";
		String newProjCanXBtnId	= "project-new-cancel";
		
		
		
		someSleep.a150();
		System.out.println("Paste in URL to Projects");
		
		currentdriver.get("http://gmdev.geneticfinance.com/#/projects");
		someSleep.a500();
		System.out.println("NavTo(project-new)");

/* Nav to Resource Creation drop list and select Application */	
		navToAndClick(newProjButton, currentdriver);
		someSleep.a1000();
		accessDropListAndOption(dropLstObject,currentdriver,dropLstItem);
		
/* Nav to app resource Name, then Description */		
		

		WebElement projNameField = currentdriver.findElement(By.id(projNameId));
		projNameField.sendKeys("Mark has Star Trek Visions");
		
		WebElement projDescField = currentdriver.findElement(By.id(projDescId));
		projDescField.sendKeys("Project Description field");
		
		
		WebElement rscNameField = currentdriver.findElement(By.id(appRscNameId));
		rscNameField.sendKeys("1 A 2 B 3 C Command Destruct");
		
		WebElement rscDescField = currentdriver.findElement(By.id(appRscDescId));
		rscDescField.sendKeys("Enterprise Self Destruct command squence");	
		
		WebElement wusDescField = currentdriver.findElement(By.id(projWusId));
		wusDescField.sendKeys("abcdefghijklmnopqrstuvwxyz");	
		wusDescField.sendKeys(Keys.RETURN);	
		wusDescField.sendKeys("ABCDEFGHIJKLMNOPQRSTUVWXYZ");	
		
		someSleep.a1000();
		
		navToAndClick(newProjCanXBtnId,currentdriver);
				
		System.out.println("Last line of code: Done with A_3Projects.begin()");
	}

	
	
	
}




/*		
System.setProperty("webdriver.chrome.driver", "/Users/matkinson/ChromeDriver/chromedriver");
WebDriver browserHandle = new ChromeDriver();
browserHandle.manage().window().setSize(new Dimension(1350, 550));	
browserHandle.get("http://gmdev.geneticfinance.com");
*/
