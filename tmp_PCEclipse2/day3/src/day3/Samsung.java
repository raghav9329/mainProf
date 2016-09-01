package day3;

public class Samsung implements MobilePhones {

	@Override
	public void call() {
	System.out.println("Call on Samsung");
	}

	@Override
	public void recharg() {
		System.out.println("Recarge Samsung");
	}

	@Override
	public void answer() {
		System.out.println("Answer Samsung");	
	}

	public void playAndriodGames(){
		System.out.println("Samsung Android Games");
		
	
	}
}
