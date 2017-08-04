// CXINIT2-655 : Report Inaccurate Data page
/*
As a user, I want to see a page with options for providers and non-providers to submit a report for data inaccuracies in a provider's profile listing after selecting the button on a provider's profile
AC
Button on provider profile listings links to Report Inaccurate Directory Information page
Page displays Provider Details
Option for users: "I don't work at this office" opens a text box to submit an accuracy error
Option for providers: " I work at this office" links to this page
Breadcrumbs to go back to provider details and provider search listings page
*/

"use strict"
var TestData = require("../../testData/providers/cxinit2.655.json");
var dirSearch = new(require('../../pageObjects/providers/directory-search-page.js'));
var providerDetails = new(require('../../pageObjects/providers/provider-details-page.js'));

describe('Provider Search Validation', function() {
    beforeEach(function() {
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
        dirSearch.location.setText(TestData.HAddress_ZIP.PartialAddress);
        dir   dirSearch.location.setText(TestData.ZipCode);
        dirSearch.keywordSearch.setText(TestData.keywordSearch);
        browser.sleep(2000);
        dirSearch.findDentist.click();
        expect(dirSearch.refineSearch.isPresentAndDisplayed()).toBeTruthy();
        expect(dirSearch.headerText.getText()).toContain(TestData.Header_SearchResultsPage);
        expect(dirSearch.providersListing.getCount()).toEqual(10);
        dirSearch.openView(TestData.Provider_Name1.PName);
        expect(providerDetails.letUsKnow.isPresentAndDisplayed()).toBeTruthy();
        providerDetails.letUsKnow.click();
        //Application Need to Implement for
         // 1) I Work at this office
        // 2)I Donot work at this office.
        
    });

});
