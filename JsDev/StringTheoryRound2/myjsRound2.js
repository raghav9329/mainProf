
// Global Variables
// a little bit of a cheat ? Maybe not ?
// facilitate making text output available to all

	var	textOutputArea = document.getElementById('myOutArea');
	var chkBoxSelection = document.getElementsByName("outputSize").value;
	var statsOut = document.getElementsById("myStatArea");
	//var loopThisMany = document.getElementById('myLoopControl').value
	var loopThisMany ;
	var loopHowMany ;
	var digitsByLine;
	

	function displayResult(passedValue, howManyLoops){ 
		textOutputArea.value = passedValue;	
		totalNumODigits = passedValue.toString().length;
		totalNumODigits = totalNumODigits - howManyLoops-1;
		//document.getElementById("countOfChars").value = passedValue.toString().length;
		 document.getElementById("countOfChars").value = totalNumODigits;
		
		
		
	}// end DISPLAYRESULT

	
	function startFromOne(){// get the number of times to iterate and 
							// start working from 1..N output all or just N
		this.loopThisMany = document.getElementById('myLoopControl').value
		var textOutputArea = document.getElementById('myOutArea');
		var tempOutputString = "";
	
		var catchThis = 1;

		if( ! ( document.getElementById("nthIterChkBox").checked ) ){
			//tempOutputString = "1, "
			tempOutputString = "1\n"
			
			for (var x=0; x < loopThisMany ; x++){
				catchThis = genAString( catchThis, "internal");
				//tempOutputString = tempOutputString + catchThis + ", "
				tempOutputString = tempOutputString + catchThis + "\n";
			}
				displayResult(tempOutputString,loopThisMany );
		}else {
			for (var x=1; x <= loopThisMany ; x++){
				catchThis = genAString( catchThis, "internal");
			}
			//tempOutputString = tempOutputString + catchThis + ", "
			tempOutputString = tempOutputString + catchThis + "\n";
		}
		displayResult( tempOutputString,loopThisMany );
	}// END Of Function STARTFROMONE

	function startFromInputStr(){// Get the number of times to iterate
								 // then start generating from the Input String given
	
		this.loopHowMany = document.getElementById('loopHowMany').value
		var catchThis = document.getElementById('myRandInputStr').value;
		var	tempOutputString = catchThis + "\n";
		
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
	
			displayResult(catchThis,loopHowMany);

		}// end if  .... else
	
	}// END of Function STARTFROMINPUTSTRING
	
	
	function genAString(fcnInput, inputLocation){
		var modelArray = new Array(10);
		var myString;
	
	initModelArray(modelArray);

/**************************************************************************************    
 *  there are two ways I call this function one from external , and one from another
 *  function in this file.  I have to be able to tell where the call comes from 
 *  if the call is external then I user the ability to get the document element value
 *  ELSE I use the value passed in
 */ 
  
  /* I also need to try this as !=    */
	if (fcnInput == null){  // is this the right check
		myString = document.getElementById('myRandInputStr').value;
	}
	else
		myString = fcnInput.toString();

/*Function Call to validate input */
  var inputValRslt = validateIntInput(myString);

  var outputLine = "";
  var currInputCharAsIndex;
  for ( var x = 0 ; x < myString.length; x++) { // eg: input string 312211 Len is 6  [0..5]

    // Look at char at x
    currInputCharAsIndex = myString.charAt(x);

   modelArray[ currInputCharAsIndex ] += 1;  //  I would liket to use a[x]++
  //  modelArray[ currInputCharAsIndex ] ++;  //  I would liket to use a[x]++

    // Ending Decision Check
    if (  currInputCharAsIndex != myString.charAt(x+1)  ){ // we are done recording consectutive chars: Go record the count and Char
    var myBoolean = true;
    var localIndex = 0;     // Start at zero

    while (myBoolean === true) { // ( get count of specific char ).toString();
   
        var tempString = "";
        if (modelArray[localIndex] > 0 ) {          			// Ok we found value > 0 at index
            tempString = (modelArray[localIndex]).toString();   // recored the count at the index
            tempString = tempString + localIndex.toString();	// string conversions
            myBoolean = false ;                                 // Having found the val > 0 at inedex, 
            													// Now set to False and Exit the Loop
        }
        else{                                       			// We did not find value > 0 at index
            localIndex++;                           			// Increment Index
            if (localIndex > 9 ){                    			// problem, I went through the entire array and only 
            													// found zeros, now index is array out of bounds
            	if(inputValRslt==false){
            	// do Nothin	
            	}
            	else {
            		alert("ERROR: Array Out of bounds problem: localIndex = " + localIndex);
	            return(false);
            	} 
            }
        }
    }// end While

    outputLine = outputLine + tempString;
  
   /* Reset & Initialize the array: Inside the ending decision check */
     initModelArray(modelArray);
    } // end of what ???  fix this
  }// end for x < myString.length loop
  
  
  digitsByLine = outputLine.length;
// statsOut = document.getElementById("myStatArea");
  statsOut = document.getElementById("myStatArea").value + "\n";
  document.getElementById("myStatArea").value = statsOut + digitsByLine;
  
  /* Ok: We all done.  */

  if (fcnInput == null){  // is this the right check
	  // from inside, put input and generated string to screen

	  //textOutputArea.value = myString + " = " + outputLine;
	 // displayResult(myString + " = " + outputLine);
	  displayResult( outputLine);
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
	}// end VALIDATE INPUT


	function initModelArray (array){
		for (var x = 0; x < 10 ; x ++){ array[x] = 0; }
	}// end INITMODELARRAY


	function clearOutPut(){
		textOutputArea.value = "";
		statsOut.value = "";
		//location.reload();
	}

 	function myOutputSize(){
	var radioButton = document.querySelector('[name="outBox"]:checked').value;
	//var outputArea = document.getElementById('myOutArea');
	//for (var x = 0 , len = radios.length; x<len ; x++    ) {
		switch (radioButton){
        //switch (radios[x].id){
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
 	}
 	
/*  **********************************************************  */
/*    END OF Executable FILE  */
/*  **********************************************************  */
 	
 	


 	/*   8
 	google: example javascript get the value of radio buttons

 	http://stackoverflow.com/questions/9618504/get-radio-button-value-with-javascript

 	http://jsfiddle.net/Xxxd3/609/

 	javascript:

 	var radios = document.getElementsByName('genderS');

 	for (var i = 0, length = radios.length; i < length; i++) {
 	    if (radios[i].checked) {
 	        // do whatever you want with the checked radio
 	        alert(radios[i].value);

 	        // only one radio can be logically checked, don't check the rest
 	        break;
 	    }
 	}


 	http://stackoverflow.com/questions/15839169/how-to-get-value-of-selected-radio-button
 	Here's my HTML:

 	<div id="rates">

 	<input type="radio" id="r1" name="rate" value="Fixed Rate"> Fixed Rate

 	<input type="radio" id="r2" name="rate" value="Variable Rate"> Variable Rate

 	<input type="radio" id="r3" name="rate" value="Multi Rate" checked="checked"> Multi Rate  
 	Here's my .js:

 	var rates = document.getElementById('rates').value;
 	var rate_value;

 	if(rates =='Fixed Rate'){
 	    rate_value = document.getElementById('r1').value;

 	}else if(rates =='Variable Rate'){
 	    rate_value = document.getElementById('r2').value;

 	}else if(rates =='Multi Rate'){
 	    rate_value = document.getElementById('r3').value;
 	}  

 	document.getElementById('results').innerHTML = rate_value;



 	  */	
 	