package giveMeALogin;

public class CH_Login extends TestLogin {
		CH_Login () {
			super (TestLogin.CHROME);
			construct();
			System.out.println("CH_Login Extends TestLogin - Step(?? 3??) ");
			System.out.println("CH_Login.java because item in Step (??3??) is type CH_login that Extends TestLogin from Step 4, this CH_login.super is step 5");
		}
		
		@Override
		protected void construct () {
			System.out.println("Creating a CHROME Login Obj");
		}
}
