// Author : Uday Thombre
// Email : uthombre@delta.org
//
// CX : Use Case Validation : Facilities Page

var CXLib = require('../framework/cx_gui_libraries.js');
var Controls = require('../framework/cx_gui.json');
var Data = require('../data/cx_data_paymentreceipt.json');

describe('CX Purchase & Receipt Page Tests', function() {

	var applicant;
	var pageLoaded = false;


	beforeEach(function() {
		/* if (!pageLoaded){
			CXLib.navigateToPage(CXLib.Navigation.PurchaseReceiptPage);
			pageLoaded =  true;
		} */
		
		//--- UNIT Testing : Page Loads
		if (!pageLoaded){
			CXLib.navigateToPage(CXLib.Navigation.DependentsPage);
			CXLib.keyInDependentsFor(CXLib.Dependents.Next);
			CXLib.keyInFacilitiesFor(CXLib.Facilities.Next);
			pageLoaded =  true;
		}
	});
	
	//--- CX : PAGE : Purchase & Receipt : Plan Summary : Validate for all summary elements.
	it('CX : PAGE : Purchase & Receipt : Plan Summary : Validate for all summary elements.', function() {
		CXLib.validate({'Page': CXLib.Pages.PaymentReceipt, 
						'ValidateFor': CXLib.Validators.Summary,
						'Control' : CXLib.PlanSummary.ValidateAll,
						'DataCSS' : Data.cx.Plan});		
	});
	
	//--- CX : Purchase & Receipt Page : Enter valid data
	it('CX : Purchase & Receipt Page : Enter valid data.', function() {	
		var is_default_mailing_address = (Data.cx.Payment.Card.MailingAddres.Exists == "Yes") ? false :  true;
		CXLib.keyInPaymentReviewFor({'Control' : CXLib.PaymentReview.NameOnCard, 'DataCSS' : Data.cx.Payment});
		CXLib.keyInPaymentReviewFor({'Control' : CXLib.PaymentReview.CardNumber, 'DataCSS' : Data.cx.Payment});
		CXLib.keyInPaymentReviewFor({'Control' : CXLib.PaymentReview.ExpirationMonth, 'DataCSS' : Data.cx.Payment});
		CXLib.keyInPaymentReviewFor({'Control' : CXLib.PaymentReview.ExpirationYear, 'DataCSS' : Data.cx.Payment});
		CXLib.keyInPaymentReviewFor({'Control' : CXLib.PaymentReview.SecurityCode, 'DataCSS' : Data.cx.Payment});
		CXLib.keyInPaymentReviewFor({'Control' : CXLib.PaymentReview.HasMailingAddress, 
									 'DataCSS' : Data.cx.Payment,
									 'HasMailingAddress' : is_default_mailing_address});
		if (is_default_mailing_address == true) {
			CXLib.keyInPaymentReviewFor({'Control' : CXLib.PaymentReview.MailingStreet, 'DataCSS' : Data.cx.Payment});
			CXLib.keyInPaymentReviewFor({'Control' : CXLib.PaymentReview.MailingCity, 'DataCSS' : Data.cx.Payment});
			CXLib.keyInPaymentReviewFor({'Control' : CXLib.PaymentReview.MailingState, 'DataCSS' : Data.cx.Payment});
			CXLib.keyInPaymentReviewFor({'Control' : CXLib.PaymentReview.MailingZip, 'DataCSS' : Data.cx.Payment});
		}
		CXLib.keyInPaymentReviewFor({'Control' : CXLib.PaymentReview.SaveForFuture, 
									 'DataCSS' : Data.cx.Payment,
									 'SaveForFuture' : (Data.cx.Payment.Card.SaveForFuture == "No") ? false : true});
		
		CXLib.keyInPaymentReviewFor({'Control' : CXLib.PaymentReview.AgreeAuthorization, 
									 'DataCSS' : Data.cx.Payment,
									 'AgreeAuthorization' : (Data.cx.Payment.AgreeToAuthorizationStatment == "Yes") ? true :  false});
									 
		if (Data.cx.Payment.DisclosureFormContract.IsDownloadedToPDF == "Yes") {
			CXLib.keyInPaymentReviewFor({'Control' : CXLib.PaymentReview.ReceiptDownload});
		}
		if (Data.cx.Payment.DisclosureFormContract.IsSendByPostage == "Yes") {
			CXLib.keyInPaymentReviewFor({'Control' : CXLib.PaymentReview.ReceiptPostage});
		}
		
		//--- Purchase Now
		CXLib.keyInPaymentReviewFor({'Control' : CXLib.PaymentReview.PurchaseNow});
	});
	
});
