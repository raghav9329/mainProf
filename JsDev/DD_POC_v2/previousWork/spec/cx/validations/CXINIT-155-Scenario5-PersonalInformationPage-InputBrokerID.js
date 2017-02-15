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
			*  CX : CXINIT-155 : Personal Information Page : Input Broker ID.
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
			*  CX : CXINIT-155 : Personal Information Page : SCENARIO 5 : Input Broker ID.
			*/
			it('CX : CXINIT-155 : Personal Information Page : SCENARIO 5 : Input Broker ID - Enter negative data.', function() {
				PersonalInformation.keyIn({'Control' : Structures.Profile.BrokerWorked, 'HasBroker' : true});
				PersonalInformation.keyIn({'Control' : Structures.Profile.BrokerNumber, 'BrokerNumber' : applicant.Broker.NegativeTest.Number, 'Clear' : true});
				
				PersonalInformation.validate({'ValidateFor' : Structures.Validators.Errors, 
											  'Control' : Structures.Profile.BrokerNumber,
											  'MessageLocation' : Structures.MessageLocations.Header});
			});

			it('CX : CXINIT-155 : Personal Information Page : SCENARIO 5 : Input Broker ID - Validate Error message should display (on page top).', function() {
				PersonalInformation.validate({'ValidateFor' : Structures.Validators.Errors, 
											  'Control' : Structures.Profile.BrokerNumber,
											  'MessageLocation' : Structures.MessageLocations.Header});
			});
			it('CX : CXINIT-155 : Personal Information Page : SCENARIO 5 : Input Broker ID - Validate Error message should display (below control).', function() {
				PersonalInformation.validate({'ValidateFor' : Structures.Validators.Information, 
											  'Control' : Structures.Profile.BrokerNumber,
											  'MessageLocation' : Structures.MessageLocations.Control});
			});
			
			it('CX : CXINIT-155 : Personal Information Page : SCENARIO 5 : Input Broker ID - Enter positive data.', function() {
				PersonalInformation.keyIn({'Control' : Structures.Profile.BrokerNumber, 'BrokerNumber' : applicant.Broker.Number, 'Clear' : true});
			});

			it('CX : CXINIT-155 : Personal Information Page : SCENARIO 5 : Input Broker ID - Validate brokername '+applicant.Broker.Name+' is displayed.', function() {
				PersonalInformation.validate({'ValidateFor' : Structures.Validators.Errors, 
											  'Control' : Structures.Profile.BrokerName,
											  'QuestText' : applicant.Broker.Name});
			});
			
			it('CX : CXINIT-155 : Personal Information Page : SCENARIO 5 : Input Broker ID - Fill out all remainder fields with valid input & Click Next.', function() {
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
				PersonalInformation.keyIn({'Control' : Structures.Profile.Next, 'DataCSS' : applicant});
			});
			
			it('CX : CXINIT-155 : Personal Information Page : SCENARIO 5 : Input Broker ID - Validate Dependents page is displayed w.r.t. the plan selected.', function() {
				Commons.validatePage({'Control' : Structures.Pages.Dependents,
									  'QuestText' : ''});
			});
			
			it('CX : CXINIT-155 : Personal Information Page : SCENARIO 5 : Input Broker ID - Validate Facilities page is displayed w.r.t. the plan selected.', function() {
				Commons.validatePage({'Control' : Structures.Pages.Facilities,
									  'QuestText' : ''});
			});
			
		})(Data.cx.UseCases[index]);
	}
	
});
