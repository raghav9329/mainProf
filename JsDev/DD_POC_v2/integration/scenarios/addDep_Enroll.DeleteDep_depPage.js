
var TestData = require("../testData/051217_E2E_POM_Workflow.json");
var perInfo = new(require('../pageObjects/cxinit/perInfo-page.js'));
var depInfo = new(require('../pageObjects/cxinit/dependent-page.js'));
var facilities = new(require('../pageObjects/cxinit/facilities-page.js'));
var payment = new(require('../pageObjects/cxinit/payment-page.js'));
var receipt = new(require('../pageObjects/cxinit/receipt-page.js'));

describe('E2E_WorkFlow: ', function() {
    beforeAll(function() {
        Utility.openApplication('');

    });
    it('E2E_Flow_1: Enter the Zip code and Click on the Enter for the Enroll Page', function() {
        browser.driver.findElement(by.name('planZip')).clear().then(function() {
            browser.driver.findElement(by.name('planZip')).sendKeys(TestData.ZipCode);
            browser.driver.findElement(by.name('noOfCovered')).clear();
            browser.driver.findElement(by.name('noOfCovered')).sendKeys('4');
            //Below code should be uncommented for the Mot Environment
            /*browser.sleep(2000);
            browser.driver.findElement(by.name('coverageStartDate')).clear();
            browser.driver.findElement(by.name('coverageStartDate')).sendKeys(TestData.coverageStartDate);*/
            browser.actions().sendKeys(protractor.Key.ENTER).perform();
            return true;
        });
        expect(perInfo.fieldFirstName.isPresentAndDisplayed()).toBeTruthy();
    });

    it('E2E_Flow_2: Verify Personal Information Page is filled with Valid data and Proceed', function() {
        perInfo.fillPersonalInfo(TestData);
        perInfo.fillAddress(TestData);
        perInfo.phoneNumberemail(TestData);
        perInfo.fillBroker(TestData);
        expect(browser.getTitle()).toEqual(TestData.DependentTitle);
    });

    it('E2E_Flow_3: Verifying the Errors of both client and server side by passing NULL values', function() {
        depInfo.fieldAddDependents.click();
        depInfo.next.click();
        expect(depInfo.getValidationMessages('Dependent1')).toEqual(TestData.dependentErrors);
        expect(depInfo.getServerValidationMessages()).toEqual(TestData.dependentErrors);
        //browser.sleep(2000);
        Utility.scrollToTop();
        browser.sleep(2000);
        depInfo.deleteDependent('Dependent1').click();
        depInfo.deleteDependent('Dependent2').click();

    });

    it('E2E_Flow_4: Verify 2 dependents were added and furnished with valid Test Data for Each of them', function() {
        depInfo.fillDependent('Dependent1', TestData.tData, true);
        // browser.sleep(2000);
        depInfo.fillDependent('Dependent2', TestData.tData2, false);
       /* depInfo.fillDependent('Dependent3', TestData.tData3, true);*/
        // browser.sleep(2000);
        depInfo.next.click();
        browser.sleep(2000);
        expect(browser.getTitle()).toEqual(TestData.facilitiesTitle);
    });


    it('E2E_Flow_5: Verify and select a Facility for the primary', function() {
        facilities.selectFacility(TestData.facilityoption1);
        facilities.next.click();
    });

    it('E2E_Flow_5_1: Verify and select the facilities for dependents', function() {
        facilities.selectFacility(TestData.facilityoption2);
        facilities.next.click();
    });

    it('E2E_Flow_5_2: Verify and select the facilities for dependents', function() {
        facilities.selectFacility(TestData.facilityoption3);
        facilities.next.click();
        expect(browser.getTitle()).toEqual(TestData.paymentTitle);
    });

    it('E2E_Flow_6: Validate and Verify the Errors of both the Client and Server in the Payment Page', function() {
        payment.billingChkBox.unCheck();
        payment.purchaseNow.click();
        expect(payment.getCCValidationMessages()).toEqual(TestData.paymentErrors)
        expect(payment.getBillingAddressValidationMessages()).toEqual(TestData.paymentAddressErrors);
        expect(payment.getCCServerValidationMessages()).toEqual(TestData.paymentErrors);
        expect(payment.getBillingAddressServerValidationMessages()).toEqual(TestData.paymentAddressErrors);      
    });

    it('E2E_Flow_7: Validate and Verify Payment Page Details with valid Test Data', function() {
        payment.billingChkBox.check();
        payment.fillpayment(TestData);
        payment.purchaseNow.click();
        expect(browser.getTitle()).toEqual(TestData.receiptTitle);

    });

    it('E2E_Flow_8: Validating the receipt page', function() {

        // Reciept Page looks not completly developed and we are getting same Application Number every time. 
        expect(receipt.applicationNumber.getText()).toEqual('6024571');
        expect(receipt.planName.getText()).toEqual(TestData.planName);
        expect(receipt.getPlanSummaryByKey('Cleanings').getText()).toEqual('$25');
    });

});
