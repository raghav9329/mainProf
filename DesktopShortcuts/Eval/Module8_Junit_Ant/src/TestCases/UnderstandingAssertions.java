package TestCases;

import static org.junit.Assert.*;



import junit.framework.Assert;

import org.junit.Rule;
import org.junit.Test;
import org.junit.rules.ErrorCollector;

public class UnderstandingAssertions {
	
	@Rule
	public ErrorCollector errCollector = new ErrorCollector();
	
	@Test
	public void frientListTest(){
		int actualTotalFriends=100;  //extracted with selenium
		int expectedTotalFriends=100 ;
		
/*		if (actualTotalFriends==expectedTotalFriends){
			System.out.println("Pass");
		}else{
			System.out.println("Fail");
			
		}*/
		System.out.println("A");
		try{
//		Assert.assertEquals(expectedTotalFriends, actualTotalFriends);
		assertEquals(expectedTotalFriends, actualTotalFriends);
		}catch(Throwable t){
		System.out.println("ERROR ENCOUNTERED");
		errCollector.addError(t);
		}
		System.out.println('B');
		
		
		try{
		//	Assert.assertEquals("A", "B");
			assertEquals("A", "B");
		}catch(Throwable t){
		System.out.println("ERROR ENCOUNTERED");
		errCollector.addError(t);
		}
		
		try{
		//	Assert.assertEquals("A", "A");
			assertEquals("A", "A");
		}catch(Throwable t){
		System.out.println("ERROR ENCOUNTERED");
		errCollector.addError(t);
		}
		
		//Assert.assertTrue("error messae", 4>3);
		assertTrue("error messae", 4>3);
		
	}
	
	
	

}
