//CXINIT-1361 : Write a Test Auto Spec for CTA Next Back on the Personal Info page ONLY

//This spec is used to :As a product owner I want to allow the user to move back and forth into the application pages.

var TestData = require("../../testData/cxinit/cxinit.1361.json");
var perInfo = new(require('../../pageObjects/cxinit/perInfo-page.js'));
var depInfo = new(require('../../pageObjects/cxinit/dependent-page.js'));
var facilities = new(require('../../pageObjects/cxinit/facilities-page.js'));
var enrollPage = new(require('../../businessComponents/homePage.js'));

var Button = require('../../controls/button-control');

describe('CXINIT-1361: PersonalInformation Page: ', function() {
    beforeAll(function() {
        Utility.openApplication('');

    });

    //Fill the Valid Data in the home page of Enrollment and Proceed

    it('Dependents Max_Step-1:should complete the Enroll Page', function() {
        enrollPage.enterHomePageDetails(TestData.enrollData);
        expect(perInfo.fieldFirstName.isPresentAndDisplayed()).toBeTruthy();
    });

    /*it('Enter the Zip code and Click on the Enter for the Enroll Page', function() {
        browser.driver.findElement(by.name('planZip')).clear().then(function() {
            browser.driver.findElement(by.name('planZip')).sendKeys(TestData.ZipCode);
            // browser.driver.findElement(by.name('noOfCovered')).clear();
            // browser.driver.findElement(by.name('noOfCovered')).sendKeys('4');
            //Below code should be uncommented for the Mot Environment
            browser.sleep(2000);
            browser.driver.findElement(by.name('coverageStartDate')).clear();
            browser.driver.findElement(by.name('coverageStartDate')).sendKeys(TestData.coverageStartDate);
            browser.actions().sendKeys(protractor.Key.ENTER).perform();
            return true;
        });
        expect(perInfo.fieldFirstName.isPresentAndDisplayed()).toBeTruthy();
    });*/

    //Verify and Validate the field Errors of the Personal Info page with Null values

    it('Verify and Validate the Errors of Personal Information Page is with InValid data and Proceed', function() {

        browser.sleep(2000);
        expect(perInfo.enrollStatus('Personal Info').getAttribute('class')).toContain(TestData.applicationStatus);
        Utility.scrollToBottom();
        perInfo.next.click();
        perInfo.next.click();
        expect(perInfo.getProfileValidationMessages()).toEqual(TestData.personalInfoerror);
        expect(perInfo.getServerProfileValidationMessages()).toEqual(TestData.personalInfoerror)
    });

    //Verify and Validate the all the fields of the Personal Info page are filled with valid Test Data and proceed

    it('Verify Personal Information Page is filled with Valid data and Proceed', function() {
        perInfo.fillPersonalInfo(TestData);
        perInfo.fillAddress(TestData);
        perInfo.phoneNumberemail(TestData);
        perInfo.fillBroker(TestData);
        expect(browser.getTitle()).toEqual(TestData.DependentTitle);
        expect(perInfo.enrollStatus('Dependents').getAttribute('class')).toContain(TestData.applicationStatus);
    });

    //Validate user could Navigate back to the Personal Info page using Back
    //Verify the Data firnished in the filled is not cleared.

    it('Verifying Data in the Personal-Info Page by CTA BACK', function() {
        depInfo.back.click();
        expect(perInfo.fieldSsn.getValue()).toEqual('');
        expect(perInfo.fieldFirstName.getValue()).toEqual(TestData.firstname);
        expect(perInfo.fieldPhoneNumber.getValue()).toEqual(TestData.phoneNumber);
        expect(perInfo.enrollStatus('Personal Info').getAttribute('class')).toContain(TestData.applicationStatus);

    });


});
