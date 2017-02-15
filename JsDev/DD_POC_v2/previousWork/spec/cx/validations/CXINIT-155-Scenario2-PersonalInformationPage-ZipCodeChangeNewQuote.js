// Author : Uday Thombre
// Email : uthombre@delta.org
//
// CX : Use Case Validation : Personal Information Page

var CXLib = require('../framework/cx_gui_libraries.js');
var Data = require('../data/CXINIT-155-Scenarios-PersonalInfo.json');
var Commons = require('../framework/cx_commons.js');
var PersonalInformation = require('../framework/pages/cx_pg_gui_personalinformation.js');
var Structures = require('../framework/cx_structures.js');

describe('CX : CXINIT-155 : Personal Information Page - Delta Dental Plan', function() {

	var applicant;
	var pageLoaded = false;
	var is_checked = "No";

	beforeEach(function() {
		if (!pageLoaded){
			/*
			*  CX : CXINIT-155 : Personal Information Page : Get a Quote.
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
			*  CX : CXINIT-155 : Personal Information Page : SCENARIO 2 : Zip Code Change – New Quote.
			*/
			it('CX : CXINIT-155 : Personal Information Page : SCENARIO 2 : Zip Code Change (New Quote).', function() {
				PersonalInformation.keyIn({'Control' : Structures.Profile.ContactStreet, 'DataCSS' : applicant.ZipCodeChange.NewQuote});
				PersonalInformation.keyIn({'Control' : Structures.Profile.ContactZip, 'DataCSS' : applicant.ZipCodeChange.NewQuote});
				PersonalInformation.keyIn({'Control' : Structures.Profile.PrimaryName, 'DataCSS' : applicant});
			});

			it('CX : CXINIT-155 : Personal Information Page : SCENARIO 2 : Zip Code Change (New Quote) - Verify Alert Dialog Box displayed - New Quote.', function() {
				PersonalInformation.keyIn({'Control' : Structures.Profile.ContactZipAlertNewQuote, 'DataCSS' : applicant.ZipCodeChange.NewQuote});
			});
			
			it('CX : CXINIT-155 : Personal Information Page : SCENARIO 2 : Zip Code Change (New Quote) - Verify User should land on the HCentive plans page.', function() {											  
				Commons.validatePage({'Control' : Structures.Pages.HCentivePlans,
									  'QuestText' : Data.cx.DeltaDentalPlanPage});
			});
			
		})(Data.cx.UseCases[index]);
	}
	
});
