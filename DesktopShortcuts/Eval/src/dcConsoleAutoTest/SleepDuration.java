package dcConsoleAutoTest;

public class SleepDuration {
	
	
	public void tiny(){
		System.out.println("tiny Sleep 50 mil");
		try { Thread.sleep(50L ); }
		catch (InterruptedException e)
		{ e.printStackTrace(); }	
	}
	
	public void medium() {
		System.out.println("short Sleep 150 mil");
		try { Thread.sleep(150L ); }
		catch (InterruptedException e)
		{ e.printStackTrace(); }	
	}

	
	public void longer() {
		System.out.println("medium Sleep halfsec");
		try { Thread.sleep(500L ); }
		catch (InterruptedException e)
		{ e.printStackTrace(); }	
	}
	
	public void reallyLong() {
		System.out.println("Longer Sleep 2.5 sec");
		try { Thread.sleep(2500L ); }
		catch (InterruptedException e)
		{ e.printStackTrace(); }	
	}
	
	public void tenSeconds() {
		System.out.println("REALLY Long Sleep 10sec");
		try { Thread.sleep(10000L ); }
		catch (InterruptedException e)
		{ e.printStackTrace(); }	
	}
	public void a50(){
		System.out.println("tiny Sleep 50 mil");
		try { Thread.sleep(50L ); }
		catch (InterruptedException e)
		{ e.printStackTrace(); }	
	}
	
	public void a150() {
		System.out.println("short Sleep 150 mil");
		try { Thread.sleep(150L ); }
		catch (InterruptedException e)
		{ e.printStackTrace(); }	
	}

	public void a250() {
		System.out.println("short Sleep 1/4 sec ");
		try { Thread.sleep(250L ); }
		catch (InterruptedException e)
		{ e.printStackTrace(); }	
	}	
	public void a500() {
		System.out.println("medium Sleep halfsec");
		try { Thread.sleep(500L ); }
		catch (InterruptedException e)
		{ e.printStackTrace(); }	
	}
	
	public void a1000() {
		System.out.println("medium Sleep fullsec");
		try { Thread.sleep(1000L ); }
		catch (InterruptedException e)
		{ e.printStackTrace(); }	
	}
	public void a2500() {
		System.out.println("Longer Sleep 2.5 sec");
		try { Thread.sleep(2500L ); }
		catch (InterruptedException e)
		{ e.printStackTrace(); }	
	}
	
	public void a5000() {
		System.out.println("Longer Sleep 5 sec");
		try { Thread.sleep(5000L ); }
		catch (InterruptedException e)
		{ e.printStackTrace(); }	
	}
	public void a10k() {
		System.out.println("REALLY Long Sleep 10sec");
		try { Thread.sleep(10000L ); }
		catch (InterruptedException e)
		{ e.printStackTrace(); }	
	}
}
