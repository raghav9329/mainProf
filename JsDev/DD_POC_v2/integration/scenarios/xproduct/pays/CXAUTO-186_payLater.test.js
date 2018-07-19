//CXAUTO-186- PayLater Functionality

var TestData   = require('../../../testData/' + testDataEnv + '/dhmo/CXAUTO-186_payLater.json');
var perInfo    = new(require('../../../pageObjects/cxinit/perInfo-page.js'));
var depInfo    = new(require('../../../pageObjects/cxinit/dependent-page.js'));
var facilities = new(require('../../../pageObjects/cxinit/facilities-page.js'));
var payment    = new(require('../../../pageObjects/cxinit/payment-page.js'));
var receipt    = new(require('../../../pageObjects/cxinit/receipt-page.js'));
var enrollPage = new(require('../../../pageObjects/cxinit/enroll-page.js'));
var statesData = require('../../../testData/' + testDataEnv + '/statesAndProducts.json');
var product    = ['DPPO'];
 states     = ["MD"];

//To Navigate Personla Info Page
dataProvider(statesData.states, function(sData, sdescription) {
    if (states.indexOf(sdescription) != -1) {
        dataProvider(sData.products, function(tData, pdescription) {
            if (product.indexOf(pdescription) != -1) {
                describe('CXAUTO-186: new Test Script to test MD Pay Later Option ||State:' + sdescription + '||Product:' + pdescription + '||', function() {
                    // Pre-condition: User navigated to Payments Page
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
                        perInfo.phoneNumberemail(TestData);
                        if (pdescription == 'DHMO' || pdescription == 'DPPO') {
                            perInfo.fillBroker(TestData);
                        }
                        if (pdescription == 'AHMO' || pdescription == 'APPO') {
                            perInfo.referralSource.selectByText(TestData.referralSource);
                            perInfo.next.click();
                        }
                        expect(browser.getTitle()).toEqual(TestData.dependentPageTitle,'Verfiy "Dependent Page" is Displayed and the title is Equal as' +TestData.dependentPageTitle);
                        depInfo.fillDependent('Dependent1', TestData.spouse, false);
                        depInfo.next.click();
                        expect(depInfo.premiumChangePopUp.isPresentAndDisplayed()).toBeTruthy('Verify the premiumChangePopUp is Displayed and Present');
                        depInfo.continue.click();
                        if (pdescription == 'DHMO' || pdescription == 'AHMO') {
                            facilities.selectFacility();
                            facilities.next.click();
                            facilities.selectFacility();
                            facilities.next.click();
                        }
                        expect(browser.getTitle()).toEqual(TestData.paymentPageTitle,'Verify "Payment" page is displayed and the title is Equal as' +TestData.paymentPageTitle);

                    });

                    //Verify Paylater Field is avialble and could able to proceed after selecting it
                    it('Validate that the PayLater field is selected', function() {
                        /* if (pdescription == 'DPPO') {*/

                        expect(payment.payLater.isPresentAndDisplayed()).toBeTruthy('Veriy the PayLater Option is Dispayed and Present');
                        expect(payment.payNow.isPresentAndDisplayed()).toBeTruthy('Verify the Pay Now Option is Displayed and Present');
                        expect(payment.paymentLaterHeading.isPresentAndDisplayed()).toBeTruthy('Verify the Pay Later Heading is Displayed and Present');
                        payment.payLater.select();
                      
                          payment.billingAddress.click();
                            browser.sleep(8000)
                        expect(payment.paymentLater.isPresentAndDisplayed()).toBeTruthy('Verfiy Payment Later Option is Displayed and Present');
                            expect(payment.EFTBankTransfer.isPresentAndDisplayed()).toBe(false, 'Verify the EFT Bank Transfer field is NOT Present' +payment.EFTBankTransfer);
                        expect(payment.nameOnCard.isPresentAndDisplayed()).toBe(false, 'Verify Name on the Card field is NOT Present' +payment.nameOnCard);
                        expect(payment.cardNumber.isPresentAndDisplayed()).toBe(false, 'Verify Card Number field is NOT Present' +payment.cardNumber);;
                        expect(payment.saveAddress.isPresentAndDisplayed()).toBeTruthy('Verify Save Address Field is Displayed and Present');
                        expect(payment.paymentLater.getText().then(function(payltrTxt) {
                            expect(payltrTxt.replace(/\r?\n|\r/g, " ")).toContain(TestData.paylatertext, 'Verify Pay Later Text is same as: ' +TestData.paylatertext);
                        }));

                        expect(payment.purchaseNow.isPresentAndDisplayed()).toBeTruthy('Verify the Purchase Now Button is Displayed and Present');
                        payment.purchaseNow.click();

                        expect(payment.authChkBox.isPresentAndDisplayed()).toBeTruthy('Verify the Authenticate Check box is Displayed and Present');
                        payment.authChkBox.check();
                        payment.purchaseNow.click();
                        expect(browser.getTitle()).toEqual(TestData.receiptPageTitle, 'Verify "Receipt" Page is displayed and the Tilte is Equal as' +TestData.receiptPageTitle);
                        /*if(pdescription == 'DPPO'){*/
                        expect(receipt.payLaterConfirmationTxt.getText().then(function(receiptpayltrTxt) {
                            expect(receiptpayltrTxt.replace(/\r?\n|\r/g, "")).toEqual(TestData.receiptpaylaterTxt, 'Verify Pay Later Text in Receipt Page is same as: ' +TestData.receiptpaylaterTxt);
                        }));
                        /*}
                        else{*/
                        receipt.applicants.click();
                        // }


                    });

                });
            }
        })
    }
})
