/*CXINIT-519 Contact Type

AC:
Testing Validates : Includes: Phone Number, Email, Electronic preferences
Testing Validates : Integration with atomic design components
Testing Validates : Organize labels in property file
Testing Validates : Organize error messages in property file

Fields that have been identified and labled in CXINIT-519
Contact Type
Phone Number
Email Address

Consume the error messages in the property file and validate fields display the proper errors on the correct conditions
Validate Partial numeric failures in the phone number field
Validate Contact number type from the selection list (Cell, Home or Work)
Validate Email Address field with invalid data failures

*/

"use strict"
// var TestData = require('../../testData/'+testDataEnv+'/personalInfo.json');
var TestData = require('../../testData/' + testDataEnv + '/dhmo/dhmo.519PersInfo.json');
var perInfo = new(require('../../pageObjects/cxinit/perInfo-page.js'));
var enrollPage = new(require('../../pageObjects/cxinit/enroll-page.js'));

var product = ['DHMO', 'AHMO'];
// var product = ['DHMO','DPPO','AHMO','APPO']; 
var states = ['CA', 'NY'];

//To Navigate Personla Info Page
dataProvider(TestData.states, function(sData, sdescription) {
    if (states.indexOf(sdescription) != -1) {
        dataProvider(sData.products, function(tData, pdescription) {
            if (product.indexOf(pdescription) != -1) {

                //To Navigate Personal Info Page
                describe('DHMO:519: Contact Info-PersInfo: ' + sdescription + 'Product:' + pdescription + '', function() {

                    beforeAll(function() {
                        console.log('cxinit 519');
                        Utility.openApplication('', 'DELTA');
                    });

                    afterAll(function() {
                        //browser.quit();
                    });

                    beforeEach(function() {
                        jasmine.addMatchers(custommatcher.customMatchers);
                        Utility.waitUntilPageLoaded();
                    });

                    //Navigates to Enrollhome page and clicks on submit

                    it('519PI 1:should be able to open Enroll page and verify', function() {
                        enrollPage.enterHomePageDetails(tData.enrollData, true);

                        expect(perInfo.fieldFirstName.isPresentAndDisplayed()).toBeTruthy();
                        console.log('519PI 1: Complete')
                    });

                    //Verify and Validate the Phone number with Contact type as CELL and Valid and Invalid Test Data 

                    //Validating Phone Number field with multiple datasets with Contact type as CELL
                    //Refer Phone_Cell dataset in 'dhmo.519PersInfo.json' file
                    // dataProvider will iterate the following it block based on number of datasets and organised through execution Flag(True/False).

                    dataProvider(TestData.Personalinfo.Phone_Cell, function(data, description) {
                        if (data.ExecutionFlag) {
                            it('519PI 2X:Eval Phone Cell field with value "' + data.PhoneType + ":" + data.PhoneNumber + '"', function() {
                                if (data.PhoneType.length > 1) {

                                    perInfo.fieldPhoneSelect.selectByText(data.PhoneType);
                                }
                                perInfo.fieldPhoneNumber.setText(data.PhoneNumber + '\t');
                                expect(perInfo.fieldPhoneNumber.getValue()).toEqual(data.PhoneNumber);
                                expect(perInfo.fieldPhoneNumber.getAttribute("class")).toContain(data.ariainvalid);
                                console.log('json driven "' + data.PhoneType + '" complete');
                            });
                        };
                    });

                    //Verify and Validate the Phone number with Contact type as HOME and Valid and Invalid Test Data 

                    //Validating Phone Number field with multiple datasets with Contact type as HOME
                    //Refer Phone_Home dataset in 'dhmo.519PersInfo.json' file
                    // dataProvider will iterate the following it block based on number of datasets and organised through execution Flag(True/False).

                    dataProvider(TestData.Personalinfo.Phone_Home, function(data, description) {
                        if (data.ExecutionFlag) {
                            it('519PI 3X:Eval Phone field with value "' + data.PhoneType + ":" + data.PhoneNumber + '"', function() {
                                if (data.PhoneType.length > 1) {

                                    perInfo.fieldPhoneSelect.selectByText(data.PhoneType);
                                }
                                perInfo.fieldPhoneNumber.setText(data.PhoneNumber + '\t');
                                expect(perInfo.fieldPhoneNumber.getValue()).toEqual(data.PhoneNumber);
                                expect(perInfo.fieldPhoneNumber.getAttribute("class")).toContain(data.ariainvalid);
                                console.log('json driven "' + data.PhoneType + '" complete');
                            });
                        };
                    });

                    //Verify and Validate the Phone number with Contact type as WORK and Valid and Invalid Test Data

                    //Validating Phone Number field with multiple datasets with Contact type as WORK
                    //Refer Phone_Work dataset in 'dhmo.519PersInfo.json' file
                    // dataProvider will iterate the following it block based on number of datasets and organised through execution Flag(True/False).

                    dataProvider(TestData.Personalinfo.Phone_Work, function(data, description) {
                        if (data.ExecutionFlag) {
                            it('519PI 3X:Eval Phone Cell field with value "' + data.PhoneType + ":" + data.PhoneNumber + '"', function() {
                                if (data.PhoneType.length > 1) {

                                    perInfo.fieldPhoneSelect.selectByText(data.PhoneType);
                                }
                                perInfo.fieldPhoneNumber.setText(data.PhoneNumber + '\t');
                                expect(perInfo.fieldPhoneNumber.getValue()).toEqual(data.PhoneNumber);
                                expect(perInfo.fieldPhoneNumber.getAttribute("class")).toContain(data.ariainvalid);
                                console.log('json driven "' + data.PhoneType + '" complete');
                            });
                        };
                    });

                    //Verify and Validate the EMail Address with Valid and Invalid Test Data

                    //Validating Email field with multiple datasets
                    //Refer Email_Address dataset in 'dhmo.519PersInfo.json' file
                    // dataProvider will iterate the following it block based on number of datasets and organised through execution Flag(True/False).


                    dataProvider(TestData.Personalinfo.Email_Address, function(data, description) {
                        if (data.ExecutionFlag) {
                            it('519PI 4X:Eval Email Address with value "' + data.Email + '"', function() {
                                perInfo.fieldEmailAddr.setText(data.Email + '\t');
                                expect(perInfo.fieldEmailAddr.getValue()).toEqual(data.Email);
                                expect(perInfo.fieldEmailAddr.getAttribute("class")).toContain(data.ariainvalid);
                                console.log('json driven "' + data.Email + '" complete');
                            });
                        };
                    });

                    //Validating the Paper less check box functionality by unchecking it 

                    it('519PI 5: Validate Checkbox PaperLess Checked or Not', function() {
                        expect(perInfo.chkBoxPaperless.isSelected()).toBeTruthy();
                        perInfo.chkBoxPaperless.unCheck();
                        expect(perInfo.chkBoxPaperless.isSelected()).toBeFalsy();
                        console.log('519PI 5: Complete')

                    });

                    //Validate Electronics Documents page is displayed when user clicks on the Electronic Documents Terms and Conditions.

                    it('519PI 6: Validate Electronic Documents Terms and Conditions', function() {
                        perInfo.paperLessTerms.click();
                        Utility.switchToWindow(1);
                        expect(browser.getCurrentUrl()).toEqual(TestData.ElectronicDocPaperLess);
                        console.log('519PI 6: Complete')

                    });

                });

            }
        });
    }
});
