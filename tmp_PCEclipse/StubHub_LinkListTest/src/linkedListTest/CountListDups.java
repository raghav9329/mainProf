package linkedListTest;

public class CountListDups {
	public int evaluateList(ListNode head){
		ListNode myList = head;
		int count = 0;

		while (myList != null ){
		//System.out.print("->"+myList.val);
			if ( myList.next == null )
				break;
			if (myList.val == myList.next.val) // Dupes together in the list
				count = count + 1;
			//System.out.println("myList Val " +myList.val);
			myList = myList.next;
		}
//		System.out.println();
//		System.out.println("count is: " +count);
		
		return count;
	}
}
