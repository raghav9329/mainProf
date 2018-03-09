/*To run this spec update config file with below 

1. Base url in params section 
baseUrl: 'https://aw-lx0176.deltadev.ent:3001/shopping/aarp/test',

2. isExecutionFromUI = false; in onprepare section*/

var shopping = new(require('../../pageObjects/cxinit/shopping-page.js'));
var planOptions = new(require('../../pageObjects/cxinit/plan-options-page.js'));
var planDetails = new(require('../../pageObjects/cxinit/plan-details-page.js'));
var perInfo = new(require('../../pageObjects/cxinit/perInfo-page.js'));
var depInfo = new(require('../../pageObjects/cxinit/dependent-page.js'));
var facilities = new(require('../../pageObjects/cxinit/facilities-page.js'));
var payment = new(require('../../pageObjects/cxinit/payment-page.js'));
var receipt = new(require('../../pageObjects/cxinit/receipt-page.js'));
var marketPage = require('../../pageObjects/cxinit/aarp-market-page.js');
var enrollPage = new(require('../../pageObjects/cxinit/enroll-page.js'));

var footer = new(require('../../pageObjects/cxinit/footer-page.js'));
var feedback = new(require('../../pageObjects/cxinit/feedback-page.js'));
var TestData = require('../../testData/' + testDataEnv + '/dhmo/DirectDeltaShopping.json');

describe('Shopping Navigations', function() {


    beforeEach(function() {
        jasmine.addMatchers(custommatcher.customMatchers);
        Utility.openApplication(browser.params.baseUrl + '/shopping/delta/test');
        shopping.Zipcode.setText(TestData.emptyZipcode);
        shopping.Submit.click();
    });

    // dataProvider(TestData.states, function(data, description) {
    it('step1:', function() {
        shopping.Zipcode.setText(TestData.zipcode);
        expect(shopping.Zipcode.isPresentAndDisplayed()).toBeTruthy();
        expect(shopping.NoOFCovered_getAQuote.isPresentAndDisplayed()).toBeTruthy();
        expect(shopping.addDependent.isPresentAndDisplayed()).toBeTruthy();
        expect(shopping.removeDependent.isPresentAndDisplayed()).toBeTruthy();
        expect(shopping.Showplans.isPresentAndDisplayed()).toBeTruthy();
        expect(shopping.NoOFCovered_getAQuote.getAttribute('value')).toEqual('2');
        shopping.addDependent.click();
        expect(shopping.NoOFCovered_getAQuote.getAttribute('value')).toEqual('3');
        shopping.removeDependent.click();
        expect(shopping.NoOFCovered_getAQuote.getAttribute('value')).toEqual('2');
        shopping.NoOFCovered_getAQuote.setText('15+\t');
        shopping.addDependent.click();
        //Validates 15 dependents Dob's fields added under DOB field
        expect(shopping.NoOFCovered_getAQuote.getAttribute('value')).toEqual('15');
        shopping.depDob.getCount().then(function(count) {
            expect(count).toEqual(15);
        })

        shopping.NoOFCovered_getAQuote.setText('1+\t');
        shopping.addDependent.click();
        expect(shopping.NoOFCovered_getAQuote.getAttribute('value')).toEqual('2');
        shopping.removeDependent.click();
        expect(shopping.NoOFCovered_getAQuote.getAttribute('value')).toEqual('1');
        shopping.removeDependent.click();
        expect(shopping.NoOFCovered_getAQuote.getAttribute('value')).toEqual('0');
        shopping.Showplans.click();
        expect(planOptions.isAt()).toEqual(true);
    });

    it('step2:', function() {
        expect(shopping.Zipcode.isPresentAndDisplayed()).toBeTruthy();
        feedback.feedback.click();
        Utility.switchToFrame(feedback.feedbackFrame());
        expect(feedback.feedbackTitle.getText()).toEqual(TestData.feedbackTitle);
        expect(feedback.questionTitle.getText()).toEqual(TestData.questionTitle);
        feedback.answer.setText('test data');
        feedback.submit.click();
        expect(feedback.thankyouMsg.getText()).toContain(TestData.thankyouMsg);


    });

    it('step3:Verify Footer : ', function() {
        footer.verifylegalNotices();
        footer.verifyprivacy();
        footer.verifylanguageAssistance();

    });

    it('step4:Verify Zipcode : ', function() {
        expect(shopping.Zipcode.isPresentAndDisplayed()).toBeTruthy();
        expect(shopping.NoOFCovered_getAQuote.isPresentAndDisplayed()).toBeTruthy();
        expect(shopping.addDependent.isPresentAndDisplayed()).toBeTruthy();
        expect(shopping.removeDependent.isPresentAndDisplayed()).toBeTruthy();
        expect(shopping.Showplans.isPresentAndDisplayed()).toBeTruthy();
        expect(shopping.NoOFCovered_getAQuote.getAttribute('value')).toEqual('2');
        shopping.removeDependent.click();
        expect(shopping.NoOFCovered_getAQuote.getAttribute('value')).toEqual('1');
        shopping.removeDependent.click();
        expect(shopping.NoOFCovered_getAQuote.getAttribute('value')).toEqual('0');
        shopping.Zipcode.setText(TestData.zipcode);
        // var d = TestData.dob;
        shopping.enterDOB(TestData.dob);
        console.log("==============" + TestData.dob);
        // var datesplit = (d.split('-'));
        // console.log(datesplit);
        // shopping.fieldBdMM.setText(datesplit[0]);
        // shopping.fieldBdDD.setText(datesplit[1]);
        // shopping.fieldBdYyyy.setText(datesplit[2]);
        // shopping.fieldBdMM.setText(datesplit[0]);
        // shopping.addDependentDob('Dependent1', '', TestData.dob, true);
        // shopping.Showplans.click();
    });

    it('step5: Verify Zipcode field validations : ', function() {
        expect(shopping.Zipcode.isPresentAndDisplayed()).toBeTruthy();
        expect(shopping.NoOFCovered_getAQuote.isPresentAndDisplayed()).toBeTruthy();
        expect(shopping.addDependent.isPresentAndDisplayed()).toBeTruthy();
        expect(shopping.removeDependent.isPresentAndDisplayed()).toBeTruthy();
        expect(shopping.Showplans.isPresentAndDisplayed()).toBeTruthy();
        shopping.Zipcode.setText('' + '\t');
        expect(shopping.Zipcode_error.getText()).toEqual(TestData.clientEmptyZiperror);
        expect(shopping.serverErrMsgZipcode.getText()).toEqual(TestData.ServerEmptyZiperror);
        shopping.Showplans.click();
    });

    it('step6: Verify Invalid Zipcode field validations : ', function() {
        expect(shopping.Zipcode.isPresentAndDisplayed()).toBeTruthy();
        shopping.Zipcode.setText(TestData.IncompleteZipcode + '\t');
        expect(shopping.Zipcode_error.getText()).toEqual(TestData.incompleteZipcodeerror);
        shopping.Zipcode_error.click();
        shopping.Zipcode.setText(TestData.InvalidZipcode);
        shopping.Showplans.click();
        expect(shopping.serverErrMsgInvalidZipcode.getText()).toEqual(TestData.invalidZiperror);
        shopping.Zipcode.setText(TestData.zipcode);
        shopping.Showplans.click();
        expect(planOptions.isAt()).toEqual(true);
    });

    // Shounak: Added to validate story # CXINIT-3677
    // Validate navigation to hCentive Plan Options Page for an "unsupported state's" zip code
    // Unsupported state address is set to New Mexico (NM) for now. Will need to change this when we start supporting New Mexico
    it('step7: Verify Unsupported Zipcode field validations : ', function() {
        expect(shopping.Zipcode.isPresentAndDisplayed()).toBeTruthy();
        shopping.Zipcode.setText(TestData.UnsupportedZipCode);
        shopping.Showplans.click();
        expect(browser.getTitle()).toEqual(TestData.hCentivePlanOptionsTitle);
    });

    dataProvider(TestData.dobCombinations, function(data, description) {
        it('step8: Verify tabin/tabout Date field validations : ', function() {
            expect(shopping.Zipcode.isPresentAndDisplayed()).toBeTruthy();
            shopping.enterDOB(data.date);
            expect(shopping.dobClienterrorMsgs()).toEqual(data.errorMsg);
        });
        // shopping.Showplans.click();
        // expect(planOptions.isAt()).toEqual(true);
    });

    it('step9: Verify future/Past Year in the Date field validations : ', function() {
        expect(shopping.Zipcode.isPresentAndDisplayed()).toBeTruthy();
        shopping.enterDOB(TestData.futureYearDob);
        expect(shopping.errorBdYyyy.getText()).toEqual(TestData.yearErrorMsg);
        shopping.enterDOB(TestData.pastYearDob);
        expect(shopping.errorBdYyyy.getText()).toEqual(TestData.yearErrorMsg);

    });

    it('step10: Verify Non-Leap Year DOB field validations : ', function() {
        expect(shopping.Zipcode.isPresentAndDisplayed()).toBeTruthy();
        shopping.enterDOB(TestData.nonLeapYear);
        shopping.errorInvalidDob.isPresentAndDisplayed().then(function(displayed) {
            if (displayed) {
                console.log("==============" + (shopping.errorInvalidDob.getText()));
                expect(shopping.errorInvalidDob.getText()).toEqual(TestData.invalidDobErrorMsg);
            }
        });
        expect(shopping.minAgeError.getText()).toEqual(TestData.minAgeErrorMsg);


    });

    it('Step-11:Should complete the Enroll Page', function() {
        expect(shopping.Zipcode.isPresentAndDisplayed()).toBeTruthy();
        shopping.Zipcode.setText(TestData.zipcode);
        shopping.enterDOB(TestData.validDob);
        expect(shopping.NoOFCovered_getAQuote.getAttribute('value')).toEqual('2');
        shopping.NoOFCovered_getAQuote.setText('15' + '\t');
        // shopping.Zipcode.click();
        shopping.NoOFCovered_getAQuote.setText('1' + '\t');
        // shopping.Zipcode.click();
        shopping.removeDependent.click();
        expect(shopping.NoOFCovered_getAQuote.getAttribute('value')).toEqual('0');
    });

    it('Step-12: Verify tabin/tabout Date field validations for Dependent', function() {
        expect(shopping.Zipcode.isPresentAndDisplayed()).toBeTruthy();
        shopping.Zipcode.setText(TestData.zipcode);
        shopping.enterDOB(TestData.validDob);
        shopping.NoOFCovered_getAQuote.setText('1' + '\t');
        shopping.dependentfieldDBMM('Dependent1').setText('' + '\t');
        shopping.dependentfieldDBDD('Dependent1').setText('' + '\t');
        shopping.dependentfieldDBYY('Dependent1').setText('' + '\t');
        expect(shopping.dependenterrorfieldDBMM('Dependent1').getText()).toEqual(TestData.monthErrorMsg);
        expect(shopping.dependenterrorfieldDBDD('Dependent1').getText()).toEqual(TestData.dateErrorMsg);
        expect(shopping.dependenterrorfieldDBYY('Dependent1').getText()).toEqual(TestData.yearErrorMsg);

    });

    dataProvider(TestData.dobCombinations, function(data, description) {
        it('step13X: Verify Dependent Date Combinations field validations : ', function() {
            expect(shopping.Zipcode.isPresentAndDisplayed()).toBeTruthy();
            shopping.enterDependentDOB('Dependent1', data.date);
            // console.log(shopping.dependenterrorfieldDBMM('Dependent1').getText());
            expect(shopping.dependentDobClienterrorMsgs('Dependent1')).toEqual(data.deperrorMsg);
        });
        // shopping.Showplans.click();
        // expect(planOptions.isAt()).toEqual(true);
    });

    it('step14: Verify Dependent future/Past Year in the Date field validations : ', function() {
        expect(shopping.Zipcode.isPresentAndDisplayed()).toBeTruthy();
        shopping.enterDependentDOB('Dependent1', TestData.futureYearDob);
        expect(shopping.dependenterrorfieldDBYY('Dependent1').getText()).toEqual(TestData.yearErrorMsg);
        shopping.enterDependentDOB('Dependent1', TestData.pastYearDob);
        expect(shopping.dependenterrorfieldDBYY('Dependent1').getText()).toEqual(TestData.yearErrorMsg);

    });

    it('step15: Verify Dependent Non-Leap Year DOB field validations : ', function() {
        expect(shopping.Zipcode.isPresentAndDisplayed()).toBeTruthy();
        shopping.enterDependentDOB('Dependent1', TestData.nonLeapYear);
        shopping.errorInvalidDob.isPresentAndDisplayed().then(function(displayed) {
            if (displayed) {
                console.log("==============" + (shopping.errorInvalidDob.getText()));
                expect(shopping.errorInvalidDob.getText()).toEqual(TestData.invalidDobErrorMsg);
            }
        });
        // expect(shopping.minAgeError.getText()).toEqual(TestData.minAgeErrorMsg);
    });

    it('Step 16: Verify the Flow of Shopping : ', function() {

        shopping.Zipcode.setText(TestData.zipcode);
        expect(shopping.Zipcode.isPresentAndDisplayed()).toBeTruthy();
        expect(shopping.NoOFCovered_getAQuote.isPresentAndDisplayed()).toBeTruthy();
        expect(shopping.addDependent.isPresentAndDisplayed()).toBeTruthy();
        expect(shopping.removeDependent.isPresentAndDisplayed()).toBeTruthy();
        expect(shopping.Showplans.isPresentAndDisplayed()).toBeTruthy();
        shopping.NoOFCovered_getAQuote.setText('0+\t');
        expect(shopping.NoOFCovered_getAQuote.getAttribute('value')).toEqual('0');
        shopping.Showplans.click();
        expect(planOptions.isAt()).toEqual(true);
        planOptions.getPlanDetails(TestData.PlanName).click();
        planDetails.buyPlan.click();

        expect(perInfo.fieldFirstName.isPresentAndDisplayed()).toBeTruthy();
        perInfo.fillPersonalInfo(TestData);
        perInfo.fillAddress(TestData);
        perInfo.phoneNumberemail(TestData);
        perInfo.next.click();
        expect(browser.getTitle()).toEqual(TestData.DependentTitle);
        expect(depInfo.fieldAddDependents.isPresentAndDisplayed()).toBeTruthy();
        depInfo.fillDependent('Dependent1', TestData.child1, false);
        depInfo.next.click();
        if (depInfo.continue.isPresentAndDisplayed()) depInfo.continue.click();
        expect(browser.getTitle()).toEqual(TestData.facilitiesTitle);

        //Select the Facilities
        facilities.selectFacility().then(function(fnamee) {
            var facility1 = fnamee;
        });
        facilities.next.click();

        facilities.selectFacility().then(function(fnamee) {
            var facility2 = fnamee;
        });
        facilities.next.click();

        expect(browser.getTitle()).toEqual(TestData.paymentTitle);

        //Filling the Payment Details
        payment.billingChkBox.check();
        payment.fillpayment(TestData);
        payment.purchaseNow.click();
        expect(browser.getTitle()).toEqual(TestData.receiptTitle);

        //Verify the Receipt page Content Data
        var plansummary = TestData.planSummary;
        receipt.planSummary.click();
        receipt.applicationNumber.getText().then(function(appicationNumber) {
            console.log("Application Number == " + appicationNumber);
            var apNumber = appicationNumber;
            console.log('appicationNumber=====' + apNumber);
        })
        expect(receipt.getPlanSummaryByKey('Deductible per calendar year per person').getText()).toEqual(plansummary.Deductible_per_calendar);
        expect(receipt.getPlanSummaryByKey('Maximum per calendar year per person').getText()).toEqual(plansummary.Max_per_calendar);
        expect(receipt.getPlanSummaryByKey('Office visit').getText()).toEqual(plansummary.Officevisit);
        expect(receipt.getPlanSummaryByKey('Exams').getText()).toEqual(plansummary.Exams);
        expect(receipt.getPlanSummaryByKey('X-rays').getText()).toEqual(plansummary.Xrays);
        expect(receipt.getPlanSummaryByKey('Cleanings').getText()).toEqual(plansummary.Cleanings);
        expect(receipt.getPlanSummaryByKey('Fillings').getText()).toEqual(plansummary.Fillings);
        expect(receipt.getPlanSummaryByKey('Root canals').getText()).toEqual(plansummary.Rootcanals);
        expect(receipt.getPlanSummaryByKey('Gum treatment').getText()).toEqual(plansummary.Gumtreatment);
        expect(receipt.getPlanSummaryByKey('Extractions').getText()).toEqual(plansummary.Extractions);
        expect(receipt.getPlanSummaryByKey('Denture repair').getText()).toEqual(plansummary.Denturerepair);
        expect(receipt.getPlanSummaryByKey('Crowns').getText()).toEqual(plansummary.Crowns);
        expect(receipt.getPlanSummaryByKey('Orthodontics').getText()).toEqual(plansummary.Orthodontics);

    });

    // });

});
