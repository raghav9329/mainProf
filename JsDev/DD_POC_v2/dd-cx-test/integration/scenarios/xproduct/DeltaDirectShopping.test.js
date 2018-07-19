/*To run this spec update config file with below 

1. Base url in params section 
baseUrl: 'https://aw-lx0176.deltadev.ent:3001/shopping/aarp/test',

2. isExecutionFromUI = false; in onprepare section*/

var shopping = new(require('../../pageObjects/cxinit/shopping-page.js'));
var planOptions = new(require('../../pageObjects/cxinit/plan-options-page.js'));
var planDetails = new(require('../../pageObjects/cxinit/plan-details-page.js'));
var perInfo = new(require('../../pageObjects/cxinit/perInfo-page.js'));
var marketPage = require('../../pageObjects/cxinit/aarp-market-page.js');

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

    dataProvider(TestData.states, function(data, description) {
        it('step1:', function() {
            shopping.Zipcode.setText(data.zipcode);
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
            expect(shopping.NoOFCovered_getAQuote.getAttribute('value')).toEqual('15');
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
            shopping.Zipcode.setText(data.zipcode);
            var d = TestData.dob;
            var datesplit = (d.split('-'))
            console.log(datesplit);
            shopping.fieldBdMM.setText(datesplit[0]);
            shopping.fieldBdDD.setText(datesplit[1]);
            shopping.fieldBdYyyy.setText(datesplit[2]);
            shopping.fieldBdMM.setText(datesplit[0]);
            shopping.addDependentDob('Dependent1', '', TestData.dob, true);
            shopping.Showplans.click();
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
            shopping.Zipcode.setText(TestData.IncompleteZipcode+ '\t');
            expect(shopping.Zipcode_error.getText()).toEqual(TestData.incompleteZipcodeerror);
            shopping.Zipcode_error.click();
            shopping.Zipcode.setText(TestData.InvalidZipcode);
            shopping.Showplans.click();
            expect(shopping.serverErrMsgInvalidZipcode.getText()).toEqual(TestData.invalidZiperror);
            shopping.Zipcode.setText(data.zipcode);
            shopping.Showplans.click();
            expect(planOptions.isAt()).toEqual(true);
        });

        it('step6: Verify tabin/tabout Date field validations : ', function() {
            expect(shopping.Zipcode.isPresentAndDisplayed()).toBeTruthy();
            shopping.Zipcode.setText(data.zipcode);
            shopping.fieldBdMM.setText('\t');
            expect(shopping.appErrorMsgs.getText()).toContain(TestData.dateErrorMsg);
            shopping.fieldBdDD.setText('\t');
            expect(shopping.appErrorMsgs.getText()).toContain(TestData.monthErrorMsg);
            shopping.fieldBdYyyy.setText('\t');
            expect(shopping.appErrorMsgs.getText()).toContain(TestData.yearErrorMsg);
            var d = TestData.dob;
            var datesplit = (d.split('-'))
            console.log(datesplit);
            shopping.fieldBdMM.setText(datesplit[0]);
            shopping.fieldBdDD.setText(datesplit[1]);
            shopping.fieldBdYyyy.setText(datesplit[2]);
            shopping.fieldBdMM.setText(datesplit[0]);
            expect(shopping.appErrorMsgs.getText()).toEqual('');
            var d = TestData.dobLeapYear;
            var datesplit = (d.split('-'))
            console.log(datesplit);
            shopping.fieldBdMM.setText(datesplit[0]);
            shopping.fieldBdDD.setText(datesplit[1]);
            shopping.fieldBdYyyy.setText(datesplit[2]);
            shopping.fieldBdMM.setText(datesplit[0]);
            expect(shopping.appErrorMsgs.getText()).toEqual('');
            shopping.Showplans.click();
            expect(planOptions.isAt()).toEqual(true);
        });
    });
});
