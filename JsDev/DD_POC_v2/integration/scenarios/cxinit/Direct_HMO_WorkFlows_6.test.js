var perInfo = new(require('../../pageObjects/cxinit/perInfo-page.js'));
var depInfo = new(require('../../pageObjects/cxinit/dependent-page.js'));
var facilities = new(require('../../pageObjects/cxinit/facilities-page.js'));
var payment = new(require('../../pageObjects/cxinit/payment-page.js'));
var receipt = new(require('../../pageObjects/cxinit/receipt-page.js'));
var enrollPage = new(require('../../businessComponents/homePage.js'));
var TestData = require('../../TestData/cxinit/Direct_HMO_WorkFlows_6.json');

describe(currentDate + '_Direct HMO WorkFlows - 6', function() {
    var premiumAmount, depPrice;
    beforeAll(function() {
        Utility.openApplication('');
    });

    //Fill the Valid Data in the home page of Enrollment and Proceed

    it('E2E_1 : Should complete the Enroll Page', function() {
        enrollPage.enterHomePageDetails(TestData.enrollData);
        expect(perInfo.fieldFirstName.isPresentAndDisplayed()).toBeTruthy();
    });

    //Enter the valid Test Data in the Personal Information page and Click n the Next

    it('E2E_2 :should populate PersInfo page', function() {
        expect(perInfo.enrollStatus('Personal Info').getCssValue('background-color')).toEqual(TestData.darkGreen);
        expect(perInfo.enrollStatus('Dependents').getCssValue('background-color')).toEqual(TestData.gray);
        expect(perInfo.enrollStatus('Facilities').getCssValue('background-color')).toEqual(TestData.gray);
        expect(perInfo.enrollStatus('Payment & Review').getCssValue('background-color')).toEqual(TestData.gray);
        expect(perInfo.enrollStatus('Receipt').getCssValue('background-color')).toEqual(TestData.gray);

        perInfo.fillPersonalInfo(TestData);
        perInfo.fillAddress(TestData);
        perInfo.phoneNumberemail(TestData);
        perInfo.next.click();
        expect(browser.getTitle()).toEqual(TestData.DependentPageTitle);

    });

    // Add Dependent as a Child and Proceed
    //Validate the Dependet age is greater than 26 and with the disability check box

    it('E2E_3 :should add 1 Child Dep', function() {
        expect(perInfo.enrollStatus('Personal Info').getCssValue('background-color')).toEqual(TestData.gray);
        expect(perInfo.enrollStatus('Dependents').getCssValue('background-color')).toEqual(TestData.darkGreen);
        expect(perInfo.enrollStatus('Facilities').getCssValue('background-color')).toEqual(TestData.gray);
        expect(perInfo.enrollStatus('Payment & Review').getCssValue('background-color')).toEqual(TestData.gray);
        expect(perInfo.enrollStatus('Receipt').getCssValue('background-color')).toEqual(TestData.gray);

        expect(facilities.productName.getText()).toEqual(TestData.planName);
        expect(facilities.premiumAmount.getText()).toEqual(TestData.baseFee);
       // expect(facilities.enrollmentFee.getText()).toEqual(TestData.enrollFee);

        expect(depInfo.fieldAddDependents.isPresentAndDisplayed()).toBeTruthy();
        depInfo.fillDependent('Dependent1', TestData.Spouse, false);
        depInfo.next.click();
        expect(depInfo.premiumChangePopUp.isPresentAndDisplayed()).toBeTruthy();
        depInfo.newAdditionalPrice.getText().then(function(dep1Price) {
            depPrice = dep1Price;
            depInfo.continue.click();
            expect(browser.getTitle()).toEqual(TestData.facilitiesPageTitle);
        });
    });


    //Verify and Select the Facility for the Dependent

    it('E2E_4 :should select fac for primary', function() {
        facilities.premiumAmount.getText().then(function(premium) {
            expect(premium.substring(1)).toEqual(depPrice);
           // expect(facilities.enrollmentFee.getText()).toEqual(TestData.enrollFee);
            expect(facilities.productName.getText()).toEqual(TestData.planName);

            expect(facilities.pbox_dependentName(1).getText()).toEqual(TestData.firstname);
            expect(facilities.pbox_dependentName(2).getText()).toEqual(TestData.Spouse.firstName);           

            expect(perInfo.enrollStatus('Personal Info').getCssValue('background-color')).toEqual(TestData.gray);
            expect(perInfo.enrollStatus('Dependents').getCssValue('background-color')).toEqual(TestData.gray);
            expect(perInfo.enrollStatus('Facilities').getCssValue('background-color')).toEqual(TestData.darkGreen);
            expect(perInfo.enrollStatus('Payment & Review').getCssValue('background-color')).toEqual(TestData.gray);
            expect(perInfo.enrollStatus('Receipt').getCssValue('background-color')).toEqual(TestData.gray);

            facilities.selectFacility(TestData.facilityoption1);
            facilities.next.click();
        });
    });

    //Verify and Select the Facility for the Dependent

    it('E2E_5 :should select fac for deps', function() {
        facilities.premiumAmount.getText().then(function(premium) {
            expect(premium.substring(1)).toEqual(depPrice);
           // expect(facilities.enrollmentFee.getText()).toEqual(TestData.enrollFee);

            expect(facilities.productName.getText()).toEqual(TestData.planName);
            expect(facilities.pbox_dependentName(1).getText()).toEqual(TestData.firstname);
            expect(facilities.pbox_facilityName(1).getText()).toEqual(TestData.facilityoption1);

            expect(facilities.pbox_dependentName(2).getText()).toEqual(TestData.Spouse.firstName);

            expect(perInfo.enrollStatus('Personal Info').getCssValue('background-color')).toEqual(TestData.gray);
            expect(perInfo.enrollStatus('Dependents').getCssValue('background-color')).toEqual(TestData.gray);
            expect(perInfo.enrollStatus('Facilities').getCssValue('background-color')).toEqual(TestData.darkGreen);
            expect(perInfo.enrollStatus('Payment & Review').getCssValue('background-color')).toEqual(TestData.gray);
            expect(perInfo.enrollStatus('Receipt').getCssValue('background-color')).toEqual(TestData.gray);

            facilities.selectFacility(TestData.facilityoption2);
            facilities.next.click();
            expect(browser.getTitle()).toEqual(TestData.paymentPageTitle);
        });
    });

    //Furnish all the fields of the Payment page with the valid Test Data and proceed

    it('E2E_6 :should fill out pay details', function() {
        facilities.premiumAmount.getText().then(function(premium) {
            expect(premium.substring(1)).toEqual(depPrice);
            //expect(facilities.enrollmentFee.getText()).toEqual(TestData.enrollFee);

            expect(facilities.productName.getText()).toEqual(TestData.planName);
            expect(facilities.pbox_dependentName(1).getText()).toEqual(TestData.firstname);
            expect(facilities.pbox_facilityName(1).getText()).toEqual(TestData.facilityoption1);

            expect(facilities.pbox_dependentName(2).getText()).toEqual(TestData.Spouse.firstName);
            expect(facilities.pbox_facilityName(2).getText()).toEqual(TestData.facilityoption2);

            expect(perInfo.enrollStatus('Personal Info').getCssValue('background-color')).toEqual(TestData.gray);
            expect(perInfo.enrollStatus('Dependents').getCssValue('background-color')).toEqual(TestData.gray);
            expect(perInfo.enrollStatus('Facilities').getCssValue('background-color')).toEqual(TestData.gray);
            expect(perInfo.enrollStatus('Payment & Review').getCssValue('background-color')).toEqual(TestData.darkGreen);
            expect(perInfo.enrollStatus('Receipt').getCssValue('background-color')).toEqual(TestData.gray);

            payment.billingChkBox.check();
            payment.fillpayment(TestData);
            payment.summaryTotalPrice.getText().then(function(premium) {
                premiumAmount = premium;
            });
            payment.purchaseNow.click();
            expect(browser.getTitle()).toEqual(TestData.receiptPageTitle);
        });
    });

    //Verify and Validate the Application Number and Plan Name in the Receipt Page

    it('E2E_7 :Should submit delta rating', function() {
        expect(perInfo.enrollStatus('Personal Info').getCssValue('background-color')).toEqual(TestData.liteGreen);
        expect(perInfo.enrollStatus('Dependents').getCssValue('background-color')).toEqual(TestData.liteGreen);
        expect(perInfo.enrollStatus('Facilities').getCssValue('background-color')).toEqual(TestData.liteGreen);
        expect(perInfo.enrollStatus('Payment & Review').getCssValue('background-color')).toEqual(TestData.liteGreen);
        expect(perInfo.enrollStatus('Receipt').getCssValue('background-color')).toEqual(TestData.darkGreen);
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
            expect(facilitydata.facilityName).toEqual(facility.facilityName);
            expect(facilitydata.street).toEqual(facility.street);
            expect(facilitydata.city).toEqual(facility.city);
            expect(facilitydata.region).toEqual(facility.region);
            expect(facilitydata.postalCode).toEqual(facility.postalCode);
            expect(facilitydata.telephone).toEqual(facility.telephone);
        });
    });

    it('E2E_10:Should display dependent allicant', function() {
        var facility = TestData.dependent_Facility_1;
        receipt.getSelectedFacilityDetails('DEPENDENT', 1).then(function(facilitydata) {
            expect(facilitydata.name).toEqual(TestData.Spouse.firstName);
            expect(facilitydata.facilityName).toEqual(facility.facilityName);
            expect(facilitydata.street).toEqual(facility.street);
            expect(facilitydata.city).toEqual(facility.city);
            expect(facilitydata.region).toEqual(facility.region);
            expect(facilitydata.postalCode).toEqual(facility.postalCode);
            expect(facilitydata.telephone).toEqual(facility.telephone);
        });
    });

});
