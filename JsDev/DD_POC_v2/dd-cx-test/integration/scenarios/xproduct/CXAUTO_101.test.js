const XlsxPopulate = require('xlsx-populate');
var TestData = require('../../testData/' + testDataEnv + '/dhmo/CXAUTO_101.test.json');
var perInfo = new(require('../../pageObjects/cxinit/perInfo-page.js'));
var depInfo = new(require('../../pageObjects/cxinit/dependent-page.js'));
var facilities = new(require('../../pageObjects/cxinit/facilities-page.js'));
var payment = new(require('../../pageObjects/cxinit/payment-page.js'));
var receipt = new(require('../../pageObjects/cxinit/receipt-page.js'));
var enrollPage = new(require('../../pageObjects/cxinit/enroll-page.js'));
var statesData = require('../../testData/' + testDataEnv + '/statesAndProducts.json');

//Reading a Single Cell from Excel
// XlsxPopulate.fromFileAsync("c:/DD_Repos/dd-cx-test/integration/testData/Direct_Buying_Content.xlsx")
// var workbook, workSheet;
dataProvider(statesData.states, function(sData, sdescription) {
    if (states.indexOf(sdescription) != -1) {
        dataProvider(sData.products, function(tData, pdescription) {
            if (product.indexOf(pdescription) != -1) {
                describe('CXAUTO_101:- Payment Page: CVV Security Code: ||State:' + sdescription + '||Product:' + pdescription + '||', function() {
                    // Pre-condition: User navigated to Payments Page
                    var workbook;
                     var cellReference = "";
                            var cellValue = "";
                            var workSheet="";
                    // beforeAll(function() {

                    //     XlsxPopulate.fromFileAsync("./integration/testData/Direct_Buying_Content.xlsx").then(workbookobj => {
                    //         // Modify the workbook. 
                    //         workbook = workbookobj;
                    //         // var cellReference = "";
                    //         // var cellValue = "";

                    //         cellReference = "A1";
                    //         workSheet = "Facility Note";
                    //         // console.log(workbook);
                    //         // console.log();
                    //         // console.log("Tab: " + workSheet);
                    //         // console.log("Cell " + cellReference);
                    //         // console.log();
                    //         // //Fraud_Statement = workbook.sheet(workSheet).cell(cellReference).value();
                    //         cellValue = workbook.sheet(workSheet).cell(cellReference).value();
                    //         // //console.log(Fraud_Statement);
                    //         // console.log(cellValue);
                    //            console.log("=================" + workbook.sheet("Max Age Disability").cell("B2").value())
                    //     })
                    // })
                    beforeEach(function() {
                        jasmine.addMatchers(custommatcher.customMatchers);

                    });

                    //Validate Server side error and Re-enter tne valid Cvv and Verify
it('',function(){
         XlsxPopulate.fromFileAsync("./integration/testData/Direct_Buying_Content.xlsx").then(workbookobj => {
                            // Modify the workbook. 
                            workbook = workbookobj;
                            // var cellReference = "";
                            // var cellValue = "";

                            cellReference = "A1";
                            workSheet = "Facility Note";
                            // console.log(workbook);
                            // console.log();
                            // console.log("Tab: " + workSheet);
                            // console.log("Cell " + cellReference);
                            // console.log();
                            // //Fraud_Statement = workbook.sheet(workSheet).cell(cellReference).value();
                            cellValue = workbook.sheet(workSheet).cell(cellReference).value();
                            // //console.log(Fraud_Statement);
                            // console.log(cellValue);
                               console.log("=================" + workbook.sheet("Max Age Disability").cell("B2").value())
                        })
})
                    it('Validate CVV for AmexCard', function() {
                          XlsxPopulate.fromFileAsync("./integration/testData/Direct_Buying_Content.xlsx").then(workbook => {
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
                        depInfo.fillDependent('Dependent1', TestData.child, false);
                        depInfo.next.click();
                        expect(depInfo.depChildmaxageerror.getText()).toEqual(workbook.sheet("Max Age Disability").cell("B2").value());
                        expect(depInfo.premiumChangePopUp.isPresentAndDisplayed()).toBeTruthy();
                        //Verifying the Text displayed on the Pop-up is equal with the Excel data
                        expect(depInfo.depPremiumChangepopupTxt.getText()).toEqual(workbook.sheet("Dependents Premium Change").cell("A1").value());
                        depInfo.continue.click();
                        if (pdescription == 'DHMO' || pdescription == 'AHMO') {
                            //verifying the Text displayed on the facility page is equal with the Excel data
                            expect(facilities.facilitySelectiontext.getText()).toEqual(cellValue);
                            facilities.selectFacility();
                            facilities.next.click();
                            //verifying the Text displayed on the facility page is equal with the Excel data
                            expect(facilities.facilitySelectiontext.getText()).toEqual(cellValue);
                            facilities.selectFacility();
                            facilities.next.click();
                        }
                        expect(browser.getTitle()).toEqual(TestData.paymentPageTitle);

                        payment.nameOnCard.setText(TestData.cardAmexCvv.cardholderName);
                        payment.cardNumber.setText(TestData.cardAmexCvv.cardNo);
                        payment.expMonth.setText(TestData.cardAmexCvv.expMonth);
                        payment.expYear.setText(TestData.cardAmexCvv.expiryYear);
                        payment.securityCode.setText(TestData.cardAmexCvv.cvv);
                        payment.authChkBox.check();
                        if (pdescription == 'AHMO' || pdescription == 'APPO') {
                            payment.frequencyAnnualy.select();
                        }
                        payment.purchaseNow.click();
                        expect(payment.serErrCvv.getText()).toEqual(TestData.cardAmexCvv.errMsg);

                        //Verifying the American Express Card with valid CVV
                        payment.securityCode.setText(TestData.cardAmexCvv.validcvv);
                        payment.authChkBox.check();
                        payment.purchaseNow.click();
                        expect(browser.getTitle()).toEqual(TestData.receiptPageTitle);
      });
                    });


                    //Validate Server side error and Re-enter the valid Cvv and Verify

                    // xit('Validate CVV for VISA Card', function() {

                    //     payment.nameOnCard.setText(TestData.cardVisaCvv.cardholderName);
                    //     payment.cardNumber.setText(TestData.cardVisaCvv.cardNo);
                    //     payment.expMonth.setText(TestData.cardVisaCvv.expMonth);
                    //     payment.expYear.setText(TestData.cardVisaCvv.expiryYear);
                    //     payment.securityCode.setText(TestData.cardVisaCvv.cvv);
                    //     if (pdescription == 'AHMO' || pdescription == 'APPO') {
                    //         payment.frequencyAnnualy.select();
                    //     }
                    //     payment.authChkBox.check();
                    //     payment.purchaseNow.click();
                    //     expect(payment.serErrCvv.getText()).toEqual(TestData.cardVisaCvv.errMsg);

                    //     //Verifying the Visa Card with valid CVV
                    //     payment.securityCode.setText(TestData.cardVisaCvv.validcvv);
                    //     payment.authChkBox.check();
                    //     payment.purchaseNow.click();
                    //     expect(browser.getTitle()).toEqual(TestData.receiptPageTitle);

                    // });

                    //Validate the client side Error of CVV and verify with the valid too

                    // xit('Validate CVV of the Card', function() {

                    //     payment.nameOnCard.setText(TestData.verifyCvv.cardholderName);
                    //     payment.cardNumber.setText(TestData.verifyCvv.cardNo);
                    //     payment.expMonth.setText(TestData.verifyCvv.expMonth);
                    //     payment.expYear.setText(TestData.verifyCvv.expiryYear);
                    //     payment.securityCode.setText(TestData.verifyCvv.cvv);
                    //     if (pdescription == 'AHMO' || pdescription == 'APPO') {
                    //         payment.frequencyAnnualy.select();
                    //     }
                    //     payment.authChkBox.check();
                    //     payment.purchaseNow.click();
                    //     expect(payment.serErrSecurityCode.getText()).toEqual(TestData.verifyCvv.errMsg);

                    //     //Verifying the Card with valid CVV
                    //     payment.securityCode.setText(TestData.verifyCvv.validcvv);
                    //     payment.authChkBox.check();
                    //     payment.purchaseNow.click();
                    //     expect(browser.getTitle()).toEqual(TestData.receiptPageTitle);

                    // });

                });
            }
        })
    }


});

// Writing a single cell to Excel
/*XlsxPopulate.fromFileAsync('../../testData/Direct_Buying_Content.xlsx').then(workbook => {
Modify the workbook. 
       workbook.sheet("Zip Code Text").cell("A2").value("Writing into Excel Cell");
       return workbook.toFileAsync("../../testData/Direct_Buying_Content.xlsx");      
});*/
