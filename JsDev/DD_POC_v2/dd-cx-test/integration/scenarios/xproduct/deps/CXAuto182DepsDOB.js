/*
 * CXAUTO-182: New flow for testing Data Persistence of Dependents DOB from Shopping to Buying
 * Validate persistence of Dependents Date of Birth from Get-A-Quote page to Dependents Page for Delta brand
 */
var TestData = require('../../../testData/' + testDataEnv + '/dhmo/dhmo.1358DepSpouse-DP.json');
var perInfo = new(require('../../../pageObjects/cxinit/perInfo-page.js'));
var depInfo = new(require('../../../pageObjects/cxinit/dependent-page.js'));
var facilities = new(require('../../../pageObjects/cxinit/facilities-page.js'));
var payment = new(require('../../../pageObjects/cxinit/payment-page.js'));
var receipt = new(require('../../../pageObjects/cxinit/receipt-page.js'));
var enrollPage = new(require('../../../pageObjects/cxinit/enroll-page.js'));
var planOptions = new(require('../../../pageObjects/cxinit/plan-options-page.js'));
var planDetails = new(require('../../../pageObjects/cxinit/plan-details-page.js'));
var statesData = require('../../../testData/' + testDataEnv + '/statesAndProducts.json');
var Shopping = new(require('../../../pageObjects/cxinit/shopping-page.js'));

//To Navigate Personla Info Page
dataProvider(statesData.states, function(sData, sdescription) {
    if (states.indexOf(sdescription) != -1) {
        dataProvider(sData.products, function(tData, pdescription) {
            if (product.indexOf(pdescription) != -1) {
                describe('CXAUTO-182: testing Data Persistence of Dependents DOB: ||State:' + sdescription + '||Product:' + pdescription + '||', function() {
                    var dep2_Price;
                    beforeAll(function() {
                        tData.enrollData.NoOfPeopleCovered = "1";
                        tData.enrollData.dependentsDOB = ["10-10-1990", "05-05-1991", "06-12-1989", "08-08-1987"];
                        Utility.openApplication('', tData.product);
                    });
                    beforeEach(function() {
                        jasmine.addMatchers(custommatcher.customMatchers);
                    });
                    //   Fill the Enroll page with valid data and verify the navigation
                    it('Step-1: should complete the Enroll Page', function() {
                        enrollPage.enterHomePageDetails(tData.enrollData);
                        expect(perInfo.fieldFirstName.isPresentAndDisplayed()).toBeTruthy('Verify that user in personal info page and "First Name" field is displayed');
                    });
                    //  Fill Personal Infor Page with valid data and verify the navigation
                    it('Step-2: should fill out Personal Information Page', function() {
                        TestData.firstname = Utility.randomNo('String', 8);
                        TestData.lastname = Utility.randomNo('String', 8);
                        if (pdescription == 'DHMO' || pdescription == 'DPPO') {
                            TestData.MemberId = false;
                            var ssn = Utility.randomNo('Number', 8);
                            TestData.ssn = '1' + ssn.toString();
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
                        expect(browser.getTitle()).toEqual(TestData.DependentTitle, 'Verify that dependent page title should be "' + TestData.DependentTitle + '"');
                    });
                    // Verify that follwing fields are displayed in dependent
                    // Relationship to Applicant
                    // First Name
                    // Middle Initial (optional)
                    // Last Name
                    // Gender (optional)
                    // Birthdate (mm/dd/yyyy)
                    it('Step-3:Verify that fields are displayed in dependent', function() {
                        expect(depInfo.relationship('Dependent1').isPresentAndDisplayed()).toBeTruthy("Verify that 'Relationship' dropdown should be displayed");
                        expect(depInfo.firstname('Dependent1').isPresentAndDisplayed()).toBeTruthy("Verify that 'First Name' text field should be displayed");
                        expect(depInfo.middleName('Dependent1').isPresentAndDisplayed()).toBeTruthy("Verify that 'Middle Name' text field should be displayed");
                        expect(depInfo.lastname('Dependent1').isPresentAndDisplayed()).toBeTruthy("Verify that 'Last Name' text field should be displayed");
                        expect(depInfo.gender('Dependent1').isPresentAndDisplayed()).toBeTruthy("Verify that 'Gender' dropdown should be displayed");
                        expect(depInfo.month('Dependent1').isPresentAndDisplayed()).toBeTruthy("Verify that 'Month' text field should be displayed");
                        expect(depInfo.date('Dependent1').isPresentAndDisplayed()).toBeTruthy("Verify that 'Date' text field should be displayed");
                        expect(depInfo.year('Dependent1').isPresentAndDisplayed()).toBeTruthy("Verify that 'Year' text field should be displayed");
                    });

                    it('Step-4: Verify DOBs from GetAQuote Page carry forwarded to Dependents Page', function() {
                        dep1_DOB = tData.enrollData.dependentsDOB[0].split("-");
                        dep2_DOB = tData.enrollData.dependentsDOB[1].split("-");
                        dep3_DOB = tData.enrollData.dependentsDOB[2].split("-");
                        dep4_DOB = tData.enrollData.dependentsDOB[3].split("-");

                        console.log(dep2_DOB);
                        expect(depInfo.month('Dependent1').getValue()).toEqual(dep1_DOB[0], "Verify that 'Month' value is same as " +dep1_DOB[0]);
                        expect(depInfo.date('Dependent1').getValue()).toEqual(dep1_DOB[1], "Verify that 'Date' value is same as " +dep1_DOB[1]);
                        expect(depInfo.year('Dependent1').getValue()).toEqual(dep1_DOB[2], "Verify that 'Year' value is same as " +dep1_DOB[2]);

                        expect(depInfo.month('Dependent2').getValue()).toEqual(dep2_DOB[0], "Verify that 'Month' value is same as " +dep2_DOB[0]);
                        expect(depInfo.date('Dependent2').getValue()).toEqual(dep2_DOB[1], "Verify that 'Date' value is same as " +dep2_DOB[1]);
                        expect(depInfo.year('Dependent2').getValue()).toEqual(dep2_DOB[2], "Verify that 'Year' value is same as " +dep2_DOB[2]);

                        expect(depInfo.month('Dependent3').getValue()).toEqual(dep3_DOB[0], "Verify that 'Month' value is same as " +dep3_DOB[0]);
                        expect(depInfo.date('Dependent3').getValue()).toEqual(dep3_DOB[1], "Verify that 'Date' value is same as " +dep3_DOB[1]);
                        expect(depInfo.year('Dependent3').getValue()).toEqual(dep3_DOB[2], "Verify that 'Year' value is same as " +dep3_DOB[2]);

                        expect(depInfo.month('Dependent4').getValue()).toEqual(dep4_DOB[0], "Verify that 'Month' value is same as " +dep4_DOB[0]);
                        expect(depInfo.date('Dependent4').getValue()).toEqual(dep4_DOB[1], "Verify that 'Date' value is same as " +dep4_DOB[1]);
                        expect(depInfo.year('Dependent4').getValue()).toEqual(dep4_DOB[2], "Verify that 'Year' value is same as " +dep4_DOB[2]);
                        // expect(depInfo.month('Dependent1').isPresentAndDisplayed()).toBeTruthy("Verify that 'Month' text field should be displayed");
                        // expect(depInfo.date('Dependent1').isPresentAndDisplayed()).toBeTruthy("Verify that 'Date' text field should be displayed");
                        // expect(depInfo.year('Dependent1').isPresentAndDisplayed()).toBeTruthy("Verify that 'Year' text field should be displayed");

                    });

                    //delete two Dependents from the dependents page
                    it('Step-5: Verify two Dependents deleted succesfully', function() {
                        expect(depInfo.deleteDependent('Dependent1').isPresentAndDisplayed()).toBeTruthy("Verify the Remove Option for Dependent is Displayed");
                        depInfo.deleteDependent('Dependent1').click();
                        depInfo.deleteDependent('Dependent2').click();
                        depInfo.fillDependent('Dependent1', TestData.domesticPartner, true);
                        depInfo.fillDependent('Dependent2', TestData.child, true);

                    });
                    // Update the Second dependent relation to child and click on Next
                    // Should be navigate to facilities page
                    it('Step-6:Verify the price in purple box', function() {
                        depInfo.next.click();
                        if (pdescription == 'DHMO') {
                            facilities.premiumAmount.getText().then(function(premium) {
                                expect(depInfo.premiumChangePopUp.isPresentAndDisplayed()).toBeFalsy();
                                // expect(premium.substring(1)).toEqual(dep2_Price,"Verify that premium amount should be :"+dep2_Price);
                                expect(browser.getTitle()).toEqual(TestData.facilitiesTitle, "Verify that facilities page title should be " + TestData.facilitiesTitle);
                                facilities.selectFacility().then(function(fnamee) {
                                    facility1 = fnamee;
                                });
                                facilities.next.click();
                                facilities.selectFacility().then(function(fnamee) {
                                    facility2 = fnamee;
                                });
                                facilities.next.click();
                                facilities.selectFacility().then(function(fnamee) {
                                    facility3 = fnamee;
                                });
                                facilities.next.click();
                                expect(browser.getTitle()).toEqual(TestData.paymentTitle, 'Verify "Payment" page is displayed and the title is Equal as' + TestData.paymentTitle);

                            });
                        }
                        if (pdescription == 'DPPO') {
                            if (depInfo.continue.isPresentAndDisplayed()) depInfo.continue.click();
                            expect(browser.getTitle()).toEqual(TestData.paymentTitle, "Verify that payment page title should be " + TestData.paymentTitle);
                        }

                    });

                    it('Step-7: Navigating back to Dependents page and Verify', function() {
                        if (pdescription == 'DHMO') {
                            expect(browser.getTitle()).toEqual(TestData.paymentTitle, 'Verify "Payment" page is displayed and the title is Equal as' + TestData.paymentTitle);
                            payment.back.click();
                            expect(browser.getTitle()).toEqual(TestData.facilitiesTitle, "Verify that facilities page title should be " + TestData.facilitiesTitle);
                            facilities.back.click();
                            facilities.back.click();
                            facilities.back.click();
                            expect(browser.getTitle()).toEqual(TestData.DependentTitle, 'Verify that dependent page title should be "' + TestData.DependentTitle + '"');


                        }
                        if (pdescription == 'DPPO') {
                            expect(browser.getTitle()).toEqual(TestData.paymentTitle, "Verify that payment page title should be " + TestData.paymentTitle);
                            payment.back.click();
                            expect(browser.getTitle()).toEqual(TestData.DependentTitle, 'Verify that dependent page title should be "' + TestData.DependentTitle + '"');
                        }

                    });

                    it('Step-8: Verify the Data persisted in the dependet page', function() {
                        var dependent1_DOB = TestData.domesticPartner.DOB.split("-");
                        var dependent2_DOB = TestData.child.DOB.split("-");

                        expect(depInfo.relationship('Dependent1').getSelectedValue()).toEqual(TestData.domesticPartner.relationship, "Verify that Dependent1 'Relationship' value is same as " + TestData.domesticPartner.relationship);
                        expect(depInfo.firstname('Dependent1').getValue()).toEqual(TestData.domesticPartner.firstName, "Verify that Dependent1 'First Name' value is same as " + TestData.domesticPartner.firstName)
                        expect(depInfo.middleName('Dependent1').getValue()).toEqual(TestData.domesticPartner.middleName, "Verify that 'Middle Name' value is same as " + TestData.domesticPartner.middleName);
                        expect(depInfo.lastname('Dependent1').getValue()).toEqual(TestData.domesticPartner.lastName, "Verify that 'Last Name' value is same as " + TestData.domesticPartner.lastName);
                        expect(depInfo.gender('Dependent1').getSelectedValue()).toEqual(TestData.defaultGender, "Verify that 'Gender' dropdown value is same as " + TestData.defaultGender);
                        expect(depInfo.month('Dependent1').getValue()).toEqual(dependent1_DOB[0], "Verify that 'Month' value is same as " + dependent1_DOB[0]);
                        expect(depInfo.date('Dependent1').getValue()).toEqual(dependent1_DOB[1], "Verify that 'Date' value is same as " + dependent1_DOB[1]);
                        expect(depInfo.year('Dependent1').getValue()).toEqual(dependent1_DOB[2], "Verify that 'Year' value is same as " + dependent1_DOB[2]);

                        expect(depInfo.relationship('Dependent2').getSelectedValue()).toEqual(TestData.child.relationship, "Verify that Dependent1 'Relationship' value is same as " + TestData.child.relationship);
                        expect(depInfo.firstname('Dependent2').getValue()).toEqual(TestData.child.firstName, "Verify that Dependent1 'First Name' value is same as " + TestData.child.firstName)
                        expect(depInfo.middleName('Dependent2').getValue()).toEqual(TestData.child.middleName, "Verify that 'Middle Name' value is same as " + TestData.child.middleName);
                        expect(depInfo.lastname('Dependent2').getValue()).toEqual(TestData.child.lastName, "Verify that 'Last Name' value is same as " + TestData.child.lastName);
                        expect(depInfo.gender('Dependent2').getSelectedValue()).toEqual(TestData.defaultGender, "Verify that 'Gender' dropdown value is same as " + TestData.defaultGender);
                        expect(depInfo.month('Dependent2').getValue()).toEqual(dependent2_DOB[0], "Verify that 'Month' value is same as " + dependent2_DOB[0]);
                        expect(depInfo.date('Dependent2').getValue()).toEqual(dependent2_DOB[1], "Verify that 'Date' value is same as " + dependent2_DOB[1]);
                        expect(depInfo.year('Dependent2').getValue()).toEqual(dependent2_DOB[2], "Verify that 'Year' value is same as " + dependent2_DOB[2]);

                    });

                    it('Navigating to Get-A-Quote Page and verify the Dependetns DOBs', function() {
                        depInfo.back.click();
                        perInfo.backToQuote.click();
                        planDetails.back.click();
                        planOptions.back.click();

                        // expect(Shopping.getDependentDOB('Dependent1')).toEqual(tData.enrollData.dependentsDOB[0]);

                        expect(Shopping.dependentfieldDBMM('Dependent1').getValue()).toEqual(dep1_DOB[0], 'Verify Dependent1 Month is same as ' +dep1_DOB[0]);


                    });

                    //Verify and Select the Facilities

                    it('Step-6_2: Verify and select the facilities for dependents', function() {
                        facilities.selectFacility().then(function(fnamee) {
                            facility1 = fnamee;
                        });
                        facilities.next.click();
                        facilities.selectFacility().then(function(fnamee) {
                            facility2 = fnamee;
                        });
                        facilities.next.click();
                        facilities.selectFacility().then(function(fnamee) {
                            facility3 = fnamee;
                        });
                        facilities.next.click();
                        expect(browser.getTitle()).toEqual(TestData.paymentTitle, 'Verify "Payment" page is displayed and the title is Equal as' + TestData.paymentTitle);
                    });


                    // Go back to Dependent page and update two dependents with spouse
                    // Verify that Error message should be displayed 
                    it('Step-8:Error message should be displayed', function() {
                        if (pdescription == 'DHMO' || pdescription == 'AHMO') {
                            facilities.back.click();
                        }
                        if (pdescription == 'DPPO' || pdescription == 'APPO') {
                            payment.back.click();
                        }
                        depInfo.relationship('Dependent1').selectByText(TestData.spouse.relationship);
                        depInfo.relationship('Dependent2').selectByText(TestData.spouse.relationship);
                        depInfo.next.click();
                        depInfo.continue.click();
                        expect(depInfo.depError.getText()).toEqual(TestData.depError, "Verify that dependent error messages should be displayed");
                    });
                    // Update the Second dependent relationship to child and Verify the navigation
                    it('Step-9:Error message should be displayed ', function() {
                        depInfo.relationship('Dependent2').selectByText(TestData.child.relationship);
                        depInfo.next.click();
                        depInfo.continue.click();
                        if (pdescription == 'DHMO' || pdescription == 'AHMO') {
                            facilities.premiumAmount.getText().then(function(premium) {
                                expect(premium.substring(1)).toEqual(dep2_Price, "Verify that premium amount should be :" + dep2_Price + 'in purple colour box');
                                expect(browser.getTitle()).toEqual(TestData.facilitiesTitle, "Verify that facilities page title should be " + TestData.facilitiesTitle);
                            });
                        }
                        if (pdescription == 'DPPO' || pdescription == 'APPO') {
                            expect(browser.getTitle()).toEqual(TestData.paymentTitle, "Verify that payment page title should be " + TestData.paymentTitle);
                        }
                    });

                });

            }
        })
    }
})
