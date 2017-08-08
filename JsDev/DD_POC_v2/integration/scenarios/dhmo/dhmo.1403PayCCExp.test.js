var TestData = require("../../testData/dhmo/dhmo.1403PayCCExp.json");
var perInfo = new(require('../../pageObjects/cxinit/perInfo-page.js'));
var depInfo = new(require('../../pageObjects/cxinit/dependent-page.js'));
var facilities = new(require('../../pageObjects/cxinit/facilities-page.js'));
var payment = new(require('../../pageObjects/cxinit/payment-page.js'));
var receipt = new(require('../../pageObjects/cxinit/receipt-page.js'));

var enrollPage = new(require('../../pageObjects/cxinit/enroll-page.js'));


describe('CXINIT-1403: Payment Page ', function() {

    // Pre-condition: User navigated to Payment Page 
    beforeAll(function() {
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
        payment.securityCode.setText(TestData.securityCode);

    });

    it('Step-1:Error message should be displayed for year field ', function() {
        payment.expMonth.setText(TestData.expMonth);
        payment.expYear.setText(TestData.expYear_invalid1);
        payment.authChkBox.check();
        payment.purchaseNow.click();
        expect(payment.serErrExpYear.getText()).toEqual(TestData.yearErrorMsg);
        expect(payment.errExpYear.getText()).toEqual(TestData.yearErrorMsg);
        Utility.scrollToTop();
        payment.serErrExpYear.click();

    });

    it('Step-2:Client side error message should be displayed for month filed', function() {
        payment.expMonth.setText(TestData.invalidExpMonth + '\t');
        expect(payment.errExpMonth.getText()).toEqual(TestData.monthErrorMsg);
    });
    it('Step-3:invalid year format error message should be displayed for month filed', function() {
        payment.expMonth.setText(TestData.invalidMonthFormat + '\t');
        expect(payment.errExpMonth.getText()).toEqual(TestData.invalidMonthFormatErrMsg);
    });

    it('Step-4:Client side error message should be displayed for year filed', function() {
        payment.expYear.setText(TestData.expYear_invalid1 + '\t');
        expect(payment.errExpYear.getText()).toEqual(TestData.yearErrorMsg);
    });
    it('Step-5:invalid year format error message should be displayed for year filed', function() {
        payment.expYear.setText(TestData.invalidYearFormat + '\t');
        expect(payment.errExpYear.getText()).toEqual(TestData.invalidYearFormatErrMsg);
    });

    it('Step-6:Receipt page should be displayed', function() {
        payment.expMonth.setText(TestData.expMonth);
        payment.expYear.setText(TestData.expYear_valid);
        payment.authChkBox.check();
        payment.purchaseNow.click();
        expect(browser.getTitle()).toEqual(TestData.receiptPageTitle);
        
    });
});
