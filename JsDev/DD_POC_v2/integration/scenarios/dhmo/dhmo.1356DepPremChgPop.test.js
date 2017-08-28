/* CXINIT-1356:Premium Change Pop up
 *  This Script will validates the functionality of Premium change Popup
 */
var TestData = require('../../testData/'+testDataEnv+'/dhmo/dhmo.1356DepPremChgPop.json');
var perInfo = new(require('../../pageObjects/cxinit/perInfo-page.js'));
var depInfo = new(require('../../pageObjects/cxinit/dependent-page.js'));
var facilities = new(require('../../pageObjects/cxinit/facilities-page.js'));
var payment = new(require('../../pageObjects/cxinit/payment-page.js'));
var receipt = new(require('../../pageObjects/cxinit/receipt-page.js'));

var enrollPage = new(require('../../pageObjects/cxinit/enroll-page.js'));


describe('CXINIT-1356:Premium Change Pop up: ', function() {
    //global variable to capture the values dynamically
    var dep2_Price;
    beforeAll(function() {
        console.log(' ');
        console.log('--- CXINIT-1356 Dependents Premium Change PopUp  ---')
        Utility.openApplication('', 'DELTA');
    });
    //   Fill the Enroll page with valid data and verify the navigation

    it('PremChgPU-1:should complete the Enroll Page', function() {
        enrollPage.enterHomePageDetails(TestData.enrollData);
        expect(perInfo.fieldFirstName.isPresentAndDisplayed()).toBeTruthy();
        console.log(' Dep PremChgPU-1 complete');

    });

    //    Fill Personal Infor Page with valid data and verify the navigation
    it('PremChgPU-2:should fill out Personal Information Page', function() {
        perInfo.fillPersonalInfo(TestData);
        perInfo.fillAddress(TestData);
        perInfo.phoneNumberemail(TestData);
        perInfo.fillBroker(TestData);
        expect(browser.getTitle()).toEqual(TestData.dependentPageTitle);
        console.log('Dep PremChgPU-2 complete');
    });
    // Fill dependent with valid data and click on Continue button
    // Verify that Premium change popup should be displayed with Premium,"Go Back" link and "Continue" button
    it('PremChgPU-3:Premium Change popup should be displayed ', function() {
        depInfo.fillDependent('Dependent1', TestData.domesticPartner, false);
        depInfo.next.click();
        expect(depInfo.premiumChangePopUp.isPresentAndDisplayed()).toBeTruthy();
        expect(depInfo.gobackPremiumPopUP.isPresentAndDisplayed()).toBeTruthy();
        expect(depInfo.continue.isPresentAndDisplayed()).toBeTruthy();
        console.log('Dep PremChgPU-3 complete');
    });
    // Click on Go Back link
    // Add second dependent(one Domestic partner and one spouse). Click on Next button followed by Continue button 
    // Verify that error message should be displayed with  "You can select only 1 Spouse or Domestic Partner."
    it('PremChgPU-4:Error message should be displayed with You can select only 1 Spouse or Domestic Partner.', function() {
        depInfo.newAdditionalPrice.getText().then(function(dep1Price) {
            depInfo.continue.click();
            expect(browser.getTitle()).toEqual(TestData.facilitiesPageTitle);
            facilities.premiumAmount.getText().then(function(premium) {
                expect(premium.substring(1)).toEqual(dep1Price);
                facilities.back.click();
                depInfo.fillDependent('Dependent2', TestData.spouse, false);
                depInfo.next.click();
                expect(depInfo.premiumChangePopUp.isPresentAndDisplayed()).toBeTruthy();
                expect(depInfo.gobackPremiumPopUP.isPresentAndDisplayed()).toBeTruthy();
                expect(depInfo.continue.isPresentAndDisplayed()).toBeTruthy();
                depInfo.newAdditionalPrice.getText().then(function(dep2Price) {
                    depInfo.continue.click();
                    dep2_Price = dep2Price;
                    expect(browser.getTitle()).toEqual(TestData.dependentPageTitle);
                    expect(depInfo.depError.getText()).toEqual(TestData.depError);
                });
            });
        });
        console.log('Dep PremChgPU-4 complete');
    });
    // Update second dependent relation with child and click on Next button
    // Capture the premium amount from Premium change popup and verify the premium in purple color box of facilities page 
    it('PremChgPU-5:Should be navigate to facilities page', function() {
        depInfo.relationship('Dependent2').selectByText(TestData.child.relationship);
        depInfo.next.click();
        facilities.premiumAmount.getText().then(function(premium) {
            expect(premium.substring(1)).toEqual(dep2_Price);
            expect(browser.getTitle()).toEqual(TestData.facilitiesPageTitle);
        });
        console.log('Dep PremChgPU-5 complete');
    });
    // Go back to dependent page. Add third dependent and click on Next button
    // Verify that Premium change popup should not be displayed
    it('PremChgPU-6:Premium change popup should not be displayed for third dependent', function() {
        facilities.back.click();
        depInfo.fillDependent('Dependent3', TestData.child, false);
        depInfo.next.click();
        expect(depInfo.premiumChangePopUp.isPresentAndDisplayed()).toBeFalsy();
        facilities.premiumAmount.getText().then(function(premium) {
            expect(premium.substring(1)).toEqual(dep2_Price);
            expect(browser.getTitle()).toEqual(TestData.facilitiesPageTitle);
        });
        console.log('Dep PremChgPU-6 complete');
    });
    // Go back to dependent page. Delete second and Third dependent
    // Click on Next button and verify that Premium change popup should be displayed
    // Verify the Premium in Premium change popup and facilities page
    it('PremChgPU-7:Premium change popup should be displayed', function() {
        facilities.back.click();
        depInfo.deleteDependent('Dependent3').click();
        Utility.scrollToTop();
        depInfo.deleteDependent('Dependent2').click();
        depInfo.next.click();
        depInfo.newAdditionalPrice.getText().then(function(dep1Price) {
            expect(depInfo.premiumChangePopUp.isPresentAndDisplayed()).toBeTruthy();
            expect(depInfo.gobackPremiumPopUP.isPresentAndDisplayed()).toBeTruthy();
            expect(depInfo.continue.isPresentAndDisplayed()).toBeTruthy();
            depInfo.continue.click();
            facilities.premiumAmount.getText().then(function(premium) {
                expect(premium.substring(1)).toEqual(dep1Price);
                expect(browser.getTitle()).toEqual(TestData.facilitiesPageTitle);
            });
        });
        console.log('Dep PremChgPU-7 complete');
    });
});
