var TestData   = require('../../../testData/' + testDataEnv + '/dhmo/dhmo.1368FacFeedback.json');
var perInfo    = new(require('../../../pageObjects/cxinit/perInfo-page.js'));
var depInfo    = new(require('../../../pageObjects/cxinit/dependent-page.js'));
var facilities = new(require('../../../pageObjects/cxinit/facilities-page.js'));
var payment    = new(require('../../../pageObjects/cxinit/payment-page.js'));
var receipt    = new(require('../../../pageObjects/cxinit/receipt-page.js'));
var enrollPage = new(require('../../../pageObjects/cxinit/enroll-page.js'));
var feedback   = new(require('../../../pageObjects/cxinit/feedback-page.js'));
var statesData = require('../../../testData/' + testDataEnv + '/statesAndProducts.json');
var product    = ['AHMO', 'APPO'];


//To Navigate Personla Info Page
dataProvider(statesData.states, function(sData, sdescription) {
    if (states.indexOf(sdescription) != -1) {
        dataProvider(sData.products, function(tData, pdescription) {
            if (product.indexOf(pdescription) != -1) {

                describe('1368 Feedback : ||State:' + sdescription + '||Product:' + pdescription + '||', function () {
                    // Pre-condition: User navigated to personal info page
                    beforeEach(function() {
                        jasmine.addMatchers(custommatcher.customMatchers);
                        Utility.openApplication('', tData.product);
                        enrollPage.enterHomePageDetails(tData.enrollData);
                        expect(perInfo.fieldFirstName.isPresentAndDisplayed()).toBeTruthy('Verify that "First Name" field in personal info page is displayed');
                    });

                    it('Step-1:Should be provide the feedback in personal info page', function() {
                        if (pdescription == 'AHMO' || pdescription == 'APPO') {
                        feedback.feedback.click();
                        Utility.switchToFrame(feedback.feedbackFrame());
                        expect(feedback.feedbackTitle.getText()).toEqual(TestData.feedbackTitle, 'Verify the "Feedback" Note is Dispalyed and the title as: '+TestData.feedbackTitle);
                        expect(feedback.questionTitle.getText()).toEqual(TestData.questionTitle, 'Verify the "Question" Note is Dispalyed and the title as: '+TestData.questionTitle);
                        feedback.answer.setText('test data');
                        feedback.submit.click();
                        expect(feedback.thankyouMsg.getText()).toContain(TestData.thankyouMsg, 'Verify the "Thank You" Message Note is Dispalyed and the title as: '+TestData.thankyouMsg);
                    }
                    });
                    // Able to submit feedback withh null- It should be fix
                    it('Step-2:Verify the functionality of feedback form with null data', function() {
                        if (pdescription == 'AHMO' || pdescription == 'APPO') {
                        feedback.feedback.click();
                        Utility.switchToFrame(feedback.feedbackFrame());
                        expect(feedback.feedbackTitle.getText()).toEqual(TestData.feedbackTitle, 'Verify the "Feedback" Note is Dispalyed and the title as: '+TestData.feedbackTitle);
                        expect(feedback.questionTitle.getText()).toEqual(TestData.questionTitle, 'Verify the "Question" Note is Dispalyed and the title as: '+TestData.questionTitle);
                        feedback.answer.setText('');
                        feedback.submit.click();
                        expect(feedback.thankyouMsg.getText()).toContain(TestData.thankyouMsg, 'Verify the "Thank You" Message Note is Dispalyed and the title as: '+TestData.thankyouMsg);
                    }
                    });
                    it('Step-3:Should be provide the feedback in dependent page', function() {
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
                        expect(browser.getTitle()).toEqual(TestData.dependentPageTitle,'Verfiy "Dependent Page" is Displayed and the title is Equal as' +TestData.dependentPageTitle);
                        if (pdescription == 'AHMO' || pdescription == 'APPO') {
                        feedback.feedback.click();
                        Utility.switchToFrame(feedback.feedbackFrame());
                        expect(feedback.feedbackTitle.getText()).toEqual(TestData.feedbackTitle, 'Verify the "Feedback" Note is Dispalyed and the title as: '+TestData.feedbackTitle);
                        expect(feedback.questionTitle.getText()).toEqual(TestData.questionTitle, 'Verify the "Question" Note is Dispalyed and the title as: '+TestData.questionTitle);
                        feedback.answer.setText('test data');
                        feedback.submit.click();
                        expect(feedback.thankyouMsg.getText()).toContain(TestData.thankyouMsg, 'Verify the "Thank You" Message Note is Dispalyed and the title as: '+TestData.thankyouMsg);
                    }
                    });
                    it('Step-4:Should be provide the feedback infacilities page', function() {
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
                        expect(browser.getTitle()).toEqual(TestData.dependentPageTitle,'Verfiy "Dependent Page" is Displayed and the title is Equal as' +TestData.dependentPageTitle);
                        depInfo.next.click();
                        if (pdescription == 'AHMO' || pdescription == 'APPO') {
                        feedback.feedback.click();
                        Utility.switchToFrame(feedback.feedbackFrame());
                        expect(feedback.feedbackTitle.getText()).toEqual(TestData.feedbackTitle, 'Verify the "Feedback" Note is Dispalyed and the title as: '+TestData.feedbackTitle);
                        expect(feedback.questionTitle.getText()).toEqual(TestData.questionTitle, 'Verify the "Question" Note is Dispalyed and the title as: '+TestData.questionTitle);
                        feedback.answer.setText('test data');
                        feedback.submit.click();
                        expect(feedback.thankyouMsg.getText()).toContain(TestData.thankyouMsg, 'Verify the "Thank You" Message Note is Dispalyed and the title as: '+TestData.thankyouMsg);
                    }
                    });
                    it('Step-5:Should be provide the feedback in payment page', function() {
                        if (pdescription == 'DHMO' || pdescription == 'DPPO') {
                            TestData.MemberId = false;                            
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
                        expect(browser.getTitle()).toEqual(TestData.dependentPageTitle,'Verfiy "Dependent Page" is Displayed and the title is Equal as' +TestData.dependentPageTitle);
                        depInfo.next.click();
                        if (pdescription == 'DHMO' || pdescription == 'AHMO') {
                        // facilities.selectFacility(TestData.facilityoption1);
                        facilities.selectFacility();
                        facilities.next.click();
                        }
                        if (pdescription == 'AHMO' || pdescription == 'APPO') {
                        feedback.feedback.click();
                        Utility.switchToFrame(feedback.feedbackFrame());
                        expect(feedback.feedbackTitle.getText()).toEqual(TestData.feedbackTitle, 'Verify the "Feedback" Note is Dispalyed and the title as: '+TestData.feedbackTitle);
                        expect(feedback.questionTitle.getText()).toEqual(TestData.questionTitle, 'Verify the "Question" Note is Dispalyed and the title as: '+TestData.questionTitle);
                        feedback.answer.setText('test data');
                        feedback.submit.click();
                        expect(feedback.thankyouMsg.getText()).toContain(TestData.thankyouMsg, 'Verify the "Thank You" Message Note is Dispalyed and the title as: '+TestData.thankyouMsg);
                    }
                    });

                });
            }
        })
    }
})
