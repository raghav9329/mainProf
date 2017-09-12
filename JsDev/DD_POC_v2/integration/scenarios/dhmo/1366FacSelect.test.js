//CXINIT-1366 : Test Automation Facilities page Facilities Selection

//This Spec is used to Verify and Validate Facilities selection of the Dependents

var perInfo = new(require('../../pageObjects/cxinit/perInfo-page.js'));
var depInfo = new(require('../../pageObjects/cxinit/dependent-page.js'));
var facilities = new(require('../../pageObjects/cxinit/facilities-page.js'));
var payment = new(require('../../pageObjects/cxinit/payment-page.js'));
var receipt = new(require('../../pageObjects/cxinit/receipt-page.js'));

var enrollPage = new(require('../../pageObjects/cxinit/enroll-page.js'));
var TestData = require('../../testData/'+testDataEnv+'/dhmo/dhmo.1366FacSelect.json');

describe('DHMO:1366: Facility Selection of Facilities workflows: ', function() {
    beforeEach(function() {
        Utility.openApplication('','DELTA');
        enrollPage.enterHomePageDetails(TestData.enrollData);
        expect(perInfo.fieldFirstName.isPresentAndDisplayed()).toBeTruthy();
        perInfo.fillPersonalInfo(TestData);
        perInfo.fillAddress(TestData);
        perInfo.phoneNumberemail(TestData);
        perInfo.fillBroker(TestData);
        expect(browser.getTitle()).toEqual(TestData.DependentTitle);
        depInfo.fillDependent('Dependent1', TestData.domesticpartner1, false);
        depInfo.fillDependent('Dependent2', TestData.child3, false);
        depInfo.fillDependent('Dependent3', TestData.child4, false);
        depInfo.next.click();
        expect(depInfo.premiumChangePopUp.isPresentAndDisplayed()).toBeTruthy();
        depInfo.continue.click();
        expect(browser.getTitle()).toEqual(TestData.facilitiesTitle);
    });


    it('Verify and Select any facilities for all the dependents', function() {

        facilities.selectFacility(TestData.facilityoption1);
        facilities.next.click();
        facilities.selectFacility(TestData.facilityoption2);
        facilities.next.click();
        facilities.selectFacility(TestData.facilityoption3);
        facilities.next.click();
        facilities.selectFacility(TestData.facilityoption4);
        facilities.next.click();
        expect(browser.getTitle()).toEqual(TestData.paymentTitle);

    });

    // No Facilit is selected for any dependent for the 1st time and validated the error
    // Repetead the same for all the dependents added

    it('Verify and No Option is Selected in the facilities page for dependents', function() {

        //Validate Enrolle without selecting any Facility and the respective error

        facilities.next.click();
        expect(facilities.enrolleFacNullErr.getText()).toEqual(TestData.facilityselectionError);
        expect(facilities.enrolleFacNullHelpText.getText()).toEqual(TestData.enrolleFacNullHelpText);
        expect(facilities.depNameVerify.getText()).toEqual(TestData.firstname);

        //Select the Facility for the Enrolle and Proceed
        facilities.selectFacility(TestData.facilityoption1);
        facilities.next.click();

        //Validate Dependent - 1 without selecting any Facility and the respective error
        facilities.next.click();
        expect(facilities.enrolleFacNullErr.getText()).toEqual(TestData.facilityselectionError);
        expect(facilities.enrolleFacNullHelpText.getText()).toEqual(TestData.enrolleFacNullHelpText);
        expect(facilities.depNameVerify.getText()).toEqual(TestData.domesticpartner1.firstName);

        //Select the Facility for the Dependent - 1 and Proceed
        facilities.selectFacility(TestData.facilityoption2);
        facilities.next.click();

        //Validate Dependent - 2 without selecting any Facility and the respective error
        facilities.next.click();
        expect(facilities.enrolleFacNullErr.getText()).toEqual(TestData.facilityselectionError);
        expect(facilities.enrolleFacNullHelpText.getText()).toEqual(TestData.enrolleFacNullHelpText);
        expect(facilities.depNameVerify.getText()).toEqual(TestData.child3.firstName);

        //Select the Facility for the Dependent - 2 and Proceed
        facilities.selectFacility(TestData.facilityoption3);
        facilities.next.click();

        //Validate Dependent - 3 without selecting any Facility and the respective error
        facilities.next.click();
        expect(facilities.enrolleFacNullErr.getText()).toEqual(TestData.facilityselectionError);
        expect(facilities.enrolleFacNullHelpText.getText()).toEqual(TestData.enrolleFacNullHelpText);
        expect(facilities.depNameVerify.getText()).toEqual(TestData.child4.firstName);

        //Select the Facility for the Dependent - 3 and Proceed
        facilities.selectFacility(TestData.facilityoption4);
        facilities.next.click();
        expect(browser.getTitle()).toEqual(TestData.paymentTitle);

    });


});



/*beforeAll(function() {
        Utility.openApplication('','DELTA');

    });

    //Fill the Valid Data in the home page of Enrollment and Proceed

    it('Step-1: Should complete the Enroll Page', function() {
        enrollPage.enterHomePageDetails(TestData.enrollData);
        expect(perInfo.fieldFirstName.isPresentAndDisplayed()).toBeTruthy();
    });

    //Enter the valid Test Data in the Personal Information page and Click n the Next

    it('Step-2: Verify Personal Information Page is filled with Valid data and Proceed', function() {
        perInfo.fillPersonalInfo(TestData);
        perInfo.fillAddress(TestData);
        perInfo.phoneNumberemail(TestData);
        // perInfo.fillBroker(TestData);
        depInfo.next.click();
        expect(browser.getTitle()).toEqual(TestData.DependentTitle);

    });

    //Verify 3 Dependents are added in the dependents page

    it('Step-3: Verifying and Validate add the dependents', function() {
        browser.sleep(2000);
        expect(depInfo.fieldAddDependents.isPresentAndDisplayed()).toBeTruthy();
        depInfo.fillDependent('Dependent1', TestData.domesticpartner1, false);
        depInfo.fillDependent('Dependent2', TestData.child3, false);
        depInfo.fillDependent('Dependent3', TestData.child4, false);
        depInfo.next.click();
        expect(depInfo.premiumChangePopUp.isPresentAndDisplayed()).toBeTruthy();
        depInfo.continue.click();
        expect(browser.getTitle()).toEqual(TestData.facilitiesTitle);

    });

    
    //Verify and Select the Facility for the Enrolle

    it('Step-4: Verify and select a Facility for the primary', function() {

        facilities.selectFacility(TestData.facilityoption1);
        facilities.next.click();
    });

    //Verify and Select the Facility for the Dependent-1

    it('Step-5: Verify and select the facilities for dependent -1', function() {
        facilities.selectFacility(TestData.facilityoption2);
        facilities.next.click();
    });

    //Verify and Select the Facilities for the Dependent-2

    it('Step-6: Verify and select the facilities for dependent -2', function() {
        facilities.selectFacility(TestData.facilityoption3);
        facilities.next.click();
    });

    //Verify and Select the Facilities for the Dependent-3

    it('Step-7: Verify and select the facilities for dependent -3', function() {
        facilities.selectFacility(TestData.facilityoption4);
        facilities.next.click();
        expect(browser.getTitle()).toEqual(TestData.paymentTitle);
    });


});*/
