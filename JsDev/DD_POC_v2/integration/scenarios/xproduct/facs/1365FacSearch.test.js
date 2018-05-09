//CXINIT-1235 : Review my previous work and start a new E2E Page Object Model based Work Flow

//This Spec is used to Verify and Validate Ene to End Work Flow with the Errors and the Happy path

var TestData   = require('../../../testData/' + testDataEnv + '/dhmo/dhmo.1365FacSearch.json');
var perInfo    = new (require('../../../pageObjects/cxinit/perInfo-page.js'));
var depInfo    = new (require('../../../pageObjects/cxinit/dependent-page.js'));
var facilities = new (require('../../../pageObjects/cxinit/facilities-page.js'));
var payment    = new (require('../../../pageObjects/cxinit/payment-page.js'));
var receipt    = new (require('../../../pageObjects/cxinit/receipt-page.js'));
var enrollPage = new (require('../../../pageObjects/cxinit/enroll-page.js'));
var statesData = require('../../../testData/' + testDataEnv + '/statesAndProducts.json');

//To Navigate Personla Info Page
dataProvider(statesData.states, function (sData, sdescription) {
    if (states.indexOf(sdescription) != -1) {
        dataProvider(sData.products, function (tData, pdescription) {
            if (product.indexOf(pdescription) != -1) {
                describe('1365:MoreOptions: State: ||State:' + sdescription + '||Product:' + pdescription + '||', function () {
                    // beforeAll(function() {
                    //     Utility.openApplication('','DELTA');
                    // });

                    beforeEach(function () {
                        jasmine.addMatchers(custommatcher.customMatchers);
                        Utility.openApplication('', tData.product);
                        enrollPage.enterHomePageDetails(tData.enrollData);
                        expect(perInfo.fieldFirstName.isPresentAndDisplayed()).toBeTruthy();
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
                        expect(depInfo.fieldAddDependents.isPresentAndDisplayed()).toBeTruthy();
                        depInfo.fillDependent('Dependent1', TestData.domesticpartner1, false);
                        depInfo.next.click();
                        depInfo.continue.click();

                    });

                    // //Verify and Select the Facility for the Dependent

                    it('More facilities should be displayed for the pre-selected zipcode', function () {
                        if (pdescription == 'DHMO' || pdescription == 'AHMO') {
                            expect(facilities.moreResults.isPresentAndDisplayed()).toBeTruthy();
                            expect(facilities.facilityBox.getCount()).toBeGreaterThan(3);
                            facilities.moreResults.click();
                            expect(facilities.facilityBox.getCount()).toBeGreaterThan(0);
                            facilities.next.click();
                        }
                        if (pdescription == 'DPPO' || pdescription == 'APPO') {
                            expect(browser.getTitle()).toEqual(TestData.paymentTitle);
                        }
                    });


                    // //Verify and Select the Facility for the Dependent

                    // it('E2E_Flow_5_1: Verify and select the facilities for dependents', function() {
                    //     facilities.selectFacility(TestData.facilityoption2);
                    //     facilities.next.click();
                    // });

                });
            }
        })
    }
})
