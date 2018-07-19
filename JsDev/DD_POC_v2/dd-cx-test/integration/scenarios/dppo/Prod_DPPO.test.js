var TestData = require('../../testData/' + testDataEnv + '/dppo/Prod_DPPO.json');
var perInfo = new(require('../../pageObjects/cxinit/perInfo-page.js'));
var depInfo = new(require('../../pageObjects/cxinit/dependent-page.js'));
var facilities = new(require('../../pageObjects/cxinit/facilities-page.js'));
var payment = new(require('../../pageObjects/cxinit/payment-page.js'));
var receipt = new(require('../../pageObjects/cxinit/receipt-page.js'));
var enrollPage = new(require('../../pageObjects/cxinit/enroll-page.js'));

var pdf2Text = require('pdf2text');
var moment = require('moment');
var updateJson = require('update-json');

describe('Prod_DPPO', function() {
    var effectiveDate, apNumber, pathToPdf, index, updateindex;
    beforeAll(function() {
        Utility.openApplication('', 'DELTA');
        index = TestData.index;
        console.log("index==========" + index);
    });
    beforeEach(function () {
        jasmine.addMatchers(custommatcher.customMatchers);
    });

    afterAll(function() {
        if (TestData.index == 12) {
            updateindex = 0;
        } else {
            updateindex = (Number(index) + 1);
        }

        console.log("updateindex====" + updateindex);
        var data = { index: updateindex };
        var file_path = './integration/testData/' + testDataEnv + '/dppo/Prod_DPPO.json';
        updateJson(file_path, data, function(error) {
            if (error) {
                throw error;
            } else {}
        });
    })

    it('Prod_DPPO_1: Enter the Zip code and Click on the Enter for the Enroll Page', function() {
        TestData.enrollData.dob = moment().subtract(45, 'years').format('MM-DD-YYYY');
        TestData.firstname = TestData.firstname + TestData.char[TestData.index];
        TestData.lastname = TestData.lastname + TestData.char[TestData.index];
        TestData.enrollData.dependentsDOB = [moment().subtract(13, 'years').format('MM-DD-YYYY'), moment().subtract(5, 'years').format('MM-DD-YYYY')];
        enrollPage.enterHomePageDetails(TestData.enrollData).then(function(sdate) {
            effectiveDate = sdate;
            console.log("sdate============" + sdate);
        })

        expect(perInfo.fieldFirstName.isPresentAndDisplayed()).toBeTruthy();
    });

    it('Prod_DPPO_2: Verify Personal Information Page is filled with Valid data and Proceed', function() {
        perInfo.fillPersonalInfo(TestData);
        perInfo.fillAddress(TestData);
        perInfo.phoneNumberemail(TestData);
        perInfo.fillBroker(TestData);
        expect(browser.getTitle()).toEqual(TestData.DependentTitle);
    });

    it('Prod_DPPO_3: Verifying the Errors of both client and server side by passing NULL values', function() {
        depInfo.month('Dependent1').setText('');
        depInfo.date('Dependent1').setText('');
        depInfo.year('Dependent1').setText('' + '\t');
        depInfo.next.click();
        expect(depInfo.getValidationMessages('Dependent1')).toEqual(TestData.dependentErrors);
    })
    it('Prod_DPPO_4: Verify 2 dependents were added and furnished with valid Test Data for Each of them', function() {
        TestData.Spouse.DOB = moment().subtract(27, 'years').format('MM-DD-YYYY');
        TestData.child1.DOB = moment().subtract(13, 'years').format('MM-DD-YYYY');
        TestData.child2.DOB = moment().subtract(05, 'years').format('MM-DD-YYYY');
        depInfo.fillDependent('Dependent1', TestData.child1, true);
        depInfo.fillDependent('Dependent2', TestData.child2, true);
        depInfo.fillDependent('Dependent3', TestData.Spouse, false);
        depInfo.deleteDependent('Dependent2').click();
        depInfo.next.click();
        Utility.waitUntilElementNotPresent(element(by.css('img.loaderImg')));
        depInfo.continue.click();
        expect(browser.getTitle()).toEqual(TestData.paymentTitle);       
    });

    it('Prod_DPPO_5: Validate and Verify the Errors of both the Client and Server in the Payment Page', function() {
        expect(payment.discloser.getAttribute('href')).toContain(TestData.discloser);
        payment.discloser.click();
        Utility.switchToWindow(1);
        expect(browser.getCurrentUrl()).toContain(TestData.discloser);
        Utility.switchToWindow(0);
        payment.billingAddress.click();
        payment.billingChkBox.unCheck();
        payment.purchaseNow.click();
        expect(payment.getCCValidationMessages()).toEqual(TestData.paymentErrors)
        expect(payment.getBillingAddressValidationMessages()).toEqual(TestData.paymentAddressErrors);
        expect(payment.getCCServerValidationMessages()).toEqual(TestData.paymentErrors);
        expect(payment.getBillingAddressServerValidationMessages()).toEqual(TestData.paymentAddressErrors);
    });



    it('Prod_DPPO_6 :Should display plansummary', function() {
        var plansummary = TestData.planSummary;
        receipt.planSummary.click();
        receipt.applicationNumber.getText().then(function(appicationNumber) {
            console.log("Application Number == " + appicationNumber);
            apNumber = appicationNumber;
        })
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

});
