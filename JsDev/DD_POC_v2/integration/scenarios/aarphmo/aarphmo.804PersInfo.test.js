//AARP-804 : [Personal Info Page] Default Zip Code Pop Up

/*As a product owner I want to warn the user of change in zip code 
since a change in zip code may impact product availability and product price.*/

"use strict"
var TestData = require('../../testData/'+testDataEnv+'/aarphmo/aarphmo.804.json');
var perInfo = new(require('../../pageObjects/cxinit/perInfo-page.js'));
var enrollPage = new(require('../../pageObjects/cxinit/enroll-page.js'));

describe('AARP-804: Zip Code Popup validation', function() {
    //State and zipcode are pre-filled.State-CA & Zipcode-94560

	
	beforeAll(function() {
		console.log('aarp 804');
    });
	

    beforeEach(function() {
        Utility.openApplication('','AARP');
        Utility.waitUntilPageLoaded();
        enrollPage.enterHomePageDetails(TestData.enrollData);
        expect(perInfo.fieldFirstName.isPresentAndDisplayed()).toBeTruthy();
        // browser.driver.findElement(by.name('planZip')).clear().then(function() {
        //     browser.driver.findElement(by.name('planZip')).sendKeys(TestData.ZipCode);
        //     browser.actions().sendKeys(protractor.Key.ENTER).perform();
        //     return true;
        // });
    });

    //Validated the Zip code Pop up when the Zipcode is update to new value in the Home address value
    //Verify the Zip code Pop Options available with the New Quote and GoBack

    it('Verify the functionality of Go Back link in Zip code pop Up while Updating Home address', function() {
        perInfo.fieldHomeAddr.setText(TestData.HAddress_ZIP.PartialAddress);
        perInfo.selectHomeAddress(TestData.HAddress_ZIP.FullAddress);
        expect(perInfo.zipPopNewQuote.isPresentAndDisplayed()).toBeTruthy();
        expect(perInfo.zipPopBack.isPresentAndDisplayed()).toBeTruthy();
        expect(perInfo.zipPopUp.getText()).toContain('Change ZIP Code');
        perInfo.zipPopBack.click();
        expect(perInfo.fieldHomeAddr.getAttribute("value")).toEqual('');
        expect(perInfo.fieldState.getAttribute("value")).toEqual('NY');
        expect(perInfo.fieldCity.getAttribute("value")).toEqual('');
        expect(perInfo.fieldZipCode.getAttribute("value")).toEqual(TestData.ZipCode);
    });

    //Validate the Change Zip code Pop up is displayed when the zipcode value is changed

    /* CXINIT-1450 is the defect for the Error Page displayed after the New Quote Button is clicked */

    it('Verify the functionality of New Quote button in Zip code pop Up while Updating Home address', function() {
        perInfo.fieldHomeAddr.setText(TestData.HAddress_ZIP.PartialAddress);
        perInfo.selectHomeAddress(TestData.HAddress_ZIP.FullAddress);
        expect(perInfo.zipPopNewQuote.isPresentAndDisplayed()).toBeTruthy();
        expect(perInfo.zipPopBack.isPresentAndDisplayed()).toBeTruthy();
        expect(perInfo.zipPopUp.getText()).toContain('Change ZIP Code');
        perInfo.zipPopNewQuote.click();
        expect(browser.getTitle()).toContain(TestData.Title);
    });

    //Update the home Address and Zipcode 
    //Navigate back to the

    it('Verify the functionality of Go Back link in Zip code pop Up while changing zip code', function() {
        perInfo.fieldHomeAddr.setText(TestData.Address_Valid.HomeAddress);
        perInfo.fieldState.setText(TestData.Address_Valid.State);
        perInfo.fieldCity.setText(TestData.Address_Valid.City);
        perInfo.fieldZipCode.setText(TestData.ZipCode2 + '\t');

        perInfo.fieldPhoneNumber.setText('');
        expect(perInfo.zipPopNewQuote.isPresentAndDisplayed()).toBeTruthy();
        expect(perInfo.zipPopBack.isPresentAndDisplayed()).toBeTruthy();
        expect(perInfo.zipPopUp.getText()).toContain('Change ZIP Code');
        perInfo.fieldPhoneNumber.setText('');
        perInfo.zipPopBack.click();
        expect(perInfo.fieldHomeAddr.isPresentAndDisplayed()).toBeTruthy();
        // expect(perInfo.fieldHomeAddr.getAttribute("class")).toContain(TestData.Ariainvalid_error);
        // expect(perInfo.fieldState.getAttribute("class")).toContain(TestData.Ariainvalid_error);
        // expect(perInfo.fieldCity.getAttribute("class")).toContain(TestData.Ariainvalid_error);
        // expect(perInfo.fieldZipCode.getAttribute("class")).toContain(TestData.Ariainvalid_error);
        /*expect(perInfo.fieldHomeAddr.getAttribute("value")).toEqual('');
        expect(perInfo.fieldState.getAttribute("value")).toEqual('');
        expect(perInfo.fieldCity.getAttribute("value")).toEqual('');*/

        expect(perInfo.fieldZipCode.getAttribute("value")).toEqual(TestData.ZipCode);
    });

    //Verify and Validate the New Quote button in the Change zipcode Pop up

    /* CXINIT-1450 is the defect for the Error Page displayed after the New Quote Button is clicked */

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
