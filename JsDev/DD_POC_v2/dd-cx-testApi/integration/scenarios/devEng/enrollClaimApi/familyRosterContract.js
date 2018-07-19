'use strict';
const Joi = frisby.Joi;

var TestData = require('../../../testData/devEng/enrollClaimApi/familyRosterContract.json');

describe('Family Roster Contract API: ', function() {
    beforeEach(function() {
            jasmine.addMatchers(custommatcher.customMatchers);
        });
    dataProvider(TestData.contracttestdata, function(data, description) {
        it("TC :" + data.testCaseDesc + "Person ID : " + data.person_Id + Utility.getapiurl('FAMILYCONTRACT', data.person_Id) + " ", function(doneFn) {
            let apiurl = Utility.getapiurl('FAMILYCONTRACT', data.person_Id);
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
                            expect(typeof json[0].contractId).toEqual('string',"Verify that 'contractId' data type should be 'string'");
                            expect(typeof json[0].personId).toEqual('string',"Verify that 'personId' data type should be 'string'");
                            expect(typeof json[0].benefitId).toEqual('string',"Verify that 'benefitId' data type should be 'string'");
                            expect(typeof json[0].groupId).toEqual('string',"Verify that 'groupId' data type should be 'string'");
                            expect(typeof json[0].groupTypeId).toEqual('string',"Verify that 'groupTypeId' data type should be 'string'");
                            expect(typeof json[0].divisionId).toEqual('string',"Verify that 'divisionId' data type should be 'string'");
                            expect(typeof json[0].groupSurrogateId).toEqual('string',"Verify that 'groupSurrogateId' data type should be 'string'");
                            expect(typeof json[0].healthCareContractHolderId).toEqual('string',"Verify that 'healthCareContractHolderId' data type should be 'string'");
                            expect(typeof json[0].divisionSurrogateId).toEqual('string',"Verify that 'divisionSurrogateId' data type should be 'string'");
                            expect(typeof json[0].active).toEqual('boolean',"Verify that 'active' data type should be 'boolean'");
                            expect(typeof json[0].groupDescription).toEqual('string',"Verify that 'groupDescription' data type should be 'string'");
                            expect(typeof json[0].divisionDescription).toEqual('string',"Verify that 'divisionDescription' data type should be 'string'");
                            expect(typeof json[0].planName).toEqual('string',"Verify that 'planName' data type should be 'string'");
                            expect(typeof json[0].planType).toEqual('string',"Verify that 'planType' data type should be 'string'");
                            expect(typeof json[0].state).toEqual('string',"Verify that 'state' data type should be 'string'");

                    }
                })
                .done(doneFn);
        });
        it("TC :" + data.testCaseDesc + "Person ID : " + data.person_Id + Utility.getapiurl('FAMILYCONTRACT', data.person_Id) + " ", function(doneFn) {
            let apiurl = Utility.getapiurl('FAMILYCONTRACT', data.person_Id);
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
                            expect(json[0].contractId).toEqual(data.contractId,"Verify that 'contractId' value should be "+data.contractId);
                            expect(json[0].personId).toEqual(data.personId, "Verify that 'personId' value should be "+data.personId);
                            expect(json[0].benefitId).toEqual(data.benefitId, "Verify that 'benefitId' value should be "+ data.benefitId);
                            expect(json[0].groupId).toEqual(data.groupId, "Verify that 'groupId' value should be "+ data.groupId);
                            expect(json[0].groupTypeId).toEqual(data.groupTypeId, "Verify that 'groupTypeId' value should be "+data.groupTypeId);
                            expect(json[0].divisionId).toEqual(data.divisionId, "Verify that 'divisionId' value should be "+data.divisionId);
                            expect(json[0].groupSurrogateId).toEqual(data.groupSurrogateId, "Verify that 'groupSurrogateId' value should be "+data.groupSurrogateId);
                            expect(json[0].healthCareContractHolderId).toEqual(data.healthCareContractHolderId, "Verify that 'healthCareContractHolderId' value should be "+data.healthCareContractHolderId);
                            expect(json[0].divisionSurrogateId).toEqual(data.divisionSurrogateId, "Verify that 'divisionSurrogateId' value should be "+data.divisionSurrogateId);
                            expect(json[0].active).toEqual(data.active, "Verify that 'active' value should be "+data.active);
                            expect(json[0].groupDescription).toEqual(data.groupDescription, "Verify that 'groupDescription' value should be "+ data.groupDescription);
                            expect(json[0].divisionDescription).toEqual(data.divisionDescription, "Verify that 'divisionDescription' value should be "+data.divisionDescription);
                            expect(json[0].planName).toEqual(data.planName, "Verify that 'planName' value should be "+data.planName);
                            expect(json[0].planType).toEqual(data.planType, "Verify that 'planType' value should be "+data.planType);
                            expect(json[0].state).toEqual(data.state, "Verify that 'state' value should be "+ data.state);

                    }
                })
                .done(doneFn);
        });

    });

    it("TC :" + TestData.contracttestdata1.test2.testCaseDesc + "Person ID : " + TestData.contracttestdata1.test2.person_Id  + Utility.getapiurl('FAMILYCONTRACT', TestData.contracttestdata1.test2.person_Id) + " ", function(doneFn) {
        let data = TestData.contracttestdata1.test2
        let apiurl = Utility.getapiurl('FAMILYCONTRACT', data.person_Id);
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
                if (res.status == 403) {

                    expect(json.shortDescription).toEqual(data.shortDescription,"Verify that 'shortDescription'should be "+ data.shortDescription);
                    expect(json.detailedDescription).toEqual(data.detailedDescription, "Verify that 'detailedDescription'should be "+ data.detailedDescription);

                }
            })
            .done(doneFn);
    });
    it("TC :" + TestData.contracttestdata1.test3.testCaseDesc +"Empty Person ID : "+ TestData.contracttestdata1.test3.person_Id + Utility.getapiurl('FAMILYCONTRACT', TestData.contracttestdata1.test3.person_Id) + " ", function(doneFn) {
        let data = TestData.contracttestdata1.test3;
        let apiurl = Utility.getapiurl('FAMILYCONTRACT', data.person_Id);
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
                if (res.status == 403) {

                    expect(json.shortDescription).toEqual(data.shortDescription,"Verify that 'shortDescription'should be "+ data.shortDescription);
                    expect(json.detailedDescription).toEqual(data.detailedDescription, "Verify that 'detailedDescription'should be "+ data.detailedDescription);

                }
            })
            .done(doneFn);
    });
    it("TC :" + TestData.contracttestdata1.test4.testCaseDesc +" Person ID : "+ TestData.contracttestdata1.test4.person_Id + Utility.getapiurl('FAMILYCONTRACT', TestData.contracttestdata1.test4.person_Id) + " ", function(doneFn) {
        let data = TestData.contracttestdata1.test4;
        let apiurl = Utility.getapiurl('FAMILYCONTRACT', data.person_Id);
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
                if (res.status == 400) {

                    expect(json.error).toEqual(data.error,"Verify that 'error'should be "+ data.error);
                    expect(json.message).toEqual(data.message, "Verify that 'message'should be "+ data.message);

                }
            })
            .done(doneFn);
    });
    it("TC :" + TestData.contracttestdata1.test5.testCaseDesc +" Person ID : "+ TestData.contracttestdata1.test5.person_Id + Utility.getapiurl('FAMILYCONTRACT', TestData.contracttestdata1.test5.person_Id) + " ", function(doneFn) {
        let data = TestData.contracttestdata1.test5;
        let apiurl = Utility.getapiurl('FAMILYCONTRACT', data.person_Id);
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
                if (res.status == 401) {

                    expect(json.error).toEqual(data.error,"Verify that 'error'should be "+ data.error);
                    expect(json.message).toEqual(data.message, "Verify that 'message'should be "+ data.message);

                }
            })
            .done(doneFn);
    });


});