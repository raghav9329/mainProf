//AARP-672 [Personal Info Page] AARP (CA, TX, FL, NY, PA)

//This Spec is used to Verify and Validate Ene to End Work Flow with the Errors and the Happy path

var perInfo = new(require('../../pageObjects/cxinit/perInfo-page.js'));
var depInfo = new(require('../../pageObjects/cxinit/dependent-page.js'));
var facilities = new(require('../../pageObjects/cxinit/facilities-page.js'));
var payment = new(require('../../pageObjects/cxinit/payment-page.js'));
var receipt = new(require('../../pageObjects/cxinit/receipt-page.js'));
var enrollPage = new(require('../../pageObjects/cxinit/enroll-page.js'));
var TestData = require('../../testData/aarphmo/aarphmo.672PersInfo.json');


//Fill the Valid Data in the home page of Enrollment and Proceed

describe('AARPHMO:672 (AARP): E2E_WorkFlow: ', function() {
    beforeEach(function() {
        Utility.openApplication('','AARP');
        enrollPage.enterHomePageDetails(TestData.enrollData);
        expect(perInfo.fieldFirstName.isPresentAndDisplayed()).toBeTruthy();

    });

    //Enter the valid Test Data in the Personal Information page and Click n the Next

    it('E2E_Flow_2: Verify Personal Information Page is filled with Valid data and Proceed', function() {

        expect(perInfo.enrollStatus('Personal Info').getCssValue('background-color')).toEqual(TestData.darkGreen);
        expect(perInfo.enrollStatus('Dependents').getCssValue('background-color')).toEqual(TestData.gray);
        expect(perInfo.enrollStatus('Facilities').getCssValue('background-color')).toEqual(TestData.gray);
        expect(perInfo.enrollStatus('Payment & Review').getCssValue('background-color')).toEqual(TestData.gray);
        expect(perInfo.enrollStatus('Receipt').getCssValue('background-color')).toEqual(TestData.gray);

        perInfo.fillPersonalInfo(TestData);
        perInfo.fillAddress(TestData);
        perInfo.phoneNumberemail(TestData);
        perInfo.fillBroker(TestData);
        perInfo.referralSource.selectByText(TestData.referralSource);
        perInfo.backToQuote.click();
        expect(browser.getTitle()).toEqual(TestData.quotePageTitle);

    });


    it('E2E_Flow_2: Verify Personal Information Page is filled with Valid data and Proceed', function() {
        perInfo.fillPersonalInfo(TestData);
        perInfo.fillAddress(TestData);
        perInfo.phoneNumberemail(TestData);
        perInfo.fillBroker(TestData);
        perInfo.referralSource.selectByText(TestData.referralSource);
        depInfo.next.click();
        expect(browser.getTitle()).toEqual(TestData.DependentTitle);
        expect(perInfo.enrollStatus('Personal Info').getCssValue('background-color')).toEqual(TestData.gray);
        expect(perInfo.enrollStatus('Dependents').getCssValue('background-color')).toEqual(TestData.darkGreen);
        expect(perInfo.enrollStatus('Facilities').getCssValue('background-color')).toEqual(TestData.gray);
        expect(perInfo.enrollStatus('Payment & Review').getCssValue('background-color')).toEqual(TestData.gray);
        expect(perInfo.enrollStatus('Receipt').getCssValue('background-color')).toEqual(TestData.gray);

    });


});
