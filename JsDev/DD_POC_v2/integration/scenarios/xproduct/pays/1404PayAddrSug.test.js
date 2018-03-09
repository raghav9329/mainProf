//CXINIT-1404 : Billing Address Suggestion
// This Spec is used to verify and Validate the Address in the Payment Page

var TestData = require('../../../testData/' + testDataEnv + '/dhmo/dhmo.1404PayAddrSug.json');
var perInfo = new(require('../../../pageObjects/cxinit/perInfo-page.js'));
var depInfo = new(require('../../../pageObjects/cxinit/dependent-page.js'));
var facilities = new(require('../../../pageObjects/cxinit/facilities-page.js'));
var payment = new(require('../../../pageObjects/cxinit/payment-page.js'));
var receipt = new(require('../../../pageObjects/cxinit/receipt-page.js'));
var enrollPage = new(require('../../../pageObjects/cxinit/enroll-page.js'));
var statesData = require('../../../testData/' + testDataEnv + '/statesAndProducts.json');

//To Navigate Personla Info Page
dataProvider(statesData.states, function (sData, sdescription) {

    if (states.indexOf(sdescription) != -1) {
        dataProvider(sData.products, function(tData, pdescription) {
            if (product.indexOf(pdescription) != -1) {


                describe('1404- Payment Page: Billing Address Suggestion: ||State:' + sdescription + '||Product:' + pdescription + '||', function () {
                    // Pre-condition: User navigated to Payment Page
                    beforeEach(function() {
                        jasmine.addMatchers(custommatcher.customMatchers);
                        Utility.openApplication('', tData.product);
                        enrollPage.enterHomePageDetails(tData.enrollData);
                        expect(perInfo.fieldFirstName.isPresentAndDisplayed()).toBeTruthy();
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
                        depInfo.next.click();
                        if (pdescription == 'DHMO' || pdescription == 'AHMO') {
                        facilities.selectFacility();
                        facilities.next.click();
                        }
                        expect(browser.getTitle()).toEqual(TestData.paymentPageTitle);
                        payment.nameOnCard.setText(TestData.nameOnCard);
                        payment.cardNumber.setText(TestData.cardNumber);
                        payment.expMonth.setText(TestData.expMonth);
                        payment.expYear.setText(TestData.expYear);
                        payment.securityCode.setText(TestData.securityCode);

                    });

                    //Validate Error by clicking on the Purchase Button of the Product in the Payment

                    it('Step-1: Validate the Billing Address in the Payment page', function() {

                        payment.billingChkBox.unCheck();
                        payment.streetAddress.setText(TestData.billaddr1);
                        payment.selectHomeAddress(TestData.billingAddress);
                        payment.streetAddress.setText(TestData.Appartment, true);
                        // payment.streetAddress.setText(TestData.billingAddress);
                        // payment.city.setText(TestData.billingCity);
                        // payment.state.setText(TestData.State);
                        // expect(payment.state.getValue()).toEqual('CA');
                        // perInfo.fillAddress(TestData.billingAddress);
                        // payment.purchaseNow.click();
                        payment.authChkBox.check();
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
