//AARP- : Receipt page verification

//This Spec is used to Validate Receipt page validation

var perInfo = new(require('../../pageObjects/cxinit/perInfo-page.js'));
var depInfo = new(require('../../pageObjects/cxinit/dependent-page.js'));
var facilities = new(require('../../pageObjects/cxinit/facilities-page.js'));
var payment = new(require('../../pageObjects/cxinit/payment-page.js'));
var receipt = new(require('../../pageObjects/cxinit/receipt-page.js'));
var enrollPage = new(require('../../pageObjects/cxinit/enroll-page.js'));
var TestData = require('../../testData/'+testDataEnv+'/aarphmo/aarphmo.2090_PaymentOneDep_WorkFlow.json');

//describe(totalDateString+'AARP HMO WorkFlows -1', function() {
describe('AARPHMO:2090 AARP HMO WorkFlows -1', function() {
    var premiumAmount,effectedDate;
    beforeAll(function() {
        Utility.openApplication('','AARP');
    });

    //Fill the Valid Data in the home page of Enrollment and Proceed

    it('E2E_1 : Should complete the Enroll Page', function() {
        enrollPage.enterHomePageDetails(TestData.enrollData).then(function(effectDate) {
            effectedDate = effectDate;
        expect(perInfo.fieldFirstName.isPresentAndDisplayed()).toBeTruthy();
        console.log('2090_1 complete');
    });
         });

    //Enter the valid Test Data in the Personal Information page and Click n the Next

    it('E2E_2 :should populate PersInfo page', function() {
         TestData.MemberId= Utility.randomNo('Number',10);
        perInfo.fillPersonalInfo(TestData);
        perInfo.fillAddress(TestData);
        perInfo.phoneNumberemail(TestData);
        perInfo.fillBroker(TestData);
        perInfo.referralSource.selectByText(TestData.referralSource)
        depInfo.next.click();
        expect(browser.getTitle()).toEqual(TestData.DependentPageTitle);
        console.log('2090_2 complete');
    });

    // Add Dependent as a Spouse and Proceed

    it('E2E_3 :should add 1 Spouse Dep', function() {
        expect(depInfo.fieldAddDependents.isPresentAndDisplayed()).toBeTruthy();
        depInfo.fillDependent('Dependent1', TestData.Spouse, false);
        depInfo.next.click();
        expect(depInfo.premiumChangePopUp.isPresentAndDisplayed()).toBeTruthy();
        depInfo.continue.click();
        expect(browser.getTitle()).toEqual(TestData.facilitiesPageTitle);
        console.log('2090_3 complete');
    });


    //Verify and Select the Facility for the Dependent

    it('E2E_4 :should select fac for primary', function() {
        facilities.selectFacility(TestData.facilityoption1);
        facilities.next.click();
        Utility.delay(minWait);
        console.log('2090_4 complete');
    });

    //Verify and Select the Facility for the Dependent

    it('E2E_5 :should select fac for deps', function() {
        facilities.selectFacility(TestData.facilityoption2);
        facilities.next.click();
        expect(browser.getTitle()).toEqual(TestData.paymentPageTitle);
        console.log('2090_5 complete');
    });

    //Furnish all the fields of the Payment page with the valid Test Data and proceed

    it('E2E_6 :should fill out pay details', function() {
        payment.billingChkBox.check();
        payment.fillpayment(TestData);
         payment.frequencyAnnualy.select();
        payment.summaryTotalPrice.getText().then(function(premium) {
            premiumAmount = premium;
        });
        payment.purchaseNow.click();
          Utility.delay(maxWait);
        expect(browser.getTitle()).toEqual(TestData.receiptPageTitle);
        console.log('2090_6 complete');
    });

    //Verify and Validate the Application Number and Plan Name in the Receipt Page

    it('E2E_7 :Should submit delta rating', function() {
        receipt.submitRating(TestData.deltaRating);
        receipt.answerQuery(TestData.queryAnswer);
        expect(receipt.getThanksMsg()).toEqual(TestData.thanksMsg);
        receipt.applicationNumber.getText().then(function(appicationNumber) {
            console.log("Application Number == " + appicationNumber)
        })
        expect(receipt.planPurchased.getText()).toContain(TestData.planName);
        expect(receipt.effectiveDate.getText()).toEqual(effectedDate);
        expect(receipt.totalPaid.getText()).toEqual(premiumAmount);
        console.log('2090_7 complete');
    });
    it('E2E_8 :Should display plansummary', function() {
        var plansummary = TestData.planSummary;
        receipt.planSummary.click();
        expect(receipt.getPlanSummaryByKey('Deductible per calendar year per person').getText()).toEqual(plansummary.Deductible_per_calendar);
        expect(receipt.getPlanSummaryByKey('Maximum per calendar year per person').getText()).toEqual(plansummary.Max_per_calendar);
        expect(receipt.getPlanSummaryByKey('Office visit').getText()).toEqual(plansummary.Officevisit);
        expect(receipt.getPlanSummaryByKey('Exams').getText()).toEqual(plansummary.Exams);
        expect(receipt.getPlanSummaryByKey('X-rays').getText()).toEqual(plansummary.Xrays);
        expect(receipt.getPlanSummaryByKey('Cleanings').getText()).toEqual(plansummary.Cleanings);
        expect(receipt.getPlanSummaryByKey('Fillings').getText()).toEqual(plansummary.Fillings);
        expect(receipt.getPlanSummaryByKey('Root canals').getText()).toEqual(plansummary.Rootcanals);
        expect(receipt.getPlanSummaryByKey('Gum treatment').getText()).toEqual(plansummary.Gumtreatment);
        expect(receipt.getPlanSummaryByKey('Extractions').getText()).toEqual(plansummary.Extractions);
        expect(receipt.getPlanSummaryByKey('Denture repair').getText()).toEqual(plansummary.Denturerepair);
        expect(receipt.getPlanSummaryByKey('Crowns').getText()).toEqual(plansummary.Crowns);
        expect(receipt.getPlanSummaryByKey('Orthodontics').getText()).toEqual(plansummary.Orthodontics);
        console.log('2090_8 complete');
    });
    it('E2E_9 :Should display primary allicant', function() {
        var facility = TestData.primaryFacility;
        receipt.applicants.click();
        receipt.getSelectedFacilityDetails('PRIMARY').then(function(facilitydata) {
            expect(facilitydata.name).toContain(TestData.firstname);
            expect(facilitydata.facilityName).toEqual(facility.facilityName);
            expect(facilitydata.street).toEqual(facility.street);
            expect(facilitydata.city).toEqual(facility.city);
            expect(facilitydata.region).toEqual(facility.region);
            expect(facilitydata.postalCode).toEqual(facility.postalCode);
            expect(facilitydata.telephone).toEqual(facility.telephone);
            console.log('2090_9 complete');
        });
    });

    it('E2E_10:Should display dependent allicant', function() {
        var facility = TestData.dependent_Facility_1;
        receipt.getSelectedFacilityDetails('DEPENDENT', 1).then(function(facilitydata) {
            expect(facilitydata.name).toContain(TestData.Spouse.firstName);
            expect(facilitydata.facilityName).toEqual(facility.facilityName);
            expect(facilitydata.street).toEqual(facility.street);
            expect(facilitydata.city).toEqual(facility.city);
            expect(facilitydata.region).toEqual(facility.region);
            expect(facilitydata.postalCode).toEqual(facility.postalCode);
            expect(facilitydata.telephone).toEqual(facility.telephone);
            console.log('2090_10 complete');
        });
    });

});
