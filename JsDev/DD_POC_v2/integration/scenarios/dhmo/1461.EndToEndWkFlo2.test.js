//CXINIT-1461 : E2E Work Flow 2 with the 2 dependents and different facilities

//This Spec is used to Validate End to End Work Flow with the 2 Dependents and different facilities

var perInfo = new(require('../../pageObjects/cxinit/perInfo-page.js'));
var depInfo = new(require('../../pageObjects/cxinit/dependent-page.js'));
var facilities = new(require('../../pageObjects/cxinit/facilities-page.js'));
var payment = new(require('../../pageObjects/cxinit/payment-page.js'));
var receipt = new(require('../../pageObjects/cxinit/receipt-page.js'));
var enrollPage = new(require('../../pageObjects/cxinit/enroll-page.js'));
var TestData = require('../../testData/' + testDataEnv + '/dhmo/dhmo.1461EndToEndWkFlo2.json');
var statesData = require('../../testData/' + testDataEnv + '/statesAndProducts.json');

//To Navigate Personla Info Page
dataProvider(statesData.states, function(sData, sdescription) {
    if (states.indexOf(sdescription) != -1) {
        dataProvider(sData.products, function(tData, pdescription) {
            if (product.indexOf(pdescription) != -1) {

                describe(sdescription + ':' + pdescription + ':1461:E2E_WrkFlow1 - 2', function() {
                    var effectiveDate, apNumber, pathToPdf, facility1, facility2, facility3;
                    beforeAll(function() {
                        console.log(' ');
                        console.log('--- CXINIT-1461 E2E WrkFlow2 ---')
                        console.log(' ');
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
                        console.log('1461_1 complete')
                    });

                    //Fill the Valid Data in the Personal Info page and Change the Zipcode
                    //Switchback clickng on the Pop up Back

                    it('E2E_2 :should populate PersInfo page and change the Zip code', function() {
                        perInfo.fillPersonalInfo(TestData);
                        perInfo.fieldZipCode.setText(TestData.zipcode1);
                        perInfo.fieldPhoneNumber.setText('');
                        expect(perInfo.zipPopNewQuote.isPresentAndDisplayed()).toBeTruthy();
                        expect(perInfo.zipPopBack.isPresentAndDisplayed()).toBeTruthy();
                        perInfo.zipPopBack.click();
                        console.log('1461_2 complete')
                    });

                    //Fill the Address in the Personal Info page and Click on the New Quote on th ePOp up displayed

                    it('E2E_3 :Fill the Home address and Click on the New Quote in the Pop up displayed', function() {
                        perInfo.fieldHomeAddr.setText(tData.fieldHomeAddr);
                        perInfo.selectHomeAddress(tData.homeAddress);
                        perInfo.fieldCity.setText(tData.city);
                        perInfo.zipPopNewQuote.click();
                        expect(browser.getTitle()).toContain(TestData.SelectPlanTitle);
                        console.log('1461_3 complete')
                    });

                    //Enroll Page select plan is not implemented need to enhance below it as per implementaion

                    it('E2E_4 :Should complete the Enroll Page ', function() {
                        Utility.openApplication('', tData.product);
                        enrollPage.enterHomePageDetails(tData.enrollData).then(function(sdate) {
                            effectiveDate = sdate;
                            console.log("sdate============" + sdate);
                        })
                        expect(perInfo.fieldFirstName.isPresentAndDisplayed()).toBeTruthy();
                        console.log('1461_4 complete')
                    });

                    //Enter the valid Test Data in the Personal Information page and Click n the Next

                    it('E2E_5 :should populate PersInfo page', function() {
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
                        console.log('1461_5 complete')
                    });


                    it('E2E_6 :should add 2 Deps, child & spouse', function() {
                        expect(depInfo.fieldAddDependents.isPresentAndDisplayed()).toBeTruthy();
                        depInfo.fillDependent('Dependent1', TestData.Spouse, false);

                        depInfo.fillDependent('Dependent2', TestData.child, false);
                        browser.sleep(10000);
                        if (sdescription == 'NY') {
                            depInfo.year('Dependent2').setText(Utility.getDatePart(moment().subtract(13, 'years').format('MM-DD-YYYY'), 'YEAR'))
                        } else {
                            expect(depInfo.isHandicapped('Dependent2').isPresentAndDisplayed()).toBeTruthy();
                            expect(depInfo.handicappedHelpTxt('Dependent2').getText()).toContain(TestData.handicappedHelpText);
                        }
                        if (sdescription == 'NY') {
                            depInfo.next.click();
                        } else {
                            depInfo.isHandicapped('Dependent2').check();
                        }
                        // depInfo.next.click();
                        depInfo.continue.click();
                        console.log('1461_6 complete')
                    });



                    if (pdescription == 'DHMO' || pdescription == 'AHMO') {
                        it('E2E_7 :Change the Zip code in the Facility Page and should select fac for Prime', function() {
                            expect(browser.getTitle()).toEqual(TestData.facilitiesPageTitle);
                            expect(browser.getTitle()).toEqual(TestData.facilitiesPageTitle);
                            facilities.selectFacility().then(function(fnamee) {
                                facility1 = fnamee;
                                facilities.next.click();
                            });
                            facilities.selectFacility().then(function(fnamee) {
                                facility2 = fnamee;
                                facilities.next.click();
                            });

                            console.log('1461_7 complete')
                        });

                        //Verify and Select the Facility for the Dependent

                        it('E2E_8 :should select fac for all deps enrolled', function() {
                            if (pdescription == 'DHMO') {
                                facilities.selectFacility().then(function(fnamee) {
                                    facility3 = fnamee;
                                });
                                facilities.next.click();
                            }
                            expect(browser.getTitle()).toEqual(TestData.paymentPageTitle);
                            console.log('1461_8 complete')
                        });

                    }
                    it('E2E_9 :should fill out pay details', function() {
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
                        console.log('1461_9 complete')
                    });
                    // }
                    //Verify and Validate the Application Number and Plan Name in the Receipt Page
                    if (pdescription == 'DHMO' || pdescription == 'AHMO') {
                        it('E2E_10 :should generate a vaild receipt page', function() {
                            receipt.planSummary.click();
                            receipt.applicants.click();
                            receipt.applicationNumber.getText().then(function(appicationNumber) {
                                console.log("Application Number == " + appicationNumber);
                                receipt.saveCompletedApplication.click().then(function() {
                                    pathToPdf = './PDFDownloads/application' + appicationNumber + '.pdf';
                                })
                            })
                            console.log('1461_10 complete')
                        });


                        it('E2E_11 :should verify PDF Receipt', function() {
                            // receipt.verifyPixel(sdescription, pdescription);
                            Utility.readPDFFile(pathToPdf).then(function(test) {
                                expect(test).toContain(TestData.firstname);
                            });
                            console.log('1461_11 complete')
                        });
                    }

                });

            }
        })
    }
})
