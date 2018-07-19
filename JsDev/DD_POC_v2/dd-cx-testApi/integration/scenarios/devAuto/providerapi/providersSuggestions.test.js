'use strict';

var TestData = require('../../testData/' + testDataEnv + '/providerapi/providersSuggestions.json');


describe('Provider Directory Search service Suggestions API : ', function() {
    beforeEach(function() {
            jasmine.addMatchers(custommatcher.customMatchers);
        });
    // Providers API with multiple "Office ID's @ PracticeLocationNumber" and Verified Response with Office Names
    dataProvider(TestData.testdata, function(data, description) {
        it(" Given freeText is "+data.params.text+" and validating the response with practiceLoction officeName  " + Utility.getapiurl('SUGGESTIONS', '', data.params) + " ", function(doneFn) {
            let apiurl = Utility.getapiurl('SUGGESTIONS', '', data.params);
            console.log(apiurl)
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

    it(" Given  freeText is "+TestData.test6.params.text+" and validating the response with providers firstName  " + Utility.getapiurl('SUGGESTIONS', '', TestData.test6.params) + " ", function(doneFn) {
            let data = TestData.test6;
            let apiurl = Utility.getapiurl('SUGGESTIONS', '', data.params);
            console.log(apiurl)
            frisby.get(apiurl)
                .then(function(res) {
                    let json = res.json;
                    json.providers.forEach(function(provider) {
                        expect(provider.firstName.toUpperCase()).toContain(data.verify.toUpperCase());
                    })

                })
                .done(doneFn)
        });

    it(" Given  freeText is "+TestData.test6.params.text+" and validating the response with practiceLoction officeName  " + Utility.getapiurl('SUGGESTIONS', '', TestData.test6.params) + " ", function(doneFn) {
            let data = TestData.test6;
            let apiurl = Utility.getapiurl('SUGGESTIONS', '', data.params);
            console.log(apiurl)
            frisby.get(apiurl)
                .then(function(res) {
                    let json = res.json;
                    json.practiceLocations.forEach(function(officeResp) {
                        expect((officeResp.officeName.toUpperCase())).toContain(data.verify.toUpperCase());
                    })

                })
                .done(doneFn)
        });
    it(" Given  freeText is "+TestData.test7.params.text+" Lat = "+TestData.test7.params.lat+
        "Long = "+TestData.test7.params.long+"and validating the response with practiceLoction officeName  " + Utility.getapiurl('SUGGESTIONS', '', TestData.test6.params) + " ", function(doneFn) {
            let data = TestData.test7;
            let apiurl = Utility.getapiurl('SUGGESTIONS', '', data.params);
            console.log(apiurl)
            frisby.get(apiurl)
                .then(function(res) {
                    let json = res.json;
                    json.practiceLocations.forEach(function(officeResp) {
                        expect((officeResp.officeName.toUpperCase())).toContain(data.verify.toUpperCase());
                    })

                })
                .done(doneFn)
        });
    it(" Given  freeText is "+TestData.test7.params.text+" Lat = "+TestData.test7.params.lat+
        "Long = "+TestData.test7.params.long+"and validating the response with practiceLoction officeName  " + Utility.getapiurl('SUGGESTIONS', '', TestData.test7.params) + " ", function(doneFn) {
            let data = TestData.test7;
            let apiurl = Utility.getapiurl('SUGGESTIONS', '', data.params);
            console.log(apiurl)
            frisby.get(apiurl)
                .then(function(res) {
                    let json = res.json;
                    json.providers.forEach(function(provider) {
                        expect((provider.firstName.toUpperCase())).toContain(data.verify.toUpperCase());
                    })

                })
                .done(doneFn)
        });
    it(" Given  freeText is "+TestData.test8.params.text+" Lat = "+TestData.test8.params.lat+
        "Long = "+TestData.test8.params.long+"and validating the response with practiceLoction officeName  " + Utility.getapiurl('SUGGESTIONS', '', TestData.test8.params) + " ", function(doneFn) {
            let data = TestData.test8;
            let apiurl = Utility.getapiurl('SUGGESTIONS', '', data.params);
            console.log(apiurl)
            frisby.get(apiurl)
                .then(function(res) {
                    let json = res.json;
                    json.specialties.forEach(function(spec) {
                        expect((spec.specialty.toUpperCase())).toContain(data.verify.toUpperCase());
                    })

                })
                .done(doneFn)
        });
    it(" Given  freeText is Empty and then return bad request as response  " + Utility.getapiurl('SUGGESTIONS', '', TestData.test9.params) + " ", function(doneFn) {
            let data = TestData.test9;
            let apiurl = Utility.getapiurl('SUGGESTIONS', '', data.params);
            console.log(apiurl)
            frisby.get(apiurl)
                .then(function(res) {
                    let json = res.json;
                    expect(res.status).toEqual(400);
                    expect(json.message).toEqual(data.verify.message);

                })
                .done(doneFn)
        });
});

