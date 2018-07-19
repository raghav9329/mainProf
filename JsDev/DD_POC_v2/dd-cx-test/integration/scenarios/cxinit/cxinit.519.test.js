/*CXINIT-519 Contact Type*/

"use strict"
// var TestData = require("../../testData/personalInfo.json");
var TestData = require("../../testData/cxinit/cxinit.519.json");
var perInfo = new(require('../../pageObjects/cxinit/perInfo-page.js'));
var homePage = new(require('../../pageObjects/cxinit/home-page.js'));


//To Navigate Personla Info Page
describe('CXINIT-519: Contact Info-PersInfo: ', function() {
	
    beforeAll(function() {
		console.log('cxinit 519');
        Utility.openApplication('');
    });

    afterAll(function() {
        //browser.quit();
    });

    beforeEach(function() {
        Utility.waitUntilPageLoaded();
    });

    //Navigates to Enrollhome page and clicks on submit

    it('should be able to open Enroll page and verify', function() {

        browser.driver.findElement(by.name('noOfCovered')).sendKeys('').then(function() {
            browser.actions().sendKeys(protractor.Key.ENTER).perform();
            return true;
        })
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

    //Validate Electronics Documents page is displayed when user clicks on the Electronic Documents Terms and Conditions.

    it('Validate Electronic Documents Terms and Conditions', function() {
        perInfo.paperLessTerms.click();
        Utility.switchToWindow(1);
        expect(browser.getCurrentUrl()).toEqual(TestData.ElectronicDocPaperLess);

    });

});
