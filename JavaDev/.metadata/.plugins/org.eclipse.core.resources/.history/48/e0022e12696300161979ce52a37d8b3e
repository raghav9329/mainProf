package linkedListTest;

public class Reverse_A_List {
	
	public ListNode reverseTheList(ListNode head) {
		ListNode myList = head;
		ListNode innerList = myList;
		ListNode temp = new ListNode(0);
		temp.next = null;
		ListNode tempReset = temp; 
		
		while (myList != null){
			
			while (innerList.next.next != null)   // Go to the end of the list to get a node	
				innerList = innerList.next;
			
			temp.val = innerList.next.val;
			
			if (innerList == null)
					break;
			else{
				temp.next = new ListNode(0);
				temp = temp.next;
			}
			//myList = myList.next;
			//innerList = myList;
		}//end while myList != null
		

		System.out.println("Just  noOpp line for debug stop.");
		
		tempReset.print(tempReset);

		return temp;
	}

}


/*
 12/28/15
public ListNode reverseTheList(ListNode head) {
		ListNode myList = head;
		ListNode temp = new ListNode(0);
		temp.next = null;
		ListNode tempReset = temp; 
		
		while (myList != null){
			while (myList.next.next != null){
				myList = myList.next;
			}
			// go to end of tempList
			while ((temp.next != null) && ( myList != null)){
				temp.next = temp.next.next;   //  not as I had planned
			}	
			
			temp.val = myList.val;
			temp.next = new ListNode(0);
			myList.next = null;
			
			
			System.out.println(myList.val);
			System.out.println(myList.toString());
			System.out.println(temp.val);
		
			System.out.println(temp.toString());
			myList = head;
			temp = tempReset;
		
		}//end while myList != null
		
			System.out.println("Just  noOpp line for debug stop.");
		return temp;
	}
 
 *
  12/23/2015
  
	public ListNode reverseTheList(ListNode head) {
		ListNode myList = head;
		ListNode temp = new ListNode(0);
		temp.next = null;
		
		while (myList != null){
			while (myList.next.next != null){
				myList = myList.next;
			}
			temp = myList.next;
		
			//temp.val = myList.next.val;
			
			System.out.println(myList.val);
			myList.next = null;
			System.out.println(temp.toString());
			temp.next = new ListNode(0);
			temp = temp.next;
			myList = head;
		
		}//end while myList != null
		
			System.out.println("Just  noOpp line for debug stop.");
		return temp;
	}
  
12/22/2015 
public ListNode reverseTheList(ListNode head) {
		ListNode myList = head;
		ListNode temp = new ListNode(0);
		temp.next = null;
		
		while (myList != null){
		
			while (innerList.next != null){
		
				innerList=innerList.next;	
		
			}//end while myList != null
		
			temp.val = innerList.val;
		
			temp = innerList;
	
			innerList = null;
	}
		
		System.out.println("Just  noOpp line for debug stop.");
		return temp;
	}
*/