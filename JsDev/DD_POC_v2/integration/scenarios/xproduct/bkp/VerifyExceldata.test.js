const XlsxPopulate = require('xlsx-populate');
var TestData = require('../../testData/' + testDataEnv + '/dhmo/CXAUTO_101.test.json');
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

    it('Verify Excel_1:should be able to open Login page and verify', function() {
        XlsxPopulate.fromFileAsync("./integration/testData/Direct_Buying_Content.xlsx").then(workbook => {
            //Loading the Excel related data to the respective variables with each Sheet and content
            mailtxt_cell = workbook.sheet("Electronic Pref.").cell("A2").value();
            maxDepAge_cell = workbook.sheet("Max Age Disability").cell("B2").value();
            premiumpop_cell = workbook.sheet("Dependents Premium Change").cell("A1").value();
            footercontent_cell = workbook.sheet("Footer Text").cell("B3").value();
            buyingContactnumber_cell = workbook.sheet("Buying Contact Number").cell("A1").value();
            shoppingContact_cell = workbook.sheet("Shopping Contact Number").cell("A1").value();

            console.log("Email text======" + mailtxt_cell);
            console.log("Max Dep Age text======" + maxDepAge_cell);
            console.log("premiumpop text======" + premiumpop_cell);
            console.log("footercontent text======" + footercontent_cell);
            console.log("buyingContactnumber text======" + buyingContactnumber_cell);
            console.log("shoppingContact text======" + shoppingContact_cell);
        });

        enrollPage.enterHomePageDetails(TestData.enrollData);
        expect(perInfo.fieldFirstName.isPresentAndDisplayed()).toBeTruthy();

        perInfo.phoneNumberemail(TestData);
        //Capturing the text from the Application using the promise
        perInfo.emailText.getText().then(function(emailtext) {
            console.log();
            console.log(emailtext);
            //Comparing the email field Application text with the Excel Data
            expect(emailtext).toEqual(mailtxt_cell);
        })

        perInfo.footer.getText().then(function(footertxt){
        	console.log();
            console.log(footertxt);
            //Comparing the footer Application text with the Excel Data
            expect(footertxt).toEqual(footercontent_cell);
        })
        perInfo.helpContact.getText().then(function(buyingcontact){
        	console.log();
            console.log(buyingcontact);
            //Comparing the Buying Contact Information Application text with the Excel Data
            expect(buyingcontact).toEqual(buyingContactnumber_cell);
        })
        perInfo.fillPersonalInfo(TestData);
        perInfo.fillAddress(TestData);
        perInfo.phoneNumberemail(TestData);
        perInfo.next.click();
        expect(browser.getTitle()).toEqual(TestData.DependentTitle);
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

        depInfo.next.click();
        expect(depInfo.premiumChangePopUp.isPresentAndDisplayed()).toBeTruthy();
        depInfo.depPremiumChangepopupTxt.getText().then(function(depPremiumpopupTxt) {
            console.log();
            console.log(depPremiumpopupTxt);
            expect(depPremiumpopupTxt).toEqual(premiumpop_cell);
        })
        console.log('507PI 1: Complete')
    });

});
