package First;

public class NonRecursiveFibSeries {
	public static void main(String[] args) {

		int n1=0;
		int n2=1;

		System.out.println(n1);
		System.out.println(n2);
		// int sum=n1+n2;
		for(int i=0;i<=132;i++){
			int sum=n1+n2;
			//sum=n1+n2;
			if(sum<=9193000){
				n1=n2;
				n2=sum;
				System.out.println(sum);
			}
		
		}
		//int summ = 0;
/*		for(int x = 0; x<25; x++){
			sum = sum +
		}*/
		}
	}


/*
 * 
 * 
 * 
 */
