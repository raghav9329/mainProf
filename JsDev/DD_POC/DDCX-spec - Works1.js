// spec.jsG

describe('Protractor Demo App', function() {


  browser.ignoreSynchronization = true;
 // var getAQuoteButton = element(by.css('.button'));
  var zipField = element(by.id("zip"));
  var howManyWillBeCovered = element(by.id('coverage_type'));
  var commitSearch4Plans_go = element(by.id('btn_saveBig'));
  var firstEnrollButton = element(by.id('applyQuotesPage'));

//  var eightKeyPressed = element.all(by.css('.calculator-keypad div')).filter(function(elem, index) {
//	  return elem.getText().then(function(text)){
//		  return text === '8';
//	  }); }).first().click();

// onPrepare: 

  beforeEach(function() {
    //recho "Second Echo stmt added... first below in src"
    //console.log("Output: beforeEach(function()...  Also call made to URL prot-demo");
    browser.get('http://dit3.deltadentalins.com/');
  });
  
  afterEach(function() {
  //  browser.pause();
  //  console.log("Output: browser.sleep(300)" );
    browser.sleep(450);
  });
  
  it('should have a title', function() {
    expect(browser.getTitle()).toEqual('Delta Dental Insurance');
    console.log("getTitle = Delta Dental Insurance")
  });

  it('should find GetAQuote & open dlg for zip, num covered and go to quotes', function() {
		// var getAQuoteButton = element(by.css('.button'));
		//browser.sleep(250);
		
		//expect(getAhhQuoteButton.getText()).toEqual('Get A Quote');
		// the following technique for getting the button text and checking it
		// was from 
		//http://stackoverflow.com/questions/30702111/getting-the-button-text-in-protractor
		this.gAQ_button = element(by.css('.button'));
		
		this.gAQ_button.getText().then(function (text) {
			console.log('button text is = ', text);
		});
		
		if (this.gAQ_button.getText('Get A Quote'))
			this.gAQ_button.click();
		
		
		//getAQuoteButton.click();
		
		browser.sleep(450);
		zipField.sendKeys("94949");
		browser.sleep(150);
		howManyWillBeCovered.sendKeys("2");
		commitSearch4Plans_go.click();
		browser.sleep(850);
		
		this.enrol1_button = element(by.css('.primaryBtn '));
		
		this.enrol1_button.getText().then(function (text) {
			console.log('button text is = ', text);
		});
		
		if (this.enrol1_button.getText('Enroll'))
			this.enrol1_button.click();	
		
		browser.sleep(14450);
		
  });
  
/*
   it('should have a title', function() {
    expect(browser.getTitle()).toEqual('Individual & Families');
    console.log("Individual & Families page");
  });
  
*/
  

	it('it should nav to the zip&dependents dlg  ', function(){
		// check for proper title - but not right now

		browser.sleep(4450);

	});


});// end of main Describe Protractor Demo Appi

