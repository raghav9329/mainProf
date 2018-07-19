'use strict';
const Joi = frisby.Joi;

var TestData = require('../../../testData/devEng/enrollClaimApi/uuEnrollee.json');

describe('Usage Enrollee API: ', function() {
    beforeEach(function() {
        jasmine.addMatchers(custommatcher.customMatchers);
    });

    var positiveJson;
    dataProvider(TestData.enrolleetestdata, function(data, description) {

        it("Validating MemberInfo From Positive API Response" + Utility.getapiurl('USAGEENROLLEE', data.enrolleeId) + " ", function(doneFn) {

            let apiurl = Utility.getapiurl('USAGEENROLLEE', data.enrolleeId);
            console.log("api url -------------" + apiurl);
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
                    positiveJson = res.json;
                    switch (res.status) {
                        case 200:

                            expect(typeof positiveJson.memberInfo.personId).toEqual('string', "Verify that 'personId'data type should be 'string'");
                            expect(positiveJson.memberInfo.personId).toEqual(data.personId, "Verify that 'personId'value should be "+data.personId);

                            if (positiveJson.memberInfo.memberId == data.enrolleeId.slice(-2)) {
                                expect(typeof positiveJson.memberInfo.memberId).toEqual('string', "Verify that 'memberId'data type should be 'string'");
                                expect(positiveJson.memberInfo.memberId).toEqual(data.enrolleeId.slice(-2), "Verify that 'enrolleeId'value should be "+data.enrolleeId.slice(-2));
                            } //memberId

                            if (positiveJson.memberInfo.contractId == data.enrolleeId.slice(0, -2)) {
                                expect(typeof positiveJson.memberInfo.contractId).toEqual('string', "Verify that 'contractId'data type should be 'string'");
                                expect(positiveJson.memberInfo.contractId).toEqual(data.enrolleeId.slice(0, -2), "Verify that 'contractId'value should be "+data.enrolleeId.slice(0, -2));
                            } //contractId

                            if (positiveJson.memberInfo.enrolleeId == data.enrolleeId) {
                                expect(typeof positiveJson.memberInfo.enrolleeId).toEqual('string', "Verify that 'enrolleeId'data type should be 'string'");
                                expect(positiveJson.memberInfo.enrolleeId).toEqual(data.enrolleeId, "Verify that 'enrolleeId'value should be "+data.enrolleeId);
                            } //enrolleeId

                            expect(typeof positiveJson.memberInfo.memberName).toEqual('string', "Verify that 'memberName'data type should be 'string'");
                            expect(positiveJson.memberInfo.memberName != null).toBe(true, "Verify that 'memberName'value should be true");

                        

                    }
                })
                .done(doneFn);
        });


        it("Validating Plan Info From Positive API Responses" + Utility.getapiurl('USAGEENROLLEE', data.enrolleeId) + " ", function() {


            let calendarYearStartDate = '1' + '-' + '1' + '-' + new Date().getFullYear();
            let calendarYearEndDate = '12' + '-' + '31' + '-' + new Date().getFullYear();
            if ((Utility.getDateFormatString(positiveJson.planInfo.planStartDate) == calendarYearStartDate) &&
                (Utility.getDateFormatString(positiveJson.planInfo.planEndDate) == calendarYearEndDate)) {

                expect(typeof positiveJson.planInfo.planStartDate).toEqual('string', "Verify that 'planStartDate'data type should be 'string'");
                expect(positiveJson.planInfo.planStartDate != null).toBe(true, "Verify that 'planStartDate'value should be 'true'");

                expect(typeof positiveJson.planInfo.planEndDate).toEqual('string', "Verify that 'planEndDate'data type should be 'string'");
                expect(positiveJson.planInfo.planEndDate != null).toBe(true, "Verify that 'planEndDate'value should be 'true'");

                expect(typeof positiveJson.planInfo.planYearType).toEqual('string', "Verify that 'planYearType'data type should be 'string'");
                expect(positiveJson.planInfo.planYearType != null).toBe(true, "Verify that 'planYearType'value should be 'true'");
                expect(positiveJson.planInfo.planYearType).toEqual('CAYR', "Verify that 'planYearType' value should be 'CAYR'");

                expect(typeof positiveJson.planInfo.planYearDescription).toEqual('string', "Verify that 'planYearDescription'data type should be 'string'");
                expect(positiveJson.planInfo.planYearDescription != null).toBe(true, "Verify that 'planYearDescription' value should be 'true'");
                expect(positiveJson.planInfo.planYearDescription).toEqual('Eff Date In a Calendar Year', "Verify that 'planYearDescription'value should be 'Eff Date In a Calendar Year'");
            }
        });

        it("Validating ProcedureDetails & ProcedureCode Info From Positive API Responses" + Utility.getapiurl('USAGEENROLLEE', data.enrolleeId) + " ", function() {

            positiveJson.usageInfo.procedureDetail.forEach(function(procedureDetail) {
                expect(typeof procedureDetail.procedureName).toEqual('string', "Verify that 'procedureName'data type should be 'string'");
                expect(procedureDetail.procedureName != null).toBe(true, "Verify that 'procedureName'value should be 'true'");

                expect(typeof procedureDetail.totalAllowed).toEqual('number', "Verify that 'totalAllowed'data type should be 'number'");
                expect(procedureDetail.totalAllowed != null).toBe(true, "Verify that 'totalAllowed' value should be 'true'");

                expect(typeof procedureDetail.totalUsed).toEqual('number', "Verify that 'totalUsed'data type should be 'number'");
                expect(procedureDetail.totalUsed != null).toBe(true, "Verify that 'totalUsed'value should be 'string'");

                expect(typeof procedureDetail.totalRemaining).toEqual('number', "Verify that 'memberName'data type should be 'number'");
                expect(procedureDetail.totalRemaining != null).toBe(true, "Verify that 'memberName'data type should be 'true'");

                expect(typeof procedureDetail.contributingProcedureCodes).toEqual('object', "Verify that 'contributingProcedureCodes'data type should be 'object'");
                expect(procedureDetail.contributingProcedureCodes[0] != null).toBe(true, "Verify that 'contributingProcedureCodes'value should be 'true'");

                expect(procedureDetail.totalAllowed).toEqual(procedureDetail.totalUsed + procedureDetail.totalRemaining);

                expect(procedureDetail.totalUsed).toEqual(procedureDetail.procedureCodes.length);

                procedureDetail.procedureCodes.forEach(function(procCode) {

                    expect(typeof procCode.procedureCode).toEqual('string', "Verify that 'procedureCode'data type should be 'string'");
                    expect(procCode.procedureCode != null).toBe(true, "Verify that 'procedureCode'value should be 'true'");

                    expect(typeof procCode.procedureDescription).toEqual('string', "Verify that 'procedureDescription'data type should be 'string'");
                    expect(procCode.procedureDescription != null).toBe(true, "Verify that 'procedureDescription'value should be 'true'");

                    expect(typeof procCode.procedureDetailDescription).toEqual('string', "Verify that 'procedureDetailDescription'data type should be 'string'");
                    expect(procCode.procedureDetailDescription != null).toBe(true, "Verify that 'procedureDetailDescription'value should be 'true'");

                    expect(typeof procCode.totalUsed).toEqual('number', "Verify that 'totalUsed'data type should be 'number'");
                    expect(procCode.totalUsed != null).toBe(true, "Verify that 'totalUsed'value should be 'true'");
                }) //procedureCode
            }) //procedureDetails

            expect(typeof positiveJson.lastCalculatedDate).toEqual('string', "Verify that 'lastCalculatedDate'data type should be 'string'");
            expect(positiveJson.lastCalculatedDate != null).toBe(true, "Verify that 'lastCalculatedDate' value should be 'true'");
        });

    });



    dataProvider(TestData.enrolleetestdata1, function(data, description) {
        it("TC:" +data.testCaseDes   + Utility.getapiurl('USAGEENROLLEE', data.enrolleeId) + " ", function(doneFn) {

            let apiurl = Utility.getapiurl('USAGEENROLLEE', data.enrolleeId);
            console.log("api url -------------" + apiurl);
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
                            break;
                        case 400:
                            expect(json.message).toEqual(data.message, "Verify that 'message'should be " + data.message);
                            break;
                        case 401:
                            expect(json.error).toEqual(data.error, "Verify that 'error'should be " + data.error);
                            expect(json.message).toEqual(data.message, "Verify that 'message'should be " + data.message);
                            break;
                        case 403:
                            expect(json.shortDescription).toEqual(data.shortDescription, "Verify that 'shortDescription'should be " + data.shortDescription);
                            expect(json.detailedDescription).toEqual(data.detailedDescription, "Verify that 'error'should be " + data.error);
                            break;
                        case 404:
                            break;
                        case 500:
                            expect(json.errorCode).toEqual(data.errorCode, "Verify that 'errorCode'should be " + data.errorCode);
                            expect(json.shortDescription).toEqual(data.shortDescription, "Verify that 'shortDescription'should be " + data.shortDescription);
                            expect(json.detailedDescription).toEqual(data.detailedDescription, "Verify that 'detailedDescription'should be " + data.detailedDescription);
                            break;
                    }
                })
                .done(doneFn);
        });
    })
});