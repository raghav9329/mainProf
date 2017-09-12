//CXINIT-720: [Personal Info Page] Address Suggestion for Mailing Address -close

/* As a user I want to see a list of address suggestions 
as I start to input my address so that I can click on a suggestion and auto-fill all of the address fields.*/

var TestData = require('../../testData/'+testDataEnv+'/dhmo/dhmo.720PersInfo.json');
var perInfo = new(require('../../pageObjects/cxinit/perInfo-page.js'));
var enrollPage = new(require('../../pageObjects/cxinit/enroll-page.js'));

describe('DHMO:720: Address Suggestion Mailing-PersInfo', function() {


	beforeAll(function() {
		console.log('cxinit 720');
    });
	
    beforeEach(function() {
        Utility.openApplication('','DELTA');
        enrollPage.enterHomePageDetails(TestData.enrollData);   
    });
    it('Verify partial address is present in address suggestions list for Mailing Address', function() {
        var data = TestData.PartialAddress_Suggestion;
        perInfo.fieldState.setText("");
        expect(perInfo.chkBoxDiffMailAddr.isPresentAndDisplayed()).toBeTruthy();
        perInfo.chkBoxDiffMailAddr.unCheck();
        perInfo.chkBoxDiffMailAddr.unCheck();
        perInfo.hiddenfieldMailAddr.setText(data.PartialAddress);
        perInfo.getandVerifyallAddressSuggestions(data.PartialAddress).then(function(data) {
            console.log("All Address  =====" + data);
            //   expect(data).toContain(TestData.Address_Suggestion.PartialAddress);
        });
    });

    it('Validate Address Suggestion by selecting adress in Mailing Address', function() {
        var data = TestData.FullAddress_Suggestion;
       perInfo.fieldState.setText("");
        perInfo.chkBoxDiffMailAddr.unCheck();
        perInfo.chkBoxDiffMailAddr.unCheck();
        perInfo.hiddenfieldMailAddr.setText(data.HomeAddress);
        perInfo.selectHomeAddress(data.FullAddress);
        perInfo.waitUntilLoderDisapper();
        expect(perInfo.hiddenfieldMailAddr.getAttribute("value")).toContain(data.HomeAddress);
        expect(perInfo.hiddenfieldCity.getAttribute("value")).toContain(data.City);
        expect(perInfo.hiddenfieldState.getAttribute("value")).toContain(data.State);
        expect(perInfo.hiddenfieldZipCode.getAttribute("value")).toContain(data.ZipCode);
    });
    it('Selecting address from Address Suggestion in Mailing Address and validate mock values', function() {
        var data = TestData.MockAddress_Suggestion;
        perInfo.fieldState.setText("");
        perInfo.chkBoxDiffMailAddr.unCheck();
        perInfo.chkBoxDiffMailAddr.unCheck();
        perInfo.hiddenfieldMailAddr.setText(data.HomeAddress);
        perInfo.hiddenfieldCity.setText(data.City);
        perInfo.hiddenfieldState.setText(data.State);
        perInfo.hiddenfieldZipCode.setText(data.ZipCode);
        perInfo.waitUntilLoderDisapper();
       // browser.sleep(2000);
       /// perInfo.selectHomeAddress(data.FullAddress);
       // browser.sleep(5000);
        expect(perInfo.hiddenfieldMailAddr.getAttribute("value")).toContain(data.HomeAddress);
        expect(perInfo.hiddenfieldCity.getAttribute("value")).toContain(data.City);
        expect(perInfo.hiddenfieldState.getAttribute("value")).toContain(data.State);
        expect(perInfo.hiddenfieldZipCode.getAttribute("value")).toContain(data.ZipCode);
    });


});
