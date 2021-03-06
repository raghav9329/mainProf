//spec CAA55SimplePlan_WasSenior.test.js
// A copy of CAA50Senior_Single.test.js was made here
// this most simple of chages will be applied so that it will run
// in the CA55 Plan .  Click submit on the dependents page.
// 2/22/17 current execution method
// Execution: called from protractor-ch_ff-CAA55SimpleWasSr.conf.js
// command line: 
"use strict"

	var protocol        = "https://"
	var host_dit3 = "dit3";
	var host_mot  = "mot";
	var testDomain_Name  = "deltadentalins.com";
	var server = "";
	var dit3Url = "https://dit3.deltadentalins.com/";
	var motUrl	= "https://mot.deltadentalins.com/"
	var sleepDuration = 380;// miliseconds 80 < 1/10 of a secondj
//	var sleepDuration = 1380;// miliseconds 80 < 1/10 of a secondj

	browser.ignoreSynchronization = true;	
	
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
		//no-opp
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
		
		
		

//		it('it strt 2: should find the proper dialog to start the quote process',function(){
//		 //	var dlg_SearchForDenPlans = element(by.id('ui-dialog-title-searchQuoteDialog'));
//		 // 2/13/17 the code changed under us without notificaiton.
//
//			var dlg_SearchForDenPlans = element(by.id('ui-dialog-title-searchQuoteDialog'));
//		 //	XXvar dlg_SearchForDenPlans = element(by.id('searchQuoteDialog')); 
//		 //	expect( dlg_SearchForDenPlans.isPresent()).toBe(true);
//			expect( dlg_SearchForDenPlans.isDisplayed()).toBe(true);
//			console.log('it strt 2: Found the Search for Dental Plans dialog');
//		}); //end of it(2)
	

		
		// seems like this should be broken up
		it('it strt2A: should allow me to enter zip and qty to cover ', function(){
		//	expect( element(by.css('.ui-dialog.ui-widget.ui-widget-content.ui-corner-all'))   );
		// 2/13 Dont know why I was looking at that element expecting it.  I'm
		// not acting on it at all
			
			/* Waits for the element with id 'coverage_type' to be clickable. 
			 * 2/13/17  I don't even think this is true       may have been */
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
			howManyWillBeCovered.$('[value="Self"]').click(); // this means '1'
			
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
	
		it('it strt 7: should find the text of the link for Individual/Family Dental Protram' , function(){

			var seniorPlanLink = element(by.id('planRowsBody_70422')).element(By.tagName('a'));// CAA55 Individual Family Dental Plan
			
			/* as much as I would like to zero in exactly on the link.....  *s
			 * the following srPlnLink definition is not finding the link to click
			 */
//var seniorPlanLink = element(by.cssContainingText('.planDetails','DeltaCare®  USA CAA50 Senior Dental Program')).element(By.tagName('a'));
// Senior Plan CAA50 was deleted by Product Management
			
			//browser.wait(ExpctCond.textToBePresentInElementValue)
			
			seniorPlanLink.click();
			console.log('it strt 7: CAA55 Individual/Family Dental Program.');// senior Plan depracated
//			console.log('it strt 7: Individual/Family Dental Program link found and clicked.');
		
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
			
				expect(fieldPhoneSelect.isDisplayed())	.toBe(true);
				expect(fieldPhoneNumber.isDisplayed())	.toBe(true);
				expect(fieldEmailAddr.isDisplayed())	.toBe(true);
				expect(chkBoxPaperless.isDisplayed())	.toBe(true);
				expect(RadBtnBrokerYes.isDisplayed())	.toBe(true);
				expect(RadBtnBrokerNo.isDisplayed())	.toBe(true);
				expect(linkBackToQuote.isDisplayed())	.toBe(true);
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
			
		  //fieldSsn.sendKeys('587459329')
			fieldSsn.sendKeys('587629329')
			fieldHomeAddr.sendKeys('100 First Street Floor 4');
	// Loose focus and I need to do some check  
	// Maybe her's where It pers 2 ends and it pers 3 starts ??? 
			
			fieldCity.sendKeys('San Francisco');
	// check value fieldState.sendKeys('');
	// check value fieldZipCode
			
			fieldPhoneSelect.$('[value="HOME"]').click();
			fieldPhoneNumber.sendKeys('4155551212');
			
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
//  3/10/17 changing "California" to "Ca"
//			hiddenfieldState.sendKeys('California');// this just likely a check
			hiddenfieldState.sendKeys('Ca');// this just likely a check
			hiddenfieldZipCode.sendKeys('94105');// this just likely a check
			
			console.log('it pers 4: completed the hidden fields after clicking diffMail');
		}); // end of it pers 4
		
		it('it pers 5: should access & validate the broker selection and entry ',function (){
			if (chkBoxPaperless.isSelected()){
				chkBoxPaperless.click();  // Click it to UN SELECT IT !!!
				expect(chkBoxPaperless.isSelected()).toBe(false);
				console.log('it pers 5: paperless was selected. Clicked it to unselect');
			}else{
				console.log('it pers 5: there was some prblem unselecting the paperless checkbox');
			}
			
			
			// browser.sleep(23000)
		}); // end of it pers 5
	
		
		it('it pers6A: should validate BNO is selected and clicks BYES to enable BNUM', function(){
			//expect(element(by.id('brokerNo')).isSelected()).toBe(true);
			if ( RadBtnBrokerNo.isSelected() ) {
				RadBtnBrokerYes.click();
				expect(RadBtnBrokerYes.isSelected()).toBe(true);
				console.log('it pers6A: found brokerNo, switched to brokerYes!');
			}else{
				// what kind of Expect is supposed to be here ??
				console.log('it pers6A: did not find BrokerNo. So, it was not switched to Yes');
			}
		});// end it pers 6A
		
		
			
		it('it pers6B: should newly visable fields, enter BNUM and click next', function(){
			
			if ( hiddenfieldBrokerNum.isDisplayed() ) {
				hiddenfieldBrokerNum.sendKeys('2012836');
				console.log('it pers6B: hiddenfieldBrokerNum was displayed BNUM entered');
			}else{
				console.log('it pers6B: hiddenfieldBrokerNum Was Not Displayed. NoBroker num Entered');
			}

			RadBtnBrokerYes.click();// used to loose focus from input field
			
		});// end of it Pers6B
		
		
		
		
		it('it pers6C: Evaluate all field correctness, find the Next button, click it',function(){
		
			var text1 = "TestFirstName";
			var protVarBrokerName = 'CHARLES DARROW';
			var testErrorString ='antidisestabilshment';// use of this needs to be completed.
			var ExpctCond = protractor.ExpectedConditions;	
			var elementBrokerName = element(by.id('brokerName'));
			
			/* Both methods work.  Left as example */
		  //browser.wait(ExpctCond.textToBePresentInElementValue($('#brokerName'),protVarBrokerName),5000);
			browser.wait(ExpctCond.textToBePresentInElementValue(elementBrokerName ,protVarBrokerName),5000);
			
			elementBrokerName.getAttribute('value').then( function(text){
				if(text === protVarBrokerName){
					expect(elementBrokerName.getAttribute('value')).toEqual(protVarBrokerName);
					console.log('it pers6C: Broker Name field contains',protVarBrokerName);
				}else{
					console.log('it pers6C: Error, expected: ' ,protVarBrokerName,' found: ', text, ' anthing there ???');
				}
			});

// 3/10/17  This was the exe pathway, moved it up just before success console.log msg
//			expect(elementBrokerName.getAttribute('value')).toEqual(protVarBrokerName);

		});
	
		
		it('it pers 7:',function (){
			// persPabeButtonNext Defined at the beginning of the describe
			if(persPageButtonNext.isDisplayed()){
				persPageButtonNext.click();
//   Expect > ---?
				console.log('it pers 7: Personal Info Page Next button found and clicked....');
				}

			});// end of it pers 7
		
		
		
	});// end describe personal info page.

	
	
	describe('Dependent page singular action, click the submit button. Thats it', function(){
		it('it pers7x: should find the submit button and click it',function (){
			var EC = protractor.ExpectedConditions;
			var dependentSubmitBtn	= element(by.id('nextButton'));
			var btnChangeState		= 'Loading...'
				
			browser.wait(EC.elementToBeClickable(dependentSubmitBtn), 5000);
			//browser.sleep(5000);
			dependentSubmitBtn.click();
			browser.wait(EC.textToBePresentInElementValue(dependentSubmitBtn,btnChangeState),9000);
			//browser.sleep(5000);
			expect(dependentSubmitBtn.getAttribute('value')).toBe(btnChangeState);
			console.log('it pers7x: Dependents page next button clicked')
		});
	}); // end describe dep submit
	
	
	
	
	describe('Facilities Page, expect-wait, Select(), Submit()', function(){	
		// TO DO:  field validation for where ever it there
		// Intent is to mimic the approach used on the personal info page
		var ExpctCond = protractor.ExpectedConditions;
		
//		it('it facs 1: use expected condition to let the page stabilize Test 1', function() {
//			var theSearchButton	= element(by.id('search-facilities'));
//			
//		//	browser.wait(ExpctCond.visibilityOf($('#search-facilities')),5000);
//			browser.wait(ExpctCond.visibilityOf(theSearchButton),5000);
//		//	browser.wait(ExpctCond.elementToBeClickable($('#serch-facilities')),5000);
//			browser.wait(ExpctCond.elementToBeClickable(theSearchButton),5000);
//			console.log('it facs 1: Exactly like the visibilityOf, and ToBeClickable Example');
//		});// end of it facs 1
	
		
		
		
//		it('it facs 2: use expected condition to let the page stabilize Test 2', function() {
//			browser.wait(ExpctCond.elementToBeClickable($('#search-facilities')),5000);
//			console.log('it facs 2: Exactly like the element to be clickable example');
//			
//			browser.sleep(500);
//		});// end of it facs 2
		
		//it should evaluate to the facilities page "title" , function() { });
		//"Facilities | Enrollment | Delta Dental Insurance Company"
		// Not doing this right now, maybe never..............................
		
		it('it facs 3: should find a radio button and select it', function(){
//			var GengleDentalSanFrancisc = 'DC144101';// last one on default generated list
			var GengleDentalSanFrancisc = 'DC022751';// last one on default generated list
			var facilitiesToSelectBtn = element(by.id(GengleDentalSanFrancisc));  // DC055237 is not visible default
			
			browser.wait(ExpctCond.visibilityOf(facilitiesToSelectBtn),5000)
			if (facilitiesToSelectBtn.isDisplayed()){
				facilitiesToSelectBtn.click();
 // --> expect ()
				console.log('it facs 3: The Facilities button was found and click()');
			}else{
				console.log('it facs 3: The radio button to pick was not Diaplayed');
			}

		});// end of it facs 3
	
	/* *******************************************
	 * There is un finished work below
	 * Navigating to the More Link is not yet done
	 **********************************************/	
		it('it facs 4: select the link More( down arrow to display hidden info', function() {
			console.log('it facs 4: In order to get the more info part of my selection' );
				/*	http://stackoverflow.com/questions/21237976/how-to-get-the-parent-of-an-element */
				/*	http://stackoverflow.com/questions/23720398/protractor-how-to-locate-a-sibling-of-a-given-element */
				/*	http://stackoverflow.com/questions/25390171/protractor-select-next-sibling-of-the-current-element ') */
		});// end of it facs 4	
	
		
		it('it facs 5: find the next button and click()', function() {
		//	var facsNextButton = element(by.id('nextButton'));
			var facsNextButton = element(by.css('.btn.multi-btn.primary.inline-block'));
			
			if (facsNextButton.isDisplayed()){
				facsNextButton.click();
				console.log('it facs 5: Facilities page finished. Next button clicked')
			}else{
				console.log('it facs 5: facsNextButton.isDisplayed in order to click() failed');
			}
// expect > --- ?			
			browser.sleep(500);
		});// end of it facs 5
	}); // end of describe Facilities Page
	
	describe('Payment Information page', function(){
		// TO DO: Field validation like the personal info page
		var ExpctCond = protractor.ExpectedConditions;
		
		it('it Pmnt1A: Use Expected Condtion to leat page stabilize3', function() {
			browser.wait(ExpctCond.visibilityOf($('#cardName')),5000); // ie: element(by.id('cardName')
			console.log('it Pmnt1A: #cardName Exactly like the visibilityOf Example');
		});// end of it Pmnt1A
	
		
		
		it('it Pmnt1B: Use Expected Condtion to leat page stabilize3', function() {
			browser.wait(ExpctCond.visibilityOf($('#nextButton')),5000);// ie: element(by.id('nextButton')
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

			cCardField.sendKeys(stringCardText);
		  //cCardField.sendKeys(testErrorString); // === 'bla bla bla'  Test injection line

			cCardField.getAttribute('value').then(function (text){
			if(text === stringCardText) {
					console.log('it Pmnt 2: Card Name found to equal', text);// if it was === text is ok 2 display
				}else{
					console.log('it Pmnt 2: Error: found ',text, 'vs', stringCardText);
				}
				expect(cCardField.getAttribute('value')).toEqual(stringCardText);
			});
	
		});

	// this workflow needs a plan for 76 cents	
		
		it('it Pmnt 3A: Should find and fill out the card number', function(){
			var visaCardNumberFor00CentsString	= '4121630071281885';
			var amexCardnumberFor80CentsString	= ' 370000999999990';

			//var testCard	= amexCardnumberFor80CentsString;	
			var testCard	= visaCardNumberFor00CentsString;	
			var block1		= '3700';	// Visa Cardnumber String Block 
			var block2		= '009999';	// Visa Cardnumber String Block 
			var block3		= '99990';	// Visa Cardnumber String Block 
			//var block4		= '990';	// Visa Cardnumber String Block 
			
			
		//	element(by.id('ccCapture')).sendKeys(testCard);
			element(by.id('ccCapture')).sendKeys(block1);
			element(by.id('ccCapture')).sendKeys(block2);
			element(by.id('ccCapture')).sendKeys(block3);
			//element(by.id('ccCapture')).sendKeys(block4);
		
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
			var securityCodeString	= '3134' ;  // 3 chars ( any dig ) for non Amex sec code
			//var securityCodeString	= '314' ;  // 3 chars ( any dig ) for non Amex sec code
			var cvcField			= element(by.id('cvcCapture'));
			
			//element(by.id('cvcCapture')).sendKeys(securityCodeString);
			cvcField.sendKeys(securityCodeString);
			console.log('it Pmnt3C: security code entered');
			
			var cCardField			= element(by.id('cardName'));
			cCardField.click();  // put focus on some other element
		});
		
		
		it('it Pmnt 3D: Should find and select the Same Billing Addr ChkBox', function(){
			var sameBillingCheckBox	= element(by.id('sameBilling'));
	
			sameBillingCheckBox.click();// setup to execute following code
			browser.sleep(250);  // maybe just for a tiny visual
				
			element(by.id('sameBilling')).getAttribute('checked').then(function(checked){
				if (!checked){
					
					sameBillingCheckBox.click();
					browser.sleep(250);  // maybe just for a tiny visual- I saw it. It's a good visual
					console.log('it Pmnt3D: detected BillAddressSame Box NOT Checked. clicking')
					}else{
					console.log('it Pmnt3D: detected default Box(-checked-) ');
					}
				}); 
				
				expect(sameBillingCheckBox.isSelected()).toBe(true);
		});
	

		
		
		
		// Should make these variables global that are captured after enter and loose focus
		it('it Pmnt 4: Should Validate the Street Address fields for Billing Address', function(){
			var sameBillingStAddrString		= '100 1st St Fl 4';
			var billingStreetAddrField		= element(by.id('sb_street'));
		
			/* The following line fails. Leaving here to show the odd example */	
			/*billingStreetAddrField.getAttribute('value').then( function (stAddrText){ */
			billingStreetAddrField.getText().then( function (stAddrText){
				if(stAddrText === sameBillingStAddrString ){
					console.log('it Pmnt 4: Street Address validation correct: I got ',stAddrText );
				}else{
					console.log('it Pmnt 4: Street Address FAILED validation ',stAddrText );
				} 

			}); // end function
		});// end of it Pmnt 4

		
		
		
		// Should make these globals that are captured after enter and loose focus
		it('it Pmnt 5: Should Validate the City State Zip Address fields for Billing Address', function(){
			var sameBillingLocalString		= 'San Francisco, CA 94105';
			var billingCityStZipField		= element(by.id('sb_locality'));

			
			/* The following line fails. Leaving here to show the odd example */	
			/*billingCityStZipField.getAttribute('value').then( function (localityText){ */
			billingCityStZipField.getText().then( function (localityText){
				if(localityText === sameBillingLocalString ){
					console.log('it Pmnt 5: Street Address validation correct: I got ',localityText);
				}else{
					console.log('it Pmnt 5: Street Address FAILED validation ', localityText);
				} 
			}); // end function 
		});// end of it Pmnt 5
		
		
		it('it Pmnt 6: Should find the Auth Check Box and click it', function(){
//			var authChkBox	= element(by.id('auth'));
			var authChkBox	= element(by.css('input[id="auth"]'));
			//var ExpctCond = protractor.ExpectedConditions;  // declared in Describe above
			
			expect(authChkBox.isDisplayed()).toBe(true);	

			browser.wait(ExpctCond.elementToBeClickable(authChkBox),5000);
			
			authChkBox.click();

			//expect(element(by.id('auth')).isSelected()).toBeTruthy();
			expect(element(by.id('auth')).isSelected()).toBeTruthy();
			console.log('it Pmnt 6: console logging: it Pmnt 7');
			
		});	// end of it Pmnt 6:
		
		
		it('it Pmnt 7: find the next button and click()', function() {
			var pmntNextButton = element(by.id('nextButton'));
			var nextButtonTextPostClick = 'Loading...';
			
			if (pmntNextButton.isDisplayed()){
				pmntNextButton.click();
				console.log('it Pmnt 7: Payment page finished. Next button clicked');
			}else{
				console.log('it Pmnt 7: pmntNextButton.isDisplayed in order to click() failed');
			}

			// Loading need to finish this some how.
//			expect(element(by.id('nextButton')).getAttribute('value')).toBe('Loading');
			
		//	browser.wait(ExpctCond.textToBePresentInElementValue(pmntNextButton, 'Loading...'), 5000);
		//	expect(pmntNextButton.getAttribute('value')).toBe('Loading...'); 
			
			browser.wait(ExpctCond.textToBePresentInElementValue(pmntNextButton, nextButtonTextPostClick), 5000);
			expect(pmntNextButton.getAttribute('value')).toBe(nextButtonTextPostClick); 

			browser.sleep(500);
		
		});// end of it facs 5	
		
		it('end sleep ',function(){
			browser.sleep(12800);
		});
	});// Describe end

