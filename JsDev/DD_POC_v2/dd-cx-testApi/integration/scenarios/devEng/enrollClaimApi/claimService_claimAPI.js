'use strict';
const Joi = frisby.Joi;


var TestData = require('../../../testData/devEng/enrollClaimApi/claimService_claimAPI.json');

describe('Claims API: ', function() {

    it("Validate Claims API Response for GIVEN Valid PersonId and ClaimId" + Utility.getapiurl('CLAIMID', TestData.claimTestData.test1.claimId) + " ", function(doneFn) {
        let data = TestData.claimTestData.test1;
        let apiurl = Utility.getapiurl('CLAIMID', data.claimId);
        console.log("apiurl=" + apiurl)
        frisby
            .setup({
                request: {
                    headers: {
                        'PersonId': data.personId,
                        'Content-Type': 'application/json'
                    }
                }
            })
            .get(apiurl)
            .then(function(res) {
                let responseJson = res.json;
                expect(res.status).toEqual(200);
                expect(responseJson).toEqual(data.verify)
            })
            .done(doneFn);
    });

    it("Validate Claims API Response for GIVEN Invalid PersonId or ClaimId" + Utility.getapiurl('CLAIMID', TestData.negativeClaimTestData.test1.claimId) + " ", function(doneFn) {
        let data = TestData.negativeClaimTestData.test1;
        let apiurl = Utility.getapiurl('CLAIMID', data.claimId);
        console.log("apiurl=" + apiurl)
        frisby
            .setup({
                request: {
                    headers: {
                        'PersonId': data.personId,
                        'Content-Type': 'application/json'
                    }
                }
            })
            .get(apiurl)
            .then(function(res) {
                let responseJson = res.json;
                expect(res.status).toEqual(500);
                expect(responseJson.errorCode).toEqual(data.errorCode);
                expect(responseJson.shortDescription).toEqual(data.shortDescription);
                expect(responseJson.detailedDescription).toEqual(data.detailedDescription);
            })
            .done(doneFn);
    });

});