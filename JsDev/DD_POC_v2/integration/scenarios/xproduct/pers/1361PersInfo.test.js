//CXINIT-1361 : Write a Test Auto Spec for CTA Next Back on the Personal Info page ONLY

//This spec is used to :As a product owner I want to allow the user to move back and forth into the application pages.

var TestData   = require('../../../testData/' + testDataEnv + '/dhmo/dhmo.1361PersInfo.json');
var perInfo    = new (require('../../../pageObjects/cxinit/perInfo-page.js'));
var depInfo    = new (require('../../../pageObjects/cxinit/dependent-page.js'));
var facilities = new (require('../../../pageObjects/cxinit/facilities-page.js'));
var enrollPage = new (require('../../../pageObjects/cxinit/enroll-page.js'));
var statesData = require('../../../testData/' + testDataEnv + '/statesAndProducts.json');

//To Navigate Personla Info Page
// dataProvider(TestData.states, function (sData, sdescription) {
dataProvider(statesData.states, function (sData, sdescription) {
    if (states.indexOf(sdescription) != -1) {
        dataProvider(sData.products, function (tData, pdescription) {
            if (product.indexOf(pdescription) != -1) {

                describe('1361: PersonalInformation Page: State: ||State:' + sdescription + '||Product:' + pdescription + '||', function () {
                    beforeAll(function () {
                        Utility.openApplication('', tData.product);
                    });
                    beforeEach(function () {
                        jasmine.addMatchers(custommatcher.customMatchers);
                    });
                    // console.log("sData.personalInfoerror" + sData.personalInfoerror);
                    //Fill the Valid Data in the home page of Enrollment and Proceed

                    it('Dependents Max_Step-1:should complete the Enroll Page', function () {
                        enrollPage.enterHomePageDetails(tData.enrollData);
                        expect(perInfo.fieldFirstName.isPresentAndDisplayed()).toBeTruthy();
                    });

                    //Verify and Validate the field Errors of the Personal Info page with Null values

                    it('Verify and Validate the Errors of Personal Information Page is with InValid data and Proceed', function () {

                        perInfo.fieldBdMM.setText('');
                        perInfo.fieldBdDD.setText('');
                        perInfo.fieldBdYyyy.setText('');
                        perInfo.fieldLastName.click();
                        expect(perInfo.enrollStatus('Personal Info').getAttribute('class')).toContain(TestData.applicationStatus);
                        Utility.scrollToBottom();
                        perInfo.next.click();
                        // perInfo.next.click();

                        if (pdescription == 'DHMO' || pdescription == 'DPPO') {
                            expect(perInfo.getProfileValidationMessages()).toEqual(TestData.personalInfoerror);
                            expect(perInfo.getServerProfileValidationMessages()).toEqual(TestData.personalInfoerror);
                        }


                        if (pdescription == 'AHMO' || pdescription == 'APPO') {
                            expect(perInfo.getProfileValidationMessages()).toEqual(TestData.personalInfoerroraarp);
                            expect(perInfo.getServerProfileValidationMessages()).toEqual(TestData.personalInfoerroraarp);

                        }
                    });

                    //Verify and Validate the all the fields of the Personal Info page are filled with valid Test Data and proceed

                    it('Verify Personal Information Page is filled with Valid data and Proceed', function () {
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

                        expect(browser.getTitle()).toEqual(TestData.DependentTitle);
                        expect(perInfo.enrollStatus('Dependents').getAttribute('class')).toContain(TestData.applicationStatus);
                    });

                    //Validate user could Navigate back to the Personal Info page using Back
                    //Verify the Data firnished in the filled is not cleared.

                    it('Verifying Data in the Personal-Info Page by CTA BACK', function () {
                        depInfo.back.click();
                        if (pdescription == 'DHMO' || pdescription == 'DPPO') {
                            expect(perInfo.fieldSsn.getValue()).toEqual('');
                        }
                        if (pdescription == 'AHMO' || pdescription == 'APPO') {
                            var cast = TestData.MemberId.toString(10).split('');
                            var memID = (cast[0] + cast[1] + cast[2] + '-' + cast[3] + cast[4] + cast[5] + '-' + cast[6] + cast[7] + cast[8] + '-' + cast[9]);
                            expect(perInfo.memberId.getValue()).toEqual(memID);
                        }

                        expect(perInfo.fieldFirstName.getValue()).toEqual(TestData.firstname);
                        expect(perInfo.fieldPhoneNumber.getValue()).toEqual(TestData.phoneNumber);
                        expect(perInfo.enrollStatus('Personal Info').getAttribute('class')).toContain(TestData.applicationStatus);

                    });


                });
            }
        });
    }
});
