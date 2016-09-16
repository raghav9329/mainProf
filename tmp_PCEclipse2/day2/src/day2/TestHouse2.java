package day2;

public class TestHouse2 {

	public static void main(String[] args) {


		House h1 = new House();
		h1.houseNumber=100;
		h1.type ="Luxury";
//		h1.country = "UK";
		h1.buyHouse(5680000);
		
		House h2 = new House();
		h1.houseNumber=300;
		h1.type ="Low budget";
//		h1.country = "UK";
		h1.buyHouse(56000);
		
		
//static access
		House.country="UK";
		
		System.out.println(h1.country);
		System.out.println(h2.country);
		
		House.country="USA";
		System.out.println(h1.country);
		System.out.println(h2.country);
		
		House.payTax();
		
	}

}
