//CXINIT-1461 : E2E Work Flow 2 with the 2 dependents and different facilities

//This Spec is used to Validate End to End Work Flow with the 2 Dependents and different facilities

var perInfo = new(require('../../pageObjects/cxinit/perInfo-page.js'));
var depInfo = new(require('../../pageObjects/cxinit/dependent-page.js'));
var facilities = new(require('../../pageObjects/cxinit/facilities-page.js'));
var payment = new(require('../../pageObjects/cxinit/payment-page.js'));
var receipt = new(require('../../pageObjects/cxinit/receipt-page.js'));
var enrollPage = new(require('../../pageObjects/cxinit/enroll-page.js'));
var TestData = require('../../testData/' + testDataEnv + '/dhmo/dhmo.1461EndToEndWkFlo2.json');

describe('DHMO:1461:E2E_WrkFlow1 - 2', function() {
    var effectiveDate;
    beforeAll(function() {
        console.log(' ');
        console.log('--- CXINIT-1461 E2E WrkFlow2 ---')
        console.log(' ');
        Utility.openApplication('', 'DELTA');

    });

    //Fill the Valid Data in the home page of Enrollment and Proceed

    it('E2E_1 : Should complete the Enroll Page', function() {
        enrollPage.enterHomePageDetails(TestData.enrollData).then(function(sdate) {
            effectiveDate = sdate;
            console.log("sdate============" + sdate);
        })
        expect(perInfo.fieldFirstName.isPresentAndDisplayed()).toBeTruthy();
        console.log('1461_1 complete')
    });

    //Fill the Valid Data in the Personal Info page and Change the Zipcode
    //Switchback clickng on the Pop up Back

    it('E2E_2 :should populate PersInfo page and change the Zip code', function() {
        perInfo.fillPersonalInfo(TestData);
        perInfo.fieldZipCode.setText(TestData.zipcode1);
        perInfo.fieldPhoneNumber.setText('');
        expect(perInfo.zipPopNewQuote.isPresentAndDisplayed()).toBeTruthy();
        expect(perInfo.zipPopBack.isPresentAndDisplayed()).toBeTruthy();
        perInfo.zipPopBack.click();
        console.log('1461_2 complete')
    });

    //Fill the Address in the Personal Info page and Click on the New Quote on th ePOp up displayed

    it('E2E_3 :Fill the Home address and Click on the New Quote in the Pop up displayed', function() {
        perInfo.fieldHomeAddr.setText(TestData.fieldHomeAddr);
        perInfo.selectHomeAddress(TestData.homeAddress);
        perInfo.fieldCity.setText(TestData.city);
        // perInfo.waitUntilLoderDisapper();
        perInfo.zipPopNewQuote.click();
        expect(browser.getTitle()).toContain(TestData.SelectPlanTitle);
        console.log('1461_3 complete')
    });

    //Enroll Page select plan is not implemented need to enhance below it as per implementaion

    it('E2E_4 :Should complete the Enroll Page ', function() {
        TestData.enrollData.ZIPcode = '94105';
        Utility.openApplication('', 'DELTA');
        enrollPage.enterHomePageDetails(TestData.enrollData);
        expect(perInfo.fieldFirstName.isPresentAndDisplayed()).toBeTruthy();
        console.log('1461_4 complete')

    });

    //Enter the valid Test Data in the Personal Information page and Click n the Next

    it('E2E_5 :should populate PersInfo page', function() {
        TestData.fieldHomeAddr = TestData.fieldhomeAddress;
        perInfo.fillPersonalInfo(TestData);
        perInfo.fillAddress(TestData);
        perInfo.phoneNumberemail(TestData);
        perInfo.next.click();
        expect(browser.getTitle()).toEqual(TestData.DependentPageTitle);
        console.log('1461_5 complete')
    });

    //Delete 2 dependents among 4 intially added from the home page
    // Fill the Valid Data in the 2 Dependents

    it('E2E_6 :should add 2 Deps, child & spouse', function() {
        depInfo.deleteDependent('Dependent2').click();
        Utility.delay(minWait);
        depInfo.deleteDependent('Dependent1').click();
        expect(depInfo.fieldAddDependents.isPresentAndDisplayed()).toBeTruthy();
        depInfo.fillDependent('Dependent1', TestData.Spouse, true);
        depInfo.fillDependent('Dependent2', TestData.child, false);
        depInfo.next.click();
        Utility.waitUntilLoderDisapper;
        Utility.delay(maxWait);
        expect(browser.getTitle()).toEqual(TestData.facilitiesPageTitle);
        console.log('1461_6 complete')


    });


    //Change the Zip code in the Facility Page 
    //Verify and Select the Facility for all the Dependents

    it('E2E_7 :Change the Zip code in the Facility Page and should select fac for Prime', function() {
        facilities.zipCode.setText(TestData.facZipcode);
        facilities.search.click();
        Utility.delay(minWait);
        facilities.selectFacility(TestData.facilityoption1);
        facilities.next.click();
        console.log('1461_7 complete')
    });

    //Verify and Select the Facility for the Dependent

    it('E2E_8 :should select fac for all deps enrolled', function() {
        facilities.zipCode.setText(TestData.facZipcode);
        facilities.search.click();
        Utility.delay(minWait);
        facilities.selectFacility(TestData.facilityoption2);
        facilities.next.click();
        facilities.zipCode.setText(TestData.facZipcode);
        facilities.search.click();
        Utility.delay(minWait);
        facilities.selectFacility(TestData.facilityoption3);
        facilities.next.click();
        expect(browser.getTitle()).toEqual(TestData.paymentPageTitle);
        console.log('1461_8 complete')
    });

    //Furnish all the fields of the Payment page with the valid Test Data and proceed
    if (testExecutionEnv != 'production') {
        it('E2E_9 :should fill out pay details', function() {
            payment.billingChkBox.check();
            payment.fillpayment(TestData);
            payment.purchaseNow.click();
            Utility.delay(maxWait);
            expect(browser.getTitle()).toEqual(TestData.receiptPageTitle);
            console.log('1461_9 complete')
        });
    }
    //Verify and Validate the Application Number and Plan Name in the Receipt Page

    it('E2E_10 :should generate a vaild receipt page', function() {
        receipt.planSummary.click();
        receipt.applicants.click();
        // expect(receipt.applicationNumber.getText()).toEqual('6024571');
        // expect(receipt.planName.getText()).toEqual(TestData.planName);
        // expect(receipt.getPlanSummaryByKey('Cleanings').getText()).toEqual('$25');
        console.log('1461_10 complete')
    });

});
