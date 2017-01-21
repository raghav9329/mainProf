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
			if (server === host_dit3){
				if (expect(browser.getCurrentUrl()).toEqual(dit3Url))
					console.log('landed on DIT3 server');
			}else{
				console.log('guess we diddnt eval the URL correctly');
			}
		});
	});
	
	
	describe('Start the Quote Process via Get A Quote Button', function() {
		var getAQuote_Button = element(by.css('.button'));
	
		it('should find the Get A Quote button element and activate the button', function(){
			expect(getAQuote_Button.isPresent()).toBe(true);//.then(function()
			getAQuote_Button.click();
			console.log('Found the GetAQuote button and clicked it');
			
/*		it('should find the Get A Quote button element and activate the button', function(){
			if ( expect(getAQuote_Button.isPresent()).toBe(true) ){
				getAQuote_Button.click();
			} else {
				console.log('Initial Failure, Get A Quote button not found');
				getAQuote_Button.click();
				browser.pause();
			}	
*/			
		});// end of it(1)

		it('should find the proper dialog to start the quote process',function(){
			var dlg_SearchForDenPlans = element(by.id('ui-dialog-title-searchQuoteDialog'));
			expect( dlg_SearchForDenPlans.isPresent()).toBe(true);
			console.log('Found the Search for Dental Plans dialog');
			
		}); //end of it(2)
	
		// seems like this should be broken up
		it('should allow me to enter zip and qty to cover ', function(){
			expect( element(by.css('.ui-dialog.ui-widget.ui-widget-content.ui-corner-all'))   );
			var zipField = element(by.css('.txtFieldC.input-field75.zip.mreq.valid.text.focusme'));
			var howManyWillBeCovered = element(by.id('coverage_type'));
			var searchForPlans_Go = element(by.id('btn_saveBig'));
			var zipValue = "94105";
			var coverageSelection = "Self";
			
			zipField.sendKeys(zipValue);
			console.log('zip Code Entered: ', zipValue);
			
			var qtyDropDown = protractor.ExpectedConditions;
			// Waits for the element with id 'coverage_type' to be clickable.
			                   //browser.wait(qtyDropDown.elementToBeClickable($('coverage_type')),5000);
			browser.wait(qtyDropDown.elementToBeClickable(howManyWillBeCovered),5000);
		                      //browser.sleep(150);	
			                   //howManyWillBeCovered.$('[value = coverageSelection]').click();
			howManyWillBeCovered.$('[value="Self"]').click();
			console.log('Single coverage selected with: ',coverageSelection);
			
			searchForPlans_Go.click();
			console.log('Search for Dental Plans filed out Button Clicked');

			//expect( 
			//expect link to Senior is visable
			
			
			
			browser.pause();	
		});// end of it(3)
	});// end describe

}); // end of describe('Delta Dental Senior plan work flow