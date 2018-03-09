const XlsxPopulate = require('xlsx-populate');
var TestData = require('../../testData/' + testDataEnv + '/dhmo/CXAUTO_101-PPO.test.json');
var perInfo = new(require('../../pageObjects/cxinit/perInfo-page.js'));
var depInfo = new(require('../../pageObjects/cxinit/dependent-page.js'));
var facilities = new(require('../../pageObjects/cxinit/facilities-page.js'));
var payment = new(require('../../pageObjects/cxinit/payment-page.js'));
var receipt = new(require('../../pageObjects/cxinit/receipt-page.js'));
var enrollPage = new(require('../../pageObjects/cxinit/enroll-page.js'));
var statesData = require('../../testData/' + testDataEnv + '/statesAndProducts.json');
var mailtxt;

describe('Verify Excel Data__ PersInfoPg: for state -', function() {

    beforeAll(function() {
        console.log(' ');
        Utility.openApplication('', 'DELTA');
    });

    beforeEach(function() {
        jasmine.addMatchers(custommatcher.customMatchers);
    });

    afterAll(function() {
        //browser.quit();
    });

    beforeEach(function() {
        // browser.refresh();
        // using Jquery we are facing the issue because jquery is not integrated with the application inorder to overcome this we have developed waitUntilPageLoaded in common.js
        Utility.waitUntilPageLoaded();
    });

    var mailTxtWrkSheet = "Electronic Pref.";
    var mailTxtCell = "A3";
    var maxDepAgeSheet = "Max Age Disability";
    var maxDepAgeCell = "B2"
    var premPopSheet = "Dependents Premium Change";
    var premPopCell = "A1"
    var footDisclaimSheet = "Footer Text";

    var footDisclaimCell = "B3"
    var footCopyrightSheet = "Footer Text";
    var footCopyrightCell = "B4"
    var buyContactNumSheet = "Buying Contact Number";
    var buyContactNumCell = "A1"
    var shopContactNumSheet = "Shopping Contact Number";
    var shopContactNumCell = "A1"
    var facNoteSheet = "Facility Note";
    var facilityCell = "A1"
    var recurrPaySheet = "Recurring Payments Consent"; //Save my payment information for future payments.
    var recurrPayCell = "A1"

    var authSheet = "Authorize Consent"; //I have read and agree to the Authorization statement.
    var authCell = "A1"
    var discloseFormSheet = "Disclosure Form Text"; //I have downloaded and printed a copy of the <a target="_new" href="/enroll/downloads/CAA55 Disclosure Form and Contract.pdf">Disclosure Form/Contract</a> .
    var discloseFormCell = "A4"
    var discloseForm2Sheet = "Disclosure Form Text 2"; //I would like to have a copy mailed to the address I entered on this form.
    var discloseForm2Cell = "A1"
    var recurrPayAgrmtSheet = "Recurring Payments Agreement";
    //var recurrPayAgrmtCell = "B2"
    var recurrPayAgrmtCell = "B4"
    var chrgAgremtNoteSheet = "Charges Agreement Note";
    var chrgAgremtNoteCell = "A1"
    var payDeadlineSheet = "Payment Deadline";
    var payDeadlineCell = "A1"
    var medReleaseSheet = "Medical Release";
    var medReleaseCell = "B2"
    var enrollFeeSheet = "Enrollment Fee";
    var enrollFeeCell = "A1"
    var expnsRatioSheet = "Expense ratio";
    var expnsRatioCell = "A2"
    var summaryofBenefitSheet = 'Summary of Benefits';
    var summaryBenefitCell = 'A1'


    it('Verify Excel_1:should be able to open Login page and verify', function() {
        XlsxPopulate.fromFileAsync("./integration/testData/Direct_Buying_Content.xlsx").then(workbook => {
            //Loading the Excel related data to the respective variables with each Sheet and content
            mailtxt_cell = workbook.sheet(mailTxtWrkSheet).cell(mailTxtCell).value();
            maxDepAge_cell = workbook.sheet(maxDepAgeSheet).cell(maxDepAgeCell).value();
            premiumpop_cell = workbook.sheet(premPopSheet).cell(premPopCell).value();
            footerdisclaimer_cell = workbook.sheet(footDisclaimSheet).cell(footDisclaimCell).value();
            footerCopyRight_cell = workbook.sheet(footCopyrightSheet).cell(footCopyrightCell).value();
            buyingContactnumber_cell = workbook.sheet(buyContactNumSheet).cell(buyContactNumCell).value();
            shoppingContact_cell = workbook.sheet(shopContactNumSheet).cell(shopContactNumCell).value();
            facilitytxt_cell = workbook.sheet(facNoteSheet).cell(facilityCell).value();
            authorize_cell = workbook.sheet(authSheet).cell(authCell).value();
            recurringPayment_cell = workbook.sheet(recurrPaySheet).cell(recurrPayCell).value();
            recurrPayAgree_cell = workbook.sheet(recurrPayAgrmtSheet).cell(recurrPayAgrmtCell).value();
            disclosureForm_cell = workbook.sheet(discloseFormSheet).cell(discloseFormCell).value();
            disclosureForm2_cell = workbook.sheet(discloseForm2Sheet).cell(discloseForm2Cell).value();
            chargesAgreementNote_cell = workbook.sheet(chrgAgremtNoteSheet).cell(chrgAgremtNoteCell).value();
            paymentDeadline_cell = workbook.sheet(payDeadlineSheet).cell(payDeadlineCell).value();
            medicalRelease_cell = workbook.sheet(medReleaseSheet).cell(medReleaseCell).value();
            enrollmentFee_cell = workbook.sheet(enrollFeeSheet).cell(enrollFeeCell).value();
            expenseratio_cell = workbook.sheet(expnsRatioSheet).cell(expnsRatioCell).value();
            summaryBenefit_cell = workbook.sheet(summaryofBenefitSheet).cell(summaryBenefitCell).value();



            // console.log();
            // console.log("Do I get any browser.params.runtimeDebug output ???? ");
            // console.log(browser.params.runtimeDebug);
            // console.log("stirng length is "+(browser.params.runtimeDebug).length);
            // console.log();


            // console.log();
            // console.log();
            // console.log();
            // console.log("Email            === " + mailtxt_cell);
            // console.log();
            // console.log("Max Dep Age      === " + maxDepAge_cell);
            // console.log()
            // console.log("premiumpop       === " + premiumpop_cell);
            // console.log();
            // console.log("footerDisclaimer === " + footerdisclaimer_cell);
            // console.log();
            // console.log("footer CopyRight === " + footerCopyRight_cell);
            // console.log();
            // console.log("buy Contact ph#  === " + buyingContactnumber_cell);
            // console.log();
            // console.log("shoppingContact  === " + shoppingContact_cell);
            // console.log();


        });

    }); // end of it('Verify Excel_1:should )
    // refactor and break this one down.  i'ts two test



    it('should manage prep for emailText', function() {
        enrollPage.enterHomePageDetails(TestData.enrollData);
        expect(perInfo.fieldFirstName.isPresentAndDisplayed()).toBeTruthy();
    });

    it('MailTxt_Cell should equal emailtext', function() {
        perInfo.phoneNumberemail(TestData);
        perInfo.emailText.getText().then(function(emailtext) {
            console.log();
            //console.log(emailtext);
            console.log("Compare the Email text content");
            console.log();
            expect(emailtext).toEqual(mailtxt_cell);
        })
    });

    it('footerCopyRight_Cell should equal footerCRtxt', function() {
        perInfo.copyright.getText().then(function(copyRtxt) {
            console.log();
            //console.log(copyRtxt);
            console.log("Compare the Footer CopyRight");
            console.log();
            expect(copyRtxt).toEqual(footerCopyRight_cell);
        })
    });
    it('footerdisclaimer_cell should equal footertxt', function() {
        perInfo.footer.getText().then(function(footerDisclaimer) {
            console.log();
            // console.log(footerDisclaimer);
            console.log("Compare the Footer Disclaimer");
            console.log();
            expect(footerDisclaimer).toEqual(footerdisclaimer_cell);
        })
    });

    it('buyingContactNumber_cell should equal buyingcontact', function() {
        perInfo.helpContact.getText().then(function(buyingcontact) {
            console.log();
            // console.log(buyingcontact);
            console.log("Compare the Buying Contact Ph#");
            console.log();
            //Comparing the Buying Contactt Information Application text with the Excel Data
            expect(buyingcontact).toEqual(buyingContactnumber_cell);
        })
    });


    it('should be able to nav to dependent page', function() {
        perInfo.fillPersonalInfo(TestData);
        perInfo.fillAddress(TestData);
        perInfo.phoneNumberemail(TestData);
        perInfo.next.click();
        expect(browser.getTitle()).toEqual(TestData.DependentTitle);
    });

    it('should fill out generic dependent info, and check Dep Disable Text ', function() {
        depInfo.fillDependent('Dependent1', TestData.child, false);
        depInfo.next.click();
        depInfo.isHandicapped('Dependent1').isPresentAndDisplayed().then(function(displayed) {
            if (displayed) {
                depInfo.depChildmaxageerror.getText().then(function(depmaxagetxt) {
                    console.log();
                    console.log(depmaxagetxt);
                    expect(depmaxagetxt).toEqual(maxDepAge_cell);
                    depInfo.isHandicapped('Dependent1').check();
                })
            }
        })
    });

    it('premiumPopup_cell text should equal premiumPopup dialog text', function() {
        depInfo.next.click();
        expect(depInfo.premiumChangePopUp.isPresentAndDisplayed()).toBeTruthy();
        depInfo.depPremiumChangepopupTxt.getText().then(function(depPremiumpopupTxt) {
                console.log();
                console.log(depPremiumpopupTxt);
                expect(depPremiumpopupTxt).toEqual(premiumpop_cell);
                depInfo.continue.click();
            })
            // console.log('507PI 1: Complete')
    });

    /*it('Facility Text Should be equal with the Facility Page of the Application', function() {
        facilities.facilitySelectiontext.getText().then(function(facilityTxt) {
            console.log();
            console.log(facilityTxt);
            expect(facilityTxt).toEqual(facilitytxt_cell);

            facilities.selectFacility();
            facilities.next.click();

            expect(facilityTxt).toEqual(facilitytxt_cell);

            facilities.selectFacility();
            facilities.next.click();

            expect(browser.getTitle()).toEqual(TestData.paymentPageTitle);
        })

    });*/


    it('Should compare Recurring Payment Agreement text ', function() {
        //Comparing the Authorization text with the Excel sheet
        payment.paymentagreementTxt.getText().then(function(paymentagreementTxt) {
            console.log();
            console.log();
            console.log("Debug Agreement Content Start");
            console.log("==============================");
            console.log("The payment agreement content is as follows:");
            console.log(paymentagreementTxt);

            console.log("The payment agreement ExcelSheet is as follows:");
            console.log(recurrPayAgree_cell);
            console.log("==============================");
            console.log("StirngLength Check");
            console.log("Stirng Length of paymentagreemtnTxT is: " + paymentagreementTxt.length);
            console.log("Stirng Length of ExcelSheet Cell is: " + recurrPayAgree_cell.length);
            console.log();
            console.log();
            console.log("Debug Agreement Content End");
            expect(paymentagreementTxt).toEqual(recurrPayAgree_cell);
        });
    });


    it('Should compare the Authorization Statement block', function() {
        payment.paymentAuthorizationTxt.getText().then(function(paymentAuthorizationTxt) {
            console.log();
            console.log(paymentAuthorizationTxt);
            expect(paymentAuthorizationTxt).toEqual(paymentDeadline_cell);
        });
    });


    it('Should compare Authorize Consent text', function() {
        payment.authorizetxt.getText().then(function(authorizationpaymentTxt) {
            console.log();
            console.log(authorizationpaymentTxt);
            expect(authorizationpaymentTxt).toEqual(authorize_cell);
        });

    });


    it('Should compare Disclosure Form Contract upper button Text with Link to PDF ', function() {
        payment.disclouserFormOption1.getText().then(function(disclouserFormOption1Txt) {
            console.log();
            console.log(disclouserFormOption1Txt);
            expect(disclouserFormOption1Txt).toEqual(disclosureForm_cell);
        });
    });


    it('Should compare Disclosure Form Contract lower button Text ', function() {
        payment.disclouserFormOption2.getText().then(function(disclouserFormOption2Txt) {
            console.log();
            console.log(disclouserFormOption2Txt);
            expect(disclouserFormOption2Txt).toEqual(disclosureForm2_cell);
        });
    });


    it('Should compare Billing Summary Enrollment Fee text ', function() {
        payment.enrollmentfeeTxt.getText().then(function(enrollmentfeeTxt) {
            console.log();
            console.log(enrollmentfeeTxt);
            expect(enrollmentfeeTxt).toEqual(enrollmentFee_cell);
        });
    });


    it('Should compare Billing Summary According Explanation ', function() {
        payment.discloserTxt.getText().then(function(discloserTxt) {
            console.log();
            console.log(discloserTxt);
            expect(discloserTxt).toEqual(expenseratio_cell);
        });
    });


    it('This should be one of the last checks since its on the bottom of the page: compare the CC refund Comment  ', function() {
        payment.refundCCpaymentsTxt.getText().then(function(refundCCpaymentsTxt) {
            console.log();
            console.log(refundCCpaymentsTxt);
            expect(refundCCpaymentsTxt).toEqual(chargesAgreementNote_cell);
        });
    });


    it('Fill out payment details', function() {
        /*payment.discloser.click();
        Utility.switchToWindow(1);
        Utility.switchToWindow(0);*/

        payment.billingChkBox.check();
        payment.fillpayment(TestData);
        payment.purchaseNow.click();
        expect(browser.getTitle()).toEqual(TestData.receiptPageTitle);

    });

    it('Should Compare the Receipt page Summary Text', function() {
        receipt.planSummary.click();
        receipt.summaryBenefitsTxt.getText().then(function(receiptsummaryTxt) {
            console.log();
            console.log(receiptsummaryTxt);
            expect(receiptsummaryTxt).toEqual(summaryBenefit_cell);
        });
    })

    console.log('Receipt Complete');

});
