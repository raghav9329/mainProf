// Author : Uday Thombre
// Email : uthombre@delta.org
//
// CX : Use Case Validation : Personal Information Page

var CXLib = require('../framework/cx_gui_libraries.js');
var Data = require('../data/CXINIT-155-Scenarios-PersonalInfo.json');
var Commons = require('../framework/cx_commons.js');
var Structures = require('../framework/cx_structures.js');
var PersonalInformation = require('../framework/pages/cx_pg_gui_personalinformation.js');
var Dependents = require('../framework/pages/cx_pg_gui_dependents.js');
var Facilities = require('../framework/pages/cx_pg_gui_facilities.js');

describe('CX : CXINIT-167 : Facilities Page - Delta Dental Plan', function() {

	var applicant;
	var pageLoaded = false;
	var is_checked = "No";

	beforeEach(function() {
		if (!pageLoaded){
			/*
			*  CX : CXINIT-167 : Facilities Page : SCENARIO 1 :  Get a Quote.
			*/
			if (browser.params.cx.link == Structures.Environments.DIT) {
				Commons.navigateCX({'Page' : Structures.Navigation.DITGetAQuote,
									'ZipCode' : Data.cx.SelectPlan.zip,
									'Applicants' : Data.cx.SelectPlan.applicants,
									'PlanIdentifier' : Data.cx.SelectPlan.planidentifier});
			}

			if (browser.params.cx.link == Structures.Environments.MOT) {
				Commons.navigateCX({'Page' : Structures.Navigation.MOTGetAQuote,
									'ZipCode' : Data.cx.SelectPlan.zip,
									'Applicants' : Data.cx.SelectPlan.applicants,
									'PlanIdentifier' : Data.cx.SelectPlan.planidentifier});
			}

			if (browser.params.cx.link == Structures.Environments.LOCAL) {
				Commons.navigateCX({'Page' : Structures.Navigation.PersonalInformationPage,
									'ZipCode' : Data.cx.SelectPlan.zip,
									'Applicants' : Data.cx.SelectPlan.applicants,
									'PlanIdentifier' : Data.cx.SelectPlan.planidentifier});
			}

			if (browser.params.cx.link == Structures.Environments.DEVRC) {
				Commons.navigateCX({'Page' : Structures.Navigation.PersonalInformationPage,
									'ZipCode' : Data.cx.SelectPlan.zip,
									'Applicants' : Data.cx.SelectPlan.applicants,
									'PlanIdentifier' : Data.cx.SelectPlan.planidentifier});
			}

			if (browser.params.cx.link == Structures.Environments.DELTADentalPlans) {
				Commons.navigateCX({'Page' : Structures.Navigation.DITGetAQuote,
									'ZipCode' : Data.cx.SelectPlan.zip,
									'Applicants' : Data.cx.SelectPlan.applicants,
									'PlanIdentifier' : Data.cx.SelectPlan.planidentifier});
			}
  
			pageLoaded =  true;
		}
		jasmine.DEFAULT_TIMEOUT_INTERVAL = 75000;
	});

	for (var index = 0; index < Data.cx.UseCases.length; index++ )
	{
		(function (applicant) {
			/*
			*  CX : CXINIT-167 : Facilities Page : SCENARIO 1 : STEP 0 Personal Information Page : Enter applicant details.
			*/
			it('CX : CXINIT-167 : Facilities Page : SCENARIO 1 : STEP 0 Personal Information Page : Enter applicant details.', function() {
				PersonalInformation.keyIn({'Control' : Structures.Profile.PrimaryName, 'DataCSS' : applicant});
				PersonalInformation.keyIn({'Control' : Structures.Profile.MiddleName, 'DataCSS' : applicant});
				PersonalInformation.keyIn({'Control' : Structures.Profile.LastName, 'DataCSS' : applicant});
				PersonalInformation.keyIn({'Control' : Structures.Profile.Gender, 'DataCSS' : applicant});
				PersonalInformation.keyIn({'Control' : Structures.Profile.DOBMonth, 'DataCSS' : applicant});
				PersonalInformation.keyIn({'Control' : Structures.Profile.DOBDate, 'DataCSS' : applicant});
				PersonalInformation.keyIn({'Control' : Structures.Profile.DOBYear, 'DataCSS' : applicant});
				PersonalInformation.keyIn({'Control' : Structures.Profile.SSNumber, 'DataCSS' : applicant});
				PersonalInformation.keyIn({'Control' : Structures.Profile.AlternateIdentifier, 'DataCSS' : applicant});
				PersonalInformation.keyIn({'Control' : Structures.Profile.PhoneType, 'DataCSS' : applicant});
				PersonalInformation.keyIn({'Control' : Structures.Profile.EmailAddress, 'DataCSS' : applicant});
				PersonalInformation.keyIn({'Control' : Structures.Profile.PhoneNumber, 'DataCSS' : applicant});
				PersonalInformation.keyIn({'Control' : Structures.Profile.GoPaperless, 'DataCSS' : applicant});
				PersonalInformation.keyIn({'Control' : Structures.Profile.ContactStreet, 'DataCSS' : applicant});
				PersonalInformation.keyIn({'Control' : Structures.Profile.ContactCity, 'DataCSS' : applicant});
								
				PersonalInformation.keyIn({'Control' : Structures.Profile.Next});
			});
			
			/*
			*  CX : CXINIT-167 : Facilities Page : SCENARIO 1 : STEP 1 2 Dependents Page : Add 3 dependents (can be any: child, spouse, etc – Fill all necessary info).
			*/
			for (var idependent = 0; idependent < applicant.Dependents.length; idependent++)
			{
				(function (dependent) {					
					it('CX : CXINIT-167 : Facilities Page : SCENARIO 1 : STEP 1 2 Dependents Page : Add 3 dependents.', function() {
						Dependents.validate({'Page': Structures.Pages.Dependents, 
										'ValidateFor': Structures.Validators.Caption,
										'Control' : Structures.PlanSummary.ValidateAll,
										'DataCSS' : dependent});
						Dependents.validate({'Page': Structures.Pages.Dependents, 
										'ValidateFor': Structures.Validators.Placeholder,
										'Control' : Structures.PlanSummary.ValidateAll,
										'DataCSS' : dependent});
						
						Dependents.keyIn({'Control' : Structures.Dependents.Relationship, 'DataCSS' : dependent});
						Dependents.keyIn({'Control' : Structures.Dependents.FirstName, 'DataCSS' : dependent});
						Dependents.keyIn({'Control' : Structures.Dependents.MiddleInitial, 'DataCSS' : dependent});
						Dependents.keyIn({'Control' : Structures.Dependents.LastName, 'DataCSS' : dependent});
						Dependents.keyIn({'Control' : Structures.Dependents.Gender, 'DataCSS' : dependent});
						Dependents.keyIn({'Control' : Structures.Dependents.DOBMonth, 'DataCSS' : dependent});
						Dependents.keyIn({'Control' : Structures.Dependents.DOBDate, 'DataCSS' : dependent});
						Dependents.keyIn({'Control' : Structures.Dependents.DOBYear, 'DataCSS' : dependent});		
						
					});
				})(applicant.Dependents[idependent]);		  
			}
			
			/*
			*  CX : CXINIT-167 : Facilities Page : SCENARIO 1 : STEP 3 4 5 Dependents Page : Click NEXT, Pop up should appear, Click Continue.
			*/
			it('CX : CXINIT-167 : Facilities Page : SCENARIO 1 : STEP 3 4 5 Dependents Page : Click NEXT, Pop up should appear, Click Continue.', function() {
				Dependents.keyIn({'Control' : Structures.Dependents.Next});
				Dependents.keyIn({'Control' : Structures.Dependents.OnAlertContinue});
			});
			
			/*
			* CX : CXINIT-167 : Facilities Page : SCENARIO 1 : STEP 3 4 5 Expectation Facilities Page : Validate that User should land on the facilities page.
			*/
			it('CX : CXINIT-167 : Facilities Page : SCENARIO 1 : STEP 3 4 5 Expectation Facilities Page : Validate that User should land on the facilities page.', function() {
				Commons.validatePage({'Control' : Structures.Pages.Facilities});
			});
			
			/*
			* CX : CXINIT-167 : Facilities Page : SCENARIO 1 : STEP 6 7 8 9 10 11 Facilities Page : Add facilities for applicant and 2 dependents.
			*/
			for (var ifacility = 0; ifacility < applicant.Facilities.Identifiers.length; ifacility++)
			{
				(function (facility) {
					
					if (ifacility > 3) {
						/*
						* CX : CXINIT-167 : Facilities Page : SCENARIO 1 : STEP 12 Facilities Page : User should NOT be able to see provider list for dependent 3.
						*/
						it('CX : CXINIT-167 : Facilities Page : SCENARIO 1 : STEP 12 Facilities Page : User should NOT be able to see provider list for dependent 3 - Selected a facility at location(' + ifacility + ')', function() {	
							//--- As per the CX Application structure as on November 30th 2016, at least 1 placeholder list item in hidden form will be existing on the page after 3 facilities are already selected.
							Facilities.validate({'ValidateFor' : Structures.Validators.Contents,
												 'Control' : Structures.Facilities.List,
												 'QuestText' : '1'});
						});
						
						/*
						* CX : CXINIT-167 : Facilities Page : SCENARIO 1 : STEP 13 14 Facilities Page : Select the third facility from recently selected list and Click Next.
						*/
						it('CX : CXINIT-167 : Facilities Page : SCENARIO 1 : STEP 13 14 Facilities Page : Select the third facility from recently selected list and Click Next.', function() {	
							Facilities.keyIn({'Control' : Structures.Facilities.Facility,
											  'DataCSS' : facility,
											  'Indice' : ifacility});
							Facilities.keyIn({'Control' : Structures.Facilities.Next});
						});		
					} else {
						it('CX : CXINIT-167 : Facilities Page : SCENARIO 1 : STEP 6 7 8 9 10 11 Facilities Page : Add facilities for applicant and 2 dependents - Select a facility at location(' + ifacility + ')', function() {	
							Facilities.keyIn({'Control' : Structures.Facilities.Facility,
											  'DataCSS' : facility,
											  'Indice' : ifacility});
							Facilities.keyIn({'Control' : Structures.Facilities.Next});
						});						
					}

				})(applicant.Facilities.Identifiers[ifacility]);		  
			}
			
			/*
			* CX : CXINIT-167 : Facilities Page : SCENARIO 1 : STEP 15 Expectation Payments Page : 	Payment page should appear.
			*/
			it('CX : CXINIT-167 : Facilities Page : SCENARIO 1 : STEP 15 Expectation Payments Page : Payment page should appear.', function() {
				Commons.validatePage({'Control' : Structures.Pages.Payment});
			});
			
			/*
			* CX : CXINIT-167 : Facilities Page : SCENARIO 1 : STEP 16 Payments Page : Click BACK on payment page.
			*/
			it('CX : CXINIT-167 : Facilities Page : SCENARIO 1 : STEP 16 Payments Page : Click BACK on payment page.', function() {
				//--- Facilities.keyIn({'Control' : Structures.Facilities.Next});
			});
						
		})(Data.cx.UseCases[index]);
	}
	
});
