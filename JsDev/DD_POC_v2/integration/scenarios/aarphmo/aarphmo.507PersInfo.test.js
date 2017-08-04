/*
aarp-507
 
 Testing will Validate all visible fields are displayed / visible
 Testing will Vaiidate all hidden fields are displayable / visible upon command (diff mailing address )
 Testing will validate all are clickable ( maybe even run through the tab order ?? : ) 
 Testing will validate all fields that are intended to take text do so
 TEsting will validate all fields number based take text as numbers

Fields that have been identified and labled in aarp-507
 First Name
 Middle Initial
 Last Name
 Gender ( Selection )
 Birthdate ( mm: dd: yyyy )
 Social Security Number 
 Alternate ID

Test automation for AARP-507 Story Functionally evaluate the fields in the story

Consume the error messages in the property file and validate fields display the proper errors on the correct conditions
 Validate non alpha failures in alpha fields, errors, alerts and warnings
 Validate alpha failures in non alpha fields, errors, alerts and warnings
 Validate Dob logic > 18 , errors, alerts, and warnings
 Validate Leap Year logic, errors, alerts and warnings
 Validate field char max length conditions, errors, alerts and warnings
 Validate malformed yet correct data type entered, errors, alerts and warnings.*/

"use strict"
// var TestData = require("../../testData/personalInfo.json");
var TestData = require("../../testData/aarphmo/aarphmo.507.json");
var perInfo = new(require('../../pageObjects/cxinit/perInfo-page.js'));
var enrollPage = new(require('../../pageObjects/cxinit/enroll-page.js'));




//To Navigate Personla Info Page
describe('AARP-507: PersInfoPg: ', function() {

    beforeAll(function() {
        console.log(' ');
        console.log('--- AARP-507 Personal Info Fields ---')
        Utility.openApplication('','AARP');
    });

    afterAll(function() {
        //browser.quit();
    });

    beforeEach(function() {
        // browser.refresh();
        // using Jquery we are facing the issue because jquery is not integrated with the application inorder to overcome this we have developed waitUntilPageLoaded in common.js
        //browser.executeScript("document.body.style.zoom='75%';");
    	Utility.waitUntilPageLoaded();

        // browser.wait(function() {
        //     return browser.executeScript('return document.readyState==="complete" &&' +
        //         ' jQuery !== undefined && jQuery.active==0;').then(function(text) {
        //         return text === true;
        //     });
        // }, 30000);

    });

    it('507PI 1:should be able to open Login page and verify', function() {
        enrollPage.enterHomePageDetails(TestData.enrollData);     
        expect(perInfo.fieldFirstName.isPresentAndDisplayed()).toBeTruthy();
        console.log('507PI 1: Complete')
    });

    // ***********************************************************************************
    // **  For future consideration.
    // **  This needs to be wrapped in a function that return a true or fale / promise
    // **
    // ***********************************************************************************
    //Verfiying all the fileds are Present/Displayed/Enabled
    it('507PI 2:should show fields are displayed', function() {
        // browser.executeScript("document.body.style.zoom='45%';");
        expect(perInfo.fieldFirstName.isPresentAndDisplayed()).toBeTruthy();
        expect(perInfo.fieldMidInitial.isPresentAndDisplayed()).toBeTruthy();
        expect(perInfo.fieldLastName.isPresentAndDisplayed()).toBeTruthy();
        expect(perInfo.fieldGenderSelect.isPresentAndDisplayed()).toBeTruthy();
        expect(perInfo.fieldBdMM.isPresentAndDisplayed()).toBeTruthy();
        expect(perInfo.fieldBdDD.isPresentAndDisplayed()).toBeTruthy();
        expect(perInfo.fieldBdMM.isPresentAndDisplayed()).toBeTruthy();
        expect(perInfo.fieldBdYyyy.isPresentAndDisplayed()).toBeTruthy();
        expect(perInfo.memberId.isPresentAndDisplayed()).toBeTruthy();
        expect(perInfo.fieldPhoneSelect.isPresentAndDisplayed()).toBeTruthy();
        expect(perInfo.fieldPhoneNumber.isPresentAndDisplayed()).toBeTruthy();
        expect(perInfo.fieldEmailAddr.isPresentAndDisplayed()).toBeTruthy();
        expect(perInfo.next.isPresentAndDisplayed()).toBeTruthy();
        console.log('507PI 2: Complete')
    });

    it('507PI 3:First Name Click in tab-out', function() {
        perInfo.fieldFirstName.setText('');
        perInfo.fieldMidInitial.setText('');
        expect(perInfo.errMsgFirstName.getText()).toEqual(TestData.ErrorMsgBlank_FirstName);
        expect(perInfo.fieldFirstName.getAttribute("class")).toContain(TestData.ariainvalid_error);
        console.log('507PI 3: Complete')
    });

    //////////////////////////////////////////////////
    // Special Case: report success, not error
    // Middle Initial does not error on loose focus
    it('507PI 4:Middle Initial Click in tab-out', function() {
        perInfo.fieldMidInitial.setText(TestData.MI);
        perInfo.fieldLastName.setText('');
        expect(perInfo.fieldMidInitial.getValue()).toEqual(TestData.MI);
        expect(perInfo.fieldMidInitial.getAttribute("class")).toContain(TestData.ariainvalid_success);
        console.log('507PI 4: Complete')
    });

    it('507PI 5:Last Name Click in tab-out', function() {
        perInfo.fieldLastName.setText('');
        perInfo.memberId.setText('');
        expect(perInfo.errMsgLastName.getText()).toEqual(TestData.ErrorMsgBlank_LastName);
        expect(perInfo.fieldLastName.getAttribute("class")).toContain(TestData.ariainvalid_error);
        console.log('507PI 5: Complete')
    });

    it('507PI 6:Gender Click in tab-out', function() {
        perInfo.fieldFirstName.setText(TestData.FName);
        perInfo.fieldMidInitial.setText(TestData.MI);
        perInfo.fieldLastName.setText(TestData.LName);
        perInfo.next.click();
        browser.executeScript('window.scrollTo(0,0);');
        // expect(perInfo.errMsgGenderSelect.getText()).toEqual(TestData.ErrorMsgBlank_Gender);
        console.log('507PI 6: Complete')
    });

    it('507PI 7:Member ID Click in tab-out', function() {
        perInfo.memberId.setText('');
        perInfo.fieldHomeAddr.setText('');
        expect(perInfo.errMsgMemberId.getText()).toEqual(TestData.ErrorMsgBlank_MemberID);
        expect(perInfo.memberId.getAttribute("class")).toContain(TestData.ariainvalid_error);
        console.log('507PI 7: Complete')
    });


    //Validating First Name field with multiple datasets
    //Refer FName_TestData dataset in 'aarp.507.json' file
    // dataProvider will iterate the following it block based on number of datasets and organised through execution Flag(True/False).
    dataProvider(TestData.Personalinfo.FName_TestData, function(data, description) {
        if (data.ExecutionFlag) {
            it('Eval FName value :- "' + data.FName + '"', function() {
                perInfo.fieldFirstName.setText(data.FName);
                perInfo.fieldMidInitial.setText('');
                expect(perInfo.errMsgFirstName.getText()).toEqual(data.ErrorMsg);
                browser.executeScript('window.scrollTo(0,0);');
                browser.sleep(minWait);
                expect(perInfo.fieldFirstName.getAttribute("class")).toContain(data.ariainvalid);
                console.log('json driven "' + data.FName + '" complete')
            });
    
        };
    }); 

    //BY clicking on Error Message of First Name Filed, the control should be back on FirstName text box.
    it('Validate Error Msg Click Navigation, FirstName :- "' + TestData.Personalinfo.FName_TestData.FName_Name11[0].FName + '"', function() {
        perInfo.fieldFirstName.setText(TestData.Personalinfo.FName_TestData.FName_Name11[0].FName);
        perInfo.fieldMidInitial.setText('');
        perInfo.errMsgFirstName.click();
        expect(perInfo.fieldFirstName.getAttribute("class")).toContain(TestData.Personalinfo.FName_TestData.FName_Name11[0].ariainvalid);
        perInfo.fieldFirstName.setText(TestData.Personalinfo.FName_TestData.FName_Name13[0].FName);
    });

    //Validating Middle Initial field with multiple datasets
    //Refer Middle Initial dataset in 'aarp.507.json' file
    dataProvider(TestData.Personalinfo.MI, function(data, description) {
        if (data.ExecutionFlag) {
            it('Eval Mid Initial value "' + data.MI + '"', function() {
                perInfo.fieldMidInitial.setText(data.MI);
                perInfo.fieldLastName.setText('');
                expect(perInfo.fieldMidInitial.getValue()).toEqual(data.Expected);
                expect(perInfo.fieldMidInitial.getAttribute("class")).toContain(data.ariainvalid)
            });
        
        };
    }); 



    //Validating Last Name field with multiple datasets 
    //Refer Middle Initial dataset in 'aarp.507.json' file  
    dataProvider(TestData.Personalinfo.LName_TestData, function(data, description) {
        if (data.ExecutionFlag) {
            it('Eval LName value "' + data.LName + '"', function() {
                perInfo.fieldLastName.setText(data.LName);
                perInfo.fieldBdMM.setText('');
                expect(perInfo.errMsgLastName.getText()).toEqual(data.ErrorMsg);
                browser.executeScript('window.scrollTo(0,0);');
                browser.sleep(minWait);
                expect(perInfo.fieldLastName.getAttribute("class")).toContain(data.ariainvalid);
            });
        
        };
    });  

    //BY clicking on Error Message of Last Name Filed, the control should be back on LastName text box.
    //  it('Validate by clicking on LastName Error Message the control should be back to LastName text box :- "' + TestData.Personalinfo.LName_TestData.LName_Name14[0].LName + '"', function() {
    it('Validate Error Msg Click Navigation, LastName :- "' + TestData.Personalinfo.LName_TestData.LName_Name13[0].LName + '"', function() {
        perInfo.fieldLastName.setText(TestData.Personalinfo.LName_TestData.LName_Name13[0].LName);
        perInfo.fieldBdMM.setText('');
        perInfo.errMsgLastName.click();
        expect(perInfo.fieldLastName.getAttribute("class")).toContain(TestData.Personalinfo.LName_TestData.LName_Name13[0].ariainvalid);
        perInfo.fieldLastName.setText(TestData.Personalinfo.LName_TestData.LName_Name14[0].LName);
    });

    //Validating Last Gender field with multiple datasets
    //Refer Gender dataset in 'aarp.507.json' file
    dataProvider(TestData.Personalinfo.Gender, function(data, description) {
        if (data.ExecutionFlag) {
            it('Eval Gender selected value "' + data.Gender + '"', function() {
                if (data.Gender.length > 1) {

                    perInfo.fieldGenderSelect.selectByText(data.Gender);
                }
                perInfo.next.click();
                browser.sleep(minWait);
                // expect(perInfo.errMsgGenderSelect.getText()).toEqual(data.ErrorMsg);
                browser.executeScript('window.scrollTo(0,0);');

            });
        
        };
    });  


    //To understand regading DOB is decreasing or increasing based on the System date, we have hardcoded testdata.
    //it('Validating  the DOB field substracting 18years and 1 date for user bday', function() {
    it('Validate Today is users Birthday ', function() {
        perInfo.fieldBdMM.setText(Utility.getDatePart(Utility.getfullDate('year', 'SUB', 18), 'MONTH'));
        perInfo.fieldBdDD.setText(Utility.getDatePart(Utility.getfullDate('date', 'SUB', 1, (Utility.getfullDate('year', 'SUB', 18))), 'date'))
        perInfo.fieldBdYyyy.setText(Utility.getDatePart(Utility.getfullDate('year', 'SUB', 18), 'YEAR'));
        perInfo.memberId.setText('');
        expect(perInfo.fieldBdMM.getAttribute("class")).toContain(TestData.ariainvalid_success);
        expect(perInfo.fieldBdDD.getAttribute("class")).toContain(TestData.ariainvalid_success);
        expect(perInfo.fieldBdYyyy.getAttribute("class")).toContain(TestData.ariainvalid_success);

        // ??????
        // can we put in the following call and get it to successfully see a NULL value ( meaning no error Msg )
        // expect(perInfo.errMsgBdYyyy.getText()).toEqual('');  ????   Seems like this should work
        // If not exactly this, maybe we can check on the a null error message holder 
        // I'd like to try something like that...

    });

    //it('Validating  the DOB field substracting 18years adding 1 Date for the same', function() {
    it('Validating Tomorrow is the users Birthday ', function() {
        var tommorwdate = Utility.getfullDate('date', 'ADD', 1);
        perInfo.fieldBdMM.setText(Utility.getDatePart(tommorwdate, 'MONTH'));
        perInfo.fieldBdDD.setText(Utility.getDatePart(tommorwdate, 'DATE'));
        perInfo.fieldBdYyyy.setText(Utility.getDatePart(Utility.getfullDate('year', 'SUB', 18), 'YEAR'));
        // perInfo.fieldBdMM.setText(Utility.getDatePart(Utility.getfullDate('year', 'SUB', 18), 'MONTH'));
        // perInfo.fieldBdDD.setText(Utility.getDatePart(Utility.getfullDate('date', 'ADD', 2, (Utility.getfullDate('year', 'SUB', 18))), 'date'))
        // perInfo.fieldBdYyyy.setText(Utility.getDatePart(Utility.getfullDate('year', 'SUB', 18), 'YEAR'));
        perInfo.memberId.setText('');
        expect(perInfo.errMsgBdYyyy.getText()).toEqual('You must be at least 18 years of age.');
    });

    //it('Validate the DOB field lessthan 18 years adding 1 month', function() {
    it('Validate Next month is Users Birthday ', function() {
        perInfo.fieldBdMM.setText(Utility.getDatePart(Utility.getfullDate('month', 'ADD', 1, (Utility.getfullDate('year', 'SUB', 18))), 'MONTH'))
        perInfo.fieldBdDD.setText(Utility.getDatePart('', 'DATE'));
        perInfo.fieldBdYyyy.setText(Utility.getDatePart(Utility.getfullDate('month', 'ADD', 0, (Utility.getfullDate('year', 'SUB', 18))), 'YEAR'));
        perInfo.memberId.setText('');
        expect(perInfo.errMsgBdYyyy.getText()).toEqual('You must be at least 18 years of age.');
    });

    //it('Validate the DOB field meets 18 years, Substracting 1 month', function() {
    it('Validate Last Month was Users Birthday ', function() {
        perInfo.fieldBdMM.setText(Utility.getDatePart(Utility.getfullDate('month', 'SUB', 1, (Utility.getfullDate('year', 'SUB', 18))), 'MONTH'))
        perInfo.fieldBdDD.setText(Utility.getDatePart('', 'DATE'));
        perInfo.fieldBdYyyy.setText(Utility.getDatePart(Utility.getfullDate('month', 'ADD', 0, (Utility.getfullDate('year', 'SUB', 18))), 'YEAR'));
        perInfo.memberId.setText('');
        expect(perInfo.fieldBdMM.getAttribute("class")).toContain(TestData.ariainvalid_success);
        expect(perInfo.fieldBdDD.getAttribute("class")).toContain(TestData.ariainvalid_success);
        expect(perInfo.fieldBdYyyy.getAttribute("class")).toContain(TestData.ariainvalid_success);

        // ??????
        // can we put in the following call and get it to successfully see a NULL value ( meaning no error Msg )
        // expect(perInfo.errMsgBdYyyy.getText()).toEqual('');  ????   Seems like this should work
        // If not exactly this, maybe we can check on the a null error message holder 
        // I'd like to try something like that...
    });

    //it('Validate the DOB field lessthan 18 years adding 1 year', function() {
    it('Validate Next Year the user will be 18 ', function() {
        perInfo.fieldBdMM.setText(Utility.getDatePart(Utility.getfullDate('month', 'ADD', 0, (Utility.getfullDate('year', 'SUB', 18))), 'MONTH'))
        perInfo.fieldBdDD.setText(Utility.getDatePart('', 'DATE'));
        perInfo.fieldBdYyyy.setText(Utility.getDatePart(Utility.getfullDate('year', 'ADD', 1, (Utility.getfullDate('year', 'SUB', 18))), 'YEAR'));
        perInfo.memberId.setText('');
        expect(perInfo.errMsgBdYyyy.getText()).toEqual('You must be at least 18 years of age.');

    });

    //it('Validate the DOB field meets 18 years, Substracting 1 Year', function() {
    it('Validate Users 19th Birthday ', function() {
        perInfo.fieldBdMM.setText(Utility.getDatePart(Utility.getfullDate('month', 'SUB', 0, (Utility.getfullDate('year', 'SUB', 18))), 'MONTH'))
        perInfo.fieldBdDD.setText(Utility.getDatePart('', 'DATE'));
        perInfo.fieldBdYyyy.setText(Utility.getDatePart(Utility.getfullDate('year', 'SUB', 1, (Utility.getfullDate('year', 'SUB', 18))), 'YEAR'));
        perInfo.memberId.setText('');
        expect(perInfo.fieldBdMM.getAttribute("class")).toContain(TestData.ariainvalid_success);
        expect(perInfo.fieldBdDD.getAttribute("class")).toContain(TestData.ariainvalid_success);
        expect(perInfo.fieldBdYyyy.getAttribute("class")).toContain(TestData.ariainvalid_success);

        // ??????
        // can we put in the following call and get it to successfully see a NULL value ( meaning no error Msg )
        // expect(perInfo.errMsgBdYyyy.getText()).toEqual('');  ????   Seems like this should work
        // If not exactly this, maybe we can check on the a null error message holder 
        // I'd like to try something like that...
    });



    dataProvider(TestData.Personalinfo.DOB_invalid, function(data, description) {
        if (data.ExecutionFlag) {
            it('Validate the DOB field Invalid Leap Year"' + data.Leapyear + '"', function() {
                var d = data.Leapyear;
                var datesplit = (d.split('-'))
                perInfo.fieldBdMM.setText(datesplit[0]);
                perInfo.fieldBdDD.setText(datesplit[1]);
                perInfo.fieldBdYyyy.setText(datesplit[2]);
                perInfo.memberId.setText('');
                expect(perInfo.birthdateerror.getText()).toContain(data.ErrorMsg);

            });
        };
    });

    dataProvider(TestData.Personalinfo.DOB_invalidYear, function(data, description) {
        if (data.ExecutionFlag) {
            it('Validate the DOB field Invalid Leap Year"' + data.Leapyear + '"', function() {
                var d = data.Leapyear;
                var datesplit = (d.split('-'))
                perInfo.fieldBdMM.setText(datesplit[0]);
                perInfo.fieldBdDD.setText(datesplit[1]);
                perInfo.fieldBdYyyy.setText(datesplit[2]);
                perInfo.memberId.setText('');
                expect(perInfo.errMsgBdYyyy.getText()).toContain(data.ErrorMsg);
                expect(perInfo.birthdateerror.getText()).toContain(data.ErrorMsg2);

            });
        };
    });

    dataProvider(TestData.Personalinfo.DOB_invalidYear_futuredate, function(data, description) {
        if (data.ExecutionFlag) {
            it('Validate the DOB field Invalid Leap Year"' + data.Leapyear + '"', function() {
                var d = data.Leapyear;
                var datesplit = (d.split('-'))
                perInfo.fieldBdMM.setText(datesplit[0]);
                perInfo.fieldBdDD.setText(datesplit[1]);
                perInfo.fieldBdYyyy.setText(datesplit[2]);
                perInfo.memberId.setText('');
                expect(perInfo.errMsgBdYyyy.getText()).toContain(data.ErrorMsg);

            });
        };
    });
    dataProvider(TestData.Personalinfo.DOB_valid, function(data, description) {
        if (data.ExecutionFlag) {
            it('Validate the DOB field meets Leap year with value"' + data.Leapyear + '"', function() {
                var d = data.Leapyear;
                var datesplit = (d.split('-'))
                perInfo.fieldBdMM.setText(datesplit[0]);
                perInfo.fieldBdDD.setText(datesplit[1]);
                perInfo.fieldBdYyyy.setText(datesplit[2]);
                perInfo.memberId.setText('');
                expect(perInfo.fieldBdMM.getAttribute("class")).toContain(data.ariainvalid);
                expect(perInfo.fieldBdDD.getAttribute("class")).toContain(data.ariainvalid);
                expect(perInfo.fieldBdYyyy.getAttribute("class")).toContain(data.ariainvalid);

            });
        };
    });


    //Validating MemberID field with multiple datasets
    //Refer MemberID dataset in 'aarp.507.json' file 
    dataProvider(TestData.Personalinfo.MemberID, function(data, description) {
        if (data.ExecutionFlag) {
            it('Check MemberID with value "' + data.MemberID + '"', function() {
                perInfo.memberId.setText(data.MemberID);
                perInfo.fieldHomeAddr.setText('');
                expect(perInfo.errMsgMemberId.getText()).toEqual(data.ErrorMsg);
                browser.executeScript('window.scrollTo(0,0);');
                expect(perInfo.memberId.getAttribute("class")).toContain(data.ariainvalid);
            });
        };
    });

    it('Validate Error Msg Click Navigation, MemberID :- "' + TestData.Personalinfo.MemberID.MemberID4[0].MemberID + '"', function() {
        perInfo.memberId.setText(TestData.Personalinfo.MemberID.MemberID4[0].MemberID);
        perInfo.fieldHomeAddr.setText('');
        perInfo.errMsgMemberId.click();
        expect(perInfo.memberId.getAttribute("class")).toContain(TestData.Personalinfo.MemberID.MemberID4[0].ariainvalid);
        perInfo.memberId.setText(TestData.Personalinfo.MemberID.MemberID4[0].MemberID);
    });

        

});
