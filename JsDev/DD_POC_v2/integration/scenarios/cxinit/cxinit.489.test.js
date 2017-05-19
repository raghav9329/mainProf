var TestData = require("../../testData/cxinit/cxinit.489.json");
var perInfo = new(require('../../pageObjects/perInfo-page.js'));
var homePage = new(require('../../pageObjects/home-page.js'));

describe('CXINIT-489::492 - Tab/click in and tab/click out of the Home Address fields(without Address Validation)', function() {
    //State and zipcode are pre-filled.State-CA & Zipcode-94560
    //Flow 1: Tab/click in and tab/click out of the fields
    beforeAll(function() {
        Utility.openApplication('');
        browser.driver.findElement(by.name('planZip')).clear().then(function() {
            browser.driver.findElement(by.name('planZip')).sendKeys('94560');
            browser.actions().sendKeys(protractor.Key.ENTER).perform();
            return true;
        });
    });

    it('Validate all fields are present and displayed', function() {
        expect(perInfo.fieldHomeAddr.isPresentAndDisplayed()).toBeTruthy();
        expect(perInfo.fieldCity.isPresentAndDisplayed()).toBeTruthy();
        expect(perInfo.fieldState.isPresentAndDisplayed()).toBeTruthy();
        expect(perInfo.fieldZipCode.isPresentAndDisplayed()).toBeTruthy();
        expect(perInfo.chkBoxDiffMailAddr.isPresentAndDisplayed()).toBeTruthy();
    });

    it('Validate Home Address field with Click/tabout', function() {
        perInfo.fieldHomeAddr.setText('' + '\t');
        expect(perInfo.errMsgHomeAddr.getText()).toEqual(TestData.ErrorMsg_Homeaddress);
        expect(perInfo.fieldHomeAddr.getAttribute("class")).toContain(TestData.ariainvalid_error);
    });
    it('Validate City field with Click/tabout', function() {
        perInfo.fieldCity.setText('' + '\t');
        expect(perInfo.errMsgCity.getText()).toEqual(TestData.ErrorMsg_city);
        expect(perInfo.fieldCity.getAttribute("class")).toContain(TestData.ariainvalid_error);
    });
    it('Validate State field with Click/tabout', function() {
        perInfo.fieldState.setText('' + '\t');
        expect(perInfo.errMsgState.getText()).toEqual(TestData.ErrorMsg_State);
        expect(perInfo.fieldState.getAttribute("class")).toContain(TestData.ariainvalid_error);
    });
    it('Validate Zip Code field with Click/tabout', function() {
        perInfo.fieldZipCode.setText('' + '\t');
        expect(perInfo.errMsgZipCode.getText()).toEqual(TestData.ErrorMsg_ZipCode);
        expect(perInfo.fieldZipCode.getAttribute("class")).toContain(TestData.ariainvalid_error);
    });
});

describe('CXINIT-489::492 - Validate Home Address field with valid and invalid data', function() {
    beforeAll(function() {
        Utility.openApplication('');
        browser.driver.findElement(by.name('planZip')).clear().then(function() {
            browser.driver.findElement(by.name('planZip')).sendKeys('94560');
            browser.actions().sendKeys(protractor.Key.ENTER).perform();
            return true;
        });
    });
    it('Validate Home Address with blank data', function() {
        data = TestData.Personalinfo.HAddress_Blank;
        perInfo.fieldHomeAddr.setText(data.Home);
        perInfo.fieldCity.setText(data.City);
        //perInfo.fieldState.setText(data.State);     

        expect(perInfo.errMsgHomeAddr.getText()).toEqual(data.ErrorMsg);
        expect(perInfo.fieldHomeAddr.getAttribute("class")).toContain(TestData.ariainvalid_error);
        //expect(perInfo.fieldState.getAttribute("class")).toContain(TestData.ariainvalid_success);
        expect(perInfo.fieldCity.getAttribute("class")).toContain(TestData.ariainvalid_success);
    });

    it('Validate Home Address with valid data', function() {
        data = TestData.Personalinfo.HAddress_Valid;
        perInfo.fieldHomeAddr.setText(data.Home + '\t');
        browser.sleep(2000);
        expect(perInfo.fieldHomeAddr.getAttribute("class")).toContain(TestData.ariainvalid_success);
        expect(perInfo.fieldState.getAttribute("class")).toContain(TestData.ariainvalid_success);
        expect(perInfo.fieldCity.getAttribute("class")).toContain(TestData.ariainvalid_success);
    });


    it('Validate Home Address with invalid data', function() {
        data = TestData.Personalinfo.HAddress_Invalid;
        perInfo.fieldHomeAddr.setText(data.Home + '\t');
        browser.sleep(5000)
        expect(perInfo.errinvalidAddr.getText()).toEqual(data.ErrorMsg);
        expect(perInfo.fieldHomeAddr.getAttribute("class")).toContain(TestData.ariainvalid_error);
        expect(perInfo.fieldState.getAttribute("class")).toContain(TestData.ariainvalid_error);
        expect(perInfo.fieldCity.getAttribute("class")).toContain(TestData.ariainvalid_error);
    });
    it('Validate Home Address with special char', function() {
        data = TestData.Personalinfo.HAddress_SplChar;
        perInfo.fieldHomeAddr.setText(data.Home);
        perInfo.fieldAlternateId.setText('');
        expect(perInfo.errinvalidAddr.getText()).toEqual(data.ErrorMsg);
        expect(perInfo.fieldHomeAddr.getAttribute("class")).toContain(TestData.ariainvalid_error);

    });
    it('Validate Home Address with another zip code address ', function() {
        data = TestData.Personalinfo.HAddress_ZIP;
        // perInfo.fieldHomeAddr.setText(data.Home);

        perInfo.fieldHomeAddr.setText(data.HomeAddress);
        perInfo.selectHomeAddress(data.FullAddress);
        expect(perInfo.fieldHomeAddr.getAttribute("class")).toContain(TestData.ariainvalid_success);

    });

    it('Validate Home Address changing zip code', function() {
        // browser.sleep(20000);
        perInfo.fieldZipCode.setText('94105' + '\t');
         browser.sleep(4000);
        expect(perInfo.zipPopBack.isPresentAndDisplayed()).toBeTruthy();
        perInfo.zipPopBack.click();
        // browser.sleep(4000);
        expect(perInfo.fieldHomeAddr.getAttribute("class")).toContain(TestData.ariainvalid_error);
        expect(perInfo.fieldState.getAttribute("class")).toContain(TestData.ariainvalid_error);
        expect(perInfo.fieldCity.getAttribute("class")).toContain(TestData.ariainvalid_error);
        expect(perInfo.fieldZipCode.getAttribute("class")).toContain(TestData.ariainvalid_error);
    });
});

describe('CXINIT-489::492- Validate city field with valid and invalid data', function() {
    beforeEach(function() {
        Utility.openApplication('');
        browser.driver.findElement(by.name('planZip')).clear().then(function() {
            browser.driver.findElement(by.name('planZip')).sendKeys('94560');
            browser.actions().sendKeys(protractor.Key.ENTER).perform();
            return true;
        });
    });

    it('Enter ' + TestData.City1 + ' data in city field', function() {
        perInfo.fieldHomeAddr.setText(TestData.Address_Valid.Home);
        perInfo.fieldCity.setText(TestData.City1 + '\t');
        expect(perInfo.fieldCity.getAttribute("class")).toContain(TestData.ariainvalid_success);
    });
    it('Enter ' + TestData.City2 + ' data in city field', function() {
        perInfo.fieldCity.setText(TestData.City2 + '\t');
        expect(perInfo.fieldCity.getAttribute("class")).toContain(TestData.ariainvalid_success);
    });
    it('Enter ' + TestData.City3 + ' data in city field', function() {
        perInfo.fieldCity.setText(TestData.City3 + '\t');
        expect(perInfo.fieldCity.getAttribute("class")).toContain(TestData.ariainvalid_success);
    });
    it('Enter ' + TestData.City4 + '  in city field', function() {
        perInfo.fieldCity.setText(TestData.City4 + '\t');
        expect(perInfo.fieldCity.getAttribute("class")).toContain(TestData.ariainvalid_success);
    });
});

describe('CXINIT-489::492 - Validate state field with valid and invalid data', function() {
    beforeEach(function() {
        Utility.openApplication('');
        browser.driver.findElement(by.name('planZip')).clear().then(function() {
            browser.driver.findElement(by.name('planZip')).sendKeys('94560');
            browser.actions().sendKeys(protractor.Key.ENTER).perform();
            return true;
        });
    });
    it('Enter ' + TestData.State1 + ' in State field', function() {
        perInfo.fieldState.setText(TestData.State1 + '\t');
        expect(perInfo.fieldState.getAttribute("class")).toContain(TestData.ariainvalid_success);
    });
    it('Enter ' + TestData.State2 + ' in State field', function() {
        perInfo.fieldState.setText(TestData.State2 + '\t');
        expect(perInfo.fieldState.getAttribute("class")).toContain(TestData.ariainvalid_success);
    });
    it('Enter ' + TestData.State3 + ' in State field', function() {
        perInfo.fieldState.setText(TestData.State3 + '\t');
        expect(perInfo.fieldState.getAttribute("class")).toContain(TestData.ariainvalid_success);
    });
});

describe('CXINIT-489::492 - Validate Zip code field with valid and invalid data', function() {
    beforeEach(function() {
        Utility.openApplication('');
        browser.driver.findElement(by.name('planZip')).clear().then(function() {
            browser.driver.findElement(by.name('planZip')).sendKeys('94560');
            browser.actions().sendKeys(protractor.Key.ENTER).perform();
            return true;
        });
    });
    it('Flow 2: Enter valid values for each field', function() {
        data = TestData.Address_Valid;
        perInfo.fieldHomeAddr.setText(data.Home);
        perInfo.fieldCity.setText(data.City);
        perInfo.fieldState.setText(data.State);
        perInfo.fieldZipCode.setText(data.ZIPcode + '\t');
        expect(perInfo.zipPopBack.isPresentAndDisplayed()).toBeTruthy();

        expect(perInfo.errMsgZipCode.getText()).toEqual(data.ErrorMsg);
        perInfo.errMsgZipCode.click();
        browser.executeScript('window.scrollTo(0,30);');
        expect(perInfo.fieldZipCode.getAttribute("class")).not.toContain(TestData.ariainvalid_error);

    });
    it('Flow 3: Enter invalid values for each field', function() {
        data = TestData.Address_Invalid;
        perInfo.fieldHomeAddr.setText(data.Home);
        perInfo.fieldCity.setText(data.City);
        perInfo.fieldState.setText(data.State);
        perInfo.fieldZipCode.setText(data.ZIPcode + '\t');
        expect(perInfo.errMsgZipCode.getText()).toEqual(data.ErrorMsg);
        perInfo.errMsgZipCode.click();
        browser.sleep(5000);
        expect(perInfo.fieldZipCode.getAttribute("class")).toContain(TestData.ariainvalid_success);
    });
});
