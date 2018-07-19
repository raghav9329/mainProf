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

"use strict"
// var TestData = require('../../testData/'+testDataEnv+'/personalInfo.json');
var TestData = require('../../testData/' + testDataEnv + '/dhmo/dhmo.507PersInfoUpdated.json');
var perInfo = new(require('../../pageObjects/cxinit/perInfo-page.js'));
var enrollPage = new(require('../../pageObjects/cxinit/enroll-page.js'));


var product = ['DHMO'];
// var product = ['DHMO','DPPO','AHMO','APPO']; 
var states = ['NY'];

//To Navigate Personal Info Page
dataProvider(TestData.states, function(sData, sdescription) {
    if (states.indexOf(sdescription) != -1) {
        dataProvider(sData.products, function(tData, pdescription) {
            if (product.indexOf(pdescription) != -1) {
                describe('Personal Info Page - All Fields\' Validation for: ' + pdescription + ', ' + sdescription + ' ---> ', function() {
                    beforeAll(function() {
                        console.log(' ');
                        console.log('--- CXINIT-507 Personal Info Fields ---')
                        Utility.openApplication('', tData.product);
                    });
                    beforeEach(function () {
                        jasmine.addMatchers(custommatcher.customMatchers);
                    });

                    afterAll(function() {
                        //browser.quit();
                    });

                    beforeEach(function() {
                        // browser.refresh();
                        // using Jquery we are facing the issue because jquery is not integrated with the application inorder to overcome this we have developed waitUntilPageLoaded in common.js
                        Utility.waitUntilPageLoaded();
                    });

                    it('Should open Login page and validate presence of the text box', function() {
                        enrollPage.enterHomePageDetails(tData.enrollData);
                        expect(perInfo.fieldFirstName.isPresentAndDisplayed()).toBeTruthy();
                        console.log('507PI 1: Complete')
                    });

                    it('Valiadte if all the fields are displayed', function() {
                        expect(perInfo.fieldFirstName.isPresentAndDisplayed()).toBeTruthy();
                        expect(perInfo.fieldMidInitial.isPresentAndDisplayed()).toBeTruthy();
                        expect(perInfo.fieldLastName.isPresentAndDisplayed()).toBeTruthy();
                        expect(perInfo.fieldGenderSelect.isPresentAndDisplayed()).toBeTruthy();
                        expect(perInfo.fieldBdMM.isPresentAndDisplayed()).toBeTruthy();
                        expect(perInfo.fieldBdDD.isPresentAndDisplayed()).toBeTruthy();
                        expect(perInfo.fieldBdMM.isPresentAndDisplayed()).toBeTruthy();
                        expect(perInfo.fieldBdYyyy.isPresentAndDisplayed()).toBeTruthy();
                        if (pdescription == 'DHMO' || pdescription == 'DPPO') expect(perInfo.fieldSsn.isPresentAndDisplayed()).toBeTruthy();
                        if (pdescription == 'DHMO' || pdescription == 'DPPO') expect(perInfo.fieldAlternateId.isPresentAndDisplayed()).toBeTruthy();
                        if (pdescription == 'AHMO' || pdescription == 'APPO') expect(perInfo.memberId.isPresentAndDisplayed()).toBeTruthy();
                        expect(perInfo.fieldPhoneSelect.isPresentAndDisplayed()).toBeTruthy();
                        expect(perInfo.fieldPhoneNumber.isPresentAndDisplayed()).toBeTruthy();
                        expect(perInfo.fieldEmailAddr.isPresentAndDisplayed()).toBeTruthy();
                        expect(perInfo.next.isPresentAndDisplayed()).toBeTruthy();
                        console.log('507PI 2: Complete')
                    });

                    // Grouping all the tests performed on First Name Fields in one describe block
                    describe('First Name Validations', function() {
                        it('Click in text box and tab-out / lose focus', function() {
                            perInfo.fieldFirstName.setText('');
                            perInfo.fieldMidInitial.setText('');
                            expect(perInfo.errMsgFirstName.getText()).toEqual(TestData.ErrorMsgBlank_FirstName);
                            expect(perInfo.fieldFirstName.getAttribute("class")).toContain(TestData.ariainvalid_error);
                            console.log('507PI 3: Complete')
                        });

                        // Validating First Name field with multiple datasets
                        // Refer FName_TestData dataset in 'cxinit.507.json' file
                        // dataProvider will iterate the following it block based on number of datasets and organised through execution Flag(True/False).
                        dataProvider(TestData.FName_TestData, function(data, description) {
                            if (data.ExecutionFlag) {
                                it('Functional Validation with Data: "' + data.FName + '"', function() {
                                    perInfo.fieldFirstName.setText(data.FName);
                                    perInfo.fieldMidInitial.setText('');
                                    expect(perInfo.errMsgFirstName.getText()).toEqual(data.ErrorMsg);
                                    browser.executeScript('window.scrollTo(0,0);');
                                    browser.sleep(minWait);
                                    expect(perInfo.fieldFirstName.getAttribute("class")).toContain(data.ariainvalid);
                                    console.log('507PI 9X json driven "' + data.FName + '" complete')
                                });
                            };
                        });

                        //BY clicking on Error Message of First Name Filed, the control should be back on FirstName text box.
                        it('Validate if clicking on Error Message, takes control back to First Name text box for Invalid Data: "' + TestData.FName_TestData.FName_Name11[0].FName + '"', function() {
                            console.log('507PI 9x: Complete')
                            perInfo.fieldFirstName.setText(TestData.FName_TestData.FName_Name11[0].FName);
                            perInfo.fieldMidInitial.setText('');
                            perInfo.errMsgFirstName.click();
                            expect(perInfo.fieldFirstName.getAttribute("class")).toContain(TestData.FName_TestData.FName_Name11[0].ariainvalid);
                            perInfo.fieldFirstName.setText(TestData.FName_TestData.FName_Name13[0].FName);
                            console.log('507PI 10: Complete')
                        });
                    });

                    // Grouping all the tests performed on Middle Name Field in one describe block
                    describe('Middle Initial Validations', function() {
                        //////////////////////////////////////////////////
                        // Special Case: report success, not error
                        // Middle Initial does not error on loose focus
                        it('Click in text box and tab-out / lose focus', function() {
                            perInfo.fieldMidInitial.setText(TestData.MName);
                            perInfo.fieldLastName.setText('');
                            expect(perInfo.fieldMidInitial.getValue()).toEqual(TestData.MName);
                            expect(perInfo.fieldMidInitial.getAttribute("class")).toContain(TestData.ariainvalid_success);
                            console.log('507PI 4: Complete')
                        });

                        // Validating Middle Initial field with multiple datasets
                        // Refer Middle Initial dataset in 'cxinit.507.json' file
                        dataProvider(TestData.MI, function(data, description) {
                            if (data.ExecutionFlag) {
                                it('Functional Validation with Data: "' + data.MI + '"', function() {
                                    perInfo.fieldMidInitial.setText(data.MI);
                                    perInfo.fieldLastName.setText('');
                                    expect(perInfo.fieldMidInitial.getValue()).toEqual(data.Expected);
                                    expect(perInfo.fieldMidInitial.getAttribute("class")).toContain(data.ariainvalid)
                                    console.log('507PI 11X json driven "' + data.MI + '" complete')
                                });
                            };
                        });

                    });

                    // Grouping all the tests performed on Last Name Fields in one describe block
                    describe('Last Name Validations', function() {
                        it('Click in text box and tab-out / lose focus', function() {
                            perInfo.fieldLastName.setText('');
                            perInfo.fieldHomeAddr.setText('');
                            expect(perInfo.errMsgLastName.getText()).toEqual(TestData.ErrorMsgBlank_LastName);
                            expect(perInfo.fieldLastName.getAttribute("class")).toContain(TestData.ariainvalid_error);
                            console.log('507PI 5: Complete')
                        });

                        //Validating Last Name field with multiple datasets 
                        dataProvider(TestData.LName_TestData, function(data, description) {
                            if (data.ExecutionFlag) {
                                it('Functional Validation with Data: "' + data.LName + '"', function() {
                                    perInfo.fieldLastName.setText(data.LName);
                                    perInfo.fieldBdMM.setText('');
                                    expect(perInfo.errMsgLastName.getText()).toEqual(data.ErrorMsg);
                                    browser.executeScript('window.scrollTo(0,0);');
                                    browser.sleep(minWait);
                                    expect(perInfo.fieldLastName.getAttribute("class")).toContain(data.ariainvalid);
                                    console.log('507PI 12X json driven "' + data.LName + '" complete')
                                });

                            };
                        });

                        //BY clicking on Error Message of Last Name Filed, the control should be back on LastName text box.
                        it('Validate if clicking on Error Message, takes control back to Last Name text box for Invalid Data: "' + TestData.LName_TestData.LName_Name13[0].LName + '"', function() {
                            console.log('507PI 12x: Complete')
                            perInfo.fieldLastName.setText(TestData.LName_TestData.LName_Name13[0].LName);
                            perInfo.fieldBdMM.setText('');
                            perInfo.errMsgLastName.click();
                            expect(perInfo.fieldLastName.getAttribute("class")).toContain(TestData.LName_TestData.LName_Name13[0].ariainvalid);
                            perInfo.fieldLastName.setText(TestData.LName_TestData.LName_Name14[0].LName);
                            console.log('507PI 13: Complete')
                        });
                    });

                    // Grouping all the tests performed on Last Name Fields in one describe block
                    describe('Gender Field Validations', function() {
                        //Validating Last Gender field with multiple datasets
                        //Refer Gender dataset in 'cxinit.507.json' file
                        dataProvider(TestData.Gender, function(data, des) {
                            if (data.ExecutionFlag) {
                                it('Validate selected value "' + data.Gender + '"', function() {
                                    if (data.Gender.length > 1) {
                                        if ((pdescription == 'AHMO' || pdescription == 'APPO') && (des !== 'Gender_NonBinary')) perInfo.fieldGenderSelect.selectByText(data.Gender);
                                    }
                                    perInfo.next.click();
                                    browser.sleep(minWait);
                                    browser.executeScript('window.scrollTo(0,0);');
                                    console.log('507PI 12X json driven "' + data.Gender + '" complete')
                                });

                            };
                        });
                    });

                   // Grouping all the tests performed on Last Name Fields in one describe block
                   describe('DOB Validations', function() { 
                        //To understand regading DOB is decreasing or increasing based on the System date, we have hardcoded testdata.
                        //it('Validating  the DOB field substracting 18years and 1 date for user bday', function() {
                        it('Validating response when user\'s 18th Birthday is Today', function() {
                            console.log('507PI 14x: Complete')
                            perInfo.fieldBdMM.setText(Utility.getDatePart(Utility.getfullDate('year', 'SUB', 18), 'MONTH'));
                            perInfo.fieldBdDD.setText(Utility.getDatePart(Utility.getfullDate('date', 'SUB', 1, (Utility.getfullDate('year', 'SUB', 18))), 'date'))
                            perInfo.fieldBdYyyy.setText(Utility.getDatePart(Utility.getfullDate('year', 'SUB', 18), 'YEAR'));
                            perInfo.fieldHomeAddr.setText('');
                            expect(perInfo.fieldBdMM.getAttribute("class")).toContain(TestData.ariainvalid_success);
                            expect(perInfo.fieldBdDD.getAttribute("class")).toContain(TestData.ariainvalid_success);
                            expect(perInfo.fieldBdYyyy.getAttribute("class")).toContain(TestData.ariainvalid_success);

                            // ??????
                            // can we put in the following call and get it to successfully see a NULL value ( meaning no error Msg )
                            // expect(perInfo.errMsgBdYyyy.getText()).toEqual('');  ????   Seems like this should work
                            // If not exactly this, maybe we can check on the a null error message holder 
                            // I'd like to try something like that...
                            console.log('507PI 15: Complete')
                        });

                        //it('Validating  the DOB field substracting 18years adding 1 Date for the same', function() {
                        it('Validating response when user\'s 18th Birthday is Tomorrow', function() {
                            perInfo.fieldBdMM.setText(Utility.getDatePart(Utility.getfullDate('year', 'SUB', 18), 'MONTH'));
                            perInfo.fieldBdDD.setText(Utility.getDatePart(Utility.getfullDate('date', 'ADD', 1, (Utility.getfullDate('year', 'SUB', 18))), 'date'))
                            perInfo.fieldBdYyyy.setText(Utility.getDatePart(Utility.getfullDate('year', 'SUB', 18), 'YEAR'));
                            perInfo.fieldHomeAddr.setText('');
                            expect(perInfo.errMsgBdYyyy.getText()).toEqual('You must be at least 18 years of age.');
                            console.log('507PI 16: Complete')
                        });

                        //it('Validate the DOB field lessthan 18 years adding 1 month', function() {
                        it('Validating response when user\'s 18th Birthday is Next Month', function() {
                            perInfo.fieldBdMM.setText(Utility.getDatePart(Utility.getfullDate('month', 'ADD', 1, (Utility.getfullDate('year', 'SUB', 18))), 'MONTH'))
                            perInfo.fieldBdDD.setText(Utility.getDatePart('', 'DATE'));
                            perInfo.fieldBdYyyy.setText(Utility.getDatePart(Utility.getfullDate('month', 'ADD', 0, (Utility.getfullDate('year', 'SUB', 0))), 'YEAR'));
                            perInfo.fieldBdDD.click();
                            expect(perInfo.errMsgBdYyyy.getText()).toEqual('You must be at least 18 years of age.');
                            console.log('507PI 17: Complete')
                        });

                        //it('Validate the DOB field meets 18 years, Substracting 1 month', function() {
                        it('Validating response when user\'s 18th Birthday was Last Month', function() {
                            perInfo.fieldBdMM.setText(Utility.getDatePart(Utility.getfullDate('month', 'SUB', 1, (Utility.getfullDate('year', 'SUB', 18))), 'MONTH'))
                            perInfo.fieldBdDD.setText(Utility.getDatePart('', 'DATE'));
                            perInfo.fieldBdYyyy.setText(Utility.getDatePart(Utility.getfullDate('month', 'ADD', 0, (Utility.getfullDate('year', 'SUB', 18))), 'YEAR'));
                            perInfo.fieldHomeAddr.setText('');
                            expect(perInfo.fieldBdMM.getAttribute("class")).toContain(TestData.ariainvalid_success);
                            expect(perInfo.fieldBdDD.getAttribute("class")).toContain(TestData.ariainvalid_success);
                            expect(perInfo.fieldBdYyyy.getAttribute("class")).toContain(TestData.ariainvalid_success);

                            // ??????
                            // can we put in the following call and get it to successfully see a NULL value ( meaning no error Msg )
                            // expect(perInfo.errMsgBdYyyy.getText()).toEqual('');  ????   Seems like this should work
                            // If not exactly this, maybe we can check on the a null error message holder 
                            // I'd like to try something like that...
                            console.log('507PI 18: Complete')
                        });

                        //it('Validate the DOB field lessthan 18 years adding 1 year', function() {
                        it('Validating response when user will be 18 Next Year', function() {
                            perInfo.fieldBdMM.setText(Utility.getDatePart(Utility.getfullDate('month', 'ADD', 0, (Utility.getfullDate('year', 'SUB', 18))), 'MONTH'))
                            perInfo.fieldBdDD.setText(Utility.getDatePart('', 'DATE'));
                            perInfo.fieldBdYyyy.setText(Utility.getDatePart(Utility.getfullDate('year', 'ADD', 1, (Utility.getfullDate('year', 'SUB', 18))), 'YEAR'));
                            perInfo.fieldHomeAddr.setText('');
                            expect(perInfo.errMsgBdYyyy.getText()).toEqual('You must be at least 18 years of age.');
                            console.log('507PI 19: Complete')

                        });

                        //it('Validate the DOB field meets 18 years, Substracting 1 Year', function() {
                        it('Validating resposnse on user\'s 19th Birthday ', function() {
                            perInfo.fieldBdMM.setText(Utility.getDatePart(Utility.getfullDate('month', 'SUB', 0, (Utility.getfullDate('year', 'SUB', 18))), 'MONTH'))
                            perInfo.fieldBdDD.setText(Utility.getDatePart('', 'DATE'));
                            perInfo.fieldBdYyyy.setText(Utility.getDatePart(Utility.getfullDate('year', 'SUB', 1, (Utility.getfullDate('year', 'SUB', 18))), 'YEAR'));
                            perInfo.fieldHomeAddr.setText('');
                            expect(perInfo.fieldBdMM.getAttribute("class")).toContain(TestData.ariainvalid_success);
                            expect(perInfo.fieldBdDD.getAttribute("class")).toContain(TestData.ariainvalid_success);
                            expect(perInfo.fieldBdYyyy.getAttribute("class")).toContain(TestData.ariainvalid_success);

                            // ??????
                            // can we put in the following call and get it to successfully see a NULL value ( meaning no error Msg )
                            // expect(perInfo.errMsgBdYyyy.getText()).toEqual('');  ????   Seems like this should work
                            // If not exactly this, maybe we can check on the a null error message holder 
                            // I'd like to try something like that...
                            console.log('507PI 20: Complete')
                        });



                        dataProvider(TestData.DOB_invalid, function(data, description) {
                            if (data.ExecutionFlag) {
                                it('Validate DOB as 29th February of an Invalid Leap Year: "' + data.Leapyear + '"', function() {
                                    var d = data.Leapyear;
                                    var datesplit = (d.split('-'))
                                    perInfo.fieldBdMM.setText(datesplit[0]);
                                    perInfo.fieldBdDD.setText(datesplit[1]);
                                    perInfo.fieldBdYyyy.setText(datesplit[2]);
                                    perInfo.fieldHomeAddr.setText('');
                                    expect(perInfo.birthdateerror.getText()).toContain(data.ErrorMsg);
                                    console.log('507PI 21X json driven "' + data.Leapyear + '" complete')
                                });

                            };
                        });

                        dataProvider(TestData.DOB_invalidYear, function(data, description) {
                            if (data.ExecutionFlag) {
                                it('Validating a DOB for an Invalid Year (1800s) "' + data.Leapyear + '"', function() {
                                    var d = data.Leapyear;
                                    var datesplit = (d.split('-'))
                                    perInfo.fieldBdMM.setText(datesplit[0]);
                                    perInfo.fieldBdDD.setText(datesplit[1]);
                                    perInfo.fieldBdYyyy.setText(datesplit[2]);
                                    perInfo.fieldHomeAddr.setText('');
                                    expect(perInfo.errMsgYear.getText()).toContain(data.ErrorMsg);
                                    expect(perInfo.birthdateerror.getText()).toContain(data.ErrorMsg2);
                                    console.log('507PI 22X json driven "' + data.Leapyear + '" complete')

                                });

                            };
                        });

                        dataProvider(TestData.DOB_invalidYear_futuredate, function(data, description) {
                            if (data.ExecutionFlag) {
                                it('Validate DOB for a Future Leap Year"' + data.Leapyear + '"', function() {
                                    var d = data.Leapyear;
                                    var datesplit = (d.split('-'))
                                    perInfo.fieldBdMM.setText(datesplit[0]);
                                    perInfo.fieldBdDD.setText(datesplit[1]);
                                    perInfo.fieldBdYyyy.setText(datesplit[2]);
                                    perInfo.fieldHomeAddr.setText('');
                                    expect(perInfo.errMsgBdYyyy.getText()).toContain(data.ErrorMsg);
                                    console.log('507PI 23X json driven "' + data.Leapyear + '" complete')

                                });

                            };
                        });
                        dataProvider(TestData.DOB_valid, function(data, description) {
                            if (data.ExecutionFlag) {
                                it('Validate DOB as 29th February of a valid Leap Year: "' + data.Leapyear + '"', function() {
                                    var d = data.Leapyear;
                                    var datesplit = (d.split('-'))
                                    perInfo.fieldBdMM.setText(datesplit[0]);
                                    perInfo.fieldBdDD.setText(datesplit[1]);
                                    perInfo.fieldBdYyyy.setText(datesplit[2]);
                                    perInfo.fieldHomeAddr.setText('');
                                    expect(perInfo.fieldBdMM.getAttribute("class")).toContain(data.ariainvalid);
                                    expect(perInfo.fieldBdDD.getAttribute("class")).toContain(data.ariainvalid);
                                    expect(perInfo.fieldBdYyyy.getAttribute("class")).toContain(data.ariainvalid);
                                    console.log('507PI 24X json driven "' + data.Leapyear + '" complete')

                                });

                            };
                        });
                   });

                   describe('SSN and Alternate ID field Validations', function() {
                        if (pdescription == 'DHMO' || pdescription == 'DPPO') {
                            it('Click in text box and tab-out / lose focus for SSN', function() {
                                perInfo.fieldSsn.setText('');
                                perInfo.fieldAlternateId.setText('');
                                expect(perInfo.errMsgSsn.getText()).toEqual(TestData.ErrorMsgBlank_SSN);
                                expect(perInfo.fieldSsn.getAttribute("class")).toContain(TestData.ariainvalid_error);
                                console.log('507PI 7: Complete')
                            });

                            //////////////////////////////////////////////////
                            // Special Case: report success, not error
                            it('Click in text box and tab-out / lose focus for Alternate ID', function() {
                                perInfo.fieldAlternateId.setText('');
                                perInfo.fieldFirstName.setText('');
                                expect(perInfo.fieldAlternateId.getAttribute("class")).toContain(TestData.ariainvalid_success);
                                console.log('507PI 8: Complete')
                            });
                        }

                        if (pdescription == 'DHMO' || pdescription == 'DPPO') {
                            //Validating SSN field with multiple datasets
                            //Refer SSN dataset in 'cxinit.507.json' file 
                            dataProvider(TestData.SSN, function(data, description) {
                                if (data.ExecutionFlag) {
                                    it('Functional Validation of SSN field with value: "' + data.SSN + '"', function() {
                                        perInfo.fieldSsn.setText(data.SSN);
                                        perInfo.fieldAlternateId.setText('');
                                        expect(perInfo.errMsgSsn.getText()).toEqual(data.ErrorMsg);
                                        browser.executeScript('window.scrollTo(0,0);');
                                        expect(perInfo.fieldSsn.getAttribute("class")).toContain(data.ariainvalid);
                                        console.log('507PI 25X json driven "' + data.SSN + '" complete')
    
                                    });
    
                                };
                            });
    
                            //BY clicking on Error Message of SSN Filed, the control should be back on SSN text box.
                            //  it('Validate by clicking on SSN Error Message the control should be back to SSN text box :- "' + TestData.SSN.SSN0[0].SSN + '"', function() {
                            it('Validate that clicking on Error Message, the control goes back to SSN text box for data: "' + TestData.SSN.SSN4[0].SSN + '"', function() {
                                perInfo.fieldSsn.setText(TestData.SSN.SSN4[0].SSN);
                                perInfo.fieldAlternateId.setText('');
                                perInfo.errMsgSsn.click();
                                expect(perInfo.fieldSsn.getAttribute("class")).toContain(TestData.SSN.SSN4[0].ariainvalid);
                                perInfo.fieldSsn.setText(TestData.SSN.SSN1[0].SSN + '\t');
                                console.log('507PI 26x: Complete');
                            });
    
                            // Validate Alternate Id field with set of data
                            //Refer Alternate Id dataset in 'cxinit.507.json' file
                            dataProvider(TestData.AlternateId, function(data, description) {
                                if (data.ExecutionFlag) {
                                    it('Functional validation of AlternateId field with value: "' + data.AlternateId + '"', function() {
                                        perInfo.fieldAlternateId.setText(data.AlternateId);
                                        perInfo.fieldSsn.setText('');
                                        expect(perInfo.fieldAlternateId.getValue()).toEqual(data.AlternateId);
                                        expect(perInfo.fieldAlternateId.getAttribute("class")).toContain(TestData.ariainvalid_success);
                                        console.log('507PI 27X json driven "' + data.AlternateId + '" complete')
    
                                    });
    
                                };
                            });
                        }
                   });
                   
                   describe('Member ID field Validations', function() {
                        if (pdescription == 'AHMO' || pdescription == 'APPO') {
                            it('Click in text box and tab-out / lose focus for Member ID', function() {
                                perInfo.memberId.setText('');
                                perInfo.fieldHomeAddr.setText('');
                                expect(perInfo.errMsgMemberId.getText()).toEqual(TestData.ErrorMsgBlank_MemberID);
                                expect(perInfo.memberId.getAttribute("class")).toContain(TestData.ariainvalid_error);
                                console.log('507PI 7: Complete')
                            });
                        }

                        if (pdescription == 'AHMO' || pdescription == 'APPO') {
                            //Validating MemberID field with multiple datasets
                            //Refer MemberID dataset in 'aarp.507.json' file 
                            dataProvider(TestData.MemberID, function(data, description) {
                                if (data.ExecutionFlag) {
                                    it('Functional validation of Member ID field with value: "' + data.MemberID + '"', function() {
                                        perInfo.memberId.setText(data.MemberID);
                                        perInfo.fieldHomeAddr.setText('');
                                        expect(perInfo.errMsgMemberId.getText()).toEqual(data.ErrorMsg);
                                        browser.executeScript('window.scrollTo(0,0);');
                                        expect(perInfo.memberId.getAttribute("class")).toContain(data.ariainvalid);
                                    });
                                };
                            });
    
                            it('Validate that clicking on Error Message, the control goes back to Member ID text box for data: ":- "' + TestData.MemberID.MemberID4[0].MemberID + '"', function() {
                                perInfo.memberId.setText(TestData.MemberID.MemberID4[0].MemberID);
                                perInfo.fieldHomeAddr.setText('');
                                perInfo.errMsgMemberId.click();
                                expect(perInfo.memberId.getAttribute("class")).toContain(TestData.MemberID.MemberID4[0].ariainvalid);
                                perInfo.memberId.setText(TestData.MemberID.MemberID4[0].MemberID);
                            });
                        }
                   });
                });
            }
        });
    }
});
