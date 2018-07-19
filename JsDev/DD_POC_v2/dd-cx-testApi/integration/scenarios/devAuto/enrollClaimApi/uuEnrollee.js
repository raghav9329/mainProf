'use strict';
const Joi = frisby.Joi;

var TestData = require('../../../testData/devAuto/' + testDataEnv + '/enrollClaimApi/uuEnrollee.json');

describe('Usage Enrollee API: ', function() {
    dataProvider(TestData.testdata, function(data, description) {
        beforeEach(function() {
            jasmine.addMatchers(custommatcher.customMatchers);
        });

        it("TC: " + data.testCaseDes + "  PersonID: " + data.personId + "  Enrollee ID: " + data.enrolleeId + " ", function(doneFn) {
            let apiurl = Utility.getapiurl('USAGEENROLLEE', data.enrolleeId);
            console.log("apiurl*" + apiurl)
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
                    console.log(res.status)
                    switch (res.status) {
                        case 200:
                            expect(json.memberInfo.personId).toEqual(data.verify.memberInfo.personId, "Verify that Person ID should be" + data.verify.memberInfo.personId);
                            expect(json.memberInfo.memberId).toEqual(data.verify.memberInfo.memberId, "Verify that memberId should be" + data.verify.memberInfo.memberId);
                            expect(json.memberInfo.enrolleeId).toEqual(data.verify.memberInfo.enrolleeId, "Verify that enrolleeId should be" + data.verify.memberInfo.enrolleeId);
                            expect(json.memberInfo.contractId).toEqual(data.verify.memberInfo.contractId, "Verify that contractId should be" + data.verify.memberInfo.contractId);
                            expect(json.memberInfo.memberName).toEqual(data.verify.memberInfo.memberName, "Verify that memberName should be" + data.verify.memberInfo.memberName);

                            expect(json.planInfo.planYearType).toEqual(data.verify.planInfo.planYearType, "Verify that planYearType should be" + data.verify.planInfo.planYearType);
                            expect(json.planInfo.planStartDate).toEqual(data.verify.planInfo.planStartDate, "Verify that planStartDate should be" + data.verify.planInfo.planStartDate);
                            expect(json.planInfo.planEndDate).toEqual(data.verify.planInfo.planEndDate, "Verify that planEndDate should be" + data.verify.planInfo.planEndDate);
                            expect(json.planInfo.planYearDescription).toEqual(data.verify.planInfo.planYearDescription, "Verify that planYearDescription should be" + data.verify.planInfo.planYearDescription);

                            expect(json.message).toEqual(data.verify.message, "Verify that message should be" + data.verify.message);

                            json.usageInfo.procedureDetail.forEach(function(UInfo, index) {
                                var udata = data.verify.usageInfo.procedureDetail[index];
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
