//CXINIT-1408 : E2E Work Flow 1 with the dependent age verification

//This Spec is used to Validate End to End Work Flow with the Dependent age Error
var perInfo = new(require('../../pageObjects/cxinit/perInfo-page.js'));
var depInfo = new(require('../../pageObjects/cxinit/dependent-page.js'));
var facilities = new(require('../../pageObjects/cxinit/facilities-page.js'));
var payment = new(require('../../pageObjects/cxinit/payment-page.js'));
var receipt = new(require('../../pageObjects/cxinit/receipt-page.js'));

var enrollPage = new(require('../../pageObjects/cxinit/enroll-page.js'));
var TestData = require('../../testData/' + testDataEnv + '/dhmo/dhmo.1408.EndToEndWkFlo11.json');
var states = ['CA']; // add state code where you want to run script
console.log("TestData.states=====" + TestData.states)
dataProvider(TestData.states, function(tData, description) {
    if (states.indexOf(description) != -1) { // checking the state to run

        describe('DHMO:1408:E2E_WrkFlow', function() {
            var effectiveDate, apNumber, pathToPdf, facility1, facility2;
            beforeAll(function() {
                console.log(' ');
                console.log('--- CXINIT-1408 E2E WrkFlow1 ---')
                console.log(' ');
                Utility.openApplication('', 'DELTA');
            });
            beforeEach(function () {
                jasmine.addMatchers(custommatcher.customMatchers);
            });

            //Fill the Valid Data in the home page of Enrollment and Proceed

            it('E2E_1 : Should complete the Enroll Page', function() {
                enrollPage.enterHomePageDetails(tData.enrollData).then(function(sdate) {
                    effectiveDate = sdate;
                    console.log("sdate============" + sdate);
                })
                expect(perInfo.fieldFirstName.isPresentAndDisplayed()).toBeTruthy();
                console.log('1408_1 complete')
            });

            //Enter the valid Test Data in the Personal Information page and Click n the Next

            it('E2E_2 :should populate PersInfo page', function() {
                perInfo.fillPersonalInfo(TestData);
                perInfo.fillAddress(tData);
                perInfo.phoneNumberemail(TestData);
                perInfo.next.click();
                expect(browser.getTitle()).toEqual(TestData.DependentPageTitle);
                console.log('1408_2 complete')

            });

            // Add Dependent as a Child and Proceed
            //Validate the Dependet age is greater than 26 and with the disability check box

            it('E2E_3 :should add 1 Child Dep', function() {
                expect(depInfo.fieldAddDependents.isPresentAndDisplayed()).toBeTruthy();
                depInfo.fillDependent('Dependent1', TestData.child3, false);
                depInfo.next.click();
                if (depInfo.isHandicapped('Dependent1').isPresentAndDisplayed()) {
                    depInfo.isHandicapped('Dependent1').check();
                }
                depInfo.next.click();
                expect(depInfo.premiumChangePopUp.isPresentAndDisplayed()).toBeTruthy();
                depInfo.continue.click();
                expect(browser.getTitle()).toEqual(TestData.facilitiesPageTitle);
                console.log('1408_3 complete')

            });


            //Verify and Select the Facility for the Dependent

            it('E2E_4 :should select fac for primary', function() {
                // facilities.selectFacility(TestData.facilityoption1);
                // Selecting first facility and capturing the all details of facility to validate in receipt page
                facilities.selectFacility().then(function(fnamee) {
                    facility1 = fnamee;
                });
                facilities.next.click();
                console.log('1408_4 complete')
            });

            //Verify and Select the Facility for the Dependent

            it('E2E_5 :should select fac for deps', function() {
                // facilities.selectFacility(TestData.facilityoption2);

                // Selecting first facility and capturing the all details of facility to validate in receipt page
                facilities.selectFacility().then(function(fnamee) {
                    facility2 = fnamee;
                });
                facilities.next.click();
                expect(browser.getTitle()).toEqual(TestData.paymentPageTitle);
                console.log('1408_5 complete')
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
                payment.purchaseNow.click();
                Utility.delay(maxWait);
                expect(browser.getTitle()).toEqual(TestData.receiptPageTitle);
                console.log('1408_6 complete')
            });
            // }
            it('E2E_7 :Should display primary apllicant', function() {
                // var facility = TestData.dependent_facilityoption1;
                var facility = facility1;
                receipt.applicants.click();
                receipt.applicationNumber.getText().then(function(appicationNumber) {
                    console.log("Application Number == " + appicationNumber);
                    receipt.saveCompletedApplication.click().then(function() {
                        pathToPdf = './PDFDownloads/application' + appicationNumber + '.pdf';
                    })
                })
                receipt.getSelectedFacilityDetails('PRIMARY').then(function(facilitydata) {
                    expect(facilitydata.name).toContain(TestData.firstname);
                    expect(facilitydata.facilityName).toEqual(facility.facilityName);
                    expect(facilitydata.street).toEqual(facility.street);
                    expect(facilitydata.city).toEqual(facility.city);
                    expect(facilitydata.region).toEqual(facility.region);
                    expect(facilitydata.postalCode).toContain(facility.postalCode);
                    expect(facilitydata.telephone).toEqual(facility.telephone);
                });
            });
            //Verify and Validate the Application Number and Plan Name in the Receipt Page

            it('E2E_8 :should generate a valid receipt page', function() {
                // var facility = TestData.dependent_facilityoption2;
                var facility = facility2;
                receipt.getSelectedFacilityDetails('DEPENDENT', 1).then(function(facilitydata) {
                    expect(facilitydata.name).toContain(TestData.child3.firstName);
                    expect(facilitydata.facilityName).toEqual(facility.facilityName);
                    expect(facilitydata.street).toEqual(facility.street);
                    expect(facilitydata.city).toEqual(facility.city);
                    expect(facilitydata.region).toEqual(facility.region);
                    expect(facilitydata.postalCode).toContain(facility.postalCode);
                    expect(facilitydata.telephone).toEqual(facility.telephone);
                    Utility.readPDFFile(pathToPdf).then(function(test) {
                        expect(test).toContain(TestData.firstname);
                        console.log('E2E_8: Complete');
                    });
                });
            });

        });
    }
});
