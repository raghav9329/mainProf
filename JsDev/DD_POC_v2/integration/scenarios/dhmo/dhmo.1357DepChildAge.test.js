/* CXINIT-1357: Dependents childs Age
 * This Script Validates the Dependent child age
 */
var TestData = require("../../testData/dhmo/dhmo.1357DepChildAge.json");
var perInfo = new(require('../../pageObjects/cxinit/perInfo-page.js'));
var depInfo = new(require('../../pageObjects/cxinit/dependent-page.js'));
var facilities = new(require('../../pageObjects/cxinit/facilities-page.js'));
var payment = new(require('../../pageObjects/cxinit/payment-page.js'));
var receipt = new(require('../../pageObjects/cxinit/receipt-page.js'));

var enrollPage = new(require('../../pageObjects/cxinit/enroll-page.js'));

describe('CXINIT-1357: Dependents childs Age', function() {
    beforeAll(function() {
        Utility.openApplication('','DELTA');
    });
    //   Fill the Enroll page with valid data and verify the navigation
    it('Step-1:Should complete the Enroll Page', function() {
        enrollPage.enterHomePageDetails(TestData.enrollData);
        expect(perInfo.fieldFirstName.isPresentAndDisplayed()).toBeTruthy();
    });
    //  Fill Personal Infor Page with valid data and verify the navigation
    it('Step-2: Should fill out Personal Information Page', function() {
        perInfo.fillPersonalInfo(TestData);
        perInfo.fillAddress(TestData);
        perInfo.phoneNumberemail(TestData);
        perInfo.fillBroker(TestData);
        expect(browser.getTitle()).toEqual(TestData.DependentPageTitle);
    });
    // Fill the dependent with child and the age af the child is greater than 26
    // Verify the handicapped check box and Help text  
    it('Step-3:Should display the handicapped check box with help text', function() {
        depInfo.fillDependent('Dependent1', TestData.ChildData1, true);
        depInfo.next.click();     
        expect(depInfo.isHandicapped('Dependent1').isPresentAndDisplayed()).toBeTruthy();
        expect(depInfo.handicappedHelpTxt('Dependent1').getText()).toContain(TestData.handicappedHelpText);
    });
    // Check the handicapped check box and verify the functionality of next navigation
    // Should be navigate to facilities page
    it('Step-4:Should navigate to facilities page after selecting check box', function() {
        depInfo.isHandicapped('Dependent1').check();
        depInfo.next.click();
        depInfo.continue.click();
        expect(browser.getTitle()).toEqual(TestData.facilitiesPageTitle);
    });
    // Go back to dependent page and verify handicapped checkbox for second dependent
    it('Step-5:Handicapped check box should be display for second dependent', function() {
        Utility.scrollToBottom();
        facilities.back.click();
        depInfo.fillDependent('Dependent2', TestData.ChildData1, false);
        depInfo.next.click();
        depInfo.continue.click();
        expect(depInfo.isHandicapped('Dependent2').isPresentAndDisplayed()).toBeTruthy();
        expect(depInfo.handicappedHelpTxt('Dependent2').getText()).toContain(TestData.handicappedHelpText);
    });
    // Update the child age to below 26 years and Verify the next button functionality
    // Should be navigate to Facilities page
    it('Step-6:Should be navigaye to Facilities page', function() {
        depInfo.year('Dependent2').setText(Utility.getDatePart(TestData.ChildData2.DOB, 'YEAR') + '\t');        
        expect(depInfo.isHandicapped('Dependent2').isPresentAndDisplayed()).toBeFalsy();
        depInfo.next.click();
        depInfo.continue.click();
        expect(browser.getTitle()).toEqual(TestData.facilitiesPageTitle);
    });

});
