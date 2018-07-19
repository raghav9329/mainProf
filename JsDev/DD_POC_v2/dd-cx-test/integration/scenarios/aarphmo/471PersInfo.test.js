// CXINIT-471 :[Personal Info Page] Address Suggestion - close

//This spec Validates the Address entered partially and selects from the built-in suggestion list

var TestData = require('../../testData/'+testDataEnv+'/aarphmo/aarphmo.471.json');
var perInfo = new(require('../../pageObjects/cxinit/perInfo-page.js'));
var enrollPage = new(require('../../pageObjects/cxinit/enroll-page.js'));

describe('AARPHMO:471: AddrSuggn Home Addr-PersInfo', function() {
		
	 beforeAll(function() {
        console.log(' ');
        console.log('--- AARP-471 Personal Info Fields ---')
        Utility.openApplication('','AARP');
    });
	
    
    beforeEach(function() {
        jasmine.addMatchers(custommatcher.customMatchers);
        Utility.waitUntilPageLoaded();
        //browser.executeScript("document.body.style.zoom='75%';");
    });

    it('471PI 1:should be able to open Login page and verify', function() {
        enrollPage.enterHomePageDetails(TestData.enrollData);    
        expect(perInfo.fieldFirstName.isPresentAndDisplayed()).toBeTruthy();
        console.log('471PI 1: Complete')
    });


    it('471PI 2:Should accept / or not partial address present in address sugg lst for Mailing Addr', function() {
        var data = TestData.PartialAddress_Suggestion;

        perInfo.fieldHomeAddr.setText(data.PartialAddress);
        browser.sleep(browser.params.exeInspDelay); // command line controlable delay

        perInfo.getandVerifyallAddressSuggestions(data.PartialAddress).then(function(dataa) {
             console.log("All Address  ===== " + dataa);
            browser.sleep(browser.params.exeInspDelay); // command line controlable delay
             
        });
        console.log('471PI 2: Complete')
    });

    //Validate user selects the mailing address from the suggestion list of the drop down

    it('471PI 3:Should allow the user to select a dropdown suggestion in Mailing Address', function() {
        var data = TestData.FullAddress_Suggestion;
       
        perInfo.fieldHomeAddr.setText(data.HomeAddress);
        browser.sleep(browser.params.exeInspDelay); // command line controlable delay
       
        perInfo.selectHomeAddress(data.FullAddress);
        browser.sleep(browser.params.exeInspDelay); // command line controlable delay
        browser.sleep(2000);
        expect(perInfo.fieldHomeAddr.getAttribute("value")).toContain(data.HomeAddress);
        expect(perInfo.fieldCity.getAttribute("value")).toContain(data.City);
        expect(perInfo.fieldState.getAttribute("value")).toContain(data.State);
        expect(perInfo.fieldZipCode.getAttribute("value")).toContain(data.ZipCode);
        console.log('471PI 3: Complete')
    });

    // Validate and Verify the Test Data supplied and the mock values are matched

    it('471PI 4:Should allow the user to select address from Addr Sugg in Mailing Address: Validate mock values', function() {
        var data = TestData.Address_Valid;
        perInfo.fieldHomeAddr.setText(data.HomeAddress);
        browser.sleep(browser.params.exeInspDelay); // command line controlable delay
        perInfo.fieldCity.setText(data.City);
        browser.sleep(browser.params.exeInspDelay); // command line controlable delay
        perInfo.fieldState.setText(data.State);
        browser.sleep(browser.params.exeInspDelay); // command line controlable delay
        perInfo.fieldZipCode.setText(data.ZipCode);
        browser.sleep(browser.params.exeInspDelay); // command line controlable delay
        expect(perInfo.fieldHomeAddr.getAttribute("value")).toContain(data.HomeAddress);
        expect(perInfo.fieldCity.getAttribute("value")).toContain(data.City);
        expect(perInfo.fieldState.getAttribute("value")).toContain(data.State);
        expect(perInfo.fieldZipCode.getAttribute("value")).toContain(data.ZipCode);
        console.log('471PI 4: Complete')
    });
});

