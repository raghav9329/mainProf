/*
 * CXINIT2 - 642 : Search by language
 * Description : As a user, i want to be able to search the directory by languages spoken at the provider's office.
 */
 "use strict"
var TestData = require("../../testData/providers/cxinit2.642.json");
var dirSearch = new(require('../../pageObjects/providers/directory-search-page.js'));
var providerDetails = new(require('../../pageObjects/providers/provider-details-page.js'));

describe('Provider Search Validation', function() {
    beforeEach(function() {
        Utility.openApplication('');
    });

    it('ProvDir_1: Verify all filter values are displayed or not for refine search functionality', function() {
        dirSearch.location.setText(TestData.HAddress_ZIP.PartialAddress);
        dirSearch.selectHomeAddress(TestData.HAddress_ZIP.FullAddress);
        dirSearch.findDentist.click();
        expect(dirSearch.providersListing.getCount()).toEqual(10);
        dirSearch.refineSearch.click();
        expect(dirSearch.languages.isPresentAndDisplayed()).toBeTruthy();
        dirSearch.languages.click();
        expect(dirSearch.languageFilter.isPresentAndDisplayed()).toBeTruthy();
        dirSearch.languageFilter.selectByText('Spanish');
        dirSearch.apply.click();
        expect(dirSearch.providersListing.getCount()).toEqual(10);

        dirSearch.refineSearch.click();
        expect(dirSearch.languages.isPresentAndDisplayed()).toBeTruthy();
        dirSearch.languages.click();
        expect(dirSearch.languageFilter.isPresentAndDisplayed()).toBeTruthy();
        dirSearch.languageFilter.selectByText('French');
        dirSearch.apply.click();
        expect(dirSearch.providersListing.getCount()).toEqual(10);

        dirSearch.refineSearch.click();
        expect(dirSearch.languages.isPresentAndDisplayed()).toBeTruthy();
        dirSearch.languages.click();
        expect(dirSearch.languageFilter.isPresentAndDisplayed()).toBeTruthy();
        dirSearch.languageFilter.selectByText('Farsi');
        dirSearch.apply.click();
        expect(dirSearch.providersListing.getCount()).toEqual(10);

        dirSearch.refineSearch.click();
        expect(dirSearch.languages.isPresentAndDisplayed()).toBeTruthy();
        dirSearch.languages.click();
        expect(dirSearch.languageFilter.isPresentAndDisplayed()).toBeTruthy();
        dirSearch.languageFilter.selectByText('Hungarian');
        dirSearch.apply.click();
        expect(dirSearch.providersListing.getCount()).toEqual(10);

        dirSearch.refineSearch.click();
        expect(dirSearch.languages.isPresentAndDisplayed()).toBeTruthy();
        dirSearch.languages.click();
        expect(dirSearch.languageFilter.isPresentAndDisplayed()).toBeTruthy();
        dirSearch.languageFilter.selectByText('Portuguese');
        dirSearch.apply.click();
        expect(dirSearch.providersListing.getCount()).toEqual(10);

    });
});
