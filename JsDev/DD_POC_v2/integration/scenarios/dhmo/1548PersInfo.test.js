var TestData = require('../../testData/'+testDataEnv+'/dhmo/dhmo.1548PersInfo.json');

var enrollPage = new(require('../../pageObjects/cxinit/enroll-page.js'));
var perInfo = new(require('../../pageObjects/cxinit/perInfo-page.js'));


describe('DHMO:1548-Personal Info Page: ', function() {
    beforeAll(function() {
        console.log(' ');
        console.log('--- CXINIT-1548 PersInfo AddrValidate ---')
        Utility.openApplication('', 'DELTA');
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
            Utility.delay(maxWait);
            expect(perInfo.fieldHomeAddr.getAttribute("class")).toContain(TestData.ariainvalid);
        });
    });

    it('Validating Home address fileds with City Auto Correct', function() {
        var data = TestData.Personalinfo.HAddress2;
        perInfo.fieldHomeAddr.setText(data.Home);
        perInfo.fieldCity.setText(data.City + '\t');
        Utility.delay(maxWait);
        expect(perInfo.fieldCity.getAttribute("value")).toEqual(data.City_Auto);
    });

    it('Validating Home address fileds with City & State Auto Correct', function() {
        var data = TestData.Personalinfo.HAddress3;
        perInfo.fieldHomeAddr.setText(data.Home);
        perInfo.fieldCity.setText(data.City);
        perInfo.fieldState.setText(data.State + '\t');
        Utility.delay(maxWait);
        expect(perInfo.fieldCity.getAttribute("value")).not.toEqual(data.City);
        expect(perInfo.fieldState.getAttribute("value")).not.toEqual(data.State);
    });

    it('Validating Home address fileds with Special Characters', function() {
        var data = TestData.Personalinfo.HAddress4;
        perInfo.fieldHomeAddr.setText(data.Home + '\t');
        perInfo.fieldCity.setText(data.City + '\t');
        Utility.delay(maxWait);
        expect(perInfo.errMsgHomeAddr.getText()).toEqual(data.ErrorMsg);
    });

    it('Validating Home address fileds with Invalid Data', function() {
        var data = TestData.Personalinfo.HAddress5;
        perInfo.fieldHomeAddr.setText(data.Home + '\t');
        perInfo.fieldCity.setText(data.City + '\t');
        Utility.delay(maxWait);
        expect(perInfo.errMsgHomeAddr.getText()).toEqual(data.ErrorMsg1);
        perInfo.fieldState.setText(data.State + '\t');
        perInfo.fieldZipCode.setText(data.ZIPcode + '\t');
        expect(perInfo.errMsgHomeAddr.getText()).toEqual(data.ErrorMsg0);
        expect(perInfo.errMsgZipCode.getText()).toEqual(data.ErrorMsg3);
        Utility.delay(maxWait);
        perInfo.errMsgHomeAddr.click();
        expect(perInfo.fieldHomeAddr.getAttribute("class")).toContain(data.ariainvalid);
    });

    it('Validating Home address fileds with address Suggestions', function() {
        var data = TestData.Personalinfo.HAddress6;
        perInfo.fieldHomeAddr.setText(data.Home);
        perInfo.fieldCity.setText(data.City + '\t');
        Utility.delay(maxWait);
        expect(perInfo.errMsgHomeAddr.getText()).toEqual(data.ErrorMsg0);
    });

    it('Validating Home address fileds with correct address as per Zipcode with apt/suite/floor number', function() {
        var data = TestData.Personalinfo.HAddress7;
        perInfo.fieldHomeAddr.setText(data.Home);
        perInfo.selectHomeAddress(data.SelectHome);
        perInfo.fieldHomeAddr.setText(data.AppendHome, true);
        Utility.delay(maxWait);
        expect(perInfo.fieldHomeAddr.getAttribute("class")).toContain(data.ariainvalid);
    });

    it('Validating Home address fileds with correct address as per Zipcode without apt', function() {
        var data = TestData.Personalinfo.HAddress8;
        perInfo.fieldHomeAddr.setText(data.Home);
        perInfo.selectHomeAddress(data.SelectHome);
        Utility.delay(maxWait);
        expect(perInfo.fieldHomeAddr.getAttribute("class")).toContain(data.ariainvalid);
        expect(perInfo.fieldCity.getAttribute("class")).toContain(data.ariainvalid);
        expect(perInfo.fieldState.getAttribute("class")).toContain(data.ariainvalid);
        expect(perInfo.fieldZipCode.getAttribute("class")).toContain(data.ariainvalid);
    });


    it('Validating Home address fileds with Incorrect address not as per zipcode', function() {
        var data = TestData.Personalinfo.HAddress9;
        perInfo.fieldHomeAddr.setText(data.Home);
        perInfo.selectHomeAddress(data.SelectHome);
        Utility.delay(maxWait);
        expect(perInfo.fieldZipCode.getAttribute("value")).toEqual(data.ZIPcode);
    });

});
