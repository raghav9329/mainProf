//CX Automation Framework Libraries.
//--- Author : Uday Thombre (UThombre@delta.org)

var Controls = require('../cx_gui.json');
var Commons = require('../cx_commons.js');
var Structures = require('../cx_structures.js');
var Reporters = require('../cx_reporter.js');
var _map_plansummary = {};

var cxPgGUIFacilities = {
	
	/**
	 * Keyboard actions & Data entry on controls of Facilities page.
	 *
	 * @param {Structures.Facilities} Control to carry out action against.
	 * @param {String} Indice of the dependent record.
	 */
	keyIn : function(parameters) {
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
							   'ReplaceWith' : Indice,
							   'Button' : true});
				break;

			case Structures.Facilities.Less:
				Commons.keyIn({'Message' : 'ACTION LESS - Facilities Page',
							   'Control' : Controls.cx.page.Facilities.Facility.Details.Less.input.button,
							   'ControlType' : Structures.Locators.CSS,
							   'ReplaceIdentifier' : '',
							   'ReplaceWith' : Indice,
							   'Button' : true});
				break;

			case Structures.Facilities.Facility:
				//--- Select the location computed facility.
				Commons.keyIn({'Message' : 'Facilities Page : Select facility at location (' + Indice + ')',
							   'Control' : Controls.cx.page.Facilities.Facility.input.select,
							   'ControlType' : Structures.Locators.CSS,
							   'ReplaceIdentifier' : 'FACILITYID',
							   'ReplaceWith' : Indice,
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
	
	/**
	 * Validate components of Facility Page.
	 *
	 * @param {Structures.Validators} ValidateFor specify what component on the page is to be validated.
	 * @param {Structures.Facilities} Control is the object on the page to be validated.
	 * @param {Structures.MessageLocations} MessageLocation where the message/error displayed is to be validated.	 
	 * @param {string} WithData data that is to be validated.
	 * @param {json} DataCSS snippet of json that provides required information for processing.
	 * @param {String} Indice of the dependent record.
	 */
	validate : function(parameters) {
		if (parameters.ValidateFor == Structures.Validators.Caption) { this.validateCaptions({'Control' : parameters.Control}); }
		if (parameters.ValidateFor == Structures.Validators.Placeholder) { this.validatePlaceholders(parameters.Control); }
		if (parameters.ValidateFor == Structures.Validators.Errors) { this.validateErrors({'Control' : parameters.Control,
																						   'MessageLocation' : parameters.MessageLocation});
																	}
		if (parameters.ValidateFor == Structures.Validators.Information) { this.validateInformation({'Control' : parameters.Control, 
																								'QuestText' : parameters.WithData, 
																								'Indice' : parameters.Indice}); }
		if (parameters.ValidateFor == Structures.Validators.Summary) { Commons.validatePlanSummary({'Page': 'CX Facilities',
																									'Control' : parameters.Control,
																									'DataCSS' : parameters.DataCSS}); }
		if (parameters.ValidateFor == Structures.Validators.Contents) { this.validateInformation({'Control' : parameters.Control, 
																								'QuestText' : parameters.WithData}); }
	},
	
	/**
	 * Validate Captions for GUI objects on Facilities Page.
	 *
	 * @param {Structures.Facilities} Control to carry out action against.
	 */
	validateCaptions : function(parameters) {
		switch(parameters.Control) {			
			case Structures.Facilities.Search:
				//--- Validate Caption For - Facilities - Search
				Commons.verify({'Message' : 'Validate Caption For - Facilities - Search is : ' + Controls.cx.page.Facilities.Facility.Search.caption,
								'Control' : Controls.cx.page.Facilities.Facility.Search.label,
								'ControlType' : Structures.Locators.CSS,
								'QuestText' : Controls.cx.page.Facilities.Facility.Search.caption});
				break;

			case Structures.Facilities.Back:
				//--- Validate Caption For - Facilities - Back Button
				Commons.verify({'Message' : 'Validate Caption For - Facilities - Back Button is : ' + Controls.cx.page.Facilities.Action.Back.caption,
								'Control' : Controls.cx.page.Facilities.Action.Back.label,
								'ControlType' : Structures.Locators.CSS,
								'QuestText' : Controls.cx.page.Facilities.Action.Back.caption});
				break;

			case Structures.Facilities.Next:
				//--- Validate Caption For - Facilities - Next Button
				Commons.verify({'Message' : 'Validate Caption For - Facilities - Next Button is : ' + Controls.cx.page.Facilities.Action.Next.caption,
								'Control' : Controls.cx.page.Facilities.Action.Next.label,
								'ControlType' : Structures.Locators.CSS,
								'QuestText' : Controls.cx.page.Facilities.Action.Next.caption});
				break;

			case Structures.Facilities.MoreResults:
				//--- Validate Caption For - Facilities - MoreResults Button
				Commons.verify({'Message' : 'Validate Caption For - Facilities - MoreResults Button is : ' + Controls.cx.page.Facilities.Action.MoreResults.caption,
								'Control' : Controls.cx.page.Facilities.Action.MoreResults.label,
								'ControlType' : Structures.Locators.CSS,
								'QuestText' : Controls.cx.page.Facilities.Action.MoreResults.caption});
				break;

			case Structures.Facilities.More:
				break;

			case Structures.Facilities.Less:
				break;

			case Structures.Facilities.Facility:
				//--- Validate Caption For - Facilities - Facility
				Commons.verify({'Message' : 'Validate Caption For - Facilities - Facility is : ' + Controls.cx.page.Facilities.Information.Facility.Description.caption,
								'Control' : Controls.cx.page.Facilities.Information.Facility.Description.label,
								'ControlType' : Structures.Locators.CSS,
								'QuestText' : Controls.cx.page.Facilities.Information.Facility.Description.caption});
				break;

			case Structures.Facilities.Applicants:
				break;
				
			case Structures.Facilities.RecentlySelected:
				//--- Validate Caption For - Facilities - Recently Selected
				Commons.verify({'Message' : 'Validate Caption For - Recently Selected - Applicants is : ' + Controls.cx.page.Facilities.Facility.RecentlySelected.Facility.Name.caption,
								'Control' : Controls.cx.page.Facilities.Facility.RecentlySelected.Facility.Name.label,
								'ControlType' : Structures.Locators.CSS,
								'QuestText' : Controls.cx.page.Facilities.Facility.RecentlySelected.Facility.Name.caption});
				break;
				
			case Structures.Facilities.Enrollee:
				//--- Validate Caption For - Facilities - Applicants
				Commons.verify({'Message' : 'Validate Caption For - Facilities - Applicants is : ' + Controls.cx.page.Facilities.Information.Enrollee.Name.caption,
								'Control' : Controls.cx.page.Facilities.Information.Enrollee.Name.label,
								'ControlType' : Structures.Locators.CSS,
								'QuestText' : Controls.cx.page.Facilities.Information.Enrollee.Name.caption});
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
	
	/**
	 * Validate Placeholders for GUI objects on Facilities Page.
	 *
	 * @param {Structures.Facilities} Control to carry out action against to navigate to.
	 */
	validatePlaceholders : function(parameters) {
		switch(parameters.Control) {			
			case Structures.Facilities.Search:
				//--- Validate Placeholder - Facilities - Search
				Commons.verify({'Message' : 'Validate Placeholder - Facilities - Search is : ' + Controls.cx.page.Facilities.Facility.Search.input.defaults,
								'Control' : Controls.cx.page.Facilities.Facility.Search.input.textbox,
								'ControlType' : Structures.Locators.XPATH,
								'Attribute' : Controls.cx.page.Facilities.Facility.Search.attribute,
								'Value' : Controls.cx.page.Facilities.Facility.Search.input.defaults});
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
	
	/**
	 * Validate errors on Facilities Page.
	 *
	 * @param {Structures.Facilities} Control is the object on the page to be validated.
	 * @param {Structures.MessageLocations} MessageLocation where the message/error displayed is to be validated.
	 */
	validateErrors : function(parameters) {
		switch(parameters.Control) {			
			case Structures.Facilities.Search:
				var _control = '';
				var _location = '';
				if (parameters.MessageLocation == Structures.MessageLocations.Header) { _location = 'Page Top'; _control = Controls.cx.page.Facilities.Facility.Search.error.ontop; }
				if (parameters.MessageLocation == Structures.MessageLocations.Control) { _location = 'Below Control'; _control = Controls.cx.page.Facilities.Facility.Search.error.ontop.atcontrol; }
				//--- Validate Error Message At - Facilities - Search Zipcode
				Commons.verify({'Message' : 'Validate Error Message At - Facilities - Search Zipcode is : ' + Controls.cx.page.Facilities.Facility.Search.error.text,
								'Control' : _control,
								'ControlType' : Structures.Locators.XPATH,
								'QuestText' : Controls.cx.page.Facilities.Facility.Search.error.text});
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
										     'MessageLocation' : parameters.MessageLocation});
			break;
				
			default:
				break;
		}
		return true;
		
	},
	
	/**
	 * Validate errors on Facilities Page.
	 *
	 * @param {Structures.Facilities} Control is the object on the page to be validated.
	 * @param {String} QuestText control caption.	
	 */
	validateInformation : function(parameters) {
		switch(parameters.Control) {			
			case Structures.Facilities.Search:
				//--- Validate Caption For - Facilities - Search
				Commons.verify({'Message' : 'Validate Caption For - Facilities - Search is : ' + parameters.QuestText,
								'Control' : Controls.cx.page.Facilities.Facility.Search.label,
								'ControlType' : Structures.Locators.CSS,
								'QuestText' : parameters.QuestText});
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

			case Structures.Facilities.List:
				//--- Validate Number of - Facilities
				Commons.verify({'Message' : 'Validate Number of - Facilities is : ' + parameters.QuestText,
								'Control' : Controls.cx.page.Facilities.Information.List.input.container,
								'ControlType' : Structures.Locators.CSS,
								'Item' : Controls.cx.page.Facilities.Information.List.input.items,
								'Items' : parameters.QuestText});
				break;

				case Structures.Facilities.Facility:
				break;

			case Structures.Facilities.Applicants:
				break;
				
			case Structures.Facilities.RecentlySelected:
				//--- Validate Caption For - Facilities - Search
				Commons.verify({'Message' : 'Validate Caption For - Facilities - Search is : ' + parameters.QuestText,
								'Control' : Controls.cx.page.Facilities.Facility.Search.label,
								'ControlType' : Structures.Locators.CSS,
								'QuestText' : parameters.QuestText});
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
	
};
 
module.exports = cxPgGUIFacilities;
