package TestCases;

import java.util.Arrays;
import java.util.Collection;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.junit.runners.Parameterized;
import org.junit.runners.Parameterized.Parameters;

//step 1
@RunWith(Parameterized.class)
public class ParameterizedTestCase {
	// declacre the variables globally
//Step 2	
	public String username;
	public String password;
	public int pin;
// Step 3	
	// Constructor is necessary
	public ParameterizedTestCase(String Uid, String Pid, int pin) {
		this.username=Uid;
		this.password=Pid;
		this.pin=pin;
	}
	
//Step 4
	
	@Parameters
	public static Collection<Object[]> getData(){
		// collection will an array of objects
		// num of rows == times to excute test
		// num of cols == num of parameters to pass
		Object [][] data = new Object[2][3];
		
	data [0][0]="testUser1";
	data [0][1]="pass1";
	data [0][2]= 7898;
	
	data [1][0]="testUser2";
	data [1][1]="pass2";
	data [1][2]= 4398;	
		
	return Arrays.asList(data);	
	}
	
	@Test
	public void testRegister(){
		//login with two different users
		System.out.println("testing registration -- " + username + "----"+ password + "------" +pin);
		
	}

}
