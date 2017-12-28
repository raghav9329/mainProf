/*AARP-504 Broker Validation*/

var TestData = require('../../testData/'+testDataEnv+'/aarphmo/aarphmo.504.json');
var perInfo = new(require('../../pageObjects/cxinit/perInfo-page.js'));
var enrollPage = new(require('../../pageObjects/cxinit/enroll-page.js'));


describe('AARPHMO:504: Broker Validation-PersInfo', function() {

    beforeAll(function() {
        console.log('cxinit 504');
        Utility.openApplication('','AARP');
    });
    beforeEach(function () {
        jasmine.addMatchers(custommatcher.customMatchers);
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
        Utility.scrollToBottom();
        expect(perInfo.hiddenfieldBrokerNum.isPresentAndDisplayed()).toBeFalsy();
        perInfo.RadBtnBrokerYes.select();
        perInfo.RadBtnBrokerYes.select();
        expect(perInfo.hiddenfieldBrokerNum.isPresentAndDisplayed()).toBeTruthy();
        expect(perInfo.referralSource.isPresentAndDisplayed()).toBeTruthy();
                
    });
 


    //Verify the Broker field with set of Data
    dataProvider(TestData.Broker_TestData, function(data, description) {
        if (data.ExecutionFlag) {
            it('Validate Broker field with value :- "' + data.Broker + '"', function() {
                perInfo.hiddenfieldBrokerNum.setText(data.Broker);
                //The expect condition will failed because of Mock Data.
                expect(perInfo.hiddenbrokerName.getValue()).toContain(data.BrokerName);

            });
        };
    });
    it('Validate by selecting No the Broker Number text box has to be Disappear', function() {
        perInfo.RadBtnBrokerNo.select();
        expect(perInfo.hiddenfieldBrokerNum.isPresentAndDisplayed()).toBeFalsy();
    });

    it('Validate by selecting No the Broker Number text box has to be Disappear', function() {
        perInfo.RadBtnBrokerNo.select();
        expect(perInfo.hiddenfieldBrokerNum.isPresentAndDisplayed()).toBeFalsy();
    });

    dataProvider(TestData.ReferralSource, function(data, description) {
        if (data.ExecutionFlag) {
            it('Eval Referral Source value "' + data.Referral + '"', function() {
                if (data.Referral.length > 1) {

                    perInfo.referralSource.selectByText(data.Referral);
                }
                perInfo.next.click();
                browser.sleep(minWait);
                browser.executeScript('window.scrollTo(0,0);');
            });
        
        };
    });  

});
