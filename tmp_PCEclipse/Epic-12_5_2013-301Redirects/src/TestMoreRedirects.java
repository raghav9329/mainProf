import junit.framework.Assert;

import org.openqa.selenium.firefox.FirefoxDriver;


public class TestMoreRedirects {
	// Chomre - ChromeDriver - stable
	// Firefox - FirefoxDriver - stable
	// IE - InternetExplorerDriver - stable
	// Safari SafariDriver at time was unstable
	// Opera OperaDriver - implemented by OperaBroweserPeople
	public static void main(String[] args) {
		// TODO Auto-generated method stub
		
		FirefoxDriver d1 = new FirefoxDriver();
		System.out.println("got driver Reference");
		String sourceURL = "https://qa6.sf.credit.com/credit-cards/green-dot/";
		String destURL ="";
		System.out.println("Set Source and Destination URLs");
		
		//d1.get("https://qa6.sf.credit.com/credit-cards/green-dot/");
		d1.get(sourceURL);
		
		System.out.println("Get on Source URL called");
		
		try {
			System.out.println("sleep for a 1 second");
			Thread.sleep(1000L);
		} catch (InterruptedException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		destURL = d1.getCurrentUrl();
		System.out.println("Dest URL evaluated");
		
		System.out.println("The source to be redirected is");
		System.out.println(sourceURL);
		
		System.out.println("It should have gone to :  credit-cards/Green-Dot/");
		System.out.println("curiously:......The destination URL...");
		System.out.println(destURL);
		
		System.out.println("*************************");
		System.out.println("let us try another");
		System.out.println("*************************");
		
		
		sourceURL = "https://qa6.sf.credit.com/calculators/calc_help/hlp_insurlife.jsp ";
		destURL ="";
		
		//d1.get("https://qa6.sf.credit.com/credit-cards/green-dot/");
		d1.get(sourceURL);
		
		try {
			Thread.sleep(3000L);
		} catch (InterruptedException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		destURL = d1.getCurrentUrl();
	
		Assert.assertTrue("error Message", 3<5);
		
		System.out.println("The source to be redirected is");
		System.out.println(sourceURL);
		
		System.out.println("It should have gone to :  https://qa6.sf.credit.com/calculators");
		System.out.println("curiously:......The destination URL...");
		System.out.println(destURL);

	}

}
