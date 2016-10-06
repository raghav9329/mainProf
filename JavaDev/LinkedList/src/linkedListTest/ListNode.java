package linkedListTest;

public class ListNode {
	int val;
	ListNode next;

    // Constructors

	/******************************************* 
	 * one to account for starting out 
	 * All nodes do in fact have a value so
	 * it looks like this constructor is where we
	 * set the first value  */
	
	ListNode() {
		val = 0;
	}

	
	/*******************************************
     * All following calls to new ListNode 
     * obligate assigning a value to the node */

	ListNode(int x){ 
		val = x; 
	}
	
	
     
//	public void print(ListNode list){
	public void print(){
		ListNode list = this;
		System.out.print("Head:");
		while (list != null ){
			System.out.print("->" +list.val);
			if (list.next == null) 
				break;
			list = list.next;
		}

	}// end print(list );
	
	public int size(){
/*		int theSize = 0;
		ListNode list = this;
		
		while (list != null ){
			theSize ++;
			if (list.next == null)
				break;
			//theSize ++;
			list = list.next;
		}*/
		//return theSize;
		return this.count(this);
//  this line above is crap
// but it was a test ta I actually 
// understood something.
// really I need to refactor count 
// to use *this*
	}
	
	
	
   
	public int count(ListNode list){
		int x = 0;
	
		while (list != null){
			x++;
			if (list.next == null)
				break;
			//x++;
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
    
     
     
     
//   public int countDupsTogether(ListNode head){
     public int countDupsTogether(){
    	int count = 0;
    	ListNode myList = this;
    	
    	while (myList != null ){
    		if (myList.next == null) break;
    		if (myList.val == myList.next.val)
    			count++;
    		myList = myList.next;
    		
    	}// endWhile
    	
    	return count;
     }// end of method coundDuplicates
     
//   public ListNode removeDupsTogether(ListNode head){
     public void removeDupsTogether(){  // THIS IS THE SOLUTION
    	 ListNode myList = this; 
    	 
 		while (myList != null) { // List evaluation
			// Following If statement because you can't do  if (x AND Y ) with primitives
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
			}// end of not duplicat
		
 		} //endWhile	
			
 	//	return head;
     }// end method removeDupsTogether
     
     
}// end of class
