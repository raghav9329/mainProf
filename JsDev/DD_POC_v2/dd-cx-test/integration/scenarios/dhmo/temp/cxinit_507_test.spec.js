/*
cxinit-507
 
 Testing will Validate all visible fields are displayed / visible
 Testing will Vaiidate all hidden fields are displayable / visible upon command (diff mailing address )
 Testing will validate all are clickable ( maybe even run through the tab order ?? : ) 
 Testing will validate all fields that are intended to take text do so
 TEsting will validate all fields number based take text as numbers

Fields that have been identified and labled in CXINIT-507
 First Name
 Middle Initial
 Last Name
 Gender ( Selection )
 Birthdate ( mm: dd: yyyy )
 Social Security Number 
 Alternate ID

Test automation for CXINIT-507 Story Functionally evaluate the fields in the story

Consume the error messages in the property file and validate fields display the proper errors on the correct conditions
 Validate non alpha failures in alpha fields, errors, alerts and warnings
 Validate alpha failures in non alpha fields, errors, alerts and warnings
 Validate Dob logic > 18 , errors, alerts, and warnings
 Validate Leap Year logic, errors, alerts and warnings
 Validate field char max length conditions, errors, alerts and warnings
 Validate malformed yet correct data type entered, errors, alerts and warnings.*/


var testdata = require('../../testData/'+testDataEnv+'/dhmo/temp/cxinit_507.json');
var homePg = new(require('../../pageObjects/homePgObj.js'));
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
                browserActions.enterText(perInfo.fieldFirstName, data.FName, 'Enter First Name' + data.FName);
                browserActions.click(perInfo.persPageButtonNext, 'Click on Next');
                expect(browserActions.getText(perInfo.errMsgFirstName)).toEqual(data.ErrorMsg);
            });
        };
    });

    dataProvider(testdata.Personalinfo.MI, function(data, description) {
        if (data.ExecutionFlag) {
            it('Validate Middle Initial field with value "' + data.MI + '"', function() {
                browserActions.enterText(perInfo.fieldMidInitial, data.MI, 'Enter Middle Initial' + data.MI);
                browserActions.click(perInfo.persPageButtonNext, 'Click on Next');
                expect(browserActions.getAttributeValue(perInfo.fieldMidInitial, 'value')).toEqual(data.MI);

            });
        };
    });

    //Validating Last Name field with multiple datasets
    //Refer LName dataset in test data file (personalInfo.json)
    dataProvider(testdata.Personalinfo.LName, function(data, description) {
        if (data.ExecutionFlag) {
            it('Validate Last Name field with value "' + data.LName + '"', function() {
                browserActions.enterText(perInfo.fieldLastName, data.LName, 'Enter Last Name' + data.LName);
                browserActions.click(perInfo.persPageButtonNext, 'Click on Next');
                expect(browserActions.getText(perInfo.errMsgLastName)).toEqual(data.ErrorMsg);
            });
        };
    });
    //Validating Last Gender field with multiple datasets
    dataProvider(testdata.Personalinfo.Gender, function(data, description) {
        if (data.ExecutionFlag) {
            it('Validate Gender field with value "' + data.Gender + '"', function() {
                browserActions.selectDropdownbyText(perInfo.fieldGenderSelect, data.Gender, 'Enter Gender' + data.Gender);
                browserActions.click(perInfo.persPageButtonNext, 'Click on Next');
                expect(browserActions.getText(perInfo.errMsgGenderSelect)).toEqual(data.ErrorMsg);
            });
        };
    });


    it('Validate Date field with in invalidvalid Date "' + ' ' + '"', function() {
        browserActions.enterText(perInfo.fieldBdMM, '', 'Enter MM' + '');
        browserActions.click(perInfo.persPageButtonNext, 'Click on Next');
        expect(browserActions.getText(perInfo.errMsgBdMM)).toEqual(testdata.ErrorMsg_Month);
        browserActions.enterText(perInfo.fieldBdDD, '', 'Enter DD' + '');
        browserActions.click(perInfo.persPageButtonNext, 'Click on Next');
        expect(browserActions.getText(perInfo.errMsgBdDD)).toEqual(testdata.ErrorMsg_Date);
        browserActions.enterText(perInfo.fieldBdYyyy, '', 'Enter Year' + '');
        browserActions.click(perInfo.persPageButtonNext, 'Click on Next');
        expect(browserActions.getText(perInfo.errMsgBdYyyy)).toEqual(testdata.ErrorMsg_Year);
    });

    it('Validate Date_Date field with value "' + ' ' + '"', function() {
        browserActions.enterText(perInfo.fieldBdMM, browserActions.getDatePart(testdata.DOB, 'month'), 'Enter MM' + '');
        browserActions.enterText(perInfo.fieldBdDD, browserActions.getDatePart(testdata.DOB, 'Date'), 'Enter DD' + '');
        browserActions.enterText(perInfo.fieldBdYyyy, browserActions.getDatePart(testdata.DOB, 'Year'), 'Enter Year' + '');
        browserActions.click(perInfo.persPageButtonNext, 'Click on Next');
        expect(browserActions.getText(perInfo.errMsgBdMM)).toEqual('');
    });
    it('Validate Dob less than 18 years', function() {
        browserActions.enterText(perInfo.fieldBdMM, browserActions.getDatePart('', 'month'), 'Enter MM' + '');
        browserActions.enterText(perInfo.fieldBdDD, browserActions.getDatePart('', 'Date'), 'Enter DD' + '');
        browserActions.enterText(perInfo.fieldBdYyyy, (browserActions.getDatePart('', 'Year') - 15), 'Enter Year' + '');
        browserActions.click(perInfo.persPageButtonNext, 'Click on Next');
        expect(browserActions.getText(perInfo.errBirthDate)).toEqual(testdata.ErrorMsg_BirtDate);
    });

    it('Validate Dob more than 150 years', function() {

        browserActions.enterText(perInfo.fieldBdMM, browserActions.getDatePart('', 'month'), 'Enter MM' + '');
        browserActions.enterText(perInfo.fieldBdDD, browserActions.getDatePart('', 'Date'), 'Enter DD' + '');
        browserActions.enterText(perInfo.fieldBdYyyy, (browserActions.getDatePart('', 'Year') - 150), 'Enter Year' + '');
        browserActions.click(perInfo.persPageButtonNext, 'Click on Next');
        expect(browserActions.getText(perInfo.errMsgBdYyyy)).toEqual(testdata.ErrorMsg_Year);

    });
    //Validating SSN field with multiple datasets
    //Refer SSN dataset in test data file (personalInfo.json)
    dataProvider(testdata.Personalinfo.SSN, function(data, description) {
        if (data.ExecutionFlag) {
            it('Validate SSN Field with value "' + data.SSN + '"', function() {
                browserActions.enterText(perInfo.fieldSsn, data.SSN, 'Enter SSN' + data.SSN);
                browserActions.click(perInfo.persPageButtonNext, 'Click on Next');
                expect(browserActions.getText(perInfo.errMsgSsn)).toEqual(data.ErrorMsg);
            });
        };
    });

    dataProvider(testdata.Personalinfo.AlternateId, function(data, description) {
        if (data.ExecutionFlag) {
            it('Validate AlternateId field with value "' + data.AlternateId + '"', function() {
                browserActions.enterText(perInfo.fieldAlternateId, data.AlternateId, 'Enter AlternateId' + data.AlternateId);
                browserActions.click(perInfo.persPageButtonNext, 'Click on Next');
                expect(browserActions.getAttributeValue(perInfo.fieldAlternateId, 'value')).toEqual(data.AlternateId);

            });
        };
    });


});
