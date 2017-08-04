//CXINIT-1407 : CVV Security Code
// This Spec is used to verify and Validate the CVV Security Code in the Payment Page

var TestData = require("../../testData/dhmo/dhmo.1407PayCvv.json");
var perInfo = new(require('../../pageObjects/cxinit/perInfo-page.js'));
var depInfo = new(require('../../pageObjects/cxinit/dependent-page.js'));
var facilities = new(require('../../pageObjects/cxinit/facilities-page.js'));
var payment = new(require('../../pageObjects/cxinit/payment-page.js'));
var receipt = new(require('../../pageObjects/cxinit/receipt-page.js'));

var enrollPage = new(require('../../pageObjects/cxinit/enroll-page.js'));


describe('CXINIT-1407- Payment Page: CVV Security Code', function() {
// Pre-condition: User navigated to Payments Page
beforeEach(function() {
    Utility.openApplication('','DELTA');
    enrollPage.enterHomePageDetails(TestData.enrollData);
    expect(perInfo.fieldFirstName.isPresentAndDisplayed()).toBeTruthy();
    perInfo.fillPersonalInfo(TestData);
    perInfo.fillAddress(TestData);
    perInfo.phoneNumberemail(TestData);
    perInfo.fillBroker(TestData);
    expect(browser.getTitle()).toEqual(TestData.dependentPageTitle);
    depInfo.fillDependent('Dependent1', TestData.spouse, false);
    depInfo.next.click();
    expect(depInfo.premiumChangePopUp.isPresentAndDisplayed()).toBeTruthy();
    depInfo.continue.click();
    facilities.selectFacility(TestData.facilityoption1);
    facilities.next.click();
    facilities.selectFacility(TestData.facilityoption2);
    facilities.next.click();
    expect(browser.getTitle()).toEqual(TestData.paymentPageTitle);

});

//Validate Server side error and Re-enter tne valid Cvv and Verify

it('Validate CVV for AmexCard', function() {

    payment.nameOnCard.setText(TestData.cardAmexCvv.cardholderName);
    payment.cardNumber.setText(TestData.cardAmexCvv.cardNo);
    payment.expMonth.setText(TestData.cardAmexCvv.expMonth);
    payment.expYear.setText(TestData.cardAmexCvv.expiryYear);
    payment.securityCode.setText(TestData.cardAmexCvv.cvv);
    payment.authChkBox.check();
    payment.purchaseNow.click();
    expect(payment.serErrCvv.getText()).toEqual(TestData.cardAmexCvv.errMsg);

    //Verifying the American Express Card with valid CVV
    payment.securityCode.setText(TestData.cardAmexCvv.validcvv);
    payment.authChkBox.check();
    payment.purchaseNow.click();
    expect(browser.getTitle()).toEqual(TestData.receiptPageTitle);

});


//Validate Server side error and Re-enter the valid Cvv and Verify

it('Validate CVV for VISA Card', function() {

    payment.nameOnCard.setText(TestData.cardVisaCvv.cardholderName);
    payment.cardNumber.setText(TestData.cardVisaCvv.cardNo);
    payment.expMonth.setText(TestData.cardVisaCvv.expMonth);
    payment.expYear.setText(TestData.cardVisaCvv.expiryYear);
    payment.securityCode.setText(TestData.cardVisaCvv.cvv);
    payment.authChkBox.check();
    payment.purchaseNow.click();
    expect(payment.serErrCvv.getText()).toEqual(TestData.cardVisaCvv.errMsg);

    //Verifying the Visa Card with valid CVV
    payment.securityCode.setText(TestData.cardVisaCvv.validcvv);
    payment.authChkBox.check();
    payment.purchaseNow.click();
    expect(browser.getTitle()).toEqual(TestData.receiptPageTitle);

});

//Validate the client side Error of CVV and verify with the valid too

it('Validate CVV of the Card', function() {

    payment.nameOnCard.setText(TestData.verifyCvv.cardholderName);
    payment.cardNumber.setText(TestData.verifyCvv.cardNo);
    payment.expMonth.setText(TestData.verifyCvv.expMonth);
    payment.expYear.setText(TestData.verifyCvv.expiryYear);
    payment.securityCode.setText(TestData.verifyCvv.cvv);
    payment.authChkBox.check();
    payment.purchaseNow.click();
    expect(payment.serErrSecurityCode.getText()).toEqual(TestData.verifyCvv.errMsg);

    //Verifying the Card with valid CVV
    payment.securityCode.setText(TestData.verifyCvv.validcvv);
    payment.authChkBox.check();
    payment.purchaseNow.click();
    expect(browser.getTitle()).toEqual(TestData.receiptPageTitle);

});

});
