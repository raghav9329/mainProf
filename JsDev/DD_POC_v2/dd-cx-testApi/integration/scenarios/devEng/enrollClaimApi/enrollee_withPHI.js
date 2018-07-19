'use strict';
const Joi = frisby.Joi;

var TestData = require('../../../testData/devEng/enrollClaimApi/enrollee_withPHI.json');

describe('Enrollee API for PHI Flag: ', function() {
    dataProvider(TestData.testdata, function(data, description) {

        beforeEach(function() {
            jasmine.addMatchers(custommatcher.customMatchers);
        });

        it("Enrollee TestCase for PHI rules: " + data.testCaseDes + " Person ID: " + data.PersonId + " Enrollee Id" + data.enrolleeId + " Client Key" + data.ClientKey + "", function(doneFn) {
            let apiurl = Utility.getapiurl('ENROLLEES', data.enrolleeId);
            console.log("apiurl=" + apiurl)
            frisby
                .setup({
                    request: {
                        headers: {
                            'PersonId': data.PersonId,
                            'ClientKey': data.ClientKey,
                            'Content-Type': 'application/json'
                        }
                    }
                })
                .get(apiurl)
                .then(function(res) {
                    let respjson = res.json;
                    switch (res.status) {
                        case 200:
                            expect(typeof respjson.enrolleeId).toEqual('string', "Verify that 'enrolleeId' data type should be 'string'");
                            expect(typeof respjson.enrolleeName).toEqual('string', "Verify that 'enrolleeName' data type should be 'string'");
                            expect(typeof respjson.enrolleeType).toEqual('string', "Verify that 'enrolleeType' data type should be 'string'");
                            expect(respjson.enrolleeId).toEqual(data.verify.enrolleeId, "Verify that the 'enrolleeId' Shoud be: " + data.verify.enrolleeId);
                            expect(respjson.enrolleeName).toEqual(data.verify.enrolleeName, "Verify that the 'enrolleeName' Shoud be: " + data.verify.enrolleeName);
                            expect(respjson.enrolleeType).toEqual(data.verify.enrolleeType, "Verify that the 'enrolleeType' Shoud be: " + data.verify.enrolleeType);
                            respjson.enrolleeClaimSummaryList.forEach(function(respECSL, index) {
                                var dataECSL = data.verify.enrolleeClaimSummaryList[index];
                                expect(respECSL.personId).toEqual(dataECSL.personId, "Verify that the 'personId' Shoud be: " + dataECSL.personId);
                                expect(respECSL.claimId).toEqual(dataECSL.claimId, "Verify that the 'claimId' Shoud be: " + dataECSL.claimId);
                                expect(respECSL.claimStatus).toEqual(dataECSL.claimStatus, "Verify that the 'claimStatus' Shoud be: " + dataECSL.claimStatus);
                                expect(respECSL.dateOfService).toEqual(dataECSL.dateOfService, "Verify that the 'dateOfService' Shoud be: " + dataECSL.dateOfService);
                                expect(respECSL.providerDetails.providerKey).toEqual(dataECSL.providerDetails.providerKey, "Verify that the 'providerKey' Shoud be: " + dataECSL.providerDetails.providerKey);
                                expect(respECSL.providerDetails.providerName).toEqual(dataECSL.providerDetails.providerName, "Verify that the 'providerName' Shoud be: " + dataECSL.providerDetails.providerName);
                                expect(respECSL.providerDetails.active).toEqual(dataECSL.providerDetails.active, "Verify that the 'active' Shoud be: " + dataECSL.providerDetails.active);
                                expect(respECSL.providerDetails.gender).toEqual(dataECSL.providerDetails.gender, "Verify that the 'gender' Shoud be: " + dataECSL.providerDetails.gender);
                                expect(respECSL.providerDetails.contactNumber).toEqual(dataECSL.providerDetails.contactNumber, "Verify that the 'contactNumber' Shoud be: " + dataECSL.providerDetails.contactNumber);
                                respECSL.procedureDetails.forEach(function(respProcDetails, index) {
                                    var dataProcDetails = dataECSL.procedureDetails[index];
                                    expect(respProcDetails.procedureCode).toEqual(dataProcDetails.procedureCode, "Verify that the 'procedureCode' Shoud be: " + dataProcDetails.procedureCode);
                                    expect(respProcDetails.procedureDescription).toEqual(dataProcDetails.procedureDescription, "Verify that the 'procedureDescription' Shoud be: " + dataProcDetails.procedureDescription);
                                    expect(respProcDetails.procedureCount).toEqual(dataProcDetails.procedureCount, "Verify that the 'procedureCount' Shoud be:" + dataProcDetails.procedureCount);
                                })
                                expect(respECSL.enrolleeResponsibilityAmount).toEqual(dataECSL.enrolleeResponsibilityAmount, "Verify that the 'enrolleeResponsibilityAmount' Shoud be: " + dataECSL.enrolleeResponsibilityAmount);
                            })
                            break;
                        case 400:
                            expect(respjson.errorCode).toEqual(data.verify.errorCode, "Verify that the 'ErrorCode' Shoud be: " + data.verify.errorCode);
                            expect(respjson.shortDescription).toEqual(data.verify.shortDescription, "Verify that the 'shortDescription' Shoud be: " + data.verify.shortDescription);
                            expect(respjson.detailedDescription).toEqual(data.verify.detailedDescription, "Verify that the 'detailedDescription' Shoud be: " + data.verify.detailedDescription);
                            break;
                        case 401:
                            expect(respjson.errorCode).toEqual(data.verify.errorCode, "Verify that the 'ErrorCode' Shoud be:" + data.verify.errorCode);
                            expect(respjson.shortDescription).toEqual(data.verify.shortDescription, "Verify that the 'shortDescription' Shoud be: " + data.verify.shortDescription);
                            expect(respjson.detailedDescription).toEqual(data.verify.detailedDescription, "Verify that the 'detailedDescription' Shoud be: " + data.verify.detailedDescription);
                            break;
                        case 403:
                            expect(respjson.errorCode).toEqual(data.verify.errorCode, "Verify that the 'ErrorCode' Shoud be" + data.verify.errorCode);
                            expect(respjson.shortDescription).toEqual(data.verify.shortDescription, "Verify that the 'shortDescription' Shoud be: " + data.verify.shortDescription);
                            expect(respjson.detailedDescription).toEqual(data.verify.detailedDescription, "Verify that the 'detailedDescription' Shoud be: " + data.verify.detailedDescription);
                            break;
                        case 404:
                            expect(respjson.errorCode).toEqual(data.verify.errorCode, "Verify that the 'ErrorCode' Shoud be" + data.verify.errorCode);
                            expect(respjson.shortDescription).toEqual(data.verify.shortDescription, "Verify that the 'shortDescription' Shoud be " + data.verify.shortDescription);
                            expect(respjson.detailedDescription).toEqual(data.verify.detailedDescription, "Verify that the 'detailedDescription' Shoud be " + data.verify.detailedDescription);
                            break;
                        case 500:
                            expect(respjson.errorCode).toEqual(data.verify.errorCode, "Verify that the 'ErrorCode' Shoud be:" + data.verify.errorCode);
                            expect(respjson.shortDescription).toEqual(data.verify.shortDescription, "Verify that the 'shortDescription' Shoud be: " + data.verify.shortDescription);
                            expect(respjson.detailedDescription).toEqual(data.verify.detailedDescription, "Verify that the 'detailedDescription' Shoud be: " + data.verify.detailedDescription);
                            break;
                    }
                })
                .done(doneFn);
        });
    });
});
