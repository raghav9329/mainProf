package linkedListTest;

public class CreateList {

	public static void main(String[] args) {

/********************************************************
 *  Create a list node: by def this represents a list
 *  Capture a pointer to the beginning of the list 
 *  in testList. then use myList and be able to reset
 *  back to the beginning any time with myList = testList
 */

		ListNode testList = new ListNode(1);
		
		ListNode myList = testList;

/**********************************************************
 *  In order to add two duplicate entries at the beginning
 *  of the list, execute this code 
		
		myList.next = new ListNode(1);
		myList = myList.next;
		myList.next = new ListNode(1);
		myList = myList.next;

* Remember if this code is uncommented and puts the first
* two valuea in the list you must make the main population
* loop execute from x==2 to numOfElements
* otherwise x = 0 to numOfElements
********************************************************* */
		
		
		//ListNode tempNode;
		// insteresting test data
		// 3180 gives 3179 twice at the end and is not handled
		// 3190 did the same I keep getting dups at 9,9 19,19, 29,39,49, etc x start at 4 +=5
		//int numOfElements = 4190 ;
		//int numOfElements = 4190 ;
		int numOfElements = 4190 ;
		//int numOfElements = 11 ;
		
/**********************************************
 * For Loop Simple Populate with value of X
 * Could / should be class method
 */
		for (int x = 0; x < numOfElements ; x++){
			myList.next = new ListNode(x);
			myList = myList.next;
		}// we're done.  we made a long list
		
/**********************************************	
 *     RESET my pointer to Head
 */
		myList = testList;	
		
		System.out.println("Let's print out the List");
		myList.print(myList);
		
			
		System.out.println();
      //System.out.println("The number of list elements is: " +numOfElements);
		System.out.println("The number of list elements is: " +myList.count(myList));
			
		System.out.println();
		System.out.println("Now let's set some duplicates");
		
	//RESET to Head
		myList = testList;
		myList.insertDuplicates(myList);
		
	
		//RESET to Head
			myList = testList;

/**********************************
 * Display the contents of the list
 * It knows how
 * 	
 */
		myList.print(myList);	
		
		
		myList = testList;
		//CountListDups myCount = new CountListDups();
		System.out.println();
		//System.out.println("Number of duplicates is "	+myCount.evaluateList(myList));	
		System.out.println("Number of duplicates is "	+ myList.countDupsTogether(myList));	
		
		System.out.println();
		System.out.println("creating Solution Variable");	
//		Solution mySolution = new Solution();
		
		System.out.println("Calling solution on testLIst");
		myList = testList;
		
//		mySolution.deleteDuplicates(myList);
		myList.removeDupsTogether(myList);
		
		System.out.print("Back from solution.deleteDups");
		System.out.println();
		
		myList = testList;
		myList.print(myList);
/*		System.out.print("head:");
		while (myList != null ){
			System.out.print("->" +myList.val );
			myList = myList.next;
		}
*/
		
		myList = testList;	
		System.out.println();
		//System.out.println("Number of duplicates is "	+myCount.evaluateList(myList));
		System.out.println("Number of duplicates is "	+ myList.countDupsTogether(myList));	

		//Reverse_A_List reverseList = new Reverse_A_List();
		//reverseList.reverseTheList(myList);
		
		System.out.println("Main_end");
			
	}// end of Main


}// end of Class

// Pulled from the main and re factored in ListNode as a class Method

/*		int x = 4;
int tempInt;

	while (myList != null ){  // Set Duplicates
		tempInt = myList.val;
		if ( tempInt == x){
			if (myList.next == null) break;
			
			myList.next.val = x;
			
//			if (myList.next.next == null)
//				break;
//			myList.next.next.val = x;
//			
//			if (myList.next.next.next == null)
//				break;
//			myList.next.next.next.val = x;
			
			x = x +5;
			//x = x + 11;
		}
	myList = myList.next;
	} // end of set Duplicates
*/	


//public static void main(String[] args) {
//// Create a list node: by definition this represents a list
//	ListNode testList = new ListNode(1);
//	
//	ListNode myList = testList;
//	
//
///*****************************************
//*      code taken out for some reasonable reason
//*      
//	myList.next = new ListNode(1);
//	myList = myList.next;
//	myList.next = new ListNode(1);
//	myList = myList.next;
//	
//*/		
//
///**********************
//*       A set of variables for examining different size list to be created
//*/
//	//ListNode tempNode;
//	// insteresting test data
//	// 3180 gives 3179 twice at the end and is not handled
//	// 3190 did the same I keep getting dups at 9,9 19,19, 29,39,49, etc x start at 4 +=5
//	//4190
//	//int numOfElements = 4190 ;
//	//int numOfElements = 190 ;
//	//int numOfElements = 4190 ;
//	//int numOfElements = 11 ;
//	int numOfElements = 4 ;
//
//	
///***************************************************
//* REAL LATE IN THE GAME I FIGURED DIRECTLY BELOW THAT
//* <= WORKE BETTER THAN JUST < 
//* [ even Later:  WHY is the statement above true ?
//* 
//****************************************************/
//	for (int x = 2; x <= numOfElements ; x++){
//		myList.next = new ListNode(x);
//		myList = myList.next;
//	}
//	
////RESET to Head
//	myList = testList;	
//	
//	System.out.println("Let's print out the List");
//	myList.print(myList);
//		
//	System.out.println();
//	System.out.println("The number of list elements is: " +numOfElements);
//		
//	System.out.println();
//	System.out.println("Now let's set some duplicates");
//	
////RESET to Head
//	myList = testList;
//	
//	int x = 4;
//	int tempInt;
//	
//		while (myList != null ){  // Set Duplicates
//			tempInt = myList.val;
//			if ( tempInt == x){
//				if (myList.next == null) break;
//				
//				myList.next.val = x;
//				
////				if (myList.next.next == null)
////					break;
////				myList.next.next.val = x;
////				
////				if (myList.next.next.next == null)
////					break;
////				myList.next.next.next.val = x;
//				
//				x = x +5;
//				//x = x + 11;
//			}
//		myList = myList.next;
//		} // end of set Duplicates
//	
//	//RESET to Head
//		myList = testList;
//
//		
// /******************************************************************
//  * Here is the output printing routines
//  */			
//	myList.print(myList);	
//		
//		
//	myList = testList;
//	CountListDups myCount = new CountListDups();
//	System.out.println();
//	System.out.println("Number of duplicates is "	+myCount.evaluateList(myList));	
//	
//	System.out.println();
//	System.out.println("creating Solution Variable");	
//	Solution mySolution = new Solution();
//	
//	System.out.println("Calling solution on testLIst");
//	myList = testList;
//
///***************************************************
//* The following is the bread and butter ....
//* Here is the call to removing duplicates		
//*/		
////	mySolution.deleteDuplicates(myList);
//	
//	System.out.print("Back from solution.deleteDups");
//	System.out.println();
//	
//	myList = testList;
//	myList.print(myList);
//	
//	myList = testList;	
//	System.out.println();
//	System.out.println("Number of duplicates is "	+myCount.evaluateList(myList));
//	
//	Reverse_A_List reverseList = new Reverse_A_List();
//	reverseList.reverseTheList(myList);
//		
//}// end of Main
//}// end of Class

