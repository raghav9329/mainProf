var TestData = require("../testData/051217_E2E_POM_Workflow.json");
var perInfo = new(require('../pageObjects/perInfo-page.js'));
//var depInfo = new(require('../pageObjects/dependentInfo-page.js'));
describe('507_PersInfoPg: ', function() {
    beforeAll(function() {
        Utility.openApplication('');

    });
    it('should be able to open Login page and verify', function() {
        browser.driver.findElement(by.name('planZip')).clear().then(function() {
            browser.driver.findElement(by.name('planZip')).sendKeys(TestData.ZipCode);
            browser.sleep(2000);
            browser.driver.findElement(by.name('coverageStartDate')).clear();
            browser.driver.findElement(by.name('coverageStartDate')).sendKeys(TestData.coverageStartDate);
            browser.actions().sendKeys(protractor.Key.ENTER).perform();
            return true;
        });
        expect(perInfo.fieldFirstName.isPresentAndDisplayed()).toBeTruthy();
    });

    it('Providing the Valid Test Data for Personal Information Page Using POM', function() {
        perInfo.fillPersonalInfo(TestData);
        perInfo.fillAddress(TestData);
        perInfo.phoneNumberemail(TestData);
        expect(browser.getTitle()).toEqual(TestData.DependentTitle);

        console.log(browser.driver.findElement(by.xpath('//h2[contains(text(),"Dependent")]')).getText());

    });

    /*it('Providing the Valid Test Data for Dependents Information Page Using POM', function() {
        depInfo.dependentDetails(TestData);

    });*/
});
