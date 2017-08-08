/*
 * CXINIT-1406 Payment CTA Back Next
 * This Script Validates the functionality of Next and Back Buttons in Payment page 
 */
var TestData = require("../../testData/dhmo/dhmo.1406PayCTA.json");
var perInfo = new(require('../../pageObjects/cxinit/perInfo-page.js'));
var depInfo = new(require('../../pageObjects/cxinit/dependent-page.js'));
var facilities = new(require('../../pageObjects/cxinit/facilities-page.js'));
var payment = new(require('../../pageObjects/cxinit/payment-page.js'));
var receipt = new(require('../../pageObjects/cxinit/receipt-page.js'));

var enrollPage = new(require('../../pageObjects/cxinit/enroll-page.js'));


describe('CXINIT-1406- Payment CTA Back Next: ', function() {
    // Pre-condition: User navigated to Payment page
    beforeEach(function() {
        Utility.openApplication('','DELTA');
        enrollPage.enterHomePageDetails(TestData.enrollData);
        expect(perInfo.fieldFirstName.isPresentAndDisplayed()).toBeTruthy();
        perInfo.fillPersonalInfo(TestData);
        perInfo.fillAddress(TestData);
        perInfo.phoneNumberemail(TestData);
        perInfo.fillBroker(TestData);
        expect(browser.getTitle()).toEqual(TestData.dependentPageTitle);
        depInfo.next.click();   
        facilities.selectFacility(TestData.facilityoption1);
        facilities.next.click();
        expect(browser.getTitle()).toEqual(TestData.paymentPageTitle);

    });
    // Verify the functionality of Next button 
    it('Step-1: Validate and Verify the Errors of both the Client and Server in the Payment Page', function() {
        payment.billingAddress.click();
        payment.billingChkBox.unCheck();
        payment.purchaseNow.click();
        expect(payment.getCCValidationMessages()).toEqual(TestData.paymentErrors)
        expect(payment.getBillingAddressValidationMessages()).toEqual(TestData.paymentAddressErrors);
        expect(payment.getCCServerValidationMessages()).toEqual(TestData.paymentErrors);
        expect(payment.getBillingAddressServerValidationMessages()).toEqual(TestData.paymentAddressErrors);
    });
    it('Step-2:Should be navigate to receipt page', function() {
        payment.billingChkBox.check();
        payment.fillpayment(TestData);
        payment.purchaseNow.click();
        expect(browser.getTitle()).toEqual(TestData.receiptPageTitle);
    });
    it('Step-3:Should be navigate to receipt page', function() {
        payment.fillpayment(TestData, true);
        payment.purchaseNow.click();
        expect(payment.errAuth.getText()).toEqual(TestData.errorMsgAuth);
        expect(payment.serErrAuth.getText()).toEqual(TestData.errorMsgAuth);
        payment.authChkBox.check();
        payment.purchaseNow.click();
        expect(browser.getTitle()).toEqual(TestData.receiptPageTitle);

    });
    it('Step-4:Should be navigate to receipt page  ', function() {
        payment.fillpayment(TestData);
        payment.cardNumber.setText(TestData.invalidCardNumber);
        payment.purchaseNow.click();
        expect(payment.errCardNumber.getText()).toEqual(TestData.errorMsgCard);
        expect(payment.serErrCardNumber.getText()).toEqual(TestData.errorMsgCard);
        payment.cardNumber.setText(TestData.cardNumber);
        payment.authChkBox.check();
        payment.purchaseNow.click();
        expect(browser.getTitle()).toEqual(TestData.receiptPageTitle);
    });
    it('Step-5:Should be navigate to facilities page', function() {
        payment.back.click();
        expect(browser.getTitle()).toEqual(TestData.facilitiesPageTitle);
    });
    it('Step-6:Should be navigate to receipt page', function() {
        payment.fillpayment(TestData);
        payment.purchaseNow.click();
        expect(browser.getTitle()).toEqual(TestData.receiptPageTitle);
    });

});
