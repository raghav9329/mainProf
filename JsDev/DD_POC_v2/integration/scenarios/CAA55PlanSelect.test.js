//spec CAA55PlanSelect.text.js   ---  This is the second work flow assigned.
"use strict"

/* 2/13/17 This file starts out as an exact duplicate of the Senior( now CAA50Senior_Single.test.js )
 *  I will add from my notes and will add the dependent page click though...
 * 
 * CAA55PlanSelect.test.js  represents the second work flow Manny assigned.
 * Testing: configured through protractor-chrome|firefox.conf.js File(s) 
 * command line alias ppcc or ppff
 * 
 * Naming convention to the specs  nees to be NofX with the describe name
 * But I also want the naming to indicate where I am in the execution
 * I don't really want to go Back and lable so, maybe it will be 
 * A, B, C, D etc.
 *
 */

	// JavaScriptTheGoodParts.pdf pg25 refs global obj var MYAPP = {};
	// Limit the exposure global vars have 
	var testWorkflowName= "CAA55PlanSelect";
	var protocol        = "https://"
	var host_dit3		= "dit3";
	var host_mot		= "mot";
	var testDomain_Name	= "deltadentalins.com";// varName, rootURL is more common3
	var server			= "";
	var dit3Url			= "https://dit3.deltadentalins.com/";
	var motUrl			= "https://mot.deltadentalins.com/"
	var sleepDuration	= 380;// miliseconds 80 < 1/10 of a secondj
//	var sleepDuration	= 1380;// miliseconds 80 < 1/10 of a secondj

	var planPriceString	= '';
	var planDollarValue	= '';  	// 2/14/17 this value is captured in odrer to test
								// test against later in the flow

	browser.ignoreSynchronization = true;	
	browser.executeScript("document.body.style.zoom='60%';");
	
	beforeAll(function () {
//		var url = protocol.concat(host_mot, '.', testDomain_Name);
		var url = protocol.concat(host_dit3, '.', testDomain_Name);
		browser.get(url );
	});
	
	beforeEach(function(){
	//  Previous implemtation of beforeEach was the single line below to sleep some duration
	//	browser.sleep(sleepDuration);
	//  2/27/17 replaced with the newer browser wait function defined below.
	//  This is a VAST improvement 
		browser.wait(function () {
	        return browser.executeScript('return document.readyState==="complete" &&' +
            ' jQuery !== undefined && jQuery.active==0;').then(function (text) {
                return text === true;
            });
	    }, 30000);
	});

	afterEach(function() {
		//no-opp
	});
	

//	describe('Navigate to the Start page',function(){	
//		it('Nav  1: it should land on the dit3 home page', function(){	
//			var myCurrentUrl = browser.getCurrentUrl();
////			var myCurrentUrl =  "https://dit3.deltadentalins.com/";
//			
////			
//			expect(browser.getCurrentUrl()).toEqual(dit3Url);
////			expect(true).toBe(true);
////			expect(browser.getCurrentUrl()).toEqual(myCurrentUrl);
//			console.log('it Nav  1: Current URL where we landed is: ', myCurrentUrl);
//
//		});// end it nav 1
//	});// end describe(Nav2StartPage)
	
describe('A: Start the Quote Process via Get A Quote Button', function() {
		//var getAQuote_Button = element(by.css('.button')); // 2/23/17 line moved to the -it- directly below
		//var getAQuote_Button = element(by.id('apply'));// 2/13/17 testing different selector
		
	
		it('A1:should find the Get A Quote button element and activate the button', function(){
			var getAQuote_Button = element(by.css('.button'));

			console.log('');
			expect(getAQuote_Button.isPresent()).toBe(true);
			getAQuote_Button.click();
			
			console.log(' A1o2  : Found the GetAQuote button and clicked it');
		});
		
		
		it('A2:should find the proper dialog & URL',function(){
		 	var dlg_SearchForDenPlans = element(by.css('.ui-dialog.ui-widget.ui-widget-content.ui-corner-all'));
		 	var urlIs = 'https://dit3.deltadentalins.com/indEnroll?issuerCode=DELTA';
///////////////////////////////////////////
//  Glaring hole here:  hard coded URL !!!
//////////////////////////////////////////
		 	expect(browser.getCurrentUrl()).toEqual(urlIs);
			expect( dlg_SearchForDenPlans.isDisplayed()).toBe(true);
			console.log('A2o2  : Found the Search for Dental Plans dialog');
		});
	
}); // end of Start the Quote Process


describe('B: Quote Dialog Data Entry and submission', function(){

		it('B1:should allow me to enter zip and qty to cover ', function(){
			var ExpCond = protractor.ExpectedConditions;
			var zipValue = '95148';
			var zipField = element(by.css('.txtFieldC.input-field75.zip.mreq.valid.text.focusme'));	

			browser.wait(ExpCond.elementToBeClickable(zipField),5000);
			zipField.sendKeys(zipValue);
			console.log('B1o4  : entered data in zipField: ', zipValue);
		});// end of it(2A) 
	
		
		
		it('B2:it should confirm the zip field value',function (){
			var debugTestVar	= element(by.css('.txtFieldC.input-field75.zip.mreq.valid.text.focusme'));	
			var zipTestValue	= '95148';
			var zipErrorCondVal	= '951x*';

			expect(debugTestVar.getAttribute('value')).not.toEqual(zipErrorCondVal); // should pass ( double negative )
			expect(debugTestVar.getAttribute('value')).toEqual(zipTestValue); // should pass ( single positive )
			debugTestVar.getAttribute('value').then(function (text) {
				if (text === zipTestValue){
					console.log('B2o4  : Success check, text in zip field.  value is = ', text);
				}
				else{ console.log('B2o4  : ERROR: check text in zip field FAILED.  value is = ', text);
				}
			});// end debugTestVar.getAttrib....
		}); 
	
		
		
		it('B3:should select the test value WhoWillBeCovered', function(){
			var howManyWillBeCoveredEnter = element(by.cssContainingText('option', '4'));
			// var coverageSelection = "Self";   2/24/17 I believe to be removed.  much earlier design
			var ExpCond = protractor.ExpectedConditions; // same name new scope

			browser.wait(ExpCond.elementToBeClickable(howManyWillBeCoveredEnter),5000);
			howManyWillBeCoveredEnter.click();
			console.log('B3o4  : Single coverage selected with: 4 ');
		});// end of it(3)	
		
/////////////////////////////////
//  Need to come back to this 
//  Figure how to get the 
//  drop down selected value [ late ]: I need to put in my notes, because currently...... to explain what and why this needs to be done 
/////////////////////////////////
//		it('B3a: shoujld confirm the dropMenu value selected',function(){
//			//var howManyWillBeCoveredTest = element(by.cssContainingText('option', '4'));
//			//expect( howManyWillBeCoveredTest.getAttribute('text Hummmm')).toEqual('4');
//			var someelement = element(by.id('coverage_type'));
//			
//			expect(someelement.getAttribute('text')).toBe('4');
//			colsole.log('B3AoX : Some console output ');
//			
//		});
		

		it('B4:should find the dialog button and click it', function(){
			var searchForPlans_GoButton = element(by.id('btn_saveBig'));	
			expect( searchForPlans_GoButton.isPresent()).toBe(true);	
			searchForPlans_GoButton.click();
			console.log('B4o4  : Search for Dental Plans button found and Button Clicked');
		});	
			
});// end describe('Quote Dialog Data Entry and submission', function(){	


describe('C:Dental Plan Selection', function(){

		
		it('C1:should confirm page title and URL', function () {
			var stringPageTitle	= "::Individual & Families::";
			var urlContains		= 'https://dit3.deltadentalins.com/indEnroll/search/quotes?zip=95148'
			var ExpCond = protractor.ExpectedConditions;

/////////////////////////////////////////////////////////////////
//  Some FM from  http://stackoverflow.com/questions/33301476/how-to-wait-the-page-to-test-is-loaded-in-non-angular-site
//  2/27/17 curreintly a really nice little solution
//  this waits until the page completely loads
//  Means it waits for slow to load pages.  currently 30 sec Max
/////////////////////////////////////////////////////////////////
//			browser.wait(function () {
//		        return browser.executeScript('return document.readyState==="complete" &&' +
//	            ' jQuery !== undefined && jQuery.active==0;').then(function (text) {
//	                return text === true;
//	            });
//		    }, 30000);
/////  End of FM
		
			expect(browser.getCurrentUrl()).toContain(urlContains);
			expect(browser.getTitle()).toEqual(stringPageTitle);
			console.log('C1o5  : Page Title & URL confirmed');
		});// end of it(5)	
			
		
		
		it('C2:should confirm proper zip & quantity', function(){	
			var zipCodeUnderTest	= '95148';
			var presentedZip		= element(by.id('psc_zip'));
			var presentedQty		= element(by.css('.qpeople.greenBTxt'));
			var qtyText				= '4 person(s)';
			
			expect(presentedZip.getText()).toEqual(zipCodeUnderTest);
			expect(presentedQty.getText()).toEqual(qtyText);
			console.log('C2o5  : Display zip & Quantity confirmed');
		});
	
		
		
		
		it('C3:should select a dental plan link' , function(){
			var seniorPlanLink = element(by.id('planRowsBody_70422')).element(By.tagName('a'));  
			// CAA55 Individual/Family Dental Program
			
			seniorPlanLink.click();
			console.log('C3o5  : Dental Plan individual Page Link selected');
		});
		
		it('C4:should confirm URL & enroll button' , function(){
			var urlContains		= 'https://dit3.deltadentalins.com/indEnroll/plans/70422?zip=95148';
			var enrollButton	= element(by.css('.enrollBtn'));
		
			expect(browser.getCurrentUrl()).toContain(urlContains);
			expect(enrollButton.isPresent()).toBe(true);
			console.log('C4o5  : Dental Plan Page URL & Enroll button confirmed');
		});
		
		it('C5:should confirm URL & enroll button' , function(){
			var enrollButton	= element(by.css('.enrollBtn'));
			
			enrollButton.click();
			console.log('C5o5  : Dental Plan Page Enroll button clicked'); 
		});
		
//////////////////////////////////////////////////////////////
//	2/24/17 just not ready to delete
//	I don't absolutely need this any longer but it's got
//  got some interesting locators ..........
//////////////////////////////////////////////////////////////
//		it('it strt 8: should evaluate page correctness before clicking the button', function(){
//			var numPersonsText = element(by.id('covrage_type_e'));
//			var locPersonsText = element(by.id('qstate'));
//			expect(numPersonsText.getText()).toEqual('4 person(s)');
////		expect(locPersonsText.getText()).toEqual('CA 95148');
//			expect(locPersonsText.getText()).toEqual('CA');
//			
//			var enrollButton = element.all(by.cssContainingText('.enrollBtn', 'Enroll')).first();
//		//  var enrollButton = element.all(by.id('apply')); // 2/14/17 this worked and then it didn't
//			enrollButton.click();
//			console.log('it strt 8: Enroll Button found and clicked.');
//
//			browser.sleep(10000)
//		}); // end of it 8

});// end describe('C: Dental Plan Selection', function(){
		
describe('D: Personal Info Page - First pass zip code work flow correction', function(){
	
		it('D1:should evaluate PersInfo URL and Title', function(){
			var pageTitleString = 'Personal Info | Enrollment | Delta Dental Insurance Company';
			var urlIs			= 'https://dit3.deltadentalins.com/enroll/personal-info';
			expect(browser.getTitle()).toEqual(pageTitleString);
			expect(browser.getCurrentUrl()).toEqual(urlIs);
			console.log('D1oA : Confirmed PersInfo page URL and Title');
		}); 
		
		
		it('D2:Set the correct Zip code and loose focus',function(){
			var ExpCond = protractor.ExpectedConditions;
			var fieldZipCode		= element(by.id('zipCode'));
			var fieldPhoneNumber	= element(by.id('contactNumber'));
			
			browser.wait(ExpCond.elementToBeClickable(fieldZipCode),5000);
			fieldZipCode.sendKeys('94105');
			
			browser.wait(ExpCond.elementToBeClickable(fieldPhoneNumber),5000);// yes I know its already clickable
			fieldPhoneNumber.click();
			console.log('D2oA : Changed ZipCode to generate ZC Chg Popup');
		});
	 	
		
		it('D3:Confirm Popup visable ',function(){
			var zipPopDlg		= element(by.css('.overlay.zipPop'));
			
			expect(zipPopDlg.isDisplayed()).toBe(true);
			console.log('D3oA : detected overlay popup !!');
		});
		
		it('D4:Conform go_Back Link  click it. ',function(){
			var zipGoBackId		= 'zipPopBack';
			var gobackLink		= element(by.id(zipGoBackId));
			
			gobackLink.click();
			console.log('D4oA : Go Back link clicked');
		});
		
		it('D5:should re evaluate PersInfo URL and Title', function(){
			var pageTitleString = 'Personal Info | Enrollment | Delta Dental Insurance Company';
			var urlIs			= 'https://dit3.deltadentalins.com/enroll/personal-info';
			expect(browser.getTitle()).toEqual(pageTitleString);
			expect(browser.getCurrentUrl()).toEqual(urlIs);
			console.log('D5oA : Confirmed PersInfo page URL and Title');
		}); 	
		
		it('D6:should allow street addr data entry',function(){
			var ExpCond = protractor.ExpectedConditions;
			var fieldStreetAddr		= element(by.id('streetAddress'));
			var streetAddrStr		= '100 First Street'
			
			browser.wait(ExpCond.elementToBeClickable(fieldStreetAddr),5000);
			fieldStreetAddr.sendKeys(streetAddrStr);
			console.log('D6oA : Data entry in Street Addr field');
	///////  future level of improvement
	/////// Right HERE I COULD / SHOULD put in a check for error === NULL  
	///////  Null would indicate no error nespa ?  N est ce pas
		}); 	
		
		it('D7:should accept the down arrow code getting first addrclens entry',function(){
			var fieldStreetAddr		= element(by.id('streetAddress'));
			browser.sleep(850);
//			browser.wait(ExpCond.elementToBeClickable(fieldStreetAddr),5000);
			fieldStreetAddr.sendKeys('\uE015');
			console.log('D7oA : JUST SENT UNICODE for Down Arrow');
		});
		
		it('D8:shojuld accept the ENTER KEY commiting Street Addr',function(){
			var fieldStreetAddr		= element(by.id('streetAddress'));
			browser.sleep(850);
//			browser.wait(ExpCond.elementToBeClickable(fieldStreetAddr),5000);
			fieldStreetAddr.sendKeys(protractor.Key.ENTER);
			console.log('D8oA : JUST SENT ENTER KEY')
			browser.sleep(2500)
		});
		
		it('D9:shold detect the zipCode popup dlg',function(){
			var zipPopDlg		= element(by.css('.overlay.zipPop'));
			
			expect(zipPopDlg.isDisplayed()).toBe(true);
			console.log('D9oA : detected overlay popup !!');
		});
		
		
		it('D10:Conform go_Back Link  click it. ',function(){
			var zipNewQuoteId	= 'zipNewQuote';
			var newQuoteLink	= element(by.id(zipNewQuoteId));
			
			newQuoteLink.click();
			console.log('DAoA : NewQuote Link in ZipPopup Clicked');
			
			//browser.sleep(60000)
		});	
		
}); // end describe('D: Personal Info Page - First pass zip code work flow correction', function(){


describe('E: Plan Selection (return) - Second pass: A new flow', function(){	

		it('E1:should validate Dental Plans Select page title & URL',function(){
			var stringPageTitle	= "::Individual & Families::";
			var urlContains		= 'https://dit3.deltadentalins.com/indEnroll/search/quotes?zip=94105'
			var ExpCond = protractor.ExpectedConditions;
			
			expect(browser.getCurrentUrl()).toContain(urlContains);
			expect(browser.getTitle()).toEqual(stringPageTitle);
			console.log('E1o5  : Page Title & URL confirmed');
			
		});
	
		it('E2:should confirm proper zip & quantity', function(){	
			var zipCodeUnderTest	= '94105';
			var presentedZip		= element(by.id('psc_zip'));
			var presentedQty		= element(by.css('.qpeople.greenBTxt'));
			var qtyText				= '4 person(s)';
			
			expect(presentedZip.getText()).toEqual(zipCodeUnderTest);
			expect(presentedQty.getText()).toEqual(qtyText);
			console.log('E2o5  : Display zip & Quantity confirmed');
		
		});	
		
		it('E3:should select a dental plan link' , function(){
			var seniorPlanLink = element(by.id('planRowsBody_70422')).element(By.tagName('a'));  
			// CAA55 Individual/Family Dental Program
			
			seniorPlanLink.click();
			console.log('E3o5  : Dental Plan individual Page Link selected');

		});	
		
		it('E4:should confirm URL & enroll button' , function(){
			var urlContains		= 'https://dit3.deltadentalins.com/indEnroll/plans/70422?zip=94105';
			var enrollButton	= element(by.css('.enrollBtn'));
		
			expect(browser.getCurrentUrl()).toContain(urlContains);
			expect(enrollButton.isPresent()).toBe(true);
			console.log('E4o5  : Dental Plan Page URL & Enroll button confirmed');
		});
		
		it('E5:should confirm URL & enroll button' , function(){
			var enrollButton	= element(by.css('.enrollBtn'));
			
			enrollButton.click();
			console.log('E5o5  : Dental Plan Page Enroll button clicked'); 
	
		});
		
}); // end describe('E: Plan Selection (return) - Second pass: A new flow', function(){	
		

describe('F: Personal Info Page - Second pass: A new flow', function(){
	
		it('F1:should evaluate PersInfo URL and Title', function(){
			var pageTitleString = 'Personal Info | Enrollment | Delta Dental Insurance Company';
			var urlIs			= 'https://dit3.deltadentalins.com/enroll/personal-info';
			expect(browser.getTitle()).toEqual(pageTitleString);
			expect(browser.getCurrentUrl()).toEqual(urlIs);
			console.log('F1oX : Confirmed PersInfo page URL and Title');
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
		//	planPriceString = element(by.css('.plan-price'))
			
			
			
		it('F2: it pers 1: should evaluate details on the pers Info Page ', function(){
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
				console.log('F2oX  : Just did an expect on evey currently visable element on the page');
		});// end of it pers 1
		
		
		
		
		it('F3:should supply incomplete data, detect error condition ', function(){
			var genderStringValue= "Prefer not to say";

			var dobMMVal			='06';
			var dobDDVal			='22';
			var dobYrVal			='1982';
			var ssnVal				='847563934';
			var homeAddrStr			='100 First Street';
			var cityString			='San Francisco';
			
			fieldFirstName.sendKeys('TestFirstName');
			fieldLastName.sendKeys('LastNameTest');

			/*Gender Drop down next*/
			element(by.cssContainingText('option', genderStringValue)).click();
			
			fieldBdMM.sendKeys(dobMMVal);
			fieldBdDD.sendKeys(dobDDVal);
			fieldBdYyyy.sendKeys(dobYrVal);
			
			fieldSsn.sendKeys(ssnVal);
			fieldHomeAddr.sendKeys(homeAddrStr);
			fieldCity.sendKeys(cityString);	
			
			
			fieldPhoneNumber.click();
	// Loose focus and I need to do some check  
	// Maybe her's where It pers 2 ends and it pers 3 starts ???   [ Old notes, how presient ]
			
			var pageError	=  element(by.css('.error.cleanse-ajax-error'));
			browser.wait(protractor.ExpectedConditions.visibilityOf(pageError),5000);
			expect(pageError.isDisplayed()).toBe(true);
			console.log('F3oX  : Captured error condition PROGRAMATICALLY !')
			
		}); 
		
		
		it('F4:should correct and complete pers info',function(){
			var homeAddrStr			='100 First Street floor 4';
			var cityString			='San Francisco';
			// var phoneTypeSelect		= "Cell";  // don't think I use
			var phoneNum			='4155551212';

	// check value fieldState.sendKeys('');
	// check value fieldZipCode
			fieldHomeAddr.clear();
			
			fieldHomeAddr.sendKeys(homeAddrStr);
			
			fieldCity.clear();
			fieldCity.sendKeys(cityString);	
			
			fieldPhoneSelect.$('[value="CELL"]').click();
			fieldPhoneNumber.sendKeys(phoneNum);
			
			fieldEmailAddr.sendKeys('idString@someDomain.net')
		// could do a whole bunch of expect(element.toHaveSomeValues).toBe(true);
			console.log('F4:  No comprehensive comment yet');
	
		/*
		 * what else do I need on this form
		 * 
		 * 
		 * 
		 * k
		 */	
			
			
			
			
					browser.sleep(28000)
		});// end of it pers 2 
	
	
	
		
//		it('it pers 4: should eval mailing address entry',function(){
//			
//		// this is a test:  Do we now get access to the hidden fields below ??	
//		// looks like we're keeping it
//			element(by.name('diffMail')).isSelected().then(function(selected) {
//			    if (selected) {
//			        element(by.name('diffMail')).click();// to Un Select
//			    }
//		     });  // end element(by.name('diffMail')).isSelected().then(function(selected)
//
//			hiddenfieldMailAddr.sendKeys('100 First Street Floor 4');
//	
//		/* *** As focus is lost, there is an AJAX event right here      */
//			hiddenfieldCity.sendKeys('San Francisco');  // this just likely a check
//			hiddenfieldState.sendKeys('California');// this just likely a check
//			hiddenfieldZipCode.sendKeys('94105');// this just likely a check
//			
//			console.log('it pers 4: completed the hidden fields after clicking diffMail');
//		}); // end of it pers 4
		
		
		
		
//		it('it pers 5: should access & validate the broker selection and entry ',function (){
//			if (chkBoxPaperless.isSelected()){
//				chkBoxPaperless.isSelected().click();
//				console.log('it pers 5: paperless was selected. Clicked it to unselect');
//			}else{
//				console.log('it pers 5: there was some prblem unselecting the paperless checkbox');
//			}
//		}); // end of it pers 5
	
		
		
		
		
//		it('it pers6A: should validate BNO is selected and clicks BYES to enable BNUM', function(){
//			//expect(element(by.id('brokerNo')).isSelected()).toBe(true);
//			if ( RadBtnBrokerNo.isSelected() ) {
//				RadBtnBrokerYes.click();
//				console.log('it pers6A: found brokerNo, switched to brokerYes!');
//			}else{
//				console.log('it pers6A: did not find BrokerNo. So, it was not switched to Yes');
//			}
//		});// end it pers 6A
			
	
	
	
//		it('it pers6B: should newly visable fields, enter BNUM and click next', function(){
//			
//			if ( hiddenfieldBrokerNum.isDisplayed() ) {
//				hiddenfieldBrokerNum.sendKeys('2012836');
//				console.log('it pers6B: hiddenfieldBrokerNum was displayed BNUM entered');
//			}else{
//				console.log('it pers6B: hiddenfieldBrokerNum Was Not Displayed. NoBroker num Entered');
//			}
//
//			RadBtnBrokerYes.click();// used to loose focus from input field
//			
//		});// end of it Pers6B
		
	
	
	
//		it('it pers6C: Evaluate all field correctness, find the Next button, click it',function(){
//		
//			var text1 = "TestFirstName";
//			var protVarBrokerName = 'CHARLES DARROW';
//			var testErrorString ='antidisestabilshment';// use of this needs to be completed.
//			var ExpCond = protractor.ExpectedConditions;	
//			var elementBrokerName = element(by.id('brokerName'));
//			
//			/* Both methods work.  Left as example */
//		  //browser.wait(ExpCond.textToBePresentInElementValue($('#brokerName'),protVarBrokerName),5000);
//			browser.wait(ExpCond.textToBePresentInElementValue(elementBrokerName ,protVarBrokerName),5000);
//			
//			elementBrokerName.getAttribute('value').then( function(text){
//				if(text === protVarBrokerName){
//					console.log('it pers6C: Broker Name field contains',protVarBrokerName);
//				}else{
//					console.log('it pers6C: Error, expected: ' ,protVarBrokerName,' found: ', text, ' anthing there ???');
//				}
//			});
//
//			expect(elementBrokerName.getAttribute('value')).toEqual(protVarBrokerName);
//
//		});
	
		
//		it('it pers 7:',function (){
//			// persPabeButtonNext Defined at the beginning of the describe
//			if(persPageButtonNext.isDisplayed()){
//				persPageButtonNext.click();
////   Expect > ---?
//				console.log('it pers 7: Personal Info Page Next button found and clicked....');
//				}
//
////			});// end of it pers 7
		
		
	});// end describe('E: Personal Info Page - Second pass: A new flow', function(){	

		
		
// I need to put in a "dependent" page click Next .  No dependent
	// this because they killed the senior plan
	
	
//	describe('Facilities Page, expect-wait, Select(), Submit()', function(){	
//		// TO DO:  field validation for where ever it there
//		// Intent is to mimic the approach used on the personal info page
//		var ExpCond = protractor.ExpectedConditions;
		
		
		
//		it('it facs 1: use expected condition to let the page stabilize Test 1', function() {
//			browser.wait(ExpCond.visibilityOf($('#search-facilities')),5000);
//			console.log('it facs 1: Exactly like the visibilityOf Example');
//		});// end of it facs 1
	
		
		
//		it('it facs 2: use expected condition to let the page stabilize Test 2', function() {
//			browser.wait(ExpCond.elementToBeClickable($('#search-facilities')),5000);
//			console.log('it facs 2: Exactly like the element to be clickable example');
//			
//			browser.sleep(500);
//		});// end of it facs 2
		
		
		
		
		//it should evaluate to the facilities page "title" , function() { });
		//"Facilities | Enrollment | Delta Dental Insurance Company"
		// Not doing this right now, maybe never..............................
	
		
		
//		it('it facs 3: should find a radio button and select it', function(){
//			var GengleDentalSanFrancisc = 'DC144101';// last one on default generated list
//			var facilitiesToSelectBtn = element(by.id(GengleDentalSanFrancisc));  // DC055237 is not visible default
//			
//			browser.wait(ExpCond.visibilityOf(facilitiesToSelectBtn),5000)
//			if (facilitiesToSelectBtn.isDisplayed()){
//				facilitiesToSelectBtn.click();
//				console.log('it facs 3: The Facilities button was found and click()');
//			}else{
//				console.log('it facs 3: The radio button to pick was not Diaplayed');
//			}
//
//		});// end of it facs 3
	
	/* *******************************************
	 * There is un finished work below
	 * Navigating to the More Link is not yet done
	 **********************************************/	
		
		
		
//		it('it facs 4: select the link More( down arrow to display hidden info', function() {
//			console.log('it facs 4: In order to get the more info part of my selection' );
//				/*	http://stackoverflow.com/questions/21237976/how-to-get-the-parent-of-an-element */
//				/*	http://stackoverflow.com/questions/23720398/protractor-how-to-locate-a-sibling-of-a-given-element */
//				/*	http://stackoverflow.com/questions/25390171/protractor-select-next-sibling-of-the-current-element ') */
//		});// end of it facs 4	
	
		
		
		
		
//		it('it facs 5: find the next button and click()', function() {
//			var facsNextButton = element(by.id('nextButton'));
//			
//			if (facsNextButton.isDisplayed()){
//				facsNextButton.click();
//				console.log('it facs 5: Facilities page finished. Next button clicked')
//			}else{
//				console.log('it facs 5: facsNextButton.isDisplayed in order to click() failed');
//			}
//// expect > --- ?			
//			browser.sleep(500);
//		});// end of it facs 5
		
		
		
//	}); // end of describe Facilities Page
	

	
	
//	describe('Payment Information page', function(){
//		// TO DO: Field validation like the personal info page
//		var ExpCond = protractor.ExpectedConditions;
			
		
		
//		it('it Pmnt1A: Use Expected Condtion to leat page stabilize3', function() {
//			browser.wait(ExpCond.visibilityOf($('#cardName')),5000); // ie: element(by.id('cardName')
//			console.log('it Pmnt1A: #cardName Exactly like the visibilityOf Example');
//		});// end of it Pmnt1A
	
		
		
//		it('it Pmnt1B: Use Expected Condtion to leat page stabilize3', function() {
//			browser.wait(ExpCond.visibilityOf($('#nextButton')),5000);// ie: element(by.id('nextButton')
//			console.log('it Pmnt1B: #nextButton Exactly like the visibilityOf Example');
//		});// end of it Pmnt 1B

	
		/* **************************
		 *  Ok important point.
		 *  I've decided that I don't need to check my input values, and so There needs to be a 
		 *  TODO to remove all input checks,  
		 *  But  I must validate all input values where ever they are displayed 
		 *  at the final stages of a workflow.
		 *  */
	
		
		
		
//		
//		it('it Pmnt 2: Should all basic personal info data ', function (){
//			var stringCardText 	= 'FnOneHundredAnd LnThirtyFiveDollars' ;
//			var testErrorString	= 'bla bla bla'
//			var cCardField		= element(by.id('cardName'));
//
//			cCardField.sendKeys(stringCardText);
//		  //cCardField.sendKeys(testErrorString); // === 'bla bla bla'  Test injection line
//
//			cCardField.getAttribute('value').then(function (text){
//			if(text === stringCardText) {
//					console.log('it Pmnt 2: Card Name found to equal', text);// if it was === text is ok 2 display
//				}else{
//					console.log('it Pmnt 2: Error: found ',text, 'vs', stringCardText);
//				}
//				expect(cCardField.getAttribute('value')).toEqual(stringCardText);
//			});
//		});

		
		
		
		
		
//		it('it Pmnt 3A: Should find and fill out the card number', function(){
//			var visaCardNumberFor00CentsString	= '4121630071281885';
//			var amexCardnumberFor80CentsString	= '370000999999990';
//			//var testCard	= amexCardnumberFor80CentsString;	
//			var testCard	= visaCardNumberFor00CentsString;	
//			var block1		= '4121';	// Visa Cardnumber String Block 
//			var block2		= '6300';	// Visa Cardnumber String Block 
//			var block3		= '7128';	// Visa Cardnumber String Block 
//			var block4		= '1885';	// Visa Cardnumber String Block 
//			
//			
//		//	element(by.id('ccCapture')).sendKeys(testCard);
//			element(by.id('ccCapture')).sendKeys(block1);
//			element(by.id('ccCapture')).sendKeys(block2);
//			element(by.id('ccCapture')).sendKeys(block3);
//			element(by.id('ccCapture')).sendKeys(block4);
//		
//			console.log('it Pmnt3A:',testCard, 'for payment $$$.00  entered.')
//		});
		
		
		
		
//		it('it Pmnt 3B: Should find and fill out the card expiration', function(){
//			var mmCardExpString = '12';
//			var yyyyCardExpString = '2017';
//			
//			element(by.id('expMo')).sendKeys(mmCardExpString);
//			element(by.id('expYr')).sendKeys(yyyyCardExpString);
//			console.log('it Pmnt3B: Month and Year Card Expiration entered')
//		});
		
		
		
		
		
//		it('it Pmnt 3C: Should find and fill out the card security code', function(){
//			//var securityCodeString	= '3134' ;  // 3 chars ( any dig ) for non Amex sec code
//			var securityCodeString	= '314' ;  // 3 chars ( any dig ) for non Amex sec code
//			var cvcField			= element(by.id('cvcCapture'));
//			
//			//element(by.id('cvcCapture')).sendKeys(securityCodeString);
//			cvcField.sendKeys(securityCodeString);
//			console.log('it Pmnt3C: security code entered');
//			
//			var cCardField			= element(by.id('cardName'));
//			cCardField.click();  // put focus on some other element
//		});
		
		
		
		
		
//		it('it Pmnt 3D: Should find and select the Same Billing Addr ChkBox', function(){
//			var sameBillingCheckBox	= element(by.id('sameBilling'));
//	
//			sameBillingCheckBox.click();// setup to execute following code
//			browser.sleep(250);  // maybe just for a tiny visual
//				
//			element(by.id('sameBilling')).getAttribute('checked').then(function(checked){
//				if (!checked){
//					
//					sameBillingCheckBox.click();
//					browser.sleep(250);  // maybe just for a tiny visual- I saw it. It's a good visual
//					console.log('it Pmnt3D: detected BillAddressSame Box NOT Checked. clicking')
//					}else{
//					console.log('it Pmnt3D: detected default Box(-checked-) ');
//					}
//				}); 
//				
//				expect(sameBillingCheckBox.isSelected()).toBe(true);
//		});
	

		
		
		
//		// Should make these variables global that are captured after enter and loose focus
//		it('it Pmnt 4: Should Validate the Street Address fields for Billing Address', function(){
//			var sameBillingStAddrString		= '100 1st St Fl 4';
//			var billingStreetAddrField		= element(by.id('sb_street'));
//		
//			/* The following line fails. Leaving here to show the odd example */	
//			/*billingStreetAddrField.getAttribute('value').then( function (stAddrText){ */
//			billingStreetAddrField.getText().then( function (stAddrText){
//				if(stAddrText === sameBillingStAddrString ){
//					console.log('it Pmnt 4: Street Address validation correct: I got ',stAddrText );
//				}else{
//					console.log('it Pmnt 4: Street Address FAILED validation ',stAddrText );
//				} 
//
//			}); // end function
//		});// end of it Pmnt 4

		
		
		
//		// Should make these globals that are captured after enter and loose focus
//		it('it Pmnt 5: Should Validate the City State Zip Address fields for Billing Address', function(){
//			var sameBillingLocalString		= 'San Francisco, CA 94105';
//			var billingCityStZipField		= element(by.id('sb_locality'));
//
//			
//			/* The following line fails. Leaving here to show the odd example */	
//			/*billingCityStZipField.getAttribute('value').then( function (localityText){ */
//			billingCityStZipField.getText().then( function (localityText){
//				if(localityText === sameBillingLocalString ){
//					console.log('it Pmnt 5: Street Address validation correct: I got ',localityText);
//				}else{
//					console.log('it Pmnt 5: Street Address FAILED validation ', localityText);
//				} 
//			}); // end function 
//		});// end of it Pmnt 5
		
	
		
		
//		it('it Pmnt 6: Should find the Auth Check Box and click it', function(){
////			var authChkBox	= element(by.id('auth'));
//			var authChkBox	= element(by.css('input[id="auth"]'));
//			//var ExpCond = protractor.ExpectedConditions;  // declared in Describe above
//			
//			expect(authChkBox.isDisplayed()).toBe(true);	
//
//			browser.wait(ExpCond.elementToBeClickable(authChkBox),5000);
//			
//			authChkBox.click();
//
//			//expect(element(by.id('auth')).isSelected()).toBeTruthy();
//			expect(element(by.id('auth')).isSelected()).toBeTruthy();
//			console.log('it Pmnt 6: console logging: it Pmnt 7');
//			
//		});	// end of it Pmnt 6:
		
		
//		it('it Pmnt 7: find the next button and click()', function() {
//			var pmntNextButton = element(by.id('nextButton'));
//			var nextButtonTextPostClick = 'Loading...';
//			
//			if (pmntNextButton.isDisplayed()){
//				pmntNextButton.click();
//				console.log('it Pmnt 7: Payment page finished. Next button clicked');
//			}else{
//				console.log('it Pmnt 7: pmntNextButton.isDisplayed in order to click() failed');
//			}
//
//			// Loading need to finish this some how.
////			expect(element(by.id('nextButton')).getAttribute('value')).toBe('Loading');
//			
//		//	browser.wait(ExpCond.textToBePresentInElementValue(pmntNextButton, 'Loading...'), 5000);
//		//	expect(pmntNextButton.getAttribute('value')).toBe('Loading...'); 
//			
//			browser.wait(ExpCond.textToBePresentInElementValue(pmntNextButton, nextButtonTextPostClick),5000);
//			expect(pmntNextButton.getAttribute('value')).toBe(nextButtonTextPostClick); 
//
//			browser.sleep(500);
//		});// end of it facs 5	
	
		
		
		
//		it('end sleep ',function(){
//			browser.sleep(1800);
//		});
		
		
		
//	});// Describe end  describe('Payment Information page', function(){

