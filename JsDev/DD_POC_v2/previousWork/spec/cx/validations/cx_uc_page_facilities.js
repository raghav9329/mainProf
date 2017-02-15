// Author : Uday Thombre
// Email : uthombre@delta.org
//
// CX : Use Case Validation : Facilities Page

var CXLib = require('../framework/cx_gui_libraries.js');
var Controls = require('../framework/cx_gui.json');
var Data = require('../data/cx_data_facilities.json');

describe('CX Facilities Page Tests', function() {

	var applicant;
	var pageLoaded = false;


	beforeEach(function() {
		if (!pageLoaded){
			CXLib.navigateToPage(CXLib.Navigation.FacilitiesPage);
			pageLoaded =  true;
		}
	});
	
	//--- CX : PAGE : Facilities : Plan Summary : Validate for all summary elements.
	it('CX : PAGE : Facilities : Plan Summary : Validate for all summary elements.', function() {
		CXLib.validate({'Page': CXLib.Pages.Facilities, 
						'ValidateFor': CXLib.Validators.Summary,
						'Control' : CXLib.PlanSummary.ValidateAll,
						'DataCSS' : Data.cx.Plan});		
	});

	//--- CX : Facility Page : Verify & validate Captions.
	it('CX : Facility Page : Verify & validate Captions', function() {	
		CXLib.validate({'Page' : CXLib.Pages.Facilities,
						'Control' : CXLib.Facilities.Search,
						'ValidateFor' : CXLib.Validators.Caption});
		CXLib.validate({'Page' : CXLib.Pages.Facilities,
						'Control' : CXLib.Facilities.Back,
						'ValidateFor' : CXLib.Validators.Caption});
		CXLib.validate({'Page' : CXLib.Pages.Facilities,
						'Control' : CXLib.Facilities.Next,
						'ValidateFor' : CXLib.Validators.Caption});
		CXLib.validate({'Page' : CXLib.Pages.Facilities,
						'Control' : CXLib.Facilities.MoreResults,
						'ValidateFor' : CXLib.Validators.Caption});
		CXLib.validate({'Page' : CXLib.Pages.Facilities,
						'Control' : CXLib.Facilities.Facility,
						'ValidateFor' : CXLib.Validators.Caption});
		CXLib.validate({'Page' : CXLib.Pages.Facilities,
						'Control' : CXLib.Facilities.Applicants,
						'ValidateFor' : CXLib.Validators.Caption});
		CXLib.validate({'Page' : CXLib.Pages.Facilities,
						'Control' : CXLib.Facilities.RecentlySelected,
						'ValidateFor' : CXLib.Validators.Caption});
	});

	//--- CX : Facility Page : Verify & validate Captions.
	it('CX : Facility Page : Verify & validate Placeholders', function() {	
		CXLib.validate({'Page' : CXLib.Pages.Facilities,
						'Control' : CXLib.Facilities.Search,
						'ValidateFor' : CXLib.Validators.Placeholder});
	});

	for (var index = 0; index < Data.cx.Facilities.Identifiers.length; index++)
	{
		(function (facility) {
			
			//--- CX : Facility Page : Verify & validate Captions.
			it('CX : Facility Page : Verify & validate Captions, Placeholders & Information', function() {	
				CXLib.validate({'Page' : CXLib.Pages.Facilities,
								'Control' : CXLib.Facilities.More,
								'ValidateFor' : CXLib.Validators.Caption,
								'OfIndice' : index});
				CXLib.validate({'Page' : CXLib.Pages.Facilities,
								'Control' : CXLib.Facilities.Less,
								'ValidateFor' : CXLib.Validators.Caption,
								'OfIndice' : index});
			});

			//--- CX : Facility Page : Select a facility.
			it('CX : Facility Page : Select a facility at location(' + index + ')', function() {	
				CXLib.keyInFacilitiesFor(CXLib.Facilities.Facility, facility, index);
				CXLib.keyInFacilitiesFor(CXLib.Facilities.Next);
			});
			
		})(Data.cx.Facilities.Identifiers[index]);		  
	}

});
