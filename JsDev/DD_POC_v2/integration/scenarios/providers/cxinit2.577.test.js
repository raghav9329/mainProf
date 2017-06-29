/*
 * CXINIT2 - 577 : Distance persistence
 * Description : User shown on the list results page should also be shown on the details page.
 */
"use strict"
var TestData = require("../../testData/providers/cxinit2.577.json");
var dirSearch = new(require('../../pageObjects/providers/directory-search-page.js'));
var providerDetails = new(require('../../pageObjects/providers/provider-details-page.js'));

describe('Provider Search Validation', function() {
    beforeEach(function() {
        Utility.openApplication('');
    });


    dataProvider(TestData.distance, function(data, description) {
        it('ProvDir_1: Verify the Provider details by selecting specific provider from provider search results', function() {
            dirSearch.location.setText(TestData.HAddress_ZIP.PartialAddress);
            dirSearch.selectHomeAddress(TestData.HAddress_ZIP.FullAddress);
            dirSearch.findDentist.click();
            expect(dirSearch.providersListing.getCount()).toEqual(10);
            expect(dirSearch.getProviderdetails(data.PName, 'PROVIDER')).toEqual(data.PName);
            expect(dirSearch.getProviderdetails(data.PName, 'SPECIALTY')).toEqual(data.PSpeciality);
            expect(dirSearch.getProviderdetails(data.PName, 'PLACENAME')).toEqual(data.PPlace);
            expect(dirSearch.getProviderdetails(data.PName, 'ADDRESS')).toContain(data.PAddress);
            expect(dirSearch.getProviderdetails(data.PName, 'MILAGE')).toEqual(data.PDistance);
            dirSearch.openView(data.PName);
            expect(providerDetails.providerName.getText()).toEqual(data.PName);
            expect(providerDetails.providerSpecialty.getText()).toEqual(data.PSpeciality);
            expect(providerDetails.providerPlace.getText()).toContain(data.PPlace);
            expect(providerDetails.providerAddress.getText()).toContain(data.PAddress);
            expect(providerDetails.providerDistance.getText()).toEqual(data.PDistance);

        });
    });


});
