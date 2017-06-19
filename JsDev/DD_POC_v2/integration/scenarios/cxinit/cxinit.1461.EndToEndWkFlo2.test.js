//CXINIT-1461 : E2E Work Flow 2 with the 2 dependents and different facilities

//This Spec is used to Validate End to End Work Flow with the 2 Dependents and different facilities

var perInfo =		new(require('../../pageObjects/cxinit/perInfo-page.js'));
var depInfo =		new(require('../../pageObjects/cxinit/dependent-page.js'));
var facilities =	new(require('../../pageObjects/cxinit/facilities-page.js'));
var payment =		new(require('../../pageObjects/cxinit/payment-page.js'));
var receipt =		new(require('../../pageObjects/cxinit/receipt-page.js'));
var enrollPage =	new(require('../../businessComponents/homePage.js'));
var TestData =			require('../../testData/cxinit/cxinit.1461EndToEndWkFlo2.json');

describe('CXINIT-1461:', function() {
    beforeAll(function() {
        Utility.openApplication('');

    });

    //Fill the Valid Data in the home page of Enrollment and Proceed

    it('E2E_1 : Should complete the Enroll Page', function() {
        enrollPage.enterHomePageDetails(TestData.enrollData);
        expect(perInfo.fieldFirstName.isPresentAndDisplayed()).toBeTruthy();
    });

    //Enter the valid Test Data in the Personal Information page and Click n the Next

    it('E2E_2 :should populate PersInfo page', function() {
        perInfo.fillPersonalInfo(TestData);
        perInfo.fillAddress(TestData);
        perInfo.phoneNumberemail(TestData);
        perInfo.next.click();
        expect(browser.getTitle()).toEqual(TestData.DependentPageTitle);

    });

    // Add Dependent as a Child and Proceed

    it('E2E_3 :should add 2 Deps, child & spouse', function() {
        browser.sleep(2000);
        expect(depInfo.fieldAddDependents.isPresentAndDisplayed()).toBeTruthy();
        depInfo.fillDependent('Dependent1', TestData.Spouse, false);
        depInfo.fillDependent('Dependent2', TestData.child, false);
        depInfo.next.click();
        expect(depInfo.premiumChangePopUp.isPresentAndDisplayed()).toBeTruthy();
        depInfo.continue.click();
        expect(browser.getTitle()).toEqual(TestData.facilitiesPageTitle);

    });


    //Verify and Select the Facility for the Dependent

    it('E2E_4 :should select fac for Prime', function() {
        facilities.selectFacility(TestData.facilityoption1);
        facilities.next.click();
    });

    //Verify and Select the Facility for the Dependent

    it('E2E_5 :should select fac for both deps', function() {
        facilities.selectFacility(TestData.facilityoption2);
        facilities.next.click();
        facilities.selectFacility(TestData.facilityoption3);
        facilities.next.click();
        expect(browser.getTitle()).toEqual(TestData.paymentPageTitle);
    });

    //Furnish all the fields of the Payment page with the valid Test Data and proceed

    it('E2E_10 :should fill out pay details', function() {
        payment.billingChkBox.check();
        payment.fillpayment(TestData);
        payment.purchaseNow.click();
        expect(browser.getTitle()).toEqual(TestData.receiptPageTitle);
    });

    //Verify and Validate the Application Number and Plan Name in the Receipt Page

    it('E2E_11 :should generate a vaild receipt page', function() {
        expect(receipt.applicationNumber.getText()).toEqual('6024571');
        expect(receipt.planName.getText()).toEqual(TestData.planName);
        expect(receipt.getPlanSummaryByKey('Cleanings').getText()).toEqual('$25');
    });

});
