/*
 * CXINIT-1355 Dependents CTA Back Next
 * This Script Validates the functionality of Next and Back Buttons in dependent page 
 */
var TestData = require('../../testData/' + testDataEnv + '/dhmo/dhmo.1355DepCTA.json');
var perInfo = new (require('../../pageObjects/cxinit/perInfo-page.js'));
var depInfo = new (require('../../pageObjects/cxinit/dependent-page.js'));
var facilities = new (require('../../pageObjects/cxinit/facilities-page.js'));
var payment = new (require('../../pageObjects/cxinit/payment-page.js'));
var receipt = new (require('../../pageObjects/cxinit/receipt-page.js'));
var enrollPage = new (require('../../pageObjects/cxinit/enroll-page.js'));
var statesData = require('../../testData/' + testDataEnv + '/statesAndProducts.json');

//To Navigate Personla Info Page
// dataProvider(TestData.states, function (sData, sdescription) {
dataProvider(statesData.states, function (sData, sdescription) {
    if (states.indexOf(sdescription) != -1) {
        dataProvider(sData.products, function (tData, pdescription) {
            if (product.indexOf(pdescription) != -1) {
                describe('1355 Dependents CTA Back Next: ||State:' + sdescription + '||Product:' + pdescription + '||', function () {
                    beforeAll(function () {
                        console.log(' ');
                        console.log('--- DHMO:1355 Dependents CTA Back Next ---')
                        Utility.openApplication('', tData.product);
                       
                    });
                    beforeEach(function () {
                        jasmine.addMatchers(custommatcher.customMatchers);
                    });
                    // Fill the Enroll page with valid data and verify the navigation
                    it('CTA_1: should complete the Enroll Page', function () {
                        enrollPage.enterHomePageDetails(tData.enrollData);
                        expect(perInfo.fieldFirstName.isPresentAndDisplayed()).toBeTruthy();
                        console.log('CTA1 complete');
                    });

                    //  Fill Personal Infor Page with valid data and verify the navigation
                    it('CTA_2: should fill out Personal Information Page', function () {

                        if (pdescription == 'DHMO' || pdescription == 'DPPO') {
                            TestData.MemberId = false;  
                            TestData.ssn="1234560215",
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
                        console.log('CTA2 complete')
                    });

                    //  Click on "Add dependents" link and click on Next button without filling the data in dependent section
                    //  Verifying the Errors of both client and server side
                    it('CTA_3: should vaildate proper error with no input data', function () {
                        depInfo.fieldAddDependents.click();
                        depInfo.next.click();
                        expect(depInfo.getValidationMessages('Dependent1')).toEqual(TestData.dependentErrors);
                        expect(depInfo.getServerValidationMessages()).toEqual(TestData.dependentErrors);
                        depInfo.premiumAmount.getText().then(function (val) {
                            depPremiumAmount = val;
                        })

                        console.log('CTA3 complete')
                    });

                    //  Fill the dependent with Domestic Partner and verify that Premium Change popup displayed
                    it('CTA_4: should generate a PremChgPop on dep add', function () {
                        depInfo.fillDependent('Dependent1', TestData.domesticPartner, true);
                        depInfo.next.click();
                        expect(depInfo.premiumChangePopUp.isPresentAndDisplayed()).toBeTruthy();
                        console.log('CTA4 complete')
                    });

                    //  Click on "Go Back" link in premium change popup and verify the functionality
                    it('CTA_5: should go back from prem chg pop back button', function () {
                        depInfo.gobackPremiumPopUP.click();
                        expect(browser.getTitle()).toEqual(TestData.dependentPageTitle);
                        console.log('CTA5 complete')
                    });

                    //  Verify the functionality of next button in dependent info page and Continue button in premium change popup
                    it('CTA_6: should continue fwd on prem chg pop next button', function () {
                        depInfo.next.click();
                        depInfo.continue.click();
                        if (pdescription == 'DHMO' || pdescription == 'AHMO') {
                            expect(browser.getTitle()).toEqual(TestData.facilitiesPageTitle);
                            facilities.premiumAmount.getText().then(function (val) {
                                facilitiesPremiumAmount = val;
                            })

                        }
                        if (pdescription == 'DPPO' || pdescription == 'APPO') {
                            expect(browser.getTitle()).toEqual(TestData.paymentPageTitle);
                        }
                        console.log('CTA6 complete')
                    });
                    // Mark -  I'll have to look at the excel sheet, but is this test actually defined ?
                    // Goto dependent page.Add second dependent and filled spouse data 
                    // verify the error message when two dependent have spouse and Domestic Partner
                    it('CTA_7: should go back from facs & should gen erro on 2 spouse', function () {
                        if (pdescription == 'DHMO' || pdescription == 'AHMO') {
                            console.log('facilitiesPremiumAmount' + facilitiesPremiumAmount);
                            facilities.back.click();
                        }
                        if (pdescription == 'DPPO' || pdescription == 'APPO') {
                            payment.back.click();
                        }
                        depInfo.fillDependent('Dependent2', TestData.spouse, false);
                        depInfo.next.click();
                        depInfo.continue.click();
                        expect(browser.getTitle()).toEqual(TestData.dependentPageTitle);
                        expect(depInfo.depError.getText()).toEqual(TestData.depError);
                        console.log('CTA7 complete')
                    });

                    //   Update the second dependent relation with child and proceed
                    it('CTA_8: should cause premChgPop to accept after resolving dependent error', function () {
                        depInfo.relationship('Dependent2').selectByText(TestData.updateRelationship);
                        depInfo.next.click();
                        depInfo.continue.click();
                        if (pdescription == 'DHMO' || pdescription == 'AHMO') {
                            expect(browser.getTitle()).toEqual(TestData.facilitiesPageTitle);
                            facilities.premiumAmount.getText().then(function (val) {
                                facilitiesPremiumAmount2 = val;
                            })
                        }
                        if (pdescription == 'DPPO' || pdescription == 'APPO') {
                            expect(browser.getTitle()).toEqual(TestData.paymentPageTitle);
                        }
                        console.log('CTA8 complete')
                    });

                    // Go back to Personal info page frpm facilities page
                    // Verify that SSN field displayed with blank in personal info page
                    it('CTA_9: SSN field should be displayed with blank', function () {
                        if (pdescription == 'DHMO' || pdescription == 'AHMO') {
                            facilities.back.click();
                        }
                        if (pdescription == 'DPPO' || pdescription == 'APPO') {
                            payment.back.click();
                        }
                        depInfo.back.click();
                        if (pdescription == 'DHMO' || pdescription == 'DPPO') {
                            expect(perInfo.fieldSsn.getAttribute('value')).toEqual('');
                        }
                        console.log('CTA9 complete')
                    });
                    // Click on Next button with out re filling SSN field
                    // Verify the Client and Server side validation message for SSN field 
                    it('CTA_10: Error message should be displayed for SSN field', function () {
                        perInfo.next.click();
                        if (pdescription == 'DHMO' || pdescription == 'DPPO') {
                            expect(perInfo.errMsgSsn.getText()).toEqual(TestData.errorSSN);
                            expect(perInfo.serverErrMsgSsn.getText()).toEqual(TestData.errorSSN);
                        }
                        console.log('CTA10 complete')
                    });

                    // Fill the valid SSN value and verify the functionality of next button
                    // Navigate upto Payment Page
                    // Bug:CXINIT-1392 : Getting "Sorry, we're having technical issues. Please try again." error message in back word flow
                    it('CTA_11:Fill the valid SSN value and verify the functionality of next button', function () {
                        if (pdescription == 'DHMO' || pdescription == 'DPPO') {
                            perInfo.fieldSsn.setText(TestData.SSN);
                        }
                        perInfo.next.click();
                        expect(browser.getTitle()).toEqual(TestData.dependentPageTitle);
                        perInfo.next.click();
                        browser.sleep(5000)
                        if (pdescription == 'DHMO' || pdescription == 'AHMO') {
                        facilities.selectFacility();
                        facilities.next.click();
                        facilities.selectFacility();
                        facilities.next.click();
                        facilities.selectFacility();
                        facilities.next.click();
                        }
                        expect(browser.getTitle()).toEqual(TestData.paymentPageTitle);
                        console.log('CTA11 complete')
                    });
                });

            }
        })
    }
})
