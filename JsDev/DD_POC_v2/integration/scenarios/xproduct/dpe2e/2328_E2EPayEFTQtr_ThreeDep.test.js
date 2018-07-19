/*Create a single end ot end test case 
start with 3 dependents so primary plus spouse plus 2 children
(maybe thaat's 4)*/

var perInfo     = new(require('../../../pageObjects/cxinit/perInfo-page.js'));
var depInfo     = new(require('../../../pageObjects/cxinit/dependent-page.js'));
var facilities  = new(require('../../../pageObjects/cxinit/facilities-page.js'));
var payment     = new(require('../../../pageObjects/cxinit/payment-page.js'));
var receipt     = new(require('../../../pageObjects/cxinit/receipt-page.js'));
var enrollPage  = new(require('../../../pageObjects/cxinit/enroll-page.js'));
var TestData    = require('../../../testData/' + testDataEnv + '/dppo/dppo.2328_E2EPayEFTQtr_ThreeDep.json');
var statesData  = require('../../../testData/' + testDataEnv + '/statesAndProducts.json');
var product     = ['DPPO'];

//To Navigate Personla Info Page
dataProvider(statesData.states, function(sData, sdescription) {
    if (states.indexOf(sdescription) != -1) {
        dataProvider(sData.products, function(tData, pdescription) {
            if (product.indexOf(pdescription) != -1) {

                describe('2328_E2EPayEFTQtr_ThreeDep:State:' + sdescription + 'Product:' + pdescription + '', function() {
                    var effectiveDate, apNumber, pathToPdf;
                    beforeAll(function() {
                        console.log(' ');
                        console.log('--- Payment_Anual_ThreeDep_WrkFlow ---')
                        console.log(' ');
                        Utility.openApplication('', tData.product);
                    });
                    beforeEach(function() {
                        jasmine.addMatchers(custommatcher.customMatchers);
                    });

                    //Fill the Valid Data in the home page of Enrollment and Proceed
                    it('E2E_1 : Should complete the Enroll Page', function() {
                        TestData.firstname = Utility.randomNo('String', 8);
                        TestData.lastname = Utility.randomNo('String', 8);
                        var ssn = Utility.randomNo('Number', 8);
                        TestData.ssn = '1' + ssn.toString();
                        enrollPage.enterHomePageDetails(tData.enrollData).then(function(sdate) {
                            effectiveDate = sdate;
                            expect(perInfo.fieldFirstName.isPresentAndDisplayed()).toBeTruthy('Verify that "First Name" field in personal info page is displayed');
                            console.log('E2E_1: Complete');
                        });
                    });

                    //Enter the valid Test Data in the Personal Information page and Click n the Next

                    it('E2E_2 :should populate PersInfo page', function() {
                        perInfo.fillPersonalInfo(TestData);
                        perInfo.fillAddress(tData);
                        perInfo.phoneNumberemail(TestData);
                        perInfo.fillBroker(TestData);
                        expect(browser.getTitle()).toEqual(TestData.DependentPageTitle, 'Verfiy "Dependent Page" is Displayed and the title is Equal as' + TestData.DependentPageTitle);
                        console.log('E2E_2: Complete');
                    });

                    // Add Dependents in the dependent page with 2 Child and 1 DM and Proceed

                    it('E2E_3 :should add 3 Dependents, 2 child and DM', function() {
                        expect(depInfo.fieldAddDependents.isPresentAndDisplayed()).toBeTruthy('Verify the Field "Add Dependent" is displayed and present');
                        depInfo.fillDependent('Dependent1', TestData.Spouse, false);
                        depInfo.fillDependent('Dependent2', TestData.child1, false);
                        depInfo.fillDependent('Dependent3', TestData.child2, false);
                        depInfo.next.click();
                        expect(depInfo.premiumChangePopUp.isPresentAndDisplayed()).toBeTruthy('Verify Premium Pop Up is Displayed');
                        depInfo.continue.click();
                        expect(browser.getTitle()).toEqual(TestData.paymentPageTitle, 'Verify "Payment" page is displayed and the title is Equal as' + TestData.paymentPageTitle);
                        console.log('E2E_3: Complete');

                    });

                    // Validate the bank details fields
                    // Select the Monthly Payment option and fill the valid bank details in the fields

                    it('E2E_4 :should fill out pay details', function() {

                        payment.EFTBankTransfer.select();
                        payment.next.click();
                        expect(payment.bankNameError.getText()).toEqual(TestData.bankNameError, 'Verify Bank Name error field is same as: ' + TestData.bankNameError);
                        expect(payment.accountHolderNameError.getText()).toEqual(TestData.accountHolderNameError, 'Verify Account Holder Error field is same as: ' + TestData.accountHolderNameError);
                        expect(payment.routingNumberError.getText()).toEqual(TestData.routingNumberError, 'Verify Rounting Number Error field is same as: ' + TestData.routingNumberError);
                        expect(payment.accountNumberError.getText()).toEqual(TestData.accountNumberError, 'Verify Account Number error field is same as: ' + TestData.accountNumberError);
                        payment.fillBankDetails(TestData);
                        payment.frequencyQuterly.select();
                        payment.next.click();
                        expect(payment.discloser.getAttribute('href')).toContain(tData.discloser, 'Verify the "Payment Discloser" contains text same as' + tData.discloser);
                        payment.discloser.click();
                        Utility.switchToWindow(1);
                        expect(browser.getCurrentUrl()).toContain(tData.discloser, 'Verify the URL has discloser text same as' + tData.discloser);
                        Utility.switchToWindow(0);

                        payment.summaryTotalPrice.getText().then(function(premium) {
                            premiumAmount = premium;
                        });
                        payment.authChkBox.check();
                        payment.purchaseNow.click();
                        Utility.delay(maxWait);
                        expect(browser.getTitle()).toEqual(TestData.receiptPageTitle, 'Verify "Receipt" Page is displayed and the Tilte is Equal as' + TestData.receiptPageTitle);
                        console.log('E2E_4: Complete');
                    });

                    //Verify and Validate the Application Number and Plan Name in the Receipt Page

                    it('E2E_5 :Should submit delta rating', function() {
                        receipt.applicationNumber.getText().then(function(appicationNumber) {
                            console.log("Application Number == " + appicationNumber);
                            apNumber = appicationNumber;
                        })
                        receipt.planSummary.click();
                        receipt.submitRating(TestData.deltaRating);
                        receipt.answerQuery(TestData.queryAnswer);
                        expect(receipt.getThanksMsg()).toEqual(TestData.thanksMsg, 'Verify the Thanks Message displayed in the receipt page is same as: ' + TestData.thanksMsg);
                        receipt.applicationNumber.getText().then(function(appicationNumber) {
                            console.log("Application Number == " + appicationNumber);
                            apNumber = appicationNumber;
                        })
                        expect(receipt.planPurchased.getText()).toContain(tData.enrollData.planName, 'Verify "Purchased Plan" name is same as: ' + tData.enrollData.planName);
                        expect(receipt.effectiveDate.getText()).toEqual(effectiveDate, 'Verify Effective Date in Displayed and Present in the receipt page is same as: ' + effectiveDate);
                        expect(receipt.totalPaid.getText()).toEqual(premiumAmount, 'Verify Total premium amount paid is same as: ' + premiumAmount);

                        console.log('E2E_5: Complete');
                    });
                    it('E2E_6 :Should display plansummary', function() {
                        var plansummary = tData.planSummary;
                        expect(receipt.getPlanSummaryByKey('Deductible per calendar year per person').getText()).toEqual(plansummary.Deductible_per_calendar, 'Verify "Deductable value" field under Plansummary is same as: ' + plansummary.Deductible_per_calendar);
                        expect(receipt.getPlanSummaryByKey('Maximum per calendar year per person').getText()).toEqual(plansummary.Max_per_calendar, 'Verify Max Per "Calendar value" under Plan summary is same as: ' + plansummary.Max_per_calendar);
                        expect(receipt.getPlanSummaryByKey('Office visit').getText()).toEqual(plansummary.Officevisit, 'Verify "Officevisit field value under Plan summary is same as: ' + plansummary.Officevisit);
                        expect(receipt.getPlanSummaryByKey('Exams').getText()).toEqual(plansummary.Exams, 'Verify "Exams value" under Plan summary is same as: ' + plansummary.Exams);
                        expect(receipt.getPlanSummaryByKey('X-rays').getText()).toEqual(plansummary.Xrays, 'Verify "Xrays" value under Plan summary is same as: ' + plansummary.Xrays);
                        expect(receipt.getPlanSummaryByKey('Cleanings').getText()).toEqual(plansummary.Cleanings, 'Verify "Cleanings" field value under plan summary is same as: ' + plansummary.Cleanings);
                        expect(receipt.getPlanSummaryByKey('Fillings').getText()).toEqual(plansummary.Fillings, 'Verify "Fillings" field value under plan summary is same as: ' + plansummary.Fillings);
                        expect(receipt.getPlanSummaryByKey('Root canals').getText()).toEqual(plansummary.Rootcanals, 'Verify "Rootcanals" field value under plan summary is same as: ' + plansummary.Rootcanals);
                        expect(receipt.getPlanSummaryByKey('Gum treatment').getText()).toEqual(plansummary.Gumtreatment, 'Verify "Gumtreatment" field value under plan summary is same as: ' + plansummary.Gumtreatment);
                        expect(receipt.getPlanSummaryByKey('Extractions').getText()).toEqual(plansummary.Extractions, 'Verify "Extractions" field value under plan summary is same as: ' + plansummary.Extractions);
                        expect(receipt.getPlanSummaryByKey('Denture repair').getText()).toEqual(plansummary.Denturerepair, 'Verify "Denturerepair" field value under plan summary is same as: ' + plansummary.Denturerepair);
                        expect(receipt.getPlanSummaryByKey('Crowns').getText()).toEqual(plansummary.Crowns, 'Verify "Crowns" field value under plan summary is same as: ' + plansummary.Crowns);
                        expect(receipt.getPlanSummaryByKey('Orthodontics').getText()).toEqual(plansummary.Orthodontics, 'Verify "Orthodontics" field value under plan summary is same as: ' + plansummary.Orthodontics);
                        console.log('E2E_6: Complete');

                    });
                    it('E2E_7 :Should display primary applicant', function() {
                        receipt.saveCompletedApplication.click().then(function() {
                            pathToPdf = './PDFDownloads/application' + apNumber + '.pdf';
                        });
                        browser.sleep(10000)
                        receipt.applicants.click();
                        receipt.getSelectedFacilityDetails('PRIMARY').then(function(facilitydata) {
                            expect(facilitydata.name).toContain(TestData.firstname, 'Verify the "First Name" field value of Primary Facility is same as: ' + TestData.firstname);
                            console.log('E2E_7: Complete');
                        });
                    });

                    it('E2E_8:Should display dependent-1 applicant', function() {
                        var facility = TestData.dependent1;
                        receipt.getSelectedFacilityDetails('DEPENDENT', 1).then(function(facilitydata) {
                            expect(facilitydata.name).toContain(TestData.Spouse.firstName, 'Verify the "First Name" field value of Dependent-1 Facility is same as: ' + TestData.Spouse.firstName);
                            console.log('E2E_8: Complete');
                        });
                    });

                    it('E2E_9:Should display dependent-2 applicant', function() {
                        var facility = TestData.dependent2;
                        receipt.getSelectedFacilityDetails('DEPENDENT', 2).then(function(facilitydata) {
                            expect(facilitydata.name).toContain(TestData.child1.firstName, 'Verify the "First Name" field value of Dependent-2 Facility is same as: ' + TestData.child1.firstName);
                            Utility.readPDFFile(pathToPdf).then(function(test) {
                                expect(test).toContainPdfFile(TestData.firstname, 'Verify the "FirstName" field value displayed in the PDF is same as: ' + TestData.firstname);

                                receipt.verifyPixel(sdescription, pdescription);
                                console.log('E2E_9: Complete');
                            });
                        });
                    });

                });
            }
        })
    }
})
