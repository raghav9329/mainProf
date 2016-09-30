/*
 * Mark Atkinson
 * atkinson_mark@yahoo.com
 * 707 953 2210
 */
package test;

import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
//import java.util.Iterator;
//import java.util.Set;

import java.io.PrintWriter;

//import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;

public class Part1_jsonObjectParse {

	private static final String inputfilePath = "C:\\tmp\\crittercismTestFile.json";
	private static final String outputfilePath = "C:\\tmp\\TestOutputAnswer.json";
	
	public static void main(String[] args) {
		
		try {
			// read the json file
			FileReader reader = new FileReader(inputfilePath);
			FileWriter writer = new FileWriter(outputfilePath);
			
			JSONParser jsonParser = new JSONParser();
			JSONObject jsonObject = (JSONObject) jsonParser.parse(reader);
			
			String myOriginalString = jsonObject.entrySet().toString();
			
			String idNumValStr = myOriginalString.substring(1,myOriginalString.indexOf("="));
			
			String mainStringNoIDNumVal = myOriginalString.substring(myOriginalString.indexOf("=") +1);
			
			mainStringNoIDNumVal = "[" +mainStringNoIDNumVal;
			
			String firstCompleteSection = mainStringNoIDNumVal.substring(0,mainStringNoIDNumVal.indexOf("}")-1 ) +",";
			
			idNumValStr = "\"id\": " +"\"" +idNumValStr +"\"" +","; 
			
			firstCompleteSection = firstCompleteSection + idNumValStr + "},";

			String secondWorkingMainString = mainStringNoIDNumVal.substring(mainStringNoIDNumVal.indexOf("}")+3, mainStringNoIDNumVal.length()); 
			
			idNumValStr = secondWorkingMainString.substring(0,secondWorkingMainString.indexOf("="));
			
			String secondWorkingTempString = secondWorkingMainString.substring(secondWorkingMainString.indexOf("{"), secondWorkingMainString.indexOf("}"));
			
			String secondCompleteSection = secondWorkingTempString +",\"id\": \"" +idNumValStr +"\",},";
			
			
		    String thirdWorkingMainString = secondWorkingMainString.substring(secondWorkingMainString.indexOf("}")+3, secondWorkingMainString.length()); 
			
			idNumValStr = thirdWorkingMainString.substring(0,thirdWorkingMainString.indexOf("="));
			
			String thirdWorkingTempString = thirdWorkingMainString.substring(thirdWorkingMainString.indexOf("{"), thirdWorkingMainString.indexOf("}"));
			
			String thirdCompleteSection = thirdWorkingTempString +",\"id\": \"" +idNumValStr +"\",}]";

			String finalOutputString = firstCompleteSection + secondCompleteSection + thirdCompleteSection;
			
			System.out.println("Final Output is");
			
			System.out.println(finalOutputString);
			
			PrintWriter outPut = new PrintWriter(outputfilePath);
			outPut.println(finalOutputString);
			outPut.close();
			
			System.out.println("Output file found at: c:\\tmp\\TestOutputAnswer.json");

		} catch (FileNotFoundException ex) {
			ex.printStackTrace();
		} catch (IOException ex) {
			ex.printStackTrace();
		} catch (ParseException ex) {
			ex.printStackTrace();
		} catch (NullPointerException ex) {
			ex.printStackTrace();
		}
		
	}// end Main
		
} // end Class Part1_jsonObjectParse



/*

Given a JSON object like
{
 "id_number_1": {
 "firstName": "Joe",
 "lastName": "Smith",
 "birthDay": "1970-01-01",
 "phoneNumber": "123-456-7890",
 },
 "id_number_2": {
 "firstName": "Jane",
 "lastName": "Smith",
 "birthDay": "1970-02-02",
 "phoneNumber": "555-555-1212",
 },
 "id_number_3": {
 "firstName": "Andrews",
 "lastName": "Kevin",
 "birthDay": "1980-03-03",
 "phoneNumber": "987-654-3210"
 }
}
create a list of objects sorted by last name, first name, birthday, and phone number like so:
[
 {
 "firstName": "Kevin",
 "lastName": "Andrews",
 "birthDay": "1980-03-03",
 "phoneNumber": "987-654-3210",
 "id": "id_number_3",
 },
 {
 "firstName": "Jane",
 "lastName": "Smith",
 "birthDay": "1970-02-02",
 "phoneNumber": "555-555-1212",
 "id": "id_number_2",
 },
 {
 "firstName": "Joe",
 "lastName": "Smith",
 "birthDay": "1970-01-01",
 "phoneNumber": "123-456-7890",
 "id": "id_number_1"
 },
]

*****************************************************************************************
//Source Code with all the debug System.out.println statements
//package test;
//
//import java.io.FileNotFoundException;
//import java.io.FileReader;
//import java.io.FileWriter;
//import java.io.IOException;
////import java.util.Iterator;
////import java.util.Set;
//
////import org.json.simple.JSONArray;
//import org.json.simple.JSONObject;
//import org.json.simple.parser.JSONParser;
//import org.json.simple.parser.ParseException;
//
//public class Part1_jsonObjectParse {
//
//	private static final String inputfilePath = "C:\\mark_EclipseWorkSpace\\000_12162015_Crittercism\\crittercismTestFile.json";
//	private static final String outputfilePath = "C:\\mark_EclipseWorkSpace\\000_12162015_Crittercism\\markTestOutputAnswer.json";
//	
//	public static void main(String[] args) {
//		
//		try {
//			// read the json file
//			FileReader reader = new FileReader(inputfilePath);
//			FileWriter writer = new FileWriter(outputfilePath);
//			
//			JSONParser jsonParser = new JSONParser();
//			JSONObject jsonObject = (JSONObject) jsonParser.parse(reader);
//			String myOriginalString = jsonObject.entrySet().toString();
//		//	System.out.println(myOriginalString);
//		//	System.out.println(myOriginalString.indexOf("=") );
//			String idNumValStr = myOriginalString.substring(1,myOriginalString.indexOf("="));
//			//System.out.println(idNumValStr);
//			
//     //	String mainStringNoIDNumVal = myOriginalString.substring(13);
//			String mainStringNoIDNumVal = myOriginalString.substring(myOriginalString.indexOf("=") +1);
//			//System.out.println("mainStringNoIDNumVal = "+mainStringNoIDNumVal);
//			mainStringNoIDNumVal = "[" +mainStringNoIDNumVal;
//			
//			//System.out.println(mainStringNoIDNumVal);
//			//System.out.println("getting the -}- character " +mainStringNoIDNumVal.substring(0,94));
//			
//			//System.out.println("Getting the position of -}- " +mainStringNoIDNumVal.indexOf("}") );	
//			
//		//  String firstCompleteSection = mainStringNoIDNumVal.substring(0,94) +",";
//			String firstCompleteSection = mainStringNoIDNumVal.substring(0,mainStringNoIDNumVal.indexOf("}")-1 ) +",";
//			//System.out.println( "firstCompletSection having used indexOf -}- char "  +firstCompleteSection  );
//			
//			//System.out.println(firstCompleteSection);
//			idNumValStr = "\"id\": " +"\"" +idNumValStr +"\"" +","; 
//			//System.out.println(idNumValStr);
//			firstCompleteSection = firstCompleteSection + idNumValStr + "},";
//			System.out.println("First complete section is " );
//			System.out.println(firstCompleteSection);
//	   Were Good to here   
//		   System.out.println("");
//		//	System.out.println("Second Working Main String");
//			String secondWorkingMainString = mainStringNoIDNumVal.substring(mainStringNoIDNumVal.indexOf("}")+3, mainStringNoIDNumVal.length()); 
//		//	System.out.println(secondWorkingMainString);
//			
//			idNumValStr = secondWorkingMainString.substring(0,secondWorkingMainString.indexOf("="));
//		//	System.out.println(idNumValStr);
//			
//			String secondWorkingTempString = secondWorkingMainString.substring(secondWorkingMainString.indexOf("{"), secondWorkingMainString.indexOf("}"));
//			
//		//	System.out.println(secondWorkingTempString);
//			String secondCompleteSection = secondWorkingTempString +",\"id\": \"" +idNumValStr +"\",},";
//			
//			System.out.println("Second Completed Section is ");
//			System.out.println(secondCompleteSection);
//		//	System.out.println("Second working Main string is still ");
//		//	System.out.println(secondWorkingMainString); 
//			
//		    String thirdWorkingMainString = secondWorkingMainString.substring(secondWorkingMainString.indexOf("}")+3, secondWorkingMainString.length()); 
//		//  System.out.println("Remaining string data");
//		//	System.out.println(thirdWorkingMainString);
//			
//			idNumValStr = thirdWorkingMainString.substring(0,thirdWorkingMainString.indexOf("="));
//		//	System.out.println(idNumValStr);
//			
//			String thirdWorkingTempString = thirdWorkingMainString.substring(thirdWorkingMainString.indexOf("{"), thirdWorkingMainString.indexOf("}"));
//		//	System.out.println(thirdWorkingTempString);
//			
//			String thirdCompleteSection = thirdWorkingTempString +",\"id\": \"" +idNumValStr +"\",}]";
//			System.out.println("");
//			System.out.println("Third completed section is ");
//			System.out.println(thirdCompleteSection);
//
//			String finalOutputString = firstCompleteSection + secondCompleteSection + thirdCompleteSection;
//			
//			System.out.println("Final Output is");
//			System.out.println(finalOutputString);
//
//
//		} catch (FileNotFoundException ex) {
//			ex.printStackTrace();
//		} catch (IOException ex) {
//			ex.printStackTrace();
//		} catch (ParseException ex) {
//			ex.printStackTrace();
//		} catch (NullPointerException ex) {
//			ex.printStackTrace();
//		}
//		
//	}// end Main
//		
//} // end Class Part1_jsonObjectParse

*/