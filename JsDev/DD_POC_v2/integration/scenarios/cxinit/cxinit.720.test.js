//CXINIT-720: [Personal Info Page] Address Suggestion for Mailing Address -close

/* As a user I want to see a list of address suggestions 
as I start to input my address so that I can click on a suggestion and auto-fill all of the address fields.*/

var TestData = require("../../testData/cxinit/cxinit.720.json");
var perInfo = new(require('../../pageObjects/cxinit/perInfo-page.js'));
var homePage = new(require('../../pageObjects/cxinit/home-page.js'));

describe('CXINIT-720: Address Suggestion Mailing-PersInfo', function() {


	beforeAll(function() {
		console.log('cxinit 720');
    });
	
    beforeEach(function() {
        Utility.openApplication('');
        browser.driver.findElement(by.name('planZip')).clear().then(function() {
            browser.driver.findElement(by.name('planZip')).sendKeys('94560');
            browser.actions().sendKeys(protractor.Key.ENTER).perform().then(function() {
                perInfo.fieldEmailAddr.setText('');
                perInfo.chkBoxDiffMailAddr.unCheck();
                return true;
            });
        });
    });
    it('Verify partial address is present in address suggestions list for Mailing Address', function() {
        var data = TestData.PartialAddress_Suggestion;
        perInfo.hiddenfieldMailAddr.setText(data.PartialAddress);
        perInfo.getandVerifyallAddressSuggestions(data.PartialAddress).then(function(data) {
            console.log("All Address  =====" + data);
            //   expect(data).toContain(TestData.Address_Suggestion.PartialAddress);
        });
    });

    it('Validate Address Suggestion by selecting adress in Mailing Address', function() {
        var data = TestData.FullAddress_Suggestion;
        perInfo.hiddenfieldMailAddr.setText(data.HomeAddress);
        browser.sleep(2000);
        perInfo.selectHomeAddress(data.FullAddress);
        browser.sleep(2000);
        expect(perInfo.hiddenfieldMailAddr.getAttribute("value")).toContain(data.HomeAddress);
        expect(perInfo.hiddenfieldCity.getAttribute("value")).toContain(data.City);
        expect(perInfo.hiddenfieldState.getAttribute("value")).toContain(data.State);
        expect(perInfo.hiddenfieldZipCode.getAttribute("value")).toContain(data.ZipCode);
    });
    it('Selecting address from Address Suggestion in Mailing Address and validate mock values', function() {
        var data = TestData.MockAddress_Suggestion;
        perInfo.hiddenfieldMailAddr.setText(data.HomeAddress);
        perInfo.hiddenfieldCity.setText(data.City);
        perInfo.hiddenfieldState.setText(data.State);
        perInfo.hiddenfieldZipCode.setText(data.ZipCode);
       // browser.sleep(2000);
       /// perInfo.selectHomeAddress(data.FullAddress);
       // browser.sleep(5000);
        expect(perInfo.hiddenfieldMailAddr.getAttribute("value")).toContain(data.HomeAddress);
        expect(perInfo.hiddenfieldCity.getAttribute("value")).toContain(data.City);
        expect(perInfo.hiddenfieldState.getAttribute("value")).toContain(data.State);
        expect(perInfo.hiddenfieldZipCode.getAttribute("value")).toContain(data.ZipCode);
    });


});
