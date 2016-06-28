package TestCases;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collection;

public class Test {

	public static void main(String[] args) {


		Collection a = new ArrayList();
		//This was an example of an interface Collection
		// and the child class ArrayList that  implements the interface
		
		Object [][] data = new Object[2][3];
		
	data [0][0]="testUser1";
	data [0][1]="pass1";
	data [0][2]= 7898;
	
	data [1][0]="testUser2";
	data [1][1]="pass2";
	data [1][2]= 4398;	
		
	Arrays.asList(data)	;
	}

}
