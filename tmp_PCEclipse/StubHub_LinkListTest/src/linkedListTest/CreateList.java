package linkedListTest;

public class CreateList {

	/*	public static void main(String[] args) {
		// TODO Auto-generated method stub

		// Create a list node: by def this reps a list
		ListNode testList = new ListNode(1);
		
		ListNode myList = testList;
		
		// Let's put a little noise at the beginning of the list : )

		 12/22/15 Noise taken out 

		myList.next = new ListNode(1);
		myList = myList.next;
		myList.next = new ListNode(1);
		myList = myList.next;
		
		
		
		//ListNode tempNode;
		// insteresting test data
		// 3180 gives 3179 twice at the end and is not handled
		// 3190 did the same I keep getting dups at 9,9 19,19, 29,39,49, etc x start at 4 +=5
		//4190
		//int numOfElements = 4190 ;
		//int numOfElements = 190 ;
		//int numOfElements = 4190 ;
		//int numOfElements = 11 ;
		int numOfElements = 4 ;
	
		
*//***************************************************
 * REAL LATE IN THE GAME I FIGURED DIRECTLY BELOW THAT
 * <= WORKE BETTER THAN JUST < 
 * 
 ****************************************************//*
		for (int x = 2; x <= numOfElements ; x++){
			myList.next = new ListNode(x);
			myList = myList.next;
		}
		
	//RESET to Head
		myList = testList;	
		
		System.out.println("Let's print out the List");
		myList.print(myList);
			
		System.out.println();
		System.out.println("The number of list elements is: " +numOfElements);
			
		System.out.println();
		System.out.println("Now let's set some duplicates");
		
	//RESET to Head
		myList = testList;
		
		int x = 4;
		int tempInt;
		
			while (myList != null ){  // Set Duplicates
				tempInt = myList.val;
				if ( tempInt == x){
					if (myList.next == null) break;
					
					myList.next.val = x;
					
//					if (myList.next.next == null)
//						break;
//					myList.next.next.val = x;
//					
//					if (myList.next.next.next == null)
//						break;
//					myList.next.next.next.val = x;
					
					x = x +5;
					//x = x + 11;
				}
			myList = myList.next;
			} // end of set Duplicates
		
		//RESET to Head
			myList = testList;

			
        *//******************************************************************
         * Here is the print routine
         *//*			
		myList.print(myList);	
			
			
		myList = testList;
		CountListDups myCount = new CountListDups();
		System.out.println();
		System.out.println("Number of duplicates is "	+myCount.evaluateList(myList));	
		
		System.out.println();
		System.out.println("creating Solution Variable");	
		Solution mySolution = new Solution();
		
		System.out.println("Calling solution on testLIst");
		myList = testList;

*//***************************************************
* The following is the bread and butter ....
* Here is the call to removing duplicates		
*//*		
//		mySolution.deleteDuplicates(myList);
		
		System.out.print("Back from solution.deleteDups");
		System.out.println();
		
		myList = testList;
		myList.print(myList);
		
		myList = testList;	
		System.out.println();
		System.out.println("Number of duplicates is "	+myCount.evaluateList(myList));
		
		Reverse_A_List reverseList = new Reverse_A_List();
		reverseList.reverseTheList(myList);
			
	}// end of Main


}// end of Class

*/

/*****************************************************
 * Former version of the main code 12/28/15
 * 
 */


	public static void main(String[] args) {
		// TODO Auto-generated method stub

		// Create a list node: by def this reps a list
		ListNode testList = new ListNode(1);
		
		ListNode myList = testList;
		

/***************************************************
 *     Put duplicate 1s at the beginning of the list
		myList.next = new ListNode(1);
		myList = myList.next;
		myList.next = new ListNode(1);
		myList = myList.next;
		
*/		
		
		//ListNode tempNode;
		// insteresting test data
		// 3180 gives 3179 twice at the end and is not handled
		// 3190 did the same I keep getting dups at 9,9 19,19, 29,39,49, etc x start at 4 +=5
		//4190
		//int numOfElements = 4190 ;
		//int numOfElements = 4190 ;
		int numOfElements = 4190 ;
		//int numOfElements = 11 ;
		
		for (int x = 2; x < numOfElements ; x++){
			myList.next = new ListNode(x);
			myList = myList.next;
		}
		
	//RESET to Head
		myList = testList;	
		
		System.out.println("Let's print out the List");
		myList.print(myList);
/*		System.out.print("Head:");
		
		
			while (myList != null ){
			System.out.print("->"+myList.val);
			if ( myList.next == null )
					break;
			myList = myList.next;
			}
*/
			
		System.out.println();
		System.out.println("The number of list elements is: " +numOfElements);
			
		System.out.println();
		System.out.println("Now let's set some duplicates");
		
	//RESET to Head
		myList = testList;
		
		int x = 4;
		int tempInt;
		
			while (myList != null ){  // Set Duplicates
				tempInt = myList.val;
				if ( tempInt == x){
					if (myList.next == null) break;
					
					myList.next.val = x;
					
//					if (myList.next.next == null)
//						break;
//					myList.next.next.val = x;
//					
//					if (myList.next.next.next == null)
//						break;
//					myList.next.next.next.val = x;
					
					x = x +5;
					//x = x + 11;
				}
			myList = myList.next;
			} // end of set Duplicates
		
		//RESET to Head
			myList = testList;

			
        /******************************************************************
         * Here is the replacement call for the output while loop below 
         */			
		myList.print(myList);	
			
		/*	System.out.print("Head:");
			while (myList != null ){
				System.out.print("->" +myList.val);
				if (myList.next == null) 
					break; 
				myList = myList.next;
			}	
		 */
			
		myList = testList;
		CountListDups myCount = new CountListDups();
		System.out.println();
		System.out.println("Number of duplicates is "	+myCount.evaluateList(myList));	
		
		System.out.println();
		System.out.println("creating Solution Variable");	
		Solution mySolution = new Solution();
		
		System.out.println("Calling solution on testLIst");
		myList = testList;
		
		mySolution.deleteDuplicates(myList);
		
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
		System.out.println("Number of duplicates is "	+myCount.evaluateList(myList));
		
		//Reverse_A_List reverseList = new Reverse_A_List();
		//reverseList.reverseTheList(myList);
			
	}// end of Main


}// end of Class



