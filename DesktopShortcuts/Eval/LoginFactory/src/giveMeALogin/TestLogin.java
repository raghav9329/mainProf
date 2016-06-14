package giveMeALogin;

public abstract class TestLogin {
	public static LoginType CHROME;
	public static LoginType FIREFOX;
	public static LoginType WEEJUN;

	public TestLogin(LoginType browser){
		this.browser = browser;
	//	System.out.println("DoesThisGEtPrinted ?? Before Step-3 ???");
		System.out.println("TestLogin.java because CH_Login extends TestLogin , a new CH_Login() makes the base class execute Step-4 ");
	}
	protected abstract void construct();
	private LoginType browser = null;
	public LoginType getBrowser() {
		System.out.println("TestLogin.java does the getBrowser public method get called ?");
		return browser;
	}
	public void setBrowser (LoginType browser){
		this.browser = browser;
		System.out.println("TestLogin.java does the setBrowser public method get called ?");
	}
}
