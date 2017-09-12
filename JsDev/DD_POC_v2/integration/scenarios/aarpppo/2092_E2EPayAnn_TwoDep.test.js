var perInfo = new(require('../../pageObjects/cxinit/perInfo-page.js'));
var enrollhomepage = new(require('../../pageObjects/cxinit/home-page.js'));
var depInfo = new(require('../../pageObjects/cxinit/dependent-page.js'));
var facilities = new(require('../../pageObjects/cxinit/facilities-page.js'));
var payment = new(require('../../pageObjects/cxinit/payment-page.js'));
var receipt = new(require('../../pageObjects/cxinit/receipt-page.js'));
var enrollPage = new(require('../../pageObjects/cxinit/enroll-page.js'));
var TestData = require('../../testData/'+testDataEnv+'/aarpppo/aarpppo.2092_E2EPayAnn_TwoDep.json');

describe('AARPPPO: 2092_E2EPayAnn_TwoDep', function() {
    var effectedDate;
    beforeAll(function() {
        console.log(' ');
        console.log('--- E2E WrkFlow ---')
        console.log(' ');
        Utility.openApplication('', 'AARP');

    });

    //Fill the Valid Data in the home page of Enrollment and Proceed
    it('E2E_1 : Should complete the Enroll Page', function() {
        enrollPage.enterHomePageDetails(TestData.enrollData).then(function(effectDate) {
            effectedDate = effectDate;
        expect(perInfo.fieldFirstName.isPresentAndDisplayed()).toBeTruthy();
        console.log('E2E_1: Complete');
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
         console.log('E2E_2: Complete');
    });

    // Add Dependents in the dependent page with 1 Child and 1 Spouse and Proceed

    it('E2E_3 :should add 2 Dependents, 1 child and Spouse', function() {
        expect(depInfo.fieldAddDependents.isPresentAndDisplayed()).toBeTruthy();
        depInfo.fillDependent('Dependent1', TestData.Spouse, false);
        depInfo.fillDependent('Dependent2', TestData.child1, false);
        depInfo.next.click();
        expect(depInfo.premiumChangePopUp.isPresentAndDisplayed()).toBeTruthy();
        depInfo.continue.click();
        expect(browser.getTitle()).toEqual(TestData.paymentPageTitle);
         console.log('E2E_3: Complete');

    });

    // Validate the bank details fields
    // Select the Monthly Payment option and fill the valid bank details in the fields

    it('E2E_4 :should fill out pay details', function() {
        payment.billingChkBox.check();
        payment.fillpayment(TestData);        
        payment.summaryTotalPrice.getText().then(function(premium) {
            premiumAmount = premium;
        });
        payment.purchaseNow.click();
        expect(payment.bankNameError.getText()).toEqual(TestData.bankNameError);
        expect(payment.accountHolderNameError.getText()).toEqual(TestData.accountHolderNameError);
        expect(payment.routingNumberError.getText()).toEqual(TestData.routingNumberError);
        expect(payment.accountNumberError.getText()).toEqual(TestData.accountNumberError);
        payment.frequencyAnnualy.select();
         console.log('E2E_4: Complete');

    });

    //Verify and Validate the Application Number and Plan Name in the Receipt Page

    it('E2E_5 :Should submit delta rating', function() {       
        payment.purchaseNow.click();
        receipt.planSummary.click();
        receipt.submitRating(TestData.deltaRating);
        receipt.answerQuery(TestData.queryAnswer);
        expect(receipt.getThanksMsg()).toEqual(TestData.thanksMsg);
        receipt.applicationNumber.getText().then(function(appicationNumber) {
            console.log("Application Number == " + appicationNumber)
        })
        expect(receipt.planPurchased.getText()).toContain(TestData.planName);
        expect(receipt.effectiveDate.getText()).toEqual(effectedDate);
        expect(receipt.totalPaid.getText()).toEqual('$1606.80');
         console.log('E2E_5: Complete');
    });
    it('E2E_6 :Should display plansummary', function() {
        var plansummary = TestData.planSummary;
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
         console.log('E2E_6: Complete');

    });
    it('E2E_7 :Should display primary applicant', function() {
        receipt.applicants.click();
        receipt.getSelectedFacilityDetails('PRIMARY').then(function(facilitydata) {
            expect(facilitydata.name).toContain(TestData.firstname);
             console.log('E2E_7: Complete');
        });
    });

    it('E2E_8:Should display dependent-1 applicant', function() {
        receipt.getSelectedFacilityDetails('DEPENDENT', 1).then(function(facilitydata) {
            expect(facilitydata.name).toContain(TestData.Spouse.firstName);
             console.log('E2E_8: Complete');
        });
    });
    it('E2E_9:Should display dependent-2 applicant', function() {
        receipt.getSelectedFacilityDetails('DEPENDENT', 2).then(function(facilitydata) {
            expect(facilitydata.name).toContain(TestData.child1.firstName);
             console.log('E2E_9: Complete');
        });
    });


});
