// Author : Uday Thombre
// Email : uthombre@delta.org
//
// CX : Use Case Validation : Personal Information Page

var CXLib = require('../framework/cx_gui_libraries.js');
var Data = require('../data/CXINIT-163-Scenario-1.json');
var Commons = require('../framework/cx_commons.js');
var Structures = require('../framework/cx_structures.js');

describe('CX : CXINIT-163 : End-to-End Validation (Scenario 2) - Delta Dental Plan Purchase', function() {

	var applicant;
	var pageLoaded = false;
	var is_checked = "No";

	beforeEach(function() {
		if (!pageLoaded){
			/*
			*  CX : CXINIT-163 : End to End : SCENARIO 2 : STEP 1 : Get a Quote.
			*/
			if (browser.params.cx.link == Structures.Environments.DIT) {
				CXLib.navigateToPage({'Page' : Structures.Navigation.DITGetAQuote,
									  'DataCSS' : Data.cx.SelectPlan});
			}

			if (browser.params.cx.link == Structures.Environments.MOT) {
				CXLib.navigateToPage({'Page' : Structures.Navigation.MOTGetAQuote,
									  'DataCSS' : Data.cx.SelectPlan});
			}

			if (browser.params.cx.link == Structures.Environments.LOCAL) {
				CXLib.navigateToPage({'Page' : Structures.Navigation.PersonalInformationPage,
									  'DataCSS' : Data.cx.SelectPlan});
			}

			if (browser.params.cx.link == Structures.Environments.DEVRC) {
				CXLib.navigateToPage({'Page' : Structures.Navigation.PersonalInformationPage,
									  'DataCSS' : Data.cx.SelectPlan});
			}

			if (browser.params.cx.link == Structures.Environments.DELTADentalPlans) {
				CXLib.navigateToPage({'Page' : Structures.Navigation.DITGetAQuote,
									  'DataCSS' : Data.cx.SelectPlan});
			}
  
			pageLoaded =  true;
		}
		jasmine.DEFAULT_TIMEOUT_INTERVAL = 75000;
	});

	for (var index = 0; index < Data.cx.UseCases.length; index++ )
	{
		(function (applicant) {
			/*
			*  CX : CXINIT-163 : End to End : SCENARIO 2 : STEP 2 Payment Information Page : Enter applicant details.
			*/
			it('CX : CXINIT-163 : End to End : SCENARIO 2 : STEP 2 Payment Information Page : Enter applicant details.', function() {
				/* CXLib.validate({'Page': Structures.Pages.PersonalInformation, 
								'ValidateFor': Structures.Validators.Summary,
								'Control' : Structures.PlanSummary.All,
								'DataCSS' : applicant.NoPurchaseMade.Plan}); */
				CXLib.keyInPIFor({'Control' : Structures.Profile.PrimaryName, 'DataCSS' : applicant.NoPurchaseMade});
				CXLib.keyInPIFor({'Control' : Structures.Profile.MiddleName, 'DataCSS' : applicant.NoPurchaseMade});
				CXLib.keyInPIFor({'Control' : Structures.Profile.LastName, 'DataCSS' : applicant.NoPurchaseMade});
				CXLib.keyInPIFor({'Control' : Structures.Profile.Gender, 'DataCSS' : applicant.NoPurchaseMade});
				CXLib.keyInPIFor({'Control' : Structures.Profile.DOBMonth, 'DataCSS' : applicant.NoPurchaseMade});
				CXLib.keyInPIFor({'Control' : Structures.Profile.DOBDate, 'DataCSS' : applicant.NoPurchaseMade});
				CXLib.keyInPIFor({'Control' : Structures.Profile.DOBYear, 'DataCSS' : applicant.NoPurchaseMade});
				CXLib.keyInPIFor({'Control' : Structures.Profile.SSNumber, 'DataCSS' : applicant.NoPurchaseMade});
				CXLib.keyInPIFor({'Control' : Structures.Profile.AlternateIdentifier, 'DataCSS' : applicant.NoPurchaseMade});
				CXLib.keyInPIFor({'Control' : Structures.Profile.PhoneType, 'DataCSS' : applicant.NoPurchaseMade});
				CXLib.keyInPIFor({'Control' : Structures.Profile.EmailAddress, 'DataCSS' : applicant.NoPurchaseMade});
				CXLib.keyInPIFor({'Control' : Structures.Profile.PhoneNumber, 'DataCSS' : applicant.NoPurchaseMade});
				CXLib.keyInPIFor({'Control' : Structures.Profile.GoPaperless, 'DataCSS' : applicant.NoPurchaseMade});
				CXLib.keyInPIFor({'Control' : Structures.Profile.ContactStreet, 'DataCSS' : applicant.NoPurchaseMade});
				CXLib.keyInPIFor({'Control' : Structures.Profile.ContactCity, 'DataCSS' : applicant.NoPurchaseMade});
				/*Application functionality still under constructions...
				CXLib.keyInPIFor({'Control' : Structures.Profile.ContactState, 'DataCSS' : applicant.NoPurchaseMade});
				CXLib.keyInPIFor({'Control' : Structures.Profile.ContactZip, 'DataCSS' : applicant.NoPurchaseMade});
				if (Controls.cx.page.PersonalInformation.Contact.Address.Zip.overlay.alert.dialog) {
					CXLib.keyInPIFor({'Control' : Structures.Profile.ContactZipAlertGoBack, 'DataCSS' : applicant.NoPurchaseMade});
				} 
				CXLib.keyInPIFor({'Control' : Structures.Profile.MailingAddress, 'DataCSS' : applicant.NoPurchaseMade});
				CXLib.keyInPIFor({'Control' : Structures.Profile.MailingAddressStreet, 'DataCSS' : applicant.NoPurchaseMade});
				CXLib.keyInPIFor({'Control' : Structures.Profile.MailingAddressCity, 'DataCSS' : applicant.NoPurchaseMade});
				CXLib.keyInPIFor({'Control' : Structures.Profile.MailingAddressState, 'DataCSS' : applicant.NoPurchaseMade});
				CXLib.keyInPIFor({'Control' : Structures.Profile.MailingAddressZip, 'DataCSS' : applicant.NoPurchaseMade});
				CXLib.keyInPIFor({'Control' : Structures.Profile.BrokerWorked, 'DataCSS' : applicant.NoPurchaseMade});
				//--- CXLib.keyInPIFor({'Control' : Structures.Profile.BrokerNumber, 'DataCSS' : applicant.NoPurchaseMade});
				*/
				
				//--- [Next] on Personal Information Page
				CXLib.keyInPIFor({'Control' : Structures.Profile.Next, 'DataCSS' : applicant.NoPurchaseMade});
			});
				
			/*
			*  CX : CXINIT-163 : End to End : SCENARIO 2 : STEP 2 Dependents Page : Add dependents.
			*/
			for (var idependent = 0; idependent < applicant.NoPurchaseMade.Dependents.length; idependent++)
			{
				(function (dependent) {					
					it('CX : CXINIT-163 : End to End : SCENARIO 2 : STEP 2 Dependents Page : Add dependents - ' + dependent.Relationship + ' ' + dependent.Name.First, function() {
						CXLib.validate({'Page': Structures.Pages.Dependents, 
										'ValidateFor': Structures.Validators.Summary,
										'Control' : Structures.PlanSummary.ValidateAll,
										'DataCSS' : applicant.NoPurchaseMade.Plan});
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
				})(applicant.NoPurchaseMade.Dependents[idependent]);		  
			}
			
			/*
			*  CX : CXINIT-163 : End to End : SCENARIO 2 : STEP 2 Facilities Page : Validate Facilities page is displayed.
			*/
			it('CX : CXINIT-163 : End to End : SCENARIO 2 : STEP 2 Facilities Page : Validate Facilities page is displayed.', function() {	
				//--- [Next] on Dependents page
				CXLib.keyInDependentsFor({'Control' : Structures.Dependents.Next});
				
				//--- [Continue] on Dependent page's alert Premium Change
				CXLib.keyInDependentsFor({'Control' : Structures.Dependents.OnAlertContinue});
				
				//--- CX : PAGE : Facilities : Plan Summary : Validate for all summary elements.
				CXLib.validate({'Page': Structures.Pages.Facilities, 
								'ValidateFor': Structures.Validators.Summary,
								'Control' : Structures.PlanSummary.ValidateAll,
								'DataCSS' : applicant.NoPurchaseMade.Plan});
			});	

			/*
			*  CX : CXINIT-163 : End to End : SCENARIO 2 : STEP 2 Facilities Page : Select facilities.
			*/
			for (var ifacility = 0; ifacility < applicant.NoPurchaseMade.Facilities.Identifiers.length; ifacility++)
			{
				(function (facility) {
					it('CX : CXINIT-163 : End to End : SCENARIO 2 : STEP 2 Facilities Page : Select a facility at location(' + ifacility + ')', function() {	
						CXLib.keyInFacilitiesFor({'Control' : Structures.Facilities.Facility,
												  'DataCSS' : facility,
												  'Indice' : ifacility});
						CXLib.keyInFacilitiesFor({'Control' : Structures.Facilities.Next});
						
						//--- Log all errors when occur on the page here...
					});
				})(applicant.NoPurchaseMade.Facilities.Identifiers[ifacility]);		  
			}

			/*
			*  CX : CXINIT-163 : End to End : SCENARIO 2 : STEP 2 Payments Page : Enter payment details.
			*/
			it('CX : CXINIT-163 : End to End : SCENARIO 2 : STEP 2 Payments Page : Enter payment details.', function() {
				CXLib.validate({'Page': Structures.Pages.PaymentReceipt, 
								'ValidateFor': Structures.Validators.Summary,
								'Control' : Structures.PlanSummary.ValidateAll,
								'DataCSS' : applicant.NoPurchaseMade.Plan});		

				var is_default_mailing_address = (applicant.Payment.Card.MailingAddress.Exists == "Yes") ? false :  true;
				CXLib.keyInPaymentReviewFor({'Control' : Structures.PaymentReview.NameOnCard, 'DataCSS' : applicant.NoPurchaseMade.Payment});
				CXLib.keyInPaymentReviewFor({'Control' : Structures.PaymentReview.CardNumber, 
										     'DataCSS' : applicant.NoPurchaseMade.Payment,
											 'CardCategory' : Structures.PaymentCardCategory.ApprovalRegular,
											 'CardLocale' : Structures.PaymentCardLocale.USA});
				CXLib.keyInPaymentReviewFor({'Control' : Structures.PaymentReview.ExpirationMonth, 'DataCSS' : applicant.NoPurchaseMade.Payment});
				CXLib.keyInPaymentReviewFor({'Control' : Structures.PaymentReview.ExpirationYear, 'DataCSS' : applicant.NoPurchaseMade.Payment});
				CXLib.keyInPaymentReviewFor({'Control' : Structures.PaymentReview.SecurityCode, 'DataCSS' : applicant.NoPurchaseMade.Payment});
				CXLib.keyInPaymentReviewFor({'Control' : Structures.PaymentReview.HasMailingAddress, 
											 'DataCSS' : applicant.NoPurchaseMade.Payment,
											 'HasMailingAddress' : is_default_mailing_address});
				if (is_default_mailing_address == true) {
					CXLib.keyInPaymentReviewFor({'Control' : Structures.PaymentReview.MailingStreet, 'DataCSS' : applicant.NoPurchaseMade.Payment});
					CXLib.keyInPaymentReviewFor({'Control' : Structures.PaymentReview.MailingCity, 'DataCSS' : applicant.NoPurchaseMade.Payment});
					CXLib.keyInPaymentReviewFor({'Control' : Structures.PaymentReview.MailingState, 'DataCSS' : applicant.NoPurchaseMade.Payment});
					CXLib.keyInPaymentReviewFor({'Control' : Structures.PaymentReview.MailingZip, 'DataCSS' : applicant.NoPurchaseMade.Payment});
				}
				CXLib.keyInPaymentReviewFor({'Control' : Structures.PaymentReview.SaveForFuture, 
											 'SaveForFuture' : (applicant.NoPurchaseMade.Payment.Card.SaveForFuture == "No") ? Structures.FrameworkUIActions.UnCheck : Structures.FrameworkUIActions.Check});
				
				CXLib.keyInPaymentReviewFor({'Control' : Structures.PaymentReview.AgreeAuthorization, 
											 'AgreeAuthorization' : (applicant.NoPurchaseMade.Payment.AgreeToAuthorizationStatment == "Yes") ? Structures.FrameworkUIActions.Check :  Structures.FrameworkUIActions.UnCheck});
											 
				if (applicant.Payment.DisclosureFormContract.IsDownloadedToPDF == "Yes") {
					CXLib.keyInPaymentReviewFor({'Control' : Structures.PaymentReview.ReceiptDownload});
				}
				if (applicant.Payment.DisclosureFormContract.IsSendByPostage == "Yes") {
					CXLib.keyInPaymentReviewFor({'Control' : Structures.PaymentReview.ReceiptPostage});
				}
			});
			
			/*
			*  CX : CXINIT-163 : End to End : SCENARIO 2 : STEP 3 Payments Page : Return back (browser back ONLY) to Personal Info page.
			*/
			it('CX : CXINIT-163 : End to End : SCENARIO 2 : STEP 3 Payments Page : Return back (browser back ONLY) to Personal Info page.', function() {	
				//--- [Back] on Payments page
				Commons.keyIn({'ControlType' : Structures.BrowserActions.Back});
				
				//--- Validate Facilities Page here
				CXLib.validate({'Page': Structures.Pages.Facilities, 
								'ValidateFor': Structures.Validators.Summary,
								'Control' : Structures.PlanSummary.ValidateAll,
								'DataCSS' : applicant.NoPurchaseMade.Plan});
								
				//--- [Back] on Facilities page
				Commons.keyIn({'ControlType' : Structures.BrowserActions.Back});
				
				//--- Validate Dependents page here
				CXLib.validate({'Page': Structures.Pages.Dependents, 
										'ValidateFor': Structures.Validators.Summary,
										'Control' : Structures.PlanSummary.ValidateAll,
										'DataCSS' : applicant.Plan});
				
				//--- [Back] on Dependents page
				Commons.keyIn({'ControlType' : Structures.BrowserActions.Back});
				
				//--- Validate Personal Information page here
				CXLib.validate({'Page': Structures.Pages.PersonalInformation, 
								'ValidateFor': Structures.Validators.Summary,
								'Control' : Structures.PlanSummary.All,
								'DataCSS' : applicant.PurchaseMade.Plan});
			});
			
			/*
			*  CX : CXINIT-163 : End to End : SCENARIO 2 : STEP 4 Personal Information Page : Edit applicant details.
			*/
			it('CX : CXINIT-163 : End to End : SCENARIO 2 : STEP 4 Personal Information Page : Edit applicant details.', function() {
				CXLib.validate({'Page': Structures.Pages.PersonalInformation, 
								'ValidateFor': Structures.Validators.Summary,
								'Control' : Structures.PlanSummary.All,
								'DataCSS' : applicant.PurchaseMade.Plan});
				CXLib.keyInPIFor({'Control' : Structures.Profile.PrimaryName, 'DataCSS' : applicant.PurchaseMade});
				CXLib.keyInPIFor({'Control' : Structures.Profile.MiddleName, 'DataCSS' : applicant.PurchaseMade});
				CXLib.keyInPIFor({'Control' : Structures.Profile.LastName, 'DataCSS' : applicant.PurchaseMade});
				CXLib.keyInPIFor({'Control' : Structures.Profile.Gender, 'DataCSS' : applicant.PurchaseMade});
				CXLib.keyInPIFor({'Control' : Structures.Profile.DOBMonth, 'DataCSS' : applicant.PurchaseMade});
				CXLib.keyInPIFor({'Control' : Structures.Profile.DOBDate, 'DataCSS' : applicant.PurchaseMade});
				CXLib.keyInPIFor({'Control' : Structures.Profile.DOBYear, 'DataCSS' : applicant.PurchaseMade});
				CXLib.keyInPIFor({'Control' : Structures.Profile.SSNumber, 'DataCSS' : applicant.PurchaseMade});
				CXLib.keyInPIFor({'Control' : Structures.Profile.AlternateIdentifier, 'DataCSS' : applicant.PurchaseMade});
				CXLib.keyInPIFor({'Control' : Structures.Profile.PhoneType, 'DataCSS' : applicant.PurchaseMade});
				CXLib.keyInPIFor({'Control' : Structures.Profile.EmailAddress, 'DataCSS' : applicant.PurchaseMade});
				CXLib.keyInPIFor({'Control' : Structures.Profile.PhoneNumber, 'DataCSS' : applicant.PurchaseMade});
				CXLib.keyInPIFor({'Control' : Structures.Profile.GoPaperless, 'DataCSS' : applicant.PurchaseMade});
				CXLib.keyInPIFor({'Control' : Structures.Profile.ContactStreet, 'DataCSS' : applicant.PurchaseMade});
				CXLib.keyInPIFor({'Control' : Structures.Profile.ContactCity, 'DataCSS' : applicant.PurchaseMade});
				/*Application functionality still under constructions...
				CXLib.keyInPIFor({'Control' : Structures.Profile.ContactState, 'DataCSS' : applicant.PurchaseMade});
				CXLib.keyInPIFor({'Control' : Structures.Profile.ContactZip, 'DataCSS' : applicant.PurchaseMade});
				if (Controls.cx.page.PersonalInformation.Contact.Address.Zip.overlay.alert.dialog) {
					CXLib.keyInPIFor({'Control' : Structures.Profile.ContactZipAlertGoBack, 'DataCSS' : applicant.PurchaseMade});
				} 
				CXLib.keyInPIFor({'Control' : Structures.Profile.MailingAddress, 'DataCSS' : applicant.PurchaseMade});
				CXLib.keyInPIFor({'Control' : Structures.Profile.MailingAddressStreet, 'DataCSS' : applicant.PurchaseMade});
				CXLib.keyInPIFor({'Control' : Structures.Profile.MailingAddressCity, 'DataCSS' : applicant.PurchaseMade});
				CXLib.keyInPIFor({'Control' : Structures.Profile.MailingAddressState, 'DataCSS' : applicant.PurchaseMade});
				CXLib.keyInPIFor({'Control' : Structures.Profile.MailingAddressZip, 'DataCSS' : applicant.PurchaseMade});
				CXLib.keyInPIFor({'Control' : Structures.Profile.BrokerWorked, 'DataCSS' : applicant.PurchaseMade});
				//--- CXLib.keyInPIFor({'Control' : Structures.Profile.BrokerNumber, 'DataCSS' : applicant.PurchaseMade});
				*/
				
				//--- [Next] on Personal Information Page
				CXLib.keyInPIFor({'Control' : Structures.Profile.Next, 'DataCSS' : applicant.PurchaseMade});
			});
			
			/*
			*  CX : CXINIT-163 : End to End : SCENARIO 2 : STEP 4 Dependents Page : Edit dependent details.
			*/
			for (var idependent = 0; idependent < applicant.PurchaseMade.Dependents.length; idependent++)
			{
				(function (dependent) {					

					it('CX : CXINIT-163 : End to End : SCENARIO 2 : STEP 4 Dependents Page : Edit dependent details - ' + dependent.Relationship + ' ' + dependent.Name.First, function() {
						CXLib.validate({'Page': Structures.Pages.Dependents, 
										'ValidateFor': Structures.Validators.Summary,
										'Control' : Structures.PlanSummary.ValidateAll,
										'DataCSS' : applicant.PurchaseMade.Plan});
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
				})(applicant.PurchaseMade.Dependents[idependent]);		  
			}
			
			/*
			*  CX : CXINIT-163 : End to End : SCENARIO 2 : STEP 4 Dependents Page : Validate Facilities page is displayed.
			*/
			it('CX : CXINIT-163 : End to End : SCENARIO 2 : STEP 4 Dependents Page : Validate Facilities page is displayed.', function() {	
				//--- [Next] on Dependents page
				CXLib.keyInDependentsFor({'Control' : Structures.Dependents.Next});
				
				//--- [Ccontinue] on Dependent page's alert Premium Change
				CXLib.keyInFacilitiesFor({'Control' : Structures.Facilities.OnAlertContinue});
				
				//--- CX : PAGE : Facilities : Plan Summary : Validate for all summary elements.
				CXLib.validate({'Page': Structures.Pages.Facilities, 
								'ValidateFor': Structures.Validators.Summary,
								'Control' : Structures.PlanSummary.ValidateAll,
								'DataCSS' : applicant.PurchaseMade.Plan});
			});	

			/*
			*  CX : CXINIT-163 : End to End : SCENARIO 2 : STEP 4 Facilities Page : Select facilities.
			*/
			for (var ifacility = 0; ifacility < applicant.PurchaseMade.Facilities.Identifiers.length; ifacility++)
			{
				(function (facility) {
					it('CX : CXINIT-163 : End to End : SCENARIO 2 : STEP 4 Facilities Page : Select a facility at location(' + ifacility + ')', function() {	
						CXLib.keyInFacilitiesFor({'Control' : Structures.Facilities.Facility,
												  'DataCSS' : facility,
												  'Indice' : ifacility});
						CXLib.keyInFacilitiesFor({'Control' : Structures.Facilities.Next});
						
						//--- Log all errors when occur on the page here...
					});
				})(applicant.PurchaseMade.Facilities.Identifiers[ifacility]);		  
			}
			
			/*
			*  CX : CXINIT-163 : End to End : SCENARIO 2 : STEP 4 Payments Page : Enter payments details and purchase plan.
			*/
			it('CX : CXINIT-163 : End to End : SCENARIO 2 : STEP 4 Payments Page : Enter payments details and purchase plan.', function() {
				CXLib.validate({'Page': Structures.Pages.PaymentReceipt, 
								'ValidateFor': Structures.Validators.Summary,
								'Control' : Structures.PlanSummary.ValidateAll,
								'DataCSS' : applicant.PurchaseMade.Plan});		

				var is_default_mailing_address = (applicant.Payment.Card.MailingAddress.Exists == "Yes") ? false :  true;
				CXLib.keyInPaymentReviewFor({'Control' : Structures.PaymentReview.NameOnCard, 'DataCSS' : applicant.PurchaseMade.Payment});
				CXLib.keyInPaymentReviewFor({'Control' : Structures.PaymentReview.CardNumber, 
										     'DataCSS' : applicant.PurchaseMade.Payment,
											 'CardCategory' : Structures.PaymentCardCategory.ApprovalRegular,
											 'CardLocale' : Structures.PaymentCardLocale.USA});
				CXLib.keyInPaymentReviewFor({'Control' : Structures.PaymentReview.ExpirationMonth, 'DataCSS' : applicant.PurchaseMade.Payment});
				CXLib.keyInPaymentReviewFor({'Control' : Structures.PaymentReview.ExpirationYear, 'DataCSS' : applicant.PurchaseMade.Payment});
				CXLib.keyInPaymentReviewFor({'Control' : Structures.PaymentReview.SecurityCode, 'DataCSS' : applicant.PurchaseMade.Payment});
				CXLib.keyInPaymentReviewFor({'Control' : Structures.PaymentReview.HasMailingAddress, 
											 'DataCSS' : applicant.PurchaseMade.Payment,
											 'HasMailingAddress' : is_default_mailing_address});
				if (is_default_mailing_address == true) {
					CXLib.keyInPaymentReviewFor({'Control' : Structures.PaymentReview.MailingStreet, 'DataCSS' : applicant.PurchaseMade.Payment});
					CXLib.keyInPaymentReviewFor({'Control' : Structures.PaymentReview.MailingCity, 'DataCSS' : applicant.PurchaseMade.Payment});
					CXLib.keyInPaymentReviewFor({'Control' : Structures.PaymentReview.MailingState, 'DataCSS' : applicant.PurchaseMade.Payment});
					CXLib.keyInPaymentReviewFor({'Control' : Structures.PaymentReview.MailingZip, 'DataCSS' : applicant.PurchaseMade.Payment});
				}
				CXLib.keyInPaymentReviewFor({'Control' : Structures.PaymentReview.SaveForFuture, 
											 'SaveForFuture' : (applicant.PurchaseMade.Payment.Card.SaveForFuture == "No") ? Structures.FrameworkUIActions.UnCheck : Structures.FrameworkUIActions.Check});
				
				CXLib.keyInPaymentReviewFor({'Control' : Structures.PaymentReview.AgreeAuthorization, 
											 'AgreeAuthorization' : (applicant.PurchaseMade.Payment.AgreeToAuthorizationStatment == "Yes") ? Structures.FrameworkUIActions.Check :  Structures.FrameworkUIActions.UnCheck});
											 
				if (applicant.Payment.DisclosureFormContract.IsDownloadedToPDF == "Yes") {
					CXLib.keyInPaymentReviewFor({'Control' : Structures.PaymentReview.ReceiptDownload});
				}
				if (applicant.Payment.DisclosureFormContract.IsSendByPostage == "Yes") {
					CXLib.keyInPaymentReviewFor({'Control' : Structures.PaymentReview.ReceiptPostage});
				}
				
				//--- Purchase Now
				CXLib.keyInPaymentReviewFor({'Control' : Structures.PaymentReview.PurchaseNow});
			});
			
			/*
			*  CX : CXINIT-163 : End to End : SCENARIO 2 : STEP 4 Receipts Page : Validate Receipt Summary information.
			*/
			it('CX : CXINIT-163 : End to End : SCENARIO 2 : STEP 4 Receipts Page : Validate Receipt Summary information.', function() {	
				CXLib.validate({'Page' : Structures.Pages.ApplicationReceipt,
								'Control' : Structures.PaymentReview.ApplicantName,
								'ValidateFor' : Structures.Validators.Information,
								'DataCSS' : applicant.PurchaseMade.Receipt});
								
				CXLib.validate({'Page' : Structures.Pages.ApplicationReceipt,
								'Control' : Structures.PaymentReview.SubmissionDate,
								'ValidateFor' : Structures.Validators.Information,
								'DataCSS' : applicant.PurchaseMade.Receipt});
								
				CXLib.validate({'Page' : Structures.Pages.ApplicationReceipt,
								'Control' : Structures.PaymentReview.PlanPurchased,
								'ValidateFor' : Structures.Validators.Information,
								'DataCSS' : applicant.PurchaseMade.Receipt});
								
				CXLib.validate({'Page' : Structures.Pages.ApplicationReceipt,
								'Control' : Structures.PaymentReview.ConfirmationNumber,
								'ValidateFor' : Structures.Validators.Information,
								'DataCSS' : applicant.PurchaseMade.Receipt});
								
				CXLib.validate({'Page' : Structures.Pages.ApplicationReceipt,
								'Control' : Structures.PaymentReview.EffectiveDate,
								'ValidateFor' : Structures.Validators.Information,
								'DataCSS' : applicant.PurchaseMade.Receipt});
								
				CXLib.validate({'Page' : Structures.Pages.ApplicationReceipt,
								'Control' : Structures.PaymentReview.TotalPaid,
								'ValidateFor' : Structures.Validators.Information,
								'DataCSS' : applicant.PurchaseMade.Receipt});
								
				CXLib.validate({'Page' : Structures.Pages.ApplicationReceipt,
								'Control' : Structures.PaymentReview.PlanSummary,
								'ValidateFor' : Structures.Validators.Information,
								'DataCSS' : applicant.PurchaseMade.Receipt});
								
				CXLib.validate({'Page' : Structures.Pages.ApplicationReceipt,
								'Control' : Structures.PaymentReview.PrimaryName,
								'ValidateFor' : Structures.Validators.Information,
								'DataCSS' : applicant.PurchaseMade.Receipt});
								
				CXLib.validate({'Page' : Structures.Pages.ApplicationReceipt,
								'Control' : Structures.PaymentReview.PrimaryFacility,
								'ValidateFor' : Structures.Validators.Information,
								'DataCSS' : applicant.PurchaseMade.Receipt});
								
				CXLib.validate({'Page' : Structures.Pages.ApplicationReceipt,
								'Control' : Structures.PaymentReview.PrimaryFacilityStreet,
								'ValidateFor' : Structures.Validators.Information,
								'DataCSS' : applicant.PurchaseMade.Receipt});
								
				CXLib.validate({'Page' : Structures.Pages.ApplicationReceipt,
								'Control' : Structures.PaymentReview.PrimaryFacilityCity,
								'ValidateFor' : Structures.Validators.Information,
								'DataCSS' : applicant.PurchaseMade.Receipt});
								
				CXLib.validate({'Page' : Structures.Pages.ApplicationReceipt,
								'Control' : Structures.PaymentReview.PrimaryFacilityState,
								'ValidateFor' : Structures.Validators.Information,
								'DataCSS' : applicant.PurchaseMade.Receipt});
								
				CXLib.validate({'Page' : Structures.Pages.ApplicationReceipt,
								'Control' : Structures.PaymentReview.PrimaryFacilityZip,
								'ValidateFor' : Structures.Validators.Information,
								'DataCSS' : applicant.PurchaseMade.Receipt});
								
				CXLib.validate({'Page' : Structures.Pages.ApplicationReceipt,
								'Control' : Structures.PaymentReview.PrimaryFacilityPhone,
								'ValidateFor' : Structures.Validators.Information,
								'DataCSS' : applicant.PurchaseMade.Receipt});
			});
			
			/*
			*  CX : CXINIT-163 : End to End : SCENARIO 2 : STEP 4 Receipts Page : Validate Receipt Dependents information.
			*/
			for (var idependent = 0; idependent < applicant.PurchaseMade.Facilities.Identifiers.length; idependent++)
			{
				(function (dependent) {
					
					it('CX : CXINIT-163 : End to End : SCENARIO 2 : STEP 4 Receipts Page : Validate Receipt Dependents information (Dependent ['+idependent+']).', function() {										
						CXLib.validate({'Page' : Structures.Pages.ApplicationReceipt,
										'Control' : Structures.PaymentReview.DependentsName,
										'ValidateFor' : Structures.Validators.Information,
										'OfIndice' : idependent,
										'DataCSS' : dependent});
										
						CXLib.validate({'Page' : Structures.Pages.ApplicationReceipt,
										'Control' : Structures.PaymentReview.PrimaryFacility,
										'ValidateFor' : Structures.Validators.Information,
										'OfIndice' : idependent,
										'DataCSS' : dependent});
										
						CXLib.validate({'Page' : Structures.Pages.ApplicationReceipt,
										'Control' : Structures.PaymentReview.PrimaryFacilityStreet,
										'ValidateFor' : Structures.Validators.Information,
										'OfIndice' : idependent,
										'DataCSS' : dependent});
										
						CXLib.validate({'Page' : Structures.Pages.ApplicationReceipt,
										'Control' : Structures.PaymentReview.PrimaryFacilityCity,
										'ValidateFor' : Structures.Validators.Information,
										'OfIndice' : idependent,
										'DataCSS' : dependent});
										
						CXLib.validate({'Page' : Structures.Pages.ApplicationReceipt,
										'Control' : Structures.PaymentReview.PrimaryFacilityState,
										'ValidateFor' : Structures.Validators.Information,
										'OfIndice' : idependent,
										'DataCSS' : dependent});
										
						CXLib.validate({'Page' : Structures.Pages.ApplicationReceipt,
										'Control' : Structures.PaymentReview.PrimaryFacilityZip,
										'ValidateFor' : Structures.Validators.Information,
										'OfIndice' : idependent,
										'DataCSS' : dependent});
										
						CXLib.validate({'Page' : Structures.Pages.ApplicationReceipt,
										'Control' : Structures.PaymentReview.PrimaryFacilityPhone,
										'ValidateFor' : Structures.Validators.Information,
										'OfIndice' : idependent,
										'DataCSS' : dependent});

					});
					
				})(applicant.PurchaseMade.Facilities.Identifiers[idependent]);		  
			}
			
		})(Data.cx.UseCases[index]);
	}
	
});
