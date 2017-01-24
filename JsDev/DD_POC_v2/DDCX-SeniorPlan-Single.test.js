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
	var sleepDuration = 240;
	
	beforeAll(function () {
		//var url = protocol.concat(host_mot, '.', testDomain_Name);
		var url = protocol.concat(host_dit3, '.', testDomain_Name);
		server = host_dit3;
		browser.get(url );
	});
	
	beforeEach(function(){
		browser.sleep(sleepDuration);
	});

	afterEach(function() {
		//browser.sleep(sleepDuration);
	});


describe('Navigate to the Start page',function(){	
		it('should land on the dit3 home page', function(){	
			 expect(browser.getCurrentUrl()).toEqual(dit3Url);
			 console.log('Current URL where we landed is: ',dit3Url)
		});
	});// end describe(Nav2StartPage)
	
	describe('Start the Plan Selection Process via Get A Quote Button', function() {
		var getAQuote_Button = element(by.css('.button'));
	
		it('should find the Get A Quote button element and activate the button', function(){
			expect(getAQuote_Button.isPresent()).toBe(true);//.then(function()
			getAQuote_Button.click();
			console.log('Found the GetAQuote button and clicked it');
		});// end of it(1)

		it('it 2: should find the proper dialog to start the quote process',function(){
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
			});// end of this.debugTestVar.getAttrib....
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
				
		it('it:4 should find the dialog button and click it', function(){
			var searchForPlans_GoButton = element(by.id('btn_saveBig'));	
			expect( searchForPlans_GoButton.isPresent()).toBe(true);	
			searchForPlans_GoButton.click();
			console.log('Search for Dental Plans button found and Button Clicked');
		});	// end of it(4)
			
			
		it('it:5 should locate the page titlem properly', function () {
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
			//  Previous Idea I think.... not usedvar ExpctCond = protractor.ExpectedConditions;
			var seniorPlanLink = element(by.id('planRowsBody_72230')).element(By.tagName('a'));
			
			/* as much as I would like to zero in exactly on the link.....  *s
			 * the following srPlnLink definition is not finding the link to click
			 */
			//var seniorPlanLink = element(by.cssContainingText('.planDetails','DeltaCare®  USA CAA50 Senior Dental Program')).element(By.tagName('a'));
			
			//browser.wait(ExpctCond.textToBePresentInElementValue)
			
			seniorPlanLink.click();
			console.log('senior plan link found and clicked.');
		
			//browser.pause();
		});
			
		it('it 8: should evaluate page correctness before clicking the button', function(){
			// left as an exercise to complete.
			// evaluate page correctness
			var enrollButton = element(by.cssContainingText('.enrollBtn', 'Enroll'));
			enrollButton.click();
			console.log('Enroll Button found and clicked.');

		}); // end of it 8
		
		it('it 9: should evaluate the landing page', function(){
			var pageTitleString = 'Personal Info | Enrollment | Delta Dental Insurance Company';
			expect(browser.getTitle()).toEqual(pageTitleString);
			console.log('got to page: ',pageTitleString );	
			//browser.pause();
		});  // end of it 9
	
	});// end describe('Start the Plan Selection Processh
	
	describe('Personal Info Page, preValidate(), fillOut(), postValidate()', function(){
		
			var fieldFirstName		= element(by.id('firstName'));
			var fieldMidInitial		= '';
			var fieldLastName		= '';
			var fieldGenderSelect	= '';
			var fieldBdMM			='';
			var fieldBdDD			= '';
			var fieldBdYyyy			= '';
			var fieldSsn			= '';
			var fieldHomeAddr		= '';
			var fieldCity			= '';
			var fieldState			= '';
			var fieldZipCode		= '';
			var fieldPhoneSelect	= '';
			var fieldPhoneNumber	= '';
			var fieldEmailAddr		= '';
			var chkBoxPaperless		= '';
			var RadBtnBrokerY		= '';
			var RadBtnBrokerN		= '';
			var linkBackToQuote		= '';
			var PageButtonNext		= '';
			
		it('should evaluate details on the pers Info Page ', function(){
			
			
			
			
		});

	});// end describe personal info page.
	

}); // end of describe('Delta Dental Senior plan work flow