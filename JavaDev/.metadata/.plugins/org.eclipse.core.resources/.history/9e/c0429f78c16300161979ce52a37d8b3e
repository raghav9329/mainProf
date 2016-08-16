package linkedListTest;

public class Solution {
	public ListNode deleteDuplicates(ListNode head){
		//System.out.println("Starting deleteDups");

		ListNode myList = head;
		
		while (myList != null) { // List evaluation
			// Following If  because you cant do  if (x AND Y ) with primitives
			if (myList.next == null)
				break;
			
			// Handle duplicates at the very end
			if (myList.val == myList.next.val){ // Dupes together in the list
				if(myList.next.next == null){ // Are dupes together AT END of LIST !?
					myList.next = null; // Just drop the last one !
				}else{ 
					// else handle the general condition and skip over the dupe
					myList.next = myList.next.next; 
				}
			} else { // Items were not dupes together so just move to next
				/* System.out.println("second else " +myList.val);*/
				if (myList.next == null) break; // check to see are we at the end of the list 
				
				myList = myList.next;
			}// end of not dupliate
		}// end of list evaluation

	return head;
	}

}


// ***********************************************************
// Following is archival material for review 
// Don't changes what's below....

//package linkedListTest;
//
//public class Solution {
//	public ListNode deleteDuplicates(ListNode head){
//		System.out.println("Starting deleteDups");
//
//		
//		ListNode myList = head;
//		ListNode tempNode;
//	
//		
//		while (myList != null) {
//			if (myList.next == null)
//				break;
//			// Handle duplicates at the very end
//			if (myList.val == myList.next.val){
//				if(myList.next.next == null){
//					myList.next = null;
//				}
//				
//				//System.out.println("Inside, myList.val = "+myList.val +" myList.next.val = " +myList.next.val);
//				
//				//tempNode = myList.next.next;
//				//if (tempNode == null)
//				
//				
////				//*********************
////				if(myList.next.next == null)
////					break;
////				//*********************
//				
//				//myList.next = tempNode;
//				
//			else {
//				myList.next = myList.next.next;
//				}
//				//System.out.println("after the fix...");
//				//System.out.println("Inside, myList.val = "+myList.val +" myList.next.val = " +myList.next.val);
//			
//				//System.out.println("Having Skipped over a node.....");
//				//if ( myList == null)
//				//	break;
//				//System.out.println("myList.val = "+myList.val +" myList.next.val = " +myList.next.val);
//			}
//			
//			else {
//				if (myList.next == null)
//					break;
//				myList = myList.next;
//			}
//	
//		}
//
//		myList = head;
////		System.out.println("now we try to view a non dup list");
////		while (myList != null ){
////			System.out.print(myList.val +"->");
////			myList = myList.next;
////		}
//		
//		System.out.println();
//		return head;
//	}
//
//}

