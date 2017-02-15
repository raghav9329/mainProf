// Author : Uday Thombre
// Email : uthombre@delta.org
//
// CX : Use Case Validation : Dependents Page

var CXLib = require('../framework/cx_gui_libraries.js');
var Controls = require('../framework/cx_gui.json');
var Data = require('../data/cx_data_dependents.json');

describe('CX Dependents Page Tests', function() {

	var applicant;
	var pageLoaded = false;
	var deltadentalplans;

	beforeEach(function() {
		if (!pageLoaded){
			CXLib.navigateToPage(CXLib.Navigation.DependentsPage);
			pageLoaded =  true;
		}
	});
	
 /* it('Dependents Page Display Validation - Verify data passed from the Delta Dental Plans is stored locally at the page at hidden fields', function() {	
		deltadentalplans = CXLib.planInformation();
		CXLib.validateDentalPlanInformation(CXLib.Enroll.ZipCode, deltadentalplans.DeltaDentalPlan.Applicant.ZipCode);
	}); */

	for (var index = 0; index < Data.cx.Dependents.length; index++)
	{
		(function (applicant) {
			
			//--- CX : PAGE : Dependents : Plan Summary : Validate for all summary elements.
			it('CX : PAGE : Dependents : Plan Summary : Validate for all summary elements.', function() {
				CXLib.validate({'Page': CXLib.Pages.Dependents, 
								'ValidateFor': CXLib.Validators.Summary,
								'Control' : CXLib.PlanSummary.ValidateAll,
								'DataCSS' : applicant.Plan});		
			});

			//--- Dependents Page Display Validation - The Dependent page should display Dependent field sections for the number of persons requested during the "Get a Quote" process minus one, (i.e. 3 persons covered = 1 Primary Enrollee plus 2 Dependents)
			it('Dependents Page Display Validation - The Dependent page should display Dependent field sections for the number of persons requested during the "Get a Quote" process minus one, (i.e. 3 persons covered = 1 Primary Enrollee plus 2 Dependents) for : ' + applicant.Name.First + ' .' + applicant.Name.Middle + '.' + applicant.Name.Last + '(' + applicant.Relationship + ').', function() {	
				CXLib.keyInDependentsFor(CXLib.Dependents.Add, applicant);
				CXLib.keyInDependentsFor(CXLib.Dependents.Relationship, applicant);
				CXLib.keyInDependentsFor(CXLib.Dependents.FirstName, applicant);
				CXLib.keyInDependentsFor(CXLib.Dependents.MiddleInitial, applicant);
				CXLib.keyInDependentsFor(CXLib.Dependents.LastName, applicant);
				CXLib.keyInDependentsFor(CXLib.Dependents.Gender, applicant);
				CXLib.keyInDependentsFor(CXLib.Dependents.DOBMonth, applicant);
				CXLib.keyInDependentsFor(CXLib.Dependents.DOBDate, applicant);
				CXLib.keyInDependentsFor(CXLib.Dependents.DOBYear, applicant);					
			});
			
		})(Data.cx.Dependents[index]);		  
	}
	
	//--- HCentive Recording : Validate customer entered data is recorded into HCentive by actions [Next] on Dependents page, [Back] on Facility/Purchase page (depending upon plan type) to return to Dependents page and validate the contents.
	it('HCentive Recording : Validate customer entered data is recorded into HCentive by actions [Next] on Dependents page, [Back] on Facility/Purchase page (depending upon plan type) to return to Dependents page and validate the contents. : ', function() {	
		//--- [Next] on Dependents page
		CXLib.keyInDependentsFor(CXLib.Dependents.Next);
		
		//--- [Back] on Facility/Purchase page (depending upon plan type)
		
		//--- Return to Dependents page and validate the contents 
		
	});
});
