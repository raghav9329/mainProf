'use strict';
const Joi = frisby.Joi;
var TestData = require('../../../testData/devEng/providerapi/providersFacilities.json');

describe('Providers Facilities: ', function() {
    // Providers API with multiple Facility ID and Verified Response with JSON data set
    beforeAll(function() {
        jasmine.addMatchers(custommatcher.customMatchers);
    });
    var json;
    dataProvider(TestData.testdata, function(data, description) {
        if (data.isExecution) {
            it('Retrieves facility details for the given facilityId :"' + Utility.getapiurl('FACILITIES', data.facilityId, data.params) + '"', function(doneFn) {
                //Construction of REST API URL HOST+Resource +Params
                let apiurl = Utility.getapiurl('FACILITIES', data.facilityId, data.params);
                //REST API call using Frisby Node Module & Verifying Status code and Json data set using Frisby expect.
                frisby.get(apiurl)
                    .then(function(res) {
                        json = res.json; // converting resp to JSON format
                        expect(res.status).toEqual(200,"Verify that satatus code should be 200");
                        expect(typeof json.facilityId).toEqual('string',"Verify that 'facilityId' data type should be 'string'");
                        expect(json.facilityId).toEqual(data.facilityId, "Verify that 'facilityId' should be "+data.facilityId);

                        expect(typeof json.name).toEqual('string',"Verify that 'name' data type should be 'string'");
                        expect(json.name != null).toBe(true,"Verify that name should not be NULL");
                    })
                    .expect('json', data.verify)
                    .done(doneFn);
            });
        }
        it("Validating distance of facility from a specific given latitude/longitude" + Utility.getapiurl('FACILITIES', data.facilityId, data.params) + " ", function() {


            expect(typeof json.distance).toEqual('number',"Verify that 'distance' data type should be 'number'");
            expect(json.distance != null).toBe(true,"Verify that distance should not be NULL");

            if (null != data.params.lat && null != data.params.long) {
                expect(Math.trunc(json.distance)).toEqual(Math.trunc(Utility.getDistanceBetweenTwoPoints(data.params.lat, data.params.long, json.address.latitude, json.address.longitude, "M")));
            } else {
                expect(json.distance).toEqual(0);
            }
        });
        it("Validating practiceLocationNumber & officeName of facility API" + Utility.getapiurl('FACILITIES', data.facilityId, data.params) + " ", function() {


            if (null != json.practiceLocation) {

                expect(typeof json.practiceLocation.practiceLocationNumber).toEqual('string');
                expect(json.practiceLocation.practiceLocationNumber != null).toBe(true);

                expect(typeof json.practiceLocation.officeName).toEqual('string');
                expect(json.practiceLocation.officeName != null).toBe(true);

            }
        });

        it("Validating isOpen of practiceHours in facility API" + Utility.getapiurl('FACILITIES', data.facilityId, data.params) + " ", function() {

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

    dataProvider(TestData.negativetestdata, function(data, description) {
        it("When Invalid FacilityId Is given Then Facility Details With Empty" + Utility.getapiurl('FACILITIES', data.facilityId, data.params) + " ", function() {
            expect('json', data.verify)
        });
        it("When Empty FacilityId Is given Then Throws Exception" + Utility.getapiurl('FACILITIES', data.facilityId, data.params) + " ", function() {
            expect('json', data.verify)
        });
    });

    dataProvider(TestData.customNetworktestdata, function(data, description) {
    
         it('Validating CustomProviderNetworks for the given facilityId :"' + Utility.getapiurl('FACILITIES', data.facilityId, data.params) + '"', function(doneFn) {
                //Construction of REST API URL HOST+Resource +Params
                let apiurl = Utility.getapiurl('FACILITIES', data.facilityId, data.params);
                //REST API call using Frisby Node Module & Verifying Status code and Json data set using Frisby expect.
            
                frisby.get(apiurl)
                    .then(function(res) {
                        json = res.json; // converting resp to JSON format
                        expect(res.status).toEqual(200,"Verify that satatus code should be 200");
                        expect(typeof json.facilityId).toEqual('string',"Verify that 'facilityId' data type should be 'string'");
                        expect(json.facilityId).toEqual(data.facilityId, "Verify that 'facilityId' should be "+data.facilityId);

                        expect(typeof json.name).toEqual('string',"Verify that 'name' data type should be 'string'");
                        expect(json.name != null).toBe(true,"Verify that name should not be NULL");

                        json.providers.forEach(function(provider) {
                        var networks = [];
                        provider.providerNetworks.forEach(function(network) {
                            networks.push(network.networkId);

                        })
                        expect(networks).toContain(data.verify.networkId, "Verify that newtworks contain custom network" + data.verify.networkId);
                    })
                        
                    })
                
                    .done(doneFn);
            });
    });
});


describe('Amgen Providers Facilities: ', function() {
    beforeAll(function() {
        jasmine.addMatchers(custommatcher.customMatchers);
    });
    dataProvider(TestData.amgentestdata, function(data, description) {
        it("When FacilityId Which Contains Providers with CustomProvider Networks" +
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