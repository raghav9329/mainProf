package testcases;

import org.junit.Ignore;
import org.junit.Test;

public class FirstTestCase_1 {
	// Dont Need public stat void main
	// Because this is a Test we use the @Test
	
	@Test
	public void loginTest(){  //  good practice to use "Test" in method names
		// Selenium code.......
		
		System.out.println("First --  Login Test an application :  Could be opening the URL");
		}
//@Ignore 
	@Test
	public void registerTest(){
		System.out.println("Second -- Resistering a user");
	}
	
	@Test
	public void databaseTest(){ // Not using 'test' in the method name ???
		System.out.println("Third --  Testing the Db");
		
		
		
		
	}
}
