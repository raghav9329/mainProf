var TestData   = require('../../../testData/' + testDataEnv + '/dhmo/dhmo.1403PayCCExp.json');
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

                describe('1403: Payment Page: State: ||State:' + sdescription + '||Product:' + pdescription + '||', function() {

                    // Pre-condition: User navigated to Payment Page 
                    beforeAll(function() {
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
                        expect(browser.getTitle()).toEqual(TestData.dependentPageTitle, 'Verfiy "Dependent Page" is Displayed and the title is Equal as' + TestData.dependentPageTitle);
                        depInfo.next.click();
                        if (pdescription == 'DHMO' || pdescription == 'AHMO') {
                            // facilities.selectFacility(TestData.facilityoption1);
                            facilities.selectFacility();
                            facilities.next.click();
                        }
                        expect(browser.getTitle()).toEqual(TestData.paymentPageTitle, 'Verify "Payment" page is displayed and the title is Equal as' + TestData.paymentPageTitle);
                        payment.nameOnCard.setText(TestData.nameOnCard);
                        payment.cardNumber.setText(TestData.cardNumber);
                        payment.securityCode.setText(TestData.securityCode);

                    });
                    beforeEach(function() {
                        jasmine.addMatchers(custommatcher.customMatchers);
                    });

                    it('Step-1:Error message should be displayed for year field ', function() {
                        payment.expMonth.setText(TestData.expMonth);
                        payment.expYear.setText(TestData.expYear_invalid1);
                        if (pdescription == 'DHMO' || pdescription == 'DPPO') {
                            payment.next.click();
                        }

                        if (pdescription == 'AHMO' || pdescription == 'APPO') {
                            payment.frequencyAnnualy.select();

                            payment.authChkBox.check();
                            payment.purchaseNow.click();
                        }

                        expect(payment.serErrExpYear.getText()).toEqual(TestData.yearErrorMsg, 'Verify the Year field "Client Validation" Error Message as: ' + TestData.yearErrorMsg);
                        expect(payment.errExpYear.getText()).toEqual(TestData.yearErrorMsg, 'Verify the Year field "Server Validation" Error Message as: ' + TestData.yearErrorMsg);
                        Utility.scrollToTop();
                        payment.serErrExpYear.click();

                    });

                    it('Step-2:Client side error message should be displayed for month filed', function() {
                        payment.expMonth.setText(TestData.invalidExpMonth);
                        payment.expYear.click();
                        expect(payment.errExpMonth.getText()).toEqual(TestData.monthErrorMsg, 'Verify the Error Message for Month field under Payment is same as: ' + TestData.monthErrorMsg);
                    });
                    it('Step-3:invalid year format error message should be displayed for month filed', function() {
                        payment.expMonth.setText(TestData.invalidMonthFormat + '\t');
                        expect(payment.errExpMonth.getText()).toEqual(TestData.invalidMonthFormatErrMsg, 'Verify the field Month Format Error message is same as: ' + TestData.invalidMonthFormatErrMsg);
                    });

                    it('Step-4:Client side error message should be displayed for year filed', function() {
                        payment.expYear.setText(TestData.expYear_invalid1 + '\t');
                        expect(payment.errExpYear.getText()).toEqual(TestData.yearErrorMsg, 'Verify the Error Message for the Year field under Payment is same as: ' + TestData.yearErrorMsg);
                    });
                    it('Step-5:invalid year format error message should be displayed for year filed', function() {
                        payment.expYear.setText(TestData.invalidYearFormat + '\t');
                        expect(payment.errExpYear.getText()).toEqual(TestData.invalidYearFormatErrMsg, 'Verify the field Year Format Error message is same as: ' + TestData.invalidYearFormatErrMsg);
                    });

                    it('Step-6:Receipt page should be displayed', function() {
                        payment.expMonth.setText(TestData.expMonth);
                        payment.expYear.setText(TestData.expYear_valid);
                        if (pdescription == 'DHMO' || pdescription == 'DPPO') {
                            payment.next.click();
                        }

                        if (pdescription == 'AHMO' || pdescription == 'APPO') {
                            payment.frequencyAnnualy.select();
                        }
                        payment.authChkBox.check();
                        payment.purchaseNow.click();
                        expect(browser.getTitle()).toEqual(TestData.receiptPageTitle, 'Verify "Receipt" Page is displayed and the Tilte is Equal as' + TestData.receiptPageTitle);

                    });
                });
            }
        })
    }
})