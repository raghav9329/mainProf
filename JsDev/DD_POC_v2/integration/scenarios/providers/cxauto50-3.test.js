var TestData = require('../../testData/' + testDataEnv + '/providers/cxauto50-3.json');

var dirSearch = new(require('../../pageObjects/providers/directory-search-page.js'));
var providerDetails = new(require('../../pageObjects/providers/provider-details-page.js'));

describe('Providers CXAUTO:50-1 for Distance Search', function() {

    beforeEach(function() {
        jasmine.addMatchers(custommatcher.customMatchers);
        Utility.openApplication('');
    });

    dataProvider(TestData.Location, function(data, description) {
        var DistCount;
        var ascDistance = [];
        it("Providers with Distance" + Utility.getapiurl('PROVIDERS', '', data.params) + " ", function(doneFn) {
            let apiurl = Utility.getapiurl('PROVIDERS', '', data.params);
            console.log("api url ------" + apiurl);
            frisby.globalSetup({
                timeout: (99 * 99999999)
            });
            browser.controlFlow().execute(function() {
                frisby.get(apiurl)
                    .then(function(res) {
                        let json = res.json;
                        DistCount = json.total;
                        var count = 0
                        json.providers.forEach(function(providers) {
                            if (providers.distance <= data.params.distance) {
                                count++;
                            }
                        })
                        expect(DistCount).toBe(count);
                        dirSearch.location.setText(data.params.zipcode);
                        dirSearch.findDentist.click();
                        dirSearch.refineSearch.click();
                        providerDetails.sortDistance.select();
                        dirSearch.distanceSelect.selectByText(data.verifyDist);
                        dirSearch.filterMenuItem('Specialties').click();
                        dirSearch.selectSpecialities(data.params.specialty);
                        dirSearch.apply.click();
                        dirSearch.getProvidersCount().then(function(refineDistCount) {
                            expect(Number(DistCount)).toBe(Number(refineDistCount));
                        });
                        providerDetails.asceDist.getElements().getText().then(function(dist) {
                            dist.forEach(function(ele) {
                                ascDistance.push(Number(ele.replace("<", '').slice(0, -3)));
                            })
                            expect(ascDistance).toEqual(ascDistance.sort())
                        });

                    })
                    .done(doneFn);
            })
        });
    });

});
