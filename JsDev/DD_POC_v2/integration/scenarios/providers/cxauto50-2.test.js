var TestData = require('../../testData/' + testDataEnv + '/providers/cxauto50-2.json');

var dirSearch = new(require('../../pageObjects/providers/directory-search-page.js'));
var providerDetails = new(require('../../pageObjects/providers/provider-details-page.js'));

describe('Providers CXAUTO:50-1 for Languages Search', function() {

    beforeEach(function() {
        jasmine.addMatchers(custommatcher.customMatchers);
        Utility.openApplication('');
    });

    dataProvider(TestData.Location, function(data, description) {
        var LangCount;
        it("Providers with Languages" + Utility.getapiurl('PROVIDERS', '', data.params) + " ", function(doneFn) {
            let apiurl = Utility.getapiurl('PROVIDERS', '', data.params);
            console.log("api url ------" + apiurl);
            frisby.globalSetup({
                timeout: (99 * 99999999)
            });
            browser.controlFlow().execute(function() {
                frisby.get(apiurl)
                    .then(function(res) {
                        let json = res.json;
                        LangCount = json.total;
                        json.providers.forEach(function(providers) {
                            let providerKeyAPI = Utility.getapiurl('PROVIDERKEY', providers.providerKey, data.params1);
                            frisby.get(providerKeyAPI)
                                .then(function(res1) {
                                    let json1 = res1.json;
                                    var Language = json1.practiceLocationLanguages;
                                    expect(Language).toContain(data.verifyLang);
                                })
                        })
                        dirSearch.location.setText(data.params.zipcode);
                        dirSearch.findDentist.click();
                        dirSearch.refineSearch.click();
                        dirSearch.filterMenuItem('Specialties').click();
                        dirSearch.selectSpecialities(data.params.specialty);
                        dirSearch.filterMenuItem('Languages').click();
                        dirSearch.languageFilter.selectByText(data.verifyLang);
                        dirSearch.apply.click();
                        dirSearch.getProvidersCount().then(function(refinelangCount) {
                            expect(Number(LangCount)).toBe(Number(refinelangCount));
                        });
                    })
                    .done(doneFn);
            })
        });
    });

});
