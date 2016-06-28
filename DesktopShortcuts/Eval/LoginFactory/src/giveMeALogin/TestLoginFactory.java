package giveMeALogin;

public class TestLoginFactory {
	
	public static TestLogin generateLogin(LoginType browser) {
		System.out.println("TestLoginFactory: Creat a null testlogin obj - step 2");
		TestLogin testlogin = null ;
		
		switch (browser) {
		
		case CHROME:
			System.out.println("TestLoginFactory Case Statement call new CH_login() changing the testLogin obj ?? Step-3");
			testlogin = new CH_Login();
			System.out.print("Returning from CH_Login.java  we are now fininging Step-3 ");
			System.out.println("The Chrome ordinal value is: " +browser.ordinal() +" Step -6 " );
			break;
	
		case FIREFOX:
			testlogin = new FF_Login();
			System.out.println("The FireFox ordinal value is: " +browser.ordinal());
			break;
		
		case UNDEFINED:
			System.out.println("un defined browser type ");
			break;
			
		default:
			System.out.println("Should be throwing an error ");
			System.out.println("Some how you missed FIREFOX, CHROME, UNDEFINED browser types ");
		}
		return testlogin;
		
	}
}
