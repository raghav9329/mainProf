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

var TestData = require("../../testData/dhmo/dhmo.489PersInfo.json");
var perInfo = new(require('../../pageObjects/cxinit/perInfo-page.js'));
var enrollPage = new(require('../../pageObjects/cxinit/enroll-page.js'));

//To Navigate Personla Info Page
describe('CXINIT-489: Address Home fields-PersINfo', function() {

    //State and zipcode are pre-filled.State-CA & Zipcode-94560
    //Flow 1: Tab/click in and tab/click out of the fields
    beforeAll(function() {
        console.log('cxinit 489');
        Utility.openApplication('', 'DELTA');
        enrollPage.enterHomePageDetails(TestData.enrollData);
    });

    //Validate all the fields of the Home Address is present and displayed

    it('489PI 1:Validate all fields are present and displayed', function() {
        expect(perInfo.fieldHomeAddr.isPresentAndDisplayed()).toBeTruthy();
        expect(perInfo.fieldCity.isPresentAndDisplayed()).toBeTruthy();
        expect(perInfo.fieldState.isPresentAndDisplayed()).toBeTruthy();
        expect(perInfo.fieldZipCode.isPresentAndDisplayed()).toBeTruthy();
        expect(perInfo.chkBoxDiffMailAddr.isPresentAndDisplayed()).toBeTruthy();
        console.log('489PI 1: Complete')
    });

    //Validate and verify the error by Tabout from the Home Address field

    it('489PI 2:Validate Home Address field with Click/tabout', function() {
        perInfo.fieldHomeAddr.setText('' + '\t');
        expect(perInfo.errMsgHomeAddr.getText()).toEqual(TestData.ErrorMsg_Homeaddress);
        expect(perInfo.fieldHomeAddr.getAttribute("class")).toContain(TestData.ariainvalid_error);
        console.log('489PI 2: Complete')
    });

    //Validate and verify the error by Tabout from the City field under the Home Address

    it('489PI 3:Validate City field with Click/tabout', function() {
        perInfo.fieldCity.setText('' + '\t');
        expect(perInfo.errMsgCity.getText()).toEqual(TestData.ErrorMsg_city);
        expect(perInfo.fieldCity.getAttribute("class")).toContain(TestData.ariainvalid_error);
        console.log('489PI 3: Complete')
    });

    //Validate and verify the error by Tabout from the State field under the Home Address

    it('489PI 4:Validate State field with Click/tabout', function() {
        perInfo.fieldState.setText('' + '\t');
        expect(perInfo.errMsgState.getText()).toEqual(TestData.ErrorMsg_State);
        expect(perInfo.fieldState.getAttribute("class")).toContain(TestData.ariainvalid_error);
        console.log('489PI 4: Complete')
    });

    //Validate and verify the error by Tabout from the Zipcode field under the Home Address

    it('489PI 5:Validate Zip Code field with Click/tabout', function() {
        perInfo.fieldZipCode.setText('' + '\t');
        expect(perInfo.errMsgZipCode.getText()).toEqual(TestData.ErrorMsg_ZipCode);
        expect(perInfo.fieldZipCode.getAttribute("class")).toContain(TestData.ariainvalid_error);
        console.log('489PI 5: Complete')
    });
});


//To Navigate Personla Info Page
describe('CXINIT-489::492 - Validate Home Address field with valid and invalid data', function() {
    beforeAll(function() {
        Utility.openApplication('', 'DELTA');
        enrollPage.enterHomePageDetails(TestData.enrollData);
    });

    //Validate the Home Address fields (Home address, city) with Blank data Sets

    //Validating Home Address field with multiple datasets
    //Refer HAddress_Blank dataset in 'dhmo.489PersInfo.json' file
    // dataProvider will iterate the following it block based on number of datasets and organised through execution Flag(True/False).

    it('489PI 6X:Validate Home Address with blank data', function() {
        data = TestData.Personalinfo.HAddress_Blank;
        perInfo.fieldHomeAddr.setText(data.Home);
        perInfo.fieldCity.setText(data.City + '\t');
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

    it('489PI 7X:Validate Home Address with valid data', function() {
        data = TestData.Personalinfo.HAddress_Valid;
        perInfo.fieldHomeAddr.setText(data.Home + '\t');

        expect(perInfo.fieldHomeAddr.getAttribute("class")).toContain(TestData.ariainvalid_success);
        expect(perInfo.fieldState.getAttribute("class")).toContain(TestData.ariainvalid_success);
        expect(perInfo.fieldCity.getAttribute("class")).toContain(TestData.ariainvalid_success);
        console.log('json driven "' + data.Home + '" complete')
    });

    //Validate the Home Address fields (Home address, city) with Invalid data Sets

    //Validating Home Address field with multiple datasets
    //Refer HAddress_Invalid dataset in 'dhmo.489PersInfo.json' file
    // dataProvider will iterate the following it block based on number of datasets and organised through execution Flag(True/False).

    it('489PI 8X:Validate Home Address with invalid data', function() {
        data = TestData.Personalinfo.HAddress_Invalid;
        perInfo.fieldHomeAddr.setText(data.Home + '\t');
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

    it('489PI 9X:Validate Home Address with special char', function() {
        data = TestData.Personalinfo.HAddress_SplChar;
        perInfo.fieldHomeAddr.setText(data.Home);
        perInfo.fieldAlternateId.setText('');
        perInfo.waitUntilLoderDisapper();
        expect(perInfo.errinvalidAddr.getText()).toEqual(data.ErrorMsg);
        expect(perInfo.fieldHomeAddr.getAttribute("class")).toContain(TestData.ariainvalid_success);
        console.log('json driven "' + data.Home + '" complete')

    });

    //Validate Error of Zipcode when changed/updated to another

    //Validating Home Address Zipcode field with multiple datasets
    //Refer HAddress_ZIP dataset in 'dhmo.489PersInfo.json' file
    // dataProvider will iterate the following it block based on number of datasets and organised through execution Flag(True/False).
    // Validating the Error Messasges displayed Appropriately for all the fields with all the combinations of Data supplied

    it('489PI 10X:Validate Home Address with another zip code address ', function() {
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

    it('489PI 11:Validate Home Address changing zip code', function() {
        // browser.sleep(20000);
        perInfo.fieldZipCode.setText('94105' + '\t');
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

describe('CXINIT-489::492- Validate city field with valid and invalid data', function() {
    beforeEach(function() {
        Utility.openApplication('', 'DELTA');
        enrollPage.enterHomePageDetails(TestData.enrollData);
    });

    //Validated the City Field with Valid City value from Json as City1 in the dhmo.489PersInfo.json
    it('489PI 12:Enter ' + TestData.City1 + ' data in city field', function() {
        perInfo.fieldHomeAddr.setText(TestData.Address_Valid.Home);
        perInfo.fieldCity.setText(TestData.City1 + '\t');
        expect(perInfo.fieldCity.getAttribute("class")).toContain(TestData.ariainvalid_success);
        console.log('489PI 12: Completed')
    });

    //Validated the City Field with Valid City value from Json as City2 in the dhmo.489PersInfo.json
    it('489PI 13:Enter ' + TestData.City2 + ' data in city field', function() {
        perInfo.fieldCity.setText(TestData.City2 + '\t');
        expect(perInfo.fieldCity.getAttribute("class")).toContain(TestData.ariainvalid_success);
        console.log('489PI 13: Completed')
    });

    //Validated the City Field with Alphanumeric value from Json as City3 in the dhmo.489PersInfo.json
    it('489PI 14:Enter ' + TestData.City3 + ' data in city field', function() {
        perInfo.fieldCity.setText(TestData.City3 + '\t');
        expect(perInfo.fieldCity.getAttribute("class")).toContain(TestData.ariainvalid_success);
        console.log('489PI 14: Completed')
    });

    //Validated the City Field with Special Characters as City value from Json as City1 in the dhmo.489PersInfo.json
    it('489PI 15:Enter ' + TestData.City4 + '  in city field', function() {
        perInfo.fieldCity.setText(TestData.City4 + '\t');
        expect(perInfo.fieldCity.getAttribute("class")).toContain(TestData.ariainvalid_success);
        console.log('489PI 15: Completed')
    });
});

// Validating the State field with the multiple valid and Invalid Test Data


describe('CXINIT-489::492 - Validate state field with valid and invalid data', function() {
    beforeEach(function() {
        Utility.openApplication('', 'DELTA');
        enrollPage.enterHomePageDetails(TestData.enrollData);
    });

    //Validated the State Field with Valid State value from Json as State1 in the dhmo.489PersInfo.json
    it('489PI 16:Enter ' + TestData.State1 + ' in State field', function() {
        perInfo.fieldState.setText(TestData.State1 + '\t');
        expect(perInfo.fieldState.getAttribute("class")).toContain(TestData.ariainvalid_success);
        console.log('489PI 16: Completed')
    });

    //Validated the State Field with Valid State value from Json as State2 in the dhmo.489PersInfo.json
    it('489PI 17:Enter ' + TestData.State2 + ' in State field', function() {
        perInfo.fieldState.setText(TestData.State2 + '\t');
        expect(perInfo.fieldState.getAttribute("class")).toContain(TestData.ariainvalid_success);
        console.log('489PI 17: Completed')
    });

    //Validated the State Field with Special Characters as State value from Json as State3 in the dhmo.489PersInfo.json
    it('489PI 18:Enter ' + TestData.State3 + ' in State field', function() {
        perInfo.fieldState.setText(TestData.State3 + '\t');
        expect(perInfo.fieldState.getAttribute("class")).toContain(TestData.ariainvalid_success);
        console.log('489PI 18: Completed')
    });
});

//Validate Zipcode field with the Valid and Invalid Test Data sets for all the fields (Home address, city, state and zipcode)

describe('CXINIT-489::492 - Validate Zip code field with valid and invalid data', function() {
    beforeEach(function() {
        Utility.openApplication('', 'DELTA');
        enrollPage.enterHomePageDetails(TestData.enrollData);
        // browser.driver.findElement(by.name('planZip')).clear().then(function() {
        //     browser.driver.findElement(by.name('planZip')).sendKeys('94560');
        //     browser.actions().sendKeys(protractor.Key.ENTER).perform();
        //     perInfo.fillPersonalInfo(TestData);
        //     //return true;
        // });
    });

    //Validate the Zip Code Field with Valid Data
    //Validate the Zip code Pop-up Back Functionality Cleanse the Zip code and Validated the Error
    it('489PI 19: Enter valid values for each field', function() {
        data = TestData.Address_Valid;
        perInfo.fieldHomeAddr.setText(data.Home);
        perInfo.fieldCity.setText(data.City);
        perInfo.fieldState.setText(data.State);
        perInfo.fieldZipCode.setText(data.ZIPcode + '\t');
        // expect(perInfo.zipPopBack.isPresentAndDisplayed()).toBeTruthy();
        // perInfo.zipPopBack.click();
        perInfo.waitUntilLoderDisapper();
        expect(perInfo.errMsgZipCode.getText()).toEqual(data.ErrorMsg);
        perInfo.errMsgZipCode.click();
        //browser.executeScript('window.scrollTo(0,30);');
        expect(perInfo.fieldZipCode.getAttribute("class")).not.toContain(TestData.ariainvalid_error);
        console.log('489PI 19: Completed')

    });

    //Validate the Zip code Field Errors displayed with In-Valid Data
    it('489PI 20: Enter invalid values for each field', function() {
        data = TestData.Address_Invalid;
        perInfo.fieldHomeAddr.setText(data.Home);
        perInfo.fieldCity.setText(data.City);
        perInfo.fieldState.setText(data.State);
        perInfo.fieldZipCode.setText(data.ZIPcode + '\t');
        expect(perInfo.errMsgZipCode.getText()).toEqual(data.ErrorMsg);
        perInfo.errMsgZipCode.click();

        expect(perInfo.fieldZipCode.getAttribute("class")).toContain(TestData.ariainvalid_error);
        console.log('489PI 20: Completed')
    });
});
