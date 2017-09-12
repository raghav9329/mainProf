/*CXINIT-519 Contact Type*/

"use strict"
// var TestData = require('../../testData/'+testDataEnv+'/personalInfo.json');
var TestData = require('../../testData/'+testDataEnv+'/aarphmo/aarphmo.519.json');
var perInfo = new(require('../../pageObjects/cxinit/perInfo-page.js'));
var enrollPage = new(require('../../pageObjects/cxinit/enroll-page.js'));

//To Navigate Personla Info Page
describe('AARPHMO:519: Contact Info-PersInfo: ', function() {
	 beforeAll(function() {
        console.log('cxinit 519');
        Utility.openApplication('','AARP');
    });
	 
	 
	    beforeEach(function() {
	        // browser.executeScript("document.body.style.zoom='75%';");
	        
	    });
	 
	 

    // Fill the Enroll page with valid data and verify the navigation
    it('Step-1: should complete the Enroll Page', function() {
        enrollPage.enterHomePageDetails(TestData.enrollData);
        expect(perInfo.fieldFirstName.isPresentAndDisplayed()).toBeTruthy();
    });
    //Verify and Validate the Phone number with Contact type as CELL and Valid and Invalid Test Data 

    dataProvider(TestData.Personalinfo.Phone_Cell, function(data, description) {
        if (data.ExecutionFlag) {
            it('Validate Phone Cell field with value "' + data.PhoneType + ":" + data.PhoneNumber + '"', function() {
                if (data.PhoneType.length > 1) {

                    perInfo.fieldPhoneSelect.selectByText(data.PhoneType);
                }
                perInfo.fieldPhoneNumber.setText(data.PhoneNumber + '\t');
                expect(perInfo.fieldPhoneNumber.getValue()).toEqual(data.PhoneNumber);
                expect(perInfo.fieldPhoneNumber.getAttribute("class")).toContain(data.ariainvalid);
            });
        };
    });

    //Verify and Validate the Phone number with Contact type as HOME and Valid and Invalid Test Data 

    dataProvider(TestData.Personalinfo.Phone_Home, function(data, description) {
        if (data.ExecutionFlag) {
            it('Validate Phone Cell field with value "' + data.PhoneType + ":" + data.PhoneNumber + '"', function() {
                if (data.PhoneType.length > 1) {

                    perInfo.fieldPhoneSelect.selectByText(data.PhoneType);
                }
                perInfo.fieldPhoneNumber.setText(data.PhoneNumber + '\t');
                expect(perInfo.fieldPhoneNumber.getValue()).toEqual(data.PhoneNumber);
                expect(perInfo.fieldPhoneNumber.getAttribute("class")).toContain(data.ariainvalid);
            });
        };
    });

    //Verify and Validate the Phone number with WORK type as HOME and Valid and Invalid Test Data

    dataProvider(TestData.Personalinfo.Phone_Work, function(data, description) {
        if (data.ExecutionFlag) {
            it('Validate Phone Cell field with value "' + data.PhoneType + ":" + data.PhoneNumber + '"', function() {
                if (data.PhoneType.length > 1) {

                    perInfo.fieldPhoneSelect.selectByText(data.PhoneType);
                }
                perInfo.fieldPhoneNumber.setText(data.PhoneNumber + '\t');
                expect(perInfo.fieldPhoneNumber.getValue()).toEqual(data.PhoneNumber);
                expect(perInfo.fieldPhoneNumber.getAttribute("class")).toContain(data.ariainvalid);
            });
        };
    });

    //Verify and Validate the EMail Address with Valid and Invalid Test Data

    dataProvider(TestData.Personalinfo.Email_Address, function(data, description) {
        if (data.ExecutionFlag) {
            it('Validate Email Address with value "' + data.Email + '"', function() {
                perInfo.fieldEmailAddr.setText(data.Email + '\t');
                expect(perInfo.fieldEmailAddr.getValue()).toEqual(data.Email);
                expect(perInfo.fieldEmailAddr.getAttribute("class")).toContain(data.ariainvalid);
            });
        };
    });

    //Validate the Paper less Check box is unchecked

    it('Validate Checkbox PaperLess Checked or Not', function() {
        expect(perInfo.chkBoxPaperless.isSelected()).toBeTruthy();
        perInfo.chkBoxPaperless.unCheck();
        expect(perInfo.chkBoxPaperless.isSelected()).toBeFalsy();

    });

});
