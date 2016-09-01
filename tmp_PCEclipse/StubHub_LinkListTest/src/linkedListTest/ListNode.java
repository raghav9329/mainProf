package linkedListTest;

public class ListNode {
	int val;
	ListNode next;

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

	}
     
     
}
