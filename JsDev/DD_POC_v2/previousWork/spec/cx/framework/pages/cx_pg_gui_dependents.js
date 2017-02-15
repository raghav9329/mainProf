//CX Automation Framework Libraries.
//--- Author : Uday Thombre (UThombre@delta.org)

var Controls = require('../cx_gui.json');
var Commons = require('../cx_commons.js');
var Structures = require('../cx_structures.js');
var Reporters = require('../cx_reporter.js');
var _map_plansummary = {};

var cxPgGUIDependents = {

	/**
	 * Keyboard actions & Data entry on controls of Dependents page.
	 *
	 * @param {Structures.Dependents} Control to carry out action against.
	 * @param {json} DataCSS snippet of json that provides required information for processing.
	 * @param {String} PrimaryName First Name of the applicant.
	 * @param {String} MiddleInitials of the dependent.
	 * @param {String} LastName of the dependent.
	 * @param {String} Gender of the dependent.
	 * @param {String} BirthdayMonth of the dependent.
	 * @param {String} BirthdayDate of the dependent.
	 * @param {String} BirthdayYear of the dependent.
	 * @param {String} Relationship of the dependent.
	 * @param {String} Indice of the dependent record.
	 */
	keyIn : function(parameters) {
		
		var _this_indice = (parameters.Indice) ? parameters.Indice : parameters.DataCSS.Index;
		
		switch(parameters.Control) {
			
			case Structures.Dependents.Back:
				Commons.keyIn({'Message' : 'ACTION BACK - Dependents Page',
							   'Control' : Controls.cx.page.Dependents.Action.Back.input.button,
							   'ControlType' : Structures.Locators.CSS,
							   'Button' :  true});
				break;
			
			case Structures.Dependents.Next:
				Commons.keyIn({'Message' : 'ACTION NEXT - Dependents Page',
							   'Control' : Controls.cx.page.Dependents.Action.Next.input.button,
							   'ControlType' : Structures.Locators.CSS,
							   'Button' : true});
				break;
			
			case Structures.Dependents.Add:
				Commons.keyIn({'Message' : 'ACTION ADD - Dependents Page for dependent # :' + _this_indice,
							   'Control' : Controls.cx.page.Dependents.Action.Add.input.button,
							   'ControlType' : Structures.Locators.CSS,
							   'Button' : true});
				break;

			case Structures.Dependents.Delete:							   
				Commons.keyIn({'Message' : 'ACTION ADD - Dependents Page for dependent # :' + _this_indice,
							   'Control' : Controls.cx.page.Dependents.Action.Delete.input.xpath.button,
							   'ControlType' : Structures.Locators.XPATH,
							   'ReplaceIdentifier' : 'DEPEND',
							   'ReplaceWith' : _this_indice,
							   'Button' : true});
				break;

			case this.OnAlertBack:
				Commons.keyIn({'Message' : 'ACTION ON ALERT GO BACK - Dependents Page',
							   'Control' : Controls.cx.page.Dependents.Form.PremiumChange.Action.Back.input.button,
							   'ControlType' : Structures.Locators.CSS,
							   'Button' : true});
				break;

			case this.OnAlertContinue: 
				Commons.keyIn({'Message' : 'ACTION ON ALERT CONTINUE - Dependents Page',
							   'Control' : Controls.cx.page.Dependents.Form.PremiumChange.Action.Continue.input.button,
							   'ExceptionalWaitTime' : true,
							   'ControlType' : Structures.Locators.CSS,
							   'Button' : true});
				break;
		
			case Structures.Dependents.Relationship: 
				//--- Select Dependent's Relationship
				var xpathRelationship = "";
				var _this_relationship = (parameters.Relationship) ? parameters.Relationship : parameters.DataCSS.Relationship;
				if (_this_relationship === 'Select Relation') {
					xpathRelationship = Controls.cx.page.Dependents.Individual.Relationship.input.xpath.items.SelectRelation
				}
				if (_this_relationship === 'Spouse') {
					xpathRelationship = Controls.cx.page.Dependents.Individual.Relationship.input.xpath.items.Spouse
				}
				if (_this_relationship === 'Domestic Partner') {
					xpathRelationship = Controls.cx.page.Dependents.Individual.Relationship.input.xpath.items.DomesticPartner
				}
				if (_this_relationship === 'Child') {
					xpathRelationship = Controls.cx.page.Dependents.Individual.Relationship.input.xpath.items.Child
				}
				Commons.keyIn({'Message' : 'Select Dependent Relationship for dependent # : ' + _this_indice,
							   'Control' : Controls.cx.page.Dependents.Individual.Relationship.input.xpath.selector + xpathRelationship,
							   'ControlType' : Structures.Locators.XPATH,
							   'ReplaceIdentifier' : 'DEPEND',
							   'ReplaceWith' : _this_indice,
							   'ListItem' : _this_relationship});
				break;

			case Structures.Dependents.FirstName:
				//--- Enter Dependent First Name
				Commons.keyIn({'Message' : 'Enter Dependent First Name for dependent # : ' + _this_indice,
							   'Control' : Controls.cx.page.Dependents.Individual.Name.First.input.xpath.textbox,
							   'ControlType' : Structures.Locators.XPATH,
							   'ReplaceIdentifier' : 'DEPEND',
							   'ReplaceWith' : _this_indice,
							   'Text' : (parameters.PrimaryName) ? parameters.PrimaryName : parameters.DataCSS.Name.First});
				break;

			case Structures.Dependents.MiddleInitial:
				//--- Enter Dependent Middle Initial
				Commons.keyIn({'Message' : 'Enter Dependent Middle Initial for dependent # : ' + _this_indice,
							   'Control' : Controls.cx.page.Dependents.Individual.Name.Middle.input.xpath.textbox,
							   'ControlType' : Structures.Locators.XPATH,
							   'ReplaceIdentifier' : 'DEPEND',
							   'ReplaceWith' : _this_indice,
							   'Text' : (parameters.MiddleInitials) ? parameters.MiddleInitials : parameters.DataCSS.Name.Middle});
				break;

			case Structures.Dependents.LastName:
				//--- Enter Dependent Last Name
				Commons.keyIn({'Message' : 'Enter Dependent Last Name for dependent # : ' + _this_indice,
							   'Control' : Controls.cx.page.Dependents.Individual.Name.Last.input.xpath.textbox,
							   'ControlType' : Structures.Locators.XPATH,
							   'ReplaceIdentifier' : 'DEPEND',
							   'ReplaceWith' : _this_indice,
							   'Text' : (parameters.LastName) ? parameters.LastName : parameters.DataCSS.Name.Last});
				break;

			case Structures.Dependents.Gender:
				//--- Select Dependent's Gender
				var xpathGender = "";
				var _this_Gender = (parameters.Gender) ? parameters.Gender : parameters.DataCSS.Gender;
				if (_this_Gender === 'Select Gender') {
					xpathGender = Controls.cx.page.Dependents.Individual.Gender.input.xpath.items.SelectGender
				}
				if (_this_Gender === 'Female') {
					xpathGender = Controls.cx.page.Dependents.Individual.Gender.input.xpath.items.Female
				}
				if (_this_Gender === 'Male') {
					xpathGender = Controls.cx.page.Dependents.Individual.Gender.input.xpath.items.Male
				}
				if (_this_Gender === 'Non binary') {
					xpathGender = Controls.cx.page.Dependents.Individual.Gender.input.xpath.items.NonBinary
				}
				if (_this_Gender === 'Prefer not to say') {
					xpathGender = Controls.cx.page.Dependents.Individual.Gender.input.xpath.items.PreferNotToSay
				}
				Commons.keyIn({'Message' : 'Select Dependent Gender for dependent # : ' + _this_indice,
							   'Control' : Controls.cx.page.Dependents.Individual.Gender.input.xpath.selector + xpathGender,
							   'ControlType' : Structures.Locators.XPATH,
							   'ReplaceIdentifier' : 'DEPEND',
							   'ReplaceWith' : _this_indice,
							   'ListItem' : _this_Gender});
				break;

			case Structures.Dependents.DOBMonth:
				//--- Enter Dependent's Birthdate - Month
				Commons.keyIn({'Message' : 'Enter Dependent Birthdate - Month for dependent # : ' + _this_indice,
							   'Control' : Controls.cx.page.Dependents.Individual.DOB.input.Month.xpath.textbox,
							   'ControlType' : Structures.Locators.XPATH,
							   'ReplaceIdentifier' : 'DEPEND',
							   'ReplaceWith' : _this_indice,
							   'Text' : (parameters.BirthdayMonth) ? parameters.BirthdayMonth : parameters.DataCSS.DOB.Month});
				break;

			case Structures.Dependents.DOBDate:
				//--- Enter Dependent's Birthdate - Day
				Commons.keyIn({'Message' : 'Enter Dependent Birthdate - Day for dependent # : ' + _this_indice,
							   'Control' : Controls.cx.page.Dependents.Individual.DOB.input.Day.xpath.textbox,
							   'ControlType' : Structures.Locators.XPATH,
							   'ReplaceIdentifier' : 'DEPEND',
							   'ReplaceWith' : _this_indice,
							   'Text' : (parameters.BirthdayDate) ? parameters.BirthdayDate : parameters.DataCSS.DOB.Day});
				break;

			case Structures.Dependents.DOBYear:
				//--- Enter Dependent's Birthdate - Year
				Commons.keyIn({'Message' : 'Enter Dependent Birthdate - Year for dependent # : ' + _this_indice,
							   'Control' : Controls.cx.page.Dependents.Individual.DOB.input.Year.xpath.textbox,
							   'ControlType' : Structures.Locators.XPATH,
							   'ReplaceIdentifier' : 'DEPEND',
							   'ReplaceWith' : _this_indice,
							   'Text' : (parameters.BirthdayYear) ?  parameters.BirthdayYear : parameters.DataCSS.DOB.Year});
				break;				
			
			default:
				break;
		}
	},

	/**
	 * Validate components of Dependents Page.
	 *
	 * @param {Structures.Validators} ValidateFor specify what component on the page is to be validated.
	 * @param {Structures.Dependents} Control is the object on the page to be validated.
	 * @param {Structures.MessageLocations} MessageLocation where the message/error displayed is to be validated.	 
	 * @param {string} WithData data that is to be validated.
	 * @param {json} DataCSS snippet of json that provides required information for processing.
	 * @param {String} Indice of the dependent record.
	 */
	validate : function(parameters) {
		var _this_indice = (parameters.Indice) ? parameters.Indice : parameters.DataCSS.Index;
		if (parameters.ValidateFor == Structures.Validators.Caption) { this.validateCaptions({'Control' : parameters.Control,
																							  'Indice' : _this_indice}); }
		if (parameters.ValidateFor == Structures.Validators.Placeholder) { this.validatePlaceholders({'Control' : parameters.Control,
																							  'Indice' : _this_indice}); }
		if (parameters.ValidateFor == Structures.Validators.Errors) { this.validateErrors({'Control' : parameters.Control, 
																						   'MessageLocation' : parameters.MessageLocation, 
																						   'Indice' : _this_indice}); }
		if (parameters.ValidateFor == Structures.Validators.Information) { this.validateInformation({'Control' : parameters.Control, 
																								'QuestText' : parameters.WithData, 
																								'Indice' : _this_indice});  }
		if (parameters.ValidateFor == Structures.Validators.Summary) { Commons.validatePlanSummary({'Page': 'Dependents',
																									'Control' : parameters.Control,
																									'DataCSS' : parameters.DataCSS}); }
		if (parameters.ValidateFor == Structures.Validators.Contents) { this.validateInformation({'Control' : parameters.Control, 
																								'QuestText' : parameters.WithData, 
																								'Indice' : _this_indice}); }
	},
	
	/**
	 * Validate Captions for GUI objects on Dependents Page.
	 *
	 * @param {Structures.Dependents} Control to carry out action against to navigate to.
	 * @param {json} DataCSS snippet of json that provides required information for processing.
	 * @param {String} PrimaryName First Name control caption.
	 * @param {String} MiddleInitials control caption.
	 * @param {String} LastName control caption.
	 * @param {String} Gender control caption.
	 * @param {String} Birthdate control caption.
	 * @param {String} Relationship control caption.
	 * @param {String} Indice of the dependent record.
	 */
	validateCaptions : function(parameters) {
		
		var _this_indice = (parameters.Indice) ? parameters.Indice : parameters.DataCSS.Index;
		
		switch(parameters.Control) {
			
			case Structures.Dependents.Relationship: 
				//--- Validate Caption For - Dependent - Relationship
				Commons.verify({'Message' : 'Validate Caption For - Dependent['+_this_indice+'] - Relationship is : ' + (parameters.Relationship) ? parameters.Relationship : Controls.cx.page.Dependents.Individual.Relationship.caption,
								'Control' : Controls.cx.page.Dependents.Individual.Relationship.input.xpath.label.toString().replace('DEPEND',_this_indice),
								'ControlType' : Structures.Locators.XPATH,
								'QuestText' : (parameters.Relationship) ? parameters.Relationship : Controls.cx.page.Dependents.Individual.Relationship.caption});
				break;

			case Structures.Dependents.FirstName:
				//--- Validate Caption For - Dependent - First Name
				Commons.verify({'Message' : 'Validate Caption For - Dependent['+_this_indice+'] - First Name is : ' + (parameters.PrimaryName) ? parameters.PrimaryName : Controls.cx.page.Dependents.Individual.Name.First.caption,
								'Control' : Controls.cx.page.Dependents.Individual.Name.First.input.xpath.label.toString().replace('DEPEND',_this_indice),
								'ControlType' : Structures.Locators.XPATH,
								'QuestText' : (parameters.PrimaryName) ? parameters.PrimaryName : Controls.cx.page.Dependents.Individual.Name.First.caption});
				break;

			case Structures.Dependents.MiddleInitial:
				//--- Validate Caption For - Dependent - Middle Initial
				Commons.verify({'Message' : 'Validate Caption For - Dependent['+_this_indice+'] - Middle Initial is : ' + (parameters.MiddleInitials) ? parameters.MiddleInitials : Controls.cx.page.Dependents.Individual.Name.Middle.caption,
								'Control' : Controls.cx.page.Dependents.Individual.Name.Middle.input.xpath.label.toString().replace('DEPEND',_this_indice),
								'ControlType' : Structures.Locators.XPATH,
								'QuestText' : (parameters.MiddleInitials) ? parameters.MiddleInitials : Controls.cx.page.Dependents.Individual.Name.Middle.caption});
				break;

			case Structures.Dependents.LastName:
				//--- Validate Caption For - Dependent - Last Name
				Commons.verify({'Message' : 'Validate Caption For - Dependent['+_this_indice+'] - Last Name is : ' + (parameters.LastName) ? parameters.LastName : Controls.cx.page.Dependents.Individual.Name.Last.caption,
								'Control' : Controls.cx.page.Dependents.Individual.Name.Last.input.xpath.label.toString().replace('DEPEND',_this_indice),
								'ControlType' : Structures.Locators.XPATH,
								'QuestText' : (parameters.LastName) ? parameters.LastName : Controls.cx.page.Dependents.Individual.Name.Last.caption});
				break;

			case Structures.Dependents.Gender:
				//--- Validate Caption For - Dependent - Gender
				Commons.verify({'Message' : 'Validate Caption For - Dependent['+_this_indice+'] - Gender is : ' + (parameters.Gender) ? parameters.Gender : Controls.cx.page.Dependents.Individual.Gender.caption,
								'Control' : Controls.cx.page.Dependents.Individual.Gender.input.xpath.label.toString().replace('DEPEND',_this_indice),
								'ControlType' : Structures.Locators.XPATH,
								'QuestText' : (parameters.Gender) ? parameters.Gender : Controls.cx.page.Dependents.Individual.Gender.caption});
				break;

			case Structures.Dependents.Birthdate:
				//--- Validate Caption For - Dependent - Birthdate
				Commons.verify({'Message' : 'Validate Caption For - Dependent['+_this_indice+'] - Birthdate is : ' + (parameters.Birthdate) ? parameters.Birthdate : Controls.cx.page.Dependents.Individual.DOB.caption,
								'Control' : Controls.cx.page.Dependents.Individual.DOB.input.xpath.label.toString().replace('DEPEND',_this_indice),
								'ControlType' : Structures.Locators.XPATH,
								'QuestText' : (parameters.Birthdate) ? parameters.Birthdate : Controls.cx.page.Dependents.Individual.DOB.caption});
				break;

			case Structures.Dependents.ValidateAll:
				this.validateDependentCaptions({'Control' : Structures.Dependents.Relationship, 'Indice' : _this_indice});
				this.validateDependentCaptions({'Control' : Structures.Dependents.FirstName, 'Indice' : _this_indice});
				this.validateDependentCaptions({'Control' : Structures.Dependents.MiddleInitial, 'Indice' : _this_indice});
				this.validateDependentCaptions({'Control' : Structures.Dependents.LastName, 'Indice' : _this_indice});
				this.validateDependentCaptions({'Control' : Structures.Dependents.Gender, 'Indice' : _this_indice});
				this.validateDependentCaptions({'Control' : Structures.Dependents.Birthdate, 'Indice' : _this_indice});
				break;
			
			default:
				break;
		}
	},
	
	/**
	 * Validate Placeholders for GUI objects on Dependents Page.
	 *
	 * @param {Structures.Dependents} Control to carry out action against to navigate to.
	 * @param {json} DataCSS snippet of json that provides required information for processing.
	 * @param {String} PrimaryName First Name control caption.
	 * @param {String} MiddleInitials control caption.
	 * @param {String} LastName control caption.
	 * @param {String} Gender control caption.
	 * @param {String} BirthdayMonth of the applicant.
	 * @param {String} BirthdayDate of the applicant.
	 * @param {String} BirthdayYear of the applicant.
	 * @param {String} Relationship control caption.
	 * @param {String} Indice of the dependent record.
	 */
	validatePlaceholders : function(parameters) {
				
		var _this_indice = (parameters.Indice) ? parameters.Indice : parameters.DataCSS.Index;
		
		switch(parameters.Control) {
			
			case Structures.Dependents.Relationship:
				//--- Validate Placeholder - Dependents - Relationship
				var _this_index = parseInt(Controls.cx.page.Dependents.Individual.Relationship.input.selectedindex);
				var _this_relationship = (parameters.Relationship) ? parameters.Relationship : Controls.cx.page.Dependents.Individual.Relationship.input.items[_this_index];
				Commons.verify({'Message' : 'Validate Placeholder - Dependent['+_this_indice+'] - Relationship is : ' + _this_relationship,
								'Control' : Controls.cx.page.Dependents.Individual.Relationship.input.xpath.label.toString().replace('DEPEND',_this_indice),
								'ControlType' : Structures.Locators.XPATH,
								'Value' : _this_relationship});
				break;

			case Structures.Dependents.FirstName:
				//--- Validate Placeholder - Dependents - First Name
				Commons.verify({'Message' : 'Validate Placeholder - Dependent['+_this_indice+'] - First Name is : ' + (parameters.PrimaryName) ? parameters.PrimaryName : Controls.cx.page.Dependents.Individual.Name.First.input.defaults,
								'Control' : Controls.cx.page.Dependents.Individual.Name.First.input.xpath.label.toString().replace('DEPEND',_this_indice),
								'ControlType' : Structures.Locators.XPATH,
								'Attribute' : Controls.cx.page.Dependents.Individual.Name.First.input.attribute,
								'Value' : (parameters.PrimaryName) ? parameters.PrimaryName : Controls.cx.page.Dependents.Individual.Name.First.input.defaults});
				break;

			case Structures.Dependents.MiddleInitial:
				//--- Validate Placeholder - Dependents - Middle Initial
				Commons.verify({'Message' : 'Validate Placeholder - Dependent['+_this_indice+'] - Middle Initial is : ' + (parameters.MiddleInitials) ? parameters.MiddleInitials : Controls.cx.page.Dependents.Individual.Name.Middle.input.defaults,
								'Control' : Controls.cx.page.Dependents.Individual.Name.Middle.input.xpath.label.toString().replace('DEPEND',_this_indice),
								'Attribute' : Controls.cx.page.Dependents.Individual.Name.Middle.input.attribute,
								'Value' : (parameters.MiddleInitials) ? parameters.MiddleInitials : Controls.cx.page.Dependents.Individual.Name.Middle.input.defaults});
				break;

			case Structures.Dependents.LastName:
				//--- Validate Placeholder - Dependents - Last Name
				Commons.verify({'Message' : 'Validate Placeholder - Dependent['+_this_indice+'] - Last Name is : ' + (parameters.LastName) ? parameters.LastName : Controls.cx.page.Dependents.Individual.Name.Last.input.defaults,
								'Control' : Controls.cx.page.Dependents.Individual.Name.Last.input.xpath.label.toString().replace('DEPEND',_this_indice),
								'ControlType' : Structures.Locators.XPATH,
								'Attribute' : Controls.cx.page.Dependents.Individual.Name.Last.input.attribute,
								'Value' : (parameters.LastName) ? parameters.LastName : Controls.cx.page.Dependents.Individual.Name.Last.input.defaults});
				break;

			case Structures.Dependents.Gender:
				//--- Validate Placeholder - Dependents - Gender
				Commons.verify({'Message' : 'Validate Placeholder - Dependent['+_this_indice+'] - Gender is : ' + (parameters.Gender) ? parameters.Gender : Controls.cx.page.Dependents.Individual.Gender.input.defaults,
								'Control' : Controls.cx.page.Dependents.Individual.Gender.input.xpath.label.toString().replace('DEPEND',_this_indice),
								'ControlType' : Structures.Locators.XPATH,
								'Attribute' : Controls.cx.page.Dependents.Individual.Gender.input.attribute,
								'Value' : (parameters.Gender) ? parameters.Gender : Controls.cx.page.Dependents.Individual.Gender.input.defaults});
				break;

			case Structures.Dependents.DOBMonth:
				//--- Validate Placeholder - Dependents - Birthdate - Month
				Commons.verify({'Message' : 'Validate Placeholder - Dependent['+_this_indice+'] - Birthdate is : ' + (parameters.BirthdayMonth) ? parameters.BirthdayMonth : Controls.cx.page.Dependents.Individual.DOB.input.Month.defaults,
								'Control' : Controls.cx.page.Dependents.Individual.DOB.input.Month.xpath.label.toString().replace('DEPEND',_this_indice),
								'ControlType' : Structures.Locators.XPATH,
								'Attribute' : Controls.cx.page.Dependents.Individual.DOB.input.Month.attribute,
								'Value' : (parameters.BirthdayMonth) ? parameters.BirthdayMonth : Controls.cx.page.Dependents.Individual.DOB.input.Month.defaults});
				break;

			case Structures.Dependents.DOBDate:
				//--- Validate Placeholder - Dependents - Birthdate - Day
				Commons.verify({'Message' : 'Validate Placeholder - Dependent['+_this_indice+'] - Birthdate is : ' + (parameters.BirthdayDate) ? parameters.BirthdayDate : Controls.cx.page.Dependents.Individual.DOB.input.Day.defaults,
								'Control' : Controls.cx.page.Dependents.Individual.DOB.input.Day.xpath.label.toString().replace('DEPEND',_this_indice),
								'ControlType' : Structures.Locators.XPATH,
								'Attribute' : Controls.cx.page.Dependents.Individual.DOB.input.Day.attribute,
								'Value' : (parameters.BirthdayDate) ? parameters.BirthdayDate : Controls.cx.page.Dependents.Individual.DOB.input.Day.defaults});
				break;

			case Structures.Dependents.DOBYear:
				//--- Validate Placeholder - Dependents - Birthdate - Year
				Commons.verify({'Message' : 'Validate Placeholder - Dependent['+_this_indice+'] - Birthdate is : ' + (parameters.BirthdayYear) ? parameters.BirthdayYear : Controls.cx.page.Dependents.Individual.DOB.input.Year.defaults,
								'Control' : Controls.cx.page.Dependents.Individual.DOB.input.Year.xpath.label.toString().replace('DEPEND',_this_indice),
								'ControlType' : Structures.Locators.XPATH,
								'Attribute' : Controls.cx.page.Dependents.Individual.DOB.input.Year.attribute,
								'Value' : (parameters.BirthdayYear) ? parameters.BirthdayYear : Controls.cx.page.Dependents.Individual.DOB.input.Year.defaults});
				break;		

			case Structures.Dependents.ValidateAll:
				this.validateDependentPlaceholders({'Control' : Structures.Dependents.Relationship, 'Indice' : _this_indice});
				this.validateDependentPlaceholders({'Control' : Structures.Dependents.FirstName, 'Indice' : _this_indice});
				this.validateDependentPlaceholders({'Control' : Structures.Dependents.MiddleInitial, 'Indice' : _this_indice});
				this.validateDependentPlaceholders({'Control' : Structures.Dependents.LastName, 'Indice' : _this_indice});
				this.validateDependentPlaceholders({'Control' : Structures.Dependents.Gender, 'Indice' : _this_indice});
				this.validateDependentPlaceholders({'Control' : Structures.Dependents.DOBMonth, 'Indice' : _this_indice});
				this.validateDependentPlaceholders({'Control' : Structures.Dependents.DOBDate, 'Indice' : _this_indice});
				this.validateDependentPlaceholders({'Control' : Structures.Dependents.DOBYear, 'Indice' : _this_indice});
				break;
			
			default:
				break;
		}
	},
	
	/**
	 * Validate errors on Dependents Page.
	 *
	 * @param {Structures.Dependents} Control is the object on the page to be validated.
	 * @param {Structures.MessageLocations} MessageLocation where the message/error displayed is to be validated.
	 * @param {String} QuestText control caption.	
	 * @param {String} Indice of the dependent record.
	 */
	validateErrors : function(parameters) {
		var _control = '';
		var _location = '';
		var _this_indice = (parameters.Indice) ? parameters.Indice : parameters.DataCSS.Index;
		
		switch(parameters.Control) {
			
			case Structures.Dependents.Relationship: 
				_control = '';
				_location = '';
				var _error_indice = Controls.cx.page.Dependents.Individual.Errors.indices[_this_indice];
				if (parameters.MessageLocation == Structures.MessageLocations.Header) { _location = 'Page Top'; _control = Controls.cx.page.Dependents.Individual.Errors.ontop.replace('INDICE',_error_indice[Structures.DependentsUIErrorIndices.Relationship]); }
				if (parameters.MessageLocation == Structures.MessageLocations.Control) { _location = 'Below Control'; _control = Controls.cx.page.Dependents.Individual.Errors.atcontrol.replace('INDICE',_error_indice[Structures.DependentsUIErrorIndices.Relationship]); }
				//--- Validate Error Message At - Dependents - Relationship
				Commons.verify({'Message' : 'Validate Error Message At - Dependent '+_this_indice+' - Relationship at GUI Message Location '+_location+' is : ' + (parameters.QuestText) ? parameters.QuestText : Controls.cx.page.Dependents.Individual.Relationship.error.text,
								'Control' : _control,
								'ControlType' : Structures.Locators.XPATH,
								'QuestText' : (parameters.QuestText) ? parameters.QuestText : Controls.cx.page.Dependents.Individual.Relationship.error.text});
				break;

			case Structures.Dependents.FirstName:
				_control = '';
				_location = '';
				var _error_indice = Controls.cx.page.Dependents.Individual.Errors.indices[_this_indice];
				if (parameters.MessageLocation == Structures.MessageLocations.Header) { _location = 'Page Top'; _control = Controls.cx.page.Dependents.Individual.Errors.ontop.replace('INDICE',_error_indice[Structures.DependentsUIErrorIndices.FirstName]); }
				if (parameters.MessageLocation == Structures.MessageLocations.Control) { _location = 'Below Control'; _control = Controls.cx.page.Dependents.Individual.Errors.atcontrol.replace('INDICE',_error_indice[Structures.DependentsUIErrorIndices.FirstName]); }
				//--- Validate Error Message At - Dependents - First Name
				Commons.verify({'Message' : 'Validate Error Message At - Dependent '+_this_indice+' - First Name at GUI Message Location '+_location+' is : ' + (parameters.QuestText) ? parameters.QuestText : Controls.cx.page.Dependents.Individual.Name.First.error.text,
								'Control' : _control,
								'ControlType' : Structures.Locators.XPATH,
								'QuestText' : (parameters.QuestText) ? parameters.QuestText : Controls.cx.page.Dependents.Individual.Name.First.error.text});
				break;

			case Structures.Dependents.MiddleInitial:
				break;

			case Structures.Dependents.LastName:
				_control = '';
				_location = '';
				var _error_indice = Controls.cx.page.Dependents.Individual.Errors.indices[_this_indice];
				if (parameters.MessageLocation == Structures.MessageLocations.Header) { _location = 'Page Top'; _control = Controls.cx.page.Dependents.Individual.Errors.ontop.replace('INDICE',_error_indice[Structures.DependentsUIErrorIndices.LastName]); }
				if (parameters.MessageLocation == Structures.MessageLocations.Control) { _location = 'Below Control'; _control = Controls.cx.page.Dependents.Individual.Errors.atcontrol.replace('INDICE',_error_indice[Structures.DependentsUIErrorIndices.LastName]); }
				//--- Validate Error Message At - Dependents - Last Name
				Commons.verify({'Message' : 'Validate Error Message At - Dependent '+_this_indice+' - Last Name at GUI Message Location '+_location+' is : ' + (parameters.QuestText) ? parameters.QuestText : Controls.cx.page.Dependents.Individual.Name.Last.error.text,
								'Control' : _control,
								'ControlType' : Structures.Locators.XPATH,
								'QuestText' : (parameters.QuestText) ? parameters.QuestText : Controls.cx.page.Dependents.Individual.Name.Last.error.text});
				break;

			case Structures.Dependents.Gender:
				_control = '';
				_location = '';
				var _error_indice = Controls.cx.page.Dependents.Individual.Errors.indices[_this_indice];
				if (parameters.MessageLocation == Structures.MessageLocations.Header) { _location = 'Page Top'; _control = Controls.cx.page.Dependents.Individual.Errors.ontop.replace('INDICE',_error_indice[Structures.DependentsUIErrorIndices.Gender]); }
				if (parameters.MessageLocation == Structures.MessageLocations.Control) { _location = 'Below Control'; _control = Controls.cx.page.Dependents.Individual.Errors.atcontrol.replace('INDICE',_error_indice[Structures.DependentsUIErrorIndices.Gender]); }
				//--- Validate Error Message At - Dependents - Gender
				Commons.verify({'Message' : 'Validate Error Message At - Dependent '+_this_indice+' - Gender at GUI Message Location '+_location+' is : ' + (parameters.QuestText) ? parameters.QuestText : Controls.cx.page.Dependents.Individual.Gender.error.text,
								'Control' : _control,
								'ControlType' : Structures.Locators.XPATH,
								'QuestText' : (parameters.QuestText) ? parameters.QuestText : Controls.cx.page.Dependents.Individual.Gender.error.text});
				break;

			case Structures.Dependents.DOBMonth:
				_control = '';
				_location = '';
				var _error_indice = Controls.cx.page.Dependents.Individual.Errors.indices[_this_indice];
				if (parameters.MessageLocation == Structures.MessageLocations.Header) { _location = 'Page Top'; _control = Controls.cx.page.Dependents.Individual.Errors.ontop.replace('INDICE',_error_indice[Structures.DependentsUIErrorIndices.BirthMonth]); }
				if (parameters.MessageLocation == Structures.MessageLocations.Control) { _location = 'Below Control'; _control = Controls.cx.page.Dependents.Individual.Errors.atcontrol.replace('INDICE',_error_indice[Structures.DependentsUIErrorIndices.BirthMonth]); }
				//--- Validate Error Message At - Dependents - Birthdate Month
				Commons.verify({'Message' : 'Validate Error Message At - Dependent '+_this_indice+' - Birthdate Month at GUI Message Location '+_location+' is : ' + (parameters.QuestText) ? parameters.QuestText : Controls.cx.page.Dependents.Individual.DOB.input.Month.error.text,
								'Control' : _control,
								'ControlType' : Structures.Locators.XPATH,
								'QuestText' : (parameters.QuestText) ? parameters.QuestText : Controls.cx.page.Dependents.Individual.DOB.input.Month.error.text});
				break;

			case Structures.Dependents.DOBDate:
				_control = '';
				_location = '';
				var _error_indice = Controls.cx.page.Dependents.Individual.Errors.indices[_this_indice];
				if (parameters.MessageLocation == Structures.MessageLocations.Header) { _location = 'Page Top'; _control = Controls.cx.page.Dependents.Individual.Errors.ontop.replace('INDICE',_error_indice[Structures.DependentsUIErrorIndices.BirthDate]); }
				if (parameters.MessageLocation == Structures.MessageLocations.Control) { _location = 'Below Control'; _control = Controls.cx.page.Dependents.Individual.Errors.atcontrol.replace('INDICE',_error_indice[Structures.DependentsUIErrorIndices.BirthDate]); }
				//--- Validate Error Message At - Dependents - Birthdate Day
				Commons.verify({'Message' : 'Validate Error Message At - Dependent '+_this_indice+' - Birthdate Day at GUI Message Location '+_location+' is : ' + (parameters.QuestText) ? parameters.QuestText : Controls.cx.page.Dependents.Individual.DOB.input.Day.error.text,
								'Control' : _control,
								'ControlType' : Structures.Locators.XPATH,
								'QuestText' : (parameters.QuestText) ? parameters.QuestText : Controls.cx.page.Dependents.Individual.DOB.input.Day.error.text});
				break;

			case Structures.Dependents.DOBYear:
				_control = '';
				_location = '';
				var _error_indice = Controls.cx.page.Dependents.Individual.Errors.indices[_this_indice];
				if (parameters.MessageLocation == Structures.MessageLocations.Header) { _location = 'Page Top'; _control = Controls.cx.page.Dependents.Individual.Errors.ontop.replace('INDICE',_error_indice[Structures.DependentsUIErrorIndices.BirthYear]); }
				if (parameters.MessageLocation == Structures.MessageLocations.Control) { _location = 'Below Control'; _control = Controls.cx.page.Dependents.Individual.Errors.atcontrol.replace('INDICE',_error_indice[Structures.DependentsUIErrorIndices.BirthYear]); }
				//--- Validate Error Message At - Dependents - Birthdate Year
				Commons.verify({'Message' : 'Validate Error Message At - Dependent '+_this_indice+' - Birthdate Year at GUI Message Location '+_location+' is : ' + (parameters.QuestText) ? parameters.QuestText : Controls.cx.page.Dependents.Individual.DOB.input.Year.error.text,
								'Control' : _control,
								'ControlType' : Structures.Locators.XPATH,
								'QuestText' : (parameters.QuestText) ? parameters.QuestText : Controls.cx.page.Dependents.Individual.DOB.input.Year.error.text});
				break;		

			case Structures.Dependents.ValidateAll:
				this.validateDependentErrors({'Control' : Structures.Dependents.Relationship, 'MessageLocation' : parameters.MessageLocation, 'Indice' : _this_indice});
				this.validateDependentErrors({'Control' : Structures.Dependents.FirstName, 'MessageLocation' : parameters.MessageLocation, 'Indice' : _this_indice});
				this.validateDependentErrors({'Control' : Structures.Dependents.MiddleInitial, 'MessageLocation' : parameters.MessageLocation, 'Indice' : _this_indice});
				this.validateDependentErrors({'Control' : Structures.Dependents.LastName, 'MessageLocation' : parameters.MessageLocation, 'Indice' : _this_indice});
				this.validateDependentErrors({'Control' : Structures.Dependents.Gender, 'MessageLocation' : parameters.MessageLocation, 'Indice' : _this_indice});
				this.validateDependentErrors({'Control' : Structures.Dependents.DOBMonth, 'MessageLocation' : parameters.MessageLocation, 'Indice' : _this_indice});
				this.validateDependentErrors({'Control' : Structures.Dependents.DOBDate, 'MessageLocation' : parameters.MessageLocation, 'Indice' : _this_indice});
				this.validateDependentErrors({'Control' : Structures.Dependents.DOBYear, 'MessageLocation' : parameters.MessageLocation, 'Indice' : _this_indice});
				break;
			
			default:
				break;
		}	
	},
	
	/**
	 * Validate errors on Dependents Page.
	 *
	 * @param {Structures.Dependents} Control is the object on the page to be validated.
	 * @param {String} QuestText control caption.	
	 * @param {String} Indice of the dependent record.
	 */
	validateInformation : function(parameters) {
		
		var _this_indice = (parameters.Indice) ? parameters.Indice : parameters.DataCSS.Index;
		
		switch(parameters.Control) {
			
			case Structures.Dependents.Relationship: 
				//--- Validate Caption For - Dependent - Relationship
				Commons.verify({'Message' : 'Validate Caption For - Dependent['+_this_indice+'] - Relationship is : ' + parameters.QuestText,
								'Control' : Controls.cx.page.Dependents.Individual.Relationship.input.xpath.label.toString().replace('DEPEND',_this_indice),
								'ControlType' : Structures.Locators.XPATH,
								'QuestText' : parameters.QuestText});
				break;

			case Structures.Dependents.FirstName:
				//--- Validate Caption For - Dependent - First Name
				Commons.verify({'Message' : 'Validate Caption For - Dependent['+_this_indice+'] - First Name is : ' + parameters.QuestText,
								'Control' : Controls.cx.page.Dependents.Individual.Name.First.input.xpath.label.toString().replace('DEPEND',_this_indice),
								'ControlType' : Structures.Locators.XPATH,
								'QuestText' : parameters.QuestText});
				break;

			case Structures.Dependents.MiddleInitial:
				//--- Validate Caption For - Dependent - Middle Initial
				Commons.verify({'Message' : 'Validate Caption For - Dependent['+_this_indice+'] - Middle Initial is : ' + parameters.QuestText,
								'Control' : Controls.cx.page.Dependents.Individual.Name.Middle.input.xpath.label.toString().replace('DEPEND',_this_indice),
								'ControlType' : Structures.Locators.XPATH,
								'QuestText' : parameters.QuestText});
				break;

			case Structures.Dependents.LastName:
				//--- Validate Caption For - Dependent - Last Name
				Commons.verify({'Message' : 'Validate Caption For - Dependent['+_this_indice+'] - Last Name is : ' + parameters.QuestText,
								'Control' : Controls.cx.page.Dependents.Individual.Name.Last.input.xpath.label.toString().replace('DEPEND',_this_indice),
								'ControlType' : Structures.Locators.XPATH,
								'QuestText' : parameters.QuestText});
				break;

			case Structures.Dependents.Gender:
				//--- Validate Caption For - Dependent - Gender
				Commons.verify({'Message' : 'Validate Caption For - Dependent['+_this_indice+'] - Gender is : ' + parameters.QuestText,
								'Control' : Controls.cx.page.Dependents.Individual.Gender.input.xpath.label.toString().replace('DEPEND',_this_indice),
								'ControlType' : Structures.Locators.XPATH,
								'QuestText' : parameters.QuestText});
				break;

			case Structures.Dependents.DOBMonth:
				//--- Validate Placeholder - Dependents - Birthdate - Month
				Commons.verify({'Message' : 'Validate Placeholder - Dependent['+_this_indice+'] - Birthdate is : ' + parameters.QuestText,
								'Control' : Controls.cx.page.Dependents.Individual.DOB.input.Month.xpath.label.toString().replace('DEPEND',_this_indice),
								'ControlType' : Structures.Locators.XPATH,
								'QuestText' : parameters.QuestText});
				break;

			case Structures.Dependents.DOBDate:
				//--- Validate Placeholder - Dependents - Birthdate - Day
				Commons.verify({'Message' : 'Validate Placeholder - Dependent['+_this_indice+'] - Birthdate is : ' + parameters.QuestText,
								'Control' : Controls.cx.page.Dependents.Individual.DOB.input.Day.xpath.label.toString().replace('DEPEND',_this_indice),
								'ControlType' : Structures.Locators.XPATH,
								'QuestText' : parameters.QuestText});
				break;

			case Structures.Dependents.DOBYear:
				//--- Validate Placeholder - Dependents - Birthdate - Year
				Commons.verify({'Message' : 'Validate Placeholder - Dependent['+_this_indice+'] - Birthdate is : ' + parameters.QuestText,
								'Control' : Controls.cx.page.Dependents.Individual.DOB.input.Year.xpath.label.toString().replace('DEPEND',_this_indice),
								'ControlType' : Structures.Locators.XPATH,
								'QuestText' : parameters.QuestText});
				break;		
				
			case Structures.Dependents.NewPremium:
				//--- Validate Placeholder - Dependents - NewPremium
				Commons.verify({'Message' : 'Validate Placeholder - Dependent - New Premium is : ' + parameters.QuestText,
								'Control' : Controls.cx.page.Dependents.Form.PremiumChange.PriceChangeSummary.NewPrice.label,
								'ControlType' : Structures.Locators.CSS,
								'QuestText' : parameters.QuestText});
				break;		

			case Structures.Dependents.ValidateAll:
				this.validateDependentCaptions({'Control' : Structures.Dependents.Relationship, 'Indice' : _this_indice, 'QuestText' : parameters.QuestText});
				this.validateDependentCaptions({'Control' : Structures.Dependents.FirstName, 'Indice' : _this_indice, 'QuestText' : parameters.QuestText});
				this.validateDependentCaptions({'Control' : Structures.Dependents.MiddleInitial, 'Indice' : _this_indice, 'QuestText' : parameters.QuestText});
				this.validateDependentCaptions({'Control' : Structures.Dependents.LastName, 'Indice' : _this_indice, 'QuestText' : parameters.QuestText});
				this.validateDependentCaptions({'Control' : Structures.Dependents.Gender, 'Indice' : _this_indice, 'QuestText' : parameters.QuestText});
				this.validateDependentCaptions({'Control' : Structures.Dependents.DOBMonth, 'Indice' : _this_indice, 'QuestText' : parameters.QuestText});
				this.validateDependentCaptions({'Control' : Structures.Dependents.DOBDate, 'Indice' : _this_indice, 'QuestText' : parameters.QuestText});
				this.validateDependentCaptions({'Control' : Structures.Dependents.DOBYear, 'Indice' : _this_indice, 'QuestText' : parameters.QuestText});
				break;
			
			default:
				break;
		}
	}

};
 
module.exports = cxPgGUIDependents;
