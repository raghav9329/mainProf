var perInfo = new(require('../../../pageObjects/cxinit/perInfo-page.js'));
var depInfo = new(require('../../../pageObjects/cxinit/dependent-page.js'));
var facilities = new(require('../../../pageObjects/cxinit/facilities-page.js'));
var payment = new(require('../../../pageObjects/cxinit/payment-page.js'));
var receipt = new(require('../../../pageObjects/cxinit/receipt-page.js'));

var enrollPage = new(require('../../../pageObjects/cxinit/enroll-page.js'));
var TestData = require('../../../testData/' + testDataEnv + '/dhmo/cxauto90.json');
var statesData = require('../../../testData/' + testDataEnv + '/statesAndProducts.json');

//To Navigate Personla Info Page
dataProvider(statesData.states, function(sData, sdescription) {
    if (states.indexOf(sdescription) != -1) {
        dataProvider(sData.products, function(tData, pdescription) {
            if (product.indexOf(pdescription) != -1) {

                describe('CXAUTO-90:E2E_WrkFlow ' + sdescription + 'Product:' + pdescription + '', function() {
                    var effectiveDate, apNumber, pathToPdf, facility1, facility2;
                    beforeAll(function() {
                        console.log(' ');
                        console.log('--- CXAUTO-90 E2E WrkFlow1 ---')
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
                        console.log('CXAUTO-90_1 complete');

                    });

                    //Enter the valid Test Data in the Personal Information page and Click n the Next

                    it('E2E_2 :should populate PersInfo page', function() {
                        perInfo.fillPersonalInfo(TestData);
                        perInfo.fillAddress(tData);
                        perInfo.chkBoxDiffMailAddr.unCheck();
                        perInfo.hiddenfieldMailAddr.setText(TestData.mailaddress);
                        perInfo.hiddenfieldCity.setText(TestData.city);
                        perInfo.hiddenfieldState.setText(TestData.State);
                        perInfo.hiddenfieldZipCode.setText(TestData.ZipCode);
                        perInfo.phoneNumberemail(TestData);
                        if (pdescription == 'DHMO' || pdescription == 'DPPO') {
                            perInfo.RadBtnBrokerYes.select();
                            perInfo.hiddenfieldBrokerNum.setText(TestData.brokernumber + '\t');
                            expect(perInfo.hiddenbrokerName.isPresentAndDisplayed()).toBeTruthy();
                            expect(perInfo.hiddenbrokerName.getValue()).toEqualIgnoreCase(TestData.brokername);
                        }
                        if (pdescription == 'AHMO' || pdescription == 'APPO') {
                            perInfo.referralSource.selectByText(TestData.referralSource);
                        }
                        perInfo.next.click();
                        expect(browser.getTitle()).toEqual(TestData.DependentPageTitle);
                        console.log('CXAUTO-90_2 complete')

                    });

                    // Add Dependent as a Child and Proceed
                    //Validate the Dependet age is greater than 26 and with the disability check box

                    it('E2E_3 :should add 1 Child Dep', function() {
                        expect(depInfo.fieldAddDependents.isPresentAndDisplayed()).toBeTruthy();
                        if (sdescription == 'NY') {
                            TestData.child.DOB = moment().subtract(19, 'years').format('MM-DD-YYYY');
                        }

                        depInfo.fillDependent('Dependent1', TestData.child, false);
                        depInfo.next.click();
                        if (sdescription !== 'NY') {
                            if (depInfo.isHandicapped('Dependent1').isPresentAndDisplayed()) {
                                depInfo.isHandicapped('Dependent1').check();
                                depInfo.next.click();
                            }
                        }
                        expect(depInfo.premiumChangePopUp.isPresentAndDisplayed()).toBeTruthy();
                        depInfo.continue.click();
                        if (pdescription == 'DHMO' || pdescription == 'AHMO') {
                            expect(browser.getTitle()).toEqual(TestData.facilitiesPageTitle);
                        }
                        if (pdescription == 'DPPO' || pdescription == 'APPO') {
                            expect(browser.getTitle()).toEqual(TestData.paymentPageTitle);
                        }
                        console.log('CXAUTO-90_3 complete')

                    });


                    it('E2E_3.1 :Navigate Back to Dependent and Verify Data persist in the Dependent Page', function() {
                        expect(facilities.back.isPresentAndDisplayed()).toBeTruthy();
                        facilities.back.click();
                        expect(browser.getTitle()).toEqual(TestData.DependentPageTitle);
                        expect(depInfo.firstname('Dependent1').getValue()).toEqual(TestData.child.firstName);
                        expect(depInfo.middleName('Dependent1').getValue()).toEqual(TestData.child.middleName);
                        expect(depInfo.lastname('Dependent1').getValue()).toEqual(TestData.child.lastName);
                        expect(depInfo.gender('Dependent1').getSelectedText()).toEqualIgnoreCase(TestData.child.genderVerify);

                        console.log('CXAUTO-90_3.1 complete')
                    });

                    // Navigate back from Dependent Page to Personal Info Page
                    // Verify SSN field is Empty, Gender is selected to "Prefer not to Say"
                    // Data entered in the mailing address and the contact type persists
                    // Change the broker number and assert the updated broker name
                    // Re-enter SSN and navigate to the Happy path accorss the tabs

                    it('E2E_3.2 :Navigates back to Personal INfo and validates the Data persist', function() {
                        expect(depInfo.back.isPresentAndDisplayed()).toBeTruthy();
                        depInfo.back.click();
                        expect(browser.getTitle()).toEqual(TestData.PersonalPageTitle);
                        if (pdescription == 'DHMO' || pdescription == 'DPPO') {
                            expect(perInfo.fieldSsn.getValue()).toEqual('');
                        }
                        expect(perInfo.fieldGenderSelect.getSelectedText()).toEqualIgnoreCase(TestData.gendereverification);

                        expect(perInfo.hiddenfieldMailAddr.getValue()).toEqual(TestData.mailaddress);
                        expect(perInfo.hiddenfieldCity.getValue()).toEqual(TestData.city);
                        expect(perInfo.hiddenfieldState.getValue()).toEqual(TestData.State);
                        expect(perInfo.hiddenfieldZipCode.getValue()).toEqual(TestData.ZipCode);
                        expect(perInfo.fieldPhoneSelect.getSelectedText()).toEqual(TestData.contactType);
                        if (pdescription == 'DHMO' || pdescription == 'DPPO') {
                            expect(perInfo.hiddenfieldBrokerNum.getValue()).toEqual(TestData.brokernumber);
                            expect(perInfo.hiddenbrokerName.isPresentAndDisplayed()).toBeTruthy();
                            expect(perInfo.hiddenbrokerName.getValue()).toEqualIgnoreCase(TestData.brokername);

                            perInfo.hiddenfieldBrokerNum.setText(TestData.updatedbrokernumber + '\t');
                            expect(perInfo.hiddenbrokerName.isPresentAndDisplayed()).toBeTruthy();
                            expect(perInfo.hiddenbrokerName.getValue()).toEqualIgnoreCase(TestData.updatedbrokername);
                        }
                        if (pdescription == 'AHMO' || pdescription == 'APPO') {
                            perInfo.referralSource.selectByText(TestData.referralSource);
                        }
                        perInfo.next.click();
                        if (pdescription == 'DHMO' || pdescription == 'DPPO') {
                            expect(perInfo.serverErrMsgSsn.getText()).toEqualIgnoreCase('Please enter your SSN');
                            expect(perInfo.errMsgSsn.getText()).toEqualIgnoreCase('Please enter your SSN');
                            perInfo.fieldSsn.setText(TestData.ssn);
                            perInfo.RadBtnBrokerNo.select();
                            perInfo.next.click();
                        }

                        console.log('CXAUTO-90_3.2 complete')
                    });


                    //Verify and Select the Facility for the Dependent

                    it('E2E_4 :should select fac for primary', function() {

                        // expect(browser.getTitle()).toEqual(TestData.DependentPageTitle);
                        // depInfo.next.click();
                        // expect(depInfo.premiumChangePopUp.isPresentAndDisplayed()).toBeTruthy();
                        // depInfo.continue.click();
                        expect(browser.getTitle()).toEqual(TestData.DependentPageTitle);
                        depInfo.next.click();
                        if (pdescription == 'DHMO' || pdescription == 'AHMO') {
                            expect(browser.getTitle()).toEqual(TestData.facilitiesPageTitle);

                            facilities.selectFacility().then(function(fnamee) {
                                facility1 = fnamee;
                            });
                            facilities.next.click();
                        }
                        console.log('CXAUTO-90_4 complete')
                    });

                    //Verify and Select the Facility for the Dependent

                    it('E2E_5 :should select fac for deps', function() {
                        if (pdescription == 'DHMO' || pdescription == 'AHMO') {
                            facilities.selectFacility().then(function(fnamee) {
                                facility2 = fnamee;
                            });
                            facilities.next.click();
                        }
                        expect(browser.getTitle()).toEqual(TestData.paymentPageTitle);
                        console.log('CXAUTO-90_5 complete')
                    });

                    //Furnish all the fields of the Payment page with the valid Test Data and proceed

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
                        console.log('CXAUTO-90_6 complete')
                    });

                    it('E2E_7 :Should display primary apllicant', function() {

                        //TestData.dependent_facilityoption1;
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
                                expect(facilitydata.name).toContain(TestData.firstname);
                                expect(facilitydata.facilityName).toEqual(facility.facilityName);
                                expect(facilitydata.street).toEqual(facility.street);
                                expect(facilitydata.city).toEqual(facility.city);
                                expect(facilitydata.region).toEqual(facility.region);
                                expect(facilitydata.postalCode).toContain(facility.postalCode);
                                expect(facilitydata.telephone).toEqual(facility.telephone);
                            });
                        }
                    });

                    //Verify and Validate the Application Number and Plan Name in the Receipt Page

                    it('E2E_8 :should generate a valid receipt page', function() {

                        //TestData.dependent_facilityoption2;
                        if (pdescription == 'DHMO' || pdescription == 'AHMO') {
                            if (testDataEnv == 'dit') {
                                var facility = TestData.dependent_facilityoption2;
                            } else {
                                var facility = facility2;
                            }
                            receipt.getSelectedFacilityDetails('DEPENDENT', 1).then(function(facilitydata) {
                                expect(facilitydata.name).toContain(TestData.child.firstName);
                                expect(facilitydata.facilityName).toEqual(facility.facilityName);
                                expect(facilitydata.street).toEqual(facility.street);
                                expect(facilitydata.city).toEqual(facility.city);
                                expect(facilitydata.region).toEqual(facility.region);
                                expect(facilitydata.postalCode).toContain(facility.postalCode);
                                expect(facilitydata.telephone).toEqual(facility.telephone);
                            });
                        };
                        if (pdescription == 'DHMO' || pdescription == 'DPPO') {
                            receipt.verifyPixel(sdescription, pdescription);
                            Utility.readPDFFile(pathToPdf).then(function(test) {
                                expect(test).toContain(TestData.firstname);
                                console.log('CXAUTO-90_E2E_8: Complete');
                            });
                        }

                    });

                });

            }
        })
    }
})