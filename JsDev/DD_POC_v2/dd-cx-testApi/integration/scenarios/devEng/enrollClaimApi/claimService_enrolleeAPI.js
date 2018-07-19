'use strict';
const Joi = frisby.Joi;

var TestData = require('../../../testData/devEng/enrollClaimApi/claimService_enrolleeAPI.json');

describe('Enroll API: ', function() {
    dataProvider(TestData.testdata, function(data, description) {

        it("TC: " + data.testCaseDes + "API URl: " + Utility.getapiurl('ENROLLEES', data.enrolleeId) + " ", function(doneFn) {
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
                    let json = res.json;
                    switch (res.status) {
                        case 200:
                            expect(json).toEqual(data.verify);
                        case 401:
                            expect(json.errorCode).toEqual(data.errorCode);
                            expect(json.shortDescription).toEqual(data.shortDescription);
                            expect(json.detailedDescription).toEqual(data.detailedDescription);
                            /*  case 400:
                                  expect(json.message).toEqual(data.message);
                              case 401:
                                  expect(json.shortDescription).toEqual(data.shortDescription);
                                  expect(json.detailedDescription).toEqual(data.detailedDescription);
                              case 403:
                                  expect(json.shortDescription).toEqual(data.shortDescription);
                                  expect(json.detailedDescription).toEqual(data.detailedDescription);
                              case 404:
                                  expect(json.shortDescription).toEqual(data.shortDescription);
                                  expect(json.detailedDescription).toEqual(data.detailedDescription);
                              case 500:
                                  expect(json.shortDescription).toEqual(data.shortDescription);
                                  expect(json.detailedDescription).toEqual(data.detailedDescription);*/

                    }
                })
                .done(doneFn);
        });
    });
});