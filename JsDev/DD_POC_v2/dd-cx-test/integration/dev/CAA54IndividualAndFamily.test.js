//spec DDCX-SeniorPlan-Single.js
"use strict"
// Todo
/* Get text console.log on every one of the dots in the console 
 *  figure out what the dots actuall mean
 * Figure out It Pers 6 ( second output: mabe I need it pers 6A to resolve this
 * Field validation for every page where there are fields that can be evaluated for correctness
 * 
 */
describe('Delta Dental Senior plan work flow', function() {
	// JavaScriptTheGoodParts.pdf pg25 refs global obj var MYAPP = {};
	// Limit the exposure global vars have 
	var protocol        = "https://"
	var host_dit3 = "dit3";
	var host_mot  = "mot";
	var testServer = host_dit3;// or host_mot
	var testDomain_Name  = "deltadentalins.com";
	var server = "";
	var dit3Url = "https://dit3.deltadentalins.com/";
	var motUrl	= "https://mot.deltadentalins.com/"
	var sleepDuration = 380;// miliseconds 80 < 1/10 of a secondj

	browser.ignoreSynchronization = true;	
	
	beforeAll(function () {
		var url = protocol.concat(testServer, '.', testDomain_Name);
		server = host_dit3;
		browser.get(url );
	});
	
	beforeEach(function(){
		browser.sleep(sleepDuration);
	});

	afterEach(function() {
		//browser.sleep(sleepDuration);
	});
	
	it('it Parent Describe: Senior plan workflow',function(){
		console.log('it Parent Describe Start:  Senior Plan workflow')
	});

	describe('Navigate to the Start page',function(){	
		it('it Nav  1: should land on the dit3 home page', function(){	
			 expect(browser.getCurrentUrl()).toEqual(dit3Url);
			 console.log('it Nav  1: Current URL where we landed is: ',dit3Url)
		});// end it nav 1
	});// end describe(Nav2StartPage)
	
	describe('Start the Plan Selection Process via Get A Quote Button', function() {
		var getAQuote_Button = element(by.css('.button'));
	
		it('it strt 1: should find the Get A Quote button element and activate the button', function(){
			expect(getAQuote_Button.isPresent()).toBe(true);//.then(function()
			getAQuote_Button.click();
			console.log('it strt 1: Found the GetAQuote button and clicked it');
		});// end of it(1)

		it('it strt 2: should find the proper dialog to start the quote process',function(){
			var dlg_SearchForDenPlans = element(by.id('ui-dialog-title-searchQuoteDialog'));
			expect( dlg_SearchForDenPlans.isPresent()).toBe(true);
			console.log('it strt 2: Found the Search for Dental Plans dialog');
		}); //end of it(2)
	
		// seems like this should be broken up
		it('it strt2A: should allow me to enter zip and qty to cover ', function(){
			expect( element(by.css('.ui-dialog.ui-widget.ui-widget-content.ui-corner-all'))   );
			
			/* Waits for the element with id 'coverage_type' to be clickable. 
			 * */
			var ExpctCond = protractor.ExpectedConditions;

			var zipValue = '94105';
			var zipField = element(by.css('.txtFieldC.input-field75.zip.mreq.valid.text.focusme'));	
			browser.wait(ExpctCond.elementToBeClickable(zipField),5000);
			zipField.sendKeys(zipValue);
			console.log('it strt2A: entered date in zipField: ', zipValue);
		});// end of it(2A) 
		
		it('it strt2B: special debug step.  should check the text in the field via Attribute',function (){
			this.debugTestVar = element(by.css('.txtFieldC.input-field75.zip.mreq.valid.text.focusme'));	
			this.debugTestVar.getAttribute('value').then(function (text) {
				console.log('it strt2B: debugout- checking text in zip field.  value is = ', text);
			});// end of this.debugTestVar.getAttrib....
		}); // end of it(2B)
		
		it('it strt 3: should evaluate the single coverage selection', function(){
			var howManyWillBeCovered = element(by.id('coverage_type'));
			var coverageSelection = "Self";   //HUMMMM	var coverageSelection = 'Self';  // notice the difference in qoutes
			var ExpctCond = protractor.ExpectedConditions; // same name new scope

			browser.wait(ExpctCond.elementToBeClickable(howManyWillBeCovered),5000);
			howManyWillBeCovered.$('[value="Self"]').click();
			
			/* Could not resolve the folllowing checks  */
			//expect(howManyWillBeCovered.getAttribute('value')).toEqual('1');
			//expect(howManyWillBeCovered(by.selectedOption('value'))).toEqual('1');
			//expect(element(by.model('coverage_type')).$('option:checked').getText()).toEqual('1');
			console.log('it strt 3: Single coverage selected with: ',coverageSelection);
		});// end of it(3)	
				
		it('it strt 4: should find the dialog button and click it', function(){
			var searchForPlans_GoButton = element(by.id('btn_saveBig'));	
			expect( searchForPlans_GoButton.isPresent()).toBe(true);	
			searchForPlans_GoButton.click();
			console.log('it strt 4: Search for Dental Plans button found and Button Clicked');
		});	// end of it(4)
			
			
		it('it strt 5: should locate the page titlem properly', function () {
			var stringPageTitle = "::Individual & Families::";
			expect(browser.getTitle()).toEqual(stringPageTitle);
			console.log('it strt 5: Page Title found to be: ',stringPageTitle);
		});// end of it(5)	
			
		it('it strt 5: should find the proper zip code identified for the three plans', function(){	
			// See that zipValue is defined above some 30 lines 
			// but do I reall need to do this?  Is it any more readable ?
			var zipCodeUnderTest = '94105';
			var mySearchCondition = element(by.id('psc_zip'));
			
			expect(mySearchCondition.getText()).toEqual(zipCodeUnderTest);
			console.log('it strt 6: Found zipCode we are testing', zipCodeUnderTest);
		});// end of it(6)
	
	//	it('it strt 7: should find the text of the link for Senior plan' , function(){
		it('it strt 7: should find the text of the link for Individual/Family Dental Protram' , function(){

			//  Previous Idea I think.... not usedvar ExpctCond = protractor.ExpectedConditions;
			//var seniorPlanLink = element(by.id('planRowsBody_72230')).element(By.tagName('a'));
			var seniorPlanLink = element(by.id('planRowsBody_70424')).element(By.tagName('a'));
			
			/* as much as I would like to zero in exactly on the link.....  *s
			 * the following srPlnLink definition is not finding the link to click
			 */
//var seniorPlanLink = element(by.cssContainingText('.planDetails','DeltaCare®  USA CAA50 Senior Dental Program')).element(By.tagName('a'));
// Senior Plan CAA50 was deleted by Product Management
			
			//browser.wait(ExpctCond.textToBePresentInElementValue)
			
			seniorPlanLink.click();
//			console.log('it strt 7: senior plan link found and clicked.');// senior Plan depracated
			console.log('it strt 7: Individual/Family Dental Program link found and clicked.');
		
			//browser.pause();
		});
			
		it('it strt 8: should evaluate page correctness before clicking the button', function(){
			// left as an exercise to complete.
			// evaluate page correctness
			var enrollButton = element(by.cssContainingText('.enrollBtn', 'Enroll'));
			enrollButton.click();
			console.log('it strt 8: Enroll Button found and clicked.');

		}); // end of it 8
		
//		it('it strt 9: should evaluate the landing page', function(){
//			var pageTitleString = 'Personal Info | Enrollment | Delta Dental Insurance Company';
//			expect(browser.getTitle()).toEqual(pageTitleString);
//			console.log('it strt 9: landed on page: ',pageTitleString );	
//			//browser.pause();
//		});  // end of it 9
	
	});// end describe('Start the Plan Selection Processh
	
	describe('Personal Info Page, preValidate(), fillOut(), postValidate()', function(){
		it('it Pers 0: Personal Info Page validation',function(){
			var pageTitleString = 'Personal Info | Enrollment | Delta Dental Insurance Company';
			expect(browser.getTitle()).toEqual(pageTitleString);
			console.log('it strt 9: landed on page: ',pageTitleString );	
//			console.log('it Pers 0: output.....');
		});
			var fieldFirstName		= element(by.id('firstName'));
			var fieldMidInitial		= element(by.id('lastName'));
			var fieldLastName		= element(by.id('lastName'));
			var fieldGenderSelect	= element(by.id('gender'));
			var fieldBdMM			= element(by.id('month'));
			var fieldBdDD			= element(by.id('day'));
			var fieldBdYyyy			= element(by.id('year'));
			var fieldSsn			= element(by.id('ssn'));
			var fieldHomeAddr		= element(by.id('streetAddress'));
			var fieldCity			= element(by.id('city'));
			var fieldState			= element(by.id('state'));
			var fieldZipCode		= element(by.id('zipCode'));
			var chkBoxDiffMailAddr	= element(by.id('diffmail'));
			var fieldPhoneSelect	= element(by.id('contactType'));
			var fieldPhoneNumber	= element(by.id('contactNumber'));
			var fieldEmailAddr		= element(by.id('email'));
			var chkBoxPaperless		= element(by.id('paperless'));
			var RadBtnBrokerYes		= element(by.id('brokerYes'));
			var RadBtnBrokerNo		= element(by.id('brokerNo'));
			var linkBackToQuote		= element(by.id('backToQuote'));
			var persPageButtonNext	= element(by.id('nextButton'));
	/************************************************************************/	
	/**   Right after State and zipCode are the following hidden fields  ****/	
	/************************************************************************/	
			var hiddenfieldMailAddr	= element(by.id('mailingAddress'));
			var hiddenfieldCity		= element(by.id('mailingCity'));
			var hiddenfieldState	= element(by.id('mailingState'));
			var hiddenfieldZipCode	= element(by.id('mailingZipCode'));
		
	/************************************************************************/	
	/**   Right after email and paperless, there is the broker buttons   ****/	
	/************************************************************************/	
			var hiddenfieldBrokerNum=element(by.id('brokerNumber'));
			
		it('it pers 1: should evaluate details on the pers Info Page ', function(){
			/* this test is and the definitions in the describe are the 
			 * kind of things that should be going in the page object model testing  
			 * *************************************************************************/
				expect(fieldFirstName.isDisplayed())	.toBe(true);
				expect(fieldMidInitial.isDisplayed())	.toBe(true);
				expect(fieldLastName.isDisplayed())		.toBe(true);
				expect(fieldGenderSelect.isDisplayed())	.toBe(true);
				expect(fieldBdMM.isDisplayed())			.toBe(true);
				expect(fieldBdDD.isDisplayed())			.toBe(true);
				expect(fieldBdYyyy.isDisplayed())		.toBe(true);
				expect(fieldSsn.isDisplayed())			.toBe(true);
				
				expect(fieldHomeAddr.isDisplayed())		.toBe(true);
				expect(fieldCity.isDisplayed())			.toBe(true);
				expect(fieldState.isDisplayed())		.toBe(true);
				expect(fieldZipCode.isDisplayed())		.toBe(true);
				
				expect(chkBoxDiffMailAddr.isDisplayed()).toBe(true);
			
				expect(fieldPhoneSelect.isDisplayed()).toBe(true);
				expect(fieldPhoneNumber.isDisplayed()).toBe(true);
				expect(fieldEmailAddr.isDisplayed()).toBe(true);
				expect(chkBoxPaperless.isDisplayed()).toBe(true);
				expect(RadBtnBrokerYes.isDisplayed()).toBe(true);
				expect(RadBtnBrokerNo.isDisplayed()).toBe(true);
				expect(linkBackToQuote.isDisplayed()).toBe(true);
				expect(persPageButtonNext.isDisplayed()).toBe(true);
				console.log('it pers 1: Just did an expect on evey currently visable element on the page');
				//console.log('well almost every element.  Need to eval the hidden addredd');
				//console.log('thest last two lines are notes for ToDo.....');
		});// end of it pers 1
		
		it('it pers 2, should Allow Data entry for the fields under test ', function(){
			var genderStringValue = "Non Binary";
			var phoneTypeSelect = "Home";
			fieldFirstName.sendKeys('TestFirstName');
			fieldLastName.sendKeys('LastNameTest');

			/*Gender Drop down next*/
			element(by.cssContainingText('option', genderStringValue)).click();
			
			fieldBdMM.sendKeys('06');
			fieldBdDD.sendKeys('22');
			fieldBdYyyy.sendKeys('1982');
			
			fieldSsn.sendKeys('587459329')
			fieldHomeAddr.sendKeys('100 First Street Floor 4');
	// Loose focus and I need to do some check  
	// Maybe her's where It pers 2 ends and it pers 3 starts ??? 
			
			fieldCity.sendKeys('San Francisco');
	// check value fieldState.sendKeys('');
	// check value fieldZipCode
			
			fieldPhoneSelect.$('[value="HOME"]').click();
			fieldPhoneNumber.sendKeys('4155551212');

			
		browser.sleep(8000)	;
			
			
			
			fieldEmailAddr.sendKeys('idString@someDomain.net')
		// could do a whole bunch of expect(element.toHaveSomeValues).toBe(true);
			console.log('it pers 2: finished2,No3: currently NO EVALUATION of 2 .... FIX THAT !!!')

		});// end of it pers 2 
	
		
		it('it pers 4: should eval mailing address entry',function(){
			
		// this is a test:  Do we now get access to the hidden fields below ??	
		// looks like we're keeping it
			element(by.name('diffMail')).isSelected().then(function(selected) {
			    if (selected) {
			        element(by.name('diffMail')).click();// to Un Select
			    }
			});

			hiddenfieldMailAddr.sendKeys('100 First Street Floor 4');
	
		/* *** As focus is lost, there is an AJAX event right here      */
			hiddenfieldCity.sendKeys('San Francisco');  // this just likely a check
//			hiddenfieldState.sendKeys('California');// this just likely a check
			hiddenfieldState.sendKeys('CA');// this just likely a check
			hiddenfieldZipCode.sendKeys('94105');// this just likely a check
			
			console.log('it pers 4: completed the hidden fields after clicking diffMail');
		}); // end of it pers 4
		
		it('it pers 5: should access & validate the broker selection and entry ',function (){
			if (chkBoxPaperless.isSelected()){
				chkBoxPaperless.isSelected().click();
				console.log('it pers 5: paperless was selected. Clicked it to unselect');
			}else{
				console.log('it pers 5: there was some prblem unselecting the paperless checkbox');
			}
		}); // end of it pers 5
	
		
		xit('it pers6A: should validate BNO is selected and clicks BYES to enable BNUM', function(){
			//expect(element(by.id('brokerNo')).isSelected()).toBe(true);
			if ( RadBtnBrokerNo.isSelected() ) {
				RadBtnBrokerYes.click();
				console.log('it pers6A: found brokerNo, switched to brokerYes!');
			}else{
				console.log('it pers6A: did not find BrokerNo. So, it was not switched to Yes');
			}
		});// end it pers 6A
			
		xit('it pers6B: should newly visable fields, enter BNUM and click next', function(){
			
			if ( hiddenfieldBrokerNum.isDisplayed() ) {
				hiddenfieldBrokerNum.sendKeys('2012836');
//				expect(hiddenfieldBrokerNum.isDisplayed());
//				hiddenfieldBrokerNum.sendKeys('2012836');
				console.log('it pers6B: hiddenfieldBrokerNum was displayed BNUM entered');
			}else{
				console.log('it pers6B: hiddenfieldBrokerNum Was Not Displayed. NoBroker num Entered');
			}
		});// end of it Pers6B
		
		xit('it pers6C: Evaluate all field correctness, find the Next button, click it',function(){
			var text1 = "TestFirstName";
			var protVarBrokerName = 'CHARLES DARROW';
			var testErrorString ='antidisestabilshment';// use of this needs to be completed.
			
			chkBoxPaperless.click();
			chkBoxPaperless.click();

			
			var elementBrokerName = element(by.id('brokerName'));
//			el.getAttribute('value').then(function(text){
//				console.log(text);
//			});
			
			elementBrokerName.getAttribute('value').then( function(text){
				if(text === protVarBrokerName){
					console.log('it pers6C: Broker Name field contains',protVarBrokerName);
				}else{
					console.log('it pers6C: Error, expected: ' ,protVarBrokerName,' found: ', text, ' anthing there ???');
				}
			});
			expect(elementBrokerName.getAttribute('value')).toEqual(protVarBrokerName);

	//		expect(elementBrokerName.getAttribute('value')).toEqual('');
			/* 
			 * When the broker service is broken and doesn't return a value
			 * Then the line above searching for null('')String passes
			 *  */
		});
	
	it('it pers 7:',function (){
		if(persPageButtonNext.isDisplayed()){
			persPageButtonNext.click();
			console.log('it pers 7: Last thing: Page button found and clicked....');
		}
		browser.sleep(15000);	
		

		});// end of it pers 7
	});// end describe personal info page.

// I need to put in a dependent page click Next .  No dependent
	// this becasue they killed the senior plan
	
	
	describe('Facilities Page, expect-wait, Select(), Submit()', function(){	
		// TO DO:  field validation for where ever it there
		// Intent is to mimic the approach used on the personal info page
		var ExpctCond = protractor.ExpectedConditions;
		
		it('it facs 1: use expected condition to let the page stabilize Test 1', function() {
			browser.wait(ExpctCond.visibilityOf($('#search-facilities')),5000);
			console.log('it facs 1: Exactly like the visibilityOf Example');
		});// end of it facs 1
	
		it('it facs 2: use expected condition to let the page stabilize Test 2', function() {
			browser.wait(ExpctCond.elementToBeClickable($('#search-facilities')),5000);
			console.log('it facs 2: Exactly like the element to be clickable example');
			
			browser.sleep(500);
		});// end of it facs 2
		
		//it should evaluate to the facilities page "title" , function() { });
		//"Facilities | Enrollment | Delta Dental Insurance Company"
		// Not doing this right now, maybe never..............................
		
		it('it facs 3: should find a radio button and select it', function(){
			var GengleDentalSanFrancisc = 'DC144101';// last one on default generated list
			var facilitiesToSelectBtn = element(by.id(GengleDentalSanFrancisc));  // DC055237 is not visible default
			
			browser.wait(ExpctCond.visibilityOf(facilitiesToSelectBtn),5000)
			if (facilitiesToSelectBtn.isDisplayed()){
					facilitiesToSelectBtn.click();
					console.log('it facs 3: The Facilities button was found and click()');
			}else{
				console.log('it facs 3: The radio button to pick was not Diaplayed');
			}

		});// end of it facs 3
	
	/* *******************************************
	 * There is un finished work below
	 * Navigating to the More Link is not yet done
	 **********************************************/	
		it('it facs 4: select the link More( down arrow to display hidden info )', function() {
			console.log('it facs 4: In order to get the more info part of my selection \
					http://stackoverflow.com/questions/21237976/how-to-get-the-parent-of-an-element \
					http://stackoverflow.com/questions/23720398/protractor-how-to-locate-a-sibling-of-a-given-element \
					http://stackoverflow.com/questions/25390171/protractor-select-next-sibling-of-the-current-element ');
			
			browser.sleep(500);
		});// end of it facs 4	
		
		it('it facs 5: find the next button and click()', function() {
			var facsNextButton = element(by.id('nextButton'));
			
			if (facsNextButton.isDisplayed()){
				facsNextButton.click();
				console.log('it facs 5: Facilities page finished. Next button clicked')
			}else{
				console.log('it facs 5: facsNextButton.isDisplayed in order to click() failed');
			}
			browser.sleep(5000);
		});// end of it facs 5
	}); // end of describe Facilities Page
	
	describe('Payment Information page', function(){
		// TO DO: Field validation like the personal info page
		var ExpctCond = protractor.ExpectedConditions;
		
		it('it Pmnt1A: Use Expected Condtion to leat page stabilize3', function() {
			browser.wait(ExpctCond.visibilityOf($('#cardName')),8500); // ie: element(by.id('cardName')
			console.log('it Pmnt1A: #cardName Exactly like the visibilityOf Example');
		});// end of it Pmnt1A
		
		it('it Pmnt1B: Use Expected Condtion to leat page stabilize3', function() {
			browser.wait(ExpctCond.visibilityOf($('#nextButton')),8500);// ie: element(by.id('nextButton')
			console.log('it Pmnt1B: #nextButton Exactly like the visibilityOf Example');
		});// end of it Pmnt 1B

	
		/* **************************
		 *  Ok important point.
		 *  I've decided that I don't need to check my input values, and so There needs to be a 
		 *  TODO to remove all input checks,  
		 *  But  I must validate all input values where ever they are displayed 
		 *  at the final stages of a workflow.
		 *  */
		
		it('it Pmnt 2: Should all basic personal info data ', function (){
			var stringCardText 	= 'FnOneHundredAnd LnThirtyFiveDollars' ;
			var testErrorString	= 'bla bla bla'
			var cCardField		= element(by.id('cardName'));

			//element(by.id('cardName')).sendKeys(stringCardName);
			cCardField.sendKeys(stringCardText);
			//el.getAttribute('value').then(function (text){
			cCardField.getAttribute('value').then(function (text){
				if(text === stringCardText) {
					console.log('it Pmnt 2: Card Name was found to equal', stringCardText);
				}else{
					console.log('it Pmnt 2: Error, did not find ', stringCardText);
				}
			
				expect(cCardField.getAttribute('value')).toEqual(stringCardText);
			});
		});

		it('it Pmnt 3A: Should find and fill out the card number', function(){
			var visaCardNumberFor00CentsString	= '4121630071281885';
			var amexCardnumberFor80CentsString	= '370000999999990';
			var testCard = amexCardnumberFor80CentsString;	
			//var testCard = visaCardNumberFor00CentsString;	
			element(by.id('ccCapture')).sendKeys(testCard);
			console.log('it Pmnt3A:',testCard, 'for payment $$$.00  entered.')
		});
		
		it('it Pmnt 3B: Should find and fill out the card expiration', function(){
			var mmCardExpString = '12';
			var yyyyCardExpString = '2017';
			
			element(by.id('expMo')).sendKeys(mmCardExpString);
			element(by.id('expYr')).sendKeys(yyyyCardExpString);
			console.log('it Pmnt3B: Month and Year Card Expiration entered')
			
		});
		it('it Pmnt 3C: Should find and fill out the card security code', function(){
			var securityCodeString = '314' ;  // 3 chars ( any dig ) for non Amex sec code
			element(by.id('cvcCapture')).sendKeys(securityCodeString);
			console.log('it Pmnt3C: security code entered')
		});
		
		
		it('it Pmnt 4: Should find sameBillingCheckbox checked and validate address ', function(){
			var sameBillingCheckBox		= element(by.id('sameBilling'));
			
		////////////////   expiriment  to send TAB  //////////////////////
			
			var myAction = browser.actions().sendkeys(protractor.Key.TAB);
			myAction.perform();
			myAction.perform();
			myAction.perform();
			

		/* The following section is a test action to setup detecting if the button is clicked
		 * In this work flow we want the check box checked. currently it is checked by default,
		 * The check below will handle if the default changes. 
		 * */	
//			browser.sleep(4000);
//			console.log('Hey !!!!!!!!!!!!!!!!!! ');
//			browser.sleep(1000);
//			sameBillingCheckBox.click();
//			browser.sleep(1000);
//			element(by.id('ccCapture')).click();
//			browser.sleep(4000);
		
			element(by.id('sameBilling')).getAttribute('checked').then(function(checked){
			if (!checked){
				/*  browser.sleep(3000);  */
				sameBillingCheckBox.click();
				console.log('it Pmnt 4: detected NOT Checked. clicking')
			}else{
				console.log('it Pmnt 4: detected default selected(-checked-) condition on Billing is Same Address ');
			}
			
			//expect(element(by.id('sameBilling'))).toBe('checked');
			expect(sameBillingCheckBox.isSelected()).toBe(true);
			
			}); // end of if(!selected)
		
			 
		});// end of it Pmnt 4
	
		
		it('it Pmnt 5: Should Validate the Streen Address fields for Billing Address', function(){
			// Should make these globals that are captured after enter and loose focus
			var sameBillingStAddrString		= '100 1st St Fl 4';
			var billingStreetAddrField		= element(by.id('sb_street'));
		
//			billingStreetAddrField.getAttribute('value').then( function (stAddrText){
			billingStreetAddrField.getText().then( function (stAddrText){
				if(stAddrText === sameBillingStAddrString ){
					console.log('it Pmnt 5: Street Address validation correct');
				}else{
					console.log('it Pmnt 5: Street Address FAILED validation ',stAddrText );
				} // end if
			}); // end function (stAddrText)
		});// end of it Pmnt 5
		
		it('it Pmnt 6: Should Validate the City State Zip Address fields for Billing Address', function(){
			// Should make these globals that are captured after enter and loose focus
			var sameBillingLocalString		= 'San Francisco, CA 94105';
			var billingCityStZipField		= element(by.id('sb_locality'));

		
//			billingCityStZipField.getAttribute('value').then( function (localityText){
			billingCityStZipField.getText().then( function (localityText){
				if(localityText === sameBillingLocalString ){
					console.log('it Pmnt 6: Street Address validation correct');
				}else{
					console.log('it Pmnt 6: Street Address FAILED validation ', localityText);
				} // end if
			}); // end function (stAddrText)
		
		});// end of it Pmnt 6
		
		it('it Pmnt 7: Should find the Auth Check Box and click it', function(){
//			var authChkBox	= element(by.id('auth'));
			var authChkBox	= element(by.css('input[id="auth"]'));
			
			authChkBox.click();
			authChkBox.click();
			authChkBox.click();

//			authChkBox.getAttribute('checked').then( function (checked){
			element(by.css('input[id="auth"]')).getAttribute('checked').then( function (checked){
				if (!checked){
					authChkBox.click();
					authChkBox.click();
					authChkBox.click();
					expect(authChkBox.isSelected()).toBe(true);
					console.log('it Pmnt 7: Auth Chk NOT Checked . Clicked.  Then Expect it is checked');
				}else {
					console.log('it Pmnt 7: Auth Chk WAS ALREADY Selected !!!! ?????')
					
				}
			});
			
		expect(element(by.id('auth')).isSelected()).toBeTruthy();
			console.log('console logging: it Pmnt 7');
		browser.sleep(250);
		process.exit(1);
			
		});	// end of it Pmnt 7:
		
	});

//	console.log('end of encompasing describe.  Done !')  // Curiously found that this runs and outputs FIRST !!

}); // end of describe('Delta Dental Senior plan work flow