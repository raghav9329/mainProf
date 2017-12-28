/* [Personal Info Page] Address - Mailing 483 */
"use strict";
var TestData = require('../../testData/' + testDataEnv + '/dhmo/dhmo.483PersInfo.json');
var perInfo = new(require('../../pageObjects/cxinit/perInfo-page.js'));
var enrollPage = new(require('../../pageObjects/cxinit/enroll-page.js'));

var product = ['DHMO','DPPO','AHMO','APPO']; 
var states = ['NY', 'CA', 'TX', 'PA', 'FL'];

//To Navigate Personla Info Page
dataProvider(TestData.states, function(sData, sdescription) {
    if (states.indexOf(sdescription) != -1) {
        dataProvider(sData.products, function(tData, pdescription) {
            if (product.indexOf(pdescription) != -1) {


                describe('DHMO:483: MailAddr-PersInfo State:' + sdescription + 'Product:' + pdescription + '', function() {

                    var Fn_data = TestData.FirstNameFieldHelper;
                    beforeAll(function() {
                        console.log('cxinit 483');
                        Utility.openApplication('', 'DELTA');
                        enrollPage.enterHomePageDetails(tData.enrollData);
                        expect(perInfo.fieldFirstName.isPresentAndDisplayed()).toBeTruthy();
                        console.log('                                    ');
                        console.log('DHMO:483: Mailing Address == Start');
                        console.log('                                    ');
                    });
                    beforeEach(function () {
                        jasmine.addMatchers(custommatcher.customMatchers);
                    });

                    it('Step-1:should find & validate hidden fields', function() {
                        console.log('hidden field validation started')
                        expect(perInfo.hiddenfieldMailAddr.isPresentAndDisplayed()).toBeFalsy();
                        expect(perInfo.hiddenfieldCity.isPresentAndDisplayed()).toBeFalsy();
                        expect(perInfo.hiddenfieldState.isPresentAndDisplayed()).toBeFalsy();
                        expect(perInfo.hiddenfieldZipCode.isPresentAndDisplayed()).toBeFalsy();
                        expect(perInfo.hiddenfieldBrokerNum.isPresentAndDisplayed()).toBeFalsy();
                        console.log('hidden field validation done ');
                    });

                    it('Step-2:should unHide fields w/ Uncheck mailaddr chk box', function() {
                        console.log('hidden field validation done ');
                        console.log('hidden field validation upon uncheck : started');
                        perInfo.fieldEmailAddr.setText('');
                        perInfo.chkBoxDiffMailAddr.unCheck();
                        expect(perInfo.hiddenfieldMailAddr.isPresentAndDisplayed()).toBeTruthy();
                        expect(perInfo.hiddenfieldCity.isPresentAndDisplayed()).toBeTruthy();
                        expect(perInfo.hiddenfieldState.isPresentAndDisplayed()).toBeTruthy();
                        expect(perInfo.hiddenfieldZipCode.isPresentAndDisplayed()).toBeTruthy();
                        console.log('hidden field validation upon uncheck : done');
                    });
                    // 5/25/17 
                    // The following test confuses me
                    // I don't think the name matches the actions
                    // 11/8/17 breaking into two tests. 
                    // 1-1-chk mail addr is same as home
                    // 2-in same condition validate fields are not displayed
                    it('Step-3.0:should confirm my mailaddr is same as home addr and validate all fields are not displayed', function() {
                        //it('Step-3:check My mailing address is the same as my home address. and validate all fields are not displayed', function() {
                        //console.log('hidden field validation upon uncheck : done');
                        //My mailing address check box is not visible in screen.To move to check box entering blank in Email Address field
                        perInfo.fieldEmailAddr.setText(''); // why is this done?  the field is not part of the hidden field set 
                        perInfo.chkBoxDiffMailAddr.check();
                        //expect(perInfo.hiddenfieldMailAddr.isPresentAndDisplayed()).toBeFalsy();
                        //expect(perInfo.hiddenfieldCity.isPresentAndDisplayed()).toBeFalsy();
                        //expect(perInfo.hiddenfieldState.isPresentAndDisplayed()).toBeFalsy();
                        //expect(perInfo.hiddenfieldZipCode.isPresentAndDisplayed()).toBeFalsy();
                    });

                    // 11/8/17 adding 3.1 :  I want this test split up.
                    it('Step-3.1: validate all fields are not displayed', function() {
                        console.log('11/8/17 new Step 3.1 needs evaluation for correctness');
                        //My mailing address check box is not visible in screen.To move to check box entering blank in Email Address field
                        perInfo.fieldEmailAddr.setText(''); // why is this done?  the field is not part of the hidden field set 
                        //perInfo.chkBoxDiffMailAddr.check();
                        expect(perInfo.hiddenfieldMailAddr.isPresentAndDisplayed()).toBeFalsy();
                        expect(perInfo.hiddenfieldCity.isPresentAndDisplayed()).toBeFalsy();
                        expect(perInfo.hiddenfieldState.isPresentAndDisplayed()).toBeFalsy();
                        expect(perInfo.hiddenfieldZipCode.isPresentAndDisplayed()).toBeFalsy();
                    });


                    // ******************************************************************************
                    // There is a BUG in this code below.
                    // We can't use expected behavivor '\t' to actuall work in all browsers
                    // point in fact, This doesn't work in Firefox.
                    // This need to  be a clearly defined selection of FirsName filed to loose focus.
                    // ******************************************************************************
                    it('Step-4:Validate HomeAddr fld w/ Click-in / tab-out', function() {
                        perInfo.chkBoxDiffMailAddr.unCheck();
                        perInfo.hiddenfieldMailAddr.setText('');
                        perInfo.hiddenfieldCity.setText('');
                        expect(perInfo.errMsghiddenfieldMailAddr.getText()).toEqual(TestData.ErrorMsg_Homeaddress);
                        expect(perInfo.hiddenfieldMailAddr.getAttribute("class")).toContain(TestData.ariainvalid_error);
                    });

                    it('Step-5:Validate City field with Click-in / tab-out', function() {
                        perInfo.hiddenfieldCity.setText('');
                        perInfo.hiddenfieldState.setText('');
                        expect(perInfo.errMsghiddenfieldCity.getText()).toEqual(TestData.ErrorMsg_city);
                        expect(perInfo.hiddenfieldCity.getAttribute("class")).toContain(TestData.ariainvalid_error);
                    });
                    it('Step-6:Validate State field with Click-in / tab-out', function() {
                        perInfo.hiddenfieldState.setText('');
                        perInfo.hiddenfieldZipCode.setText('');
                        expect(perInfo.errMsghiddenfieldState.getText()).toEqual(TestData.ErrorMsg_State);
                        expect(perInfo.hiddenfieldState.getAttribute("class")).toContain(TestData.ariainvalid_error);
                    });
                    it('Step-7:Validate Zip Code field with Click-in / tab-out', function() {
                        perInfo.hiddenfieldZipCode.setText('');
                        perInfo.hiddenfieldState.setText('');
                        expect(perInfo.errMsghiddenfieldZipCode.getText()).toEqual(TestData.ErrorMsg_ZipCode);
                        expect(perInfo.hiddenfieldZipCode.getAttribute("class")).toContain(TestData.ariainvalid_error);
                    });
                    //  });

                    //describe('CXINIT-483::486 - Validate Address Mailing field with valid and invalid data', function() {

                    it('Step-8:Should complain: Mailing Addr blank data', function() {
                        var data = tData.HAddress_Blank;
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
                        var data = tData.HAddress_Valid;
                        perInfo.hiddenfieldMailAddr.setText(data.Home + '\t');
                        perInfo.waitUntilLoderDisapper();
                        expect(perInfo.hiddenfieldMailAddr.getAttribute("class")).toContain(TestData.ariainvalid_success);
                        expect(perInfo.hiddenfieldState.getAttribute("class")).toContain(TestData.ariainvalid_success);
                        expect(perInfo.hiddenfieldCity.getAttribute("class")).toContain(TestData.ariainvalid_success);
                    });


                    it('Step-10:Should detect Mailing Addr invalid missing Apt# ', function() {
                        var data = tData.HAddress_Invalid;
                        perInfo.hiddenfieldMailAddr.setText(data.Home);
                        perInfo.fieldEmailAddr.click();
                        perInfo.waitUntilLoderDisapper();
                        expect(perInfo.apptFloorNumError.getText()).toEqual(data.ErrorMsg);
                        expect(perInfo.hiddenfieldMailAddr.getAttribute("class")).toContain(TestData.ariainvalid_error);
                        expect(perInfo.hiddenfieldState.getAttribute("class")).toContain(TestData.ariainvalid_error);
                        expect(perInfo.hiddenfieldCity.getAttribute("class")).toContain(TestData.ariainvalid_error);
                    });
                    it('Step-11:Should detect Mailing Addr Home Chars wrong', function() {
                        var data =tData.HAddress_SplChar;
                        perInfo.hiddenfieldMailAddr.setText(data.Home);
                        perInfo.fieldEmailAddr.click();
                        perInfo.waitUntilLoderDisapper();
                        expect(perInfo.apptFloorNumError.getText()).toEqual(data.ErrorMsg);
                        expect(perInfo.hiddenfieldMailAddr.getAttribute("class")).toContain(TestData.ariainvalid_error);
                        // expect(perInfo.hiddenfieldMailAddr.getAttribute("class")).toContain(TestData.ariainvalid_success);


                    });
                    it('Step-12:Should detect Mailing Addr another zip code addr ', function() {
                        var data = tData.HAddress_ZIP;
                        perInfo.hiddenfieldMailAddr.setText(data.HomeAddress);
                        // 5/25/17  Mark needs to dig into what is different about these calls above and below
                        browser.sleep(3000);
                        perInfo.selectHomeAddress(data.FullAddress);
                        perInfo.waitUntilLoderDisapper();
                        expect(perInfo.hiddenfieldMailAddr.getAttribute("class")).toContain(TestData.ariainvalid_success);
                    });

                    // });

                    //describe('CXINIT-483::486 - Validate city field in Address Mailing with valid and invalid data', function() {
                    it('Step-13:Should Accept Entry of ' + TestData.City1 + ' data in city field', function() {
                        perInfo.hiddenfieldMailAddr.setText(tData.Address_Valid.Home);
                        perInfo.hiddenfieldCity.setText(TestData.City1);
                        perInfo.fieldEmailAddr.click();
                        perInfo.waitUntilLoderDisapper();
                        expect(perInfo.hiddenfieldCity.getAttribute("class")).toContain(TestData.ariainvalid_success);
                    });
                    it('Step-14:Should Accept Entry of  ' + TestData.City2 + ' data in city field', function() {
                        perInfo.hiddenfieldCity.setText(TestData.City2);
                        perInfo.fieldEmailAddr.click();
                        expect(perInfo.hiddenfieldCity.getAttribute("class")).toContain(TestData.ariainvalid_success);
                    });
                    it('Step-15:Should Accept Entry of  ' + TestData.City3 + ' data in city field', function() {
                        perInfo.hiddenfieldCity.setText(TestData.City3);
                        perInfo.fieldEmailAddr.click();
                        expect(perInfo.hiddenfieldCity.getAttribute("class")).toContain(TestData.ariainvalid_success);
                    });
                    it('Step-16:Should Accept Entry of  ' + TestData.City4 + '  in city field', function() {
                        perInfo.hiddenfieldCity.setText(TestData.City4);
                        perInfo.fieldEmailAddr.click();
                        expect(perInfo.hiddenfieldCity.getAttribute("class")).toContain(TestData.ariainvalid_success);
                    });
                    //  });

                    //  describe('CXINIT-483::486 - Validate state field in Address Mailing with valid and invalid data', function() {

                    it('Step-17:Enter ' + TestData.State1 + ' in State field', function() {
                        perInfo.hiddenfieldState.setText(TestData.State1);
                        perInfo.fieldEmailAddr.click();
                        expect(perInfo.hiddenfieldState.getAttribute("class")).toContain(TestData.ariainvalid_success);
                    });
                    it('Step-18:Enter ' + TestData.State2 + ' in State field', function() {
                        perInfo.hiddenfieldState.setText(TestData.State2);
                        perInfo.fieldEmailAddr.click();
                        expect(perInfo.hiddenfieldState.getAttribute("class")).toContain(TestData.ariainvalid_success);
                    });
                    it('Step-19:Enter ' + TestData.State3 + ' in State field', function() {
                        perInfo.hiddenfieldState.setText(TestData.State3);
                        perInfo.fieldEmailAddr.click();
                        expect(perInfo.hiddenfieldState.getAttribute("class")).toContain(TestData.ariainvalid_success);
                    });
                    //  });

                    // describe('CXINIT-483::486 - Validate Zip code field in Address Mailing with valid and invalid data', function() {

                    it('Step-20:Enter valid values for each field', function() {
                        var data = tData.Address_Valid;
                        perInfo.hiddenfieldMailAddr.setText(data.Home);
                        perInfo.hiddenfieldCity.setText(data.City);
                        perInfo.hiddenfieldState.setText(data.State);
                        perInfo.hiddenfieldZipCode.setText(data.ZIPcode);
                        perInfo.fieldEmailAddr.click();
                        expect(perInfo.errMsghiddenfieldZipCode.getText()).toEqual(data.ErrorMsg);
                        perInfo.errMsghiddenfieldZipCode.click();
                        expect(perInfo.hiddenfieldZipCode.getAttribute("class")).not.toContain(TestData.ariainvalid_error);

                    });
                    it('Step-21:Enter invalid values for each field', function() {
                        var data = tData.Address_Invalid;
                        perInfo.hiddenfieldMailAddr.setText(data.Home);
                        perInfo.hiddenfieldCity.setText(data.City);
                        perInfo.hiddenfieldState.setText(data.State);
                        perInfo.hiddenfieldZipCode.setText(data.ZIPcode);
                        perInfo.fieldEmailAddr.click();
                        perInfo.waitUntilLoderDisapper();
                        expect(perInfo.errMsghiddenfieldZipCode.getText()).toEqual(data.ErrorMsg);
                        perInfo.errMsghiddenfieldZipCode.click();
                        browser.sleep(2000);
                        expect(perInfo.hiddenfieldZipCode.getAttribute("class")).not.toContain(TestData.ariainvalid_error);
                    });

                });
            }
        });
    }
});
