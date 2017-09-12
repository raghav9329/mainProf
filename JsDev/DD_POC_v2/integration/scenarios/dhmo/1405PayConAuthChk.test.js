//CXINIT-1405 : Submit Btn w/Out Consent Auth ChkBox
// This Spec is used to verify and Validate the Authentication Error in the Payment Page

var TestData = require('../../testData/'+testDataEnv+'/dhmo/dhmo.1405PayConAuthChk.json');
var perInfo = new(require('../../pageObjects/cxinit/perInfo-page.js'));
var depInfo = new(require('../../pageObjects/cxinit/dependent-page.js'));
var facilities = new(require('../../pageObjects/cxinit/facilities-page.js'));
var payment = new(require('../../pageObjects/cxinit/payment-page.js'));
var receipt = new(require('../../pageObjects/cxinit/receipt-page.js'));

var enrollPage = new(require('../../pageObjects/cxinit/enroll-page.js'));


describe('DHMO:1405- Payment Page ', function() {
    // Pre-condition: User navigated to Payment Page
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
        payment.nameOnCard.setText(TestData.nameOnCard);
        payment.cardNumber.setText(TestData.cardNumber);
        payment.expMonth.setText(TestData.expMonth);
        payment.expYear.setText(TestData.expYear);
        payment.securityCode.setText(TestData.securityCode);

    });

    //Validate Error by clicking on the Purchase Button of the Product in the Payment

    it('Step-1: Validate the Error displayed with out Authentication in the Payment page', function() {
        
        
        payment.purchaseNow.click();
        Utility.scrollToTop();
        expect(payment.serErrAuth.getText()).toEqual('Please check to confirm you have read authorization statement');
        payment.authChkBox.check();
        payment.purchaseNow.click();
        expect(browser.getTitle()).toEqual(TestData.receiptPageTitle);


    });
});
