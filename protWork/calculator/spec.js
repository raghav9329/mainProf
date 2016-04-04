// spec.js

describe('Protractor Demo App', function() {

  //var outputDisplay = element.all(by.css('.calculator div')).first();
  var firstElementList = element.all(by.css('.calculator-keypad')).all(by.css('.key'));
  var keyPadList = element.all(by.css('.calculator-keypad div'));
  var outPutDisplay = element.all(by.css('.calculator div'));
  

//  var eightKeyPressed = element.all(by.css('.calculator-keypad div')).filter(function(elem, index) {
//	  return elem.getText().then(function(text)){
//		  return text === '8';
//	  }); }).first().click();

// onPrepare: 

  beforeEach(function() {
    //recho "Second Echo stmt added... first below in src"
    //console.log("Output: beforeEach(function()...  Also call made to URL prot-demo");
    browser.get('http://pocket-calculator.herokuapp.com/');
  });
  
  afterEach(function() {
  //  browser.pause();
  //  console.log("Output: browser.sleep(300)" );
    browser.sleep(150);
  });
  

  it('should have a title', function() {
    expect(browser.getTitle()).toEqual('Pocket Calculator');
    console.log("getTitle = Pocket Calculator")
  });

 it('should have a default result of Zero (0) ', function() {
    // var outputDisplay = expect(outputDisplay.getText()).toBe('0');
   expect(outPutDisplay.get(0).getText()).toBe('0');
   console.log("Output Display ( result ) should be zero(0)");
  });
  
  it('should have some Keys: Like', function() {
   expect(firstElementList.getText()).toEqual([ 'AC', '±', '%', '÷', '7', '8', '9', '×', '4', '5', '6', '—', '1', '2', '3', '+', '0', '.', '=' ]);
  });

  
 it('should get the first Keypad position', function() {
	var keyPadAC = expect(keyPadList.get(0).getText()).toBe('AC'); 
 });
  
  
 it('should get the second Keypad position', function() {
	var keyPadNegate = expect(keyPadList.get(1).getText()).toBe('±'); 
 });
 
 
 it('should get the second Keypad position', function() {
	var keyPadPercent = expect(keyPadList.get(2).getText()).toBe('%'); 
 });
 
  
 it('should get the 4th Keypad position as -7-', function() {
	 
	 element.all(by.css('.calculator-keypad')).all(by.css('.key')); 
	 expect(keyPadList.get(4).getText()).toBe('7'); 
	 var myElement = keyPadList.get(4);
	 myElement.click();
     expect(outPutDisplay.get(0).getText()).toBe('7');

 });

// [ 'AC', '±', '%', '÷', '7', '8', '9', '×', '4', '5', '6', '—', '1', '2', '3', '+', '0', '.', '=' ] 
//    0     1    2    3    4    5    6    7    8    9    10   11   12   13   14   15   16   17   18 
 it('Binary Operation: Evaluate the Multiplication of two digits', function(){
	 element.all(by.css('.calculator-keypad')).all(by.css('.key')); 
	// expect(keyPadList.get(4).getText()).toBe('7'); 
	 var myOperation = keyPadList.get(7); //char 'x'  multiply
	 var myDigit = keyPadList.get(4); // 'digit 7'
	 var myEvaluation = keyPadList.get(18); // equals Sign
	 myDigit.click(); // submit dig 7
	 myOperation.click(); // submit multiply operation
	 myDigit.click();  // submit dig 7
	 myEvaluation.click(); // call evaluation equals sign
	 
	 expect(outPutDisplay.get(0).getText()).toBe('49');
	 console.log("Multiplication Result should be 49");
	 browser.sleep(800);
 }); 
 
 
 
 it('Activate the Clear Function', function(){
	 var myClearAction = keyPadList.get(0); // AC Key action, Clear
	 myClearAction.click();
	 console.log("Clear Function should show '0' in display");
	 browser.sleep(2800);
  });

 it('Generate the Error Condition', function(){
	 var myClearAction = keyPadList.get(0); // AC Key action, Clear
	 myClearAction.click();
	 var myEvaluation = keyPadList.get(18); // put in Note what 18 means
	 myEvaluation.click();
     expect(outPutDisplay.get(0).getText()).toBe('ERROR');

 });

	 
	 

// [ 'AC', '±', '%', '÷', '7', '8', '9', '×', '4', '5', '6', '—', '1', '2', '3', '+', '0', '.', '=' ] 
//    0     1    2    3    4    5    6    7    8    9    10   11   12   13   14   15   16   17   18 
it('Activate the Clear Function', function(){
          var myClearAction = keyPadList.get(0); // AC Key action, Clear
          myClearAction.click();
          console.log("Clear Function should show '0' in display");
          browser.sleep(280);
});


// [ 'AC', '±', '%', '÷', '7', '8', '9', '×', '4', '5', '6', '—', '1', '2', '3', '+', '0', '.', '=' ] 
//    0     1    2    3    4    5    6    7    8    9    10   11   12   13   14   15   16   17   18 
it('Add a succession of digits equaling a sum', function(){
	 var myOperation = keyPadList.get(15); //char '+' Addition
	 var myDigit = keyPadList.get(4); // 'digit 7'
	 var myEvaluation = keyPadList.get(18); // equals Sign
	 
	 var myDigit = keyPadList.get(12); // 'digit 1'
	 myDigit.click(); // submit dig 1
	 myOperation.click(); // submit Addition operation

	 var myDigit = keyPadList.get(13); // 'digit 2'
	 myDigit.click();  // submit dig 2
	 myOperation.click(); // submit Addition operation

	 var myDigit = keyPadList.get(14); // 'digit 3'
	 myDigit.click();  // submit dig 3
	 myOperation.click(); // submit Addition operation

	 myEvaluation.click(); // call evaluation equals sign
	 browser.sleep(3800);
	 
	 expect(outPutDisplay.get(0).getText()).toBe('6');
	 console.log("Formula 1 + 2 + 3  Result should be 6");
	 browser.sleep(3800);
});// End of Add a succession

});// end of main Describe Protractor Demo App
