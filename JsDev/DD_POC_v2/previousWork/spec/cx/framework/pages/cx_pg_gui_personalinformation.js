//CX Automation Framework Libraries.
//--- Author : Uday Thombre (UThombre@delta.org)

var Controls = require('../cx_gui.json');
var Commons = require('../cx_commons.js');
var Structures = require('../cx_structures.js');

var cxPgGUIPersonalInformation = {
		
	/**
	 * Keyboard actions & Data entry on controls of Personal Information page.
	 *
	 * @param {Structures.Profile} Control to carry out action against to navigate to.
	 * @param {json} DataCSS snippet of json that provides required information for processing.
	 * @param {String} PrimaryName First Name of the applicant.
	 * @param {String} MiddleInitials of the applicant.
	 * @param {String} LastName of the applicant.
	 * @param {String} Gender of the applicant.
	 * @param {String} BirthdayMonth of the applicant.
	 * @param {String} BirthdayDate of the applicant.
	 * @param {String} BirthdayYear of the applicant.
	 * @param {String} SSNumber of the applicant.
	 * @param {String} AlternateIdentifier of the applicant.
	 * @param {String} ServiceAddressStreet of the applicant.
	 * @param {String} ServiceAddressCity of the applicant.
	 * @param {String} ServiceAddressState of the applicant.
	 * @param {String} ServiceAddressZipCode of the applicant.
	 * @param {String} HasMailingAddress (true/false) of the applicant.
	 * @param {String} MailingAddressStreet of the applicant.
	 * @param {String} MailingAddressCity of the applicant.
	 * @param {String} MailingAddressState of the applicant.
	 * @param {String} MailingAddressZipCode of the applicant.
	 * @param {String} PhoneType of the applicant.
	 * @param {String} PhoneNumber of the applicant.
	 * @param {String} EmailAddress of the applicant.
	 * @param {String} GoPaperless (true/false) of the applicant.
	 * @param {String} HasBroker (true/false) of the applicant.
	 * @param {String} BrokerNumber (true/false) of the applicant.
	 * @param {string} Clear executing Keyboard-CTRL+A & Keyboard-BACKSPACE operation on to specified CX GUI Control.
	 */
	keyIn : function(parameters) {
		
		var broker_selected = false;
		var isNegativeTest = parameters.IsNegativeTest;
		var dataCSS = parameters.DataCSS;
		var mailing_address_selected = false;

/* 		if (isNegativeTest === true) {
			mailing_address_selected = true;
		}
		else if (!parameters.DataCSS.MailingAddress.Street && !parameters.DataCSS.MailingAddress.City && !parameters.DataCSS.MailingAddress.State && !parameters.DataCSS.MailingAddress.Zip) {
			mailing_address_selected = true;
		} 
 */
		switch(parameters.Control) {

			case Structures.Profile.PrimaryName:
				Commons.keyIn({'Message' : 'Enter Primary / First Name : ',
							   'Control' : Controls.cx.page.PersonalInformation.Profile.Names.Primary.input.textbox,
							   'ControlType' : Structures.Locators.CSS,
							   'Text' : (parameters.PrimaryName) ? parameters.PrimaryName : parameters.DataCSS.Profile.Name.First,
							   'Clear' : true});
				break;

			case Structures.Profile.MiddleName:
				//--- Enter Name - Middle Initial
				Commons.keyIn({'Message' : 'Enter Primary / Middle Initial : ',
							   'Control' : Controls.cx.page.PersonalInformation.Profile.Names.Middle.input.textbox,
							   'ControlType' : Structures.Locators.CSS,
							   'Text' : (parameters.MiddleInitials) ? parameters.MiddleInitials : parameters.DataCSS.Profile.Name.Middle,
							   'Clear' : true});
				break;

			case Structures.Profile.LastName:
				//--- Enter Name - Last Name
				Commons.keyIn({'Message' : 'Enter Primary / Last Name : ',
							   'Control' : Controls.cx.page.PersonalInformation.Profile.Names.Last.input.textbox,
							   'ControlType' : Structures.Locators.CSS,
							   'Text' : (parameters.LastName) ? parameters.LastName : parameters.DataCSS.Profile.Name.Last,
							   'Clear' : true});				
				break;

			case Structures.Profile.Gender:
				//--- Select Gender
				Commons.keyIn({'Message' : 'Select Gender : ',
							   'Control' : Controls.cx.page.PersonalInformation.Profile.Gender.input.select,
							   'ControlType' : Structures.Locators.CSS,
							   'ListItem' : (parameters.Gender) ? parameters.Gender : parameters.DataCSS.Profile.Gender});				
				break;

			case Structures.Profile.DOBMonth:
				//--- Enter Birthdate - Month
				Commons.keyIn({'Message' : 'Enter Birthdate - Month : ',
							   'Control' : Controls.cx.page.PersonalInformation.Profile.DOB.input.Month.selector,
							   'ControlType' : Structures.Locators.CSS,
							   'Text' : (parameters.BirthdayMonth) ? parameters.BirthdayMonth : parameters.DataCSS.Profile.DOB.Month,
							   'Clear' : true});				
				break;

			case Structures.Profile.DOBDate:
				//--- Enter Birthdate - Day
				Commons.keyIn({'Message' : 'Enter Birthdate - Day : ',
							   'Control' : Controls.cx.page.PersonalInformation.Profile.DOB.input.Day.selector,
							   'ControlType' : Structures.Locators.CSS,
							   'Text' : (parameters.BirthdayDate) ?  parameters.BirthdayDate : parameters.DataCSS.Profile.DOB.Day,
							   'Clear' : true});
				break;

			case Structures.Profile.DOBYear:
				//--- Enter Birthdate - Year
				Commons.keyIn({'Message' : 'Enter Birthdate - Year : ',
							   'Control' : Controls.cx.page.PersonalInformation.Profile.DOB.input.Year.selector,
							   'ControlType' : Structures.Locators.CSS,
							   'Text' : (parameters.BirthdayYear) ? parameters.BirthdayYear : parameters.DataCSS.Profile.DOB.Year,
							   'Clear' : true});
				break;

			case Structures.Profile.SSNumber:
				//--- Enter Social Security
				Commons.keyIn({'Message' : 'Enter SSN : ',
							   'Control' : Controls.cx.page.PersonalInformation.Profile.SSN.input.textbox,
							   'ControlType' : Structures.Locators.CSS,
							   'Text' : (parameters.SSNumber) ? parameters.SSNumber : parameters.DataCSS.Profile.SSN,
							   'Clear' : true});
				break;

			case Structures.Profile.AlternateIdentifier:
				//--- Enter Alternate Identifier
				Commons.keyIn({'Message' : 'Enter Alternate Identifier : ',
							   'Control' : Controls.cx.page.PersonalInformation.Profile.SSN.AlternateIdentifier.input.textbox,
							   'ControlType' : Structures.Locators.CSS,
							   'Text' : (parameters.AlternateIdentifier) ?  parameters.AlternateIdentifier : parameters.DataCSS.Profile.AlternateIdentifier,
							   'Clear' : true});
				break;
				
			case Structures.Profile.ContactStreet:
				//--- Enter Contact Street Address
				Commons.keyIn({'Message' : 'Enter Contact Address Street : ',
							   'Control' : Controls.cx.page.PersonalInformation.Contact.Address.Street.input.textbox,
							   'ControlType' : Structures.Locators.CSS,
							   'Text' : (parameters.ServiceAddressStreet) ? parameters.ServiceAddressStreet : parameters.DataCSS.Contact.Street,
							   'Clear' : true});
				break;

			case Structures.Profile.ContactCity:
				//--- Enter Contact Street City
				Commons.keyIn({'Message' : 'Enter Contact Address City : ',
							   'Control' : Controls.cx.page.PersonalInformation.Contact.Address.City.input.textbox,
							   'ControlType' : Structures.Locators.CSS,
							   'Text' : (parameters.ServiceAddressCity) ? parameters.ServiceAddressCity : parameters.DataCSS.Contact.City,
							   'Clear' : true});
				break;

			case Structures.Profile.ContactState:
				//--- Enter Contact Street State
				Commons.keyIn({'Message' : 'Enter Contact Address State : ',
							   'Control' : Controls.cx.page.PersonalInformation.Contact.Address.State.input.textbox,
							   'ControlType' : Structures.Locators.CSS,
							   'Text' : (parameters.ServiceAddressState) ? parameters.ServiceAddressState : parameters.DataCSS.Contact.State,
							   'Clear' : true});
				break;

			case Structures.Profile.ContactZip:
				//--- Enter Contact Street City
				Commons.keyIn({'Message' : 'Enter Contact Address Zip : ',
							   'Control' : Controls.cx.page.PersonalInformation.Contact.Address.Zip.input.textbox,
							   'ControlType' : Structures.Locators.CSS,
							   'Text' : (parameters.ServiceAddressZipCode) ?  parameters.ServiceAddressZipCode : parameters.DataCSS.Contact.Zip,
							   'Clear' : true});
				break;

			case Structures.Profile.ContactZipAlertGoBack:
				//--- Service/Contact Zip Code Change : Alert Dialog : Go Back
				Commons.keyIn({'Message' : 'CX : Service/Contact Zip Code Change : Alert Dialog : Go Back',
							   'Control' : Controls.cx.page.PersonalInformation.Contact.Address.Zip.overlay.alert.GoBack.input.link,
							   'ControlType' : Structures.Locators.CSS,
							   'Button' :  true});
				break;
			
			case Structures.Profile.ContactZipAlertNewQuote:
				//--- Service/Contact Zip Code Change : Alert Dialog : New Quote
				Commons.keyIn({'Message' : 'CX : Service/Contact Zip Code Change : Alert Dialog : New Quote',
							   'Control' : Controls.cx.page.PersonalInformation.Contact.Address.Zip.overlay.alert.NewQuote.input.button,
							   'ControlType' : Structures.Locators.CSS,
							   'Button' : true});
				break;
			
			case Structures.Profile.MailingAddress:
				if (parameters.HasMailingAddress) {
					mailing_address_selected = parameters.HasMailingAddress;
				} else {
					mailing_address_selected = (parameters.IsNegativeTest === true) ? true : ((!parameters.DataCSS.MailingAddress.Street && !parameters.DataCSS.MailingAddress.City && !parameters.DataCSS.MailingAddress.State && !parameters.DataCSS.MailingAddress.Zip) ? true : false);
				}
				Commons.keyIn({'Message' : 'Select/Unselect Different Mailing Address : ',
							   'Control' : Controls.cx.page.PersonalInformation.Contact.MailingAddress.Different.input.checkbox,
							   'ControlType' : Structures.Locators.CSS,
							   'Checkbox' : (mailing_address_selected === true) ? Structures.FrameworkUIActions.Check : Structures.FrameworkUIActions.UnCheck});
				break;

			case Structures.Profile.MailingAddressStreet:
				//--- Select Different Mailing Address - Street
				if (mailing_address_selected === true) {
					Commons.keyIn({'Message' : "Enter Contact's Different Mailing Address - Street : ",
							   'Control' : Controls.cx.page.PersonalInformation.Contact.MailingAddress.Street.input.textbox,
							   'ControlType' : Structures.Locators.CSS,
							   'Text' : (parameters.MailingAddressStreet) ? parameters.MailingAddressStreet : parameters.DataCSS.MailingAddress.Street,
							   'Clear' : true});
				}
				break;

			case Structures.Profile.MailingAddressCity:
				//--- Select Different Mailing Address - City
				if (mailing_address_selected === true) {					
					Commons.keyIn({'Message' : "Enter Contact's Different Mailing Address - City : ",
							   'Control' : Controls.cx.page.PersonalInformation.Contact.MailingAddress.City.input.textbox,
							   'ControlType' : Structures.Locators.CSS,
							   'Text' : (parameters.MailingAddressCity) ? parameters.MailingAddressCity : parameters.DataCSS.MailingAddress.City,
							   'Clear' : true});
				}
				break;

			case Structures.Profile.MailingAddressState:
				//--- Select Different Mailing Address - State
				if (mailing_address_selected === true) {
					Commons.keyIn({'Message' : "Enter Contact's Different Mailing Address - State : ",
							   'Control' : Controls.cx.page.PersonalInformation.Contact.MailingAddress.State.input.textbox,
							   'ControlType' : Structures.Locators.CSS,
							   'Text' : (parameters.MailingAddressState) ? parameters.MailingAddressState : parameters.DataCSS.MailingAddress.State,
							   'Clear' : true});
				}
				break;

			case Structures.Profile.MailingAddressZip:
				//--- Select Different Mailing Address - Zip
				if (mailing_address_selected === true) {
					Commons.keyIn({'Message' : "Enter Contact's Different Mailing Address - Zip : ",
							   'Control' : Controls.cx.page.PersonalInformation.Contact.MailingAddress.Zip.input.textbox,
							   'ControlType' : Structures.Locators.CSS,
							   'Text' : (parameters.MailingAddressZipCode) ? parameters.MailingAddressZipCode : parameters.DataCSS.MailingAddress.Zip,
							   'Clear' : true});
				}
				break;

			case Structures.Profile.PhoneType:
				//--- Select Phone Type
				Commons.keyIn({'Message' : 'Select Phone Type : ' + parameters.DataCSS.Contact.PhoneType,
							   'Control' : Controls.cx.page.PersonalInformation.Contact.Phone.Category.input.select,
							   'ControlType' : Structures.Locators.CSS,
							   'ListItem' : (parameters.PhoneType) ? parameters(PhoneType) : parameters.DataCSS.Contact.PhoneType.toUpperCase()});	
				break;

			case Structures.Profile.PhoneNumber:
				//--- Enter Phone Number
				Commons.keyIn({'Message' : 'Enter Contact Phone Number : ',
							   'Control' : Controls.cx.page.PersonalInformation.Contact.Phone.Number.input.textbox,
							   'ControlType' : Structures.Locators.CSS,
							   'Text' : (parameters.PhoneNumber) ?  parameters.PhoneNumber : parameters.DataCSS.Contact.Phone,
							   'Clear' : true});
				break;

			case Structures.Profile.EmailAddress:
				//--- Enter Email Address
				Commons.keyIn({'Message' : 'Enter Contact Email Address : ',
							   'Control' : Controls.cx.page.PersonalInformation.Contact.Email.input.textbox,
							   'ControlType' : Structures.Locators.CSS,
							   'Text' : (parameters.EmailAddress) ? parameters.EmailAddress : parameters.DataCSS.Contact.Email,
							   'Clear' : true});
				break;

			case Structures.Profile.GoPaperless:
				//--- Select/Unselect Go Paperless option
				var _go_paperless;
				if (parameters.GoPaperless) {
					_go_paperless = (parameters.GoPaperless == true) ? Structures.FrameworkUIActions.Check : Structures.FrameworkUIActions.UnCheck;
				} else {
					_go_paperless = (parameters.DataCSS.GoPaperless === 'Yes') ? Structures.FrameworkUIActions.Check : Structures.FrameworkUIActions.UnCheck;
				}
				Commons.keyIn({'Message' : 'Select/Unselect Go Paperless option : ',
							   'Control' : Controls.cx.page.PersonalInformation.Contact.Paperless.input.checkbox,
							   'ControlType' : Structures.Locators.CSS,
							   'Checkbox' : _go_paperless});
				break;

			case Structures.Profile.BrokerWorked:
				//--- Select/Unselect Have Broker option
				var _has_broker;
				if (parameters.HasBroker == true) {
					_has_broker = Controls.cx.page.PersonalInformation.Contact.Broker.IsPresent.input.checkbox.yes;
				} else if (parameters.DataCSS.Broker.Have === 'Yes') {
					_has_broker = Controls.cx.page.PersonalInformation.Contact.Broker.IsPresent.input.checkbox.yes;
				} else {
					_has_broker = Controls.cx.page.PersonalInformation.Contact.Broker.IsPresent.input.checkbox.no;
				}
				Commons.keyIn({'Message' : 'Select/Unselect Have Broker option : ',
							   'Control' : _has_broker,
							   'ControlType' : Structures.Locators.CSS,
							   'Button' : true});
				break;

			case Structures.Profile.BrokerNumber:
				//--- Enter Broker Number
				this.keyIn({'Control' : Structures.Profile.BrokerWorked, 'HasBroker' : true});
				Commons.keyIn({'Message' : 'Enter Broker Number : ',
							   'Control' : Controls.cx.page.PersonalInformation.Contact.Broker.Identifier.input.textbox,
							   'ControlType' : Structures.Locators.CSS,
							   'Text' : (parameters.BrokerNumber) ? parameters.BrokerNumber : parameters.DataCSS.Broker.Number,
							   'TabAway' : true,
							   'Clear' : parameters.Clear});
				break;

			case Structures.Profile.Next:
				//--- ACTION NEXT - Personal Information Page
				Commons.keyIn({'Message' : 'ACTION NEXT - Personal Information Page',
							   'Control' : Controls.cx.page.PersonalInformation.Action.Next.input.button,
							   'ControlType' : Structures.Locators.CSS,
							   'Button' : true});
				break;

			default:
				break;
		}
	},
	
	/**
	 * Validate components of Personal Information Page.
	 *
	 * @param {Structures.Validators} ValidateFor specify what component on the page is to be validated.
	 * @param {Structures.Profile} Control is the object on the page to be validated.
	 * @param {Structures.MessageLocations} MessageLocation where the message/error displayed is to be validated.	 
	 * @param {string} WithData data that is to be validated.
	 * @param {json} DataCSS snippet of json that provides required information for processing.
	 */
	validate : function(parameters) {
		if (parameters.ValidateFor == Structures.Validators.Caption) { this.validateCaptions({'Control' : parameters.Control}); }
		if (parameters.ValidateFor == Structures.Validators.Placeholder) { this.validatePlaceholders({'Control' : parameters.Control}); }
		if (parameters.ValidateFor == Structures.Validators.Errors) { this.validateErrors({'Control' : parameters.Control, 
																						   'MessageLocation' : parameters.MessageLocation}); }
		if (parameters.ValidateFor == Structures.Validators.Information) { this.validateInformation({'Control' : parameters.Control, 
																									 'QuestText' : parameters.WithData}); }
		if (parameters.ValidateFor == Structures.Validators.Summary) { Commons.validatePlanSummary({'Page': 'Personal Information',
																									'Control' : parameters.Control,
																									'DataCSS' : parameters.DataCSS}); }
		if (parameters.ValidateFor == Structures.Validators.Contents) { this.validateInformation({'Control' : parameters.Control, 
																								  'QuestText' : parameters.WithData});}
	},
	
	/**
	 * Validate Captions for GUI objects on Personal Information Page.
	 *
	 * @param {Structures.Profile} Control is the object on the page to be validated.
	 */
	validateCaptions :  function(parameters) {
		switch(parameters.Control) {
			case Structures.Profile.PrimaryName:
				//--- Validate Caption For - Personal Information - Primary or First Name
				Commons.verify({'Message' : 'Validate Caption For - Personal Information - Primary or First Name is : ' + Controls.cx.page.PersonalInformation.Profile.Names.Primary.caption,
								'Control' : Controls.cx.page.PersonalInformation.Profile.Names.Primary.label,
								'ControlType' : Structures.Locators.CSS,
								'QuestText' : Controls.cx.page.PersonalInformation.Profile.Names.Primary.caption});
				break;

			case Structures.Profile.MiddleName:
				//--- Validate Caption For - Personal Information - Middle Initial
				Commons.verify({'Message' : 'Validate Caption For - Personal Information - Middle Initial is : ' + Controls.cx.page.PersonalInformation.Profile.Names.Middle.caption,
								'Control' : Controls.cx.page.PersonalInformation.Profile.Names.Middle.label,
								'ControlType' : Structures.Locators.CSS,
								'QuestText' : Controls.cx.page.PersonalInformation.Profile.Names.Middle.caption});
				break;

			case Structures.Profile.LastName:
				//--- Validate Caption For - Personal Information - Last Name
				Commons.verify({'Message' : 'Validate Caption For - Personal Information - Last Name is : ' + Controls.cx.page.PersonalInformation.Profile.Names.Last.caption,
								'Control' : Controls.cx.page.PersonalInformation.Profile.Names.Last.label,
								'ControlType' : Structures.Locators.CSS,
								'QuestText' : Controls.cx.page.PersonalInformation.Profile.Names.Last.caption});
				break;

			case Structures.Profile.Gender:
				//--- Validate Caption For - Personal Information - Gender
				Commons.verify({'Message' : 'Validate Caption For - Personal Information - Gender is : ' + Controls.cx.page.PersonalInformation.Profile.Gender.caption,
								'Control' : Controls.cx.page.PersonalInformation.Profile.Gender.label,
								'ControlType' : Structures.Locators.CSS,
								'QuestText' : Controls.cx.page.PersonalInformation.Profile.Gender.caption});
				break;

			case Structures.Profile.Birthdate:
				//--- Validate Caption For - Personal Information - Birthdate
				Commons.verify({'Message' : 'Validate Caption For - Personal Information - Birthdate is : ' + Controls.cx.page.PersonalInformation.Profile.DOB.caption,
								'Control' : Controls.cx.page.PersonalInformation.Profile.DOB.label,
								'ControlType' : Structures.Locators.CSS,
								'QuestText' : Controls.cx.page.PersonalInformation.Profile.DOB.caption});
				break;

			case Structures.Profile.DOBMonth:
				this.validateCaptions({'Control' : Structures.Profile.Birthdate});
				break;

			case Structures.Profile.DOBDate:
				this.validateCaptions({'Control' : Structures.Profile.Birthdate});
				break;

			case Structures.Profile.DOBYear:
				this.validateCaptions({'Control' : Structures.Profile.Birthdate});
				break;

			case Structures.Profile.SSNumber:
				//--- Validate Caption For - Personal Information - Social Security Number
				Commons.verify({'Message' : 'Validate Caption For - Personal Information - Social Security Number is : ' + Controls.cx.page.PersonalInformation.Profile.SSN.caption,
								'Control' : Controls.cx.page.PersonalInformation.Profile.SSN.label,
								'ControlType' : Structures.Locators.CSS,
								'QuestText' : Controls.cx.page.PersonalInformation.Profile.SSN.caption});
				break;

			case Structures.Profile.AlternateIdentifier:
				//--- Validate Caption For - Personal Information - Alternate Identifier Number
				Commons.verify({'Message' : 'Validate Caption For - Personal Information - Alternate Identifier Number is : ' + Controls.cx.page.PersonalInformation.Profile.SSN.AlternateIdentifier.caption,
								'Control' : Controls.cx.page.PersonalInformation.Profile.SSN.AlternateIdentifier.label,
								'ControlType' : Structures.Locators.CSS,
								'QuestText' : Controls.cx.page.PersonalInformation.Profile.SSN.AlternateIdentifier.caption});
				break;
				
			case Structures.Profile.ContactStreet:
				//--- Validate Caption For - Personal Information - Service or Contact Address Street
				Commons.verify({'Message' : 'Validate Caption For - Personal Information - Service or Contact Address Street is : ' + Controls.cx.page.PersonalInformation.Contact.Address.Street.caption,
								'Control' : Controls.cx.page.PersonalInformation.Contact.Address.Street.label,
								'ControlType' : Structures.Locators.CSS,
								'QuestText' : Controls.cx.page.PersonalInformation.Contact.Address.Street.caption});
				break;

			case Structures.Profile.ContactCity:
				//--- Validate Caption For - Personal Information - Service or Contact Address City
				Commons.verify({'Message' : 'Validate Caption For - Personal Information - Service or Contact Address City is : ' + Controls.cx.page.PersonalInformation.Contact.Address.City.caption,
								'Control' : Controls.cx.page.PersonalInformation.Contact.Address.City.label,
								'ControlType' : Structures.Locators.CSS,
								'QuestText' : Controls.cx.page.PersonalInformation.Contact.Address.City.caption});
				break;

			case this.ContactState:
				//--- Validate Caption For - Personal Information - Service or Contact Address State
				Commons.verify({'Message' : 'Validate Caption For - Personal Information - Service or Contact Address State is : ' + Controls.cx.page.PersonalInformation.Contact.Address.State.caption,
								'Control' : Controls.cx.page.PersonalInformation.Contact.Address.State.label,
								'ControlType' : Structures.Locators.CSS,
								'QuestText' : Controls.cx.page.PersonalInformation.Contact.Address.State.caption});
				break;

			case Structures.Profile.ContactZip:
				//--- Validate Caption For - Personal Information - Service or Contact Address ZipCode
				Commons.verify({'Message' : 'Validate Caption For - Personal Information - Service or Contact Address ZipCode is : ' + Controls.cx.page.PersonalInformation.Contact.Address.Zip.caption,
								'Control' : Controls.cx.page.PersonalInformation.Contact.Address.Zip.label,
								'ControlType' : Structures.Locators.CSS,
								'QuestText' : Controls.cx.page.PersonalInformation.Contact.Address.Zip.caption});
				break;

			case Structures.Profile.MailingAddress:
				//--- Validate Caption For - Personal Information - Different Mailing Address 
				Commons.verify({'Message' : 'Validate Caption For - Personal Information - Different Mailing Address is : ' + Controls.cx.page.PersonalInformation.Contact.MailingAddress.Different.caption,
								'Control' : Controls.cx.page.PersonalInformation.Contact.MailingAddress.Different.label,
								'ControlType' : Structures.Locators.CSS,
								'QuestText' : Controls.cx.page.PersonalInformation.Contact.MailingAddress.Different.caption});
				break;

			case Structures.Profile.MailingAddressStreet:
				//--- Validate Caption For - Personal Information - Different Mailing Address Street
				Commons.verify({'Message' : 'Validate Caption For - Personal Information - Different Mailing Address Street is : ' + Controls.cx.page.PersonalInformation.Contact.MailingAddress.Street.caption,
								'Control' : Controls.cx.page.PersonalInformation.Contact.MailingAddress.Street.label,
								'ControlType' : Structures.Locators.CSS,
								'QuestText' : Controls.cx.page.PersonalInformation.Contact.MailingAddress.Street.caption});
				break;

			case Structures.Profile.MailingAddressCity:
				//--- Validate Caption For - Personal Information - Different Mailing Address City
				Commons.verify({'Message' : 'Validate Caption For - Personal Information - Different Mailing Address City is : ' + Controls.cx.page.PersonalInformation.Contact.MailingAddress.City.caption,
								'Control' : Controls.cx.page.PersonalInformation.Contact.MailingAddress.City.label,
								'ControlType' : Structures.Locators.CSS,
								'QuestText' : Controls.cx.page.PersonalInformation.Contact.MailingAddress.City.caption});
				break;

			case Structures.Profile.MailingAddressState:
				//--- Validate Caption For - Personal Information - Different Mailing Address State
				Commons.verify({'Message' : 'Validate Caption For - Personal Information - Different Mailing Address State is : ' + Controls.cx.page.PersonalInformation.Contact.MailingAddress.State.caption,
								'Control' : Controls.cx.page.PersonalInformation.Contact.MailingAddress.State.label,
								'ControlType' : Structures.Locators.CSS,
								'QuestText' : Controls.cx.page.PersonalInformation.Contact.MailingAddress.State.caption});
				break;

			case Structures.Profile.MailingAddressZip:
				//--- Validate Caption For - Personal Information - Different Mailing Address ZipCode
				Commons.verify({'Message' : 'Validate Caption For - Personal Information - Different Mailing Address ZipCode is : ' + Controls.cx.page.PersonalInformation.Contact.MailingAddress.Zip.caption,
								'Control' : Controls.cx.page.PersonalInformation.Contact.MailingAddress.Zip.label,
								'ControlType' : Structures.Locators.CSS,
								'QuestText' : Controls.cx.page.PersonalInformation.Contact.MailingAddress.Zip.caption});
				break;

			case Structures.Profile.PhoneType:
				//--- Validate Caption For - Personal Information - Phone Category
				Commons.verify({'Message' : 'Validate Caption For - Personal Information - Phone Category is : ' + Controls.cx.page.PersonalInformation.Contact.Phone.Category.caption,
								'Control' : Controls.cx.page.PersonalInformation.Contact.Phone.Category.label,
								'ControlType' : Structures.Locators.CSS,
								'QuestText' : Controls.cx.page.PersonalInformation.Contact.Phone.Category.caption});
				break;

			case Structures.Profile.PhoneNumber:
				//--- Validate Caption For - Personal Information - Phone Number
				Commons.verify({'Message' : 'Validate Caption For - Personal Information - Phone Number is : ' + Controls.cx.page.PersonalInformation.Contact.Phone.Number.caption,
								'Control' : Controls.cx.page.PersonalInformation.Contact.Phone.Number.label,
								'ControlType' : Structures.Locators.CSS,
								'QuestText' : Controls.cx.page.PersonalInformation.Contact.Phone.Number.caption});
				break;

			case Structures.Profile.EmailAddress:
				//--- Validate Caption For - Personal Information - Email Address
				Commons.verify({'Message' : 'Validate Caption For - Personal Information - Email Address is : ' + Controls.cx.page.PersonalInformation.Contact.Email.caption,
								'Control' : Controls.cx.page.PersonalInformation.Contact.Email.label,
								'ControlType' : Structures.Locators.CSS,
								'QuestText' : Controls.cx.page.PersonalInformation.Contact.Email.caption});
				break;

			case Structures.Profile.GoPaperless:
				//--- Validate Caption For - Personal Information - Go Paperless
				Commons.verify({'Message' : 'Validate Caption For - Personal Information - Go Paperless is : ' + Controls.cx.page.PersonalInformation.Contact.Paperless.caption,
								'Control' : Controls.cx.page.PersonalInformation.Contact.Paperless.label,
								'ControlType' : Structures.Locators.CSS,
								'QuestText' : Controls.cx.page.PersonalInformation.Contact.Paperless.caption});
				break;

			case Structures.Profile.BrokerWorked:
				//--- Validate Caption For - Personal Information - Has Broker
				Commons.verify({'Message' : 'Validate Caption For - Personal Information - Has Broker is : ' + Controls.cx.page.PersonalInformation.Contact.Broker.IsPresent.caption,
								'Control' : Controls.cx.page.PersonalInformation.Contact.Broker.IsPresent.label,
								'ControlType' : Structures.Locators.CSS,
								'QuestText' : Controls.cx.page.PersonalInformation.Contact.Broker.IsPresent.caption});
				break;

			case Structures.Profile.BrokerNumber:
				//--- Validate Caption For - Personal Information - Broker Number
				Commons.verify({'Message' : 'Validate Caption For - Personal Information - Broker Number is : ' + Controls.cx.page.PersonalInformation.Contact.Broker.Identifier.caption,
								'Control' : Controls.cx.page.PersonalInformation.Contact.Broker.Identifier.label,
								'ControlType' : Structures.Locators.CSS,
								'QuestText' : Controls.cx.page.PersonalInformation.Contact.Broker.Identifier.caption});
				break;

			case Structures.Profile.BrokerName:
				//--- Validate Caption For - Personal Information - Broker Name
				Commons.verify({'Message' : 'Validate Caption For - Personal Information - Broker Name is : ' + Controls.cx.page.PersonalInformation.Contact.Broker.Name.caption,
								'Control' : Controls.cx.page.PersonalInformation.Contact.Broker.Name.label,
								'ControlType' : Structures.Locators.CSS,
								'QuestText' : Controls.cx.page.PersonalInformation.Contact.Broker.Name.caption});

			case Structures.Profile.Next:
				this.validateCaptions({'Control' : Structures.Profile.ValidateAll});
				break;
				
			case Structures.Profile.ValidateAll:
				this.validateCaptions({'Control' : Structures.Profile.PrimaryName});
				this.validateCaptions({'Control' : Structures.Profile.MiddleName});
				this.validateCaptions({'Control' : Structures.Profile.LastName});
				this.validateCaptions({'Control' : Structures.Profile.Gender});
				this.validateCaptions({'Control' : Structures.Profile.Birthdate});
				this.validateCaptions({'Control' : Structures.Profile.DOBMonth});
				this.validateCaptions({'Control' : Structures.Profile.DOBDate});
				this.validateCaptions({'Control' : Structures.Profile.DOBYear});
				this.validateCaptions({'Control' : Structures.Profile.SSNumber});
				this.validateCaptions({'Control' : Structures.Profile.AlternateIdentifier});
				this.validateCaptions({'Control' : Structures.Profile.ContactStreet});
				this.validateCaptions({'Control' : Structures.Profile.ContactCity});
				this.validateCaptions({'Control' : Structures.Profile.ContactState});
				this.validateCaptions({'Control' : Structures.Profile.ContactZip});
				this.validateCaptions({'Control' : Structures.Profile.MailingAddress});
				this.validateCaptions({'Control' : Structures.Profile.MailingAddressStreet});
				this.validateCaptions({'Control' : Structures.Profile.MailingAddressCity});
				this.validateCaptions({'Control' : Structures.Profile.MailingAddressState});
				this.validateCaptions({'Control' : Structures.Profile.MailingAddressZip});
				this.validateCaptions({'Control' : Structures.Profile.PhoneType});
				this.validateCaptions({'Control' : Structures.Profile.PhoneNumber});
				this.validateCaptions({'Control' : Structures.Profile.EmailAddress});
				this.validateCaptions({'Control' : Structures.Profile.GoPaperless});
				this.validateCaptions({'Control' : Structures.Profile.BrokerWorked});
				this.validateCaptions({'Control' : Structures.Profile.BrokerNumber});
				this.validateCaptions({'Control' : Structures.Profile.BrokerName});
				this.validateCaptions({'Control' : Structures.Profile.Next});
				break;
			
			default:
				break;
		}
	},

	/**
	 * Validate Placeholders for GUI objects on Personal Information Page.
	 *
	 * @param {Structures.Profile} Control is the object on the page to be validated.
	 */
	validatePlaceholders : function(parameters) {

		switch(parameters.Control) {
			case Structures.Profile.PrimaryName:
				//--- Validate Placeholder - Personal Information - First Name
				Commons.verify({'Message' : 'Validate Placeholder - Personal Information - First Name is : ' + Controls.cx.page.PersonalInformation.Profile.Names.Primary.input.defaults,
								'Control' : Controls.cx.page.PersonalInformation.Profile.Names.Primary.input.textbox,
								'ControlType' : Structures.Locators.CSS,
								'Attribute' : Controls.cx.page.PersonalInformation.Profile.Names.Primary.input.attribute,
								'Value' : Controls.cx.page.PersonalInformation.Profile.Names.Primary.input.defaults});
				break;

			case Structures.Profile.MiddleName:
				//--- Validate Placeholder - Personal Information - Middle Initial
				Commons.verify({'Message' : 'Validate Placeholder - Personal Information - Middle Initial is : ' + Controls.cx.page.PersonalInformation.Profile.Names.Middle.input.defaults,
								'Control' : Controls.cx.page.PersonalInformation.Profile.Names.Middle.input.textbox,
								'ControlType' : Structures.Locators.CSS,
								'Attribute' : Controls.cx.page.PersonalInformation.Profile.Names.Middle.input.attribute,
								'Value' : Controls.cx.page.PersonalInformation.Profile.Names.Middle.input.defaults});
				break;

			case Structures.Profile.LastName:
				//--- Validate Placeholder - Personal Information - Last Name
				Commons.verify({'Message' : 'Validate Placeholder - Personal Information - Last Name is : ' + Controls.cx.page.PersonalInformation.Profile.Names.Last.input.defaults,
								'Control' : Controls.cx.page.PersonalInformation.Profile.Names.Last.input.textbox,
								'ControlType' : Structures.Locators.CSS,
								'Attribute' : Controls.cx.page.PersonalInformation.Profile.Names.Last.input.attribute,
								'Value' : Controls.cx.page.PersonalInformation.Profile.Names.Last.input.defaults});
				break;

			case Structures.Profile.Gender:
				var _index = parseInt(Controls.cx.page.PersonalInformation.Profile.Gender.input.selectedindex)
				//--- Validate Placeholder - Personal Information - Gender
				Commons.verify({'Message' : 'Validate Placeholder - Personal Information - Gender is : ' + Controls.cx.page.PersonalInformation.Profile.Gender.input.items[_index],
								'Control' : Controls.cx.page.PersonalInformation.Profile.Gender.input.select,
								'ControlType' : Structures.Locators.CSS,
								'Attribute' : Controls.cx.page.PersonalInformation.Profile.Gender.input.selected,
								'Value' : Controls.cx.page.PersonalInformation.Profile.Gender.input.items[_index]});
				break;

			case Structures.Profile.DOBMonth:
				//--- Validate Placeholder - Personal Information - Birthdate Month
				Commons.verify({'Message' : 'Validate Placeholder - Personal Information - Birthdate Month is : ' + Controls.cx.page.PersonalInformation.Profile.DOB.input.Month.defaults,
								'Control' : Controls.cx.page.PersonalInformation.Profile.DOB.input.Month.selector,
								'ControlType' : Structures.Locators.CSS,
								'Attribute' : Controls.cx.page.PersonalInformation.Profile.DOB.input.Month.attribute,
								'Value' : Controls.cx.page.PersonalInformation.Profile.DOB.input.Month.defaults});

				//--- Validate Data Range - Personal Information - Birthdate Month
				Commons.verify({'Message' : 'Validate Data Range - Personal Information - Birthdate Month is : ' + Controls.cx.page.PersonalInformation.Profile.DOB.input.Month.range.values,
								'Control' : Controls.cx.page.PersonalInformation.Profile.DOB.input.Month.selector,
								'ControlType' : Structures.Locators.CSS,
								'Attribute' : Controls.cx.page.PersonalInformation.Profile.DOB.input.Month.range.attribute,
								'Value' : Controls.cx.page.PersonalInformation.Profile.DOB.input.Month.range.values});

				//--- Validate Data Pattern - Personal Information - Birthdate Month
				Commons.verify({'Message' : 'Validate Data Pattern - Personal Information - Birthdate Month is : ' + Controls.cx.page.PersonalInformation.Profile.DOB.input.Month.pattern.values,
								'Control' : Controls.cx.page.PersonalInformation.Profile.DOB.input.Month.selector,
								'ControlType' : Structures.Locators.CSS,
								'Attribute' : Controls.cx.page.PersonalInformation.Profile.DOB.input.Month.pattern.attribute,
								'Value' : Controls.cx.page.PersonalInformation.Profile.DOB.input.Month.pattern.values});
				break;

			case Structures.Profile.DOBDate:
				//--- Validate Placeholder - Personal Information - Birthdate Day
				Commons.verify({'Message' : 'Validate Placeholder - Personal Information - Birthdate Day is : ' + Controls.cx.page.PersonalInformation.Profile.DOB.input.Day.defaults,
								'Control' : Controls.cx.page.PersonalInformation.Profile.DOB.input.Day.selector,
								'ControlType' : Structures.Locators.CSS,
								'Attribute' : Controls.cx.page.PersonalInformation.Profile.DOB.input.Day.attribute,
								'Value' : Controls.cx.page.PersonalInformation.Profile.DOB.input.Day.defaults});

				//--- Validate Data Range - Personal Information - Birthdate Day
				Commons.verify({'Message' : 'Validate Data Range - Personal Information - Birthdate Day is : ' + Controls.cx.page.PersonalInformation.Profile.DOB.input.Day.range.values,
								'Control' : Controls.cx.page.PersonalInformation.Profile.DOB.input.Day.selector,
								'ControlType' : Structures.Locators.CSS,
								'Attribute' : Controls.cx.page.PersonalInformation.Profile.DOB.input.Day.range.attribute,
								'Value' : Controls.cx.page.PersonalInformation.Profile.DOB.input.Day.range.values});

				//--- Validate Data Pattern - Personal Information - Birthdate Day
				Commons.verify({'Message' : 'Validate Data Pattern - Personal Information - Birthdate Day is : ' + Controls.cx.page.PersonalInformation.Profile.DOB.input.Day.pattern.values,
								'Control' : Controls.cx.page.PersonalInformation.Profile.DOB.input.Day.selector,
								'ControlType' : Structures.Locators.CSS,
								'Attribute' : Controls.cx.page.PersonalInformation.Profile.DOB.input.Day.pattern.attribute,
								'Value' : Controls.cx.page.PersonalInformation.Profile.DOB.input.Day.pattern.values});
				break;

			case Structures.Profile.DOBYear:
				//--- Validate Placeholder - Personal Information - Birthdate Year
				Commons.verify({'Message' : 'Validate Placeholder - Personal Information - Birthdate Year is : ' + Controls.cx.page.PersonalInformation.Profile.DOB.input.Year.defaults,
								'Control' : Controls.cx.page.PersonalInformation.Profile.DOB.input.Year.selector,
								'ControlType' : Structures.Locators.CSS,
								'Attribute' : Controls.cx.page.PersonalInformation.Profile.DOB.input.Year.attribute,
								'Value' : Controls.cx.page.PersonalInformation.Profile.DOB.input.Year.defaults});

				//--- Validate Data Pattern - Personal Information - Birthdate Year
				Commons.verify({'Message' : 'Validate Data Pattern - Personal Information - Birthdate Year is : ' + Controls.cx.page.PersonalInformation.Profile.DOB.input.Year.pattern.values,
								'Control' : Controls.cx.page.PersonalInformation.Profile.DOB.input.Year.selector,
								'ControlType' : Structures.Locators.CSS,
								'Attribute' : Controls.cx.page.PersonalInformation.Profile.DOB.input.Year.pattern.attribute,
								'Value' : Controls.cx.page.PersonalInformation.Profile.DOB.input.Year.pattern.values});
				break;

			case Structures.Profile.SSNumber:
				//--- Validate Placeholder - Personal Information - Social Security Number
				Commons.verify({'Message' : 'Validate Placeholder - Personal Information - Social Security Number is : ' + Controls.cx.page.PersonalInformation.Profile.SSN.input.defaults,
								'Control' : Controls.cx.page.PersonalInformation.Profile.SSN.textbox,
								'ControlType' : Structures.Locators.CSS,
								'Attribute' : Controls.cx.page.PersonalInformation.Profile.SSN.attribute,
								'Value' : Controls.cx.page.PersonalInformation.Profile.SSN.input.defaults});
				break;

			case Structures.Profile.AlternateIdentifier:
				//--- Validate Placeholder - Personal Information - Alternative Identifier Number
				Commons.verify({'Message' : 'Validate Placeholder - Personal Information - Alternative Identifier Number is : ' + Controls.cx.page.PersonalInformation.Profile.SSN.AlternateIdentifier.input.defaults,
								'Control' : Controls.cx.page.PersonalInformation.Profile.SSN.AlternateIdentifier.textbox,
								'ControlType' : Structures.Locators.CSS,
								'Attribute' : Controls.cx.page.PersonalInformation.Profile.SSN.AlternateIdentifier.attribute,
								'Value' : Controls.cx.page.PersonalInformation.Profile.SSN.AlternateIdentifier.input.defaults});
				break;

			case Structures.Profile.ContactStreet:
				//--- Validate Placeholder - Personal Information - Service Address Street
				Commons.verify({'Message' : 'Validate Placeholder - Personal Information - Service Address Street is : ' + Controls.cx.page.PersonalInformation.Contact.Address.Street.input.defaults,
								'Control' : Controls.cx.page.PersonalInformation.Contact.Address.Street.input.textbox,
								'ControlType' : Structures.Locators.CSS,
								'Attribute' : Controls.cx.page.PersonalInformation.Contact.Address.Street.input.attribute,
								'Value' : Controls.cx.page.PersonalInformation.Contact.Address.Street.input.defaults});
				break;

			case Structures.Profile.ContactCity:
				//--- Validate Placeholder - Personal Information - Service Address City
				Commons.verify({'Message' : 'Validate Placeholder - Personal Information - Service Address City is : ' + Controls.cx.page.PersonalInformation.Contact.Address.City.input.defaults,
								'Control' : Controls.cx.page.PersonalInformation.Contact.Address.City.input.textbox,
								'ControlType' : Structures.Locators.CSS,
								'Attribute' : Controls.cx.page.PersonalInformation.Contact.Address.City.input.attribute,
								'Value' : Controls.cx.page.PersonalInformation.Contact.Address.City.input.defaults});
				break;

			case this.ContactState:
				//--- Validate Placeholder - Personal Information - Service Address State
				Commons.verify({'Message' : 'Validate Placeholder - Personal Information - Service Address State is : ' + Controls.cx.page.PersonalInformation.Contact.Address.City.input.defaults,
								'Control' : Controls.cx.page.PersonalInformation.Contact.Address.State.input.textbox,
								'ControlType' : Structures.Locators.CSS,
								'Attribute' : Controls.cx.page.PersonalInformation.Contact.Address.State.input.attribute,
								'Value' : Controls.cx.page.PersonalInformation.Contact.Address.State.input.defaults});
				break;

			case Structures.Profile.ContactZip:
				//--- Validate Placeholder - Personal Information - Service Address ZipCode
				Commons.verify({'Message' : 'Validate Placeholder - Personal Information - Service Address ZipCode is : ' + Controls.cx.page.PersonalInformation.Contact.Address.Zip.input.defaults,
								'Control' : Controls.cx.page.PersonalInformation.Contact.Address.Zip.input.textbox,
								'ControlType' : Structures.Locators.CSS,
								'Attribute' : Controls.cx.page.PersonalInformation.Contact.Address.Zip.input.attribute,
								'Value' : Controls.cx.page.PersonalInformation.Contact.Address.Zip.input.defaults});
				break;

			case Structures.Profile.MailingAddress:
				this.validatePlaceholders({'Control' : Structures.Profile.MailingAddressStreet});
				this.validatePlaceholders({'Control' : Structures.Profile.MailingAddressCity});
				this.validatePlaceholders({'Control' : Structures.Profile.MailingAddressState});
				this.validatePlaceholders({'Control' : Structures.Profile.MailingAddressZip});
				break;

			case Structures.Profile.MailingAddressStreet:
				//--- Validate Placeholder - Personal Information - Different Mailing Address Street
				Commons.verify({'Message' : 'Validate Placeholder - Personal Information - Different Mailing Address Street is : ' + Controls.cx.page.PersonalInformation.Contact.MailingAddress.Street.input.defaults,
								'Control' : Controls.cx.page.PersonalInformation.Contact.MailingAddress.Street.input.textbox,
								'ControlType' : Structures.Locators.CSS,
								'Attribute' : Controls.cx.page.PersonalInformation.Contact.MailingAddress.Street.input.attribute,
								'Value' : Controls.cx.page.PersonalInformation.Contact.MailingAddress.Street.input.defaults});
				break;

			case Structures.Profile.MailingAddressCity:
				//--- Validate Placeholder - Personal Information - Different Mailing Address City
				Commons.verify({'Message' : 'Validate Placeholder - Personal Information - Different Mailing Address City is : ' + Controls.cx.page.PersonalInformation.Contact.MailingAddress.City.input.defaults,
								'Control' : Controls.cx.page.PersonalInformation.Contact.MailingAddress.City.input.textbox,
								'ControlType' : Structures.Locators.CSS,
								'Attribute' : Controls.cx.page.PersonalInformation.Contact.MailingAddress.City.input.attribute,
								'Value' : Controls.cx.page.PersonalInformation.Contact.MailingAddress.City.input.defaults});
				break;

			case Structures.Profile.MailingAddressState:
				//--- Validate Placeholder - Personal Information - Different Mailing Address State
				Commons.verify({'Message' : 'Validate Placeholder - Personal Information - Different Mailing Address State is : ' + Controls.cx.page.PersonalInformation.Contact.MailingAddress.State.input.defaults,
								'Control' : Controls.cx.page.PersonalInformation.Contact.MailingAddress.State.input.textbox,
								'ControlType' : Structures.Locators.CSS,
								'Attribute' : Controls.cx.page.PersonalInformation.Contact.MailingAddress.State.input.attribute,
								'Value' : Controls.cx.page.PersonalInformation.Contact.MailingAddress.State.input.defaults});
				break;

			case Structures.Profile.MailingAddressZip:
				//--- Validate Placeholder - Personal Information - Different Mailing Address Zip
				Commons.verify({'Message' : 'Validate Placeholder - Personal Information - Different Mailing Address Zip is : ' + Controls.cx.page.PersonalInformation.Contact.MailingAddress.Zip.input.defaults,
								'Control' : Controls.cx.page.PersonalInformation.Contact.MailingAddress.Zip.input.textbox,
								'ControlType' : Structures.Locators.CSS,
								'Attribute' : Controls.cx.page.PersonalInformation.Contact.MailingAddress.Zip.input.attribute,
								'Value' : Controls.cx.page.PersonalInformation.Contact.MailingAddress.Zip.input.defaults});
				break;

			case Structures.Profile.PhoneType:
				//--- Validate Placeholder - Personal Information - Phone Category
				Commons.verify({'Message' : 'Validate Placeholder - Personal Information - Phone Category is : ' + Controls.cx.page.PersonalInformation.Contact.Phone.Category.input.defaults,
								'Control' : Controls.cx.page.PersonalInformation.Contact.Phone.Category.input.select,
								'ControlType' : Structures.Locators.CSS,
								'Attribute' : Controls.cx.page.PersonalInformation.Contact.Phone.Category.input.attribute,
								'Value' : Controls.cx.page.PersonalInformation.Contact.Phone.Category.input.defaults});
				break;

			case Structures.Profile.PhoneNumber:
				//--- Validate Placeholder - Personal Information - Phone Number
				Commons.verify({'Message' : 'Validate Placeholder - Personal Information - Phone Number is : ' + Controls.cx.page.PersonalInformation.Contact.Phone.Number.input.defaults,
								'Control' : Controls.cx.page.PersonalInformation.Contact.Phone.Number.input.textbox,
								'ControlType' : Structures.Locators.CSS,
								'Attribute' : Controls.cx.page.PersonalInformation.Contact.Phone.Number.input.attribute,
								'Value' : Controls.cx.page.PersonalInformation.Contact.Phone.Number.input.defaults});
				break;

			case Structures.Profile.EmailAddress:
				//--- Validate Placeholder - Personal Information - Email Address
				Commons.verify({'Message' : 'Validate Placeholder - Personal Information - Email Address is : ' + Controls.cx.page.PersonalInformation.Contact.Email.input.defaults,
								'Control' : Controls.cx.page.PersonalInformation.Contact.Email.input.textbox,
								'ControlType' : Structures.Locators.CSS,
								'Attribute' : Controls.cx.page.PersonalInformation.Contact.Email.input.attribute,
								'Value' : Controls.cx.page.PersonalInformation.Contact.Email.input.defaults});
				break;

			case Structures.Profile.GoPaperless:
				break;

			case Structures.Profile.BrokerWorked:
				this.validatePlaceholders({'Control' : Structures.Profile.BrokerNumber});
				this.validatePlaceholders({'Control' : Structures.Profile.BrokerName});
				break;

			case Structures.Profile.BrokerNumber:
				//--- Validate Placeholder - Personal Information - Broker Number
				Commons.verify({'Message' : 'Validate Placeholder - Personal Information - Broker Number is : ' + Controls.cx.page.PersonalInformation.Contact.Broker.Identifier.input.defaults,
								'Control' : Controls.cx.page.PersonalInformation.Contact.Broker.Identifier.input.textbox,
								'ControlType' : Structures.Locators.CSS,
								'Attribute' : Controls.cx.page.PersonalInformation.Contact.Broker.Identifier.input.attribute,
								'Value' : Controls.cx.page.PersonalInformation.Contact.Broker.Identifier.input.defaults});
				break;

			case Structures.Profile.BrokerName:
				//--- Validate Placeholder - Personal Information - Broker Name
				Commons.verify({'Message' : 'Validate Placeholder - Personal Information - Broker Name is : ' + Controls.cx.page.PersonalInformation.Contact.Broker.Name.input.defaults,
								'Control' : Controls.cx.page.PersonalInformation.Contact.Broker.Name.input.textbox,
								'ControlType' : Structures.Locators.CSS,
								'Attribute' : Controls.cx.page.PersonalInformation.Contact.Broker.Name.input.attribute,
								'Value' : Controls.cx.page.PersonalInformation.Contact.Broker.Name.input.defaults});
				break;

			case Structures.Profile.Next:
				this.validatePlaceholders({'Control' : Structures.Profile.ValidateAll});
				break;
			
			case Structures.Profile.ValidateAll:
				this.validatePlaceholders({'Control' : Structures.Profile.PrimaryName});
				this.validatePlaceholders({'Control' : Structures.Profile.MiddleName});
				this.validatePlaceholders({'Control' : Structures.Profile.LastName});
				this.validatePlaceholders({'Control' : Structures.Profile.Gender});
				this.validatePlaceholders({'Control' : Structures.Profile.Birthdate});
				this.validatePlaceholders({'Control' : Structures.Profile.DOBMonth});
				this.validatePlaceholders({'Control' : Structures.Profile.DOBDate});
				this.validatePlaceholders({'Control' : Structures.Profile.DOBYear});
				this.validatePlaceholders({'Control' : Structures.Profile.SSNumber});
				this.validatePlaceholders({'Control' : Structures.Profile.AlternateIdentifier});
				this.validatePlaceholders({'Control' : Structures.Profile.ContactStreet});
				this.validatePlaceholders({'Control' : Structures.Profile.ContactCity});
				this.validatePlaceholders({'Control' : Structures.Profile.ContactState});
				this.validatePlaceholders({'Control' : Structures.Profile.ContactZip});
				this.validatePlaceholders({'Control' : Structures.Profile.MailingAddress});
				this.validatePlaceholders({'Control' : Structures.Profile.MailingAddressStreet});
				this.validatePlaceholders({'Control' : Structures.Profile.MailingAddressCity});
				this.validatePlaceholders({'Control' : Structures.Profile.MailingAddressState});
				this.validatePlaceholders({'Control' : Structures.Profile.MailingAddressZip});
				this.validatePlaceholders({'Control' : Structures.Profile.PhoneType});
				this.validatePlaceholders({'Control' : Structures.Profile.PhoneNumber});
				this.validatePlaceholders({'Control' : Structures.Profile.EmailAddress});
				this.validatePlaceholders({'Control' : Structures.Profile.GoPaperless});
				this.validatePlaceholders({'Control' : Structures.Profile.BrokerWorked});
				this.validatePlaceholders({'Control' : Structures.Profile.BrokerNumber});
				this.validatePlaceholders({'Control' : Structures.Profile.BrokerName});
				this.validatePlaceholders({'Control' : Structures.Profile.Next});
				break;
			
			default:
				break;
		}
	},

	/**
	 * Validate errors on Personal Information Page.
	 *
	 * @param {Structures.Profile} Control is the object on the page to be validated.
	 * @param {Structures.MessageLocations} MessageLocation where the message/error displayed is to be validated.	 
	 */
	validateErrors :  function(parameters) {
		var _control = '';
		switch(parameters.Control) {
			case Structures.Profile.PrimaryName:
				_control = '';
				if (parameters.MessageLocation == Structures.MessageLocations.Header) { _control = Controls.cx.page.PersonalInformation.Profile.Names.Primary.error.ontop; }
				if (parameters.MessageLocation == Structures.MessageLocations.Control) { _control = Controls.cx.page.PersonalInformation.Profile.Names.Primary.error.atcontrol; }
				//--- Validate Error Message At - Personal Information - First Name
				Commons.verify({'Message' : 'Validate Error Message At - Personal Information - First Name is : ' + Controls.cx.page.PersonalInformation.Profile.Names.Primary.error.text,
								'Control' : _control,
								'ControlType' : Structures.Locators.CSS,
								'QuestText' : Controls.cx.page.PersonalInformation.Profile.Names.Primary.error.text});
				break;

			case Structures.Profile.MiddleName:
				_control = '';
				break;

			case Structures.Profile.LastName:
				_control = '';
				if (parameters.MessageLocation == Structures.MessageLocations.Header) { _control = Controls.cx.page.PersonalInformation.Profile.Names.Last.error.ontop; }
				if (parameters.MessageLocation == Structures.MessageLocations.Control) { _control = Controls.cx.page.PersonalInformation.Profile.Names.Last.error.atcontrol; }
				//--- Validate Error Message At - Personal Information - Last Name
				Commons.verify({'Message' : 'Validate Error Message At - Personal Information - Last Name is : ' + Controls.cx.page.PersonalInformation.Profile.Names.Last.error.text,
								'Control' : _control,
								'ControlType' : Structures.Locators.CSS,
								'QuestText' : Controls.cx.page.PersonalInformation.Profile.Names.Last.error.text});
				break;

			case Structures.Profile.Gender:
				_control = '';
				if (parameters.MessageLocation == Structures.MessageLocations.Header) { _control = Controls.cx.page.PersonalInformation.Profile.Gender.error.ontop; }
				if (parameters.MessageLocation == Structures.MessageLocations.Control) { _control = Controls.cx.page.PersonalInformation.Profile.Gender.error.atcontrol; }
				//--- Validate Error Message At - Personal Information - Gender
				Commons.verify({'Message' : 'Validate Error Message At - Personal Information - Gender is : ' + Controls.cx.page.PersonalInformation.Profile.Gender.error.text,
								'Control' : _control,
								'ControlType' : Structures.Locators.CSS,
								'QuestText' : Controls.cx.page.PersonalInformation.Profile.Gender.error.text});
				break;
				
			case Structures.Profile.Birthdate:
				this.validateErrors({'Control' : Structures.Profile.DOBMonth, 'MessageLocation' : parameters.MessageLocation});
				this.validateErrors({'Control' : Structures.Profile.DOBDate, 'MessageLocation' : parameters.MessageLocation});
				this.validateErrors({'Control' : Structures.Profile.DOBYear, 'MessageLocation' : parameters.MessageLocation});
				break;

			case Structures.Profile.DOBMonth:
				_control = '';
				if (parameters.MessageLocation == Structures.MessageLocations.Header) { _control = Controls.cx.page.PersonalInformation.Profile.DOB.Month.error.ontop; }
				if (parameters.MessageLocation == Structures.MessageLocations.Control) { _control = Controls.cx.page.PersonalInformation.Profile.DOB.Month.error.atcontrol; }
				//--- Validate Error Message At - Personal Information - Birthdate Month
				Commons.verify({'Message' : 'Validate Error Message At - Personal Information - Birthdate Month is : ' + Controls.cx.page.PersonalInformation.Profile.DOB.Month.error.text,
								'Control' : _control,
								'ControlType' : Structures.Locators.CSS,
								'QuestText' : Controls.cx.page.PersonalInformation.Profile.DOB.Month.error.text});
				break;

			case Structures.Profile.DOBDate:
				_control = '';
				if (parameters.MessageLocation == Structures.MessageLocations.Header) { _control = Controls.cx.page.PersonalInformation.Profile.DOB.Day.error.ontop; }
				if (parameters.MessageLocation == Structures.MessageLocations.Control) { _control = Controls.cx.page.PersonalInformation.Profile.DOB.Day.error.atcontrol; }
				//--- Validate Error Message At - Personal Information - Birthdate Day
				Commons.verify({'Message' : 'Validate Error Message At - Personal Information - Birthdate Day is : ' + Controls.cx.page.PersonalInformation.Profile.DOB.Day.error.text,
								'Control' : _control,
								'ControlType' : Structures.Locators.CSS,
								'QuestText' : Controls.cx.page.PersonalInformation.Profile.DOB.Day.error.text});
				break;

			case Structures.Profile.DOBYear:
				_control = '';
				if (parameters.MessageLocation == Structures.MessageLocations.Header) { _control = Controls.cx.page.PersonalInformation.Profile.DOB.Year.error.ontop; }
				if (parameters.MessageLocation == Structures.MessageLocations.Control) { _control = Controls.cx.page.PersonalInformation.Profile.DOB.Year.error.atcontrol; }
				//--- Validate Error Message At - Personal Information - Birthdate Year
				Commons.verify({'Message' : 'Validate Error Message At - Personal Information - Birthdate Year is : ' + Controls.cx.page.PersonalInformation.Profile.DOB.Year.error.text,
								'Control' : _control,
								'ControlType' : Structures.Locators.CSS,
								'QuestText' : Controls.cx.page.PersonalInformation.Profile.DOB.Year.error.text});
				break;

			case Structures.Profile.SSNumber:
				_control = '';
				if (parameters.MessageLocation == Structures.MessageLocations.Header) { _control = Controls.cx.page.PersonalInformation.Profile.SSN.error.ontop; }
				if (parameters.MessageLocation == Structures.MessageLocations.Control) { _control = Controls.cx.page.PersonalInformation.Profile.SSN.error.atcontrol; }
				//--- Validate Error Message At - Personal Information - Social Security Number
				Commons.verify({'Message' : 'Validate Error Message At - Personal Information - Social Security Number is : ' + Controls.cx.page.PersonalInformation.Profile.SSN.error.text,
								'Control' : _control,
								'ControlType' : Structures.Locators.CSS,
								'QuestText' : Controls.cx.page.PersonalInformation.Profile.SSN.error.text});
				break;

			case Structures.Profile.AlternateIdentifier:
				_control = '';
				if (parameters.MessageLocation == Structures.MessageLocations.Header) { _control = Controls.cx.page.PersonalInformation.Profile.SSN.AlternateIdentifier.error.ontop; }
				if (parameters.MessageLocation == Structures.MessageLocations.Control) { _control = Controls.cx.page.PersonalInformation.Profile.SSN.AlternateIdentifier.error.atcontrol; }
				//--- Validate Error Message At - Personal Information - Alternate Identifier Number
				Commons.verify({'Message' : 'Validate Error Message At - Personal Information - Alternate Identifier Number is : ' + Controls.cx.page.PersonalInformation.Profile.SSN.AlternateIdentifier.error.text,
								'Control' : _control,
								'ControlType' : Structures.Locators.CSS,
								'QuestText' : Controls.cx.page.PersonalInformation.Profile.SSN.AlternateIdentifier.error.text});
				break;
				
			case Structures.Profile.ContactStreet:
				_control = '';
				if (parameters.MessageLocation == Structures.MessageLocations.Header) { _control = Controls.cx.page.PersonalInformation.Contact.Address.Street.error.ontop; }
				if (parameters.MessageLocation == Structures.MessageLocations.Control) { _control = Controls.cx.page.PersonalInformation.Contact.Address.Street.error.atcontrol; }
				//--- Validate Error Message At - Personal Information - Service Address Street
				Commons.verify({'Message' : 'Validate Error Message At - Personal Information - Service Address Street is : ' + Controls.cx.page.PersonalInformation.Contact.Address.Street.error.text,
								'Control' : _control,
								'ControlType' : Structures.Locators.CSS,
								'QuestText' : Controls.cx.page.PersonalInformation.Contact.Address.Street.error.text});
				break;

			case Structures.Profile.ContactCity:
				_control = '';
				if (parameters.MessageLocation == Structures.MessageLocations.Header) { _control = Controls.cx.page.PersonalInformation.Contact.Address.City.error.ontop; }
				if (parameters.MessageLocation == Structures.MessageLocations.Control) { _control = Controls.cx.page.PersonalInformation.Contact.Address.City.error.atcontrol; }
				//--- Validate Error Message At - Personal Information - Service Address City
				Commons.verify({'Message' : 'Validate Error Message At - Personal Information - Service Address City is : ' + Controls.cx.page.PersonalInformation.Contact.Address.City.error.text,
								'Control' : _control,
								'ControlType' : Structures.Locators.CSS,
								'QuestText' : Controls.cx.page.PersonalInformation.Contact.Address.City.error.text});
				break;

			case this.ContactState:
				_control = '';
				if (parameters.MessageLocation == Structures.MessageLocations.Header) { _control = Controls.cx.page.PersonalInformation.Contact.Address.State.error.ontop; }
				if (parameters.MessageLocation == Structures.MessageLocations.Control) { _control = Controls.cx.page.PersonalInformation.Contact.Address.State.error.atcontrol; }
				//--- Validate Error Message At - Personal Information - Service Address State
				Commons.verify({'Message' : 'Validate Error Message At - Personal Information - Service Address State is : ' + Controls.cx.page.PersonalInformation.Contact.Address.State.error.text,
								'Control' : _control,
								'ControlType' : Structures.Locators.CSS,
								'QuestText' : Controls.cx.page.PersonalInformation.Contact.Address.State.error.text});
				break;

			case Structures.Profile.ContactZip:
				_control = '';
				if (parameters.MessageLocation == Structures.MessageLocations.Header) { _control = Controls.cx.page.PersonalInformation.Contact.Address.Zip.error.ontop; }
				if (parameters.MessageLocation == Structures.MessageLocations.Control) { _control = Controls.cx.page.PersonalInformation.Contact.Address.Zip.error.atcontrol; }
				//--- Validate Error Message At - Personal Information - Service Address ZipCode
				Commons.verify({'Message' : 'Validate Error Message At - Personal Information - Service Address ZipCode is : ' + Controls.cx.page.PersonalInformation.Contact.Address.Zip.error.text,
								'Control' : _control,
								'ControlType' : Structures.Locators.CSS,
								'QuestText' : Controls.cx.page.PersonalInformation.Contact.Address.Zip.error.text});
				break;

			case Structures.Profile.MailingAddress:
				this.validateErrors({'Control' : Structures.Profile.MailingAddressStreet, 'MessageLocation' : parameters.MessageLocation});
				this.validateErrors({'Control' : Structures.Profile.MailingAddressCity, 'MessageLocation' : parameters.MessageLocation});
				this.validateErrors({'Control' : Structures.Profile.MailingAddressState, 'MessageLocation' : parameters.MessageLocation});
				this.validateErrors({'Control' : Structures.Profile.MailingAddressZip, 'MessageLocation' : parameters.MessageLocation});
				break;

			case Structures.Profile.MailingAddressStreet:
				_control = '';
				if (parameters.MessageLocation == Structures.MessageLocations.Header) { _control = Controls.cx.page.PersonalInformation.Contact.MailingAddress.Street.error.ontop; }
				if (parameters.MessageLocation == Structures.MessageLocations.Control) { _control = Controls.cx.page.PersonalInformation.Contact.MailingAddress.Street.error.atcontrol; }
				//--- Validate Error Message At - Personal Information - Mailing Address Street
				Commons.verify({'Message' : 'Validate Error Message At - Personal Information - Mailing Address Street is : ' + Controls.cx.page.PersonalInformation.Contact.MailingAddress.Street.error.text,
								'Control' : _control,
								'ControlType' : Structures.Locators.CSS,
								'QuestText' : Controls.cx.page.PersonalInformation.Contact.MailingAddress.Street.error.text});
				break;

			case Structures.Profile.MailingAddressCity:
				_control = '';
				if (parameters.MessageLocation == Structures.MessageLocations.Header) { _control = Controls.cx.page.PersonalInformation.Contact.MailingAddress.City.error.ontop; }
				if (parameters.MessageLocation == Structures.MessageLocations.Control) { _control = Controls.cx.page.PersonalInformation.Contact.MailingAddress.City.error.atcontrol; }
				//--- Validate Error Message At - Personal Information - Mailing Address City
				Commons.verify({'Message' : 'Validate Error Message At - Personal Information - Mailing Address City is : ' + Controls.cx.page.PersonalInformation.Contact.MailingAddress.City.error.text,
								'Control' : _control,
								'ControlType' : Structures.Locators.CSS,
								'QuestText' : Controls.cx.page.PersonalInformation.Contact.MailingAddress.City.error.text});
				break;

			case Structures.Profile.MailingAddressState:
				_control = '';
				if (parameters.MessageLocation == Structures.MessageLocations.Header) { _control = Controls.cx.page.PersonalInformation.Contact.MailingAddress.State.error.ontop; }
				if (parameters.MessageLocation == Structures.MessageLocations.Control) { _control = Controls.cx.page.PersonalInformation.Contact.MailingAddress.State.error.atcontrol; }
				//--- Validate Error Message At - Personal Information - Mailing Address State
				Commons.verify({'Message' : 'Validate Error Message At - Personal Information - Mailing Address State is : ' + Controls.cx.page.PersonalInformation.Contact.MailingAddress.State.error.text,
								'Control' : _control,
								'ControlType' : Structures.Locators.CSS,
								'QuestText' : Controls.cx.page.PersonalInformation.Contact.MailingAddress.State.error.text});
				break;

			case Structures.Profile.MailingAddressZip:
				_control = '';
				if (parameters.MessageLocation == Structures.MessageLocations.Header) { _control = Controls.cx.page.PersonalInformation.Contact.MailingAddress.Zip.error.ontop; }
				if (parameters.MessageLocation == Structures.MessageLocations.Control) { _control = Controls.cx.page.PersonalInformation.Contact.MailingAddress.Zip.error.atcontrol; }
				//--- Validate Error Message At - Personal Information - Mailing Address ZipCode
				Commons.verify({'Message' : 'Validate Error Message At - Personal Information - Mailing Address ZipCode is : ' + Controls.cx.page.PersonalInformation.Contact.MailingAddress.Zip.error.text,
								'Control' : _control,
								'ControlType' : Structures.Locators.CSS,
								'QuestText' : Controls.cx.page.PersonalInformation.Contact.MailingAddress.Zip.error.text});
				break;

			case Structures.Profile.PhoneType:
				_control = '';
				if (parameters.MessageLocation == Structures.MessageLocations.Header) { _control = Controls.cx.page.PersonalInformation.Contact.Phone.Category.error.ontop; }
				if (parameters.MessageLocation == Structures.MessageLocations.Control) { _control = Controls.cx.page.PersonalInformation.Contact.Phone.Category.error.atcontrol; }
				//--- Validate Error Message At - Personal Information - Phone Category
				Commons.verify({'Message' : 'Validate Error Message At - Personal Information - Phone Category is : ' + Controls.cx.page.PersonalInformation.Contact.Phone.Category.error.text,
								'Control' : _control,
								'ControlType' : Structures.Locators.CSS,
								'QuestText' : Controls.cx.page.PersonalInformation.Contact.Phone.Category.error.text});
				break;

			case Structures.Profile.PhoneNumber:
				_control = '';
				if (parameters.MessageLocation == Structures.MessageLocations.Header) { _control = Controls.cx.page.PersonalInformation.Contact.Phone.Number.error.ontop; }
				if (parameters.MessageLocation == Structures.MessageLocations.Control) { _control = Controls.cx.page.PersonalInformation.Contact.Phone.Number.error.atcontrol; }
				//--- Validate Error Message At - Personal Information - Phone Number
				Commons.verify({'Message' : 'Validate Error Message At - Personal Information - Phone Number is : ' + Controls.cx.page.PersonalInformation.Contact.Phone.Number.error.text,
								'Control' : _control,
								'ControlType' : Structures.Locators.CSS,
								'QuestText' : Controls.cx.page.PersonalInformation.Contact.Phone.Number.error.text});
				break;

			case Structures.Profile.EmailAddress:
				_control = '';
				if (parameters.MessageLocation == Structures.MessageLocations.Header) { _control = Controls.cx.page.PersonalInformation.Contact.Email.error.ontop; }
				if (parameters.MessageLocation == Structures.MessageLocations.Control) { _control = Controls.cx.page.PersonalInformation.Contact.Email.error.atcontrol; }
				//--- Validate Error Message At - Personal Information - Email Address
				Commons.verify({'Message' : 'Validate Error Message At - Personal Information - Email Address is : ' + Controls.cx.page.PersonalInformation.Contact.Email.error.text,
								'Control' : _control,
								'ControlType' : Structures.Locators.CSS,
								'QuestText' : Controls.cx.page.PersonalInformation.Contact.Email.error.text});
				break;

			case Structures.Profile.BrokerNumber:
				_control = '';
				if (parameters.MessageLocation == Structures.MessageLocations.Header) { _control = Controls.cx.page.PersonalInformation.Contact.Broker.Identifier.error.ontop; }
				if (parameters.MessageLocation == Structures.MessageLocations.Control) { _control = Controls.cx.page.PersonalInformation.Contact.Broker.Identifier.error.atcontrol; }
				//--- Validate Error Message At - Personal Information - Broker Number
				Commons.verify({'Message' : 'Validate Error Message At - Personal Information - Broker Number is : ' + Controls.cx.page.PersonalInformation.Contact.Broker.Identifier.error.text,
								'Control' : _control,
								'ControlType' : Structures.Locators.CSS,
								'QuestText' : Controls.cx.page.PersonalInformation.Contact.Broker.Identifier.error.text});
				break;

			case Structures.Profile.Next:
				//--- PrimaryName
				this.validateErrors({'Control' : Structures.Profile.PrimaryName, 'MessageLocation' : Structures.MessageLocations.Header});
				this.validateErrors({'Control' : Structures.Profile.PrimaryName, 'MessageLocation' : Structures.MessageLocations.Control});
				//--- LastName
				this.validateErrors({'Control' : Structures.Profile.LastName, 'MessageLocation' : Structures.MessageLocations.Header});
				this.validateErrors({'Control' : Structures.Profile.LastName, 'MessageLocation' : Structures.MessageLocations.Control});
				//--- Gender
				this.validateErrors({'Control' : Structures.Profile.Gender, 'MessageLocation' : Structures.MessageLocations.Header});
				this.validateErrors({'Control' : Structures.Profile.Gender, 'MessageLocation' : Structures.MessageLocations.Control});
				//--- Birthdate
				this.validateErrors({'Control' : Structures.Profile.Birthdate, 'MessageLocation' : Structures.MessageLocations.Header});
				this.validateErrors({'Control' : Structures.Profile.Birthdate, 'MessageLocation' : Structures.MessageLocations.Control});
				//--- SSNumber
				this.validateErrors({'Control' : Structures.Profile.SSNumber, 'MessageLocation' : Structures.MessageLocations.Header});
				this.validateErrors({'Control' : Structures.Profile.SSNumber, 'MessageLocation' : Structures.MessageLocations.Control});
				//--- AlternateIdentifier
				this.validateErrors({'Control' : Structures.Profile.AlternateIdentifier, 'MessageLocation' : Structures.MessageLocations.Header});
				this.validateErrors({'Control' : Structures.Profile.AlternateIdentifier, 'MessageLocation' : Structures.MessageLocations.Control});
				//--- ContactStreet
				this.validateErrors({'Control' : Structures.Profile.ContactStreet, 'MessageLocation' : Structures.MessageLocations.Header});
				this.validateErrors({'Control' : Structures.Profile.ContactStreet, 'MessageLocation' : Structures.MessageLocations.Control});
				//--- ContactCity
				this.validateErrors({'Control' : Structures.Profile.ContactCity, 'MessageLocation' : Structures.MessageLocations.Header});
				this.validateErrors({'Control' : Structures.Profile.ContactCity, 'MessageLocation' : Structures.MessageLocations.Control});
				//--- ContactState
				this.validateErrors({'Control' : Structures.Profile.ContactState, 'MessageLocation' : Structures.MessageLocations.Header});
				this.validateErrors({'Control' : Structures.Profile.ContactState, 'MessageLocation' : Structures.MessageLocations.Control});
				//--- ContactZip
				this.validateErrors({'Control' : Structures.Profile.ContactZip, 'MessageLocation' : Structures.MessageLocations.Header});
				this.validateErrors({'Control' : Structures.Profile.ContactZip, 'MessageLocation' : Structures.MessageLocations.Control});
				//--- MailingAddress
				this.validateErrors({'Control' : Structures.Profile.MailingAddress, 'MessageLocation' : Structures.MessageLocations.Header});
				this.validateErrors({'Control' : Structures.Profile.MailingAddress, 'MessageLocation' : Structures.MessageLocations.Control});
				//--- PhoneType
				this.validateErrors({'Control' : Structures.Profile.PhoneType, 'MessageLocation' : Structures.MessageLocations.Header});
				this.validateErrors({'Control' : Structures.Profile.PhoneType, 'MessageLocation' : Structures.MessageLocations.Control});
				//--- PhoneNumber
				this.validateErrors({'Control' : Structures.Profile.PhoneNumber, 'MessageLocation' : Structures.MessageLocations.Header});
				this.validateErrors({'Control' : Structures.Profile.PhoneNumber, 'MessageLocation' : Structures.MessageLocations.Control});
				//--- EmailAddress
				this.validateErrors({'Control' : Structures.Profile.EmailAddress, 'MessageLocation' : Structures.MessageLocations.Header});
				this.validateErrors({'Control' : Structures.Profile.EmailAddress, 'MessageLocation' : Structures.MessageLocations.Control});
				//--- BrokerNumber
				this.validateErrors({'Control' : Structures.Profile.BrokerNumber, 'MessageLocation' : Structures.MessageLocations.Header});
				this.validateErrors({'Control' : Structures.Profile.BrokerNumber, 'MessageLocation' : Structures.MessageLocations.Control});
				break;
			
			case Structures.Profile.ValidateAll:
				this.validateErrors(Structures.Profile.PrimaryName, atMessageLocation);
				this.validateErrors(Structures.Profile.MiddleName, atMessageLocation);
				this.validateErrors(Structures.Profile.LastName, atMessageLocation);
				this.validateErrors(Structures.Profile.Gender, atMessageLocation);
				this.validateErrors(Structures.Profile.Birthdate, atMessageLocation);
				this.validateErrors(Structures.Profile.SSNumber, atMessageLocation);
				this.validateErrors(Structures.Profile.AlternateIdentifier, atMessageLocation);
				this.validateErrors(Structures.Profile.ContactStreet, atMessageLocation);
				this.validateErrors(Structures.Profile.ContactCity, atMessageLocation);
				this.validateErrors(Structures.Profile.ContactState, atMessageLocation);
				this.validateErrors(Structures.Profile.ContactZip, atMessageLocation);
				this.validateErrors(Structures.Profile.MailingAddress, atMessageLocation);
				this.validateErrors(Structures.Profile.PhoneType, atMessageLocation);
				this.validateErrors(Structures.Profile.PhoneNumber, atMessageLocation);
				this.validateErrors(Structures.Profile.EmailAddress, atMessageLocation);
				this.validateErrors(Structures.Profile.BrokerNumber, atMessageLocation);
				this.validateErrors(Structures.Profile.Next, atMessageLocation);
				break;
			
			default:
				break;
		}
	},
	
	/**
	 * Validate errors on Personal Information Page.
	 *
	 * @param {Structures.Profile} Control is the object on the page to be validated.
	 * @param {string} QuestText data that is to be validated.	 
	 */
	validateInformation : function(parameters) {

		switch (parameters.Control)
		{
			
			case Structures.Profile.PrimaryName:
				//--- Validate Page - Personal Information - First or Primary Name
				Commons.verify({'Message' : 'Validate Page - Personal Information - First or Primary Name is : ' + parameters.QuestText,
								'Control' : Controls.cx.page.PersonalInformation.Profile.Names.Primary.input.textbox,
								'ControlType' : Structures.Locators.CSS,
								'QuestText' : parameters.QuestText});
				break;

			case Structures.Profile.MiddleName:
				//--- Validate Page - Personal Information - Middle Initial
				Commons.verify({'Message' : 'Validate Page - Personal Information - Middle Initial is : ' + parameters.QuestText,
								'Control' : Controls.cx.page.PersonalInformation.Profile.Names.Middle.input.textbox,
								'ControlType' : Structures.Locators.CSS,
								'QuestText' : parameters.QuestText});
				break;

			case Structures.Profile.LastName:
				//--- Validate Page - Personal Information - Last Name
				Commons.verify({'Message' : 'Validate Page - Personal Information - Last Name is : ' + parameters.QuestText,
								'Control' : Controls.cx.page.PersonalInformation.Profile.Names.Last.input.textbox,
								'ControlType' : Structures.Locators.CSS,
								'QuestText' : parameters.QuestText});
				break;

			case Structures.Profile.Gender:
				//--- Validate Page - Personal Information - Gender
				Commons.verify({'Message' : 'Validate Page - Personal Information - Gender is : ' + parameters.QuestText,
								'Control' : Controls.cx.page.PersonalInformation.Profile.Gender.input.textbox,
								'ControlType' : Structures.Locators.CSS,
								'QuestText' : parameters.QuestText});
				break;

			case Structures.Profile.Birthdate:
				this.validateInformation({'Control' : Structures.Profile.DOBMonth, 'QuestText' : parameters.QuestText});
				this.validateInformation({'Control' : Structures.Profile.DOBDate, 'QuestText' : parameters.QuestText});
				this.validateInformation({'Control' : Structures.Profile.DOBYear, 'QuestText' : parameters.QuestText});
				break;

			case Structures.Profile.DOBMonth:
				//--- Validate Page - Personal Information - Birthdate Month
				Commons.verify({'Message' : 'Validate Page - Personal Information - Birthdate Month is : ' + parameters.QuestText,
								'Control' : Controls.cx.page.PersonalInformation.Profile.DOB.input.Month.selector,
								'ControlType' : Structures.Locators.CSS,
								'QuestText' : parameters.QuestText});
				break;

			case Structures.Profile.DOBDate:
				//--- Validate Page - Personal Information - Birthdate Day
				Commons.verify({'Message' : 'Validate Page - Personal Information - Birthdate Day is : ' + parameters.QuestText,
								'Control' : Controls.cx.page.PersonalInformation.Profile.DOB.input.Day.selector,
								'ControlType' : Structures.Locators.CSS,
								'QuestText' : parameters.QuestText});
				break;

			case Structures.Profile.DOBYear:
				//--- Validate Page - Personal Information - Birthdate Year
				Commons.verify({'Message' : 'Validate Page - Personal Information - Birthdate Year is : ' + parameters.QuestText,
								'Control' : Controls.cx.page.PersonalInformation.Profile.DOB.input.Year.selector,
								'ControlType' : Structures.Locators.CSS,
								'QuestText' : parameters.QuestText});
				break;

			case Structures.Profile.SSNumber:
				//--- Validate Page - Personal Information - Social Security Number
				Commons.verify({'Message' : 'Validate Page - Personal Information - Social Security Number is : ' + parameters.QuestText,
								'Control' : Controls.cx.page.PersonalInformation.Profile.SSN.input.textbox,
								'ControlType' : Structures.Locators.CSS,
								'QuestText' : parameters.QuestText});
				break;

			case Structures.Profile.AlternateIdentifier:
				//--- Validate Page - Personal Information - Alternate Identifier Number
				Commons.verify({'Message' : 'Validate Page - Personal Information - Alternate Identifier Number is : ' + parameters.QuestText,
								'Control' : Controls.cx.page.PersonalInformation.Profile.AlternateIdentifier.input.textbox,
								'ControlType' : Structures.Locators.CSS,
								'QuestText' : parameters.QuestText});
				break;

			case Structures.Profile.ContactStreet:
				//--- Validate Page - Personal Information - Service or Contact Address Street
				Commons.verify({'Message' : 'Validate Page - Personal Information - Service or Contact Address Street is : ' + parameters.QuestText,
								'Control' : Controls.cx.page.PersonalInformation.Contact.Address.Street.input.textbox,
								'ControlType' : Structures.Locators.CSS,
								'QuestText' : parameters.QuestText});
				break;

			case Structures.Profile.ContactCity:
				//--- Validate Page - Personal Information - Service or Contact Address City
				Commons.verify({'Message' : 'Validate Page - Personal Information - Service or Contact Address City is : ' + parameters.QuestText,
								'Control' : Controls.cx.page.PersonalInformation.Contact.Address.City.input.textbox,
								'ControlType' : Structures.Locators.CSS,
								'QuestText' : parameters.QuestText});
				break;

			case Structures.Profile.ContactState:
				//--- Validate Page - Personal Information - Service or Contact Address State
				Commons.verify({'Message' : 'Validate Page - Personal Information - Service or Contact Address State is : ' + parameters.QuestText,
								'Control' : Controls.cx.page.PersonalInformation.Contact.Address.State.input.textbox,
								'ControlType' : Structures.Locators.CSS,
								'QuestText' : parameters.QuestText});
				break;

			case Structures.Profile.ContactZip:
				//--- Validate Page - Personal Information - Service or Contact Address ZipCode
				Commons.verify({'Message' : 'Validate Page - Personal Information - Service or Contact Address ZipCode is : ' + parameters.QuestText,
								'Control' : Controls.cx.page.PersonalInformation.Contact.Address.Zip.input.textbox,
								'ControlType' : Structures.Locators.CSS,
								'QuestText' : parameters.QuestText});
				break;

			case Structures.Profile.MailingAddress:
				//--- Validate Page - Personal Information - Different Mailing Address select checkbox
				Commons.verify({'Message' : 'Validate Page - Personal Information - Different Mailing Address select checkbox is : ' + parameters.QuestText,
								'Control' : Controls.cx.page.PersonalInformation.Contact.MailingAddress.Different.input.checkbox,
								'ControlType' : Structures.Locators.CSS,
								'Checkbox' : (parameters.QuestText === 'Yes') ? Structures.FrameworkUIActions.Check : Structures.FrameworkUIActions.UnCheck});
				break;

			case Structures.Profile.MailingAddressStreet:
				//--- Validate Page - Personal Information - Different Mailing Address Street
				Commons.verify({'Message' : 'Validate Page - Personal Information - Different Mailing Address Street is : ' + parameters.QuestText,
								'Control' : Controls.cx.page.PersonalInformation.Contact.MailingAddress.Street.input.textbox,
								'ControlType' : Structures.Locators.CSS,
								'QuestText' : parameters.QuestText});
				break;

			case Structures.Profile.MailingAddressCity:
				//--- Validate Page - Personal Information - Different Mailing Address City
				Commons.verify({'Message' : 'Validate Page - Personal Information - Different Mailing Address City is : ' + parameters.QuestText,
								'Control' : Controls.cx.page.PersonalInformation.Contact.MailingAddress.City.input.textbox,
								'ControlType' : Structures.Locators.CSS,
								'QuestText' : parameters.QuestText});
				break;

			case Structures.Profile.MailingAddressState:
				//--- Validate Page - Personal Information - Different Mailing Address State
				Commons.verify({'Message' : 'Validate Page - Personal Information - Different Mailing Address State is : ' + parameters.QuestText,
								'Control' : Controls.cx.page.PersonalInformation.Contact.MailingAddress.State.input.textbox,
								'ControlType' : Structures.Locators.CSS,
								'QuestText' : parameters.QuestText});
				break;

			case Structures.Profile.MailingAddressZip:
				//--- Validate Page - Personal Information - Different Mailing Address ZipCode
				Commons.verify({'Message' : 'Validate Page - Personal Information - Different Mailing Address ZipCode is : ' + parameters.QuestText,
								'Control' : Controls.cx.page.PersonalInformation.Contact.MailingAddress.Zip.input.textbox,
								'ControlType' : Structures.Locators.CSS,
								'QuestText' : parameters.QuestText});
				break;

			case Structures.Profile.PhoneType:
				//--- Validate Page - Personal Information - Phone Category
				Commons.verify({'Message' : 'Validate Page - Personal Information - Phone Category is : ' + parameters.QuestText,
								'Control' : Controls.cx.page.PersonalInformation.Contact.Phone.Category.input.select,
								'Item' : Controls.cx.page.PersonalInformation.Contact.Phone.Category.input.attribute,
								'ControlType' : Structures.Locators.CSS,
								'Value' : parameters.QuestText});
				break;

			case Structures.Profile.PhoneNumber:
				//--- Validate Page - Personal Information - Phone Number
				Commons.verify({'Message' : 'Validate Page - Personal Information - Phone Number is : ' + parameters.QuestText,
								'Control' : Controls.cx.page.PersonalInformation.Contact.Phone.Number.input.textbox,
								'ControlType' : Structures.Locators.CSS,
								'QuestText' : parameters.QuestText});
				break;

			case Structures.Profile.EmailAddress:
				//--- Validate Page - Personal Information - Email Address
				Commons.verify({'Message' : 'Validate Page - Personal Information - Email Address is : ' + parameters.QuestText,
								'Control' : Controls.cx.page.PersonalInformation.Contact.Email.input.textbox,
								'ControlType' : Structures.Locators.CSS,
								'QuestText' : parameters.QuestText});
				break;

			case Structures.Profile.GoPaperless:
				//--- Validate Page - Personal Information - Go Paperless select checkbox
				Commons.verify({'Message' : 'Validate Page - Personal Information - Go Paperless select checkbox is : ' + parameters.QuestText,
								'Control' : Controls.cx.page.PersonalInformation.Contact.Paperless.input.checkbox,
								'ControlType' : Structures.Locators.CSS,
								'Checkbox' : (parameters.QuestText === 'Yes') ? Structures.FrameworkUIActions.Check : Structures.FrameworkUIActions.UnCheck});
				break;

			case Structures.Profile.BrokerWorked:
				//--- Validate Page - Personal Information - Has Broker select checkbox
				Commons.verify({'Message' : 'Validate Page - Personal Information - Has Broker select checkbox is : ' + parameters.QuestText,
								'Control' : Controls.cx.page.PersonalInformation.Contact.Broker.IsPresent.input.checkbox,
								'ControlType' : Structures.Locators.CSS,
								'Checkbox' : (parameters.QuestText === 'Yes') ? Structures.FrameworkUIActions.Check : Structures.FrameworkUIActions.UnCheck});
				break;

			case Structures.Profile.BrokerNumber:
				//--- Validate Page - Personal Information - Broker Number
				Commons.verify({'Message' : 'Validate Page - Personal Information - Broker Number is : ' + parameters.QuestText,
								'Control' : Controls.cx.page.PersonalInformation.Contact.Broker.Identifier.input.textbox,
								'ControlType' : Structures.Locators.CSS,
								'QuestText' : parameters.QuestText});
				break;

			case Structures.Profile.BrokerName:
				//--- Validate Page - Personal Information - Broker Name
				Commons.verify({'Message' : 'Validate Page - Personal Information - Broker Name is : ' + parameters.QuestText,
								'Control' : Controls.cx.page.PersonalInformation.Contact.Broker.Name.input.textbox,
								'ControlType' : Structures.Locators.CSS,
								'QuestText' : parameters.QuestText});
				break;

			default:
				break;
		
		}
		return true;
	},

};
 
module.exports = cxPgGUIPersonalInformation;
