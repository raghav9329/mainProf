/* [Personal Info Page] Address - Mailing 483 */
"use strict";
var TestData   = require('../../../testData/' + testDataEnv + '/dhmo/dhmo.483PersInfo.json');
var perInfo    = new(require('../../../pageObjects/cxinit/perInfo-page.js'));
var enrollPage = new(require('../../../pageObjects/cxinit/enroll-page.js'));
var statesData = require('../../../testData/' + testDataEnv + '/statesAndProducts.json');


//To Navigate Personla Info Page
// dataProvider(TestData.states, function (sData, sdescription) {
dataProvider(statesData.states, function (sData, sdescription) {
    if (states.indexOf(sdescription) != -1) {
        dataProvider(sData.products, function (tData, pdescription) {
            if (product.indexOf(pdescription) != -1) {

                describe('483: MailAddr-PersInfo State:' + sdescription + 'Product:' + pdescription + '', function() {

                    beforeAll(function() {
                        console.log('cxinit 483');
                        Utility.openApplication('', tData.product);
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
                   

                    
                    it('Step-3: validate all fields are not displayed', function() {
                        console.log('11/8/17 new Step 3.1 needs evaluation for correctness');
                        perInfo.fieldEmailAddr.setText(''); // why is this done?  the field is not part of the hidden field set 
                        //perInfo.chkBoxDiffMailAddr.check();
                        expect(perInfo.hiddenfieldMailAddr.isPresentAndDisplayed()).toBeTruthy();
                        expect(perInfo.hiddenfieldCity.isPresentAndDisplayed()).toBeTruthy();
                        expect(perInfo.hiddenfieldState.isPresentAndDisplayed()).toBeTruthy();
                        expect(perInfo.hiddenfieldZipCode.isPresentAndDisplayed()).toBeTruthy();
                    });


                    

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
                        var data = TestData.HAddress_Blank;
                        perInfo.hiddenfieldMailAddr.setText(data.Home);
                        perInfo.hiddenfieldCity.setText(data.City);
                        perInfo.hiddenfieldState.setText(data.State);
                        perInfo.hiddenfieldZipCode.setText(data.ZIPcode + '\t');
                        expect(perInfo.errMsghiddenfieldMailAddr.getText()).toEqual(data.ErrorMsg);
                        expect(perInfo.hiddenfieldMailAddr.getAttribute("class")).toContain(TestData.ariainvalid_error);
                        expect(perInfo.hiddenfieldState.getAttribute("class")).toContain(TestData.ariainvalid_success);
                        expect(perInfo.hiddenfieldCity.getAttribute("class")).toContain(TestData.ariainvalid_success);
                    });

                    it('Step-9:Should accept: Mailing Addr valid data', function() {
                        var data = TestData.HAddress_Valid;
                        perInfo.hiddenfieldMailAddr.setText(data.Home);
                        perInfo.fieldEmailAddr.click();
                        // perInfo.waitUntilLoderDisapper();
                        expect(perInfo.hiddenfieldMailAddr.getAttribute("class")).toContain(TestData.ariainvalid_success);
                        expect(perInfo.hiddenfieldState.getAttribute("class")).toContain(TestData.ariainvalid_success);
                        expect(perInfo.hiddenfieldCity.getAttribute("class")).toContain(TestData.ariainvalid_success);
                    });


                    it('Step-10:Should detect Mailing Addr invalid missing Apt# ', function() {
                        var data = TestData.HAddress_Invalid;
                        perInfo.hiddenfieldMailAddr.setText(data.Home);
                        perInfo.hiddenfieldCity.setText(data.City);
                        perInfo.fieldEmailAddr.click();
                        console.log('sdescription======' +sdescription);
                        if(sdescription=='VI'){
                            expect(perInfo.servererrMailAddr.getText()).toEqual(data.ErrorMessage);
                        }
                        else{
                            perInfo.waitUntilLoderDisapper();
                            expect(perInfo.servererrMailAddr.getText()).toEqual(data.ErrorMsg);
                        }
                        // perInfo.waitUntilLoderDisapper();
                        // expect(perInfo.apptFloorNumError.getText()).toEqual(data.ErrorMsg);
                        expect(perInfo.hiddenfieldMailAddr.getAttribute("class")).toContain(TestData.ariainvalid_error);
                        expect(perInfo.hiddenfieldState.getAttribute("class")).toContain(TestData.ariainvalid_error);
                        expect(perInfo.hiddenfieldCity.getAttribute("class")).toContain(TestData.ariainvalid_error);
                    });
                    it('Step-11:Should detect Mailing Addr Home Chars wrong', function() {
                        var data =TestData.HAddress_SplChar;
                        perInfo.hiddenfieldMailAddr.setText(data.Home);
                        perInfo.hiddenfieldCity.setText(data.City);
                        perInfo.fieldEmailAddr.click();
                        perInfo.waitUntilLoderDisapper();
                        if(sdescription=='VI'){
                            expect(perInfo.servererrMailAddr.getText()).toEqual(data.ErrorMessage);
                        }
                        else{
                            // perInfo.waitUntilLoderDisapper();
                            expect(perInfo.servererrMailAddr.getText()).toEqual(data.ErrorMsg);
                        }
                        // perInfo.waitUntilLoderDisapper();
                        // expect(perInfo.apptFloorNumError.getText()).toEqual(data.ErrorMsg);
                        expect(perInfo.hiddenfieldMailAddr.getAttribute("class")).toContain(TestData.ariainvalid_error);
                        // expect(perInfo.hiddenfieldMailAddr.getAttribute("class")).toContain(TestData.ariainvalid_success);


                    });
                    it('Step-12:Should detect Mailing Addr another zip code addr ', function() {
                        var data = TestData.HAddress_ZIP;
                        perInfo.hiddenfieldMailAddr.setText(data.HomeAddress);
                        // 5/25/17  Mark needs to dig into what is different about these calls above and below
                        perInfo.selectHomeAddress(data.FullAddress);
                        perInfo.waitUntilLoderDisapper();
                        expect(perInfo.hiddenfieldMailAddr.getAttribute("class")).toContain(TestData.ariainvalid_error);
                    });

                    // });

                    //describe('CXINIT-483::486 - Validate city field in Address Mailing with valid and invalid data', function() {
                    it('Step-13:Should Accept Entry of ' + TestData.City1 + ' data in city field', function() {
                        perInfo.hiddenfieldMailAddr.setText(TestData.Address_Valid.Home);
                        perInfo.hiddenfieldCity.setText(TestData.City1);
                        perInfo.fieldEmailAddr.click();
                        perInfo.waitUntilLoderDisapper();
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
                        var data = tData;
                        perInfo.fieldEmailAddr.setText('');
                        perInfo.chkBoxDiffMailAddr.unCheck();
                        perInfo.hiddenfieldMailAddr.setText(data.fieldHomeAddr);
                        perInfo.hiddenfieldCity.setText(data.city);
                        perInfo.hiddenfieldState.setText(data.State);
                        perInfo.hiddenfieldZipCode.setText(data.enrollData.ZIPcode);
                        perInfo.fieldEmailAddr.click();
                        perInfo.waitUntilLoderDisapper();
                        perInfo.errMsghiddenfieldZipCode.click();
                        expect(perInfo.hiddenfieldZipCode.getAttribute("class")).toContain(TestData.ariainvalid_success);

                    });
                    it('Step-21:Enter invalid values for each field', function() {
                        var data = TestData.Address_Invalid;
                        perInfo.hiddenfieldMailAddr.setText(data.Home);
                        perInfo.hiddenfieldCity.setText(data.City);
                        perInfo.hiddenfieldState.setText(data.State);
                        perInfo.hiddenfieldZipCode.setText(data.ZIPcode);
                        perInfo.fieldEmailAddr.click();
                        perInfo.waitUntilLoderDisapper();
                        expect(perInfo.errMsghiddenfieldZipCode.getText()).toEqual(data.ErrorMsg);
                        perInfo.errMsghiddenfieldZipCode.click();
                        expect(perInfo.hiddenfieldZipCode.getAttribute("class")).toContain(TestData.ariainvalid_success);
                    });

                });
            }
        });
    }
});
