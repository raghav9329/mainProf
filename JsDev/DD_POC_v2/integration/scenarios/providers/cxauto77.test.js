"use strict"
var TestData = require('../../testData/' + testDataEnv + '/providers/cxauto77.json');
var dirSearch = new(require('../../pageObjects/providers/directory-search-page.js'));
var providerDetails = new(require('../../pageObjects/providers/provider-details-page.js'));

describe('Providers CXAUTO:77 ', function() {
    beforeEach(function() {
        jasmine.addMatchers(custommatcher.customMatchers);
        Utility.openApplication('');
    });

    dataProvider(TestData.Location, function(data, description) {

        var pPname;
        it("Providers API" + Utility.getapiurl('PROVIDERS', '', data.params) + " ", function(doneFn) {
            let apiurl = Utility.getapiurl('PROVIDERS', '', data.params);
            console.log("api url ------" + apiurl);
            frisby.globalSetup({
                timeout: (99 * 99999999)
            });
            frisby.get(apiurl)
                .then(function(res) {
                    let json = res.json;
                    expect(json.providers.length).toBeGreaterThan(0);
                    var providerkey = json.providers[0].providerKey;
                    let providerKeyAPI = Utility.getapiurl('PROVIDERKEY', providerkey, data.params1);
                    console.log("providerKeyAPI=====" + providerKeyAPI);
                    frisby.get(providerKeyAPI)
                        .then(function(res1) {
                            let json = res1.json;
                            pPname = json.firstName + " " + json.lastName;

                        })
                })
                .done(doneFn);
        });

        it('ProvDir_1: Should verify Networks ($), ($$) & DeltaCare', function() {
            dirSearch.location.setText(data.params.zipcode);
            dirSearch.findDentist.click();
            dirSearch.refineSearch.click();
            dirSearch.filterMenuItem('Networks').click();
            dirSearch.iNDeltaCareUSA.check();
            dirSearch.apply.click();
            dirSearch.getProviderdetails(pPname, 'NETWORK').getText().then(function(Network) {
                console.log("Networsk======" + Network)
                if (Network.includes("PPO")) {
                    expect(dirSearch.getProviderdetails(pPname, 'NETWORK').getText()).toContain('PPO ($)');
                }
                if (Network.includes("Premier")) {
                    expect(dirSearch.getProviderdetails(pPname, 'NETWORK').getText()).toContain('Premier ($$)');
                }
                if (Network.includes("DeltaCare")) {
                    expect(dirSearch.getProviderdetails(pPname, 'NETWORK').getText()).toContain('DeltaCare USA');
                }
            })
        });
    });
});
