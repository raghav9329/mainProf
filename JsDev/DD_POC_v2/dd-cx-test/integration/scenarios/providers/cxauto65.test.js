var TestData        = require('../../testData/' + testDataEnv + '/providers/cxauto65.json');
var dirSearch       = new(require('../../pageObjects/providers/directory-search-page.js'));
var providerDetails = new(require('../../pageObjects/providers/provider-details-page.js'));

describe('Providers CXAUTO:65 ', function() {

    beforeEach(function() {
        jasmine.addMatchers(custommatcher.customMatchers);
        Utility.openApplication('');
    });

    var BackendTotal;

    dataProvider(TestData.testdata, function(data, description) {
        var ppoCount = 0;
        var premierCount = 0;
        var deltaCareCount = 0;
        it(" REST API with FreeText" + Utility.getapiurl('PROVIDERS', '', data.params) + " ", function(doneFn) {

            let apiurl = Utility.getapiurl('PROVIDERS', '', data.params);
            logger.info("api url ------" + apiurl);

            frisby.get(apiurl)
                .then(function(res) {
                    let json = res.json;

                    json.providers.forEach(function(providers) {
                        providers.providerNetworks.forEach(function(network) {
                            if (network.networkId == '2PPO') {
                                ppoCount++
                            }
                            if (network.networkId == '2PREMIER') {
                                premierCount++
                            }
                            if (network.networkId == '2DELTACARE') {
                                deltaCareCount++
                            }
                        });
                    })

                    console.log("Total=====" + json.total);
                    console.log("ppoCount=====" + ppoCount);
                    console.log("premierCount=====" + premierCount);
                    console.log("deltaCare=====" + deltaCareCount);
                    BackendTotal = ppoCount;

                    console.log("BackendTotal=====" + BackendTotal);


                    /*expect(json.providerNetworks.networkId.length).toBeGreaterThan(1);
                    
                    logger.info("Backend Count of Network ====" + BackendTotal);*/
                })
                .done(doneFn);
        });
        it('Verification Total Count of retrived result', function() {
            dirSearch.location.setText(data.verify.zipcode);
            dirSearch.keywordSearch.click();
            expect(dirSearch.deltaDentalPPO.isPresentAndDisplayed()).toBeTruthy();
            expect(dirSearch.deltaDentalPremier.isPresentAndDisplayed()).toBeTruthy();
            expect(dirSearch.deltaCareUSA.isPresentAndDisplayed()).toBeTruthy();

            if (data.Network == "DeltaDentalPPO") dirSearch.deltaDentalPPO.check();
            if (data.Network == "DeltaDentalPremier") dirSearch.deltaDentalPremier.check();
            if (data.Network == "DeltaCare") dirSearch.deltaCareUSA.check();
            // dirSearch.keywordSearch.setText(data.verify.free_text);

            dirSearch.findDentist.click();
            dirSearch.refineSearch.click();
            dirSearch.speciltyCheck();
            dirSearch.apply.click();
            dirSearch.getProvidersCount().then(function(totalCount) {
                logger.info("Front End Count of Network type====" + totalCount);
                var FrontendTotal = Number(totalCount);
                expect(BackendTotal).toBe(FrontendTotal);
            })
        });
    });

});
