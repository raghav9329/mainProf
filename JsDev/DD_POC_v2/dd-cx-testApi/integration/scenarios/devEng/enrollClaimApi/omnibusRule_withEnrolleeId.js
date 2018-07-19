'use strict';
const Joi = frisby.Joi;

var TestData = require('../../../testData/devEng/enrollClaimApi/omnibus_enrolleeId.json');

describe('Omnibus Enroll API: ', function() {
    dataProvider(TestData.positiveTestData, function(data, description) {
        beforeEach(function() {
            jasmine.addMatchers(custommatcher.customMatchers);
        });
        it("Validate Omnibus Enrollee API Response has granted permission or not" + Utility.getapiurl('OMNIBUSENROLLEE', data.enrolleeId, data.params) + " ", function(doneFn) {
            let apiurl = Utility.getapiurl('OMNIBUSENROLLEE', data.enrolleeId, data.params);
            console.log("apiurl=" + apiurl)
            frisby
                .setup({
                    request: {
                        headers: {
                            'PersonId': data.personId,
                            'ClientKey':data.ClientKey,
                            'Content-Type': 'application/json'
                        }
                    }
                })
                .get(apiurl)
                .then(function(res) {
                    let json = res.json;
                    switch (res.status) {
                        case 200:
                            expect(json.permissionGranted).toEqual(data.permissionGranted);
                            expect(json.message).toEqual(data.message);
                    }
                })
                .done(doneFn);
        });
    });
    dataProvider(TestData.negativeTestData, function(data, description) {
        beforeEach(function() {
            jasmine.addMatchers(custommatcher.customMatchers);
        });

        it("Omnibus Contract API Negative Response for Invalid PersonId and Invalid EnrolleeId" + Utility.getapiurl('OMNIBUSENROLLEE', data.enrolleeId, data.params) + " ", function(doneFn) {
            let apiurl = Utility.getapiurl('OMNIBUSENROLLEE', data.enrolleeId, data.params);
            console.log("apiurl=" + apiurl)
            frisby
                .setup({
                    request: {
                        headers: {
                            'PersonId': data.personId,
                            'ClientKey':data.ClientKey,
                            'Content-Type': 'application/json'
                        }
                    }
                })
                .get(apiurl)
                .then(function(res) {
                    let json = res.json;
                    switch (res.status) {
                        case 401:
                            expect(json.errorCode).toEqual(data.errorCode);
                            expect(json.shortDescription).toEqual(data.shortDescription);
                            expect(json.detailedDescription).toEqual(data.detailedDescription);
                            break;
                        case 500:
                            expect(json.errorCode).toEqual(data.errorCode);
                            expect(json.shortDescription).toEqual(data.shortDescription);
                            expect(json.detailedDescription).toEqual(data.detailedDescription);
                            break;
                    }
                })
                .done(doneFn);
        });
    });
});