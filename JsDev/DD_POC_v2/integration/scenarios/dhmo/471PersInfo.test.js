// CXINIT-471 :[Personal Info Page] Address Suggestion - close

//This spec Validates the Address entered partially and selects from the built-in suggestion list

var TestData = require('../../testData/' + testDataEnv + '/dhmo/dhmo.471PersInfo.json');
var perInfo = new(require('../../pageObjects/cxinit/perInfo-page.js'));
var enrollPage = new(require('../../pageObjects/cxinit/enroll-page.js'));

var product = ['DHMO'];
// var product = ['DHMO','DPPO','AHMO','APPO']; 
var states = ['CA','NY'];

//To Navigate Personal Info Page
dataProvider(TestData.states, function(sData, sdescription) {
    if (states.indexOf(sdescription) != -1) {
        dataProvider(sData.products, function(tData, pdescription) {
            if (product.indexOf(pdescription) != -1) {

                describe('DHMO:471: AddrSugg Home ', function() {

                    beforeAll(function() {
                        console.log('cxinit 471');
                    });
                    beforeEach(function () {
                        jasmine.addMatchers(custommatcher.customMatchers);
                    });
                    var Fn_data = TestData.FirstNameFieldHelper;
                    beforeAll(function() {
                        console.log('                                            ');
                        console.log('CXINIT-471: Address Suggestion Home == Start');
                        console.log('                                            ');
                    });
                    afterAll(function() {
                        console.log('                                    ');
                        console.log('                                    ');
                        console.log('CXINIT-471: Address Suggestion Home == Done');
                    });
                    beforeEach(function() {
                        Utility.openApplication('', 'DELTA');
                        enrollPage.enterHomePageDetails(tData.enrollData);
                    });

                    //Validate the Address field with the partial address supplied
                    // Address present in the Suggestion list

                    it('Mail Addr Should accept 1st sugg partial addr', function() {
                        var data = TestData.PartialAddress_Suggestion;
                        //    /* Mark Addition right below */
                        // perInfo.fieldFirstName.setText(Fn_data.FName);

                        perInfo.fieldHomeAddr.setText(data.PartialAddress);
                        browser.sleep(browser.params.exeInspDelay); // command line controlable delay

                        perInfo.getandVerifyallAddressSuggestions(data.PartialAddress).then(function(dataa) {
                            console.log("All Address  ===== " + dataa);
                            browser.sleep(browser.params.exeInspDelay); // command line controlable delay
                            //expect(dataa).toContain(data.PartialAddress);
                            //  5/25/17 I need the above expect() line resolved.  It this a bug ? Needs a jira ticket ?
                            //  5/25/17  top line, should accept or not..  which one is it. ???
                        });
                    });

                    //Validate user selects the mailing address from the suggestion list of the drop down

                    it('Should allow usr to select a sugg MailAddr', function() {
                        var data = TestData.FullAddress_Suggestion;
                        // perInfo.fieldFirstName.setText(Fn_data.FName);
                        perInfo.fieldHomeAddr.setText(data.HomeAddress);
                        browser.sleep(browser.params.exeInspDelay); // command line controlable delay
                        //      browser.sleep(2000);
                        perInfo.selectHomeAddress(data.FullAddress);
                        browser.sleep(browser.params.exeInspDelay); // command line controlable delay
                        browser.sleep(2000);
                        expect(perInfo.fieldHomeAddr.getAttribute("value")).toContain(data.HomeAddress);
                        expect(perInfo.fieldCity.getAttribute("value")).toContain(data.City);
                        expect(perInfo.fieldState.getAttribute("value")).toContain(data.State);
                        expect(perInfo.fieldZipCode.getAttribute("value")).toContain(data.ZipCode);
                    });

                    // Validate and Verify the Test Data supplied and the mock values are matched

                    it('Should allow usr to select Sugg in MailAddr: Validate mock vals', function() {
                        var data = tData.Address_Valid;
                        // perInfo.fieldFirstName.setText(Fn_data.FName);

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
                    });

                });
            }
        });
    }
});
