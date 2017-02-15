// Author : Uday Thombre
// Email : uthombre@delta.org
//
// Validate fileds on CX home page - Personal Information

var CXLib = require('../framework/cx_gui_libraries.js');
var Controls = require('../framework/cx_gui.json');
var Data = require('../data/cx_data_personalinformation.json');

describe('Profile Validation - Manual Field Entries', function() {

	var applicant;
	var pageLoaded = false;

	beforeEach(function() {
		if (!pageLoaded){
			CXLib.navigateToPage(CXLib.Navigation.PersonalInformationPage);
			pageLoaded =  true;
		}
	});

	for (var index = 0; index < Data.cx.PersonalInformation.length; index++ )
	{
		(function (applicant) {

			//--- Applicant Name - First
			it('Enter & Validate Primary/First Name : ' + applicant.Profile.Name.First, function() {	
				CXLib.keyInPIFor(CXLib.Profile.PrimaryName, applicant);
			});

			//--- Applicant Name - Middle
			it('Enter & Validate Middle Initial : ' + applicant.Profile.Name.Middle, function() {	
				CXLib.keyInPIFor(CXLib.Profile.MiddleName, applicant);
			});

			//--- Applicant Name - Last
			it('Enter & Validate Last Name : ' + applicant.Profile.Name.Last, function() {	
				CXLib.keyInPIFor(CXLib.Profile.LastName, applicant);
			});

			//--- Applicant Gender
			it('Enter & Validate Gender : ' + applicant.Profile.Gender, function() {	
				CXLib.keyInPIFor(CXLib.Profile.Gender, applicant);
			});

			//--- Applicant Birthdate - Month
			it('Enter & Validate Birthdate Month : ' + applicant.Profile.DOB.Month, function() {	
				CXLib.keyInPIFor(CXLib.Profile.DOBMonth, applicant);
			});

			//--- Applicant Birthdate - Day
			it('Enter & Validate Birthdate Day : ' + applicant.Profile.DOB.Day, function() {	
				CXLib.keyInPIFor(CXLib.Profile.DOBDate, applicant);
			});

			//--- Applicant Birthdate - Year
			it('Enter & Validate Birthdate Year : ' + applicant.Profile.DOB.Year, function() {	
				CXLib.keyInPIFor(CXLib.Profile.DOBYear, applicant);
			});

			//--- Applicant SSN
			it('Enter & Validate Social Security : ' + applicant.Profile.SSN, function() {	
				CXLib.keyInPIFor(CXLib.Profile.SSNumber, applicant);
			});

			//--- Applicant Contact Address - Street
			it('Enter & Validate Contact Address - Street : ' + applicant.Contact.Street, function() {	
				CXLib.keyInPIFor(CXLib.Profile.ContactStreet, applicant);
			});

			//--- Applicant Contact Address - City
			it('Enter & Validate Contact Address - City : ' + applicant.Contact.City, function() {	
				CXLib.keyInPIFor(CXLib.Profile.ContactCity, applicant);
			});

			//--- Applicant Contact Address - State
			it('Enter & Validate Contact Address - State : ' + applicant.Contact.State, function() {	
				CXLib.keyInPIFor(CXLib.Profile.ContactState, applicant);
			});

			//--- Applicant Contact Address - Zip
			it('Enter & Validate Contact Address - Zip : ' + applicant.Contact.Zip, function() {	
				CXLib.keyInPIFor(CXLib.Profile.ContactZip, applicant);
			});

//////----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
//////		Working Code Awaits UI Functionality - when GUI functionality is made available on DEV these tests should pass (August 17th 2016)!
//////----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
			//--- Applicant Contact Different Mailing Address - Check/Uncheck
			it('Enter & Validate Different Mailing Address - Check/Uncheck : ', function() {	
				CXLib.keyInPIFor(CXLib.Profile.MailingAddress, applicant);
			});

			//--- Applicant Contact Different Mailing Address - Street
			it('Enter & Validate Different Mailing Address - Street : ' + applicant.MailingAddress.Street, function() {	
				CXLib.keyInPIFor(CXLib.Profile.MailingAddressStreet, applicant);
			});

			//--- Applicant Contact Different Mailing Address - City
			it('Enter & Validate Different Mailing Address - City : ' + applicant.MailingAddress.City, function() {	
				CXLib.keyInPIFor(CXLib.Profile.MailingAddressCity, applicant);
			});

			//--- Applicant Contact Different Mailing Address - State
			it('Enter & Validate Different Mailing Address - State : ' + applicant.MailingAddress.State, function() {	
				CXLib.keyInPIFor(CXLib.Profile.MailingAddressState, applicant);
			});

			//--- Applicant Contact Different Mailing Address - Zip
			it('Enter & Validate Different Mailing Address - Zip : ' + applicant.MailingAddress.Zip, function() {	
				CXLib.keyInPIFor(CXLib.Profile.MailingAddressZip, applicant);
			});
//////----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

			//--- Applicant Contact Phone Type
			it('Enter & Validate Contact Phone Type : ' + applicant.Contact.PhoneType, function() {	
				CXLib.keyInPIFor(CXLib.Profile.PhoneType, applicant);
			});

			//--- Applicant Contact Phone
			it('Enter & Validate Contact Phone : ' + applicant.Contact.Phone, function() {	
				CXLib.keyInPIFor(CXLib.Profile.PhoneNumber, applicant);
			});

			//--- Applicant Contact Email Address
			it('Enter & Validate Contact Email Address : ' + applicant.Contact.Email, function() {	
				CXLib.keyInPIFor(CXLib.Profile.EmailAddress, applicant);
			});

			//--- Applicant Communication Paperless
			it('Enter & Validate Communication Paperless : ' + applicant.GoPaperless, function() {	
				CXLib.keyInPIFor(CXLib.Profile.GoPaperless, applicant);
			});

			//--- Applicant Has Broker
			it('Enter & Validate Has Broker : ' + applicant.Broker.Have, function() {	
				CXLib.keyInPIFor(CXLib.Profile.BrokerWorked, applicant);
			});

			//--- Applicant Broker Number
			it('Enter & Validate Broker Number : ' + applicant.Broker.Number, function() {	
				CXLib.keyInPIFor(CXLib.Profile.BrokerNumber, applicant);
			});

			//--- Applicant Broker Name
			it('Validate Broker Name : ' + applicant.Broker.Name, function() {	
				CXLib.keyInPIFor(CXLib.Profile.BrokerName, applicant);
			});

			//--- Applicant Selects "Next"
			it('Select & Validate "Next" Button Actions : ', function() {	
				CXLib.keyInPIFor(CXLib.Profile.Next, applicant);
			});


		  })(Data.cx.PersonalInformation[index]);
	}
	
});
////
////
//////--- .gm_accessors_.place.Qc.gm_accessors_.input.Qc.j
//////--- NZ.gm_accessors_
//////--- div.pac-item (.gm_accessors_.place.Qc.gm_accessors_.input.Qc.j["0"])
////
