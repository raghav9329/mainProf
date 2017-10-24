//Direct_HMO_WorkFlows_5

//This Spec is used to Validate End to End Work Flow with the Dependent age Error
//Start at 94105 100First St 4th floor , Add 15 Dependents, All children over the age of 26.  
//Facilities ( her's fun )  Search for a new zip code for EVERY Dependent.

var perInfo = new(require('../../pageObjects/cxinit/perInfo-page.js'));
var depInfo = new(require('../../pageObjects/cxinit/dependent-page.js'));
var facilities = new(require('../../pageObjects/cxinit/facilities-page.js'));
var payment = new(require('../../pageObjects/cxinit/payment-page.js'));
var receipt = new(require('../../pageObjects/cxinit/receipt-page.js'));

var enrollPage = new(require('../../pageObjects/cxinit/enroll-page.js'));
var TestData = require('../../testData/' + testDataEnv + '/dhmo/Direct_HMO_WorkFlows_5.json');

describe('DHMO:1754 DirHMO_WrkFlo_5:', function() {
    var effectiveDate, apNumber, pathToPdf;
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
        console.log("1754_1 of 8 Complete")
    });

    //Enter the valid Test Data in the Personal Information page and Click n the Next

    it('E2E_2 :should populate PersInfo page', function() {
        perInfo.fillPersonalInfo(TestData);
        perInfo.fillAddress(TestData);
        perInfo.phoneNumberemail(TestData);
        perInfo.next.click();
        expect(browser.getTitle()).toEqual(TestData.DependentPageTitle);
        console.log("1754_2 of 8 Complete")

    });

    // Add Dependent as a Child and Proceed
    //Validate the Dependet age is greater than 26 and with the disability check box
    dataProvider(TestData.Dependents, function(data, description) {

        it('E2E_3 :should add 15 Dep', function() {
            expect(depInfo.fieldAddDependents.isPresentAndDisplayed()).toBeTruthy();
            // console.log("Souse test data====="+TestData.Spouse);
            depInfo.fillDependent(data.dependent, data, false);
            depInfo.next.click();
            if (depInfo.isHandicapped(data.dependent).isPresentAndDisplayed()) {
                depInfo.isHandicapped(data.dependent).check();
            }

            console.log('1754_3 json driven "' + data.dependent + '" complete')
        });
        console.log('1754_3 of 8 complete')
    });

    it('E2E_4 :Validate Premium Pop up and Navigation to Facility Page', function() {

        depInfo.next.click();
        expect(depInfo.premiumChangePopUp.isPresentAndDisplayed()).toBeTruthy();
        depInfo.continue.click();
        expect(browser.getTitle()).toEqual(TestData.facilitiesPageTitle);
        console.log("1754_4 of 8 Complete")
    });

    //Verify and Select the Facility for the Dependents with Zip code different for every dependent

    dataProvider(TestData.facilites, function(data, description) {

        it('E2E_5 :should Select Facilities for 15 Dep ' + description, function() {
            expect(facilities.zipCode.isPresentAndDisplayed()).toBeTruthy();
            facilities.zipCode.setText(data.zipcode);
            facilities.search.click();
            Utility.delay(minWait);
            facilities.selectFacility(data.facility);
            facilities.next.click();
            console.log('1754_5 json driven "' + data.dependent + '" complete')
        });
        console.log('1754_5 of 8 complete');

    });

    //Validate and Payment Page is launched
    //Furnish all the fields of the Payment page with the valid Test Data and proceed
    // if (testExecutionEnv != 'production') {
    it('E2E_6 :should fill out pay details', function() {
        facilities.next.click();
        expect(browser.getTitle()).toEqual(TestData.paymentPageTitle);
        // payment.billingChkBox.check();
        expect(payment.discloser.getAttribute('href')).toContain(TestData.discloser);
        payment.discloser.click();
        Utility.switchToWindow(1);
        expect(browser.getCurrentUrl()).toContain(TestData.discloser);
        Utility.switchToWindow(0);
        payment.fillpayment(TestData);
        payment.purchaseNow.click();
        Utility.delay(maxWait);
        expect(browser.getTitle()).toEqual(TestData.receiptPageTitle);
        console.log('1754_6 of 8 complete');
    });
    // }

    //Verify and Validate the Application Number and Plan Name in the Receipt Page

    it('E2E_7 :should generate a valid receipt page', function() {
        var facility = TestData.primaryFacility;
        receipt.planSummary.click();
        receipt.applicants.click();
        receipt.applicationNumber.getText().then(function(appicationNumber) {
            console.log("Application Number == " + appicationNumber);
            receipt.saveCompletedApplication.click().then(function() {
                pathToPdf = './PDFDownloads/application' + appicationNumber + '.pdf';
            })
        })
        receipt.getSelectedFacilityDetails('PRIMARY', 1).then(function(facilitydata) {
            expect(facilitydata.name).toContain(TestData.firstname);
            expect(facilitydata.facilityName).toEqual(facility.facilityName);
            expect(facilitydata.street).toEqual(facility.street);
            expect(facilitydata.city).toEqual(facility.city);
            expect(facilitydata.region).toEqual(facility.region);
            expect(facilitydata.postalCode).toEqual(facility.postalCode);
            expect(facilitydata.telephone).toEqual(facility.telephone);
        });
        console.log('1754_7 of 8 complete');
    });

    it('E2E_8 :should verify PDF Receipt', function() {
        Utility.readPDFFile(pathToPdf).then(function(test) {
            expect(test).toContain(TestData.firstname);
        });
        console.log('1754_8 complete')
    });

});
