// Author : Uday Thombre
// Email : uthombre@delta.org
//
// CX : Use Case Validation : Personal Information Page

var CXLib = require('../framework/cx_gui_libraries.js');
var Data = require('../data/cx_data_e2e_deltadentalplan_purchase.json');
var Commons = require('../framework/cx_commons.js');
var Structures = require('../framework/cx_structures.js');

describe('End-to-End Validation - Delta Dental Plan Purchase', function() {

	var applicant;
	var pageLoaded = false;
	var is_checked = "No";

	beforeEach(function() {
		if (!pageLoaded){
			/* CXLib.navigateToPage({'Page' : Structures.Navigation.DITGetAQuote,
								  'DataCSS' : Data.cx.Environment}); */
								  
			CXLib.navigateToPage({'Page' : Structures.Navigation.MOTGetAQuote,
								  'DataCSS' : Data.cx.Environment});
								  
			/* CXLib.navigateToPage({'Page' : Structures.Navigation.PersonalInformationPage,
								  'DataCSS' : Data.cx.Environment}); */
								  
			pageLoaded =  true;
		}
		jasmine.DEFAULT_TIMEOUT_INTERVAL = 75000;
	});

	for (var index = 0; index < Data.cx.UseCases.length; index++ )
	{
		(function (applicant) {
			it('CX : PAGE : Personal Information : Plan Summary : Validate for all summary elements.', function() {
				CXLib.validate({'Page': Structures.Pages.PersonalInformation, 
								'ValidateFor': Structures.Validators.Summary,
								'Control' : Structures.PlanSummary.All,
								'DataCSS' : applicant.Plan});		
			});
			it('CX : Personal Information Page : Verify all the components on the page are displayed.', function() {	
				CXLib.validate({'Page': Structures.Pages.PersonalInformation, 
								'ValidateFor': Structures.Validators.Caption,
								'Control' : Structures.Profile.ValidateAll});
				CXLib.validate({'Page': Structures.Pages.PersonalInformation, 
								'ValidateFor': Structures.Validators.Placeholder,
								'Control' : Structures.Profile.ValidateAll});
			});
			it('Customer enters data for the required Profile fields -  Name (First, Middle Last), Gender, Birthdate (MM/DD/YYYY), SSN, Alternate Identifier, Phone (Type, Number), Emal Address, Go Paperless : ', function() {	
				CXLib.keyInPIFor({'Control' : Structures.Profile.PrimaryName, 'DataCSS' : applicant});
				CXLib.keyInPIFor({'Control' : Structures.Profile.MiddleName, 'DataCSS' : applicant});
				CXLib.keyInPIFor({'Control' : Structures.Profile.LastName, 'DataCSS' : applicant});
				CXLib.keyInPIFor({'Control' : Structures.Profile.Gender, 'DataCSS' : applicant});
				CXLib.keyInPIFor({'Control' : Structures.Profile.DOBMonth, 'DataCSS' : applicant});
				CXLib.keyInPIFor({'Control' : Structures.Profile.DOBDate, 'DataCSS' : applicant});
				CXLib.keyInPIFor({'Control' : Structures.Profile.DOBYear, 'DataCSS' : applicant});
				CXLib.keyInPIFor({'Control' : Structures.Profile.SSNumber, 'DataCSS' : applicant});
				CXLib.keyInPIFor({'Control' : Structures.Profile.AlternateIdentifier, 'DataCSS' : applicant});
				CXLib.keyInPIFor({'Control' : Structures.Profile.PhoneType, 'DataCSS' : applicant});
				CXLib.keyInPIFor({'Control' : Structures.Profile.EmailAddress, 'DataCSS' : applicant});
				CXLib.keyInPIFor({'Control' : Structures.Profile.PhoneNumber, 'DataCSS' : applicant});
				CXLib.keyInPIFor({'Control' : Structures.Profile.GoPaperless, 'DataCSS' : applicant});
				
			});		
			it('Customer enters data for the required Profile fields - Service Address (Street, City), Mailing Address (Street, City, State, Zip), Broker (Has Worked, Number)  : ', function() {	
				CXLib.keyInPIFor({'Control' : Structures.Profile.ContactStreet, 'DataCSS' : applicant});
				CXLib.keyInPIFor({'Control' : Structures.Profile.ContactCity, 'DataCSS' : applicant});
				
				/*Application functionality still under constructions...
				CXLib.keyInPIFor({'Control' : Structures.Profile.ContactState, 'DataCSS' : applicant});
				CXLib.keyInPIFor({'Control' : Structures.Profile.ContactZip, 'DataCSS' : applicant});
				if (Controls.cx.page.PersonalInformation.Contact.Address.Zip.overlay.alert.dialog) {
					CXLib.keyInPIFor({'Control' : Structures.Profile.ContactZipAlertGoBack, 'DataCSS' : applicant});
				} 
				CXLib.keyInPIFor({'Control' : Structures.Profile.MailingAddress, 'DataCSS' : applicant});
				CXLib.keyInPIFor({'Control' : Structures.Profile.MailingAddressStreet, 'DataCSS' : applicant});
				CXLib.keyInPIFor({'Control' : Structures.Profile.MailingAddressCity, 'DataCSS' : applicant});
				CXLib.keyInPIFor({'Control' : Structures.Profile.MailingAddressState, 'DataCSS' : applicant});
				CXLib.keyInPIFor({'Control' : Structures.Profile.MailingAddressZip, 'DataCSS' : applicant});
				CXLib.keyInPIFor({'Control' : Structures.Profile.BrokerWorked, 'DataCSS' : applicant});
				//--- CXLib.keyInPIFor({'Control' : Structures.Profile.BrokerNumber, 'DataCSS' : applicant});
				*/
			});
			it('HCentive Recording : [Next] on Personal Information Page', function() {	
				//--- [Next] on Personal Information Page
				CXLib.keyInPIFor({'Control' : Structures.Profile.Next, 'DataCSS' : applicant});
				
				//--- Log all errors when occur on the page here...
			});
				
			//--- CX : Dependents : Add dependents on this plan.
			for (var idependent = 0; idependent < applicant.Dependents.length; idependent++)
			{
				(function (dependent) {					
					//--- CX : PAGE : Dependents : Plan Summary : Validate for all summary elements.
					//--- scripting remaining to add/update plan summary based on number of dependents.
					it('CX : PAGE : Dependents : Plan Summary : Validate for all summary elements.', function() {
						CXLib.validate({'Page': Structures.Pages.Dependents, 
										'ValidateFor': Structures.Validators.Summary,
										'Control' : Structures.PlanSummary.ValidateAll,
										'DataCSS' : applicant.Plan});		
					});
					it('Add Dependents - The Dependent page should display Dependent field sections for the number of persons requested during the "Get a Quote" process minus one, (i.e. 3 persons covered = 1 Primary Enrollee plus 2 Dependents) for : ' + dependent.Name.First + ' .' + dependent.Name.Middle + '.' + dependent.Name.Last + '(' + dependent.Relationship + ').', function() {		
						/* //--- need the addition of dependent functionality to be rearranged.
						CXLib.keyInDependentsFor({'Control' : CXLib.Dependents.Add, dependent});
						//--- */
						/* CXLib.validateDependentCaptions({'Control' : Structures.Dependents.ValidateAll, 'DataCSS' : dependent});
						CXLib.validateDependentPlaceholders({'Control' : Structures.Dependents.ValidateAll, 'DataCSS' : dependent}); */
						CXLib.validate({'Page': Structures.Pages.Dependents, 
										'ValidateFor': Structures.Validators.Caption,
										'Control' : Structures.PlanSummary.ValidateAll,
										'DataCSS' : dependent});
						CXLib.validate({'Page': Structures.Pages.Dependents, 
										'ValidateFor': Structures.Validators.Placeholder,
										'Control' : Structures.PlanSummary.ValidateAll,
										'DataCSS' : dependent});
						
						CXLib.keyInDependentsFor({'Control' : Structures.Dependents.Relationship, 'DataCSS' : dependent});
						CXLib.keyInDependentsFor({'Control' : Structures.Dependents.FirstName, 'DataCSS' : dependent});
						CXLib.keyInDependentsFor({'Control' : Structures.Dependents.MiddleInitial, 'DataCSS' : dependent});
						CXLib.keyInDependentsFor({'Control' : Structures.Dependents.LastName, 'DataCSS' : dependent});
						CXLib.keyInDependentsFor({'Control' : Structures.Dependents.Gender, 'DataCSS' : dependent});
						CXLib.keyInDependentsFor({'Control' : Structures.Dependents.DOBMonth, 'DataCSS' : dependent});
						CXLib.keyInDependentsFor({'Control' : Structures.Dependents.DOBDate, 'DataCSS' : dependent});
						CXLib.keyInDependentsFor({'Control' : Structures.Dependents.DOBYear, 'DataCSS' : dependent});		
						
					});
				})(applicant.Dependents[idependent]);		  
			}
			
			it('HCentive Recording : [Next] on Dependents page : Facility Page : Verify & validate Captions and Placeholders ', function() {	
				//--- [Next] on Dependents page
				CXLib.keyInDependentsFor({'Control' : Structures.Dependents.Next});
				
				//--- Log all errors when occur on the page here...
				
				//--- [Ccontinue] on Dependent page's alert Premium Change
				CXLib.keyInFacilitiesFor({'Control' : Structures.Facilities.OnAlertContinue});
				
				//--- Log all errors when occur on the page here...
				
				//--- CX : Facility Page : Verify & validate Captions.
				CXLib.validate({'Page' : Structures.Pages.Facilities,
								'Control' : Structures.Facilities.Search,
								'ValidateFor' : Structures.Validators.Caption});
				CXLib.validate({'Page' : Structures.Pages.Facilities,
								'Control' : Structures.Facilities.Back,
								'ValidateFor' : Structures.Validators.Caption});
				CXLib.validate({'Page' : Structures.Pages.Facilities,
								'Control' : Structures.Facilities.Next,
								'ValidateFor' : Structures.Validators.Caption});
				CXLib.validate({'Page' : Structures.Pages.Facilities,
								'Control' : Structures.Facilities.MoreResults,
								'ValidateFor' : Structures.Validators.Caption});
				CXLib.validate({'Page' : Structures.Pages.Facilities,
								'Control' : Structures.Facilities.Facility,
								'ValidateFor' : Structures.Validators.Caption});
				CXLib.validate({'Page' : Structures.Pages.Facilities,
								'Control' : Structures.Facilities.Applicants,
								'ValidateFor' : Structures.Validators.Caption});
				CXLib.validate({'Page' : Structures.Pages.Facilities,
								'Control' : Structures.Facilities.RecentlySelected,
								'ValidateFor' : Structures.Validators.Caption});
				
				//--- CX : Facility Page : Verify & validate Placeholders.
				CXLib.validate({'Page' : Structures.Pages.Facilities,
								'Control' : Structures.Facilities.Search,
								'ValidateFor' : Structures.Validators.Placeholder});
			});	

			//--- CX : PAGE : Facilities : Plan Summary : Validate for all summary elements.
			it('CX : PAGE : Facilities : Plan Summary : Validate for all summary elements.', function() {
				CXLib.validate({'Page': Structures.Pages.Facilities, 
								'ValidateFor': Structures.Validators.Summary,
								'Control' : Structures.PlanSummary.ValidateAll,
								'DataCSS' : applicant.Plan});		
			});

			//--- CX : Facility Page : Select a facility at locations.
			for (var ifacility = 0; ifacility < applicant.Facilities.Identifiers.length; ifacility++)
			{
				(function (facility) {
					it('CX : Facility Page : Select a facility at location(' + ifacility + ')', function() {	
						CXLib.keyInFacilitiesFor({'Control' : Structures.Facilities.Facility,
												  'DataCSS' : facility,
												  'Indice' : ifacility});
						CXLib.keyInFacilitiesFor({'Control' : Structures.Facilities.Next});
						
						//--- Log all errors when occur on the page here...
					});
				})(applicant.Facilities.Identifiers[ifacility]);		  
			}

			//--- CX : Payment & Receipt Page : Verify & validate captions and placeholders.
			it('CX : Payment & Receipt Page : Verify & validate captions and placeholders.', function() {	
				CXLib.validate({'Page' : Structures.Pages.PaymentReceipt,
								'Control' : Structures.PaymentReview.ValidateAll,
								'ValidateFor' : Structures.Validators.Caption});
				CXLib.validate({'Page' : Structures.Pages.PaymentReceipt,
								'Control' : Structures.PaymentReview.ValidateAll,
								'ValidateFor' : Structures.Validators.Placeholder});
				CXLib.keyInPaymentReviewFor({'Control' : Structures.PaymentReview.PurchaseNow});
			});
			
			//--- CX : Payment & Receipt Page : Plan Summary : Validate for all summary elements.
			it('CX : Payment & Receipt Page : Plan Summary : Validate for all summary elements.', function() {
				CXLib.validate({'Page': Structures.Pages.PaymentReceipt, 
								'ValidateFor': Structures.Validators.Summary,
								'Control' : Structures.PlanSummary.ValidateAll,
								'DataCSS' : applicant.Plan});		
			});

			//--- CX : Payment & Receipt Page : Verify & validate errors
			it('CX : Payment & Receipt Page : Verify & validate errors.', function() {	
				CXLib.keyInPaymentReviewFor({'Control' : Structures.PaymentReview.PurchaseNow});
				CXLib.validate({'Page' : Structures.Pages.PaymentReceipt,
								'Control' : Structures.PaymentReview.ValidateAll,
								'ValidateFor' : Structures.Validators.Errors});
			});

			//--- CX : Payment & Receipt Page : Enter valid data
			it('CX : Payment & Receipt Page : Enter valid data.', function() {	
				var is_default_mailing_address = (applicant.Payment.Card.MailingAddress.Exists == "Yes") ? false :  true;
				CXLib.keyInPaymentReviewFor({'Control' : Structures.PaymentReview.NameOnCard, 'DataCSS' : applicant.Payment});
				CXLib.keyInPaymentReviewFor({'Control' : Structures.PaymentReview.CardNumber, 
										     'DataCSS' : applicant.Payment,
											 'CardCategory' : Structures.PaymentCardCategory.ApprovalRegular,
											 'CardLocale' : Structures.PaymentCardLocale.USA});
				CXLib.keyInPaymentReviewFor({'Control' : Structures.PaymentReview.ExpirationMonth, 'DataCSS' : applicant.Payment});
				CXLib.keyInPaymentReviewFor({'Control' : Structures.PaymentReview.ExpirationYear, 'DataCSS' : applicant.Payment});
				CXLib.keyInPaymentReviewFor({'Control' : Structures.PaymentReview.SecurityCode, 'DataCSS' : applicant.Payment});
				CXLib.keyInPaymentReviewFor({'Control' : Structures.PaymentReview.HasMailingAddress, 
											 'DataCSS' : applicant.Payment,
											 'HasMailingAddress' : is_default_mailing_address});
				if (is_default_mailing_address == true) {
					CXLib.keyInPaymentReviewFor({'Control' : Structures.PaymentReview.MailingStreet, 'DataCSS' : applicant.Payment});
					CXLib.keyInPaymentReviewFor({'Control' : Structures.PaymentReview.MailingCity, 'DataCSS' : applicant.Payment});
					CXLib.keyInPaymentReviewFor({'Control' : Structures.PaymentReview.MailingState, 'DataCSS' : applicant.Payment});
					CXLib.keyInPaymentReviewFor({'Control' : Structures.PaymentReview.MailingZip, 'DataCSS' : applicant.Payment});
				}
				CXLib.keyInPaymentReviewFor({'Control' : Structures.PaymentReview.SaveForFuture, 
											 'SaveForFuture' : (applicant.Payment.Card.SaveForFuture == "No") ? Structures.FrameworkUIActions.UnCheck : Structures.FrameworkUIActions.Check});
				
				CXLib.keyInPaymentReviewFor({'Control' : Structures.PaymentReview.AgreeAuthorization, 
											 'AgreeAuthorization' : (applicant.Payment.AgreeToAuthorizationStatment == "Yes") ? Structures.FrameworkUIActions.Check :  Structures.FrameworkUIActions.UnCheck});
											 
				if (applicant.Payment.DisclosureFormContract.IsDownloadedToPDF == "Yes") {
					CXLib.keyInPaymentReviewFor({'Control' : Structures.PaymentReview.ReceiptDownload});
				}
				if (applicant.Payment.DisclosureFormContract.IsSendByPostage == "Yes") {
					CXLib.keyInPaymentReviewFor({'Control' : Structures.PaymentReview.ReceiptPostage});
				}
				
				//--- Purchase Now
				CXLib.keyInPaymentReviewFor({'Control' : Structures.PaymentReview.PurchaseNow});
			});
			
			//--- CX : Receipt Page : Verify & validate application receipt (Applicant Name).
			it('CX : Receipt Page : Verify & validate application receipt (Applicant Name).', function() {	
				CXLib.validate({'Page' : Structures.Pages.ApplicationReceipt,
								'Control' : Structures.PaymentReview.ApplicantName,
								'ValidateFor' : Structures.Validators.Information,
								'DataCSS' : applicant.Receipt});
			});

			//--- CX : Receipt Page : Verify & validate application receipt (Submission Date).
			it('CX : Receipt Page : Verify & validate application receipt (Submission Date).', function() {	
				CXLib.validate({'Page' : Structures.Pages.ApplicationReceipt,
								'Control' : Structures.PaymentReview.SubmissionDate,
								'ValidateFor' : Structures.Validators.Information,
								'DataCSS' : applicant.Receipt});
			});

			//--- CX : Receipt Page : Verify & validate application receipt (Purchased Plan).
			it('CX : Receipt Page : Verify & validate application receipt (Purchased Plan).', function() {										
				CXLib.validate({'Page' : Structures.Pages.ApplicationReceipt,
								'Control' : Structures.PaymentReview.PlanPurchased,
								'ValidateFor' : Structures.Validators.Information,
								'DataCSS' : applicant.Receipt});
			});

			//--- CX : Receipt Page : Verify & validate application receipt (Confirmation Number).
			it('CX : Receipt Page : Verify & validate application receipt (Confirmation Number).', function() {										
				CXLib.validate({'Page' : Structures.Pages.ApplicationReceipt,
								'Control' : Structures.PaymentReview.ConfirmationNumber,
								'ValidateFor' : Structures.Validators.Information,
								'DataCSS' : applicant.Receipt});
			});

			//--- CX : Receipt Page : Verify & validate application receipt (Effective Date).
			it('CX : Receipt Page : Verify & validate application receipt (Effective Date).', function() {										
				CXLib.validate({'Page' : Structures.Pages.ApplicationReceipt,
								'Control' : Structures.PaymentReview.EffectiveDate,
								'ValidateFor' : Structures.Validators.Information,
								'DataCSS' : applicant.Receipt});
			});

			//--- CX : Receipt Page : Verify & validate application receipt (Total Paid).
			it('CX : Receipt Page : Verify & validate application receipt (Total Paid).', function() {										
				CXLib.validate({'Page' : Structures.Pages.ApplicationReceipt,
								'Control' : Structures.PaymentReview.TotalPaid,
								'ValidateFor' : Structures.Validators.Information,
								'DataCSS' : applicant.Receipt});
			});

			//--- CX : Receipt Page : Verify & validate application receipt (Plan Summary).
			it('CX : Receipt Page : Verify & validate application receipt (Plan Summary).', function() {										
				CXLib.validate({'Page' : Structures.Pages.ApplicationReceipt,
								'Control' : Structures.PaymentReview.PlanSummary,
								'ValidateFor' : Structures.Validators.Information,
								'DataCSS' : applicant.Receipt});
			});

			//--- CX : Receipt Page : Verify & validate application receipt (Primary Applicant).
			it('CX : Receipt Page : Verify & validate application receipt (Primary Applicant).', function() {										
				CXLib.validate({'Page' : Structures.Pages.ApplicationReceipt,
								'Control' : Structures.PaymentReview.PrimaryName,
								'ValidateFor' : Structures.Validators.Information,
								'DataCSS' : applicant.Receipt});
			});

			//--- CX : Receipt Page : Verify & validate application receipt (Primary Applicant Facility Name).
			it('CX : Receipt Page : Verify & validate application receipt (Primary Applicant Facility Name).', function() {										
				CXLib.validate({'Page' : Structures.Pages.ApplicationReceipt,
								'Control' : Structures.PaymentReview.PrimaryFacility,
								'ValidateFor' : Structures.Validators.Information,
								'DataCSS' : applicant.Receipt});
			});

			//--- CX : Receipt Page : Verify & validate application receipt (Primary Applicant Facility Address - Street).
			it('CX : Receipt Page : Verify & validate application receipt (Primary Applicant Facility Address - Street).', function() {										
				CXLib.validate({'Page' : Structures.Pages.ApplicationReceipt,
								'Control' : Structures.PaymentReview.PrimaryFacilityStreet,
								'ValidateFor' : Structures.Validators.Information,
								'DataCSS' : applicant.Receipt});
			});

			//--- CX : Receipt Page : Verify & validate application receipt (Primary Applicant Facility Address - City).
			it('CX : Receipt Page : Verify & validate application receipt (Primary Applicant Facility Address - City).', function() {										
				CXLib.validate({'Page' : Structures.Pages.ApplicationReceipt,
								'Control' : Structures.PaymentReview.PrimaryFacilityCity,
								'ValidateFor' : Structures.Validators.Information,
								'DataCSS' : applicant.Receipt});
			});

			//--- CX : Receipt Page : Verify & validate application receipt (Primary Applicant Facility Address - State).
			it('CX : Receipt Page : Verify & validate application receipt (Primary Applicant Facility Address - State).', function() {										
				CXLib.validate({'Page' : Structures.Pages.ApplicationReceipt,
								'Control' : Structures.PaymentReview.PrimaryFacilityState,
								'ValidateFor' : Structures.Validators.Information,
								'DataCSS' : applicant.Receipt});
			});

			//--- CX : Receipt Page : Verify & validate application receipt (Primary Applicant Facility Address - Zip).
			it('CX : Receipt Page : Verify & validate application receipt (Primary Applicant Facility Address - Zip).', function() {										
				CXLib.validate({'Page' : Structures.Pages.ApplicationReceipt,
								'Control' : Structures.PaymentReview.PrimaryFacilityZip,
								'ValidateFor' : Structures.Validators.Information,
								'DataCSS' : applicant.Receipt});
			});
			
			//--- CX : Receipt Page : Verify & validate application receipt (Primary Applicant Facility Phone Number).
			it('CX : Receipt Page : Verify & validate application receipt (Primary Applicant Facility Phone Number).', function() {										
				CXLib.validate({'Page' : Structures.Pages.ApplicationReceipt,
								'Control' : Structures.PaymentReview.PrimaryFacilityPhone,
								'ValidateFor' : Structures.Validators.Information,
								'DataCSS' : applicant.Receipt});
			});
			
			//--- CX : Receipt Page : Verify & validate application receipt (Dependents).
			for (var idependent = 0; idependent < applicant.Facilities.Identifiers.length; idependent++)
			{
				(function (dependent) {
					
					//--- CX : Receipt Page : Verify & validate application receipt (Dependent Name).
					it("CX : Receipt Page : Verify & validate application receipt (Dependent ["+idependent+"]'s Name).", function() {										
						CXLib.validate({'Page' : Structures.Pages.ApplicationReceipt,
										'Control' : Structures.PaymentReview.DependentsName,
										'ValidateFor' : Structures.Validators.Information,
										'OfIndice' : idependent,
										'DataCSS' : dependent});
					});

					//--- CX : Receipt Page : Verify & validate application receipt (Dependent Facility Name).
					it("CX : Receipt Page : Verify & validate application receipt (Dependent ["+idependent+"]'s Facility Name).", function() {										
						CXLib.validate({'Page' : Structures.Pages.ApplicationReceipt,
										'Control' : Structures.PaymentReview.PrimaryFacility,
										'ValidateFor' : Structures.Validators.Information,
										'OfIndice' : idependent,
										'DataCSS' : dependent});
					});

					//--- CX : Receipt Page : Verify & validate application receipt (Dependent Facility Address - Street).
					it("CX : Receipt Page : Verify & validate application receipt (Dependent ["+idependent+"]'s Facility Address - Street).", function() {										
						CXLib.validate({'Page' : Structures.Pages.ApplicationReceipt,
										'Control' : Structures.PaymentReview.PrimaryFacilityStreet,
										'ValidateFor' : Structures.Validators.Information,
										'OfIndice' : idependent,
										'DataCSS' : dependent});
					});

					//--- CX : Receipt Page : Verify & validate application receipt (Dependent Facility Address - City).
					it("CX : Receipt Page : Verify & validate application receipt (Dependent ["+idependent+"]'s Facility Address - City).", function() {										
						CXLib.validate({'Page' : Structures.Pages.ApplicationReceipt,
										'Control' : Structures.PaymentReview.PrimaryFacilityCity,
										'ValidateFor' : Structures.Validators.Information,
										'OfIndice' : idependent,
										'DataCSS' : dependent});
					});

					//--- CX : Receipt Page : Verify & validate application receipt (Dependent Facility Address - State).
					it("CX : Receipt Page : Verify & validate application receipt (Dependent ["+idependent+"]'s Facility Address - State).", function() {										
						CXLib.validate({'Page' : Structures.Pages.ApplicationReceipt,
										'Control' : Structures.PaymentReview.PrimaryFacilityState,
										'ValidateFor' : Structures.Validators.Information,
										'OfIndice' : idependent,
										'DataCSS' : dependent});
					});

					//--- CX : Receipt Page : Verify & validate application receipt (Dependent Facility Address - Zip).
					it("CX : Receipt Page : Verify & validate application receipt (Dependent ["+idependent+"]'s Facility Address - Zip).", function() {										
						CXLib.validate({'Page' : Structures.Pages.ApplicationReceipt,
										'Control' : Structures.PaymentReview.PrimaryFacilityZip,
										'ValidateFor' : Structures.Validators.Information,
										'OfIndice' : idependent,
										'DataCSS' : dependent});
					});
					
					//--- CX : Receipt Page : Verify & validate application receipt (Dependent Facility Phone Number).
					it("CX : Receipt Page : Verify & validate application receipt (Dependent ["+idependent+"]'s Facility Phone Number).", function() {										
						CXLib.validate({'Page' : Structures.Pages.ApplicationReceipt,
										'Control' : Structures.PaymentReview.PrimaryFacilityPhone,
										'ValidateFor' : Structures.Validators.Information,
										'OfIndice' : idependent,
										'DataCSS' : dependent});
					});
					
				})(applicant.Facilities.Identifiers[idependent]);		  
			}
			
		})(Data.cx.UseCases[index]);
	}
	
});
