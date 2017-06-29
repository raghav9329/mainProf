/* [Personal Info Page] Address - Mailing 483 */
"use strict";
var TestData = require("../../testData/cxinit/cxinit.483.json");
var perInfo = new(require('../../pageObjects/cxinit/perInfo-page.js'));
var homePage = new(require('../../pageObjects/cxinit/home-page.js'));


describe('CXINIT-483: Mailing Address-PersInfo', function() {
		
    var Fn_data = TestData.FirstNameFieldHelper;
    beforeAll(function() {
        console.log('cxinit 483');
		Utility.openApplication('');
        browser.driver.findElement(by.name('planZip')).clear().then(function() {
            browser.driver.findElement(by.name('planZip')).sendKeys('94560');
            browser.actions().sendKeys(protractor.Key.ENTER).perform();
            perInfo.fillPersonalInfo(TestData);
        });
        // console.log('                                    ');
        // console.log('CXINIT-483: Mailing Address == Start');
        // console.log('                                    ');
    });

    it('Step-1:should find and validate hidden fields do not display when check box checked', function() {
        console.log('hidden field validation started')
        expect(perInfo.hiddenfieldMailAddr.isPresentAndDisplayed()).toBeFalsy();
        expect(perInfo.hiddenfieldCity.isPresentAndDisplayed()).toBeFalsy();
        expect(perInfo.hiddenfieldState.isPresentAndDisplayed()).toBeFalsy();
        expect(perInfo.hiddenfieldZipCode.isPresentAndDisplayed()).toBeFalsy();
        expect(perInfo.hiddenfieldBrokerNum.isPresentAndDisplayed()).toBeFalsy();
        //        console.log('hidden field validation done ');
    });

    it('Step-2:should display fields upon Uncheck mailing addr check box. ', function() {
        console.log('hidden field validation done ');
        console.log('hidden field validation upon uncheck : started');
        perInfo.fieldEmailAddr.setText('');
        perInfo.chkBoxDiffMailAddr.unCheck();
        expect(perInfo.hiddenfieldMailAddr.isPresentAndDisplayed()).toBeTruthy();
        expect(perInfo.hiddenfieldCity.isPresentAndDisplayed()).toBeTruthy();
        expect(perInfo.hiddenfieldState.isPresentAndDisplayed()).toBeTruthy();
        expect(perInfo.hiddenfieldZipCode.isPresentAndDisplayed()).toBeTruthy();
        //console.log('hidden field validation upon uncheck : done');
    });
    // 5/25/17 
    // The following test confuses me
    // I don't think the name matches the actions
    it('Step-3:check My mailing address is the same as my home address. and validate all fields are not displayed', function() {
        console.log('hidden field validation upon uncheck : done');
        //My mailing address check box is not visible in screen.To move to check box entering blank in Email Address field
        perInfo.fieldEmailAddr.setText(''); // why is this done?  the field is not part of the hidden field set 
        perInfo.chkBoxDiffMailAddr.check();
        expect(perInfo.hiddenfieldMailAddr.isPresentAndDisplayed()).toBeFalsy();
        expect(perInfo.hiddenfieldCity.isPresentAndDisplayed()).toBeFalsy();
        expect(perInfo.hiddenfieldState.isPresentAndDisplayed()).toBeFalsy();
        expect(perInfo.hiddenfieldZipCode.isPresentAndDisplayed()).toBeFalsy();
    });
    it('Step-4:Validate Home Address field with Click-in / tab-out', function() {
        perInfo.chkBoxDiffMailAddr.unCheck();
        perInfo.hiddenfieldMailAddr.setText('' + '\t');
        expect(perInfo.errMsghiddenfieldMailAddr.getText()).toEqual(TestData.ErrorMsg_Homeaddress);
        expect(perInfo.hiddenfieldMailAddr.getAttribute("class")).toContain(TestData.ariainvalid_error);
    });
    it('Step-5:Validate City field with Click-in / tab-out', function() {
        perInfo.hiddenfieldCity.setText('' + '\t');
        expect(perInfo.errMsghiddenfieldCity.getText()).toEqual(TestData.ErrorMsg_city);
        expect(perInfo.hiddenfieldCity.getAttribute("class")).toContain(TestData.ariainvalid_error);
    });
    it('Step-6:Validate State field with Click-in / tab-out', function() {
        perInfo.hiddenfieldState.setText('' + '\t');
        expect(perInfo.errMsghiddenfieldState.getText()).toEqual(TestData.ErrorMsg_State);
        expect(perInfo.hiddenfieldState.getAttribute("class")).toContain(TestData.ariainvalid_error);
    });
    it('Step-7:Validate Zip Code field with Click-in / tab-out', function() {
        perInfo.hiddenfieldZipCode.setText('' + '\t');
        expect(perInfo.errMsghiddenfieldZipCode.getText()).toEqual(TestData.ErrorMsg_ZipCode);
        expect(perInfo.hiddenfieldZipCode.getAttribute("class")).toContain(TestData.ariainvalid_error);
    });
    //  });

    //describe('CXINIT-483::486 - Validate Address Mailing field with valid and invalid data', function() {

    it('Step-8:Should complain: Mailing Addr blank data', function() {
        var data = TestData.Personalinfo.HAddress_Blank;
        perInfo.hiddenfieldMailAddr.setText(data.Home);
        perInfo.hiddenfieldCity.setText(data.City);
        perInfo.hiddenfieldState.setText(data.State);
        perInfo.hiddenfieldZipCode.setText(data.ZIPcode + '\t');
        browser.sleep(200);
        expect(perInfo.errMsghiddenfieldMailAddr.getText()).toEqual(data.ErrorMsg);
        expect(perInfo.hiddenfieldMailAddr.getAttribute("class")).toContain(TestData.ariainvalid_error);
        expect(perInfo.hiddenfieldState.getAttribute("class")).toContain(TestData.ariainvalid_success);
        expect(perInfo.hiddenfieldCity.getAttribute("class")).toContain(TestData.ariainvalid_success);
    });

    it('Step-9:Should accept: Mailing Addr valid data', function() {
        var data = TestData.Personalinfo.HAddress_Valid;
        perInfo.hiddenfieldMailAddr.setText(data.Home + '\t');
        Utility.waitUntilElementNotPresent(element(by.css('img.loaderImg')));
        // browser.sleep(2000);    
        expect(perInfo.hiddenfieldMailAddr.getAttribute("class")).toContain(TestData.ariainvalid_success);
        expect(perInfo.hiddenfieldState.getAttribute("class")).toContain(TestData.ariainvalid_success);
        expect(perInfo.hiddenfieldCity.getAttribute("class")).toContain(TestData.ariainvalid_success);
    });


    it('Step-10:Should detect Mailing Addr invalid missing Apt# ', function() {
        var data = TestData.Personalinfo.HAddress_Invalid;
        perInfo.hiddenfieldMailAddr.setText(data.Home + '\t');
        // browser.sleep(200); 
        Utility.waitUntilElementNotPresent(element(by.css('img.loaderImg')));
        // expect(perInfo.errMsghiddenfieldMailAddr.getText()).toEqual(data.ErrorMsg);
        expect(perInfo.apptFloorNumError.getText()).toEqual(data.ErrorMsg);
        expect(perInfo.hiddenfieldMailAddr.getAttribute("class")).toContain(TestData.ariainvalid_error);
        expect(perInfo.hiddenfieldState.getAttribute("class")).toContain(TestData.ariainvalid_error);
        expect(perInfo.hiddenfieldCity.getAttribute("class")).toContain(TestData.ariainvalid_error);
    });
    it('Step-11:Should detect Mailing Addr Home Chars wrong', function() {
        var data = TestData.Personalinfo.HAddress_SplChar;
        perInfo.hiddenfieldMailAddr.setText(data.Home + '\t');
        //browser.sleep(5000);
        Utility.waitUntilElementNotPresent(element(by.css('img.loaderImg')));
        expect(perInfo.apptFloorNumError.getText()).toEqual(data.ErrorMsg);
        expect(perInfo.hiddenfieldMailAddr.getAttribute("class")).toContain(TestData.ariainvalid_success);

    });
    it('Step-12:Should detect Mailing Addr another zip code addr ', function() {
        var data = TestData.Personalinfo.HAddress_ZIP;
        perInfo.hiddenfieldMailAddr.setText(data.HomeAddress);
        // 5/25/17  Mark needs to dig into what is different about these calls above and below
        perInfo.selectHomeAddress(data.FullAddress);
        browser.sleep(3000);
        expect(perInfo.hiddenfieldMailAddr.getAttribute("class")).toContain(TestData.ariainvalid_success);
    });

    // });

    //describe('CXINIT-483::486 - Validate city field in Address Mailing with valid and invalid data', function() {
    it('Step-13:Should Accept Entry of ' + TestData.City1 + ' data in city field', function() {
        perInfo.hiddenfieldMailAddr.setText(TestData.Address_Valid.Home);
        perInfo.hiddenfieldCity.setText(TestData.City1 + '\t');
        expect(perInfo.hiddenfieldCity.getAttribute("class")).toContain(TestData.ariainvalid_success);
    });
    it('Step-14:Should Accept Entry of  ' + TestData.City2 + ' data in city field', function() {
        perInfo.hiddenfieldCity.setText(TestData.City2 + '\t');
        expect(perInfo.hiddenfieldCity.getAttribute("class")).toContain(TestData.ariainvalid_success);
    });
    it('Step-15:Should Accept Entry of  ' + TestData.City3 + ' data in city field', function() {
        perInfo.hiddenfieldCity.setText(TestData.City3 + '\t');
        expect(perInfo.hiddenfieldCity.getAttribute("class")).toContain(TestData.ariainvalid_success);
    });
    it('Step-16:Should Accept Entry of  ' + TestData.City4 + '  in city field', function() {
        perInfo.hiddenfieldCity.setText(TestData.City4 + '\t');
        expect(perInfo.hiddenfieldCity.getAttribute("class")).toContain(TestData.ariainvalid_success);
    });
    //  });

    //  describe('CXINIT-483::486 - Validate state field in Address Mailing with valid and invalid data', function() {

    it('Step-17:Enter ' + TestData.State1 + ' in State field', function() {
        perInfo.hiddenfieldState.setText(TestData.State1 + '\t');
        expect(perInfo.hiddenfieldState.getAttribute("class")).toContain(TestData.ariainvalid_success);
    });
    it('Step-18:Enter ' + TestData.State2 + ' in State field', function() {
        perInfo.hiddenfieldState.setText(TestData.State2 + '\t');
        expect(perInfo.hiddenfieldState.getAttribute("class")).toContain(TestData.ariainvalid_success);
    });
    it('Step-19:Enter ' + TestData.State3 + ' in State field', function() {
        perInfo.hiddenfieldState.setText(TestData.State3 + '\t');
        expect(perInfo.hiddenfieldState.getAttribute("class")).toContain(TestData.ariainvalid_success);
    });
    //  });

    // describe('CXINIT-483::486 - Validate Zip code field in Address Mailing with valid and invalid data', function() {

    it('Step-20:Enter valid values for each field', function() {
        var data = TestData.Address_Valid;
        perInfo.hiddenfieldMailAddr.setText(data.Home);
        perInfo.hiddenfieldCity.setText(data.City);
        perInfo.hiddenfieldState.setText(data.State);
        perInfo.hiddenfieldZipCode.setText(data.ZIPcode + '\t');
        expect(perInfo.errMsghiddenfieldZipCode.getText()).toEqual(data.ErrorMsg);
        perInfo.errMsghiddenfieldZipCode.click();
        expect(perInfo.hiddenfieldZipCode.getAttribute("class")).not.toContain(TestData.ariainvalid_error);

    });
    it('Step-21:Enter invalid values for each field', function() {
        var data = TestData.Address_Invalid;
        perInfo.hiddenfieldMailAddr.setText(data.Home);
        perInfo.hiddenfieldCity.setText(data.City);
        perInfo.hiddenfieldState.setText(data.State);
        perInfo.hiddenfieldZipCode.setText(data.ZIPcode + '\t');
        expect(perInfo.errMsghiddenfieldZipCode.getText()).toEqual(data.ErrorMsg);
        perInfo.errMsghiddenfieldZipCode.click();
        browser.sleep(200);
        expect(perInfo.hiddenfieldZipCode.getAttribute("class")).toContain(TestData.ariainvalid_error);
    });
});
