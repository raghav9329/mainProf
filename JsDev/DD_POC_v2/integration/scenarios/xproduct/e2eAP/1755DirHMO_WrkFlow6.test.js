//CXINIT-1755 : Add Progress bar check to all tests

var perInfo    = new(require('../../../pageObjects/cxinit/perInfo-page.js'));
var depInfo    = new(require('../../../pageObjects/cxinit/dependent-page.js'));
var facilities = new(require('../../../pageObjects/cxinit/facilities-page.js'));
var payment    = new(require('../../../pageObjects/cxinit/payment-page.js'));
var receipt    = new(require('../../../pageObjects/cxinit/receipt-page.js'));
var enrollPage = new(require('../../../pageObjects/cxinit/enroll-page.js'));
var TestData   = require('../../../testData/' + testDataEnv + '/dhmo/Direct_HMO_WorkFlows_6.json');
var statesData = require('../../../testData/' + testDataEnv + '/statesAndProducts.json');

//To Navigate Personla Info Page
dataProvider(statesData.states, function(sData, sdescription) {
    if (states.indexOf(sdescription) != -1) {
        dataProvider(sData.products, function(tData, pdescription) {
            if (product.indexOf(pdescription) != -1) {

                describe('1755_DirHMO WrkFlo_6 : ||State:' + sdescription + '||Product:' + pdescription + '||', function() {
                    var premiumAmount, depPrice, effectiveDate, apNumber, pathToPdf, facility1, facility2;
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
                        expect(perInfo.fieldFirstName.isPresentAndDisplayed()).toBeTruthy('Verify that "First Name" field in personal info page is displayed');
                        console.log('1755_1 of 10 Complete')

                    });

                    //Enter the valid Test Data in the Personal Information page and Click n the Next

                    it('E2E_2 :should populate PersInfo page', function() {
                        if (pdescription == 'DHMO' || pdescription == 'DPPO') {
                            expect(perInfo.enrollStatus('Personal Info').getCssValue('background-color')).toEqual(TestData.darkGreen);
                            expect(perInfo.enrollStatus('Dependents').getCssValue('background-color')).toEqual(TestData.gray);
                            if (pdescription == 'DHMO') {
                                expect(perInfo.enrollStatus('Facilities').getCssValue('background-color')).toEqual(TestData.gray);
                            }
                            expect(perInfo.enrollStatus('Payment & Review').getCssValue('background-color')).toEqual(TestData.gray);
                            expect(perInfo.enrollStatus('Receipt').getCssValue('background-color')).toEqual(TestData.gray);
                        }
                        if (pdescription == 'AHMO' || pdescription == 'APPO') {
                            expect(perInfo.enrollStatus('Personal Info').getCssValue('background-color')).toEqual(TestData.dark);
                            expect(perInfo.enrollStatus('Dependents').getCssValue('background-color')).toEqual(TestData.gray);
                            if (pdescription == 'AHMO') {
                                expect(perInfo.enrollStatus('Facilities').getCssValue('background-color')).toEqual(TestData.gray);
                            }
                            expect(perInfo.enrollStatus('Payment & Review').getCssValue('background-color')).toEqual(TestData.gray);
                            expect(perInfo.enrollStatus('Receipt').getCssValue('background-color')).toEqual(TestData.gray);
                        }


                        TestData.firstname = Utility.randomNo('String', 8);
                        TestData.lastname = Utility.randomNo('String', 8);
                        if (pdescription == 'DHMO' || pdescription == 'DPPO') {
                            TestData.MemberId = false;                            
                            var ssn = Utility.randomNo('Number', 8);
                            TestData.ssn = '1' + ssn.toString();
                            console.log(" TestData.ssn===" + TestData.ssn)
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
                        expect(browser.getTitle()).toEqual(TestData.DependentPageTitle,'Verfiy "Dependent Page" is Displayed and the title is Equal as' +TestData.DependentPageTitle);
                        console.log('1755_2 of 10 Complete')
                    });

                    // Add Dependent as a Child and Proceed
                    //Validate the Dependet age is greater than 26 and with the disability check box

                    it('E2E_3 :should add 1 Child Dep', function() {
                        if (pdescription == 'DHMO' || pdescription == 'DPPO') {
                            expect(perInfo.enrollStatus('Personal Info').getCssValue('background-color')).toEqual(TestData.liteGreen);
                            expect(perInfo.enrollStatus('Dependents').getCssValue('background-color')).toEqual(TestData.darkGreen);
                            if (pdescription == 'DHMO') {
                                expect(perInfo.enrollStatus('Facilities').getCssValue('background-color')).toEqual(TestData.gray);
                            }
                            expect(perInfo.enrollStatus('Payment & Review').getCssValue('background-color')).toEqual(TestData.gray);
                            expect(perInfo.enrollStatus('Receipt').getCssValue('background-color')).toEqual(TestData.gray);
                        }
                        if (pdescription == 'AHMO' || pdescription == 'APPO') {
                            expect(perInfo.enrollStatus('Personal Info').getCssValue('background-color')).toEqual(TestData.lite);
                            expect(perInfo.enrollStatus('Dependents').getCssValue('background-color')).toEqual(TestData.dark);
                            if (pdescription == 'AHMO') {
                                expect(perInfo.enrollStatus('Facilities').getCssValue('background-color')).toEqual(TestData.gray);
                            }
                            expect(perInfo.enrollStatus('Payment & Review').getCssValue('background-color')).toEqual(TestData.gray);
                            expect(perInfo.enrollStatus('Receipt').getCssValue('background-color')).toEqual(TestData.gray);
                        }

                        expect(depInfo.fieldAddDependents.isPresentAndDisplayed()).toBeTruthy('Verify the Field "Add Dependent" is displayed and present');
                        depInfo.fillDependent('Dependent1', TestData.Spouse, false);
                        depInfo.next.click();
                        expect(depInfo.premiumChangePopUp.isPresentAndDisplayed()).toBeTruthy('Verify Premium Change Pop Up is Displayed and Present');
                        depInfo.newAdditionalPrice.getText().then(function(dep1Price) {
                            depPrice = dep1Price;
                            depInfo.continue.click();

                        });
                        console.log('1755_3 of 10 Complete')
                    });


                    //Verify and Select the Facility for the Dependent
                    if (pdescription == 'DHMO' || pdescription == 'AHMO') {
                        it('E2E_4 :should select fac for primary', function() {
                            expect(browser.getTitle()).toEqual(TestData.facilitiesPageTitle,'Verify "Facility" page is displayed and the title is Equal as' +TestData.facilitiesPageTitle);
                            facilities.premiumAmount.getText().then(function(premium) {
                                expect(premium.substring(1)).toEqual(depPrice);
                                expect(facilities.pbox_dependentName(1).getText()).toEqual(TestData.firstname);
                                expect(facilities.pbox_dependentName(2).getText()).toEqual(TestData.Spouse.firstName);
                                if (pdescription == 'DHMO') {
                                    expect(perInfo.enrollStatus('Personal Info').getCssValue('background-color')).toEqual(TestData.liteGreen);
                                    expect(perInfo.enrollStatus('Dependents').getCssValue('background-color')).toEqual(TestData.liteGreen);
                                    expect(perInfo.enrollStatus('Facilities').getCssValue('background-color')).toEqual(TestData.darkGreen);
                                    expect(perInfo.enrollStatus('Payment & Review').getCssValue('background-color')).toEqual(TestData.gray);
                                    expect(perInfo.enrollStatus('Receipt').getCssValue('background-color')).toEqual(TestData.gray);
                                }
                                if (pdescription == 'AHMO') {
                                    expect(perInfo.enrollStatus('Personal Info').getCssValue('background-color')).toEqual(TestData.lite);
                                    expect(perInfo.enrollStatus('Dependents').getCssValue('background-color')).toEqual(TestData.lite);
                                    expect(perInfo.enrollStatus('Facilities').getCssValue('background-color')).toEqual(TestData.dark);
                                    expect(perInfo.enrollStatus('Payment & Review').getCssValue('background-color')).toEqual(TestData.gray);
                                    expect(perInfo.enrollStatus('Receipt').getCssValue('background-color')).toEqual(TestData.gray);
                                }
                                facilities.selectFacility().then(function(fnamee) {
                                    facility1 = fnamee;
                                });
                                facilities.next.click();
                                facilities.selectFacility().then(function(fnamee) {
                                    facility2 = fnamee;
                                });
                                facilities.next.click();
                                console.log('1755_4 of 10 Complete')
                            });
                        });
                    }

                    //Verify and Select the Facility for the Dependent

                    it('E2E_5 :should select fac for deps', function() {
                        if (pdescription == 'DHMO' || pdescription == 'AHMO') {
                            if (testDataEnv == 'dit') {
                                var facility = TestData.primaryFacility;
                            } else {
                                var facility = facility1;
                            }
                            facilities.premiumAmount.getText().then(function(premium) {
                                expect(premium.substring(1)).toEqual(depPrice);
                                expect(facilities.pbox_dependentName(1).getText()).toEqual(TestData.firstname);
                                expect(facilities.pbox_facilityName(1).getText()).toEqual(facility.facilityName);

                                expect(facilities.pbox_dependentName(2).getText()).toEqual(TestData.Spouse.firstName);
                            });
                        }

                        if (pdescription == 'DHMO' || pdescription == 'DPPO') {
                            expect(perInfo.enrollStatus('Personal Info').getCssValue('background-color')).toEqual(TestData.liteGreen);
                            expect(perInfo.enrollStatus('Dependents').getCssValue('background-color')).toEqual(TestData.liteGreen);
                            if (pdescription == 'DHMO') {
                                expect(perInfo.enrollStatus('Facilities').getCssValue('background-color')).toEqual(TestData.liteGreen);
                            }
                            expect(perInfo.enrollStatus('Payment & Review').getCssValue('background-color')).toEqual(TestData.darkGreen);
                            expect(perInfo.enrollStatus('Receipt').getCssValue('background-color')).toEqual(TestData.gray);
                        }
                        if (pdescription == 'AHMO' || pdescription == 'APPO') {
                            expect(perInfo.enrollStatus('Personal Info').getCssValue('background-color')).toEqual(TestData.lite);
                            expect(perInfo.enrollStatus('Dependents').getCssValue('background-color')).toEqual(TestData.lite);
                            if (pdescription == 'AHMO') {
                                expect(perInfo.enrollStatus('Facilities').getCssValue('background-color')).toEqual(TestData.lite);
                            }
                            expect(perInfo.enrollStatus('Payment & Review').getCssValue('background-color')).toEqual(TestData.dark);
                            expect(perInfo.enrollStatus('Receipt').getCssValue('background-color')).toEqual(TestData.gray);
                        }


                        expect(browser.getTitle()).toEqual(TestData.paymentPageTitle,'Verify "Payment" page is displayed and the title is Equal as' +TestData.paymentPageTitle);

                        console.log('1755_5 of 10 Complete');
                    });

                    //Furnish all the fields of the Payment page with the valid Test Data and proceed

                    it('E2E_6 :should fill out pay details', function() {
                        facilities.premiumAmount.getText().then(function(premium) {
                            expect(premium.substring(1)).toEqual(depPrice);
                            if (pdescription == 'DHMO' || pdescription == 'AHMO') {
                                if (testDataEnv == 'dit') {
                                    var facility = TestData.facilityoption1;
                                } else {
                                    var facility = facility2;
                                }
                                expect(facilities.pbox_dependentName(1).getText()).toEqual(TestData.firstname);
                                expect(facilities.pbox_dependentName(2).getText()).toEqual(TestData.Spouse.firstName);
                                expect(facilities.pbox_facilityName(2).getText()).toEqual(facility.facilityName);
                            }

                            if (pdescription == 'DHMO' || pdescription == 'DPPO') {
                                expect(perInfo.enrollStatus('Personal Info').getCssValue('background-color')).toEqual(TestData.liteGreen);
                                expect(perInfo.enrollStatus('Dependents').getCssValue('background-color')).toEqual(TestData.liteGreen);
                                if (pdescription == 'DHMO') {
                                    expect(perInfo.enrollStatus('Facilities').getCssValue('background-color')).toEqual(TestData.liteGreen);
                                }
                                expect(perInfo.enrollStatus('Payment & Review').getCssValue('background-color')).toEqual(TestData.darkGreen);
                                expect(perInfo.enrollStatus('Receipt').getCssValue('background-color')).toEqual(TestData.gray);
                            }

                            if (pdescription == 'AHMO' || pdescription == 'APPO') {
                                expect(perInfo.enrollStatus('Personal Info').getCssValue('background-color')).toEqual(TestData.lite);
                                expect(perInfo.enrollStatus('Dependents').getCssValue('background-color')).toEqual(TestData.lite);
                                if (pdescription == 'AHMO') {
                                    expect(perInfo.enrollStatus('Facilities').getCssValue('background-color')).toEqual(TestData.lite);
                                }
                                expect(perInfo.enrollStatus('Payment & Review').getCssValue('background-color')).toEqual(TestData.dark);
                                expect(perInfo.enrollStatus('Receipt').getCssValue('background-color')).toEqual(TestData.gray);

                            }

                            if (pdescription == 'DHMO' || pdescription == 'DPPO') {
                                expect(payment.discloser.getAttribute('href')).toContain(tData.discloser,'Verify Discloser in Payment has same as: ' +tData.discloser);
                                payment.discloser.click();
                                Utility.switchToWindow(1);
                                expect(browser.getCurrentUrl()).toContain(tData.discloser,'Verify the Discloser in the URL is same as: '+tData.discloser);
                                Utility.switchToWindow(0);
                            }
                            payment.billingChkBox.check();
                            payment.summaryTotalPrice.getText().then(function(premium) {
                                premiumAmount = premium;
                            });
                            payment.fillpayment(TestData);
                            if (pdescription == 'AHMO' || pdescription == 'APPO') {
                                payment.frequencyAnnualy.select();
                            }
                            payment.purchaseNow.click();
                            Utility.delay(maxWait);
                            expect(browser.getTitle()).toEqual(TestData.receiptPageTitle, 'Verify "Receipt" Page is displayed and the Tilte is Equal as' +TestData.receiptPageTitle);

                        });
                        console.log('1755_6 of 10 Complete')
                    });

                    //Verify and Validate the Application Number and Plan Name in the Receipt Page
                    if (pdescription == 'DHMO' || pdescription == 'AHMO') {
                        it('E2E_7 :Should submit delta rating', function() {
                            if (pdescription == 'DHMO' || pdescription == 'DPPO') {
                                expect(perInfo.enrollStatus('Personal Info').getCssValue('background-color')).toEqual(TestData.liteGreen);
                                expect(perInfo.enrollStatus('Dependents').getCssValue('background-color')).toEqual(TestData.liteGreen);
                                if (pdescription == 'DHMO') {
                                    expect(perInfo.enrollStatus('Facilities').getCssValue('background-color')).toEqual(TestData.liteGreen);
                                }
                                expect(perInfo.enrollStatus('Payment & Review').getCssValue('background-color')).toEqual(TestData.liteGreen);
                                expect(perInfo.enrollStatus('Receipt').getCssValue('background-color')).toEqual(TestData.darkGreen);
                            }

                            if (pdescription == 'AHMO' || pdescription == 'APPO') {
                                expect(perInfo.enrollStatus('Personal Info').getCssValue('background-color')).toEqual(TestData.lite);
                                expect(perInfo.enrollStatus('Dependents').getCssValue('background-color')).toEqual(TestData.lite);
                                if (pdescription == 'AHMO') {
                                    expect(perInfo.enrollStatus('Facilities').getCssValue('background-color')).toEqual(TestData.lite);
                                }
                                expect(perInfo.enrollStatus('Payment & Review').getCssValue('background-color')).toEqual(TestData.lite);
                                expect(perInfo.enrollStatus('Receipt').getCssValue('background-color')).toEqual(TestData.dark);
                            }

                            receipt.submitRating(TestData.deltaRating);
                            receipt.answerQuery(TestData.queryAnswer);
                            expect(receipt.getThanksMsg()).toEqual(TestData.thanksMsg,'Verify Thanks Message Displayed is same as :' +TestData.thanksMsg);
                            receipt.applicationNumber.getText().then(function(appicationNumber) {
                                console.log("Application Number == " + appicationNumber);
                                apNumber = appicationNumber;
                            })
                            expect(receipt.planPurchased.getText()).toContain(tData.planName,'Verify Plan Purchased is same as: ' +tData.planName);
                            expect(receipt.effectiveDate.getText()).toEqual(effectiveDate,'Verify Effective Date is same as: ' +effectiveDate);
                            console.log('1755_7 of 10 Complete')
                        });
                    }

                    it('E2E_8 :Should display plansummary', function() {
                        var plansummary = tData.planSummary;
                        if (sdescription == 'TX' && pdescription == 'AHMO') plansummary.Orthodontics = "$1,900 each child $2,000 each adult";
                        if (sdescription == 'FL' && pdescription == 'AHMO') plansummary.Orthodontics = "$1,900 each child $2,000 each adult";
                        receipt.planSummary.click();
                        expect(receipt.getPlanSummaryByKey('Deductible per calendar year per person').getText()).toEqual(plansummary.Deductible_per_calendar, 'Verify "Deductable value" field under Plansummary is same as: ' +plansummary.Deductible_per_calendar);
                        expect(receipt.getPlanSummaryByKey('Maximum per calendar year per person').getText()).toEqual(plansummary.Max_per_calendar, 'Verify Max Per "Calendar value" under Plan summary is same as: ' +plansummary.Max_per_calendar);
                        expect(receipt.getPlanSummaryByKey('Office visit').getText()).toEqual(plansummary.Officevisit,'Verify "Officevisit field value under Plan summary is same as: ' +plansummary.Officevisit);
                        expect(receipt.getPlanSummaryByKey('Exams').getText()).toEqual(plansummary.Exams,'Verify "Exams value" under Plan summary is same as: ' +plansummary.Exams);
                        expect(receipt.getPlanSummaryByKey('X-rays').getText()).toEqual(plansummary.Xrays,'Verify "Xrays" value under Plan summary is same as: ' +plansummary.Xrays);
                        expect(receipt.getPlanSummaryByKey('Cleanings').getText()).toEqual(plansummary.Cleanings,'Verify "Cleanings" field value under plan summary is same as: ' +plansummary.Cleanings);
                        expect(receipt.getPlanSummaryByKey('Fillings').getText()).toEqual(plansummary.Fillings,'Verify "Fillings" field value under plan summary is same as: ' +plansummary.Fillings);
                        expect(receipt.getPlanSummaryByKey('Root canals').getText()).toEqual(plansummary.Rootcanals,'Verify "Rootcanals" field value under plan summary is same as: ' +plansummary.Rootcanals);
                        expect(receipt.getPlanSummaryByKey('Gum treatment').getText()).toEqual(plansummary.Gumtreatment,'Verify "Gumtreatment" field value under plan summary is same as: ' +plansummary.Gumtreatment);
                        expect(receipt.getPlanSummaryByKey('Extractions').getText()).toEqual(plansummary.Extractions,'Verify "Extractions" field value under plan summary is same as: ' +plansummary.Extractions);
                        expect(receipt.getPlanSummaryByKey('Denture repair').getText()).toEqual(plansummary.Denturerepair,'Verify "Denturerepair" field value under plan summary is same as: ' +plansummary.Denturerepair);
                        expect(receipt.getPlanSummaryByKey('Crowns').getText()).toEqual(plansummary.Crowns,'Verify "Crowns" field value under plan summary is same as: ' +plansummary.Crowns);
                        expect(receipt.getPlanSummaryByKey('Orthodontics').getText()).toEqual(plansummary.Orthodontics,'Verify "Crowns" field value under plan summary is same as: ' +plansummary.Orthodontics);
                        console.log('1755_8 of 10 Complete')
                    });


                    it('E2E_9 :Should display primary applicant', function() {

                        if (pdescription == 'DHMO' || pdescription == 'DPPO') {
                            receipt.saveCompletedApplication.click().then(function() {
                                pathToPdf = './PDFDownloads/application' + apNumber + '.pdf';
                            })
                        }
                        if (pdescription == 'DHMO' || pdescription == 'AHMO') {
                            if (testDataEnv == 'dit') {
                                var facility = TestData.primaryFacility;
                            } else {
                                var facility = facility1;
                            }
                            receipt.applicants.click();
                            receipt.getSelectedFacilityDetails('PRIMARY').then(function(facilitydata) {
                                expect(facilitydata.name).toContain(TestData.firstname,'Verify the "First Name" field value of Primary Facility is same as: ' +TestData.firstname);
                                expect(facilitydata.facilityName).toEqual(facility.facilityName,'Verify the "facilityName" field value of Primary Facility is same as: ' +facility.facilityName);
                                expect(facilitydata.street).toEqual(facility.street,'Verify the "street" field value of Primary Facility is same as: ' +facility.street);
                                expect(facilitydata.city).toEqual(facility.city,'Verify the "city" field value of Primary Facility is same as: ' +facility.city);
                                expect(facilitydata.region).toEqual(facility.region,'Verify the "region" field value of Primary Facility is same as: ' +facility.region);
                                expect(facilitydata.postalCode).toContain(facility.postalCode,'Verify the "postalCode" field value of Primary Facility is same as: ' +facility.postalCode);
                                expect(facilitydata.telephone).toEqual(facility.telephone,'Verify the "telephone" field value of Primary Facility is same as: ' +facility.telephone);
                            });
                        }
                        console.log('1755_9 of 10 Complete')
                    });

                    it('E2E_10:Should display dependent applicant', function() {
                        if (pdescription == 'DHMO' || pdescription == 'AHMO') {
                            if (testDataEnv == 'dit') {
                                var facility = TestData.dependent1;
                            } else {
                                var facility = facility2;
                            }
                            receipt.verifyPixel(sdescription, pdescription);
                            receipt.getSelectedFacilityDetails('DEPENDENT', 1).then(function(facilitydata) {
                                expect(facilitydata.name).toContain(TestData.Spouse.firstName,'Verify the "First Name" field value of Dependent-1 Facility is same as: ' +TestData.Spouse.firstName);
                                expect(facilitydata.facilityName).toEqual(facility.facilityName,'Verify the "facilityName" field value of Dependent-1 Facility is same as: ' +facility.facilityName);
                                expect(facilitydata.street).toEqual(facility.street,'Verify the "street" field value of Dependent-1 Facility is same as: ' +facility.street);
                                expect(facilitydata.city).toEqual(facility.city,'Verify the "city" field value of Dependent-1 Facility is same as: ' +facility.city);
                                expect(facilitydata.region).toEqual(facility.region,'Verify the "region" field value of Dependent-1 Facility is same as: ' +facility.region);
                                expect(facilitydata.postalCode).toContain(facility.postalCode,'Verify the "postalCode" field value of Dependent-1 Facility is same as: ' +facility.postalCode);
                                expect(facilitydata.telephone).toEqual(facility.telephone,'Verify the "telephone" field value of Dependent-1 Facility is same as: ' +facility.telephone);
                            });
                        }
                        if (pdescription == 'DHMO' || pdescription == 'DPPO') {
                            browser.sleep(50000);
                            Utility.readPDFFile(pathToPdf).then(function(test) {
                                expect(test).toContain(TestData.firstname, 'Verify the "FirstName" field value displayed in the PDF is same as: ' +TestData.firstname);
                                console.log('E2E_9: Complete');
                            });
                        }

                        console.log('1755_10 of 10 Complete')
                    });

                });
            }
        })
    }
})