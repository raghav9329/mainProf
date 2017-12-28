//DHMO E2E Script for TX state
var perInfo = new(require('../../pageObjects/cxinit/perInfo-page.js'));
var depInfo = new(require('../../pageObjects/cxinit/dependent-page.js'));
var facilities = new(require('../../pageObjects/cxinit/facilities-page.js'));
var payment = new(require('../../pageObjects/cxinit/payment-page.js'));
var receipt = new(require('../../pageObjects/cxinit/receipt-page.js'));

var enrollPage = new(require('../../pageObjects/cxinit/enroll-page.js'));
var TestData = require('../../testData/' + testDataEnv + '/dhmo/2532dhmotx.e2e.json');

var pdf2Text = require('pdf2text')

describe('DHMO_TX:2532 E2E WorkFlows for Texas', function() {
    var effectiveDate, premiumAmount, apNumber, pathToPdf;
    beforeAll(function() {
        Utility.openApplication('', 'DELTA');
    });
    beforeEach(function () {
        jasmine.addMatchers(custommatcher.customMatchers);
    });

    //Fill the Valid Data in the home page of Enrollment and Proceed

    it('E2E_1 : Should complete the Enroll Page', function() {
        TestData.firstname = Utility.randomNo('String', 5);
        TestData.lastname = Utility.randomNo('String', 5);
        enrollPage.enterHomePageDetails(TestData.enrollData).then(function(sdate) {
            effectiveDate = sdate;
            console.log("sdate============" + sdate);
        })
        
        expect(perInfo.fieldFirstName.isPresentAndDisplayed()).toBeTruthy();
        console.log('2532_1 complete')
    });
//
    //Enter the valid Test Data in the Personal Information page and Click n the Next

    it('E2E_2 :should populate PersInfo page', function() {
        perInfo.fillPersonalInfo(TestData);
        perInfo.fillAddress(TestData);
        perInfo.phoneNumberemail(TestData);
        perInfo.next.click();
        expect(browser.getTitle()).toEqual(TestData.DependentPageTitle);
        console.log('2532_2 complete')

    });

    // Add Dependent as a Child and Proceed
    //Validate the Dependet age is greater than 26 and with the disability check box

    it('E2E_3 :should add 1 Child Dep', function() {
        expect(depInfo.fieldAddDependents.isPresentAndDisplayed()).toBeTruthy();
        depInfo.fillDependent('Dependent1', TestData.Spouse);
        depInfo.fillDependent('Dependent2', TestData.child);
        depInfo.next.click();
        expect(depInfo.premiumChangePopUp.isPresentAndDisplayed()).toBeTruthy();
        depInfo.continue.click();
        expect(browser.getTitle()).toEqual(TestData.facilitiesPageTitle);
        console.log('2532_3 complete')

    });


    //Verify and Select the Facility for the Dependent

    it('E2E_4 :should select fac for primary', function() {
        facilities.selectFacility(TestData.facilityoption1);
        facilities.next.click();
        console.log('2532_4 complete')
    });

    //Verify and Select the Facility for the Dependent

    it('E2E_5 :should select fac for deps', function() {
        facilities.selectFacility(TestData.facilityoption2);
        facilities.next.click();
        facilities.selectFacility(TestData.facilityoption3);
        facilities.next.click();
        expect(browser.getTitle()).toEqual(TestData.paymentPageTitle);
        console.log('2532_5 complete')
    });

    //Furnish all the fields of the Payment page with the valid Test Data and proceed
    // if (testExecutionEnv != 'production') {
    it('E2E_6 :should fill out pay details', function() {
        expect(payment.discloser.getAttribute('href')).toContain(TestData.discloser);
        payment.discloser.click();
        Utility.switchToWindow(1);
        expect(browser.getCurrentUrl()).toContain(TestData.discloser);
        Utility.switchToWindow(0);
        payment.billingChkBox.check();
        payment.fillpayment(TestData);
        payment.summaryTotalPrice.getText().then(function(premium) {
            premiumAmount = premium;
        });
        payment.purchaseNow.click();
        Utility.delay(maxWait);
        expect(browser.getTitle()).toEqual(TestData.receiptPageTitle);
        console.log('2532_6 complete')
    });

    //Verify and Validate the Application Number and Plan Name in the Receipt Page

    it('E2E_7 :Should submit delta rating', function() {
        receipt.submitRating(TestData.deltaRating);
        receipt.answerQuery(TestData.queryAnswer);
        expect(receipt.getThanksMsg()).toEqual(TestData.thanksMsg);
        receipt.applicationNumber.getText().then(function(appicationNumber) {
            console.log("Application Number == " + appicationNumber)
            apNumber = appicationNumber;
        })
        expect(receipt.planPurchased.getText()).toContain(TestData.planName);
        //Effective date is fixed under drop down and the Coverage start date are unequal
        expect(receipt.effectiveDate.getText()).toEqual(effectiveDate);
        expect(receipt.totalPaid.getText()).toEqual(premiumAmount);
        console.log('2532_7 complete')
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
        console.log('2532_8 complete')

    });
    it('E2E_9 :Should display primary applicant', function() {
        Utility.scrollToBottom();
        var facility = TestData.primaryFacility;
        receipt.saveCompletedApplication.click().then(function() {
            pathToPdf = './PDFDownloads/application' + apNumber + '.pdf';
        })
        receipt.applicants.click();
        receipt.getSelectedFacilityDetails('PRIMARY').then(function(facilitydata) {
            expect(facilitydata.name).toContain(TestData.firstname);
            expect(facilitydata.facilityName).toEqual(facility.facilityName);
            expect(facilitydata.street).toEqual(facility.street);
            expect(facilitydata.city).toEqual(facility.city);
            expect(facilitydata.region).toEqual(facility.region);
            expect(facilitydata.postalCode).toEqual(facility.postalCode);
            expect(facilitydata.telephone).toEqual(facility.telephone);
            console.log('2532_9 complete')
        });
    });

    it('E2E_10:Should display dependent applicant', function() {
        var facility = TestData.dependent_Facility_1;
        receipt.verifyPixel('TX', 'DHMO');
        receipt.getSelectedFacilityDetails('DEPENDENT', 1).then(function(facilitydata) {
            expect(facilitydata.name).toContain(TestData.Spouse.firstName);
            expect(facilitydata.facilityName).toEqual(facility.facilityName);
            expect(facilitydata.street).toEqual(facility.street);
            expect(facilitydata.city).toEqual(facility.city);
            expect(facilitydata.region).toEqual(facility.region);
            expect(facilitydata.postalCode).toEqual(facility.postalCode);
            expect(facilitydata.telephone).toEqual(facility.telephone);
            Utility.readPDFFile(pathToPdf).then(function(test) {
                expect(test).toContain(TestData.firstname);
                console.log('2532_10 complete')
            });
        });
    });

});
