package dcConsoleAutoTest;

import javax.swing.plaf.synth.SynthSliderUI;

import org.openqa.selenium.By;
import org.openqa.selenium.Keys;
import org.openqa.selenium.Dimension;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebDriverException;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.firefox.FirefoxDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.support.ui.Select;

public class A_3ProjRsrc {

	static SleepDuration someSleep = new SleepDuration();
	
	public static void main (String[] args){
		
		String testServerURL = "http://gmqe.geneticfinance.com";
		
		System.out.println("Running single class in debugRunner Mode.");
		
		WebDriver browserHandle = new FirefoxDriver();
		browserHandle.get(testServerURL);	
		
		System.out.println(browserHandle.getTitle());
		//if (browserHandle.getTitle().equalsIgnoreCase("Problem loading page ")){
		if (browserHandle.getTitle().contains("Problem loading page ")){
			System.out.println("Loading gmqe: Probmem found, exiting.");
			System.exit(0);
		}
		
		someSleep.a150();
		WebElement login = browserHandle.findElement(By.id("username")) ;
			login.sendKeys("mark.atkinson@sentient.ai");
	
		WebElement password = browserHandle.findElement(By.id("password"));
			password.sendKeys("mark1");
			someSleep.medium();
		
		WebElement loginButton = browserHandle.findElement(By.id("login"));
			someSleep.tiny();	
			System.out.println("about to click Login Button: sleep.....");
			someSleep.a5000();
			
			
			try { System.out.println("Try entered.  Now click button");
			loginButton.click();
			} catch ( org.openqa.selenium.UnhandledAlertException uae ) {System.out.println("first catch"); String alertText = uae.getAlertText(); 
 	   		System.out.println("Try-Catch uae: "+alertText);
 	   			browserHandle.switchTo().alert().dismiss();
				System.exit(0);
			} catch (WebDriverException sce) {
				System.out.println("second catch");
				browserHandle.switchTo().alert().dismiss();	
				System.exit(0);
			}

			
			System.out.println("past try block with  button.click login and catch if necess. sleep ....");
			someSleep.a5000();	

			A_3ProjRsrc testRunner = new A_3ProjRsrc();
			System.out.println("testRunner.begin(browserHandle)");
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
	
	public void accessDropLstByOptionStr(String listID, WebDriver currentdriver, String listSelection ){
		Select droplist = new Select(currentdriver.findElement(By.id(listID)));  
	    someSleep.a500();	
	    droplist.selectByVisibleText(listSelection);
	}
	
	public void accessDropLstByOptionValue(String listID, WebDriver currentdriver, String valueSelection ){
		Select droplist = new Select(currentdriver.findElement(By.id(listID)));  
	    someSleep.a500();	
	    droplist.selectByValue(valueSelection);
	}
	
	public void navToAndClick(String uiElement , WebDriver currentdriver){
		WebElement clickLink = currentdriver.findElement(By.id(uiElement));
		clickLink.click();
	}
	
	public void begin(WebDriver currentdriver) {
		System.out.println("");
		System.out.println("A_3Projects.begin().. starting");

		WebElement genericWebElement;
		WebElement rscNameField,rscDescField ;
		String uiElement			= "";
		String newProjButton		= "project-new";
		String dropLstObjectId		= "project-new-add-resources";
		String dropLstItemTxt		= "Application";
		String appRscNameId			= "project-new-resource-name";
		String projAddRscBtnId		= "project-new-resource-add";
		String appRscDescId			= "project-new-container-uri";
		String projNameId			= "project-new-name";
		String projDescId			= "project-new-description" ;
		String projWusId			= "project-new-work-unit-servers";
		String newProjCancelBtnId	= "project-new-cancel";
//     	String Other string values	= "project-new-resource-container-name";
//     	String Other string values	= "";
//     	String Other string values	= "";
//     	String Other string values	= "";
//     	String Other string values	= "";
//     	String Other string values	= "";
//     	String Other string values	= "";
		
		
		someSleep.a500();
		System.out.println("Paste in URL to Projects");
		
		currentdriver.get("http://gmqe.geneticfinance.com/#/projects");
		someSleep.a500();
		System.out.println("NavTo(project-new) Create some App resrouces");

		/* Nav to Resource Creation drop list and select list item w/txt "Application" */	
		navToAndClick(newProjButton, currentdriver);
		someSleep.a500();
		accessDropLstByOptionStr(dropLstObjectId,currentdriver,/* strVar_dropLstItemTxt*/"Application");

		/* Nav to app resource Name: Edit name value */	
		genericWebElement = currentdriver.findElement(By.id(/*strVar_appRscNameId */ "project-new-resource-name" ));
		genericWebElement.sendKeys("DC_TestApp_002");	
		
		/* Nav to app resource Description: Edit desc value */	
		genericWebElement = currentdriver.findElement(By.id(/* strVar_appRscDescId */ "project-new-container-uri" ));
		genericWebElement.sendKeys("Description-TA_002");		

		/* Sleep for Visual Effect  */
		someSleep.a2500();

		/*  COMMIT CHAGNES */
		/* Commit App resource add with button click */  //   *** ---  Hold off on this for now  ---  ***
//		navToAndClick( /*strVar_projAddRscBtnId */"project-new-resource-add" ,currentdriver );  
		try {System.out.println("Inside try: about to navToAndClick to get the alert"); navToAndClick( /*strVar_projAddRscBtnId */"project-new-resource-add" ,currentdriver );  }
		catch ( org.openqa.selenium.UnhandledAlertException uae ) { String alertText = uae.getAlertText(); 
	   		System.out.println("Try-Catch uae: "+alertText);
	   		currentdriver.switchTo().alert().dismiss();
	   		}

		someSleep.a1000();
		System.out.println("backoutside the former try-catch. oh and just selept for 1 sec");
		
	 	/* Reset interface and start again for Container Resource   */
		currentdriver.get("http://gmqe.geneticfinance.com/#/projects");
		someSleep.a250();
		System.out.println("NavTo(project-new) Create some Container resrouces");
	
		
		/* Nav to Resource Creation drop list and select list item w/txt "Container" */	
		navToAndClick(newProjButton, currentdriver);
		someSleep.a500();
		accessDropLstByOptionStr(dropLstObjectId,currentdriver,/* strVar_currUndefined*/"Container");		
		
		/* Here's a slight reuse of code, cuz of identical field variable names */	
		/* Nav to container resource Name: Edit name value */	
		rscNameField = currentdriver.findElement(By.id(/*strVar_appRscNameId*/ "project-new-resource-name"));
		rscNameField.sendKeys("DC_TestContainer_001");	
		
		/* Nav to Container Name Description: Edit desc value */	
		rscDescField = currentdriver.findElement(By.id(/*strVar_appRscDescId*/ "project-new-container-uri"));
		rscDescField.sendKeys("Description-TC_001");
		
		
		/* Nav to container resource Description: Edit Container Name field value */	
		rscDescField = currentdriver.findElement(By.id(/*strVar CurrUndefined */ "project-new-resource-container-name"));
		rscDescField.sendKeys("ContainerName for TC_001");	
	
		/* Nav to container arguments list: Edit Container Name field value */	
		rscDescField = currentdriver.findElement(By.id(/*strVar CurrUndefined*/ "project-new-resource-arguments"));
		rscDescField.sendKeys("-v -p/usr/bin -c./: for 'verbose' 'path' 'loc'");			

		/* Nav to App selection Dropdown: select list item Value "1",  first one in the list */
		accessDropLstByOptionValue("resource-new-application",currentdriver, /*strVar_currUndefined*/ "1");		
		
		/* Nav to boolean check box: Select */
		navToAndClick( "project-new-resource-containerized" ,currentdriver);
		
		rscDescField = currentdriver.findElement(By.id(/*strVar CurrUndefined*/ "project-new-resource-image-id"));
		rscDescField.sendKeys("L321H246");	
		
		
		/* Sleep for Visual Effect  */
		someSleep.a2500();

		/*  COMMIT CHAGNES */
		/* Commit App resource add with button click */  //   *** ---  Hold off on this for now  ---  ***
//	 	navToAndClick( /*strVar_projAddRscBtnId */"project-new-resource-add" ,currentdriver );  
		try {System.out.println("Inside try: about to navToAndClick to get the alert"); navToAndClick( /*strVar_projAddRscBtnId */"project-new-resource-add" ,currentdriver );  }
		catch ( org.openqa.selenium.UnhandledAlertException uae ) { String alertText = uae.getAlertText(); 
	   		System.out.println("Try-Catch uae: "+alertText);
	   		currentdriver.switchTo().alert().dismiss();
	   		}		
		
		currentdriver.get("http://gmqe.geneticfinance.com/#/projects");
		someSleep.a250();
		System.out.println("NavTo(project-new) Create some Datasets");	
		
		/* Nav to Resource Creation drop list and select list item w/txt "Dataset" */	
		navToAndClick(newProjButton, currentdriver);
		someSleep.a500();
		accessDropLstByOptionStr(dropLstObjectId,currentdriver,/* strVar_currUndefined*/"Dataset");
		
		/* Here's a slight reuse of code, cuz of identical field variable names */	
		/* Nav to Dataset resource Name: Edit name value */	
			rscNameField = currentdriver.findElement(By.id(/*strVar_appRscNameId*/ "project-new-resource-name"));
			rscNameField.sendKeys("DC_TestDataset_001");	
				
		/* Nav to Container Name Description: Edit desc value */	
				rscDescField = currentdriver.findElement(By.id(/*strVar_appRscDescId*/ "project-new-container-uri"));
				rscDescField.sendKeys("Description-DS_001");	

				
		/* Sleep for Visual Effect  */
				someSleep.a2500();

		/*  COMMIT CHAGNES */
		/* Commit App resource add with button click */  //   *** ---  Hold off on this for now  ---  ***
//		navToAndClick( /*strVar_projAddRscBtnId */"project-new-resource-add" ,currentdriver );  
				try {System.out.println("Inside try: about to navToAndClick to get the alert"); navToAndClick( /*strVar_projAddRscBtnId */"project-new-resource-add" ,currentdriver );  }
				catch ( org.openqa.selenium.UnhandledAlertException uae ) { String alertText = uae.getAlertText(); 
			   		System.out.println("Try-Catch uae: "+alertText);
			   		currentdriver.switchTo().alert().dismiss();
			   		}		
		
//		navToAndClick(newProjCancelBtnId,currentdriver);
				
		System.out.println("Last line of code: Done with A_3Projects.begin()"); } 
}


//WebElement projNameField = currentdriver.findElement(By.id(projNameId));
//projNameField.sendKeys("Mark has Star Trek Visions");

//Nav to app resource Description: Edit description value 		
//WebElement projDescField = currentdriver.findElement(By.id(projDescId));
//projDescField.sendKeys("Project Description field");

//
//WebElement wusDescField = currentdriver.findElement(By.id(projWusId));
//wusDescField.sendKeys("abcdefghijklmnopqrstuvwxyz");	
//wusDescField.sendKeys(Keys.RETURN);	
//wusDescField.sendKeys("ABCDEFGHIJKLMNOPQRSTUVWXYZ");	
//

/*		
System.setProperty("webdriver.chrome.driver", "/Users/matkinson/ChromeDriver/chromedriver");
WebDriver browserHandle = new ChromeDriver();
browserHandle.manage().window().setSize(new Dimension(1350, 550));	
browserHandle.get("http://gmqe.geneticfinance.com");
*/
