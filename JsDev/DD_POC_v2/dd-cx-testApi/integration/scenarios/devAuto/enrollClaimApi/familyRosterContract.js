'use strict';
const Joi = frisby.Joi;

var TestData = require('../../../testData/devAuto/' + testDataEnv + '/enrollClaimApi/familyRosterContract.json');

describe('Family Roster Contract API: ', function() {
    dataProvider(TestData.testdata, function(data, description) {
        beforeEach(function() {
            jasmine.addMatchers(custommatcher.customMatchers);
        });
        it("TC: " + data.testCaseDesc + "  PersonID: " + data.personId + "  Client Key: " + data.ClientKey + "", function(doneFn) {
            let apiurl = Utility.getapiurl('FAMILYCONTRACT', data.personId);
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
                    let response = res.json;
                    expect(res.status).toEqual(data.statusCode, 'Verify the API response status code is: ' + data.statusCode);
                    switch (res.status) {
                        case 200:
                            response.forEach(function(json, index) {
                                var resp = data.verify[index];
                                expect(typeof json.contractId).toEqual('string',  "For Contract ID: " + resp.contractId + ", Verify that data type should be 'string'");
                                expect(typeof json.personId).toEqual('string',  "For Contract ID: " + resp.contractId + ", Verify that data type should be 'string'");
                                expect(typeof json.benefitId).toEqual('string',  "For Contract ID: " + resp.contractId + ", Verify that data type should be 'string'");
                                expect(typeof json.networkIdMapping).toEqual('string',  "For Contract ID: " + resp.contractId + ", Verify that data type should be 'string'");
                                expect(typeof json.groupId).toEqual('string',  "For Contract ID: " + resp.contractId + ", Verify that data type should be 'string'");
                                expect(typeof json.groupTypeId).toEqual('string',  "For Contract ID: " + resp.contractId + ", Verify that data type should be 'string'");
                                expect(typeof json.divisionId).toEqual('string',  "For Contract ID: " + resp.contractId + ", Verify that data type should be 'string'");
                                expect(typeof json.groupSurrogateId).toEqual('string',  "For Contract ID: " + resp.contractId + ", Verify that data type should be 'string'");
                                expect(typeof json.healthCareContractHolderId).toEqual('string',  "For Contract ID: " + resp.contractId + ", Verify that data type should be 'string'");
                                expect(typeof json.divisionSurrogateId).toEqual('string',  "For Contract ID: " + resp.contractId + ", Verify that data type should be 'string'");
                                expect(typeof json.active).toEqual('boolean',  "For Contract ID: " + resp.contractId + ", Verify that data type should be 'Boolean'");
                                expect(typeof json.groupDescription).toEqual('string',  "For Contract ID: " + resp.contractId + ", Verify that data type should be 'string'");
                                expect(typeof json.divisionDescription).toEqual('string',  "For Contract ID: " + resp.contractId + ", Verify that data type should be 'string'");
                                expect(typeof json.planName).toEqual('string',  "For Contract ID: " + resp.contractId + ", Verify that data type should be 'string'");
                                expect(typeof json.planType).toEqual('string',  "For Contract ID: " + resp.contractId + ", Verify that data type should be 'string'");
                                expect(typeof json.state).toEqual('string',  "For Contract ID: " + resp.contractId + ", Verify that data type should be 'string'");

                                expect(json.contractId).toEqual(resp.contractId,  "For Contract ID: " + resp.contractId + ", Verify that 'contractId' should be " + resp.contractId);
                                expect(json.personId).toEqual(resp.personId,  "For Contract ID: " + resp.contractId + ", Verify that 'personId' should be " + resp.personId);
                                expect(json.benefitId).toEqual(resp.benefitId,  "For Contract ID: " + resp.contractId + ", Verify that 'benefitId' should be " + resp.benefitId);
                                expect(json.networkIdMapping).toEqual(resp.networkIdMapping,  "For Contract ID: " + resp.contractId + ", Verify that 'networkIdMapping' should be " + resp.networkIdMapping);
                                expect(json.groupId).toEqual(resp.groupId,  "For Contract ID: " + resp.contractId + ", Verify that 'groupId' should be " + resp.groupId);
                                expect(json.groupTypeId).toEqual(resp.groupTypeId,  "For Contract ID: " + resp.contractId + ", Verify that 'groupTypeId' should be " + resp.groupTypeId);
                                expect(json.divisionId).toEqual(resp.divisionId,  "For Contract ID: " + resp.contractId + ", Verify that 'divisionId' should be " + resp.divisionId);
                                expect(json.groupSurrogateId).toEqual(resp.groupSurrogateId,  "For Contract ID: " + resp.contractId + ", Verify that 'groupSurrogateId' should be " + resp.groupSurrogateId);
                                expect(json.healthCareContractHolderId).toEqual(resp.healthCareContractHolderId,  "For Contract ID: " + resp.contractId + ", Verify that 'healthCareContractHolderId' should be " + resp.healthCareContractHolderId);
                                expect(json.divisionSurrogateId).toEqual(resp.divisionSurrogateId,  "For Contract ID: " + resp.contractId + ", Verify that 'divisionSurrogateId' should be " + resp.divisionSurrogateId);
                                expect(json.active).toEqual(resp.active,  "For Contract ID: " + resp.contractId + ", Verify that 'active' should be " + resp.active);
                                expect(json.startDate).toEqual(resp.startDate,  "For Contract ID: " + resp.contractId + ", Verify that 'startDate' should be " + resp.startDate);
                                expect(json.endDate).toEqual(resp.endDate,  "For Contract ID: " + resp.contractId + ", Verify that 'endDate' should be " + resp.endDate);
                                expect(json.groupDescription).toEqual(resp.groupDescription,  "For Contract ID: " + resp.contractId + ", Verify that 'groupDescription' should be " + resp.groupDescription);
                                expect(json.divisionDescription).toEqual(resp.divisionDescription,  "For Contract ID: " + resp.contractId + ", Verify that 'divisionDescription' should be " + resp.divisionDescription);
                                expect(json.planName).toEqual(resp.planName,  "For Contract ID: " + resp.contractId + ", Verify that 'planName' should be " + resp.planName);
                                expect(json.planType).toEqual(resp.planType,  "For Contract ID: " + resp.contractId + ", Verify that 'planType' should be " + resp.planType);
                                expect(json.state).toEqual(resp.state,  "For Contract ID: " + resp.contractId + ", Verify that 'state' should be " + resp.state);
                            })
                            break;
                        case 400:
                            expect(response.message).toEqual(data.verify.message, "Verify that the error message should displayed with" + data.verify.message);
                            break;
                    }
                })
                .done(doneFn);
        });
    });

});
