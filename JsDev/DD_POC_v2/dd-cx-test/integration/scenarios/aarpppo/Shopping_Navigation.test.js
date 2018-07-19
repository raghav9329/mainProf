/*To run this spec update config file with below 

1. Base url in params section 
baseUrl: 'https://aw-lx0176.deltadev.ent:3001/shopping/aarp/test',

2. isExecutionFromUI = false; in onprepare section*/



var shopping = new(require('../../pageObjects/cxinit/shopping-page.js'));
var planOptions = new(require('../../pageObjects/cxinit/plan-options-page.js'));
var planDetails = new(require('../../pageObjects/cxinit/plan-details-page.js'));
var perInfo = new(require('../../pageObjects/cxinit/perInfo-page.js'));


var footer = new(require('../../pageObjects/cxinit/footer-page.js'));
var feedback = new(require('../../pageObjects/cxinit/feedback-page.js'));
var TestData = require('../../testData/' + testDataEnv + '/aarpppo/Shopping_Navigation.json');

describe('Shopping Navigations', function() {

    beforeEach(function() {
        Utility.openApplication(browser.params.baseUrl);
    });

    dataProvider(TestData.states, function(data, description) {
        it('step1:', function() {
            Utility.openApplication(browser.params.baseUrl);
            shopping.State.setText(data.state);
            shopping.Zipcode.setText(data.zipcode);
            shopping.Submit.click();
            expect(shopping.Zipcode.isPresentAndDisplayed()).toBeTruthy();
            expect(shopping.NoOFCovered_getAQuote.isPresentAndDisplayed()).toBeTruthy();
            expect(shopping.addDependent.isPresentAndDisplayed()).toBeTruthy();
            expect(shopping.removeDependent.isPresentAndDisplayed()).toBeTruthy();
            expect(shopping.Showplans.isPresentAndDisplayed()).toBeTruthy();
            expect(shopping.NoOFCovered_getAQuote.getAttribute('value')).toEqual('0');
            shopping.addDependent.click();
            expect(shopping.NoOFCovered_getAQuote.getAttribute('value')).toEqual('1');
            shopping.removeDependent.click();
            expect(shopping.NoOFCovered_getAQuote.getAttribute('value')).toEqual('0');
            shopping.NoOFCovered_getAQuote.setText('15+\t');
            shopping.addDependent.click();
            expect(shopping.NoOFCovered_getAQuote.getAttribute('value')).toEqual('15');
            shopping.NoOFCovered_getAQuote.setText('1+\t');
            shopping.addDependent.click();
            expect(shopping.NoOFCovered_getAQuote.getAttribute('value')).toEqual('2');
            shopping.removeDependent.click();
            expect(shopping.NoOFCovered_getAQuote.getAttribute('value')).toEqual('1');
            shopping.removeDependent.click();
            expect(shopping.NoOFCovered_getAQuote.getAttribute('value')).toEqual('0');
            shopping.Showplans.click();
            expect(planOptions.isAt()).toEqual(true);
        });
    });

    dataProvider(TestData.states, function(data, description) {
        if (data.Executionflag) {
            it('Validate features on Plan Options Page and click on "Edit"', function() {
                Utility.openApplication(browser.params.baseUrl);
                shopping.State.setText(data.state);
                shopping.Zipcode.setText(data.zipcode);
                shopping.Submit.click();
                expect(shopping.NoOFCovered_getAQuote.getAttribute('value')).toEqual('0');
                shopping.addDependent.click();
                shopping.addDependent.click();
                shopping.addDependent.click();
                expect(shopping.NoOFCovered_getAQuote.getAttribute('value')).toEqual('3');
                shopping.Showplans.click();
                expect(planOptions.isAt()).toEqual(true);
                planOptions.edit.click();
                expect(shopping.Zipcode.getAttribute('value')).toEqual(data.zipcode);
            });
            it('Change Zip Code, no. of dependents and click on "Show Plans"', function() {
                shopping.removeDependent.click();
                shopping.removeDependent.click();
                expect(shopping.NoOFCovered_getAQuote.getAttribute('value')).toEqual('1');

                shopping.Showplans.click();
                var prices = [];
                element.all(by.css('div.plan-options-box__amount')).each(function(element, index) {
                    element.getText().then(function(text) {
                        prices[index] = text;
                    });
                });
                expect(prices.reverse()).toEqual(prices.sort());
            });
            it('Click on Back Arrow on Plan Options Page', function() {
                planOptions.back.click();
                expect(shopping.Zipcode.getAttribute('value')).toEqual(data.zipcode);
                expect(shopping.NoOFCovered_getAQuote.getAttribute('value')).toEqual('1');

            });
            it('Validate feed back in shopping page', function() {
                feedback.feedback.click();
                Utility.switchToFrame(feedback.feedbackFrame());
                expect(feedback.feedbackTitle.getText()).toEqual('We want to hear from you');
                expect(feedback.questionTitle.getText()).toEqual('1. Do you have any questions or comments? We want to hear from you.');
                feedback.answer.setText('test data');
                feedback.submit.click();
                expect(feedback.thankyouMsg.getText()).toContain('Thank you for taking the time to let us hear from you.');
                Utility.switchToFrame();
            });
            it('Verify footer in shopping page', function() {
                footer.verifyFooter();
                shopping.Showplans.click();
            });
            it('Validate feed back in plan options page', function() {
                feedback.feedback.click();
                Utility.switchToFrame(feedback.feedbackFrame());
                expect(feedback.feedbackTitle.getText()).toEqual('We want to hear from you');
                expect(feedback.questionTitle.getText()).toEqual('1. Do you have any questions or comments? We want to hear from you.');
                feedback.answer.setText('test data');
                feedback.submit.click();
                expect(feedback.thankyouMsg.getText()).toContain('Thank you for taking the time to let us hear from you.');
                Utility.switchToFrame();
            });
            it('Verify footer in plan options page', function() {
                footer.verifyFooter();
            });
            it('Verify feedback in plan details page', function() {
                planOptions.getPlanDetails(data.plan1).click();

                feedback.feedback.click();
                Utility.switchToFrame(feedback.feedbackFrame());
                expect(feedback.feedbackTitle.getText()).toEqual('We want to hear from you');
                expect(feedback.questionTitle.getText()).toEqual('1. Do you have any questions or comments? We want to hear from you.');
                feedback.answer.setText('test data');
                feedback.submit.click();
                expect(feedback.thankyouMsg.getText()).toContain('Thank you for taking the time to let us hear from you.');
                Utility.switchToFrame();
            });
            it('Verify footer in plan details page', function() {
                footer.verifyFooter();
            });
            it('Verify plan details page for plan1', function() {
                expect(planDetails.isAt()).toEqual(true);
                planDetails.planPrice.getText().then(function(price) {
                    expect(price.toString()).toContain(data.plan1price);
                });

                expect(planDetails.planStartsHelpText.getText()).toContain(data.plan1Details.planStarts);
                expect(planDetails.shoppingDetailsSummary.getText()).toEqual(data.plan1Details.shoppingSummary);

                Utility.scrollToTop();
                expect(planDetails.getPlanDetailsByKey('Annual deductible').getText()).toEqual(data.plan1Details.Annualdeductible);
                planDetails.tooltip('Annual deductible').click();
                expect(planDetails.getTooltipHeader('Annual deductible').getText()).toEqual(data.plan1Details.AnnualdeductibleTooltipHeader);
                expect(planDetails.getTooltipText('Annual deductible').getText()).toEqual(data.plan1Details.AnnualdeductibleTooltipText);
                planDetails.closeToolTip('Annual deductible').click();

                expect(planDetails.getPlanDetailsByKey('Annual maximum').getText()).toEqual(data.plan1Details.Annualmaximum);
                planDetails.tooltip('Annual maximum').click();
                expect(planDetails.getTooltipHeader('Annual maximum').getText()).toEqual(data.plan1Details.AnnualmaximumTooltipHeader);
                expect(planDetails.getTooltipText('Annual maximum').getText()).toEqual(data.plan1Details.AnnualmaximumTooltipText);
                planDetails.closeToolTip('Annual maximum').click();


                // expect(planDetails.getPlanDetailsByKey('Network Dentist').getText()).toEqual('-');
                planDetails.tooltip('Network Dentist').click();
                expect(planDetails.getTooltipHeader('Network Dentist').getText()).toEqual(data.plan1Details.NetworkDentistTooltipHeader);
                expect(planDetails.getTooltipText('Network Dentist').getText()).toEqual(data.plan1Details.NetworkDentistTooltipText);
                planDetails.closeToolTip('Network Dentist').click();

                expect(planDetails.accidentCoverage.isPresentAndDisplayed()).toBe(true);

                expect(planDetails.getPlanDetailsByKey('Office visits').getText()).toEqual(data.plan1Details.Officevisits);
                expect(planDetails.getPlanDetailsByKey('Exams').getText()).toEqual(data.plan1Details.Exams);
                expect(planDetails.getPlanDetailsByKey('Cleanings').getText()).toEqual(data.plan1Details.Cleanings);
                expect(planDetails.getPlanDetailsByKey('X-rays').getText()).toEqual(data.plan1Details.Xrays);
                expect(planDetails.getPlanDetailsByKey('Fillings').getText()).toEqual(data.plan1Details.Fillings);
                expect(planDetails.getPlanDetailsByKey('Tooth removal').getText()).toEqual(data.plan1Details.Toothremoval);
                expect(planDetails.getPlanDetailsByKey('Root canals').getText()).toEqual(data.plan1Details.Rootcanals);
                expect(planDetails.getPlanDetailsByKey('Gum cleanings').getText()).toEqual(data.plan1Details.Gumcleanings);
                expect(planDetails.getPlanDetailsByKey('Denture repair').getText()).toEqual(data.plan1Details.Denturerepair);
                expect(planDetails.getPlanDetailsByKey('TMJ treatment').getText()).toEqual(data.plan1Details.TMJtreatment);
                expect(planDetails.getPlanDetailsByKey('Orthodontics').getText()).toEqual(data.plan1Details.Orthodontics);

                expect(planDetails.getPlanDetailsByKey('Implants').getText()).toEqual(data.plan1Details.Implants);
                expect(planDetails.getPlanDetailsByKey('Crowns').getText()).toEqual(data.plan1Details.Crowns);
                expect(planDetails.getPlanDetailsByKey('Gum treatments').getText()).toEqual(data.plan1Details.Gumtreatments);
                expect(planDetails.getPlanDetailsByKey('Complete dentures').getText()).toEqual(data.plan1Details.Completedentures);

            });
            it('Verify plan details page for plan2', function() {

                planDetails.changePlan(data.plan2).click();

                planDetails.planPrice.getText().then(function(price) {
                    expect(price.toString()).toContain(data.plan2price);
                });


                expect(planDetails.planStartsHelpText.getText()).toContain(data.plan2Details.planStarts);
                expect(planDetails.shoppingDetailsSummary.getText()).toEqual(data.plan2Details.shoppingSummary);

                expect(planDetails.getPlanDetailsByKey('Annual deductible').getText()).toEqual(data.plan2Details.Annualdeductible);
                planDetails.tooltip('Annual deductible').click();
                expect(planDetails.getTooltipHeader('Annual deductible').getText()).toEqual(data.plan2Details.AnnualdeductibleTooltipHeader);
                expect(planDetails.getTooltipText('Annual deductible').getText()).toEqual(data.plan2Details.AnnualdeductibleTooltipText);
                planDetails.closeToolTip('Annual deductible').click();

                expect(planDetails.getPlanDetailsByKey('Annual maximum').getText()).toEqual(data.plan2Details.Annualmaximum);
                planDetails.tooltip('Annual maximum').click();
                expect(planDetails.getTooltipHeader('Annual maximum').getText()).toEqual(data.plan2Details.AnnualmaximumTooltipHeader);
                expect(planDetails.getTooltipText('Annual maximum').getText()).toEqual(data.plan2Details.AnnualmaximumTooltipText);
                planDetails.closeToolTip('Annual maximum').click();


                // expect(planDetails.getPlanDetailsByKey('Network Dentist').getText()).toEqual('-');
                planDetails.tooltip('Network Dentist').click();
                expect(planDetails.getTooltipHeader('Network Dentist').getText()).toEqual(data.plan2Details.NetworkDentistTooltipHeader);
                expect(planDetails.getTooltipText('Network Dentist').getText()).toEqual(data.plan2Details.NetworkDentistTooltipText);
                planDetails.closeToolTip('Network Dentist').click();

                expect(planDetails.accidentCoverage.isPresentAndDisplayed()).toBe(false);

                expect(planDetails.getPlanDetailsByKey('Office visits').getText()).toEqual(data.plan2Details.Officevisits);
                expect(planDetails.getPlanDetailsByKey('Exams').getText()).toEqual(data.plan2Details.Exams);
                expect(planDetails.getPlanDetailsByKey('Cleanings').getText()).toEqual(data.plan2Details.Cleanings);
                expect(planDetails.getPlanDetailsByKey('X-rays').getText()).toEqual(data.plan2Details.Xrays);
                expect(planDetails.getPlanDetailsByKey('Fillings').getText()).toEqual(data.plan2Details.Fillings);
                expect(planDetails.getPlanDetailsByKey('Tooth removal').getText()).toEqual(data.plan2Details.Toothremoval);
                expect(planDetails.getPlanDetailsByKey('Root canals').getText()).toEqual(data.plan2Details.Rootcanals);
                expect(planDetails.getPlanDetailsByKey('Gum cleanings').getText()).toEqual(data.plan2Details.Gumcleanings);
                expect(planDetails.getPlanDetailsByKey('Denture repair').getText()).toEqual(data.plan2Details.Denturerepair);
                expect(planDetails.getPlanDetailsByKey('TMJ treatment').getText()).toEqual(data.plan2Details.TMJtreatment);
                expect(planDetails.getPlanDetailsByKey('Orthodontics').getText()).toEqual(data.plan2Details.Orthodontics);

                expect(planDetails.getPlanDetailsByKey('Implants').getText()).toEqual(data.plan2Details.Implants);
                expect(planDetails.getPlanDetailsByKey('Crowns').getText()).toEqual(data.plan2Details.Crowns);
                expect(planDetails.getPlanDetailsByKey('Gum treatments').getText()).toEqual(data.plan2Details.Gumtreatments);
                expect(planDetails.getPlanDetailsByKey('Complete dentures').getText()).toEqual(data.plan2Details.Completedentures);

            });
            it('Verify plan details page for plan1', function() {
                planDetails.changePlan(data.plan3).click();

                planDetails.planPrice.getText().then(function(price) {
                    expect(price.toString()).toContain(data.plan3price);
                });


                expect(planDetails.planStartsHelpText.getText()).toContain(data.plan3Details.planStarts);
                expect(planDetails.shoppingDetailsSummary.getText()).toEqual(data.plan3Details.shoppingSummary);

                expect(planDetails.getPlanDetailsByKey('Annual deductible').getText()).toEqual(data.plan3Details.Annualdeductible);
                planDetails.tooltip('Annual deductible').click();
                expect(planDetails.getTooltipHeader('Annual deductible').getText()).toEqual(data.plan3Details.AnnualdeductibleTooltipHeader);
                expect(planDetails.getTooltipText('Annual deductible').getText()).toEqual(data.plan3Details.AnnualdeductibleTooltipText);
                planDetails.closeToolTip('Annual deductible').click();

                expect(planDetails.getPlanDetailsByKey('Annual maximum').getText()).toEqual(data.plan3Details.Annualmaximum);
                planDetails.tooltip('Annual maximum').click();
                expect(planDetails.getTooltipHeader('Annual maximum').getText()).toEqual(data.plan3Details.AnnualmaximumTooltipHeader);
                expect(planDetails.getTooltipText('Annual maximum').getText()).toEqual(data.plan3Details.AnnualmaximumTooltipText);
                planDetails.closeToolTip('Annual maximum').click();


                // expect(planDetails.getPlanDetailsByKey('Primary care dentist facilities').getText()).toEqual('-');
                planDetails.tooltip('Primary care dentist facilities').click();
                expect(planDetails.getTooltipHeader('Primary care dentist facilities').getText()).toEqual(data.plan3Details.PrimarycaredentistTooltipHeader);
                expect(planDetails.getTooltipText('Primary care dentist facilities').getText()).toEqual(data.plan3Details.PrimarycareTooltipText);
                planDetails.closeToolTip('Primary care dentist facilities').click();

                expect(planDetails.accidentCoverage.isPresentAndDisplayed()).toBe(false);

                expect(planDetails.getPlanDetailsByKey('Office visits').getText()).toEqual(data.plan3Details.Officevisits);
                expect(planDetails.getPlanDetailsByKey('Exams').getText()).toEqual(data.plan3Details.Exams);
                expect(planDetails.getPlanDetailsByKey('Cleanings').getText()).toEqual(data.plan3Details.Cleanings);
                expect(planDetails.getPlanDetailsByKey('X-rays').getText()).toEqual(data.plan3Details.Xrays);
                expect(planDetails.getPlanDetailsByKey('Fillings').getText()).toEqual(data.plan3Details.Fillings);
                expect(planDetails.getPlanDetailsByKey('Tooth removal').getText()).toEqual(data.plan3Details.Toothremoval);
                expect(planDetails.getPlanDetailsByKey('Root canals').getText()).toEqual(data.plan3Details.Rootcanals);
                expect(planDetails.getPlanDetailsByKey('Gum cleanings').getText()).toEqual(data.plan3Details.Gumcleanings);
                expect(planDetails.getPlanDetailsByKey('Denture repair').getText()).toEqual(data.plan3Details.Denturerepair);
                expect(planDetails.getPlanDetailsByKey('TMJ treatment').getText()).toEqual(data.plan3Details.TMJtreatment);
                expect(planDetails.getPlanDetailsByKey('Orthodontics').getText()).toEqual(data.plan3Details.Orthodontics);

                expect(planDetails.getPlanDetailsByKey('Implants').getText()).toEqual(data.plan3Details.Implants);
                expect(planDetails.getPlanDetailsByKey('Crowns').getText()).toEqual(data.plan3Details.Crowns);
                expect(planDetails.getPlanDetailsByKey('Gum treatments').getText()).toEqual(data.plan3Details.Gumtreatments);
                expect(planDetails.getPlanDetailsByKey('Complete dentures').getText()).toEqual(data.plan3Details.Completedentures);

                planDetails.buyPlan.click();
                expect(perInfo.isAt()).toBe(true);

            });
        }
    });




});
