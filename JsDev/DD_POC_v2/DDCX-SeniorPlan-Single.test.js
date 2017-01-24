//spec DDCX-SeniorPlan-Single.js
"use strict"

describe('Delta Dental Senior plan work flow', function() {
	// JavaScriptTheGoodParts.pdf pg25 refs global obj var MYAPP = {};
	// Limit the exposure global vars have 
	var protocol        = "https://"
	var host_dit3 = "dit3";
	var host_mot  = "mot";
	var testDomain_Name  = "deltadentalins.com";
	var server = "";
	var dit3Url = "https://dit3.deltadentalins.com/";
	var sleepDuration = 1500;
	
	beforeAll(function () {
		//var url = protocol.concat(host_mot, '.', testDomain_Name);
		var url = protocol.concat(host_dit3, '.', testDomain_Name);
		server = host_dit3;
		browser.get(url );
	});
	
	afterEach(function() {
		browser.sleep(sleepDuration);
	});


	describe('Navigate to the Start page',function(){	
		it('should land on the dit3 home page', function(){	
			 expect(browser.getCurrentUrl()).toEqual(dit3Url);
			 console.log('Current URL where we landed is: ',dit3Url)
		});
	});
	
	describe('Start the Quote Process via Get A Quote Button', function() {
		var getAQuote_Button = element(by.css('.button'));
	
		it('should find the Get A Quote button element and activate the button', function(){
			expect(getAQuote_Button.isPresent()).toBe(true);//.then(function()
			getAQuote_Button.click();
			console.log('Found the GetAQuote button and clicked it');
			
			
		});// end of it(1)

		it('should find the proper dialog to start the quote process',function(){
			var dlg_SearchForDenPlans = element(by.id('ui-dialog-title-searchQuoteDialog'));
			expect( dlg_SearchForDenPlans.isPresent()).toBe(true);
			console.log('Found the Search for Dental Plans dialog');
			
		}); //end of it(2)
	
		// seems like this should be broken up
		it('should allow me to enter zip and qty to cover ', function(){
			expect( element(by.css('.ui-dialog.ui-widget.ui-widget-content.ui-corner-all'))   );
			
			var ExpctCond = protractor.ExpectedConditions;

			var zipValue = '94105';
			var zipField = element(by.css('.txtFieldC.input-field75.zip.mreq.valid.text.focusme'));	
			browser.wait(ExpctCond.elementToBeClickable(zipField),5000);
			zipField.sendKeys(zipValue);
			
		
			this.debugTestVar = element(by.css('.txtFieldC.input-field75.zip.mreq.valid.text.focusme'));	
			//console.log('debugTestVarVaue via Attribute is: ', debugTestVar.getAttribute('value'))

			//this.debugTestVar.getText().then(function (text) {
			this.debugTestVar.getAttribute('value').then(function (text) {
				console.log('the zip field text is = ', text);
			});
			
		
			
			////if (this.debugTestVar.getText(zipValue))
			//if (this.debugTestVar.getAttribute('value').toEqual('94949'))
			//	console.log('Woot^3 ',zipValue);
			//else console.log('fudderupper. We did not get a proper zip code');
	
			
		//	expect(debugTestVar.getText()).toEqual('94105');
		//	console.log('zip Code Entered and checked to be: ', '94105');
		
			
			var howManyWillBeCovered = element(by.id('coverage_type'));
			var coverageSelection = "Self";   //HUMMMM	var coverageSelection = 'Self';  // notice the difference in qoutes
		
			/* Waits for the element with id 'coverage_type' to be clickable. 
			 * */
			browser.wait(ExpctCond.elementToBeClickable(howManyWillBeCovered),5000);
			howManyWillBeCovered.$('[value="Self"]').click();
			/* the following is done wrong. HowManyCovered represents a list
			expect(howManyWillBeCovered.getText()).toEqual('1'); */

			console.log('Single coverage selected with: ',coverageSelection);
		
				
			//it('should find the dialog button and click it', function(){
				var searchForPlans_GoButton = element(by.id('btn_saveBig'));	
				searchForPlans_GoButton.click();
				console.log('Search for Dental Plans button found and Button Clicked');
		//	});

			//expect( 
			//expect link to Senior is visable
			// expect I landed on a page with title  ::Individual & Families::.
			// expect Dental plans for 94105  Var I have !
			// Expect Link with text USA CAA50 Senior Dental 
			var stringPageTitle = "::Individual & Families::";
			expect(browser.getTitle()).toEqual(stringPageTitle);
			console.log('Page Title found to be: ',stringPageTitle);
	
		
			// See that zipValue is defined above some 30 lines 
			// but do I reall need to do this?  Is it any more readable ?
			var zipCodeUnderTest = zipValue;
			
			var mySearchCondition = element(by.id('psc_zip'));
			expect(mySearchCondition.getText()).toEqual(zipValue);
			console.log('Found zipCode we are testing', zipCodeUnderTest);
			
			//browser.pause();	

			
			
		});// end of it(3)
	});// end describe

}); // end of describe('Delta Dental Senior plan work flow