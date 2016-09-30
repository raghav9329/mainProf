/*
 * This package and this source file are a copy of  //Test/CanIdetermineTheDest
 * I am looking for more elegant solid ways to identify that page I've landed on.
 * 
 * 
 * 
 */



package TestAgain;

import java.util.List;

import junit.framework.Assert;

import org.openqa.selenium.support.ui.Select;
import org.openqa.selenium.By;
import org.openqa.selenium.Dimension;
import org.openqa.selenium.NoSuchElementException;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.firefox.FirefoxDriver;

public class OtherPageDeterminationTechniques {
	
	
	public static void main(String[] args) {

		int ccomCount = 0,amOneCount = 0;
		
		 for (int x = 1; x <= 2 ; x++){
			 
				try { Thread.sleep(300L);} 
				catch (InterruptedException e){// TODO Auto-generated catch block
					e.printStackTrace(); } 
			 
			WebDriver driver = new FirefoxDriver();
			driver.manage().window().setSize(new Dimension(650, 150));

		//System.setProperty("webdriver.chrome.driver", "c:\\SeleniumChromeDriver\\chromedriver.exe");
		//WebDriver driver = new ChromeDriver();
		driver.get("http://www.prosper.com/");	
		

		
		WebElement loanAmount = driver.findElement(By.id("loanAmountHome"));
		loanAmount.sendKeys("2500.00");
		
		Select loanDropListPurpose = new Select(driver.findElement(By.id("listing-cat-select")));
		loanDropListPurpose.selectByVisibleText("Debt consolidation");
		
		Select creditQualityList = new Select(driver.findElement(By.id("self-reported-credit")));
		creditQualityList.selectByVisibleText("Poor Credit");
		
		WebElement submitButton = driver.findElement(By.id("M_MainContent_BorrowerFunnel1_btnGoBorrow"));
		submitButton.click();
					
		try { Thread.sleep(1200L);} 
		catch (InterruptedException e){// TODO Auto-generated catch block
			e.printStackTrace(); }
		
		
		// Following necessary in forloop
		//System.out.print(" Test "+x +" ");
		
		//WebElement classPromoBody = driver.findElement(By.className("promoBody"));
		WebElement testWE, classPromoBody=null  ;
		String localStrVar;
		 
		
		//System.out.println("Calling: driver.findElement(By.id(creditTooLowPromo))");
		try { Thread.sleep(1800L);} 
		catch (InterruptedException e){// TODO Auto-generated catch block
			e.printStackTrace(); }
		
		try {
			 classPromoBody = driver.findElement(By.id("creditTooLowPromo")); 
			}
		
		catch (NoSuchElementException e) {
			x--;
			//System.out.println("Opps:  problem.....");
			//e.printStackTrace();
			//System.out.println("Did Not Find the ID creditToLowPromo  ");
			//System.out.println("Not exiting, but closing the browser and continuing the loop");
			driver.close();
			continue; //System.exit(0);
		}
		
		//System.out.println("Past the call");
		localStrVar = classPromoBody.getAttribute("class");
		//System.out.println("value for name attribute = "+classPromoBody.getAttribute("class"));
		//System.out.println("value for name attribute = "+localStrVar);
		
		if (localStrVar.equals("Credit640 gradientPageSection")) {
			ccomCount++;
			System.out.println("Test " +x +" Credit.com " +ccomCount);
			//System.out.println("Credit.com "+ccomCount);
		}
		
		if (localStrVar.equals("AmOne gradientPageSection")) {
			amOneCount++;
			System.out.println("Test " +x +" AmOne " +amOneCount);
			//System.out.println("AmOne "+amOneCount);
		}
	
			
		try { Thread.sleep(600L);} 
		catch (InterruptedException e){// TODO Auto-generated catch block
			e.printStackTrace(); }
		
		driver.close();
		
		 }  //EndForLoop
		System.out.println("Run Finished.");
		System.out.println("AmOne Count " +amOneCount);
		System.out.println("cCom Count " +ccomCount);
	}

}

/*
* Stuff that I've pulled in order to test other detection methods
**
**	    //if (driver.getPageSource().contains("We've partnered with AmOne to provide you with additional loan options.")) {
**		if (driver.getPageSource().contains("partnered with AmOne")) {
			amOneCount++;
			System.out.println("Test " +x +" AmOne " +amOneCount);
		}
		
		//if (driver.getPageSource().contains("We've partnered with Credit.com to provide you with additional choices.")){
		if (driver.getPageSource().contains("partnered with Credit.com")){
			ccomCount++;
			System.out.println("Test " +x +" Credit.com " +ccomCount);
		}  
*
*
*
*





*/
