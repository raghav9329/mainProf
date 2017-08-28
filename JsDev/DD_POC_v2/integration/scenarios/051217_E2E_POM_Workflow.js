//CXINIT-1235 : Review my previous work and start a new E2E Page Object Model based Work Flow

//This Spec is used to Verify and Validate Ene to End Work Flow with the Errors and the Happy path

var perInfo = new(require('../pageObjects/cxinit/perInfo-page.js'));
var depInfo = new(require('../pageObjects/cxinit/dependent-page.js'));
var facilities = new(require('../pageObjects/cxinit/facilities-page.js'));
var payment = new(require('../pageObjects/cxinit/payment-page.js'));
var receipt = new(require('../pageObjects/cxinit/receipt-page.js'));
var enrollPage = new(require('../pageObjects/cxinit/enroll-page.js'));
var TestData = require('../testData/'+testDataEnv+'/051217_E2E_POM_Workflow.json');

describe('CXINIT-1235: E2E_WorkFlow:(051217_E2E_POM_Workflow) ', function() {
    var effectiveDate;
    beforeAll(function() {
        Utility.openApplication('', 'DELTA');
    });

    //Fill the Valid Data in the home page of Enrollment and Proceed

    it('E2E_1 : Should complete the Enroll Page', function() {
        enrollPage.enterHomePageDetails(TestData.enrollData).then(function(sdate) {
            effectiveDate = sdate;
            console.log("sdate============" + sdate);
        })
        expect(perInfo.fieldFirstName.isPresentAndDisplayed()).toBeTruthy();
    });

    //Enter the valid Test Data in the Personal Information page and Click n the Next

    it('E2E_Flow_2: Verify Personal Information Page is filled with Valid data and Proceed', function() {
        perInfo.fillPersonalInfo(TestData);
        perInfo.fillAddress(TestData);
        perInfo.phoneNumberemail(TestData);
        // perInfo.fillBroker(TestData);
        depInfo.next.click();
        expect(browser.getTitle()).toEqual(TestData.DependentTitle);

    });

    //Verify and Validate the both the Client and Server side Errors in the Dependent Page with the NUll Values supplied

    it('E2E_Flow_3: Verifying the Errors of both client and server side by passing NULL values', function() {
        depInfo.fieldAddDependents.click();
        depInfo.next.click();
        expect(depInfo.getValidationMessages('Dependent1')).toEqual(TestData.dependentErrors);
        expect(depInfo.getServerValidationMessages()).toEqual(TestData.dependentErrors);
        Utility.scrollToTop();
        browser.sleep(2000);
        depInfo.deleteDependent('Dependent1').click();
    });

    //validating the Dependents of same type(Domestic partner and spouse) 
    // Validating the error "You can select only 1 Spouse or Domestic Partner." and Premium change Pop-up
    // updates the Dependent one of the same relation type dependent to child

    it('E2E_Flow_3_1: Verifying and Validate the Dependents of same type(Domestic Partner and Spouse do not allowed) not allowed more than 1', function() {
        browser.sleep(2000);
        expect(depInfo.fieldAddDependents.isPresentAndDisplayed()).toBeTruthy();
        depInfo.fillDependent('Dependent1', TestData.domesticpartner1, false);
        depInfo.fillDependent('Dependent2', TestData.Spouse1, false);
        depInfo.next.click();
        expect(depInfo.premiumChangePopUp.isPresentAndDisplayed()).toBeTruthy();
        depInfo.continue.click();
        Utility.scrollToTop();
        expect(depInfo.depError.getText()).toEqual("You can select only 1 Spouse or Domestic Partner.");
        depInfo.relationship('Dependent2').selectByText(TestData.updateRelationship);

    });

    //Verifying and adding Dependents 6 and proceed to next page

    it('E2E_Flow_4: Verify 6 dependents were added and furnished with valid Test Data and the calculated Premium Pop up is displayed', function() {
        depInfo.fillDependent('Dependent3', TestData.child3, false);
        depInfo.fillDependent('Dependent4', TestData.child4, false);
        depInfo.fillDependent('Dependent5', TestData.child5, false);
        depInfo.fillDependent('Dependent6', TestData.child6, false);
        depInfo.next.click();
        // expect(depInfo.premiumChangePopUp.isPresentAndDisplayed()).toBeTruthy();
        // depInfo.continue.click();
        Utility.delay(maxWait);
        // browser.sleep(2000);
        expect(browser.getTitle()).toEqual(TestData.facilitiesTitle);
    });

    //Verify and Select the Facility for the Dependent

    it('E2E_Flow_5: Verify and select a Facility for the primary', function() {
        facilities.selectFacility(TestData.facilityoption1);
        facilities.next.click();
    });

    //Verify and Select the Facility for the Dependent

    it('E2E_Flow_5_1: Verify and select the facilities for dependents', function() {
        facilities.selectFacility(TestData.facilityoption2);
        facilities.next.click();
    });

    //Verify and Select the Facilities for the 4 other Dependents

    it('E2E_Flow_5_2: Verify and select the facilities for dependents', function() {
        facilities.selectFacility(TestData.facilityoption3);
        facilities.next.click();
        facilities.selectFacility(TestData.facilityoption4);
        facilities.next.click();
        facilities.selectFacility(TestData.facilityoption5);
        facilities.next.click();
        facilities.selectFacility(TestData.facilityoption6);
        facilities.next.click();
        facilities.selectFacility(TestData.facilityoption7);
        facilities.next.click();
        expect(browser.getTitle()).toEqual(TestData.paymentTitle);
    });

    //Validate and Verify the both the client and Server side error validations in the Payment Page

    it('E2E_Flow_6: Validate and Verify the Errors of both the Client and Server in the Payment Page', function() {
        payment.billingAddress.click();
        payment.billingChkBox.unCheck();
        payment.purchaseNow.click();
        browser.sleep(2000)
        expect(payment.getCCValidationMessages()).toEqual(TestData.paymentErrors)
        expect(payment.getBillingAddressValidationMessages()).toEqual(TestData.paymentAddressErrors);
        expect(payment.getCCServerValidationMessages()).toEqual(TestData.paymentErrors);
        expect(payment.getBillingAddressServerValidationMessages()).toEqual(TestData.paymentAddressErrors);
    });

    //Furnish all the fields of the Payment page with the valid Test Data and proceed

    /* Unable to Proceed logged a defect for the same CXINIT-1393 */

    it('E2E_Flow_7: Validate and Verify Payment Page Details with valid Test Data', function() {
        payment.billingChkBox.check();
        payment.fillpayment(TestData);
        payment.purchaseNow.click();
        expect(browser.getTitle()).toEqual(TestData.receiptTitle);
    });

    //Verify and Validate the Application Number and Plan Name in the Receipt Page

    it('E2E_Flow_8 :Should display plansummary', function() {
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
    it('E2E_Flow_9 :Should display primary applicant', function() {
        var facility = TestData.primaryFacility;
        receipt.applicants.click();
        receipt.getSelectedFacilityDetails('PRIMARY').then(function(facilitydata) {
            expect(facilitydata.name).toContain(TestData.firstname);
            expect(facilitydata.facilityName).toEqual(TestData.primaryFacility.facilityName);
            expect(facilitydata.street).toEqual(facility.street);
            expect(facilitydata.city).toEqual(facility.city);
            expect(facilitydata.region).toEqual(facility.region);
            expect(facilitydata.postalCode).toEqual(facility.postalCode);
            expect(facilitydata.telephone).toEqual(facility.telephone);
        });
    });

});
