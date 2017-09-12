var TestData = require('../../testData/'+testDataEnv+'/dhmo/dhmo.1549PersInfo.json');

var enrollPage = new(require('../../pageObjects/cxinit/enroll-page.js'));
var perInfo = new(require('../../pageObjects/cxinit/perInfo-page.js'));


describe('DHMO:1549- Personal Info Page: ', function() {
    beforeAll(function() {
        console.log(' ');
        console.log('--- CXINIT-1549 PersInfo AddrValidate ---')
        Utility.openApplication('','DELTA');
        enrollPage.enterHomePageDetails(TestData.enrollData);
        expect(perInfo.fieldFirstName.isPresentAndDisplayed()).toBeTruthy();
        perInfo.fillPersonalInfo(TestData);
        perInfo.fillAddress(TestData);
    });

    it('Validating Home address fileds with errormessage and green checkmark', function() {
        var data = TestData.Personalinfo.HAddress1;
        if (perInfo.chkBoxDiffMailAddr.isSelected()) perInfo.chkBoxDiffMailAddr.unCheck();
        perInfo.hiddenfieldMailAddr.setText(data.Home + '\t');
        perInfo.hiddenfieldCity.setText(data.City + '\t');
        perInfo.hiddenfieldState.setText(data.State + '\t');
        perInfo.hiddenfieldZipCode.setText(data.ZIPcode + '\t');
        browser.sleep(maxWait);
        expect(perInfo.servererrMailAddr.getText()).toEqual(data.ErrorMsg);
        perInfo.hiddenfieldMailAddr.setText(data.HomeValid + '\t');
        browser.sleep(maxWait);
        expect(perInfo.hiddenfieldMailAddr.getAttribute("class")).toContain(TestData.ariainvalid);

    });

    it('Validating Home address fileds with green checkmark', function() {
        var data = TestData.Personalinfo.HAddress1;
        if (perInfo.chkBoxDiffMailAddr.isSelected()) perInfo.chkBoxDiffMailAddr.unCheck();
        perInfo.hiddenfieldMailAddr.setText(data.HomeValid + '\t');
        perInfo.hiddenfieldCity.setText(data.City + '\t');
        perInfo.hiddenfieldState.setText(data.State + '\t');
        perInfo.hiddenfieldZipCode.setText(data.ZIPcode + '\t').then(function() {
            browser.sleep(maxWait);
            expect(perInfo.hiddenfieldMailAddr.getAttribute("class")).toContain(TestData.ariainvalid);
        });
    });

    it('Validating Home address fileds with City Auto Correct', function() {
        var data = TestData.Personalinfo.HAddress2;
        if (perInfo.chkBoxDiffMailAddr.isSelected()) perInfo.chkBoxDiffMailAddr.unCheck();
        perInfo.hiddenfieldMailAddr.setText(data.Home);
        perInfo.hiddenfieldCity.setText(data.City + '\t');
        perInfo.hiddenfieldState.setText(data.State + '\t');
        perInfo.hiddenfieldZipCode.setText(data.ZIPcode + '\t');
        browser.sleep(maxWait);
        expect(perInfo.hiddenfieldCity.getAttribute("value")).toEqual(data.City_Auto);
    });

    it('Validating Home address fileds with City & State Auto Correct', function() {
        var data = TestData.Personalinfo.HAddress3;
        if (perInfo.chkBoxDiffMailAddr.isSelected()) perInfo.chkBoxDiffMailAddr.unCheck();
        perInfo.hiddenfieldMailAddr.setText(data.Home);
        perInfo.hiddenfieldCity.setText(data.City);
        perInfo.hiddenfieldState.setText(data.State + '\t');
        perInfo.hiddenfieldZipCode.setText(data.ZIPcode + '\t');
        browser.sleep(maxWait);
        expect(perInfo.hiddenfieldCity.getAttribute("value")).not.toEqual(data.City);
        expect(perInfo.hiddenfieldState.getAttribute("value")).not.toEqual(data.State);
    });

    it('Validating Home address fileds with Special Characters', function() {
        var data = TestData.Personalinfo.HAddress4;
        if (perInfo.chkBoxDiffMailAddr.isSelected()) perInfo.chkBoxDiffMailAddr.unCheck();
        perInfo.hiddenfieldMailAddr.setText(data.Home + '\t');
        perInfo.hiddenfieldCity.setText(data.City + '\t');
        perInfo.hiddenfieldState.setText(data.State + '\t');
        perInfo.hiddenfieldZipCode.setText(data.ZIPcode + '\t');
        browser.sleep(maxWait);
        expect(perInfo.servererrMailAddr.getText()).toEqual(data.ErrorMsg);
    });

    it('Validating Home address fileds with Invalid Data', function() {
        var data = TestData.Personalinfo.HAddress5;
        if (perInfo.chkBoxDiffMailAddr.isSelected()) perInfo.chkBoxDiffMailAddr.unCheck();
        perInfo.hiddenfieldMailAddr.setText(data.Home + '\t');
        perInfo.hiddenfieldCity.setText(data.City + '\t');
        browser.sleep(longWait);
        expect(perInfo.servererrMailAddr.getText()).toEqual(data.ErrorMsg1);
        perInfo.hiddenfieldState.setText(data.State + '\t');
        perInfo.hiddenfieldZipCode.setText(data.ZIPcode + '\t');
        expect(perInfo.servererrMailAddr.getText()).toEqual(data.ErrorMsg1);
        expect(perInfo.errMsgZipCode.getText()).toEqual(data.ErrorMsg3);
        browser.sleep(longWait);
        perInfo.servererrMailAddr.click();
        expect(perInfo.hiddenfieldMailAddr.getAttribute("class")).toContain(data.ariainvalid);
    });

    it('Validating Home address fileds with address Suggestions', function() {
        var data = TestData.Personalinfo.HAddress6;
        if (perInfo.chkBoxDiffMailAddr.isSelected()) perInfo.chkBoxDiffMailAddr.unCheck();
        perInfo.hiddenfieldMailAddr.setText(data.Home);
        perInfo.hiddenfieldCity.setText(data.City + '\t');
        perInfo.hiddenfieldState.setText(data.State + '\t');
        perInfo.hiddenfieldZipCode.setText(data.ZIPcode + '\t');
        browser.sleep(longWait);
        expect(perInfo.servererrMailAddr.getText()).toEqual(data.ErrorMsg);
    });

    it('Validating Home address fileds with correct address as per Zipcode with apt/suite/floor number', function() {
        var data = TestData.Personalinfo.HAddress7;
        if (perInfo.chkBoxDiffMailAddr.isSelected()) perInfo.chkBoxDiffMailAddr.unCheck();
        perInfo.hiddenfieldMailAddr.setText(data.Home);
        perInfo.selectHomeAddress(data.SelectHome);
        perInfo.hiddenfieldMailAddr.setText(data.AppendHome, true);
        browser.sleep(longWait);
        expect(perInfo.hiddenfieldMailAddr.getAttribute("class")).toContain(data.ariainvalid);
    });

    it('Validating Home address fileds with correct address as per Zipcode without apt', function() {
        var data = TestData.Personalinfo.HAddress8;
        if (perInfo.chkBoxDiffMailAddr.isSelected()) perInfo.chkBoxDiffMailAddr.unCheck();
        perInfo.hiddenfieldMailAddr.setText(data.Home);
        perInfo.selectHomeAddress(data.SelectHome);
        browser.sleep(longWait);
        expect(perInfo.hiddenfieldMailAddr.getAttribute("class")).toContain(data.ariainvalid);
        expect(perInfo.hiddenfieldCity.getAttribute("class")).toContain(data.ariainvalid);
        expect(perInfo.hiddenfieldState.getAttribute("class")).toContain(data.ariainvalid);
        expect(perInfo.hiddenfieldZipCode.getAttribute("class")).toContain(data.ariainvalid);
    });


    it('Validating Home address fileds with Incorrect address not as per zipcode', function() {
        var data = TestData.Personalinfo.HAddress9;
        if (perInfo.chkBoxDiffMailAddr.isSelected()) perInfo.chkBoxDiffMailAddr.unCheck();
        perInfo.hiddenfieldMailAddr.setText(data.Home);
        perInfo.selectHomeAddress(data.SelectHome);
        browser.sleep(longWait);
        expect(perInfo.hiddenfieldZipCode.getAttribute("value")).not.toEqual(data.ZIPcode);
    });

});
