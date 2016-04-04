
// Global Variables
// a little bit of a cheat ? Maybe not ?
// facilitate making text output available to all

var	textOutputArea = document.getElementById('myOutArea');

function displayResult(){ } // Un implemented.  for the next rev

  function startFromOne(){
		var whatsMyLoop = document.getElementById('myLoopControl').value
		var textOutputArea = document.getElementById('myOutArea');
		var tempOutputString = "";
		var catchThis = 1;

		if( ! ( document.getElementById("mycheckbox").checked ) ){
			textOutputArea.value = "1, "
			for (var x=0; x < whatsMyLoop ; x++){
				catchThis = genAString( catchThis, "internal");
				tempOutputString = textOutputArea.value;
				textOutputArea.value = tempOutputString + catchThis +", ";
				}// end for x<=whatsMyLoop
		}else {
			for (var x=1; x <= whatsMyLoop ; x++){
				catchThis = genAString( catchThis, "internal");
			}
			tempOutputString = textOutputArea.value;
			textOutputArea.value = tempOutputString + catchThis +", ";
		}

}


function genAString(fcnInput, inputLocation){
	var bodyElement = document.body  ;
	var page = bodyElement.innerHTML;
	var modelArray = new Array(10);
	var myString;
	
	initModelArray(modelArray);

/********************************************    
 *  there are two ways I call this function
 *  one from external , and one from another
 *  function in this file.  I have to be able
 *  to tell where the call comes from 
 *  if the call is external then I user the 
 *  ability to get the document element value
 *  ELSE I use the value passed in
 */ 
  
  /* I also need to try this as !=    */
	if (fcnInput == null){  // is this the right check
		myString = document.getElementById('myInputBox').value;
	}
	else
		myString = fcnInput.toString();

/*Function Call to validate input */
  validateIntInput(myString);

  var outputLine = "";
  var currInputCharAsIndex;
  for ( var x = 0 ; x < myString.length; x++) { // eg: input string 312211 Len is 6  [0..5]

    // Look at char at x
    currInputCharAsIndex = myString.charAt(x);

    modelArray[ currInputCharAsIndex ] += 1;  //  I would liket to use a[x]++

    // Ending Decision Check
    if (  currInputCharAsIndex != myString.charAt(x+1)  ){ // we are done recording consectutive chars: Go record the count and Char
    var myBoolean = true;
    var localIndex = 0;     // Start at zero

    while (myBoolean === true) { // ( get count of specific char ).toString();
   
        var tempString = "";
        if (modelArray[localIndex] > 0 ) {          			// Ok we found value > 0 at index
            tempString = (modelArray[localIndex]).toString();   // recored the count at the index
            tempString = tempString + localIndex.toString();	// string conversions
            myBoolean = false ;                                 // Having found the val > 0 at inedex, Exit the Loop
        }
        else{                                       			// We did not find value > 0 at index
            localIndex++;                           			// Increment Index
            if (localIndex > 9 ){                    			// problem, I went through the entire array and only found zeros, now index is array out of bounds
                alert("ERROR: Array Out of bounds problem: localIndex = " + localIndex);
	            return(false);
            }
        }
    }// end While

    outputLine = outputLine + tempString;
  
   /* Reset & Initialize the array: Inside the ending decision check */
     initModelArray(modelArray);
    } // end of what ???  fix this
  }// end for x < myString.length loop

  /* Ok: We all done.  */

  if (fcnInput == null){  // is this the right check
	  // from inside, put input and generated string to screen
	  textOutputArea.value = myString + " = " + outputLine;
  }
  else {
	  // From external call return generated stirng
	  return( outputLine );
  }
}// end of function genASTring(){}


function validateIntInput(value){
  var bodyElement = document.body;
  if (isNaN(value)){
    document.write(bodyElement.innerHTML = value + " Well its not a NUM !!!  ( exiting )")
    alert("there was a integer validation problem with the value " + value)
    return(false);
  }
}


function initModelArray (array){
 for (var x = 0; x < 10 ; x ++){ array[x] = 0; }
 }


function forceReload(){
location.reload();
}
