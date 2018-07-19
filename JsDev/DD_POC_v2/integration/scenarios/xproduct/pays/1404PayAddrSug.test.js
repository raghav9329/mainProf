//CXINIT-1404 : Billing Address Suggestion
// This Spec is used to verify and Validate the Address in the Payment Page

var TestData   = require('../../../testData/' + testDataEnv + '/dhmo/dhmo.1404PayAddrSug.json');
var perInfo    = new(require('../../../pageObjects/cxinit/perInfo-page.js'));
var depInfo    = new(require('../../../pageObjects/cxinit/dependent-page.js'));
var facilities = new(require('../../../pageObjects/cxinit/facilities-page.js'));
var payment    = new(require('../../../pageObjects/cxinit/payment-page.js'));
var receipt    = new(require('../../../pageObjects/cxinit/receipt-page.js'));
var enrollPage = new(require('../../../pageObjects/cxinit/enroll-page.js'));
var statesData = require('../../../testData/' + testDataEnv + '/statesAndProducts.json');

//To Navigate Personla Info Page
dataProvider(statesData.states, function(sData, sdescription) {

    if (states.indexOf(sdescription) != -1) {
        dataProvider(sData.products, function(tData, pdescription) {
            if (product.indexOf(pdescription) != -1) {


                describe('1404- Payment Page: Billing Address Suggestion: ||State:' + sdescription + '||Product:' + pdescription + '||', function() {
                    // Pre-condition: User navigated to Payment Page
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
                        if (pdescription == 'AHMO' || pdescription == 'APPO') {
                            TestData.MemberId = Utility.randomNo('Number', 10);
                            TestData.ssn = false;
                            TestData.alternateid = false;
                        }
                        perInfo.fillPersonalInfo(TestData);
                        perInfo.fillAddress(tData);
                        perInfo.fillMailingAddress(TestData);
                        perInfo.phoneNumberemail(TestData);
                        if (pdescription == 'DHMO' || pdescription == 'DPPO') {
                            perInfo.fillBroker(TestData);
                        }
                        if (pdescription == 'AHMO' || pdescription == 'APPO') {
                            perInfo.referralSource.selectByText(TestData.referralSource);
                            perInfo.next.click();
                        }
                        expect(browser.getTitle()).toEqual(TestData.dependentPageTitle,'Verfiy "Dependent Page" is Displayed and the title is Equal as' +TestData.dependentPageTitle);
                        depInfo.next.click();
                        if (pdescription == 'DHMO' || pdescription == 'AHMO') {
                            facilities.selectFacility();
                            facilities.next.click();
                        }
                        expect(browser.getTitle()).toEqual(TestData.paymentPageTitle,'Verify "Payment" page is displayed and the title is Equal as' +TestData.paymentPageTitle);
                        payment.nameOnCard.setText(TestData.nameOnCard);
                        payment.cardNumber.setText(TestData.cardNumber);
                        payment.expMonth.setText(TestData.expMonth);
                        payment.expYear.setText(TestData.expYear);
                        payment.securityCode.setText(TestData.securityCode);

                    });

                    //Validate Error by clicking on the Purchase Button of the Product in the Payment

                    it('Step-1: Validate the Billing Address in the Payment page', function() {

                        payment.billingAddress.click();
                        payment.billingChkBox.unCheck();
                        payment.streetAddress.setText("");
                        payment.city.setText("");
                        payment.state.setText("");
                        payment.zipCode.setText("");


                        payment.streetAddress.setText(TestData.billaddr1);
                        payment.selectHomeAddress(TestData.billingAddress);
                        payment.streetAddress.setText(TestData.Appartment, true);
                        if (sdescription == 'VI') {
                            // payment.city.setText(TestData.billingCity);
                            // payment.state.setText(TestData.billingState);
                            // payment.zipCode.setText(TestData.billingZip);
                            expect(payment.errStreetAddress.getText()).toEqual(TestData.ErrorMessage, 'Verify the "Street Address" under "Billing" field Error Messages displayed is same as: ' +TestData.ErrorMessage);

                        } else {
                            expect(payment.errStreetAddress.getText()).toEqual(TestData.ErrorMsg, 'Verify the "Street Address" under "Billing" field Error Messages displayed is same as: ' +TestData.ErrorMsg);
                        }
                        payment.city.setText(TestData.billingCity);
                        payment.state.setText(TestData.billingState);
                        payment.zipCode.setText(TestData.billingZip);
                        if (pdescription == 'DHMO' || pdescription == 'DPPO') {
                            payment.next.click();
                        }
                        payment.authChkBox.check();
                        if (pdescription == 'AHMO' || pdescription == 'APPO') {
                            payment.frequencyAnnualy.select();
                        }
                        payment.purchaseNow.click();
                        browser.sleep(2000);
                        expect(browser.getTitle()).toEqual(TestData.receiptPageTitle, 'Verify "Receipt" Page is displayed and the Tilte is Equal as' +TestData.receiptPageTitle);


                    });

                  it('Step-2: Validate the Billing Address is same as the mailing address', function() {
                        payment.billingAddress.click();
                        // payment.billingChkBox.unCheck();
                        expect(payment.billingStreetaddressTxt.getText()).toEqual(TestData.fieldMailAddr, 'Verify the "Street Address" under "Mailing" field Error Messages displayed is same as: ' +TestData.fieldMailAddr);
                        expect(payment.billingLocalityTxt.getText()).toEqual(TestData.fieldMailCity + ', ' + TestData.fieldMailState + ' ' + TestData.fieldMailZipCode);

                    });
                });
            }
        })
    }
})