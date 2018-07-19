//Direct_HMO_WorkFlows_5

//This Spec is used to Validate End to End Work Flow with the Dependent age Error
//Start at 94105 100First St 4th floor , Add 15 Dependents, All children over the age of 26.  
//Facilities ( her's fun )  Search for a new zip code for EVERY Dependent.

var perInfo    = new(require('../../../pageObjects/cxinit/perInfo-page.js'));
var depInfo    = new(require('../../../pageObjects/cxinit/dependent-page.js'));
var facilities = new(require('../../../pageObjects/cxinit/facilities-page.js'));
var payment    = new(require('../../../pageObjects/cxinit/payment-page.js'));
var receipt    = new(require('../../../pageObjects/cxinit/receipt-page.js'));
var enrollPage = new(require('../../../pageObjects/cxinit/enroll-page.js'));
var TestData   = require('../../../testData/' + testDataEnv + '/dhmo/Direct_HMO_WorkFlows_5.json');
var statesData = require('../../../testData/' + testDataEnv + '/statesAndProducts.json');


//To Navigate Personla Info Page
dataProvider(statesData.states, function(sData, sdescription) {
    if (states.indexOf(sdescription) != -1) {
        dataProvider(sData.products, function(tData, pdescription) {
            if (product.indexOf(pdescription) != -1) {

                describe('1754 DirHMO_WrkFlo_5 : ||State:' + sdescription + '||Product:' + pdescription + '||', function() {
                    var effectiveDate, apNumber, pathToPdf, facility1;
                    beforeAll(function() {
                        Utility.openApplication('', tData.product);
                    });
                    beforeEach(function() {
                        jasmine.addMatchers(custommatcher.customMatchers);
                    });

                    //Fill the Valid Data in the home page of Enrollment and Proceed

                    it('E2E_1 : Should complete the Enroll Page', function() {
                        enrollPage.enterHomePageDetails(tData.enrollData).then(function(sdate) {
                            effectiveDate = sdate;
                            console.log("sdate============" + sdate);
                        })
                        expect(perInfo.fieldFirstName.isPresentAndDisplayed()).toBeTruthy('Verify that "First Name" field in personal info page is displayed');
                        console.log("1754_1 of 8 Complete")
                    });

                    //Enter the valid Test Data in the Personal Information page and Click n the Next

                    it('E2E_2 :should populate PersInfo page', function() {
                        TestData.firstname = Utility.randomNo('String', 8);
                        TestData.lastname = Utility.randomNo('String', 8);
                        if (pdescription == 'DHMO' || pdescription == 'DPPO') {
                            TestData.MemberId = false;                            
                            var ssn = Utility.randomNo('Number', 8);
                            TestData.ssn = '1' + ssn.toString();
                            console.log(" TestData.ssn===" + TestData.ssn)
                            TestData.alternateid = "test@test.com";
                        }
                        if (pdescription == 'AHMO' || pdescription == 'APPO') {
                            TestData.MemberId = Utility.randomNo('Number', 10);
                            TestData.ssn = false;
                            TestData.alternateid = false;
                        }
                        perInfo.fillPersonalInfo(TestData);
                        perInfo.fillAddress(tData);
                        perInfo.phoneNumberemail(TestData);
                        if (pdescription == 'DHMO' || pdescription == 'DPPO') {
                            perInfo.fillBroker(TestData);
                        }
                        if (pdescription == 'AHMO' || pdescription == 'APPO') {
                            perInfo.referralSource.selectByText(TestData.referralSource);
                            perInfo.next.click();
                        }
                        expect(browser.getTitle()).toEqual(TestData.DependentPageTitle,'Verfiy "Dependent Page" is Displayed and the title is Equal as' +TestData.DependentPageTitle);
                        console.log("1754_2 of 8 Complete")

                    });

                    // Add Dependent as a Child and Proceed
                    //Validate the Dependet age is greater than 26 and with the disability check box
                    dataProvider(TestData.Dependents, function(data, description) {

                        it('E2E_3 :should add 15 Dep', function() {
                            expect(depInfo.fieldAddDependents.isPresentAndDisplayed()).toBeTruthy('Verify the Field "Add Dependent" is displayed and present');
                            depInfo.fillDependent(data.dependent, data, false);
                            depInfo.next.click();
                            if (sdescription !== 'NY') {
                                if (depInfo.isHandicapped(data.dependent).isPresentAndDisplayed()) {
                                    depInfo.isHandicapped(data.dependent).check();
                                }
                            }

                            console.log('1754_3 json driven "' + data.dependent + '" complete')
                        });
                        console.log('1754_3 of 8 complete')
                    });


                    it('E2E_4 :Validate Premium Pop up and Navigation to Facility Page', function() {
                        if (sdescription == 'NY') {
                            dataProvider(TestData.Dependents, function(data, description) {
                                depInfo.year(data.dependent).setText(Utility.getDatePart(moment().subtract(10, 'years').format('MM-DD-YYYY'), 'YEAR'));
                            })
                            depInfo.next.click();
                        }
                        depInfo.next.click();
                        expect(depInfo.premiumChangePopUp.isPresentAndDisplayed()).toBeTruthy('Verify Premium Change Pop Up isDisplayed and Present');
                        depInfo.continue.click();
                        console.log("1754_4 of 8 Complete")
                    });

                    //Verify and Select the Facility for the Dependents with Zip code different for every dependent
                    if (pdescription == 'DHMO' || pdescription == 'AHMO') {
                        dataProvider(TestData.facilites, function(data, description) {

                            it('E2E_5 :should Select Facilities for 15 Dep ' + description, function() {
                                expect(browser.getTitle()).toEqual(TestData.facilitiesPageTitle,'Verify "Facility" page is displayed and the title is Equal as' +TestData.facilitiesPageTitle);
                                facilities.selectFacility().then(function(fnamee) {
                                    facility1 = fnamee;
                                });
                                facilities.next.click();
                                console.log('1754_5 json driven "' + data.dependent + '" complete')
                            });
                            console.log('1754_5 of 8 complete');

                        });
                    }

                    it('E2E_6 :should fill out pay details', function() {
                        facilities.next.click();
                        expect(browser.getTitle()).toEqual(TestData.paymentPageTitle,'Verify "Payment" page is displayed and the title is Equal as' +TestData.paymentPageTitle);
                        if (pdescription == 'DHMO' || pdescription == 'DPPO') {
                            expect(payment.discloser.getAttribute('href')).toContain(tData.discloser,'Verify Discloser in Payment has same as: ' +tData.discloser);
                            payment.discloser.click();
                            Utility.switchToWindow(1);
                            expect(browser.getCurrentUrl()).toContain(tData.discloser,'Verify the Discloser in the URL is same as: '+tData.discloser);
                            Utility.switchToWindow(0);
                        }
                        payment.fillpayment(TestData);
                        if (pdescription == 'AHMO' || pdescription == 'APPO') {
                            payment.frequencyAnnualy.select();
                        }
                        payment.purchaseNow.click();
                        Utility.delay(maxWait);
                        expect(browser.getTitle()).toEqual(TestData.receiptPageTitle, 'Verify "Receipt" Page is displayed and the Tilte is Equal as' +TestData.receiptPageTitle);
                        console.log('1754_6 of 8 complete');
                    });
                    // }

                    //Verify and Validate the Application Number and Plan Name in the Receipt Page

                    it('E2E_7 :should generate a valid receipt page', function() {
                        receipt.planSummary.click();
                        receipt.applicants.click();
                        if (pdescription == 'DHMO' || pdescription == 'DPPO') {
                            receipt.applicationNumber.getText().then(function(appicationNumber) {
                                console.log("Application Number == " + appicationNumber);
                                receipt.saveCompletedApplication.click().then(function() {
                                    pathToPdf = './PDFDownloads/application' + appicationNumber + '.pdf';
                                })
                            })
                        }
                        if (pdescription == 'DHMO' || pdescription == 'AHMO') {
                            if (testDataEnv == 'dit') {
                                var facility = TestData.primaryFacility;
                            } else {
                                var facility = facility1;
                            }

                            receipt.getSelectedFacilityDetails('PRIMARY', 1).then(function(facilitydata) {
                                expect(facilitydata.name).toContain(TestData.firstname,'Verify the "First Name" field value of Primary Facility is same as: ' +TestData.firstname);
                                expect(facilitydata.facilityName).toEqual(facility.facilityName,'Verify the "facilityName" field value of Primary Facility is same as: ' +facility.facilityName);
                                expect(facilitydata.street).toEqual(facility.street,'Verify the "street" field value of Primary Facility is same as: ' +facility.street);
                                expect(facilitydata.city).toEqual(facility.city,'Verify the "city" field value of Primary Facility is same as: ' +facility.city);
                                expect(facilitydata.region).toEqual(facility.region,'Verify the "region" field value of Primary Facility is same as: ' +facility.region);
                                expect(facilitydata.postalCode).toContain(facility.postalCode,'Verify the "postalCode" field value of Primary Facility is same as: ' +facility.postalCode);
                                expect(facilitydata.telephone).toEqual(facility.telephone,'Verify the "telephone" field value of Primary Facility is same as: ' +facility.telephone);
                            });
                            console.log('1754_7 of 8 complete');
                        }
                    });

                    it('E2E_8 :should verify PDF Receipt', function() {
                        receipt.verifyPixel(sdescription, pdescription);
                        if (pdescription == 'DHMO' || pdescription == 'DPPO') {
                            browser.sleep(500000);
                            Utility.readPDFFile(pathToPdf).then(function(test) {
                                expect(test).toContain(TestData.firstname, 'Verify the "FirstName" field value displayed in the PDF is same as: ' +TestData.firstname);
                            });
                        }
                        console.log('1754_8 complete')
                    });

                });
            }
        })
    }
})
