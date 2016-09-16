package day2;

public class House {
	//non ststic global var
	int houseNumber;
	String type;
	static String country;

	
	public void buyHouse(int cost){
		
		System.out.println("Buying house "+houseNumber);
	}
	
	public static void payTax(){
		System.out.println("Paying Tax "+300);
		
	}

}
