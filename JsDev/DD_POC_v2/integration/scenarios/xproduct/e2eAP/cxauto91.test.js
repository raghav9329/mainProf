
var perInfo    = new(require('../../../pageObjects/cxinit/perInfo-page.js'));
var depInfo    = new(require('../../../pageObjects/cxinit/dependent-page.js'));
var facilities = new(require('../../../pageObjects/cxinit/facilities-page.js'));
var payment    = new(require('../../../pageObjects/cxinit/payment-page.js'));
var receipt    = new(require('../../../pageObjects/cxinit/receipt-page.js'));
var enrollPage = new(require('../../../pageObjects/cxinit/enroll-page.js'));
var TestData   = require('../../../testData/' + testDataEnv + '/dhmo/cxauto91.json');
var statesData = require('../../../testData/' + testDataEnv + '/statesAndProducts.json');

//To Navigate Personla Info Page
dataProvider(statesData.states, function(sData, sdescription) {
    if (states.indexOf(sdescription) != -1) {
        dataProvider(sData.products, function(tData, pdescription) {
            if (product.indexOf(pdescription) != -1) {

                describe('CXAUTO-91:E2E_WrkFlow 1' + sdescription + 'Product:' + pdescription + '', function() {
                    var effectiveDate, apNumber, pathToPdf, facility1, facility2;
                    beforeAll(function() {
                        console.log(' ');
                        console.log('--- CXAUTO-91 E2E WrkFlow1 ---')
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
                        expect(perInfo.fieldFirstName.isPresentAndDisplayed()).toBeTruthy('Verify that "First Name" field in personal info page is displayed');
                        console.log('CXAUTO-91_1 complete')
                    });

                    //Enter the valid Test Data in the Personal Information page and Click n the Next

                    it('E2E_2 :should populate PersInfo page', function() {
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
                        console.log('CXAUTO-91_2 complete')

                    });

                    // Add Dependent as a Child and Proceed
                    //Validate the Dependet age is greater than 26 and with the disability check box

                    it('E2E_3 :should add 1 Child Dep', function() {
                        expect(depInfo.fieldAddDependents.isPresentAndDisplayed()).toBeTruthy('Verify the Field "Add Dependent" is displayed and present');
                        TestData.child3.DOB = "05-10-1981";

                        depInfo.fillDependent('Dependent1', TestData.child3, false);
                        if (sdescription !== 'NY') {
                            expect(depInfo.isHandicapped('Dependent1').isPresentAndDisplayed()).toBeTruthy('Verify isHandicapped check box is Displaye and Present');
                            if (depInfo.isHandicapped('Dependent1').isPresentAndDisplayed()) {
                                depInfo.isHandicapped('Dependent1').check();
                            }
                        }
                        if (sdescription == 'NY') {
                            TestData.child3.DOB = moment().subtract(19, 'years').format('MM-DD-YYYY');
                        }
                        depInfo.next.click();
                        expect(depInfo.premiumChangePopUp.isPresentAndDisplayed()).toBe(true,'Verify the Premium change pop up is Displayed');
                        depInfo.gobackPremiumPopUP.click();

                        //change the dependent from CHILD to SPOUSE and VALIDATE if the Disability box disappears
                        depInfo.relationship('Dependent1').selectByText(TestData.Spouse1.relationship);
                        // depInfo.fillDependent('Dependent1', TestData.Spouse1, false);
                        expect(depInfo.isHandicapped('Dependent1').isPresentAndDisplayed()).toBe(false,'Verify isHandicapped check box field is NOT Displayed');
                        depInfo.next.click();
                        depInfo.gobackPremiumPopUP.click();
                        if (sdescription !== 'NY') {
                            //Change the SPOUSE back to CHILD and see if the Disability box reappears and is Selected
                            depInfo.relationship('Dependent1').selectByText(TestData.child3.relationship);
                            expect(depInfo.isHandicapped('Dependent1').isPresentAndDisplayed()).toBe(true,'Verify isHandicapped Chek box is Displayed');
                            if (depInfo.isHandicapped('Dependent1').isPresentAndDisplayed()) {
                                depInfo.isHandicapped('Dependent1').check();
                                // depInfo.next.click();
                            }
                        }
                        depInfo.next.click();
                        expect(depInfo.premiumChangePopUp.isPresentAndDisplayed()).toBeTruthy('Verify the Premium change pop up is Displayed');
                        depInfo.gobackPremiumPopUP.click();


                        // change the CHILD to DOMESTIC PARTNER and see if the Disability Box disappears
                        depInfo.relationship('Dependent1').selectByText(TestData.domesticPartner.relationship);
                        // depInfo.fillDependent('Dependent1', TestData.domesticPartner, false);
                        expect(depInfo.isHandicapped('Dependent1').isPresentAndDisplayed()).toBe(false,'Verify isHandicapped check box field is NOT Displayed');
                        depInfo.next.click();

                        expect(depInfo.premiumChangePopUp.isPresentAndDisplayed()).toBeTruthy('Verify Premium change Pop up is Displayed');
                        depInfo.continue.click();

                        if (pdescription == 'DHMO' || pdescription == 'AHMO') {
                            expect(browser.getTitle()).toEqual(TestData.facilitiesPageTitle,'Verify "Facility" page is displayed and the title is Equal as' +TestData.facilitiesPageTitle);
                        }
                        if (pdescription == 'DPPO' || pdescription == 'APPO') {
                            expect(browser.getTitle()).toEqual(TestData.paymentPageTitle,'Verify "Payment" page is displayed and the title is Equal as' +TestData.paymentPageTitle);
                        }
                        console.log('CXAUTO-91_3 complete')

                    });


                    //Verify and Select the Facility for the Dependent
                    if (pdescription == 'DHMO' || pdescription == 'AHMO') {
                        it('E2E_4 :should select fac for primary', function() {

                            expect(browser.getTitle()).toEqual(TestData.facilitiesPageTitle,'Verify "Facility" page is displayed and the title is Equal as' +TestData.facilitiesPageTitle);
                            facilities.selectFacility().then(function(fnamee) {
                                facility1 = fnamee;
                            });
                            facilities.next.click();
                            console.log('CXAUTO-91_4 complete')
                        });

                        //Verify and Select the Facility for the Dependent

                        it('E2E_5 :should select fac for deps', function() {

                            facilities.selectFacility().then(function(fnamee) {
                                facility2 = fnamee;
                            });
                            facilities.next.click();
                            expect(browser.getTitle()).toEqual(TestData.paymentPageTitle,'Verify "Payment" page is displayed and the title is Equal as' +TestData.paymentPageTitle);
                            console.log('CXAUTO-91_5 complete')
                        });
                    }
                    //Furnish all the fields of the Payment page with the valid Test Data and proceed
                    // if (testExecutionEnv != 'production') {
                    it('E2E_6 :should fill out pay details', function() {
                        if (pdescription == 'DHMO' || pdescription == 'DPPO') {
                            expect(payment.discloser.getAttribute('href')).toContain(tData.discloser,'Verify Discloser in Payment has same as: ' +tData.discloser);
                            payment.discloser.click();
                            Utility.switchToWindow(1);
                            expect(browser.getCurrentUrl()).toContain(tData.discloser,'Verify the Discloser in the URL is same as: '+tData.discloser);
                            Utility.switchToWindow(0);
                        }
                        payment.billingChkBox.check();
                        payment.fillpayment(TestData);
                        if (pdescription == 'AHMO' || pdescription == 'APPO') {
                            payment.frequencyAnnualy.select();
                        }
                        payment.purchaseNow.click();
                        Utility.delay(maxWait);
                        expect(browser.getTitle()).toEqual(TestData.receiptPageTitle, 'Verify "Receipt" Page is displayed and the Tilte is Equal as' +TestData.receiptPageTitle);
                        console.log('CXAUTO-91_6 complete')
                    });
                    // }
                    it('E2E_7 :Should display primary apllicant', function() {

                        receipt.applicants.click();
                        receipt.applicationNumber.getText().then(function(appicationNumber) {
                            console.log("Application Number == " + appicationNumber);
                            receipt.saveCompletedApplication.click().then(function() {
                                pathToPdf = './PDFDownloads/application' + appicationNumber + '.pdf';
                            })
                        })
                        if (pdescription == 'DHMO' || pdescription == 'AHMO') {
                            if (testDataEnv == 'dit') {
                                var facility = TestData.dependent_facilityoption1;
                            } else {
                                var facility = facility1;
                            }
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
                    });
                    //Verify and Validate the Application Number and Plan Name in the Receipt Page

                    it('E2E_8 :should generate a valid receipt page', function() {

                        if (pdescription == 'DHMO' || pdescription == 'DPPO') {
                            receipt.verifyPixel(sdescription, pdescription);
                        }
                        if (pdescription == 'DHMO' || pdescription == 'AHMO') {
                            if (testDataEnv == 'dit') {
                                var facility = TestData.dependent_facilityoption2;
                            } else {
                                var facility = facility2;
                            }
                            receipt.getSelectedFacilityDetails('DEPENDENT', 1).then(function(facilitydata) {
                                expect(facilitydata.name).toContain(TestData.child3.firstName,'Verify the "First Name" field value of Dependent-1 Facility is same as: ' +TestData.child3.firstName);
                                expect(facilitydata.facilityName).toEqual(facility.facilityName,'Verify the "facilityName" field value of Dependent-1 Facility is same as: ' +facility.facilityName);
                                expect(facilitydata.street).toEqual(facility.street,'Verify the "street" field value of Dependent-1 Facility is same as: ' +facility.street);
                                expect(facilitydata.city).toEqual(facility.city,'Verify the "city" field value of Dependent-1 Facility is same as: ' +facility.city);
                                expect(facilitydata.region).toEqual(facility.region,'Verify the "region" field value of Dependent-1 Facility is same as: ' +facility.region);
                                expect(facilitydata.postalCode).toContain(facility.postalCode,'Verify the "postalCode" field value of Dependent-1 Facility is same as: ' +facility.postalCode);
                                expect(facilitydata.telephone).toEqual(facility.telephone,'Verify the "telephone" field value of Dependent-1 Facility is same as: ' +facility.telephone);
                                if (pdescription == 'DHMO' || pdescription == 'DPPO') {
                                    Utility.readPDFFile(pathToPdf).then(function(test) {
                                        expect(test).toContain(TestData.firstname);
                                        console.log('E2E_8: Complete');
                                    });
                                }
                            });
                        }
                    });


                });

                describe('CXAUTO-91:E2E_WrkFlow 2' + sdescription + 'Product:' + pdescription + '', function() {
                    var effectiveDate, apNumber, pathToPdf, facility1, facility2;
                    beforeAll(function() {
                        console.log(' ');
                        console.log('--- CXAUTO-91 E2E WrkFlow2 ---')
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
                        expect(perInfo.fieldFirstName.isPresentAndDisplayed()).toBeTruthy('Verify that "First Name" field in personal info page is displayed');
                        console.log('CXAUTO-91_1 complete')
                    });

                    //Enter the valid Test Data in the Personal Information page and Click n the Next

                    it('E2E_2 :should populate PersInfo page', function() {
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
                        console.log('CXAUTO-91_2 complete')

                    });

                    // Add Dependent as a Child and Proceed
                    //Add dependent satisfying the condition: Child with age greater than 30 and the disability box NOT selected

                    it('E2E_3 :should add 1 Child Dep', function() {
                        expect(depInfo.fieldAddDependents.isPresentAndDisplayed()).toBeTruthy('Verify the Field "Add Dependent" is displayed and present');

                        TestData.child3.DOB = "05-10-1981";

                        depInfo.fillDependent('Dependent1', TestData.child3, false);
                        depInfo.next.click();
                        if (sdescription !== 'NY') {
                            expect(depInfo.isHandicapped('Dependent1').isPresentAndDisplayed()).toBeTruthy('Verify isHandicapped Check Box Field is Displayed');
                            expect(depInfo.premiumChangePopUp.isPresentAndDisplayed()).toBe(false,'Verify Premium Change is NOT Displayed');
                        }
                        //change the dependent from CHILD to SPOUSE and VALIDATE if both (the Disability box and the disability message) disappear
                        depInfo.relationship('Dependent1').selectByText(TestData.Spouse1.relationship);
                        // depInfo.fillDependent('Dependent1', TestData.Spouse1, false);

                        if (sdescription == 'NY') {
                            TestData.child3.DOB = moment().subtract(20, 'years').format('MM-DD-YYYY');
                        };

                        if (sdescription !== 'NY') {
                            expect(depInfo.isHandicapped('Dependent1').isPresentAndDisplayed()).toBe(false,'Verify isHandicapped Check box field is NOT Displayed');

                        }
                        depInfo.next.click();

                        depInfo.gobackPremiumPopUP.click();

                        //Change the SPOUSE back to CHILD and see if both (the Disability box and the error message) reappear with box NOT Selected
                        depInfo.relationship('Dependent1').selectByText(TestData.child3.relationship);
                        if (sdescription !== 'NY') {
                            expect(depInfo.isHandicapped('Dependent1').isPresentAndDisplayed()).toBe(true,'Verify isHandicapped Check box Field is Displayed');
                        }
                        depInfo.next.click();
                        expect(depInfo.premiumChangePopUp.isPresentAndDisplayed()).toBe(false,'Verify Premium Change Pop up is NOT Displayed');
                        // depInfo.gobackPremiumPopUP.click();


                        // change the CHILD to DOMESTIC PARTNER and see if the Disability Box disappears
                        depInfo.relationship('Dependent1').selectByText(TestData.domesticPartner.relationship);
                        // depInfo.fillDependent('Dependent1', TestData.domesticPartner, false);
                        expect(depInfo.isHandicapped('Dependent1').isPresentAndDisplayed()).toBe(false,'Verify isHandicapped Chec Box Field is NOT Displayed');
                        depInfo.next.click();

                        expect(depInfo.premiumChangePopUp.isPresentAndDisplayed()).toBeTruthy();
                        depInfo.continue.click();
                        if (pdescription == 'DHMO' || pdescription == 'AHMO') {
                            expect(browser.getTitle()).toEqual(TestData.facilitiesPageTitle,'Verify "Facility" page is displayed and the title is Equal as' +TestData.facilitiesPageTitle);
                        }
                        if (pdescription == 'DPPO' || pdescription == 'APPO') {
                            expect(browser.getTitle()).toEqual(TestData.paymentPageTitle,'Verify "Payment" page is displayed and the title is Equal as' +TestData.paymentPageTitle);
                        }
                        console.log('CXAUTO-91_3 complete')

                    });


                    //Verify and Select the Facility for the Dependent
                    if (pdescription == 'DHMO' || pdescription == 'AHMO') {
                        it('E2E_4 :should select fac for primary', function() {
                            /*facilities.selectFacility(TestData.facilityoption1);
                            facilities.next.click();*/
                            expect(browser.getTitle()).toEqual(TestData.facilitiesPageTitle,'Verify "Facility" page is displayed and the title is Equal as' +TestData.facilitiesPageTitle);
                            facilities.selectFacility().then(function(fnamee) {
                                facility1 = fnamee;
                            });
                            facilities.next.click();
                            console.log('CXAUTO-91_4 complete')
                        });

                        //Verify and Select the Facility for the Dependent

                        it('E2E_5 :should select fac for deps', function() {
                            /*facilities.selectFacility(TestData.facilityoption2);
                            facilities.next.click();*/

                            facilities.selectFacility().then(function(fnamee) {
                                facility2 = fnamee;
                            });
                            facilities.next.click();
                            expect(browser.getTitle()).toEqual(TestData.paymentPageTitle,'Verify "Payment" page is displayed and the title is Equal as' +TestData.paymentPageTitle);
                            console.log('CXAUTO-91_5 complete')
                        });
                    }
                    //Furnish all the fields of the Payment page with the valid Test Data and proceed
                    // if (testExecutionEnv != 'production') {
                    it('E2E_6 :should fill out pay details', function() {
                        if (pdescription == 'DHMO' || pdescription == 'DPPO') {
                            expect(payment.discloser.getAttribute('href')).toContain(tData.discloser,'Verify Discloser in Payment has same as: ' +tData.discloser);
                            payment.discloser.click();
                            Utility.switchToWindow(1);
                            expect(browser.getCurrentUrl()).toContain(tData.discloser,'Verify the Discloser in the URL is same as: '+tData.discloser);
                            Utility.switchToWindow(0);
                        }
                        payment.billingChkBox.check();
                        payment.fillpayment(TestData);
                        if (pdescription == 'AHMO' || pdescription == 'APPO') {
                            payment.frequencyAnnualy.select();
                        }
                        payment.purchaseNow.click();
                        Utility.delay(maxWait);
                        expect(browser.getTitle()).toEqual(TestData.receiptPageTitle, 'Verify "Receipt" Page is displayed and the Tilte is Equal as' +TestData.receiptPageTitle);
                        console.log('CXAUTO-91_6 complete')
                    });
                    // }
                    it('E2E_7 :Should display primary apllicant', function() {

                        receipt.applicants.click();
                        receipt.applicationNumber.getText().then(function(appicationNumber) {
                            console.log("Application Number == " + appicationNumber);
                            receipt.saveCompletedApplication.click().then(function() {
                                pathToPdf = './PDFDownloads/application' + appicationNumber + '.pdf';
                            })
                        });
                        if (pdescription == 'DHMO' || pdescription == 'AHMO') {
                            if (testDataEnv == 'dit') {
                                var facility = TestData.dependent_facilityoption1;
                            } else {
                                var facility = facility1;
                            }
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
                    });
                    //Verify and Validate the Application Number and Plan Name in the Receipt Page

                    it('E2E_8 :should generate a valid receipt page', function() {

                        if (pdescription == 'DHMO' || pdescription == 'DPPO') {
                            receipt.verifyPixel(sdescription, pdescription);
                        }
                        if (pdescription == 'DHMO' || pdescription == 'AHMO') {
                            if (testDataEnv == 'dit') {
                                var facility = TestData.dependent_facilityoption2;
                            } else {
                                var facility = facility2;
                            }
                            receipt.getSelectedFacilityDetails('DEPENDENT', 1).then(function(facilitydata) {
                                expect(facilitydata.name).toContain(TestData.child3.firstName,'Verify the "First Name" field value of Dependent-1 Facility is same as: ' +TestData.child3.firstName);
                                expect(facilitydata.facilityName).toEqual(facility.facilityName,'Verify the "facilityName" field value of Dependent-1 Facility is same as: ' +facility.facilityName);
                                expect(facilitydata.street).toEqual(facility.street,'Verify the "street" field value of Dependent-1 Facility is same as: ' +facility.street);
                                expect(facilitydata.city).toEqual(facility.city,'Verify the "city" field value of Dependent-1 Facility is same as: ' +facility.city);
                                expect(facilitydata.region).toEqual(facility.region,'Verify the "region" field value of Dependent-1 Facility is same as: ' +facility.region);
                                expect(facilitydata.postalCode).toContain(facility.postalCode,'Verify the "postalCode" field value of Dependent-1 Facility is same as: ' +facility.postalCode);
                                expect(facilitydata.telephone).toEqual(facility.telephone,'Verify the "telephone" field value of Dependent-1 Facility is same as: ' +facility.telephone);
                            });
                            if (pdescription == 'DHMO' || pdescription == 'DPPO') {
                                Utility.readPDFFile(pathToPdf).then(function(test) {
                                    expect(test).toContain(TestData.firstname, 'Verify the "FirstName" field value displayed in the PDF is same as: ' +TestData.firstname);
                                    console.log('E2E_8: Complete');
                                });
                            }

                        }
                    });

                });

            }
        })
    }
})