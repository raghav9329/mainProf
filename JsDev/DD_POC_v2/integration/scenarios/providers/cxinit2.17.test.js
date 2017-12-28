// CXINIT2-17 : Free text - UI Interface
/*
As a user, I want to be able to see an interface for free text search.
AC
UI to support the following free text search options (for provider specialties):
Searchable attributes
-Provider Name (first/last)
-Office Name
-Facility Name
-Specialty
-Language
*/

"use strict"
var TestData = require('../../testData/'+testDataEnv+'/providers/cxinit2.17.json');
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
        dirSearch.keywordSearch.setText(TestData.keywordSearch1);
        dirSearch.findDentist.click();
        expect(dirSearch.getProviderdetails(TestData.Provider_Name1.PName, 'SPECIALTY')).toEqual(TestData.keywordSearch1);
               
    });
    it('ProvDir_3: Verify the search results count and provider details ', function() {
       dirSearch.location.setText(TestData.ZipCode);
        dirSearch.keywordSearch.setText(TestData.keywordSearch2);
        dirSearch.findDentist.click();
        providerDetails.verifyProviderLanguage(TestData.keywordSearch2,1);
               
    });

});
