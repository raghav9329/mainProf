package day3;

public class TestMobile {

	public static void main(String[] args) {


		//MobilePhones m = new MobilePhones();
		Samsung s = new Samsung();
		
		s.call(); 
		s.recharg();
		s.playAndriodGames();
		
		//only call the implemented functions from the interface
		MobilePhones m = new Samsung();
		m.call();
		m.recharg();
		//m.playAndriodGames();
		
	}

}
