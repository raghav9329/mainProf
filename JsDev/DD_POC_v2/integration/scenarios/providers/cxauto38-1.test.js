var TestData = require('../../testData/' + testDataEnv + '/providers/cxauto38-1.json');

var dirSearch = new(require('../../pageObjects/providers/directory-search-page.js'));
var providerDetails = new(require('../../pageObjects/providers/provider-details-page.js'));

describe('Providers CXAUTO:38-1 ', function() {

    beforeEach(function() {
        jasmine.addMatchers(custommatcher.customMatchers);
        Utility.openApplication('');
    });
    var BackendTotal;

    dataProvider(TestData.testdata, function(data, description) {
        it(" REST API with FreeText: " + Utility.getapiurl('PROVIDERS', '', data.params) + " ", function(doneFn) {
            let apiurl = Utility.getapiurl('PROVIDERS', '', data.params);
            logger.info("api url ------" + apiurl);
            console.log("api url ------" + apiurl);

            frisby.get(apiurl)
                .then(function(res) {
                    let json = res.json;
                    expect(json.providers.length).toBeGreaterThan(0);
                    BackendTotal = json.total;
                    logger.info("Backend Count of Free Text====" + BackendTotal);
                })
                .done(doneFn);
        });
        it('Verification Total Count of retrived result: ' + data.verify.zipcode + ", " + data.verify.free_text, function() {
            dirSearch.keywordSearch.setText(data.verify.free_text);
            dirSearch.location.setText(data.verify.zipcode);
            dirSearch.findDentist.click();
            dirSearch.getProvidersCount().then(function(totalCount) {
                FrontendTotal = Number(totalCount);
                expect(BackendTotal).toBe(FrontendTotal);
            });
            providerDetails.providerName.getText().then(function(name) {
                pdName = name;
            });
            for (var i = 1; i <= 3; i++) {
                providerDetails.findIcon.click();
                dirSearch.getProvidersCount().then(function(count1) {
                    expect(FrontendTotal).toBe(Number(count1));
                    expect(providerDetails.providerName.getText()).toEqual(pdName);
                    expect(providerDetails.providerAddress.getText()).toContain(data.zipcode);
                });
            }

        });
    });



    dataProvider(TestData.testdata1, function(data, description) {
        it("Validate FreeText Search " + Utility.getapiurl('PROVIDERS', '', data.params) + " ", function(doneFn) {
            let apiurl = Utility.getapiurl('PROVIDERS', '', data.params);
            var pCount = 0;
            frisby.get(apiurl)
                .then(function(res) {
                    let json = res.json;
                    expect(json.providers.length).toBeGreaterThan(0);
                    json.providers.forEach(function(providers, index) {
                        pPname = providers.firstName + " " + providers.lastName;
                        if (pPname == data.verify.free_text) {
                            pCount++;
                            if (index < 10) {
                                expect(pPname).toEqual(data.verify.free_text);
                            }
                            return false;
                        }

                    })
                })
                .done(doneFn);
            dirSearch.location.setText(data.verify.zipcode);
            dirSearch.keywordSearch.setText(data.verify.free_text);
            dirSearch.findDentist.click();
            providerDetails.getandVerifyProvidersName(data.verify.free_text, pCount);
        });
    });

    dataProvider(TestData.testdata2, function(data, description) {
        it("Validate Auto Suggest FreeText Search", function() {
            dirSearch.location.setText(data.zipcode);
            dirSearch.keywordSearch.setText(data.free_text);
            if (expect(dirSearch.autoSearch.isPresentAndDisplayed())) {
                dirSearch.autoSearch.click();
            }
            dirSearch.findDentist.click();
            expect(dirSearch.resultFreeText.isPresentAndDisplayed()).toBeTruthy();
            expect(dirSearch.resultFreeText.getText()).toEqual(data.autoSuggest);

        });
    });
});
