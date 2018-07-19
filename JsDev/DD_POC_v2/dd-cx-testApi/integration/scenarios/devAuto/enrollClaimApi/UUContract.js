'use strict';
const Joi = frisby.Joi;

var TestData = require('../../../testData/devAuto/' + testDataEnv + '/enrollClaimApi/UUContract.json');

describe('Usage and Utilization API: ', function() {
    dataProvider(TestData.testdata, function(data, description) {
        beforeEach(function() {
            jasmine.addMatchers(custommatcher.customMatchers);
        });

        it("TC: " + data.testCaseDes + "  PersonID: " + data.personId + "  Contract ID: " + data.contractId + " ", function(doneFn) {
            let apiurl = Utility.getapiurl('USAGECONTRACT', data.contractId);
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
                            json.forEach(function(contract, index) {
                                var tdata = data.verify[index];
                                expect(contract.memberInfo.personId).toEqual(tdata.memberInfo.personId, "Verify that Person ID should be" + tdata.memberInfo.personId);
                                expect(contract.memberInfo.memberId).toEqual(tdata.memberInfo.memberId, "Verify that memberId should be" + tdata.memberInfo.memberId);
                                expect(contract.memberInfo.enrolleeId).toEqual(tdata.memberInfo.enrolleeId, "Verify that enrolleeId should be" + tdata.memberInfo.enrolleeId);
                                expect(contract.memberInfo.contractId).toEqual(tdata.memberInfo.contractId, "Verify that contractId should be" + tdata.memberInfo.contractId);
                                expect(contract.memberInfo.memberName).toEqual(tdata.memberInfo.memberName, "Verify that memberName should be" + tdata.memberInfo.memberName);

                                if (contract.planInfo != null) {
                                    expect(contract.planInfo.planYearType).toEqual(tdata.planInfo.planYearType, "Verify that planYearType should be" + tdata.planInfo.planYearType);
                                    expect(contract.planInfo.planStartDate).toEqual(tdata.planInfo.planStartDate, "Verify that planStartDate should be" + tdata.planInfo.planStartDate);
                                    expect(contract.planInfo.planEndDate).toEqual(tdata.planInfo.planEndDate, "Verify that planEndDate should be" + tdata.planInfo.planEndDate);
                                    expect(contract.planInfo.planYearDescription).toEqual(tdata.planInfo.planYearDescription, "Verify that planYearDescription should be" + tdata.planInfo.planYearDescription);

                                    contract.usageInfo.procedureDetail.forEach(function(UInfo, index) {
                                        var udata = tdata.usageInfo.procedureDetail[index];
                                        expect(UInfo.procedureName).toEqual(udata.procedureName, "Verify that procedureName should be" + udata.procedureName);
                                        expect(UInfo.totalAllowed).toEqual(udata.totalAllowed, "Verify that totalAllowed should be" + udata.totalAllowed);
                                        expect(UInfo.totalUsed).toEqual(udata.totalUsed, "Verify that totalUsed should be" + udata.totalUsed);
                                        expect(UInfo.totalRemaining).toEqual(udata.totalRemaining, "Verify that totalRemaining should be" + udata.totalRemaining);
                                        expect(UInfo.contributingProcedureCodes).toEqual(udata.contributingProcedureCodes, "Verify that contributingProcedureCodes should be" + udata.contributingProcedureCodes);

                                        UInfo.procedureCodes.forEach(function(UInfoPC, index) {
                                            var upcdata = udata.procedureCodes[index];
                                            expect(UInfoPC.procedureCode).toEqual(upcdata.procedureCode, "Verify that procedureCode should be" + upcdata.procedureCode);
                                            expect(UInfoPC.procedureDescription).toEqual(upcdata.procedureDescription, "Verify that procedureDescription should be" + upcdata.procedureDescription);
                                            expect(UInfoPC.procedureDetailDescription).toEqual(upcdata.procedureDetailDescription, "Verify that procedureDetailDescription should be" + upcdata.procedureDetailDescription);
                                            expect(UInfoPC.totalUsed).toEqual(upcdata.totalUsed, "Verify that procedureCode should be" + upcdata.totalUsed);
                                        })
                                    })
                                } else {
                                    expect(contract.message).toEqual(tdata.message, "Verify that message should be" + tdata.message);
                                }
                            })
                            break;
                        case 403:
                            expect(json.shortDescription).toEqual(data.shortDescription);
                            expect(json.detailedDescription).toEqual(data.detailedDescription);
                            break;
                        case 404:
                            expect(res.status).toEqual(data.verify.status, "Verify that Status Code should be" + data.verify.status);
                            break;

                        case 500:
                            expect(res.status).toEqual(data.verify.status, "Verify that Status Code should be" + data.verify.status);
                            break;


                    }
                })
                .done(doneFn);

        });
    });
});
