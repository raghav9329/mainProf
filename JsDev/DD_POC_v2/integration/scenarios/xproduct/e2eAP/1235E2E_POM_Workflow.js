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
                        expect(perInfo.fieldFirstName.isPresentAndDisplayed()).toBeTruthy('Verify that "First Name" field in personal info page is displayed');
                        perInfo.next.click();
                        if (pdescription == 'DHMO' || pdescription == 'DPPO') {
                            expect(perInfo.getServerValidationMessages()).toEqual(TestData.personalInfoErrors, 'Verify the Server validation messages are Equal as ' + TestData.personalInfoErrors);
                            expect(perInfo.getClientValidationMessages()).toEqual(TestData.personalInfoErrors, 'Verify the Client validation messages are Equal as ' + TestData.personalInfoErrors);
                        }


                        if (pdescription == 'AHMO' || pdescription == 'APPO') {
                            expect(perInfo.getServerValidationMessages()).toEqual(TestData.personalInfoErrorsAarp, 'Verify the Server validation messages are Equal as ' + TestData.personalInfoErrorsAarp);
                            expect(perInfo.getClientValidationMessages()).toEqual(TestData.personalInfoErrorsAarp, 'Verify the Client validation messages are Equal as ' + TestData.personalInfoErrorsAarp);

                        }
                    });


                    it('E2E_1.1 : Should complete the Personal info page with Max characters of the fields in Page', function() {
                        // enrollPage.enterHomePageDetails(tData.enrollData).then(function(sdate) {
                        //     effectiveDate = sdate;
                        //     console.log("sdate============" + sdate);
                        // })
                        expect(perInfo.fieldFirstName.isPresentAndDisplayed()).toBeTruthy('Verifies the First Name field is displayed');
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

                        perInfo.fieldFirstName.setText(TestData.maxlengthFirstname);
                        perInfo.fieldFirstName.getValue().then(function(fname) {
                            console.log("fname length==" + fname.length);
                            expect(perInfo.fieldFirstName.getAttribute('maxlength')).toEqual(fname.length.toString(), 'Verify Length of the "First Name" field is Equal as' + fname.length.toString());
                        })
                        perInfo.fieldMidInitial.setText(TestData.maxlengthMiddlename);
                        perInfo.fieldLastName.setText(TestData.maxlengthLastname);

                        perInfo.fieldLastName.getValue().then(function(lname) {
                            console.log("lname.length==" + lname.length);
                            expect(perInfo.fieldLastName.getAttribute('maxlength')).toEqual(lname.length.toString(), 'Verify Length of the "Last Name" field is Equal as' + lname.length.toString());
                        })
                        perInfo.fieldZipCode.getValue().then(function(zipcode) {
                            console.log("Zipcode===" + zipcode);
                            expect(zipcode).toEqual(tData.enrollData.ZIPcode, 'Verify Zipcode is equal as' + tData.enrollData.ZIPcode);
                        })
                        perInfo.fieldZipCode.setText(TestData.ZipCode);
                        perInfo.fieldPhoneNumber.click();
                        perInfo.zipPopUp.isPresentAndDisplayed().then(function(displayed) {
                            if (displayed) {
                                expect(perInfo.zipPopUp.isPresentAndDisplayed()).toBeTruthy('Verifies Zipcode is Displayed');
                                perInfo.zipPopBack.click();
                            }
                        })
                        perInfo.fieldZipCode.getValue().then(function(zipcode) {
                            console.log("Zipcode===" + zipcode);
                            expect(zipcode).toEqual(tData.enrollData.ZIPcode, 'Verify Zipcode is equal as' + tData.enrollData.ZIPcode);
                        })
                        perInfo.fieldZipCode.setText(tData.enrollData.ZIPcode);
                        perInfo.fieldPhoneNumber.click();
                        perInfo.zipPopUp.isPresentAndDisplayed().then(function(displayed) {
                            if (displayed) {
                                expect(perInfo.zipPopUp.isPresentAndDisplayed()).toBeTruthy('Verifies Zipcode pop up is dispayed');
                                perInfo.zipPopNewQuote.click();
                                expect(planOptions.isAt()).toEqual('Verify Plan Option Page is Displayed');
                                planOptions.getPlanDetails(tData.enrollData.PlanName).click();
                                planDetails.buyPlan.click();
                            }
                        })

                    });

                    //Enter the valid Test Data in the Personal Information page and Click n the Next

                    it('E2E_Flow_2: Verify Personal Information Page is filled with Valid data and Proceed', function() {
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
                        expect(browser.getTitle()).toEqual(TestData.DependentTitle, 'Verfiy "Dependent Page" is Displayed and the title is Equal as' + TestData.DependentTitle);

                    });

                    //Verify and Validate the both the Client and Server side Errors in the Dependent Page with the NUll Values supplied

                    it('E2E_Flow_3: Verifying the Errors of both client and server side by passing NULL values', function() {
                        depInfo.fieldAddDependents.click();
                        depInfo.next.click();
                        expect(depInfo.getServerValidationMessages()).toEqual(TestData.dependentErrors, 'Verify "Server Validation Messages" are Equal as' + TestData.dependentErrors);
                        Utility.scrollToTop();
                        depInfo.deleteDependent('Dependent1').click();
                    });



                    it('E2E_Flow_3_1: Verifying and Validate the Dependents of same type(Domestic Partner and Spouse do not allowed) not allowed more than 1', function() {
                        expect(depInfo.fieldAddDependents.isPresentAndDisplayed()).toBeTruthy('Verifies the Add Dependent Button is Displayed in the Dependent Page');
                        depInfo.fillDependent('Dependent1', TestData.domesticpartner1, false);
                        depInfo.fillDependent('Dependent2', TestData.Spouse1, false);
                        depInfo.next.click();
                        expect(depInfo.premiumChangePopUp.isPresentAndDisplayed()).toBeTruthy('Verifies the Premium change Pop is dispalyed appeared');
                        depInfo.continue.click();
                        Utility.scrollToTop();
                        expect(depInfo.depError.getText()).toEqual("You can select only 1 Spouse or Partner.", 'Verify the Dependent Error text is same as' + 'You can select only 1 Spouse or Partner.');
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
                            expect(browser.getTitle()).toEqual(TestData.facilitiesTitle, 'Verify "Facility" page is displayed and the title is Equal as' + TestData.facilitiesTitle);
                        } else {
                            expect(browser.getTitle()).toEqual(TestData.paymentTitle, 'Verify "Payment" page is displayed and the title is Equal as' + TestData.paymentTitle);
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
                            expect(browser.getTitle()).toEqual(TestData.paymentTitle, 'Verify "Payment" page is displayed and the title is Equal as' + TestData.paymentTitle);
                        });
                    }

                    //Validate and Verify the both the client and Server side error validations in the Payment Page

                    it('E2E_Flow_6: Validate and Verify the Errors of both the Client and Server in the Payment Page', function() {
                        payment.billingAddress.click();
                        payment.billingChkBox.unCheck();
                        if (pdescription == 'DHMO' || pdescription == 'DPPO') payment.next.click();
                        if (pdescription == 'AHMO' || pdescription == 'APPO') payment.purchaseNow.click();

                        expect(payment.getCCValidationMessages()).toEqual(TestData.paymentErrors, 'Verify the "Credit Card Client Validation" messages are Equal as ' + TestData.paymentErrors)
                        expect(payment.getBillingAddressValidationMessages()).toEqual(TestData.paymentAddressErrors, 'Verify the "Billing Address Client Validation" messages are Equal as ' + TestData.paymentAddressErrors);
                        expect(payment.getCCServerValidationMessages()).toEqual(TestData.paymentErrors, 'Verify the "Credit Card Server Validation" messages are Equal as ' + TestData.paymentErrors);
                        expect(payment.getBillingAddressServerValidationMessages()).toEqual(TestData.paymentAddressErrors, 'Verify the "Billing Address Server Validation" messages are Equal as ' + TestData.paymentAddressErrors);
                    });

                    //Furnish all the fields of the Payment page with the valid Test Data and proceed

                    /* Unable to Proceed logged a defect for the same CXINIT-1393 */

                    it('E2E_Flow_7: Validate and Verify Payment Page Details with valid Test Data', function() {
                        payment.billingChkBox.check();
                        payment.fillpayment(TestData);
                        if (pdescription == 'AHMO' || pdescription == 'APPO') {
                            payment.frequencyAnnualy.select();
                            payment.fillBankDetails(TestData);
                        }
                        if (pdescription == 'DHMO' || pdescription == 'DPPO') {
                            expect(payment.discloser.getAttribute('href')).toContain(tData.discloser, 'Verify the "Payment Discloser" contains text same as' + tData.discloser);
                            payment.discloser.click();
                            Utility.switchToWindow(1);
                            expect(browser.getCurrentUrl()).toContain(tData.discloser, 'Verify the URL has discloser text same as' + tData.discloser);
                            Utility.switchToWindow(0);
                        }
                        payment.purchaseNow.click();
                        expect(browser.getTitle()).toEqual(TestData.receiptTitle, 'Verify "Receipt" Page is displayed and the Tilte is Equal as' + TestData.receiptTitle);
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
                        expect(receipt.getPlanSummaryByKey('Deductible per calendar year per person').getText()).toEqual(plansummary.Deductible_per_calendar, 'Verify that the "Deductible per calendar year per person" field value is Equal as' + plansummary.Deductible_per_calendar);
                        expect(receipt.getPlanSummaryByKey('Maximum per calendar year per person').getText()).toEqual(plansummary.Max_per_calendar, 'Verify that the "Maximum per calendar year per person" field value is Equal as' + plansummary.Max_per_calendar);
                        expect(receipt.getPlanSummaryByKey('Office visit').getText()).toEqual(plansummary.Officevisit, 'Verify that the "Office Visit" field value is Equal as' + plansummary.Officevisit);
                        expect(receipt.getPlanSummaryByKey('Exams').getText()).toEqual(plansummary.Exams, 'Verify that the "Exams" field value is Equal as' + plansummary.Exams);
                        expect(receipt.getPlanSummaryByKey('X-rays').getText()).toEqual(plansummary.Xrays, 'Verify that the "Xrays" field value is Equal as' + plansummary.Xrays);
                        expect(receipt.getPlanSummaryByKey('Cleanings').getText()).toEqual(plansummary.Cleanings, 'Verify that the "Cleanings" field value is Equal as' + plansummary.Cleanings);
                        expect(receipt.getPlanSummaryByKey('Fillings').getText()).toEqual(plansummary.Fillings, 'Verify that the "Fillings" field value is Equal as' + plansummary.Fillings);
                        expect(receipt.getPlanSummaryByKey('Root canals').getText()).toEqual(plansummary.Rootcanals, 'Verify that the "Rootcanals" field value is Equal as' + plansummary.Rootcanals);
                        expect(receipt.getPlanSummaryByKey('Gum treatment').getText()).toEqual(plansummary.Gumtreatment, 'Verify that the "Gumtreatment" field value is Equal as' + plansummary.Gumtreatment);
                        expect(receipt.getPlanSummaryByKey('Extractions').getText()).toEqual(plansummary.Extractions, 'Verify that the "Extractions" field value is Equal as' + plansummary.Extractions);
                        expect(receipt.getPlanSummaryByKey('Denture repair').getText()).toEqual(plansummary.Denturerepair, 'Verify that the "Denturerepair" field value is Equal as' + plansummary.Denturerepair);
                        expect(receipt.getPlanSummaryByKey('Crowns').getText()).toEqual(plansummary.Crowns, 'Verify that the "Crowns" field value is Equal as' + plansummary.Crowns);
                        expect(receipt.getPlanSummaryByKey('Orthodontics').getText()).toEqual(plansummary.Orthodontics, 'Verify that the "Orthodontics" field value is Equal as' + plansummary.Orthodontics);

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
                                expect(facilitydata.name).toContain(TestData.firstname, 'Verify "First Name" is avaialble in the Primary Facility of the Receipt Page' + TestData.firstname);
                                expect(facilitydata.facilityName).toEqual(facility.facilityName, 'Verify "Facility Name" is dispalyed in the Primary Facility of the Receipt Page and Equal as' + facility.facilityName);
                                expect(facilitydata.street).toEqual(facility.street, 'Verify "Facility Street" is dispalyed in the Primary Facility of the Receipt Page and Equal as' + facility.street);
                                expect(facilitydata.city).toEqual(facility.city, 'Verify "City" is dispalyed in the Primary Facility of the Receipt Page and Equal as' + facility.city);
                                expect(facilitydata.region).toEqual(facility.region, 'Verify "Region" is dispalyed in the Primary Facility of the Receipt Page and Equal as' + facility.region);
                                expect(facilitydata.postalCode).toContain(facility.postalCode, 'Verify "PostalCode" is avaialble in the Primary Facility of the Receipt Page' + facility.postalCode);
                                expect(facilitydata.telephone).toEqual(facility.telephone, 'Verify "Telephone" is dispalyed in the Primary Facility of the Receipt Page and Equal as' + facility.telephone);
                                if (pdescription == 'DHMO' || pdescription == 'DPPO') {
                                    Utility.readPDFFile(pathToPdf).then(function(test) {
                                        expect(test).toContain(TestData.firstname, 'Verify the PDF Path has the First Name in it as' + TestData.firstname);
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