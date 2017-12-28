"use strict"
var TestData = require('../../testData/' + testDataEnv + '/providers/cxauto78.json');
var dirSearch = new(require('../../pageObjects/providers/directory-search-page.js'));
var providerDetails = new(require('../../pageObjects/providers/provider-details-page.js'));

describe('Providers CXAUTO:78 ', function() {
    beforeEach(function() {
        jasmine.addMatchers(custommatcher.customMatchers);
        Utility.openApplication('');
    });

    dataProvider(TestData.Location, function(data, description) {
        var pPname, pCity, pState;
        it("Providers API" + Utility.getapiurl('PROVIDERS', '', data.params) + " ", function(doneFn) {
            let apiurl = Utility.getapiurl('PROVIDERS', '', data.params);
            console.log("api url ------" + apiurl);
            frisby.globalSetup({
                timeout: (99 * 99999999)
            });
            frisby.get(apiurl)
                .then(function(res) {
                    let json = res.json;
                    var providerkey = json.providers[0].providerKey;
                    let providerKeyAPI = Utility.getapiurl('PROVIDERKEY', providerkey, data.params1);
                    console.log("providerKeyAPI=====" + providerKeyAPI);
                    frisby.get(providerKeyAPI)
                        .then(function(res1) {
                            let json = res1.json;
                            pPname = json.firstName + "" + json.middleName + "" + json.lastName;
                            pCity = json.address.city;
                            pState = json.address.state;
                        })
                })
                .done(doneFn);
        });

        it('ProvDir_1: Should verify Yelp Link', function() {
            dirSearch.location.setText(data.params.zipcode);
            dirSearch.findDentist.click();
            expect(dirSearch.getProviderdetails(pPname, 'PROVIDER')).toEqual(pPname);
            dirSearch.getProviderdetails(pPname, 'YELP').click();
            Utility.switchToWindow(1);
            expect(browser.getCurrentUrl()).toContain('https://www.yelp.com/search');
            expect(providerDetails.providerYelpFind.getValue()).toContain(pPname);
            expect(providerDetails.providerYelpNear.getValue()).toContain(pCity);
            expect(providerDetails.providerYelpNear.getValue()).toContain(pState);
            browser.close();
            Utility.switchToWindow(0);
            providerDetails.openView(pPname, 'VIEW');
            providerDetails.providerYelp.click();
            Utility.switchToWindow(1);
            expect(browser.getCurrentUrl()).toContain('https://www.yelp.com/search');
            expect(providerDetails.providerYelpFind.getValue()).toContain(pPname);
            expect(providerDetails.providerYelpNear.getValue()).toContain(pCity);
            expect(providerDetails.providerYelpNear.getValue()).toContain(pState);
            browser.close();
            Utility.switchToWindow(0);
            if (expect(providerDetails.providerPlaceName.isPresentAndDisplayed()).toBeTruthy()) {
                providerDetails.providerPName.click();
                providerDetails.providerYelp.click();
                Utility.switchToWindow(1);
                expect(browser.getCurrentUrl()).toContain('https://www.yelp.com/search');
                expect(providerDetails.providerYelpFind.getValue()).toContain(pPname);
                expect(providerDetails.providerYelpNear.getValue()).toContain(pCity);
                expect(providerDetails.providerYelpNear.getValue()).toContain(pState);
                browser.close();
                Utility.switchToWindow(0);
            }

        });
    });
});
