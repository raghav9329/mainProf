package day2;

import org.openqa.selenium.firefox.FirefoxDriver;

public class TestSelenium {

	public static void main(String[] args) {

// the following provices objext references that will
		// allow accessing and using the objecs
	FirefoxDriver d1 = new FirefoxDriver();
		FirefoxDriver d2 = new FirefoxDriver();
//		FirefoxDriver d3 = new FirefoxDriver();
		
		
		//w/out object references I can open the windows but DO NOTHIN with them
		// no references to the objets !!
//		new FirefoxDriver();
//		 new FirefoxDriver();
//		 new FirefoxDriver();
		
		
		
		d1.get("file://C:/Program Files (x86)/Java/jdk1.7.0_25/README.html ");
		
		d1.quit();
		d2.quit();
	}

}
