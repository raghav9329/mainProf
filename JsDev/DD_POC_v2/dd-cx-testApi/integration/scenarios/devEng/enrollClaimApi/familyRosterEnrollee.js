'use strict';
const Joi = frisby.Joi;

var TestData = require('../../../testData/devEng/enrollClaimApi/familyRosterEnrollee.json');

describe('Family Roster Enrollee API: ', function() {
    beforeEach(function() {
            jasmine.addMatchers(custommatcher.customMatchers);
        });
    dataProvider(TestData.enrolleetestdata, function(data, description) {

        it("TC :" +data.testCaseDesc + Utility.getapiurl('FAMILYENROLLEE', data.contractId, data.params) + " ", function(doneFn) {

            let apiurl = Utility.getapiurl('FAMILYENROLLEE', data.contractId, data.params);
            console.log("apiurl=" + apiurl)

            frisby
                .setup({
                    request: {
                        headers: {
                            'PersonId': data.personId,
                            'ClientKey': data.ClientKey,
                            'Content-Type': 'application/json'
                        }
                    }
                })
                .get(apiurl)
                .then(function(res) {
                    let json = res.json;
                    switch (res.status) {
                        case 200:

                            json.forEach(function(enrollee) {

                                expect(typeof enrollee.personId).toEqual('string',"Verify that 'personId' data type should be 'string'");


                                expect(typeof enrollee.memberId).toEqual('string',"Verify that 'memberId' data type should be 'string'");

                                if (enrollee.memberId == '01') {
                                    expect(enrollee.relationShip).toEqual('Primary',"Verify that 'relationShip' value should be "+enrollee.relationShip);
                                    expect(enrollee.primaryIndicator).toEqual('Y',"Verify that 'primaryIndicator' value should be "+enrollee.primaryIndicator);
                                } else {
                                    expect(enrollee.primaryIndicator).toEqual('N',"Verify that 'primaryIndicator' value should be "+enrollee.primaryIndicator);
                                }

                                let date = new Date();

                                if ((new Date(enrollee.coverageSpanEffectiveDate) < date) && (new Date(enrollee.coverageSpanEndDate) > date)) {
                                    expect(enrollee.eligibilityStatus).toEqual('GREEN',"Verify that 'eligibilityStatus' value should be "+enrollee.eligibilityStatus);
                                } else {
                                    expect(enrollee.eligibilityStatus).toEqual('GREY',"Verify that 'eligibilityStatus' value should be "+enrollee.eligibilityStatus);
                                }

                                if (enrollee.relationShip == 'Primary') {
                                    expect(enrollee.relationShipCode).toEqual('10',"Verify that 'relationShipCode' value should be "+enrollee.relationShipCode);
                                } else if (enrollee.relationShip == 'Spouse') {
                                    expect(enrollee.relationShipCode).toEqual('20',"Verify that 'relationShipCode' value should be "+enrollee.relationShipCode);
                                } else if (enrollee.relationShip == 'Child') {
                                    expect(enrollee.relationShipCode).toEqual('30',"Verify that 'relationShipCode' value should be "+enrollee.relationShipCode);
                                }

                                expect(typeof enrollee.firstName).toEqual('string',"Verify that 'firstName' data type should be 'string'");
                                expect(enrollee.firstName != null).toBe(true,"Verify that 'firstName' value is not null "+ enrollee.firstName);

                                expect(typeof enrollee.lastName).toEqual('string',"Verify that 'lastName' data type should be 'string'");
                                expect(enrollee.lastName != null).toBe(true,"Verify that 'lastName' value is not null "+ enrollee.lastName);

                                expect(typeof enrollee.birthDate).toEqual('string',"Verify that 'birthDate' data type should be 'string'");
                                expect(enrollee.birthDate != null).toBe(true,"Verify that 'birthDate' value is not null "+ enrollee.birthDate);

                            }) //forEach

                    }
                })
                .done(doneFn);
        });
    });


    dataProvider(TestData.enrolleetestdata1, function(data, description) {
        it("TC "+ data.testCaseDesc + Utility.getapiurl('FAMILYENROLLEE', data.contractId, data.params) + " ", function(doneFn) {

            let apiurl = Utility.getapiurl('FAMILYENROLLEE', data.contractId, data.params);
            console.log("apiurl=" + apiurl)
            frisby
                .setup({
                    request: {
                        headers: {
                            'PersonId': data.personId,
                            'ClientKey': data.ClientKey,
                            'Content-Type': 'application/json'
                        }
                    }
                })
                .get(apiurl)
                .then(function(res) {
                    let json = res.json;
                    switch (res.status) {

                        case 400:
                            expect(json.message).toEqual(data.message,"Verify that 'message' value should be "+ data.message);
                            break;
                        case 401:
                            expect(json.shortDescription).toEqual(data.shortDescription,"Verify that 'shortDescription' value should be "+ data.shortDescription);
                            expect(json.detailedDescription).toEqual(data.detailedDescription,"Verify that 'detailedDescription' value should be "+ data.detailedDescription);
                            break;
                        case 403:
                            expect(json.shortDescription).toEqual(data.shortDescription,"Verify that 'shortDescription' value should be "+ data.shortDescription);
                            expect(json.detailedDescription).toEqual(data.detailedDescription,"Verify that 'detailedDescription' value should be "+ data.detailedDescription);
                            break;
                        case 404:
                            expect(json.shortDescription).toEqual(data.shortDescription);
                            expect(json.detailedDescription).toEqual(data.detailedDescription,"Verify that 'detailedDescription' value should be "+ data.detailedDescription);
                            break;
                        case 500:
                            expect(json.shortDescription).toEqual(data.shortDescription,"Verify that 'shortDescription' value should be "+ data.shortDescription);
                            expect(json.detailedDescription).toEqual(data.detailedDescription,"Verify that 'detailedDescription' value should be "+ data.detailedDescription);
                            break;
                    }
                })
                .done(doneFn);
        });
    });
});