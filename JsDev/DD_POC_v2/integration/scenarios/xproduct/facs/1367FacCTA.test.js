/*
 * CXINIT-1367 Facilities CTA Back Next
 * This Script Validates the functionality of Next and Back Buttons in Facilities page 
 */
var TestData = require('../../../testData/' + testDataEnv + '/dhmo/dhmo.1367FacCTA.json');
var perInfo = new(require('../../../pageObjects/cxinit/perInfo-page.js'));
var depInfo = new(require('../../../pageObjects/cxinit/dependent-page.js'));
var facilities = new(require('../../../pageObjects/cxinit/facilities-page.js'));
var payment = new(require('../../../pageObjects/cxinit/payment-page.js'));
var receipt = new(require('../../../pageObjects/cxinit/receipt-page.js'));
var enrollPage = new(require('../../../pageObjects/cxinit/enroll-page.js'));
var statesData = require('../../../testData/' + testDataEnv + '/statesAndProducts.json');

//To Navigate Personla Info Page
dataProvider(statesData.states, function(sData, sdescription) {
    if (states.indexOf(sdescription) != -1) {
        dataProvider(sData.products, function(tData, pdescription) {
            if (product.indexOf(pdescription) != -1) {

                describe('1367 Facilities CTA Back Next: State: ||State:' + sdescription + '||Product:' + pdescription + '||', function() {
                    // Pre-condition: User navigated to Dependents page
                    beforeEach(function() {
                        jasmine.addMatchers(custommatcher.customMatchers);
                        Utility.openApplication('', tData.product);
                        enrollPage.enterHomePageDetails(tData.enrollData);
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
                        expect(browser.getTitle()).toEqual(TestData.dependentPageTitle);

                    });
                    // Add one dependent and navigate to facilities page
                    // Verify the functionality of Next button 
                    it('Step-1:Should be navigate to Payment page', function() {
                        depInfo.fillDependent('Dependent1', TestData.domesticPartner, false);
                        depInfo.next.click();
                        depInfo.newAdditionalPrice.getText().then(function(dep1Price) {
                            depInfo.continue.click();
                            if (pdescription == 'DHMO' || pdescription == 'AHMO') {
                                expect(browser.getTitle()).toEqual(TestData.facilitiesPageTitle);
                                facilities.premiumAmount.getText().then(function(premium) {
                                    expect(premium.substring(1)).toEqual(dep1Price);
                                    // facilities.selectFacility(TestData.facilityoption1);
                                    facilities.selectFacility();
                                    facilities.next.click();
                                    // facilities.selectFacility(TestData.facilityoption2);
                                    facilities.selectFacility();
                                    facilities.next.click();
                                    expect(browser.getTitle()).toEqual(TestData.paymentPageTitle);
                                });
                            }
                            if (pdescription == 'DPPO' || pdescription == 'APPO') {
                                expect(browser.getTitle()).toEqual(TestData.paymentPageTitle);
                                // payment.back.click();
                            }


                        });
                    });
                    // Verify the functionality of Next button with out selecting dependent
                    it('Step-2:Should be navigate to Payment page', function() {
                        depInfo.next.click();
                        Utility.scrollToBottom();
                        if (pdescription == 'DHMO' || pdescription == 'AHMO') {
                            facilities.next.click();
                            expect(facilities.validationMessage.getText()).toEqual(TestData.errorFacility);
                            if (pdescription == 'DHMO' || pdescription == 'AHMO') {
                                // facilities.selectFacility(TestData.facilityoption1);
                                facilities.selectFacility();
                                facilities.next.click();
                            }
                            expect(browser.getTitle()).toEqual(TestData.paymentPageTitle);
                        }

                        if (pdescription == 'DPPO' || pdescription == 'APPO') {
                            expect(browser.getTitle()).toEqual(TestData.paymentPageTitle);
                            // payment.back.click();
                        }

                    });
                    // Verify the functionality of Back link in fecilities page
                    it('Step-3:Should be navigate to dependent page', function() {
                        depInfo.fillDependent('Dependent1', TestData.domesticPartner, false);
                        depInfo.next.click();
                        depInfo.newAdditionalPrice.getText().then(function(dep1Price) {
                            depInfo.continue.click();

                            if (pdescription == 'DHMO' || pdescription == 'AHMO') {
                                expect(browser.getTitle()).toEqual(TestData.facilitiesPageTitle);
                                facilities.premiumAmount.getText().then(function(premium) {
                                    expect(premium.substring(1)).toEqual(dep1Price);
                                    // facilities.selectFacility(TestData.facilityoption1);
                                    facilities.selectFacility().then(function(facility) {
                                        facilities.next.click();
                                        facilities.back.click();
                                        if (testDataEnv == 'dit') {
                                            expect(facilities.RecentSelectedFacility.getText()).toEqual(TestData.facilityoption);
                                        } else {
                                            expect(facilities.RecentSelectedFacility.getText()).toEqual(facility.facilityName);
                                        }
                                        facilities.back.click();
                                        expect(browser.getTitle()).toEqual(TestData.dependentPageTitle);
                                    });
                                });
                            }
                            if (pdescription == 'DPPO' || pdescription == 'APPO') {
                                expect(browser.getTitle()).toEqual(TestData.paymentPageTitle);
                                payment.back.click();
                                expect(browser.getTitle()).toEqual(TestData.dependentPageTitle);
                            }
                        });
                    });
                    // Verify the functionality of Back link in fecilities page and payment page
                    it('Step-4:Should be navigate to dependent page', function() {
                        depInfo.fillDependent('Dependent1', TestData.domesticPartner, false);
                        depInfo.next.click();
                        depInfo.newAdditionalPrice.getText().then(function(dep1Price) {
                            depInfo.continue.click();
                            if (pdescription == 'DHMO' || pdescription == 'AHMO') {
                                expect(browser.getTitle()).toEqual(TestData.facilitiesPageTitle);
                                facilities.premiumAmount.getText().then(function(premium) {
                                    expect(premium.substring(1)).toEqual(dep1Price);
                                    // facilities.selectFacility(TestData.facilityoption1);

                                    facilities.selectFacility().then(function(facility) {
                                        facilities.next.click();
                                        // facilities.selectFacility(TestData.facilityoption2);
                                        facilities.selectFacility();
                                        facilities.next.click();
                                        expect(browser.getTitle()).toEqual(TestData.paymentPageTitle);
                                        Utility.scrollToBottom();
                                        payment.back.click();
                                        facilities.back.click();
                                        if (testDataEnv == 'dit') {
                                            expect(facilities.RecentSelectedFacility.getText()).toEqual(TestData.facilityoption);
                                        } else {
                                            expect(facilities.RecentSelectedFacility.getText()).toEqual(facility.facilityName);
                                        }
                                        facilities.back.click()
                                        expect(browser.getTitle()).toEqual(TestData.dependentPageTitle);
                                    });
                                })
                            }
                            if (pdescription == 'DPPO' || pdescription == 'APPO') {
                                expect(browser.getTitle()).toEqual(TestData.paymentPageTitle);
                                payment.back.click();
                                expect(browser.getTitle()).toEqual(TestData.dependentPageTitle);
                            }
                        });
                    });
                });
            }
        })
    }
})