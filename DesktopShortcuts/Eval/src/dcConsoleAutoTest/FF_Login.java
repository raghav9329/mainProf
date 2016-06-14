package dcConsoleAutoTest;

public class FF_Login extends TestLogin{
	FF_Login() {
		super (TestLogin.FIREFOX);
		//construct();
	}
	@Override
	protected void construct () {
		System.out.println("Creating a FIREFOX Login Obj");
	}
}
