//CXINIT-1755 : Add Progress bar check to all tests

var perInfo = new(require('../../pageObjects/cxinit/perInfo-page.js'));
var depInfo = new(require('../../pageObjects/cxinit/dependent-page.js'));
var facilities = new(require('../../pageObjects/cxinit/facilities-page.js'));
var payment = new(require('../../pageObjects/cxinit/payment-page.js'));
var receipt = new(require('../../pageObjects/cxinit/receipt-page.js'));
var enrollPage = new(require('../../pageObjects/cxinit/enroll-page.js'));
var TestData = require('../../testData/' + testDataEnv + '/dhmo/Direct_HMO_WorkFlows_6.json');
var statesData = require('../../testData/' + testDataEnv + '/statesAndProducts.json');

//To Navigate Personla Info Page
dataProvider(statesData.states, function(sData, sdescription) {
    if (states.indexOf(sdescription) != -1) {
        dataProvider(sData.products, function(tData, pdescription) {
            if (product.indexOf(pdescription) != -1) {

                describe('DHMO:1755_DirHMO WrkFlo_6 ' + sdescription + 'Product:' + pdescription + '', function() {
                    var premiumAmount, depPrice, effectiveDate, apNumber, pathToPdf, facility1, facility2;
                    beforeAll(function() {
                        Utility.openApplication('', 'DELTA');
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
                        console.log('1755_1 of 10 Complete')

                    });

                    //Enter the valid Test Data in the Personal Information page and Click n the Next

                    it('E2E_2 :should populate PersInfo page', function() {
                        expect(perInfo.enrollStatus('Personal Info').getCssValue('background-color')).toEqual(TestData.darkGreen);
                        expect(perInfo.enrollStatus('Dependents').getCssValue('background-color')).toEqual(TestData.gray);
                        expect(perInfo.enrollStatus('Facilities').getCssValue('background-color')).toEqual(TestData.gray);
                        expect(perInfo.enrollStatus('Payment & Review').getCssValue('background-color')).toEqual(TestData.gray);
                        expect(perInfo.enrollStatus('Receipt').getCssValue('background-color')).toEqual(TestData.gray);

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
                        expect(browser.getTitle()).toEqual(TestData.DependentPageTitle);
                        console.log('1755_2 of 10 Complete')
                    });

                    // Add Dependent as a Child and Proceed
                    //Validate the Dependet age is greater than 26 and with the disability check box

                    it('E2E_3 :should add 1 Child Dep', function() {
                        expect(perInfo.enrollStatus('Personal Info').getCssValue('background-color')).toEqual(TestData.liteGreen);
                        expect(perInfo.enrollStatus('Dependents').getCssValue('background-color')).toEqual(TestData.darkGreen);
                        expect(perInfo.enrollStatus('Facilities').getCssValue('background-color')).toEqual(TestData.gray);
                        expect(perInfo.enrollStatus('Payment & Review').getCssValue('background-color')).toEqual(TestData.gray);
                        expect(perInfo.enrollStatus('Receipt').getCssValue('background-color')).toEqual(TestData.gray);

                        expect(facilities.productName.getText()).toEqual(tData.planName);
                        expect(facilities.premiumAmount.getText()).toEqual(tData.baseFee);
                        // expect(facilities.enrollmentFee.getText()).toEqual(TestData.enrollFee);

                        expect(depInfo.fieldAddDependents.isPresentAndDisplayed()).toBeTruthy();
                        depInfo.fillDependent('Dependent1', TestData.Spouse, false);
                        depInfo.next.click();
                        expect(depInfo.premiumChangePopUp.isPresentAndDisplayed()).toBeTruthy();
                        depInfo.newAdditionalPrice.getText().then(function(dep1Price) {
                            depPrice = dep1Price;
                            depInfo.continue.click();

                        });
                        console.log('1755_3 of 10 Complete')
                    });


                    //Verify and Select the Facility for the Dependent
                    if (pdescription == 'DHMO' || pdescription == 'AHMO') {
                        it('E2E_4 :should select fac for primary', function() {
                            expect(browser.getTitle()).toEqual(TestData.facilitiesPageTitle);
                            facilities.premiumAmount.getText().then(function(premium) {
                                expect(premium.substring(1)).toEqual(depPrice);
                                // expect(facilities.enrollmentFee.getText()).toEqual(TestData.enrollFee);
                                expect(facilities.productName.getText()).toEqual(tData.planName);

                                expect(facilities.pbox_dependentName(1).getText()).toEqual(TestData.firstname);
                                expect(facilities.pbox_dependentName(2).getText()).toEqual(TestData.Spouse.firstName);

                                expect(perInfo.enrollStatus('Personal Info').getCssValue('background-color')).toEqual(TestData.liteGreen);
                                expect(perInfo.enrollStatus('Dependents').getCssValue('background-color')).toEqual(TestData.liteGreen);
                                expect(perInfo.enrollStatus('Facilities').getCssValue('background-color')).toEqual(TestData.darkGreen);
                                expect(perInfo.enrollStatus('Payment & Review').getCssValue('background-color')).toEqual(TestData.gray);
                                expect(perInfo.enrollStatus('Receipt').getCssValue('background-color')).toEqual(TestData.gray);

                                facilities.selectFacility().then(function(fnamee) {
                                    facility1 = fnamee;
                                });
                                facilities.next.click();

                                /*facilities.selectFacility(TestData.facilityoption1);
                                facilities.next.click();*/
                                console.log('1755_4 of 10 Complete')
                            });
                        });

                        //Verify and Select the Facility for the Dependent

                        it('E2E_5 :should select fac for deps', function() {
                            facilities.premiumAmount.getText().then(function(premium) {
                                expect(premium.substring(1)).toEqual(depPrice);
                                // expect(facilities.enrollmentFee.getText()).toEqual(TestData.enrollFee);

                                expect(facilities.productName.getText()).toEqual(tData.planName);
                                expect(facilities.pbox_dependentName(1).getText()).toEqual(TestData.firstname);
                                expect(facilities.pbox_facilityName(1).getText()).toEqual(TestData.primaryFacility.facilityName);

                                expect(facilities.pbox_dependentName(2).getText()).toEqual(TestData.Spouse.firstName);

                                expect(perInfo.enrollStatus('Personal Info').getCssValue('background-color')).toEqual(TestData.liteGreen);
                                expect(perInfo.enrollStatus('Dependents').getCssValue('background-color')).toEqual(TestData.liteGreen);
                                expect(perInfo.enrollStatus('Facilities').getCssValue('background-color')).toEqual(TestData.darkGreen);
                                expect(perInfo.enrollStatus('Payment & Review').getCssValue('background-color')).toEqual(TestData.gray);
                                expect(perInfo.enrollStatus('Receipt').getCssValue('background-color')).toEqual(TestData.gray);

                                /*facilities.selectFacility(TestData.facilityoption2);
                                facilities.next.click();*/
                                facilities.selectFacility().then(function(fnamee) {
                                    facility2 = fnamee;
                                });
                                facilities.next.click();


                                expect(browser.getTitle()).toEqual(TestData.paymentPageTitle);
                            });
                            console.log('1755_5 of 10 Complete')
                        });

                        //Furnish all the fields of the Payment page with the valid Test Data and proceed
                    }
                    it('E2E_6 :should fill out pay details', function() {
                        facilities.premiumAmount.getText().then(function(premium) {
                            expect(premium.substring(1)).toEqual(depPrice);
                            //expect(facilities.enrollmentFee.getText()).toEqual(TestData.enrollFee);
                            if (pdescription == 'DHMO' || pdescription == 'AHMO') {
                                expect(facilities.productName.getText()).toEqual(tData.planName);
                                expect(facilities.pbox_dependentName(1).getText()).toEqual(TestData.firstname);
                                expect(facilities.pbox_facilityName(1).getText()).toEqual(TestData.primaryFacility.facilityName);

                                expect(facilities.pbox_dependentName(2).getText()).toEqual(TestData.Spouse.firstName);
                                expect(facilities.pbox_facilityName(2).getText()).toEqual(TestData.dependent_Facility_1.facilityName);
                            }
                            expect(perInfo.enrollStatus('Personal Info').getCssValue('background-color')).toEqual(TestData.liteGreen);
                            expect(perInfo.enrollStatus('Dependents').getCssValue('background-color')).toEqual(TestData.liteGreen);
                            expect(perInfo.enrollStatus('Facilities').getCssValue('background-color')).toEqual(TestData.liteGreen);
                            expect(perInfo.enrollStatus('Payment & Review').getCssValue('background-color')).toEqual(TestData.darkGreen);
                            expect(perInfo.enrollStatus('Receipt').getCssValue('background-color')).toEqual(TestData.gray);
                            if (pdescription == 'DHMO' || pdescription == 'DPPO') {
                            expect(payment.discloser.getAttribute('href')).toContain(tData.discloser);
                            payment.discloser.click();
                            Utility.switchToWindow(1);
                            expect(browser.getCurrentUrl()).toContain(tData.discloser);
                            Utility.switchToWindow(0);
                        }
                            payment.billingChkBox.check();
                            payment.summaryTotalPrice.getText().then(function(premium) {
                                premiumAmount = premium;
                            });
                            // if (testExecutionEnv != 'production') {
                            payment.fillpayment(TestData);
                            if (pdescription == 'AHMO' || pdescription == 'APPO') {
                            payment.frequencyAnnualy.select();
                        }
                            payment.purchaseNow.click();
                            Utility.delay(maxWait);
                            expect(browser.getTitle()).toEqual(TestData.receiptPageTitle);
                            
                        });
                        console.log('1755_6 of 10 Complete')
                    });

                    //Verify and Validate the Application Number and Plan Name in the Receipt Page
if (pdescription == 'DHMO' || pdescription == 'AHMO') {
                    it('E2E_7 :Should submit delta rating', function() {
                        expect(perInfo.enrollStatus('Personal Info').getCssValue('background-color')).toEqual(TestData.liteGreen);
                        expect(perInfo.enrollStatus('Dependents').getCssValue('background-color')).toEqual(TestData.liteGreen);
                        expect(perInfo.enrollStatus('Facilities').getCssValue('background-color')).toEqual(TestData.liteGreen);
                        expect(perInfo.enrollStatus('Payment & Review').getCssValue('background-color')).toEqual(TestData.liteGreen);
                        expect(perInfo.enrollStatus('Receipt').getCssValue('background-color')).toEqual(TestData.darkGreen);
                        receipt.submitRating(TestData.deltaRating);
                        receipt.answerQuery(TestData.queryAnswer);
                        expect(receipt.getThanksMsg()).toEqual(TestData.thanksMsg);
                        receipt.applicationNumber.getText().then(function(appicationNumber) {
                            console.log("Application Number == " + appicationNumber);
                            apNumber = appicationNumber;
                        })
                        expect(receipt.planPurchased.getText()).toContain(tData.planName);
                        expect(receipt.effectiveDate.getText()).toEqual(effectiveDate);
                        expect(receipt.totalPaid.getText()).toEqual(premiumAmount);
                        console.log('1755_7 of 10 Complete')
                    });
}
                    it('E2E_8 :Should display plansummary', function() {
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
                        console.log('1755_8 of 10 Complete')
                    });
                    if (pdescription == 'DHMO' || pdescription == 'AHMO') {
                    it('E2E_9 :Should display primary applicant', function() {
                        var facility = facility1;
                        //TestData.primaryFacility;
                        receipt.saveCompletedApplication.click().then(function() {
                            pathToPdf = './PDFDownloads/application' + apNumber + '.pdf';
                        })
                        receipt.applicants.click();
                        receipt.getSelectedFacilityDetails('PRIMARY').then(function(facilitydata) {
                            expect(facilitydata.name).toContain(TestData.firstname);
                            expect(facilitydata.facilityName).toEqual(facility.facilityName);
                            expect(facilitydata.street).toEqual(facility.street);
                            expect(facilitydata.city).toEqual(facility.city);
                            expect(facilitydata.region).toEqual(facility.region);
                            expect(facilitydata.postalCode).toEqual(facility.postalCode);
                            expect(facilitydata.telephone).toEqual(facility.telephone);
                        });
                        console.log('1755_9 of 10 Complete')
                    });

                    it('E2E_10:Should display dependent applicant', function() {
                        var facility = facility2;
                        receipt.verifyPixel(sdescription, pdescription);
                        //TestData.dependent_Facility_1;
                        receipt.getSelectedFacilityDetails('DEPENDENT', 1).then(function(facilitydata) {
                            expect(facilitydata.name).toContain(TestData.Spouse.firstName);
                            expect(facilitydata.facilityName).toEqual(facility.facilityName);
                            expect(facilitydata.street).toEqual(facility.street);
                            expect(facilitydata.city).toEqual(facility.city);
                            expect(facilitydata.region).toEqual(facility.region);
                            expect(facilitydata.postalCode).toEqual(facility.postalCode);
                            expect(facilitydata.telephone).toEqual(facility.telephone);
                            Utility.readPDFFile(pathToPdf).then(function(test) {
                                expect(test).toContain(TestData.firstname);
                                console.log('E2E_9: Complete');
                            });
                        });
                        console.log('1755_10 of 10 Complete')
                    });
                }

                });
            }
        })
    }
})
