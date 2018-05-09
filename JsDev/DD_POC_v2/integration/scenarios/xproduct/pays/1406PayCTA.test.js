/*
 * CXINIT-1406 Payment CTA Back Next
 * This Script Validates the functionality of Next and Back Buttons in Payment page 
 */
var TestData   = require('../../../testData/' + testDataEnv + '/dhmo/dhmo.1406PayCTA.json');
var perInfo    = new (require('../../../pageObjects/cxinit/perInfo-page.js'));
var depInfo    = new (require('../../../pageObjects/cxinit/dependent-page.js'));
var facilities = new (require('../../../pageObjects/cxinit/facilities-page.js'));
var payment    = new (require('../../../pageObjects/cxinit/payment-page.js'));
var receipt    = new (require('../../../pageObjects/cxinit/receipt-page.js'));
var enrollPage = new (require('../../../pageObjects/cxinit/enroll-page.js'));
var statesData = require('../../../testData/' + testDataEnv + '/statesAndProducts.json');
//To Navigate Personla Info Page
dataProvider(statesData.states, function (sData, sdescription) {
    if (states.indexOf(sdescription) != -1) {
        dataProvider(sData.products, function (tData, pdescription) {
            if (product.indexOf(pdescription) != -1) {

                describe('1406- Payment CTA Back Next: ||State:' + sdescription + '||Product:' + pdescription + '||', function () {
                    // Pre-condition: User navigated to Payment page
                    beforeEach(function () {
                        jasmine.addMatchers(custommatcher.customMatchers);
                        Utility.openApplication('', tData.product);
                        enrollPage.enterHomePageDetails(tData.enrollData);
                        expect(perInfo.fieldFirstName.isPresentAndDisplayed()).toBeTruthy();
                        TestData.firstname = Utility.randomNo('String', 8);
                        TestData.lastname = Utility.randomNo('String', 8);
                        if (pdescription == 'DHMO' || pdescription == 'DPPO') {
                            TestData.MemberId = false;                            
                            var ssn = Utility.randomNo('Number', 8);
                            TestData.ssn = '1' + ssn.toString();                            
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
                        depInfo.next.click();
                        if (pdescription == 'DHMO' || pdescription == 'AHMO') {
                            facilities.selectFacility();
                            facilities.next.click();
                        }
                        expect(browser.getTitle()).toEqual(TestData.paymentPageTitle);

                    });
                    // Verify the functionality of Next button 
                    it('Step-1: Validate and Verify the Errors of both the Client and Server in the Payment Page', function () {
                        payment.billingAddress.click();
                        payment.billingChkBox.unCheck();
                        payment.purchaseNow.click();
                        expect(payment.getCCValidationMessages()).toEqual(TestData.paymentErrors)
                        expect(payment.getBillingAddressValidationMessages()).toEqual(TestData.paymentAddressErrors);
                        expect(payment.getCCServerValidationMessages()).toEqual(TestData.paymentErrors);
                        expect(payment.getBillingAddressServerValidationMessages()).toEqual(TestData.paymentAddressErrors);
                    });
                    it('Step-2:Should be navigate to receipt page', function () {
                        payment.billingChkBox.check();
                        payment.fillpayment(TestData);
                        if (pdescription == 'AHMO' || pdescription == 'APPO') {
                            payment.frequencyAnnualy.select();
                        }
                        payment.purchaseNow.click();
                        expect(browser.getTitle()).toEqual(TestData.receiptPageTitle);
                    });
                    it('Step-3:Should be navigate to receipt page', function () {
                        payment.fillpayment(TestData, true);
                        payment.purchaseNow.click();
                        expect(payment.errAuth.getText()).toEqual(TestData.errorMsgAuth);
                        expect(payment.serErrAuth.getText()).toEqual(TestData.errorMsgAuth);
                        payment.authChkBox.check();
                        if (pdescription == 'AHMO' || pdescription == 'APPO') {
                            payment.frequencyAnnualy.select();
                        }
                        payment.purchaseNow.click();
                        expect(browser.getTitle()).toEqual(TestData.receiptPageTitle);

                    });
                    it('Step-4:Should be navigate to receipt page  ', function () {
                        payment.fillpayment(TestData);
                        payment.cardNumber.setText(TestData.invalidCardNumber);
                        payment.purchaseNow.click();
                        expect(payment.errCardNumber.getText()).toEqual(TestData.errorMsgCard);
                        expect(payment.serErrCardNumber.getText()).toEqual(TestData.errorMsgCard);
                        payment.cardNumber.setText(TestData.cardNumber);
                        payment.authChkBox.check();
                        if (pdescription == 'AHMO' || pdescription == 'APPO') {
                            payment.frequencyAnnualy.select();
                        }
                        payment.purchaseNow.click();
                        expect(browser.getTitle()).toEqual(TestData.receiptPageTitle);
                    });
                    it('Step-5:Should be navigate to facilities page', function () {
                        payment.back.click();
                        if (pdescription == 'AHMO' || pdescription == 'DHMO') {
                            expect(browser.getTitle()).toEqual(TestData.facilitiesPageTitle);
                        }
                        if (pdescription == 'APPO' || pdescription == 'DPPO') {
                            expect(browser.getTitle()).toEqual(TestData.dependentPageTitle);
                        }

                    });
                    it('Step-6:Should be navigate to receipt page', function () {
                        payment.fillpayment(TestData);
                        if (pdescription == 'AHMO' || pdescription == 'APPO') {
                            payment.frequencyAnnualy.select();
                        }
                        payment.purchaseNow.click();
                        expect(browser.getTitle()).toEqual(TestData.receiptPageTitle);
                    });

                });
            }
        })
    }
})
