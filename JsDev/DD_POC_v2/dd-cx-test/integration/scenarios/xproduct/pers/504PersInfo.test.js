/*CXINIT-504 Broker Validation*/

var TestData   = require('../../../testData/' + testDataEnv + '/dhmo/dhmo.504PersInfo.json');
var perInfo    = new(require('../../../pageObjects/cxinit/perInfo-page.js'));
var enrollPage = new(require('../../../pageObjects/cxinit/enroll-page.js'));
var statesData = require('../../../testData/' + testDataEnv + '/statesAndProducts.json');

//To Navigate Personla Info Page
// dataProvider(TestData.states, function (sData, sdescription) {
dataProvider(statesData.states, function (sData, sdescription) {
    if (states.indexOf(sdescription) != -1) {
        dataProvider(sData.products, function (tData, pdescription) {
            if (product.indexOf(pdescription) != -1) {

                describe('504: Broker Validation-PersInfo: ||State:' + sdescription + '||Product:' + pdescription + '||', function () {

                    beforeAll(function() {
                        console.log('cxinit 504');
                         Utility.openApplication('', tData.product);
                    });
                    beforeEach(function () {
                        jasmine.addMatchers(custommatcher.customMatchers);
                    });

                    // Fill the Enroll page with valid data and verify the navigation
                    it('Step-1: should complete the Enroll Page', function() {
                        enrollPage.enterHomePageDetails(tData.enrollData);
                        expect(perInfo.fieldFirstName.isPresentAndDisplayed()).toBeTruthy('Verifies that user is in personal info page and "First Name" field is displayed');
                    });
                    // Verify the Broker fields are displayed
                    it('Step-2:Validate all fields are present and displayed', function() {
                        expect(perInfo.RadBtnBrokerNo.isPresentAndDisplayed()).toBeTruthy('Verifies that Broker Number radio button is displayed');
                        expect(perInfo.RadBtnBrokerYes.isPresentAndDisplayed()).toBeTruthy('Verifies that Broker Number radio button is displayed');
                        Utility.scrollToBottom();
                        expect(perInfo.hiddenfieldBrokerNum.isPresentAndDisplayed()).toBeFalsy('Verifies that hidden Broker Number field is not displayed');
                        perInfo.RadBtnBrokerYes.select();
                        perInfo.RadBtnBrokerYes.select();
                        expect(perInfo.hiddenfieldBrokerNum.isPresentAndDisplayed()).toBeTruthy('Verifies that hidden Broker Number field is displayed');
                        expect(perInfo.brokerToolTip.isPresentAndDisplayed()).toBeTruthy('Verifies that Broker ToolTip is displayed');
                    });
                    // Verify the Broker field Help Text
                    it('Step-3:Validate by selecting WhatisThis_Broker the helptext has to be display and viceversa', function() {
                        perInfo.hiddenfieldBrokerNum.setText('');
                        perInfo.brokerToolTip.click();
                        expect(perInfo.brokerToolTipText.isPresentAndDisplayed()).toBeTruthy('Verifies that Broker ToolTip is displayed');
                        expect(perInfo.brokerToolTipText.getText()).toContain(TestData.brokerToolTipText,'Verifies that "Broker Tool Tip" text should be '+TestData.brokerToolTipText);
                        perInfo.brokerToolTip.click();
                        expect(perInfo.brokerToolTipText.isPresentAndDisplayed()).toBeFalsy('Verifies that Broker ToolTip is not displayed');
                    });

                    //Verify the Broker field with set of Data
                    dataProvider(TestData.Broker_TestData, function(data, description) {
                        if (data.ExecutionFlag) {
                            it('Validate Broker field with value :- "' + data.Broker + '"', function() {
                                perInfo.hiddenfieldBrokerNum.setText(data.Broker + '\t');
                                expect(perInfo.hiddenbrokerName.isPresentAndDisplayed()).toBeTruthy('Verifies that "Broker Name field" is displayed');
                                expect(perInfo.hiddenbrokerName.getValue()).toContain(data.BrokerName, 'Verifies that "Broker Name" fieldshould be'+data.BrokerName);
                            });
                        };
                    });
                    it('Validate by selecting No the Broker Number text box has to be Disappear', function() {
                        perInfo.RadBtnBrokerNo.select();
                        expect(perInfo.hiddenfieldBrokerNum.isPresentAndDisplayed()).toBeFalsy('Verifies that hidden Broker Number field is not displayed');
                    });

                });
            }
        });
    }
});
