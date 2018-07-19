//PPO- : Receipt page verification

//This Spec is used to Validate Receipt page validation

var perInfo = new(require('../../pageObjects/cxinit/perInfo-page.js'));
var depInfo = new(require('../../pageObjects/cxinit/dependent-page.js'));
var facilities = new(require('../../pageObjects/cxinit/facilities-page.js'));
var payment = new(require('../../pageObjects/cxinit/payment-page.js'));
var receipt = new(require('../../pageObjects/cxinit/receipt-page.js'));
var enrollPage = new(require('../../businessComponents/homePage.js'));
var TestData = require('../../testData/'+testDataEnv+'/aarphmo/aarp.1746AarpPPO_WrkFlow1.json');

//describe(totalDateString+'AARP HMO WorkFlows -1', function() {
describe('PPO-1746 HMO WorkFlows -1', function() {
    var premiumAmount;
    beforeAll(function() {
        Utility.openApplication('');
    });

    //Fill the Valid Data in the home page of Enrollment and Proceed

    it('E2E_1 : Should complete the Enroll Page', function() {
        enrollPage.enterHomePageDetails(TestData.enrollData,true);
        expect(perInfo.fieldFirstName.isPresentAndDisplayed()).toBeTruthy();
    });

    //Enter the valid Test Data in the Personal Information page and Click n the Next

    it('E2E_2 :should populate PersInfo page', function() {
        perInfo.fillPersonalInfo(TestData);
        perInfo.fillAddress(TestData);
        perInfo.phoneNumberemail(TestData);
        perInfo.fillBroker(TestData);
        perInfo.referralSource.selectByText(TestData.referralSource)
        depInfo.next.click();
        expect(browser.getTitle()).toEqual(TestData.DependentPageTitle);
    });

    // Add Dependent as a Spouse and Proceed

    it('E2E_3 :should add 1 Spouse Dep', function() {
        expect(depInfo.fieldAddDependents.isPresentAndDisplayed()).toBeTruthy();
        depInfo.fillDependent('Dependent1', TestData.Spouse, false);
        depInfo.next.click();
        expect(depInfo.premiumChangePopUp.isPresentAndDisplayed()).toBeTruthy();
        depInfo.continue.click();
        expect(browser.getTitle()).toEqual(TestData.facilitiesPageTitle);

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
        expect(browser.getTitle()).toEqual(TestData.receiptPageTitle);
    });

    //Verify and Validate the Application Number and Plan Name in the Receipt Page

    it('E2E_7 :Should submit delta rating', function() {
        receipt.submitRating(TestData.deltaRating);
        receipt.answerQuery(TestData.queryAnswer);
        expect(receipt.getThanksMsg()).toEqual(TestData.thanksMsg);
        receipt.applicationNumber.getText().then(function(appicationNumber) {
            console.log("Application Number == " + appicationNumber)
        })
        expect(receipt.planPurchased.getText()).toEqual(TestData.planName);
        expect(receipt.effectiveDate.getText()).toEqual(TestData.enrollData.CoverageStartDate);
        expect(receipt.totalPaid.getText()).toEqual(premiumAmount);
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

    });
    it('E2E_9 :Should display primary allicant', function() {
        var facility = TestData.primaryFacility;
        receipt.applicants.click();
        receipt.getSelectedFacilityDetails('PRIMARY').then(function(facilitydata) {
            expect(facilitydata.name).toEqual(TestData.firstname); 
        });
    });

    it('E2E_10:Should display dependent allicant', function() {
        var facility = TestData.dependent_Facility_1;
        receipt.getSelectedFacilityDetails('DEPENDENT', 1).then(function(facilitydata) {
            expect(facilitydata.name).toEqual(TestData.Spouse.firstName);            
        });
    });

});
