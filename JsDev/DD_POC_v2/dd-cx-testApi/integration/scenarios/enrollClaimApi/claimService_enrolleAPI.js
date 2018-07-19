'use strict';
const Joi = frisby.Joi;

var TestData = require('../../testData/enrollClaimApi/claimService_enrolleeAPI.json');

describe('Enroll API: ', function() {
    it("Validate Enrollee API Response for GIVEN Primary Member able to view all his/her claim records" + Utility.getapiurl('ENROLLEES', TestData.enrolleeTestData.test1.enrolleeId) + " ", function(doneFn) {
        let data = TestData.enrolleeTestData.test1;
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
                let responseJson = res.json;
                expect(res.status).toEqual(200);
                expect(responseJson.enrolleeClaimSummaryList.length).toBeGreaterThan(0);
                expect(responseJson).toEqual(data.verify)

            })
            .done(doneFn);
    });

    it("Validate Enrollee API Response for GIVEN Adult Member able to view all his/her claim records" + Utility.getapiurl('ENROLLEES', TestData.enrolleeTestData.test2.enrolleeId) + " ", function(doneFn) {
        let data = TestData.enrolleeTestData.test2;
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
                let responseJson = res.json;
                expect(res.status).toEqual(200);
                expect(responseJson.enrolleeClaimSummaryList.length).toBeGreaterThan(0);
                expect(responseJson).toEqual(data.verify)

            })
            .done(doneFn);
    });

});