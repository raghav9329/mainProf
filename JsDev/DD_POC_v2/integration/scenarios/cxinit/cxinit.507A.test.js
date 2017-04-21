////////////////////////////////////////////////////////
// As defined at the following location
// https://atlassian/jira/browse/CXINIT-507
//  See Subtask cxinit-510 "Automation testing" for greater detail explaining testing this story
//
// Fields to be tested:
//
// First Name
// Middle Initial
// Last Name
// Gender ( Selection )
// Birthdate ( mm: dd: yyyy )
//  * we need to develop and implement some special testing in this area that checks 
//  * if the user is greater than or equal to 18 years age.  What's special about what
//  * is needed here is an algorithm that looks at the system date and tests values appropriate.
//  * This is the magic cus we need this test to run continuously regardless of the
//  * constantly changing system date.
//  Additionally we need to test some edge case dates. I'll get those and paste somewhere appropriate.
// Social Security Number 
// Alternate ID
//
// spec cxinit.507.test.js
// 
"use strict"
var testdata = require("../../testData/cxinit/cxinit_507.json");
var homePg = new(require('../../pageObjects/home-page.js'));
var perInfo = new(require('../../pageObjects/persInfoPgObj.js'));
var homePage = new(require('../../businessComponents/homePage.js'))

//Created Utility for browser actions(browserActions.js)
describe('Verify and Validate Personal Info Page', function() {
    it('Navigate to Personal Info Page', function() {
        browser.ignoreSynchronization = true;
        browserActions.openApplication('');
        browser.sleep(minWait);
        homePage.enterHomePageDetails(testdata);
        expect(browserActions.isPresentAndDisplayed(perInfo.fieldFirstName)).toBeTruthy();
    });
    it('Validate all fields are present and displayed', function() {
        expect(browserActions.isPresentAndDisplayed(perInfo.fieldFirstName)).toBeTruthy();
        expect(browserActions.isPresentAndDisplayed(perInfo.fieldMidInitial)).toBeTruthy();
        expect(browserActions.isPresentAndDisplayed(perInfo.fieldLastName)).toBeTruthy();
        expect(browserActions.isPresentAndDisplayed(perInfo.fieldGenderSelect)).toBeTruthy();
        expect(browserActions.isPresentAndDisplayed(perInfo.fieldBdMM)).toBeTruthy();
        expect(browserActions.isPresentAndDisplayed(perInfo.fieldBdDD)).toBeTruthy();
        expect(browserActions.isPresentAndDisplayed(perInfo.fieldBdMM)).toBeTruthy();
        expect(browserActions.isPresentAndDisplayed(perInfo.fieldBdYyyy)).toBeTruthy();
        expect(browserActions.isPresentAndDisplayed(perInfo.fieldSsn)).toBeTruthy();
        expect(browserActions.isPresentAndDisplayed(perInfo.fieldAlternateId)).toBeTruthy();
        expect(browserActions.isPresentAndDisplayed(perInfo.persPageButtonNext)).toBeTruthy();
    });


    //Validating First Name field with multiple datasets
    //Refer FName dataset in test data file (personalInfo.json)
    // dataProvider will iterate the following it block based on number of datasets and organised through execution Flag(True/False).
    dataProvider(testdata.Personalinfo.FName, function(data, description) {
        if (data.ExecutionFlag) {
            it('Validate First Name field with value "' + data.FName + '"', function() {
                perInfo.enterFirstName(data.FName);
                perInfo.clickNext();
                expect(perInfo.getFirstNameError()).toEqual(data.ErrorMsg);
            });
        };
    });

    dataProvider(testdata.Personalinfo.MI, function(data, description) {
        if (data.ExecutionFlag) {
            it('Validate Middle Initial field with value "' + data.MI + '"', function() {
                perInfo.enterMiddleName(data.MI);
                perInfo.clickNext();
                expect(browserActions.getAttributeValue(perInfo.fieldMidInitial, 'value')).toEqual(data.MI);

            });
        };
    });

    //Validating Last Name field with multiple datasets
    //Refer LName dataset in test data file (personalInfo.json)
    dataProvider(testdata.Personalinfo.LName, function(data, description) {
        if (data.ExecutionFlag) {
            it('Validate Last Name field with value "' + data.LName + '"', function() {
                perInfo.enterLastName(data.LName);
                perInfo.clickNext();
                expect(perInfo.getLastNameError()).toEqual(data.ErrorMsg);
            });
        };
    });
    //Validating Last Gender field with multiple datasets
    dataProvider(testdata.Personalinfo.Gender, function(data, description) {
        if (data.ExecutionFlag) {
            it('Validate Gender field with value "' + data.Gender + '"', function() {
                perInfo.selectGender(data.Gender);
                perInfo.clickNext();
                expect(perInfo.getErrorMessageGender()).toEqual(data.ErrorMsg);
            });
        };
    });


    it('Validate Date field with in invalidvalid Date "' + ' ' + '"', function() {
        perInfo.enterMonth('');
        perInfo.clickNext();
        expect(perInfo.getErrorMsgMonth()).toEqual(testdata.ErrorMsg_Month);
        perInfo.enterDate('');
        perInfo.clickNext();
        expect(perInfo.getErrorMsgDate()).toEqual(testdata.ErrorMsg_Date);
        perInfo.enterYear('');
        perInfo.clickNext();
        expect(perInfo.getErrorMsgYear()).toEqual(testdata.ErrorMsg_Year);
    });

    it('Validate Date_Date field with value "' + ' ' + '"', function() {
        perInfo.enterMonth(browserActions.getDatePart(testdata.DOB, 'month'));
        perInfo.enterDate(browserActions.getDatePart(testdata.DOB, 'Date'));
        perInfo.enterYear(browserActions.getDatePart(testdata.DOB, 'Year'));
        expect(perInfo.getErrorMsgMonth()).toEqual('');
    });
    it('Validate Dob less than 18 years', function() {
        perInfo.enterMonth(browserActions.getDatePart('', 'month'));
        perInfo.enterDate(browserActions.getDatePart('', 'Date'));
        perInfo.enterYear(browserActions.getDatePart('', 'Year') - 15);
        perInfo.clickNext();
        expect(perInfo.getErrorMsgBirthDate()).toEqual(testdata.ErrorMsg_BirtDate);
    });

    it('Validate Dob more than 150 years', function() {
        perInfo.enterMonth(browserActions.getDatePart('', 'month'));
        perInfo.enterDate(browserActions.getDatePart('', 'Date'));
        perInfo.enterYear(browserActions.getDatePart('', 'Year') - 150);
        perInfo.clickNext();
        expect(perInfo.getErrorMsgYear()).toEqual(testdata.ErrorMsg_Year);

    });
    //Validating SSN field with multiple datasets
    //Refer SSN dataset in test data file (personalInfo.json)
    dataProvider(testdata.Personalinfo.SSN, function(data, description) {
        if (data.ExecutionFlag) {
            it('Validate SSN Field with value "' + data.SSN + '"', function() {
                perInfo.enterSSN(data.SSN);
                perInfo.clickNext();
                expect(perInfo.getErrorMsgSSN()).toEqual(data.ErrorMsg);
            });
        };
    });

    dataProvider(testdata.Personalinfo.AlternateId, function(data, description) {
        if (data.ExecutionFlag) {
            it('Validate AlternateId field with value "' + data.AlternateId + '"', function() {
                perInfo.enterAlternateID(data.AlternateId);
                perInfo.clickNext();
                expect(browserActions.getAttributeValue(perInfo.fieldAlternateId, 'value')).toEqual(data.AlternateId);

            });
        };
    });
});


