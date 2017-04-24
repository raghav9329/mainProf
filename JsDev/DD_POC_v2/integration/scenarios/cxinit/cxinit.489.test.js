/*Zip Code : 94536

Home Address :
35995 Fremont Blvd Apt 98
City:  Fremont
State : CA
ZIP Code  : 94536*/

var TestData = require("../../testData/cxinit/cxinit.489.json");
var perInfo = new(require('../../pageObjects/perInfo-page.js'));
var homePage = new(require('../../pageObjects/home-page.js'));


var homePageBcomponent = new(require('../../businessComponents/homePage.js'))

//Created Utility for browser actions(browserActions.js)
describe('Verify and Validate Personal Info Page', function() {
    it('should be able to open Login page and verify', function() {
        browser.ignoreSynchronization = true;
        browserActions.openApplication('');
        homePage.GetQuote.click();
        homePage.ZIPCode.setText(TestData.ZIPcode);
        homePage.DOB.setText(TestData.DOB_HOME);
        homePage.Go.click();
        homePage.Enroll.click();

    });
    it('Validate all fields are present and displayed', function() {
        expect(perInfo.fieldHomeAddr.isPresentAndDisplayed()).toBeTruthy();
        expect(perInfo.fieldCity.isPresentAndDisplayed()).toBeTruthy();
        expect(perInfo.fieldState.isPresentAndDisplayed()).toBeTruthy();
        expect(perInfo.fieldZipCode.isPresentAndDisplayed()).toBeTruthy();
        expect(perInfo.chkBoxDiffMailAddr.isPresentAndDisplayed()).toBeTruthy();
        expect(perInfo.Next.isPresentAndDisplayed()).toBeTruthy();
    });



    it('Validate Home Address "' + '' + '"', function() {
        data = TestData.Personalinfo.HAddress_Blank;
        perInfo.fieldHomeAddr.setText(data.Home);
        perInfo.fieldCity.setText(data.City);
        perInfo.fieldState.setText(data.State);
        perInfo.fieldEmailAddr.setText('');
        browser.sleep(4000);
        expect(perInfo.errMsgHomeAddr.getText()).toEqual(data.ErrorMsg);
        expect(perInfo.fieldHomeAddr.getAttribute("class")).toContain(TestData.ariainvalid_error);
        expect(perInfo.fieldState.getAttribute("class")).toContain(TestData.ariainvalid_success);
        expect(perInfo.fieldCity.getAttribute("class")).toContain(TestData.ariainvalid_success);
    });

    it('Validate Home Address "' + '' + '"', function() {
        data = TestData.Personalinfo.HAddress_Valid;
        perInfo.fieldHomeAddr.setText(data.Home);
        perInfo.fieldEmailAddr.setText('');
        browser.sleep(4000);
        expect(perInfo.fieldHomeAddr.getAttribute("class")).toContain(TestData.ariainvalid_success);
        expect(perInfo.fieldState.getAttribute("class")).toContain(TestData.ariainvalid_success);
        expect(perInfo.fieldCity.getAttribute("class")).toContain(TestData.ariainvalid_success);
    });


    it('Validate Home Address "' + '' + '"', function() {
        data = TestData.Personalinfo.HAddress_Invalid;
        perInfo.fieldHomeAddr.setText(data.Home);
        perInfo.fieldEmailAddr.setText('');
        browser.sleep(4000);
        expect(perInfo.errinvalidAddr.getText()).toEqual(data.ErrorMsg);
        expect(perInfo.fieldHomeAddr.getAttribute("class")).toContain(TestData.ariainvalid_error);
        expect(perInfo.fieldState.getAttribute("class")).toContain(TestData.ariainvalid_error);
        expect(perInfo.fieldCity.getAttribute("class")).toContain(TestData.ariainvalid_error);
    });
    it('Validate Home Address "' + '' + '"', function() {
        data = TestData.Personalinfo.HAddress_SplChar;
        perInfo.fieldHomeAddr.setText(data.Home);
        perInfo.fieldEmailAddr.setText('');
        browser.sleep(4000);
        expect(perInfo.errinvalidAddr.getText()).toEqual(data.ErrorMsg);
        expect(perInfo.fieldHomeAddr.getAttribute("class")).toContain(TestData.ariainvalid_error);
        expect(perInfo.fieldState.getAttribute("class")).toContain(TestData.ariainvalid_error);
        expect(perInfo.fieldCity.getAttribute("class")).toContain(TestData.ariainvalid_error);
    });
    it('Validate Home Address "' + '' + '"', function() {
        data = TestData.Personalinfo.HAddress_ZIP;
        perInfo.fieldHomeAddr.setText(data.Home);

        browser.actions().sendKeys(protractor.Key.ARROW_DOWN).perform().then(function() {
            browser.actions().sendKeys(protractor.Key.ENTER).perform();
        });

        expect(perInfo.fieldHomeAddr.getAttribute("class")).toContain(TestData.ariainvalid_success);
        expect(perInfo.fieldState.getAttribute("class")).toContain(TestData.ariainvalid_error);
        expect(perInfo.fieldCity.getAttribute("class")).toContain(TestData.ariainvalid_error);
        expect(perInfo.fieldZipCode.getAttribute("class")).toContain(TestData.ariainvalid_error);
    });

    it('Validate Home Address "' + '' + '"', function() {
        perInfo.fieldZipCode.setText('94105');
        perInfo.fieldEmailAddr.setText('');
        browser.sleep(4000);
        expect(perInfo.zipPopBack.isPresentAndDisplayed()).toBeTruthy();
        perInfo.zipPopBack.click();
        browser.sleep(4000);
        expect(perInfo.fieldHomeAddr.getAttribute("class")).toContain(TestData.ariainvalid_error);
        expect(perInfo.fieldState.getAttribute("class")).toContain(TestData.ariainvalid_error);
        expect(perInfo.fieldCity.getAttribute("class")).toContain(TestData.ariainvalid_error);
        expect(perInfo.fieldZipCode.getAttribute("class")).toContain(TestData.ariainvalid_error);
    });




});
