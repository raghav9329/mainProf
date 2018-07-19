/*CXINIT-489 : [Personal Info Page] Address - Home - close

Testing will Validate all visible fields are displayed / visible
 Testing will validate all are clickable ( maybe even run through the tab order ?? : ) 
 Testing will validate all fields that are intended to take text do so

Fields that have been identified and labled in CXINIT-489
Address HOME
Fields visable, clickable, take data
Empty fields provide proper errors on loosing focus.

Test automation for CXINIT-489 Story Functionally evaluate the fields in the story

Consume the error messages in the property file and validate fields display the proper errors on the correct conditions
 Validate non alpha failures in alpha fields, errors, alerts and warnings
 Validate alpha failures in non alpha fields, errors, alerts and warnings
Verifies the Home address with the empty data sets (Null Values), Invalid data and special characters
Validation of the above is applicable for all the fields of the Home address like Zipcode, Home address

*/

var TestData = require('../../testData/' + testDataEnv + '/dhmo/dhmo.489PersInfo.json');
var perInfo = new(require('../../pageObjects/cxinit/perInfo-page.js'));
var enrollPage = new(require('../../pageObjects/cxinit/enroll-page.js'));
var statesData = require('../../testData/' + testDataEnv + '/statesAndProducts.json');

//To Navigate Personla Info Page
// dataProvider(TestData.states, function (sData, sdescription) {
dataProvider(statesData.states, function (sData, sdescription) {
    if (states.indexOf(sdescription) != -1) {
        dataProvider(sData.products, function (tData, pdescription) {
            if (product.indexOf(pdescription) != -1) {
                //To Navigate Personla Info Page
                describe('489: AddrHome flds-PersInfo State: ||State:' + sdescription + '||Product:' + pdescription + '||', function () {

                    //State and zipcode are pre-filled.State-CA & Zipcode-94560
                    //Flow 1: Tab/click in and tab/click out of the fields
                    beforeAll(function() {
                        console.log('cxinit 489');
                        Utility.openApplication('', tData.product);
                        enrollPage.enterHomePageDetails(tData.enrollData);
                    });
                    beforeEach(function () {
                        jasmine.addMatchers(custommatcher.customMatchers);
                    });

                    //Validate all the fields of the Home Address is present and displayed

                    it('1:Validate all flds present displayed', function() {
                        expect(perInfo.fieldHomeAddr.isPresentAndDisplayed()).toBeTruthy();
                        expect(perInfo.fieldCity.isPresentAndDisplayed()).toBeTruthy();
                        expect(perInfo.fieldState.isPresentAndDisplayed()).toBeTruthy();
                        expect(perInfo.fieldZipCode.isPresentAndDisplayed()).toBeTruthy();
                        expect(perInfo.chkBoxDiffMailAddr.isPresentAndDisplayed()).toBeTruthy();
                        console.log('489PI 1: Complete')
                    });

                    //Validate and verify the error by Tabout from the Home Address field

                    it('2:Validate Home Addr w/ Click/tabout  ??? loose focus ???', function() {
                        perInfo.fieldHomeAddr.setText('');
                        perInfo.fieldEmailAddr.click();
                        expect(perInfo.errMsgHomeAddr.getText()).toEqual(TestData.ErrorMsg_Homeaddress);
                        expect(perInfo.fieldHomeAddr.getAttribute("class")).toContain(TestData.ariainvalid_error);
                        console.log('489PI 2: Complete')
                    });

                    //Validate and verify the error by Tabout from the City field under the Home Address

                    it('3:Validate City w/ Click/tabout', function() {
                        perInfo.fieldCity.setText('');
                        perInfo.fieldEmailAddr.click();
                        expect(perInfo.errMsgCity.getText()).toEqual(TestData.ErrorMsg_city);
                        expect(perInfo.fieldCity.getAttribute("class")).toContain(TestData.ariainvalid_error);
                        console.log('489PI 3: Complete')
                    });

                    //Validate and verify the error by Tabout from the State field under the Home Address

                    it('4:Validate State w/ Click/tabout', function() {
                        perInfo.fieldState.setText('');
                        perInfo.fieldEmailAddr.click();
                        expect(perInfo.errMsgState.getText()).toEqual(TestData.ErrorMsg_State);
                        expect(perInfo.fieldState.getAttribute("class")).toContain(TestData.ariainvalid_error);
                        console.log('489PI 4: Complete')
                    });

                    //Validate and verify the error by Tabout from the Zipcode field under the Home Address

                    it('5:Validate Zip w/ Click/tabout', function() {
                        perInfo.fieldZipCode.setText('');
                        perInfo.fieldEmailAddr.click();
                        expect(perInfo.errMsgZipCode.getText()).toEqual(TestData.ErrorMsg_ZipCode);
                        expect(perInfo.fieldZipCode.getAttribute("class")).toContain(TestData.ariainvalid_error);
                        console.log('489PI 5: Complete')
                    });
                });


                //To Navigate Personla Info Page
                describe('489: Validate Home Addr w/ valid & invalid data State:' + sdescription + 'Product:' + pdescription + '', function() {
                    beforeAll(function() {
                        Utility.openApplication('', tData.product);
                        enrollPage.enterHomePageDetails(tData.enrollData);
                    });

                    //Validate the Home Address fields (Home address, city) with Blank data Sets

                    //Validating Home Address field with multiple datasets
                    //Refer HAddress_Blank dataset in 'dhmo.489PersInfo.json' file
                    // dataProvider will iterate the following it block based on number of datasets and organised through execution Flag(True/False).

                    it('6X:Validate Home Addr w/ blank data', function() {
                        data = TestData.Personalinfo.HAddress_Blank;

                        perInfo.fieldHomeAddr.setText(data.Home);
                        perInfo.fieldCity.setText(data.City);
                        perInfo.fieldEmailAddr.click();
                        //perInfo.fieldState.setText(data.State);     

                        expect(perInfo.errMsgHomeAddr.getText()).toEqual(data.ErrorMsg);
                        expect(perInfo.fieldHomeAddr.getAttribute("class")).toContain(TestData.ariainvalid_error);
                        //expect(perInfo.fieldState.getAttribute("class")).toContain(TestData.ariainvalid_success);
                        expect(perInfo.fieldCity.getAttribute("class")).toContain(TestData.ariainvalid_success);
                        console.log('json driven "' + data.Home + '" complete')
                    });

                    //Validate the Home Address fields (Home address, city) with Valid data Sets

                    //Validating Home Address field with multiple datasets
                    //Refer HAddress_Valid dataset in 'dhmo.489PersInfo.json' file
                    // dataProvider will iterate the following it block based on number of datasets and organised through execution Flag(True/False).

                    it('7X:Validate Home Addr w/ valid data', function() {
                        data = TestData.Personalinfo.HAddress_Valid;

                        perInfo.fieldHomeAddr.setText(data.Home);
                        perInfo.fieldEmailAddr.click();
                        browser.sleep(minWait);
                        expect(perInfo.fieldHomeAddr.getAttribute("class")).toContain(TestData.ariainvalid_success);
                        expect(perInfo.fieldState.getAttribute("class")).toContain(TestData.ariainvalid_success);
                        expect(perInfo.fieldCity.getAttribute("class")).toContain(TestData.ariainvalid_success);
                        console.log('json driven "' + data.Home + '" complete')
                    });

                    //Validate the Home Address fields (Home address, city) with Invalid data Sets

                    //Validating Home Address field with multiple datasets
                    //Refer HAddress_Invalid dataset in 'dhmo.489PersInfo.json' file
                    // dataProvider will iterate the following it block based on number of datasets and organised through execution Flag(True/False).

                    it('8X:Validate Home Addr w/ invalid data', function() {
                        data = TestData.Personalinfo.HAddress_Invalid;
                        perInfo.fieldHomeAddr.setText(data.Home);
                        perInfo.fieldEmailAddr.click();
                        perInfo.waitUntilLoderDisapper();
                        expect(perInfo.errinvalidAddr.getText()).toEqual(data.ErrorMsg);
                        expect(perInfo.fieldHomeAddr.getAttribute("class")).toContain(TestData.ariainvalid_error);
                        expect(perInfo.fieldState.getAttribute("class")).toContain(TestData.ariainvalid_error);
                        expect(perInfo.fieldCity.getAttribute("class")).toContain(TestData.ariainvalid_error);
                        console.log('json driven "' + data.Home + '" complete')
                    });

                    //Validate the Home Address fields (Home address, city) with Special character data Sets

                    //Validating Home Address field with multiple datasets
                    //Refer HAddress_SplChar dataset in 'dhmo.489PersInfo.json' file
                    // dataProvider will iterate the following it block based on number of datasets and organised through execution Flag(True/False).

                    it('9X:Validate Home Addr w/ spec char', function() {
                        data = TestData.Personalinfo.HAddress_SplChar;
                        perInfo.fieldHomeAddr.setText(data.Home);
                        perInfo.fieldAlternateId.setText('');
                        perInfo.waitUntilLoderDisapper();
                        expect(perInfo.errinvalidAddr.getText()).toContain(data.ErrorMsg);
                        perInfo.fieldHomeAddr.setText(data.Home);
                        perInfo.fieldAlternateId.setText('');
                        perInfo.waitUntilLoderDisapper();
                        expect(perInfo.errinvalidAddr.getText()).toEqual(data.ErrorMsg);
                        expect(perInfo.fieldHomeAddr.getAttribute("class")).toContain(TestData.ariainvalid_error);
                        console.log('json driven "' + data.Home + '" complete')

                    });

                    //Validate Error of Zipcode when changed/updated to another

                    //Validating Home Address Zipcode field with multiple datasets
                    //Refer HAddress_ZIP dataset in 'dhmo.489PersInfo.json' file
                    // dataProvider will iterate the following it block based on number of datasets and organised through execution Flag(True/False).
                    // Validating the Error Messasges displayed Appropriately for all the fields with all the combinations of Data supplied

                    it('10X:Validate Home Addr w/ another zip code address ', function() {
                        data = TestData.Personalinfo.HAddress_ZIP;
                        // perInfo.fieldHomeAddr.setText(data.Home);
                        perInfo.fieldHomeAddr.setText(data.HomeAddress);
                        perInfo.selectHomeAddress(data.FullAddress);
                        expect(perInfo.fieldHomeAddr.getAttribute("class")).toContain(TestData.ariainvalid_success);
                        console.log('json driven "' + data.HomeAddress + '" complete')

                    });

                    //Validate the Zipcode Error by changing the Zip code with another value
                    // Change the Zipcode and Validate the Change Zip Pop-up is displayed
                    //Validate the data and the Home address fields Post clicking on the Back link in the Pop-up

                    it('11:Validate Home Addr changing zip code', function() {
                        // browser.sleep(20000);
                        perInfo.fieldZipCode.setText('94105');
                        browser.sleep(4000);
                        expect(perInfo.zipPopBack.isPresentAndDisplayed()).toBeTruthy();
                        perInfo.zipPopBack.click();
                        perInfo.waitUntilLoderDisapper();
                        expect(perInfo.fieldHomeAddr.getAttribute("class")).toContain(TestData.ariainvalid_error);
                        expect(perInfo.fieldState.getAttribute("class")).toContain(TestData.ariainvalid_error);
                        expect(perInfo.fieldCity.getAttribute("class")).toContain(TestData.ariainvalid_error);
                        expect(perInfo.fieldZipCode.getAttribute("class")).toContain(TestData.ariainvalid_error);
                        console.log('489PI 11: Completed')

                    });
                });

                // Validating the City field with the multiple valid and Invalid Test Data

                describe('489: Validate city w/ valid and invalid data State:' + sdescription + 'Product:' + pdescription + '', function() {
                    beforeEach(function() {
                        Utility.openApplication('', tData.product);                  
                        enrollPage.enterHomePageDetails(tData.enrollData);
                    });

                    //Validated the City Field with Valid City value from Json as City1 in the dhmo.489PersInfo.json
                    it('12 should pass ' + TestData.City1 + ' data in city', function() {
                        perInfo.fieldHomeAddr.setText(tData.fieldHomeAddr);
                        perInfo.fieldCity.setText(TestData.City1);
                        perInfo.fieldEmailAddr.click();
                        expect(perInfo.fieldCity.getAttribute("class")).toContain(TestData.ariainvalid_success);
                        console.log('489PI 12: Completed')
                    });

                    //Validated the City Field with Valid City value from Json as City2 in the dhmo.489PersInfo.json
                    it('13 should pass ' + TestData.City2 + ' data in city ', function() {
                        perInfo.fieldCity.setText(TestData.City2);
                        perInfo.fieldEmailAddr.click();
                        expect(perInfo.fieldCity.getAttribute("class")).toContain(TestData.ariainvalid_success);
                        console.log('489PI 13: Completed')
                    });

                    //Validated the City Field with Alphanumeric value from Json as City3 in the dhmo.489PersInfo.json
                    it('14 should pass ' + TestData.City3 + ' data in city', function() {
                        perInfo.fieldCity.setText(TestData.City3);
                        perInfo.fieldEmailAddr.click();
                        expect(perInfo.fieldCity.getAttribute("class")).toContain(TestData.ariainvalid_success);
                        console.log('489PI 14: Completed')
                    });

                    //Validated the City Field with Special Characters as City value from Json as City1 in the dhmo.489PersInfo.json
                    it('15 should pass ' + TestData.City4 + '  in city', function() {
                        perInfo.fieldCity.setText(TestData.City4);
                        perInfo.fieldEmailAddr.click();
                        expect(perInfo.fieldCity.getAttribute("class")).toContain(TestData.ariainvalid_success);
                        console.log('489PI 15: Completed')
                    });
                });

                // Validating the State field with the multiple valid and Invalid Test Data


                describe('489: Validate state with valid and invalid data State:' + sdescription + 'Product:' + pdescription + '', function() {
                    beforeEach(function() {
                        Utility.openApplication('', tData.product);                      
                        enrollPage.enterHomePageDetails(tData.enrollData);
                    });

                    //Validated the State Field with Valid State value from Json as State1 in the dhmo.489PersInfo.json
                    it('16 should pass ' + TestData.State1 + ' in State', function() {
                        perInfo.fieldState.setText(TestData.State1);
                        perInfo.fieldEmailAddr.click();
                        expect(perInfo.fieldState.getAttribute("class")).toContain(TestData.ariainvalid_success);
                        console.log('489PI 16: Completed')
                    });

                    //Validated the State Field with Valid State value from Json as State2 in the dhmo.489PersInfo.json
                    it('17 should pass ' + TestData.State2 + ' in State', function() {
                        perInfo.fieldState.setText(TestData.State2);
                        perInfo.fieldEmailAddr.click();
                        expect(perInfo.fieldState.getAttribute("class")).toContain(TestData.ariainvalid_success);
                        console.log('489PI 17: Completed')
                    });

                    //Validated the State Field with Special Characters as State value from Json as State3 in the dhmo.489PersInfo.json
                    it('18 should pass ' + TestData.State3 + ' in State', function() {
                        perInfo.fieldState.setText(TestData.State3);
                        perInfo.fieldEmailAddr.click();
                        expect(perInfo.fieldState.getAttribute("class")).toContain(TestData.ariainvalid_success);
                        console.log('489PI 18: Completed')
                    });
                });

                //Validate Zipcode field with the Valid and Invalid Test Data sets for all the fields (Home address, city, state and zipcode)

                describe('489: Validate Zip fld with valid and invalid data State:' + sdescription + 'Product:' + pdescription + '', function() {
                    beforeEach(function() {
                        Utility.openApplication('', tData.product);                       
                        enrollPage.enterHomePageDetails(tData.enrollData);                  
                    });

                    //Validate the Zip Code Field with Valid Data
                    //Validate the Zip code Pop-up Back Functionality Cleanse the Zip code and Validated the Error
                    it('19:Should ??  Enter valid values for each field', function() {
                        data = tData;
                        perInfo.fieldHomeAddr.setText(data.fieldHomeAddr);
                        perInfo.fieldCity.setText(data.city);
                        perInfo.fieldState.setText(data.State);
                        perInfo.fieldZipCode.setText(data.enrollData.ZIPcode);
                        perInfo.fieldEmailAddr.click();
                        perInfo.waitUntilLoderDisapper();
                        expect(perInfo.fieldZipCode.getAttribute("class")).not.toContain(TestData.ariainvalid_error);
                        console.log('489PI 19: Completed')

                    });

                    //Validate the Zip code Field Errors displayed with In-Valid Data
                    it('20: Should ?? Enter invalid values for each field', function() {
                        data = TestData.Address_Invalid;                        
                        perInfo.fieldHomeAddr.setText(data.Home);
                        perInfo.fieldCity.setText(data.City);
                        perInfo.fieldState.setText(data.State);
                        perInfo.fieldZipCode.setText(data.ZIPcode);
                        perInfo.fieldEmailAddr.click();
                        expect(perInfo.errMsgZipCode.getText()).toEqual(data.ErrorMsg);
                        perInfo.errMsgZipCode.click();
                        browser.sleep(200);
                        expect(perInfo.fieldZipCode.getAttribute("class")).toContain(TestData.ariainvalid_error);
                        console.log('489PI 20: Completed')
                    });
                });
            }
        });
    }
});
