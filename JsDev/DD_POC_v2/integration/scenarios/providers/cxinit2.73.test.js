/*
 * CXINIT2 - 73 : Search by Network
 * Description : As a user, I want to be matched to the network I select.
 * AC
 * User should be able to me matched to one of the selected networks
 * Selected networks:
 * -Premier
 * -PPO
 * -Deltacare/DHMO
 * DHMO refers to dental and not vision at this time.
 */
 "use strict"
var TestData = require("../../testData/providers/cxinit2.73.json");
var dirSearch = new(require('../../pageObjects/providers/directory-search-page.js'));
var providerDetails = new(require('../../pageObjects/providers/provider-details-page.js'));

describe('Provider Search Validation', function() {
    beforeEach(function() {
        Utility.openApplication('');
    });

    it('ProvDir_1: Verify all filter values are displayed or not for refine search functionality', function() {
        dirSearch.location.setText(TestData.HAddress_ZIP.PartialAddress);
        dirSearch.selectHomeAddress(TestData.HAddress_ZIP.FullAddress);
        expect(dirSearch.deltaDentalPPO.isPresentAndDisplayed()).toBeTruthy();
        dirSearch.deltaDentalPPO.check();
        dirSearch.findDentist.click();
        expect(dirSearch.providersListing.getCount()).toEqual(10);
    });

    it('ProvDir_2: Verify all filter values are displayed or not for refine search functionality', function() {
        dirSearch.location.setText(TestData.HAddress_ZIP.PartialAddress);
        dirSearch.selectHomeAddress(TestData.HAddress_ZIP.FullAddress);
        expect(dirSearch.deltaDentalPremier.isPresentAndDisplayed()).toBeTruthy();
        dirSearch.deltaDentalPremier.check();
        dirSearch.findDentist.click();
        expect(dirSearch.providersListing.getCount()).toEqual(10);
    });

    it('ProvDir_2: Verify all filter values are displayed or not for refine search functionality', function() {
        dirSearch.location.setText(TestData.HAddress_ZIP.PartialAddress);
        dirSearch.selectHomeAddress(TestData.HAddress_ZIP.FullAddress);
        expect(dirSearch.deltaCareUSA.isPresentAndDisplayed()).toBeTruthy();
        dirSearch.deltaCareUSA.check();
        dirSearch.findDentist.click();
        expect(dirSearch.providersListing.getCount()).toEqual(10);        

    });
});
