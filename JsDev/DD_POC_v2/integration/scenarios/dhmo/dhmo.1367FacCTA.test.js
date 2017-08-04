/*
 * CXINIT-1367 Facilities CTA Back Next
 * This Script Validates the functionality of Next and Back Buttons in Facilities page 
 */
var TestData = require("../../testData/dhmo/dhmo.1367FacCTA.json");
var perInfo = new(require('../../pageObjects/cxinit/perInfo-page.js'));
var depInfo = new(require('../../pageObjects/cxinit/dependent-page.js'));
var facilities = new(require('../../pageObjects/cxinit/facilities-page.js'));
var payment = new(require('../../pageObjects/cxinit/payment-page.js'));
var receipt = new(require('../../pageObjects/cxinit/receipt-page.js'));

var enrollPage = new(require('../../pageObjects/cxinit/enroll-page.js'));

describe('CXINIT-1367 Facilities CTA Back Next: ', function() {
    // Pre-condition: User navigated to Dependents page
    beforeEach(function() {
        Utility.openApplication('','DELTA');
        enrollPage.enterHomePageDetails(TestData.enrollData);
        expect(perInfo.fieldFirstName.isPresentAndDisplayed()).toBeTruthy();
        perInfo.fillPersonalInfo(TestData);
        perInfo.fillAddress(TestData);
        perInfo.phoneNumberemail(TestData);
        perInfo.fillBroker(TestData);
        expect(browser.getTitle()).toEqual(TestData.dependentPageTitle);

    });
    // Add one dependent and navigate to facilities page
    // Verify the functionality of Next button 
    it('Step-1:Should be navigate to Payment page', function() {
        depInfo.fillDependent('Dependent1', TestData.domesticPartner, false);
        depInfo.next.click();
        depInfo.newAdditionalPrice.getText().then(function(dep1Price) {
            depInfo.continue.click();
            expect(browser.getTitle()).toEqual(TestData.facilitiesPageTitle);
            facilities.premiumAmount.getText().then(function(premium) {
                expect(premium.substring(1)).toEqual(dep1Price);
                facilities.selectFacility(TestData.facilityoption1);
                facilities.next.click();
                facilities.selectFacility(TestData.facilityoption2);
                facilities.next.click();
                expect(browser.getTitle()).toEqual(TestData.paymentPageTitle);
            });
        });
    });
    // Verify the functionality of Next button with out selecting dependent
    it('Step-2:Should be navigate to Payment page', function() {
        depInfo.next.click();
        Utility.scrollToBottom();
        facilities.next.click();
        expect(facilities.validationMessage.getText()).toEqual(TestData.errorFacility);
        facilities.selectFacility(TestData.facilityoption1);
        facilities.next.click();
        expect(browser.getTitle()).toEqual(TestData.paymentPageTitle);
    });
    // Verify the functionality of Back link in fecilities page
    it('Step-3:Should be navigate to dependent page', function() {
        depInfo.fillDependent('Dependent1', TestData.domesticPartner, false);
        depInfo.next.click();
        depInfo.newAdditionalPrice.getText().then(function(dep1Price) {
            depInfo.continue.click();
            expect(browser.getTitle()).toEqual(TestData.facilitiesPageTitle);
            facilities.premiumAmount.getText().then(function(premium) {
                expect(premium.substring(1)).toEqual(dep1Price);
                facilities.selectFacility(TestData.facilityoption1);
                facilities.next.click();
                facilities.back.click();
                expect(facilities.RecentSelectedFacility.getText()).toEqual(TestData.facilityoption1);
                facilities.back.click();
                expect(browser.getTitle()).toEqual(TestData.dependentPageTitle);
            });
        });
    });
    // Verify the functionality of Back link in fecilities page and payment page
    it('Step-4:Should be navigate to dependent page', function() {
        depInfo.fillDependent('Dependent1', TestData.domesticPartner, false);
        depInfo.next.click();
        depInfo.newAdditionalPrice.getText().then(function(dep1Price) {
            depInfo.continue.click();
            expect(browser.getTitle()).toEqual(TestData.facilitiesPageTitle);
            facilities.premiumAmount.getText().then(function(premium) {
                expect(premium.substring(1)).toEqual(dep1Price);
                facilities.selectFacility(TestData.facilityoption1);
                facilities.next.click();
                facilities.selectFacility(TestData.facilityoption2);
                facilities.next.click();
                expect(browser.getTitle()).toEqual(TestData.paymentPageTitle);
                Utility.scrollToBottom();
                payment.back.click();
                facilities.back.click();
                expect(facilities.RecentSelectedFacility.getText()).toEqual(TestData.facilityoption1);
                facilities.back.click()
                expect(browser.getTitle()).toEqual(TestData.dependentPageTitle);
            });
        });
    });

});
