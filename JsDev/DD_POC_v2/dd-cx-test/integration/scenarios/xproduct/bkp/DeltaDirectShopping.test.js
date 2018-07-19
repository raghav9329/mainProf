/*To run this spec update config file with below 

1. Base url in params section 
baseUrl: 'https://aw-lx0176.deltadev.ent:3001/shopping/aarp/test',

2. isExecutionFromUI = false; in onprepare section*/

var shopping = new(require('../../../pageObjects/cxinit/shopping-page.js'));
var planOptions = new(require('../../../pageObjects/cxinit/plan-options-page.js'));
var planDetails = new(require('../../../pageObjects/cxinit/plan-details-page.js'));
var perInfo = new(require('../../../pageObjects/cxinit/perInfo-page.js'));
var depInfo = new(require('../../../pageObjects/cxinit/dependent-page.js'));
var facilities = new(require('../../../pageObjects/cxinit/facilities-page.js'));
var payment = new(require('../../../pageObjects/cxinit/payment-page.js'));
var receipt = new(require('../../../pageObjects/cxinit/receipt-page.js'));
var marketPage = require('../../../pageObjects/cxinit/aarp-market-page.js');
var enrollPage = new(require('../../../pageObjects/cxinit/enroll-page.js'));
var footer = new(require('../../../pageObjects/cxinit/footer-page.js'));
var feedback = new(require('../../../pageObjects/cxinit/feedback-page.js'));
var TestData = require('../../../testData/' + testDataEnv + '/dhmo/DirectDeltaShopping.json');

describe('Shopping Navigations', function() {


    beforeEach(function() {
        jasmine.addMatchers(custommatcher.customMatchers);
        Utility.openApplication('', TestData.product);
    });

    // dataProvider(TestData.states, function(data, description) {
    it('step1:', function() {
        shopping.Zipcode.setText(TestData.zipcode);
        expect(shopping.Zipcode.isPresentAndDisplayed()).toBeTruthy('Verify Zipcode Field is Displayed');
        expect(shopping.NoOFCovered_getAQuote.isPresentAndDisplayed()).toBeTruthy('Verify "No of Covered" Field is Displayed');
        expect(shopping.addDependent.isPresentAndDisplayed()).toBeTruthy('Verify Add Dependent Field is available and Displayed');
        expect(shopping.removeDependent.isPresentAndDisplayed()).toBeTruthy('Verify Delete Dependent Field is available and Displayed');
        expect(shopping.Showplans.isPresentAndDisplayed()).toBeTruthy('Verify Show Plans button is Displayed');
        expect(shopping.NoOFCovered_getAQuote.getAttribute('value')).toEqual('1','Verify Number of Covered is same as: "1" ');
        shopping.addDependent.click();
        expect(shopping.NoOFCovered_getAQuote.getAttribute('value')).toEqual('2','Verify Number of Covered is same as: "2" ');
        shopping.removeDependent.click();
        expect(shopping.NoOFCovered_getAQuote.getAttribute('value')).toEqual('1','Verify Number of Covered is same as: "1" ');
        shopping.NoOFCovered_getAQuote.setText('15+\t');
        shopping.addDependent.click();
        //Validates 15 dependents Dob's fields added under DOB field
        expect(shopping.NoOFCovered_getAQuote.getAttribute('value')).toEqual('16','Verify Number of Covered is same as: "16" ');
        shopping.depDob.getCount().then(function(count) {
            expect(count).toEqual(15,'Verify Number of Covered is same as: "15" ');
        })

        shopping.NoOFCovered_getAQuote.setText('1+\t');
        shopping.addDependent.click();
        expect(shopping.NoOFCovered_getAQuote.getAttribute('value')).toEqual('2','Verify Number of Covered is same as: "2" ');
        shopping.removeDependent.click();
        expect(shopping.NoOFCovered_getAQuote.getAttribute('value')).toEqual('1','Verify Number of Covered is same as: "1" ');
        shopping.removeDependent.click();
        expect(shopping.NoOFCovered_getAQuote.getAttribute('value')).toEqual('1','Verify Number of Covered is same as: "1" ');
        shopping.enterDOB(TestData.dob);
        shopping.Showplans.click();
        expect(planOptions.isAt()).toEqual(true,'Verify User is Displayed with Plan Options Page');
    });
    //==================No Feedback frame
    it('step2:', function() {
        expect(shopping.Zipcode.isPresentAndDisplayed()).toBeTruthy('Verify Zipcode field is Displayed');
        if (pdescription == 'AHMO' || pdescription == 'APPO') {
        feedback.feedback.click();
        Utility.switchToFrame(feedback.feedbackFrame());
        expect(feedback.feedbackTitle.getText()).toEqual(TestData.feedbackTitle,'Verify "Feedback title" in the Feedback page is same as: ' +TestData.feedbackTitle);
        expect(feedback.questionTitle.getText()).toEqual(TestData.questionTitle,'Verify Question title Displayed is same as: ' +TestData.questionTitle);
        feedback.answer.setText('test data');
        feedback.submit.click();
        expect(feedback.thankyouMsg.getText()).toContain(TestData.thankyouMsg,'Verify User is Displayed with the Thank You Message');
    }

    });

    it('step3:Verify Footer : ', function() {
        footer.verifylegalNotices();
        footer.verifyprivacy();
        footer.verifylanguageAssistance();
    });

    it('step4:Verify Zipcode : ', function() {
        expect(shopping.Zipcode.isPresentAndDisplayed()).toBeTruthy('Verify Zipcode Field is Displayed');
        expect(shopping.NoOFCovered_getAQuote.isPresentAndDisplayed()).toBeTruthy('Verify "No of Covered" Field is Displayed');
        expect(shopping.addDependent.isPresentAndDisplayed()).toBeTruthy('Verify Add Dependent Field is available and Displayed');
        expect(shopping.removeDependent.isPresentAndDisplayed()).toBeTruthy('Verify Delete Dependent Field is available and Displayed');
        expect(shopping.Showplans.isPresentAndDisplayed()).toBeTruthy('Verify Show Plans button is Displayed');
        expect(shopping.NoOFCovered_getAQuote.getAttribute('value')).toEqual('1','Verify Number of Covered is same as: "1" ');
        shopping.Zipcode.setText(TestData.zipcode);
        shopping.enterDOB(TestData.dob);
        shopping.Showplans.click();
        expect(planOptions.isAt()).toEqual(true,'Verify User is Displayed with Plan Options Page');
    });

    it('step5: Verify Zipcode field validations : ', function() {
        expect(shopping.Zipcode.isPresentAndDisplayed()).toBeTruthy('Verify Zipcode Field is Displayed');
        expect(shopping.NoOFCovered_getAQuote.isPresentAndDisplayed()).toBeTruthy('Verify "No of Covered" Field is Displayed');
        expect(shopping.addDependent.isPresentAndDisplayed()).toBeTruthy('Verify Add Dependent Field is available and Displayed');
        expect(shopping.removeDependent.isPresentAndDisplayed()).toBeTruthy('Verify Delete Dependent Field is available and Displayed');
        expect(shopping.Showplans.isPresentAndDisplayed()).toBeTruthy('Verify Show Plans button is Displayed');
        shopping.Zipcode.setText('' + '\t');
        expect(shopping.Zipcode_error.getText()).toEqual(TestData.clientEmptyZiperror,'Verify NULL validation error message for Zipcode for "Client Validation" ');
        expect(shopping.serverErrMsgZipcode.getText()).toEqual(TestData.ServerEmptyZiperror, 'Verify NULL validation error message for Zipcode for "Server Validation" ');
        shopping.Showplans.click();
    });

    it('step6: Verify Invalid Zipcode field validations : ', function() {
        expect(shopping.Zipcode.isPresentAndDisplayed()).toBeTruthy('Verify Zipcode Field is Displayed');
        shopping.Zipcode.setText(TestData.IncompleteZipcode + '\t');
        expect(shopping.Zipcode_error.getText()).toEqual(TestData.incompleteZipcodeerror,'Verify Incomplete Zipcode Error message is same as: ' +TestData.incompleteZipcodeerror);
        shopping.Zipcode_error.click();
        shopping.Zipcode.setText(TestData.InvalidZipcode);
         shopping.enterDOB(TestData.dob);
        shopping.Showplans.click();
        expect(shopping.serverErrMsgInvalidZipcode.getText()).toEqual(TestData.invalidZiperror,'Verify Invalid Error Message of "Server Validation" is same as: ' +TestData.invalidZiperror);
        shopping.Zipcode.setText(TestData.zipcode);
        shopping.Showplans.click();
        expect(planOptions.isAt()).toEqual(true,'Verify User is Displayed with Plan Options Page');
    });

    // Shounak: Added to validate story # CXINIT-3677
    // Validate navigation to hCentive Plan Options Page for an "unsupported state's" zip code
    // Unsupported state address is set to New Mexico (NM) for now. Will need to change this when we start supporting New Mexico
    it('step7: Verify Unsupported Zipcode field validations : ', function() {
        expect(shopping.Zipcode.isPresentAndDisplayed()).toBeTruthy('Verify Zipcode Field is Displayed');
        shopping.Zipcode.setText(TestData.UnsupportedZipCode);
        shopping.Showplans.click();
        expect(shopping.Zipcode.isPresentAndDisplayed()).toBeTruthy('Verify Zipcode Field is Displayed');
    });

    dataProvider(TestData.dobCombinations, function(data, description) {
        it('step8: Verify tabin/tabout Date field validations : ', function() {
            expect(shopping.Zipcode.isPresentAndDisplayed()).toBeTruthy('Verify Zipcode Field is Displayed');
            shopping.enterDOB(data.date);
            expect(shopping.dobClienterrorMsgs()).toEqual(data.errorMsg,'Verify "Clien Validations" of DOB is same as: ' +data.errorMsg);
        });
    });

    it('step9: Verify future/Past Year in the Date field validations : ', function() {
        expect(shopping.Zipcode.isPresentAndDisplayed()).toBeTruthy('Verify Zipcode Field is Displayed');
        shopping.enterDOB(TestData.futureYearDob);
        expect(shopping.errorBdYyyy.getText()).toEqual(TestData.yearErrorMsg,'Verify Year Error Message is same as: ' +TestData.yearErrorMsg);
        shopping.enterDOB(TestData.pastYearDob);
        expect(shopping.errorBdYyyy.getText()).toEqual(TestData.yearErrorMsg,'Verify Year Error Message is same as: ' +TestData.yearErrorMsg);

    });

    it('step10: Verify Non-Leap Year DOB field validations : ', function() {
        expect(shopping.Zipcode.isPresentAndDisplayed()).toBeTruthy('Verify Zipcode Field is Displayed');
        shopping.enterDOB(TestData.nonLeapYear);
        shopping.errorInvalidDob.isPresentAndDisplayed().then(function(displayed) {
            if (displayed) {
                console.log("==============" + (shopping.errorInvalidDob.getText()));
                expect(shopping.errorInvalidDob.getText()).toEqual(TestData.invalidDobErrorMsg,'Verify Invalid DOB error message is same as: ' +TestData.invalidDobErrorMsg);
            }
        });
        expect(shopping.minAgeError.getText()).toEqual(TestData.minAgeErrorMsg,'Verify Minimum age error message is same as: ' +TestData.minAgeErrorMsg);
    });

    it('Step-11:Should complete the Enroll Page', function() {
        expect(shopping.Zipcode.isPresentAndDisplayed()).toBeTruthy('Verify Zipcode Field is Displayed');
        shopping.Zipcode.setText(TestData.zipcode);
        shopping.enterDOB(TestData.validDob);
        expect(shopping.NoOFCovered_getAQuote.getAttribute('value')).toEqual('1','Verify Number of Covered is same as: "1" ');
        shopping.NoOFCovered_getAQuote.setText('15' + '\t');
        shopping.NoOFCovered_getAQuote.setText('2' + '\t');
        shopping.removeDependent.click();
        expect(shopping.NoOFCovered_getAQuote.getAttribute('value')).toEqual('1','Verify Number of Covered is same as: "1" ');
    });

    it('Step-12: Verify tabin/tabout Date field validations for Dependent', function() {
        expect(shopping.Zipcode.isPresentAndDisplayed()).toBeTruthy('Verify Zipcode Field is Displayed');
        shopping.Zipcode.setText(TestData.zipcode);
        shopping.enterDOB(TestData.validDob);
        shopping.NoOFCovered_getAQuote.setText('2' + '\t');
        shopping.dependentfieldDBMM('Dependent1').setText('' + '\t');
        shopping.dependentfieldDBDD('Dependent1').setText('' + '\t');
        shopping.dependentfieldDBYY('Dependent1').setText('' + '\t');
        expect(shopping.dependenterrorfieldDBMM('Dependent1').getText()).toEqual(TestData.monthErrorMsg,'Verify Error message for the Month field is same as: ' +TestData.monthErrorMsg);
        expect(shopping.dependenterrorfieldDBDD('Dependent1').getText()).toEqual(TestData.dateErrorMsg,'Verify Error message for the Date field is same as: ' +TestData.dateErrorMsg);
        expect(shopping.dependenterrorfieldDBYY('Dependent1').getText()).toEqual(TestData.yearErrorMsg,'Verify Error message for the Year field is same as: ' +TestData.yearErrorMsg);

    });

    dataProvider(TestData.dobCombinations, function(data, description) {
        it('step13X: Verify Dependent Date Combinations field validations : ', function() {
            expect(shopping.Zipcode.isPresentAndDisplayed()).toBeTruthy('Verify Zipcode Field is Displayed');
            shopping.enterDOB(TestData.nonLeapYear);
            shopping.NoOFCovered_getAQuote.setText('2' + '\t');
            shopping.enterDependentDOB('Dependent1', data.date);
            expect(shopping.dependentDobClienterrorMsgs('Dependent1')).toEqual(data.deperrorMsg,'Verify DOB Error messages for Dependent-1 are same as: ' +data.deperrorMsg);
        });
    });

    it('step14: Verify Dependent future/Past Year in the Date field validations : ', function() {
        expect(shopping.Zipcode.isPresentAndDisplayed()).toBeTruthy('Verify Zipcode Field is Displayed');
         shopping.Zipcode.setText(TestData.zipcode);
        shopping.enterDOB(TestData.nonLeapYear);
         shopping.NoOFCovered_getAQuote.setText('2+\t');
        shopping.enterDependentDOB('Dependent1', TestData.futureYearDob);
        expect(shopping.dependenterrorfieldDBYY('Dependent1').getText()).toEqual(TestData.yearErrorMsg,'Verify Year Error message in th eDOB field for Dependent-1 is same as: ' +TestData.yearErrorMsg);
        shopping.enterDependentDOB('Dependent1', TestData.pastYearDob);
        expect(shopping.dependenterrorfieldDBYY('Dependent1').getText()).toEqual(TestData.yearErrorMsg,'Verify Year Error message in th eDOB field for Dependent-1 is same as: ' +TestData.yearErrorMsg);

    });

    it('step15: Verify Dependent Non-Leap Year DOB field validations : ', function() {
        expect(shopping.Zipcode.isPresentAndDisplayed()).toBeTruthy('Verify Zipcode Field is Displayed');
         shopping.Zipcode.setText(TestData.zipcode);
        shopping.enterDOB(TestData.nonLeapYear);
        shopping.enterDependentDOB('Dependent1', TestData.nonLeapYear);
        shopping.errorInvalidDob.isPresentAndDisplayed().then(function(displayed) {
            if (displayed) {
                console.log("==============" + (shopping.errorInvalidDob.getText()));
                expect(shopping.errorInvalidDob.getText()).toEqual(TestData.invalidDobErrorMsg,'Verify Invalid DOB error message is same as: ' +TestData.invalidDobErrorMsg);
            }
        });
    });

    it('Step 16: Verify the Flow of Shopping : ', function() {

        shopping.Zipcode.setText(TestData.zipcode);
        expect(shopping.Zipcode.isPresentAndDisplayed()).toBeTruthy('Verify Zipcode Field is Displayed');
          shopping.enterDOB(TestData.enrollData.dob);
        expect(shopping.NoOFCovered_getAQuote.isPresentAndDisplayed()).toBeTruthy('Verify "No of Covered" Field is Displayed');
        expect(shopping.addDependent.isPresentAndDisplayed()).toBeTruthy('Verify Add Dependent Field is available and Displayed');
        expect(shopping.removeDependent.isPresentAndDisplayed()).toBeTruthy('Verify Delete Dependent Field is available and Displayed');
        expect(shopping.Showplans.isPresentAndDisplayed()).toBeTruthy('Verify Show Plans button is Displayed');
        shopping.NoOFCovered_getAQuote.setText('1+\t');
        expect(shopping.NoOFCovered_getAQuote.getAttribute('value')).toEqual('1','Verify Number of Covered is same as: "1" ');
        shopping.Showplans.click();
        expect(planOptions.isAt()).toEqual(true,'Verify User is Displayed with Plan Options Page');
        planOptions.getPlanDetails(TestData.PlanName).click();
        planDetails.buyPlan.click();

        expect(perInfo.fieldFirstName.isPresentAndDisplayed()).toBeTruthy('Verify that "First Name" field in personal info page is displayed');
        perInfo.fillPersonalInfo(TestData);
        perInfo.fillAddress(TestData);
        perInfo.phoneNumberemail(TestData);
        perInfo.next.click();
        expect(browser.getTitle()).toEqual(TestData.DependentTitle,'Verfiy "Dependent Page" is Displayed and the title is Equal as' +TestData.DependentTitle);
        expect(depInfo.fieldAddDependents.isPresentAndDisplayed()).toBeTruthy('Verify the Field "Add Dependent" is displayed and present');
        depInfo.fillDependent('Dependent1', TestData.child1, false);
        depInfo.next.click();
        if (depInfo.continue.isPresentAndDisplayed()) depInfo.continue.click();
        expect(browser.getTitle()).toEqual(TestData.facilitiesTitle,'Verify "Facility" page is displayed and the title is Equal as' +TestData.facilitiesTitle);

        //Select the Facilities
        facilities.selectFacility().then(function(fnamee) {
            var facility1 = fnamee;
        });
        facilities.next.click();

        facilities.selectFacility().then(function(fnamee) {
            var facility2 = fnamee;
        });
        facilities.next.click();

        expect(browser.getTitle()).toEqual(TestData.paymentTitle,'Verify "Payment" page is displayed and the title is Equal as' +TestData.paymentTitle);

        //Filling the Payment Details
        payment.billingChkBox.check();
        payment.fillpayment(TestData);
        payment.purchaseNow.click();
        expect(browser.getTitle()).toEqual(TestData.receiptTitle, 'Verify "Receipt" Page is displayed and the Tilte is Equal as' +TestData.receiptTitle);

        //Verify the Receipt page Content Data
        var plansummary = TestData.planSummary;
        receipt.planSummary.click();
        receipt.applicationNumber.getText().then(function(appicationNumber) {
            console.log("Application Number == " + appicationNumber);
            var apNumber = appicationNumber;
            console.log('appicationNumber=====' + apNumber);
        })
        expect(receipt.getPlanSummaryByKey('Deductible per calendar year per person').getText()).toEqual(plansummary.Deductible_per_calendar, 'Verify "Deductable value" field under Plansummary is same as: ' +plansummary.Deductible_per_calendar);
        expect(receipt.getPlanSummaryByKey('Maximum per calendar year per person').getText()).toEqual(plansummary.Max_per_calendar, 'Verify Max Per "Calendar value" under Plan summary is same as: ' +plansummary.Max_per_calendar);
        expect(receipt.getPlanSummaryByKey('Office visit').getText()).toEqual(plansummary.Officevisit,'Verify "Officevisit field value under Plan summary is same as: ' +plansummary.Officevisit);
        expect(receipt.getPlanSummaryByKey('Exams').getText()).toEqual(plansummary.Exams,'Verify "Exams value" under Plan summary is same as: ' +plansummary.Exams);
        expect(receipt.getPlanSummaryByKey('X-rays').getText()).toEqual(plansummary.Xrays,'Verify "Xrays" value under Plan summary is same as: ' +plansummary.Xrays);
        expect(receipt.getPlanSummaryByKey('Cleanings').getText()).toEqual(plansummary.Cleanings,'Verify "Cleanings" field value under plan summary is same as: ' +plansummary.Cleanings);
        expect(receipt.getPlanSummaryByKey('Fillings').getText()).toEqual(plansummary.Fillings,'Verify "Fillings" field value under plan summary is same as: ' +plansummary.Fillings);
        expect(receipt.getPlanSummaryByKey('Root canals').getText()).toEqual(plansummary.Rootcanals,'Verify "Rootcanals" field value under plan summary is same as: ' +plansummary.Rootcanals);
        expect(receipt.getPlanSummaryByKey('Gum treatment').getText()).toEqual(plansummary.Gumtreatment,'Verify "Gumtreatment" field value under plan summary is same as: ' +plansummary.Gumtreatment);
        expect(receipt.getPlanSummaryByKey('Extractions').getText()).toEqual(plansummary.Extractions,'Verify "Extractions" field value under plan summary is same as: ' +plansummary.Extractions);
        expect(receipt.getPlanSummaryByKey('Denture repair').getText()).toEqual(plansummary.Denturerepair,'Verify "Denturerepair" field value under plan summary is same as: ' +plansummary.Denturerepair);
        expect(receipt.getPlanSummaryByKey('Crowns').getText()).toEqual(plansummary.Crowns,'Verify "Crowns" field value under plan summary is same as: ' +plansummary.Crowns);
        expect(receipt.getPlanSummaryByKey('Orthodontics').getText()).toEqual(plansummary.Orthodontics,'Verify "Orthodontics" field value under plan summary is same as: ' +plansummary.Orthodontics);

    });

    // });

});