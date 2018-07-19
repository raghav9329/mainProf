'use strict';
const Joi = frisby.Joi;

var TestData = require('../../../testData/devAuto/' + testDataEnv + '/enrollClaimApi/enroll.json');

describe('Enroll API: ', function() {
    dataProvider(TestData.testdata, function(data, description) {

        beforeEach(function() {
            jasmine.addMatchers(custommatcher.customMatchers);
        });

        it("TC: " + data.testCaseDes + " Person ID: " + data.PersonId + " Enrollee Id" + data.enrolleeId + " Client Key" + data.ClientKey + "", function(doneFn) {
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
                            expect(respjson.enrolleeId).toEqual(data.verify.enrolleeId, "Verify that the 'enrolleeId' Should be: " + data.verify.enrolleeId);
                            expect(respjson.enrolleeName).toEqual(data.verify.enrolleeName, "Verify that the 'enrolleeName' Should be: " + data.verify.enrolleeName);
                            expect(respjson.enrolleeType).toEqual(data.verify.enrolleeType, "Verify that the 'enrolleeType' Should be: " + data.verify.enrolleeType);
                            respjson.enrolleeClaimSummaryList.forEach(function(respECSL, index) {
                                var dataECSL = data.verify.enrolleeClaimSummaryList[index];
                                expect(respECSL.claimId).toEqual(dataECSL.claimId, "Verify that the 'claimId' Should be: " + dataECSL.claimId);
                                
                                // This will ensure that the inner details are checked only if the expecting claimID shows up
                                // The inner details will never match if the claimID itself is wrong (in other words wrong claim is being displayed)
                                if (respECSL.claimId === dataECSL.claimId) 
                                {
                                    expect(respECSL.personId).toEqual(dataECSL.personId, "For Claim ID: " + dataECSL.claimId + ", Verify that the 'personId' Should be: " + dataECSL.personId);
                                    expect(respECSL.claimStatus).toEqual(dataECSL.claimStatus, "For Claim ID: " + dataECSL.claimId + ", Verify that the 'claimStatus' Should be: " + dataECSL.claimStatus);
                                    expect(respECSL.dateOfService).toEqual(dataECSL.dateOfService, "For Claim ID: " + dataECSL.claimId + ", Verify that the 'dateOfService' Should be: " + dataECSL.dateOfService);
                                    expect(respECSL.providerDetails.providerKey).toEqual(dataECSL.providerDetails.providerKey, "For Claim ID: " + dataECSL.claimId + ", Verify that the 'providerKey' Should be: " + dataECSL.providerDetails.providerKey);
                                    expect(respECSL.providerDetails.providerName).toEqual(dataECSL.providerDetails.providerName, "For Claim ID: " + dataECSL.claimId + ", Verify that the 'providerName' Should be: " + dataECSL.providerDetails.providerName);
                                    expect(respECSL.providerDetails.active).toEqual(dataECSL.providerDetails.active, "For Claim ID: " + dataECSL.claimId + ", Verify that the 'active' Should be: " + dataECSL.providerDetails.active);
                                    expect(respECSL.providerDetails.gender).toEqual(dataECSL.providerDetails.gender, "For Claim ID: " + dataECSL.claimId + ", Verify that the 'gender' Should be: " + dataECSL.providerDetails.gender);
                                    expect(respECSL.providerDetails.contactNumber).toEqual(dataECSL.providerDetails.contactNumber, "For Claim ID: " + dataECSL.claimId + ", Verify that the 'contactNumber' Should be: " + dataECSL.providerDetails.contactNumber);
                                    respECSL.procedureDetails.forEach(function(respProcDetails, index) {
                                        var dataProcDetails = dataECSL.procedureDetails[index];
                                        expect(respProcDetails.procedureCode).toEqual(dataProcDetails.procedureCode, "For Claim ID: " + dataECSL.claimId + ", Verify that the 'procedureCode' Should be: " + dataProcDetails.procedureCode);

                                        // We want to check these inner setails only if procedureCode matches
                                        // The inner procedure details will never match if the procedureCode itself is wrong (in other words wrong procedure is being displayed)
                                        if (respProcDetails.procedureCode === dataProcDetails.procedureCode) 
                                        {
                                            expect(respProcDetails.procedureDescription).toEqual(dataProcDetails.procedureDescription, "For Claim ID: " + dataECSL.claimId + ", Verify that the 'procedureDescription' Should be: " + dataProcDetails.procedureDescription);
                                            expect(respProcDetails.procedureCount).toEqual(dataProcDetails.procedureCount, "For Claim ID: " + dataECSL.claimId + ", Verify that the 'procedureCount' Should be:" + dataProcDetails.procedureCount);
                                        }
                                    })
                                    expect(respECSL.enrolleeResponsibilityAmount).toEqual(dataECSL.enrolleeResponsibilityAmount, "Verify that the 'enrolleeResponsibilityAmount' Should be: " + dataECSL.enrolleeResponsibilityAmount);
                                }
                            })
                            break;
                        case 400:
                            expect(respjson.errorCode).toEqual(data.verify.errorCode, "Verify that the 'ErrorCode' Should be: " + data.verify.errorCode);
                            expect(respjson.shortDescription).toEqual(data.verify.shortDescription, "Verify that the 'shortDescription' Should be: " + data.verify.shortDescription);
                            expect(respjson.detailedDescription).toEqual(data.verify.detailedDescription, "Verify that the 'detailedDescription' Should be: " + data.verify.detailedDescription);
                            break;
                        case 401:
                            expect(respjson.errorCode).toEqual(data.verify.errorCode, "Verify that the 'ErrorCode' Should be:" + data.verify.errorCode);
                            expect(respjson.shortDescription).toEqual(data.verify.shortDescription, "Verify that the 'shortDescription' Should be: " + data.verify.shortDescription);
                            expect(respjson.detailedDescription).toEqual(data.verify.detailedDescription, "Verify that the 'detailedDescription' Should be: " + data.verify.detailedDescription);
                            break;
                        case 403:
                            expect(respjson.errorCode).toEqual(data.verify.errorCode, "Verify that the 'ErrorCode' Should be" + data.verify.errorCode);
                            expect(respjson.shortDescription).toEqual(data.verify.shortDescription, "Verify that the 'shortDescription' Should be: " + data.verify.shortDescription);
                            expect(respjson.detailedDescription).toEqual(data.verify.detailedDescription, "Verify that the 'detailedDescription' Should be: " + data.verify.detailedDescription);
                            break;
                        case 404:
                            expect(respjson.errorCode).toEqual(data.verify.errorCode, "Verify that the 'ErrorCode' Should be" + data.verify.errorCode);
                            expect(respjson.shortDescription).toEqual(data.verify.shortDescription, "Verify that the 'shortDescription' Should be " + data.verify.shortDescription);
                            expect(respjson.detailedDescription).toEqual(data.verify.detailedDescription, "Verify that the 'detailedDescription' Should be " + data.verify.detailedDescription);
                            break;
                        case 500:
                            expect(respjson.errorCode).toEqual(data.verify.errorCode, "Verify that the 'ErrorCode' Should be:" + data.verify.errorCode);
                            expect(respjson.shortDescription).toEqual(data.verify.shortDescription, "Verify that the 'shortDescription' Should be: " + data.verify.shortDescription);
                            expect(respjson.detailedDescription).toEqual(data.verify.detailedDescription, "Verify that the 'detailedDescription' Should be: " + data.verify.detailedDescription);
                            break;
                    }
                })
                .done(doneFn);
        });
    });
});
