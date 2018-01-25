var TestData = require('../../testData/' + testDataEnv + '/dhmo/addDep_Enroll.DeleteDep_depPage.json');
var perInfo = new(require('../../pageObjects/cxinit/perInfo-page.js'));
var depInfo = new(require('../../pageObjects/cxinit/dependent-page.js'));
var facilities = new(require('../../pageObjects/cxinit/facilities-page.js'));
var payment = new(require('../../pageObjects/cxinit/payment-page.js'));
var receipt = new(require('../../pageObjects/cxinit/receipt-page.js'));
var enrollPage = new(require('../../pageObjects/cxinit/enroll-page.js'));
var pdf2Text = require('pdf2text')
var statesData = require('../../testData/' + testDataEnv + '/statesAndProducts.json');

//To Navigate Personla Info Page
dataProvider(statesData.states, function(sData, sdescription) {
    if (states.indexOf(sdescription) != -1) {
        dataProvider(sData.products, function(tData, pdescription) {
            if (product.indexOf(pdescription) != -1) {

                describe('E2E_WorkFlow:addDep_Enroll.DeleteDep_depPage : ||State:' + sdescription + '||Product:' + pdescription + '||', function() {
                    var effectiveDate, apNumber, pathToPdf, facility1, facility2, facility3;
                    beforeAll(function() {
                        Utility.openApplication('', tData.product);
                    });
                    beforeEach(function() {
                        jasmine.addMatchers(custommatcher.customMatchers);
                    });

                    it('E2E_Flow_1: Enter the Zip code and Click on the Enter for the Enroll Page', function() {
                        enrollPage.enterHomePageDetails(tData.enrollData).then(function(sdate) {
                            effectiveDate = sdate;
                            console.log("sdate============" + sdate);
                        })

                        expect(perInfo.fieldFirstName.isPresentAndDisplayed()).toBeTruthy();
                    });

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

                    it('E2E_Flow_3: Verifying the Errors of both client and server side by passing NULL values', function() {
                        depInfo.deleteDependent('Dependent1').click();
                        depInfo.deleteDependent('Dependent1').click();
                        depInfo.deleteDependent('Dependent1').click();
                        depInfo.fieldAddDependents.click();
                        depInfo.next.click();
                        expect(depInfo.getValidationMessages('Dependent1')).toEqual(TestData.dependentErrors);
                        expect(depInfo.getServerValidationMessages()).toEqual(TestData.dependentErrors);
                    })
                    it('E2E_Flow_4: Verify 2 dependents were added and furnished with valid Test Data for Each of them', function() {
                        depInfo.fillDependent('Dependent1', TestData.domesticpartner1, true);
                        depInfo.fillDependent('Dependent2', TestData.child3, false);
                        depInfo.next.click();
                        Utility.waitUntilElementNotPresent(element(by.css('img.loaderImg')));
                        depInfo.continue.click();
                    });

                    if (pdescription == 'DHMO' || pdescription == 'AHMO') {
                        it('E2E_Flow_5: Verify and select a Facility for the primary', function() {
                            expect(browser.getTitle()).toEqual(TestData.facilitiesTitle);
                            facilities.selectFacility().then(function(fnamee) {
                                facility1 = fnamee;
                            });
                            facilities.next.click();
                        });

                        it('E2E_Flow_5_1: Verify and select the facilities for dependents', function() {
                            facilities.selectFacility().then(function(fnamee) {
                                facility2 = fnamee;
                            });
                            facilities.next.click();
                        });

                        it('E2E_Flow_5_2: Verify and select the facilities for dependents', function() {
                            facilities.selectFacility().then(function(fnamee) {
                                facility3 = fnamee;
                            });
                            facilities.next.click();
                            expect(browser.getTitle()).toEqual(TestData.paymentTitle);
                        });
                    }

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

                    it('E2E_Flow_7: Validate and Verify Payment Page Details with valid Test Data', function() {
                        payment.billingChkBox.check();
                        payment.fillpayment(TestData);
                        if (pdescription == 'AHMO' || pdescription == 'APPO') {
                            payment.frequencyAnnualy.select();
                        }
                        payment.purchaseNow.click();
                        Utility.delay(maxWait);
                        expect(browser.getTitle()).toEqual(TestData.receiptTitle);
                    });


                    it('E2E_Flow_8 :Should display plansummary', function() {
                        var plansummary = tData.planSummary;
                        receipt.planSummary.click();
                        receipt.applicationNumber.getText().then(function(appicationNumber) {
                            console.log("Application Number == " + appicationNumber);
                            apNumber = appicationNumber;
                        })
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
                    if (pdescription == 'DHMO' || pdescription == 'AHMO') {
                        it('E2E_Flow_9 :Should display primary applicant', function() {
                            var facility = TestData.primaryFacility;
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
