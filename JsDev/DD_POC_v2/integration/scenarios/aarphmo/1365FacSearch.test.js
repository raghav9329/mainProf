var TestData = require('../../testData/'+testDataEnv+'/aarphmo/aarphmo.1365FacSearch.json');
var perInfo = new(require('../../pageObjects/cxinit/perInfo-page.js'));
var depInfo = new(require('../../pageObjects/cxinit/dependent-page.js'));
var facilities = new(require('../../pageObjects/cxinit/facilities-page.js'));
var payment = new(require('../../pageObjects/cxinit/payment-page.js'));
var receipt = new(require('../../pageObjects/cxinit/receipt-page.js'));
var enrollPage = new(require('../../pageObjects/cxinit/enroll-page.js'));

describe('AARPHMO:1365:MoreOptions: ', function() {
    beforeAll(function() {
        Utility.openApplication('','AARP');

    });

    beforeEach(function() {
        Utility.openApplication('','AARP');
        enrollPage.enterHomePageDetails(TestData.enrollData);
        expect(perInfo.fieldFirstName.isPresentAndDisplayed()).toBeTruthy();
         TestData.MemberId= Utility.randomNo('Number',10);
        perInfo.fillPersonalInfo(TestData);
        perInfo.fillAddress(TestData);
        perInfo.phoneNumberemail(TestData);
        perInfo.referralSource.selectByText(TestData.referralSource);
        perInfo.fillBroker(TestData);
        expect(depInfo.fieldAddDependents.isPresentAndDisplayed()).toBeTruthy();
        depInfo.fillDependent('Dependent1', TestData.domesticpartner1, false);
        depInfo.next.click();
        depInfo.continue.click();

    });



    // //Verify and Select the Facility for the Dependent

    it('More facilities should be displayed for the pre-selected zipcode', function() {
        expect(facilities.moreResults.isPresentAndDisplayed()).toBeTruthy();
        expect(facilities.facilityBox.getCount()).toEqual(50);
        facilities.moreResults.click();
        expect(facilities.facilityBox.getCount()).toBeGreaterThan(0);
        facilities.next.click();
    });

    // //Verify and Select the Facility for the Dependent

    // it('E2E_Flow_5_1: Verify and select the facilities for dependents', function() {
    //     facilities.selectFacility(TestData.facilityoption2);
    //     facilities.next.click();
    // });



});
