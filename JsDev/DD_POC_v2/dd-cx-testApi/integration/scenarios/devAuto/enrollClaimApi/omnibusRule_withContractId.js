'use strict';
const Joi = frisby.Joi;

var TestData = require('../../../testData/devAuto/' + testDataEnv + '/enrollClaimApi/omnibus_contractId.json');

describe('Omnibus Contract API: ', function() {
    dataProvider(TestData.testData, function(data, description) {
        beforeEach(function() {
            jasmine.addMatchers(custommatcher.customMatchers);
        });

        it("TC: " + data.testCaseDesc + "  PersonID: " + data.personId + "  Contract ID: " + data.contractId + " ", function(doneFn) {
            let apiurl = Utility.getapiurl('OMNIBUSCONTRACT', data.contractId, data.params);
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
                            expect(json.requester).toEqual(data.verify.requester, "Verify that requester should be" + data.verify.requester);
                            expect(json.contractId).toEqual(data.verify.contractId, "Verify that contractId should be" + data.verify.contractId);
                            json.memberInfo.forEach(function(member, index) {
                                var mdata = data.verify.memberInfo[index];
                                expect(member.memberId).toEqual(mdata.memberId, "Verify that memberId should be" + mdata.memberId);
                                expect(member.memberName).toEqual(mdata.memberName, "Verify that memberName should be" + mdata.memberName);
                                expect(member.memberAge).toEqual(mdata.memberAge, "Verify that memberAge should be" + mdata.memberAge);
                                expect(member.omnibusInfo.permissionGranted).toEqual(mdata.omnibusInfo.permissionGranted, "Verify that permissionGranted should be" + mdata.omnibusInfo.permissionGranted);
                                expect(member.omnibusInfo.message).toEqual(mdata.omnibusInfo.message, "Verify that message should be" + mdata.omnibusInfo.message);
                                expect(member.phiEnabled).toEqual(mdata.phiEnabled, "Verify that phiEnabled should be" + mdata.phiEnabled);
                            })
                            break;
                        case 401:
                            expect(json.errorCode).toEqual(data.verify.errorCode, "Verify that errorCode should be" + data.verify.errorCode);
                            expect(json.shortDescription).toEqual(data.verify.shortDescription, "Verify that shortDescription should be" + data.verify.shortDescription);
                            expect(json.detailedDescription).toEqual(data.verify.detailedDescription, "Verify that detailedDescription should be" + data.verify.detailedDescription);
                            break;
                        case 404:
                            expect(json.errorCode).toEqual(data.verify.errorCode, "Verify that errorCode should be" + data.verify.errorCode);
                            expect(json.shortDescription).toEqual(data.verify.shortDescription, "Verify that shortDescription should be" + data.verify.shortDescription);
                            expect(json.detailedDescription).toEqual(data.verify.detailedDescription, "Verify that detailedDescription should be" + data.verify.detailedDescription);
                            break;
                        case 500:
                            expect(json.error).toEqual(data.verify.error, "Verify that error should be" + data.verify.error);
                            expect(json.message).toEqual(data.verify.message, "Verify that message should be" + data.verify.message);
                            break;
                    }
                })
                .done(doneFn);
        });
    });

});
