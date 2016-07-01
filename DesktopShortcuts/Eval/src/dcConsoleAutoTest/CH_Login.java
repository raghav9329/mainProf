package dcConsoleAutoTest;
public class CH_Login extends TestLogin {
		CH_Login () {
			super (TestLogin.CHROME);
			//construct();
		}
		
		@Override
		protected void construct () {
			System.out.println("Creating a CHROME Login Obj");
		}
}
