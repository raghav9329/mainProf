//cxauto Yelp Verefication

"use strict"
var TestData        = require('../../testData/' + testDataEnv + '/providers/cxautoYelp.json');
var dirSearch       = new(require('../../pageObjects/providers/directory-search-page.js'));
var providerDetails = new(require('../../pageObjects/providers/provider-details-page.js'));

describe('Providers CXAUTO Yelp ', function() {
    beforeEach(function() {
        jasmine.addMatchers(custommatcher.customMatchers);
        Utility.openApplication('');
    });

    dataProvider(TestData.Location, function(data, description) {
        var pPname, pPname1, pCity, pState, officeNumber, address, latitude, longitude, yelpUrl, offName;
        it("Providers API" + Utility.getapiurl('PROVIDERS', '', data.params) + " ", function(doneFn) {
            let apiurl = Utility.getapiurl('PROVIDERS', '', data.params);
            console.log("api url ------" + apiurl);
            frisby.globalSetup({
                timeout: (99 * 99999999),
            });
            frisby.get(apiurl)
                .then(function(res) {
                    let json1 = res.json;
                    let json = json1.providers[0];
                    pPname = json.firstName + " " + json.lastName;
                    pPname1 = json.firstName + " " + json.middleName + " " + json.lastName;;
                    pCity = json.address.city;
                    pState = json.address.state;
                    offName = json.officeName
                    officeNumber = json.officePhone;
                    address = json.address.addressLine;
                    latitude = json.address.latitude;
                    longitude = json.address.longitude;
                })
                .done(doneFn);
        });

        it('Yelp API Validation', function(done) {
            let phoneNumber = officeNumber.replace(/[^0-9 ]|\s/g, "")
            let apiurl = 'https://api.yelp.com/v3/businesses/search/phone?phone=+1' + phoneNumber;
            frisby
                .setup({
                    request: {
                        headers: {
                            'Authorization': 'Bearer p2MpcKr8YGllap6AN_vF0gy0fP0vB_Ouu1xA-WEKcV5-n75RXye9JQy0mo-Ml57UyClDp4MxiztRthjnM6gI1AXoYC3jgEG9bgMVb9828XFE0rYG6k3USRdJN21YWnYx',
                            'Content-Type': 'application/json'
                        }
                    }
                })
                .get(apiurl)
                .then(function(res) {
                    let json1 = res.json;
                    json1.businesses.forEach(function(providers) {
                        if (providers.name.includes(pPname)) {
                            expect(providers.location.address1 + ", " + providers.location.address2).toContain(address);
                            expect(providers.display_phone).toEqual(officeNumber);
                            expect(providers.location.city).toEqual(pCity);
                            expect(providers.location.state).toEqual(pState);
                            expect(providers.location.zip_code).toEqual(data.params.zipcode);
                        }
                    });

                })
                .done(done);
        });


        it('ProvDir_1: Should verify Yelp Link', function() {
            dirSearch.location.setText(data.params.zipcode);
            dirSearch.findDentist.click();
            expect(dirSearch.getProviderdetails(pPname, 'PROVIDER')).toEqual(pPname);
            dirSearch.providerYelp.click();
            Utility.switchToWindow(1);
            expect(providerDetails.providerYelpNear.getValue()).toContain(pCity);
            expect(providerDetails.providerYelpNear.getValue()).toContain(pState);
            browser.close();
            Utility.switchToWindow(0);
            providerDetails.openView(pPname, 'VIEW');
            providerDetails.providerYelp.click();
            Utility.switchToWindow(1);
            expect(providerDetails.providerYelpNear.getValue()).toContain(pCity);
            expect(providerDetails.providerYelpNear.getValue()).toContain(pState);
            browser.close();
            Utility.switchToWindow(0);
            if (expect(providerDetails.providerPlaceName.isPresentAndDisplayed()).toBeTruthy()) {
                providerDetails.providerPName.click();
                providerDetails.providerYelp.click();
                Utility.switchToWindow(1);
                expect(providerDetails.providerYelpNear.getValue()).toContain(pCity);
                expect(providerDetails.providerYelpNear.getValue()).toContain(pState);
                browser.close();
                Utility.switchToWindow(0);
            }

        });
    });

});
