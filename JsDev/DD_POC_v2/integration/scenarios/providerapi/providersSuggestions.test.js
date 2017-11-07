'use strict';

var TestData = require('../../testData/providerapi/providersSuggestions.json');


describe('Providers', function() {
    // Providers API with multiple "Office ID's @ PracticeLocationNumber" and Verified Response with Office Names
    dataProvider(TestData.testdata, function(data, description) {
        it(" Suggestions REST API" + Utility.getapiurl('SUGGESTIONS', '', data.params) + " ", function(doneFn) {
            //Construction of REST API URL HOST+Resource +Params
            let apiurl = Utility.getapiurl('SUGGESTIONS', '', data.params);
            console.log(apiurl)
            //REST API call using Frisby Node Module & Verifying Json data with Jasmine Expect.
            frisby.get(apiurl)
                .then(function(res) {
                    let json = res.json;
                    json.practiceLocations.forEach(function(officeResp) {
                        expect(officeResp.officeName.toUpperCase()).toContain(data.verify.toUpperCase());
                    })

                })
                .done(doneFn)
        });

    });
});
