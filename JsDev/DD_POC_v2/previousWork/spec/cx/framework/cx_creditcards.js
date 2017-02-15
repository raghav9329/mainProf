//CX Automation Framework Libraries - Sanctioned Credit Cards.
//--- Author : Uday Thombre (UThombre@delta.org)

var Cards = require('./cx_creditcards.json');
var Structures = require('./cx_structures.js');

var cxFRMWRKSanctionedCC = {
	
	//--- Valid parameter name - CardCategory, CardLocale, CardSelectionIndex, CardLocaleIndex
	selectPaymentCC :  function (parameters) {
		var hashmap = {};
		hashmap['Number'] = '';
		hashmap['ExpirationMonth'] = '';
		hashmap['ExpirationYear'] = '';
		hashmap['CardCategory'] = parameters.CardCategory;
		hashmap['CardLocale'] = parameters.CardLocale;
		hashmap['CardSelectionIndex'] = parameters.CardSelectionIndex;
		hashmap['CardLocaleIndex'] = parameters.CardLocaleIndex;
		hashmap['Premium'] = ' ' + parameters.Premium;
		hashmap['Cents'] = parseInt(hashmap['Premium'].split('.')[1]);
		hashmap['CardProvider'] = null;
		
		switch(parameters.CardCategory) {
			case Structures.PaymentCardCategory.ApprovalRegular:
				if (hashmap['CardProvider'] == null) {
					hashmap['CardProvider'] = (this.isProviderSanctioned({'SanctionedCards' : Cards.cx.PennyMapper.Approval.regular.VISA,
																		  'Cents' : hashmap['Cents']}) == true) ? Cards.cx.VISA : null;
				}
				if (hashmap['CardProvider'] == null) {
					hashmap['CardProvider'] = (this.isProviderSanctioned({'SanctionedCards' : Cards.cx.PennyMapper.Approval.regular.MASTERCARD,
																		  'Cents' : hashmap['Cents']}) == true) ? Cards.cx.MASTERCARD : null;
				}
				if (hashmap['CardProvider'] == null) {
					hashmap['CardProvider'] = (this.isProviderSanctioned({'SanctionedCards' : Cards.cx.PennyMapper.Approval.regular.AMEX,
																		  'Cents' : hashmap['Cents']}) == true) ? Cards.cx.AMEX : null;
				}
				if (hashmap['CardProvider'] == null) {
					hashmap['CardProvider'] = (this.isProviderSanctioned({'SanctionedCards' : Cards.cx.PennyMapper.Approval.regular.DISCOVER,
																		  'Cents' : hashmap['Cents']}) == true) ? Cards.cx.DISCOVER : null;
				}
				break;
				
			case Structures.PaymentCardCategory.ApprovalReverseDecline:
				if (hashmap['CardProvider'] == null) {
					hashmap['CardProvider'] = (this.isProviderSanctioned({'SanctionedCards' : Cards.cx.PennyMapper.Approval.ReverseDecline.VISA,
																		  'Cents' : hashmap['Cents']}) == true) ? Cards.cx.VISA : null;
				}
				if (hashmap['CardProvider'] == null) {
					hashmap['CardProvider'] = (this.isProviderSanctioned({'SanctionedCards' : Cards.cx.PennyMapper.Approval.ReverseDecline.MASTERCARD,
																		  'Cents' : hashmap['Cents']}) == true) ? Cards.cx.MASTERCARD : null;
				}
				if (hashmap['CardProvider'] == null) {
					hashmap['CardProvider'] = (this.isProviderSanctioned({'SanctionedCards' : Cards.cx.PennyMapper.Approval.ReverseDecline.AMEX,
																		  'Cents' : hashmap['Cents']}) == true) ? Cards.cx.AMEX : null;
				}
				if (hashmap['CardProvider'] == null) {
					hashmap['CardProvider'] = (this.isProviderSanctioned({'SanctionedCards' : Cards.cx.PennyMapper.Approval.ReverseDecline.DISCOVER,
																		  'Cents' : hashmap['Cents']}) == true) ? Cards.cx.DISCOVER : null;
				}
				break;
				
			case Structures.PaymentCardCategory.ApprovalVisaSwitch:
				if (hashmap['CardProvider'] == null) {
					hashmap['CardProvider'] = (this.isProviderSanctioned({'SanctionedCards' : Cards.cx.PennyMapper.Approval.ApprovalVisaSwitch.VISA,
																		  'Cents' : hashmap['Cents']}) == true) ? Cards.cx.VISA : null;
				}
				if (hashmap['CardProvider'] == null) {
					hashmap['CardProvider'] = (this.isProviderSanctioned({'SanctionedCards' : Cards.cx.PennyMapper.Approval.ApprovalVisaSwitch.MASTERCARD,
																		  'Cents' : hashmap['Cents']}) == true) ? Cards.cx.MASTERCARD : null;
				}
				if (hashmap['CardProvider'] == null) {
					hashmap['CardProvider'] = (this.isProviderSanctioned({'SanctionedCards' : Cards.cx.PennyMapper.Approval.ApprovalVisaSwitch.AMEX,
																		  'Cents' : hashmap['Cents']}) == true) ? Cards.cx.AMEX : null;
				}
				if (hashmap['CardProvider'] == null) {
					hashmap['CardProvider'] = (this.isProviderSanctioned({'SanctionedCards' : Cards.cx.PennyMapper.Approval.ApprovalVisaSwitch.DISCOVER,
																		  'Cents' : hashmap['Cents']}) == true) ? Cards.cx.DISCOVER : null;
				}
				break;
				
			case Structures.PaymentCardCategory.CallAuthorizationCenter:
				if (hashmap['CardProvider'] == null) {
					hashmap['CardProvider'] = (this.isProviderSanctioned({'SanctionedCards' : Cards.cx.PennyMapper.CallAuthorizationCenter.VISA,
																		  'Cents' : hashmap['Cents']}) == true) ? Cards.cx.VISA : null;
				}
				if (hashmap['CardProvider'] == null) {
					hashmap['CardProvider'] = (this.isProviderSanctioned({'SanctionedCards' : Cards.cx.PennyMapper.CallAuthorizationCenter.MASTERCARD,
																		  'Cents' : hashmap['Cents']}) == true) ? Cards.cx.MASTERCARD : null;
				}
				if (hashmap['CardProvider'] == null) {
					hashmap['CardProvider'] = (this.isProviderSanctioned({'SanctionedCards' : Cards.cx.PennyMapper.CallAuthorizationCenter.AMEX,
																		  'Cents' : hashmap['Cents']}) == true) ? Cards.cx.AMEX : null;
				}
				if (hashmap['CardProvider'] == null) {
					hashmap['CardProvider'] = (this.isProviderSanctioned({'SanctionedCards' : Cards.cx.PennyMapper.CallAuthorizationCenter.DISCOVER,
																		  'Cents' : hashmap['Cents']}) == true) ? Cards.cx.DISCOVER : null;
				}
				break;
				
			case Structures.PaymentCardCategory.PickUpCard:
				if (hashmap['CardProvider'] == null) {
					hashmap['CardProvider'] = (this.isProviderSanctioned({'SanctionedCards' : Cards.cx.PennyMapper.PickUpCard.VISA,
																		  'Cents' : hashmap['Cents']}) == true) ? Cards.cx.VISA : null;
				}
				if (hashmap['CardProvider'] == null) {
					hashmap['CardProvider'] = (this.isProviderSanctioned({'SanctionedCards' : Cards.cx.PennyMapper.PickUpCard.MASTERCARD,
																		  'Cents' : hashmap['Cents']}) == true) ? Cards.cx.MASTERCARD : null;
				}
				if (hashmap['CardProvider'] == null) {
					hashmap['CardProvider'] = (this.isProviderSanctioned({'SanctionedCards' : Cards.cx.PennyMapper.PickUpCard.AMEX,
																		  'Cents' : hashmap['Cents']}) == true) ? Cards.cx.AMEX : null;
				}
				if (hashmap['CardProvider'] == null) {
					hashmap['CardProvider'] = (this.isProviderSanctioned({'SanctionedCards' : Cards.cx.PennyMapper.PickUpCard.DISCOVER,
																		  'Cents' : hashmap['Cents']}) == true) ? Cards.cx.DISCOVER : null;
				}
				break;
				
			case Structures.PaymentCardCategory.DeclinedRegular:
				if (hashmap['CardProvider'] == null) {
					hashmap['CardProvider'] = (this.isProviderSanctioned({'SanctionedCards' : Cards.cx.PennyMapper.Declined.regular.VISA,
																		  'Cents' : hashmap['Cents']}) == true) ? Cards.cx.VISA : null;
				}
				if (hashmap['CardProvider'] == null) {
					hashmap['CardProvider'] = (this.isProviderSanctioned({'SanctionedCards' : Cards.cx.PennyMapper.Declined.regular.MASTERCARD,
																		  'Cents' : hashmap['Cents']}) == true) ? Cards.cx.MASTERCARD : null;
				}
				if (hashmap['CardProvider'] == null) {
					hashmap['CardProvider'] = (this.isProviderSanctioned({'SanctionedCards' : Cards.cx.PennyMapper.Declined.regular.AMEX,
																		  'Cents' : hashmap['Cents']}) == true) ? Cards.cx.AMEX : null;
				}
				if (hashmap['CardProvider'] == null) {
					hashmap['CardProvider'] = (this.isProviderSanctioned({'SanctionedCards' : Cards.cx.PennyMapper.Declined.regular.DISCOVER,
																		  'Cents' : hashmap['Cents']}) == true) ? Cards.cx.DISCOVER : null;
				}
				break;
				
			case Structures.PaymentCardCategory.DeclinedPAAproval05:
				if (hashmap['CardProvider'] == null) {
					hashmap['CardProvider'] = (this.isProviderSanctioned({'SanctionedCards' : Cards.cx.PennyMapper.Declined.PAAproval05.VISA,
																		  'Cents' : hashmap['Cents']}) == true) ? Cards.cx.VISA : null;
				}
				if (hashmap['CardProvider'] == null) {
					hashmap['CardProvider'] = (this.isProviderSanctioned({'SanctionedCards' : Cards.cx.PennyMapper.Declined.PAAproval05.MASTERCARD,
																		  'Cents' : hashmap['Cents']}) == true) ? Cards.cx.MASTERCARD : null;
				}
				if (hashmap['CardProvider'] == null) {
					hashmap['CardProvider'] = (this.isProviderSanctioned({'SanctionedCards' : Cards.cx.PennyMapper.Declined.PAAproval05.AMEX,
																		  'Cents' : hashmap['Cents']}) == true) ? Cards.cx.AMEX : null;
				}
				if (hashmap['CardProvider'] == null) {
					hashmap['CardProvider'] = (this.isProviderSanctioned({'SanctionedCards' : Cards.cx.PennyMapper.Declined.PAAproval05.DISCOVER,
																		  'Cents' : hashmap['Cents']}) == true) ? Cards.cx.DISCOVER : null;
				}
				break;
				
			case Structures.PaymentCardCategory.DeclinedCVV2:
				if (hashmap['CardProvider'] == null) {
					hashmap['CardProvider'] = (this.isProviderSanctioned({'SanctionedCards' : Cards.cx.PennyMapper.Declined.CVV2.VISA,
																		  'Cents' : hashmap['Cents']}) == true) ? Cards.cx.VISA : null;
				}
				if (hashmap['CardProvider'] == null) {
					hashmap['CardProvider'] = (this.isProviderSanctioned({'SanctionedCards' : Cards.cx.PennyMapper.Declined.CVV2.MASTERCARD,
																		  'Cents' : hashmap['Cents']}) == true) ? Cards.cx.MASTERCARD : null;
				}
				if (hashmap['CardProvider'] == null) {
					hashmap['CardProvider'] = (this.isProviderSanctioned({'SanctionedCards' : Cards.cx.PennyMapper.Declined.CVV2.AMEX,
																		  'Cents' : hashmap['Cents']}) == true) ? Cards.cx.AMEX : null;
				}
				if (hashmap['CardProvider'] == null) {
					hashmap['CardProvider'] = (this.isProviderSanctioned({'SanctionedCards' : Cards.cx.PennyMapper.Declined.CVV2.DISCOVER,
																		  'Cents' : hashmap['Cents']}) == true) ? Cards.cx.DISCOVER : null;
				}
				break;
				
			case Structures.PaymentCardCategory.DeclinedTransactionIdentifierZeros:
				if (hashmap['CardProvider'] == null) {
					hashmap['CardProvider'] = (this.isProviderSanctioned({'SanctionedCards' : Cards.cx.PennyMapper.Declined.TransactionIdentifierZeros.VISA,
																		  'Cents' : hashmap['Cents']}) == true) ? Cards.cx.VISA : null;
				}
				if (hashmap['CardProvider'] == null) {
					hashmap['CardProvider'] = (this.isProviderSanctioned({'SanctionedCards' : Cards.cx.PennyMapper.Declined.TransactionIdentifierZeros.MASTERCARD,
																		  'Cents' : hashmap['Cents']}) == true) ? Cards.cx.MASTERCARD : null;
				}
				if (hashmap['CardProvider'] == null) {
					hashmap['CardProvider'] = (this.isProviderSanctioned({'SanctionedCards' : Cards.cx.PennyMapper.Declined.TransactionIdentifierZeros.AMEX,
																		  'Cents' : hashmap['Cents']}) == true) ? Cards.cx.AMEX : null;
				}
				if (hashmap['CardProvider'] == null) {
					hashmap['CardProvider'] = (this.isProviderSanctioned({'SanctionedCards' : Cards.cx.PennyMapper.Declined.TransactionIdentifierZeros.DISCOVER,
																		  'Cents' : hashmap['Cents']}) == true) ? Cards.cx.DISCOVER : null;
				}
				break;
				
			case Structures.PaymentCardCategory.DeclinedUSD99_99:
				if (hashmap['CardProvider'] == null) {
					hashmap['CardProvider'] = (this.isProviderSanctioned({'SanctionedCards' : Cards.cx.PennyMapper.Declined.USD99_99.VISA,
																		  'Cents' : hashmap['Cents']}) == true) ? Cards.cx.VISA : null;
				}
				if (hashmap['CardProvider'] == null) {
					hashmap['CardProvider'] = (this.isProviderSanctioned({'SanctionedCards' : Cards.cx.PennyMapper.Declined.USD99_99.MASTERCARD,
																		  'Cents' : hashmap['Cents']}) == true) ? Cards.cx.MASTERCARD : null;
				}
				if (hashmap['CardProvider'] == null) {
					hashmap['CardProvider'] = (this.isProviderSanctioned({'SanctionedCards' : Cards.cx.PennyMapper.Declined.USD99_99.AMEX,
																		  'Cents' : hashmap['Cents']}) == true) ? Cards.cx.AMEX : null;
				}
				if (hashmap['CardProvider'] == null) {
					hashmap['CardProvider'] = (this.isProviderSanctioned({'SanctionedCards' : Cards.cx.PennyMapper.Declined.USD99_99.DISCOVER,
																		  'Cents' : hashmap['Cents']}) == true) ? Cards.cx.DISCOVER : null;
				}
				break;
				
			case Structures.PaymentCardCategory.DeclinedApprovalReverse:
				if (hashmap['CardProvider'] == null) {
					hashmap['CardProvider'] = (this.isProviderSanctioned({'SanctionedCards' : Cards.cx.PennyMapper.Declined.ApprovalReverse.VISA,
																		  'Cents' : hashmap['Cents']}) == true) ? Cards.cx.VISA : null;
				}
				if (hashmap['CardProvider'] == null) {
					hashmap['CardProvider'] = (this.isProviderSanctioned({'SanctionedCards' : Cards.cx.PennyMapper.Declined.ApprovalReverse.MASTERCARD,
																		  'Cents' : hashmap['Cents']}) == true) ? Cards.cx.MASTERCARD : null;
				}
				if (hashmap['CardProvider'] == null) {
					hashmap['CardProvider'] = (this.isProviderSanctioned({'SanctionedCards' : Cards.cx.PennyMapper.Declined.ApprovalReverse.AMEX,
																		  'Cents' : hashmap['Cents']}) == true) ? Cards.cx.AMEX : null;
				}
				if (hashmap['CardProvider'] == null) {
					hashmap['CardProvider'] = (this.isProviderSanctioned({'SanctionedCards' : Cards.cx.PennyMapper.Declined.ApprovalReverse.DISCOVER,
																		  'Cents' : hashmap['Cents']}) == true) ? Cards.cx.DISCOVER : null;
				}
				break;
				
			case Structures.PaymentCardCategory.DeclinedExpiredCard:
				if (hashmap['CardProvider'] == null) {
					hashmap['CardProvider'] = (this.isProviderSanctioned({'SanctionedCards' : Cards.cx.PennyMapper.Declined.ExpiredCard.VISA,
																		  'Cents' : hashmap['Cents']}) == true) ? Cards.cx.VISA : null;
				}
				if (hashmap['CardProvider'] == null) {
					hashmap['CardProvider'] = (this.isProviderSanctioned({'SanctionedCards' : Cards.cx.PennyMapper.Declined.ExpiredCard.MASTERCARD,
																		  'Cents' : hashmap['Cents']}) == true) ? Cards.cx.MASTERCARD : null;
				}
				if (hashmap['CardProvider'] == null) {
					hashmap['CardProvider'] = (this.isProviderSanctioned({'SanctionedCards' : Cards.cx.PennyMapper.Declined.ExpiredCard.AMEX,
																		  'Cents' : hashmap['Cents']}) == true) ? Cards.cx.AMEX : null;
				}
				if (hashmap['CardProvider'] == null) {
					hashmap['CardProvider'] = (this.isProviderSanctioned({'SanctionedCards' : Cards.cx.PennyMapper.Declined.ExpiredCard.DISCOVER,
																		  'Cents' : hashmap['Cents']}) == true) ? Cards.cx.DISCOVER : null;
				}
				break;
				
			case Structures.PaymentCardCategory.DeclinedExceedsAmountLimit:
				if (hashmap['CardProvider'] == null) {
					hashmap['CardProvider'] = (this.isProviderSanctioned({'SanctionedCards' : Cards.cx.PennyMapper.Declined.ExceedsAmountLimit.VISA,
																		  'Cents' : hashmap['Cents']}) == true) ? Cards.cx.VISA : null;
				}
				if (hashmap['CardProvider'] == null) {
					hashmap['CardProvider'] = (this.isProviderSanctioned({'SanctionedCards' : Cards.cx.PennyMapper.Declined.ExceedsAmountLimit.MASTERCARD,
																		  'Cents' : hashmap['Cents']}) == true) ? Cards.cx.MASTERCARD : null;
				}
				if (hashmap['CardProvider'] == null) {
					hashmap['CardProvider'] = (this.isProviderSanctioned({'SanctionedCards' : Cards.cx.PennyMapper.Declined.ExceedsAmountLimit.AMEX,
																		  'Cents' : hashmap['Cents']}) == true) ? Cards.cx.AMEX : null;
				}
				if (hashmap['CardProvider'] == null) {
					hashmap['CardProvider'] = (this.isProviderSanctioned({'SanctionedCards' : Cards.cx.PennyMapper.Declined.ExceedsAmountLimit.DISCOVER,
																		  'Cents' : hashmap['Cents']}) == true) ? Cards.cx.DISCOVER : null;
				}
				break;
				
			case Structures.PaymentCardCategory.CallReference:
				if (hashmap['CardProvider'] == null) {
					hashmap['CardProvider'] = (this.isProviderSanctioned({'SanctionedCards' : Cards.cx.PennyMapper.Call.Reference.VISA,
																		  'Cents' : hashmap['Cents']}) == true) ? Cards.cx.VISA : null;
				}
				if (hashmap['CardProvider'] == null) {
					hashmap['CardProvider'] = (this.isProviderSanctioned({'SanctionedCards' : Cards.cx.PennyMapper.Call.Reference.MASTERCARD,
																		  'Cents' : hashmap['Cents']}) == true) ? Cards.cx.MASTERCARD : null;
				}
				if (hashmap['CardProvider'] == null) {
					hashmap['CardProvider'] = (this.isProviderSanctioned({'SanctionedCards' : Cards.cx.PennyMapper.Call.Reference.AMEX,
																		  'Cents' : hashmap['Cents']}) == true) ? Cards.cx.AMEX : null;
				}
				if (hashmap['CardProvider'] == null) {
					hashmap['CardProvider'] = (this.isProviderSanctioned({'SanctionedCards' : Cards.cx.PennyMapper.Call.Reference.DISCOVER,
																		  'Cents' : hashmap['Cents']}) == true) ? Cards.cx.DISCOVER : null;
				}
				break;
				
			case Structures.PaymentCardCategory.CallReferenceTest:
				if (hashmap['CardProvider'] == null) {
					hashmap['CardProvider'] = (this.isProviderSanctioned({'SanctionedCards' : Cards.cx.PennyMapper.Call.ReferenceTest.VISA,
																		  'Cents' : hashmap['Cents']}) == true) ? Cards.cx.VISA : null;
				}
				if (hashmap['CardProvider'] == null) {
					hashmap['CardProvider'] = (this.isProviderSanctioned({'SanctionedCards' : Cards.cx.PennyMapper.Call.ReferenceTest.MASTERCARD,
																		  'Cents' : hashmap['Cents']}) == true) ? Cards.cx.MASTERCARD : null;
				}
				if (hashmap['CardProvider'] == null) {
					hashmap['CardProvider'] = (this.isProviderSanctioned({'SanctionedCards' : Cards.cx.PennyMapper.Call.ReferenceTest.AMEX,
																		  'Cents' : hashmap['Cents']}) == true) ? Cards.cx.AMEX : null;
				}
				if (hashmap['CardProvider'] == null) {
					hashmap['CardProvider'] = (this.isProviderSanctioned({'SanctionedCards' : Cards.cx.PennyMapper.Call.ReferenceTest.DISCOVER,
																		  'Cents' : hashmap['Cents']}) == true) ? Cards.cx.DISCOVER : null;
				}
				break;
				
			case Structures.PaymentCardCategory.ErrorsAmount:
				if (hashmap['CardProvider'] == null) {
					hashmap['CardProvider'] = (this.isProviderSanctioned({'SanctionedCards' : Cards.cx.PennyMapper.Errors.AmountError.VISA,
																		  'Cents' : hashmap['Cents']}) == true) ? Cards.cx.VISA : null;
				}
				if (hashmap['CardProvider'] == null) {
					hashmap['CardProvider'] = (this.isProviderSanctioned({'SanctionedCards' : Cards.cx.PennyMapper.Errors.AmountError.MASTERCARD,
																		  'Cents' : hashmap['Cents']}) == true) ? Cards.cx.MASTERCARD : null;
				}
				if (hashmap['CardProvider'] == null) {
					hashmap['CardProvider'] = (this.isProviderSanctioned({'SanctionedCards' : Cards.cx.PennyMapper.Errors.AmountError.AMEX,
																		  'Cents' : hashmap['Cents']}) == true) ? Cards.cx.AMEX : null;
				}
				if (hashmap['CardProvider'] == null) {
					hashmap['CardProvider'] = (this.isProviderSanctioned({'SanctionedCards' : Cards.cx.PennyMapper.Errors.AmountError.DISCOVER,
																		  'Cents' : hashmap['Cents']}) == true) ? Cards.cx.DISCOVER : null;
				}
				break;
				
			case Structures.PaymentCardCategory.ErrorsDLErrorRetry:
				if (hashmap['CardProvider'] == null) {
					hashmap['CardProvider'] = (this.isProviderSanctioned({'SanctionedCards' : Cards.cx.PennyMapper.Errors.DLErrorRetry.VISA,
																		  'Cents' : hashmap['Cents']}) == true) ? Cards.cx.VISA : null;
				}
				if (hashmap['CardProvider'] == null) {
					hashmap['CardProvider'] = (this.isProviderSanctioned({'SanctionedCards' : Cards.cx.PennyMapper.Errors.DLErrorRetry.MASTERCARD,
																		  'Cents' : hashmap['Cents']}) == true) ? Cards.cx.MASTERCARD : null;
				}
				if (hashmap['CardProvider'] == null) {
					hashmap['CardProvider'] = (this.isProviderSanctioned({'SanctionedCards' : Cards.cx.PennyMapper.Errors.DLErrorRetry.AMEX,
																		  'Cents' : hashmap['Cents']}) == true) ? Cards.cx.AMEX : null;
				}
				if (hashmap['CardProvider'] == null) {
					hashmap['CardProvider'] = (this.isProviderSanctioned({'SanctionedCards' : Cards.cx.PennyMapper.Errors.DLErrorRetry.DISCOVER,
																		  'Cents' : hashmap['Cents']}) == true) ? Cards.cx.DISCOVER : null;
				}
				break;
				
			case Structures.PaymentCardCategory.InvalidCard:
				if (hashmap['CardProvider'] == null) {
					hashmap['CardProvider'] = (this.isProviderSanctioned({'SanctionedCards' : Cards.cx.PennyMapper.Invalid.Card.VISA,
																		  'Cents' : hashmap['Cents']}) == true) ? Cards.cx.VISA : null;
				}
				if (hashmap['CardProvider'] == null) {
					hashmap['CardProvider'] = (this.isProviderSanctioned({'SanctionedCards' : Cards.cx.PennyMapper.Invalid.Card.MASTERCARD,
																		  'Cents' : hashmap['Cents']}) == true) ? Cards.cx.MASTERCARD : null;
				}
				if (hashmap['CardProvider'] == null) {
					hashmap['CardProvider'] = (this.isProviderSanctioned({'SanctionedCards' : Cards.cx.PennyMapper.Invalid.Card.AMEX,
																		  'Cents' : hashmap['Cents']}) == true) ? Cards.cx.AMEX : null;
				}
				if (hashmap['CardProvider'] == null) {
					hashmap['CardProvider'] = (this.isProviderSanctioned({'SanctionedCards' : Cards.cx.PennyMapper.Invalid.Card.DISCOVER,
																		  'Cents' : hashmap['Cents']}) == true) ? Cards.cx.DISCOVER : null;
				}
				break;
				
			case Structures.PaymentCardCategory.InvalidRecordNotFound:
				if (hashmap['CardProvider'] == null) {
					hashmap['CardProvider'] = (this.isProviderSanctioned({'SanctionedCards' : Cards.cx.PennyMapper.Invalid.RecordNotFound.VISA,
																		  'Cents' : hashmap['Cents']}) == true) ? Cards.cx.VISA : null;
				}
				if (hashmap['CardProvider'] == null) {
					hashmap['CardProvider'] = (this.isProviderSanctioned({'SanctionedCards' : Cards.cx.PennyMapper.Invalid.RecordNotFound.MASTERCARD,
																		  'Cents' : hashmap['Cents']}) == true) ? Cards.cx.MASTERCARD : null;
				}
				if (hashmap['CardProvider'] == null) {
					hashmap['CardProvider'] = (this.isProviderSanctioned({'SanctionedCards' : Cards.cx.PennyMapper.Invalid.RecordNotFound.AMEX,
																		  'Cents' : hashmap['Cents']}) == true) ? Cards.cx.AMEX : null;
				}
				if (hashmap['CardProvider'] == null) {
					hashmap['CardProvider'] = (this.isProviderSanctioned({'SanctionedCards' : Cards.cx.PennyMapper.Invalid.RecordNotFound.DISCOVER,
																		  'Cents' : hashmap['Cents']}) == true) ? Cards.cx.DISCOVER : null;
				}
				break;
				
			case Structures.PaymentCardCategory.InvalidTermIdentifier1:
				if (hashmap['CardProvider'] == null) {
					hashmap['CardProvider'] = (this.isProviderSanctioned({'SanctionedCards' : Cards.cx.PennyMapper.Invalid.InvalidTermIdentifier1.VISA,
																		  'Cents' : hashmap['Cents']}) == true) ? Cards.cx.VISA : null;
				}
				if (hashmap['CardProvider'] == null) {
					hashmap['CardProvider'] = (this.isProviderSanctioned({'SanctionedCards' : Cards.cx.PennyMapper.Invalid.InvalidTermIdentifier1.MASTERCARD,
																		  'Cents' : hashmap['Cents']}) == true) ? Cards.cx.MASTERCARD : null;
				}
				if (hashmap['CardProvider'] == null) {
					hashmap['CardProvider'] = (this.isProviderSanctioned({'SanctionedCards' : Cards.cx.PennyMapper.Invalid.InvalidTermIdentifier1.AMEX,
																		  'Cents' : hashmap['Cents']}) == true) ? Cards.cx.AMEX : null;
				}
				if (hashmap['CardProvider'] == null) {
					hashmap['CardProvider'] = (this.isProviderSanctioned({'SanctionedCards' : Cards.cx.PennyMapper.Invalid.InvalidTermIdentifier1.DISCOVER,
																		  'Cents' : hashmap['Cents']}) == true) ? Cards.cx.DISCOVER : null;
				}
				break;
				
			case Structures.PaymentCardCategory.Retry5270:
				if (hashmap['CardProvider'] == null) {
					hashmap['CardProvider'] = (this.isProviderSanctioned({'SanctionedCards' : Cards.cx.PennyMapper.Retry.PleaseRetry5270.VISA,
																		  'Cents' : hashmap['Cents']}) == true) ? Cards.cx.VISA : null;
				}
				if (hashmap['CardProvider'] == null) {
					hashmap['CardProvider'] = (this.isProviderSanctioned({'SanctionedCards' : Cards.cx.PennyMapper.Retry.PleaseRetry5270.MASTERCARD,
																		  'Cents' : hashmap['Cents']}) == true) ? Cards.cx.MASTERCARD : null;
				}
				if (hashmap['CardProvider'] == null) {
					hashmap['CardProvider'] = (this.isProviderSanctioned({'SanctionedCards' : Cards.cx.PennyMapper.Retry.PleaseRetry5270.AMEX,
																		  'Cents' : hashmap['Cents']}) == true) ? Cards.cx.AMEX : null;
				}
				if (hashmap['CardProvider'] == null) {
					hashmap['CardProvider'] = (this.isProviderSanctioned({'SanctionedCards' : Cards.cx.PennyMapper.Retry.PleaseRetry5270.DISCOVER,
																		  'Cents' : hashmap['Cents']}) == true) ? Cards.cx.DISCOVER : null;
				}
				break;
				
			case Structures.PaymentCardCategory.Retry5305:
				if (hashmap['CardProvider'] == null) {
					hashmap['CardProvider'] = (this.isProviderSanctioned({'SanctionedCards' : Cards.cx.PennyMapper.Retry.PleaseRetry5305.VISA,
																		  'Cents' : hashmap['Cents']}) == true) ? Cards.cx.VISA : null;
				}
				if (hashmap['CardProvider'] == null) {
					hashmap['CardProvider'] = (this.isProviderSanctioned({'SanctionedCards' : Cards.cx.PennyMapper.Retry.PleaseRetry5305.MASTERCARD,
																		  'Cents' : hashmap['Cents']}) == true) ? Cards.cx.MASTERCARD : null;
				}
				if (hashmap['CardProvider'] == null) {
					hashmap['CardProvider'] = (this.isProviderSanctioned({'SanctionedCards' : Cards.cx.PennyMapper.Retry.PleaseRetry5305.AMEX,
																		  'Cents' : hashmap['Cents']}) == true) ? Cards.cx.AMEX : null;
				}
				if (hashmap['CardProvider'] == null) {
					hashmap['CardProvider'] = (this.isProviderSanctioned({'SanctionedCards' : Cards.cx.PennyMapper.Retry.PleaseRetry5305.DISCOVER,
																		  'Cents' : hashmap['Cents']}) == true) ? Cards.cx.DISCOVER : null;
				}
				break;
				
			case Structures.PaymentCardCategory.IncorrectPin:
				if (hashmap['CardProvider'] == null) {
					hashmap['CardProvider'] = (this.isProviderSanctioned({'SanctionedCards' : Cards.cx.PennyMapper.Incorrect.Pin.VISA,
																		  'Cents' : hashmap['Cents']}) == true) ? Cards.cx.VISA : null;
				}
				if (hashmap['CardProvider'] == null) {
					hashmap['CardProvider'] = (this.isProviderSanctioned({'SanctionedCards' : Cards.cx.PennyMapper.Incorrect.Pin.MASTERCARD,
																		  'Cents' : hashmap['Cents']}) == true) ? Cards.cx.MASTERCARD : null;
				}
				if (hashmap['CardProvider'] == null) {
					hashmap['CardProvider'] = (this.isProviderSanctioned({'SanctionedCards' : Cards.cx.PennyMapper.Incorrect.Pin.AMEX,
																		  'Cents' : hashmap['Cents']}) == true) ? Cards.cx.AMEX : null;
				}
				if (hashmap['CardProvider'] == null) {
					hashmap['CardProvider'] = (this.isProviderSanctioned({'SanctionedCards' : Cards.cx.PennyMapper.Incorrect.Pin.DISCOVER,
																		  'Cents' : hashmap['Cents']}) == true) ? Cards.cx.DISCOVER : null;
				}
				break;
				
			case Structures.PaymentCardCategory.IncorrectCard:
				if (hashmap['CardProvider'] == null) {
					hashmap['CardProvider'] = (this.isProviderSanctioned({'SanctionedCards' : Cards.cx.PennyMapper.Incorrect.InvalidCard.VISA,
																		  'Cents' : hashmap['Cents']}) == true) ? Cards.cx.VISA : null;
				}
				if (hashmap['CardProvider'] == null) {
					hashmap['CardProvider'] = (this.isProviderSanctioned({'SanctionedCards' : Cards.cx.PennyMapper.Incorrect.InvalidCard.MASTERCARD,
																		  'Cents' : hashmap['Cents']}) == true) ? Cards.cx.MASTERCARD : null;
				}
				if (hashmap['CardProvider'] == null) {
					hashmap['CardProvider'] = (this.isProviderSanctioned({'SanctionedCards' : Cards.cx.PennyMapper.Incorrect.InvalidCard.AMEX,
																		  'Cents' : hashmap['Cents']}) == true) ? Cards.cx.AMEX : null;
				}
				if (hashmap['CardProvider'] == null) {
					hashmap['CardProvider'] = (this.isProviderSanctioned({'SanctionedCards' : Cards.cx.PennyMapper.Incorrect.InvalidCard.DISCOVER,
																		  'Cents' : hashmap['Cents']}) == true) ? Cards.cx.DISCOVER : null;
				}
				break;
				
			case Structures.PaymentCardCategory.IncorrectServiceNotAllowed:
				if (hashmap['CardProvider'] == null) {
					hashmap['CardProvider'] = (this.isProviderSanctioned({'SanctionedCards' : Cards.cx.PennyMapper.Incorrect.ServiceNotAllowed.VISA,
																		  'Cents' : hashmap['Cents']}) == true) ? Cards.cx.VISA : null;
				}
				if (hashmap['CardProvider'] == null) {
					hashmap['CardProvider'] = (this.isProviderSanctioned({'SanctionedCards' : Cards.cx.PennyMapper.Incorrect.ServiceNotAllowed.MASTERCARD,
																		  'Cents' : hashmap['Cents']}) == true) ? Cards.cx.MASTERCARD : null;
				}
				if (hashmap['CardProvider'] == null) {
					hashmap['CardProvider'] = (this.isProviderSanctioned({'SanctionedCards' : Cards.cx.PennyMapper.Incorrect.ServiceNotAllowed.AMEX,
																		  'Cents' : hashmap['Cents']}) == true) ? Cards.cx.AMEX : null;
				}
				if (hashmap['CardProvider'] == null) {
					hashmap['CardProvider'] = (this.isProviderSanctioned({'SanctionedCards' : Cards.cx.PennyMapper.Incorrect.ServiceNotAllowed.DISCOVER,
																		  'Cents' : hashmap['Cents']}) == true) ? Cards.cx.DISCOVER : null;
				}
				break;
				
			default:
				break;
		}
		
		switch (parameters.CardLocale) {
			case Structures.PaymentCardLocale.USA:
				if (hashmap['CardProvider'] != null) {
					hashmap['Number'] = hashmap['CardProvider'][parameters.CardSelectionIndex].USA[parameters.CardLocaleIndex];
				}
				break;
				
			case Structures.PaymentCardLocale.CANADA:
				if (hashmap['CardProvider'] != null) {
					hashmap['Number'] = hashmap['CardProvider'][parameters.CardSelectionIndex].CANADA[parameters.CardLocaleIndex];
				}
				break;
				
			case Structures.PaymentCardLocale.USAPurchasing:
				if (hashmap['CardProvider'] != null) {
					hashmap['Number'] = hashmap['CardProvider'][parameters.CardSelectionIndex].USAPurchasing[parameters.CardLocaleIndex];
				}
				break;
								
			default:
				break;
			
		}
		
		if (hashmap['CardProvider'] != null) {
			var mm_yy = hashmap['CardProvider'].ExpirationDate.toString().split("/");
			hashmap['ExpirationMonth'] = mm_yy[0];
			hashmap['ExpirationYear'] = mm_yy[1];
		}
		
		console.log('selectPaymentCreditCard(NUMBER) : ' + hashmap['Number']);
		console.log('selectPaymentCreditCard(MONTH) : ' + hashmap['ExpirationMonth']);
		console.log('selectPaymentCreditCard(YEAR) : ' + hashmap['ExpirationYear']);
		console.log('selectPaymentCreditCard(CATEGORY) : ' + hashmap['CardCategory']);
		console.log('selectPaymentCreditCard(LOCALE) : ' + hashmap['CardLocale']);
		console.log('selectPaymentCreditCard(SELECT-INDEX) : ' + hashmap['CardSelectionIndex']);
		console.log('selectPaymentCreditCard(LOCALE-INDEX) : ' + hashmap['CardLocaleIndex']);
		console.log('selectPaymentCreditCard(PREMIUM) : ' + hashmap['Premium']);
		console.log('selectPaymentCreditCard(CENTS) : ' + hashmap['Cents']);
		console.log('selectPaymentCreditCard(PROVIDER) : ' + hashmap['CardProvider']);
		
		return hashmap;
	},
	
	//--- Valid parameter names - SanctionedCards, Cents
	isProviderSanctioned : function(parameters) {
		var isSanctioned = false;
		if (parameters.Providers) {
			for (var index = 0; parameters.SanctionedCards.length; index++) {
				if (parameters.Cents == parseInt(parameters.ProviderCards[index])) {
					isSanctioned = true;
				}
			}
		}
		return isSanctioned;
	}
	
};
 
module.exports = cxFRMWRKSanctionedCC;
