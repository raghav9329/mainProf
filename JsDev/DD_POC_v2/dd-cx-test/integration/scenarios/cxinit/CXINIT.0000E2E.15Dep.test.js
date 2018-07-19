//CXINIT-1408 : E2E Work Flow 1 with the dependent age verification

//This Spec is used to Validate End to End Work Flow with the Dependent age Error

var perInfo = new(require('../../pageObjects/cxinit/perInfo-page.js'));
var depInfo = new(require('../../pageObjects/cxinit/dependent-page.js'));
var facilities = new(require('../../pageObjects/cxinit/facilities-page.js'));
var payment = new(require('../../pageObjects/cxinit/payment-page.js'));
var receipt = new(require('../../pageObjects/cxinit/receipt-page.js'));
var enrollPage = new(require('../../businessComponents/homePage.js'));
var TestData = require('../../testData/cxinit/CXINIT.0000E2E.15Dep.json');

describe('cxinit1408:', function() {
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
    //Validate the Dependet age is greater than 26 and with the disability check box

    it('E2E_3 :should add 15 Dep', function() {
        expect(depInfo.fieldAddDependents.isPresentAndDisplayed()).toBeTruthy();
        // console.log("Souse test data====="+TestData.Spouse);
        depInfo.fillDependent('Dependent1', TestData.child3, false);
        depInfo.next.click();
        if (depInfo.isHandicapped('Dependent1').isPresentAndDisplayed()) {
            depInfo.isHandicapped('Dependent1').check();
        }
    // });

    // it('15 dependents',function(){

        depInfo.fillDependent('Dependent2', TestData.Spouse, false);
        depInfo.fillDependent('Dependent3', TestData.child2, false);
        depInfo.fillDependent('Dependent4', TestData.child4, false);
        depInfo.fillDependent('Dependent5', TestData.child5, false);
        depInfo.fillDependent('Dependent6', TestData.child6, false);
        depInfo.fillDependent('Dependent7', TestData.child7, false);
        depInfo.fillDependent('Dependent8', TestData.child8, false);
        depInfo.fillDependent('Dependent9', TestData.child9, false);
        depInfo.fillDependent('Dependent10', TestData.child10, false);
        depInfo.fillDependent('Dependent11', TestData.child11, false);
        depInfo.fillDependent('Dependent12', TestData.child12, false);
        depInfo.fillDependent('Dependent13', TestData.child13, false);
        depInfo.fillDependent('Dependent14', TestData.child14, false);
        depInfo.fillDependent('Dependent15', TestData.child15, false);
        depInfo.next.click();
        expect(depInfo.premiumChangePopUp.isPresentAndDisplayed()).toBeTruthy();
        depInfo.continue.click();
        expect(browser.getTitle()).toEqual(TestData.facilitiesPageTitle);

    });


    //Verify and Select the Facility for the Dependent

    it('E2E_4 :should select fac for primary', function() {
        facilities.selectFacility(TestData.facilityoption1);
        facilities.next.click();
    });

    //Verify and Select the Facility for the Dependent

    it('E2E_5 :should select fac for deps', function() {
        facilities.selectFacility(TestData.facilityoption2);
        facilities.next.click();
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
        facilities.selectFacility(TestData.facilityoption8);
        facilities.next.click();
        facilities.selectFacility(TestData.facilityoption9);
        facilities.next.click();
        facilities.selectFacility(TestData.facilityoption10);
        facilities.next.click();
        facilities.selectFacility(TestData.facilityoption11);
        facilities.next.click();
        facilities.selectFacility(TestData.facilityoption12);
        facilities.next.click();
        facilities.selectFacility(TestData.facilityoption13);
        facilities.next.click();
        facilities.selectFacility(TestData.facilityoption14);
        facilities.next.click();
        facilities.selectFacility(TestData.facilityoption15);
        facilities.next.click();
        expect(browser.getTitle()).toEqual(TestData.paymentPageTitle);
    });

    //Furnish all the fields of the Payment page with the valid Test Data and proceed

    it('E2E_6 :should fill out pay details', function() {
        payment.billingChkBox.check();
        payment.fillpayment(TestData);
        payment.purchaseNow.click();
        expect(browser.getTitle()).toEqual(TestData.receiptPageTitle);
    });

    //Verify and Validate the Application Number and Plan Name in the Receipt Page

    it('E2E_7 :should generate a valid receipt page', function() {
        receipt.planSummary.click();
        receipt.applicants.click();
        receipt.getSelectedFacilityDetails('PRIMARY', 1).then(function(facilitydata) {
            expect(facilitydata.name).toEqual('-');
            expect(facilitydata.facilityName).toEqual('-');
            // browser.sleep(500000)
        })

        /*expect(receipt.applicationNumber.getText()).toEqual('6024571');
        expect(receipt.planName.getText()).toEqual(TestData.planName);
        expect(receipt.getPlanSummaryByKey('Cleanings').getText()).toEqual('$25');*/
    });

});
