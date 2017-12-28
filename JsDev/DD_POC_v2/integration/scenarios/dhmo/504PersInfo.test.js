/*CXINIT-504 Broker Validation*/

var TestData = require('../../testData/' + testDataEnv + '/dhmo/dhmo.504PersInfo.json');
var perInfo = new(require('../../pageObjects/cxinit/perInfo-page.js'));
var enrollPage = new(require('../../pageObjects/cxinit/enroll-page.js'));

var product = ['DHMO'];
// var product = ['DHMO','DPPO','AHMO','APPO']; 
var states = ['CA', 'NY'];

//To Navigate Personal Info Page
dataProvider(TestData.states, function(sData, sdescription) {
    if (states.indexOf(sdescription) != -1) {
        dataProvider(sData.products, function(tData, pdescription) {
            if (product.indexOf(pdescription) != -1) {


                describe('DHMO:504: Broker Validation-PersInfo ' + sdescription + 'Product:' + pdescription + '', function() {

                    beforeAll(function() {
                        console.log('cxinit 504');
                        Utility.openApplication('', 'DELTA');
                    });
                    beforeEach(function () {
                        jasmine.addMatchers(custommatcher.customMatchers);
                    });

                    // Fill the Enroll page with valid data and verify the navigation
                    it('Step-1: should complete the Enroll Page', function() {
                        enrollPage.enterHomePageDetails(tData.enrollData);
                        expect(perInfo.fieldFirstName.isPresentAndDisplayed()).toBeTruthy();
                    });
                    // Verify the Broker fields are displayed
                    it('Step-2:Validate all fields are present and displayed', function() {
                        expect(perInfo.RadBtnBrokerNo.isPresentAndDisplayed()).toBeTruthy();
                        expect(perInfo.RadBtnBrokerYes.isPresentAndDisplayed()).toBeTruthy();
                        Utility.scrollToBottom();
                        expect(perInfo.hiddenfieldBrokerNum.isPresentAndDisplayed()).toBeFalsy();
                        browser.sleep(minWait);
                        perInfo.RadBtnBrokerYes.select();
                        perInfo.RadBtnBrokerYes.select();
                        expect(perInfo.hiddenfieldBrokerNum.isPresentAndDisplayed()).toBeTruthy();
                        expect(perInfo.brokerToolTip.isPresentAndDisplayed()).toBeTruthy();
                    });
                    // Verify the Broker field Help Text
                    it('Step-3:Validate by selecting WhatisThis_Broker the helptext has to be display and viceversa', function() {
                        perInfo.hiddenfieldBrokerNum.setText('');
                        perInfo.brokerToolTip.click();
                        expect(perInfo.brokerToolTipText.isPresentAndDisplayed()).toBeTruthy();
                        expect(perInfo.brokerToolTipText.getText()).toContain(TestData.brokerToolTipText);
                        perInfo.brokerToolTip.click();
                        browser.sleep(minWait);
                        expect(perInfo.brokerToolTipText.isPresentAndDisplayed()).toBeFalsy();
                    });

                    //Verify the Broker field with set of Data
                    dataProvider(TestData.Broker_TestData, function(data, description) {
                        if (data.ExecutionFlag) {
                            it('Validate Broker field with value :- "' + data.Broker + '"', function() {
                                perInfo.hiddenfieldBrokerNum.setText(data.Broker + '\t');
                                expect(perInfo.hiddenbrokerName.getValue()).toContain(data.BrokerName);
                            });
                        };
                    });
                    it('Validate by selecting No the Broker Number text box has to be Disappear', function() {
                        perInfo.RadBtnBrokerNo.select();
                        expect(perInfo.hiddenfieldBrokerNum.isPresentAndDisplayed()).toBeFalsy();
                    });

                });
            }
        });
    }
});
