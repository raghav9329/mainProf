
// Global Variables
// a little bit of a cheat ? Maybe not ?
// facilitate making text output available to all

var	textOutputArea = document.getElementById('myOutArea');
var chkBoxSelection = document.getElementsByName("outputSize").value;
var statsOut = document.getElementById("myStatArea");
var loopThisMany ;
var loopHowMany ;
var digitsByLine;
var loopDuration;

	

function displayResult(displayString, howManyLoops){ 
	if (displayString === 0){
		var tempString = document.getElementById("stats2").value;
		tempString = loopDuration + "\n";
		document.getElementById("stats2").value = tempString;	
	} else {
		
	textOutputArea.value = displayString;	
	totalNumODigits = displayString.toString().length - howManyLoops - 1;
	//totalNumODigits = totalNumODigits - howManyLoops-1;
	document.getElementById("countOfChars").value = totalNumODigits;
	}
}// end DISPLAYRESULT

//TODO: Swap the bigger If else block for better readability	
function startFromOne(){// get the number of times to iterate and 
						// start working from 1..N output all or just N
		
	this.loopThisMany = document.getElementById('myLoopControl').value
	var textOutputArea = document.getElementById('myOutArea');
	var tempOutputString = "";

	var catchThis = 1;
	var statsOut = document.getElementById("myStatArea").value = "1"; // + "\n";
	
	if( ! ( document.getElementById("nthIterChkBox").checked ) ){
		tempOutputString = "1\n"						// previously was ="1, "
		
		for (var x=0; x < loopThisMany ; x++){
			catchThis = genAString( catchThis, "internal");
			//tempOutputString = tempOutputString + catchThis + ", "
			tempOutputString = tempOutputString + catchThis + "\n";
		}
			displayResult(tempOutputString,loopThisMany );
	} else {
			for (var x=1; x <= loopThisMany ; x++){
		catchThis = genAString( catchThis, "internal");
		}
		//tempOutputString = tempOutputString + catchThis + ", "
		tempOutputString = tempOutputString + catchThis + "\n";
	}

	displayResult( tempOutputString,loopThisMany );

}// END Of Function STARTFROMONE

//TODO: Swap the bigger If else block for better readability	
function startFromInputStr(){// Get the number of times to iterate
							 // then start generating from the Input String given
	var testDateStart = new Date();
	var testDateEnd ;
	this.loopHowMany = document.getElementById('loopHowMany').value
	var catchThis = document.getElementById('myRandInputStr').value;
	var	tempOutputString = catchThis + "\n";
	document.getElementById("myStatArea").value = "1"; // + "\n";
	
	if( ! ( document.getElementById("nthIterChkBox2").checked ) ){	
		for (var x=0; x < loopHowMany ; x++){
				catchThis = genAString( catchThis, "internal");
				tempOutputString += catchThis + "\n" ; // New code Here: Cleanup improved
			}
		displayResult(tempOutputString,loopHowMany );
	}else {
		for (var x=0; x < loopHowMany ; x++){
			catchThis = genAString( catchThis, "internal");	
		}

	testDateEnd = new Date();
	
	var Difference = testDateEnd - testDateStart ;
		
		
		displayResult(catchThis,loopHowMany);

	}// end if  .... else

}// END of Function STARTFROMINPUTSTRING
	

	
	
	/**************************************************************************************    
	 * THIS IS NOT TRUE ANY LONGER: //TODO:  REFACTOR
	 *  there are two ways I call this function one from external , and one from another
	 *  function in this file.  I have to be able to tell where the call comes from 
	 *  if the call is external then I user the ability to get the document element value
	 *  ELSE I use the value passed in
	 */ 	
//function genAString(fcnInput, inputLocation){
function genAString(fcnInput){
	var modelArray = new Array(10);
	var myString = fcnInput.toString();
	var timeStamp_begin = new Date();		// start the duration counter	
	var timeStamp_endIterateLast;			// prep to end he duration counter
	var inputCharAsIndex;
	var outputLine = "";

	initModelArray(modelArray);


	/* RUN TIME CHECK  Validate input
	 *                                            */
	var inputValRslt = validateIntInput(myString);	// So brain-i-ack  what are you
														// doing with inputValRslt ????

	for ( var x = 0 ; x < myString.length; x++)	// eg: input string 312211 Len is 6  [0..5]
	{
	// Look at char at x  set a value           	//       v----- where x is pointing at the 2
		inputCharAsIndex = myString.charAt(x);  	// ex: 312211

		// modelArray[ inputCharAsIndex ] += 1;		//  I would like to use a[x]++
		modelArray[ inputCharAsIndex ] ++;			//  I would like to use a[x]++

		if (inputCharAsIndex != myString.charAt(x+1)  ) // we are done recording consectutive chars: Go record the count and Char
		{	var localIndex = 0;     // Start at zero
			var myBoolean = true;

			while (myBoolean === true)  // ( get count of specific char ).toString();
			{	var tempString = "";
				
				if (modelArray[localIndex] > 0 ) 						// Ok we found value > 0 at index
				{	tempString = (modelArray[localIndex]).toString();	// recored the count at the index
					tempString = tempString + localIndex.toString();	// string conversions
					myBoolean = false ;									// Having found the val > 0 at inedex, 
				}														// Now set to False and Exit the Loop
				 else                                    				// We did not find value > 0 at index
				{	localIndex++;                           				// Increment Index
	            	if (localIndex > 9 )                    				// problem, I went through the entire array and only 
	            	{		// can I make this secion a little more elegant			// found zeros, now index is array out of bounds
	            		if(inputValRslt==true)
	            		{	alert("ERROR: Array Out of bounds problem: localIndex = " + localIndex);
	            			return(false);
	            		}
	            	}	// end if local > 9
				}		// end else
			}			// end While
	
			outputLine = outputLine + tempString;		/* Append current result 
			 											 * With Previous results */	
	
			initModelArray(modelArray); 				/* Reset & Initialize the array: 
			 											 * Inside the ending decision check */
  
		}	// end if two chars together check : consecutive chars 
	}		// end for x < myString.length loop

	  // From external call return generated stirng
	  digitsByLine = outputLine.length;
	  statsOut = document.getElementById("myStatArea").value + "\n";
	  document.getElementById("myStatArea").value = statsOut + digitsByLine;

//	  var timeStamp_endIterateLast = new Date();
	  timeStamp_endIterateLast = new Date();
		
	  loopDuration =  timeStamp_endIterateLast - timeStamp_begin ;
		
//	  displayResult("0");
		
	  return( outputLine );
} // end of function genASTring(){}


function validateIntInput(value){
	var bodyElement = document.body;
	if (isNaN(value)){
		document.write(bodyElement.innerHTML = value + " Well its not a NUM !!!  ( exiting )")
		alert("there was a integer validation problem with the value " + value)
	return(false);
	}
}// end VALIDATE INPUT


function initModelArray (array){
	for (var x = 0; x < 10 ; x ++){ array[x] = 0; }
}// end INITMODELARRAY


function clearOutPut(){
	document.getElementById('myOutArea').value = "";
	document.getElementById("myStatArea").value = "";
	document.getElementById("countOfChars").value = "";
}

function myOutputSize(){
var radioButton = document.querySelector('[name="outBox"]:checked').value;
	switch (radioButton){
	case 'def' : {
		document.getElementById('myOutArea').cols = 51;
		document.getElementById('myOutArea').rows = 4;
		break;
	}
	case 'small':{
		document.getElementById('myOutArea').cols = 70;
		document.getElementById('myOutArea').rows = 8;
		break;
	}
	case 'medium':{
		document.getElementById('myOutArea').cols = 90;
		document.getElementById('myOutArea').rows = 18;
		break;	
	}
	case 'large':{ // Consider setting Windows Size here as well
		document.getElementById('myOutArea').cols = 120;
		document.getElementById('myOutArea').rows = 38;
		break;	
       }
	default:{
		alert("was there a problem setting the size of the output area ??");
		break;
	}

		
	} // end Switch
}// end of Function myOutputSize()
 	
/*  **********************************************************  */
/*    END OF Executable FILE  */
/*  **********************************************************  */
 	
 	