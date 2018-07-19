//CXINIT-1461 : E2E Work Flow 2 with the 2 dependents and different facilities

//This Spec is used to Validate End to End Work Flow with the 2 Dependents and different facilities

var perInfo     = new(require('../../../pageObjects/cxinit/perInfo-page.js'));
var depInfo     = new(require('../../../pageObjects/cxinit/dependent-page.js'));
var facilities  = new(require('../../../pageObjects/cxinit/facilities-page.js'));
var payment     = new(require('../../../pageObjects/cxinit/payment-page.js'));
var receipt     = new(require('../../../pageObjects/cxinit/receipt-page.js'));
var enrollPage  = new(require('../../../pageObjects/cxinit/enroll-page.js'));
var TestData    = require('../../../testData/' + testDataEnv + '/dhmo/dhmo.1461EndToEndWkFlo2.json');
var statesData  = require('../../../testData/' + testDataEnv + '/statesAndProducts.json');
var planOptions = new(require('../../../pageObjects/cxinit/plan-options-page.js'));
var planDetails = new(require('../../../pageObjects/cxinit/plan-details-page.js'));

//To Navigate Personla Info Page
dataProvider(statesData.states, function(sData, sdescription) {
    if (states.indexOf(sdescription) != -1) {
        dataProvider(sData.products, function(tData, pdescription) {
            if (product.indexOf(pdescription) != -1) {

                describe('1461:E2E_WrkFlow1 - 2 : ||State:' + sdescription + '||Product:' + pdescription + '||', function() {
                    var effectiveDate, apNumber, pathToPdf, facility1, facility2, facility3;
                    beforeAll(function() {
                        console.log(' ');
                        console.log('--- CXINIT-1461 E2E WrkFlow2 ---')
                        console.log(' ');
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
                        console.log('1461_1 complete')
                    });

                    //Fill the Valid Data in the Personal Info page and Change the Zipcode
                    //Switchback clickng on the Pop up Back

                    it('E2E_2 :should populate PersInfo page, change the Zip code and select "Go Back" on Zip Code Change Pop Up', function() {
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
                        perInfo.fieldZipCode.setText(TestData.zipcode1);
                        perInfo.fieldPhoneNumber.setText('');
                        expect(perInfo.zipPopNewQuote.isPresentAndDisplayed()).toBeTruthy('Verify the New Quote Option is Displayed in the Zip code Pop Up');
                        expect(perInfo.zipPopBack.isPresentAndDisplayed()).toBeTruthy('Verify Back Option is Displayed in the Zip code Pop Up');
                        perInfo.zipPopBack.click();
                        expect(perInfo.fieldZipCode.getValue()).toBe(tData.enrollData.ZIPcode, 'Verify the Zipcode Value in the Application is same as Test Data as: ' +tData.enrollData.ZIPcode);
                        console.log('1461_2 complete')
                    });

                    //Fill the Address in the Personal Info page and Click on the New Quote on th ePOp up displayed

                    it('E2E_3 :Change the Zip Code again, Click on "Get a New Quote" and validate if redirected to Plan Options Page', function() {
                        perInfo.fieldZipCode.setText(sData.secondaryAddress.ZIPcode);
                        perInfo.fieldPhoneNumber.setText('');
                        expect(perInfo.zipPopNewQuote.isPresentAndDisplayed()).toBeTruthy('Verify the New Quote Option is Displayed in the Zip code Pop Up');
                        expect(perInfo.zipPopBack.isPresentAndDisplayed()).toBeTruthy('Verify Back Option is Displayed in the Zip code Pop Up');
                        perInfo.zipPopNewQuote.click();
                        expect(planOptions.isAt()).toBeTruthy('Verify the Plan Options Page is Displayed');
                        console.log('1461_3 complete')
                    });

                    //Enroll Page select plan is not implemented need to enhance below it as per implementaion

                    it('E2E_4 :Should complete the Shopping Pages ', function() {
                        // Shounak: We don't need to open a new application here!
                        // Utility.openApplication('', tData.product);
                        // enrollPage.enterHomePageDetails(tData.enrollData).then(function(sdate) {
                        //     effectiveDate = sdate;
                        //     console.log("sdate============" + sdate);
                        // })
                        
                        // Shounak:
                        // When we click on Get a New Quote in previous "it" block, it redirects us to (contd)
                        // new Plan Options Page.
                        // So the only thing needed here is "continuing with the same flow (using a new address)"
                        // I have added a secondary address in global data file
                        // This will give us an option to use change of address functionality from global file
                        // if (tData.product == 'DELTA') {
                        //     enrollPage.deltaEnroll(tData.enrollData);
                        // }
                        // if (tData.product == 'AARP') {
                            planOptions.getPlanDetails(tData.enrollData.PlanName).click();
                            planDetails.buyPlan.click();
                       // }
                        expect(perInfo.fieldFirstName.isPresentAndDisplayed()).toBeTruthy('Verify that "First Name" field in personal info page is displayed');
                        console.log('1461_4 complete')
                    });

                    //Enter the valid Test Data in the Personal Information page and Click n the Next

                    it('E2E_5 :should check if new Buying session started with default values', function() {
                        expect(perInfo.fieldFirstName.getValue()).toBe('');
                        expect(perInfo.fieldMidInitial.getValue()).toBe('');
                        expect(perInfo.fieldLastName.getValue()).toBe('');
                        expect(perInfo.fieldGenderSelect.getSelectedValue()).toBe('Select a Gender');
                        let dob = TestData.dob.split("-");
                        expect(perInfo.fieldBdMM.getValue()).toBe(dob[0]);
                        expect(perInfo.fieldBdDD.getValue()).toBe(dob[1]);
                        expect(perInfo.fieldBdYyyy.getValue()).toBe(dob[2]);
                        if (pdescription == 'DHMO' || pdescription == 'DPPO') expect(perInfo.fieldSsn.getValue()).toBe('');
                        if (pdescription == 'DHMO' || pdescription == 'DPPO') expect(perInfo.fieldAlternateId.getValue()).toBe('');
                        if (pdescription == 'AHMO' || pdescription == 'APPO') expect(perInfo.memberId.getValue()).toBe('');
                        expect(perInfo.fieldState.getValue()).toBe(sData.secondaryAddress.State);
                        expect(perInfo.fieldZipCode.getValue()).toBe(sData.secondaryAddress.ZIPcode);
                        expect(perInfo.fieldPhoneSelect.getSelectedValue()).toBe('CELL');
                        expect(perInfo.fieldPhoneNumber.getValue()).toBe('');
                        expect(perInfo.fieldEmailAddr.getValue()).toBe('');
                        console.log('1461_5 complete')
                    });

                    it('E2E_6 :should populate PersInfo page', function() {
                        if (pdescription == 'DHMO' || pdescription == 'DPPO') {
                            TestData.MemberId = false;
                            TestData.ssn = "1234560215",
                                TestData.alternateid = "test@test.com";
                        }
                        if (pdescription == 'AHMO' || pdescription == 'APPO') {
                            TestData.MemberId = Utility.randomNo('Number', 10);
                            TestData.ssn = false;
                            TestData.alternateid = false;
                        }
                        perInfo.fillPersonalInfo(TestData);
                        perInfo.fillAddress(sData.secondaryAddress);
                        perInfo.phoneNumberemail(TestData);
                        if (pdescription == 'DHMO' || pdescription == 'DPPO') {
                            perInfo.fillBroker(TestData);
                        }
                        if (pdescription == 'AHMO' || pdescription == 'APPO') {
                            perInfo.referralSource.selectByText(TestData.referralSource);
                            perInfo.next.click();
                        }
                        expect(browser.getTitle()).toEqual(TestData.DependentPageTitle,'Verfiy "Dependent Page" is Displayed and the title is Equal as' +TestData.DependentPageTitle);
                        console.log('1461_6 complete')
                    });


                    it('E2E_7 :should add 2 Deps, child & spouse', function() {
                        expect(depInfo.fieldAddDependents.isPresentAndDisplayed()).toBeTruthy('Verify Add Dependent field is Displayed and Present');
                        depInfo.fillDependent('Dependent1', TestData.Spouse, false);

                        depInfo.fillDependent('Dependent2', TestData.child, false);
                        if (sdescription == 'NY') {
                            depInfo.year('Dependent2').setText(Utility.getDatePart(moment().subtract(13, 'years').format('MM-DD-YYYY'), 'YEAR'))
                            depInfo.next.click();
                            depInfo.next.click();
                        } else {
                            expect(depInfo.isHandicapped('Dependent2').isPresentAndDisplayed()).toBeTruthy('Verify Is isHandicapped Checkbox is Displayed and Present');
                            expect(depInfo.handicappedHelpTxt('Dependent2').getText()).toContain(TestData.handicappedHelpText, 'Verify is handicappedHelpText Displayed is same as: ' +TestData.handicappedHelpText);
                            depInfo.isHandicapped('Dependent2').check();
                            depInfo.next.click();
                        }
                        depInfo.continue.click();
                        console.log('1461_7 complete')
                    });



                    if (pdescription == 'DHMO' || pdescription == 'AHMO') {
                        it('E2E_8 :Change the Zip code in the Facility Page and should select fac for Prime', function() {
                            expect(browser.getTitle()).toEqual(TestData.facilitiesPageTitle,'Verify "Facility" page is displayed and the title is Equal as' +TestData.facilitiesPageTitle);
                            expect(browser.getTitle()).toEqual(TestData.facilitiesPageTitle,'Verify "Facility" page is displayed and the title is Equal as' +TestData.facilitiesPageTitle);
                            // Change the Zip Code to the original Zip Code for Primary
                            facilities.zipCode.setText(tData.enrollData.ZIPcode);
                            facilities.search.click().then(function(){
                                facilities.selectFacility().then(function(fnamee) {
                                    facility1 = fnamee;
                                    facilities.next.click();
                                });
                                expect(facilities.zipCode.getValue()).toBe(sData.secondaryAddress.ZIPcode, 'Verify the Zip Code of Secondary Address is same as: '+sData.secondaryAddress.ZIPcode);
                                facilities.selectFacility().then(function(fnamee) {
                                    facility2 = fnamee;
                                    facilities.next.click();
                                });    
                            });
                            console.log('1461_8 complete')
                        });

                        //Verify and Select the Facility for the Dependent

                        it('E2E_9 :should select fac for all deps enrolled', function() {
                                facilities.selectFacility().then(function(fnamee) {
                                    facility3 = fnamee;
                                });
                                facilities.next.click();
                            expect(browser.getTitle()).toEqual(TestData.paymentPageTitle,'Verify "Payment" page is displayed and the title is Equal as' +TestData.paymentPageTitle);
                            console.log('1461_9 complete')
                        });

                    }
                    it('E2E_10 :should fill out pay details', function() {
                        if (pdescription == 'DHMO' || pdescription == 'DPPO') {
                            expect(payment.discloser.getAttribute('href')).toContain(tData.discloser,'Verify Discloser in Payment has same as: ' +tData.discloser);
                            payment.discloser.click();
                            Utility.switchToWindow(1);
                            expect(browser.getCurrentUrl()).toContain(tData.discloser,'Verify the Discloser in the URL is same as: '+tData.discloser);
                            Utility.switchToWindow(0);
                        }
                        payment.billingChkBox.check();
                        payment.fillpayment(TestData);
                        if (pdescription == 'AHMO' || pdescription == 'APPO') {
                            payment.frequencyAnnualy.select();
                        }
                        payment.purchaseNow.click();
                        Utility.delay(maxWait);
                        expect(browser.getTitle()).toEqual(TestData.receiptPageTitle, 'Verify "Receipt" Page is displayed and the Tilte is Equal as' +TestData.receiptPageTitle);
                        console.log('1461_10 complete')
                    });

                    it('E2E_11 :should generate a vaild receipt page', function() {                        
                        if (pdescription == 'DHMO' || pdescription == 'DPPO') {
                            receipt.applicationNumber.getText().then(function(appicationNumber) {
                                console.log("Application Number == " + appicationNumber);
                                receipt.saveCompletedApplication.click().then(function() {
                                    pathToPdf = './PDFDownloads/application' + appicationNumber + '.pdf';
                                })
                            })
                        }
                        receipt.planSummary.click();
                        receipt.applicants.click();
                        console.log('1461_11 complete')
                    });


                    it('E2E_12 :should verify PDF Receipt', function() {
                        if (pdescription == 'DHMO' || pdescription == 'DPPO') {
                            browser.sleep(10000);
                            Utility.readPDFFile(pathToPdf).then(function(test) {
                                expect(test).toContain(TestData.firstname,'Verify the First Name is Displayed in the PDF is same as: ' +TestData.firstname);
                            });
                        }
                        console.log('1461_12 complete')
                    });

                });

            }
        })
    }
})
