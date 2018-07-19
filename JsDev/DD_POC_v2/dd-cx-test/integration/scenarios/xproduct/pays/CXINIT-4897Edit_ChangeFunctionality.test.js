//CXINIT-4897 Review page Edit and Update Functionality
var TestData   = require('../../../testData/' + testDataEnv + '/dhmo/CXINIT-4897Edit_ChangeFunctionality.json');
var perInfo    = new(require('../../../pageObjects/cxinit/perInfo-page.js'));
var depInfo    = new(require('../../../pageObjects/cxinit/dependent-page.js'));
var facilities = new(require('../../../pageObjects/cxinit/facilities-page.js'));
var payment    = new(require('../../../pageObjects/cxinit/payment-page.js'));
var receipt    = new(require('../../../pageObjects/cxinit/receipt-page.js'));
var enrollPage = new(require('../../../pageObjects/cxinit/enroll-page.js'));
var review     = new(require('../../../pageObjects/cxinit/review-page.js'));
var statesData = require('../../../testData/' + testDataEnv + '/statesAndProducts.json');
product        = ['DHMO', 'DPPO'];
//To Navigate Personla Info Page
dataProvider(statesData.states, function(sData, sdescription) {
    if (states.indexOf(sdescription) != -1) {
        dataProvider(sData.products, function(tData, pdescription) {
            if (product.indexOf(pdescription) != -1) {

                describe('CXINIT-4897:EDIT and Change Functionality ||State:' + sdescription + '||Product:' + pdescription + '||', function() {
                    // Pre-condition: User navigated to Payment page
                    beforeEach(function() {
                        jasmine.addMatchers(custommatcher.customMatchers);
                        Utility.openApplication('', tData.product);
                        enrollPage.enterHomePageDetails(tData.enrollData);
                        expect(perInfo.fieldFirstName.isPresentAndDisplayed()).toBeTruthy('Verify that "First Name" field in personal info page is displayed');
                        TestData.firstname = Utility.randomNo('String', 8);
                        TestData.lastname = Utility.randomNo('String', 8);
                        if (pdescription == 'DHMO' || pdescription == 'DPPO') {
                            TestData.MemberId = false;
                            var ssn = Utility.randomNo('Number', 8);
                            TestData.ssn = '1' + ssn.toString();
                            TestData.alternateid = "test@test.com";
                        }

                        perInfo.fillPersonalInfo(TestData);
                        perInfo.fillAddress(tData);
                        perInfo.phoneNumberemail(TestData);
                        if (pdescription == 'DHMO' || pdescription == 'DPPO') {
                            perInfo.fillBroker(TestData);
                        }

                        expect(browser.getTitle()).toEqual(TestData.dependentPageTitle, 'Verfiy "Dependent Page" is Displayed and the title is Equal as' + TestData.dependentPageTitle);

                        depInfo.next.click();
                        browser.sleep(1000)
                        if (pdescription == 'DHMO') {
                            facilities.selectFacility();
                            facilities.next.click();
                            browser.sleep(1000)
                        }
                        expect(browser.getTitle()).toEqual(TestData.paymentPageTitle, 'Verify "Payment" page is displayed and the title is Equal as' + TestData.paymentPageTitle);
                        payment.fillpayment(TestData);
                    });
                    it('Edit Primary Applicant ', function() {
                        payment.openApplicant.click();
                        expect(review.primaryName.getText()).toEqual(TestData.firstname, 'Verify that Primary Applicant name is displayed with ' + TestData.firstname);
                        review.primaryEdit.click();
                        expect(perInfo.isAt()).toBe(true, 'Verify that user is navigated to personal info page when click on Edit link for Primary applicant');
                        perInfo.fieldFirstName.setText(TestData.firstname2);
                        perInfo.fieldLastName.setText(TestData.lastname2);
                        perInfo.fieldGenderSelect.selectByText(TestData.gender2);
                        var d = TestData.dob2;
                        var datesplit = (d.split('-'));
                        perInfo.fieldBdMM.setText(datesplit[0]);
                        perInfo.fieldBdDD.setText(datesplit[1]);
                        perInfo.fieldBdYyyy.setText(datesplit[2]);
                        perInfo.fieldBdMM.setText(datesplit[0]);
                        perInfo.fieldEmailAddr.setText(TestData.email2);
                        perInfo.fieldSsn.setText(TestData.ssn)
                        perInfo.update.click();
                        expect(review.isAt()).toBe(true, 'Verify that User navigated to review page when click on update button in personal info page');
                        payment.openApplicant.click();
                        expect(review.primaryName.getText()).toEqual(TestData.firstname2, 'Verify that primary name is updated with ' + TestData.firstname2);
                        review.primaryEdit.click();
                        expect(perInfo.isAt()).toBe(true, 'Verify that user is navigated to personal info page when click on Edit link for Primary applicant');
                        perInfo.cancel.click();
                        expect(review.isAt()).toBe(true, 'Verify that User is navigated to review page when click on cancel link in personal info page');

                    });
                    it('Add Dependents and edit', function() {
                        review.back.click();
                        payment.back.click();
                        if (pdescription == 'DHMO') {
                            facilities.back.click();
                        }
                        depInfo.fillDependent('Dependent1', TestData.child);
                        depInfo.fillDependent('Dependent2', TestData.spouse);
                        depInfo.isHandicapped('Dependent1').check();
                        depInfo.next.click();
                        depInfo.continue.click();
                        if (pdescription == 'DHMO') {
                            facilities.selectFacility().then(function(fnamee) {
                                facility1 = fnamee;
                                facilities.next.click();
                            });
                            facilities.selectFacility().then(function(fnamee) {
                                facility2 = fnamee;
                                facilities.next.click();
                            });
                            facilities.selectFacility().then(function(fnamee) {
                                facility3 = fnamee;
                                facilities.next.click();
                            });
                        }
                        payment.fillpayment(TestData);
                        expect(review.isAt()).toBe(true, 'Verify that user is navigated to review page');
                        payment.openApplicant.click();
                        review.dependentsEdit.click();
                        depInfo.month('Dependent1').setText(Utility.getDatePart(TestData.cdate, 'MONTH'));
                        depInfo.date('Dependent1').setText(Utility.getDatePart(TestData.cdate, 'DATE'));
                        depInfo.year('Dependent1').setText(Utility.getDatePart(TestData.cdate, 'YEAR') + '\t');
                        depInfo.update.click();
                        if (pdescription == 'DPPO') {
                            depInfo.continue.click();
                        }
                        if (pdescription == 'DHMO') {
                            facilities.selectFacility().then(function(fnamee) {
                                facility1 = fnamee;
                                facilities.next.click();
                            });
                            facilities.selectFacility().then(function(fnamee) {
                                facility2 = fnamee;
                                facilities.next.click();
                            });
                            facilities.selectFacility().then(function(fnamee) {
                                facility3 = fnamee;
                                facilities.next.click();
                            });
                            payment.fillpayment(TestData);
                        }

                        expect(review.isAt()).toBe(true, 'Verify that user is navigated to review page');
                        payment.openApplicant.click();
                        review.dependentsEdit.click();
                        depInfo.firstname('Dependent1').setText(TestData.firstname2);
                        depInfo.gender('Dependent1').selectByText(TestData.gender2);
                        depInfo.update.click();
                        payment.openApplicant.click();
                        review.dependentsEdit.click();
                        depInfo.cancel.click();
                        expect(review.isAt()).toBe(true, 'Verify that user is navigated to review page');
                        payment.openApplicant.click();
                        review.dependentsEdit.click();
                        depInfo.deleteDependent('Dependent2').click();
                        depInfo.update.click();
                        depInfo.continue.click();
                        review.paymentEdit.click();
                        payment.fillpayment(TestData);
                        // payment.update.click();
                        expect(review.isAt()).toBe(true, 'Verify that user is navigated to review page when user fills payment info');
                        review.paymentEdit.click();
                        payment.cancel.click();
                        expect(review.isAt()).toBe(true, 'Verify that user is navigated to review page when click on cance link in payment page');
                    })
                    if (pdescription == 'DHMO') {
                        it('Add Facilities and Edit ', function() {
                            review.back.click();
                            payment.back.click();
                            browser.sleep(5000)
                            facilities.back.click();
                            browser.sleep(5000)
                            depInfo.fillDependent('Dependent1', TestData.child);
                            depInfo.fillDependent('Dependent2', TestData.spouse);
                            depInfo.isHandicapped('Dependent1').check();
                            depInfo.next.click();
                            depInfo.continue.click();
                            facilities.selectFacility().then(function(fnamee) {
                                facility1 = fnamee;
                                facilities.next.click();

                                facilities.selectFacility().then(function(fnamee) {
                                    facility2 = fnamee;
                                    facilities.next.click();

                                    facilities.selectFacility().then(function(fnamee) {
                                        facility3 = fnamee;
                                        facilities.next.click();
                                    });
                                    payment.fillpayment(TestData);
                                    expect(review.isAt()).toBe(true);
                                    payment.openApplicant.click();
                                    expect(review.primaryFacilityName.getText()).toEqual(facility1.facilityName, 'Verify that Primary Facility is displayed with ' + facility1.facilityName)
                                    review.primaryFacilityChange.click();
                                    expect(facilities.isAt()).toBe(true, 'Verify that user navigated to facilities page when user click on change link for primary facility');
                                    facilities.selectFacility('Kayvan Kafayi DDS');
                                    facilities.update.click();
                                    expect(review.isAt()).toBe(true, 'Verify that user is navigated to review page when click on update button in facility page');
                                    payment.openApplicant.click();
                                    expect(review.primaryFacilityName.getText()).toEqual('Kayvan Kafayi DDS', 'Verify that Primary facility is updated with Kayvan Kafayi DDS');
                                    review.dependentFacilityChange(1).click();
                                    expect(facilities.isAt()).toBe(true, 'Verify that User is navigated to facilities page when click on change link for first dependent');
                                    facilities.selectFacility('Kayvan Kafayi DDS');
                                    facilities.update.click();
                                    expect(review.isAt()).toBe(true, 'Verify that user is navigated to review page when click on update button in facility page');
                                    payment.openApplicant.click();
                                    expect(review.dependentFacilityName(1).getText()).toEqual('Kayvan Kafayi DDS')
                                    review.dependentFacilityChange(2).click();
                                    expect(facilities.isAt()).toBe(true, 'Verify that User is navigated to facilities page when click on change link for secondery dependent');
                                    facilities.cancel.click();
                                    expect(review.isAt()).toBe(true,'Verify that User is navigated to review page when click on cancel link in facilities page');
                                    payment.authChkBox.check();
                                    payment.purchaseNow.click();
                                    expect(browser.getTitle()).toEqual(TestData.receiptPageTitle, 'Verify "Receipt" Page is displayed and the Tilte is Equal as' + TestData.receiptPageTitle);
                                });
                            });
                        });
                    }

                });
            }
        })
    }
})