package testDevelopment;

public class PalindromeAString {

	public static void main(String[] args) {
       // String input = "I 1234 a 4321 I";
        String input = "I a I";
        String reverse = "";
        
        for(int i= input.length()-1; i>=0; i--)
        
        {
            System.out.println(" The letters are " + input.charAt(i));
            reverse = reverse + input.charAt(i); //(Here  is hat he said that string will not handle Characters but they do)
            
        }
        
        System.out.println("The original string is:-" + input+ " something1");
        
        
        System.out.println("The reverse string is:-" + reverse +" something");
        
        if(input.equalsIgnoreCase( reverse))
        {
            System.out.println(" Insde the palindrome loop");
            System.out.println(" The strings are Palindrome");
        }
        
        
        
    }
}

/*
* This was part of a discussion
* with people from Rndstad Tech
* Maybe involved with Moodys
*/
