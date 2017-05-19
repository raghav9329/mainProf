var TestData = require("../testData/temp/051217_E2E_POM_Workflow.json");
var perInfo = new(require('../pageObjects/perInfo-page.js'));
describe('507_PersInfoPg: ', function() {
    beforeAll(function() {
        Utility.openApplication('');

    });
    it('should be able to open Login page and verify', function() {
        browser.driver.findElement(by.name('planZip')).clear().then(function() {
            browser.driver.findElement(by.name('planZip')).sendKeys(TestData.ZipCode);
            browser.actions().sendKeys(protractor.Key.ENTER).perform();
            return true;
        });
        expect(perInfo.fieldFirstName.isPresentAndDisplayed()).toBeTruthy();
    });

    it('Providing the Valid Test Data Using POM', function() {
        perInfo.fillPersonalInfo(TestData);
        perInfo.fillAddress(TestData);
        perInfo.phoneNumberemail(TestData);
        console.log(browser.getTitle());
        expect(browser.getTitle()).toEqual(TestData.DependentTitle);

    });
});
