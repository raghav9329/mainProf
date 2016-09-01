package PoiAccess;

import PoiAccess.AbstractAccessPoi;


public class RunAccessPoiTest extends AbstractAccessPoi {

	public static void main(String[] args) throws Exception{
		
		RunAccessPoiTest myTest = new RunAccessPoiTest();
		myTest.executeFirst();
	}
	
	public void executeFirst(){
		getValueNumeric();
		getStrValue();
		admin();
		
	}// end firstMethod
	
	public String getStrValue(){
		String name;
		name = getStringAtCell(1,3);
		System.out.println(name);
		return name;
	}
	
	public void getValueNumeric(){
		int number;
		number = getNumAtCell(0,0);  // how do I do this at this level
		System.out.println(number);  // w/o telling what cell i'ts in
	}
	
	public void goNextRow(){
	
	}
	
	// I could do a SetCell and GetCell call from here 
	// I should also be able to do a isCellNumeric isCellString
}
