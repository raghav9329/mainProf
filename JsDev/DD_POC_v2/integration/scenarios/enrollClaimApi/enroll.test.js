'use strict';
const Joi = frisby.Joi;

var TestData = require('../../testData/enrollClaimApi/enroll.json');

describe('Enroll API: ', function() {
    dataProvider(TestData.testdata, function(data, description) {

        it("Validate API Response" + Utility.getapiurl('ENROLLEES', data.enrolleeId) + " ", function(doneFn) {
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
                            expect(json.enrolleeClaimSummaryList.length).toBeGreaterThan(0);
                            json.enrolleeClaimSummaryList.forEach(function(enrolle, index) {
                                if (enrolle.claimId == data.claimId) {
                                  var  enrollee=enrolle;
                                    expect(typeof enrollee.personId).toEqual('string');
                                    expect(typeof enrollee.claimId).toEqual('string');
                                    expect(typeof enrollee.claimStatus).toEqual('string');
                                    expect(typeof enrollee.dateOfService).toEqual('string');
                                    expect(typeof enrollee.providerDetails.providerKey).toEqual('string');
                                    expect(typeof enrollee.providerDetails.active).toEqual('boolean');
                                    expect(typeof enrollee.procedureDetails[0].procedureCode).toEqual('string');
                                    expect(typeof enrollee.procedureDetails[0].procedureDescription).toEqual('string');
                                    expect(typeof enrollee.procedureDetails[0].procedureCount).toEqual('number');
                                    expect(typeof enrollee.enrolleeResponsibilityAmount).toEqual('number');

                                    expect(enrollee.personId).toEqual(data.PersonId);
                                    expect(enrollee.claimId).toEqual(data.claimId);
                                    expect(enrollee.claimStatus).toEqual(data.claimStatus);
                                    expect(enrollee.dateOfService).toEqual(data.dateOfService);
                                    expect(enrollee.providerDetails.providerKey).toEqual(data.providerKey);
                                    expect(enrollee.providerDetails.providerName).toEqual(data.providerName);
                                    expect(enrollee.providerDetails.active).toEqual(data.active);
                                    expect(enrollee.providerDetails.gender).toEqual(data.gender);
                                    expect(enrollee.providerDetails.phoneNumber).toEqual(data.phoneNumber);
                                    expect(enrollee.procedureDetails[0].procedureCode).toEqual(data.procedureCode);
                                    expect(enrollee.procedureDetails[0].procedureDescription).toEqual(data.procedureDescription);
                                    expect(enrollee.procedureDetails[0].procedureCount).toEqual(data.procedureCount);
                                    expect(enrollee.enrolleeResponsibilityAmount).toEqual(data.enrolleeResponsibilityAmount);
                                }
                            })

                        case 400:
                            expect(json.shortDescription).toEqual(data.shortDescription);
                            expect(json.detailedDescription).toEqual(data.detailedDescription);
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
                            expect(json.detailedDescription).toEqual(data.detailedDescription);

                    }
                })
                .done(doneFn);
        });
    });
});
