/*CXINIT-504 Broker Validation*/

var TestData = require("../../testData/cxinit/cxinit.504.json");
var perInfo = new(require('../../pageObjects/perInfo-page.js'));
var homePage = new(require('../../pageObjects/home-page.js'));

describe('Verify and Validate Personal Info Page', function() {

    beforeAll(function() {
        Utility.openApplication('');
    });

    afterAll(function() {
        browser.quit();
    });

    // beforeEach(function() {
    //     browser.refresh();
    // });

    it('should be able to open Login page and verify', function() {
        browser.driver.findElement(by.name('noOfCovered')).sendKeys('').then(function() {
            browser.actions().sendKeys(protractor.Key.ENTER).perform();
            return true;
        })
        expect(perInfo.fieldFirstName.isPresentAndDisplayed()).toBeTruthy();
    });

    it('Validate all fields are present and displayed', function() {
        expect(perInfo.RadBtnBrokerNo.isPresentAndDisplayed()).toBeTruthy();
        expect(perInfo.RadBtnBrokerYes.isPresentAndDisplayed()).toBeTruthy();
        perInfo.fieldEmailAddr.setText('');
        expect(perInfo.hiddenfieldBrokerNum.isPresentAndDisplayed()).toBeFalsy();
        perInfo.RadBtnBrokerYes.select();
        expect(perInfo.hiddenfieldBrokerNum.isPresentAndDisplayed()).toBeTruthy();
        expect(perInfo.whatIsThis.isPresentAndDisplayed()).toBeTruthy();
    });



    it('Validate by selecting WhatisThis_Broker the helptext has to be display and viceversa', function() {
        
        perInfo.hiddenfieldBrokerNum.setText('');
        perInfo.whatIsThis.click();
        expect(perInfo.brokerHelpText.getText()).toContain('your broker to get credit for helping you');
        perInfo.whatIsThis.click();
        browser.sleep(5000);
        expect(perInfo.brokerHelpText.isPresentAndDisplayed()).toBeFalsy();
    });

    dataProvider(TestData.Personalinfo.Broker_TestData, function(data, description) {
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
