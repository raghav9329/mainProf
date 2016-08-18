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
	

   
	public int count(ListNode list){
		int x = 0;
	
		while (list != null){
			if (list.next == null)
				break;
			x++;
			list = list.next;
		}
		return x;
	}// end of count method
	
     public void insertDuplicates(ListNode list){
    	 int x = 4;
    	 int tempInt;
    	 int incrementation = 5;
    	 
    	 while (list != null ){
    		 tempInt = list.val;
    		 
    		if (tempInt == x){
    			 if (list.next == null ) break;
    		list.next.val = x;
    		x = x + incrementation;
    		}//endIf
    	list = list.next;	 
    	 }// endWhile
    	 
     }//end of method insertDuplicates
     
     public int countDupsTogether(ListNode head){
    	int count = 0;
    	ListNode myList = head;
    	
    	while (myList != null ){
    		if (myList.next == null) break;
    		if (myList.val == myList.next.val)
    			count++;
    		myList = myList.next;
    		
    	}// endWhile
    	
    	return count;
     }// end of method coundDuplicates
     
     
}// end of class
