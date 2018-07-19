'use strict';
const Joi = frisby.Joi;

var TestData = require('../../../testData/devEng/enrollClaimApi/omnibus_contractId.json');

describe('Omnibus Contract API: ', function() {
    dataProvider(TestData.positiveTestData, function(data, description) {
        beforeEach(function() {
            jasmine.addMatchers(custommatcher.customMatchers);
        });

        it("Validate Omnibus Contract API Response with list of the members with granted permission" + Utility.getapiurl('OMNIBUSCONTRACT', data.contractId, data.params) + " ", function(doneFn) {
            let apiurl = Utility.getapiurl('OMNIBUSCONTRACT', data.contractId, data.params);
            console.log("apiurl=" + apiurl)
            frisby
                .setup({
                    request: {
                        headers: {
                            'PersonId': data.personId,
                            'ClientKey':data.ClientKey,
                            'Content-Type': 'application/json'
                        }
                    }
                })
                .get(apiurl)
                .then(function(res) {
                    let json = res.json;
                    switch (res.status) {
                        case 200:
                            expect(json.contractId).toEqual(data.contractId);
                            expect(json.requester).toEqual(data.personId);
                            expect(json.memberInfo.length).toBeGreaterThan(0);
                            json.memberInfo.forEach(function(memberDetails, index) {
                                if (memberDetails.memberId == data.memberId) {
                                    data.memberInfo.forEach(function(memberData, index) {

                                        expect(memberDetails.memberId).toEqual(memberData.memberId);
                                        expect(memberDetails.memberName).toEqual(memberData.memberName);
                                        expect(memberDetails.memberAge).toEqual(memberData.memberAge);

                                        expect(memberDetails.omnibusInfo.permissionGranted).toEqual(memberData.permissionGranted);
                                        expect(memberDetails.omnibusInfo.message).toEqual(memberData.message);
                                        expect(memberDetails.phiEnabled).toEqual(memberData.phiEnabled);
                                    })

                                }
                            })
                    }
                })
                .done(doneFn);
        });
    });
    dataProvider(TestData.negativeTestData, function(data, description) {
        beforeEach(function() {
            jasmine.addMatchers(custommatcher.customMatchers);
        });
        it("Omnibus Contract API Negative Response for Invalid PersonId and Invalid ContractId " + Utility.getapiurl('OMNIBUSCONTRACT', data.contractId, data.params) + " ", function(doneFn) {
            let apiurl = Utility.getapiurl('OMNIBUSCONTRACT', data.contractId,data.params);
            console.log("apiurl=" + apiurl)
            frisby
                .setup({
                    request: {
                        headers: {
                            'PersonId': data.personId,
                            'ClientKey':data.ClientKey,
                            'Content-Type': 'application/json'
                        }
                    }
                })
                .get(apiurl)
                .then(function(res) {
                    let json = res.json;
                    switch (res.status) {
                        case 401:
                            expect(json.errorCode).toEqual(data.errorCode);
                            expect(json.shortDescription).toEqual(data.shortDescription);
                            expect(json.detailedDescription).toEqual(data.detailedDescription);
                            break;
                        case 400:
                            expect(json.errorCode).toEqual(data.errorCode);
                            expect(json.shortDescription).toEqual(data.shortDescription);
                            expect(json.detailedDescription).toEqual(data.detailedDescription);
                            break;
                    }
                })
                .done(doneFn);
        });
    });
});