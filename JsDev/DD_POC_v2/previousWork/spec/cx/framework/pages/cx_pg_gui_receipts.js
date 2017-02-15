//CX Automation Framework Libraries.
//--- Author : Uday Thombre (UThombre@delta.org)

var Controls = require('./cx_gui.json');
var Framework = require('./cx_environments.json');
var Commons = require('./cx_commons.js');
var CreditCards = require('./cx_creditcards.js');
var Structures = require('./cx_structures.js');
var Reporters = require('./cx_reporter.js');
var EC = protractor.ExpectedConditions;
var _map_plansummary = {};
var _map_payment_card = {};

var cxGUILibraries = {
		
	navigateToPage : function(parameters) {
		var current_url_index = parseInt(Framework.cx.Environments.current);
		var current_enroll_to_plan = Framework.cx.Environments.items[current_url_index];
		browser.baseUrl = current_enroll_to_plan.link;
		var selected_plan_to_enroll;
		browser.ignoreSynchronization = true;
		switch (parameters.Page)
		{
			case Structures.Navigation.PersonalInformationPage:
				browser.baseUrl = current_enroll_to_plan.link;
				Reporters.log({'Message' : 'Page URL:' + browser.baseUrl + Controls.cx.page.PersonalInformation.URI,
							   'Location' : Structures.ReportLocations.Console});

				browser.ignoreSynchronization = true;
				//--- browser.driver.get(browser.baseUrl + cx_gui.cx.page.PersonalInformation.URI);
				browser.driver.get(browser.baseUrl);
				this.keyInForMockEnrollment({'control' : Structures.Enroll.Dependents, 'data' : parameters.DataCSS});
				this.keyInForMockEnrollment({'control' : Structures.Enroll.Submit});
				break;
			case Structures.Navigation.BillingInformationPage:
				browser.baseUrl = current_enroll_to_plan.link;
				break;
			case Structures.Navigation.DependentsPage:
				browser.baseUrl = current_enroll_to_plan.link;
				Reporters.log({'Message' : 'Page URL:' + browser.baseUrl + Controls.cx.page.Dependents.URI,
							   'Location' : Structures.ReportLocations.Console});

				browser.ignoreSynchronization = true;
				browser.driver.get(browser.baseUrl);
				this.keyInForMockEnrollment({'control' : Structures.Enroll.Dependents, 'data' : parameters.DataCSS});
				this.keyInForMockEnrollment({'control' : Structures.Enroll.Submit});
				break;
			case Structures.Navigation.FacilitiesPage:
				browser.baseUrl = current_enroll_to_plan.link;
				Reporters.log({'Message' : 'Page URL:' + browser.baseUrl + Controls.cx.page.Facilities.URI,
							   'Location' : Structures.ReportLocations.Console});

				browser.ignoreSynchronization = true;
				browser.driver.get(browser.baseUrl);
				this.keyInForMockEnrollment({'control' : Structures.Enroll.Dependents, 'data' : parameters.DataCSS});
				this.keyInForMockEnrollment({'control' : Structures.Enroll.Submit});
				break;
			case Structures.Navigation.PaymentReviewPage:
				browser.baseUrl = current_enroll_to_plan.link;
				Reporters.log({'Message' : 'Page URL:' + browser.baseUrl + Controls.cx.page.Purchase.URI,
							   'Location' : Structures.ReportLocations.Console});

				browser.ignoreSynchronization = true;
				browser.driver.get(browser.baseUrl);
				this.keyInForMockEnrollment({'control' : Structures.Enroll.Dependents, 'data' : parameters.DataCSS});
				this.keyInForMockEnrollment({'control' : Structures.Enroll.Submit});
				break;
			case Structures.Navigation.DITGetAQuote:
				var _cx = {}
				_cx['Environment'] = Framework.cx.Environments.items[3];
				if (parameters.DataCSS) {
					_cx['Environment'].applicants = parameters.DataCSS.applicants;
					_cx['Environment'].planidentifier = parameters.DataCSS.planidentifier;
					_cx['Environment'].planidentifers = parameters.DataCSS.planidentifers;
				}
				_cx['EnrollTo'] = Framework.cx.page.DeltaDentalPlans;

				Reporters.log({'Message' : 'CX : Automation Framework : Current selected plan is ' + _cx['Environment'],
					   'Location' : Structures.ReportLocations.Console});
				Reporters.log({'Message' : 'CX : Automation Framework : Enroll to ' + _cx['EnrollTo'],
					   'Location' : Structures.ReportLocations.Console});
				var numberOfApplicants = Framework.cx.page.GetAQuote.NumberOfCovered.input.selector + ' option[value="' + _cx['Environment'].applicants + '"]';
				browser.baseUrl = _cx['Environment'].link;

				Reporters.log({'Message' : 'Page URL:' + browser.baseUrl + 'Number of Applicants' + numberOfApplicants,
					   'Location' : Structures.ReportLocations.Console});
				browser.ignoreSynchronization = true;
				browser.driver.get(browser.baseUrl);
				//--- Enter ZipCode, Select Number of Individuals to Cover & Get a Quote.
				Commons.keyIn({'Message' : 'CX Environment DIT-DEV : Enter Zipcode.',
							   'Control' : Framework.cx.page.GetAQuote.ZipCode.input.textbox,
							   'ControlType' : Structures.Locators.CSS,
							   'Text' : _cx['Environment'].zip});
				Commons.keyIn({'Message' : 'CX Environment DIT-DEV : Select Number of individuals to cover.',
							   'Control' : numberOfApplicants,
							   'ControlType' : Structures.Locators.CSS,
							   'Button' : true});
				Commons.keyIn({'Message' : 'CX Environment DIT-DEV : Get a Quote',
							   'Control' : Framework.cx.page.GetAQuote.Actions.Submit.input.button,
							   'ControlType' : Structures.Locators.CSS,
							   'Button' : true});
				//--- Select first plan to Enroll to.
				this._map_plansummary = this.selectDeltaDentalPlan({'EnrollTo' : _cx['EnrollTo'],
																	'Environment' : _cx['Environment']});			
				Commons.keyIn({'Message' : 'CX Environment DELTA DENTAL PLANS : Enroll to plan',
							   'Control' : _cx['EnrollTo'].plans.details.enroll,
							   'ControlType' : Structures.Locators.CSS,
							   'Button' : true});
				break;
			case Structures.Navigation.MOTGetAQuote:
				var _cx = {}
				_cx['Environment'] = Framework.cx.Environments.items[2];
				if (parameters.DataCSS) {
					_cx['Environment'].applicants = parameters.DataCSS.applicants;
					_cx['Environment'].planidentifier = parameters.DataCSS.planidentifier;
					_cx['Environment'].planidentifers = parameters.DataCSS.planidentifers;
				}
				_cx['EnrollTo'] = Framework.cx.page.DeltaDentalPlans;

				Reporters.log({'Message' : 'CX : Automation Framework : Current selected plan is ' + _cx['Environment'],
					   'Location' : Structures.ReportLocations.Console});
				Reporters.log({'Message' : 'CX : Automation Framework : Enroll to ' + _cx['EnrollTo'],
					   'Location' : Structures.ReportLocations.Console});
				Reporters.log({'Message' : 'CX : parameters.DataCSS.applicants ' + parameters.DataCSS.applicants,
					   'Location' : Structures.ReportLocations.Console});
				var numberOfApplicants = Framework.cx.page.GetAQuote.NumberOfCovered.input.selector + ' option[value="' + _cx['Environment'].applicants + '"]';
				browser.baseUrl = _cx['Environment'].link;

				Reporters.log({'Message' : 'Page URL:' + browser.baseUrl + 'Number of Applicants' + numberOfApplicants,
					   'Location' : Structures.ReportLocations.Console});
				browser.ignoreSynchronization = true;
				browser.driver.get(browser.baseUrl);
				//--- Enter ZipCode, Select Number of Individuals to Cover & Get a Quote.
				Commons.keyIn({'Message' : 'CX Environment MOT : Enter Zipcode.',
							   'Control' : Framework.cx.page.GetAQuote.ZipCode.input.textbox,
							   'ControlType' : Structures.Locators.CSS,
							   'Text' : _cx['Environment'].zip});
 				Commons.keyIn({'Message' : 'CX Environment MOT : Get a Quote',
							   'Control' : numberOfApplicants,
							   'ControlType' : Structures.Locators.CSS,
							   'Button' : true}); 
				Commons.keyIn({'Message' : 'CX Environment MOT : Get a Quote',
							   'Control' : Framework.cx.page.GetAQuote.Actions.Submit.input.button,
							   'ControlType' : Structures.Locators.CSS,
							   'Button' : true});
				//--- Select first plan to Enroll to.
				this._map_plansummary = this.selectDeltaDentalPlan({'EnrollTo' : _cx['EnrollTo'],
																	'Environment' : _cx['Environment']});			
				Commons.keyIn({'Message' : 'CX Environment DELTA DENTAL PLANS : Enroll to plan',
							   'Control' : _cx['EnrollTo'].plans.details.enroll,
							   'ControlType' : Structures.Locators.CSS,
							   'Button' : true});
				break;
			default:
				console.log('cx_gui_libraries.navigateToPage - pagetype request is not scripted yet');
				break;
		}
		//--- return browser.ignoreSynchronization = true;
	},
	
	//--- Valid parameters names : EnrollTo 
	selectDeltaDentalPlan : function(parameters) {
			var hashmap = {};		
			hashmap['Identifier'] = parameters.Environment.planidentifier;
			delta_cx.wait(function() {
			 return delta_cx.findElements(by.css(parameters.EnrollTo.plans.enrollidentifiers))
					  .then(function(elems) {
						hashmap['Identifier'] = elems[0].getAttribute('value');
						console.log('Current select plan is at location ' + 0 + ' & plan name is ' + hashmap['Identifier']);
						return true;
					  });
			},	Structures.LoadingWaitTimesFor.Page);
						
			//--- Collect Plan Summary Information.
			var btn_plandetails = parameters.EnrollTo.plans.details.link.toString().replace('PLANID', hashmap['Identifier']);
			Commons.keyIn({'Message' : 'CX : Environment : DELTA DENTAL PLANS : Collect Plan Summary Information.',
						   'Control' : btn_plandetails,
						   'ControlType' : Structures.Locators.CSS,
						   'Button' : true});
			
			hashmap['Cost'] = this.readAttribute('CX : Environment : DELTA DENTAL PLANS : Enrollment Annual Cost.',
												 parameters.EnrollTo.plans.quote,
												 'value');
			hashmap['StartDate'] = this.readText('CX : Environment : DELTA DENTAL PLANS : Enrollment Start Date.',
												parameters.EnrollTo.plans.startdate); 
			
			/* hashmap['StartDate'] = '_EMPTY_';
			hashmap['StartDate'] = Commons.readText({'Message' : 'CX : Environment : DELTA DENTAL PLANS : Enrollment Start Date.',
												  'Control' : parameters.EnrollTo.plans.startdate,
												  'ControlType' : Structures.Locators.CSS});
			if (hashmap['StartDate'] != '_EMPTY_') {hashmap['StartDate'] = hashmap['StartDate'].ReturnedValue;} */

			hashmap['Name'] = this.readAttribute('CX : Environment : DELTA DENTAL PLANS : Enrollment Plan Name.',
												 parameters.EnrollTo.plans.name,
												 'value'); 
			hashmap['Code'] = this.readAttribute('CX : Environment : DELTA DENTAL PLANS : Enrollment Plan Code.',
												 parameters.EnrollTo.plans.code,
												 'value'); 
			hashmap['Issuer'] = this.readText('CX : Environment : DELTA DENTAL PLANS : Enrollment Issuer.',
											parameters.EnrollTo.plans.issuer); 
			hashmap['CSRFToken'] = this.readText('CX : Environment : DELTA DENTAL PLANS : CSRFToken.',
											parameters.EnrollTo.plans.issuer); 
						
			Reporters.log({'Message' : 'Cost = ' + hashmap['Cost'],
						   'Location' : Structures.ReportLocations.Console,
						   'ScreenShot' : true});
			Reporters.log({'Message' : 'Start Date = ' + hashmap['StartDate'],
						   'Location' : Structures.ReportLocations.Console});
			Reporters.log({'Message' : 'Plan Name = ' + hashmap['Name'],
						   'Location' : Structures.ReportLocations.Console});
			Reporters.log({'Message' : 'Plan Code = ' + hashmap['Code'],
						   'Location' : Structures.ReportLocations.Console});
			Reporters.log({'Message' : 'Plan Issuer = ' + hashmap['Issuer'],
						   'Location' : Structures.ReportLocations.Console});
			Reporters.log({'Message' : 'Plan CSRFToken = ' + hashmap['CSRFToken'],
						   'Location' : Structures.ReportLocations.Console});
			
			//--- Collect all particulars of selected Delta Dental Plan Summary.
			delta_cx.wait(function() {
			 return delta_cx.findElements(by.css(parameters.EnrollTo.plans.details.summary.columns.particluars))
					  .then(function(elems) {
						hashmap['SummaryItems'] = elems.length;
						for (var index = 0; index < elems.length; index++) {
							hashmap[index] = { 'key' : elems[index], 'value' : '' };
							Reporters.log({'Message' : hashmap['SummaryItems'].key + ' = ' + hashmap['SummaryItems'].value,
										   'Location' : Structures.ReportLocations.Console});
						}
						return true;
					  });
			},	Structures.LoadingWaitTimesFor.Page);
			//--- Collect all particular details of selected Delta Dental Plan Summary.
			delta_cx.wait(function() {
			 return delta_cx.findElements(by.css(parameters.EnrollTo.plans.details.summary.columns.costs))
					  .then(function(elems) {
						for (var index = 0; index < elems.length; index++) {
							hashmap[index].value = elems[index];
							Reporters.log({'Message' : hashmap['SummaryItems'].key + ' = ' + hashmap['SummaryItems'].value,
										   'Location' : Structures.ReportLocations.Console});
						}
						return true;
					  });
			},	Structures.LoadingWaitTimesFor.Page);
			if (hashmap['SummaryItems']) {
				for (var index = 0; index < hashmap['SummaryItems'].length; index++) {
					//--- console.log(hashmap['SummaryItems'].key + ' = ' + hashmap['SummaryItems'].value);
					Reporters.log({'Message' : hashmap['SummaryItems'].key + ' = ' + hashmap['SummaryItems'].value,
						   'Location' : Structures.ReportLocations.Console});
				}
			}
			
			return hashmap;
	},
	
	getDeltaDentalPlanSummary : function() { return this._map_plansummary; },
	
	addTestApplicationId : function(logMessageTitle, forGUIButtonCSS) {
		//--- Click on the button
		delta_cx.wait(function() {
		 return delta_cx.findElement(by.css(forGUIButtonCSS))
				  .then(function(elem) {
					console.log(logMessageTitle);
					//--- <input type="hidden" name="appId" value="5967817">
					var inputElement = ($('<' +Controls.cx.page.dependents.AppIdParam.tag+ '></' +Controls.cx.page.dependents.AppIdParam.tag+ '>')
											.attr('type', Controls.cx.page.dependents.AppIdParam.type)
											.attr('name', Controls.cx.page.dependents.AppIdParam.name)
											.attr('value', Controls.cx.page.dependents.AppIdParam.value));
					elem.appendChild(inputElement);
					return true;
				  });
		},	Structures.LoadingWaitTimesFor.Page);
		return true;
	},
	
	takeScreenShot : function(logMessageTitle) {
		Reporters.log({'Message' :  logMessageTitle,
					   'Location' : Structures.ReportLocations.Console,
					   'ScreenShot' : true});
		//--- console.log('Screen Shot at : ' + logMessageTitle);
		var fileName = delta_cx_automation_suite.replace(':', '_').replace(' ', '_');
		fileName = fileName.concat(logMessageTitle.toString());
		fileName = fileName.concat(Math.random());
		/* var thisBrowser = 'internet explorer';
		browser.getCapabilities().then(function(caps){
			thisBrowser = caps.caps_.browserName;
		});
		fileName = thisBrowser.concat('_').concat(fileName); */
		fileName = fileName.replace(/:/g, '_');
		fileName = fileName.replace(' ', '_');
		fileName = fileName.replace('.', '-');
		fileName = fileName.replace('/', '');
		fileName = fileName.replace('(', '');
		fileName = fileName.replace(')', '');
		fileName = fileName.replace('\\', '');
		fileName = fileName.concat(".png");		
		var toScreenshotFile = delta_cx_dir_screenshots.concat(fileName);
		browser.takeScreenshot().then(
			function(png) {
				var fs = require('fs');
				var stream = fs.createWriteStream(toScreenshotFile);
				stream.write(new Buffer(png, 'base64'));
				stream.end();
			});
	},
	
	readText : function(logMessageTitle, forGUIObjectCSS) {
		var _text;
		//--- read GUI Text
		delta_cx.wait(function() {
		 return delta_cx.findElement(by.css(forGUIObjectCSS))
					  .then(function(elem) {
						return elem.getText().then(function(elem_text){
								_text = elem_text;
								console.log(logMessageTitle + '(' + _text + ')');
								return true;
							});
					  });
		},	Structures.LoadingWaitTimesFor.Page);
		return _text;
	},

	readAttribute : function(logMessageTitle, forGUIObjectCSS, ofAttribute) {
		var returnText = '';
		//--- read GUI Text
		delta_cx.wait(function() {
			return delta_cx.findElement(by.css(forGUIObjectCSS))
			.then(function(elem) {
				returnText = expect(elem.getAttribute(ofAttribute));
				console.log(logMessageTitle + ' of attribute (' + ofAttribute + ') value = ' + elem.getAttribute(ofAttribute));
				return true;
			});
			},	Structures.LoadingWaitTimesFor.Control);
		return returnText;
	},

	/* keyInTextBox : function(logMessageTitle, forGUITextBoxCSS, withText) {
		//--- Enter Name - First
		delta_cx.wait(function() {
		 return delta_cx.findElement(by.css(forGUITextBoxCSS))
			  .then(function(elem) {
				console.log(logMessageTitle + ' ' + withText);
				elem.sendKeys(withText);
				return true;
			  });
		},	Structures.LoadingWaitTimesFor.Control);
		this.takeScreenShot(logMessageTitle);
		return true;
	}, 
	 
	keyInArrayElementCSS : function(parameters) {
		//--- Enter into elements array data or click the selected object.
		console.log('For : ' + parameters.control + ' ' + parameters.text);
		var guiCSS = parameters.control.toString();
		var controlCSS = guiCSS.replace(parameters.key, parameters.value);
		console.log('Recalibrated CSS Selector : ' + controlCSS)
		if (controlCSS != 'NaN') {
			delta_cx.wait(function() {
				return delta_cx.findElement(by.css(controlCSS))
				  .then(function(elem) {
					console.log(parameters.message + ' : ' + elem + ' = ' + parameters.text);
					if (parameters.click_it === true) {
						elem.click();
					} else {
						elem.sendKeys(parameters.text);
					}
					return true;
				  });
			},	Structures.LoadingWaitTimesFor.Page);
		}
		this.takeScreenShot(parameters.message);
		return true;
	},
	*/
	
	keyInForMockEnrollment : function (parameters) {
		switch(parameters.control) {
			case this.ZipCode:
				Commons.keyIn({'Message' : 'MOCK Enrollment Page : Enter Zipcode. ',
							   'Control' : Framework.cx.page.EnrollData.Plan.ZipCode.input.textbox,
							   'ControlType' : Structures.Locators.CSS,
							   'Text' : parameters.data.zip});
				break;
				
			case Structures.Enroll.State: 
				Commons.keyIn({'Message' : 'MOCK Enrollment Page : Enter State.',
							   'Control' : Framework.cx.page.EnrollData.Plan.State.input.textbox,
							   'ControlType' : Structures.Locators.CSS,
							   'Text' : parameters.data.state});
				break;

			case Structures.Enroll.IssuerCode: 
				Commons.keyIn({'Message' : 'MOCK Enrollment Page : Enter Issuer Code.',
							   'Control' : Framework.cx.page.EnrollData.Issuer.Code.input.textbox,
							   'ControlType' : Structures.Locators.CSS,
							   'Text' : parameters.data.issuercode});
				break;

			case Structures.Enroll.CoverageType: 
				Commons.keyIn({'Message' : 'MOCK Enrollment Page : Enter Coverage Type.',
							   'Control' : Framework.cx.page.EnrollData.Issuer.Coverage.Type.input.textbox,
							   'ControlType' : Structures.Locators.CSS,
							   'Text' : parameters.data.coverage});
				break;

			case Structures.Enroll.StartDate: 
				Commons.keyIn({'Message' : 'MOCK Enrollment Page : Enter Start Date.',
							   'Control' : Framework.cx.page.EnrollData.Issuer.Coverage.StartDate.input.textbox,
							   'ControlType' : Structures.Locators.CSS,
							   'Text' : parameters.data.startdate});
				break;

			case Structures.Enroll.PlanIdentifier: 
				Commons.keyIn({'Message' : 'MOCK Enrollment Page : Enter Plan Identifier.',
							   'Control' : Framework.cx.page.EnrollData.Plan.Identifier.input.textbox,
							   'ControlType' : Structures.Locators.CSS,
							   'Text' : parameters.data.planidentifier});
				break;

			case Structures.Enroll.AnnualCost: 
				Commons.keyIn({'Message' : 'MOCK Enrollment Page : Enter Annual Cost.',
							   'Control' : Framework.cx.page.EnrollData.Issuer.Coverage.AnnualCost.input.textbox,
							   'ControlType' : Structures.Locators.CSS,
							   'Text' : parameters.data.cost});
				break;

			case Structures.Enroll.EnrollmentFee: 
				Commons.keyIn({'Message' : 'MOCK Enrollment Page : Enter Delta Dental Fees.',
							   'Control' : Framework.cx.page.EnrollData.Issuer.Coverage.Fees.input.textbox,
							   'ControlType' : Structures.Locators.CSS,
							   'Text' : parameters.data.fee});
				break;

			case Structures.Enroll.PlanName: 
				Commons.keyIn({'Message' : 'MOCK Enrollment Page : Enter Plan Name.',
							   'Control' : Framework.cx.page.EnrollData.Plan.Name.input.textbox,
							   'ControlType' : Structures.Locators.CSS,
							   'Text' : parameters.data.plan});
				break;

			case Structures.Enroll.PlanCode: 
				Commons.keyIn({'Message' : 'MOCK Enrollment Page : Enter Plan Code.',
							   'Control' : Framework.cx.page.EnrollData.Plan.Code.input.textbox,
							   'ControlType' : Structures.Locators.CSS,
							   'Text' : parameters.data.code});
				break;

			case Structures.Enroll.ApplicationIdentifier: 
				Commons.keyIn({'Message' : 'MOCK Enrollment Page : Enter Plan Code.',
							   'Control' : Framework.cx.page.EnrollData.Applicant.Identifier.input.textbox,
							   'ControlType' : Structures.Locators.CSS,
							   'Text' : parameters.data.code});
				break;

			case Structures.Enroll.Dependents: 
				Commons.keyIn({'Message' : 'MOCK Enrollment Page : Enter Plan Code.',
							   'Control' : Framework.cx.page.EnrollData.Applicant.Dependents.input.textbox,
							   'ControlType' : Structures.Locators.CSS,
							   'Text' : parameters.data.applicants});
				break;
			
			case Structures.Enroll.Submit:
				Commons.keyIn({'Message' : 'MOCK Enrollment Page : Submit Page.',
							   'Control' : Framework.cx.page.EnrollData.Submit.input.button,
							   'ControlType' : Structures.Locators.CSS,
							   'Button' : true});
				break;
				
			default:
				break;
		}
		return true;
	},
	
	//--- Valid parameter names : Control, DataCSS, IsNegativeTest
	keyInPIFor : function(parameters) {
		
		var broker_selected = false;
		var isNegativeTest = parameters.IsNegativeTest;
		var dataCSS = parameters.DataCSS;
		
		var mailing_address_selected = (parameters.IsNegativeTest === true) ? true : ((!parameters.DataCSS.MailingAddress.Street && !parameters.DataCSS.MailingAddress.City && !parameters.DataCSS.MailingAddress.State && !parameters.DataCSS.MailingAddress.Zip) ? true : false);
		

/* 		if (isNegativeTest === true) {
			mailing_address_selected = true;
		}
		else if (!parameters.DataCSS.MailingAddress.Street && !parameters.DataCSS.MailingAddress.City && !parameters.DataCSS.MailingAddress.State && !parameters.DataCSS.MailingAddress.Zip) {
			mailing_address_selected = true;
		} 
 */
		switch(parameters.Control) {

			case Structures.Profile.PrimaryName:
				Commons.keyIn({'Message' : 'Enter Primary / First Name : ',
							   'Control' : Controls.cx.page.PersonalInformation.Profile.Names.Primary.input.textbox,
							   'ControlType' : Structures.Locators.CSS,
							   'Text' : parameters.DataCSS.Profile.Name.First});
				break;

			case Structures.Profile.MiddleName:
				//--- Enter Name - Middle Initial
				Commons.keyIn({'Message' : 'Enter Primary / Middle Initial : ',
							   'Control' : Controls.cx.page.PersonalInformation.Profile.Names.Middle.input.textbox,
							   'ControlType' : Structures.Locators.CSS,
							   'Text' : parameters.DataCSS.Profile.Name.Middle});
				break;

			case Structures.Profile.LastName:
				//--- Enter Name - Last Name
				Commons.keyIn({'Message' : 'Enter Primary / Last Name : ',
							   'Control' : Controls.cx.page.PersonalInformation.Profile.Names.Last.input.textbox,
							   'ControlType' : Structures.Locators.CSS,
							   'Text' : parameters.DataCSS.Profile.Name.Last});				
				break;

			case Structures.Profile.Gender:
				//--- Select Gender
				Commons.keyIn({'Message' : 'Select Gender : ',
							   'Control' : Controls.cx.page.PersonalInformation.Profile.Gender.input.select,
							   'ControlType' : Structures.Locators.CSS,
							   'ListItem' : parameters.DataCSS.Profile.Gender});				
				break;

			case Structures.Profile.DOBMonth:
				//--- Enter Birthdate - Month
				Commons.keyIn({'Message' : 'Enter Birthdate - Month : ',
							   'Control' : Controls.cx.page.PersonalInformation.Profile.DOB.input.Month.selector,
							   'ControlType' : Structures.Locators.CSS,
							   'Text' : parameters.DataCSS.Profile.DOB.Month});				
				break;

			case Structures.Profile.DOBDate:
				//--- Enter Birthdate - Day
				Commons.keyIn({'Message' : 'Enter Birthdate - Day : ',
							   'Control' : Controls.cx.page.PersonalInformation.Profile.DOB.input.Day.selector,
							   'ControlType' : Structures.Locators.CSS,
							   'Text' : parameters.DataCSS.Profile.DOB.Day});
				break;

			case Structures.Profile.DOBYear:
				//--- Enter Birthdate - Year
				Commons.keyIn({'Message' : 'Enter Birthdate - Year : ',
							   'Control' : Controls.cx.page.PersonalInformation.Profile.DOB.input.Year.selector,
							   'ControlType' : Structures.Locators.CSS,
							   'Text' : parameters.DataCSS.Profile.DOB.Year});
				break;

			case Structures.Profile.SSNumber:
				//--- Enter Social Security
				Commons.keyIn({'Message' : 'Enter SSN : ',
							   'Control' : Controls.cx.page.PersonalInformation.Profile.SSN.input.textbox,
							   'ControlType' : Structures.Locators.CSS,
							   'Text' : parameters.DataCSS.Profile.SSN});
				break;

			case Structures.Profile.AlternateIdentifier:
				//--- Enter Alternate Identifier
				Commons.keyIn({'Message' : 'Enter Alternate Identifier : ',
							   'Control' : Controls.cx.page.PersonalInformation.Profile.SSN.AlternateIdentifier.input.textbox,
							   'ControlType' : Structures.Locators.CSS,
							   'Text' : parameters.DataCSS.Profile.AlternateIdentifier});
				break;
				
			case Structures.Profile.ContactStreet:
				//--- Enter Contact Street Address
				Commons.keyIn({'Message' : 'Enter Contact Address Street : ',
							   'Control' : Controls.cx.page.PersonalInformation.Contact.Address.Street.input.textbox,
							   'ControlType' : Structures.Locators.CSS,
							   'Text' : parameters.DataCSS.Contact.Street});
				break;

			case Structures.Profile.ContactCity:
				//--- Enter Contact Street City
				Commons.keyIn({'Message' : 'Enter Contact Address City : ',
							   'Control' : Controls.cx.page.PersonalInformation.Contact.Address.City.input.textbox,
							   'ControlType' : Structures.Locators.CSS,
							   'Text' : parameters.DataCSS.Contact.City});
				break;

			case Structures.Profile.ContactState:
				//--- Enter Contact Street State
				Commons.keyIn({'Message' : 'Enter Contact Address State : ',
							   'Control' : Controls.cx.page.PersonalInformation.Contact.Address.State.input.textbox,
							   'ControlType' : Structures.Locators.CSS,
							   'Text' : parameters.DataCSS.Contact.State});
				break;

			case Structures.Profile.ContactZip:
				//--- Enter Contact Street City
				Commons.keyIn({'Message' : 'Enter Contact Address Zip : ',
							   'Control' : Controls.cx.page.PersonalInformation.Contact.Address.Zip.input.textbox,
							   'ControlType' : Structures.Locators.CSS,
							   'Text' : parameters.DataCSS.Contact.Zip});
				break;

			case Structures.Profile.ContactZipAlertGoBack:
				//--- Service/Contact Zip Code Change : Alert Dialog : Go Back
				Commons.keyIn({'Message' : 'CX : Service/Contact Zip Code Change : Alert Dialog : Go Back',
							   'Control' : Controls.cx.page.PersonalInformation.Contact.Address.Zip.overlay.alert.GoBack.input.link,
							   'ControlType' : Structures.Locators.CSS,
							   'Button' :  true});
				break;
			
			case Structures.Profile.ContactZipAlertNewQuote:
				//--- Service/Contact Zip Code Change : Alert Dialog : New Quote
				Commons.keyIn({'Message' : 'CX : Service/Contact Zip Code Change : Alert Dialog : New Quote',
							   'Control' : Controls.cx.page.PersonalInformation.Contact.Address.Zip.overlay.alert.NewQuote.input.button,
							   'ControlType' : Structures.Locators.CSS,
							   'Button' : true});
				break;
			
			case Structures.Profile.MailingAddress:
				Commons.keyIn({'Message' : 'Select/Unselect Different Mailing Address : ',
							   'Control' : Controls.cx.page.PersonalInformation.Contact.MailingAddress.Different.input.checkbox,
							   'ControlType' : Structures.Locators.CSS,
							   'Checkbox' : (mailing_address_selected === true) ? Structures.FrameworkUIActions.Check : Structures.FrameworkUIActions.UnCheck});
				break;

			case Structures.Profile.MailingAddressStreet:
				//--- Select Different Mailing Address - Street
				if (mailing_address_selected === true) {
					Commons.keyIn({'Message' : "Enter Contact's Different Mailing Address - Street : ",
							   'Control' : Controls.cx.page.PersonalInformation.Contact.MailingAddress.Street.input.textbox,
							   'ControlType' : Structures.Locators.CSS,
							   'Text' : parameters.DataCSS.MailingAddress.Street});
				}
				break;

			case Structures.Profile.MailingAddressCity:
				//--- Select Different Mailing Address - City
				if (mailing_address_selected === true) {					
					Commons.keyIn({'Message' : "Enter Contact's Different Mailing Address - City : ",
							   'Control' : Controls.cx.page.PersonalInformation.Contact.MailingAddress.City.input.textbox,
							   'ControlType' : Structures.Locators.CSS,
							   'Text' : parameters.DataCSS.MailingAddress.City});
				}
				break;

			case Structures.Profile.MailingAddressState:
				//--- Select Different Mailing Address - State
				if (mailing_address_selected === true) {
					Commons.keyIn({'Message' : "Enter Contact's Different Mailing Address - State : ",
							   'Control' : Controls.cx.page.PersonalInformation.Contact.MailingAddress.State.input.textbox,
							   'ControlType' : Structures.Locators.CSS,
							   'Text' : parameters.DataCSS.MailingAddress.State});
				}
				break;

			case Structures.Profile.MailingAddressZip:
				//--- Select Different Mailing Address - Zip
				if (mailing_address_selected === true) {
					Commons.keyIn({'Message' : "Enter Contact's Different Mailing Address - Zip : ",
							   'Control' : Controls.cx.page.PersonalInformation.Contact.MailingAddress.Zip.input.textbox,
							   'ControlType' : Structures.Locators.CSS,
							   'Text' : parameters.DataCSS.MailingAddress.Zip});
				}
				break;

			case Structures.Profile.PhoneType:
				//--- Select Phone Type
				Commons.keyIn({'Message' : 'Select Phone Type : ' + parameters.DataCSS.Contact.PhoneType,
							   'Control' : Controls.cx.page.PersonalInformation.Contact.Phone.Category.input.select,
							   'ControlType' : Structures.Locators.CSS,
							   'ListItem' : parameters.DataCSS.Contact.PhoneType.toUpperCase()});	
				break;

			case Structures.Profile.PhoneNumber:
				//--- Enter Phone Number
				Commons.keyIn({'Message' : 'Enter Contact Phone Number : ',
							   'Control' : Controls.cx.page.PersonalInformation.Contact.Phone.Number.input.textbox,
							   'ControlType' : Structures.Locators.CSS,
							   'Text' : parameters.DataCSS.Contact.Phone});
				break;

			case Structures.Profile.EmailAddress:
				//--- Enter Email Address
				Commons.keyIn({'Message' : 'Enter Contact Email Address : ',
							   'Control' : Controls.cx.page.PersonalInformation.Contact.Email.input.textbox,
							   'ControlType' : Structures.Locators.CSS,
							   'Text' : parameters.DataCSS.Contact.Email});
				break;

			case Structures.Profile.GoPaperless:
				//--- Select/Unselect Go Paperless option
				Commons.keyIn({'Message' : 'Select/Unselect Go Paperless option : ',
							   'Control' : Controls.cx.page.PersonalInformation.Contact.Paperless.input.checkbox,
							   'ControlType' : Structures.Locators.CSS,
							   'Checkbox' : (parameters.DataCSS.GoPaperless === 'Yes') ? Structures.FrameworkUIActions.Check : Structures.FrameworkUIActions.UnCheck});
				break;

			case Structures.Profile.BrokerWorked:
				//--- Select/Unselect Have Broker option
				Commons.keyIn({'Message' : 'Select/Unselect Have Broker option : ',
							   'Control' : Controls.cx.page.PersonalInformation.Contact.Broker.IsPresent.input.checkbox,
							   'ControlType' : Structures.Locators.CSS,
							   'Checkbox' : (parameters.DataCSS.Broker.Have === 'Yes') ? Structures.FrameworkUIActions.Check : Structures.FrameworkUIActions.UnCheck});
				break;

			case Structures.Profile.BrokerNumber:
				//--- Enter Broker Number
				Commons.keyIn({'Message' : 'Enter Broker Number : ',
							   'Control' : Controls.cx.page.PersonalInformation.Contact.Broker.Number.input.textbox,
							   'ControlType' : Structures.Locators.CSS,
							   'Text' : parameters.DataCSS.Broker.Number,
							   'TabAway' : true});
				break;

			case Structures.Profile.BrokerName:
				//--- Validate Broker Name
				Commons.verifyText({'Message' : 'Validate Broker Name : ' + parameters.DataCSS.Broker.Name,
									'Control' : Controls.cx.page.PersonalInformation.Contact.Broker.Name.input.textbox,
									'ControlType' : Structures.Locators.CSS,
									'QuestText' : parameters.DataCSS.Broker.Name});
				break;

			case Structures.Profile.Next:
				//--- ACTION NEXT - Personal Information Page
				Commons.keyIn({'Message' : 'ACTION NEXT - Personal Information Page',
							   'Control' : Controls.cx.page.PersonalInformation.Action.Next.input.button,
							   'ControlType' : Structures.Locators.CSS,
							   'Button' : true});
				break;

			default:
				break;
		}
	},
	
	//--- Valid parameter name : Control, DataCSS, Indice
	keyInDependentsFor : function(parameters) {
		
		switch(parameters.Control) {
			
			case Structures.Dependents.Back:
				Commons.keyIn({'Message' : 'ACTION BACK - Dependents Page',
							   'Control' : Controls.cx.page.Dependents.Action.Back.input.button,
							   'ControlType' : Structures.Locators.CSS,
							   'Button' :  true});
				break;
			
			case Structures.Dependents.Next:
				Commons.keyIn({'Message' : 'ACTION NEXT - Dependents Page',
							   'Control' : Controls.cx.page.Dependents.Action.Next.input.button,
							   'ControlType' : Structures.Locators.CSS,
							   'Button' : true});
				break;
			
			case Structures.Dependents.Add:
				Commons.keyIn({'Message' : 'ACTION ADD - Dependents Page for dependent # :' + parseInt(parameters.DataCSS.Index),
							   'Control' : Controls.cx.page.Dependents.Action.Add.input.button,
							   'ControlType' : Structures.Locators.CSS,
							   'Button' : true});
				break;

			case this.OnAlertBack:
				Commons.keyIn({'Message' : 'ACTION ON ALERT GO BACK - Dependents Page',
							   'Control' : Controls.cx.page.Dependents.Form.PremiumChange.Action.Back.input.button,
							   'ControlType' : Structures.Locators.CSS,
							   'Button' : true});
				break;

			case this.OnAlertContinue: 
				Commons.keyIn({'Message' : 'ACTION ON ALERT CONTINUE - Dependents Page',
							   'Control' : Controls.cx.page.Dependents.Form.PremiumChange.Action.Continue.input.button,
							   'ExceptionalWaitTime' : true,
							   'ControlType' : Structures.Locators.CSS,
							   'Button' : true});
				break;
		
			case Structures.Dependents.Relationship: 
				//--- Select Dependent's Relationship
				var xpathRelationship = "" 
				if (parameters.DataCSS.Relationship === 'Select Relation') {
					xpathRelationship = Controls.cx.page.Dependents.Individual.Relationship.input.xpath.items.SelectRelation
				}
				if (parameters.DataCSS.Relationship === 'Spouse') {
					xpathRelationship = Controls.cx.page.Dependents.Individual.Relationship.input.xpath.items.Spouse
				}
				if (parameters.DataCSS.Relationship === 'Domestic Partner') {
					xpathRelationship = Controls.cx.page.Dependents.Individual.Relationship.input.xpath.items.DomesticPartner
				}
				if (parameters.DataCSS.Relationship === 'Child') {
					xpathRelationship = Controls.cx.page.Dependents.Individual.Relationship.input.xpath.items.Child
				}
				Commons.keyIn({'Message' : 'Select Dependent Relationship for dependent # : ' + parameters.DataCSS.Index,
							   'Control' : Controls.cx.page.Dependents.Individual.Relationship.input.xpath.selector + xpathRelationship,
							   'ControlType' : Structures.Locators.XPATH,
							   'ReplaceIdentifier' : 'DEPEND',
							   'ReplaceWith' : parameters.DataCSS.Index,
							   'ListItem' : parameters.DataCSS.Relationship});
				break;

			case Structures.Dependents.FirstName:
				//--- Enter Dependent First Name
				Commons.keyIn({'Message' : 'Enter Dependent First Name for dependent # : ' + parameters.DataCSS.Index,
							   'Control' : Controls.cx.page.Dependents.Individual.Name.First.input.xpath.textbox,
							   'ControlType' : Structures.Locators.XPATH,
							   'ReplaceIdentifier' : 'DEPEND',
							   'ReplaceWith' : parameters.DataCSS.Index,
							   'Text' : parameters.DataCSS.Name.First});
				break;

			case Structures.Dependents.MiddleInitial:
				//--- Enter Dependent Middle Initial
				Commons.keyIn({'Message' : 'Enter Dependent Middle Initial for dependent # : ' + parameters.DataCSS.Index,
							   'Control' : Controls.cx.page.Dependents.Individual.Name.Middle.input.xpath.textbox,
							   'ControlType' : Structures.Locators.XPATH,
							   'ReplaceIdentifier' : 'DEPEND',
							   'ReplaceWith' : parameters.DataCSS.Index,
							   'Text' : parameters.DataCSS.Name.Middle});
				break;

			case Structures.Dependents.LastName:
				//--- Enter Dependent Last Name
				Commons.keyIn({'Message' : 'Enter Dependent Last Name for dependent # : ' + parameters.DataCSS.Index,
							   'Control' : Controls.cx.page.Dependents.Individual.Name.Last.input.xpath.textbox,
							   'ControlType' : Structures.Locators.XPATH,
							   'ReplaceIdentifier' : 'DEPEND',
							   'ReplaceWith' : parameters.DataCSS.Index,
							   'Text' : parameters.DataCSS.Name.Last});
				break;

			case Structures.Dependents.Gender:
				//--- Select Dependent's Gender
				var xpathGender = "" 
				if (parameters.DataCSS.Gender === 'Select Gender') {
					xpathGender = Controls.cx.page.Dependents.Individual.Gender.input.xpath.items.SelectGender
				}
				if (parameters.DataCSS.Gender === 'Female') {
					xpathGender = Controls.cx.page.Dependents.Individual.Gender.input.xpath.items.Female
				}
				if (parameters.DataCSS.Gender === 'Male') {
					xpathGender = Controls.cx.page.Dependents.Individual.Gender.input.xpath.items.Male
				}
				if (parameters.DataCSS.Gender === 'Non binary') {
					xpathGender = Controls.cx.page.Dependents.Individual.Gender.input.xpath.items.NonBinary
				}
				if (parameters.DataCSS.Gender === 'Prefer not to say') {
					xpathGender = Controls.cx.page.Dependents.Individual.Gender.input.xpath.items.PreferNotToSay
				}
				Commons.keyIn({'Message' : 'Select Dependent Gender for dependent # : ' + parameters.DataCSS.Index,
							   'Control' : Controls.cx.page.Dependents.Individual.Gender.input.xpath.selector + xpathGender,
							   'ControlType' : Structures.Locators.XPATH,
							   'ReplaceIdentifier' : 'DEPEND',
							   'ReplaceWith' : parameters.DataCSS.Index,
							   'ListItem' : parameters.DataCSS.Gender});
				break;

			case Structures.Dependents.DOBMonth:
				//--- Enter Dependent's Birthdate - Month
				Commons.keyIn({'Message' : 'Enter Dependent Birthdate - Month for dependent # : ' + parameters.DataCSS.Index,
							   'Control' : Controls.cx.page.Dependents.Individual.DOB.input.Month.xpath.textbox,
							   'ControlType' : Structures.Locators.XPATH,
							   'ReplaceIdentifier' : 'DEPEND',
							   'ReplaceWith' : parameters.DataCSS.Index,
							   'Text' : parameters.DataCSS.DOB.Month});
				break;

			case Structures.Dependents.DOBDate:
				//--- Enter Dependent's Birthdate - Day
				Commons.keyIn({'Message' : 'Enter Dependent Birthdate - Day for dependent # : ' + parameters.DataCSS.Index,
							   'Control' : Controls.cx.page.Dependents.Individual.DOB.input.Day.xpath.textbox,
							   'ControlType' : Structures.Locators.XPATH,
							   'ReplaceIdentifier' : 'DEPEND',
							   'ReplaceWith' : parameters.DataCSS.Index,
							   'Text' : parameters.DataCSS.DOB.Day});
				break;

			case Structures.Dependents.DOBYear:
				//--- Enter Dependent's Birthdate - Year
				Commons.keyIn({'Message' : 'Enter Dependent Birthdate - Year for dependent # : ' + parameters.DataCSS.Index,
							   'Control' : Controls.cx.page.Dependents.Individual.DOB.input.Year.xpath.textbox,
							   'ControlType' : Structures.Locators.XPATH,
							   'ReplaceIdentifier' : 'DEPEND',
							   'ReplaceWith' : parameters.DataCSS.Index,
							   'Text' : parameters.DataCSS.DOB.Year});
				break;				
			
			default:
				break;
		}
	},

	//--- Valid parameter names : Control, DataCSS, Indice
	keyInFacilitiesFor : function(parameters) {
		switch(parameters.Control) {
			
			case Structures.Facilities.Search:
				Commons.keyIn({'Message' : 'ACTION SEARCH - Facilities Page',
							   'Control' : Controls.cx.page.Facilities.Action.Search.input.button,
							   'ControlType' : Structures.Locators.CSS,
							   'Button' : true});
				break;

			case Structures.Facilities.Back:
				Commons.keyIn({'Message' : 'ACTION BACK - Facilities Page',
							   'Control' : Controls.cx.page.Facilities.Action.Back.input.button,
							   'ControlType' : Structures.Locators.CSS,
							   'Button' : true});
				break;

			case Structures.Facilities.Next:
				Commons.keyIn({'Message' : 'ACTION NEXT - Facilities Page',
							   'Control' : Controls.cx.page.Facilities.Action.Next.input.button,
							   'ControlType' : Structures.Locators.CSS,
							   'Button' : true});
				break;

			case Structures.Facilities.MoreResults:
				Commons.keyIn({'Message' : 'ACTION MORE RESULTS - Facilities Page',
							   'Control' : Controls.cx.page.Facilities.Action.MoreResults.input.button,
							   'ControlType' : Structures.Locators.CSS,
							   'Button' : true});
				break;

			case Structures.Facilities.More:
				Commons.keyIn({'Message' : 'ACTION MORE - Facilities Page',
							   'Control' : Controls.cx.page.Facilities.Facility.Details.More.input.button,
							   'ControlType' : Structures.Locators.CSS,
							   'ReplaceIdentifier' : 'index',
							   'ReplaceWith' : index,
							   'Button' : true});
				break;

			case Structures.Facilities.Less:
				Commons.keyIn({'Message' : 'ACTION LESS - Facilities Page',
							   'Control' : Controls.cx.page.Facilities.Facility.Details.Less.input.button,
							   'ControlType' : Structures.Locators.CSS,
							   'ReplaceIdentifier' : '',
							   'ReplaceWith' : index,
							   'Button' : true});
				break;

			case Structures.Facilities.Facility:
				//--- Select the location computed facility.
				Commons.keyIn({'Message' : 'Facilities Page : Select facility at location (' + parameters.DataCSS + ')',
							   'Control' : Controls.cx.page.Facilities.Facility.input.select,
							   'ControlType' : Structures.Locators.CSS,
							   'ReplaceIdentifier' : 'FACILITYID',
							   'ReplaceWith' : parameters.DataCSS,
							   'Button' : true});
				break;

			case Structures.Facilities.Applicants:
				break;
				
			case Structures.Facilities.RecentlySelected:
				break;
				
			case Structures.Facilities.Enrollee:
				break;
				
			default:
				break;
		}
		return true;
	},
	
	//--- Valid parameter names : Control, DataCSS, HasMailingAddress, SaveForFuture, AgreeAuthorization, CardCategory, CardLocale
	keyInPaymentReviewFor : function(parameters) {
		switch(parameters.Control) {

			case Structures.PaymentReview.NameOnCard:
				Commons.keyIn({'Message' : 'Enter Card - Name : ',
							   'Control' : Controls.cx.page.Purchase.Card.Name.input.textbox,
							   'ControlType' : Structures.Locators.CSS,
							   'Text' : parameters.DataCSS.Card.Name});
				break;
				
			case Structures.PaymentReview.CardNumber:
				/* var _premium = this.readText('CX : Payments & Receipt page : Collect Premium amount from Summary.', 
											 Controls.cx.page.commons.Summary.Plan.Premium.label);
				console.log('Premium = ' + _premium); */
				/* Commons.evaluatePlanSummary({'Item' : Commons.PlanSummary.Premium,
											 'Message' : 'CX : Payments & Receipt page : Collect Premium amount from Summary.'})
				var _premium = Commons.getPlanSummary();
				console.log(_premium.Plan.Premium);
				this._map_payment_card = CreditCards.selectPaymentCreditCard({'CardCategory' : parameters.CardCategory, 
																			   'CardLocale' : parameters.CardLocale, 
																			   'CardSelectionIndex' : parameters.DataCSS.Card.Index, 
																			   'CardLocaleIndex' : parameters.DataCSS.Card.LocaleIndex,
																			   'Premium' : _premium});		
				Commons.keyIn({'Message' : 'Enter Card - Number : ',
							   'Control' : Controls.cx.page.Purchase.Card.Number.input.textbox,
							   'ControlType' : Structures.Locators.CSS,
							   'Text' : this._map_payment_card['Number']});
				*/
				Commons.keyIn({'Message' : 'Enter Card - Number : ',
							   'Control' : Controls.cx.page.Purchase.Card.Number.input.textbox,
							   'ControlType' : Structures.Locators.CSS,
							   'Text' : parameters.DataCSS.Card.Number});
				break;

			case Structures.PaymentReview.ExpirationMonth:
				/*Commons.keyIn({'Message' : 'Enter Card - Expiration Month : ',
							   'Control' : Controls.cx.page.Purchase.Card.ExpirationDate.input.Month.selector,
							   'ControlType' : Structures.Locators.CSS,
							   'Text' : this._map_payment_card['ExpirationMonth']); */
				Commons.keyIn({'Message' : 'Enter Card - Expiration Month : ',
							   'Control' : Controls.cx.page.Purchase.Card.ExpirationDate.input.Month.selector,
							   'ControlType' : Structures.Locators.CSS,
							   'Text' : parameters.DataCSS.Card.Expiration.Month});
				break;

			case Structures.PaymentReview.ExpirationYear:
				/* Commons.keyIn({'Message' : 'Enter Card - Expiration Year : ',
							   'Control' : Controls.cx.page.Purchase.Card.ExpirationDate.input.Year.selector,
							   'ControlType' : Structures.Locators.CSS,
							   'Text' : this._map_payment_card['ExpirationYear']); */
				Commons.keyIn({'Message' : 'Enter Card - Expiration Year : ',
							   'Control' : Controls.cx.page.Purchase.Card.ExpirationDate.input.Year.selector,
							   'ControlType' : Structures.Locators.CSS,
							   'Text' : parameters.DataCSS.Card.Expiration.Year});
				break;

			case Structures.PaymentReview.SecurityCode:
				Commons.keyIn({'Message' : 'Enter Card - Security Code CVV : ',
							   'Control' : Controls.cx.page.Purchase.Card.CCVCode.input.textbox,
							   'ControlType' : Structures.Locators.CSS,
							   'Text' : parameters.DataCSS.Card.CCVNumber});
				break;

			case Structures.PaymentReview.HasMailingAddress:
				Commons.keyIn({'Message' : 'ACTION HAS MAILING ADDRESS - Purchase & Receipt Page',
							   'Control' : Controls.cx.page.Purchase.Card.BillingAddress.SameBillingAddress.input.checkbox,
							   'ControlType' : Structures.Locators.CSS,
							   'Checkbox' : parameters.HasMailingAddress});
				break;

			case Structures.PaymentReview.MailingStreet:
				Commons.keyIn({'Message' : 'Enter Card - Mailing Home Address : ',
							   'Control' : Controls.cx.page.Purchase.Card.BillingAddress.Address.Street.input.textbox,
							   'ControlType' : Structures.Locators.CSS,
							   'Text' : parameters.DataCSS.Card.MailingAddress.Street});
				break;

			case Structures.PaymentReview.MailingCity:
				Commons.keyIn({'Message' : 'Enter Card - Mailing Home City : ',
							   'Control' : Controls.cx.page.Purchase.Card.BillingAddress.Address.City.input.textbox,
							   'ControlType' : Structures.Locators.CSS,
							   'Text' : parameters.DataCSS.Card.MailingAddress.City});
				break;

			case Structures.PaymentReview.MailingState:
				Commons.keyIn({'Message' : 'Enter Card - Mailing Home State : ',
							   'Control' : Controls.cx.page.Purchase.Card.BillingAddress.Address.State.input.textbox,
							   'ControlType' : Structures.Locators.CSS,
							   'Text' : parameters.DataCSS.Card.MailingAddress.State});
				break;

			case Structures.PaymentReview.MailingZip:
				Commons.keyIn({'Message' : 'Enter Card - Mailing Home Zip Code : ',
							   'Control' : Controls.cx.page.Purchase.Card.BillingAddress.Address.Zip.input.textbox,
							   'ControlType' : Structures.Locators.CSS,
							   'Text' : parameters.DataCSS.Card.MailingAddress.Zip});
				break;

			case Structures.PaymentReview.SaveForFuture:
				Commons.keyIn({'Message' : 'ACTION SAVE FOR FUTURE - Purchase & Receipt Page',
							   'Control' : Controls.cx.page.Purchase.Card.SaveForFuture.input.checkbox,
							   'ControlType' : Structures.Locators.CSS,
							   'Checkbox' : parameters.SaveForFuture});
				break;

			case Structures.PaymentReview.AgreeAuthorization:
				Commons.keyIn({'Message' : 'ACTION HAVE READ AUTHORIZATION AGREEMENT - Purchase & Receipt Page',
							   'Control' : Controls.cx.page.Purchase.Authorization.Agreement.input.checkbox,
							   'ControlType' : Structures.Locators.CSS,
							   'Checkbox' : parameters.AgreeAuthorization});
				break;

			case Structures.PaymentReview.ReceiptDownload:
				Commons.keyIn({'Message' : 'ACTION DOWNLOAD DISCLOSURE FORM OR CONTRACT IN PDF - Purchase & Receipt Page',
							   'Control' : Controls.cx.page.Purchase.DisclosureFormContract.DownloadCopy.input.checkbox,
							   'ControlType' : Structures.Locators.CSS,
							   'Checkbox' : true});
				break;

			case Structures.PaymentReview.ReceiptPostage:
				Commons.keyIn({'Message' : 'ACTION SEND DISCLOSURE FORM OR CONTRACT VIA POSTAGE - Purchase & Receipt Page',
							   'Control' : Controls.cx.page.Purchase.DisclosureFormContract.PostACopy.input.checkbox,
							   'ControlType' : Structures.Locators.CSS,
							   'Checkbox' : true});
				break;

			case Structures.PaymentReview.PlanSummary:
				Commons.keyIn({'Message' : 'ACTION DROPDOWN PLAN SUMMARY - Purchase & Receipt Page',
							   'Control' : Controls.cx.page.Purchase.Action.PlanSummary.input.toggler,
							   'ControlType' : Structures.Locators.CSS,
							   'Button' : true});
				break;

			case Structures.PaymentReview.Applicants:
				Commons.keyIn({'Message' : 'ACTION DROPDOWN APPLICANTS - Purchase & Receipt Page',
							   'Control' : Controls.cx.page.Purchase.Action.Applicants.input.toggler,
							   'ControlType' : Structures.Locators.CSS,
							   'Button' : true});
				break;

			case Structures.PaymentReview.WhatIsThis:
				Commons.keyIn({'Message' : 'ACTION WHAT IS THIS? - Purchase & Receipt Page',
							   'Control' : Controls.cx.page.Purchase.Action.WhatIsThis.input.link,
							   'ControlType' : Structures.Locators.CSS,
							   'Button' : true});
				break;

			case Structures.PaymentReview.DisclosureForContract:
				Commons.keyIn({'Message' : 'ACTION DISCLOSURE FOR CONTRACT? - Purchase & Receipt  Page',
							   'Control' : Controls.cx.page.Purchase.Action.DisclosureFormContact.input.link,
							   'ControlType' : Structures.Locators.CSS,
							   'Button' : true});
				break;

			case Structures.PaymentReview.Back:
				Commons.keyIn({'Message' : 'ACTION BACK - Purchase & Receipt  Page',
							   'Control' : Controls.cx.page.Purchase.Action.Back.input.button,
							   'ControlType' : Structures.Locators.CSS,
							   'Button' : true});
				break;

			case Structures.PaymentReview.PurchaseNow:
				Commons.keyIn({'Message' : 'ACTION PURCHASE NOW - Purchase & Receipt  Page',
							   'Control' : Controls.cx.page.Purchase.Action.PurchaseNow.input.button,
							   'ControlType' : Structures.Locators.CSS,
							   'Button' : true});
				break;
		
			default:
				break;
		}
	},
	
	verifyText : function (logMessageTitle, forGUITextBoxCSSOrXPATH, withText, isXPATHSearch=false) {
		var _text;
		//--- verify getText() contents with expected text data
		if (isXPATHSearch == false) {
			delta_cx.wait(function() {
			 return delta_cx.findElement(by.css(forGUITextBoxCSSOrXPATH))
					  .then(function(elem) {
						expect(elem.getText()).toEqual(withText);
						_text = elem.getText();
						console.log(logMessageTitle + ' ' + withText);
						return true;
					  });
			},	Structures.LoadingWaitTimesFor.Control);
		} else {
			delta_cx.wait(function() {
			 return delta_cx.findElement(by.xpath(forGUITextBoxCSSOrXPATH))
					  .then(function(elem) {
						expect(elem.getText()).toEqual(withText);
						_text = elem.getText();
						console.log(logMessageTitle + ' ' + withText);
						return true;
					  });
			},	Structures.LoadingWaitTimesFor.Control);
		}
		this.takeScreenShot(logMessageTitle);
		return _text;
	},

	verifyNumericText : function (logMessageTitle, forGUITextBoxCSS, withText, isGreaterOK=true) {
		//--- verify getText() contents with expected text data
//		var numeric_text = this.readText(logMessageTitle, forGUITextBoxCSS);
//		if (isGreaterOK) {
//			expect(parseInt(numeric_text)).toBeGreaterThanOrEqualTo(parseInt(withText));
//		} else {
//			expect(parseInt(numeric_text)).toEqual(parseInt(withText));
//		}
		delta_cx.wait(function() {
		 return delta_cx.findElement(by.css(forGUITextBoxCSS))
				  .then(function(elem) {
					console.log(logMessageTitle + ' ' + withText);
					expect(parseInt(elem.getText())).toEqual(-1);
					return true;
				  });
		},	Structures.LoadingWaitTimesFor.Page);
		this.takeScreenShot(logMessageTitle);

		return true;
	},

	verifyAttibuteText : function (logMessageTitle, forGUITextBoxCSSorXPATH, withAttributeCSS, byValue, isXPATHSearch=false) {
		//--- verify getText() contents with expected text data
		if (isXPATHSearch == false) {
			delta_cx.wait(function() {
				 return delta_cx.findElement(by.css(forGUITextBoxCSSorXPATH))
						  .then(function(elem) {
							expect(elem.getAttribute(withAttributeCSS)).toEqual(byValue);
							console.log(logMessageTitle + ' ' + elem.getAttribute(withAttributeCSS));
							return true;
						  });
				},	Structures.LoadingWaitTimesFor.Control);
		} else {
			delta_cx.wait(function() {
				 return delta_cx.findElement(by.xpath(forGUITextBoxCSSorXPATH))
						  .then(function(elem) {
							expect(elem.getAttribute(withAttributeCSS)).toEqual(byValue);
							console.log(logMessageTitle + ' ' + elem.getAttribute(withAttributeCSS));
							return true;
						  });
				},	Structures.LoadingWaitTimesFor.Control);
		}
		this.takeScreenShot(logMessageTitle);
		return true;
	},

	verifyCheckbox : function (logMessageTitle, forGUICheckBoxCSS, ofAction) {
		var checkBox = $(forGUICheckBoxCSS);
		var is_checked = false;
		switch (ofAction)
		{
			case Structures.FrameworkUIActions.Check:
				is_checked = true;
				break;
			case Structures.FrameworkUIActions.UnCheck:
				is_checked = false;
				break;
			default:
				is_checked = false;
				break;
		}
		checkBox.isSelected().then(function(selected){
			console.log(logMessageTitle + ' Expected(' + is_checked + '); Actual (' + selected + ')');
			expect(selected).toEqual(is_checked);
			return true;
		});
		this.takeScreenShot(logMessageTitle);
		return true;
	},
	
	//--- Valid parameter names : ListGUI, ItemGUI WithData, OfIndice, Message
	verifyTextInElementArray : function(parameters, isXPATH=false) {
		
		if (isXPATH == false) {
			delta_cx.wait(function() {
			 return delta_cx.findElement(by.css(parameters.ListGUI))
					  .then(function(elem) {
						return elem.all(by.css(parameters.ItemGUI)).then(function(items){
							expect(items[parameters.OfIndice].getText()).toBe(parameters.WithData);
							console.log(Message);
							return true;
						});
					  });
			},	Structures.LoadingWaitTimesFor.Control);
		} else {
			delta_cx.wait(function() {
			 return delta_cx.findElement(by.xpath(parameters.ListGUI))
					  .then(function(elem) {
						return elem.all(by.xpath(parameters.ItemGUI)).then(function(items){
							expect(items[parameters.OfIndice].getText()).toBe(parameters.WithData);
							console.log(Message);
							return true;
						});
					  });
			},	Structures.LoadingWaitTimesFor.Control);			
		}
		this.takeScreenShot(logMessageTitle);
		return true;
	},
	
	//--- Valid parameter names : Page, Control, ValidateFor, MessageLocation, WithData, IsGreaterOk, DataCSS, OfIndice
	validate : function(parameters) {
		switch(parameters.Page) {
			case Structures.Pages.PersonalInformation:
				if (parameters.ValidateFor == Structures.Validators.Caption) { this.validatePICaptions(parameters.Control); }
				if (parameters.ValidateFor == Structures.Validators.Placeholder) { this.validatePIPlaceholders(parameters.Control); }
				if (parameters.ValidateFor == Structures.Validators.Errors) { this.validatePIErrors(parameters.Control, parameters.MessageLocation); }
				if (parameters.ValidateFor == Structures.Validators.Information) { this.validatePIInformation(parameters.Control, parameters.WithData, parameters.IsGreaterOk); }
				if (parameters.ValidateFor == Structures.Validators.Summary) { Commons.validatePlanSummary({'Page': 'CX Personal Information',
																										    'Control' : parameters.Control,
																										    'DataCSS' : parameters.DataCSS}); }
				if (parameters.ValidateFor == Structures.Validators.Contents) { }
				break;
				
			case Structures.Pages.Dependents: 
				if (parameters.ValidateFor == Structures.Validators.Caption) { }
				if (parameters.ValidateFor == Structures.Validators.Placeholder) { }
				if (parameters.ValidateFor == Structures.Validators.Errors) { this.validateDependentErrors(parameters.Control, parameters.MessageLocation, parameters.DataCSS, parameters.OfIndice); }
				if (parameters.ValidateFor == Structures.Validators.Information) { }
				if (parameters.ValidateFor == Structures.Validators.Summary) { Commons.validatePlanSummary({'Page': 'CX Dependents',
																										    'Control' : parameters.Control,
																										    'DataCSS' : parameters.DataCSS}); }
				if (parameters.ValidateFor == Structures.Validators.Contents) { }
				break;
			
			case Structures.Pages.Facilities:
				if (parameters.ValidateFor == Structures.Validators.Caption) { this.validateFacilityCaptions(parameters.Control); }
				if (parameters.ValidateFor == Structures.Validators.Placeholder) { this.validateFacilityPlaceholders(parameters.Control); }
				if (parameters.ValidateFor == Structures.Validators.Errors) { }
				if (parameters.ValidateFor == Structures.Validators.Information) { }
				if (parameters.ValidateFor == Structures.Validators.Summary) { Commons.validatePlanSummary({'Page': 'CX Facilities',
																										    'Control' : parameters.Control,
																										    'DataCSS' : parameters.DataCSS}); }
				if (parameters.ValidateFor == Structures.Validators.Contents) { }
				break;
				
			case Structures.Pages.PaymentReceipt:
				if (parameters.ValidateFor == Structures.Validators.Caption) { this.validatePaymentReviewCaptions({'Control' : parameters.Control}); }
				if (parameters.ValidateFor == Structures.Validators.Placeholder) { this.validatePaymentReviewPlaceholders({'Control' : parameters.Control}); }
				if (parameters.ValidateFor == Structures.Validators.Errors) { this.validatePaymentReviewErrors({'Control' : parameters.Control,
																										  'MessageLocation' : parameters.MessageLocation}); }
				if (parameters.ValidateFor == Structures.Validators.Information) { this.validatePaymentReviewInformation({'Control' : parameters.Control,
																													'DataCSS' : parameters.DataCSS,
																													'WithData' : parameters.WithData,
																												    'OfIndice' : parameters.OfIndice}); }
				if (parameters.ValidateFor == Structures.Validators.Summary) { Commons.validatePlanSummary({'Page': 'CX Payment & Receipt',
																										    'Control' : parameters.Control,
																										    'DataCSS' : parameters.DataCSS}); }
				if (parameters.ValidateFor == Structures.Validators.Contents) { }
				break;
			case Structures.Pages.ApplicationReceipt:
				if (parameters.ValidateFor == Structures.Validators.Caption) {  }
				if (parameters.ValidateFor == Structures.Validators.Placeholder) {  }
				if (parameters.ValidateFor == Structures.Validators.Errors) {  }
				if (parameters.ValidateFor == Structures.Validators.Information) { this.validateReceiptInformation({'Control' : parameters.Control,
																													'DataCSS' : parameters.DataCSS,
																												    'OfIndice' : parameters.OfIndice}); }
				if (parameters.ValidateFor == Structures.Validators.Summary) { Commons.validatePlanSummary({'Page': 'CX Payment & Receipt',
																										    'Control' : parameters.Control,
																										    'DataCSS' : parameters.DataCSS}); }
				if (parameters.ValidateFor == Structures.Validators.Contents) { }
				break;
		}
	},
	
	validatePICaptions :  function(forGUIControl) {
		switch(forGUIControl) {
			case Structures.Profile.PrimaryName:
				//--- Validate First Name - Caption
				/* this.verifyText('Validate First Name - Caption:', 
					Controls.cx.page.PersonalInformation.Profile.Names.Primary.label, 
					Controls.cx.page.PersonalInformation.Profile.Names.Primary.caption); */
				Commons.verify({'Message' : 'Validate First Name - Caption:',
								'Control' : Controls.cx.page.PersonalInformation.Profile.Names.Primary.label,
								'ControlType' : Structures.Locators.CSS,
								'QuestText' : Controls.cx.page.PersonalInformation.Profile.Names.Primary.caption});
				break;

			case Structures.Profile.MiddleName:
				//--- Validate Middle Initial - Caption
				this.verifyText('Validate Middle Initial - Caption', 
					Controls.cx.page.PersonalInformation.Profile.Names.Middle.label, 
					Controls.cx.page.PersonalInformation.Profile.Names.Middle.caption);
				break;

			case Structures.Profile.LastName:
				//--- Validate Last Name - Caption
				this.verifyText('Validate Last Name - Caption', 
					Controls.cx.page.PersonalInformation.Profile.Names.Last.label, 
					Controls.cx.page.PersonalInformation.Profile.Names.Last.caption);
				break;

			case Structures.Profile.Gender:
				//--- Validate Gender - Caption
				this.verifyText('Validate Gender - Caption', 
					Controls.cx.page.PersonalInformation.Profile.Gender.label, 
					Controls.cx.page.PersonalInformation.Profile.Gender.caption);
				break;

			case Structures.Profile.Birthdate:
				//--- Validate Birthdate - Caption
				this.verifyText('Validate Birthdate - Caption', 
					Controls.cx.page.PersonalInformation.Profile.DOB.label, 
					Controls.cx.page.PersonalInformation.Profile.DOB.caption);
				break;

			case Structures.Profile.DOBMonth:
				this.validatePICaptions(Structures.Profile.Birthdate);
				break;

			case Structures.Profile.DOBDate:
				this.validatePICaptions(Structures.Profile.Birthdate);
				break;

			case Structures.Profile.DOBYear:
				this.validatePICaptions(Structures.Profile.Birthdate);
				break;

			case Structures.Profile.SSNumber:
				//--- Validate Social Security - Caption
				this.verifyText('Validate Social Security - Caption', 
					Controls.cx.page.PersonalInformation.Profile.SSN.label, 
					Controls.cx.page.PersonalInformation.Profile.SSN.caption);
				break;

			case Structures.Profile.AlternateIdentifier:
				//--- Validate Alternate Identifier - Caption
				this.verifyText('Validate Alternate Identifier - Caption', 
					Controls.cx.page.PersonalInformation.Profile.SSN.AlternateIdentifier.label, 
					Controls.cx.page.PersonalInformation.Profile.SSN.AlternateIdentifier.caption);
				break;
				
			case Structures.Profile.ContactStreet:
				//--- Validate Contact Address Street - Caption
				this.verifyText('Validate Contact Address Street - Caption', 
					Controls.cx.page.PersonalInformation.Contact.Address.Street.label, 
					Controls.cx.page.PersonalInformation.Contact.Address.Street.caption);
				break;

			case Structures.Profile.ContactCity:
				//--- Validate Contact Address City - Caption
				this.verifyText('Validate Contact Address City - Caption', 
					Controls.cx.page.PersonalInformation.Contact.Address.City.label, 
					Controls.cx.page.PersonalInformation.Contact.Address.City.caption);
				break;

			case this.ContactState:
				//--- Validate Contact Address State - Caption
				this.verifyText('Validate Contact Address State - Caption', 
					Controls.cx.page.PersonalInformation.Contact.Address.State.label, 
					Controls.cx.page.PersonalInformation.Contact.Address.State.caption);
				break;

			case Structures.Profile.ContactZip:
				//--- Validate Contact Address Zip - Caption
				this.verifyText('Validate Contact Address Zip - Caption', 
					Controls.cx.page.PersonalInformation.Contact.Address.Zip.label, 
					Controls.cx.page.PersonalInformation.Contact.Address.Zip.caption);
				break;

			case Structures.Profile.MailingAddress:
				//--- Validate Different Mailing Address Checkbox - Caption
				this.verifyText('Validate Different Mailing Address Checkbox - Caption', 
					Controls.cx.page.PersonalInformation.Contact.MailingAddress.Different.label, 
					Controls.cx.page.PersonalInformation.Contact.MailingAddress.Different.caption);
				break;

			case Structures.Profile.MailingAddressStreet:
				//--- Validate Different Mailing Address Street - Caption
				this.verifyText('Validate Different Mailing Address Street - Caption', 
					Controls.cx.page.PersonalInformation.Contact.MailingAddress.Street.label, 
					Controls.cx.page.PersonalInformation.Contact.MailingAddress.Street.caption);
				break;

			case Structures.Profile.MailingAddressCity:
				//--- Validate Different Mailing Address City - Caption
				this.verifyText('Validate Different Mailing Address City - Caption', 
					Controls.cx.page.PersonalInformation.Contact.MailingAddress.City.label, 
					Controls.cx.page.PersonalInformation.Contact.MailingAddress.City.caption);
				break;

			case Structures.Profile.MailingAddressState:
				//--- Validate Different Mailing Address State - Caption
				this.verifyText('Validate Different Mailing Address State - Caption', 
					Controls.cx.page.PersonalInformation.Contact.MailingAddress.State.label, 
					Controls.cx.page.PersonalInformation.Contact.MailingAddress.State.caption);
				break;

			case Structures.Profile.MailingAddressZip:
				//--- Validate Different Mailing Address Zip - Caption
				this.verifyText('Validate Different Mailing Address Zip - Caption', 
					Controls.cx.page.PersonalInformation.Contact.MailingAddress.Zip.label, 
					Controls.cx.page.PersonalInformation.Contact.MailingAddress.Zip.caption);
				break;

			case Structures.Profile.PhoneType:
				//--- Validate Phone Category - Caption
				this.verifyText('Validate Phone Category - Caption', 
					Controls.cx.page.PersonalInformation.Contact.Phone.Category.label, 
					Controls.cx.page.PersonalInformation.Contact.Phone.Category.caption);
				break;

			case Structures.Profile.PhoneNumber:
				//--- Validate Phone Number - Caption
				this.verifyText('Validate Phone Number - Caption', 
					Controls.cx.page.PersonalInformation.Contact.Phone.Number.label, 
					Controls.cx.page.PersonalInformation.Contact.Phone.Number.caption);
				break;

			case Structures.Profile.EmailAddress:
				//--- Validate Email Address - Caption
				this.verifyText('Validate Email Address - Caption', 
					Controls.cx.page.PersonalInformation.Contact.Email.label, 
					Controls.cx.page.PersonalInformation.Contact.Email.caption);
				break;

			case Structures.Profile.GoPaperless:
				//--- Validate Go Paperless - Caption
				this.verifyText('Validate Go Paperless Checkbox - Caption', 
					Controls.cx.page.PersonalInformation.Contact.Paperless.label, 
					Controls.cx.page.PersonalInformation.Contact.Paperless.caption);
				break;

			case Structures.Profile.BrokerWorked:
				//--- Validate Has Broker Checkbox - Caption
				this.verifyText('Validate Has Broker Checkbox - Caption', 
					Controls.cx.page.PersonalInformation.Contact.Broker.IsPresent.label, 
					Controls.cx.page.PersonalInformation.Contact.Broker.IsPresent.caption);
				break;

			case Structures.Profile.BrokerNumber:
				//--- Validate Broker Number - Caption
				this.verifyText('Validate Broker Number - Caption', 
					Controls.cx.page.PersonalInformation.Contact.Broker.Number.label, 
					Controls.cx.page.PersonalInformation.Contact.Broker.Number.caption);
				break;

			case Structures.Profile.BrokerName:
				//--- Validate Broker Name - Caption
				this.verifyText('Validate Broker Name - Caption', 
					Controls.cx.page.PersonalInformation.Contact.Broker.Name.label, 
					Controls.cx.page.PersonalInformation.Contact.Broker.Name.caption);
				break;

			case Structures.Profile.Next:
				//--- Validate Button Next - Caption
				this.verifyAttibuteText('Validate Button Next - Caption:',
					Controls.cx.page.PersonalInformation.Action.Next.label,
					Controls.cx.page.PersonalInformation.Action.Next.input.attribute,
					Controls.cx.page.PersonalInformation.Action.Next.value);
				break;
				
			case Structures.Profile.ValidateAll:
				this.validatePICaptions(Structures.Profile.PrimaryName);
				this.validatePICaptions(Structures.Profile.MiddleName);
				this.validatePICaptions(Structures.Profile.LastName);
				this.validatePICaptions(Structures.Profile.Gender);
				this.validatePICaptions(Structures.Profile.Birthdate);
				this.validatePICaptions(Structures.Profile.DOBMonth);
				this.validatePICaptions(Structures.Profile.DOBDate);
				this.validatePICaptions(Structures.Profile.DOBYear);
				this.validatePICaptions(Structures.Profile.SSNumber);
				this.validatePICaptions(Structures.Profile.AlternateIdentifier);
				this.validatePICaptions(Structures.Profile.ContactStreet);
				this.validatePICaptions(Structures.Profile.ContactCity);
				this.validatePICaptions(Structures.Profile.ContactState);
				this.validatePICaptions(Structures.Profile.ContactZip);
				this.validatePICaptions(Structures.Profile.MailingAddress);
				this.validatePICaptions(Structures.Profile.MailingAddressStreet);
				this.validatePICaptions(Structures.Profile.MailingAddressCity);
				this.validatePICaptions(Structures.Profile.MailingAddressState);
				this.validatePICaptions(Structures.Profile.MailingAddressZip);
				this.validatePICaptions(Structures.Profile.PhoneType);
				this.validatePICaptions(Structures.Profile.PhoneNumber);
				this.validatePICaptions(Structures.Profile.EmailAddress);
				this.validatePICaptions(Structures.Profile.GoPaperless);
				this.validatePICaptions(Structures.Profile.BrokerWorked);
				this.validatePICaptions(Structures.Profile.BrokerNumber);
				this.validatePICaptions(Structures.Profile.BrokerName);
				this.validatePICaptions(Structures.Profile.Next);
				break;
			
			default:
				break;
		}
	},

	validatePIPlaceholders : function(forGUIControl) {

		switch(forGUIControl) {
			case Structures.Profile.PrimaryName:
				//--- Validate First Name - Placeholder
				this.verifyAttibuteText('Validate First Name - Placeholder:',
					Controls.cx.page.PersonalInformation.Profile.Names.Primary.input.textbox,
					Controls.cx.page.PersonalInformation.Profile.Names.Primary.input.attribute,
					Controls.cx.page.PersonalInformation.Profile.Names.Primary.input.defaults);
				break;

			case Structures.Profile.MiddleName:
				//--- Validate Middle Initial - Placeholder
				this.verifyAttibuteText('Validate Middle Initial - Placeholder:',
					Controls.cx.page.PersonalInformation.Profile.Names.Middle.input.textbox,
					Controls.cx.page.PersonalInformation.Profile.Names.Middle.input.attribute,
					Controls.cx.page.PersonalInformation.Profile.Names.Middle.input.defaults);
				break;

			case Structures.Profile.LastName:
				//--- Validate Last Name - Placeholder
				this.verifyAttibuteText('Validate Last Name - Placeholder:',
					Controls.cx.page.PersonalInformation.Profile.Names.Last.input.textbox,
					Controls.cx.page.PersonalInformation.Profile.Names.Last.input.attribute,
					Controls.cx.page.PersonalInformation.Profile.Names.Last.input.defaults);
				break;

			case Structures.Profile.Gender:
				var gender_default_index = Controls.cx.page.PersonalInformation.Profile.Gender.input.selectedindex;
				//--- Validate Gender - Placeholder
				this.verifyAttibuteText('Validate Gender - Placeholder:',
					Controls.cx.page.PersonalInformation.Profile.Gender.input.select,
					Controls.cx.page.PersonalInformation.Profile.Gender.input.selected,
					Controls.cx.page.PersonalInformation.Profile.Gender.input.items[gender_default_index]);
				break;

			case Structures.Profile.DOBMonth:
				//--- Validate Birthdate Month - Placeholder, Data Range, Data Pattern
				this.verifyAttibuteText('Validate Birthdate (Month) - Placeholder:',
					Controls.cx.page.PersonalInformation.Profile.DOB.input.Month.selector,
					Controls.cx.page.PersonalInformation.Profile.DOB.input.Month.attribute,
					Controls.cx.page.PersonalInformation.Profile.DOB.input.Month.defaults);

				this.verifyAttibuteText('Validate Birthdate (Month) Data Range:',
					Controls.cx.page.PersonalInformation.Profile.DOB.input.Month.selector,
					Controls.cx.page.PersonalInformation.Profile.DOB.input.Month.range.attribute,
					Controls.cx.page.PersonalInformation.Profile.DOB.input.Month.range.values);

				this.verifyAttibuteText('Validate Birthdate (Month) Data Pattern:',
					Controls.cx.page.PersonalInformation.Profile.DOB.input.Month.selector,
					Controls.cx.page.PersonalInformation.Profile.DOB.input.Month.pattern.attribute,
					Controls.cx.page.PersonalInformation.Profile.DOB.input.Month.pattern.values);
				break;

			case Structures.Profile.DOBDate:
				//--- Validate Birthdate Day - Placeholder, Data Range, Data Pattern
				this.verifyAttibuteText('Validate Birthdate (Day) - Placeholder:',
					Controls.cx.page.PersonalInformation.Profile.DOB.input.Day.selector,
					Controls.cx.page.PersonalInformation.Profile.DOB.input.Day.attribute,
					Controls.cx.page.PersonalInformation.Profile.DOB.input.Day.defaults);

				this.verifyAttibuteText('Validate Birthdate (Day) Data Range:',
					Controls.cx.page.PersonalInformation.Profile.DOB.input.Day.selector,
					Controls.cx.page.PersonalInformation.Profile.DOB.input.Day.range.attribute,
					Controls.cx.page.PersonalInformation.Profile.DOB.input.Day.range.values);

				this.verifyAttibuteText('Validate Birthdate (Day) Data Pattern:',
					Controls.cx.page.PersonalInformation.Profile.DOB.input.Day.selector,
					Controls.cx.page.PersonalInformation.Profile.DOB.input.Day.pattern.attribute,
					Controls.cx.page.PersonalInformation.Profile.DOB.input.Day.pattern.values);
				break;

			case Structures.Profile.DOBYear:
				//--- Validate Birthdate Day - Placeholder, Data Pattern
				this.verifyAttibuteText('Validate Birthdate (Year) - Placeholder:',
					Controls.cx.page.PersonalInformation.Profile.DOB.input.Year.selector,
					Controls.cx.page.PersonalInformation.Profile.DOB.input.Year.attribute,
					Controls.cx.page.PersonalInformation.Profile.DOB.input.Year.defaults);

				this.verifyAttibuteText('Validate Birthdate (Year) Data Pattern:',
					Controls.cx.page.PersonalInformation.Profile.DOB.input.Year.selector,
					Controls.cx.page.PersonalInformation.Profile.DOB.input.Year.pattern.attribute,
					Controls.cx.page.PersonalInformation.Profile.DOB.input.Year.pattern.values);
				break;

			case Structures.Profile.SSNumber:
				//--- Validate Social Security - Placeholder
				this.verifyAttibuteText('Validate Social Security - Placeholder:',
					Controls.cx.page.PersonalInformation.Profile.SSN.textbox,
					Controls.cx.page.PersonalInformation.Profile.SSN.attribute,
					Controls.cx.page.PersonalInformation.Profile.SSN.input.defaults);
				break;

			case Structures.Profile.AlternateIdentifier:
				//--- Validate Alternate Identifier - Placeholder
				this.verifyAttibuteText('Validate Alternate Identifier - Placeholder:',
					Controls.cx.page.PersonalInformation.Profile.SSN.AlternateIdentifier.textbox,
					Controls.cx.page.PersonalInformation.Profile.SSN.AlternateIdentifier.attribute,
					Controls.cx.page.PersonalInformation.Profile.SSN.AlternateIdentifier.input.defaults);
				break;

			case Structures.Profile.ContactStreet:
				//--- Validate Address Street - Placeholder
				this.verifyAttibuteText('Validate Address Street - Placeholder:',
					Controls.cx.page.PersonalInformation.Contact.Address.Street.input.textbox,
					Controls.cx.page.PersonalInformation.Contact.Address.Street.input.attribute,
					Controls.cx.page.PersonalInformation.Contact.Address.Street.input.defaults);
				break;

			case Structures.Profile.ContactCity:
				//--- Validate Address City - Placeholder
				this.verifyAttibuteText('Validate Address City - Placeholder:',
					Controls.cx.page.PersonalInformation.Contact.Address.City.input.textbox,
					Controls.cx.page.PersonalInformation.Contact.Address.City.input.attribute,
					Controls.cx.page.PersonalInformation.Contact.Address.City.input.defaults);
				break;

			case this.ContactState:
				//--- Validate Address State - Placeholder
				this.verifyAttibuteText('Validate Address State - Placeholder:',
					Controls.cx.page.PersonalInformation.Contact.Address.State.input.textbox,
					Controls.cx.page.PersonalInformation.Contact.Address.State.input.attribute,
					Controls.cx.page.PersonalInformation.Contact.Address.State.input.defaults);
				break;

			case Structures.Profile.ContactZip:
				//--- Validate Address Zip - Placeholder
				this.verifyAttibuteText('Validate Address Zip - Placeholder:',
					Controls.cx.page.PersonalInformation.Contact.Address.Zip.input.textbox,
					Controls.cx.page.PersonalInformation.Contact.Address.Zip.input.attribute,
					Controls.cx.page.PersonalInformation.Contact.Address.Zip.input.defaults);
				break;

			case Structures.Profile.MailingAddress:
				this.validatePIPlaceholders(Structures.Profile.MailingAddressStreet);
				this.validatePIPlaceholders(Structures.Profile.MailingAddressCity);
				this.validatePIPlaceholders(Structures.Profile.MailingAddressState);
				this.validatePIPlaceholders(Structures.Profile.MailingAddressZip);
				break;

			case Structures.Profile.MailingAddressStreet:
				//--- Validate Different Mailing Address Street - Placeholder
				this.verifyAttibuteText('Validate Different Mailing Address Street - Placeholder:',
					Controls.cx.page.PersonalInformation.Contact.MailingAddress.Street.input.textbox,
					Controls.cx.page.PersonalInformation.Contact.MailingAddress.Street.input.attribute,
					Controls.cx.page.PersonalInformation.Contact.MailingAddress.Street.input.defaults);
				break;

			case Structures.Profile.MailingAddressCity:
				//--- Validate Different Mailing Address City - Placeholder
				this.verifyAttibuteText('Validate Different Mailing Address City - Placeholder:',
					Controls.cx.page.PersonalInformation.Contact.MailingAddress.City.input.textbox,
					Controls.cx.page.PersonalInformation.Contact.MailingAddress.City.input.attribute,
					Controls.cx.page.PersonalInformation.Contact.MailingAddress.City.input.defaults);
				break;

			case Structures.Profile.MailingAddressState:
				//--- Validate Different Mailing Address State - Placeholder
				this.verifyAttibuteText('Validate Different Mailing Address State - Placeholder:',
					Controls.cx.page.PersonalInformation.Contact.MailingAddress.State.input.textbox,
					Controls.cx.page.PersonalInformation.Contact.MailingAddress.State.input.attribute,
					Controls.cx.page.PersonalInformation.Contact.MailingAddress.State.input.defaults);
				break;

			case Structures.Profile.MailingAddressZip:
				//--- Validate Different Mailing Address Zip - Placeholder
				this.verifyAttibuteText('Validate Different Mailing Address Zip - Placeholder:',
					Controls.cx.page.PersonalInformation.Contact.MailingAddress.Zip.input.textbox,
					Controls.cx.page.PersonalInformation.Contact.MailingAddress.Zip.input.attribute,
					Controls.cx.page.PersonalInformation.Contact.MailingAddress.Zip.input.defaults);
				break;

			case Structures.Profile.PhoneType:
				//--- Validate Phone Category - Placeholder
				this.verifyAttibuteText('Validate Phone Category - Placeholder:',
					Controls.cx.page.PersonalInformation.Contact.Phone.Category.input.select,
					Controls.cx.page.PersonalInformation.Contact.Phone.Category.input.attribute,
					Controls.cx.page.PersonalInformation.Contact.Phone.Category.input.defaults);
				break;

			case Structures.Profile.PhoneNumber:
				//--- Validate Phone Number - Placeholder
				this.verifyAttibuteText('Validate Phone Number - Placeholder:',
					Controls.cx.page.PersonalInformation.Contact.Phone.Number.input.textbox,
					Controls.cx.page.PersonalInformation.Contact.Phone.Number.input.attribute,
					Controls.cx.page.PersonalInformation.Contact.Phone.Number.input.defaults);
				break;

			case Structures.Profile.EmailAddress:
				//--- Validate Email Address - Placeholder
				this.verifyAttibuteText('Validate Email Address - Placeholder:',
					Controls.cx.page.PersonalInformation.Contact.Email.input.textbox,
					Controls.cx.page.PersonalInformation.Contact.Email.input.attribute,
					Controls.cx.page.PersonalInformation.Contact.Email.input.defaults);
				break;

			case Structures.Profile.GoPaperless:
				break;

			case Structures.Profile.BrokerWorked:
				this.validatePIPlaceholders(Structures.Profile.BrokerNumber);
				this.validatePIPlaceholders(Structures.Profile.BrokerName);
				break;

			case Structures.Profile.BrokerNumber:
				//--- Validate Broker Number - Placeholder
				this.verifyAttibuteText('Validate  Broker Number - Placeholder:',
					Controls.cx.page.PersonalInformation.Contact.Broker.Number.input.textbox,
					Controls.cx.page.PersonalInformation.Contact.Broker.Number.input.attribute,
					Controls.cx.page.PersonalInformation.Contact.Broker.Number.input.defaults);
				break;

			case Structures.Profile.BrokerName:
				//--- Validate Broker Name - Placeholder
				this.verifyAttibuteText('Validate  Broker Name - Placeholder:',
					Controls.cx.page.PersonalInformation.Contact.Broker.Name.input.textbox,
					Controls.cx.page.PersonalInformation.Contact.Broker.Name.input.attribute,
					Controls.cx.page.PersonalInformation.Contact.Broker.Name.input.defaults);
				break;

			case Structures.Profile.Next:
				break;
			
			case Structures.Profile.ValidateAll:
				this.validatePIPlaceholders(Structures.Profile.PrimaryName);
				this.validatePIPlaceholders(Structures.Profile.MiddleName);
				this.validatePIPlaceholders(Structures.Profile.LastName);
				this.validatePIPlaceholders(Structures.Profile.Gender);
				this.validatePIPlaceholders(Structures.Profile.Birthdate);
				this.validatePIPlaceholders(Structures.Profile.DOBMonth);
				this.validatePIPlaceholders(Structures.Profile.DOBDate);
				this.validatePIPlaceholders(Structures.Profile.DOBYear);
				this.validatePIPlaceholders(Structures.Profile.SSNumber);
				this.validatePIPlaceholders(Structures.Profile.AlternateIdentifier);
				this.validatePIPlaceholders(Structures.Profile.ContactStreet);
				this.validatePIPlaceholders(Structures.Profile.ContactCity);
				this.validatePIPlaceholders(Structures.Profile.ContactState);
				this.validatePIPlaceholders(Structures.Profile.ContactZip);
				this.validatePIPlaceholders(Structures.Profile.MailingAddress);
				this.validatePIPlaceholders(Structures.Profile.MailingAddressStreet);
				this.validatePIPlaceholders(Structures.Profile.MailingAddressCity);
				this.validatePIPlaceholders(Structures.Profile.MailingAddressState);
				this.validatePIPlaceholders(Structures.Profile.MailingAddressZip);
				this.validatePIPlaceholders(Structures.Profile.PhoneType);
				this.validatePIPlaceholders(Structures.Profile.PhoneNumber);
				this.validatePIPlaceholders(Structures.Profile.EmailAddress);
				this.validatePIPlaceholders(Structures.Profile.GoPaperless);
				this.validatePIPlaceholders(Structures.Profile.BrokerWorked);
				this.validatePIPlaceholders(Structures.Profile.BrokerNumber);
				this.validatePIPlaceholders(Structures.Profile.BrokerName);
				this.validatePIPlaceholders(Structures.Profile.Next);
				break;
			
			default:
				break;
		}
	},

	validatePIErrors :  function(forGUIControl, atMessageLocation) {
		switch(forGUIControl) {
			case Structures.Profile.PrimaryName:
				//--- Validate First Name - Error Message
				switch (atMessageLocation)
				{
					case Structures.MessageLocations.Header:
						this.verifyText('Validate First Name - Error at Header:', 
							Controls.cx.page.PersonalInformation.Profile.Names.Primary.error.ontop, 
							Controls.cx.page.PersonalInformation.Profile.Names.Primary.error.text);
						break;

					case Structures.MessageLocations.Control:
						this.verifyText('Validate First Name - Error at Control:', 
							Controls.cx.page.PersonalInformation.Profile.Names.Primary.error.atcontrol, 
							Controls.cx.page.PersonalInformation.Profile.Names.Primary.error.text);
						break;

					default:
						console.log('INVALID : Message Location : cx_gui_libraries.validatePIErrors(Profile.PrimaryName, atMessageLocation)...');
						break;
				}
				break;

			case Structures.Profile.MiddleName:
				break;

			case Structures.Profile.LastName:
				//--- Validate Last Name - Error Message
				switch (atMessageLocation)
				{
					case Structures.MessageLocations.Header:
						this.verifyText('Validate Last Name - Error at Header:', 
							Controls.cx.page.PersonalInformation.Profile.Names.Last.error.ontop, 
							Controls.cx.page.PersonalInformation.Profile.Names.Last.error.text);
						break;
					
					case Structures.MessageLocations.Control:
						this.verifyText('Validate Last Name - Error at Control:', 
							Controls.cx.page.PersonalInformation.Profile.Names.Last.error.atcontrol, 
							Controls.cx.page.PersonalInformation.Profile.Names.Last.error.text);
						break;
					default:
						console.log('INVALID : Message Location : cx_gui_libraries.validatePIErrors(Profile.LastName, atMessageLocation)...');
						break;
				}
				break;

			case Structures.Profile.Gender:
				//--- Validate Gender - Error Messages
				switch (atMessageLocation)
				{
					case Structures.MessageLocations.Header:
						this.verifyText('Validate Gender - Error at Header:', 
							Controls.cx.page.PersonalInformation.Profile.Gender.error.ontop, 
							Controls.cx.page.PersonalInformation.Profile.Gender.error.text);
						break;
					
					case Structures.MessageLocations.Control:
						this.verifyText('Validate Gender - Error at Control:', 
							Controls.cx.page.PersonalInformation.Profile.Gender.error.atcontrol, 
							Controls.cx.page.PersonalInformation.Profile.Gender.error.text);
						break;

					default:
						console.log('INVALID : Message Location : cx_gui_libraries.validatePIErrors(Profile.Gender, atMessageLocation)...');
						break;
				}
				break;

			case Structures.Profile.DOBMonth:
				//--- Validate Birthdate Month - Error Messages
				switch (atMessageLocation)
				{
					case Structures.MessageLocations.Header:
						this.verifyText('Validate Birthdate Month - Error at Header:', 
							Controls.cx.page.PersonalInformation.Profile.DOB.Month.error.ontop, 
							Controls.cx.page.PersonalInformation.Profile.DOB.Month.error.text);
						break;

					case Structures.MessageLocations.Control:
						this.verifyText('Validate Birthdate Month - Error at Control:', 
							Controls.cx.page.PersonalInformation.Profile.DOB.Month.error.atcontrol, 
							Controls.cx.page.PersonalInformation.Profile.DOB.Month.error.text);
						break;

					default:
						console.log('INVALID : Message Location : cx_gui_libraries.validatePIErrors(Profile.DOBMonth, atMessageLocation)...');
						break;
				}
				break;

			case Structures.Profile.DOBDate:
				//--- Validate Birthdate Day - Error Messages
				switch (atMessageLocation)
				{
					case Structures.MessageLocations.Header:
						this.verifyText('Validate Birthdate Day - Error at Header:', 
							Controls.cx.page.PersonalInformation.Profile.DOB.Day.error.ontop, 
							Controls.cx.page.PersonalInformation.Profile.DOB.Day.error.text);
						break;
					
					case Structures.MessageLocations.Control:
						this.verifyText('Validate Birthdate Day - Error at Control:', 
							Controls.cx.page.PersonalInformation.Profile.DOB.Day.error.atcontrol, 
							Controls.cx.page.PersonalInformation.Profile.DOB.Day.error.text);
						break;

					default:
						console.log('INVALID : Message Location : cx_gui_libraries.validatePIErrors(Profile.DOBDate, atMessageLocation)...');
						break;
				}
				break;

			case Structures.Profile.DOBYear:
				//--- Validate Birthdate Day - Error Messages
				switch (atMessageLocation)
				{
					case Structures.MessageLocations.Header:
						this.verifyText('Validate Birthdate Year - Error at Header:', 
							Controls.cx.page.PersonalInformation.Profile.DOB.Year.error.ontop, 
							Controls.cx.page.PersonalInformation.Profile.DOB.Year.error.text);
						break;

					case Structures.MessageLocations.Control:
						this.verifyText('Validate Birthdate Year - Error at Control:', 
							Controls.cx.page.PersonalInformation.Profile.DOB.Year.error.atcontrol, 
							Controls.cx.page.PersonalInformation.Profile.DOB.Year.error.text);
						break;

					default:
						console.log('INVALID : Message Location : cx_gui_libraries.validatePIErrors(Profile.DOBYear, atMessageLocation)...');
						break;
				}
				break;

			case Structures.Profile.SSNumber:
				//--- Validate Social Security - Error Messages
				switch (atMessageLocation)
				{
					case Structures.MessageLocations.Header:
						this.verifyText('Validate Social Security - Error at Header:', 
							Controls.cx.page.PersonalInformation.Profile.SSN.error.ontop, 
							Controls.cx.page.PersonalInformation.Profile.SSN.error.text);
						break;

					case Structures.MessageLocations.Control:
						this.verifyText('Validate Social Security - Error at Control:', 
							Controls.cx.page.PersonalInformation.Profile.SSN.error.atcontrol, 
							Controls.cx.page.PersonalInformation.Profile.SSN.error.text);
						break;

					default:
						console.log('INVALID : Message Location : cx_gui_libraries.validatePIErrors(Profile.SSNumber, atMessageLocation)...');
						break;
				}
				break;

			case Structures.Profile.AlternateIdentifier:
				//--- Validate Alternate Identifier- Error Messages
				switch (atMessageLocation)
				{
					case Structures.MessageLocations.Header:
						this.verifyText('Validate Social Security - Error at Header:', 
							Controls.cx.page.PersonalInformation.Profile.SSN.AlternateIdentifier.error.ontop, 
							Controls.cx.page.PersonalInformation.Profile.SSN.AlternateIdentifier.error.text);
						break;

					case Structures.MessageLocations.Control:
						this.verifyText('Validate Social Security - Error at Control:', 
							Controls.cx.page.PersonalInformation.Profile.SSN.AlternateIdentifier.error.atcontrol, 
							Controls.cx.page.PersonalInformation.Profile.SSN.AlternateIdentifier.error.text);
						break;

					default:
						console.log('INVALID : Message Location : cx_gui_libraries.validatePIErrors(Profile.AlternateIdentifier, atMessageLocation)...');
						break;
				}
				break;
				
			case Structures.Profile.ContactStreet:
				//--- Validate Address Street - Error Messages
				switch (atMessageLocation)
				{
					case Structures.MessageLocations.Header:
						this.verifyText('Validate Contact Address Street - Error at Header:', 
							Controls.cx.page.PersonalInformation.Contact.Address.Street.error.ontop, 
							Controls.cx.page.PersonalInformation.Contact.Address.Street.error.text);
						break;

					case Structures.MessageLocations.Control:
						this.verifyText('Validate Contact Address Street - Error at Control:', 
							Controls.cx.page.PersonalInformation.Contact.Address.Street.error.atcontrol, 
							Controls.cx.page.PersonalInformation.Contact.Address.Street.error.text);
						break;

					default:
						console.log('INVALID : Message Location : cx_gui_libraries.validatePIErrors(Profile.ContactStreet, atMessageLocation)...');
						break;
				}
				break;

			case Structures.Profile.ContactCity:
				//--- Validate Address City - Error Messages
				switch (atMessageLocation)
				{
					case Structures.MessageLocations.Header:
						this.verifyText('Validate Contact Address City - Error at Header:', 
							Controls.cx.page.PersonalInformation.Contact.Address.City.error.ontop, 
							Controls.cx.page.PersonalInformation.Contact.Address.City.error.text);
						break;

					case Structures.MessageLocations.Control:
						this.verifyText('Validate Contact Address City - Error at Control:', 
							Controls.cx.page.PersonalInformation.Contact.Address.City.error.atcontrol, 
							Controls.cx.page.PersonalInformation.Contact.Address.City.error.text);
						break;

					default:
						console.log('INVALID : Message Location : cx_gui_libraries.validatePIErrors(Profile.ContactCity, atMessageLocation)...');
						break;
				}
				break;

			case this.ContactState:
				//--- Validate Address State - Error Messages
				switch (atMessageLocation)
				{
					case Structures.MessageLocations.Header:
						this.verifyText('Validate Contact Address State - Error at Header:', 
							Controls.cx.page.PersonalInformation.Contact.Address.State.error.ontop, 
							Controls.cx.page.PersonalInformation.Contact.Address.State.error.text);
						break;

					case Structures.MessageLocations.Control:
						this.verifyText('Validate Contact Address State - Error at Control:', 
							Controls.cx.page.PersonalInformation.Contact.Address.State.error.atcontrol, 
							Controls.cx.page.PersonalInformation.Contact.Address.State.error.text);
						break;

					default:
						console.log('INVALID : Message Location : cx_gui_libraries.validatePIErrors(Profile.ContactState, atMessageLocation)...');
						break;
				}
				break;

			case Structures.Profile.ContactZip:
				//--- Validate Address Zip - Error Messages
				switch (atMessageLocation)
				{
					case Structures.MessageLocations.Header:
						this.verifyText('Validate Contact Address Zip - Error at Header:', 
							Controls.cx.page.PersonalInformation.Contact.Address.Zip.error.ontop, 
							Controls.cx.page.PersonalInformation.Contact.Address.Zip.error.text);
						break;

					case Structures.MessageLocations.Control:
						this.verifyText('Validate Contact Address Zip - Error at Control:', 
							Controls.cx.page.PersonalInformation.Contact.Address.Zip.error.atcontrol, 
							Controls.cx.page.PersonalInformation.Contact.Address.Zip.error.text);
						break;

					default:
						console.log('INVALID : Message Location : cx_gui_libraries.validatePIErrors(Profile.ContactZip, atMessageLocation)...');
						break;
				}
				break;

			case Structures.Profile.MailingAddress:
				break;

			case Structures.Profile.MailingAddressStreet:
				//--- Validate Different Mailing Address Street - Error Messages
				switch (atMessageLocation)
				{
					case Structures.MessageLocations.Header:
						this.verifyText('Validate Contact Different Mailing Address Street - Error at Header:', 
							Controls.cx.page.PersonalInformation.Contact.MailingAddress.Street.error.ontop, 
							Controls.cx.page.PersonalInformation.Contact.MailingAddress.Street.error.text);
						break;

					case Structures.MessageLocations.Control:
						this.verifyText('Validate Contact Different Mailing Address Street - Error at Control:', 
							Controls.cx.page.PersonalInformation.Contact.MailingAddress.Street.error.atcontrol, 
							Controls.cx.page.PersonalInformation.Contact.MailingAddress.Street.error.text);
						break;

					default:
						console.log('INVALID : Message Location : cx_gui_libraries.validatePIErrors(Profile.MailingAddressStreet, atMessageLocation)...');
						break;
				}
				break;

			case Structures.Profile.MailingAddressCity:
				//--- Validate Different Mailing Address City - Error Messages
				switch (atMessageLocation)
				{
					case Structures.MessageLocations.Header:
						this.verifyText('Validate Contact Different Mailing Address City - Error at Header:', 
							Controls.cx.page.PersonalInformation.Contact.MailingAddress.City.error.ontop, 
							Controls.cx.page.PersonalInformation.Contact.MailingAddress.City.error.text);
						break;

					case Structures.MessageLocations.Control:
						this.verifyText('Validate Contact Different Mailing Address City - Error at Control:', 
							Controls.cx.page.PersonalInformation.Contact.MailingAddress.City.error.atcontrol, 
							Controls.cx.page.PersonalInformation.Contact.MailingAddress.City.error.text);
						break;
					default:
						console.log('INVALID : Message Location : cx_gui_libraries.validatePIErrors(Profile.MailingAddressCity, atMessageLocation)...');
						break;
				}
				break;

			case Structures.Profile.MailingAddressState:
				//--- Validate Different Mailing Address State - Placeholder
				switch (atMessageLocation)
				{
					case Structures.MessageLocations.Header:
						this.verifyText('Validate Contact Different Mailing Address State - Error at Header:', 
							Controls.cx.page.PersonalInformation.Contact.MailingAddress.State.error.ontop, 
							Controls.cx.page.PersonalInformation.Contact.MailingAddress.State.error.text);
						break;

					case Structures.MessageLocations.Control:
						this.verifyText('Validate Contact Different Mailing Address State - Error at Control:', 
							Controls.cx.page.PersonalInformation.Contact.MailingAddress.State.error.atcontrol, 
							Controls.cx.page.PersonalInformation.Contact.MailingAddress.State.error.text);
						break;

					default:
						console.log('INVALID : Message Location : cx_gui_libraries.validatePIErrors(Profile.MailingAddressState, atMessageLocation)...');
						break;
				}
				break;

			case Structures.Profile.MailingAddressZip:
				//--- Validate Different Mailing Address Zip - Error Messages
				switch (atMessageLocation)
				{
					case Structures.MessageLocations.Header:
						this.verifyText('Validate Contact Different Mailing Address Zip - Error at Header:', 
							Controls.cx.page.PersonalInformation.Contact.MailingAddress.Zip.error.ontop, 
							Controls.cx.page.PersonalInformation.Contact.MailingAddress.Zip.error.text);
						break;

					case Structures.MessageLocations.Control:
						this.verifyText('Validate Contact Different Mailing Address Zip - Error at Control:', 
							Controls.cx.page.PersonalInformation.Contact.MailingAddress.Zip.error.atcontrol, 
							Controls.cx.page.PersonalInformation.Contact.MailingAddress.Zip.error.text);
						break;

					default:
						console.log('INVALID : Message Location : cx_gui_libraries.validatePIErrors(Profile.MailingAddressZip, atMessageLocation)...');
						break;
				}
				break;

			case Structures.Profile.PhoneType:
				//--- Validate Phone Category - Error Messages
				switch (atMessageLocation)
				{
					case Structures.MessageLocations.Header:
						this.verifyText('Validate Contact Phone Category - Error at Header:', 
							Controls.cx.page.PersonalInformation.Contact.Phone.Category.error.ontop, 
							Controls.cx.page.PersonalInformation.Contact.Phone.Category.error.text);
						break;

					case Structures.MessageLocations.Control:
						this.verifyText('Validate Contact Phone Category - Error at Control:', 
							Controls.cx.page.PersonalInformation.Contact.Phone.Category.error.atcontrol, 
							Controls.cx.page.PersonalInformation.Contact.Phone.Category.error.text);
						break;

					default:
						console.log('INVALID : Message Location : cx_gui_libraries.validatePIErrors(Profile.PhoneType, atMessageLocation)...');
						break;
				}
				break;

			case Structures.Profile.PhoneNumber:
				//--- Validate Phone Number - Error Messages
				switch (atMessageLocation)
				{
					case Structures.MessageLocations.Header:
						this.verifyText('Validate Contact Phone Number - Error at Header:', 
							Controls.cx.page.PersonalInformation.Contact.Phone.Number.error.ontop, 
							Controls.cx.page.PersonalInformation.Contact.Phone.Number.error.text);
						break;

					case Structures.MessageLocations.Control:
						this.verifyText('Validate Contact Phone Number - Error at Control:', 
							Controls.cx.page.PersonalInformation.Contact.Phone.Number.error.atcontrol, 
							Controls.cx.page.PersonalInformation.Contact.Phone.Number.error.text);
						break;

					default:
						console.log('INVALID : Message Location : cx_gui_libraries.validatePIErrors(Profile.PhoneNumber, atMessageLocation)...');
						break;
				}
				break;

			case Structures.Profile.EmailAddress:
				//--- Validate Email Address - Error Messages
				switch (atMessageLocation)
				{
					case Structures.MessageLocations.Header:
						this.verifyText('Validate Contact Email - Error at Header:', 
							Controls.cx.page.PersonalInformation.Contact.Email.error.ontop, 
							Controls.cx.page.PersonalInformation.Contact.Email.error.text);
						break;

					case Structures.MessageLocations.Control:
						this.verifyText('Validate Contact Email - Error at Control:', 
							Controls.cx.page.PersonalInformation.Contact.Email.error.atcontrol, 
							Controls.cx.page.PersonalInformation.Contact.Email.error.text);
						break;

					default:
						console.log('INVALID : Message Location : cx_gui_libraries.validatePIErrors(Profile.EmailAddress, atMessageLocation)...');
						break;
				}
				break;

			case Structures.Profile.GoPaperless:
				break;

			case Structures.Profile.BrokerWorked:
				break;

			case Structures.Profile.BrokerNumber:
				//--- Validate Broker Number - Error Messages
				switch (atMessageLocation)
				{
					case Structures.MessageLocations.Header:
						this.verifyText('Validate Broker Number - Error at Header:', 
							Controls.cx.page.PersonalInformation.Contact.Broker.Number.error.ontop, 
							Controls.cx.page.PersonalInformation.Contact.Broker.Number.error.text);
						break;

					case Structures.MessageLocations.Control:
						this.verifyText('Validate Broker Number - Error at Control:', 
							Controls.cx.page.PersonalInformation.Contact.Broker.Number.error.atcontrol, 
							Controls.cx.page.PersonalInformation.Contact.Broker.Number.error.text);
						break;

					default:
						console.log('INVALID : Message Location : cx_gui_libraries.validatePIErrors(Profile.BrokerNumber, atMessageLocation)...');
						break;
				}
				break;

			case Structures.Profile.BrokerName:
				break;

			case Structures.Profile.Next:
				break;
			
			case Structures.Profile.ValidateAll:
				this.validatePIErrors(Structures.Profile.PrimaryName, atMessageLocation);
				this.validatePIErrors(Structures.Profile.MiddleName, atMessageLocation);
				this.validatePIErrors(Structures.Profile.LastName, atMessageLocation);
				this.validatePIErrors(Structures.Profile.Gender, atMessageLocation);
				this.validatePIErrors(Structures.Profile.Birthdate, atMessageLocation);
				this.validatePIErrors(Structures.Profile.DOBMonth, atMessageLocation);
				this.validatePIErrors(Structures.Profile.DOBDate, atMessageLocation);
				this.validatePIErrors(Structures.Profile.DOBYear, atMessageLocation);
				this.validatePIErrors(Structures.Profile.SSNumber, atMessageLocation);
				this.validatePIErrors(Structures.Profile.AlternateIdentifier, atMessageLocation);
				this.validatePIErrors(Structures.Profile.ContactStreet, atMessageLocation);
				this.validatePIErrors(Structures.Profile.ContactCity, atMessageLocation);
				this.validatePIErrors(Structures.Profile.ContactState, atMessageLocation);
				this.validatePIErrors(Structures.Profile.ContactZip, atMessageLocation);
				this.validatePIErrors(Structures.Profile.MailingAddress, atMessageLocation);
				this.validatePIErrors(Structures.Profile.MailingAddressStreet, atMessageLocation);
				this.validatePIErrors(Structures.Profile.MailingAddressCity, atMessageLocation);
				this.validatePIErrors(Structures.Profile.MailingAddressState, atMessageLocation);
				this.validatePIErrors(Structures.Profile.MailingAddressZip, atMessageLocation);
				this.validatePIErrors(Structures.Profile.PhoneType, atMessageLocation);
				this.validatePIErrors(Structures.Profile.PhoneNumber, atMessageLocation);
				this.validatePIErrors(Structures.Profile.EmailAddress, atMessageLocation);
				this.validatePIErrors(Structures.Profile.GoPaperless, atMessageLocation);
				this.validatePIErrors(Structures.Profile.BrokerWorked, atMessageLocation);
				this.validatePIErrors(Structures.Profile.BrokerNumber, atMessageLocation);
				this.validatePIErrors(Structures.Profile.BrokerName, atMessageLocation);
				this.validatePIErrors(Structures.Profile.Next, atMessageLocation);
				break;
			
			default:
				break;
		}
	},
	
	validatePIInformation : function(forGUIControl, withText, isGreaterOK=true) {

		var is_checked = -1;
		
		switch (forGUIControl)
		{
			case Structures.Plan.Company:
				//--- Validate Dental Plan - Company
				this.verifyText('Validate Dental Plan - Company:', 
					Controls.cx.page.PersonalInformation.Header.Company.label, 
					withText);				
				break;
		
			case Structures.Plan.Name:
				//--- Validate Dental Plan - Name
				this.verifyText('Validate Dental Plan - Name:', 
					Controls.cx.page.PersonalInformation.Header.Plan.Name.label, 
					withText);				
				break;
		
			case Structures.Plan.Price:
				//--- Validate Dental Plan - Price
				this.verifyNumericText('Validate Dental Plan - Price:', 
					Controls.cx.page.PersonalInformation.Header.Plan.Price.label, 
					withText,
					isGreaterOK);				
				break;
		
			case Structures.Plan.Fee:
				//--- Validate Dental Plan - Fee
				this.verifyNumericText('Validate Dental Plan - Fee:', 
					Controls.cx.page.PersonalInformation.Header.Plan.Fee.label, 
					withText,
					isGreaterOK);				
				break;
		
			case Structures.Plan.Title:
				//--- Validate Dental Plan - Title
				this.verifyText('Validate Dental Plan - Title:', 
					Controls.cx.page.PersonalInformation.Header.Plan.Title.label, 
					withText);				
				break;
		
			case Structures.Plan.Description:
				//--- Validate Dental Plan - Description
				this.verifyText('Validate Dental Plan - Description:', 
					Controls.cx.page.PersonalInformation.Header.Plan.Description.label, 
					withText);				
				break;
		
			case Structures.Profile.PrimaryName:
				//--- Validate Profile - First Name
				this.verifyText('Validate Profile - First Name:', 
					Controls.cx.page.PersonalInformation.Profile.Names.Primary.input.textbox, 
					withText);				
				break;

			case Structures.Profile.MiddleName:
				//--- Validate Profile - Middle Initial
				this.verifyText('Validate Profile - Middle Initial:', 
					Controls.cx.page.PersonalInformation.Profile.Names.Middle.input.textbox, 
					withText);				
				break;

			case Structures.Profile.LastName:
				//--- Validate Profile - Last Name
				this.verifyText('Validate Profile - Last Name:', 
					Controls.cx.page.PersonalInformation.Profile.Names.Last.input.textbox, 
					withText);				
				break;

			case Structures.Profile.Gender:
				//--- Validate Profile - Gender
				this.verifyText('Validate Profile - Gender:', 
					Controls.cx.page.PersonalInformation.Profile.Gender.input.textbox, 
					withText);				
				break;

			case Structures.Profile.Birthdate:
				break;

			case Structures.Profile.DOBMonth:
				//--- Validate Profile - Birthdate Month
				this.verifyText('Validate Profile - Birthdate Month:', 
					Controls.cx.page.PersonalInformation.Profile.DOB.input.Month.selector, 
					withText);				
				break;

			case Structures.Profile.DOBDate:
				//--- Validate Profile - Birthdate Day
				this.verifyText('Validate Profile - Birthdate Day:', 
					Controls.cx.page.PersonalInformation.Profile.DOB.input.Day.selector, 
					withText);				
				break;

			case Structures.Profile.DOBYear:
				//--- Validate Profile - Birthdate Year
				this.verifyText('Validate Profile - Birthdate Year:', 
					Controls.cx.page.PersonalInformation.Profile.DOB.input.Year.selector, 
					withText);				
				break;

			case Structures.Profile.SSNumber:
				//--- Validate Profile - SSN
				this.verifyText('Validate Profile - SSN:', 
					Controls.cx.page.PersonalInformation.Profile.SSN.input.textbox, 
					withText);				
				break;

			case Structures.Profile.AlternateIdentifier:
				//--- Validate Profile - Alternate Identifier
				this.verifyText('Validate Profile - SSN:', 
					Controls.cx.page.PersonalInformation.Profile.AlternateIdentifier.input.textbox, 
					withText);				
				break;

			case Structures.Profile.ContactStreet:
				//--- Validate Contact Address - Street 
				this.verifyText('Validate Contact Address - Street:', 
					Controls.cx.page.PersonalInformation.Contact.Address.Street.input.textbox, 
					withText);				
				break;

			case Structures.Profile.ContactCity:
				//--- Validate Contact Address - City 
				this.verifyText('Validate Contact Address - City:', 
					Controls.cx.page.PersonalInformation.Contact.Address.City.input.textbox, 
					withText);				
				break;

			case Structures.Profile.ContactState:
				//--- Validate Contact Address - State 
				this.verifyText('Validate Contact Address - State:', 
					Controls.cx.page.PersonalInformation.Contact.Address.State.input.textbox, 
					withText);				
				break;

			case Structures.Profile.ContactZip:
				//--- Validate Contact Address - Zip 
				this.verifyText('Validate Contact Address - Zip:', 
					Controls.cx.page.PersonalInformation.Contact.Address.Zip.input.textbox, 
					withText);				
				break;

			case Structures.Profile.MailingAddress:
				//--- Validate Contact Different Mailing Address - Checkbox
				is_checked = (withText === 'Yes') ? Structures.FrameworkUIActions.Check : Structures.FrameworkUIActions.UnCheck;
				this.verifyCheckbox('Validate Contact Different Mailing Address - Checkbox:',  Controls.cx.page.PersonalInformation.Contact.MailingAddress.Different.input.checkbox, is_checked);
				break;

			case Structures.Profile.MailingAddressStreet:
				//--- Validate Contact Different Mailing Address - Street
				this.verifyText('Validate Contact Different Mailing Address - Street:', 
					Controls.cx.page.PersonalInformation.Contact.MailingAddress.Street.input.textbox, 
					withText);				
				break;

			case Structures.Profile.MailingAddressCity:
				//--- Validate Contact Different Mailing Address - City
				this.verifyText('Validate Contact Different Mailing Address - City:', 
					Controls.cx.page.PersonalInformation.Contact.MailingAddress.City.input.textbox, 
					withText);				
				break;

			case Structures.Profile.MailingAddressState:
				//--- Validate Contact Different Mailing Address - State
				this.verifyText('Validate Contact Different Mailing Address - State:', 
					Controls.cx.page.PersonalInformation.Contact.MailingAddress.State.input.textbox, 
					withText);				
				break;

			case Structures.Profile.MailingAddressZip:
				//--- Validate Contact Different Mailing Address - Zip
				this.verifyText('Validate Contact Different Mailing Address - Zip:', 
					Controls.cx.page.PersonalInformation.Contact.MailingAddress.Zip.input.textbox, 
					withText);				
				break;

			case Structures.Profile.PhoneType:
				//--- Validate Contact Phone - Category
				this.verifyAttibuteText('Validate Contact Phone - Category:',
					Controls.cx.page.PersonalInformation.Contact.Phone.Category.input.select,
					Controls.cx.page.PersonalInformation.Contact.Phone.Category.input.attribute,
					withText);
				break;

			case Structures.Profile.PhoneNumber:
				//--- Validate Contact Phone - Number
				this.verifyText('Validate Contact Phone - Number:', 
					Controls.cx.page.PersonalInformation.Contact.Phone.Number.input.textbox, 
					withText);				
				break;

			case Structures.Profile.EmailAddress:
				//--- Validate Contact Email - Address
				this.verifyText('Validate Contact Email - Address:', 
					Controls.cx.page.PersonalInformation.Contact.Email.input.textbox, 
					withText);				
				break;

			case Structures.Profile.GoPaperless:
				//--- Validate Go Paperless - Checkbox
				is_checked = (withText === 'Yes') ? Structures.FrameworkUIActions.Check : Structures.FrameworkUIActions.UnCheck;
				this.verifyCheckbox('Validate Go Paperless - Checkbox:', 
					Controls.cx.page.PersonalInformation.Contact.Paperless.input.checkbox,
					is_checked);
				break;

			case Structures.Profile.BrokerWorked:
				//--- Validate Has Broker - Checkbox
				is_checked = (withText === 'Yes') ? Structures.FrameworkUIActions.Check : Structures.FrameworkUIActions.UnCheck;
				this.verifyCheckbox('Validate Has Broker - Checkbox:', 
					Controls.cx.page.PersonalInformation.Contact.Broker.IsPresent.input.checkbox,
					is_checked);
				break;

			case Structures.Profile.BrokerNumber:
				//--- Validate Broker - Number
				this.verifyText('Validate Broker - Number:', 
					Controls.cx.page.PersonalInformation.Contact.Broker.Number.input.textbox, 
					withText);				
				break;

			case Structures.Profile.BrokerName:
				//--- Validate Broker - Name
				this.verifyText('Validate Broker - Name:', 
					Controls.cx.page.PersonalInformation.Contact.Broker.Name.input.textbox, 
					withText);				
				break;

			case Structures.Enroll.ZipCode:
				//--- Validate Enrolled hidden page data for - ZipCode
				this.verifyText('Validate Enrolled hidden page data for - ZipCode:', 
					Controls.cx.page.commons.EnrollData.Plan.ZipCode.input.textbox, 
					withText);				
				break;
			
			case Structures.Enroll.State:
				//--- Validate Enrolled hidden page data for - State
				this.verifyText('Validate Enrolled hidden data for - State:', 
					Controls.cx.page.commons.EnrollData.Plan.State.input.textbox, 
					withText);				
				break;
			
			case Structures.Enroll.IssuerCode:
				//--- Validate Enrolled hidden page data for - IssuerCode
				this.verifyText('Validate Enrolled hidden data for - IssuerCode:', 
					Controls.cx.page.commons.EnrollData.Issuer.Code.input.textbox, 
					withText);				
				break;
			
			case Structures.Enroll.CoverageType:
				//--- Validate Enrolled hidden page data for - CoverageType
				this.verifyText('Validate Enrolled hidden data for - CoverageType:', 
					Controls.cx.page.commons.EnrollData.Issuer.Coverage.Type.input.textbox, 
					withText);				
				break;
			
			case Structures.Enroll.StartDate:
				//--- Validate Enrolled hidden page data for - StartDate
				this.verifyText('Validate Enrolled hidden data for - StartDate:', 
					Controls.cx.page.commons.EnrollData.Issuer.Coverage.StartDate.input.textbox, 
					withText);				
				break;
			
			case Structures.Enroll.PlanIdentifier:
				//--- Validate Enrolled hidden page data for - PlanIdentifier
				this.verifyText('Validate Enrolled hidden data for - PlanIdentifier:', 
					Controls.cx.page.commons.EnrollData.Plan.Identifier.input.textbox,
					withText);				
				break;
			
			case Structures.Enroll.AnnualCost:
				//--- Validate Enrolled hidden page data for - AnnualCost
				this.verifyText('Validate Enrolled hidden data for - AnnualCost:', 
					Controls.cx.page.commons.EnrollData.Issuer.Coverage.ActualCost.input.textbox,
					withText);				
				break;
			
			case Structures.Enroll.EnrollmentFee:
				//--- Validate Enrolled hidden page data for - EnrollmentFee
				this.verifyText('Validate Enrolled hidden data for - EnrollmentFee:', 
					Controls.cx.page.commons.EnrollData.Issuer.Coverage.Fees.input.textbox,
					withText);				
				break;
			
			case Structures.Enroll.PlanName:
				//--- Validate Enrolled hidden page data for - PlanName
				this.verifyText('Validate Enrolled hidden data for - PlanName:', 
					Controls.cx.page.commons.EnrollData.Issuer.Coverage.Type.input.textbox,
					withText);				
				break;
			
			case Structures.Enroll.PlanCode:
				//--- Validate Enrolled hidden page data for - PlanCode
				this.verifyText('Validate Enrolled hidden data for - PlanCode:', 
					Controls.cx.page.commons.EnrollData.Plan.Code.input.textbox,
					withText);				
				break;
			
			case Structures.Enroll.ApplicationIdentifier:
				//--- Validate Enrolled hidden page data for - ApplicationIdentifier
				this.verifyText('Validate Enrolled hidden data for - ApplicationIdentifier:', 
					Controls.cx.page.commons.EnrollData.Application.Identifier.input.textbox,
					withText);				
				break;
			
			case Structures.Enroll.Dependents:
				//--- Validate Enrolled hidden page data for - Dependents
				this.verifyText('Validate Enrolled hidden data for - Dependents:', 
					Controls.cx.page.commons.EnrollData.Applicant.Dependents.input.textbox,
					withText);				
				break;
				
			default:
				break;
		
		}
		return true;
	},

	//--- Valid parameter names : Control, DataCSS
	validateDependentCaptions : function(parameters) {
				
		var _index = parseInt(parameters.DataCSS.Index);
		
		switch(parameters.Control) {
			
			case Structures.Dependents.Relationship: 
				//--- Validate Captions (Dependent Page) - Relationship						
				var _derived_xpath = Controls.cx.page.Dependents.Individual.Relationship.input.xpath.label.toString().replace('DEPEND',_index);
				this.verifyText(delta_cx_automation_suite + ' Validate Dependent['+parameters.DataCSS.Index+'] Relationship - Caption', 
					_derived_xpath, 
					Controls.cx.page.Dependents.Individual.Relationship.caption,
					true);
				break;

			case Structures.Dependents.FirstName:
				//--- Validate Captions (Dependent Page) - First Name
				var _derived_xpath = Controls.cx.page.Dependents.Individual.Name.First.input.xpath.label.toString().replace('DEPEND',_index);
				this.verifyText(delta_cx_automation_suite + ' Validate Dependent['+parameters.DataCSS.Index+'] First Name - Caption', 
					_derived_xpath, 
					Controls.cx.page.Dependents.Individual.Name.First.caption,
					true);
				break;

			case Structures.Dependents.MiddleInitial:
				//--- Validate Captions (Dependent Page) - Middle Initial
				var _derived_xpath = Controls.cx.page.Dependents.Individual.Name.Middle.input.xpath.label.toString().replace('DEPEND',_index);
				this.verifyText(delta_cx_automation_suite + ' Validate Dependent['+parameters.DataCSS.Index+'] Middle Initial - Caption', 
					_derived_xpath, 
					Controls.cx.page.Dependents.Individual.Name.Middle.caption,
					true);
				break;

			case Structures.Dependents.LastName:
				//--- Validate Captions (Dependent Page) - Last Name
				var _derived_xpath = Controls.cx.page.Dependents.Individual.Name.Last.input.xpath.label.toString().replace('DEPEND',_index);
				this.verifyText(delta_cx_automation_suite + ' Validate Dependent['+parameters.DataCSS.Index+'] Last Name - Caption', 
					_derived_xpath, 
					Controls.cx.page.Dependents.Individual.Name.Last.caption,
					true);
				break;

			case Structures.Dependents.Gender:
				//--- Validate Captions (Dependent Page) - Gender
				var _derived_xpath = Controls.cx.page.Dependents.Individual.Gender.input.xpath.label.toString().replace('DEPEND',_index);
				this.verifyText(delta_cx_automation_suite + ' Validate Dependent['+parameters.DataCSS.Index+'] Gender - Caption', 
					_derived_xpath, 
					Controls.cx.page.Dependents.Individual.Gender.caption,
					true);
				break;

			case Structures.Dependents.DOBMonth:
				//--- Validate Captions (Dependent Page) - Birthdate
				var _derived_xpath = Controls.cx.page.Dependents.Individual.DOB.input.xpath.label.toString().replace('DEPEND',_index);
				this.verifyText(delta_cx_automation_suite + ' Validate Dependent['+parameters.DataCSS.Index+'] Gender - Caption', 
					_derived_xpath, 
					Controls.cx.page.Dependents.Individual.DOB.caption,
					true);
				break;

			case Structures.Dependents.DOBDate:
				this.validateDependentCaptions({'Control' : Structures.Dependents.DOBMonth, 'DataCSS' : parameters.DataCSS});
				break;

			case Structures.Dependents.DOBYear:
				this.validateDependentCaptions({'Control' : Structures.Dependents.DOBMonth, 'DataCSS' : parameters.DataCSS});
				break;		

			case Structures.Dependents.ValidateAll:
				this.validateDependentCaptions({'Control' : Structures.Dependents.Relationship, 'DataCSS' : parameters.DataCSS});
				this.validateDependentCaptions({'Control' : Structures.Dependents.FirstName, 'DataCSS' : parameters.DataCSS});
				this.validateDependentCaptions({'Control' : Structures.Dependents.MiddleInitial, 'DataCSS' : parameters.DataCSS});
				this.validateDependentCaptions({'Control' : Structures.Dependents.LastName, 'DataCSS' : parameters.DataCSS});
				this.validateDependentCaptions({'Control' : Structures.Dependents.Gender, 'DataCSS' : parameters.DataCSS});
				this.validateDependentCaptions({'Control' : Structures.Dependents.DOBMonth, 'DataCSS' : parameters.DataCSS});
				break;
			
			default:
				break;
		}
	},
	
	//--- Valid parameter names : Control, DataCSS
	validateDependentPlaceholders : function(parameters) {
				
		var _index = parseInt(parameters.DataCSS.Index);
		
		switch(parameters.Control) {
			
			case Structures.Dependents.Relationship: 
				//--- Validate Captions (Dependent Page) - Relationship						
				var _derived_xpath = Controls.cx.page.Dependents.Individual.Relationship.input.xpath.label.toString().replace('DEPEND',_index);
				break;

			case Structures.Dependents.FirstName:
				//--- Validate Captions (Dependent Page) - First Name
				var _derived_xpath = Controls.cx.page.Dependents.Individual.Name.First.input.xpath.label.toString().replace('DEPEND',_index);
				this.verifyAttibuteText('Validate Placeholders (Dependent Page) - First Name - Placeholder:',
					_derived_xpath,
					Controls.cx.page.Dependents.Individual.Name.First.input.attribute,
					Controls.cx.page.Dependents.Individual.Name.First.input.defaults,
					true);
				break;

			case Structures.Dependents.MiddleInitial:
				//--- Validate Captions (Dependent Page) - Middle Initial
				var _derived_xpath = Controls.cx.page.Dependents.Individual.Name.Middle.input.xpath.label.toString().replace('DEPEND',_index);
				this.verifyAttibuteText('Validate Placeholders (Dependent Page) - Middle Initial - Placeholder:',
					_derived_xpath,
					Controls.cx.page.Dependents.Individual.Name.Middle.input.attribute,
					Controls.cx.page.Dependents.Individual.Name.Middle.input.defaults,
					true);
				break;

			case Structures.Dependents.LastName:
				//--- Validate Captions (Dependent Page) - Last Name
				var _derived_xpath = Controls.cx.page.Dependents.Individual.Name.Last.input.xpath.label.toString().replace('DEPEND',_index);
				this.verifyAttibuteText('Validate Placeholders (Dependent Page) - Last Name - Placeholder:',
					_derived_xpath,
					Controls.cx.page.Dependents.Individual.Name.Last.input.attribute,
					Controls.cx.page.Dependents.Individual.Name.Last.input.defaults,
					true);
				break;

			case Structures.Dependents.Gender:
				//--- Validate Captions (Dependent Page) - Gender
				var _derived_xpath = Controls.cx.page.Dependents.Individual.Gender.input.xpath.label.toString().replace('DEPEND',_index);
				this.verifyAttibuteText('Validate Placeholders (Dependent Page) - Gender - Placeholder:',
					_derived_xpath,
					Controls.cx.page.Dependents.Individual.Gender.input.attribute,
					Controls.cx.page.Dependents.Individual.Gender.input.defaults,
					true);
				break;

			case Structures.Dependents.DOBMonth:
				//--- Validate Captions (Dependent Page) - Birthdate
				var _derived_xpath = Controls.cx.page.Dependents.Individual.DOB.input.xpath.label.toString().replace('DEPEND',_index);
				this.verifyAttibuteText('Validate Placeholders (Dependent Page) - Birthdate - Placeholder:',
					_derived_xpath,
					Controls.cx.page.Dependents.Individual.DOB.input.Month.attribute,
					Controls.cx.page.Dependents.Individual.DOB.input.Month.defaults,
					true);
				break;

			case Structures.Dependents.DOBDate:
				this.validateDependentPlaceholders({'Control' : Structures.Dependents.DOBMonth, 'DataCSS' : parameters.DataCSS});
				break;

			case Structures.Dependents.DOBYear:
				this.validateDependentPlaceholders({'Control' : Structures.Dependents.DOBMonth, 'DataCSS' : parameters.DataCSS});
				break;		

			case Structures.Dependents.ValidateAll:
				this.validateDependentPlaceholders({'Control' : Structures.Dependents.Relationship, 'DataCSS' : parameters.DataCSS});
				this.validateDependentPlaceholders({'Control' : Structures.Dependents.FirstName, 'DataCSS' : parameters.DataCSS});
				this.validateDependentPlaceholders({'Control' : Structures.Dependents.MiddleInitial, 'DataCSS' : parameters.DataCSS});
				this.validateDependentPlaceholders({'Control' : Structures.Dependents.LastName, 'DataCSS' : parameters.DataCSS});
				this.validateDependentPlaceholders({'Control' : Structures.Dependents.Gender, 'DataCSS' : parameters.DataCSS});
				this.validateDependentPlaceholders({'Control' : Structures.Dependents.DOBMonth, 'DataCSS' : parameters.DataCSS});
				break;
			
			default:
				break;
		}
	},
	
	validateDependentErrors : function(forGUIControl, atMessageLocation, dataCSS, ofIndice) {
				
		switch(forGUIControl) {
			
			case Structures.Dependents.Relationship: 
				//--- Validate Dependents Error Message For - Relationship				
				var _index = parseInt(dataCSS.Index) - 1;
				var _error_indice = Controls.cx.page.Dependents.Individual.Errors.indices[_index];
				var _validatorCSS = {
					'ontop': Controls.cx.page.Dependents.Individual.Errors.ontop.replace('INDICE',_error_indice[0]),
					'atcontrol': Controls.cx.page.Dependents.Individual.Errors.atcontrol.replace('INDICE',_error_indice[0])
				}
				switch (atMessageLocation)
				{
					case Structures.MessageLocations.Header:
						this.verifyText(delta_cx_automation_suite + ' Validate Dependent['+ofIndice+'] Error Message For Relationship - Error at Header:', 
							_validatorCSS.ontop, 
							Controls.cx.page.Dependents.Individual.Relationship.error.text);
						break;

					case Structures.MessageLocations.Control:
						this.verifyText(delta_cx_automation_suite + ' Validate Dependent['+ofIndice+'] Error Message For Relationship - Error at Control:', 
							_validatorCSS.atcontrol, 
							Controls.cx.page.Dependents.Individual.Relationship.error.text);
						break;

					default:
						console.log('INVALID : Message Location : cx_gui_libraries.validateDependentErrors : function(Dependents.Relationship, atMessageLocation, dataCSS, ofIndice)...');
						break;
				}
				break;

			case Structures.Dependents.FirstName:
				var _index = parseInt(dataCSS.Index) - 1;
				var _error_indice = Controls.cx.page.Dependents.Individual.Errors.indices[_index];
				var _validatorCSS = {
					'ontop': Controls.cx.page.Dependents.Individual.Errors.ontop.replace('INDICE',_error_indice[1]),
					'atcontrol': Controls.cx.page.Dependents.Individual.Errors.atcontrol.replace('INDICE',_error_indice[1])
				}
				switch (atMessageLocation)
				{
					case Structures.MessageLocations.Header:
						this.verifyText(delta_cx_automation_suite + ' Validate Dependent['+ofIndice+'] Error Message For First Name - Error at Header:', 
							_validatorCSS.ontop, 
							Controls.cx.page.Dependents.Individual.Name.First.error.text);
						break;

					case Structures.MessageLocations.Control:
						this.verifyText(delta_cx_automation_suite + ' Validate Dependent['+ofIndice+'] Error Message For First Name - Error at Control:', 
							_validatorCSS.atcontrol, 
							Controls.cx.page.Dependents.Individual.Name.First.error.text);
						break;

					default:
						console.log('INVALID : Message Location : cx_gui_libraries.validateDependentErrors : function(Dependents.FirstName, atMessageLocation, dataCSS, ofIndice)...');
						break;
				}
				break;

			case Structures.Dependents.MiddleInitial:
				break;

			case Structures.Dependents.LastName:
				var _index = parseInt(dataCSS.Index) - 1;
				var _error_indice = Controls.cx.page.Dependents.Individual.Errors.indices[_index];
				var _validatorCSS = {
					'ontop': Controls.cx.page.Dependents.Individual.Errors.ontop.replace('INDICE',_error_indice[2]),
					'atcontrol': Controls.cx.page.Dependents.Individual.Errors.atcontrol.replace('INDICE',_error_indice[2])
				}
				switch (atMessageLocation)
				{
					case Structures.MessageLocations.Header:
						this.verifyText(delta_cx_automation_suite + ' Validate Dependent['+ofIndice+'] Error Message For Last Name - Error at Header:', 
							_validatorCSS.ontop, 
							Controls.cx.page.Dependents.Individual.Name.Last.error.text);
						break;

					case Structures.MessageLocations.Control:
						this.verifyText(delta_cx_automation_suite + ' Validate Dependent['+ofIndice+'] Error Message For Last Name - Error at Control:', 
							_validatorCSS.atcontrol, 
							Controls.cx.page.Dependents.Individual.Name.Last.error.text);
						break;

					default:
						console.log('INVALID : Message Location : cx_gui_libraries.validateDependentErrors : function(Dependents.LastName, atMessageLocation, dataCSS, ofIndice)...');
						break;
				}
				break;

			case Structures.Dependents.Gender:
				var _index = parseInt(dataCSS.Index) - 1;
				var _error_indice = Controls.cx.page.Dependents.Individual.Errors.indices[_index];
				var _validatorCSS = {
					'ontop': Controls.cx.page.Dependents.Individual.Errors.ontop.replace('INDICE',_error_indice[3]),
					'atcontrol': Controls.cx.page.Dependents.Individual.Errors.atcontrol.replace('INDICE',_error_indice[3])
				}
				switch (atMessageLocation)
				{
					case Structures.MessageLocations.Header:
						this.verifyText(delta_cx_automation_suite + ' Validate Dependent['+ofIndice+'] Error Message For Gender - Error at Header:', 
							_validatorCSS.ontop, 
							Controls.cx.page.Dependents.Individual.Gender.error.text);
						break;

					case Structures.MessageLocations.Control:
						this.verifyText(delta_cx_automation_suite + ' Validate Dependent['+ofIndice+'] Error Message For Gender - Error at Control:', 
							_validatorCSS.atcontrol, 
							Controls.cx.page.Dependents.Individual.Gender.error.text);
						break;

					default:
						console.log('INVALID : Message Location : cx_gui_libraries.validateDependentErrors : function(Dependents.Gender, atMessageLocation, dataCSS, ofIndice)...');
						break;
				}
				break;

			case Structures.Dependents.DOBMonth:
				var _index = parseInt(dataCSS.Index) - 1;
				var _error_indice = Controls.cx.page.Dependents.Individual.Errors.indices[_index];
				var _validatorCSS = {
					'ontop': Controls.cx.page.Dependents.Individual.Errors.ontop.replace('INDICE',_error_indice[4]),
					'atcontrol': Controls.cx.page.Dependents.Individual.Errors.atcontrol.replace('INDICE',_error_indice[4])
				}
				switch (atMessageLocation)
				{
					case Structures.MessageLocations.Header:
						this.verifyText(delta_cx_automation_suite + ' Validate Dependent['+ofIndice+'] Error Message For Birthdate Month - Error at Header:', 
							_validatorCSS.ontop, 
							Controls.cx.page.Dependents.Individual.DOB.input.Month.error.text);
						break;

					case Structures.MessageLocations.Control:
						this.verifyText(delta_cx_automation_suite + ' Validate Dependent['+ofIndice+'] Error Message For Birthdate Month - Error at Control:', 
							_validatorCSS.atcontrol, 
							Controls.cx.page.Dependents.Individual.DOB.input.Month.error.text);
						break;

					default:
						console.log('INVALID : Message Location : cx_gui_libraries.validateDependentErrors : function(Dependents.DOBMonth, atMessageLocation, dataCSS, ofIndice)...');
						break;
				}
				break;

			case Structures.Dependents.DOBDate:
				var _index = parseInt(dataCSS.Index) - 1;
				var _error_indice = Controls.cx.page.Dependents.Individual.Errors.indices[_index];
				var _validatorCSS = {
					'ontop': Controls.cx.page.Dependents.Individual.Errors.ontop.replace('INDICE',_error_indice[5]),
					'atcontrol': Controls.cx.page.Dependents.Individual.Errors.atcontrol.replace('INDICE',_error_indice[5])
				}
				switch (atMessageLocation)
				{
					case Structures.MessageLocations.Header:
						this.verifyText(delta_cx_automation_suite + ' Validate Dependent['+ofIndice+'] Error Message For Birthdate Day - Error at Header:', 
							_validatorCSS.ontop, 
							Controls.cx.page.Dependents.Individual.DOB.input.Day.error.text);
						break;

					case Structures.MessageLocations.Control:
						this.verifyText(delta_cx_automation_suite + ' Validate Dependent['+ofIndice+'] Error Message For Birthdate Day - Error at Control:', 
							_validatorCSS.atcontrol, 
							Controls.cx.page.Dependents.Individual.DOB.input.Day.error.text);
						break;

					default:
						console.log('INVALID : Message Location : cx_gui_libraries.validateDependentErrors : function(Dependents.DOBDate, atMessageLocation, dataCSS, ofIndice)...');
						break;
				}
				break;

			case Structures.Dependents.DOBYear:
				var _index = parseInt(dataCSS.Index) - 1;
				var _error_indice = Controls.cx.page.Dependents.Individual.Errors.indices[_index];
				var _validatorCSS = {
					'ontop': Controls.cx.page.Dependents.Individual.Errors.ontop.replace('INDICE',_error_indice[6]),
					'atcontrol': Controls.cx.page.Dependents.Individual.Errors.atcontrol.replace('INDICE',_error_indice[6])
				}
				switch (atMessageLocation)
				{
					case Structures.MessageLocations.Header:
						this.verifyText(delta_cx_automation_suite + ' Validate Dependent['+ofIndice+'] Error Message For Birthdate Year - Error at Header:', 
							_validatorCSS.ontop, 
							Controls.cx.page.Dependents.Individual.DOB.input.Year.error.text);
						break;

					case Structures.MessageLocations.Control:
						this.verifyText(delta_cx_automation_suite + ' Validate Dependent['+ofIndice+'] Error Message For Birthdate Year - Error at Control:', 
							_validatorCSS.atcontrol, 
							Controls.cx.page.Dependents.Individual.DOB.input.Year.error.text);
						break;

					default:
						console.log('INVALID : Message Location : cx_gui_libraries.validateDependentErrors : function(Dependents.DOBYear, atMessageLocation, dataCSS, ofIndice)...');
						break;
				}
				break;		

			case Structures.Dependents.ValidateAll:
				this.validateDependentErrors(Structures.Dependents.Relationship, atMessageLocation, dataCSS, ofIndice);
				this.validateDependentErrors(Structures.Dependents.FirstName, atMessageLocation, dataCSS, ofIndice);
				this.validateDependentErrors(Structures.Dependents.MiddleInitial, atMessageLocation, dataCSS, ofIndice);
				this.validateDependentErrors(Structures.Dependents.LastName, atMessageLocation, dataCSS, ofIndice);
				this.validateDependentErrors(Structures.Dependents.Gender, atMessageLocation, dataCSS, ofIndice);
				this.validateDependentErrors(Structures.Dependents.DOBMonth, atMessageLocation, dataCSS, ofIndice);
				this.validateDependentErrors(Structures.Dependents.DOBDate, atMessageLocation, dataCSS, ofIndice);
				this.validateDependentErrors(Structures.Dependents.DOBYear, atMessageLocation, dataCSS, ofIndice);
				break;
			
			default:
				break;
		}
	},

	//--- Valid parameter names : Control
	validateFacilityCaptions : function(parameters) {
		switch(parameters.Control) {			
			case Structures.Facilities.Search:
				//--- Validate Facilities Search - Caption
				this.verifyText('Validate Facilities Search - Caption:', 
					Controls.cx.page.Facilities.Facility.Search.label, 
					Controls.cx.page.Facilities.Facility.Search.caption);
				break;

			case Structures.Facilities.Back:
				//--- Validate Facilities Back Button - Caption
				this.verifyText('Validate Facilities Back Button - Caption:', 
					Controls.cx.page.Facilities.Action.Back.label, 
					Controls.cx.page.Facilities.Action.Back.caption);
				break;

			case Structures.Facilities.Next:
				//--- Validate Facilities Next Button - Caption
				this.verifyText('Validate Facilities Next Button - Caption:', 
					Controls.cx.page.Facilities.Action.Next.label, 
					Controls.cx.page.Facilities.Action.Next.caption);
				break;

			case Structures.Facilities.MoreResults:
				//--- Validate Facilities MoreResults Button - Caption
				this.verifyText('Validate Facilities MoreResults Button - Caption:', 
					Controls.cx.page.Facilities.Action.MoreResults.label, 
					Controls.cx.page.Facilities.Action.MoreResults.caption);
				break;

			case Structures.Facilities.More:
				break;

			case Structures.Facilities.Less:
				break;

			case Structures.Facilities.Facility:
				//--- Validate Facilities Facility - Caption
				this.verifyText('Validate Facilities Facility - Caption:', 
					Controls.cx.page.Facilities.Information.Facility.Description.label, 
					Controls.cx.page.Facilities.Information.Facility.Description.caption);
				break;

			case Structures.Facilities.Applicants:
				//--- Validate Facilities Applicants - Caption
				this.verifyText('Validate Facilities Applicants - Caption:', 
					Controls.cx.page.Facilities.Information.Enrollee.Name.label, 
					Controls.cx.page.Facilities.Information.Enrollee.Name.caption);
				break;
				
			case Structures.Facilities.RecentlySelected:
				//--- Validate Facilities Recently Selected - Caption
				this.verifyText('Validate Facilities Recently Selected - Caption:', 
					Controls.cx.page.Facilities.Facility.RecentlySelected.Facility.Name.label, 
					Controls.cx.page.Facilities.Facility.RecentlySelected.Facility.Name.caption);
				break;
				
			case Structures.Facilities.Enrollee:
				break;

			case Structures.Facilities.ValidateAll:
				this.validateFacilityCaptions({'Control' : Structures.Facilities.Search});
				this.validateFacilityCaptions({'Control' : Structures.Facilities.Back});
				this.validateFacilityCaptions({'Control' : Structures.Facilities.Next});
				this.validateFacilityCaptions({'Control' : Structures.Facilities.MoreResults});
				this.validateFacilityCaptions({'Control' : Structures.Facilities.More});
				this.validateFacilityCaptions({'Control' : Structures.Facilities.Less});
				this.validateFacilityCaptions({'Control' : Structures.Facilities.Facility});
				this.validateFacilityCaptions({'Control' : Structures.Facilities.Applicants});
				this.validateFacilityCaptions({'Control' : Structures.Facilities.RecentlySelected});
				this.validateFacilityCaptions({'Control' : Structures.Facilities.Enrollee});
				break;
			default:
				break;
		}
		return true;
	},
	
	//--- Valid parameter names : Control
	validateFacilityPlaceholders : function(parameters) {
		switch(parameters.Control) {			
			case Structures.Facilities.Search:
				//--- Validate Facilities Search - Placeholder
				this.verifyAttibuteText('Validate Facilities Search - Placeholder:',
					Controls.cx.page.Facilities.Facility.Search.input.textbox,
					Controls.cx.page.Facilities.Facility.Search.attribute,
					Controls.cx.page.Facilities.Facility.Search.input.defaults);
				break;

			case Structures.Facilities.Back:
				break;

			case Structures.Facilities.Next:
				break;

			case Structures.Facilities.MoreResults:
				break;

			case Structures.Facilities.More:
				break;

			case Structures.Facilities.Less:
				break;

			case Structures.Facilities.Facility:
				break;

			case Structures.Facilities.Applicants:
				break;
				
			case Structures.Facilities.RecentlySelected:
				break;

			case Structures.Facilities.Enrollee:
				break;

			case Structures.Facilities.ValidateAll:
				this.validateFacilityPlaceholders({'Control' : Structures.Facilities.Search});
				break;

			default:
				break;
		}
		return true;
		
	},
	
	//--- Valid parameter names : Control, MessageLocation
	validateFacilityErrors : function(parameters) {
		switch(parameters.Control) {			
			case Structures.Facilities.Search:
				//--- Validate First Name - Error Message
				switch (parameters.MessageLocation)
				{
					case Structures.MessageLocations.Header:
						this.verifyText('Validate Search Zipcode - Error at Header:', 
							Controls.cx.page.Facilities.Facility.Search.error.ontop, 
							Controls.cx.page.Facilities.Facility.Search.error.text);
						break;

					case Structures.MessageLocations.Control:
						break;

					default:
						console.log('INVALID : Message Location : cx_gui_libraries.validateFacilityErrors(parameters)...');
						break;
				}
				break;

			case Structures.Facilities.Back:
				break;

			case Structures.Facilities.Next:
				break;

			case Structures.Facilities.MoreResults:
				break;

			case Structures.Facilities.More:
				break;

			case Structures.Facilities.Less:
				break;

			case Structures.Facilities.Facility:
				break;

			case Structures.Facilities.Applicants:
				break;
				
			case Structures.Facilities.RecentlySelected:
				break;

			case Structures.Facilities.Enrollee:
				break;

			case Structures.Facilities.ValidateAll:
				this.validateFacilityErrors({'Control' : Structures.Facilities.Search,
										     'MessageLocation' : parameters.ValidateFor});
			break;
				
			default:
				break;
		}
		return true;
		
	},
	
	//--- Valid parameter names : Control, ValidateFor, WithData, DataCSS, OfIndice
	validateFacilityInformation : function(parameters) {
		switch(parameters.Control) {			
			case Structures.Facilities.Search:
				break;

			case Structures.Facilities.Back:
				break;

			case Structures.Facilities.Next:
				break;

			case Structures.Facilities.MoreResults:
				break;

			case Structures.Facilities.More:
				break;

			case Structures.Facilities.Less:
				break;

			case Structures.Facilities.Facility:
				break;

			case Structures.Facilities.Applicants:
				break;
				
			case Structures.Facilities.RecentlySelected:
				break;

			case Structures.Facilities.Enrollee:
				break;
				
			case Structures.Facilities.ValidateAll:
				break;

			default:
				break;
		}
		return true;
	},
	
	//--- Valid parameter names : Control
	validatePaymentReviewCaptions : function(parameters) {
		switch(parameters.Control) {

			case Structures.PaymentReview.NameOnCard:
				//--- Validate Name on Card - Caption
				this.verifyText('Validate Name on Card - Caption:', 
					Controls.cx.page.Purchase.Card.Name.label, 
					Controls.cx.page.Purchase.Card.Name.caption);
				break;
				
			case Structures.PaymentReview.CardNumber:
				//--- Validate Card Number - Caption
				this.verifyText('Validate Card Number - Caption:', 
					Controls.cx.page.Purchase.Card.Number.label, 
					Controls.cx.page.Purchase.Card.Number.caption);
				break;

			case Structures.PaymentReview.ExpirationMonth:
				//--- Validate Expiration Month - Caption
				this.verifyText('Validate Expiration Month - Caption:', 
					Controls.cx.page.Purchase.Card.ExpirationDate.input.Month.label, 
					Controls.cx.page.Purchase.Card.ExpirationDate.input.Month.caption);
				break;

			case Structures.PaymentReview.ExpirationYear:
				//--- Validate Expiration Year - Caption
				this.verifyText('Validate Expiration Year - Caption:', 
					Controls.cx.page.Purchase.Card.ExpirationDate.input.Year.label, 
					Controls.cx.page.Purchase.Card.ExpirationDate.input.Year.caption);
				break;

			case Structures.PaymentReview.SecurityCode:
				//--- Validate CCV Code - Caption
				this.verifyText('Validate CCV Code - Caption:', 
					Controls.cx.page.Purchase.Card.CCVCode.label, 
					Controls.cx.page.Purchase.Card.CCVCode.caption);
				break;

			case Structures.PaymentReview.HasMailingAddress:
				//--- Validate Has Mailing Address - Caption
				this.verifyText('Validate Has Mailing Address - Caption:', 
					Controls.cx.page.Purchase.Card.BillingAddress.SameBillingAddress.label, 
					Controls.cx.page.Purchase.Card.BillingAddress.SameBillingAddress.caption);
				break;

			case Structures.PaymentReview.MailingStreet:
				//--- Validate Mailing Address Street - Caption
				this.verifyText('Validate Mailing Address Street - Caption:', 
					Controls.cx.page.Purchase.Card.BillingAddress.Address.Street.label, 
					Controls.cx.page.Purchase.Card.BillingAddress.Address.Street.caption);
				break;

			case Structures.PaymentReview.MailingCity:
				//--- Validate Mailing Address City - Caption
				this.verifyText('Validate Mailing Address City - Caption:', 
					Controls.cx.page.Purchase.Card.BillingAddress.Address.City.label, 
					Controls.cx.page.Purchase.Card.BillingAddress.Address.City.caption);
				break;

			case Structures.PaymentReview.MailingState:
				//--- Validate Mailing Address State - Caption
				this.verifyText('Validate Mailing Address State - Caption:', 
					Controls.cx.page.Purchase.Card.BillingAddress.Address.State.label, 
					Controls.cx.page.Purchase.Card.BillingAddress.Address.State.caption);
				break;

			case Structures.PaymentReview.MailingZip:
				//--- Validate Mailing Address Zip - Caption
				this.verifyText('Validate Mailing Address Zip - Caption:', 
					Controls.cx.page.Purchase.Card.BillingAddress.Address.Zip.label, 
					Controls.cx.page.Purchase.Card.BillingAddress.Address.Zip.caption);
				break;

			case Structures.PaymentReview.SaveForFuture:
				//--- Validate Save Card Information for future - Caption
				this.verifyText('Validate Save Card Information for future - Caption:', 
					Controls.cx.page.Purchase.Card.SaveForFuture.label, 
					Controls.cx.page.Purchase.Card.SaveForFuture.caption);
				break;

			case Structures.PaymentReview.AgreeAuthorization:
				//--- Validate Authorization - Caption
				this.verifyText('Validate Authorization - Caption:', 
					Controls.cx.page.Purchase.Authorization.label, 
					Controls.cx.page.Purchase.Authorization.caption);
				//--- Validate Authorization Agreement - Caption
				this.verifyText('Validate Authorization Agreement - Caption:', 
					Controls.cx.page.Purchase.Authorization.Agreement.label, 
					Controls.cx.page.Purchase.Authorization.Agreement.caption);
				//--- Validate Authorization Agreement Statement - Caption
				this.verifyText('Validate Authorization Agreement Statement - Caption:', 
					Controls.cx.page.Purchase.Authorization.Agreement.Statement.label, 
					Controls.cx.page.Purchase.Authorization.Agreement.Statement.caption);
				break;

			case Structures.PaymentReview.ReceiptDownload:
				//--- Validate Form or Contract Download PDF - Caption
				this.verifyText('Validate Form or Contract Download PDF - Caption:', 
					Controls.cx.page.Purchase.DisclosureFormContract.DownloadCopy.label, 
					Controls.cx.page.Purchase.DisclosureFormContract.DownloadCopy.caption);
				break;

			case Structures.PaymentReview.ReceiptPostage:
				//--- Validate Form or Contract mailed by postage - Caption
				this.verifyText('Validate Form or Contract mailed by postage - Caption:', 
					Controls.cx.page.Purchase.DisclosureFormContract.PostACopy.label, 
					Controls.cx.page.Purchase.DisclosureFormContract.PostACopy.caption);
				break;

			case Structures.PaymentReview.PlanSummary:
				//--- Validate Plan Summary - Caption
				this.verifyText('Validate Plan Summary - Caption:', 
					Controls.cx.page.Purchase.ReviewPlan.PlanSummary.label, 
					Controls.cx.page.Purchase.ReviewPlan.PlanSummary.caption);
				break;

			case Structures.PaymentReview.Applicants:
				break;

			case Structures.PaymentReview.WhatIsThis:
				break;

			case Structures.PaymentReview.DisclosureForContract:
				break;

			case Structures.PaymentReview.Back:
				break;

			case Structures.PaymentReview.PurchaseNow:
				break;
			
			case Structures.PaymentReview.ValidateAll:
				this.validatePaymentReviewCaptions(Structures.PaymentReview.NameOnCard);
				this.validatePaymentReviewCaptions(Structures.PaymentReview.CardNumber);
				this.validatePaymentReviewCaptions(Structures.PaymentReview.ExpirationMonth);
				this.validatePaymentReviewCaptions(Structures.PaymentReview.ExpirationYear);
				this.validatePaymentReviewCaptions(Structures.PaymentReview.SecurityCode);
				this.validatePaymentReviewCaptions(Structures.PaymentReview.HasMailingAddress);
				this.validatePaymentReviewCaptions(Structures.PaymentReview.MailingStreet);
				this.validatePaymentReviewCaptions(Structures.PaymentReview.MailingCity);
				this.validatePaymentReviewCaptions(Structures.PaymentReview.MailingState);
				this.validatePaymentReviewCaptions(Structures.PaymentReview.MailingZip);
				this.validatePaymentReviewCaptions(Structures.PaymentReview.SaveForFuture);
				this.validatePaymentReviewCaptions(Structures.PaymentReview.AgreeAuthorization);
				this.validatePaymentReviewCaptions(Structures.PaymentReview.ReceiptDownload);
				this.validatePaymentReviewCaptions(Structures.PaymentReview.ReceiptPostage);
				this.validatePaymentReviewCaptions(Structures.PaymentReview.PlanSummary);
				this.validatePaymentReviewCaptions(Structures.PaymentReview.Applicants);
				this.validatePaymentReviewCaptions(Structures.PaymentReview.WhatIsThis);
				this.validatePaymentReviewCaptions(Structures.PaymentReview.DisclosureForContract);
				this.validatePaymentReviewCaptions(Structures.PaymentReview.Back);
				this.validatePaymentReviewCaptions(Structures.PaymentReview.PurchaseNow);
				break;
		
			default:
				break;

		}
	},
	
	//--- Valid parameter names : Control
	validatePaymentReviewPlaceholders : function(parameters) {
		switch(parameters.Control) {

			case Structures.PaymentReview.NameOnCard:
				break;
				
			case Structures.PaymentReview.CardNumber:
				break;

			case Structures.PaymentReview.ExpirationMonth:
				break;

			case Structures.PaymentReview.ExpirationYear:
				break;

			case Structures.PaymentReview.SecurityCode:
				break;

			case Structures.PaymentReview.HasMailingAddress:
				break;

			case Structures.PaymentReview.MailingStreet:
				break;

			case Structures.PaymentReview.MailingCity:
				break;

			case Structures.PaymentReview.MailingState:
				break;

			case Structures.PaymentReview.MailingZip:
				break;

			case Structures.PaymentReview.SaveForFuture:
				break;

			case Structures.PaymentReview.AgreeAuthorization:
				break;

			case Structures.PaymentReview.ReceiptDownload:
				break;

			case Structures.PaymentReview.ReceiptPostage:
				break;

			case Structures.PaymentReview.PlanSummary:
				break;

			case Structures.PaymentReview.Applicants:
				break;

			case Structures.PaymentReview.WhatIsThis:
				break;

			case Structures.PaymentReview.DisclosureForContract:
				break;

			case Structures.PaymentReview.Back:
				break;

			case Structures.PaymentReview.PurchaseNow:
				break;
			
			case Structures.PaymentReview.ValidateAll:
				this.validatePaymentReviewPlaceholders(Structures.PaymentReview.NameOnCard);
				this.validatePaymentReviewPlaceholders(Structures.PaymentReview.CardNumber);
				this.validatePaymentReviewPlaceholders(Structures.PaymentReview.ExpirationMonth);
				this.validatePaymentReviewPlaceholders(Structures.PaymentReview.ExpirationYear);
				this.validatePaymentReviewPlaceholders(Structures.PaymentReview.SecurityCode);
				this.validatePaymentReviewPlaceholders(Structures.PaymentReview.HasMailingAddress);
				this.validatePaymentReviewPlaceholders(Structures.PaymentReview.MailingStreet);
				this.validatePaymentReviewPlaceholders(Structures.PaymentReview.MailingCity);
				this.validatePaymentReviewPlaceholders(Structures.PaymentReview.MailingState);
				this.validatePaymentReviewPlaceholders(Structures.PaymentReview.MailingZip);
				this.validatePaymentReviewPlaceholders(Structures.PaymentReview.SaveForFuture);
				this.validatePaymentReviewPlaceholders(Structures.PaymentReview.AgreeAuthorization);
				this.validatePaymentReviewPlaceholders(Structures.PaymentReview.ReceiptDownload);
				this.validatePaymentReviewPlaceholders(Structures.PaymentReview.ReceiptPostage);
				this.validatePaymentReviewPlaceholders(Structures.PaymentReview.PlanSummary);
				this.validatePaymentReviewPlaceholders(Structures.PaymentReview.Applicants);
				this.validatePaymentReviewPlaceholders(Structures.PaymentReview.WhatIsThis);
				this.validatePaymentReviewPlaceholders(Structures.PaymentReview.DisclosureForContract);
				this.validatePaymentReviewPlaceholders(Structures.PaymentReview.Back);
				this.validatePaymentReviewPlaceholders(Structures.PaymentReview.PurchaseNow);
				break;
		
			default:
				break;

		}
	},
	
	//--- Valid parameter names : Control, MessageLocation
	validatePaymentReviewErrors : function(parameters) {
		switch(parameters.Control) {

			case Structures.PaymentReview.NameOnCard:
				//--- Validate Name On Card - Error Message
				switch (parameters.MessageLocation)
				{
					case Structures.MessageLocations.Header:
						this.verifyText('Validate Name On Card - Error Message:', 
							Controls.cx.page.Purchase.Card.Name.error.ontop, 
							Controls.cx.page.Purchase.Card.Name.error.text);
						break;

					case Structures.MessageLocations.Control:
						this.verifyText('Validate Name On Card - Error Message:', 
							Controls.cx.page.Purchase.Card.Name.error.atcontrol, 
							Controls.cx.page.Purchase.Card.Name.error.text);
						break;

					default:
						console.log('INVALID : Message Location : cx_gui_libraries.validatePaymentReviewErrors(parameters)...');
						break;
				}
				break;
				
			case Structures.PaymentReview.CardNumber:
				//--- Validate Card Number - Error Message
				switch (parameters.MessageLocation)
				{
					case Structures.MessageLocations.Header:
						this.verifyText('Validate Card Number - Error Message:', 
							Controls.cx.page.Purchase.Card.Number.error.ontop, 
							Controls.cx.page.Purchase.Card.Number.error.text);
						break;

					case Structures.MessageLocations.Control:
						this.verifyText('Validate Card Number - Error Message:', 
							Controls.cx.page.Purchase.Card.Number.error.atcontrol, 
							Controls.cx.page.Purchase.Card.Number.error.text);
						break;

					default:
						console.log('INVALID : Message Location : cx_gui_libraries.validatePaymentReviewErrors(parameters)...');
						break;
				}
				break;

			case Structures.PaymentReview.ExpirationMonth:
				//--- Validate Card Expiration Month - Error Message
				switch (parameters.MessageLocation)
				{
					case Structures.MessageLocations.Header:
						this.verifyText('Validate Card Expiration Month - Error Message:', 
							Controls.cx.page.Purchase.Card.ExpirationDate.input.Month.error.ontop, 
							Controls.cx.page.Purchase.Card.ExpirationDate.input.Month.error.text);
						break;

					case Structures.MessageLocations.Control:
						this.verifyText('Validate Card Expiration Month - Error Message:', 
							Controls.cx.page.Purchase.Card.ExpirationDate.input.Month.error.atcontrol, 
							Controls.cx.page.Purchase.Card.ExpirationDate.input.Month.error.text);
						break;

					default:
						console.log('INVALID : Message Location : cx_gui_libraries.validatePaymentReviewErrors(parameters)...');
						break;
				}
				break;

			case Structures.PaymentReview.ExpirationYear:
				//--- Validate Card Expiration Year - Error Message
				switch (parameters.MessageLocation)
				{
					case Structures.MessageLocations.Header:
						this.verifyText('Validate Card Expiration Year - Error Message:', 
							Controls.cx.page.Purchase.Card.ExpirationDate.input.Year.error.ontop, 
							Controls.cx.page.Purchase.Card.ExpirationDate.input.Year.error.text);
						break;

					case Structures.MessageLocations.Control:
						this.verifyText('Validate Card Expiration Year - Error Message:', 
							Controls.cx.page.Purchase.Card.ExpirationDate.input.Year.error.atcontrol, 
							Controls.cx.page.Purchase.Card.ExpirationDate.input.Year.error.text);
						break;

					default:
						console.log('INVALID : Message Location : cx_gui_libraries.validatePaymentReviewErrors(parameters)...');
						break;
				}
				break;

			case Structures.PaymentReview.SecurityCode:
				//--- Validate Card CCV Code - Error Message
				switch (parameters.MessageLocation)
				{
					case Structures.MessageLocations.Header:
						this.verifyText('Validate Card CCV Code - Error Message:', 
							Controls.cx.page.Purchase.Card.CCVCode.error.ontop, 
							Controls.cx.page.Purchase.Card.CCVCode.error.text);
						break;

					case Structures.MessageLocations.Control:
						this.verifyText('Validate Card CCV Code - Error Message:', 
							Controls.cx.page.Purchase.Card.CCVCode.error.atcontrol, 
							Controls.cx.page.Purchase.Card.CCVCode.error.text);
						break;

					default:
						console.log('INVALID : Message Location : cx_gui_libraries.validatePaymentReviewErrors(parameters)...');
						break;
				}				
				break;

			case Structures.PaymentReview.HasMailingAddress:
				break;

			case Structures.PaymentReview.MailingStreet:
				break;

			case Structures.PaymentReview.MailingCity:
				break;

			case Structures.PaymentReview.MailingState:
				break;

			case Structures.PaymentReview.MailingZip:
				break;

			case Structures.PaymentReview.SaveForFuture:
				break;

			case Structures.PaymentReview.AgreeAuthorization:
				//--- Validate Agree Authorization Statement - Error Message
				switch (parameters.MessageLocation)
				{
					case Structures.MessageLocations.Header:
						this.verifyText('Validate Agree Authorization Statement - Error Message:', 
							Controls.cx.page.Purchase.Authorization.Agreement.error.ontop, 
							Controls.cx.page.Purchase.Authorization.Agreement.error.text);
						break;

					case Structures.MessageLocations.Control:
						this.verifyText('Validate Agree Authorization Statement - Error Message:', 
							Controls.cx.page.Purchase.Authorization.Agreement.error.atcontrol, 
							Controls.cx.page.Purchase.Authorization.Agreement.error.text);
						break;

					default:
						console.log('INVALID : Message Location : cx_gui_libraries.validatePaymentReviewErrors(parameters)...');
						break;
				}				
				break;

			case Structures.PaymentReview.ReceiptDownload:
				break;

			case Structures.PaymentReview.ReceiptPostage:
				break;

			case Structures.PaymentReview.PlanSummary:
				break;

			case Structures.PaymentReview.Applicants:
				break;

			case Structures.PaymentReview.WhatIsThis:
				break;

			case Structures.PaymentReview.DisclosureForContract:
				break;

			case Structures.PaymentReview.Back:
				break;

			case Structures.PaymentReview.PurchaseNow:
				break;
			
			case Structures.PaymentReview.ValidateAll:
				this.validatePaymentReviewErrors({'Control' : parameters.NameOnCard, 'MessageLocation' : parameters.MessageLocation});
				this.validatePaymentReviewErrors({'Control' : parameters.CardNumber, 'MessageLocation' : parameters.MessageLocation});
				this.validatePaymentReviewErrors({'Control' : parameters.ExpirationMonth, 'MessageLocation' : parameters.MessageLocation});
				this.validatePaymentReviewErrors({'Control' : parameters.ExpirationYear, 'MessageLocation' : parameters.MessageLocation});
				this.validatePaymentReviewErrors({'Control' : parameters.AgreeAuthorization, 'MessageLocation' : parameters.MessageLocation});
				break;
		
			default:
				break;

		}
	},
	
	//--- Valid parameter names : Control, WithData, DataCSS, OfIndice
	validatePaymentReviewInformation : function(parameters) {
		switch(parameters.Control) {

			case Structures.PaymentReview.NameOnCard:
				//--- Validate Name on Card - Data
				this.verifyText('Validate Name on Card - Data:' + parameters.DataCSS.Payment.Card.Name, 
					Controls.cx.page.Purchase.Card.Name.input.textbox, 
					parameters.DataCSS.Payment.Card.Name);
				break;
				
			case Structures.PaymentReview.CardNumber:
				//--- Validate Card Number - Data
				this.verifyText('Validate Card Number - Data:' + parameters.DataCSS.Payment.Card.Number, 
					Controls.cx.page.Purchase.Card.Number.input.textbox, 
					parameters.DataCSS.Payment.Card.Number);
				break;

			case Structures.PaymentReview.ExpirationMonth:
				//--- Validate Card Expiration Month - Data
				this.verifyText('Validate Card Expiration Month - Data:' + parameters.DataCSS.Payment.Card.Expiration.Month, 
					Controls.cx.page.Purchase.Card.ExpirationDate.input.Month.selector, 
					parameters.DataCSS.Payment.Card.Expiration.Month);
				break;

			case Structures.PaymentReview.ExpirationYear:
				//--- Validate Card Expiration Year - Data
				this.verifyText('Validate Card Expiration Year - Data:' + parameters.DataCSS.Payment.Card.Expiration.Year, 
					Controls.cx.page.Purchase.Card.ExpirationDate.input.Year.selector, 
					parameters.DataCSS.Payment.Card.Expiration.Year);
				break;

			case Structures.PaymentReview.SecurityCode:
				//--- Validate Card CCV Number - Data
				this.verifyText('Validate Card CCV Number - Data:' + parameters.DataCSS.Payment.Card.CCVNumber, 
					Controls.cx.page.Purchase.Card.CCVCode.input.textbox, 
					parameters.DataCSS.Payment.Card.CCVNumber);
				break;

			case Structures.PaymentReview.HasMailingAddress:
				//--- Validate Has Mailing Address - Checkbox
				var is_checked = (parameters.DataCSS.Payment.Card.MailingAddress.Exists == "Yes") ? Structures.FrameworkUIActions.Check : Structures.FrameworkUIActions.UnCheck;
				this.verifyCheckbox('Validate Has Mailing Address - Checkbox: Is Checked = ' + parameters.DataCSS.Payment.Card.MailingAddress.Exists ,  
									Controls.cx.page.Purchase.Card.BillingAddress.SameBillingAddress.input.checkbox, 
									is_checked);
				break;

			case Structures.PaymentReview.MailingStreet:
				//--- Validate Card Billing Address Street - Data
				this.verifyText('Validate Card Billing Address Street - Data:' + parameters.DataCSS.Payment.Card.MailingAddress.Street, 
					Controls.cx.page.Purchase.Card.BillingAddress.Address.Street.input.textbox, 
					parameters.DataCSS.Payment.Card.MailingAddress.Street);
				break;

			case Structures.PaymentReview.MailingCity:
				//--- Validate Card Billing Address City - Data
				this.verifyText('Validate Card Billing Address City - Data:' + parameters.DataCSS.Payment.Card.MailingAddress.City, 
					Controls.cx.page.Purchase.Card.BillingAddress.Address.City.input.textbox, 
					parameters.DataCSS.Payment.Card.MailingAddress.City);
				break;

			case Structures.PaymentReview.MailingState:
				//--- Validate Card Billing Address State - Data
				this.verifyText('Validate Card Billing Address State - Data:' + parameters.DataCSS.Payment.Card.MailingAddress.State, 
					Controls.cx.page.Purchase.Card.BillingAddress.Address.State.input.textbox, 
					parameters.DataCSS.Payment.Card.MailingAddress.State);
				break;

			case Structures.PaymentReview.MailingZip:
				//--- Validate Card Billing Address Zip - Data
				this.verifyText('Validate Card Billing Address Zip - Data:' + parameters.DataCSS.Payment.Card.MailingAddress.Zip, 
					Controls.cx.page.Purchase.Card.BillingAddress.Address.Zip.input.textbox, 
					parameters.DataCSS.Payment.Card.MailingAddress.Zip);
				break;

			case Structures.PaymentReview.SaveForFuture:
				//--- Validate Save For Future - Checkbox
				var is_checked = (parameters.DataCSS.Payment.Card.SaveForFuture == "Yes") ? Structures.FrameworkUIActions.Check : Structures.FrameworkUIActions.UnCheck;
				this.verifyCheckbox('Validate Save For Future - Checkbox: Is Checked = ' + parameters.DataCSS.Payment.Card.SaveForFuture,  
									Controls.cx.page.Purchase.Card.SaveForFuture.input.checkbox, 
									is_checked);
				break;

			case Structures.PaymentReview.AgreeAuthorization:
				//--- Validate Agree to Authorization - Checkbox
				var is_checked = (parameters.DataCSS.Payment.Card.AgreeToAuthorizationStatment == "Yes") ? Structures.FrameworkUIActions.Check : Structures.FrameworkUIActions.UnCheck;
				this.verifyCheckbox('Validate Agree to Authorization - Checkbox: Is Checked = ' + parameters.DataCSS.Payment.Card.AgreeToAuthorizationStatment,  
									Controls.cx.page.Purchase.Authorization.Agreement.input.checkbox, 
									is_checked);
				break;

			case Structures.PaymentReview.ReceiptDownload:
				//--- Validate Disclosure Form/Contract Download PDF - Checkbox
				var is_checked = (parameters.DataCSS.Payment.Card.DisclosureFormContract.IsDownloadedToPDF == "Yes") ? Structures.FrameworkUIActions.Check : Structures.FrameworkUIActions.UnCheck;
				this.verifyCheckbox('Validate Disclosure Form/Contract Download PDF - Checkbox: Is Checked = ' + parameters.DataCSS.Payment.Card.DisclosureFormContract.IsDownloadedToPDF,  
									Controls.cx.page.Purchase.DisclosureFormContract.DownloadCopy.input.checkbox, 
									is_checked);
				break;

			case Structures.PaymentReview.ReceiptPostage:
				//--- Validate Disclosure Form/Contract Send Via Postage - Checkbox
				var is_checked = (parameters.DataCSS.Payment.Card.DisclosureFormContract.IsSendByPostage == "Yes") ? Structures.FrameworkUIActions.Check : Structures.FrameworkUIActions.UnCheck;
				this.verifyCheckbox('Validate Disclosure Form/Contract Send Via Postage: Is Checked = ' + parameters.DataCSS.Payment.Card.DisclosureFormContract.IsSendByPostage,  
									Controls.cx.page.Purchase.DisclosureFormContract.PostACopy.input.checkbox, 
									is_checked);
				break;

			case Structures.PaymentReview.PlanSummary:
				var _hashmap = this.getPlanSummary();
				//ListGUI, ItemGUI WithData, OfIndice, Message
				if (_hashmap) {
					for (var index = 0; index < this._hashmap['SummaryItems']; index++) {
						this.verifyTextInElementArray({'ListGUI' : Controls.cx.page.Purchase.ReviewPlan.PlanSummary.Description.Details.table,
													   'ItemGUI' : Controls.cx.page.Purchase.ReviewPlan.PlanSummary.Description.Details.input.row,
													   'WithData' : _hashmap[index].key,
													   'OfIndice' : index,
													   'Message' : 'CX : Purchase & Review Page : Plan Summary : Verify & Validate particulars of the plan for ('+_hashmap[index].key+')'});
						this.verifyTextInElementArray({'ListGUI' : Controls.cx.page.Purchase.ReviewPlan.PlanSummary.Description.Details.table,
													   'ItemGUI' : Controls.cx.page.Purchase.ReviewPlan.PlanSummary.Description.Details.input.column,
													   'WithData' : _hashmap[index].value,
													   'OfIndice' : index,
													   'Message' : 'CX : Purchase & Review Page : Plan Summary : Verify & Validate costs of particulars of the plan for ('+_hashmap[index].key + ' = ' + _hashmap[index].value +')'});
					}
				}
				break;

			case Structures.PaymentReview.Applicants:
				break;

			case Structures.PaymentReview.ValidateAll:
				this.validatePaymentReviewInformation({'Control' : Structures.PaymentReview.NameOnCard,
													   'DataCSS' : parameters.DataCSS,
													   'WithData' : parameters.WithData,
													   'OfIndice' : parameters.OfIndice});
				this.validatePaymentReviewInformation({'Control' : Structures.PaymentReview.CardNumber,
													   'DataCSS' : parameters.DataCSS,
													   'WithData' : parameters.WithData,
													   'OfIndice' : parameters.OfIndice});
				this.validatePaymentReviewInformation({'Control' : Structures.PaymentReview.ExpirationMonth,
													   'DataCSS' : parameters.DataCSS,
													   'WithData' : parameters.WithData,
													   'OfIndice' : parameters.OfIndice});
				this.validatePaymentReviewInformation({'Control' : Structures.PaymentReview.ExpirationYear,
													   'DataCSS' : parameters.DataCSS,
													   'WithData' : parameters.WithData,
													   'OfIndice' : parameters.OfIndice});
				this.validatePaymentReviewInformation({'Control' : Structures.PaymentReview.SecurityCode,
													   'DataCSS' : parameters.DataCSS,
													   'WithData' : parameters.WithData,
													   'OfIndice' : parameters.OfIndice});
				this.validatePaymentReviewInformation({'Control' : Structures.PaymentReview.HasMailingAddress,
													   'DataCSS' : parameters.DataCSS,
													   'WithData' : parameters.WithData,
													   'OfIndice' : parameters.OfIndice});
				this.validatePaymentReviewInformation({'Control' : Structures.PaymentReview.MailingStreet,
													   'DataCSS' : parameters.DataCSS,
													   'WithData' : parameters.WithData,
													   'OfIndice' : parameters.OfIndice});
				this.validatePaymentReviewInformation({'Control' : Structures.PaymentReview.MailingCity,
													   'DataCSS' : parameters.DataCSS,
													   'WithData' : parameters.WithData,
													   'OfIndice' : parameters.OfIndice});
				this.validatePaymentReviewInformation({'Control' : Structures.PaymentReview.MailingState,
													   'DataCSS' : parameters.DataCSS,
													   'WithData' : parameters.WithData,
													   'OfIndice' : parameters.OfIndice});
				this.validatePaymentReviewInformation({'Control' : Structures.PaymentReview.MailingZip,
													   'DataCSS' : parameters.DataCSS,
													   'WithData' : parameters.WithData,
													   'OfIndice' : parameters.OfIndice});
				this.validatePaymentReviewInformation({'Control' : Structures.PaymentReview.SaveForFuture,
													   'DataCSS' : parameters.DataCSS,
													   'WithData' : parameters.WithData,
													   'OfIndice' : parameters.OfIndice});
				this.validatePaymentReviewInformation({'Control' : Structures.PaymentReview.AgreeAuthorization,
													   'DataCSS' : parameters.DataCSS,
													   'WithData' : parameters.WithData,
													   'OfIndice' : parameters.OfIndice});
				this.validatePaymentReviewInformation({'Control' : Structures.PaymentReview.ReceiptDownload,
													   'DataCSS' : parameters.DataCSS,
													   'WithData' : parameters.WithData,
													   'OfIndice' : parameters.OfIndice});
				this.validatePaymentReviewInformation({'Control' : Structures.PaymentReview.ReceiptPostage,
													   'DataCSS' : parameters.DataCSS,
													   'WithData' : parameters.WithData,
													   'OfIndice' : parameters.OfIndice});
				this.validatePaymentReviewInformation({'Control' : Structures.PaymentReview.PlanSummary,
													   'DataCSS' : parameters.DataCSS,
													   'WithData' : parameters.WithData,
													   'OfIndice' : parameters.OfIndice});
				this.validatePaymentReviewInformation({'Control' : Structures.PaymentReview.Applicants,
													   'DataCSS' : parameters.DataCSS,
													   'WithData' : parameters.WithData,
													   'OfIndice' : parameters.OfIndice});
				this.validatePaymentReviewInformation({'Control' : Structures.PaymentReview.WhatIsThis,
													   'DataCSS' : parameters.DataCSS,
													   'WithData' : parameters.WithData,
													   'OfIndice' : parameters.OfIndice});
				this.validatePaymentReviewInformation({'Control' : Structures.PaymentReview.DisclosureForContract,
													   'DataCSS' : parameters.DataCSS,
													   'WithData' : parameters.WithData,
													   'OfIndice' : parameters.OfIndice});
				break;
		
			default:
				break;

		}
	},

	//--- Valid parameter names : Control, WithData, DataCSS, OfIndice
	validateReceiptInformation : function(parameters) {
		switch(parameters.Control) {
			case Structures.Receipt.ApplicantName:
				//--- Validate Receipt - Primary Applicant Name
				Commons.verify({'Message' : 'Validate Receipt - Primary Applicant Name: ' + parameters.DataCSS.Application.Applicants.Primary.Name.First,
								'Control' : Controls.cx.page.Receipt.Thanks.Name.input.label,
								'ControlType' : Structures.Locators.CSS,
								'QuestText' : parameters.DataCSS.Application.Applicants.Primary.Name.First});
				break;
				
			case Structures.Receipt.SubmissionDate:
				//--- Validate Receipt - Submission Date
				Commons.verify({'Message' : 'Validate Receipt - Submission Date:',
								'Control' : Controls.cx.page.Receipt.ApplicationReceipt.Summary.SubmissionDate.input.label,
								'ControlType' : Structures.Locators.CSS,
								'QuestText' : Commons.getDate({'Format' : Structures.DateFormats.MonthDDYYYY})});
				break;
				
			case Structures.Receipt.PlanPurchased:
				//--- Validate Receipt - Plan Purchased
				Commons.verify({'Message' : 'Validate Receipt - Plan Purchased: ' + parameters.DataCSS.Application.PlanPurchased,
								'Control' : Controls.cx.page.Receipt.ApplicationReceipt.Summary.PlanPurchased.input.label,
								'ControlType' : Structures.Locators.CSS,
								'QuestText' : parameters.DataCSS.Application.PlanPurchased});
				break;
				
			case Structures.Receipt.ConfirmationNumber:
				//--- Validate Receipt - Confirmation Number
				Commons.verify({'Message' : 'Validate Receipt - Confirmation Number: ',
								'Control' : Controls.cx.page.Receipt.ApplicationReceipt.Summary.ConfirmationNumber.label,
								'ControlType' : Structures.Locators.CSS,
								'Item' : Controls.cx.page.Receipt.ApplicationReceipt.Summary.ConfirmationNumber.input.label,
								'Indice' : parseInt(Controls.cx.page.Receipt.ApplicationReceipt.Summary.ConfirmationNumber.Indice),
								'IsNotEmpty' : true});
				break;
				
			case Structures.Receipt.EffectiveDate:
				//--- Validate Receipt - Effective Date
				Commons.verify({'Message' : 'Validate Receipt - Effective Date: ' +  parameters.DataCSS.Application.EffectiveDate,
								'Control' : Controls.cx.page.Receipt.ApplicationReceipt.Summary.EffectiveDate.label,
								'ControlType' : Structures.Locators.CSS,
								'Item' : Controls.cx.page.Receipt.ApplicationReceipt.Summary.EffectiveDate.input.label,
								'Indice' : parseInt(Controls.cx.page.Receipt.ApplicationReceipt.Summary.EffectiveDate.Indice),
								'Value' :  parameters.DataCSS.Application.EffectiveDate});
				break;
				
			case Structures.Receipt.TotalPaid:
				//--- Validate Receipt - Total Paid
				Commons.verify({'Message' : 'Validate Receipt - Total Paid: ' +  parameters.DataCSS.Application.TotalPaid,
								'Control' : Controls.cx.page.Receipt.ApplicationReceipt.Summary.TotalPaid.label,
								'ControlType' : Structures.Locators.CSS,
								'Item' : Controls.cx.page.Receipt.ApplicationReceipt.Summary.TotalPaid.input.label,
								'Indice' : parseInt(Controls.cx.page.Receipt.ApplicationReceipt.Summary.TotalPaid.Indice),
								'Value' :  parameters.DataCSS.Application.TotalPaid});
				break;
				
			case Structures.Receipt.PlanSummary:
				//--- Validate Receipt - Plan Summary Particulars Item
				Commons.verify({'Message' : 'Validate Receipt - Plan Summary Particulars Item: ' +  parameters.DataCSS.Application.PlanSummary.key,
								'Control' : Controls.cx.page.Receipt.ApplicationReceipt.PlanSummary.Details.input.rows,
								'ControlType' : Structures.Locators.CSS,
								'Item' : Controls.cx.page.Receipt.ApplicationReceipt.PlanSummary.Details.input.cells,
								'Indice' : OfIndice,
								'Value' :  parameters.DataCSS.Application.PlanSummary.key});
								
				//--- Validate Receipt - Plan Summary Particulars Value
				Commons.verify({'Message' : 'Validate Receipt - Plan Summary Particulars Value: ' +  parameters.DataCSS.Application.PlanSummary.key,
								'Control' : Controls.cx.page.Receipt.ApplicationReceipt.PlanSummary.Details.input.rows,
								'ControlType' : Structures.Locators.CSS,
								'Item' : Controls.cx.page.Receipt.ApplicationReceipt.PlanSummary.Details.input.value,
								'Indice' : OfIndice,
								'Value' :  parameters.DataCSS.Application.PlanSummary.value});
				break;
				
			case Structures.Receipt.Applicants:
				break;
				
			case Structures.Receipt.Primary:
				this.validateReceiptInformation({'Control' : Structures.Receipt.PrimaryName, 'DataCSS' : parameters.DataCSS});
				this.validateReceiptInformation({'Control' : Structures.Receipt.PrimaryFacility, 'DataCSS' : parameters.DataCSS});
				this.validateReceiptInformation({'Control' : Structures.Receipt.PrimaryFacilityStreet, 'DataCSS' : parameters.DataCSS});
				this.validateReceiptInformation({'Control' : Structures.Receipt.PrimaryFacilityCity, 'DataCSS' : parameters.DataCSS});
				this.validateReceiptInformation({'Control' : Structures.Receipt.PrimaryFacilityState, 'DataCSS' : parameters.DataCSS});
				this.validateReceiptInformation({'Control' : Structures.Receipt.PrimaryFacilityZip, 'DataCSS' : parameters.DataCSS});
				this.validateReceiptInformation({'Control' : Structures.Receipt.PrimaryFacilityPhone, 'DataCSS' : parameters.DataCSS});
				break;
				
			case Structures.Receipt.PrimaryName:
				//--- Validate Receipt - Receipt Primary Applicant Name
				Commons.verify({'Message' : 'Validate Receipt - Receipt Primary Applicant Name: ' + parameters.DataCSS.Application.Applicants.Primary.Name.First,
								'Control' : Controls.cx.page.Receipt.ApplicationReceipt.Applicants.Applicant.container,
								'ControlType' : Structures.Locators.CSS,
								'Item' : Controls.cx.page.Receipt.ApplicationReceipt.Applicants.Applicant.Name.input.label,
								'Indice' : parseInt(Controls.cx.page.Receipt.ApplicationReceipt.Applicants.Applicant.PrimaryIndice),
								'Value' :  parameters.DataCSS.Application.Applicants.Primary.Name.First});
				break;
				
			case Structures.Receipt.PrimaryFacility:
				//--- Validate Receipt - Receipt Primary Applicant Facility Name
				Commons.verify({'Message' : 'Validate Receipt - Receipt Primary Applicant Facility Name: ' + parameters.DataCSS.Application.Applicants.Primary.Facility.Organization,
								'Control' : Controls.cx.page.Receipt.ApplicationReceipt.Applicants.Applicant.container,
								'ControlType' : Structures.Locators.CSS,
								'Item' : Controls.cx.page.Receipt.ApplicationReceipt.Applicants.Applicant.SelectedFacility.Facility.input.label,
								'Indice' : parseInt(Controls.cx.page.Receipt.ApplicationReceipt.Applicants.Applicant.PrimaryIndice),
								'Value' :  parameters.DataCSS.Application.Applicants.Primary.Facility.Organization});
				break;
				
			case Structures.Receipt.PrimaryFacilityStreet:
				//--- Validate Receipt - Receipt Primary Applicant Facility Address (Street)
				Commons.verify({'Message' : 'Validate Receipt - Receipt Primary Applicant Facility Address (Street): ' + parameters.DataCSS.Application.Applicants.Primary.Facility.MailingAddress.Street,
								'Control' : Controls.cx.page.Receipt.ApplicationReceipt.Applicants.Applicant.container,
								'ControlType' : Structures.Locators.CSS,
								'Item' : Controls.cx.page.Receipt.ApplicationReceipt.Applicants.Primary.SelectedFacility.Facility.Address.Street.input.label,
								'Indice' : parseInt(Controls.cx.page.Receipt.ApplicationReceipt.Applicants.Applicant.PrimaryIndice),
								'Value' :  parameters.DataCSS.Application.Applicants.Primary.Facility.MailingAddress.Street});
				break;
				
			case Structures.Receipt.PrimaryFacilityCity:
				//--- Validate Receipt - Receipt Primary Applicant Facility Address (City)
				Commons.verify({'Message' : 'Validate Receipt - Receipt Primary Applicant Facility Address (City): ' + parameters.DataCSS.Application.Applicants.Primary.Facility.MailingAddress.City,
								'Control' : Controls.cx.page.Receipt.ApplicationReceipt.Applicants.Applicant.container,
								'ControlType' : Structures.Locators.CSS,
								'Item' : Controls.cx.page.Receipt.ApplicationReceipt.Applicants.Primary.SelectedFacility.Facility.Address.City.input.label,
								'Indice' : parseInt(Controls.cx.page.Receipt.ApplicationReceipt.Applicants.Applicant.PrimaryIndice),
								'Value' :  parameters.DataCSS.Application.Applicants.Primary.Facility.MailingAddress.City});				
				break;
				
			case Structures.Receipt.PrimaryFacilityState:
				//--- Validate Receipt - Receipt Primary Applicant Facility Address (State)
				Commons.verify({'Message' : 'Validate Receipt - Receipt Primary Applicant Facility Address (State): ' + parameters.DataCSS.Application.Applicants.Primary.Facility.MailingAddress.State,
								'Control' : Controls.cx.page.Receipt.ApplicationReceipt.Applicants.Primary.SelectedFacility.Facility.Address.State.input.label,
								'ControlType' : Structures.Locators.CSS,
								'Item' : Controls.cx.page.Receipt.ApplicationReceipt.Applicants.Primary.SelectedFacility.Facility.Address.City.input.label,
								'Indice' : parseInt(Controls.cx.page.Receipt.ApplicationReceipt.Applicants.Applicant.PrimaryIndice),
								'Value' :  parameters.DataCSS.Application.Applicants.Primary.Facility.MailingAddress.State});				
				break;
				
			case Structures.Receipt.PrimaryFacilityZip:
				//--- Validate Receipt - Receipt Primary Applicant Facility Address (ZipCode)
				Commons.verify({'Message' : 'Validate Receipt - Receipt Primary Applicant Facility Address (ZipCode): ' + parameters.DataCSS.Application.Applicants.Primary.Facility.MailingAddress.Zip,
								'Control' : Controls.cx.page.Receipt.ApplicationReceipt.Applicants.Primary.SelectedFacility.Facility.Address.ZipCode.input.label,
								'ControlType' : Structures.Locators.CSS,
								'Item' : Controls.cx.page.Receipt.ApplicationReceipt.Applicants.Primary.SelectedFacility.Facility.Address.City.input.label,
								'Indice' : parseInt(Controls.cx.page.Receipt.ApplicationReceipt.Applicants.Applicant.PrimaryIndice),
								'Value' :  parameters.DataCSS.Application.Applicants.Primary.Facility.MailingAddress.Zip});				
				break;
				
			case Structures.Receipt.PrimaryFacilityPhone:
				//--- Validate Receipt - Receipt Primary Applicant Facility Phone Number
				Commons.verify({'Message' : 'Validate Receipt - Receipt Primary Applicant Facility Phone Number: ' + parameters.DataCSS.Application.Applicants.Primary.Facility.Phone,
								'Control' : Controls.cx.page.Receipt.ApplicationReceipt.Applicants.Primary.SelectedFacility.Facility.Phone.input.label,
								'ControlType' : Structures.Locators.CSS,
								'Item' : Controls.cx.page.Receipt.ApplicationReceipt.Applicants.Primary.SelectedFacility.Facility.Address.City.input.label,
								'Indice' : parseInt(Controls.cx.page.Receipt.ApplicationReceipt.Applicants.Applicant.PrimaryIndice),
								'Value' :  parameters.DataCSS.Application.Applicants.Primary.Facility.Phone});				
				break;
				
			case Structures.Receipt.Dependents:
				this.validateReceiptInformation({'Control' : Structures.Receipt.DependentsName, 'DataCSS' : parameters.DataCSS, 'WithData' : parameters.WithData, 'OfIndice' : parameters.OfIndice});
				this.validateReceiptInformation({'Control' : Structures.Receipt.DependentsFacility, 'DataCSS' : parameters.DataCSS, 'WithData' : parameters.WithData, 'OfIndice' : parameters.OfIndice});
				this.validateReceiptInformation({'Control' : Structures.Receipt.DependentsFacilityStreet, 'DataCSS' : parameters.DataCSS, 'WithData' : parameters.WithData, 'OfIndice' : parameters.OfIndice});
				this.validateReceiptInformation({'Control' : Structures.Receipt.DependentsFacilityCity, 'DataCSS' : parameters.DataCSS, 'WithData' : parameters.WithData, 'OfIndice' : parameters.OfIndice});
				this.validateReceiptInformation({'Control' : Structures.Receipt.DependentsFacilityState, 'DataCSS' : parameters.DataCSS, 'WithData' : parameters.WithData, 'OfIndice' : parameters.OfIndice});
				this.validateReceiptInformation({'Control' : Structures.Receipt.DependentsFacilityZip, 'DataCSS' : parameters.DataCSS, 'WithData' : parameters.WithData, 'OfIndice' : parameters.OfIndice});
				this.validateReceiptInformation({'Control' : Structures.Receipt.DependentsFacilityPhone, 'DataCSS' : parameters.DataCSS, 'WithData' : parameters.WithData, 'OfIndice' : parameters.OfIndice});
				break;
			
			case Structures.Receipt.DependentsName:
				//--- Validate Receipt - Receipt Primary Applicant Dependent's Name
				Commons.verify({'Message' : "Validate Receipt - Receipt Primary Applicant Dependent's Name: " + parameters.DataCSS.Name.First,
								'Control' : Controls.cx.page.Receipt.ApplicationReceipt.Applicants.Applicant.container,
								'ControlType' : Structures.Locators.CSS,
								'Item' : Controls.cx.page.Receipt.ApplicationReceipt.Applicants.Applicant.Name.input.label,
								'Indice' : parameters.OfIndice,
								'Value' :  parameters.DataCSS.Name.First});
				break;
				
			case Structures.Receipt.DependentsFacility: 
				//--- Validate Receipt - Receipt Primary Applicant Dependent's Facility Name
				Commons.verify({'Message' : "Validate Receipt - Receipt Primary Applicant Dependent's Facility Name: " + parameters.DataCSS.Name.Facility.Organization,
								'Control' : Controls.cx.page.Receipt.ApplicationReceipt.Applicants.Applicant.container,
								'ControlType' : Structures.Locators.CSS,
								'Item' : Controls.cx.page.Receipt.ApplicationReceipt.Applicants.Applicant.SelectedFacility.Facility.Name.input.label,
								'Indice' : parameters.OfIndice,
								'Value' :  parameters.DataCSS.Name.Facility.Organization});
				break;
				
			case Structures.Receipt.DependentsFacilityStreet:
				//--- Validate Receipt - Receipt Primary Applicant Dependent's Facility Address (Street)
				Commons.verify({'Message' : "Validate Receipt - Receipt Primary Applicant Dependent's Facility Address (Street): " + parameters.DataCSS.Name.Facility.MailingAddress.Street,
								'Control' : Controls.cx.page.Receipt.ApplicationReceipt.Applicants.Applicant.container,
								'ControlType' : Structures.Locators.CSS,
								'Item' : Controls.cx.page.Receipt.ApplicationReceipt.Applicants.Applicant.SelectedFacility.Facility.Address.Street.input.label,
								'Indice' : parameters.OfIndice,
								'Value' :  parameters.DataCSS.Name.Facility.MailingAddress.Street});
				break;
				
			case Structures.Receipt.DependentsFacilityCity:
				//--- Validate Receipt - Receipt Primary Applicant Dependent's Facility Address (City)
				Commons.verify({'Message' : "Validate Receipt - Receipt Primary Applicant Dependent's Facility Address (City): " + parameters.DataCSS.Name.Facility.MailingAddress.City,
								'Control' : Controls.cx.page.Receipt.ApplicationReceipt.Applicants.Applicant.container,
								'ControlType' : Structures.Locators.CSS,
								'Item' : Controls.cx.page.Receipt.ApplicationReceipt.Applicants.Applicant.SelectedFacility.Facility.Address.City.input.label,
								'Indice' : parameters.OfIndice,
								'Value' :  parameters.DataCSS.Name.Facility.MailingAddress.City});
				break;
				
			case Structures.Receipt.DependentsFacilityState:
				//--- Validate Receipt - Receipt Primary Applicant Dependent's Facility Address (State)
				Commons.verify({'Message' : "Validate Receipt - Receipt Primary Applicant Dependent's Facility Address (State): " + parameters.DataCSS.Name.Facility.MailingAddress.State,
								'Control' : Controls.cx.page.Receipt.ApplicationReceipt.Applicants.Applicant.container,
								'ControlType' : Structures.Locators.CSS,
								'Item' : Controls.cx.page.Receipt.ApplicationReceipt.Applicants.Applicant.SelectedFacility.Facility.Address.State.input.label,
								'Indice' : parameters.OfIndice,
								'Value' :  parameters.DataCSS.Name.Facility.MailingAddress.State});
				break;
			
			case Structures.Receipt.DependentsFacilityZip:
				//--- Validate Receipt - Receipt Primary Applicant Dependent's Facility Address (ZipCode)
				Commons.verify({'Message' : "Validate Receipt - Receipt Primary Applicant Dependent's Facility Address (ZipCode): " + parameters.DataCSS.Name.Facility.MailingAddress.Zip,
								'Control' : Controls.cx.page.Receipt.ApplicationReceipt.Applicants.Applicant.container,
								'ControlType' : Structures.Locators.CSS,
								'Item' : Controls.cx.page.Receipt.ApplicationReceipt.Applicants.Applicant.SelectedFacility.Facility.Address.ZipCode.input.label,
								'Indice' : parameters.OfIndice,
								'Value' :  parameters.DataCSS.Name.Facility.MailingAddress.Zip});
				break;
				
			case Structures.Receipt.DependentsFacilityPhone:
				//--- Validate Receipt - Receipt Primary Applicant Dependent's Facility Address (ZipCode)
				Commons.verify({'Message' : "Validate Receipt - Receipt Primary Applicant Dependent's Facility Address (ZipCode): " + parameters.DataCSS.Name.Facility.Phone,
								'Control' : Controls.cx.page.Receipt.ApplicationReceipt.Applicants.Applicant.container,
								'ControlType' : Structures.Locators.CSS,
								'Item' : Controls.cx.page.Receipt.ApplicationReceipt.Applicants.Applicant.SelectedFacility.Facility.Phone.input.label,
								'Indice' : parameters.OfIndice,
								'Value' :  parameters.DataCSS.Name.Facility.Phone});
				break;
				
			case Structures.Receipt.ValidateAll:
				this.validateReceiptInformation({'Control' : Structures.Receipt.ApplicantName, 'DataCSS' : parameters.DataCSS, 'OfIndice' : parameters.OfIndice});
				this.validateReceiptInformation({'Control' : Structures.Receipt.SubmissionDate, 'DataCSS' : parameters.DataCSS, 'OfIndice' : parameters.OfIndice});
				this.validateReceiptInformation({'Control' : Structures.Receipt.PlanPurchased, 'DataCSS' : parameters.DataCSS, 'OfIndice' : parameters.OfIndice});
				this.validateReceiptInformation({'Control' : Structures.Receipt.ConfirmationNumber, 'DataCSS' : parameters.DataCSS, 'OfIndice' : parameters.OfIndice});
				this.validateReceiptInformation({'Control' : Structures.Receipt.EffectiveDate, 'DataCSS' : parameters.DataCSS, 'OfIndice' : parameters.OfIndice});
				this.validateReceiptInformation({'Control' : Structures.Receipt.TotalPaid, 'DataCSS' : parameters.DataCSS, 'OfIndice' : parameters.OfIndice});
				this.validateReceiptInformation({'Control' : Structures.Receipt.PlanSummary, 'DataCSS' : parameters.DataCSS, 'OfIndice' : parameters.OfIndice});
				this.validateReceiptInformation({'Control' : Structures.Receipt.Primary, 'DataCSS' : parameters.DataCSS, 'OfIndice' : parameters.OfIndice});
				this.validateReceiptInformation({'Control' : Structures.Receipt.Dependents, 'DataCSS' : parameters.DataCSS, 'WithData' : parameters.WithData, 'OfIndice' : parameters.OfIndice});
				break;
				
			default:
				break;
		}
	}
	
};
 
module.exports = cxGUILibraries;
