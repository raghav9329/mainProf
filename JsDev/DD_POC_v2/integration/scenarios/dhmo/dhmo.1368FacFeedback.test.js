var TestData = require("../../testData/dhmo/dhmo.1368FacFeedback.json");
var perInfo = new(require('../../pageObjects/cxinit/perInfo-page.js'));
var depInfo = new(require('../../pageObjects/cxinit/dependent-page.js'));
var facilities = new(require('../../pageObjects/cxinit/facilities-page.js'));
var payment = new(require('../../pageObjects/cxinit/payment-page.js'));
var receipt = new(require('../../pageObjects/cxinit/receipt-page.js'));

var enrollPage = new(require('../../pageObjects/cxinit/enroll-page.js'));
var feedback = new(require('../../pageObjects/cxinit/feedback-page.js'));

describe('CXINIT-1368 Feedback : ', function() {
    // Pre-condition: User navigated to personal info page
    beforeEach(function() {
        Utility.openApplication('','DELTA');
        enrollPage.enterHomePageDetails(TestData.enrollData);
        expect(perInfo.fieldFirstName.isPresentAndDisplayed()).toBeTruthy();
    });

    it('Step-1:Should be provide the feedback in personal info page', function() {
        feedback.feedback.click();
        Utility.switchToFrame(feedback.feedbackFrame());
        expect(feedback.feedbackTitle.getText()).toEqual(TestData.feedbackTitle);
        expect(feedback.questionTitle.getText()).toEqual(TestData.questionTitle);
        feedback.answer.setText('test data');
        feedback.submit.click();
        expect(feedback.thankyouMsg.getText()).toContain(TestData.thankyouMsg);
    });
    // Able to submit feedback withh null- It should be fix
    it('Step-2:Verify the functionality of feedback form with null data', function() {
        feedback.feedback.click();
        Utility.switchToFrame(feedback.feedbackFrame());
        expect(feedback.feedbackTitle.getText()).toEqual(TestData.feedbackTitle);
        expect(feedback.questionTitle.getText()).toEqual(TestData.questionTitle);
        feedback.answer.setText('');
        feedback.submit.click();
        expect(feedback.thankyouMsg.getText()).toContain(TestData.thankyouMsg);
    });
    it('Step-3:Should be provide the feedback in dependent page', function() {
        perInfo.fillPersonalInfo(TestData);
        perInfo.fillAddress(TestData);
        perInfo.phoneNumberemail(TestData);
        perInfo.fillBroker(TestData);
        expect(browser.getTitle()).toEqual(TestData.dependentPageTitle);
        feedback.feedback.click();
        Utility.switchToFrame(feedback.feedbackFrame());
        expect(feedback.feedbackTitle.getText()).toEqual(TestData.feedbackTitle);
        expect(feedback.questionTitle.getText()).toEqual(TestData.questionTitle);
        feedback.answer.setText('test data');
        feedback.submit.click();
        expect(feedback.thankyouMsg.getText()).toContain(TestData.thankyouMsg);
    });
    it('Step-4:Should be provide the feedback infacilities page', function() {
        perInfo.fillPersonalInfo(TestData);
        perInfo.fillAddress(TestData);
        perInfo.phoneNumberemail(TestData);
        perInfo.fillBroker(TestData);
        expect(browser.getTitle()).toEqual(TestData.dependentPageTitle);
        depInfo.next.click();
        feedback.feedback.click();
        Utility.switchToFrame(feedback.feedbackFrame());
        expect(feedback.feedbackTitle.getText()).toEqual(TestData.feedbackTitle);
        expect(feedback.questionTitle.getText()).toEqual(TestData.questionTitle);
        feedback.answer.setText('test data');
        feedback.submit.click();
        expect(feedback.thankyouMsg.getText()).toContain(TestData.thankyouMsg);
    });
    it('Step-5:Should be provide the feedback in payment page', function() {
        perInfo.fillPersonalInfo(TestData);
        perInfo.fillAddress(TestData);
        perInfo.phoneNumberemail(TestData);
        perInfo.fillBroker(TestData);
        expect(browser.getTitle()).toEqual(TestData.dependentPageTitle);
        depInfo.next.click();
        facilities.selectFacility(TestData.facilityoption1);
        facilities.next.click();
        feedback.feedback.click();
        Utility.switchToFrame(feedback.feedbackFrame());
        expect(feedback.feedbackTitle.getText()).toEqual(TestData.feedbackTitle);
        expect(feedback.questionTitle.getText()).toEqual(TestData.questionTitle);
        feedback.answer.setText('test data');
        feedback.submit.click();
        expect(feedback.thankyouMsg.getText()).toContain(TestData.thankyouMsg);
    });


});
