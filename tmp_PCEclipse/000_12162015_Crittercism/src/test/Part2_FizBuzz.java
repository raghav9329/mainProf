/*
 * Mark Atkinson
 * atkinson_mark@yahoo.com
 * 707 953 2210
 */
package test;



public class Part2_FizBuzz {

	
	public void fizbuzz(int n){
		if ( (n % 3 == 0 ) &&(n%5 == 0)  )
			System.out.println("FizBuzz");
		else if (n % 5 == 0 )
			System.out.println("Buzz");
		else if (n % 3 == 0)
			System.out.println("Fiz");
		else
			System.out.println(n);
	}
	
	public static void main(String[] args) {
		Part2_FizBuzz myFB = new Part2_FizBuzz();
		
		for (int x = 1; x<=34 ; x++)
			myFB.fizbuzz(x);
		
		// TODO Auto-generated method stub

	}

}
