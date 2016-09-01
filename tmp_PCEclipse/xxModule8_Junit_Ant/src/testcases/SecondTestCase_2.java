package testcases;

import org.junit.After;
import org.junit.AfterClass;
import org.junit.Before;
import org.junit.BeforeClass;
import org.junit.Test;

public class SecondTestCase_2 { // 12/11/13 Video up to time 24:54
	
	@BeforeClass  // This will only be run once
	public static void beginning(){
		System.out.println("**************Beginning*****************");
	}
	
	@AfterClass  // This will only be run once
	public static void ending(){
		System.out.println("**************Ending*****************");
	}
	
	@Before // will be called every time for every test
	public void openBrowser(){
		System.out.println("Setup all the POI stuff");
		System.out.println("open browser");
		
	}
	
	@After  // will be called every time for every test
	public void closeBrowser(){
		System.out.println("close browser");
		
	}
	
	
	@Test
	public void sendEmailTest(){
		System.out.println("First Test: Sending Email");
		
		System.out.println("Test a for loop continually going to the file for the next");
	}
	
	@Test
	public void sendMessageTest(){
		System.out.println("Second Test: Sending a Message(txt msg)");
		
	}

}
