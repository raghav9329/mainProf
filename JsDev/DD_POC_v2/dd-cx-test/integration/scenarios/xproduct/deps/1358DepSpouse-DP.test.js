/*
 * CXINIT-1358: Dependents - Spouse&DomesticPartner 
 * This Script Validates the error message functionality of dependents with Spouse and Domestic Partner 
 * System will allow only one spouse or one domestic partner
 */
var TestData   = require('../../../testData/' + testDataEnv + '/dhmo/dhmo.1358DepSpouse-DP.json');
var perInfo    = new(require('../../../pageObjects/cxinit/perInfo-page.js'));
var depInfo    = new(require('../../../pageObjects/cxinit/dependent-page.js'));
var facilities = new(require('../../../pageObjects/cxinit/facilities-page.js'));
var payment    = new(require('../../../pageObjects/cxinit/payment-page.js'));
var receipt    = new(require('../../../pageObjects/cxinit/receipt-page.js'));
var enrollPage = new(require('../../../pageObjects/cxinit/enroll-page.js'));
var statesData = require('../../../testData/' + testDataEnv + '/statesAndProducts.json');

//To Navigate Personla Info Page
dataProvider(statesData.states, function(sData, sdescription) {
    if (states.indexOf(sdescription) != -1) {
        dataProvider(sData.products, function(tData, pdescription) {
            if (product.indexOf(pdescription) != -1) {
                describe('1358: Dependents - Spouse&DomesticPartner: ||State:' + sdescription + '||Product:' + pdescription + '||', function() {
                    var dep2_Price;
                    beforeAll(function() {
                        tData.enrollData.NoOfPeopleCovered = "1";
                        tData.enrollData.dependentsDOB = ["10-10-1990"];
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
                    // Add two dependents with Domestic partner and spouse and click on Next
                    // Error message should be displayed
                    it('Step-4:Verify that Premium Change popup displayed when added one dependent', function() {
                        depInfo.fillDependent('Dependent1', TestData.domesticPartner, true);
                        depInfo.fillDependent('Dependent2', TestData.spouse, false);
                        depInfo.next.click();
                        expect(depInfo.premiumChangePopUp.isPresentAndDisplayed()).toBeTruthy("Verify that Premium change popup");
                        expect(depInfo.gobackPremiumPopUP.isPresentAndDisplayed()).toBeTruthy("Verify that 'Go Back' button should be displayed in premium popup");
                        expect(depInfo.continue.isPresentAndDisplayed()).toBeTruthy("Verify that 'Continue' button should be displayed in premium popup");
                        depInfo.newAdditionalPrice.getText().then(function(dep2Price) {
                            dep2_Price = dep2Price;
                            depInfo.continue.click();
                            expect(browser.getTitle()).toEqual(TestData.DependentTitle,'Verify that dependent page title should be "' + TestData.DependentTitle + '"');
                            expect(depInfo.depError.getText()).toEqual(TestData.depError,"Verify that Dependent Error messages should be displayed");
                        });
                    });

                    // Update the Second dependent relation to child and click on Next
                    // Should be navigate to facilities page
                    it('Step-5:Verify the price in purple box', function() {
                        depInfo.relationship('Dependent1').selectByText(TestData.child.relationship);
                        depInfo.next.click();
                        expect(depInfo.premiumChangePopUp.isPresentAndDisplayed()).toBeFalsy();
                        if (pdescription == 'DHMO' || pdescription == 'AHMO') {
                            facilities.premiumAmount.getText().then(function(premium) {
                                expect(premium.substring(1)).toEqual(dep2_Price,"Verify that premium amount should be :"+dep2_Price);
                                expect(browser.getTitle()).toEqual(TestData.facilitiesTitle,"Verify that facilities page title should be "+TestData.facilitiesTitle);
                            });
                        }
                        if (pdescription == 'DPPO' || pdescription == 'APPO') {
                            expect(browser.getTitle()).toEqual(TestData.paymentTitle,"Verify that payment page title should be "+TestData.paymentTitle);
                        }


                    });
                    // Go back to Dependent page and update two dependents with domestic partner
                    //Verify that Error message should be displayed 
                    it('Step-6:Error message should be displayed with You can select only 1 Spouse or Domestic Partner.', function() {
                        if (pdescription == 'DHMO' || pdescription == 'AHMO') {
                            facilities.back.click();
                        }
                        if (pdescription == 'DPPO' || pdescription == 'APPO') {
                            payment.back.click();
                        }

                        depInfo.relationship('Dependent1').selectByText(TestData.domesticPartner.relationship);
                        depInfo.relationship('Dependent2').selectByText(TestData.domesticPartner.relationship);
                        depInfo.next.click();
                        depInfo.continue.click();
                        expect(depInfo.depError.getText()).toEqual(TestData.depError,'Verify that error messages should be displayed for dependent');
                    });
                    // Update the Second dependent relationship to child and Verify the navigation
                    it('Step-7:Verify the updated price in purple color box', function() {
                        depInfo.relationship('Dependent2').selectByText(TestData.child.relationship);
                        depInfo.next.click();
                        depInfo.continue.click();
                        if (pdescription == 'DHMO' || pdescription == 'AHMO') {
                            facilities.premiumAmount.getText().then(function(premium) {
                                expect(premium.substring(1)).toEqual(dep2_Price,"Verify that premium amount should be :"+dep2_Price);
                                expect(browser.getTitle()).toEqual(TestData.facilitiesTitle,"Verify that facilities page title should be "+TestData.facilitiesTitle);
                            });
                        }
                        if (pdescription == 'DPPO' || pdescription == 'APPO') {
                            expect(browser.getTitle()).toEqual(TestData.paymentTitle,"Verify that payment page title should be "+TestData.paymentTitle);
                        }
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
                        expect(depInfo.depError.getText()).toEqual(TestData.depError,"Verify that dependent error messages should be displayed");
                    });
                    // Update the Second dependent relationship to child and Verify the navigation
                    it('Step-9:Error message should be displayed ', function() {
                        depInfo.relationship('Dependent2').selectByText(TestData.child.relationship);
                        depInfo.next.click();
                        depInfo.continue.click();
                        if (pdescription == 'DHMO' || pdescription == 'AHMO') {
                            facilities.premiumAmount.getText().then(function(premium) {
                                expect(premium.substring(1)).toEqual(dep2_Price,"Verify that premium amount should be :"+dep2_Price +'in purple colour box');
                                expect(browser.getTitle()).toEqual(TestData.facilitiesTitle,"Verify that facilities page title should be "+TestData.facilitiesTitle);
                            });
                        }
                        if (pdescription == 'DPPO' || pdescription == 'APPO') {
                            expect(browser.getTitle()).toEqual(TestData.paymentTitle,"Verify that payment page title should be "+TestData.paymentTitle);
                        }
                    });

                });

            }
        })
    }
})