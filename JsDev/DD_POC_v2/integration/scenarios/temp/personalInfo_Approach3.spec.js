var testdata = require("../testData/personalInfo.json');
var homePg  = new(require('../pageObjects/homePgObj.js'));
var perInfo = new(require('../pageObjects/persInfoPgObj.js'));

//Created Utility for browser actions(browserActions.js)
describe('Verify and Validate Personal Info Page', function() {
    it('Navigate to Personal Info Page', function() {
        browser.ignoreSynchronization = true;
        browser.get(testdata.URL); //Opens Delta Dental website		
        browser.sleep(minWait);
        browserActions.click(homePg.GetQuote, 'Click on GetQuote Button in Home Page');
        browser.sleep(minWait);
        browserActions.enterText(homePg.ZIPCode, testdata.ZIPcode, 'Enter ZIP Code' + testdata.ZIPcode);
        browser.sleep(minWait);
        browserActions.enterText(homePg.DOB, testdata.DOB, 'Enter DOB' + testdata.DOB);
        browserActions.selectDropdownbyText(homePg.Covered, testdata.NoOfPeopleCovered, 'Select People from the drop down' + testdata.NoOfPeopleCovered);
        browserActions.click(homePg.Go, 'Click on Go');
        browser.sleep(maxWait);
        browserActions.click(homePg.Enroll, 'Click on Enroll');
        browser.sleep(maxWait);
//        browser.sleep(22000);

    });
    //Validating First Name field with multiple datasets
    //Refer FName dataset in test data file (personalInfo.json)
    // dataProvider will iterate the following it block based on number of datasets and organised through execution Flag(True/False).
    dataProvider(testdata.Personalinfo.FName, function(data, description) { 
        if (data.ExecutionFlag) {
            it('Validate First Name field with '+description, function() {        
                browserActions.enterText(perInfo.fieldFirstName, data.FName, 'Enter First Name' + data.FName);
                browserActions.click(perInfo.persPageButtonNext, 'Click on Next');
                expect(browserActions.getText(perInfo.errMsgFirstName)).toEqual(data.ErrorMsg);
               browser.sleep(4000);
            });
        };
        //browser.sleep(22000);

    });
    //Validating Last Name field with multiple datasets
    //Refer LName dataset in test data file (personalInfo.json)
//    dataProvider(testdata.Personalinfo.LName, function(data, description) {
//        if (data.ExecutionFlag) {
//            it('Validate Last Name field with '+description, function() {          
//                browserActions.enterText(perInfo.fieldLastName, data.LName, 'Enter Last Name' + data.LName);
//                browserActions.click(perInfo.persPageButtonNext, 'Click on Next');
//                expect(browserActions.getText(perInfo.errMsgLastName)).toEqual(data.ErrorMsg);
//            });
//        };
//    });
    //Validating SSN field with multiple datasets
    //Refer SSN dataset in test data file (personalInfo.json)
//    dataProvider(testdata.Personalinfo.SSN, function(data, description) {
//        if (data.ExecutionFlag) {
//            it('Validate SSN Field with '+description, function() {          
//                browserActions.enterText(perInfo.fieldSsn, data.SSN, 'Enter SSN' + data.SSN);
//                browserActions.click(perInfo.persPageButtonNext, 'Click on Next');
//                expect(browserActions.getText(perInfo.errMsgSsn)).toEqual(data.ErrorMsg);
//            });
//        };
//    });
    // date = testdata.Personalinfo.DOB.split("/");
    // browserActions.enterText(perInfo.MONTH, date[0], 'Enter Month' + date[0]);
    // browserActions.enterText(perInfo.DAY, date[1], 'Enter Day' + date[1]);
    // browserActions.enterText(perInfo.Year, date[2], 'Enter Year' + date[2]);

    // browserActions.enterText(perInfo.SSN, testdata.Personalinfo.SSN, 'Enter SSN' + testdata.Personalinfo.SSN);


});
