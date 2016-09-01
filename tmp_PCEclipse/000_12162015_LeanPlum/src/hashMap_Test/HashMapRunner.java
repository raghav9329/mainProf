/*
 * Mark Atkinson
 * atkinson_mark@yahoo.com
 * 12/17/2015   
 * 
 */

package hashMap_Test;

import java.util.Iterator;
import java.util.Set;
import java.util.Map;

public class HashMapRunner {

	public static void outputSpace(int numOfLines){
		for (int x=0 ; x<numOfLines; x++) System.out.println("");		
	}
	
	public static void displayMap(MyHashMap myMap){
		Set set = myMap.entrySet();
	/*	System.out.println("Debug: get set size " +set.size()); */
		outputSpace(1);
		Iterator iterator = set.iterator();
		while (iterator.hasNext()){
			Map.Entry mentry = (Map.Entry)iterator.next();
			System.out.print("key is: "+ mentry.getKey() + " & Value is: ");
	        System.out.println(mentry.getValue());
		}//end while
		outputSpace(1);
	}// end displayMap
	
	public static void main(String[] args) {

		int initialHashMapSize = 12;
		MyHashMap myHM = new MyHashMap(initialHashMapSize);
		
		System.out.println("Putting in 3 elements for Initial Test ");
		myHM.put("Zara", new Double (3434.34));
		myHM.put("Mahnaz", new Double(123.22));
		myHM.put("Ayan", new Double(1378.00));
		
		//myHM.foreach( (String,Double ) -> System.out.println("key: " +k +" value: " +v ));
		
		displayMap(myHM);		
		
	/*  System.out.println(myHM.size()); */
		outputSpace(1);
		System.out.println("HM mySize = " +myHM.mySize()); 
		outputSpace(1);
		
		String hmKey = "Alberto";
		Double hmVal = 11.11 ;
	
		if (!( myHM.set(hmKey, hmVal )) ) {
			System.out.println("Exiting with Problem: Key:" +hmKey +" Value:" +hmVal);
			System.exit(0);
		}
		
     /* hmKey = "Alberto  ";  // same value will show over write nature of the HM.Put() method */
		hmVal = 121.121 ;   // new value showing the overwrite
		
		if (!( myHM.set(hmKey, hmVal )) ) {
			System.out.println("Exiting with Problem: Key:" +hmKey +" Value:" +hmVal);
			System.exit(0);
		}
		
		String nullTestKey = "Null_Test";  // same value will show over write nature of the HM.Put() method
		hmVal = null ;   // null value
		
		if (!( myHM.set(nullTestKey, hmVal )) ) {
			System.out.println("Exiting with Problem: Key:" +nullTestKey +" Value:" +hmVal);
			System.out.println("Exiting system: System.exit(0)");
			System.exit(0);
		}
		outputSpace(1);
		displayMap(myHM);
		System.out.println("HM mySize = " +myHM.mySize()); 
		outputSpace(1);
		System.out.println("Testing myGet with current Keys");
		System.out.println("Alberto = " +myHM.myGet("Alberto")  );
		System.out.println("Mahnaz = " +myHM.myGet("Mahnaz")  );
		System.out.println(" ");
		System.out.println("Testing myGet with a Valid Key but a known Null Value");
		System.out.println(" ");
		System.out.println("myGet with a nullTestKey variable returns " +myHM.myGet(nullTestKey)  );
		System.out.println("After getting a null back from a vaild key, test other current keys.");
		System.out.println("Ayan = " +myHM.myGet("Ayan")  );
		System.out.println("Zara = " +myHM.myGet("Zara")  );
		System.out.println("Now Test a Key that has not be added to the map..");
		System.out.println("Andrew = " +myHM.myGet("Andrew")  );
		
		outputSpace(1);
		System.out.println("And now to use the delete key method ");
		String strAyan = "Ayan";		
		if (myHM.myDelete(strAyan)) {
			System.out.println(strAyan +" was found and removed");
			System.out.println("Checking with myHM.myGet(" +strAyan +") = " +myHM.myGet(strAyan));
		}else{
			System.out.println(strAyan +" was not found in myDelete() method");
		}

		System.out.println("Re-running agains the same key should return Null and not report: Found & Removed");

		if (myHM.myDelete(strAyan)) {
			System.out.println(strAyan +" was found and removed");
			System.out.println("Checking with myHM.myGet(" +strAyan +") = " +myHM.myGet(strAyan));
		}else{
			System.out.println(strAyan +" was not found in myDelete() method");
		}	
		
		displayMap(myHM);
		
		System.out.println("HM mySize = " +myHM.mySize());
		outputSpace(1);
		System.out.println("Lastly let's look a the myLoad method");
		System.out.println("myLoad returns" );
		System.out.println(myHM.myLoad());
		outputSpace(1);
		System.out.println("Comment:  I know this load value is not correct");
		System.out.println("It shoujld be 0.75 because that is the default value ");
		System.out.println("Java does not give access to the size of the unterlying array");
		System.out.println("The call to HM.size only returns a count of the items actually entered into the map.");
	}// End Main`


	

	
}// end HashMapProblemRunner
