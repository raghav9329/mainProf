//CXINIT-1235 : Review my previous work and start a new E2E Page Object Model based Work Flow

//This Spec is used to Verify and Validate Ene to End Work Flow with the Errors and the Happy path

var perInfo = new(require('../../pageObjects/cxinit/perInfo-page.js'));
var depInfo = new(require('../../pageObjects/cxinit/dependent-page.js'));
var facilities = new(require('../../pageObjects/cxinit/facilities-page.js'));
var payment = new(require('../../pageObjects/cxinit/payment-page.js'));
var receipt = new(require('../../pageObjects/cxinit/receipt-page.js'));
var enrollPage = new(require('../../pageObjects/cxinit/enroll-page.js'));
var TestData = require('../../testData/' + testDataEnv + '/dhmo/051217_E2E_POM_Workflow.json');
var pdf2Text = require('pdf2text')
var statesData = require('../../testData/' + testDataEnv + '/statesAndProducts.json');

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
                        expect(depInfo.getServerValidationMessages()).toEqual(TestData.NulldependentErrors);
                        Utility.scrollToTop();
                        browser.sleep(2000);
                        depInfo.deleteDependent('Dependent1').click();
                    });



                    it('E2E_Flow_3_1: Verifying and Validate the Dependents of same type(Domestic Partner and Spouse do not allowed) not allowed more than 1', function() {
                        browser.sleep(2000);
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
                        // browser.sleep(2000);
                        expect(browser.getTitle()).toEqual(TestData.facilitiesTitle);
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
                        browser.sleep(2000)
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
                    if (pdescription == 'DHMO' || pdescription == 'AHMO') {
                        it('E2E_Flow_8 :Should display plansummary', function() {
                            receipt.applicationNumber.getText().then(function(appicationNumber) {
                                console.log("Application Number == " + appicationNumber);
                                apNumber = appicationNumber;
                            })
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
                            var facility = facility1;
                            receipt.verifyPixel(sdescription, pdescription);
                            receipt.saveCompletedApplication.click().then(function() {
                                pathToPdf = './PDFDownloads/application' + apNumber + '.pdf';
                            })
                            receipt.applicants.click();
                            receipt.getSelectedFacilityDetails('PRIMARY').then(function(facilitydata) {
                                expect(facilitydata.name).toContain(TestData.firstname);
                                expect(facilitydata.facilityName).toEqual(TestData.primaryFacility.facilityName);
                                expect(facilitydata.street).toEqual(facility.street);
                                expect(facilitydata.city).toEqual(facility.city);
                                expect(facilitydata.region).toEqual(facility.region);
                                expect(facilitydata.postalCode).toEqual(facility.postalCode);
                                expect(facilitydata.telephone).toEqual(facility.telephone);
                                Utility.readPDFFile(pathToPdf).then(function(test) {
                                    expect(test).toContain(TestData.firstname);
                                });
                            });
                        });
                    }

                });
            }
        })
    }
})
