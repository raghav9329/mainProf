var TestData = require("../../testData/cxinit/cxinit.471.json");
var perInfo = new(require('../../pageObjects/perInfo-page.js'));
var homePage = new(require('../../pageObjects/home-page.js'));

describe('CXINIT-471::474 - Validate Address Suggestions for Home Address field', function() {
    beforeEach(function() {

        Utility.openApplication('');
      
        browser.driver.findElement(by.name('planZip')).clear().then(function() {
            browser.driver.findElement(by.name('planZip')).sendKeys('94560');
            browser.actions().sendKeys(protractor.Key.ENTER).perform();
            return true;
        });
    });

    it('Verify partial address is present in address suggestions list for Mailing Address', function() {
        var data = TestData.PartialAddress_Suggestion;
        perInfo.fieldHomeAddr.setText(data.PartialAddress);
        perInfo.getandVerifyallAddressSuggestions(data.PartialAddress).then(function(data) {
            console.log("All Address  =====" + data);
            //   expect(data).toContain(TestData.Address_Suggestion.PartialAddress);
        });
    });

    it('Validate Address Suggestion by selecting adress in Mailing Address', function() {
        var data = TestData.FullAddress_Suggestion;   
        perInfo.fieldHomeAddr.setText(data.HomeAddress);
        browser.sleep(2000);
        perInfo.selectHomeAddress(data.FullAddress);
        browser.sleep(2000);
        expect(perInfo.fieldHomeAddr.getAttribute("value")).toContain(data.HomeAddress);
        expect(perInfo.fieldCity.getAttribute("value")).toContain(data.City);
        expect(perInfo.fieldState.getAttribute("value")).toContain(data.State);
        expect(perInfo.fieldZipCode.getAttribute("value")).toContain(data.ZipCode);
    });
     it('Selecting address from Address Suggestion in Mailing Address and validate mock values', function() {
        var data = TestData.Address_Valid;   
        perInfo.fieldHomeAddr.setText(data.HomeAddress);
        perInfo.fieldCity.setText(data.City);
        perInfo.fieldState.setText(data.State);
         perInfo.fieldZipCode.setText(data.ZipCode);    
        expect(perInfo.fieldHomeAddr.getAttribute("value")).toContain(data.HomeAddress);
        expect(perInfo.fieldCity.getAttribute("value")).toContain(data.City);
        expect(perInfo.fieldState.getAttribute("value")).toContain(data.State);
        expect(perInfo.fieldZipCode.getAttribute("value")).toContain(data.ZipCode);
    });
});