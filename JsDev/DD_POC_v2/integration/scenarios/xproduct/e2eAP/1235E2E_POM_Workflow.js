//CXINIT-1235 : Review my previous work and start a new E2E Page Object Model based Work Flow

//This Spec is used to Verify and Validate Ene to End Work Flow with the Errors and the Happy path

var perInfo = new(require('../../../pageObjects/cxinit/perInfo-page.js'));
var depInfo = new(require('../../../pageObjects/cxinit/dependent-page.js'));
var facilities = new(require('../../../pageObjects/cxinit/facilities-page.js'));
var payment = new(require('../../../pageObjects/cxinit/payment-page.js'));
var receipt = new(require('../../../pageObjects/cxinit/receipt-page.js'));
var enrollPage = new(require('../../../pageObjects/cxinit/enroll-page.js'));
var TestData = require('../../../testData/' + testDataEnv + '/dhmo/051217_E2E_POM_Workflow.json');
var pdf2Text = require('pdf2text')
var statesData = require('../../../testData/' + testDataEnv + '/statesAndProducts.json');
var shopping = new(require('../../../pageObjects/cxinit/shopping-page.js'));
var planOptions = new(require('../../../pageObjects/cxinit/plan-options-page.js'));
var planDetails = new(require('../../../pageObjects/cxinit/plan-details-page.js'));

//To Navigate Personla Info Page
dataProvider(statesData.states, function(sData, sdescription) {
    if (states.indexOf(sdescription) != -1) {
        dataProvider(sData.products, function(tData, pdescription) {
            if (product.indexOf(pdescription) != -1) {

                describe('1235: E2E_WorkFlow:(051217_E2E_POM_Workflow) : ||State:' + sdescription + '||Product:' + pdescription + '||', function() {
                    var effectiveDate, apNumber, pathToPdf, facility1, facility2, facility3, facility4, facility5, facility6, facility7;
                    beforeAll(function() {
                        Utility.openApplication('', tData.product);
                    });
                    beforeEach(function() {
                        jasmine.addMatchers(custommatcher.customMatchers);
                    });

                    //Fill the Valid Data in the home page of Enrollment and Proceed

                    it('E2E_1 : Should complete the Enroll Page', function() {
                        enrollPage.enterHomePageDetails(tData.enrollData).then(function(sdate) {
                            effectiveDate = sdate;
                            console.log("sdate============" + sdate);
                        })
                        expect(perInfo.fieldFirstName.isPresentAndDisplayed()).toBeTruthy();
                        perInfo.next.click();
                        expect(perInfo.getServerValidationMessages()).toEqual(TestData.personalInfoServerErrors);
                        expect(perInfo.getClientValidationMessages()).toEqual(TestData.personalInfoServerErrors);
                    });


                    it('E2E_1.1 : Should complete the Personal info page with Max characters of the fields in Page', function() {
                        enrollPage.enterHomePageDetails(tData.enrollData).then(function(sdate) {
                            effectiveDate = sdate;
                            console.log("sdate============" + sdate);
                        })
                        expect(perInfo.fieldFirstName.isPresentAndDisplayed()).toBeTruthy();

                        if (pdescription == 'DHMO' || pdescription == 'DPPO') {
                            TestData.MemberId = false;
                            TestData.ssn = "1234560215",
                                TestData.alternateid = "test@test.com";
                        }
                        if (pdescription == 'AHMO' || pdescription == 'APPO') {
                            TestData.MemberId = Utility.randomNo('Number', 10);
                            TestData.ssn = false;
                            TestData.alternateid = false;
                        }

                        perInfo.fieldFirstName.setText(TestData.maxlengthFirstname);
                        perInfo.fieldFirstName.getValue().then(function(fname) {
                            console.log("fname length==" + fname.length);
                            expect(perInfo.fieldFirstName.getAttribute('maxlength')).toEqual(fname.length.toString());
                        })
                        perInfo.fieldMidInitial.setText(TestData.maxlengthMiddlename);
                        perInfo.fieldLastName.setText(TestData.maxlengthLastname);

                        perInfo.fieldLastName.getValue().then(function(lname) {
                                console.log("lname.length==" + lname.length);
                                expect(perInfo.fieldLastName.getAttribute('maxlength')).toEqual(lname.length.toString());
                            })
                            /*if (pdescription == 'DHMO' || pdescription == 'AHMO') {
                                perInfo.fieldSsn.setText(TestData.ssn);
                                perInfo.fieldAlternateId.setText(TestData.alternateid);
                                perInfo.alternateTooltip.click();
                                expect(perInfo.alternateHelpopUp.isPresentAndDisplayed()).toBeTruthy();
                                perInfo.alternateidPopExit.click();
                            }*/


                        perInfo.fieldZipCode.getValue().then(function(zipcode) {
                            console.log("Zipcode===" + zipcode);
                            expect(zipcode).toEqual(tData.enrollData.ZIPcode);
                            // expect(zipcode).toEqual(TestData.ZipCode);
                        })
                        perInfo.fieldZipCode.setText(tData.enrollData.ZIPcode);
                        perInfo.fieldPhoneNumber.click();
                        if (perInfo.zipPopUp.isPresentAndDisplayed()) {
                            expect(perInfo.zipPopUp.isPresentAndDisplayed()).toBeTruthy();
                            perInfo.zipPopBack.click();
                        }

                        perInfo.fieldZipCode.getValue().then(function(zipcode) {
                            console.log("Zipcode===" + zipcode);
                            tData
                            expect(zipcode).toEqual(tData.enrollData.ZIPcode);
                            // expect(zipcode).toEqual(TestData.ZipCode);
                        })
                        perInfo.fieldZipCode.setText(tData.enrollData.ZIPcode);
                        perInfo.fieldPhoneNumber.click();
                        if (perInfo.zipPopUp.isPresentAndDisplayed()) {
                            expect(perInfo.zipPopUp.isPresentAndDisplayed()).toBeTruthy();
                            perInfo.zipPopNewQuote.click();
                        }
                        if(sdescription == 'CA' && pdescription == 'DPPO'){
                            console.log("CA State and DPPO Product");
                            // expect(browser.getTitle()).toEqual('Get A Quote');
                            enrollPage.enterHomePageDetails(tData.enrollData).then(function(sdate) {
                            effectiveDate = sdate;
                            console.log("sdate============" + sdate);
                        })

                        }
                        // if (sdescription == 'CA' || sdescription == 'TX' || sdescription == 'PA' || sdescription == 'FL' || sdescription == 'NY' || sdescription == 'AK' || sdescription == 'TN' || sdescription == 'VI' || sdescription == 'DC' || sdescription == 'LA' || sdescription == 'MD') {
                            expect(planOptions.isAt()).toEqual(true);
                            planOptions.getPlanDetails(tData.enrollData.PlanName).click();
                            // planOptions.getPlanDetails(TestData.PlanOptionsPlan).click();
                            planDetails.buyPlan.click();
                        // }

                        expect(perInfo.fieldFirstName.isPresentAndDisplayed()).toBeTruthy();
                        perInfo.fillPersonalInfo(TestData);
                        perInfo.fillAddress(TestData);
                        perInfo.phoneNumberemail(TestData);
                        perInfo.next.click();

                        /*expect(shopping.Zipcode.isPresentAndDisplayed()).toBeTruthy();
                        expect(browser.getTitle()).toEqual("Get A Quote");
                        shopping.Zipcode.setText(tData.enrollData.ZIPcode);
                        shopping.enterDOB(TestData.dob);
                        shopping.removeDependent.click();
                        shopping.Showplans.click();*/
                        // perInfo.next.click();maxlength
                    });

                    //Enter the valid Test Data in the Personal Information page and Click n the Next

                    it('E2E_Flow_2: Verify Personal Information Page is filled with Valid data and Proceed', function() {
                        if (pdescription == 'DHMO' || pdescription == 'DPPO') {
                            TestData.MemberId = false;
                            TestData.ssn = "1234560215",
                                TestData.alternateid = "test@test.com";
                        }
                        if (pdescription == 'AHMO' || pdescription == 'APPO') {
                            TestData.MemberId = Utility.randomNo('Number', 10);
                            TestData.ssn = false;
                            TestData.alternateid = false;
                        }
                        perInfo.fillPersonalInfo(TestData);
                        perInfo.fillAddress(tData);
                        perInfo.phoneNumberemail(TestData);
                        if (pdescription == 'DHMO' || pdescription == 'DPPO') {
                            perInfo.fillBroker(TestData);
                        }
                        if (pdescription == 'AHMO' || pdescription == 'APPO') {
                            perInfo.referralSource.selectByText(TestData.referralSource);
                            perInfo.next.click();
                        }
                        expect(browser.getTitle()).toEqual(TestData.DependentTitle);

                    });

                    //Verify and Validate the both the Client and Server side Errors in the Dependent Page with the NUll Values supplied

                    it('E2E_Flow_3: Verifying the Errors of both client and server side by passing NULL values', function() {
                        depInfo.fieldAddDependents.click();
                        depInfo.next.click();
                        expect(depInfo.getServerValidationMessages()).toEqual(TestData.dependentErrors);
                        Utility.scrollToTop();
                        depInfo.deleteDependent('Dependent1').click();
                    });



                    it('E2E_Flow_3_1: Verifying and Validate the Dependents of same type(Domestic Partner and Spouse do not allowed) not allowed more than 1', function() {
                        expect(depInfo.fieldAddDependents.isPresentAndDisplayed()).toBeTruthy();
                        depInfo.fillDependent('Dependent1', TestData.domesticpartner1, false);
                        depInfo.fillDependent('Dependent2', TestData.Spouse1, false);
                        depInfo.next.click();
                        expect(depInfo.premiumChangePopUp.isPresentAndDisplayed()).toBeTruthy();
                        depInfo.continue.click();
                        Utility.scrollToTop();
                        expect(depInfo.depError.getText()).toEqual("You can select only 1 Spouse or Domestic Partner.");
                        depInfo.relationship('Dependent2').selectByText(TestData.updateRelationship);

                    });

                    //Verifying and adding Dependents 6 and proceed to next page

                    it('E2E_Flow_4: Verify 6 dependents were added and furnished with valid Test Data and the calculated Premium Pop up is displayed', function() {
                        depInfo.fillDependent('Dependent3', TestData.child3, false);
                        depInfo.fillDependent('Dependent4', TestData.child4, false);
                        depInfo.fillDependent('Dependent5', TestData.child5, false);
                        depInfo.fillDependent('Dependent6', TestData.child6, false);
                        depInfo.next.click();
                        // expect(depInfo.premiumChangePopUp.isPresentAndDisplayed()).toBeTruthy();
                        if (depInfo.continue.isPresentAndDisplayed()) depInfo.continue.click();
                        Utility.delay(maxWait);
                        if (pdescription == 'DHMO' || pdescription == 'AHMO') {
                            expect(browser.getTitle()).toEqual(TestData.facilitiesTitle);
                        } else {
                            expect(browser.getTitle()).toEqual(TestData.paymentTitle);
                        }
                    });

                    //Verify and Select the Facility for the Dependent
                    if (pdescription == 'DHMO' || pdescription == 'AHMO') {
                        it('E2E_Flow_5: Verify and select a Facility for the primary', function() {
                            facilities.selectFacility().then(function(fnamee) {
                                facility1 = fnamee;
                            });
                            facilities.next.click();
                        });

                        //Verify and Select the Facility for the Dependent

                        it('E2E_Flow_5_1: Verify and select the facilities for dependents', function() {
                            facilities.selectFacility().then(function(fnamee) {
                                facility2 = fnamee;
                            });
                            facilities.next.click();
                        });

                        //Verify and Select the Facilities for the 4 other Dependents

                        it('E2E_Flow_5_2: Verify and select the facilities for dependents', function() {
                            facilities.selectFacility().then(function(fnamee) {
                                facility3 = fnamee;
                            });
                            facilities.next.click();
                            facilities.selectFacility().then(function(fnamee) {
                                facility4 = fnamee;
                            });
                            facilities.next.click();
                            facilities.selectFacility().then(function(fnamee) {
                                facility5 = fnamee;
                            });
                            facilities.next.click();
                            facilities.selectFacility().then(function(fnamee) {
                                facility6 = fnamee;
                            });
                            facilities.next.click();
                            facilities.selectFacility().then(function(fnamee) {
                                facility7 = fnamee;
                            });
                            facilities.next.click();
                            expect(browser.getTitle()).toEqual(TestData.paymentTitle);
                        });
                    }

                    //Validate and Verify the both the client and Server side error validations in the Payment Page

                    it('E2E_Flow_6: Validate and Verify the Errors of both the Client and Server in the Payment Page', function() {
                        if (pdescription == 'DHMO' || pdescription == 'DPPO') {
                            expect(payment.discloser.getAttribute('href')).toContain(tData.discloser);
                            payment.discloser.click();
                            Utility.switchToWindow(1);
                            expect(browser.getCurrentUrl()).toContain(tData.discloser);
                            Utility.switchToWindow(0);
                        }
                        payment.billingAddress.click();
                        payment.billingChkBox.unCheck();
                        payment.purchaseNow.click();
                        expect(payment.getCCValidationMessages()).toEqual(TestData.paymentErrors)
                        expect(payment.getBillingAddressValidationMessages()).toEqual(TestData.paymentAddressErrors);
                        expect(payment.getCCServerValidationMessages()).toEqual(TestData.paymentErrors);
                        expect(payment.getBillingAddressServerValidationMessages()).toEqual(TestData.paymentAddressErrors);
                    });

                    //Furnish all the fields of the Payment page with the valid Test Data and proceed

                    /* Unable to Proceed logged a defect for the same CXINIT-1393 */

                    it('E2E_Flow_7: Validate and Verify Payment Page Details with valid Test Data', function() {
                        payment.billingChkBox.check();
                        payment.fillpayment(TestData);
                        if (pdescription == 'AHMO' || pdescription == 'APPO') {
                            payment.frequencyAnnualy.select();
                        }
                        payment.purchaseNow.click();
                        expect(browser.getTitle()).toEqual(TestData.receiptTitle);
                    });

                    //Verify and Validate the Application Number and Plan Name in the Receipt Page

                    it('E2E_Flow_8 :Should display plansummary', function() {
                        if (pdescription == 'DHMO' || pdescription == 'DPPO') {
                            receipt.applicationNumber.getText().then(function(appicationNumber) {
                                console.log("Application Number == " + appicationNumber);
                                apNumber = appicationNumber;
                            })
                        }
                        if (pdescription == 'DPPO') tData.planSummary.Rootcanals = "100%";
                        var plansummary = tData.planSummary;
                        receipt.planSummary.click();
                        expect(receipt.getPlanSummaryByKey('Deductible per calendar year per person').getText()).toEqual(plansummary.Deductible_per_calendar);
                        expect(receipt.getPlanSummaryByKey('Maximum per calendar year per person').getText()).toEqual(plansummary.Max_per_calendar);
                        expect(receipt.getPlanSummaryByKey('Office visit').getText()).toEqual(plansummary.Officevisit);
                        expect(receipt.getPlanSummaryByKey('Exams').getText()).toEqual(plansummary.Exams);
                        expect(receipt.getPlanSummaryByKey('X-rays').getText()).toEqual(plansummary.Xrays);
                        expect(receipt.getPlanSummaryByKey('Cleanings').getText()).toEqual(plansummary.Cleanings);
                        expect(receipt.getPlanSummaryByKey('Fillings').getText()).toEqual(plansummary.Fillings);
                        expect(receipt.getPlanSummaryByKey('Root canals').getText()).toEqual(plansummary.Rootcanals);
                        expect(receipt.getPlanSummaryByKey('Gum treatment').getText()).toEqual(plansummary.Gumtreatment);
                        expect(receipt.getPlanSummaryByKey('Extractions').getText()).toEqual(plansummary.Extractions);
                        expect(receipt.getPlanSummaryByKey('Denture repair').getText()).toEqual(plansummary.Denturerepair);
                        expect(receipt.getPlanSummaryByKey('Crowns').getText()).toEqual(plansummary.Crowns);
                        expect(receipt.getPlanSummaryByKey('Orthodontics').getText()).toEqual(plansummary.Orthodontics);

                    });
                    it('E2E_Flow_9 :Should display primary applicant', function() {
                        receipt.verifyPixel(sdescription, pdescription);
                        if (pdescription == 'DHMO' || pdescription == 'DPPO') {
                            receipt.saveCompletedApplication.click().then(function() {
                                pathToPdf = './PDFDownloads/application' + apNumber + '.pdf';
                            })
                        }
                        receipt.applicants.click();
                        if (pdescription == 'DHMO' || pdescription == 'AHMO') {
                            if (testDataEnv == 'dit') {
                                facility = TestData.primaryFacility;
                            } else {
                                facility = facility1;
                            }
                            receipt.getSelectedFacilityDetails('PRIMARY').then(function(facilitydata) {
                                expect(facilitydata.name).toContain(TestData.firstname);
                                expect(facilitydata.facilityName).toEqual(facility.facilityName);
                                expect(facilitydata.street).toEqual(facility.street);
                                expect(facilitydata.city).toEqual(facility.city);
                                expect(facilitydata.region).toEqual(facility.region);
                                expect(facilitydata.postalCode).toContain(facility.postalCode);
                                expect(facilitydata.telephone).toEqual(facility.telephone);
                                if (pdescription == 'DHMO' || pdescription == 'DPPO') {
                                    Utility.readPDFFile(pathToPdf).then(function(test) {
                                        expect(test).toContain(TestData.firstname);
                                    });
                                }
                            });
                        }
                    });


                });
            }
        })
    }
})
