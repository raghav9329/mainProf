'use strict';
const Joi = frisby.Joi;

var TestData = require('../../../testData/devAuto/' + testDataEnv + '/enrollClaimApi/omnibus_enrolleeId.json');

describe('Omnibus Enroll API: ', function() {
    dataProvider(TestData.testData, function(data, description) {
        beforeEach(function() {
            jasmine.addMatchers(custommatcher.customMatchers);
        });
        it("TC: " + data.testCaseDesc + "  PersonID: " + data.personId + "  Enrollee ID: " + data.enrolleeId + " ", function(doneFn) {
            let apiurl = Utility.getapiurl('OMNIBUSENROLLEE', data.enrolleeId, data.params);
            console.log("API" + apiurl)
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
                            expect(json.permissionGranted).toEqual(data.verify.permissionGranted, "Verif that permissionGranted Should be" + data.verify.permissionGranted);
                            expect(json.message).toEqual(data.verify.message, "Verify that Message should be" + data.verify.message);
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
