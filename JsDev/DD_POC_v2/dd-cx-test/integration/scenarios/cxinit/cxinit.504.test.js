/*CXINIT-504 Broker Validation*/

var TestData = require("../../testData/cxinit/cxinit.504.json");
var perInfo = new(require('../../pageObjects/cxinit/perInfo-page.js'));
var enrollPage = new(require('../../businessComponents/homePage.js'));


describe('CXINIT-501: Broker Validation-PersInfo', function() {

    beforeAll(function() {
		console.log('cxinit 504');
        Utility.openApplication('');
    });

    // Fill the Enroll page with valid data and verify the navigation
    it('Step-1: should complete the Enroll Page', function() {
        enrollPage.enterHomePageDetails(TestData.enrollData);
        expect(perInfo.fieldFirstName.isPresentAndDisplayed()).toBeTruthy();
    });
    // Verify the Broker fields are displayed
    it('Step-2:Validate all fields are present and displayed', function() {
        expect(perInfo.RadBtnBrokerNo.isPresentAndDisplayed()).toBeTruthy();
        expect(perInfo.RadBtnBrokerYes.isPresentAndDisplayed()).toBeTruthy();
        perInfo.fieldEmailAddr.setText('');
        expect(perInfo.hiddenfieldBrokerNum.isPresentAndDisplayed()).toBeFalsy();
        perInfo.RadBtnBrokerYes.select();
        expect(perInfo.hiddenfieldBrokerNum.isPresentAndDisplayed()).toBeTruthy();
        expect(perInfo.whatIsThis.isPresentAndDisplayed()).toBeTruthy();
    });
    // Verify the Broker field Help Text
    it('Step-3:Validate by selecting WhatisThis_Broker the helptext has to be display and viceversa', function() {
        perInfo.hiddenfieldBrokerNum.setText('');
        perInfo.whatIsThis.click();
        expect(perInfo.brokerHelpText.getText()).toContain(TestData.brokerHelpText);
        perInfo.whatIsThis.click();
        browser.sleep(5000);
        expect(perInfo.brokerHelpText.isPresentAndDisplayed()).toBeFalsy();
    });

    //Verify the Broker field with set of Data
    dataProvider(TestData.Broker_TestData, function(data, description) {
        if (data.ExecutionFlag) {
            it('Validate Broker field with value :- "' + data.Broker + '"', function() {
                perInfo.hiddenfieldBrokerNum.setText(data.Broker + '\t');
                expect(perInfo.hiddenbrokerName.isPresentAndDisplayed()).toBeTruthy();
                expect(perInfo.hiddenbrokerName.getValue()).toContain(data.BrokerName);
            });
            it('Validate by selecting No the Broker Number text box has to be Disappear', function() {
                perInfo.RadBtnBrokerNo.select();
                expect(perInfo.hiddenfieldBrokerNum.isPresentAndDisplayed()).toBeFalsy();
            });
        };
    });

});
