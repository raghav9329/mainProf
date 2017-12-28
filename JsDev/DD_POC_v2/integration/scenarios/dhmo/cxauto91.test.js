//CXINIT-1408 : E2E Work Flow 1 with the dependent age verification

//This Spec is used to Validate End to End Work Flow with the Dependent age Error
var perInfo = new(require('../../pageObjects/cxinit/perInfo-page.js'));
var depInfo = new(require('../../pageObjects/cxinit/dependent-page.js'));
var facilities = new(require('../../pageObjects/cxinit/facilities-page.js'));
var payment = new(require('../../pageObjects/cxinit/payment-page.js'));
var receipt = new(require('../../pageObjects/cxinit/receipt-page.js'));

var enrollPage = new(require('../../pageObjects/cxinit/enroll-page.js'));
var TestData = require('../../testData/' + testDataEnv + '/dhmo/cxauto91.json');

var product = ['DHMO'];
// var product = ['DHMO','DPPO','AHMO','APPO']; 
var states = ['CA'];

//To Navigate Personla Info Page
dataProvider(TestData.states, function(sData, sdescription) {
    if (states.indexOf(sdescription) != -1) {
        dataProvider(sData.products, function(tData, pdescription) {
            if (product.indexOf(pdescription) != -1) {

                describe('CXAUTO-90:E2E_WrkFlow 1' + sdescription + 'Product:' + pdescription + '', function() {
                    var effectiveDate, apNumber, pathToPdf, facility1, facility2;
                    beforeAll(function() {
                        console.log(' ');
                        console.log('--- CXAUTO-90 E2E WrkFlow1 ---')
                        console.log(' ');
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
                        console.log('CXAUTO-90_1 complete')
                    });

                    //Enter the valid Test Data in the Personal Information page and Click n the Next

                    it('E2E_2 :should populate PersInfo page', function() {
                        perInfo.fillPersonalInfo(TestData);
                        perInfo.fillAddress(tData);
                        perInfo.phoneNumberemail(TestData);
                        perInfo.next.click();
                        expect(browser.getTitle()).toEqual(TestData.DependentPageTitle);
                        console.log('CXAUTO-90_2 complete')

                    });

                    // Add Dependent as a Child and Proceed
                    //Validate the Dependet age is greater than 26 and with the disability check box

                    it('E2E_3 :should add 1 Child Dep', function() {
                        expect(depInfo.fieldAddDependents.isPresentAndDisplayed()).toBeTruthy();

                        depInfo.fillDependent('Dependent1', TestData.child3, false);
                        expect(depInfo.isHandicapped('Dependent1').isPresentAndDisplayed()).toBeTruthy();
                        if (depInfo.isHandicapped('Dependent1').isPresentAndDisplayed()) {
                            depInfo.isHandicapped('Dependent1').check();
                        }
                        depInfo.next.click();
                        expect(depInfo.premiumChangePopUp.isPresentAndDisplayed()).toBe(true);
                        depInfo.gobackPremiumPopUP.click();

                        //change the dependent from CHILD to SPOUSE and VALIDATE if the Disability box disappears
                        depInfo.relationship('Dependent1').selectByText(TestData.Spouse1.relationship);
                        // depInfo.fillDependent('Dependent1', TestData.Spouse1, false);
                        expect(depInfo.isHandicapped('Dependent1').isPresentAndDisplayed()).toBe(false);
                        depInfo.next.click();
                        depInfo.gobackPremiumPopUP.click();

                        //Change the SPOUSE back to CHILD and see if the Disability box reappears and is Selected
                        depInfo.relationship('Dependent1').selectByText(TestData.child3.relationship);
                        expect(depInfo.isHandicapped('Dependent1').isPresentAndDisplayed()).toBe(true);
                        if (depInfo.isHandicapped('Dependent1').isPresentAndDisplayed()) {
                            depInfo.isHandicapped('Dependent1').check();
                        }
                        depInfo.next.click();
                        expect(depInfo.premiumChangePopUp.isPresentAndDisplayed()).toBeTruthy();
                        depInfo.gobackPremiumPopUP.click();


                        // change the CHILD to DOMESTIC PARTNER and see if the Disability Box disappears
                        depInfo.relationship('Dependent1').selectByText(TestData.domesticPartner.relationship);
                        // depInfo.fillDependent('Dependent1', TestData.domesticPartner, false);
                        expect(depInfo.isHandicapped('Dependent1').isPresentAndDisplayed()).toBe(false);
                        depInfo.next.click();

                        expect(depInfo.premiumChangePopUp.isPresentAndDisplayed()).toBeTruthy();
                        depInfo.continue.click();
                        expect(browser.getTitle()).toEqual(TestData.facilitiesPageTitle);
                        console.log('CXAUTO-90_3 complete')

                    });


                    //Verify and Select the Facility for the Dependent

                    it('E2E_4 :should select fac for primary', function() {
                        /*facilities.selectFacility(TestData.facilityoption1);
                        facilities.next.click();*/
                        expect(browser.getTitle()).toEqual(TestData.facilitiesPageTitle);
                        facilities.selectFacility().then(function(fnamee) {
                            facility1 = fnamee;
                        });
                        facilities.next.click();
                        console.log('CXAUTO-90_4 complete')
                    });

                    //Verify and Select the Facility for the Dependent

                    it('E2E_5 :should select fac for deps', function() {
                        /*facilities.selectFacility(TestData.facilityoption2);
                        facilities.next.click();*/

                        facilities.selectFacility().then(function(fnamee) {
                            facility2 = fnamee;
                        });
                        facilities.next.click();
                        expect(browser.getTitle()).toEqual(TestData.paymentPageTitle);
                        console.log('CXAUTO-90_5 complete')
                    });

                    //Furnish all the fields of the Payment page with the valid Test Data and proceed
                    // if (testExecutionEnv != 'production') {
                    it('E2E_6 :should fill out pay details', function() {
                        expect(payment.discloser.getAttribute('href')).toContain(tData.discloser);
                        payment.discloser.click();
                        Utility.switchToWindow(1);
                        expect(browser.getCurrentUrl()).toContain(tData.discloser);
                        Utility.switchToWindow(0);
                        payment.billingChkBox.check();
                        payment.fillpayment(TestData);
                        payment.purchaseNow.click();
                        Utility.delay(maxWait);
                        expect(browser.getTitle()).toEqual(TestData.receiptPageTitle);
                        console.log('CXAUTO-90_6 complete')
                    });
                    // }
                    it('E2E_7 :Should display primary apllicant', function() {
                        var facility = facility1;
                        //TestData.dependent_facilityoption1;
                        receipt.applicants.click();
                        receipt.applicationNumber.getText().then(function(appicationNumber) {
                            console.log("Application Number == " + appicationNumber);
                            receipt.saveCompletedApplication.click().then(function() {
                                pathToPdf = './PDFDownloads/application' + appicationNumber + '.pdf';
                            })
                        })
                        receipt.getSelectedFacilityDetails('PRIMARY').then(function(facilitydata) {
                            expect(facilitydata.name).toContain(TestData.firstname);
                            expect(facilitydata.facilityName).toEqual(facility.facilityName);
                            expect(facilitydata.street).toEqual(facility.street);
                            expect(facilitydata.city).toEqual(facility.city);
                            expect(facilitydata.region).toEqual(facility.region);
                            expect(facilitydata.postalCode).toContain(facility.postalCode);
                            expect(facilitydata.telephone).toEqual(facility.telephone);
                        });
                    });
                    //Verify and Validate the Application Number and Plan Name in the Receipt Page

                    it('E2E_8 :should generate a valid receipt page', function() {
                        var facility = facility2;
                        receipt.verifyPixel(sdescription, pdescription);
                        //TestData.dependent_facilityoption2;
                        receipt.getSelectedFacilityDetails('DEPENDENT', 1).then(function(facilitydata) {
                            expect(facilitydata.name).toContain(TestData.child3.firstName);
                            expect(facilitydata.facilityName).toEqual(facility.facilityName);
                            expect(facilitydata.street).toEqual(facility.street);
                            expect(facilitydata.city).toEqual(facility.city);
                            expect(facilitydata.region).toEqual(facility.region);
                            expect(facilitydata.postalCode).toContain(facility.postalCode);
                            expect(facilitydata.telephone).toEqual(facility.telephone);
                            Utility.readPDFFile(pathToPdf).then(function(test) {
                                expect(test).toContain(TestData.firstname);
                                console.log('E2E_8: Complete');
                            });
                        });
                    });

                });

                describe('CXAUTO-90:E2E_WrkFlow 2' + sdescription + 'Product:' + pdescription + '', function() {
                    var effectiveDate, apNumber, pathToPdf, facility1, facility2;
                    beforeAll(function() {
                        console.log(' ');
                        console.log('--- CXAUTO-90 E2E WrkFlow2 ---')
                        console.log(' ');
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
                        console.log('CXAUTO-90_1 complete')
                    });

                    //Enter the valid Test Data in the Personal Information page and Click n the Next

                    it('E2E_2 :should populate PersInfo page', function() {
                        perInfo.fillPersonalInfo(TestData);
                        perInfo.fillAddress(tData);
                        perInfo.phoneNumberemail(TestData);
                        perInfo.next.click();
                        expect(browser.getTitle()).toEqual(TestData.DependentPageTitle);
                        console.log('CXAUTO-90_2 complete')

                    });

                    // Add Dependent as a Child and Proceed
                    //Add dependent satisfying the condition: Child with age greater than 30 and the disability box NOT selected

                    it('E2E_3 :should add 1 Child Dep', function() {
                        expect(depInfo.fieldAddDependents.isPresentAndDisplayed()).toBeTruthy();

                        depInfo.fillDependent('Dependent1', TestData.child3, false);
                        /*if (depInfo.isHandicapped('Dependent1').isPresentAndDisplayed()) {
                            depInfo.isHandicapped('Dependent1').check();
                        }*/
                        depInfo.next.click();
                        expect(depInfo.isHandicapped('Dependent1').isPresentAndDisplayed()).toBeTruthy();
                        expect(depInfo.premiumChangePopUp.isPresentAndDisplayed()).toBe(false);
                        // depInfo.gobackPremiumPopUP.click();

                        //change the dependent from CHILD to SPOUSE and VALIDATE if both (the Disability box and the disability message) disappear
                        depInfo.relationship('Dependent1').selectByText(TestData.Spouse1.relationship);
                        // depInfo.fillDependent('Dependent1', TestData.Spouse1, false);
                        expect(depInfo.isHandicapped('Dependent1').isPresentAndDisplayed()).toBe(false);
                        depInfo.next.click();
                        depInfo.gobackPremiumPopUP.click();

                        //Change the SPOUSE back to CHILD and see if both (the Disability box and the error message) reappear with box NOT Selected
                        depInfo.relationship('Dependent1').selectByText(TestData.child3.relationship);
                        expect(depInfo.isHandicapped('Dependent1').isPresentAndDisplayed()).toBe(true);
                        /*if (depInfo.isHandicapped('Dependent1').isPresentAndDisplayed()) {
                            depInfo.isHandicapped('Dependent1').check();
                        }*/
                        depInfo.next.click();
                        expect(depInfo.premiumChangePopUp.isPresentAndDisplayed()).toBe(false);
                        // depInfo.gobackPremiumPopUP.click();


                        // change the CHILD to DOMESTIC PARTNER and see if the Disability Box disappears
                        depInfo.relationship('Dependent1').selectByText(TestData.domesticPartner.relationship);
                        // depInfo.fillDependent('Dependent1', TestData.domesticPartner, false);
                        expect(depInfo.isHandicapped('Dependent1').isPresentAndDisplayed()).toBe(false);
                        depInfo.next.click();

                        expect(depInfo.premiumChangePopUp.isPresentAndDisplayed()).toBeTruthy();
                        depInfo.continue.click();
                        expect(browser.getTitle()).toEqual(TestData.facilitiesPageTitle);
                        console.log('CXAUTO-90_3 complete')

                    });


                    //Verify and Select the Facility for the Dependent

                    it('E2E_4 :should select fac for primary', function() {
                        /*facilities.selectFacility(TestData.facilityoption1);
                        facilities.next.click();*/
                        expect(browser.getTitle()).toEqual(TestData.facilitiesPageTitle);
                        facilities.selectFacility().then(function(fnamee) {
                            facility1 = fnamee;
                        });
                        facilities.next.click();
                        console.log('CXAUTO-90_4 complete')
                    });

                    //Verify and Select the Facility for the Dependent

                    it('E2E_5 :should select fac for deps', function() {
                        /*facilities.selectFacility(TestData.facilityoption2);
                        facilities.next.click();*/

                        facilities.selectFacility().then(function(fnamee) {
                            facility2 = fnamee;
                        });
                        facilities.next.click();
                        expect(browser.getTitle()).toEqual(TestData.paymentPageTitle);
                        console.log('CXAUTO-90_5 complete')
                    });

                    //Furnish all the fields of the Payment page with the valid Test Data and proceed
                    // if (testExecutionEnv != 'production') {
                    it('E2E_6 :should fill out pay details', function() {
                        expect(payment.discloser.getAttribute('href')).toContain(tData.discloser);
                        payment.discloser.click();
                        Utility.switchToWindow(1);
                        expect(browser.getCurrentUrl()).toContain(tData.discloser);
                        Utility.switchToWindow(0);
                        payment.billingChkBox.check();
                        payment.fillpayment(TestData);
                        payment.purchaseNow.click();
                        Utility.delay(maxWait);
                        expect(browser.getTitle()).toEqual(TestData.receiptPageTitle);
                        console.log('CXAUTO-90_6 complete')
                    });
                    // }
                    it('E2E_7 :Should display primary apllicant', function() {
                        var facility = facility1;
                        //TestData.dependent_facilityoption1;
                        receipt.applicants.click();
                        receipt.applicationNumber.getText().then(function(appicationNumber) {
                            console.log("Application Number == " + appicationNumber);
                            receipt.saveCompletedApplication.click().then(function() {
                                pathToPdf = './PDFDownloads/application' + appicationNumber + '.pdf';
                            })
                        })
                        receipt.getSelectedFacilityDetails('PRIMARY').then(function(facilitydata) {
                            expect(facilitydata.name).toContain(TestData.firstname);
                            expect(facilitydata.facilityName).toEqual(facility.facilityName);
                            expect(facilitydata.street).toEqual(facility.street);
                            expect(facilitydata.city).toEqual(facility.city);
                            expect(facilitydata.region).toEqual(facility.region);
                            expect(facilitydata.postalCode).toContain(facility.postalCode);
                            expect(facilitydata.telephone).toEqual(facility.telephone);
                        });
                    });
                    //Verify and Validate the Application Number and Plan Name in the Receipt Page

                    it('E2E_8 :should generate a valid receipt page', function() {
                        var facility = facility2;
                        receipt.verifyPixel(sdescription, pdescription);
                        //TestData.dependent_facilityoption2;
                        receipt.getSelectedFacilityDetails('DEPENDENT', 1).then(function(facilitydata) {
                            expect(facilitydata.name).toContain(TestData.child3.firstName);
                            expect(facilitydata.facilityName).toEqual(facility.facilityName);
                            expect(facilitydata.street).toEqual(facility.street);
                            expect(facilitydata.city).toEqual(facility.city);
                            expect(facilitydata.region).toEqual(facility.region);
                            expect(facilitydata.postalCode).toContain(facility.postalCode);
                            expect(facilitydata.telephone).toEqual(facility.telephone);
                            Utility.readPDFFile(pathToPdf).then(function(test) {
                                expect(test).toContain(TestData.firstname);
                                console.log('E2E_8: Complete');
                            });
                        });
                    });

                });

            }
        })
    }
})
