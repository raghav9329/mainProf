//AARP-1235 : Review my previous work and start a new E2E Page Object Model based Work Flow

//This Spec is used to Verify and Validate Ene to End Work Flow with the Errors and the Happy path

var perInfo = new(require('../../pageObjects/cxinit/perInfo-page.js'));
var depInfo = new(require('../../pageObjects/cxinit/dependent-page.js'));
var facilities = new(require('../../pageObjects/cxinit/facilities-page.js'));
var payment = new(require('../../pageObjects/cxinit/payment-page.js'));
var receipt = new(require('../../pageObjects/cxinit/receipt-page.js'));
var enrollPage = new(require('../../pageObjects/cxinit/enroll-page.js'));
var TestData = require('../../testData/aarphmo/aarphmo.1768_E2E_WrkFlo_1.json');

describe('AARP-1235 (AARP-1768): E2E_WorkFlow: ', function() {
    beforeAll(function() {
        Utility.openApplication('','AARP');

    });

    //Fill the Valid Data in the home page of Enrollment and Proceed

    it('E2E_Flow_1: Should complete the Enroll Page', function() {
        enrollPage.enterHomePageDetails(TestData.enrollData);
        expect(perInfo.fieldFirstName.isPresentAndDisplayed()).toBeTruthy();
    });

    //Enter the valid Test Data in the Personal Information page and Click n the Next

    it('E2E_Flow_2: Verify Personal Information Page is filled with Valid data and Proceed', function() {
         TestData.MemberId= Utility.randomNo('Number',10);
        perInfo.fillPersonalInfo(TestData);
        perInfo.fillAddress(TestData);
        perInfo.phoneNumberemail(TestData);
        perInfo.fillBroker(TestData);
        perInfo.referralSource.selectByText(TestData.referralSource)
        depInfo.next.click();
        expect(browser.getTitle()).toEqual(TestData.DependentTitle);

    });

    //Verify and Validate the both the Client and Server side Errors in the Dependent Page with the NUll Values supplied

    it('E2E_Flow_3: Verifying the Errors of both client and server side by passing NULL values', function() {
        depInfo.fieldAddDependents.click();
        depInfo.next.click();
        expect(depInfo.getValidationMessages('Dependent1')).toEqual(TestData.dependentErrors);
        Utility.scrollToTop();
        expect(depInfo.getServerValidationMessages()).toEqual(TestData.dependentErrors);
        depInfo.deleteDependent('Dependent1').click();
    });

    //validating the Dependents of same type(Domestic partner and spouse) 
    // Validating the error "You can select only 1 Spouse or Domestic Partner." and Premium change Pop-up
    // updates the Dependent one of the same relation type dependent to child

    it('E2E_Flow_3_1: Verifying and Validate the Dependents of same type(Domestic Partner and Spouse do not allowed) not allowed more than 1', function() {
        expect(depInfo.fieldAddDependents.isPresentAndDisplayed()).toBeTruthy();
        depInfo.fillDependent('Dependent1', TestData.domesticpartner1, false);
        depInfo.fillDependent('Dependent2', TestData.Spouse1, false);
        depInfo.next.click();
        expect(depInfo.premiumChangePopUp.isPresentAndDisplayed()).toBeTruthy();
        depInfo.continue.click();
        Utility.scrollToTop();
        expect(depInfo.depError.getText()).toEqual("You can select only 1 Spouse or Domestic Partner.");
        depInfo.relationship('Dependent2').selectByText(TestData.updateRelationship);

    });

    //Verifying and adding Dependents 6 and proceed to next page

    it('E2E_Flow_4: Verify 6 dependents were added and furnished with valid Test Data and the calculated Premium Pop up is displayed', function() {
        depInfo.fillDependent('Dependent3', TestData.child3, false);
        depInfo.fillDependent('Dependent4', TestData.child4, false);
        depInfo.fillDependent('Dependent5', TestData.child5, false);
        depInfo.fillDependent('Dependent6', TestData.child6, false);
        depInfo.next.click();    
         Utility.waitUntilElementNotPresent(element(by.css('img.loaderImg')));   
        expect(browser.getTitle()).toEqual(TestData.facilitiesTitle);
    });

    //Verify and Select the Facility for the Dependent

    it('E2E_Flow_5: Verify and select a Facility for the primary', function() {
        facilities.selectFacility(TestData.facilityoption1);
        facilities.next.click();
    });

    //Verify and Select the Facility for the Dependent

    it('E2E_Flow_5_1: Verify and select the facilities for dependents', function() {
        facilities.selectFacility(TestData.facilityoption2);
        facilities.next.click();
    });

    //Verify and Select the Facilities for the 4 other Dependents

    it('E2E_Flow_5_2: Verify and select the facilities for dependents', function() {
        facilities.selectFacility(TestData.facilityoption3);
        facilities.next.click();
        facilities.selectFacility(TestData.facilityoption4);
        facilities.next.click();
        facilities.selectFacility(TestData.facilityoption5);
        facilities.next.click();
        facilities.selectFacility(TestData.facilityoption6);
        facilities.next.click();
        facilities.selectFacility(TestData.facilityoption7);
        facilities.next.click();
        expect(browser.getTitle()).toEqual(TestData.paymentTitle);
    });

    //Validate and Verify the both the client and Server side error validations in the Payment Page

    it('E2E_Flow_6: Validate and Verify the Errors of both the Client and Server in the Payment Page', function() {
       payment.billingAddress.click();
        payment.billingChkBox.unCheck();
        payment.purchaseNow.click();
        expect(payment.getCCValidationMessages()).toEqual(TestData.paymentErrors)
        expect(payment.getBillingAddressValidationMessages()).toEqual(TestData.paymentAddressErrors);
        expect(payment.getCCServerValidationMessages()).toEqual(TestData.paymentErrors);
        expect(payment.getBillingAddressServerValidationMessages()).toEqual(TestData.paymentAddressErrors);
    });

    //Furnish all the fields of the Payment page with the valid Test Data and proceed

    it('E2E_Flow_7: Validate and Verify Payment Page Details with valid Test Data', function() {
        payment.billingChkBox.check();
        payment.fillpayment(TestData);
        payment.fillBankDetails(TestData);        
        payment.purchaseNow.click();
        expect(browser.getTitle()).toEqual(TestData.receiptTitle);
    });

    //Verify and Validate the Application Number and Plan Name in the Receipt Page

    it('E2E_Flow_8: Validating the receipt page', function() {
        //expect(receipt.applicationNumber.getText()).toEqual('-');
        expect(receipt.planPurchased.getText()).toContain(TestData.planName);
        //expect(receipt.getPlanSummaryByKey('Cleanings').getText()).toEqual('-');
    });

});
