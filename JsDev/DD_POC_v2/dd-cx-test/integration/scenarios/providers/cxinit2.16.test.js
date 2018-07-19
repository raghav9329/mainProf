// CXINIT2-16 : Pagination support on UI and Node
/*
As a user, I want to be able to click through to the next page of provider results upon receiving a set of results with greater than 10 listings
AC
User can click through to the next page when search returns more than 10 results
User can go back to the previous page of results after clicking through to the next one
*/

"use strict"
var TestData        = require('../../testData/'+testDataEnv+'/providers/cxinit2.16.json');
var dirSearch       = new(require('../../pageObjects/providers/directory-search-page.js'));
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
        dirSearch.location.setText(TestData.HAddress_ZIP.PartialAddress);
        dirSearch.selectHomeAddress(TestData.HAddress_ZIP.FullAddress);
        dirSearch.findDentist.click();
        expect(dirSearch.refineSearch.isPresentAndDisplayed()).toBeTruthy();
        expect(dirSearch.headerText.getText()).toContain(TestData.Header_SearchResultsPage);
        expect(dirSearch.providersListing.getCount()).toEqual(10);
        var data = TestData.Provider_Name1;
        expect(dirSearch.getProviderdetails(data.PName, 'SPECIALTY')).toEqual(data.PSpeciality);
        expect(dirSearch.getProviderdetails(data.PName, 'PLACENAME')).toEqual(data.PPlace);
        expect(dirSearch.getProviderdetails(data.PName, 'ADDRESS')).toContain(data.PAddress);
        Utility.scrollToBottom();

        //Need to Implement Page Nation code including mouse hover
        
    });

});
