package dcConsoleAutoTest;

public class TestFactoryPattern {

	public static void main(String[] args) {
		// TODO Auto-generated method stub
System.out.println(TestLoginFactory.generateLogin(LoginType.FIREFOX));
System.out.println(TestLoginFactory.generateLogin(LoginType.CHROME));
System.out.println(TestLoginFactory.generateLogin(LoginType.UNDEFINED));
System.out.println(TestLoginFactory.generateLogin(LoginType.FIREFOX));
System.out.println(TestLoginFactory.generateLogin(LoginType.CHROME));
System.out.println(TestLoginFactory.generateLogin(LoginType.WEEJUN));
System.out.println("");
System.out.println("");
	}

}
