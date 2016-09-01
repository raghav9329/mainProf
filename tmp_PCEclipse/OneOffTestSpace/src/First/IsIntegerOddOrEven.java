// How to tell if a number is odd or even without mod or div
// iterate from max to >= 2, then subtract 2 
// You are now zero even or 1 odd
// Max Int 2billion something takes half second
// 2K takes 1 milisecond aprox
package First;

import java.text.SimpleDateFormat;
import java.util.Date;

public class IsIntegerOddOrEven {

	//Date date = new Date();
	static SimpleDateFormat formatter = new SimpleDateFormat("MM-dd-yyyy'@'HH-mm-ss.SSS");
	static Date myDate = new Date();
	static String myDateString = formatter.format(myDate);
	
	public static void main(String[] args) {
		System.out.println(myDateString);
		int num=2147;//479999;
		int result=num;
		
		while(result>=2){
		result=result-2;
		}
		if(result==1){
		System.out.println("The number " +num +" is odd");
		}else{
			System.out.println("The number " +num +" is even");
		}
		
		SimpleDateFormat formatter2 = new SimpleDateFormat("MM-dd-yyyy'@'HH-mm-ss.SSS");
		Date anotherDate = new Date();
		String anotherDateStr = formatter2.format(anotherDate); 	
		System.out.println(anotherDateStr);
		
/*		  Date d =new Date();
		    System.out.println(new SimpleDateFormat("yyyy-MM-dd HH:mm:ss.S").format(d));
		    System.out.println(new SimpleDateFormat("yyyy-MM-dd HH:mm:ss.SS").format(d));
		    System.out.println(new SimpleDateFormat("yyyy-MM-dd HH:mm:ss.SSS").format(d));
		    System.out.println(new SimpleDateFormat("yyyy-MM-dd HH:mm:ss.SSSS").format(d));
		    System.out.println(new SimpleDateFormat("yyyy-MM-dd HH:mm:ss.SSSSS").format(d));
		    System.out.println(new SimpleDateFormat("yyyy-MM-dd HH:mm:ss.SSSSSS").format(d));*/
		    
	///  The last set of lines represents that adding Ss to the time format only pads with leading zeros
		    
		    
		    
		    

	}

}
