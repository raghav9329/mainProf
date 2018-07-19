'use strict';
const Joi = frisby.Joi;

var TestData = require('../../../testData/devAuto/' + testDataEnv + '/enrollClaimApi/familyRosterEnrollee.json');

describe('Family Roster Enrollee API: ', function() {
    dataProvider(TestData.testdata, function(data, description) {
        beforeEach(function() {
            jasmine.addMatchers(custommatcher.customMatchers);
        });
        it("TC: " + data.testCaseDesc + "  PersonID: " + data.personId + "  Contract ID: " + data.contractId + " ", function(doneFn) {

            let apiurl = Utility.getapiurl('FAMILYENROLLEE', data.contractId, data.params);
            console.log("ApiURl***" + apiurl)
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
                            json.forEach(function(enrollee, index) {
                                var tdata = data.verify[index];
                                expect(typeof enrollee.age).toEqual('string', "Verify that data type should be 'string'");
                                expect(typeof enrollee.benefitCoverageLevelCode).toEqual('string', "Verify that data type should be 'string'");
                                expect(typeof enrollee.birthDate).toEqual('string', "Verify that data type should be 'string'");
                                expect(typeof enrollee.contractId).toEqual('string', "Verify that data type should be 'string'");
                                expect(typeof enrollee.coverageSpanEffectiveDate).toEqual('string', "Verify that data type should be 'string'");
                                expect(typeof enrollee.coverageSpanEndDate).toEqual('string', "Verify that data type should be 'string'");
                                expect(typeof enrollee.eligibilityEffectiveDate).toEqual('string', "Verify that data type should be 'string'");
                                expect(typeof enrollee.eligibilityEndDate).toEqual('string', "Verify that data type should be 'string'");
                                expect(typeof enrollee.eligibilityStatus).toEqual('string', "Verify that data type should be 'string'");
                                expect(typeof enrollee.enrolleeId).toEqual('string', "Verify that data type should be 'string'");
                                expect(typeof enrollee.memberId).toEqual('string', "Verify that data type should be 'string'");
                                expect(typeof enrollee.firstName).toEqual('string', "Verify that data type should be 'string'");
                                expect(typeof enrollee.middleName).toEqual('string', "Verify that data type should be 'string'");
                                expect(typeof enrollee.lastName).toEqual('string', "Verify that data type should be 'string'");
                                expect(typeof enrollee.language).toEqual('string', "Verify that data type should be 'string'");
                                expect(typeof enrollee.personId).toEqual('string', "Verify that data type should be 'string'");
                                expect(typeof enrollee.gender).toEqual('string', "Verify that data type should be 'string'");
                                expect(typeof enrollee.inGracePeriod).toEqual('boolean', "Verify that data type should be 'boolean'");
                                expect(typeof enrollee.primaryIndicator).toEqual('string', "Verify that data type should be 'string'");
                                expect(typeof enrollee.phiFlag).toEqual('boolean', "Verify that data type should be 'boolean'");
                                expect(typeof enrollee.relationShip).toEqual('string', "Verify that data type should be 'string'");
                                expect(typeof enrollee.relationShipCode).toEqual('string', "Verify that data type should be 'string'");
                                expect(typeof enrollee.primary).toEqual('boolean', "Verify that data type should be 'boolean'");
                                expect(typeof enrollee.divisionId).toEqual('string', "Verify that data type should be 'string'");
                                expect(typeof enrollee.groupId).toEqual('string', "Verify that data type should be 'string'");

                                expect(enrollee.age).toEqual(tdata.age, "Verify that Age should be" + tdata.age);
                                expect(enrollee.benefitCoverageLevelCode).toEqual(tdata.benefitCoverageLevelCode, "Verify that benefitCoverageLevelCode should be" + tdata.benefitCoverageLevelCode);
                                expect(enrollee.birthDate).toEqual(tdata.birthDate, "Verify that birthDate should be" + tdata.birthDate);
                                expect(enrollee.contractId).toEqual(tdata.contractId, "Verify that contractId should be" + tdata.contractId);
                                expect(enrollee.coverageSpanEffectiveDate).toEqual(tdata.coverageSpanEffectiveDate, "Verify that coverageSpanEffectiveDate should be" + tdata.coverageSpanEffectiveDate);
                                expect(enrollee.coverageSpanEndDate).toEqual(tdata.coverageSpanEndDate, "Verify that coverageSpanEndDate should be" + tdata.coverageSpanEndDate);
                                expect(enrollee.eligibilityEffectiveDate).toEqual(tdata.eligibilityEffectiveDate, "Verify that eligibilityEffectiveDate should be" + tdata.eligibilityEffectiveDate);
                                expect(enrollee.eligibilityEndDate).toEqual(tdata.eligibilityEndDate, "Verify that eligibilityEndDate should be" + tdata.eligibilityEndDate);
                                expect(enrollee.eligibilityStatus).toEqual(tdata.eligibilityStatus, "Verify that eligibilityStatus should be" + tdata.eligibilityStatus);
                                expect(enrollee.enrolleeId).toEqual(tdata.enrolleeId, "Verify that enrolleeId should be" + tdata.enrolleeId);
                                expect(enrollee.memberId).toEqual(tdata.memberId, "Verify that memberId should be" + tdata.memberId);
                                expect(enrollee.email).toEqual(tdata.email, "Verify that email should be" + tdata.email);
                                expect(enrollee.firstName).toEqual(tdata.firstName, "Verify that firstName should be" + tdata.firstName);
                                expect(enrollee.middleName).toEqual(tdata.middleName, "Verify that middleName should be" + tdata.middleName);
                                expect(enrollee.lastName).toEqual(tdata.lastName, "Verify that lastName should be" + tdata.lastName);
                                expect(enrollee.language).toEqual(tdata.language, "Verify that language should be" + tdata.language);
                                expect(enrollee.personId).toEqual(tdata.personId, "Verify that personId should be" + tdata.personId);
                                expect(enrollee.officePhone).toEqual(tdata.officePhone, "Verify that officePhone should be" + tdata.officePhone);
                                expect(enrollee.homePhone).toEqual(tdata.homePhone, "Verify that homePhone should be" + tdata.homePhone);
                                expect(enrollee.mobilePhone).toEqual(tdata.mobilePhone, "Verify that mobilePhone should be" + tdata.mobilePhone);
                                expect(enrollee.otherPhone).toEqual(tdata.otherPhone, "Verify that otherPhone should be" + tdata.otherPhone);
                                expect(enrollee.gender).toEqual(tdata.gender, "Verify that gender should be" + tdata.gender);
                                expect(enrollee.inGracePeriod).toEqual(tdata.inGracePeriod, "Verify that inGracePeriod should be" + tdata.inGracePeriod);
                                expect(enrollee.primaryIndicator).toEqual(tdata.primaryIndicator, "Verify that primaryIndicator should be" + tdata.primaryIndicator);
                                expect(enrollee.phiFlag).toEqual(tdata.phiFlag, "Verify that phiFlag should be" + tdata.phiFlag);
                                expect(enrollee.relationShip).toEqual(tdata.relationShip, "Verify that relationShip should be" + tdata.relationShip);
                                expect(enrollee.relationShipCode).toEqual(tdata.relationShipCode, "Verify that relationShipCode should be" + tdata.relationShipCode);
                                expect(enrollee.primary).toEqual(tdata.primary, "Verify that primary should be" + tdata.primary);
                                expect(enrollee.divisionId).toEqual(tdata.divisionId, "Verify that divisionId should be" + tdata.divisionId);
                                expect(enrollee.groupId).toEqual(tdata.groupId, "Verify that groupId should be" + tdata.groupId);

                                enrollee.enrolleeAddresses.forEach(function(enrolladd, ind) {
                                    var tdataadd = tdata.enrolleeAddresses[ind];
                                    expect(enrolladd.addressLine1).toEqual(tdataadd.addressLine1, "Verify that addressLine1 should be" + tdataadd.addressLine1);
                                    expect(enrolladd.addressLine2).toEqual(tdataadd.addressLine2, "Verify that addressLine2 should be" + tdataadd.addressLine2);
                                    expect(enrolladd.addressLine3).toEqual(tdataadd.addressLine3, "Verify that addressLine3 should be" + tdataadd.addressLine3);
                                    expect(enrolladd.city).toEqual(tdataadd.city, "Verify that city should be" + tdataadd.city);
                                    expect(enrolladd.country).toEqual(tdataadd.country, "Verify that country should be" + tdataadd.country);
                                    expect(enrolladd.state).toEqual(tdataadd.state, "Verify that state should be" + tdataadd.state);
                                    expect(enrolladd.zipcode).toEqual(tdataadd.zipcode, "Verify that zipcode should be" + tdataadd.zipcode);
                                    expect(enrolladd.addressType).toEqual(tdataadd.addressType, "Verify that addressType should be" + tdataadd.addressType);

                                })

                                if (enrollee.memberId == '01') {
                                    expect(enrollee.relationShip).toEqual(tdata.relationShip,"Verifies that if Member ID is 01 Than relationsship should be primaryIndicator");
                                    expect(enrollee.primaryIndicator).toEqual('Y',"Verify that if Relationship is Primary then Primary Indiacator should display with 'Y'");
                                } else {
                                    expect(enrollee.primaryIndicator).toEqual('N',"Verify that if the realtionship is not Primary then the Primary Indicator Should display with 'N'");
                                }

                                let date = new Date();
                                if ((new Date(enrollee.coverageSpanEffectiveDate) < date) && (new Date(enrollee.coverageSpanEndDate) > date)) {
                                    expect(enrollee.eligibilityStatus).toEqual('GREEN',"Verify eligibilitystatus that Enrollee Coverage Start date should be less that Current Date and Coverageenddate should be greater than current date");
                                } else {
                                    expect(enrollee.eligibilityStatus).toEqual('GREY');
                                }

                                if (enrollee.relationShip == 'Primary') {
                                    expect(enrollee.relationShipCode).toEqual('10',"Verify that If Relationship is Primary then relationshipcode be 10");
                                } else if (enrollee.relationShip == 'Spouse') {
                                    expect(enrollee.relationShipCode).toEqual('20',"Verify that If Relationship is Spouse then relationshipcode be 20");
                                } else if (enrollee.relationShip == 'Child') {
                                    expect(enrollee.relationShipCode).toEqual('30',"Verify that If Relationship is Child then relationshipcode be 30");
                                }
                                expect(enrollee.firstName != null).toBe(true,"Verify that firstName filed is mandatory");
                                expect(enrollee.lastName != null).toBe(true,"Verify that Last Name filed is mandatory");
                                expect(enrollee.birthDate != null).toBe(true,"Verify that BirthDate filed is mandatory");

                            })
                            break;
                        case 400:
                            expect(json.shortDescription).toEqual(data.shortDescription);
                            expect(json.detailedDescription).toEqual(data.detailedDescription);
                            break;
                        case 401:
                           expect(res.status).toEqual(data.verify.status, "Verify that Status Code should be" + data.verify.status);
                           expect(json.error).toEqual(data.verify.error, "Verify that Error should be" + data.verify.error);
                           expect(json.message).toEqual(data.verify.message, "Verify that message should be" + data.verify.message);
                            break;
                        case 403:
                            expect(json.shortDescription).toEqual(data.shortDescription);
                            expect(json.detailedDescription).toEqual(data.detailedDescription);
                            break;
                        case 404:
                            expect(res.status).toEqual(data.verify.status, "Verify that Status Code should be" + data.verify.status);
                            break;
                        case 500:
                            expect(json.shortDescription).toEqual(data.shortDescription);
                            expect(json.detailedDescription).toEqual(data.detailedDescription);
                            break;

                    }
                })
                .done(doneFn);
        });
    });



});
