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


// var TestData = require('../../testData/'+testDataEnv+'/personalInfo.json');
var TestData = require('../../testData/'+testDataEnv+'/dhmo/temp/cxinit.507C.json');
var perInfo = new(require('../../pageObjects/perInfo-page.js'));
var homePage = new(require('../../pageObjects/home-page.js'));

describe('Verify and Validate Personal Info Page', function() {
    it('should be able to open Login page and verify', function() {

        Utility.openApplication('');

        // homePage.GetQuote.click();
        // homePage.ZIPCode.setText(TestData.ZIPcode);
        // homePage.DOB.setText(TestData.DOB_HOME);
        // homePage.Go.click();
        // homePage.Enroll.click();

        //homePage.Submit.click();
        browser.driver.findElement(by.name('noOfCovered')).sendKeys('').then(function() {
            browser.sleep(2000);
            browser.actions().sendKeys(protractor.Key.ENTER).perform();
            browser.sleep(5000)

            return true;
        })
        expect(perInfo.fieldFirstName.isPresentAndDisplayed()).toBeTruthy();

    });
    it('Validate all fields are present and displayed', function() {
        expect(perInfo.fieldFirstName.isPresentAndDisplayed()).toBeTruthy();
        expect(perInfo.fieldMidInitial.isPresentAndDisplayed()).toBeTruthy();
        expect(perInfo.fieldLastName.isPresentAndDisplayed()).toBeTruthy();
        expect(perInfo.fieldGenderSelect.isPresentAndDisplayed()).toBeTruthy();
        expect(perInfo.fieldBdMM.isPresentAndDisplayed()).toBeTruthy();
        expect(perInfo.fieldBdDD.isPresentAndDisplayed()).toBeTruthy();
        expect(perInfo.fieldBdMM.isPresentAndDisplayed()).toBeTruthy();
        expect(perInfo.fieldBdYyyy.isPresentAndDisplayed()).toBeTruthy();
        expect(perInfo.fieldSsn.isPresentAndDisplayed()).toBeTruthy();
        expect(perInfo.fieldAlternateId.isPresentAndDisplayed()).toBeTruthy();
        expect(perInfo.Next.isPresentAndDisplayed()).toBeTruthy();
    });


    //Validating First Name field with multiple datasets
    //Refer FName_TestData dataset in test data file 
    // dataProvider will iterate the following it block based on number of datasets and organised through execution Flag(True/False).
    dataProvider(TestData.Personalinfo.FName_TestData, function(data, description) {
        if (data.ExecutionFlag) {
            it('Validate First Name field with value :- "' + data.FName + '"', function() {
                perInfo.fieldFirstName.setText(data.FName);
                //perInfo.Next.click();
                perInfo.fieldMidInitial.setText('');
                expect(perInfo.errMsgFirstName.getText()).toEqual(data.ErrorMsg);
                expect(perInfo.fieldFirstName.getAttribute("class")).toContain(data.ariainvalid);
            });
        };
    });
    it('Validate First Name field with value :- "' + TestData.Personalinfo.FName_TestData.FName_Name14[0].FName + '"', function() {
        perInfo.fieldFirstName.setText(TestData.Personalinfo.FName_TestData.FName_Name14[0].FName);
        perInfo.Next.click();
        expect(perInfo.errMsgFirstName.getText()).toEqual(TestData.Personalinfo.FName_TestData.FName_Name14[0].ErrorMsg);
        expect(perInfo.fieldFirstName.getAttribute("class")).toContain(TestData.Personalinfo.FName_TestData.FName_Name14[0].ariainvalid);
        browser.sleep(3000);
        browser.executeScript('window.scrollTo(0,0);');
        browser.sleep(3000);
        perInfo.errMsgFirstName.click();
        browser.sleep(6000);
        expect(perInfo.fieldFirstName.getAttribute("class")).not.toContain(TestData.Personalinfo.FName_TestData.FName_Name14[0].ariainvalid);

    });


    dataProvider(TestData.Personalinfo.MI, function(data, description) {
        if (data.ExecutionFlag) {
            it('Validate Middle Initial field with value "' + data.MI + '"', function() {
                perInfo.fieldMidInitial.setText(data.MI);
                perInfo.Next.click();
                expect(perInfo.fieldMidInitial.getValue()).toEqual(data.Expected);
                expect(perInfo.fieldMidInitial.getAttribute("class")).toContain(data.ariainvalid)
            });
        };
    });



    //Validating Last Name field with multiple datasets   
    dataProvider(TestData.Personalinfo.LName_TestData, function(data, description) {
        if (data.ExecutionFlag) {
            it('Validate Last Name field with value "' + data.LName + '"', function() {
                perInfo.fieldLastName.setText(data.LName);
                perInfo.Next.click();
                expect(perInfo.errMsgLastName.getText()).toEqual(data.ErrorMsg);
                expect(perInfo.fieldLastName.getAttribute("class")).toContain(data.ariainvalid);
            });
        };
    });
    it('Validate First Name field with value :- "' + TestData.Personalinfo.LName_TestData.LName_Name14[0].LName + '"', function() {
        perInfo.fieldLastName.setText(TestData.Personalinfo.LName_TestData.LName_Name14[0].LName);
        perInfo.Next.click();
        expect(perInfo.errMsgLastName.getText()).toEqual(TestData.Personalinfo.LName_TestData.LName_Name14[0].ErrorMsg);
        expect(perInfo.fieldLastName.getAttribute("class")).toContain(TestData.Personalinfo.LName_TestData.LName_Name14[0].ariainvalid);
        browser.sleep(3000);
        browser.executeScript('window.scrollTo(0,0);');
        browser.sleep(3000);
        perInfo.errMsgLastName.click();
        browser.sleep(6000);
        expect(perInfo.fieldLastName.getAttribute("class")).not.toContain(TestData.Personalinfo.LName_TestData.LName_Name14[0].ariainvalid);

    });


    //Validating Last Gender field with multiple datasets
    dataProvider(TestData.Personalinfo.Gender, function(data, description) {
        if (data.ExecutionFlag) {
            it('Validate Gender field with value "' + data.Gender + '"', function() {
                if (data.Gender.length > 1) {
                    perInfo.fieldGenderSelect.selectByText(data.Gender);
                }
                perInfo.Next.click();
                expect(perInfo.errMsgGenderSelect.getText()).toEqual(data.ErrorMsg);
            });
        };
    });


    it('Validate Date field with in invalidvalid Date "' + ' ' + '"', function() {
        perInfo.fieldBdMM.setText('');
        //perInfo.Next.click();
        perInfo.fieldBdDD.setText('');
        expect(perInfo.errMsgBdMM.getText()).toEqual(TestData.ErrorMsg_Month);
        expect(perInfo.fieldBdMM.getAttribute("class")).toContain(TestData.ariainvalid_error);
        perInfo.errMsgBdMM.click();
        expect(perInfo.fieldBdMM.getAttribute("class")).toContain(TestData.ariainvalid_success);

        perInfo.fieldBdDD.setText('');
        // perInfo.Next.click();
        perInfo.fieldBdYyyy.setText('');
        expect(perInfo.errMsgBdDD.getText()).toEqual(TestData.ErrorMsg_Date);
        expect(perInfo.fieldBdDD.getAttribute("class")).toContain(TestData.ariainvalid_error);
        perInfo.errMsgBdDD.click();
        expect(perInfo.fieldBdDD.getAttribute("class")).toContain(TestData.ariainvalid_success);


        perInfo.fieldBdYyyy.setText('');
        perInfo.Next.click();
        if (perInfo.errMsgBdYyyy.isPresentAndDisplayed()) {
            expect(perInfo.errMsgBdYyyy.getText()).toEqual(TestData.ErrorMsg_Year);

            expect(perInfo.fieldBdYyyy.getAttribute("class")).toContain(TestData.ariainvalid_error);
            perInfo.errMsgBdYyyy.click();
            expect(perInfo.fieldBdYyyy.getAttribute("class")).toContain(TestData.ariainvalid_success);
        }

    });

    dataProvider(TestData.Personalinfo.DOB, function(data, description) {
        if (data.ExecutionFlag) {
            it('Validate DOB field with value "' + data.DOB + '"', function() {
                perInfo.fieldBdMM.setText(Utility.getDatePart(data.DOB, 'month'));
                perInfo.fieldBdDD.setText(Utility.getDatePart(data.DOB, 'Date'));
                perInfo.fieldBdYyyy.setText(Utility.getDatePart(data.DOB, 'Year'));
                perInfo.Next.click();
                browser.sleep(2000);
                
                    expect(perInfo.errMsgBdMM.getText()).toEqual(data.ErrorMsg_BirtMonth);
                    expect(perInfo.errMsgBdDD.getText()).toEqual(data.ErrorMsg_BirtDate);
                    expect(perInfo.errMsgBdYyyy.getText()).toEqual(data.ErrorMsg_BirtYear);
                     expect(perInfo.errBirthDate.getText()).toEqual(data.ErrorMsg_Birth);
                    
            
                
            });
        };
    });
    //Validating SSN field with multiple datasets
    //Refer SSN dataset in test data file 
    dataProvider(TestData.Personalinfo.SSN, function(data, description) {
        if (data.ExecutionFlag) {
            it('Validate SSN Field with value "' + data.SSN + '"', function() {
                perInfo.fieldSsn.setText(data.SSN +'\t');
                //perInfo.fieldAlternateId.setText('');
                expect(perInfo.errMsgSsn.getText()).toEqual(data.ErrorMsg);
                expect(perInfo.fieldSsn.getAttribute("class")).toContain(data.ariainvalid);
                if (data.ariainvalid == 'error') {
                    perInfo.errMsgSsn.click();
                    expect(perInfo.fieldSsn.getAttribute("class")).toContain(TestData.ariainvalid_success);
                }
            });
        };
    });
    // Validate Alternate Id field with set of data
    dataProvider(TestData.Personalinfo.AlternateId, function(data, description) {
        if (data.ExecutionFlag) {
            it('Validate AlternateId field with value "' + data.AlternateId + '"', function() {
                perInfo.fieldAlternateId.setText(data.AlternateId);
                perInfo.Next.click();
                expect(perInfo.fieldAlternateId.getValue()).toEqual(data.AlternateId);
                expect(perInfo.fieldAlternateId.getAttribute("class")).toContain(TestData.ariainvalid_success);
            });
        };
    });

});
