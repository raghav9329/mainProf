package TestCases;

import org.junit.After;
import org.junit.AfterClass;
import org.junit.Assume;
import org.junit.Before;
import org.junit.BeforeClass;
import org.junit.Test;

public class SecondTestCases {
	
	//browser open
	
	
	public static boolean checkLogin(){
		return true;
	}
	
	@BeforeClass
	public static void beginning(){
		
		System.out.println("*******BeforClass -- Begining****************");
		//Assume.assumeTrue(checkLogin());// this will halt all junit tetsing if false
	}

	
	@AfterClass
	public static void ending(){
		
		System.out.println("*******AfterClass -- Ending*************");
	}
	
	@After
	public void closeBrowser(){
		
	System.out.println("Closing the browser");	
	}
	@Before
	public void openBrowser(){
		System.out.println("opening the Browser");
		
	}
	
	@Test
	public void sendEmailTest(){
		System.out.println("Testing: Sending Email");
	}

	@Test
	public void sendMessageTest(){
		System.out.println("Testing: Sending Message");
	}
	

}
