package Test;

import java.util.Calendar;

public class mainrun{

	public static void main(String[] args) {
		Calendar calendar = Calendar.getInstance();
		int howManyPrimes = 0;

		// 2) get a java.util.Date from the calendar instance.
		//		    this date will represent the current instant, or "now".
		java.util.Date startTime = calendar.getTime();	
	
		int myLoopCount = 6875000;
		
		for (int testVal = 1 ; testVal < myLoopCount; testVal ++)	{
	    	
	   /* System.out.print("Is " + testVal + " prime ? ");	 */
	    if (isPrime(testVal) ){
	    	//System.out.println(testVal);
/*	    	System.out.println("Yes"); */
	    	howManyPrimes += 1;
	    }
	   /* else
	    	System.out.println("No "); */

	    }
		java.util.Date endTime = calendar.getTime();
		
		System.out.println("Started at: " +startTime);
		System.out.println("Finished at: " +endTime);
		System.out.println("The number of iterations: "+myLoopCount);
		System.out.println("Number of primes: " +howManyPrimes);
	}
	
	
	
	
	public static boolean isPrime(int n){
		if (n < 2 ){
			return false;
		}
		
		for ( int i = 2; i <= Math.sqrt(n) ; i++ ) {
			if (n % i == 0){
				return false;
			}
		}
	return true;
	}
}
