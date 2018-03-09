//CXAUTO-69

"use strict"
var TestData = require('../../testData/' + testDataEnv + '/providers/cxauto69.json');
var dirSearch = new(require('../../pageObjects/providers/directory-search-page.js'));
var providerDetails = new(require('../../pageObjects/providers/provider-details-page.js'));
var footer = new(require('../../pageObjects/providers/footer-page.js'));

describe('CXAUTO-69 : Verify the footer links and disclaimer', function() {
    beforeAll(function() {
        Utility.openApplication('');
    });
    beforeEach(function () {
        jasmine.addMatchers(custommatcher.customMatchers);
    });
    it('Verify footer in Search Landing Page', function() {
        footer.verifyFooter(TestData);
    })

    it('Verfy footer in Search results page', function() {
        dirSearch.location.setText(TestData.zipcode);
        dirSearch.findDentist.click();
        footer.verifyFooter(TestData);

    })
    it('Verfy footer in Provider view page', function() {
        providerDetails.viewLink.click();
        footer.verifyFooter(TestData);
    })
    it('Verify footer in Office details Page', function() {
        providerDetails.providerPlaceName.click();
        footer.verifyFooter(TestData);
    })

});

//CXAUTO-68:Cutover Banner
describe('CXAUTO-68:Cutover Banner', function() {
        beforeEach(function() {
            Utility.openApplication('');

        });
        //CXAUTO-68:Cutover Banner
        it('CXAUTO-68:Cutover Banner:Verify "Go Back" button and functionality in Banner', function() {
            dirSearch.location.setText(TestData.zipcode);
            dirSearch.findDentist.click();
            expect(dirSearch.goBackToOldSite.isPresentAndDisplayed()).toBeTruthy();
            expect(providerDetails.location.getValue()).toEqual(TestData.location);
            expect(dirSearch.goBackToOldSite.isPresentAndDisplayed()).toBeTruthy();
            dirSearch.goBackToOldSite.click();
            expect(dirSearch.checkItOutNewSite.isPresentAndDisplayed()).toBeTruthy();
            expect(dirSearch.oldLocation.getValue()).toEqual(TestData.location);
            dirSearch.checkItOutNewSite.click();
            expect(dirSearch.goBackToOldSite.isPresentAndDisplayed()).toBeTruthy();
            expect(providerDetails.location.getValue()).toEqual(TestData.location);
        });
        // CXAUTO-70 Validate Go Back Button for multiple inputs / providers
        // select deltadental ppo in new site and navigate to old site and verify
        // select all network options in old site and navigate to new site and validate 
        it('Validate Go Back Button for multiple inputs / providers', function() {
            dirSearch.location.setText(TestData.zipcode);
            dirSearch.findDentist.click();
            dirSearch.refineSearch.click();
            dirSearch.filterMenuItem('Networks').click();
            dirSearch.iNDeltaDentalPPO.check();
            dirSearch.apply.click();
            dirSearch.goBackToOldSite.click();
            expect(dirSearch.checkItOutNewSite.isPresentAndDisplayed()).toBeTruthy();
            expect(dirSearch.oldDeltaDentalPPO.isSelected()).toBeTruthy();
            expect(dirSearch.oldDeltaDentalPremier.isSelected()).toBeFalsy();
            expect(dirSearch.oldDeltaDentalUSA.isSelected()).toBeFalsy();
            dirSearch.oldDeltaDentalPremier.check();
            dirSearch.oldDeltaDentalUSA.check();
            dirSearch.oldSearch.click();
            expect(dirSearch.oldDeltaDentalUSA.isSelected()).toBeTruthy();
            dirSearch.checkItOutNewSite.click();
            expect(providerDetails.location.getValue()).toEqual(TestData.location);
            dirSearch.refineSearch.click();
            dirSearch.filterMenuItem('Networks').click();
            expect(dirSearch.iNDeltaDentalPPO.isSelected()).toBeTruthy();
            expect(dirSearch.iNDeltaDentalPremier.isSelected()).toBeTruthy();
            expect(dirSearch.iNDeltaCareUSA.isSelected()).toBeTruthy();

        });

        // perform search with keyword and navigate to old site and verify for keyword 
        it('Validate keyword search data', function() {
            dirSearch.location.setText(TestData.zipcode);
            dirSearch.keywordSearch.setText(TestData.keyword);
            dirSearch.findDentist.click();
            dirSearch.goBackToOldSite.click();
            expect(dirSearch.checkItOutNewSite.isPresentAndDisplayed()).toBeTruthy();
            expect(dirSearch.oldKeyword.getValue()).toEqual(TestData.keyword);
            dirSearch.checkItOutNewSite.click();
            expect(dirSearch.keywordSearch.getValue()).toEqual(TestData.keyword);


        });
    })
    // CXAUTO-73: CXINIT2-1075: Reset search button
describe('CXAUTO-73: CXINIT2-1075: Reset search button', function() {
    beforeAll(function() {
        Utility.openApplication('');
    });
    // Search with zip code and get providers count. 
    // Apply filter on distance and get count and verify that count should be lessathan previous count
    // Reset filter and and verify that count is equal to initial count
    it('Apply filter on distance and reset filter', function() {
        dirSearch.location.setText(TestData.zipcode);
        dirSearch.findDentist.click();
        dirSearch.getProvidersCount().then(function(intialTotalCount) {
            dirSearch.refineSearch.click();
            providerDetails.sortDistance.select();
            expect(dirSearch.distanceSelect.isPresentAndDisplayed()).toBeTruthy();
            dirSearch.distanceSelect.selectByText(TestData.Distance25);
            dirSearch.apply.click();
            expect(dirSearch.getProvidersCount()).toBeLessThan(intialTotalCount);
            dirSearch.refineSearch.click();
            dirSearch.filterReset.click();
            dirSearch.apply.click();
            expect(dirSearch.getProvidersCount()).toEqual(intialTotalCount);

        });
    });
    // Search with zip code and get providers count. 
    // Apply filter on network and get count and verify that count should be lessathan previous count
    // Reset filter and and verify that count is equal to initial count

    it('Apply filter on Networks and reset filter', function() {
        dirSearch.getProvidersCount().then(function(intialTotalCount) {
            dirSearch.refineSearch.click();
            dirSearch.filterMenuItem('Networks').click();
            dirSearch.iNDeltaDentalPPO.check();
            dirSearch.apply.click();
            expect(dirSearch.getProvidersCount()).toBeLessThan(intialTotalCount);
            dirSearch.refineSearch.click();
            dirSearch.filterReset.click();
            dirSearch.apply.click();
            expect(dirSearch.getProvidersCount()).toEqual(intialTotalCount);

        });
    });
    // Search with zip code and get providers count. 
    // Apply filter on language and get count and verify that count should be lessathan previous count
    // Reset filter and and verify that count is equal to initial count

    it('Apply filter on Language and reset filter', function() {
            dirSearch.getProvidersCount().then(function(intialTotalCount) {
                dirSearch.refineSearch.click();
                dirSearch.filterMenuItem('Languages').click();
                expect(dirSearch.languageFilter.isPresentAndDisplayed()).toBeTruthy();
                dirSearch.languageFilter.selectByText(TestData.Language);
                dirSearch.apply.click();
                expect(dirSearch.getProvidersCount()).toBeLessThan(intialTotalCount);
                dirSearch.refineSearch.click();
                dirSearch.filterReset.click();
                dirSearch.apply.click();
                expect(dirSearch.getProvidersCount()).toEqual(intialTotalCount);

            });

        })
        // Search with zip code and get providers count. 
        // Apply filter on Specialties and get count and verify that count should be greater than previous count
        // Reset filter and and verify that count is equal to initial count


    it('Apply filter on Specialties and reset filter', function() {
        dirSearch.getProvidersCount().then(function(intialTotalCount) {
            dirSearch.refineSearch.click();
            dirSearch.filterMenuItem('Specialties').click();
            expect(dirSearch.endodontist.isPresentAndDisplayed()).toBeTruthy();
            dirSearch.endodontist.check();
            dirSearch.apply.click();
            expect(dirSearch.getProvidersCount()).toBeGreaterThan(intialTotalCount);
            dirSearch.refineSearch.click();
            dirSearch.filterReset.click();
            dirSearch.apply.click();
            expect(dirSearch.getProvidersCount()).toEqual(intialTotalCount);

        });
    });

})
