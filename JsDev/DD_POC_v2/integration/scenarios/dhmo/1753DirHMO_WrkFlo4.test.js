// Direct_HMO WorkFlows_4

//Start with any zip code & 0 Dep. Add 3 deps. Facilities select from initial Zip
//This Spec is used to Validate End to End Work Flow with the Dependent


var perInfo = new(require('../../pageObjects/cxinit/perInfo-page.js'));
var depInfo = new(require('../../pageObjects/cxinit/dependent-page.js'));
var facilities = new(require('../../pageObjects/cxinit/facilities-page.js'));
var payment = new(require('../../pageObjects/cxinit/payment-page.js'));
var receipt = new(require('../../pageObjects/cxinit/receipt-page.js'));

var enrollPage = new(require('../../pageObjects/cxinit/enroll-page.js'));
var TestData = require('../../testData/' + testDataEnv + '/dhmo/Direct_HMO_WorkFlows_4.json');
var product = ['DHMO'];
// var product = ['DHMO','DPPO','AHMO','APPO'];
var states = ['CA', 'NY'];

//To Navigate Personal Info Page
dataProvider(TestData.states, function(sData, sdescription) {
    if (states.indexOf(sdescription) != -1) {
        dataProvider(sData.products, function(tData, pdescription) {
            if (product.indexOf(pdescription) != -1) {

                describe('DHMO:1753 Direct_HMO WorkFlows_4 : ' + sdescription + 'Product:' + pdescription + '', function() {
                    var effectiveDate, apNumber, pathToPdf, facility1, facility2, facility3, facility4;
                    beforeAll(function() {
                        console.log(' ');
                        console.log('--- E2E WrkFlow1 ---');
                        console.log(' ');
                        Utility.openApplication('', 'DELTA');

                    });
                    beforeEach(function () {
                        jasmine.addMatchers(custommatcher.customMatchers);
                    });

                    //Fill the Valid Data in the home page of Enrollment and Proceed

                    it('E2E_1 : Should complete the Enroll Page', function() {
                        enrollPage.enterHomePageDetails(tData.enrollData).then(function(sdate) {
                            effectiveDate = sdate;
                            console.log("sdate============" + sdate);
                        })
                        expect(perInfo.fieldFirstName.isPresentAndDisplayed()).toBeTruthy();
                        console.log('1753_1 complete')
                    });

                    //Enter the valid Test Data in the Personal Information page and Click n the Next

                    it('E2E_2 :should populate PersInfo page', function() {
                        perInfo.fillPersonalInfo(TestData);
                        perInfo.fillAddress(tData);
                        perInfo.phoneNumberemail(TestData);
                        perInfo.next.click();
                        expect(browser.getTitle()).toEqual(TestData.DependentPageTitle);
                        console.log('1753_2 complete')
                    });

                    // Add Dependents in the dependent page with 2 Child and 1 DM and Proceed

                    it('E2E_3 :should add 3 Dependents, 2 child and DM', function() {
                        expect(depInfo.fieldAddDependents.isPresentAndDisplayed()).toBeTruthy();
                        depInfo.fillDependent('Dependent1', TestData.Spouse, false);
                        depInfo.fillDependent('Dependent2', TestData.child1, false);
                        depInfo.fillDependent('Dependent3', TestData.child2, false);
                        depInfo.next.click();
                        Utility.waitUntilElementNotPresent(element(by.css('img.loaderImg')));
                        expect(depInfo.premiumChangePopUp.isPresentAndDisplayed()).toBeTruthy();
                        depInfo.continue.click();
                        expect(browser.getTitle()).toEqual(TestData.facilitiesPageTitle);
                        console.log('1753_3 complete')

                    });


                    //Verify and Select the Facility for the Dependent

                    it('E2E_4 :should select fac for primary', function() {
                        /*facilities.selectFacility(TestData.facilityoption1);
                        facilities.next.click();*/

                        facilities.selectFacility().then(function(fnamee) {
                            facility1 = fnamee;
                        });
                        facilities.next.click();
                        expect(browser.getTitle()).toEqual(TestData.facilitiesPageTitle);
                        console.log('1753_4 complete')
                    });

                    //Verify and Select the Facility for the Dependent

                    it('E2E_5 :should select fac for deps', function() {

                        facilities.selectFacility().then(function(fnamee) {
                            facility2 = fnamee;
                        });
                        facilities.next.click();
                        facilities.selectFacility().then(function(fnamee) {
                            facility3 = fnamee;
                        });
                        facilities.next.click();
                        facilities.selectFacility().then(function(fnamee) {
                            facility4 = fnamee;
                        });

                        /*facilities.next.click();
                        facilities.selectFacility(TestData.facilityoption2);
                        facilities.next.click();
                        facilities.selectFacility(TestData.facilityoption3);
                        facilities.next.click();
                        facilities.selectFacility(TestData.facilityoption4);
                        facilities.next.click();*/
                        expect(browser.getTitle()).toEqual(TestData.paymentPageTitle);
                        console.log('1753_5 complete')
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
                        payment.summaryTotalPrice.getText().then(function(premium) {
                            premiumAmount = premium;
                        });
                        payment.purchaseNow.click();
                        Utility.delay(maxWait);
                        expect(browser.getTitle()).toEqual(TestData.receiptPageTitle);
                        console.log('1753_6 complete')
                    });
                    // }
                    //Verify and Validate the Application Number and Plan Name in the Receipt Page

                    it('E2E_7 :Should submit delta rating', function() {
                        receipt.submitRating(TestData.deltaRating);
                        receipt.answerQuery(TestData.queryAnswer);
                        expect(receipt.getThanksMsg()).toEqual(TestData.thanksMsg);
                        receipt.applicationNumber.getText().then(function(appicationNumber) {
                            console.log("Application Number == " + appicationNumber);
                            receipt.saveCompletedApplication.click().then(function() {
                                pathToPdf = './PDFDownloads/application' + appicationNumber + '.pdf';
                            })
                        })
                        expect(receipt.planPurchased.getText()).toContain(TestData.planName);
                        expect(receipt.effectiveDate.getText()).toEqual(effectiveDate);
                        expect(receipt.totalPaid.getText()).toEqual(premiumAmount);
                        console.log('1753_7 complete')
                    });

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
                        console.log('1753_8 complete')

                    });
                    it('E2E_9 :Should display primary applicant', function() {
                        var facility = facility1;
                        //TestData.primaryFacility;
                        receipt.applicants.click();
                        receipt.getSelectedFacilityDetails('PRIMARY').then(function(facilitydata) {
                            expect(facilitydata.name).toContain(TestData.firstname);
                            expect(facilitydata.facilityName).toEqual(facility.facilityName);
                            expect(facilitydata.street).toEqual(facility.street);
                            expect(facilitydata.city).toEqual(facility.city);
                            expect(facilitydata.region).toEqual(facility.region);
                            expect(facilitydata.postalCode).toEqual(facility.postalCode);
                            expect(facilitydata.telephone).toEqual(facility.telephone);
                            console.log('1753_9 complete')
                        });
                    });

                    it('E2E_10:Should display dependent-1 applicant', function() {
                        var facility = facility2;
                        //TestData.dependent1;
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
                            });
                            console.log('1753_10 complete')
                        });
                    });

                    it('E2E_11:Should display dependent-2 applicant', function() {
                        var facility = TestData.dependent2;
                        receipt.getSelectedFacilityDetails('DEPENDENT', 2).then(function(facilitydata) {
                            expect(facilitydata.name).toContain(TestData.child1.firstName);
                            expect(facilitydata.facilityName).toEqual(facility.facilityName);
                            expect(facilitydata.street).toEqual(facility.street);
                            expect(facilitydata.city).toEqual(facility.city);
                            expect(facilitydata.region).toEqual(facility.region);
                            expect(facilitydata.postalCode).toEqual(facility.postalCode);
                            expect(facilitydata.telephone).toEqual(facility.telephone);
                            console.log('1753_11 complete')
                        });
                    });

                    it('E2E_12:Should display dependent-3 applicant', function() {
                        var facility = TestData.dependent3;
                        receipt.verifyPixel(sdescription, pdescription);
                        receipt.getSelectedFacilityDetails('DEPENDENT', 3).then(function(facilitydata) {
                            expect(facilitydata.name).toContain(TestData.child2.firstName);
                            expect(facilitydata.facilityName).toEqual(facility.facilityName);
                            expect(facilitydata.street).toEqual(facility.street);
                            expect(facilitydata.city).toEqual(facility.city);
                            expect(facilitydata.region).toEqual(facility.region);
                            expect(facilitydata.postalCode).toEqual(facility.postalCode);
                            expect(facilitydata.telephone).toEqual(facility.telephone);
                            console.log('1753_12 complete')
                        });
                    });


                });
            }
        })
    }
})
