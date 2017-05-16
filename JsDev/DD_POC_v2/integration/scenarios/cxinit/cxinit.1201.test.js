"use strict"
var TestData = require("../../testData/cxinit/cxinit.1201.json");
var perInfo = new(require('../../pageObjects/perInfo-page.js'));

describe('Zip Code Popup validation', function() {
    //State and zipcode are pre-filled.State-CA & Zipcode-94560

    beforeEach(function() {
        Utility.openApplication('');
        browser.driver.findElement(by.name('planZip')).clear().then(function() {
            browser.driver.findElement(by.name('planZip')).sendKeys(TestData.ZipCode);
            browser.actions().sendKeys(protractor.Key.ENTER).perform();
            return true;
        });
    });

    it('Verify the functionality of Go Back link in Zip code pop Up while Updating Home address', function() {
        perInfo.fieldHomeAddr.setText(TestData.HAddress_ZIP.PartialAddress);
        perInfo.selectHomeAddress(TestData.HAddress_ZIP.FullAddress);
        expect(perInfo.zipPopNewQuote.isPresentAndDisplayed()).toBeTruthy();
        expect(perInfo.zipPopBack.isPresentAndDisplayed()).toBeTruthy();
        expect(perInfo.zipPopUp.getText()).toContain('Change ZIP Code');
        perInfo.zipPopBack.click();
        expect(perInfo.fieldHomeAddr.getAttribute("value")).toEqual('');
        expect(perInfo.fieldState.getAttribute("value")).toEqual('');
        expect(perInfo.fieldCity.getAttribute("value")).toEqual('');
        expect(perInfo.fieldZipCode.getAttribute("value")).toEqual(TestData.ZipCode);
    });
    it('Verify the functionality of New Quote button in Zip code pop Up while Updating Home address', function() {
        perInfo.fieldHomeAddr.setText(TestData.HAddress_ZIP.PartialAddress);
        perInfo.selectHomeAddress(TestData.HAddress_ZIP.FullAddress);
        expect(perInfo.zipPopNewQuote.isPresentAndDisplayed()).toBeTruthy();
        expect(perInfo.zipPopBack.isPresentAndDisplayed()).toBeTruthy();
        expect(perInfo.zipPopUp.getText()).toContain('Change ZIP Code');
        perInfo.zipPopNewQuote.click();
        expect(browser.getTitle()).toContain(TestData.Title);
    });


    it('Verify the functionality of Go Back link in Zip code pop Up while changing zip code', function() {
        perInfo.fieldHomeAddr.setText(TestData.Address_Valid.HomeAddress);
        perInfo.fieldState.setText(TestData.Address_Valid.City);
        perInfo.fieldCity.setText(TestData.Address_Valid.State);
        perInfo.fieldZipCode.setText(TestData.ZipCode2 + '\t');
        expect(perInfo.zipPopNewQuote.isPresentAndDisplayed()).toBeTruthy();
        expect(perInfo.zipPopBack.isPresentAndDisplayed()).toBeTruthy();
        expect(perInfo.zipPopUp.getText()).toContain('Change ZIP Code');
        perInfo.zipPopBack.click();
        expect(perInfo.fieldHomeAddr.getAttribute("value")).toEqual('');
        expect(perInfo.fieldState.getAttribute("value")).toEqual('');
        expect(perInfo.fieldCity.getAttribute("value")).toEqual('');
        expect(perInfo.fieldZipCode.getAttribute("value")).toEqual(TestData.ZipCode);
    });


    it('Verify the functionality of New Quote button in Zip code pop Up while changing zip code', function() {
        perInfo.fieldHomeAddr.setText(TestData.Address_Valid.HomeAddress);
        perInfo.fieldState.setText(TestData.Address_Valid.City);
        perInfo.fieldCity.setText(TestData.Address_Valid.State);
        perInfo.fieldZipCode.setText(TestData.ZipCode2 + '\t');
        expect(perInfo.zipPopNewQuote.isPresentAndDisplayed()).toBeTruthy();
        expect(perInfo.zipPopBack.isPresentAndDisplayed()).toBeTruthy();
        perInfo.zipPopNewQuote.click();
        expect(browser.getTitle()).toContain(TestData.Title);
    });

});
