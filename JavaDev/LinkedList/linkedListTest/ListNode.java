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
}// end of class
