"use strict"
var TestData        = require('../../testData/' + testDataEnv + '/providers/cxauto76.json');
var dirSearch       = new(require('../../pageObjects/providers/directory-search-page.js'));
var providerDetails = new(require('../../pageObjects/providers/provider-details-page.js'));

describe('cxauto76: Provider Search Validation', function() {
    beforeEach(function() {
        jasmine.addMatchers(custommatcher.customMatchers);
        Utility.openApplication('');
    });

    dataProvider(TestData.Location, function(data, description) {
        it('Verefication of Provider Result', function() {
            dirSearch.location.setText(data.actual.Loc);
            dirSearch.findDentist.click();
            dirSearch.refineSearch.click();
            providerDetails.sortDistance.select();
            dirSearch.distanceSelect.selectByText(data.actual.Dist);
            dirSearch.filterMenuItem('Networks').click();
            dirSearch.selectNetwork(data.actual.Network);
            dirSearch.filterMenuItem('Specialties').click();
            dirSearch.selectSpecialities(data.actual.specialty);
            dirSearch.apply.click();
            dirSearch.countOfProviders.getText().then(function(providerResult) {
                expect(providerResult).toContain(data.expected.Loc);
                expect(providerResult).toContain(data.expected.Dist);
                expect(providerResult).toContain(data.expected.specialty1);
                expect(providerResult).toContain(data.expected.specialty2);
                expect(providerResult).toContain(data.expected.network1);
                expect(providerResult).toContain(data.expected.network2);
            })
        });
    });
});
