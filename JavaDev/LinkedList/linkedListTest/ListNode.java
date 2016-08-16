package linkedListTest;

public class ListNode {
	int val;
	ListNode next;

    // Constructor
	ListNode(int x){ 
		val = x; 
	}

     
	public void print(ListNode list){
		System.out.print("Head:");
		while (list != null ){
			System.out.print("->" +list.val);
			if (list.next == null) 
				break;
			list = list.next;
		}

	}// end print(list );
	
/*************************
 *  undefined method
 *  public integer nodeCount ( listNode list)   is this returning an object or a simple num.
 */
     
     
}// end of class
