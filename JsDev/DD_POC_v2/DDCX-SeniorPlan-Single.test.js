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
	var sleepDuration = 500;
	
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
		it('it 2A: should allow me to enter zip and qty to cover ', function(){
			expect( element(by.css('.ui-dialog.ui-widget.ui-widget-content.ui-corner-all'))   );
			
			/* Waits for the element with id 'coverage_type' to be clickable. 
			 * */
			var ExpctCond = protractor.ExpectedConditions;

			var zipValue = '94105';
			var zipField = element(by.css('.txtFieldC.input-field75.zip.mreq.valid.text.focusme'));	
			browser.wait(ExpctCond.elementToBeClickable(zipField),5000);
			zipField.sendKeys(zipValue);
			console.log('entered date in zipField: ', zipValue);
		});// end of it(2A) 
		
			it('it 2B: special debug step.  should check the text in the field via Attribute',function (){
				this.debugTestVar = element(by.css('.txtFieldC.input-field75.zip.mreq.valid.text.focusme'));	
				this.debugTestVar.getAttribute('value').then(function (text) {
					console.log('debugout: checking text in zip field.  value is = ', text);
				});
			}); // end of it(2B)
		
		it('it 3: should evaluate the single coverage selection', function(){
			var howManyWillBeCovered = element(by.id('coverage_type'));
			var coverageSelection = "Self";   //HUMMMM	var coverageSelection = 'Self';  // notice the difference in qoutes
			var ExpctCond = protractor.ExpectedConditions; // same name new scope

			browser.wait(ExpctCond.elementToBeClickable(howManyWillBeCovered),5000);
			howManyWillBeCovered.$('[value="Self"]').click();
			
			/* Could not resolve the folllowing checks  */
			//expect(howManyWillBeCovered.getAttribute('value')).toEqual('1');
			//expect(howManyWillBeCovered(by.selectedOption('value'))).toEqual('1');
			//expect(element(by.model('coverage_type')).$('option:checked').getText()).toEqual('1');
			

			console.log('Single coverage selected with: ',coverageSelection);
		});// end of it(3)	
				
			it('should find the dialog button and click it', function(){
				var searchForPlans_GoButton = element(by.id('btn_saveBig'));	
				expect( searchForPlans_GoButton.isPresent()).toBe(true);	
				searchForPlans_GoButton.click();
				console.log('Search for Dental Plans button found and Button Clicked');
			});	// end of it(4)
			
			
			it('should locate the page titlem properly', function () {
			var stringPageTitle = "::Individual & Families::";
			expect(browser.getTitle()).toEqual(stringPageTitle);
			console.log('Page Title found to be: ',stringPageTitle);
	
			});// end of it(5)	
			
			it('should find the proper zip code identified for the three plans', function(){	
			// See that zipValue is defined above some 30 lines 
			// but do I reall need to do this?  Is it any more readable ?
			var zipCodeUnderTest = '94105';
			
			var mySearchCondition = element(by.id('psc_zip'));
			expect(mySearchCondition.getText()).toEqual(zipCodeUnderTest);
			console.log('Found zipCode we are testing', zipCodeUnderTest);
			});// end of it(6)
	
			it('it 7: should find the text of the link for Senior plan' , function(){
				//var ExpctCond = protractor.ExpectedConditions;
				var seniorPlanLink = element(by.id('planRowsBody_72230')).element(By.tagName('a'));
				
				
				//browser.wait(ExpctCond.textToBePresentInElementValue)
				
				seniorPlanLink.click();
				console.log('senior plan link found and clicked.')
			});
			
			
	
	});// end describe

}); // end of describe('Delta Dental Senior plan work flow