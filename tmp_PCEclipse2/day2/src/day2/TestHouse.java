package day2;

public class TestHouse {

	public static void main(String[] args) {

		// create an obj of House class
		

		House h1 = new House();
		House h2 = new House();
		House h3 = new House();
		
		h1.houseNumber=100;
		h2.houseNumber=200;
		h3.houseNumber=300;
		
		System.out.println(h1.houseNumber);
		System.out.println(h2.houseNumber);
		System.out.println(h3.houseNumber);
		System.out.println("*********************");
		
		h1=h2;
		System.out.println(h1.houseNumber);
		System.out.println(h2.houseNumber);
		System.out.println(h3.houseNumber);
		
//		h2.houseNumber=500;
//		System.out.println("*********************");
//
//		System.out.println(h1.houseNumber);
//		System.out.println(h2.houseNumber);
//		System.out.println(h3.houseNumber);
		
		h1.buyHouse(3000000);
	}

}
