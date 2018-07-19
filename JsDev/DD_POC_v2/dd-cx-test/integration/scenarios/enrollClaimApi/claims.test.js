'use strict';
const Joi = frisby.Joi;

var TestData = require('../../testData/enrollClaimApi/claims.json');

describe('Claims API: ', function() {
    dataProvider(TestData.testdata, function(data, description) {
        it("Validate API Response" + Utility.getapiurl('CLAIMID', data.claimId) + " ", function(doneFn) {
            let apiurl = Utility.getapiurl('CLAIMID', data.claimId);
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
                    expect(res.status).toEqual(200)
                    console.log("json======" + JSON.stringify(json))
                })
                .done(doneFn);
        });
        it("Validate API Response" + Utility.getapiurl('CLAIMID', data.claimId) + " ", function(doneFn) {
            let apiurl = Utility.getapiurl('CLAIMID', data.claimId);
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
                    expect(res.status).toEqual(200);
                    expect(json.claimId).toEqual(data.claimId);
                    expect(json.patientDetails.personId).toEqual(data.PersonId);
                    expect(json.patientDetails.firstName).toEqual(data.firstName);
                    expect(json.patientDetails.middleName).toEqual(data.middleName);
                    expect(json.patientDetails.lastName).toEqual(data.lastName);
                    expect(json.patientDetails.birthDate).toEqual(data.birthDate);
                    expect(json.providerDetail.providerId).toEqual(data.providerId);
                    expect(json.providerDetail.providerType).toEqual(data.providerType);
                    expect(json.providerDetail.providerKey).toEqual(data.providerKey);
                    expect(json.providerDetail.providerName).toEqual(data.providerName);
                    expect(json.providerDetail.officeAddress).toEqual(data.officeAddress);
                    expect(json.providerDetail.officePhone).toEqual(data.officePhone);
                    expect(json.providerDetail.officeName).toEqual(data.officeName);
                })
                .done(doneFn);
        });
    });
});
