// CXINIT2-651 : Automation testing / Report Inaccurate Data button
/*
As a user, I want to have an option to submit a report for data inaccuracies in a provider's profile listing.
AC
Button on provider profile listings that links to Report Inaccurate Directory Information page
Button text: Inaccurate directory information? Let us know.
*/

"use strict"
var TestData = require('../../testData/'+testDataEnv+'/providers/cxinit2.651.json');
var dirSearch = new(require('../../pageObjects/providers/directory-search-page.js'));
var providerDetails = new(require('../../pageObjects/providers/provider-details-page.js'));

describe('Provider Search Validation', function() {
    beforeEach(function() {
        jasmine.addMatchers(custommatcher.customMatchers);
        Utility.openApplication('');
    });
    it('ProvDir_1: Verify all fields and buttons are present and displayed', function() {
        expect(dirSearch.headerText.getText()).toContain(TestData.Header_SearchResultsPage);
        expect(dirSearch.location.isPresentAndDisplayed()).toBeTruthy();
        expect(dirSearch.deltaDentalPPO.isPresentAndDisplayed()).toBeTruthy();
        expect(dirSearch.deltaDentalPremier.isPresentAndDisplayed()).toBeTruthy();
        expect(dirSearch.deltaCareUSA.isPresentAndDisplayed()).toBeTruthy();
        expect(dirSearch.keywordSearch.isPresentAndDisplayed()).toBeTruthy();
        expect(dirSearch.findDentist.isPresentAndDisplayed()).toBeTruthy();
    });

    it('ProvDir_2: Verify the search results count and provider details ', function() {
         dirSearch.location.setText(TestData.ZipCode);
        dirSearch.keywordSearch.setText(TestData.keywordSearch);
        dirSearch.findDentist.click();
        expect(dirSearch.refineSearch.isPresentAndDisplayed()).toBeTruthy();
        expect(dirSearch.headerText.getText()).toContain(TestData.Header_SearchResultsPage);
        expect(dirSearch.providersListing.getCount()).toEqual(10);
        dirSearch.openView(TestData.Provider_Name1.PName);
        expect(providerDetails.letUsKnow.isPresentAndDisplayed()).toBeTruthy();
        providerDetails.letUsKnow.click();        
    });

});
