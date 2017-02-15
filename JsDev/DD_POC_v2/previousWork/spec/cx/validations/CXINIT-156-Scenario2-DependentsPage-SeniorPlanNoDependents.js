// Author : Uday Thombre
// Email : uthombre@delta.org
//
// CX : Use Case Validation : Personal Information Page

var CXLib = require('../framework/cx_gui_libraries.js');
var Data = require('../data/CXINIT-156-Scenarios-Dependents.json');
var Commons = require('../framework/cx_commons.js');
var Reporters = require('../framework/cx_reporter.js');
var Structures = require('../framework/cx_structures.js');
var PersonalInformation = require('../framework/pages/cx_pg_gui_personalinformation.js');
var Dependents = require('../framework/pages/cx_pg_gui_dependents.js');

describe('CX : CXINIT-156 : Dependents Page : SCENARIO 1', function() {

	var applicant;
	var pageLoaded = false;
	var is_checked = "No";

	beforeEach(function() {
		if (!pageLoaded){
			/*
			*  CX : CXINIT-156 : Dependents Page : Scenario 1 : STEP 1 2 3 : Get a quote for 94105, Select a Senior Plan & Click on Enroll.
			*/
			if (browser.params.cx.link == Structures.Environments.DIT) {
				CXLib.navigateToPage({'Page' : Structures.Navigation.DITGetAQuote,
									  'DataCSS' : Data.cx.SelectPlan,
									  'Applicants' : '1',
									  'PlanIdentifier' : Data.cx.SelectPlan.planidentifers.senior});
			}

			if (browser.params.cx.link == Structures.Environments.MOT) {
				CXLib.navigateToPage({'Page' : Structures.Navigation.MOTGetAQuote,
									  'DataCSS' : Data.cx.SelectPlan,
									  'Applicants' : '1',
									  'PlanIdentifier' : Data.cx.SelectPlan.planidentifers.senior});
			}

			if (browser.params.cx.link == Structures.Environments.LOCAL) {
				CXLib.navigateToPage({'Page' : Structures.Navigation.PersonalInformationPage,
									  'DataCSS' : Data.cx.SelectPlan,
									  'Applicants' : '1',
									  'PlanIdentifier' : Data.cx.SelectPlan.planidentifers.senior});
			}

			if (browser.params.cx.link == Structures.Environments.DEVRC) {
				CXLib.navigateToPage({'Page' : Structures.Navigation.PersonalInformationPage,
									  'DataCSS' : Data.cx.SelectPlan,
									  'Applicants' : '1',
									  'PlanIdentifier' : Data.cx.SelectPlan.planidentifers.senior});
			}

			if (browser.params.cx.link == Structures.Environments.DELTADentalPlans) {
				CXLib.navigateToPage({'Page' : Structures.Navigation.DITGetAQuote,
									  'DataCSS' : Data.cx.SelectPlan,
									  'Applicants' : '1',
									  'PlanIdentifier' : Data.cx.SelectPlan.planidentifers.senior});
			}
  
			pageLoaded =  true;
		}
		jasmine.DEFAULT_TIMEOUT_INTERVAL = 75000;
	});

	Reporters.log({'Message' :  'Data.cx.UseCases.length = ' + Data.cx.UseCases.length, 'Location' : Structures.ReportLocations.Console});
	
	for (var index = 0; index < Data.cx.UseCases.length; index++ )
	{
		(function (applicant) {
			
			/*
			*  CX : CXINIT-156 : Dependents Page : SCENARIO 1 : Step 4 : Enter all necessary info on personal info page.
			*/
			it('CX : CXINIT-156 : Dependents Page : SCENARIO 1 : Step 4 : Enter all necessary info on personal info page.', function() {
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
			* CX : CXINIT-156 : Dependents Page : SCENARIO 1 : Step 5 Expectation : User should land on the facilities page
			*/
			it('CX : CXINIT-156 : Dependents Page : SCENARIO 1 : Step 5 Expectation : User should land on the facilities page.', function() {
				Commons.validatePage({'Control' : Structures.Pages.Facilities});
			});
			
		})(Data.cx.UseCases[index]);
	}
	
});
