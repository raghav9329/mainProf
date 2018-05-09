//cxinit.1359: Dependents 15 Dependents Max

// This Spec furnishes the data in the personal info page
// Adds 15 dependents in the dependents page
// Verifies and validates Error for the NUll values and dependents of same type (domestic paertner and spouse)
var TestData   = require('../../../testData/' + testDataEnv + '/dhmo/dhmo.1359Dep-15Deps.json');
var perInfo    = new (require('../../../pageObjects/cxinit/perInfo-page.js'));
var depInfo    = new (require('../../../pageObjects/cxinit/dependent-page.js'));
var enrollPage = new (require('../../../pageObjects/cxinit/enroll-page.js'));
var statesData = require('../../../testData/' + testDataEnv + '/statesAndProducts.json');

//To Navigate Personla Info Page
dataProvider(statesData.states, function (sData, sdescription) {
    if (states.indexOf(sdescription) != -1) {
        dataProvider(sData.products, function (tData, pdescription) {
            if (product.indexOf(pdescription) != -1) {

                describe('1359: 15 Dependents Max: ||State:' + sdescription + '||Product:' + pdescription + '||', function () {
                    beforeAll(function () {
                        Utility.openApplication('', tData.product);
                    });
                    beforeEach(function () {
                        jasmine.addMatchers(custommatcher.customMatchers);
                    });

                    //Fill the Valid Data in the home page of Enrollment and Proceed

                    it('Dependents Max_Step-1:should complete the Enroll Page', function () {
                        enrollPage.enterHomePageDetails(tData.enrollData);
                        expect(perInfo.fieldFirstName.isPresentAndDisplayed()).toBeTruthy();
                    });


                    // Fill all the Valid Test data in the Personal info fields
                    // Furnish all the fields like firstname , lastname , middlename , DOB , Gender Address , SSN , Phone number and email
                    // Proceed to Next page

                    it('Dependents Max_Step_2: Verify Personal Information Page is filled with Valid data and Proceed', function () {
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
                        // perInfo.fillBroker(TestData);
                        // expect(perInfo.apptFloorNumError.getText()).toEqual('Please ensure you have entered an Apt/Floor/Suite number');
                        expect(browser.getTitle()).toEqual(TestData.DependentTitle);

                    });

                    //Validate field level Error Verification

                    it('Dependents Max_Step_3: Verifying and Validate the Dependents of same type(Domestic Partner and Spouse do not allowed) not allowed more than 1', function () {
                        expect(depInfo.fieldAddDependents.isPresentAndDisplayed()).toBeTruthy();
                        depInfo.fieldAddDependents.click();
                        depInfo.firstname('Dependent1').setText(TestData.invalidData.firstName);
                        depInfo.middleName('Dependent1').setText(TestData.invalidData.middleName);
                        depInfo.lastname('Dependent1').setText(TestData.invalidData.lastName);
                        depInfo.month('Dependent1').setText(Utility.getDatePart(TestData.invalidData.DOB, 'MONTH'));
                        depInfo.date('Dependent1').setText(Utility.getDatePart(TestData.invalidData.DOB, 'DATE'));
                        depInfo.year('Dependent1').setText(Utility.getDatePart(TestData.invalidData.DOB, 'YEAR'));
                        depInfo.next.click();
                        expect(depInfo.errorRelationship('Dependent1').getText()).toEqual("Please select a relationship");
                        expect(depInfo.errorFirstName('Dependent1').getText()).toEqual(TestData.depFieldError);
                        expect(depInfo.errorLastName('Dependent1').getText()).toEqual(TestData.depFieldError);
                        Utility.scrollToTop();
                        depInfo.deleteDependent('Dependent1').click();
                    });

                    // Validating the Dependents of same type(Domestic partner and spouse) 
                    // Validating the error "You can select only 1 Spouse or Domestic Partner." and Premium change Pop-up
                    // updates the Dependent one of the same relation type dependent to child


                    it('Dependents Max_Step_3: Verifying and Validate the Dependents of same type(Domestic Partner and Spouse do not allowed) not allowed more than 1', function () {
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

                    //Verifying Dependents MAX 15 were added and proceed to next page

                    it('Dependents Max_Step_4: Verify 15 dependents were added and furnished with valid Test Data and the calculated Premium Pop up is displayed', function () {
                        depInfo.fillDependent('Dependent3', TestData.child3, false);
                        depInfo.fillDependent('Dependent4', TestData.child4, false);
                        depInfo.fillDependent('Dependent5', TestData.child5, false);
                        depInfo.fillDependent('Dependent6', TestData.child6, false);
                        depInfo.fillDependent('Dependent7', TestData.child7, false);
                        depInfo.fillDependent('Dependent8', TestData.child8, false);
                        depInfo.fillDependent('Dependent9', TestData.child9, false);
                        depInfo.fillDependent('Dependent10', TestData.child10, false);
                        depInfo.fillDependent('Dependent11', TestData.child11, false);
                        depInfo.fillDependent('Dependent12', TestData.child12, false);
                        depInfo.fillDependent('Dependent13', TestData.child13, false);
                        depInfo.fillDependent('Dependent14', TestData.child14, false);
                        depInfo.fillDependent('Dependent15', TestData.child15, false);
                        depInfo.next.click();
                        depInfo.continue.click();
                        if (pdescription == 'DHMO' || pdescription == 'AHMO') {
                            expect(browser.getTitle()).toEqual(TestData.facilitiesTitle);

                        }
                        if (pdescription == 'DPPO' || pdescription == 'APPO') {
                            expect(browser.getTitle()).toEqual(TestData.paymentTitle);
                        }
                    });
                });

            }
        })
    }
})
