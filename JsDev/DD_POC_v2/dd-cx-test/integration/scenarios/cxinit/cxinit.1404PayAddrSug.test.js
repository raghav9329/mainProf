//CXINIT-1404 : Billing Address Suggestion
// This Spec is used to verify and Validate the Address in the Payment Page

var TestData = require("../../testData/cxinit/cxinit.1404PayAddrSug.json");
var perInfo = new(require('../../pageObjects/cxinit/perInfo-page.js'));
var depInfo = new(require('../../pageObjects/cxinit/dependent-page.js'));
var facilities = new(require('../../pageObjects/cxinit/facilities-page.js'));
var payment = new(require('../../pageObjects/cxinit/payment-page.js'));
var receipt = new(require('../../pageObjects/cxinit/receipt-page.js'));
var enrollPage = new(require('../../businessComponents/homePage.js'));


describe('CXINIT-1404- Payment Page: Billing Address Suggestion', function() {
    // Pre-condition: User navigated to Dependents page
    beforeEach(function() {
        Utility.openApplication('');
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

    it('Step-1: Validate the Billing Address in the Payment page', function() {
        
        payment.billingChkBox.unCheck();
        payment.streetAddress.setText(TestData.billaddr1);
        payment.selectHomeAddress(TestData.billingAddress);
         browser.sleep('10000');
        payment.streetAddress.setText(TestData.Appartment, true );
        // payment.streetAddress.setText(TestData.billingAddress);
        // payment.city.setText(TestData.billingCity);
        // payment.state.setText(TestData.State);
        // expect(payment.state.getValue()).toEqual('CA');
        // perInfo.fillAddress(TestData.billingAddress);
        // payment.purchaseNow.click();
        // browser.sleep('10000');
        payment.authChkBox.check();
        payment.purchaseNow.click();
        expect(browser.getTitle()).toEqual(TestData.receiptTitle);


    });
});
