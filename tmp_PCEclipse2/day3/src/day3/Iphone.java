package day3;

public class Iphone implements MobilePhones  {

	@Override
	public void call() {
		System.out.println("Iphone calling");
	}

	@Override
	public void recharg() {
		System.out.println("Iphone recharging");
	}

	@Override
	public void answer() {
		System.out.println("Iphone answering");
	}

}
