//CXINIT-1408 : E2E Work Flow 1 with the dependent age verification

//This Spec is used to Validate End to End Work Flow with the Dependent age Error
var perInfo = new(require('../../../pageObjects/cxinit/perInfo-page.js'));
var depInfo = new(require('../../../pageObjects/cxinit/dependent-page.js'));
var facilities = new(require('../../../pageObjects/cxinit/facilities-page.js'));
var payment = new(require('../../../pageObjects/cxinit/payment-page.js'));
var receipt = new(require('../../../pageObjects/cxinit/receipt-page.js'));
var enrollPage = new(require('../../../pageObjects/cxinit/enroll-page.js'));
var TestData = require('../../../testData/' + testDataEnv + '/dhmo/dhmo.1408.EndToEndWkFlo1.json');
var statesData = require('../../../testData/' + testDataEnv + '/statesAndProducts.json');

//To Navigate Personla Info Page
dataProvider(statesData.states, function(sData, sdescription) {
    if (states.indexOf(sdescription) != -1) {
        dataProvider(sData.products, function(tData, pdescription) {
            if (product.indexOf(pdescription) != -1) {

                describe('1408:E2E_WrkFlows-1 : ||State:' + sdescription + '||Product:' + pdescription + '||', function() {
                    var effectiveDate, apNumber, pathToPdf, facility1, facility2;
                    beforeAll(function() {
                        console.log(' ');
                        console.log('--- CXINIT-1408 E2E WrkFlow1 ---')
                        console.log(' ');
                        Utility.openApplication('', tData.product);
                    });

                    beforeEach(function() {
                        jasmine.addMatchers(custommatcher.customMatchers);
                    });
                    //Fill the Valid Data in the home page of Enrollment and Proceed
                    // Start with 0 dependents
                    it('E2E_1 : Should complete the Enroll Page', function() {
                        enrollPage.enterHomePageDetails(tData.enrollData).then(function(sdate) {
                            effectiveDate = sdate;
                            console.log("sdate============" + sdate);
                        })
                        expect(perInfo.fieldFirstName.isPresentAndDisplayed()).toBeTruthy();

                        console.log('1408_1 complete')
                    });

                    //Enter the valid Test Data in the Personal Information page and Click n the Next

                    it('E2E_2 :should populate PersInfo page', function() {
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
                        console.log('1408_2 complete')

                    });

                    // Add Dependent as a Child and Proceed
                    //Validate the Dependet age is greater than 26 and with the disability check box

                    it('E2E_3 :should add 1 Child Dep', function() {
                        expect(depInfo.fieldAddDependents.isPresentAndDisplayed()).toBeTruthy();
                        depInfo.fillDependent('Dependent1', TestData.child3, false);
                        if (sdescription == 'NY') {
                            depInfo.year('Dependent1').setText(Utility.getDatePart(moment().subtract(10, 'years').format('MM-DD-YYYY'), 'YEAR'))
                            depInfo.next.click();
                            depInfo.next.click();
                        } else {
                            expect(depInfo.isHandicapped('Dependent1').isPresentAndDisplayed()).toBeTruthy();
                            expect(depInfo.handicappedHelpTxt('Dependent1').getText()).toContain(TestData.handicappedHelpText);
                            depInfo.isHandicapped('Dependent1').check();
                            depInfo.next.click();
                        }
                        depInfo.continue.click();

                        console.log('1408_3 complete')
                    });


                    //Verify and Select the Facility for the Dependent
                    if (pdescription == 'DHMO' || pdescription == 'AHMO') {

                        it('E2E_4 :should select fac for primary', function() {
                            expect(browser.getTitle()).toEqual(TestData.facilitiesPageTitle);
                            facilities.selectFacility().then(function(fnamee) {
                                facility1 = fnamee;
                                facilities.next.click();
                            });


                            console.log('1408_4 complete')
                        });

                        //Verify and Select the Facility for the Dependent

                        it('E2E_5 :should select fac for deps', function() {
                            facilities.selectFacility().then(function(fnamee) {
                                facility2 = fnamee;
                            });
                            facilities.next.click();

                            expect(browser.getTitle()).toEqual(TestData.paymentPageTitle);
                            console.log('1408_5 complete')
                        });
                    }

                    it('E2E_6 :should fill out pay details', function() {
                        if (pdescription == 'DHMO' || pdescription == 'DPPO') {
                            expect(payment.discloser.getAttribute('href')).toContain(tData.discloser);
                            payment.discloser.click();
                            Utility.switchToWindow(1);
                            expect(browser.getCurrentUrl()).toContain(tData.discloser);
                            Utility.switchToWindow(0);
                        }
                        payment.billingChkBox.check();
                        payment.fillpayment(TestData);
                        if (pdescription == 'AHMO' || pdescription == 'APPO') {
                            payment.frequencyAnnualy.select();
                        }
                        payment.purchaseNow.click();
                        Utility.delay(maxWait);
                        expect(browser.getTitle()).toEqual(TestData.receiptPageTitle);
                        console.log('1408_6 complete')
                    });

                    it('E2E_7 :Should display primary apllicant', function() {

                        receipt.applicants.click();
                        if (pdescription == 'DHMO' || pdescription == 'DPPO') {

                            receipt.applicationNumber.getText().then(function(appicationNumber) {
                                console.log("Application Number == " + appicationNumber);
                                receipt.saveCompletedApplication.click().then(function() {
                                    pathToPdf = './PDFDownloads/application' + appicationNumber + '.pdf';
                                })
                            })
                        }
                        if (pdescription == 'DHMO' || pdescription == 'AHMO') {
                            if (testDataEnv == 'dit') {
                                var facility = TestData.primaryFacility;
                            } else {
                                var facility = facility1;
                            }
                            receipt.getSelectedFacilityDetails('PRIMARY').then(function(facilitydata) {
                                expect(facilitydata.name).toContain(TestData.firstname);
                                expect(facilitydata.facilityName).toContain(facility.facilityName);
                                expect(facilitydata.street).toContain(facility.street);
                                expect(facilitydata.city).toContain(facility.city);
                                expect(facilitydata.region).toContain(facility.region);
                                expect(facilitydata.postalCode).toContain(facility.postalCode);
                                expect(facilitydata.telephone).toContain(facility.telephone);

                            });
                        }
                    });

                    //Verify and Validate the Application Number and Plan Name in the Receipt Page

                    it('E2E_8 :should generate a valid receipt page', function() {
                        if (pdescription == 'DHMO' || pdescription == 'AHMO') {
                            if (testDataEnv == 'dit') {
                                var facility = TestData.dependent1;
                            } else {
                                var facility = facility2;
                            }
                            receipt.verifyPixel(sdescription, pdescription);
                            receipt.getSelectedFacilityDetails('DEPENDENT', 1).then(function(facilitydata) {
                                expect(facilitydata.name).toContain(TestData.child3.firstName);
                                expect(facilitydata.facilityName).toContain(facility.facilityName);
                                expect(facilitydata.street).toContain(facility.street);
                                expect(facilitydata.city).toContain(facility.city);
                                expect(facilitydata.region).toContain(facility.region);
                                expect(facilitydata.postalCode).toContain(facility.postalCode);
                                expect(facilitydata.telephone).toContain(facility.telephone);
                            })
                        };
                        if (pdescription == 'DHMO' || pdescription == 'DPPO') {
                            browser.sleep(50000);
                            Utility.readPDFFile(pathToPdf).then(function(test) {
                                expect(test).toContain(TestData.firstname);
                                console.log('E2E_8: Complete');
                            });
                        }

                    });


                });

            }
        })
    }
})
