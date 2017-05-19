/*CXINIT-519 Contact Type*/

"use strict"
// var TestData = require("../../testData/personalInfo.json");
var TestData = require("../../testData/cxinit/cxinit.519.json");
var perInfo = new(require('../../pageObjects/perInfo-page.js'));
var homePage = new(require('../../pageObjects/home-page.js'));




//To Navigate Personla Info Page
describe('507_PersInfoPg: ', function() {

    beforeAll(function() {
        Utility.openApplication('');
    });

    afterAll(function() {
        //browser.quit();
    });

    beforeEach(function() {
        Utility.waitUntilPageLoaded();
    });

    it('should be able to open Login page and verify', function() {

        browser.driver.findElement(by.name('noOfCovered')).sendKeys('').then(function() {
            browser.actions().sendKeys(protractor.Key.ENTER).perform();
            return true;
        })
        expect(perInfo.fieldFirstName.isPresentAndDisplayed()).toBeTruthy();
    });


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

dataProvider(TestData.Personalinfo.Email_Address, function(data, description) {
    if (data.ExecutionFlag) {
        it('Validate Email Address with value "' + data.Email + '"', function() {
            perInfo.fieldEmailAddr.setText(data.Email + '\t');
            expect(perInfo.fieldEmailAddr.getValue()).toEqual(data.Email);
            expect(perInfo.fieldEmailAddr.getAttribute("class")).toContain(data.ariainvalid);
        });
    };
});

it('Validate Checkbox PaperLess Checked or Not', function() {
    expect(perInfo.chkBoxPaperless.isSelected()).toBeTruthy();
    perInfo.chkBoxPaperless.unCheck();
    expect(perInfo.chkBoxPaperless.isSelected()).toBeFalsy();

});

it('Validate Electronic Documents Terms and Conditions', function() {
    perInfo.paperLessTerms.click();
    Utility.switchToWindow(1);
   expect(browser.getCurrentUrl()).toEqual(TestData.ElectronicDocPaperLess);

});

});