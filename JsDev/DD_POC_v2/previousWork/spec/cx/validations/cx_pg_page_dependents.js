// Author : Uday Thombre
// Email : uthombre@delta.org
//
// CX : Page Validation : Dependents Page

var CXLib = require('../framework/cx_gui_libraries.js');
var Controls = require('../framework/cx_gui.json');
var Data = require('../data/cx_data_dependents.json');

describe('CX : Page Validations : Dependents Page', function() {

	var applicant;
	var pageLoaded = false;
	var _dependents = Data.cx.ErrorValidation.Dependents;

	beforeEach(function() {
		if (!pageLoaded){
			CXLib.navigateToPage(CXLib.Navigation.DependentsPage);
			pageLoaded =  true;
		}
	});

	for (var index = 0; index < _dependents.length; index++)
	{
		(function (applicant) {
			if (applicant) {
				//--- CX : Page Validations : Dependents Page : Validate error messages for Relationship"
				it('CX : Page Validations : Dependents Page : Validate error messages for Relationship of Dependent('+applicant.Index+')', function() {	
					CXLib.keyInDependentsFor(CXLib.Dependents.Add, applicant);
					CXLib.keyInDependentsFor(CXLib.Dependents.Next);
					//--- Validate errors of Dependent's - Relationship
					CXLib.validate({'Page': CXLib.Pages.Dependents, 
									'ValidateFor': CXLib.Validators.Errors,
									'Control' : CXLib.Dependents.Relationship,
									'MessageLocation' : CXLib.MessageLocations.Header,
									'DataCSS' : applicant,
									'OfIndice' : index});
					
					CXLib.validate({'Page': CXLib.Pages.Dependents, 
									'ValidateFor': CXLib.Validators.Errors,
									'Control': CXLib.Dependents.Relationship,
									'MessageLocation' : CXLib.MessageLocations.Control,
									'DataCSS' : applicant,
									'OfIndice' : index});
				});	
					
				it('CX : Page Validations : Dependents Page : Validate error messages for First Name of Dependent('+applicant.Index+')', function() {	
					//--- Validate errors of Dependent's - First Name
					CXLib.validate({'Page': CXLib.Pages.Dependents, 
									'ValidateFor': CXLib.Validators.Errors,
									'Control' : CXLib.Dependents.FirstName,
									'MessageLocation' : CXLib.MessageLocations.Header,
									'DataCSS' : applicant,
									'OfIndice' : index});
					
					CXLib.validate({'Page': CXLib.Pages.Dependents, 
									'ValidateFor': CXLib.Validators.Errors,
									'Control': CXLib.Dependents.FirstName,
									'MessageLocation' : CXLib.MessageLocations.Control,
									'DataCSS' : applicant,
									'OfIndice' : index});
				});	
					
				it('CX : Page Validations : Dependents Page : Validate error messages for Middle Initial of Dependent('+applicant.Index+')', function() {	
					//--- Validate errors of Dependent's - Middle Initial
					CXLib.validate({'Page': CXLib.Pages.Dependents, 
									'ValidateFor': CXLib.Validators.Errors,
									'Control' : CXLib.Dependents.MiddleInitial,
									'MessageLocation' : CXLib.MessageLocations.Header,
									'DataCSS' : applicant,
									'OfIndice' : index});
					
					CXLib.validate({'Page': CXLib.Pages.Dependents, 
									'ValidateFor': CXLib.Validators.Errors,
									'Control': CXLib.Dependents.MiddleInitial,
									'MessageLocation' : CXLib.MessageLocations.Control,
									'DataCSS' : applicant,
									'OfIndice' : index});
				});	

				it('CX : Page Validations : Dependents Page : Validate error messages for Last Name of Dependent('+applicant.Index+')', function() {	
					//--- Validate errors of Dependent's - Last Name
					CXLib.validate({'Page': CXLib.Pages.Dependents, 
									'ValidateFor': CXLib.Validators.Errors,
									'Control' : CXLib.Dependents.LastName,
									'MessageLocation' : CXLib.MessageLocations.Header,
									'DataCSS' : applicant,
									'OfIndice' : index});
					
					CXLib.validate({'Page': CXLib.Pages.Dependents, 
									'ValidateFor': CXLib.Validators.Errors,
									'Control': CXLib.Dependents.LastName,
									'MessageLocation' : CXLib.MessageLocations.Control,
									'DataCSS' : applicant,
									'OfIndice' : index});
				});	

				it('CX : Page Validations : Dependents Page : Validate error messages for Gender of Dependent('+applicant.Index+')', function() {	
					//--- Validate errors of Dependent's - Gender
					CXLib.validate({'Page': CXLib.Pages.Dependents, 
									'ValidateFor': CXLib.Validators.Errors,
									'Control' : CXLib.Dependents.Gender,
									'MessageLocation' : CXLib.MessageLocations.Header,
									'DataCSS' : applicant,
									'OfIndice' : index});
					
					CXLib.validate({'Page': CXLib.Pages.Dependents, 
									'ValidateFor': CXLib.Validators.Errors,
									'Control': CXLib.Dependents.Gender,
									'MessageLocation' : CXLib.MessageLocations.Control,
									'DataCSS' : applicant,
									'OfIndice' : index});
				});	

				it('CX : Page Validations : Dependents Page : Validate error messages for Birthdate Month of Dependent('+applicant.Index+')', function() {	
					//--- Validate errors of Dependent's - Birthdate - Month
					CXLib.validate({'Page': CXLib.Pages.Dependents, 
									'ValidateFor': CXLib.Validators.Errors,
									'Control' : CXLib.Dependents.DOBMonth,
									'MessageLocation' : CXLib.MessageLocations.Header,
									'DataCSS' : applicant,
									'OfIndice' : index});
					
					CXLib.validate({'Page': CXLib.Pages.Dependents, 
									'ValidateFor': CXLib.Validators.Errors,
									'Control': CXLib.Dependents.DOBMonth,
									'MessageLocation' : CXLib.MessageLocations.Control,
									'DataCSS' : applicant,
									'OfIndice' : index});
				});	

				it('CX : Page Validations : Dependents Page : Validate error messages for Birthdate Day of Dependent('+applicant.Index+')', function() {	
					//--- Validate errors of Dependent's - Birthdate - Day
					CXLib.validate({'Page': CXLib.Pages.Dependents, 
									'ValidateFor': CXLib.Validators.Errors,
									'Control' : CXLib.Dependents.DOBDate,
									'MessageLocation' : CXLib.MessageLocations.Header,
									'DataCSS' : applicant,
									'OfIndice' : index});
					
					CXLib.validate({'Page': CXLib.Pages.Dependents, 
									'ValidateFor': CXLib.Validators.Errors,
									'Control': CXLib.Dependents.DOBDate,
									'MessageLocation' : CXLib.MessageLocations.Control,
									'DataCSS' : applicant,
									'OfIndice' : index});					
				});	

				it('CX : Page Validations : Dependents Page : Validate error messages for Birthdate Year of Dependent('+applicant.Index+')', function() {	
					//--- Validate errors of Dependent's - Birthdate - Year
					CXLib.validate({'Page': CXLib.Pages.Dependents, 
									'ValidateFor': CXLib.Validators.Errors,
									'Control' : CXLib.Dependents.DOBYear,
									'MessageLocation' : CXLib.MessageLocations.Header,
									'DataCSS' : applicant,
									'OfIndice' : index});
					
					CXLib.validate({'Page': CXLib.Pages.Dependents, 
									'ValidateFor': CXLib.Validators.Errors,
									'Control': CXLib.Dependents.DOBYear,
									'MessageLocation' : CXLib.MessageLocations.Control,
									'DataCSS' : applicant,
									'OfIndice' : index});					
				});	
			}	//--- END if (applicant)
		})(_dependents[index]);		  
	}
});
