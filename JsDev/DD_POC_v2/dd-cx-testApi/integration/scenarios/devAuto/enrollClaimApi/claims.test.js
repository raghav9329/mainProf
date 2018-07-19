'use strict';
const Joi    = frisby.Joi;

var TestData = require('../../../testData/devAuto/' + testDataEnv + '/enrollClaimApi/claims.json');

describe('Claims API: ', function() {
    dataProvider(TestData.testdata, function(data, description) {

        beforeEach(function() {
            jasmine.addMatchers(custommatcher.customMatchers);
        });



       it("TC: " + data.testCaseDesc + " Claim ID: " + data.claimId + "  PersonID: " + data.personId + "  Client Key: " + data.ClientKey + "", function(doneFn) {

            let apiurl = Utility.getapiurl('CLAIMID', data.claimId);
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
                    let respjson = res.json;
                    switch (res.status) {
                        case 200:
                        expect(typeof respjson.claimId).toEqual('string', "Verify that 'claimId' data type should be 'string'");
                        expect(typeof respjson.claimType).toEqual('string', "Verify that 'claimType' data type should be 'string'");
                        expect(typeof respjson.contractId).toEqual('string', "Verify that 'contractId' data type should be 'string'");
                        expect(typeof respjson.claims.claimSource).toEqual('string', "Verify that 'claimSource' data type should be 'string'");
                        expect(typeof respjson.claims.claimStatus).toEqual('string', "Verify that 'claimStatus' data type should be 'string'");
                        expect(typeof respjson.claims.dateOfService).toEqual('string', "Verify that 'dateOfService' data type should be 'string'");
                        expect(typeof respjson.claims.networkIndicator).toEqual('string', "Verify that 'networkIndicator' data type should be 'string'");
                        
                            expect(respjson.claimId).toEqual(data.verify.claimId, " Verify that 'claimId' should be:" + data.verify.claimId);
                            expect(respjson.claimType).toEqual(data.verify.claimType, " Verify that 'claimType' should be:" + data.verify.claimType);
                            expect(respjson.contractId).toEqual(data.verify.contractId, " Verify that 'contractId' should be:" + data.verify.contractId);
                            expect(respjson.claims.claimSource).toEqual(data.verify.claims.claimSource, " Verify that 'claimSource' should be:" + data.verify.claims.claimSource);
                            expect(respjson.claims.claimStatus).toEqual(data.verify.claims.claimStatus, " Verify that 'claimStatus' should be:" + data.verify.claims.claimStatus);
                            expect(respjson.claims.dateOfService).toEqual(data.verify.claims.dateOfService, " Verify that 'dateOfService' should be:" + data.verify.claims.dateOfService);
                            expect(respjson.claims.networkIndicator).toEqual(data.verify.claims.networkIndicator, " Verify that 'networkIndicator' should be:" + data.verify.claims.networkIndicator);
                            expect(respjson.patientDetails.firstName).toEqual(data.verify.patientDetails.firstName, " Verify that 'firstName' should be:" + data.verify.patientDetails.firstName);
                            expect(respjson.patientDetails.lastName).toEqual(data.verify.patientDetails.lastName, " Verify that 'lastName' should be:" + data.verify.patientDetails.lastName);
                            expect(respjson.patientDetails.birthDate).toEqual(data.verify.patientDetails.birthDate, " Verify that 'birthDate' should be:" + data.verify.patientDetails.birthDate);
                            expect(respjson.providerDetail.providerKey).toEqual(data.verify.providerDetail.providerKey, " Verify that 'providerKey' should be:" + data.verify.providerDetail.providerKey);
                            expect(respjson.providerDetail.providerName).toEqual(data.verify.providerDetail.providerName, " Verify that 'providerName' should be:" + data.verify.providerDetail.providerName);
                            expect(respjson.providerDetail.active).toEqual(data.verify.providerDetail.active, " Verify that 'active' should be:" + data.verify.providerDetail.active);
                            expect(respjson.providerDetail.gender).toEqual(data.verify.providerDetail.gender, " Verify that 'gender' should be:" + data.verify.providerDetail.gender);
                            expect(respjson.providerDetail.contactNumber).toEqual(data.verify.providerDetail.contactNumber, " Verify that 'contactNumber' should be:" + data.verify.providerDetail.contactNumber);
                            respjson.procedureDetails.forEach(function(respProcDetail, index) {
                                var dataProcDetail = data.verify.procedureDetails[index];
                                expect(respProcDetail.serviceLine).toEqual(dataProcDetail.serviceLine, " Verify that 'serviceLine' should be:" + dataProcDetail.serviceLine);
                                expect(respProcDetail.sequenceNumber).toEqual(dataProcDetail.sequenceNumber, " Verify that 'sequenceNumber' should be:" + dataProcDetail.sequenceNumber);
                                expect(respProcDetail.surface).toEqual(dataProcDetail.surface, " Verify that 'surface' should be:" + dataProcDetail.surface);
                                expect(respProcDetail.dateOfService).toEqual(dataProcDetail.dateOfService, " Verify that 'sequenceNumber' should be:" + dataProcDetail.dateOfService);
                                respProcDetail.procedureItems.forEach(function(respProcItems, ind) {
                                    var dataProcItems = dataProcDetail.procedureItems[ind];
                                    expect(respProcItems.procedureCode).toEqual(dataProcItems.procedureCode, " Verify that 'procedureCode' should be:" + dataProcItems.procedureCode);
                                    expect(respProcItems.procDescription).toEqual(dataProcItems.procDescription, " Verify that 'procDescription' should be:" + dataProcItems.procDescription);
                                    expect(respProcItems.toothCd).toEqual(dataProcItems.toothCd, " Verify that 'toothCd' should be:" + dataProcItems.toothCd);
                                    expect(respProcItems.submittedAmount).toEqual(dataProcItems.submittedAmount, " Verify that 'submittedAmount' should be:" + dataProcItems.submittedAmount);
                                    expect(respProcItems.acceptedAmount).toEqual(dataProcItems.acceptedAmount, " Verify that 'acceptedAmount' should be:" + dataProcItems.acceptedAmount);
                                    expect(respProcItems.paidByDeltaAmount).toEqual(dataProcItems.paidByDeltaAmount, " Verify that 'paidByDeltaAmount' should be:" + dataProcItems.paidByDeltaAmount);
                                    expect(respProcItems.paidByPatientAmount).toEqual(dataProcItems.paidByPatientAmount, " Verify that 'paidByPatientAmount' should be:" + dataProcItems.paidByPatientAmount);
                                    expect(respProcItems.deductibleAmount).toEqual(dataProcItems.deductibleAmount, " Verify that 'deductibleAmount' should be:" + dataProcItems.deductibleAmount);
                                    expect(respProcItems.explnCode).toEqual(dataProcItems.explnCode, " Verify that 'explnCode' should be:" + dataProcItems.explnCode);
                                    expect(respProcItems.explnDescription).toEqual(dataProcItems.explnDescription, " Verify that 'explnDescription' should be:" + dataProcItems.explnDescription);
                                    expect(respProcItems.maxContractAllowance).toEqual(dataProcItems.maxContractAllowance, " Verify that 'maxContractAllowance' should be:" + dataProcItems.maxContractAllowance);
                                    expect(respProcItems.contractBenefitLevel).toEqual(dataProcItems.contractBenefitLevel, " Verify that 'contractBenefitLevel' should be:" + dataProcItems.contractBenefitLevel);
                                })
                            })
                            expect(respjson.claimProcesingTime.receivedTime).toEqual(data.verify.claimProcesingTime.receivedTime, " Verify that 'receivedTime' should be:" + data.verify.claimProcesingTime.receivedTime);
                            expect(respjson.claimProcesingTime.statusTime).toEqual(data.verify.claimProcesingTime.statusTime, " Verify that 'statusTime' should be:" + data.verify.claimProcesingTime.statusTime);
                            expect(respjson.claimProcesingTime.paidTime).toEqual(data.verify.claimProcesingTime.paidTime, " Verify that 'receivedTime' should be:" + data.verify.claimProcesingTime.paidTime);
                            expect(respjson.visitSummary.totalSubmittedAmount).toEqual(data.verify.visitSummary.totalSubmittedAmount, " Verify that 'totalSubmittedAmount' should be:" + data.verify.visitSummary.totalSubmittedAmount);
                            expect(respjson.visitSummary.totalAcceptedAmount).toEqual(data.verify.visitSummary.totalAcceptedAmount, " Verify that 'totalAcceptedAmount' should be:" + data.verify.visitSummary.totalAcceptedAmount);
                            expect(respjson.visitSummary.totalPaidByAnotherPlanAmount).toEqual(data.verify.visitSummary.totalPaidByAnotherPlanAmount, " Verify that 'totalPaidByAnotherPlanAmount' should be:" + data.verify.visitSummary.totalPaidByAnotherPlanAmount);
                            expect(respjson.visitSummary.totalPatientResponsibilityAmount).toEqual(data.verify.visitSummary.totalPatientResponsibilityAmount, " Verify that 'totalPatientResponsibilityAmount' should be:" + data.verify.visitSummary.totalPatientResponsibilityAmount);
                            expect(respjson.visitSummary.totalPaidByDeltaAmount).toEqual(data.verify.visitSummary.totalPaidByDeltaAmount, " Verify that 'totalPaidByDeltaAmount' should be:" + data.verify.visitSummary.totalPaidByDeltaAmount);
                            expect(respjson.visitSummary.totalDeductibleAmount).toEqual(data.verify.visitSummary.totalDeductibleAmount, " Verify that 'totalDeductibleAmount' should be:" + data.verify.visitSummary.totalDeductibleAmount);

                            break;
                        case 400:
                            expect(respjson.errorCode).toEqual(data.verify.errorCode);
                            expect(respjson.shortDescription).toEqual(data.verify.shortDescription);
                            expect(respjson.detailedDescription).toEqual(data.verify.detailedDescription);
                            break;
                        case 401:
                            expect(respjson.errorCode).toEqual(data.verify.errorCode);
                            expect(respjson.shortDescription).toEqual(data.verify.shortDescription);
                            expect(respjson.detailedDescription).toEqual(data.verify.detailedDescription);
                            break;
                        case 403:
                            expect(respjson.errorCode).toEqual(data.verify.errorCode);
                            expect(respjson.shortDescription).toEqual(data.verify.shortDescription);
                            expect(respjson.detailedDescription).toEqual(data.verify.detailedDescription);
                            break;
                        case 404:
                            expect(respjson.errorCode).toEqual(data.verify.errorCode);
                            expect(respjson.shortDescription).toEqual(data.verify.shortDescription);
                            expect(respjson.detailedDescription).toEqual(data.verify.detailedDescription);
                            break;
                        case 500:
                            expect(respjson.errorCode).toEqual(data.verify.errorCode);
                            expect(respjson.shortDescription).toEqual(data.verify.shortDescription);
                            expect(respjson.detailedDescription).toEqual(data.verify.detailedDescription);
                            break;

                    }
                })
                .done(doneFn);
        });
    });
});
