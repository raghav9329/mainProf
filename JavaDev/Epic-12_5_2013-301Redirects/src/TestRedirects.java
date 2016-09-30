import org.openqa.selenium.firefox.FirefoxDriver;


public class TestRedirects {
	// Chomre - ChromeDriver - stable
	// Firefox - FirefoxDriver - stable
	// IE - InternetExplorerDriver - stable
	// Safari SafariDriver at time was unstable
	// Opera OperaDriver - implemented by OperaBroweserPeople
	public static void main(String[] args) {
		// TODO Auto-generated method stub
		
		FirefoxDriver d1 = new FirefoxDriver();
		
		String sourceURL = "https://qa6.sf.credit.com/credit-cards/green-dot/";
		String destURL ="";
		
		//d1.get("https://qa6.sf.credit.com/credit-cards/green-dot/");
		d1.get(sourceURL);
		
		try {
			Thread.sleep(3000L);
		} catch (InterruptedException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		destURL = d1.getCurrentUrl();
		
		System.out.println("The source to be redirected is");
		System.out.println(sourceURL);
		
		System.out.println("It should have gone to :  credit-cards/Green-Dot/");
		System.out.println("curiously:......The destination URL...");
		System.out.println(destURL);
		/*
		d1.quit();
		System.out.println("Gmail: Closed");
		System.out.println("starting to colse CNN");
		d2.quit();
		System.out.println("CNN: Closed");
		*/
		
		
		
		// Quit completely ends the session
		// d1.close(); does not completely end the session
		
		//d1.quit();
		

	}

}
