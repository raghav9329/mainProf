var testdata = require("../data/deltadental.json");


var pageObjects = new (require('../objects/object.js'));	


describe('TS_1', function() {
	it('TC_1', function() {
		browser.ignoreSynchronization = true;
		browser.get(testdata.URL); //Opens Delta Dental website
		browser.sleep(minWait);
		browserActions.click(pageObjects.GetQuote, 'Click on GetQuote Button in Home Page');
		browser.sleep(minWait);
		browserActions.type(pageObjects.ZIPCode, testdata.Personalinfo.ZIPcode, 'Enter ZIP Code' + testdata.Personalinfo.ZIPcode);
		browser.sleep(minWait);
		browserActions.type(pageObjects.DOB, testdata.Personalinfo.DOB, 'Enter DOB' + testdata.Personalinfo.DOB);
		browserActions.selectDropdownbyText(pageObjects.Covered, testdata.NoOfPeopleCovered, 'Select People from the drop down' + testdata.NoOfPeopleCovered);
		browserActions.click(pageObjects.Go, 'Click on Go');
		browser.sleep(maxWait);
		browserActions.click(pageObjects.Enroll, 'Click on Enroll');
		browser.sleep(maxWait);
		browserActions.type(pageObjects.FName, testdata.Personalinfo.FName, 'Enter First Name' + testdata.Personalinfo.FName);
		browserActions.type(pageObjects.MI, testdata.Personalinfo.MI, 'Enter MIddle Name' + testdata.Personalinfo.MI);
		browserActions.type(pageObjects.LName, testdata.Personalinfo.LName, 'Enter Last Name' + testdata.Personalinfo.LName);
		browserActions.selectDropdownbyText(pageObjects.Gender, testdata.Personalinfo.Gender, 'Select Gender from the drop down' + testdata.Personalinfo.Gender);
		date = testdata.Personalinfo.DOB.split("/");
		browserActions.type(pageObjects.MONTH, date[0], 'Enter Month' + date[0]);
		browserActions.type(pageObjects.DAY, date[1], 'Enter Day' + date[1]);
		browserActions.type(pageObjects.Year, date[2], 'Enter Year' + date[2]);
		browserActions.type(pageObjects.SSN, testdata.Personalinfo.SSN, 'Enter SSN' + testdata.Personalinfo.SSN);
		browserActions.type(pageObjects.AlternateID, testdata.Personalinfo.AlternateID, 'Enter AlternateID' + testdata.Personalinfo.AlternateID);
		browserActions.type(pageObjects.HomeAdress, testdata.Personalinfo.HomeAdress, 'Enter Home Adress' + testdata.Personalinfo.HomeAdress);
		browserActions.type(pageObjects.City, testdata.Personalinfo.City, 'Enter City' + testdata.Personalinfo.City);
		browserActions.type(pageObjects.State, testdata.Personalinfo.State, 'Enter State' + testdata.Personalinfo.State);
		browserActions.type(pageObjects.ZipCode, testdata.Personalinfo.ZIPcode, 'Enter ZIPcode' + testdata.Personalinfo.ZIPcode);
		browserActions.type(pageObjects.Cell, testdata.Personalinfo.Cell, 'Enter Cell' + testdata.Personalinfo.Cell);
		browserActions.type(pageObjects.EmailAdress, testdata.Personalinfo.EmailAdress, 'Enter EmailAdress' + testdata.Personalinfo.EmailAdress);
		browserActions.click(pageObjects.Next, 'Click on Next');
				
	});
})