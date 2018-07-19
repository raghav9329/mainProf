/* CXINIT-1357: Dependents childs Age
 * This Script Validates the Dependent child age
 */
var TestData   = require('../../../testData/' + testDataEnv + '/dhmo/dhmo.1357DepChildAge.json');
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

                describe('1357: Dependents childs Age: ||State:' + sdescription + '||Product:' + pdescription + '||', function() {
                    beforeAll(function() {
                        tData.enrollData.NoOfPeopleCovered = "1";
                        tData.enrollData.dependentsDOB = ["10-10-1990"];
                        Utility.openApplication('', tData.product);
                    });
                    beforeEach(function() {
                        jasmine.addMatchers(custommatcher.customMatchers);
                    });
                    //   Fill the Enroll page with valid data and verify the navigation
                    it('Step-1:Should complete the Enroll Page', function() {
                        enrollPage.enterHomePageDetails(tData.enrollData);
                        expect(perInfo.fieldFirstName.isPresentAndDisplayed()).toBeTruthy('Verify that "First Name" field in personal info page is displayed');
                    });
                    //  Fill Personal Infor Page with valid data and verify the navigation
                    it('Step-2: Should fill out Personal Information Page', function() {
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
                        expect(browser.getTitle()).toEqual(TestData.DependentPageTitle, 'Verfiy "Dependent Page" is Displayed and the title is Equal as' +TestData.DependentPageTitle);
                    });
                    // Fill the dependent with child and the age af the child is greater than 26
                    // Verify the handicapped check box and Help text  
                    it('Step-3:Should display the handicapped check box with help text', function() {
                        depInfo.fillDependent('Dependent1', TestData.ChildData1, true);
                        // browser.sleep(50000);
                        depInfo.next.click();
                        if (sdescription == 'NY') {
                            depInfo.year('Dependent1').setText(Utility.getDatePart(moment().subtract(13, 'years').format('MM-DD-YYYY'), 'YEAR'))
                        } else {
                            if (pdescription == 'DHMO' && sdescription == 'TX') TestData.handicappedHelpText = "Dependent children may not be more than 25 years old";
                            if (sdescription !== 'TX') TestData.handicappedHelpText = "Dependent children may not be more than 26 years old";
                            expect(depInfo.isHandicapped('Dependent1').isPresentAndDisplayed()).toBeTruthy('Verify isHandicapped Check box is displayed for "Dependent-1"');
                            expect(depInfo.handicappedHelpTxt('Dependent1').getText()).toContain(TestData.handicappedHelpText, 'Verify isHandicapped Text Message is displayed for "Dependent-1"');
                            // depInfo.next.click();
                        }
                    });
                    // Check the handicapped check box and verify the functionality of next navigation
                    // Should be navigate to facilities page
                    it('Step-4:Should navigate to facilities page after selecting check box', function() {
                        if (sdescription == 'NY') {
                            depInfo.next.click();
                        } else {
                            depInfo.isHandicapped('Dependent1').check();
                        }
                        depInfo.next.click();
                        depInfo.continue.click();
                        if (pdescription == 'DHMO' || pdescription == 'AHMO') {
                            expect(browser.getTitle()).toEqual(TestData.facilitiesPageTitle, 'Verify "Facility" page is displayed and the title is Equal as' +TestData.facilitiesPageTitle);
                        }
                        if (pdescription == 'APPO' || pdescription == 'DPPO') {
                            expect(browser.getTitle()).toEqual(TestData.paymentTitle, 'Verify "Payment" page is displayed and the title is Equal as' +TestData.paymentTitle);
                        }
                    });
                    // Go back to dependent page and verify handicapped checkbox for second dependent
                    it('Step-5:Handicapped check box should be display for second dependent', function() {
                        Utility.scrollToBottom();
                        if (pdescription == 'DHMO' || pdescription == 'AHMO') {
                            facilities.back.click();
                        }
                        if (pdescription == 'DPPO' || pdescription == 'APPO') {
                            payment.back.click();
                        }
                        depInfo.fillDependent('Dependent2', TestData.ChildData1, false);
                        depInfo.next.click();
                        if (sdescription == 'NY') {
                            depInfo.year('Dependent1').setText(Utility.getDatePart(moment().subtract(13, 'years').format('MM-DD-YYYY'), 'YEAR'))
                        } else {
                            depInfo.continue.click();
                            expect(depInfo.isHandicapped('Dependent2').isPresentAndDisplayed()).toBeTruthy('Verify isHandicapped Check box is displayed for "Dependent-2"');
                            expect(depInfo.handicappedHelpTxt('Dependent2').getText()).toContain(TestData.handicappedHelpText, 'Verify isHandicapped Text Message is displayed for "Dependent-2"');
                        }
                    });
                    // Update the child age to below 26 years and Verify the next button functionality
                    // Should be navigate to Facilities page
                    it('Step-6:Should be navigaye to Facilities page', function() {
                        depInfo.year('Dependent2').setText(Utility.getDatePart(TestData.ChildData2.DOB, 'YEAR') + '\t');
                        expect(depInfo.isHandicapped('Dependent2').isPresentAndDisplayed()).toBeFalsy('Verify isHandicapped Check box is "NOT Displayed" for "Dependent-2"');
                        depInfo.next.click();
                        depInfo.continue.click();
                        if (pdescription == 'DHMO' || pdescription == 'AHMO') {
                            expect(browser.getTitle()).toEqual(TestData.facilitiesPageTitle, 'Verify "Facility" page is displayed and the title is Equal as' +TestData.facilitiesPageTitle);
                        }
                        if (pdescription == 'DPPO' || pdescription == 'APPO') {
                            expect(browser.getTitle()).toEqual(TestData.paymentTitle, 'Verify "Payment" page is displayed and the title is Equal as' +TestData.paymentTitle);
                        }
                    });

                });

            }
        })
    }
})