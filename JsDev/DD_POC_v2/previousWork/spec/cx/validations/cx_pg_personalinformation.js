// Author : Uday Thombre
// Email : uthombre@delta.org
//
// Validate fields on CX home page - Personal Information

var CXLib = require('../framework/cx_gui_libraries.js');
var Controls = require('../framework/cx_gui.json');
var Data = require('../data/cx_data_personalinformation.json');

describe('cx homepage', function() {

	var applicant;
	var pageLoaded = false;
	var isnegativetest = true;

	beforeEach(function() {
		if (!pageLoaded){
			CXLib.navigateToPage(CXLib.Navigation.PersonalInformationPage);
			pageLoaded =  true;
		}
	});

//-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
//--- Validate CX : PAGE : Personal Information : Field Captions
//-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
	it('CX : PAGE : Personal Information : Field Captions : Primary/First Name : Validate to be "' + Controls.cx.page.PersonalInformation.Profile.Names.Primary.caption + '"', function() {
		CXLib.validate({'Page': CXLib.Pages.PersonalInformation, 
						'ValidateFor': CXLib.Validators.Caption,
						'Control' : CXLib.Profile.PrimaryName});		
	});

	it('CX : PAGE : Personal Information : Field Captions : Middle Initial : Validate to be "' + Controls.cx.page.PersonalInformation.Profile.Names.Middle.caption + '"', function() {
		CXLib.validate({'Page': CXLib.Pages.PersonalInformation, 
						'ValidateFor': CXLib.Validators.Caption,
						'Control' : CXLib.Profile.MiddleName});		
	});

	it('CX : PAGE : Personal Information : Field Captions : Last Name : Validate to be "' + Controls.cx.page.PersonalInformation.Profile.Names.Last.caption + '"', function() {
		CXLib.validate({'Page': CXLib.Pages.PersonalInformation, 
						'ValidateFor': CXLib.Validators.Caption,
						'Control' : CXLib.Profile.LastName});		
	});

	it('CX : PAGE : Personal Information : Field Captions : Gender : Validate to be "' + Controls.cx.page.PersonalInformation.Profile.Gender.caption + '"', function() {
		CXLib.validate({'Page': CXLib.Pages.PersonalInformation, 
						'ValidateFor': CXLib.Validators.Caption,
						'Control' : CXLib.Profile.Gender});		
	});

	it('CX : PAGE : Personal Information : Field Captions : Birthdate : Validate to be "' + Controls.cx.page.PersonalInformation.Profile.DOB.caption + '"', function() {
		CXLib.validate({'Page': CXLib.Pages.PersonalInformation, 
						'ValidateFor': CXLib.Validators.Caption,
						'Control' : CXLib.Profile.Birthdate});		
	});

	it('CX : PAGE : Personal Information : Field Captions : Social Security : Validate to be "' + Controls.cx.page.PersonalInformation.Profile.SSN.caption + '"', function() {
		CXLib.validate({'Page': CXLib.Pages.PersonalInformation, 
						'ValidateFor': CXLib.Validators.Caption,
						'Control' : CXLib.Profile.SSNumber});		
	});

	it('CX : PAGE : Personal Information : Field Captions : Contact Address Street : Validate to be "' + Controls.cx.page.PersonalInformation.Contact.Address.Street.caption + '"', function() {
		CXLib.validate({'Page': CXLib.Pages.PersonalInformation, 
						'ValidateFor': CXLib.Validators.Caption,
						'Control' : CXLib.Profile.ContactStreet});		
	});

	it('CX : PAGE : Personal Information : Field Captions : Contact Address City : Validate to be "' + Controls.cx.page.PersonalInformation.Contact.Address.City.caption + '"', function() {
		CXLib.validate({'Page': CXLib.Pages.PersonalInformation, 
						'ValidateFor': CXLib.Validators.Caption,
						'Control' : CXLib.Profile.ContactCity});		
	});

	it('CX : PAGE : Personal Information : Field Captions : Contact Address State : Validate to be "' + Controls.cx.page.PersonalInformation.Contact.Address.State.caption + '"', function() {
		CXLib.validate({'Page': CXLib.Pages.PersonalInformation, 
						'ValidateFor': CXLib.Validators.Caption,
						'Control' : CXLib.Profile.ContactState});		
	});

	it('CX : PAGE : Personal Information : Field Captions : Contact Address Zip : Validate to be "' + Controls.cx.page.PersonalInformation.Contact.Address.Zip.caption + '"', function() {
		CXLib.validate({'Page': CXLib.Pages.PersonalInformation, 
						'ValidateFor': CXLib.Validators.Caption,
						'Control' : CXLib.Profile.ContactZip});		
	});

	it('CX : PAGE : Personal Information : Field Captions : Contact Different Mailing Address : Validate to be "' + Controls.cx.page.PersonalInformation.Contact.MailingAddress.Different.caption + '"', function() {
		CXLib.validate({'Page': CXLib.Pages.PersonalInformation, 
						'ValidateFor': CXLib.Validators.Caption,
						'Control' : CXLib.Profile.MailingAddress});		
	});

	it('CX : PAGE : Personal Information : Field Captions : Contact Different Mailing Address Street : Validate to be "' + Controls.cx.page.PersonalInformation.Contact.MailingAddress.Street.caption + '"', function() {
		//----- Click on has different mailing address checkbox 
		CXLib.keyInPIFor(CXLib.Profile.MailingAddress, applicant, isnegativetest);
		CXLib.validate({'Page': CXLib.Pages.PersonalInformation, 
						'ValidateFor': CXLib.Validators.Caption,
						'Control' : CXLib.Profile.MailingAddressStreet});		
	});

	it('CX : PAGE : Personal Information : Field Captions : Contact Different Mailing Address City : Validate to be "' + Controls.cx.page.PersonalInformation.Contact.MailingAddress.City.caption + '"', function() {
		//----- Click on has different mailing address checkbox 
		CXLib.keyInPIFor(CXLib.Profile.MailingAddress, applicant, isnegativetest);
		CXLib.validate({'Page': CXLib.Pages.PersonalInformation, 
						'ValidateFor': CXLib.Validators.Caption,
						'Control' : CXLib.Profile.MailingAddressCity});		
	});

	it('CX : PAGE : Personal Information : Field Captions : Contact Different Mailing Address State : Validate to be "' + Controls.cx.page.PersonalInformation.Contact.MailingAddress.State.caption + '"', function() {
		//----- Click on has different mailing address checkbox 
		CXLib.keyInPIFor(CXLib.Profile.MailingAddress, applicant, isnegativetest);
		CXLib.validate({'Page': CXLib.Pages.PersonalInformation, 
						'ValidateFor': CXLib.Validators.Caption,
						'Control' : CXLib.Profile.MailingAddressState});		
	});

	it('CX : PAGE : Personal Information : Field Captions : Contact Different Mailing Address Zip : Validate to be "' + Controls.cx.page.PersonalInformation.Contact.MailingAddress.Zip.caption + '"', function() {
		//----- Click on has different mailing address checkbox 
		CXLib.keyInPIFor(CXLib.Profile.MailingAddress, applicant, isnegativetest);
		CXLib.validate({'Page': CXLib.Pages.PersonalInformation, 
						'ValidateFor': CXLib.Validators.Caption,
						'Control' : CXLib.Profile.MailingAddressZip});		
	});

	it('CX : PAGE : Personal Information : Field Captions : Contact Phone Category : Validate to be "' + Controls.cx.page.PersonalInformation.Contact.Phone.Category.caption + '"', function() {
		CXLib.validate({'Page': CXLib.Pages.PersonalInformation, 
						'ValidateFor': CXLib.Validators.Caption,
						'Control' : CXLib.Profile.PhoneType});		
	});

	it('CX : PAGE : Personal Information : Field Captions : Contact Phone Number : Validate to be "' + Controls.cx.page.PersonalInformation.Contact.Phone.Number.caption + '"', function() {
		CXLib.validate({'Page': CXLib.Pages.PersonalInformation, 
						'ValidateFor': CXLib.Validators.Caption,
						'Control' : CXLib.Profile.PhoneNumber});		
	});

	it('CX : PAGE : Personal Information : Field Captions : Contact Email Address : Validate to be "' + Controls.cx.page.PersonalInformation.Contact.Email.caption + '"', function() {
		CXLib.validate({'Page': CXLib.Pages.PersonalInformation, 
						'ValidateFor': CXLib.Validators.Caption,
						'Control' : CXLib.Profile.EmailAddress});		
	});

	it('CX : PAGE : Personal Information : Field Captions : Go Paperless : Validate to be "' + Controls.cx.page.PersonalInformation.Contact.Paperless.caption + '"', function() {
		CXLib.validate({'Page': CXLib.Pages.PersonalInformation, 
						'ValidateFor': CXLib.Validators.Caption,
						'Control' : CXLib.Profile.GoPaperless});		
	});

	it('CX : PAGE : Personal Information : Field Captions : Has Broker : Validate to be "' + Controls.cx.page.PersonalInformation.Contact.Broker.IsPresent.caption + '"', function() {
		CXLib.validate({'Page': CXLib.Pages.PersonalInformation, 
						'ValidateFor': CXLib.Validators.Caption,
						'Control' : CXLib.Profile.BrokerWorked});		
	});

	it('CX : PAGE : Personal Information : Field Captions : Broker Number : Validate to be "' + Controls.cx.page.PersonalInformation.Contact.Broker.Number.caption + '"', function() {
		//----- Click on has broker checkbox 
		CXLib.keyInCheckbox(Controls.cx.page.PersonalInformation.Contact.Broker.IsPresent.input.checkbox, CXLib.FrameworkUIActions.Check);
		CXLib.validate({'Page': CXLib.Pages.PersonalInformation, 
						'ValidateFor': CXLib.Validators.Caption,
						'Control' : CXLib.Profile.BrokerNumber});		
	});

	it('CX : PAGE : Personal Information : Field Captions : Broker Name : Validate to be "' + Controls.cx.page.PersonalInformation.Contact.Broker.Name.caption + '"', function() {
		//----- Click on has broker checkbox 
		CXLib.keyInCheckbox(Controls.cx.page.PersonalInformation.Contact.Broker.IsPresent.input.checkbox, CXLib.FrameworkUIActions.Check);
		CXLib.validate({'Page': CXLib.Pages.PersonalInformation, 
						'ValidateFor': CXLib.Validators.Caption,
						'Control' : CXLib.Profile.BrokerName});		
	});

//-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
//--- Validate CX : PAGE : Personal Information : Field Data Placeholders
//-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
	it('CX : PAGE : Personal Information : Field Placeholders : Primary/First Name : Validate to be "' + Controls.cx.page.PersonalInformation.Profile.Names.Primary.caption + '"', function() {
		CXLib.validate({'Page': CXLib.Pages.PersonalInformation, 
						'ValidateFor': CXLib.Validators.Placeholder,
						'Control' : CXLib.Profile.PrimaryName});		
	});

	it('CX : PAGE : Personal Information : Field Placeholders : Middle Initial : Validate to be "' + Controls.cx.page.PersonalInformation.Profile.Names.Middle.caption + '"', function() {
		CXLib.validate({'Page': CXLib.Pages.PersonalInformation, 
						'ValidateFor': CXLib.Validators.Placeholder,
						'Control' : CXLib.Profile.MiddleName});		
	});

	it('CX : PAGE : Personal Information : Field Placeholders : Last Name : Validate to be "' + Controls.cx.page.PersonalInformation.Profile.Names.Last.caption + '"', function() {
		CXLib.validate({'Page': CXLib.Pages.PersonalInformation, 
						'ValidateFor': CXLib.Validators.Placeholder,
						'Control' : CXLib.Profile.LastName});		
	});

	it('CX : PAGE : Personal Information : Field Placeholders : Gender : Validate to be "' + Controls.cx.page.PersonalInformation.Profile.Gender.caption + '"', function() {
		CXLib.validate({'Page': CXLib.Pages.PersonalInformation, 
						'ValidateFor': CXLib.Validators.Placeholder,
						'Control' : CXLib.Profile.Gender});		
	});

	it('CX : PAGE : Personal Information : Field Placeholders : Birthdate : Validate to be "' + Controls.cx.page.PersonalInformation.Profile.DOB.caption + '"', function() {
		CXLib.validate({'Page': CXLib.Pages.PersonalInformation, 
						'ValidateFor': CXLib.Validators.Placeholder,
						'Control' : CXLib.Profile.Birthdate});		
	});

	it('CX : PAGE : Personal Information : Field Placeholders : Social Security : Validate to be "' + Controls.cx.page.PersonalInformation.Profile.SSN.caption + '"', function() {
		CXLib.validate({'Page': CXLib.Pages.PersonalInformation, 
						'ValidateFor': CXLib.Validators.Placeholder,
						'Control' : CXLib.Profile.SSNumber});		
	});

	it('CX : PAGE : Personal Information : Field Placeholders : Contact Address Street : Validate to be "' + Controls.cx.page.PersonalInformation.Contact.Address.Street.caption + '"', function() {
		CXLib.validate({'Page': CXLib.Pages.PersonalInformation, 
						'ValidateFor': CXLib.Validators.Placeholder,
						'Control' : CXLib.Profile.ContactStreet});		
	});

	it('CX : PAGE : Personal Information : Field Placeholders : Contact Address City : Validate to be "' + Controls.cx.page.PersonalInformation.Contact.Address.City.caption + '"', function() {
		CXLib.validate({'Page': CXLib.Pages.PersonalInformation, 
						'ValidateFor': CXLib.Validators.Placeholder,
						'Control' : CXLib.Profile.ContactCity});		
	});

	it('CX : PAGE : Personal Information : Field Placeholders : Contact Address State : Validate to be "' + Controls.cx.page.PersonalInformation.Contact.Address.State.caption + '"', function() {
		CXLib.validate({'Page': CXLib.Pages.PersonalInformation, 
						'ValidateFor': CXLib.Validators.Placeholder,
						'Control' : CXLib.Profile.ContactState});		
	});

	it('CX : PAGE : Personal Information : Field Placeholders : Contact Address Zip : Validate to be "' + Controls.cx.page.PersonalInformation.Contact.Address.Zip.caption + '"', function() {
		CXLib.validate({'Page': CXLib.Pages.PersonalInformation, 
						'ValidateFor': CXLib.Validators.Placeholder,
						'Control' : CXLib.Profile.ContactZip});		
	});

	it('CX : PAGE : Personal Information : Field Placeholders : Contact Different Mailing Address : Validate to be "' + Controls.cx.page.PersonalInformation.Contact.MailingAddress.Different.caption + '"', function() {
		CXLib.validate({'Page': CXLib.Pages.PersonalInformation, 
						'ValidateFor': CXLib.Validators.Placeholder,
						'Control' : CXLib.Profile.MailingAddress});		
	});

	it('CX : PAGE : Personal Information : Field Placeholders : Contact Different Mailing Address Street : Validate to be "' + Controls.cx.page.PersonalInformation.Contact.MailingAddress.Street.caption + '"', function() {
		//----- Click on has different mailing address checkbox 
		CXLib.keyInPIFor(CXLib.Profile.MailingAddress, applicant, isnegativetest);
		CXLib.validate({'Page': CXLib.Pages.PersonalInformation, 
						'ValidateFor': CXLib.Validators.Placeholder,
						'Control' : CXLib.Profile.MailingAddressStreet});		
	});

	it('CX : PAGE : Personal Information : Field Placeholders : Contact Different Mailing Address City : Validate to be "' + Controls.cx.page.PersonalInformation.Contact.MailingAddress.City.caption + '"', function() {
		//----- Click on has different mailing address checkbox 
		CXLib.keyInPIFor(CXLib.Profile.MailingAddress, applicant, isnegativetest);
		CXLib.validate({'Page': CXLib.Pages.PersonalInformation, 
						'ValidateFor': CXLib.Validators.Placeholder,
						'Control' : CXLib.Profile.MailingAddressCity});		
	});

	it('CX : PAGE : Personal Information : Field Placeholders : Contact Different Mailing Address State : Validate to be "' + Controls.cx.page.PersonalInformation.Contact.MailingAddress.State.caption + '"', function() {
		//----- Click on has different mailing address checkbox 
		CXLib.keyInPIFor(CXLib.Profile.MailingAddress, applicant, isnegativetest);
		CXLib.validate({'Page': CXLib.Pages.PersonalInformation, 
						'ValidateFor': CXLib.Validators.Placeholder,
						'Control' : CXLib.Profile.MailingAddressState});		
	});

	it('CX : PAGE : Personal Information : Field Placeholders : Contact Different Mailing Address Zip : Validate to be "' + Controls.cx.page.PersonalInformation.Contact.MailingAddress.Zip.caption + '"', function() {
		//----- Click on has different mailing address checkbox 
		CXLib.keyInPIFor(CXLib.Profile.MailingAddress, applicant, isnegativetest);
		CXLib.validate({'Page': CXLib.Pages.PersonalInformation, 
						'ValidateFor': CXLib.Validators.Placeholder,
						'Control' : CXLib.Profile.MailingAddressZip});		
	});

	it('CX : PAGE : Personal Information : Field Placeholders : Contact Phone Category : Validate to be "' + Controls.cx.page.PersonalInformation.Contact.Phone.Category.caption + '"', function() {
		CXLib.validate({'Page': CXLib.Pages.PersonalInformation, 
						'ValidateFor': CXLib.Validators.Placeholder,
						'Control' : CXLib.Profile.PhoneType});		
	});

	it('CX : PAGE : Personal Information : Field Placeholders : Contact Phone Number : Validate to be "' + Controls.cx.page.PersonalInformation.Contact.Phone.Number.caption + '"', function() {
		CXLib.validate({'Page': CXLib.Pages.PersonalInformation, 
						'ValidateFor': CXLib.Validators.Placeholder,
						'Control' : CXLib.Profile.PhoneNumber});		
	});

	it('CX : PAGE : Personal Information : Field Placeholders : Contact Email Address : Validate to be "' + Controls.cx.page.PersonalInformation.Contact.Email.caption + '"', function() {
		CXLib.validate({'Page': CXLib.Pages.PersonalInformation, 
						'ValidateFor': CXLib.Validators.Placeholder,
						'Control' : CXLib.Profile.EmailAddress});		
	});

	it('CX : PAGE : Personal Information : Field Placeholders : Go Paperless : Validate to be "' + Controls.cx.page.PersonalInformation.Contact.Paperless.caption + '"', function() {
		CXLib.validate({'Page': CXLib.Pages.PersonalInformation, 
						'ValidateFor': CXLib.Validators.Placeholder,
						'Control' : CXLib.Profile.GoPaperless});		
	});

	it('CX : PAGE : Personal Information : Field Placeholders : Has Broker : Validate to be "' + Controls.cx.page.PersonalInformation.Contact.Broker.IsPresent.caption + '"', function() {
		CXLib.validate({'Page': CXLib.Pages.PersonalInformation, 
						'ValidateFor': CXLib.Validators.Placeholder,
						'Control' : CXLib.Profile.BrokerWorked});		
	});

	it('CX : PAGE : Personal Information : Field Placeholders : Broker Number : Validate to be "' + Controls.cx.page.PersonalInformation.Contact.Broker.Number.caption + '"', function() {
		//----- Click on has broker checkbox 
		CXLib.keyInCheckbox(Controls.cx.page.PersonalInformation.Contact.Broker.IsPresent.input.checkbox, CXLib.FrameworkUIActions.Check);
		CXLib.validate({'Page': CXLib.Pages.PersonalInformation, 
						'ValidateFor': CXLib.Validators.Placeholder,
						'Control' : CXLib.Profile.BrokerNumber});		
	});

	it('CX : PAGE : Personal Information : Field Placeholders : Broker Name : Validate to be "' + Controls.cx.page.PersonalInformation.Contact.Broker.Name.caption + '"', function() {
		//----- Click on has broker checkbox 
		CXLib.keyInCheckbox(Controls.cx.page.PersonalInformation.Contact.Broker.IsPresent.input.checkbox, CXLib.FrameworkUIActions.Check);
		CXLib.validate({'Page': CXLib.Pages.PersonalInformation, 
						'ValidateFor': CXLib.Validators.Placeholder,
						'Control' : CXLib.Profile.BrokerName});		
	});

	//-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
	//--- Validate CX : PAGE : Personal Information : Plan Summary
	//-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
	for (var index = 0; index < Data.cx.PersonalInformation.length; index++) {
		
		(function (applicant) {
		
			it('CX : PAGE : Personal Information : Plan Summary : Plan Type : Validate to be (' + applicant.Plan.Summary.Type + ')', function() {
				CXLib.validate({'Page': CXLib.Pages.PersonalInformation, 
								'ValidateFor': CXLib.Validators.Summary,
								'Control' : CXLib.PlanSummary.Type,
								'DataCSS' : applicant.Plan});		
			});
				
			it('CX : PAGE : Personal Information : Plan Summary : Plan Name : Validate to be (' + applicant.Plan.Summary.Name + ')', function() {
				CXLib.validate({'Page': CXLib.Pages.PersonalInformation, 
								'ValidateFor': CXLib.Validators.Summary,
								'Control' : CXLib.PlanSummary.Name,
								'DataCSS' : applicant.Plan});		
			});

			it('CX : PAGE : Personal Information : Plan Summary : Plan Premium : Validate to be (' + applicant.Plan.Summary.Premium + ')', function() {
				CXLib.validate({'Page': CXLib.Pages.PersonalInformation, 
								'ValidateFor': CXLib.Validators.Summary,
								'Control' : CXLib.PlanSummary.Premium,
								'DataCSS' : applicant.Plan});		
			});

			it('CX : PAGE : Personal Information : Plan Summary : Plan Fee : Validate to be (' + applicant.Plan.Summary.Fee + ')', function() {
				CXLib.validate({'Page': CXLib.Pages.PersonalInformation, 
								'ValidateFor': CXLib.Validators.Summary,
								'Control' : CXLib.PlanSummary.Fee,
								'DataCSS' : applicant.Plan});		
			});

			it('CX : PAGE : Personal Information : Plan Summary : Plan Title : Validate to be (' + applicant.Plan.Summary.Title + ')', function() {
				CXLib.validate({'Page': CXLib.Pages.PersonalInformation, 
								'ValidateFor': CXLib.Validators.Summary,
								'Control' : CXLib.PlanSummary.Title,
								'DataCSS' : applicant.Plan});		
			});

			it('CX : PAGE : Personal Information : Plan Summary : Plan Description : Validate to be (' + applicant.Plan.Summary.Description + ')', function() {
				CXLib.validate({'Page': CXLib.Pages.PersonalInformation, 
								'ValidateFor': CXLib.Validators.Summary,
								'Control' : CXLib.PlanSummary.Description,
								'DataCSS' : applicant.Plan});		
			});
		
		})(Data.cx.PersonalInformation[index]);
	}
	
//-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
//--- Validate CX : PAGE : Personal Information : Field Data Errors
//-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
	for (var index = 0; index < Data.cx.ErrorValidation.PersonalInformation.length; index++ )
	{
		(function (applicant) {
		
		//-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
		//--- Validate CX : PAGE : Personal Information : Field Data Errors : Profile Details
		//-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

			//--- Validate header level data error messages on - Primary/First Name
			it('Validate header level data error messages on - Primary/First Name  : ' + applicant.Profile.Name.First, function() {	
				CXLib.keyInPIFor(CXLib.Profile.PrimaryName, applicant);
				CXLib.validate({'Page': CXLib.Pages.PersonalInformation, 
						'ValidateFor': CXLib.Validators.Errors,
						'Control' : CXLib.Profile.PrimaryName,
						'MessageLocation' : CXLib.MessageLocations.Header});		
			});
			//--- Validate control level data error messages on - Primary/First Name
			it('Validate control level data error messages on - Primary/First Name  : ' + applicant.Profile.Name.First, function() {	
				CXLib.keyInPIFor(CXLib.Profile.PrimaryName, applicant);
				CXLib.validate({'Page': CXLib.Pages.PersonalInformation, 
						'ValidateFor': CXLib.Validators.Errors,
						'Control' : CXLib.Profile.PrimaryName,
						'MessageLocation' : CXLib.MessageLocations.Control});		
			});

			//--- Validate header level data error messages on - Middle Initial
			it('Validate header level data error messages on - Middle Initial : ' + applicant.Profile.Name.Middle, function() {	
				CXLib.keyInPIFor(CXLib.Profile.MiddleName, applicant);
				CXLib.validate({'Page': CXLib.Pages.PersonalInformation, 
						'ValidateFor': CXLib.Validators.Errors,
						'Control' : CXLib.Profile.MiddleName,
						'MessageLocation' : CXLib.MessageLocations.Header});		
			});
			//--- Validate control level data error messages on - Middle Initial
			it('Validate control level data error messages on - Middle Initial : ' + applicant.Profile.Name.Middle, function() {	
				CXLib.keyInPIFor(CXLib.Profile.MiddleName, applicant);
				CXLib.validate({'Page': CXLib.Pages.PersonalInformation, 
						'ValidateFor': CXLib.Validators.Errors,
						'Control' : CXLib.Profile.MiddleName,
						'MessageLocation' : CXLib.MessageLocations.Control});		
			});

			//--- Validate header level data error messages on - Last Name
			it('Validate header level data error messages on - Last Name : ' + applicant.Profile.Name.Last, function() {	
				CXLib.keyInPIFor(CXLib.Profile.LastName, applicant);
				CXLib.validate({'Page': CXLib.Pages.PersonalInformation, 
						'ValidateFor': CXLib.Validators.Errors,
						'Control' : CXLib.Profile.LastName,
						'MessageLocation' : CXLib.MessageLocations.Header});		
			});
			//--- Validate control level data error messages on - Last Name
			it('Validate control level data error messages on - Last Name : ' + applicant.Profile.Name.Last, function() {	
				CXLib.keyInPIFor(CXLib.Profile.LastName, applicant);
				CXLib.validate({'Page': CXLib.Pages.PersonalInformation, 
						'ValidateFor': CXLib.Validators.Errors,
						'Control' : CXLib.Profile.LastName,
						'MessageLocation' : CXLib.MessageLocations.Control});		
			});

			//--- Validate header level data error messages on - Gender
			it('Validate header level data error messages on - Gender : ' + applicant.Profile.Gender, function() {	
				CXLib.keyInPIFor(CXLib.Profile.Gender, applicant);
				CXLib.validate({'Page': CXLib.Pages.PersonalInformation, 
						'ValidateFor': CXLib.Validators.Errors,
						'Control' : CXLib.Profile.Gender,
						'MessageLocation' : CXLib.MessageLocations.Header});		
			});
			//--- Validate control level data error messages on - Gender
			it('Validate control level data error messages on - Gender : ' + applicant.Profile.Gender, function() {	
				CXLib.keyInPIFor(CXLib.Profile.Gender, applicant);
				CXLib.validate({'Page': CXLib.Pages.PersonalInformation, 
						'ValidateFor': CXLib.Validators.Errors,
						'Control' : CXLib.Profile.Gender,
						'MessageLocation' : CXLib.MessageLocations.Control});		
			});

			//--- Validate header level data error messages on - Birthdate - Month
			it('Validate header level data error messages on - Birthdate Month : ' + applicant.Profile.DOB.Month, function() {	
				CXLib.keyInPIFor(CXLib.Profile.DOBMonth, applicant);
				CXLib.validate({'Page': CXLib.Pages.PersonalInformation, 
						'ValidateFor': CXLib.Validators.Errors,
						'Control' : CXLib.Profile.DOBMonth,
						'MessageLocation' : CXLib.MessageLocations.Header});		
			});
			//--- Validate control level data error messages on - Birthdate - Month
			it('Validate control level data error messages on - Birthdate Month : ' + applicant.Profile.DOB.Month, function() {	
				CXLib.keyInPIFor(CXLib.Profile.DOBMonth, applicant);
				CXLib.validate({'Page': CXLib.Pages.PersonalInformation, 
						'ValidateFor': CXLib.Validators.Errors,
						'Control' : CXLib.Profile.DOBMonth,
						'MessageLocation' : CXLib.MessageLocations.Control});		
			});

			//--- Validate header level data error messages on - Birthdate - Day
			it('Validate header level data error messages on - Birthdate Day : ' + applicant.Profile.DOB.Day, function() {	
				CXLib.keyInPIFor(CXLib.Profile.DOBDate, applicant);
				CXLib.validate({'Page': CXLib.Pages.PersonalInformation, 
						'ValidateFor': CXLib.Validators.Errors,
						'Control' : CXLib.Profile.DOBDate,
						'MessageLocation' : CXLib.MessageLocations.Header});		
			});
			//--- Validate control level data error messages on - Birthdate - Day
			it('Validate control level data error messages on - Birthdate Day : ' + applicant.Profile.DOB.Day, function() {	
				CXLib.keyInPIFor(CXLib.Profile.DOBDate, applicant);
				CXLib.validate({'Page': CXLib.Pages.PersonalInformation, 
						'ValidateFor': CXLib.Validators.Errors,
						'Control' : CXLib.Profile.DOBDate,
						'MessageLocation' : CXLib.MessageLocations.Control});		
			});

			//--- Validate header level data error messages on - Birthdate - Year
			it('Validate header level data error messages on - Birthdate - Year : ' + applicant.Profile.DOB.Year, function() {	
				CXLib.keyInPIFor(CXLib.Profile.DOBYear, applicant);
				CXLib.validate({'Page': CXLib.Pages.PersonalInformation, 
						'ValidateFor': CXLib.Validators.Errors,
						'Control' : CXLib.Profile.DOBYear,
						'MessageLocation' : CXLib.MessageLocations.Header});		
			});
			//--- Validate control level data error messages on - Birthdate - Year
			it('Validate control level data error messages on - Birthdate - Year : ' + applicant.Profile.DOB.Year, function() {	
				CXLib.keyInPIFor(CXLib.Profile.DOBYear, applicant);
				CXLib.validate({'Page': CXLib.Pages.PersonalInformation, 
						'ValidateFor': CXLib.Validators.Errors,
						'Control' : CXLib.Profile.DOBYear,
						'MessageLocation' : CXLib.MessageLocations.Control});		
			});

			//--- Validate header level data error messages on - SSN
			it('Validate header level data error messages on - Social Security : ' + applicant.Profile.SSN, function() {	
				CXLib.keyInPIFor(CXLib.Profile.SSNumber, applicant);
				CXLib.validate({'Page': CXLib.Pages.PersonalInformation, 
						'ValidateFor': CXLib.Validators.Errors,
						'Control' : CXLib.Profile.SSNumber,
						'MessageLocation' : CXLib.MessageLocations.Header});		
			});
			//--- Validate control level data error messages on - SSN
			it('Validate control level data error messages on - Social Security : ' + applicant.Profile.SSN, function() {	
				CXLib.keyInPIFor(CXLib.Profile.SSNumber, applicant);
				CXLib.validate({'Page': CXLib.Pages.PersonalInformation, 
						'ValidateFor': CXLib.Validators.Errors,
						'Control' : CXLib.Profile.SSNumber,
						'MessageLocation' : CXLib.MessageLocations.Control});		
			});

		//-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
		//--- Validate CX : PAGE : Personal Information : Field Data Errors : Contact Details
		//-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

			//--- Validate header level data error messages on - Contact Address - Street
			it('Validate header level data error messages on - Contact Address - Street : ' + applicant.Contact.Street, function() {	
				CXLib.keyInPIFor(CXLib.Profile.ContactStreet, applicant);
				CXLib.validate({'Page': CXLib.Pages.PersonalInformation, 
						'ValidateFor': CXLib.Validators.Errors,
						'Control' : CXLib.Profile.ContactStreet,
						'MessageLocation' : CXLib.MessageLocations.Header});		
			});
			//--- Validate control level data error messages on - Contact Address - Street
			it('Validate control level data error messages on - Contact Address - Street : ' + applicant.Contact.Street, function() {	
				CXLib.keyInPIFor(CXLib.Profile.ContactStreet, applicant);
				CXLib.validate({'Page': CXLib.Pages.PersonalInformation, 
						'ValidateFor': CXLib.Validators.Errors,
						'Control' : CXLib.Profile.ContactStreet,
						'MessageLocation' : CXLib.MessageLocations.Control});		
			});

			//--- Validate header level data error messages on - Contact Address - City
			it('Validate header level data error messages on - Contact Address - City : ' + applicant.Contact.City, function() {	
				CXLib.keyInPIFor(CXLib.Profile.ContactCity, applicant);
				CXLib.validate({'Page': CXLib.Pages.PersonalInformation, 
						'ValidateFor': CXLib.Validators.Errors,
						'Control' : CXLib.Profile.ContactCity,
						'MessageLocation' : CXLib.MessageLocations.Header});		
			});
			//--- Validate header level data error messages on - Contact Address - City
			it('Validate header level data error messages on - Contact Address - City : ' + applicant.Contact.City, function() {	
				CXLib.keyInPIFor(CXLib.Profile.ContactCity, applicant);
				CXLib.validate({'Page': CXLib.Pages.PersonalInformation, 
						'ValidateFor': CXLib.Validators.Errors,
						'Control' : CXLib.Profile.ContactCity,
						'MessageLocation' : CXLib.MessageLocations.Control});		
			});

			//--- Validate header level data error messages on - Contact Address - State
			it('Validate header level data error messages on - Contact Address - State : ' + applicant.Contact.State, function() {	
				CXLib.keyInPIFor(CXLib.Profile.ContactState, applicant);
				CXLib.validate({'Page': CXLib.Pages.PersonalInformation, 
						'ValidateFor': CXLib.Validators.Errors,
						'Control' : CXLib.Profile.ContactState,
						'MessageLocation' : CXLib.MessageLocations.Header});		
			});
			//--- Validate header level data error messages on - Contact Address - State
			it('Validate header level data error messages on - Contact Address - State : ' + applicant.Contact.State, function() {	
				CXLib.keyInPIFor(CXLib.Profile.ContactState, applicant);
				CXLib.validate({'Page': CXLib.Pages.PersonalInformation, 
						'ValidateFor': CXLib.Validators.Errors,
						'Control' : CXLib.Profile.ContactState,
						'MessageLocation' : CXLib.MessageLocations.Control});		
			});

			//--- Validate header level data error messages on - Contact Address - Zip
			it('Validate header level data error messages on - Contact Address - Zip : ' + applicant.Contact.Zip, function() {	
				CXLib.keyInPIFor(CXLib.Profile.ContactZip, applicant);
				CXLib.keyInPIFor(CXLib.Profile.ContactZipAlertGoBack);				
				CXLib.validate({'Page': CXLib.Pages.PersonalInformation, 
						'ValidateFor': CXLib.Validators.Errors,
						'Control' : CXLib.Profile.ContactZip,
						'MessageLocation' : CXLib.MessageLocations.Header});		
			});
			//--- Validate header level data error messages on - Contact Address - Zip
			it('Validate header level data error messages on - Contact Address - Zip : ' + applicant.Contact.Zip, function() {	
				CXLib.keyInPIFor(CXLib.Profile.ContactZip, applicant);
				CXLib.keyInPIFor(CXLib.Profile.ContactZipAlertGoBack);
				CXLib.validate({'Page': CXLib.Pages.PersonalInformation, 
						'ValidateFor': CXLib.Validators.Errors,
						'Control' : CXLib.Profile.ContactZip,
						'MessageLocation' : CXLib.MessageLocations.Control});		
			});

//////----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
//////		Working Code Awaits UI Functionality - when GUI functionality is made available on DEV these tests should pass (August 17th 2016)!
//////----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
			//--- Validate header level data error messages on - Contact Different Mailing Address - Street
			it('Validate header level data error messages on - Different Mailing Address - Street : ' + applicant.MailingAddress.Street, function() {	
				//----- Click on has different mailing address checkbox 
				CXLib.keyInPIFor(CXLib.Profile.MailingAddress, applicant, isnegativetest);
				CXLib.keyInPIFor(CXLib.Profile.MailingAddressStreet, applicant);
				CXLib.validate({'Page': CXLib.Pages.PersonalInformation, 
						'ValidateFor': CXLib.Validators.Errors,
						'Control' : CXLib.Profile.MailingAddressStreet,
						'MessageLocation' : CXLib.MessageLocations.Header});		
			});
			//--- Validate header level data error messages on - Contact Different Mailing Address - Street
			it('Validate header level data error messages on - Different Mailing Address - Street : ' + applicant.MailingAddress.Street, function() {	
				//----- Click on has different mailing address checkbox 
				CXLib.keyInPIFor(CXLib.Profile.MailingAddress, applicant, isnegativetest);
				CXLib.keyInPIFor(CXLib.Profile.MailingAddressStreet, applicant);
				CXLib.validate({'Page': CXLib.Pages.PersonalInformation, 
						'ValidateFor': CXLib.Validators.Errors,
						'Control' : CXLib.Profile.MailingAddressStreet,
						'MessageLocation' : CXLib.MessageLocations.Control});		
			});

			//--- Validate header level data error messages on - Contact Different Mailing Address - City
			it('Validate header level data error messages on - Different Mailing Address - City : ' + applicant.MailingAddress.City, function() {	
				//----- Click on has different mailing address checkbox 
				CXLib.keyInPIFor(CXLib.Profile.MailingAddress, applicant, isnegativetest);
				CXLib.keyInPIFor(CXLib.Profile.MailingAddressCity, applicant);
				CXLib.validate({'Page': CXLib.Pages.PersonalInformation, 
						'ValidateFor': CXLib.Validators.Errors,
						'Control' : CXLib.Profile.MailingAddressCity,
						'MessageLocation' : CXLib.MessageLocations.Header});		
			});
			//--- Validate header level data error messages on - Contact Different Mailing Address - City
			it('Validate header level data error messages on - Different Mailing Address - City : ' + applicant.MailingAddress.City, function() {	
				//----- Click on has different mailing address checkbox 
				CXLib.keyInPIFor(CXLib.Profile.MailingAddress, applicant, isnegativetest);
				CXLib.keyInPIFor(CXLib.Profile.MailingAddressCity, applicant);
				CXLib.validate({'Page': CXLib.Pages.PersonalInformation, 
						'ValidateFor': CXLib.Validators.Errors,
						'Control' : CXLib.Profile.MailingAddressCity,
						'MessageLocation' : CXLib.MessageLocations.Control});		
			});

			//--- Validate header level data error messages on - Contact Different Mailing Address - State
			it('Validate header level data error messages on - Different Mailing Address - State : ' + applicant.MailingAddress.State, function() {	
				//----- Click on has different mailing address checkbox 
				CXLib.keyInPIFor(CXLib.Profile.MailingAddress, applicant, isnegativetest);
				CXLib.keyInPIFor(CXLib.Profile.MailingAddressState, applicant);
				CXLib.validate({'Page': CXLib.Pages.PersonalInformation, 
						'ValidateFor': CXLib.Validators.Errors,
						'Control' : CXLib.Profile.MailingAddressState,
						'MessageLocation' : CXLib.MessageLocations.Header});		
			});
			//--- Validate header level data error messages on - Contact Different Mailing Address - State
			it('Validate header level data error messages on - Different Mailing Address - State : ' + applicant.MailingAddress.State, function() {	
				//----- Click on has different mailing address checkbox 
				CXLib.keyInPIFor(CXLib.Profile.MailingAddress, applicant, isnegativetest);
				CXLib.keyInPIFor(CXLib.Profile.MailingAddressState, applicant);
				CXLib.validate({'Page': CXLib.Pages.PersonalInformation, 
						'ValidateFor': CXLib.Validators.Errors,
						'Control' : CXLib.Profile.MailingAddressState,
						'MessageLocation' : CXLib.MessageLocations.Control});		
			});

			//--- Validate header level data error messages on - Contact Different Mailing Address - Zip
			it('Validate header level data error messages on - Different Mailing Address - Zip : ' + applicant.MailingAddress.Zip, function() {	
				//----- Click on has different mailing address checkbox 
				CXLib.keyInPIFor(CXLib.Profile.MailingAddress, applicant, isnegativetest);
				CXLib.keyInPIFor(CXLib.Profile.MailingAddressZip, applicant);
				CXLib.validate({'Page': CXLib.Pages.PersonalInformation, 
						'ValidateFor': CXLib.Validators.Errors,
						'Control' : CXLib.Profile.MailingAddressZip,
						'MessageLocation' : CXLib.MessageLocations.Header});		
			});
			//--- Validate header level data error messages on - Contact Different Mailing Address - Zip
			it('Validate header level data error messages on - Different Mailing Address - Zip : ' + applicant.MailingAddress.Zip, function() {	
				//----- Click on has different mailing address checkbox 
				CXLib.keyInPIFor(CXLib.Profile.MailingAddress, applicant, isnegativetest);
				CXLib.keyInPIFor(CXLib.Profile.MailingAddressZip, applicant);
				CXLib.validate({'Page': CXLib.Pages.PersonalInformation, 
						'ValidateFor': CXLib.Validators.Errors,
						'Control' : CXLib.Profile.MailingAddressZip,
						'MessageLocation' : CXLib.MessageLocations.Control});		
			});
//////----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

			//--- Validate header level data error messages on - Contact Phone
			it('Validate header level data error messages on - Contact Phone : ' + applicant.Contact.Phone, function() {	
				CXLib.keyInPIFor(CXLib.Profile.PhoneNumber, applicant);
				CXLib.validate({'Page': CXLib.Pages.PersonalInformation, 
						'ValidateFor': CXLib.Validators.Errors,
						'Control' : CXLib.Profile.PhoneNumber,
						'MessageLocation' : CXLib.MessageLocations.Header});		
			});
			//--- Validate header level data error messages on - Contact Phone
			it('Validate header level data error messages on - Contact Phone : ' + applicant.Contact.Phone, function() {	
				CXLib.keyInPIFor(CXLib.Profile.PhoneNumber, applicant);
				CXLib.validate({'Page': CXLib.Pages.PersonalInformation, 
						'ValidateFor': CXLib.Validators.Errors,
						'Control' : CXLib.Profile.PhoneNumber,
						'MessageLocation' : CXLib.MessageLocations.Control});		
			});


			//--- Validate header level data error messages on - Contact Email Address
			it('Validate header level data error messages on - Contact Email Address : ' + applicant.Contact.Email, function() {	
				CXLib.keyInPIFor(CXLib.Profile.EmailAddress, applicant);
				CXLib.validate({'Page': CXLib.Pages.PersonalInformation, 
						'ValidateFor': CXLib.Validators.Errors,
						'Control' : CXLib.Profile.EmailAddress,
						'MessageLocation' : CXLib.MessageLocations.Header});		
			});
			//--- Validate header level data error messages on - Contact Email Address
			it('Validate header level data error messages on - Contact Email Address : ' + applicant.Contact.Email, function() {	
				CXLib.keyInPIFor(CXLib.Profile.EmailAddress, applicant);
				CXLib.validate({'Page': CXLib.Pages.PersonalInformation, 
						'ValidateFor': CXLib.Validators.Errors,
						'Control' : CXLib.Profile.EmailAddress,
						'MessageLocation' : CXLib.MessageLocations.Control});		
			});

		//-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
		//--- Validate CX : PAGE : Personal Information : Field Data Errors : Broker Details
		//-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

			//--- Validate header level data error messages on - Broker Number
			it('Validate header level data error messages on - Broker Number : ' + applicant.Broker.Number, function() {	
				//----- Click on has broker checkbox 
				CXLib.keyInPIFor(CXLib.Profile.BrokerWorked, applicant);
				CXLib.keyInPIFor(CXLib.Profile.BrokerNumber, applicant);
				CXLib.validate({'Page': CXLib.Pages.PersonalInformation, 
						'ValidateFor': CXLib.Validators.Errors,
						'Control' : CXLib.Profile.BrokerNumber,
						'MessageLocation' : CXLib.MessageLocations.Header});		
			});
			//--- Validate header level data error messages on - Broker Number
			it('Validate header level data error messages on - Broker Number : ' + applicant.Broker.Number, function() {	
				//----- Click on has broker checkbox 
				CXLib.keyInPIFor(CXLib.Profile.BrokerNumber, applicant);
				CXLib.validate({'Page': CXLib.Pages.PersonalInformation, 
						'ValidateFor': CXLib.Validators.Errors,
						'Control' : CXLib.Profile.BrokerNumber,
						'MessageLocation' : CXLib.MessageLocations.Control});		
			});

		  })(Data.cx.ErrorValidation.PersonalInformation[index]);
	}
});