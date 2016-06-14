package dcConsoleAutoTest;
public abstract class TestLogin {
	public static LoginType CHROME;
	public static LoginType FIREFOX;
	public static LoginType WEEJUN;

	public TestLogin(LoginType browser){
		this.browser = browser;
	}
	protected abstract void construct();
	private LoginType browser = null;
	public LoginType getBrowser() {
		return browser;
	}
	public void setBrowser (LoginType browser){
		this.browser = browser;
	}
}
