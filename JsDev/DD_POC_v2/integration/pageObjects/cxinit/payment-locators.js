"use strict";

class PaymentLocators {
    constructor() {
        this.nameOnCard = by.id('cardName');
        this.cardNumber = by.id('ccCapture');
        this.expMonth = by.id('expMo');
        this.expYear = by.id('expYr');
        this.securityCode = by.id('cvcCapture');
        this.billingAddress = by.id('billingPanel');
        this.billingChkBox = by.id('sameBilling');
        this.streetAddress = by.id('streetAddress');
        this.city = by.id('city');
        this.state = by.id('state');
        this.zipCode = by.id('zipCode');
        this.saveAddress = by.id('saveAddress');
        this.authChkBox = by.id('auth');
        this.eCopy = by.id('eCopy');
        this.mailedCopy = by.id('mailed_copy');
        this.openPlanSummary = by.className('accordion-title');
        this.openApplicant = by.id('applicantPanel');
        this.planSummaryValue = function(summaryKey) {
            return by.xpath('//td[text()="' + summaryKey + '"]/following-sibling::td');
        };
        this.summaryTotalPrice = by.id('plan_total');
        this.totalPremium = by.id('plan_price');
        this.totalEnrolementFee = by.id('plan_fee');
        this.purchaseNow = by.id('nextButton');
        this.Back = by.linkText('Back');
        this.errNameOnCard = by.id('cardName-error');
        this.errCardNumber = by.id('ccCapture-error');
        this.errExpMonth = by.id('expMo-error');
        this.errExoYear = by.id('expYr-error');
        this.errSecurityCode = by.id('cvcCapture-error');
        this.errStreetAddress = by.id('streetAddress-error');
        this.errCity = by.id('city-error');
        this.errState = by.id('state-error');
        this.errZipCode = by.id('zipCode-error');
        this.errAuth = by.id('auth-error');
        this.serErrCardName = by.css('div.error-container.global-margin a.error.cardName-error');
        this.serErrCardNumber = by.css('div.error-container.global-margin a.error.ccCapture-error');
        this.serErrExpMonth = by.css('div.error-container.global-margin a.error.expMo-error');
        this.serErrExpYear = by.css('div.error-container.global-margin a.error.expYr-error');
        this.serErrSecurityCode = by.css('div.error-container.global-margin a.error.cvcCapture-error');
        this.serErrAuth = by.css('div.error-container.global-margin a.error.auth-error');
        this.serErrStreetAddress = by.css('div.error-container.global-margin a.error.streetAddress-error');
        this.serErrCity = by.css('div.error-container.global-margin a.error.city-error');
        this.serErrState = by.css('div.error-container.global-margin a.error.state-error');
        this.serErrZipCode = by.css('div.error-container.global-margin a.error.zipCode-error');
        this.homeAddressfromGoogleApi = by.xpath('//div[@class="pac-item"]');
        this.serErrCvv = by.xpath('//div[@class="error-container global-margin"]');
        this.EFTBankTransfer = by.id('paymentMethodEFT');
        this.checking = by.id('accountTypeChecking');
        this.saving = by.id('accountTypeSaving');
        this.bankName = by.id('bankName');
        this.accountHolderName = by.id('accountHolderName');
        this.routingNumber = by.id('routingNumber');
        this.accountNumber = by.id('accountNumber');
        this.accountNumberRetype = by.id('accountNumberRetype');
        this.frequencySemiAnnual = by.id('frequencySEMIANNUAL');
        this.frequencyQuterly = by.id('frequencyQUARTERLY');
        this.frequencyAnnualy = by.id('frequencyANNUAL');

        this.bankNameError = by.id('bankName-error');
        this.accountHolderNameError = by.id('accountHolderName-error');
        this.routingNumberError = by.id('routingNumber-error');
        this.accountNumberError = by.id('accountNumber-error');
        this.discloser= by.css('div.eCopyLayout a');
    }

}

module.exports = PaymentLocators;
