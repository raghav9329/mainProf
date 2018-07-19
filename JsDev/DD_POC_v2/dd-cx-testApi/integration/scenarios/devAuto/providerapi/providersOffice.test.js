'use strict';

var TestData = require('../../testData/' + testDataEnv + '/providerapi/providersOffice.json');


describe('Providers', function() {
    // Providers API with multiple "Office ID's @ PracticeLocationNumber" and Verified Response with JSON data sets
    dataProvider(TestData.testdata, function(data, description) {
        it(" Suggestions REST API" + Utility.getapiurl('LOCATIONS', data.practiceLocationNumber, data.params) + " ", function(doneFn) {
            //Construction of REST API URL HOST+Resource +Params
            let apiurl = Utility.getapiurl('LOCATIONS', data.practiceLocationNumber, data.params);
            //REST API call using Frisby Node Module & Verifying Status code and Json data set using Frisby expect.
            frisby.get(apiurl)
                .expect('json', data.verify)
                .done(doneFn)
        });

        dataProvider(TestData.negativetestdata, function(data, description) {
            it("When Invalid PracticeLocationNumber Is given Then PracticeLocation Details With Empty" + Utility.getapiurl('LOCATIONS', data.practiceLocationNumber, data.params) + " ", function() {
                expect('json', data.verify)
            });
            it("When Empty PracticeLocationNumber Is given Then Throws Exception" + Utility.getapiurl('LOCATIONS', data.practiceLocationNumber, data.params) + " ", function() {
                expect('json', data.verify)
            });
        });
    });

});


describe('PracticeLocation ProviderNetworks & PracticeHours Validation', function() {

    dataProvider(TestData.practiceLocationWithMultipleProviders, function(data, description) {

        var json;

        it("When Valid PracticeLocationNumber Which Consists Of Multiple Providers Is Given Validating providerNetworks  Of PracticeLocation Against the Unique ProviderNetworks" + Utility.getapiurl('FACILITIES', data.facilityId, data.params) + " ", function(doneFn) {


            var practiceLocationUrl = Utility.getapiurl('LOCATIONS', data.practiceLocationNumber, data.params);

            frisby.get(practiceLocationUrl)
                .expect('json', data.verify)
                .then(function(res) {
                    json = res.json; // converting resp to JSON format
                    expect(res.status).toEqual(200);

                    if (null != json.providers) {

                        let providerNetworks = [];

                        // Collecting all Providers related ProviderNetwork(s) into providerNetworks array
                        json.providers.forEach(function(element) {
                            let networks = element.providerNetworks;
                            networks.forEach(function(element) {
                                providerNetworks.push(JSON.stringify(element));
                            })
                        })

                        let dup = Utility.getDuplicateElementsFromArray(providerNetworks);

                        // Verifying against practiceLocation providerNetworks whether that providerNetwork is part of getDuplicateElementsFromArray list or not?

                        json.providerNetworks.forEach(function(element) {
                            expect(dup.indexOf(JSON.stringify(element))).toBeGreaterThan(-1);
                        })
                    }
                })
                .done(doneFn);
        });


        it("Validating isOpen of practiceHours in PracticeLocation API" + Utility.getapiurl('LOCATIONS', data.practiceLocationNumber, data.params) + " ", function() {

            if (null != json.practiceHours) {

                let weekDays = [];
                weekDays.push(json.practiceHours.mondayHours);
                weekDays.push(json.practiceHours.tuesdayHours);
                weekDays.push(json.practiceHours.wednesdayHours);
                weekDays.push(json.practiceHours.thursdayHours);
                weekDays.push(json.practiceHours.fridayHours);
                weekDays.push(json.practiceHours.saturdayHours);
                weekDays.push(json.practiceHours.sundayHours);
                weekDays.forEach(function(dayTimings) {
                    if ('' !== dayTimings.openTime && '' != dayTimings.closeTime) {
                        expect(dayTimings.isOpen).toBe(true);
                    } else {
                        expect(dayTimings.isOpen).toBe(false);
                    }
                })
            }
        });

    });
});


describe('Amgen Providers PracticeLocation: ', function() {
    dataProvider(TestData.amgentestdata, function(data, description) {
        it("When Valid PracticeLocationNumber Is Given Which Contains Providers with CustomProvider Networks" +
            "If given sourceNetwork is present in CustomProviderNetworks" +
            "If provider related providerNetworks does not contains given targetNetwork And" +
            "If sourceNetwork and targetNetwork are same Is given" +
            "Then that specific provider providerNetworks should have both customProviderNetworks and providerNetworks" + +Utility.getapiurl('FACILITIES', data.facilityId, data.params) + " ",
            function(doneFn) {

                var amgenapiurl = Utility.getapiurl('FACILITIES', data.facilityId, data.params);

                frisby.get(amgenapiurl)
                    .expect('json', data.verify)
                    .then(function(res) {
                        let amgenJson = res.json; // converting resp to JSON format
                        expect(res.status).toEqual(200);

                        let networks = [];
                        let networkIdNames = [];

                        amgenJson.providers.forEach(function(element) {
                            let providerNetworks = element.providerNetworks;
                            providerNetworks.forEach(function(element) {
                                networks.push(element);
                            })
                            networks.forEach(function(element) {
                                networkIdNames.push(element.networkId);
                            })
                        })


                        if ('' !== data.params.sourceNetwork && null != data.params.sourceNetwork && '' !== data.params.targetNetwork && null != data.params.targetNetwork && data.params.sourceNetwork == data.params.targetNetwork) {
                            expect(networkIdNames.indexOf(data.params.sourceNetwork)).toBeGreaterThan(-1);
                        } else if (('' !== data.params.targetNetwork && null != data.params.targetNetwork) && data.params.targetNetwork == "2PPO" || data.params.targetNetwork == "2ppo") {
                            expect(networkIdNames.indexOf(data.params.targetNetwork)).toBeGreaterThan(-1);
                        } else if (('' !== data.params.targetNetwork && null != data.params.targetNetwork) && data.params.targetNetwork == "2PREMIER" || data.params.targetNetwork == "2premier") {
                            expect(networkIdNames.indexOf(data.params.targetNetwork)).toBeGreaterThan(-1);
                        } else if (('' !== data.params.targetNetwork && null != data.params.targetNetwork) && data.params.targetNetwork == "2DELTACARE" || data.params.targetNetwork == "2deltacare") {
                            expect(networkIdNames.indexOf(data.params.targetNetwork)).toBeGreaterThan(-1);
                        }
                    })
                    .done(doneFn);
            });
    });
});