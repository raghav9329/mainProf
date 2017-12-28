/*
 * CXINIT2 - 642 : Search by language
 * Description : As a user, i want to be able to search the directory by languages spoken at the provider's office.
 */
 "use strict"
var TestData = require('../../testData/'+testDataEnv+'/providers/cxinit2.642.json');
var dirSearch = new(require('../../pageObjects/providers/directory-search-page.js'));
var providerDetails = new(require('../../pageObjects/providers/provider-details-page.js'));

describe('Provider Search Validation', function() {
    beforeEach(function() {
        jasmine.addMatchers(custommatcher.customMatchers);
        Utility.openApplication('');
    });

      dataProvider(TestData.Language, function(data, description) {
        if (data.ExecutionFlag) {
            it('ProvDir_1: Verify the functionality of view Dentists with language  "' + data.Lang + '"', function() {
                dirSearch.location.setText(TestData.ZipCode);
                dirSearch.findDentist.click();
                expect(dirSearch.headerTextProviderListError.isPresentAndDisplayed()).toBeFalsy();
                dirSearch.getProvidersCount().then(function(totalCount) {
                    dirSearch.refineSearch.click();
                    dirSearch.filterMenuItem('Languages').click();
                    expect(dirSearch.languageFilter.isPresentAndDisplayed()).toBeTruthy();
                    dirSearch.languageFilter.selectByText(data.Lang);
                    dirSearch.apply.click();
                    expect(dirSearch.headerTextProviderListError.isPresentAndDisplayed()).toBeFalsy();
                    dirSearch.getProvidersCount().then(function(refineCount) {
                        expect(Number(totalCount)).toBeGreaterThan(Number(refineCount));
                        providerDetails.verifyProviderLanguage(data.Lang,1)
                    });
                });
            });
        };
    });
   



});
