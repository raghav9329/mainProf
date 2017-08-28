var TestData = require('../../testData/'+testDataEnv+'/cxinit/cxinit.507.json');
var perInfo = new(require('../../pageObjects/perInfo-page.js'));
var homePage = new(require('../../pageObjects/home-page.js'));

describe('Verify and Validate Personal Info Page', function() {

    it('should be able to open Login page and verify', function() {

        Utility.openApplication('');
        browser.driver.findElement(by.name('noOfCovered')).sendKeys('').then(function() {
            browser.sleep(2000);
            browser.actions().sendKeys(protractor.Key.ENTER).perform();
            browser.sleep(5000)
            return true;
        })
    });
    var x = Utility.getDatePart(Utility.getfullDate('year', 'SUB', 18), 'YEAR');
    console.log("value of x: " + x);

    it('Validating  the DOB field substracting 18years and 1 date for user bday', function() {
        perInfo.fieldBdMM.setText(Utility.getDatePart(Utility.getfullDate('year', 'SUB', 18), 'MONTH'));
        perInfo.fieldBdDD.setText(Utility.getDatePart(Utility.getfullDate('date', 'SUB', 1, (Utility.getfullDate('year', 'SUB', 18))), 'date'))
        perInfo.fieldBdYyyy.setText(Utility.getDatePart(Utility.getfullDate('year', 'SUB', 18), 'YEAR') + '\t');
        
        expect(perInfo.fieldBdMM.getAttribute("class")).toContain(TestData.ariainvalid_success);
        expect(perInfo.fieldBdDD.getAttribute("class")).toContain(TestData.ariainvalid_success);
        expect(perInfo.fieldBdYyyy.getAttribute("class")).toContain(TestData.ariainvalid_success);

    });

    it('Validating  the DOB field substracting 18years adding 1 Date for the same', function() {
        perInfo.fieldBdMM.setText(Utility.getDatePart(Utility.getfullDate('year', 'SUB', 18), 'MONTH'));
        perInfo.fieldBdDD.setText(Utility.getDatePart(Utility.getfullDate('date', 'ADD', 1, (Utility.getfullDate('year', 'SUB', 18))), 'date'))
        perInfo.fieldBdYyyy.setText(Utility.getDatePart(Utility.getfullDate('year', 'SUB', 18), 'YEAR') + '\t');
        browser.sleep(2000);
        expect(perInfo.errMsgBdYyyy.getText()).toEqual('You must be at least 18 years of age.');
        //expect(perInfo.errMsgBdYyyy.getText()).toEqual(TestData.Personalinfo.DateofBirth.DOB_less.DOBError);


    });

    it('Validate the DOB field lessthan 18 years adding 1 month', function() {
        perInfo.fieldBdMM.setText(Utility.getDatePart(Utility.getfullDate('month', 'ADD', 1, (Utility.getfullDate('year', 'SUB', 18))), 'MONTH'))
        perInfo.fieldBdDD.setText(Utility.getDatePart('', 'DATE'));
        perInfo.fieldBdYyyy.setText(Utility.getDatePart(Utility.getfullDate('month', 'ADD', 0, (Utility.getfullDate('year', 'SUB', 18))), 'YEAR') + '\t');
        //browser.sleep(20000)
        expect(perInfo.errMsgBdYyyy.getText()).toEqual('You must be at least 18 years of age.');



    });

    it('Validate the DOB field meets 18 years, Substracting 1 month', function() {
        perInfo.fieldBdMM.setText(Utility.getDatePart(Utility.getfullDate('month', 'SUB', 1, (Utility.getfullDate('year', 'SUB', 18))), 'MONTH'))
        perInfo.fieldBdDD.setText(Utility.getDatePart('', 'DATE'));
        perInfo.fieldBdYyyy.setText(Utility.getDatePart(Utility.getfullDate('month', 'ADD', 0, (Utility.getfullDate('year', 'SUB', 18))), 'YEAR') + '\t');
        //browser.sleep(20000)
        expect(perInfo.fieldBdMM.getAttribute("class")).toContain(TestData.ariainvalid_success);
        expect(perInfo.fieldBdDD.getAttribute("class")).toContain(TestData.ariainvalid_success);
        expect(perInfo.fieldBdYyyy.getAttribute("class")).toContain(TestData.ariainvalid_success);

    });

    it('Validate the DOB field lessthan 18 years adding 1 year', function() {
        perInfo.fieldBdMM.setText(Utility.getDatePart(Utility.getfullDate('month', 'ADD', 0, (Utility.getfullDate('year', 'SUB', 18))), 'MONTH'))
        perInfo.fieldBdDD.setText(Utility.getDatePart('', 'DATE'));
        perInfo.fieldBdYyyy.setText(Utility.getDatePart(Utility.getfullDate('year', 'ADD', 1, (Utility.getfullDate('year', 'SUB', 18))), 'YEAR') + '\t');
        browser.sleep(20000)
        expect(perInfo.errMsgBdYyyy.getText()).toEqual('You must be at least 18 years of age.');

    });

    it('Validate the DOB field meets 18 years, Substracting 1 Year', function() {
        perInfo.fieldBdMM.setText(Utility.getDatePart(Utility.getfullDate('month', 'SUB', 0, (Utility.getfullDate('year', 'SUB', 18))), 'MONTH'))
        perInfo.fieldBdDD.setText(Utility.getDatePart('', 'DATE'));
        perInfo.fieldBdYyyy.setText(Utility.getDatePart(Utility.getfullDate('year', 'SUB', 1, (Utility.getfullDate('year', 'SUB', 18))), 'YEAR') + '\t');
        browser.sleep(20000)
        expect(perInfo.fieldBdMM.getAttribute("class")).toContain(TestData.ariainvalid_success);
        expect(perInfo.fieldBdDD.getAttribute("class")).toContain(TestData.ariainvalid_success);
        expect(perInfo.fieldBdYyyy.getAttribute("class")).toContain(TestData.ariainvalid_success);

    });



   /* it('Validate the DOB field lessthan 18 years adding years', function() {
        perInfo.fieldBdMM.setText(Utility.getDatePart(Utility.getfullDate('year', 'ADD', 01), 'MONTH'));
        perInfo.fieldBdDD.setText(Utility.getDatePart(Utility.getfullDate('year', 'ADD', 01), 'DATE'));
        perInfo.fieldBdYyyy.setText(Utility.getDatePart(Utility.getfullDate('year', 'ADD', 01), 'YEAR') + '\t');
        expect(perInfo.errMsgBdYyyy.getText()).toEqual('You must be at least 18 years of age.');

    });



    it('Validating  the DOB field substracting 18years', function() {
        perInfo.fieldBdMM.setText(Utility.getDatePart(Utility.getfullDate('year', 'SUB', 20), 'MONTH'));
        perInfo.fieldBdDD.setText(Utility.getDatePart(Utility.getfullDate('year', 'SUB', 20), 'DATE'));
        perInfo.fieldBdYyyy.setText(Utility.getDatePart(Utility.getfullDate('year', 'SUB', 20), 'YEAR') + '\t');
        browser.sleep(2000);
        //expect(perInfo.errMsgBdYyyy.getAttribute("class")).toContain(TestData.);

    });*/








});
