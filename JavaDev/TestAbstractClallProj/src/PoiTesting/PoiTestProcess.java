package PoiTesting;
import PoiTesting.AbstractTestSetup;

public class PoiTestProcess extends AbstractTestSetup {
	
	public static void main(String[] args) throws Exception{
		System.out.println("Before a new PotTestProes -> calling the abstract class...");
		PoiTestProcess myTest = new PoiTestProcess();
		myTest.executeTest();
		System.out.println("all's well..Seems like we're done......");
	}
	
	public void executeTest() throws Exception {
		System.out.println("From within main.myTest.executeTest() ");
		// the followign is a trial init case 
		getCell(0,0); // get Cell A1 zeroth col, zeroth row
		
		traverseDownThroughTheTable();
		
	}// end of executeTest()
	
	// something here in support of executeTest()
	// for this application represented by this file
	// This method is where most of the work is done
	// but one qustion arizes.  why abstractinto this method
	// when it could be done in exectueTest ????
	public void traverseDownThroughTheTable(){
		// get the count in A1
		//for x
		
	}// end of traverseDownThroughTheTable
	
	
	
}
