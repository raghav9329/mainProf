var TestData = require("../../testData/cxinit/cxinit.1548.json");
var enrollPage = new(require('../../businessComponents/homePage.js'));
var perInfo = new(require('../../pageObjects/cxinit/perInfo-page.js'));


describe('Personal Info Page: ', function() {
    beforeAll(function() {
        Utility.openApplication('');
        enrollPage.enterHomePageDetails(TestData.enrollData);
        expect(perInfo.fieldFirstName.isPresentAndDisplayed()).toBeTruthy();
        perInfo.fillPersonalInfo(TestData);
    });

    beforeEach(function() {
        browser.refresh();
    });

    it('Validating Home address fileds with errormessage and green checkmark', function() {
        var data = TestData.Personalinfo.HAddress1;
        perInfo.fieldHomeAddr.setText(data.Home + '\t');
        perInfo.fieldCity.setText(data.City + '\t');
        expect(perInfo.errMsgHomeAddr.getText()).toEqual(data.ErrorMsg);
        perInfo.fieldHomeAddr.setText(data.HomeValid + '\t');
        expect(perInfo.fieldHomeAddr.getAttribute("class")).toContain(TestData.ariainvalid);

    });

    it('Validating Home address fileds with green checkmark', function() {
        var data = TestData.Personalinfo.HAddress1;
        perInfo.fieldHomeAddr.setText(data.HomeValid + '\t');
        perInfo.fieldCity.setText(data.City + '\t').then(function() {
        browser.sleep(maxWait);
        expect(perInfo.fieldHomeAddr.getAttribute("class")).toContain(TestData.ariainvalid);
        });
    });

    it('Validating Home address fileds with City Auto Correct', function() {
        var data = TestData.Personalinfo.HAddress2;
        perInfo.fieldHomeAddr.setText(data.Home);
        perInfo.fieldCity.setText(data.City+ '\t');
        browser.sleep(maxWait);
        expect(perInfo.fieldCity.getAttribute("value")).toEqual(data.City_Auto);
    });

    it('Validating Home address fileds with City & State Auto Correct', function() {
        var data = TestData.Personalinfo.HAddress3;
        perInfo.fieldHomeAddr.setText(data.Home);
        perInfo.fieldCity.setText(data.City);
        perInfo.fieldState.setText(data.State + '\t');
        browser.sleep(maxWait);
        expect(perInfo.fieldCity.getAttribute("value")).not.toEqual(data.City);
        expect(perInfo.fieldState.getAttribute("value")).not.toEqual(data.State);
    });

it('Validating Home address fileds with Special Characters', function() {
        var data = TestData.Personalinfo.HAddress4;
        perInfo.fieldHomeAddr.setText(data.Home+ '\t');
        perInfo.fieldCity.setText(data.City+ '\t');
        browser.sleep(maxWait);
        expect(perInfo.errMsgHomeAddr.getText()).toEqual(data.ErrorMsg);
    });

it('Validating Home address fileds with Invalid Data', function() {
        var data = TestData.Personalinfo.HAddress5;
        perInfo.fieldHomeAddr.setText(data.Home+ '\t');
        perInfo.fieldCity.setText(data.City+ '\t');
        browser.sleep(maxWait);
        expect(perInfo.errMsgHomeAddr.getText()).toEqual(data.ErrorMsg1);
        perInfo.fieldState.setText(data.State + '\t');
        perInfo.fieldZipCode.setText(data.ZIPcode + '\t');
        expect(perInfo.errMsgHomeAddr.getText()).toEqual(data.ErrorMsg1);
        expect(perInfo.errMsgZipCode.getText()).toEqual(data.ErrorMsg3);
        browser.sleep(maxWait);
        perInfo.errMsgHomeAddr.click();
        expect(perInfo.fieldHomeAddr.getAttribute("class")).toContain(data.ariainvalid);
    });

it('Validating Home address fileds with address Suggestions', function() {
        var data = TestData.Personalinfo.HAddress6;
        perInfo.fieldHomeAddr.setText(data.Home);
        perInfo.fieldCity.setText(data.City+ '\t');
        browser.sleep(maxWait);
        expect(perInfo.errMsgHomeAddr.getText()).toEqual(data.ErrorMsg);
    });

it('Validating Home address fileds with correct address as per Zipcode with apt/suite/floor number', function() {
        var data = TestData.Personalinfo.HAddress7;
        perInfo.fieldHomeAddr.setText(data.Home);
        perInfo.selectHomeAddress(data.SelectHome);
        perInfo.fieldHomeAddr.setText(data.AppendHome, true);
        browser.sleep(maxWait);
        expect(perInfo.fieldHomeAddr.getAttribute("class")).toContain(data.ariainvalid);
    });

it('Validating Home address fileds with correct address as per Zipcode without apt', function() {
        var data = TestData.Personalinfo.HAddress8;
        perInfo.fieldHomeAddr.setText(data.Home);
        perInfo.selectHomeAddress(data.SelectHome);
        browser.sleep(maxWait);
        expect(perInfo.fieldHomeAddr.getAttribute("class")).toContain(data.ariainvalid);
        expect(perInfo.fieldCity.getAttribute("class")).toContain(data.ariainvalid);
        expect(perInfo.fieldState.getAttribute("class")).toContain(data.ariainvalid);
        expect(perInfo.fieldZipCode.getAttribute("class")).toContain(data.ariainvalid);
    });


it('Validating Home address fileds with Incorrect address not as per zipcode', function() {
        var data = TestData.Personalinfo.HAddress9;
        perInfo.fieldHomeAddr.setText(data.Home);
        perInfo.selectHomeAddress(data.SelectHome);
        browser.sleep(maxWait);
        expect(perInfo.fieldZipCode.getAttribute("value")).not.toEqual(data.ZIPcode);
    });

});
