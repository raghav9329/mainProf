// CXINIT2-520 : Cutover Banner
/*
We need a banner link to be placed on the existing directory that will allow select users (logged out CA users) to click into the new directory experience for Alpha.
AC
Button/banner that takes users to new directory
- Carries over zip code information
Button on new directory that takes users to old experience
Can we get a URI to go back to the old version?
*/

"use strict"
var TestData = require('../../testData/'+testDataEnv+'/providers/cxinit2.520.json');
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
        dirSearch.location.setText(TestData.HAddress_ZIP.PartialAddress);
        dirSearch.selectHomeAddress(TestData.HAddress_ZIP.FullAddress);
        dirSearch.keywordSearch.setText(TestData.keywordSearch);
        dirSearch.findDentist.click();
        expect(dirSearch.refineSearch.isPresentAndDisplayed()).toBeTruthy();
        expect(dirSearch.headerText.getText()).toContain(TestData.Header_SearchResultsPage);
        expect(dirSearch.providersListing.getCount()).toEqual(10);
        var data = TestData.Provider_Name1;
        expect(dirSearch.getProviderdetails(data.PName, 'SPECIALTY')).toEqual(data.PSpeciality);
        expect(dirSearch.getProviderdetails(data.PName, 'PLACENAME')).toEqual(data.PPlace);
        expect(dirSearch.getProviderdetails(data.PName, 'ADDRESS')).toContain(data.PAddress);
        Utility.scrollToBottom();
        //Verify Banner with Back and Options
        //Note: Unable to navigate back to "Return to the old dentist search? " by clicking on "GoBack"
        //Displayed with Error Page This site can’t be reached www.deltadentalins.com’s server DNS address could not be found.
    });

});
