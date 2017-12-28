//cxauto Yelp Verefication

"use strict"
var TestData = require('../../testData/' + testDataEnv + '/providers/cxautoYelp.json');
var dirSearch = new(require('../../pageObjects/providers/directory-search-page.js'));
var providerDetails = new(require('../../pageObjects/providers/provider-details-page.js'));

describe('Providers CXAUTO Yelp ', function() {
    beforeEach(function() {
        jasmine.addMatchers(custommatcher.customMatchers);
        Utility.openApplication('');
    });

    dataProvider(TestData.Location, function(data, description) {
        var pPname, pPname1, pCity, pState, yelpId, yelpUrl, yelpReviewCount, yelpRating;
        it("Providers API" + Utility.getapiurl('PROVIDERS', '', data.params) + " ", function(doneFn) {
            let apiurl = Utility.getapiurl('PROVIDERS', '', data.params);
            console.log("api url ------" + apiurl);
            frisby.globalSetup({
                timeout: (99 * 99999999)
            });
            frisby.get(apiurl)
                .then(function(res) {
                    let json1 = res.json;
                    let json = json1.providers[0];
                    pPname = json.firstName + " " + json.lastName;
                    pPname1 = json.firstName + " " + json.middleName + " " + json.lastName;;
                    pCity = json.address.city;
                    pState = json.address.state;
                    yelpId = json.yelp.yelpId;
                    yelpUrl = json.yelp.yelpUrl;
                    yelpReviewCount = json.yelp.yelpReviewCount;
                    yelpRating = json.yelp.yelpRating;
                })
                .done(doneFn);
        });


        it('ProvDir_1: Should verify Yelp Link', function() {
            dirSearch.location.setText(data.params.zipcode);
            dirSearch.findDentist.click();
            expect(dirSearch.getProviderdetails(pPname, 'PROVIDER')).toEqual(pPname);
            expect(providerDetails.yelpReviewCount.getText()).toContain(yelpReviewCount);
            expect(providerDetails.yelpRating.getAttribute("alt")).toContain(yelpRating);
            dirSearch.yelpRating.click();
            Utility.switchToWindow(1);
            expect(browser.getCurrentUrl()).toContain(yelpUrl);
            expect(providerDetails.providerYelpName.getText()).toContain(pPname1);
            expect(providerDetails.providerYelpNear.getValue()).toContain(pCity);
            expect(providerDetails.providerYelpNear.getValue()).toContain(pState);
            browser.close();
            Utility.switchToWindow(0);
            providerDetails.openView(pPname, 'VIEW');
            providerDetails.yelpRating.click();
            Utility.switchToWindow(1);
            expect(browser.getCurrentUrl()).toContain(yelpUrl);
            expect(providerDetails.providerYelpName.getText()).toContain(pPname1);
            expect(providerDetails.providerYelpNear.getValue()).toContain(pCity);
            expect(providerDetails.providerYelpNear.getValue()).toContain(pState);
            browser.close();
            Utility.switchToWindow(0);
            if (expect(providerDetails.providerPlaceName.isPresentAndDisplayed()).toBeTruthy()) {
                providerDetails.providerPName.click();
                providerDetails.yelpRating.click();
                Utility.switchToWindow(1);
                expect(browser.getCurrentUrl()).toContain(yelpUrl);
                expect(providerDetails.providerYelpName.getText()).toContain(pPname1);
                expect(providerDetails.providerYelpNear.getValue()).toContain(pCity);
                expect(providerDetails.providerYelpNear.getValue()).toContain(pState);
                browser.close();
                Utility.switchToWindow(0);
            }

        });
    });

});
