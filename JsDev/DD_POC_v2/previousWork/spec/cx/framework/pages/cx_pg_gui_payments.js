//CX Automation Framework Libraries.
//--- Author : Uday Thombre (UThombre@delta.org)

var Controls = require('./cx_gui.json');
var Commons = require('./cx_commons.js');
var Structures = require('./cx_structures.js');
var Reporters = require('../cx_reporter.js');
var _map_plansummary = {};

var cxPgGUIPayments = {
	
	/**
	 * Keyboard actions & Data entry on controls of Payment and Review page.
	 *
	 * @param {Structures.PaymentReview} Control to carry out action against.
	 * @param {string} CardHolderName is the name that appears on the credit/debit/gift card used for payment.
	 * @param {string} CardNumber is the number that appears on the credit/debit/gift card used for payment. 
	 * @param {string} CardExpirationMonth is the month part of the card expiration date that appears on the credit/debit/gift card used for payment. 
	 * @param {string} CardExpirationYear is the year part of the card expiration date that appears on the credit/debit/gift card used for payment. 
	 * @param {string} CardCVVCode is the security code that appears on the credit/debit/gift card used for payment. 
	 * @param {bolean} HasMailingAddress (true/false) is the flag to indicate different mailing address if any. 
	 * @param {string} MailingAddressStreet is the street information of different mailing address if any. 
	 * @param {string} MailingAddressCity is the city information of different mailing address if any. 
	 * @param {string} MailingAddressState is the state information of different mailing address if any. 
	 * @param {string} MailingAddressZipCode is the zip code information of different mailing address if any. 
	 * @param {bolean} SaveCardForFuture (true/false) is the flag to indicate whether the credit/debit/gift card is to be saved for future payments. 
	 * @param {bolean} AuthorizePayment (true/false) is the flag to indicate whether the credit/debit/gift card payment applicant agrees to authorize. 
	 * @param {bolean} DownloadReceipt (true/false) is the flag to indicate receipt is to be downloaded in PDF fromat. 
	 * @param {bolean} PostReceipt (true/false) is the flag to indicate receipt is to be sent by postage to the applicant. 
	 */	
	keyIn : function(parameters) {
		switch(parameters.Control) {

			case Structures.PaymentReview.NameOnCard:
				Commons.keyIn({'Message' : 'Enter Card - Name : ',
							   'Control' : Controls.cx.page.Purchase.Card.Name.input.textbox,
							   'ControlType' : Structures.Locators.CSS,
							   'Text' : (parameters.CardHolderName) ?  parameters.CardHolderName : parameters.DataCSS.Card.Name});
				break;
				
			case Structures.PaymentReview.CardNumber:
				/* var _premium = this.readText('CX : Payments & Receipt page : Collect Premium amount from Summary.', 
											 Controls.cx.page.commons.Summary.Plan.Premium.label);
				console.log('Premium = ' + _premium); */
				/* Commons.evaluatePlanSummary({'Item' : Commons.PlanSummary.Premium,
											 'Message' : 'CX : Payments & Receipt page : Collect Premium amount from Summary.'})
				var _premium = Commons.getPlanSummary();
				console.log(_premium.Plan.Premium);
				this._map_payment_card = CreditCards.selectPaymentCreditCard({'CardCategory' : parameters.CardCategory, 
																			   'CardLocale' : parameters.CardLocale, 
																			   'CardSelectionIndex' : parameters.DataCSS.Card.Index, 
																			   'CardLocaleIndex' : parameters.DataCSS.Card.LocaleIndex,
																			   'Premium' : _premium});		
				Commons.keyIn({'Message' : 'Enter Card - Number : ',
							   'Control' : Controls.cx.page.Purchase.Card.Number.input.textbox,
							   'ControlType' : Structures.Locators.CSS,
							   'Text' : this._map_payment_card['Number']});
				*/
				Commons.keyIn({'Message' : 'Enter Card - Number : ',
							   'Control' : Controls.cx.page.Purchase.Card.Number.input.textbox,
							   'ControlType' : Structures.Locators.CSS,
							   'Text' : (parameters.CardNumber) ? parameters.CardNumber : parameters.DataCSS.Card.Number});
				break;

			case Structures.PaymentReview.ExpirationMonth:
				/*Commons.keyIn({'Message' : 'Enter Card - Expiration Month : ',
							   'Control' : Controls.cx.page.Purchase.Card.ExpirationDate.input.Month.selector,
							   'ControlType' : Structures.Locators.CSS,
							   'Text' : this._map_payment_card['ExpirationMonth']); */
				Commons.keyIn({'Message' : 'Enter Card - Expiration Month : ',
							   'Control' : Controls.cx.page.Purchase.Card.ExpirationDate.input.Month.selector,
							   'ControlType' : Structures.Locators.CSS,
							   'Text' : (parameters.CardExpirationMonth) ? parameters.CardExpirationMonth : parameters.DataCSS.Card.Expiration.Month});
				break;

			case Structures.PaymentReview.ExpirationYear:
				/* Commons.keyIn({'Message' : 'Enter Card - Expiration Year : ',
							   'Control' : Controls.cx.page.Purchase.Card.ExpirationDate.input.Year.selector,
							   'ControlType' : Structures.Locators.CSS,
							   'Text' : this._map_payment_card['ExpirationYear']); */
				Commons.keyIn({'Message' : 'Enter Card - Expiration Year : ',
							   'Control' : Controls.cx.page.Purchase.Card.ExpirationDate.input.Year.selector,
							   'ControlType' : Structures.Locators.CSS,
							   'Text' : (parameters.CardExpirationYear) ?  parameters.CardExpirationYear : parameters.DataCSS.Card.Expiration.Year});
				break;

			case Structures.PaymentReview.SecurityCode:
				Commons.keyIn({'Message' : 'Enter Card - Security Code CVV : ',
							   'Control' : Controls.cx.page.Purchase.Card.CCVCode.input.textbox,
							   'ControlType' : Structures.Locators.CSS,
							   'Text' : (parameters.CardCVVCode) ? parameters.CardCVVCode : parameters.DataCSS.Card.CCVNumber});
				break;

			case Structures.PaymentReview.HasMailingAddress:
				var _set_flag = (parameters.HasMailingAddress) ? parameters.HasMailingAddress : ((parameters.DataCSS.Payment.Card.MailingAddress.Exists == "Yes") ? true : false);
				Commons.keyIn({'Message' : 'ACTION HAS MAILING ADDRESS - Purchase & Receipt Page',
							   'Control' : Controls.cx.page.Purchase.Card.BillingAddress.SameBillingAddress.input.checkbox,
							   'ControlType' : Structures.Locators.CSS,
							   'Checkbox' : (_set_flag == true) ? Structures.FrameworkUIActions.Check : Structures.FrameworkUIActions.UnCheck});
				break;

			case Structures.PaymentReview.MailingStreet:
				Commons.keyIn({'Message' : 'Enter Card - Mailing Home Address : ',
							   'Control' : Controls.cx.page.Purchase.Card.BillingAddress.Address.Street.input.textbox,
							   'ControlType' : Structures.Locators.CSS,
							   'Text' : (parameters.MailingAddressStreet) ? parameters.MailingAddressStreet : parameters.DataCSS.Card.MailingAddress.Street});
				break;

			case Structures.PaymentReview.MailingCity:
				Commons.keyIn({'Message' : 'Enter Card - Mailing Home City : ',
							   'Control' : Controls.cx.page.Purchase.Card.BillingAddress.Address.City.input.textbox,
							   'ControlType' : Structures.Locators.CSS,
							   'Text' : (parameters.MailingAddressCity) ? parameters.MailingAddressCity : parameters.DataCSS.Card.MailingAddress.City});
				break;

			case Structures.PaymentReview.MailingState:
				Commons.keyIn({'Message' : 'Enter Card - Mailing Home State : ',
							   'Control' : Controls.cx.page.Purchase.Card.BillingAddress.Address.State.input.textbox,
							   'ControlType' : Structures.Locators.CSS,
							   'Text' : (parameters.MailingAddressState) ? parameters.MailingAddressState : parameters.DataCSS.Card.MailingAddress.State});
				break;

			case Structures.PaymentReview.MailingZip:
				Commons.keyIn({'Message' : 'Enter Card - Mailing Home Zip Code : ',
							   'Control' : Controls.cx.page.Purchase.Card.BillingAddress.Address.Zip.input.textbox,
							   'ControlType' : Structures.Locators.CSS,
							   'Text' : (parameters.MailingAddressZipCode) ? parameters.MailingAddressZipCode : parameters.DataCSS.Card.MailingAddress.Zip});
				break;

			case Structures.PaymentReview.SaveForFuture:
				var _set_flag = (parameters.SaveCardForFuture) ? parameters.SaveCardForFuture : ((parameters.DataCSS.Card.SaveForFuture == "Yes") ? true : false);
				Commons.keyIn({'Message' : 'ACTION SAVE FOR FUTURE - Purchase & Receipt Page',
							   'Control' : Controls.cx.page.Purchase.Card.SaveForFuture.input.checkbox,
							   'ControlType' : Structures.Locators.CSS,
							   'Checkbox' : (_set_flag == true) ? Structures.FrameworkUIActions.Check : Structures.FrameworkUIActions.UnCheck});
				break;

			case Structures.PaymentReview.AgreeAuthorization:
				var _set_flag = (parameters.AuthorizePayment) ? parameters.AuthorizePayment : ((parameters.DataCSS.AgreeToAuthorizationStatment == "Yes") ? true : false);
				Commons.keyIn({'Message' : 'ACTION HAVE READ AUTHORIZATION AGREEMENT - Purchase & Receipt Page',
							   'Control' : Controls.cx.page.Purchase.Authorization.Agreement.input.checkbox,
							   'ControlType' : Structures.Locators.CSS,
							   'Checkbox' : (_set_flag == true) ? Structures.FrameworkUIActions.Check : Structures.FrameworkUIActions.UnCheck});
				break;

			case Structures.PaymentReview.ReceiptDownload:
				var _set_flag = (parameters.DownloadReceipt) ? parameters.DownloadReceipt : ((parameters.DataCSS.DisclosureFormContract.IsDownloadedToPDF == "Yes") ? true : false);
				Commons.keyIn({'Message' : 'ACTION DOWNLOAD DISCLOSURE FORM OR CONTRACT IN PDF - Purchase & Receipt Page',
							   'Control' : Controls.cx.page.Purchase.DisclosureFormContract.DownloadCopy.input.checkbox,
							   'ControlType' : Structures.Locators.CSS,
							   'Checkbox' : (_set_flag == true) ? Structures.FrameworkUIActions.Check : Structures.FrameworkUIActions.UnCheck});
				break;

			case Structures.PaymentReview.ReceiptPostage:
				var _set_flag = (parameters.PostReceipt) ? parameters.PostReceipt : ((parameters.DataCSS.DisclosureFormContract.IsSendByPostage == "Yes") ? true : false);
				Commons.keyIn({'Message' : 'ACTION SEND DISCLOSURE FORM OR CONTRACT VIA POSTAGE - Purchase & Receipt Page',
							   'Control' : Controls.cx.page.Purchase.DisclosureFormContract.PostACopy.input.checkbox,
							   'ControlType' : Structures.Locators.CSS,
							   'Checkbox' : (_set_flag == true) ? Structures.FrameworkUIActions.Check : Structures.FrameworkUIActions.UnCheck});
				break;

			case Structures.PaymentReview.PlanSummary:
				Commons.keyIn({'Message' : 'ACTION DROPDOWN PLAN SUMMARY - Purchase & Receipt Page',
							   'Control' : Controls.cx.page.Purchase.Action.PlanSummary.input.toggler,
							   'ControlType' : Structures.Locators.CSS,
							   'Button' : true});
				break;

			case Structures.PaymentReview.Applicants:
				Commons.keyIn({'Message' : 'ACTION DROPDOWN APPLICANTS - Purchase & Receipt Page',
							   'Control' : Controls.cx.page.Purchase.Action.Applicants.input.toggler,
							   'ControlType' : Structures.Locators.CSS,
							   'Button' : true});
				break;

			case Structures.PaymentReview.WhatIsThis:
				Commons.keyIn({'Message' : 'ACTION WHAT IS THIS? - Purchase & Receipt Page',
							   'Control' : Controls.cx.page.Purchase.Action.WhatIsThis.input.link,
							   'ControlType' : Structures.Locators.CSS,
							   'Button' : true});
				break;

			case Structures.PaymentReview.DisclosureForContract:
				Commons.keyIn({'Message' : 'ACTION DISCLOSURE FOR CONTRACT? - Purchase & Receipt  Page',
							   'Control' : Controls.cx.page.Purchase.Action.DisclosureFormContact.input.link,
							   'ControlType' : Structures.Locators.CSS,
							   'Button' : true});
				break;

			case Structures.PaymentReview.Back:
				Commons.keyIn({'Message' : 'ACTION BACK - Purchase & Receipt  Page',
							   'Control' : Controls.cx.page.Purchase.Action.Back.input.button,
							   'ControlType' : Structures.Locators.CSS,
							   'Button' : true});
				break;

			case Structures.PaymentReview.PurchaseNow:
				Commons.keyIn({'Message' : 'ACTION PURCHASE NOW - Purchase & Receipt  Page',
							   'Control' : Controls.cx.page.Purchase.Action.PurchaseNow.input.button,
							   'ControlType' : Structures.Locators.CSS,
							   'Button' : true});
				break;
		
			default:
				break;
		}
	},
		
	/**
	 * Validate components of Payments & Review Page.
	 *
	 * @param {Structures.Validators} ValidateFor specify what component on the page is to be validated.
	 * @param {Structures.PaymentReview} Control is the object on the page to be validated.
	 * @param {Structures.MessageLocations} MessageLocation where the message/error displayed is to be validated.	 
	 * @param {string} WithData data that is to be validated.
	 * @param {json} DataCSS snippet of json that provides required information for processing.
	 * @param {String} Indice of the dependent record.
	 */
	validate : function(parameters) {
		if (parameters.ValidateFor == Structures.Validators.Caption) { this.validateCaptions({'Control' : parameters.Control}); }
		if (parameters.ValidateFor == Structures.Validators.Placeholder) { this.validatePlaceholders({'Control' : parameters.Control}); }
		if (parameters.ValidateFor == Structures.Validators.Errors) { this.validateErrors({'Control' : parameters.Control,
																						   'MessageLocation' : parameters.MessageLocation}); }
		if (parameters.ValidateFor == Structures.Validators.Information) { this.validateInformation({'Control' : parameters.Control,
																									 'DataCSS' : parameters.DataCSS,
																									 'WithData' : parameters.WithData,
																									 'OfIndice' : parameters.Indice}); }
		if (parameters.ValidateFor == Structures.Validators.Summary) { Commons.validatePlanSummary({'Page': 'CX Payment & Receipt',
																									'Control' : parameters.Control,
																									'DataCSS' : parameters.DataCSS}); }
		if (parameters.ValidateFor == Structures.Validators.Contents) { this.validateInformation({'Control' : parameters.Control,
																								  'DataCSS' : parameters.DataCSS,
																								  'WithData' : parameters.WithData,
																								  'OfIndice' : parameters.Indice}); }
	},

	/**
	 * Validate Captions for GUI objects on Payments & Review Page.
	 *
	 * @param {Structures.PaymentReview} Control to carry out action against.
	 */
	validateCaptions : function(parameters) {
		switch(parameters.Control) {

			case Structures.PaymentReview.NameOnCard:
				//--- Validate Caption For - Payments and Review - Name on Card.
				Commons.verify({'Message' : 'Validate Caption For - Payments and Review - Name on Card is : ' + Controls.cx.page.Purchase.Card.Name.caption,
								'Control' : Controls.cx.page.Purchase.Card.Name.label,
								'ControlType' : Structures.Locators.CSS,
								'QuestText' : Controls.cx.page.Purchase.Card.Name.caption});
				break;
				
			case Structures.PaymentReview.CardNumber:
				//--- Validate Caption For - Payments and Review - Card Number.
				Commons.verify({'Message' : 'Validate Caption For - Payments and Review - Card Number is : ' + Controls.cx.page.Purchase.Card.Number.caption,
								'Control' : Controls.cx.page.Purchase.Card.Number.label,
								'ControlType' : Structures.Locators.CSS,
								'QuestText' : Controls.cx.page.Purchase.Card.Number.caption});
				break;

			case Structures.PaymentReview.ExpirationMonth:
				//--- Validate Caption For - Payments and Review - Expiration Month.
				Commons.verify({'Message' : 'Validate Caption For - Payments and Review - Expiration Month is : ' + Controls.cx.page.Purchase.Card.ExpirationDate.input.Month.caption,
								'Control' : Controls.cx.page.Purchase.Card.ExpirationDate.input.Month.label,
								'ControlType' : Structures.Locators.CSS,
								'QuestText' : Controls.cx.page.Purchase.Card.ExpirationDate.input.Month.caption});
				break;

			case Structures.PaymentReview.ExpirationYear:
				//--- Validate Caption For - Payments and Review - Expiration Year.
				Commons.verify({'Message' : 'Validate Caption For - Payments and Review - Expiration Year is : ' + Controls.cx.page.Purchase.Card.ExpirationDate.input.Year.caption,
								'Control' : Controls.cx.page.Purchase.Card.ExpirationDate.input.Year.label,
								'ControlType' : Structures.Locators.CSS,
								'QuestText' : Controls.cx.page.Purchase.Card.ExpirationDate.input.Year.caption});
				break;

			case Structures.PaymentReview.SecurityCode:
				//--- Validate Caption For - Payments and Review - CCV Code.
				Commons.verify({'Message' : 'Validate Caption For - Payments and Review - CCV Code is : ' + Controls.cx.page.Purchase.Card.CCVCode.caption,
								'Control' : Controls.cx.page.Purchase.Card.CCVCode.label,
								'ControlType' : Structures.Locators.CSS,
								'QuestText' : Controls.cx.page.Purchase.Card.CCVCode.caption});
				break;

			case Structures.PaymentReview.HasMailingAddress:
				//--- Validate Caption For - Payments and Review - Has Mailing Address.
				Commons.verify({'Message' : 'Validate Caption For - Payments and Review - Has Mailing Address is : ' + Controls.cx.page.Purchase.Card.BillingAddress.SameBillingAddress.caption,
								'Control' : Controls.cx.page.Purchase.Card.BillingAddress.SameBillingAddress.label,
								'ControlType' : Structures.Locators.CSS,
								'QuestText' : Controls.cx.page.Purchase.Card.BillingAddress.SameBillingAddress.caption});
				break;

			case Structures.PaymentReview.MailingStreet:
				//--- Validate Caption For - Payments and Review - Mailing Address Street.
				Commons.verify({'Message' : 'Validate Caption For - Payments and Review - Mailing Address Street is : ' + Controls.cx.page.Purchase.Card.BillingAddress.Address.Street.caption,
								'Control' : Controls.cx.page.Purchase.Card.BillingAddress.Address.Street.label,
								'ControlType' : Structures.Locators.CSS,
								'QuestText' : Controls.cx.page.Purchase.Card.BillingAddress.Address.Street.caption});
				break;

			case Structures.PaymentReview.MailingCity:
				//--- Validate Caption For - Payments and Review - Mailing Address City.
				Commons.verify({'Message' : 'Validate Caption For - Payments and Review - Mailing Address City is : ' + Controls.cx.page.Purchase.Card.BillingAddress.Address.City.caption,
								'Control' : Controls.cx.page.Purchase.Card.BillingAddress.Address.City.label,
								'ControlType' : Structures.Locators.CSS,
								'QuestText' : Controls.cx.page.Purchase.Card.BillingAddress.Address.City.caption});
				break;

			case Structures.PaymentReview.MailingState:
				//--- Validate Caption For - Payments and Review - Mailing Address State.
				Commons.verify({'Message' : 'Validate Caption For - Payments and Review - Mailing Address State is : ' + Controls.cx.page.Purchase.Card.BillingAddress.Address.State.caption,
								'Control' : Controls.cx.page.Purchase.Card.BillingAddress.Address.State.label,
								'ControlType' : Structures.Locators.CSS,
								'QuestText' : Controls.cx.page.Purchase.Card.BillingAddress.Address.State.caption});
				break;

			case Structures.PaymentReview.MailingZip:
				//--- Validate Caption For - Payments and Review - Mailing Address Zip.
				Commons.verify({'Message' : 'Validate Caption For - Payments and Review - Mailing Address Zip is : ' + Controls.cx.page.Purchase.Card.BillingAddress.Address.Zip.caption,
								'Control' : Controls.cx.page.Purchase.Card.BillingAddress.Address.Zip.label,
								'ControlType' : Structures.Locators.CSS,
								'QuestText' : Controls.cx.page.Purchase.Card.BillingAddress.Address.Zip.caption});
				break;

			case Structures.PaymentReview.SaveForFuture:
				//--- Validate Caption For - Payments and Review - Save Card Information for future.
				Commons.verify({'Message' : 'Validate Caption For - Payments and Review - Save Card Information for future is : ' + Controls.cx.page.Purchase.Card.SaveForFuture.caption,
								'Control' : Controls.cx.page.Purchase.Card.SaveForFuture.label,
								'ControlType' : Structures.Locators.CSS,
								'QuestText' : Controls.cx.page.Purchase.Card.SaveForFuture.caption});
				break;

			case Structures.PaymentReview.AgreeAuthorization:
				//--- Validate Caption For - Payments and Review - Authorization.
				Commons.verify({'Message' : 'Validate Caption For - Payments and Review - Authorization is : ' + Controls.cx.page.Purchase.Authorization.caption,
								'Control' : Controls.cx.page.Purchase.Authorization.label,
								'ControlType' : Structures.Locators.CSS,
								'QuestText' : Controls.cx.page.Purchase.Authorization.caption});

				//--- Validate Caption For - Payments and Review - Authorization Agreement.
				Commons.verify({'Message' : 'Validate Caption For - Payments and Review - Authorization Agreement is : ' + Controls.cx.page.Purchase.Authorization.Agreement.caption,
								'Control' : Controls.cx.page.Purchase.Authorization.Agreement.label,
								'ControlType' : Structures.Locators.CSS,
								'QuestText' : Controls.cx.page.Purchase.Authorization.Agreement.caption});

				//--- Validate Caption For - Payments and Review - Authorization Agreement Statement.
				Commons.verify({'Message' : 'Validate Caption For - Payments and Review - Authorization Agreement Statement is : ' + Controls.cx.page.Purchase.Authorization.Agreement.Statement.caption,
								'Control' : Controls.cx.page.Purchase.Authorization.Agreement.Statement.label,
								'ControlType' : Structures.Locators.CSS,
								'QuestText' : Controls.cx.page.Purchase.Authorization.Agreement.Statement.caption});
				break;

			case Structures.PaymentReview.ReceiptDownload:
				//--- Validate Caption For - Payments and Review - Form or Contract Download PDF.
				Commons.verify({'Message' : 'Validate Caption For - Payments and Review - Form or Contract Download PDF is : ' + Controls.cx.page.Purchase.DisclosureFormContract.DownloadCopy.caption,
								'Control' : Controls.cx.page.Purchase.DisclosureFormContract.DownloadCopy.label,
								'ControlType' : Structures.Locators.CSS,
								'QuestText' : Controls.cx.page.Purchase.DisclosureFormContract.DownloadCopy.caption});
				break;

			case Structures.PaymentReview.ReceiptPostage:
				//--- Validate Caption For - Payments and Review - Form or Contract mailed by postage.
				Commons.verify({'Message' : 'Validate Caption For - Payments and Review - Form or Contract mailed by postage is : ' + Controls.cx.page.Purchase.DisclosureFormContract.PostACopy.caption,
								'Control' : Controls.cx.page.Purchase.DisclosureFormContract.PostACopy.label,
								'ControlType' : Structures.Locators.CSS,
								'QuestText' : Controls.cx.page.Purchase.DisclosureFormContract.PostACopy.caption});
				break;

			case Structures.PaymentReview.PlanSummary:
				//--- Validate Caption For - Payments and Review - Plan Summary.
				Commons.verify({'Message' : 'Validate Caption For - Payments and Review - Plan Summary is : ' + Controls.cx.page.Purchase.ReviewPlan.PlanSummary.caption,
								'Control' : Controls.cx.page.Purchase.ReviewPlan.PlanSummary.label,
								'ControlType' : Structures.Locators.CSS,
								'QuestText' : Controls.cx.page.Purchase.ReviewPlan.PlanSummary.caption});
				break;

			case Structures.PaymentReview.Applicants:
				break;

			case Structures.PaymentReview.WhatIsThis:
				break;

			case Structures.PaymentReview.DisclosureForContract:
				break;

			case Structures.PaymentReview.Back:
				break;

			case Structures.PaymentReview.PurchaseNow:
				break;
			
			case Structures.PaymentReview.ValidateAll:
				this.validateCaptions(Structures.PaymentReview.NameOnCard);
				this.validateCaptions(Structures.PaymentReview.CardNumber);
				this.validateCaptions(Structures.PaymentReview.ExpirationMonth);
				this.validateCaptions(Structures.PaymentReview.ExpirationYear);
				this.validateCaptions(Structures.PaymentReview.SecurityCode);
				this.validateCaptions(Structures.PaymentReview.HasMailingAddress);
				this.validateCaptions(Structures.PaymentReview.MailingStreet);
				this.validateCaptions(Structures.PaymentReview.MailingCity);
				this.validateCaptions(Structures.PaymentReview.MailingState);
				this.validateCaptions(Structures.PaymentReview.MailingZip);
				this.validateCaptions(Structures.PaymentReview.SaveForFuture);
				this.validateCaptions(Structures.PaymentReview.AgreeAuthorization);
				this.validateCaptions(Structures.PaymentReview.ReceiptDownload);
				this.validateCaptions(Structures.PaymentReview.ReceiptPostage);
				this.validateCaptions(Structures.PaymentReview.PlanSummary);
				this.validateCaptions(Structures.PaymentReview.Applicants);
				this.validateCaptions(Structures.PaymentReview.WhatIsThis);
				this.validateCaptions(Structures.PaymentReview.DisclosureForContract);
				this.validateCaptions(Structures.PaymentReview.Back);
				this.validateCaptions(Structures.PaymentReview.PurchaseNow);
				break;
		
			default:
				break;

		}
	},
	
	/**
	 * Validate Placeholders for GUI objects on Payments & Review Page.
	 *
	 * @param {Structures.PaymentReview} Control to carry out action against to navigate to.
	 */
	validatePlaceholders : function(parameters) {
		switch(parameters.Control) {

			case Structures.PaymentReview.NameOnCard:
				break;
				
			case Structures.PaymentReview.CardNumber:
				break;

			case Structures.PaymentReview.ExpirationMonth:
				break;

			case Structures.PaymentReview.ExpirationYear:
				break;

			case Structures.PaymentReview.SecurityCode:
				break;

			case Structures.PaymentReview.HasMailingAddress:
				break;

			case Structures.PaymentReview.MailingStreet:
				break;

			case Structures.PaymentReview.MailingCity:
				break;

			case Structures.PaymentReview.MailingState:
				break;

			case Structures.PaymentReview.MailingZip:
				break;

			case Structures.PaymentReview.SaveForFuture:
				break;

			case Structures.PaymentReview.AgreeAuthorization:
				break;

			case Structures.PaymentReview.ReceiptDownload:
				break;

			case Structures.PaymentReview.ReceiptPostage:
				break;

			case Structures.PaymentReview.PlanSummary:
				break;

			case Structures.PaymentReview.Applicants:
				break;

			case Structures.PaymentReview.WhatIsThis:
				break;

			case Structures.PaymentReview.DisclosureForContract:
				break;

			case Structures.PaymentReview.Back:
				break;

			case Structures.PaymentReview.PurchaseNow:
				break;
			
			case Structures.PaymentReview.ValidateAll:
				this.validatePlaceholders(Structures.PaymentReview.NameOnCard);
				this.validatePlaceholders(Structures.PaymentReview.CardNumber);
				this.validatePlaceholders(Structures.PaymentReview.ExpirationMonth);
				this.validatePlaceholders(Structures.PaymentReview.ExpirationYear);
				this.validatePlaceholders(Structures.PaymentReview.SecurityCode);
				this.validatePlaceholders(Structures.PaymentReview.HasMailingAddress);
				this.validatePlaceholders(Structures.PaymentReview.MailingStreet);
				this.validatePlaceholders(Structures.PaymentReview.MailingCity);
				this.validatePlaceholders(Structures.PaymentReview.MailingState);
				this.validatePlaceholders(Structures.PaymentReview.MailingZip);
				this.validatePlaceholders(Structures.PaymentReview.SaveForFuture);
				this.validatePlaceholders(Structures.PaymentReview.AgreeAuthorization);
				this.validatePlaceholders(Structures.PaymentReview.ReceiptDownload);
				this.validatePlaceholders(Structures.PaymentReview.ReceiptPostage);
				this.validatePlaceholders(Structures.PaymentReview.PlanSummary);
				this.validatePlaceholders(Structures.PaymentReview.Applicants);
				this.validatePlaceholders(Structures.PaymentReview.WhatIsThis);
				this.validatePlaceholders(Structures.PaymentReview.DisclosureForContract);
				this.validatePlaceholders(Structures.PaymentReview.Back);
				this.validatePlaceholders(Structures.PaymentReview.PurchaseNow);
				break;
		
			default:
				break;

		}
	},
	
	/**
	 * Validate errors on Payments & Review Page.
	 *
	 * @param {Structures.PaymentReview} Control is the object on the page to be validated.
	 * @param {Structures.MessageLocations} MessageLocation where the message/error displayed is to be validated.
	 */
	validateErrors : function(parameters) {
		var _control = '';
		var _location = '';
		switch(parameters.Control) {

			case Structures.PaymentReview.NameOnCard:
				if (parameters.MessageLocation == Structures.MessageLocations.Header) { _location = 'Page Top'; _control = Controls.cx.page.Purchase.Card.Name.error.ontop; }
				if (parameters.MessageLocation == Structures.MessageLocations.Control) { _location = 'Below Control'; _control = Controls.cx.page.Purchase.Card.Name.error.atcontrol; }
				//--- Validate Error Message At - Payments & Review - Name On Card
				Commons.verify({'Message' : 'Validate Error Message At - Payments & Review - Name On Card is : ' + Controls.cx.page.Purchase.Card.Name.error.text,
								'Control' : _control,
								'ControlType' : Structures.Locators.CSS,
								'QuestText' : Controls.cx.page.Purchase.Card.Name.error.text});
				break;
				
			case Structures.PaymentReview.CardNumber:
				if (parameters.MessageLocation == Structures.MessageLocations.Header) { _location = 'Page Top'; _control = Controls.cx.page.Purchase.Card.Number.error.ontop; }
				if (parameters.MessageLocation == Structures.MessageLocations.Control) { _location = 'Below Control'; _control = Controls.cx.page.Purchase.Card.Number.error.atcontrol; }
				//--- Validate Error Message At - Payments & Review - Card Number
				Commons.verify({'Message' : 'Validate Error Message At - Payments & Review - Card Number is : ' + Controls.cx.page.Purchase.Card.Number.error.text,
								'Control' : _control,
								'ControlType' : Structures.Locators.CSS,
								'QuestText' : Controls.cx.page.Purchase.Card.Number.error.text});
				break;

			case Structures.PaymentReview.ExpirationMonth:
				if (parameters.MessageLocation == Structures.MessageLocations.Header) { _location = 'Page Top'; _control = Controls.cx.page.Purchase.Card.ExpirationDate.input.Month.error.ontop; }
				if (parameters.MessageLocation == Structures.MessageLocations.Control) { _location = 'Below Control'; _control = Controls.cx.page.Purchase.Card.ExpirationDate.input.Month.error.atcontrol; }
				//--- Validate Error Message At - Payments & Review - Card Expiration Month
				Commons.verify({'Message' : 'Validate Error Message At - Payments & Review - Card Expiration Month is : ' + Controls.cx.page.Purchase.Card.ExpirationDate.input.Month.error.text,
								'Control' : _control,
								'ControlType' : Structures.Locators.CSS,
								'QuestText' : Controls.cx.page.Purchase.Card.ExpirationDate.input.Month.error.text});
				break;

			case Structures.PaymentReview.ExpirationYear:
				if (parameters.MessageLocation == Structures.MessageLocations.Header) { _location = 'Page Top'; _control = Controls.cx.page.Purchase.Card.ExpirationDate.input.Year.error.ontop; }
				if (parameters.MessageLocation == Structures.MessageLocations.Control) { _location = 'Below Control'; _control = Controls.cx.page.Purchase.Card.ExpirationDate.input.Year.error.atcontrol; }
				//--- Validate Error Message At - Payments & Review - Card Expiration Year
				Commons.verify({'Message' : 'Validate Error Message At - Payments & Review - Card Expiration Year is : ' + Controls.cx.page.Purchase.Card.ExpirationDate.input.Year.error.text,
								'Control' : _control,
								'ControlType' : Structures.Locators.CSS,
								'QuestText' : Controls.cx.page.Purchase.Card.ExpirationDate.input.Year.error.text});
				break;

			case Structures.PaymentReview.SecurityCode:
				if (parameters.MessageLocation == Structures.MessageLocations.Header) { _location = 'Page Top'; _control = Controls.cx.page.Purchase.Card.CCVCode.error.ontop; }
				if (parameters.MessageLocation == Structures.MessageLocations.Control) { _location = 'Below Control'; _control = Controls.cx.page.Purchase.Card.CCVCode.error.atcontrol; }
				//--- Validate Error Message At - Payments & Review - Card CCV Code
				Commons.verify({'Message' : 'Validate Error Message At - Payments & Review - Card CCV Code is : ' + Controls.cx.page.Purchase.Card.CCVCode.error.text,
								'Control' : _control,
								'ControlType' : Structures.Locators.CSS,
								'QuestText' : Controls.cx.page.Purchase.Card.CCVCode.error.text});
				break;

			case Structures.PaymentReview.HasMailingAddress:
				break;

			case Structures.PaymentReview.MailingStreet:
				break;

			case Structures.PaymentReview.MailingCity:
				break;

			case Structures.PaymentReview.MailingState:
				break;

			case Structures.PaymentReview.MailingZip:
				break;

			case Structures.PaymentReview.SaveForFuture:
				break;

			case Structures.PaymentReview.AgreeAuthorization:
				if (parameters.MessageLocation == Structures.MessageLocations.Header) { _location = 'Page Top'; _control = Controls.cx.page.Purchase.Authorization.Agreement.error.ontop; }
				if (parameters.MessageLocation == Structures.MessageLocations.Control) { _location = 'Below Control'; _control = Controls.cx.page.Purchase.Authorization.Agreement.error.atcontrol; }
				//--- Validate Error Message At - Payments & Review - Agree Authorization Statement
				Commons.verify({'Message' : 'Validate Error Message At - Payments & Review - Agree Authorization Statement is : ' + Controls.cx.page.Purchase.Authorization.Agreement.error.text,
								'Control' : _control,
								'ControlType' : Structures.Locators.CSS,
								'QuestText' : Controls.cx.page.Purchase.Authorization.Agreement.error.text});
				break;

			case Structures.PaymentReview.ReceiptDownload:
				break;

			case Structures.PaymentReview.ReceiptPostage:
				break;

			case Structures.PaymentReview.PlanSummary:
				break;

			case Structures.PaymentReview.Applicants:
				break;

			case Structures.PaymentReview.WhatIsThis:
				break;

			case Structures.PaymentReview.DisclosureForContract:
				break;

			case Structures.PaymentReview.Back:
				break;

			case Structures.PaymentReview.PurchaseNow:
				break;
			
			case Structures.PaymentReview.ValidateAll:
				this.validateErrors({'Control' : parameters.NameOnCard, 'MessageLocation' : parameters.MessageLocation});
				this.validateErrors({'Control' : parameters.CardNumber, 'MessageLocation' : parameters.MessageLocation});
				this.validateErrors({'Control' : parameters.ExpirationMonth, 'MessageLocation' : parameters.MessageLocation});
				this.validateErrors({'Control' : parameters.ExpirationYear, 'MessageLocation' : parameters.MessageLocation});
				this.validateErrors({'Control' : parameters.AgreeAuthorization, 'MessageLocation' : parameters.MessageLocation});
				break;
		
			default:
				break;

		}
	},
	
	/**
	 * Validate errors on Facilities Page.
	 *
	 * @param {Structures.PaymentReview} Control to carry out action against.
	 * @param {String} QuestText control caption.
	 * @param {json} DataCSS default standardized test dataset.
	 */
	//--- Valid parameter names : Control, WithData, DataCSS, OfIndice
	validateInformation : function(parameters) {
		switch(parameters.Control) {

			case Structures.PaymentReview.NameOnCard:
				var _data = (parameters.QuestText) ? parameters.QuestText : parameters.DataCSS.Payment.Card.Name;
				//--- Validate Information For - Payment & Review - Card Holder Name
				Commons.verify({'Message' : 'Validate Information For - Payment & Review - Card Holder Name is : ' + _data,
								'Control' : Controls.cx.page.Purchase.Card.Name.input.textbox,
								'ControlType' : Structures.Locators.CSS,
								'QuestText' : _data});
				break;
				
			case Structures.PaymentReview.CardNumber:
				var _data = (parameters.QuestText) ? parameters.QuestText : parameters.DataCSS.Payment.Card.Number;
				//--- Validate Information For - Payment & Review - Card Number
				Commons.verify({'Message' : 'Validate Information For - Payment & Review - Card Number is : ' + _data,
								'Control' : Controls.cx.page.Purchase.Card.Number.input.textbox,
								'ControlType' : Structures.Locators.CSS,
								'QuestText' : _data});
				break;

			case Structures.PaymentReview.ExpirationMonth:
				var _data = (parameters.QuestText) ? parameters.QuestText : parameters.DataCSS.Payment.Card.Expiration.Month;
				//--- Validate Information For - Payment & Review - Card Expiration Month
				Commons.verify({'Message' : 'Validate Information For - Payment & Review - Card Expiration Month is : ' + _data,
								'Control' : Controls.cx.page.Purchase.Card.ExpirationDate.input.Month.selector,
								'ControlType' : Structures.Locators.CSS,
								'QuestText' : _data});
				break;

			case Structures.PaymentReview.ExpirationYear:
				var _data = (parameters.QuestText) ? parameters.QuestText : parameters.DataCSS.Payment.Card.Expiration.Year;
				//--- Validate Information For - Payment & Review - Card Expiration Year
				Commons.verify({'Message' : 'Validate Information For - Payment & Review - Card Expiration Year is : ' + _data,
								'Control' : Controls.cx.page.Purchase.Card.ExpirationDate.input.Year.selector,
								'ControlType' : Structures.Locators.CSS,
								'QuestText' : _data});
				break;

			case Structures.PaymentReview.SecurityCode:
				var _data = (parameters.QuestText) ? parameters.QuestText : parameters.DataCSS.Payment.Card.CCVNumber;
				//--- Validate Information For - Payment & Review - Card CCV Number
				Commons.verify({'Message' : 'Validate Information For - Payment & Review - Card CCV Number is : ' + _data,
								'Control' : Controls.cx.page.Purchase.Card.CCVCode.input.textbox,
								'ControlType' : Structures.Locators.CSS,
								'QuestText' : _data});
				break;

			case Structures.PaymentReview.HasMailingAddress:
				var _data = (parameters.QuestText) ? parameters.QuestText : parameters.DataCSS.Payment.Card.MailingAddress.Exists;
				//--- Validate Information For - Payment & Review - Has Mailing Address
				Commons.verify({'Message' : 'Validate Information For - Payment & Review - Has Mailing Address is : ' + _data,
								'Control' : Controls.cx.page.Purchase.Card.BillingAddress.SameBillingAddress.input.checkbox,
								'ControlType' : Structures.Locators.CSS,
								'Checkbox' : (_data == "Yes") ? Structures.FrameworkUIActions.Check : Structures.FrameworkUIActions.UnCheck});
				break;

			case Structures.PaymentReview.MailingStreet:
				var _data = (parameters.QuestText) ? parameters.QuestText : parameters.DataCSS.Payment.Card.MailingAddress.Street;
				//--- Validate Information For - Payment & Review - Card Billing Address Street
				Commons.verify({'Message' : 'Validate Information For - Payment & Review - Card Billing Address Street is : ' + _data,
								'Control' : Controls.cx.page.Purchase.Card.BillingAddress.Address.Street.input.textbox,
								'ControlType' : Structures.Locators.CSS,
								'QuestText' : _data});
				break;

			case Structures.PaymentReview.MailingCity:
				var _data = (parameters.QuestText) ? parameters.QuestText : parameters.DataCSS.Payment.Card.MailingAddress.City;
				//--- Validate Information For - Payment & Review - Card Billing Address City
				Commons.verify({'Message' : 'Validate Information For - Payment & Review - Card Billing Address City is : ' + _data,
								'Control' : Controls.cx.page.Purchase.Card.BillingAddress.Address.City.input.textbox,
								'ControlType' : Structures.Locators.CSS,
								'QuestText' : _data});
				break;

			case Structures.PaymentReview.MailingState:
				var _data = (parameters.QuestText) ? parameters.QuestText : parameters.DataCSS.Payment.Card.MailingAddress.State;
				//--- Validate Information For - Payment & Review - Card Billing Address State
				Commons.verify({'Message' : 'Validate Information For - Payment & Review - Card Billing Address State is : ' + _data,
								'Control' : Controls.cx.page.Purchase.Card.BillingAddress.Address.State.input.textbox,
								'ControlType' : Structures.Locators.CSS,
								'QuestText' : _data});
				break;

			case Structures.PaymentReview.MailingZip:
				var _data = (parameters.QuestText) ? parameters.QuestText : parameters.DataCSS.Payment.Card.MailingAddress.Zip;
				//--- Validate Information For - Payment & Review - Card Billing Address Zip
				Commons.verify({'Message' : 'Validate Information For - Payment & Review - Card Billing Address Zip is : ' + _data,
								'Control' : Controls.cx.page.Purchase.Card.BillingAddress.Address.Zip.input.textbox,
								'ControlType' : Structures.Locators.CSS,
								'QuestText' : _data});
				break;

			case Structures.PaymentReview.SaveForFuture:
				var _data = (parameters.QuestText) ? parameters.QuestText : parameters.DataCSS.Payment.Card.SaveForFuture;
				//--- Validate Information For - Payment & Review - Save For Future
				Commons.verify({'Message' : 'Validate Information For - Payment & Review - Save For Future is : ' + _data,
								'Control' : Controls.cx.page.Purchase.Card.SaveForFuture.input.checkbox,
								'ControlType' : Structures.Locators.CSS,
								'Checkbox' : (_data == "Yes") ? Structures.FrameworkUIActions.Check : Structures.FrameworkUIActions.UnCheck});
				break;

			case Structures.PaymentReview.AgreeAuthorization:
				var _data = (parameters.QuestText) ? parameters.QuestText : parameters.DataCSS.Payment.Card.AgreeToAuthorizationStatment;
				//--- Validate Information For - Payment & Review - Agree to Authorization
				Commons.verify({'Message' : 'Validate Information For - Payment & Review - Agree to Authorization is : ' + _data,
								'Control' : Controls.cx.page.Purchase.Authorization.Agreement.input.checkbox,
								'ControlType' : Structures.Locators.CSS,
								'Checkbox' : (_data == "Yes") ? Structures.FrameworkUIActions.Check : Structures.FrameworkUIActions.UnCheck});
				break;

			case Structures.PaymentReview.ReceiptDownload:
				var _data = (parameters.QuestText) ? parameters.QuestText : parameters.DataCSS.Payment.Card.DisclosureFormContract.IsDownloadedToPDF;
				//--- Validate Information For - Payment & Review - Disclosure Form/Contract Download PDF
				Commons.verify({'Message' : 'Validate Information For - Payment & Review - Disclosure Form/Contract Download PDF is : ' + _data,
								'Control' : Controls.cx.page.Purchase.DisclosureFormContract.DownloadCopy.input.checkbox,
								'ControlType' : Structures.Locators.CSS,
								'Checkbox' : (_data == "Yes") ? Structures.FrameworkUIActions.Check : Structures.FrameworkUIActions.UnCheck});
				break;

			case Structures.PaymentReview.ReceiptPostage:
				var _data = (parameters.QuestText) ? parameters.QuestText : parameters.DataCSS.Payment.Card.DisclosureFormContract.IsSendByPostage;
				//--- Validate Information For - Payment & Review - Disclosure Form/Contract Send Via Postage
				Commons.verify({'Message' : 'Validate Information For - Payment & Review - Disclosure Form/Contract Send Via Postage is : ' + _data,
								'Control' : Controls.cx.page.Purchase.DisclosureFormContract.PostACopy.input.checkbox,
								'ControlType' : Structures.Locators.CSS,
								'Checkbox' : (_data == "Yes") ? Structures.FrameworkUIActions.Check : Structures.FrameworkUIActions.UnCheck});
				break;

			case Structures.PaymentReview.Applicants:
				break;

			case Structures.PaymentReview.ValidateAll:
				this.validateInformation({'Control' : Structures.PaymentReview.NameOnCard,
										  'DataCSS' : (parameters.DataCSS) ? parameters.DataCSS : '',
										  'QuestText' : (parameters.QuestText) ? parameters.QuestText : '' });
										  
				this.validateInformation({'Control' : Structures.PaymentReview.CardNumber,
										  'DataCSS' : (parameters.DataCSS) ? parameters.DataCSS : '',
										  'QuestText' : (parameters.QuestText) ? parameters.QuestText : '' });
										  
				this.validateInformation({'Control' : Structures.PaymentReview.ExpirationMonth,
										  'DataCSS' : (parameters.DataCSS) ? parameters.DataCSS : '',
										  'QuestText' : (parameters.QuestText) ? parameters.QuestText : '' });
										  
				this.validateInformation({'Control' : Structures.PaymentReview.ExpirationYear,
										  'DataCSS' : (parameters.DataCSS) ? parameters.DataCSS : '',
										  'QuestText' : (parameters.QuestText) ? parameters.QuestText : '' });
										  
				this.validateInformation({'Control' : Structures.PaymentReview.SecurityCode,
										  'DataCSS' : (parameters.DataCSS) ? parameters.DataCSS : '',
										  'QuestText' : (parameters.QuestText) ? parameters.QuestText : '' });
										  
				this.validateInformation({'Control' : Structures.PaymentReview.HasMailingAddress,
										  'DataCSS' : (parameters.DataCSS) ? parameters.DataCSS : '',
										  'QuestText' : (parameters.QuestText) ? parameters.QuestText : '' });
										  
				this.validateInformation({'Control' : Structures.PaymentReview.MailingStreet,
										  'DataCSS' : (parameters.DataCSS) ? parameters.DataCSS : '',
										  'QuestText' : (parameters.QuestText) ? parameters.QuestText : '' });
										  
				this.validateInformation({'Control' : Structures.PaymentReview.MailingCity,
										  'DataCSS' : (parameters.DataCSS) ? parameters.DataCSS : '',
										  'QuestText' : (parameters.QuestText) ? parameters.QuestText : '' });
										  
				this.validateInformation({'Control' : Structures.PaymentReview.MailingState,
										  'DataCSS' : (parameters.DataCSS) ? parameters.DataCSS : '',
										  'QuestText' : (parameters.QuestText) ? parameters.QuestText : '' });
										  
				this.validateInformation({'Control' : Structures.PaymentReview.MailingZip,
										  'DataCSS' : (parameters.DataCSS) ? parameters.DataCSS : '',
										  'QuestText' : (parameters.QuestText) ? parameters.QuestText : '' });
										  
				this.validateInformation({'Control' : Structures.PaymentReview.SaveForFuture,
										  'DataCSS' : (parameters.DataCSS) ? parameters.DataCSS : '',
										  'QuestText' : (parameters.QuestText) ? parameters.QuestText : '' });
										  
				this.validateInformation({'Control' : Structures.PaymentReview.AgreeAuthorization,
										  'DataCSS' : (parameters.DataCSS) ? parameters.DataCSS : '',
										  'QuestText' : (parameters.QuestText) ? parameters.QuestText : '' });
										  
				this.validateInformation({'Control' : Structures.PaymentReview.ReceiptDownload,
										  'DataCSS' : (parameters.DataCSS) ? parameters.DataCSS : '',
										  'QuestText' : (parameters.QuestText) ? parameters.QuestText : '' });
										  
				this.validateInformation({'Control' : Structures.PaymentReview.ReceiptPostage,
										  'DataCSS' : (parameters.DataCSS) ? parameters.DataCSS : '',
										  'QuestText' : (parameters.QuestText) ? parameters.QuestText : '' });
										  
				this.validateInformation({'Control' : Structures.PaymentReview.PlanSummary,
										  'DataCSS' : (parameters.DataCSS) ? parameters.DataCSS : '',
										  'QuestText' : (parameters.QuestText) ? parameters.QuestText : '' });
										  
				this.validateInformation({'Control' : Structures.PaymentReview.Applicants,
										  'DataCSS' : (parameters.DataCSS) ? parameters.DataCSS : '',
										  'QuestText' : (parameters.QuestText) ? parameters.QuestText : '' });
										  
				this.validateInformation({'Control' : Structures.PaymentReview.WhatIsThis,
										  'DataCSS' : (parameters.DataCSS) ? parameters.DataCSS : '',
										  'QuestText' : (parameters.QuestText) ? parameters.QuestText : '' });
										  
				this.validateInformation({'Control' : Structures.PaymentReview.DisclosureForContract,
										  'DataCSS' : (parameters.DataCSS) ? parameters.DataCSS : '',
										  'QuestText' : (parameters.QuestText) ? parameters.QuestText : '' });
										  
				break;
		
			default:
				break;

		}
	},

};
 
module.exports = cxPgGUIPayments;
