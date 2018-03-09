/*
Description:
1. Enter location
2. Select Network
3. Click Find Dentist
4. Validate information in provider listing matches provider details. As of 6/21 the fields displayed are:
provider name
specialty
PLOC name, address
distance
5. Go back to home page to confirm initial search criteria is lost.
*/
"use strict"
var TestData = require('../../testData/'+testDataEnv+'/providers/cxinit2.811.json');
var dirSearch = new(require('../../pageObjects/providers/directory-search-page.js'));
var providerDetails = new(require('../../pageObjects/providers/provider-details-page.js'));

describe('Provider Search Validation', function() {
    beforeEach(function() {
        jasmine.addMatchers(custommatcher.customMatchers);
        Utility.openApplication('');
    });


    it('ProvDir_1: Validate informtion in provider listing matches provider details', function() {
        dirSearch.location.setText(TestData.HAddress_ZIP.PartialAddress);
        dirSearch.selectHomeAddress(TestData.HAddress_ZIP.FullAddress);
        dirSearch.findDentist.click();
        dirSearch.refineSearch.click();
        providerDetails.sortDistance.select();
        dirSearch.distanceSelect.selectByText(TestData.ProviderData.Distance);
        dirSearch.filterMenuItem('Specialties').click();
        dirSearch.generalDentist.check();
        dirSearch.filterMenuItem('Networks').click();
        dirSearch.deltaDentalPremier.check();
        dirSearch.deltaDentalPPO.check();
        dirSearch.deltaCareUSA.check();
        dirSearch.apply.click();
        providerDetails.verifyProviderLanguage(TestData.ProviderData.LANGUAGE,12);
       // providerDetails.verifyProviderDetails(TestData.ProviderData);

        // providerDetails.verifyProviderList(TestData.ProviderData);

    });
});
