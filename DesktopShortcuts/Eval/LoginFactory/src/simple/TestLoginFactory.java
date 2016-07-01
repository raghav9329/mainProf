package simple;

public class TestLoginFactory {

	public static void main(String[] args) {
		
		TestLoginFactory factory = new TestLoginFactory();
for (int x=1; x<=3; x++){
		System.out.println("launching Browser " +x);
		factory.getBrowser("FIREFOX","007").getHandle().get("http://www.cnn.com");
}
System.out.println("Launch Browser Done");	
if (factory.equals(null))
			System.exit(0);	
		
	//	factory.get("http://www.cnn.com");
	}// end of Main

	public Login getBrowser(String browserType, String version){
		if (browserType.equals("FIREFOX")) {
			System.out.println("just an ouput line");
			return new FireFoxLogin("FireFox");
		}
		else {
			System.out.print("System Fail: Browser type " +browserType );
			System.out.println(" not supported");
			return null;
		}
			
	}// end of getLogin

}// End of Class

