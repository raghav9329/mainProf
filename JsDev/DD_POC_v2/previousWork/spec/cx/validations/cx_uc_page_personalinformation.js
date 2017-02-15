// Author : Uday Thombre
// Email : uthombre@delta.org
//
// CX : Use Case Validation : Personal Information Page

var CXLib = require('../framework/cx_gui_libraries.js');
var Controls = require('../framework/cx_gui.json');
var Data = require('../data/cx_data_personalinformation.json');

describe('Profile Validation - Manual Field Entries', function() {

	var applicant;
	var pageLoaded = false;
	var is_checked = "No";
	var deltadentalplans;

	beforeEach(function() {
		if (!pageLoaded){
			CXLib.navigateToPage(CXLib.Navigation.PersonalInformationPage);
			////--- CXLib.openCXApplication();
			pageLoaded =  true;
		}
	});

	for (var index = 0; index < Data.cx.PersonalInformation.length; index++ )
	{
		(function (applicant) {

			/* it('Customer enters data for the required Profile fields - Verify data passed from the Delta Dental Plans is stored locally at the page at hidden fields', function() {	
				deltadentalplans = CXLib.planInformation();
				CXLib.validatePIInformation(CXLib.Enroll.ZipCode, deltadentalplans.DeltaDentalPlan.Applicant.ZipCode);
			}); */
			
			//--- CX : PAGE : Personal Information : Plan Summary : Validate for all summary elements.
			it('CX : PAGE : Personal Information : Plan Summary : Validate for all summary elements.', function() {
				CXLib.validate({'Page': CXLib.Pages.PersonalInformation, 
								'ValidateFor': CXLib.Validators.Summary,
								'Control' : CXLib.PlanSummary.ValidateAll,
								'DataCSS' : applicant.Plan});		
			});
			
			//--- Customer enters data for the required Profile fields -  Data appears exactly as the Customer entered it in each field.
			it('Customer enters data for the required Profile fields -  Data appears exactly as the Customer entered it in each field : ', function() {	
				CXLib.keyInPIFor(CXLib.Profile.PrimaryName, applicant);
				CXLib.keyInPIFor(CXLib.Profile.MiddleName, applicant);
				CXLib.keyInPIFor(CXLib.Profile.LastName, applicant);
				CXLib.keyInPIFor(CXLib.Profile.Gender, applicant);
				CXLib.keyInPIFor(CXLib.Profile.DOBMonth, applicant);
				CXLib.keyInPIFor(CXLib.Profile.DOBDate, applicant);
				CXLib.keyInPIFor(CXLib.Profile.DOBYear, applicant);
				CXLib.keyInPIFor(CXLib.Profile.SSNumber, applicant);
				CXLib.keyInPIFor(CXLib.Profile.AlternateIdentifier, applicant);
				CXLib.keyInPIFor(CXLib.Profile.PhoneType, applicant);
				CXLib.keyInPIFor(CXLib.Profile.EmailAddress, applicant);
				CXLib.keyInPIFor(CXLib.Profile.PhoneNumber, applicant);
				CXLib.keyInPIFor(CXLib.Profile.GoPaperless, applicant);
				
				deltadentalplans = CXLib.planInformation();
				console.log("delta plans");
				console.log(deltadentalplans);
				CXLib.validatePIInformation(CXLib.Enroll.ZipCode, deltadentalplans.DeltaDentalPlan.Applicant.ZipCode);
			});
			
			//--- Customer enters data for the required Profile fields -  As data is entered and the Customer moves to the next field, each LostFocus event triggers the background Ajax call to validate the specific field.
			it('Customer enters data for the required Profile fields -  As data is entered and the Customer moves to the next field, each LostFocus event triggers the background Ajax call to validate the specific field : ', function() {	
				CXLib.keyInPIFor(CXLib.Profile.ContactStreet, applicant);
				CXLib.keyInPIFor(CXLib.Profile.ContactCity, applicant);
				/* Application functionality still under constructions...
				CXLib.keyInPIFor(CXLib.Profile.ContactState, applicant);
				CXLib.keyInPIFor(CXLib.Profile.ContactZip, applicant);
				if (Controls.cx.page.PersonalInformation.Contact.Address.Zip.overlay.alert.dialog) {
					CXLib.keyInPIFor(CXLib.Profile.ContactZipAlertGoBack, applicant);
				} */
				CXLib.keyInPIFor(CXLib.Profile.MailingAddress, applicant);
				CXLib.keyInPIFor(CXLib.Profile.MailingAddressStreet, applicant);
				CXLib.keyInPIFor(CXLib.Profile.MailingAddressCity, applicant);
				CXLib.keyInPIFor(CXLib.Profile.MailingAddressState, applicant);
				CXLib.keyInPIFor(CXLib.Profile.MailingAddressZip, applicant);
				CXLib.keyInPIFor(CXLib.Profile.BrokerWorked, applicant);
				CXLib.keyInPIFor(CXLib.Profile.BrokerNumber, applicant);
			});
			
			
			//--- Customer enters data for the required Profile fields -  One Next, User entered data is updated to HCentive and next page is displayed.
			it('Customer enters data for the required Profile fields -  One Next, User entered data is updated to HCentive and next page is displayed : ', function() {	
				//--- Applicant Selects "Next" on Personal Information Page
				CXLib.keyInPIFor(CXLib.Profile.Next, applicant);
				
				//--- Validate next page is displayed with back button here ---
			});
			
			//--- Customer enters data for the required Profile fields -  One Back, User is returned to the Personal Information page, user entered data is retreieved from HCentive and displayed on the page.
			it('Customer enters data for the required Profile fields -  One Back, User is returned to the Personal Information page, user entered data is retreieved from HCentive and displayed on the page : ', function() {
				
				//--- Applicant Selects "Back" on Dependents Page
				CXLib.keyInPIFor(CXLib.Dependents.Back, applicant);
/////----------------------------------------------------------------------------------------------------------------------------------------------------				
				//--- Validate/Verify that, Data appears exactly as the Customer entered it in each field.
/////----------------------------------------------------------------------------------------------------------------------------------------------------				
				/* CXLib.validate({'Page': CXLib.Pages.PersonalInformation, 
						'ValidateFor': CXLib.Validators.Information,
						'Control' : CXLib.Plan.Company,
						'WithData' : applicant.Plan.Name,
						'IsGreaterOk' : true});	 */
				CXLib.validate({'Page': CXLib.Pages.PersonalInformation, 
						'ValidateFor': CXLib.Validators.Information,
						'Control' : CXLib.Plan.Company,
						'WithData' : Controls.cx.page.PersonalInformation.Header.Company.caption,
						'IsGreaterOk' : true});
				CXLib.validate({'Page': CXLib.Pages.PersonalInformation, 
						'ValidateFor': CXLib.Validators.Information,
						'Control' : CXLib.Plan.Price,
						'WithData' : applicant.Plan.Price,
						'IsGreaterOk' : true});
				CXLib.validate({'Page': CXLib.Pages.PersonalInformation, 
						'ValidateFor': CXLib.Validators.Information,
						'Control' : CXLib.Plan.Fee,
						'WithData' : applicant.Plan.Fee,
						'IsGreaterOk' : true});
				CXLib.validate({'Page': CXLib.Pages.PersonalInformation, 
						'ValidateFor': CXLib.Validators.Information,
						'Control' : CXLib.Plan.Title,
						'WithData' : applicant.Plan.Title,
						'IsGreaterOk' : true});
				CXLib.validate({'Page': CXLib.Pages.PersonalInformation, 
						'ValidateFor': CXLib.Validators.Information,
						'Control' : CXLib.Plan.Description,
						'WithData' : applicant.Plan.Description,
						'IsGreaterOk' : true});
				CXLib.validate({'Page': CXLib.Pages.PersonalInformation, 
						'ValidateFor': CXLib.Validators.Information,
						'Control' : CXLib.Profile.PrimaryName,
						'WithData' : applicant.Profile.Name.First,
						'IsGreaterOk' : true});
				CXLib.validate({'Page': CXLib.Pages.PersonalInformation, 
						'ValidateFor': CXLib.Validators.Information,
						'Control' : CXLib.Profile.MiddleName,
						'WithData' : applicant.Profile.Name.Middle,
						'IsGreaterOk' : true});
				CXLib.validate({'Page': CXLib.Pages.PersonalInformation, 
						'ValidateFor': CXLib.Validators.Information,
						'Control' : CXLib.Profile.LastName,
						'WithData' : applicant.Profile.Name.Last,
						'IsGreaterOk' : true});
				CXLib.validate({'Page': CXLib.Pages.PersonalInformation, 
						'ValidateFor': CXLib.Validators.Information,
						'Control' : CXLib.Profile.Gender,
						'WithData' : applicant.Profile.Gender,
						'IsGreaterOk' : true});
				CXLib.validate({'Page': CXLib.Pages.PersonalInformation, 
						'ValidateFor': CXLib.Validators.Information,
						'Control' : CXLib.Profile.DOBMonth,
						'WithData' : applicant.Profile.DOB.Month,
						'IsGreaterOk' : true});
				CXLib.validate({'Page': CXLib.Pages.PersonalInformation, 
						'ValidateFor': CXLib.Validators.Information,
						'Control' : CXLib.Profile.DOBDate,
						'WithData' : applicant.Profile.DOB.Day,
						'IsGreaterOk' : true});
				CXLib.validate({'Page': CXLib.Pages.PersonalInformation, 
						'ValidateFor': CXLib.Validators.Information,
						'Control' : CXLib.Profile.DOBYear,
						'WithData' : applicant.Profile.DOB.Year,
						'IsGreaterOk' : true});
				CXLib.validate({'Page': CXLib.Pages.PersonalInformation, 
						'ValidateFor': CXLib.Validators.Information,
						'Control' : CXLib.Profile.SSNumber,
						'WithData' : applicant.Profile.SSN,
						'IsGreaterOk' : true});
				CXLib.validate({'Page': CXLib.Pages.PersonalInformation, 
						'ValidateFor': CXLib.Validators.Information,
						'Control' : CXLib.Profile.ContactStreet,
						'WithData' : applicant.Contact.Street,
						'IsGreaterOk' : true});
				CXLib.validate({'Page': CXLib.Pages.PersonalInformation, 
						'ValidateFor': CXLib.Validators.Information,
						'Control' : CXLib.Profile.ContactCity,
						'WithData' : applicant.Contact.City,
						'IsGreaterOk' : true});
				CXLib.validate({'Page': CXLib.Pages.PersonalInformation, 
						'ValidateFor': CXLib.Validators.Information,
						'Control' : CXLib.Profile.ContactState,
						'WithData' : applicant.Contact.State,
						'IsGreaterOk' : true});
				CXLib.validate({'Page': CXLib.Pages.PersonalInformation, 
						'ValidateFor': CXLib.Validators.Information,
						'Control' : CXLib.Profile.ContactZip,
						'WithData' : applicant.Contact.Zip,
						'IsGreaterOk' : true});
				
				//--- Data Driven controller to re-validate Different Mailing Address checkbox is checked or not.
				if (!applicant.MailingAddress.Street && !applicant.MailingAddress.City && !applicant.MailingAddress.State && !applicant.MailingAddress.Zip) {
					is_checked = 'Yes';
					CXLib.validate({'Page': CXLib.Pages.PersonalInformation, 
						'ValidateFor': CXLib.Validators.Information,
						'Control' : CXLib.Profile.MailingAddress,
						'WithData' : is_checked,
						'IsGreaterOk' : true});
					CXLib.validate({'Page': CXLib.Pages.PersonalInformation, 
						'ValidateFor': CXLib.Validators.Information,
						'Control' : CXLib.Profile.MailingAddressStreet,
						'WithData' : applicant.MailingAddress.Street,
						'IsGreaterOk' : true});
					CXLib.validate({'Page': CXLib.Pages.PersonalInformation, 
						'ValidateFor': CXLib.Validators.Information,
						'Control' : CXLib.Profile.MailingAddressCity,
						'WithData' : applicant.MailingAddress.City,
						'IsGreaterOk' : true});
					CXLib.validate({'Page': CXLib.Pages.PersonalInformation, 
						'ValidateFor': CXLib.Validators.Information,
						'Control' : CXLib.Profile.MailingAddressState,
						'WithData' : applicant.MailingAddress.State,
						'IsGreaterOk' : true});
					CXLib.validate({'Page': CXLib.Pages.PersonalInformation, 
						'ValidateFor': CXLib.Validators.Information,
						'Control' : CXLib.Profile.MailingAddressZip,
						'WithData' : applicant.MailingAddress.Zip,
						'IsGreaterOk' : true});
				} else {
					is_checked = 'No';
					CXLib.validate({'Page': CXLib.Pages.PersonalInformation, 
						'ValidateFor': CXLib.Validators.Information,
						'Control' : CXLib.Profile.MailingAddress,
						'WithData' : is_checked,
						'IsGreaterOk' : true});
				}
				
				CXLib.validate({'Page': CXLib.Pages.PersonalInformation, 
						'ValidateFor': CXLib.Validators.Information,
						'Control' : CXLib.Profile.PhoneType,
						'WithData' : applicant.Contact.PhoneType,
						'IsGreaterOk' : true});
				CXLib.validate({'Page': CXLib.Pages.PersonalInformation, 
						'ValidateFor': CXLib.Validators.Information,
						'Control' : CXLib.Profile.PhoneNumber,
						'WithData' : applicant.Contact.Phone,
						'IsGreaterOk' : true});
				CXLib.validate({'Page': CXLib.Pages.PersonalInformation, 
						'ValidateFor': CXLib.Validators.Information,
						'Control' : CXLib.Profile.EmailAddress,
						'WithData' : applicant.Contact.Email,
						'IsGreaterOk' : true});

				//--- Data Driven controller to re-validate Go Paperless checkbox is checked or not.
				CXLib.validate({'Page': CXLib.Pages.PersonalInformation, 
						'ValidateFor': CXLib.Validators.Information,
						'Control' : CXLib.Profile.GoPaperless,
						'WithData' : applicant.GoPaperless,
						'IsGreaterOk' : true});

				//--- Data Driven controller to re-validate Has Broker checkbox is checked or not.
				CXLib.validate({'Page': CXLib.Pages.PersonalInformation, 
						'ValidateFor': CXLib.Validators.Information,
						'Control' : CXLib.Profile.BrokerWorked,
						'WithData' : applicant.Broker.Have,
						'IsGreaterOk' : true});
				CXLib.validate({'Page': CXLib.Pages.PersonalInformation, 
						'ValidateFor': CXLib.Validators.Information,
						'Control' : CXLib.Profile.BrokerNumber,
						'WithData' : applicant.Broker.Number,
						'IsGreaterOk' : true});
				CXLib.validate({'Page': CXLib.Pages.PersonalInformation, 
						'ValidateFor': CXLib.Validators.Information,
						'Control' : CXLib.Profile.BrokerName,
						'WithData' : applicant.Broker.Name,
						'IsGreaterOk' : true});
/////----------------------------------------------------------------------------------------------------------------------------------------------------
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
