'use strict';
const Joi = frisby.Joi;

var TestData = require('../../../testData/devEng/enrollClaimApi/UUContract.json');

describe('Usage and Utilization API: ', function() {
    beforeEach(function() {
        jasmine.addMatchers(custommatcher.customMatchers);
    });
    dataProvider(TestData.UUtestdata, function(data, description) {

        it("Validate API Response with the each data value : " + Utility.getapiurl('USAGECONTRACT', data.contractId) + " ", function(doneFn) {
            let apiurl = Utility.getapiurl('USAGECONTRACT', data.contractId);
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
                            expect(typeof json[0].memberInfo.contractId).toEqual('string', "Verify that 'contractId' data type should be 'string'");
                            expect(typeof json[0].memberInfo.personId).toEqual('string', "Verify that 'personId' data type should be 'string'");
                            expect(typeof json[0].memberInfo.memberId).toEqual('string', "Verify that 'memberId' data type should be 'string'");
                            expect(typeof json[0].memberInfo.enrolleeId).toEqual('string', "Verify that 'enrolleeId' data type should be 'string'");
                            expect(typeof json[0].memberInfo.memberName).toEqual('string', "Verify that 'memberName' data type should be 'string'");
                            expect(typeof json[0].planInfo.planYearType).toEqual('string', "Verify that 'planYearType' data type should be 'string'");
                            expect(typeof json[0].planInfo.planStartDate).toEqual('string', "Verify that 'planStartDate' data type should be 'string'");
                            expect(typeof json[0].planInfo.planEndDate).toEqual('string', "Verify that 'planEndDate' data type should be 'string'");
                            expect(typeof json[0].planInfo.planYearDescription).toEqual('string', "Verify that 'planYearDescription' data type should be 'string'");
                            expect(typeof json[0].usageInfo.procedureDetail[0].procedureName).toEqual('string', "Verify that 'procedureName' data type should be 'string'");
                            expect(typeof json[0].usageInfo.procedureDetail[0].totalAllowed).toEqual('number', "Verify that 'totalAllowed' data type should be 'number'");
                            expect(typeof json[0].usageInfo.procedureDetail[0].totalUsed).toEqual('number', "Verify that 'totalUsed' data type should be 'number'");
                            expect(typeof json[0].usageInfo.procedureDetail[0].totalRemaining).toEqual('number', "Verify that 'totalRemaining' data type should be 'number'");
                            expect(typeof json[0].usageInfo.procedureDetail[0].contributingProcedureCodes).toEqual('object', "Verify that 'contributingProcedureCodes' data type should be 'object'");
                            expect(typeof json[0].usageInfo.procedureDetail[0].procedureCodes[0].procedureCode).toEqual('string', "Verify that 'procedureCode' data type should be 'string'");
                            expect(typeof json[0].usageInfo.procedureDetail[0].procedureCodes[0].procedureDescription).toEqual('string', "Verify that 'procedureDescription' data type should be 'string'");
                            expect(typeof json[0].usageInfo.procedureDetail[0].procedureCodes[0].procedureDetailDescription).toEqual('string', "Verify that 'procedureDetailDescription' data type should be 'string'");
                            expect(typeof json[0].usageInfo.procedureDetail[0].procedureCodes[0].totalUsed).toEqual('number', "Verify that 'totalUsed' data type should be 'number'");


                    }
                })
                .done(doneFn);
        });
        it("Validate memberInfo response : " + Utility.getapiurl('USAGECONTRACT', data.contractId) + " ", function(doneFn) {
            let apiurl = Utility.getapiurl('USAGECONTRACT', data.contractId);
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


                            expect(json[0].memberInfo.contractId).toEqual(data.contractId, "Verify that 'contractId' value should be " + data.contractId);
                            expect(json[0].memberInfo.personId).toEqual(data.personId, "Verify that 'personId' value should be " + data.personId);
                            expect(json[0].memberInfo.memberId).toEqual(data.memberId, "Verify that 'memberId' value should be " + data.memberId);
                            expect(json[0].memberInfo.enrolleeId).toEqual(data.enrolleeId, "Verify that 'enrolleeId' value should be " + data.enrolleeId);
                            expect(json[0].memberInfo.memberName).toEqual(data.memberName, "Verify that 'memberName' value should be " + data.memberName);


                    }
                })
                .done(doneFn);
        });
        it("Validate planInfo response : " + Utility.getapiurl('USAGECONTRACT', data.contractId) + " ", function(doneFn) {
            let apiurl = Utility.getapiurl('USAGECONTRACT', data.contractId);
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

                            let calendarYearStartDate = '1' + '-' + '1' + '-' + new Date().getFullYear();
                            let calendarYearEndDate = '12' + '-' + '31' + '-' + new Date().getFullYear();

                            if ((Utility.getDateFormatString(json[0].planInfo.planStartDate) == calendarYearStartDate) &&
                                (Utility.getDateFormatString(json[0].planInfo.planEndDate) == calendarYearEndDate)) {

                                expect(json[0].planInfo.planStartDate != null).toBe(true, "Verify that 'planStartDate' value is not null ");

                                expect(json[0].planInfo.planEndDate != null).toBe(true, "Verify that 'planEndDate' value is not null ");

                                expect(json[0].planInfo.planYearType != null).toBe(true, "Verify that 'planYearType' value is not null ");
                                expect(json[0].planInfo.planYearType).toEqual('CAYR', "Verify that 'planStartDate' value is not null " + json[0].planInfo.planYearType);
                            }

                            expect(json[0].planInfo.planYearDescription).toEqual(data.planYearDescription, "Verify that 'planYearDescription' value is not null " + data.planYearDescription);


                    }
                })
                .done(doneFn);
        });
        it("Validate usageInfo response : " + Utility.getapiurl('USAGECONTRACT', data.contractId) + " ", function(doneFn) {
            let apiurl = Utility.getapiurl('USAGECONTRACT', data.contractId);
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

                            expect(json[0].usageInfo.procedureDetail[0].procedureName).toEqual(data.procedureName, "Verify that 'procedureName' value is  " + data.procedureName);
                            expect(json[0].usageInfo.procedureDetail[0].totalAllowed).toEqual(data.totalAllowed, "Verify that 'totalAllowed' value is  " + data.totalAllowed);
                            expect(json[0].usageInfo.procedureDetail[0].totalUsed).toEqual(data.totalUsed, "Verify that 'totalUsed' value is  " + data.totalUsed);
                            expect(json[0].usageInfo.procedureDetail[0].totalRemaining).toEqual(data.totalRemaining, "Verify that 'totalRemaining' value is  " + data.totalRemaining);
                            expect(json[0].usageInfo.procedureDetail[0].procedureCodes[0].procedureCode).toEqual(data.procedureCode, "Verify that 'procedureCode' value is  " + data.procedureCode);
                            expect(json[0].usageInfo.procedureDetail[0].procedureCodes[0].procedureDescription).toEqual(data.procedureDescription, "Verify that 'procedureDescription' value is  " + data.procedureDescription);
                            expect(json[0].usageInfo.procedureDetail[0].procedureCodes[0].procedureDetailDescription).toEqual(data.procedureDetailDescription, "Verify that 'procedureDetailDescription' value is  " + data.procedureDetailDescription);
                            expect(json[0].usageInfo.procedureDetail[0].procedureCodes[0].totalUsed).toEqual(data.totalUsed, "Verify that 'totalUsed' value is  " + data.totalUsed);



                    }
                })
                .done(doneFn);
        });
    });



    it("Person is Primary member and he is not part of the contract : " + Utility.getapiurl('USAGECONTRACT', TestData.UU2.contractId) + " ", function(doneFn) {
        let data = TestData.UU2;
        let apiurl = Utility.getapiurl('USAGECONTRACT', data.contractId);
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

                    case 401:
                        expect(json.shortDescription).toEqual(data.shortDescription, "Verify that 'shortDescription' value is  " + data.shortDescription);
                        expect(json.detailedDescription).toEqual(data.detailedDescription, "Verify that 'detailedDescription' value is  " + data.detailedDescription);

                    case 500:
                        expect(json.shortDescription).toEqual(data.shortDescription, "Verify that 'shortDescription' value is  " + data.shortDescription);
                        expect(json.detailedDescription).toEqual(data.detailedDescription, "Verify that 'detailedDescription' value is  " + data.detailedDescription);


                }
            })
            .done(doneFn);
    });
    it("Person is Adult member and he is not part of the contract : " + Utility.getapiurl('USAGECONTRACT', TestData.UU3.contractId) + " ", function(doneFn) {
        let data = TestData.UU3;
        let apiurl = Utility.getapiurl('USAGECONTRACT', data.contractId);
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



                    case 401:
                        expect(json.shortDescription).toEqual(data.shortDescription, "Verify that 'shortDescription' value is  " + data.shortDescription);
                        expect(json.detailedDescription).toEqual(data.detailedDescription, "Verify that 'detailedDescription' value is  " + data.detailedDescription);

                    case 500:
                        expect(json.shortDescription).toEqual(data.shortDescription, "Verify that 'shortDescription' value is  " + data.shortDescription);
                        expect(json.detailedDescription).toEqual(data.detailedDescription, "Verify that 'detailedDescription' value is  " + data.detailedDescription);


                }
            })
            .done(doneFn);
    });
    it("Person is child member and he is not part of the contract : " + Utility.getapiurl('USAGECONTRACT', TestData.UU4.contractId) + " ", function(doneFn) {
        let data = TestData.UU4;
        let apiurl = Utility.getapiurl('USAGECONTRACT', data.contractId);
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


                    case 401:
                        expect(json.shortDescription).toEqual(data.shortDescription, "Verify that 'shortDescription' value is  " + data.shortDescription);
                        expect(json.detailedDescription).toEqual(data.detailedDescription, "Verify that 'detailedDescription' value is  " + data.detailedDescription);

                    case 500:
                        expect(json.shortDescription).toEqual(data.shortDescription, "Verify that 'shortDescription' value is  " + data.shortDescription);
                        expect(json.detailedDescription).toEqual(data.detailedDescription, "Verify that 'detailedDescription' value is  " + data.detailedDescription);


                }
            })
            .done(doneFn);
    });
    it("Invalid Person id : " + Utility.getapiurl('USAGECONTRACT', TestData.UU5.contractId) + " ", function(doneFn) {
        let data = TestData.UU5;
        let apiurl = Utility.getapiurl('USAGECONTRACT', data.contractId);
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

                    case 401:
                        expect(json.shortDescription).toEqual(data.shortDescription, "Verify that 'shortDescription' value is  " + data.shortDescription);
                        expect(json.detailedDescription).toEqual(data.detailedDescription, "Verify that 'detailedDescription' value is  " + data.detailedDescription);

                    case 500:
                        expect(json.shortDescription).toEqual(data.shortDescription, "Verify that 'shortDescription' value is  " + data.shortDescription);
                        expect(json.detailedDescription).toEqual(data.detailedDescription, "Verify that 'detailedDescription' value is  " + data.detailedDescription);


                }
            })
            .done(doneFn);
    });

    it("Non-Primary Member tried to view other Adult Records : " + Utility.getapiurl('USAGECONTRACT', TestData.UU7.contractId) + " ", function(doneFn) {
        let data = TestData.UU7;
        let apiurl = Utility.getapiurl('USAGECONTRACT', data.contractId);
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
                        json.forEach(function(contract, index) {
                            expect(contract.message).toEqual("Omnibus-rule:Person is not a primary member. He/She can't view other adult enrollee's records.");
                        })
                }
            })
            .done(doneFn);
    });

    it("TC: " + TestData.UU9.testCaseDes + "  PersonID: " + TestData.UU9.personId + "  Contract ID: " + TestData.UU9.contractId + " ", function(doneFn) {
        let apiurl = Utility.getapiurl('USAGECONTRACT', TestData.UU9.contractId);
        frisby
            .setup({
                request: {
                    headers: {
                        'PersonId': TestData.UU9.personId,
                        'ClientKey': TestData.UU9.ClientKey,
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
                            var tdata = TestData.UU9.verify[index];
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

                }
            })
            .done(doneFn);
    });
    
    it("TC: " + TestData.UU10.testCaseDes + "  PersonID: " + TestData.UU10.personId + "  Contract ID: " + TestData.UU10.contractId + " ", function(doneFn) {
        let apiurl = Utility.getapiurl('USAGECONTRACT', TestData.UU10.contractId);
        frisby
            .setup({
                request: {
                    headers: {
                        'PersonId': TestData.UU10.personId,
                        'ClientKey': TestData.UU10.ClientKey,
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
                            var tdata = TestData.UU10.verify[index];
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

                }
            })
            .done(doneFn);
    });
});

var OmnibusTestData = require('../../../testData/devEng/enrollClaimApi/omnibus_contractId.json');

describe('Testing Usage & Utilization API based on the response of OmniBus API: ', function() {
    dataProvider(OmnibusTestData.positiveTestData, function(data, description) {
        beforeEach(function() {
            jasmine.addMatchers(custommatcher.customMatchers);
        });

        var omnibusjson;

        it("Validate Usage & Utilization API Response based on Omnibus Contract API Response with list of the members with granted permission" + Utility.getapiurl('OMNIBUSCONTRACT', data.contractId, data.params) + " ", function(doneFn) {
            let apiurl = Utility.getapiurl('OMNIBUSCONTRACT', data.contractId, data.params);
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
                    omnibusjson = res.json;
                    switch (res.status) {
                        case 200:
                            expect(omnibusjson.contractId).toEqual(data.contractId);
                            expect(omnibusjson.requester).toEqual(data.personId);
                            expect(omnibusjson.memberInfo.length).toBeGreaterThan(0);
                            omnibusjson.memberInfo.forEach(function(memberDetails, index) {
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

        it("Person is Primary member and he is requesting for his/her records : " + Utility.getapiurl('USAGECONTRACT', TestData.UU6.contractId) + " ", function(doneFn) {
            let data = TestData.UU6;

            let permissionGivenEnrollees = [];
            omnibusjson.memberInfo.forEach(function(element) {
                let info = element.omnibusInfo;

                if (info.permissionGranted)
                    permissionGivenEnrollees.push(element.memberId)
            })

            let apiurl = Utility.getapiurl('USAGECONTRACT', data.contractId);
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

                            let responseMemberId = [];
                            responseMemberId.push(json[0].memberInfo.memberId);
                            expect(JSON.stringify(responseMemberId)).toEqual(JSON.stringify(permissionGivenEnrollees));
                    }
                })
                .done(doneFn);
        });

        it("Person is Non-Primary member and he is requesting for his/her records and Validating Whether Child Given Permission To View Or Not : " + Utility.getapiurl('USAGECONTRACT', TestData.UU6.contractId) + " ", function(doneFn) {
            let data = TestData.UU8;
            let omnijson;
            let apiurl = Utility.getapiurl('OMNIBUSCONTRACT', data.contractId, data.params);
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
                    omnijson = res.json;

                    let permissionGivenEnrollees = [];
                    var myMap = new Map();
                    omnijson.memberInfo.forEach(function(element) {
                        let info = element.omnibusInfo;

                        if (!info.permissionGranted && parseInt(element.memberAge) < 18) {

                            myMap.set(element.memberId, element.memberAge);

                        }
                    })

                    apiurl = Utility.getapiurl('USAGECONTRACT', data.contractId);
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

                                    myMap.forEach(function(value, key) {
                                        json.forEach(function(memberDetails, index) {
                                            if (memberDetails.memberInfo.memberId == key) {
                                                expect(memberDetails.message).toEqual("Omnibus-rule:Person is a primary member. However, this member has no permission to view this enrollee's details.");
                                            }
                                        })
                                    });
                            }
                        })
                        .done(doneFn);
                });
        });




        it("Is Requested Person Granted Permission to Requester or Not : " + Utility.getapiurl('USAGECONTRACT', TestData.UU6.contractId) + " ", function(doneFn) {
            let data = TestData.UU8;
            let omnijson;
            let apiurl = Utility.getapiurl('OMNIBUSCONTRACT', data.contractId, data.params);
            console.log("apiurl=" + apiurl);
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
                    omnijson = res.json;

                    let permissionGivenEnrollees = [];
                    var myMap = new Map();
                    omnijson.memberInfo.forEach(function(element) {
                        let info = element.omnibusInfo;
                        expect(info.permissionGranted != null).toBe(true, "Verify that 'permissionGranted' value is not null ");
                    })
                })
                .done(doneFn);
        });

    });
});