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
			*  CX : CXINIT-156 : Dependents Page : STEP 1 : Get a quote for 3 applicants 94105.
			*/
			if (browser.params.cx.link == Structures.Environments.DIT) {
				CXLib.navigateToPage({'Page' : Structures.Navigation.DITGetAQuote,
									  'DataCSS' : Data.cx.SelectPlan});
			}

			if (browser.params.cx.link == Structures.Environments.MOT) {
				CXLib.navigateToPage({'Page' : Structures.Navigation.MOTGetAQuote,
									  'DataCSS' : Data.cx.SelectPlan});
			}

			if (browser.params.cx.link == Structures.Environments.LOCAL) {
				CXLib.navigateToPage({'Page' : Structures.Navigation.PersonalInformationPage,
									  'DataCSS' : Data.cx.SelectPlan});
			}

			if (browser.params.cx.link == Structures.Environments.DEVRC) {
				CXLib.navigateToPage({'Page' : Structures.Navigation.PersonalInformationPage,
									  'DataCSS' : Data.cx.SelectPlan});
			}

			if (browser.params.cx.link == Structures.Environments.DELTADentalPlans) {
				CXLib.navigateToPage({'Page' : Structures.Navigation.DITGetAQuote,
									  'DataCSS' : Data.cx.SelectPlan});
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
			*  CX : CXINIT-156 : Dependents Page : SCENARIO 1 : Steps 1 2 : Select a NON Senior plan and Go to the dependents page.
			*/
			it('CX : CXINIT-156 : Dependents Page : SCENARIO 1 : Step 1 and 2 : Select a NON Senior plan and Go to the dependents page.', function() {
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
			
			for (var idependent = 0; idependent < applicant.Dependents.length; idependent++)
			{
				(function(dependent) { 
					it('CX : CXINIT-156 : Dependents Page : SCENARIO 1 : Step 3 : User should see two set of dependents information fields pre populated.', function() {
						Dependents.validate({'ValidateFor': Structures.Validators.Caption,
											'Control' : Structures.PlanSummary.ValidateAll,
											'DataCSS' : dependent});
						Dependents.validate({'ValidateFor': Structures.Validators.Placeholder,
											'Control' : Structures.PlanSummary.ValidateAll,
											'DataCSS' : dependent});
					});	
					
					it('CX : CXINIT-156 : Dependents Page : SCENARIO 1 : Steps 4 5 : Delete both dependents fields and Click NEXT.', function() {
						Dependents.keyIn({'Control' : CXLib.Dependents.Delete});
						Dependents.keyIn({'Control' : CXLib.Dependents.Next});
					});	

					it('CX : CXINIT-156 : Dependents Page : SCENARIO 1 : Steps 6 7 : POP up should appear with new premium amount and Click Go Back.', function() {
						Dependents.validate({'ValidateFor': Structures.Validators.Contents,
											'Control' : Structures.Dependents.NewPremium,
											'QuestText' : applicant.Plan.Summary.Premium});
						Dependents.keyIn({'Control' : CXLib.Dependents.OnAlertBack});
					});	

					it('CX : CXINIT-156 : Dependents Page : SCENARIO 1 : Steps 8 9 10 : Click NEXT and POP up should appear with new premium amount and Click CONTINUE.', function() {
						Dependents.keyIn({'Control' : CXLib.Dependents.Next});
						Dependents.validate({'ValidateFor': Structures.Validators.Contents,
											'Control' : Structures.Dependents.NewPremium,
											'QuestText' : applicant.Plan.Summary.Premium});
						Dependents.keyIn({'Control' : CXLib.Dependents.OnAlertContinue});
					});	

					it('CX : CXINIT-156 : Dependents Page : SCENARIO 1 : Steps 11 : Application should update premium price in the headers and in the right purple box (desktop view).', function() {
						Dependents.validate({'ValidateFor': Structures.Validators.Summary,
											'Control' : Structures.PlanSummary.Premium,
											'QuestText' : applicant.Plan.Summary.Premium});
					});	
					
				})(applicant.Dependents[idependent]);				
			}				
			
		})(Data.cx.UseCases[index]);
	}
	
});
