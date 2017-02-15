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
			*  CX : CXINIT-155 : Personal Information Page : SCENARIO 1 : Zip Code Change – Go Back.
			*/
			it('CX : CXINIT-155 : Personal Information Page : SCENARIO 1 : Zip Code Change (Go Back).', function() {
				PersonalInformation.keyIn({'Control' : Structures.Profile.ContactStreet, 'DataCSS' : applicant.ZipCodeChange.GoBack});
				PersonalInformation.keyIn({'Control' : Structures.Profile.ContactCity, 'DataCSS' : applicant.ZipCodeChange.GoBack});
				PersonalInformation.keyIn({'Control' : Structures.Profile.ContactZip, 'DataCSS' : applicant.ZipCodeChange.GoBack});
			});
			
			it('CX : CXINIT-155 : Personal Information Page : SCENARIO 1 : Zipcode Changed (Go Back) - Verify Alert Dialog Box displayed - Go Back.', function() {
				//--- Mimick lost focus by entering blank value into PrimaryName field
				PersonalInformation.keyIn({'Control' : Structures.Profile.PrimaryName, 'DataCSS' : applicant});			
				PersonalInformation.keyIn({'Control' : Structures.Profile.ContactZipAlertGoBack, 'DataCSS' : applicant.ZipCodeChange.GoBack});
				PersonalInformation.validate({'ValidateFor' : Structures.Validators.Information, 'WithData' : Data.cx.SelectPlan.zip});
			});

			it('CX : CXINIT-155 : Personal Information Page : SCENARIO 1 : Zipcode Changed (Go Back) - Expect Alert Dialog disappears - Service Address Street is cleared.', function() {
				PersonalInformation.validate({'ValidateFor' : Structures.Validators.Information, 
											  'Control' : Structures.Profile.ContactStreet,
											  'WithData' : applicant.ZipCodeChange.GoBack.Contact.Street});
			});

			it('CX : CXINIT-155 : Personal Information Page : SCENARIO 1 : Zipcode Changed (Go Back) - Expect Alert Dialog disappears - Service Address City is cleared.', function() {
				PersonalInformation.validate({'ValidateFor' : Structures.Validators.Information, 
											  'Control' : Structures.Profile.ContactCity,
											  'WithData' : applicant.ZipCodeChange.GoBack.Contact.City});
			});

			it('CX : CXINIT-155 : Personal Information Page : SCENARIO 1 : Zipcode Changed (Go Back) - Expect Alert Dialog disappears - Service Address State is initialized to the Get Quote based Zipcode State.', function() {
				PersonalInformation.validate({'ValidateFor' : Structures.Validators.Information, 
											  'Control' : Structures.Profile.ContactState,
											  'WithData' : Data.cx.SelectPlan.state});
			});

			it('CX : CXINIT-155 : Personal Information Page : SCENARIO 1 : Zipcode Changed (Go Back) - Expect Alert Dialog disappears - Service Address Zipcode is initialized to the Get Quote based Zipcode.', function() {
				PersonalInformation.validate({'ValidateFor' : Structures.Validators.Information, 
											  'Control' : Structures.Profile.ContactZip,
											  'WithData' : Data.cx.SelectPlan.zip});
			});
						
		})(Data.cx.UseCases[index]);
	}
	
});
