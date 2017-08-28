//AARP_HMO_WorkFlows_5

//This Spec is used to Validate End to End Work Flow with the Dependent age Error
//Start at 94105 100First St 4th floor , Add 15 Dependents, All children over the age of 26.  
//Facilities ( her's fun )  Search for a new zip code for EVERY Dependent.

var perInfo = new(require('../../pageObjects/cxinit/perInfo-page.js'));
var depInfo = new(require('../../pageObjects/cxinit/dependent-page.js'));
var facilities = new(require('../../pageObjects/cxinit/facilities-page.js'));
var payment = new(require('../../pageObjects/cxinit/payment-page.js'));
var receipt = new(require('../../pageObjects/cxinit/receipt-page.js'));
var enrollPage = new(require('../../businessComponents/homePage.js'));
var TestData = require('../../testData/'+testDataEnv+'/aarpppo/aarpppo.Aarp_PPO_WorkFlow_5.json');

describe('AARP-1754 AARP_HMO_WorkFlows_5:', function() {
    beforeAll(function() {
        Utility.openApplication('');

    });

    //Fill the Valid Data in the home page of Enrollment and Proceed

    it('E2E_1 : Should complete the Enroll Page', function() {
        enrollPage.enterHomePageDetails(TestData.enrollData,true);
        expect(perInfo.fieldFirstName.isPresentAndDisplayed()).toBeTruthy();
    });

    //Enter the valid Test Data in the Personal Information page and Click n the Next

    it('E2E_2 :should populate PersInfo page', function() {
        perInfo.fillPersonalInfo(TestData);
        perInfo.fillAddress(TestData);
        perInfo.phoneNumberemail(TestData);
        perInfo.fillBroker(TestData);
        perInfo.referralSource.selectByText(TestData.referralSource)
        depInfo.next.click();
        expect(browser.getTitle()).toEqual(TestData.DependentTitle);

    });

    // Add Dependent as a Child and Proceed
    //Validate the Dependet age is greater than 26 and with the disability check box
    dataProvider(TestData.Dependents, function(data, description) {

        it('E2E_3 :should add 15 Dep', function() {
            expect(depInfo.fieldAddDependents.isPresentAndDisplayed()).toBeTruthy();
            // console.log("Souse test data====="+TestData.Spouse);
            depInfo.fillDependent(data.dependent, data, false);
            depInfo.next.click();
            if (depInfo.isHandicapped(data.dependent).isPresentAndDisplayed()) {
                depInfo.isHandicapped(data.dependent).check();
            }

        });

    });

    it('E2E_3.1 :Validate Premium Pop up and Navigation to Facility Page', function() {

        depInfo.next.click();
        expect(depInfo.premiumChangePopUp.isPresentAndDisplayed()).toBeTruthy();
        depInfo.continue.click();
        expect(browser.getTitle()).toEqual(TestData.paymentPageTitle)
    });

    //Validate and Payment Page is launched
    //Furnish all the fields of the Payment page with the valid Test Data and proceed

    it('E2E_6 :should fill out pay details', function() {
        payment.billingChkBox.check();
        payment.fillpayment(TestData);
        payment.frequencyAnnualy.select();
        payment.purchaseNow.click();
        expect(browser.getTitle()).toEqual(TestData.receiptPageTitle);
    });

    //Verify and Validate the Application Number and Plan Name in the Receipt Page

    it('E2E_7 :should generate a valid receipt page', function() {
        receipt.planSummary.click();
        receipt.applicants.click();
        receipt.getSelectedFacilityDetails('PRIMARY', 1).then(function(facilitydata) {
            // expect(facilitydata.name).toEqual('-');
            // expect(facilitydata.facilityName).toEqual('-');
            // browser.sleep(500000)
        })

    });

});
