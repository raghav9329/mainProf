var TestData = require("../../testData/cxinit/cxinit.483.json");
var perInfo = new(require('../../pageObjects/perInfo-page.js'));
var homePage = new(require('../../pageObjects/home-page.js'));


describe('CXINIT-483::486 - Address Mailing fields(without Address Validation)', function() {
    beforeAll(function() {
        Utility.openApplication('');
        browser.driver.findElement(by.name('planZip')).clear().then(function() {
            browser.driver.findElement(by.name('planZip')).sendKeys('94560');
            browser.actions().sendKeys(protractor.Key.ENTER).perform();
            return true;
        });
    });
    it('Validate all fields are hidden when My mailing address is the same as my home address. check box checked', function() {
        expect(perInfo.hiddenfieldMailAddr.isPresentAndDisplayed()).toBeFalsy();
        expect(perInfo.hiddenfieldCity.isPresentAndDisplayed()).toBeFalsy();
        expect(perInfo.hiddenfieldState.isPresentAndDisplayed()).toBeFalsy();
        expect(perInfo.hiddenfieldZipCode.isPresentAndDisplayed()).toBeFalsy();
        expect(perInfo.hiddenfieldBrokerNum.isPresentAndDisplayed()).toBeFalsy();
    });

    it('Uncheck My mailing address is the same as my home address. and validate all fields are present and displayed', function() {
        perInfo.fieldEmailAddr.setText('');
        perInfo.chkBoxDiffMailAddr.unCheck();
        expect(perInfo.hiddenfieldMailAddr.isPresentAndDisplayed()).toBeTruthy();
        expect(perInfo.hiddenfieldCity.isPresentAndDisplayed()).toBeTruthy();
        expect(perInfo.hiddenfieldState.isPresentAndDisplayed()).toBeTruthy();
        expect(perInfo.hiddenfieldZipCode.isPresentAndDisplayed()).toBeTruthy();
    });
    it('check My mailing address is the same as my home address. and validate all fields are not displayed', function() {
        perInfo.fieldEmailAddr.setText('');
        perInfo.chkBoxDiffMailAddr.check();
        expect(perInfo.hiddenfieldMailAddr.isPresentAndDisplayed()).toBeFalsy();
        expect(perInfo.hiddenfieldCity.isPresentAndDisplayed()).toBeFalsy();
        expect(perInfo.hiddenfieldState.isPresentAndDisplayed()).toBeFalsy();
        expect(perInfo.hiddenfieldZipCode.isPresentAndDisplayed()).toBeFalsy();
    });
    it('Validate Home Address field with Click/tabout', function() {
        perInfo.chkBoxDiffMailAddr.unCheck();
        perInfo.hiddenfieldMailAddr.setText('' + '\t');
        expect(perInfo.errMsghiddenfieldMailAddr.getText()).toEqual(TestData.ErrorMsg_Homeaddress);
        expect(perInfo.hiddenfieldMailAddr.getAttribute("class")).toContain(TestData.ariainvalid_error);
    });
    it('Validate City field with Click/tabout', function() {
        perInfo.hiddenfieldCity.setText('' + '\t');
        expect(perInfo.errMsghiddenfieldCity.getText()).toEqual(TestData.ErrorMsg_city);
        expect(perInfo.hiddenfieldCity.getAttribute("class")).toContain(TestData.ariainvalid_error);
    });
    it('Validate State field with Click/tabout', function() {
        perInfo.hiddenfieldState.setText('' + '\t');
        expect(perInfo.errMsghiddenfieldState.getText()).toEqual(TestData.ErrorMsg_State);
        expect(perInfo.hiddenfieldState.getAttribute("class")).toContain(TestData.ariainvalid_error);
    });
    it('Validate Zip Code field with Click/tabout', function() {
        perInfo.hiddenfieldZipCode.setText('' + '\t');
        expect(perInfo.errMsghiddenfieldZipCode.getText()).toEqual(TestData.ErrorMsg_ZipCode);
        expect(perInfo.hiddenfieldZipCode.getAttribute("class")).toContain(TestData.ariainvalid_error);
    });
});

describe('CXINIT-483::486 - Validate Address Mailing field with valid and invalid data', function() {

    it('Validate Home Address with blank data', function() {
        data = TestData.Personalinfo.HAddress_Blank;
        perInfo.hiddenfieldMailAddr.setText(data.Home);
        perInfo.hiddenfieldCity.setText(data.City);
        perInfo.hiddenfieldState.setText(data.State);
        perInfo.hiddenfieldZipCode.setText(data.ZIPcode + '\t');
        browser.sleep(2000);
        expect(perInfo.errMsghiddenfieldMailAddr.getText()).toEqual(data.ErrorMsg);
        expect(perInfo.hiddenfieldMailAddr.getAttribute("class")).toContain(TestData.ariainvalid_error);
        expect(perInfo.hiddenfieldState.getAttribute("class")).toContain(TestData.ariainvalid_success);
        expect(perInfo.hiddenfieldCity.getAttribute("class")).toContain(TestData.ariainvalid_success);
    });

    it('Validate Home Address with valid data', function() {
        data = TestData.Personalinfo.HAddress_Valid;
        perInfo.hiddenfieldMailAddr.setText(data.Home + '\t');
        browser.sleep(2000);
        expect(perInfo.hiddenfieldMailAddr.getAttribute("class")).toContain(TestData.ariainvalid_success);
        expect(perInfo.hiddenfieldState.getAttribute("class")).toContain(TestData.ariainvalid_success);
        expect(perInfo.hiddenfieldCity.getAttribute("class")).toContain(TestData.ariainvalid_success);
    });


    it('Validate Home Address with invalid data', function() {
        data = TestData.Personalinfo.HAddress_Invalid;
        perInfo.hiddenfieldMailAddr.setText(data.Home + '\t');
        browser.sleep(2000);
        expect(perInfo.errMsghiddenfieldMailAddr.getText()).toEqual(data.ErrorMsg);
        expect(perInfo.hiddenfieldMailAddr.getAttribute("class")).toContain(TestData.ariainvalid_error);
        expect(perInfo.hiddenfieldState.getAttribute("class")).toContain(TestData.ariainvalid_success);
        expect(perInfo.hiddenfieldCity.getAttribute("class")).toContain(TestData.ariainvalid_success);
    });
    it('Validate Home Address with special char', function() {
        data = TestData.Personalinfo.HAddress_SplChar;
        perInfo.hiddenfieldMailAddr.setText(data.Home);
        expect(perInfo.errMsghiddenfieldMailAddr.getText()).toEqual(data.ErrorMsg);
        expect(perInfo.hiddenfieldMailAddr.getAttribute("class")).not.toContain(TestData.ariainvalid_error);

    });
    it('Validate Home Address with another zip code address ', function() {
        data = TestData.Personalinfo.HAddress_ZIP;
        perInfo.hiddenfieldMailAddr.setText(data.HomeAddress);
        perInfo.selectHomeAddress(data.FullAddress);
        expect(perInfo.hiddenfieldMailAddr.getAttribute("class")).toContain(TestData.ariainvalid_success);

    });

});

describe('CXINIT-483::486 - Validate city field in Address Mailing with valid and invalid data', function() {
    it('Enter ' + TestData.City1 + ' data in city field', function() {
        perInfo.hiddenfieldMailAddr.setText(TestData.Address_Valid.Home);
        perInfo.hiddenfieldCity.setText(TestData.City1 + '\t');
        expect(perInfo.hiddenfieldCity.getAttribute("class")).toContain(TestData.ariainvalid_success);
    });
    it('Enter ' + TestData.City2 + ' data in city field', function() {
        perInfo.hiddenfieldCity.setText(TestData.City2 + '\t');
        expect(perInfo.hiddenfieldCity.getAttribute("class")).toContain(TestData.ariainvalid_success);
    });
    it('Enter ' + TestData.City3 + ' data in city field', function() {
        perInfo.hiddenfieldCity.setText(TestData.City3 + '\t');
        expect(perInfo.hiddenfieldCity.getAttribute("class")).toContain(TestData.ariainvalid_success);
    });
    it('Enter ' + TestData.City4 + '  in city field', function() {
        perInfo.hiddenfieldCity.setText(TestData.City4 + '\t');
        expect(perInfo.hiddenfieldCity.getAttribute("class")).toContain(TestData.ariainvalid_success);
    });
});

describe('CXINIT-483::486 - Validate state field in Address Mailing with valid and invalid data', function() {

    it('Enter ' + TestData.State1 + ' in State field', function() {
        perInfo.hiddenfieldState.setText(TestData.State1 + '\t');
        expect(perInfo.hiddenfieldState.getAttribute("class")).toContain(TestData.ariainvalid_success);
    });
    it('Enter ' + TestData.State2 + ' in State field', function() {
        perInfo.hiddenfieldState.setText(TestData.State2 + '\t');
        expect(perInfo.hiddenfieldState.getAttribute("class")).toContain(TestData.ariainvalid_success);
    });
    it('Enter ' + TestData.State3 + ' in State field', function() {
        perInfo.hiddenfieldState.setText(TestData.State3 + '\t');
        expect(perInfo.hiddenfieldState.getAttribute("class")).toContain(TestData.ariainvalid_success);
    });
});

describe('CXINIT-483::486 - Validate Zip code field in Address Mailing with valid and invalid data', function() {

    it(' Enter valid values for each field', function() {
        data = TestData.Address_Valid;
        perInfo.hiddenfieldMailAddr.setText(data.Home);
        perInfo.hiddenfieldCity.setText(data.City);
        perInfo.hiddenfieldState.setText(data.State);
        perInfo.hiddenfieldZipCode.setText(data.ZIPcode + '\t');
        expect(perInfo.errMsghiddenfieldZipCode.getText()).toEqual(data.ErrorMsg);
        perInfo.errMsghiddenfieldZipCode.click();
        expect(perInfo.hiddenfieldZipCode.getAttribute("class")).not.toContain(TestData.ariainvalid_error);

    });
    it(' Enter invalid values for each field', function() {
        data = TestData.Address_Invalid;
        perInfo.hiddenfieldMailAddr.setText(data.Home);
        perInfo.hiddenfieldCity.setText(data.City);
        perInfo.hiddenfieldState.setText(data.State);
        perInfo.hiddenfieldZipCode.setText(data.ZIPcode + '\t');
        expect(perInfo.errMsghiddenfieldZipCode.getText()).toEqual(data.ErrorMsg);
        perInfo.errMsghiddenfieldZipCode.click();
        browser.sleep(3000);
        expect(perInfo.hiddenfieldZipCode.getAttribute("class")).toContain(TestData.ariainvalid_success);
    });
});