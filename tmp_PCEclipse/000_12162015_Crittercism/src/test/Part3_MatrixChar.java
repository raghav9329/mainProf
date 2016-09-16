/*
 * Mark Atkinson
 * atkinson_mark@yahoo.com
 * 707 953 2210
 */
package test;

public class Part3_MatrixChar {

	public void display(String myCharacter){
		int col=1, chars=1, row=1;
 
    switch (myCharacter){
    case "Z":
    	
		for(int x = 1 ; x<17 ; x++){
			//sleep
			if ( col == 5){
				row++;
				col=1;
				System.out.println();
			}// end if
			
			switch (row) {
			case 1:
				//System.out.println("x=" +x +" row=" +row +" col = " +col ); //+" chars=" +chars );
				System.out.print(chars++);
				col++;
				break;
			
			case 2:
				if (col == 3)
					System.out.print(chars++);
				else
					System.out.print(" ");
				//System.out.println("x=" +x +" row=" +row +" col = " +col ); //+" chars=" +chars );
				col++;
				break;
				
			case 3:
				if (col == 2)
					System.out.print(chars++);
				else
					System.out.print(" ");
				//System.out.println("x=" +x +" row=" +row +" col = " +col ); //+" chars=" +chars );
				col++;
				break;
				
			case 4:
				if (chars == 10)
					System.out.println("0");
				else 
				 System.out.print(chars++);
				//System.out.println("x=" +x +" row=" +row +" col = " +col );// +" chars=" +chars );
				col++;
				break;
				
			default:
				break;
			}// end switch-case
		}//end for
		break;
		
    case ("N"):
    	System.out.println("Section of case for -N- ");
	for(int x = 1 ; x<17 ; x++){
		//sleep
		if ( col == 5){
			row++;
			col=1;
			System.out.println();
		}// end if
		
		switch (row) {
		case 1:  // row 1
			//	System.out.println("x=" +x +" row=" +row +" col = " +col ); //+" chars=" +chars );
			//System.out.print(chars++);
			//col++;
			for (col=1; col < 5 ;col++ ){
				if (col==1 || col==4 )
					System.out.print(chars++);
				else
					System.out.print(" ");
			}
			
			break;
		
		case 2:
			for (col=1; col < 5 ;col++ ){
				if (col==1 || col==2 || col == 4)
					System.out.print(chars++);
				else
					System.out.print(" ");
			}
			break;
			
		case 3:
			for (col=1; col < 5 ;col++ ){
				if (col==1 || col==3 || col == 4)
					System.out.print(chars++);
				else
					System.out.print(" ");
			}//end for
			break;
			
		case 4:
			for (col=1; col < 5 ;col++ ){
				if (col==1 || col == 4){
					if (chars == 10 ) System.out.print("0");
					else System.out.print(chars++);
				}else
					System.out.print(" ");
				
			}// end for
			break;
			
		default:
			break;
		}// end switch-case
	}//end for
    	break;
    
    default :
    	break;
		
      }//end switch(character)
		
		
	}// end display
	
	public static void main(String[] args) {
		Part3_MatrixChar myMC = new Part3_MatrixChar();
		System.out.println("Starting with character Z");
		System.out.println();
		myMC.display("Z");
		System.out.println();
		myMC.display("N");

		System.out.println("Main ending.");
	}// end main

}
