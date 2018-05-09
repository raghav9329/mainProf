/*To run this spec update config file with below 

1. Base url in params section 
baseUrl: 'https://aw-lx0176.deltadev.ent:3001/shopping/aarp/test',

2. isExecutionFromUI = false; in onprepare section*/



var shopping    = new(require('../../../pageObjects/cxinit/shopping-page.js'));
var planOptions = new(require('../../../pageObjects/cxinit/plan-options-page.js'));
var planDetails = new(require('../../../pageObjects/cxinit/plan-details-page.js'));
var perInfo     = new(require('../../../pageObjects/cxinit/perInfo-page.js'));
var marketPage  = require('../../../pageObjects/cxinit/aarp-market-page.js');
var footer      = new(require('../../../pageObjects/cxinit/footer-page.js'));
var feedback    = new(require('../../../pageObjects/cxinit/feedback-page.js'));
var TestData    = require('../../../testData/' + testDataEnv + '/aarpppo/Shopping_Navigation.json');

describe('Shopping Navigations', function() {

    beforeAll(function() {       
        Utility.openApplication(browser.params.baseUrl + '/aarp/');
    });

    dataProvider(TestData.states, function(data, description) {
        // Test Scenario 1 (Get A Quote Page)
        it('step1:', function() {
            // Test Cases 1.1 for CA (Input valid data and click on "Show Plan"),
            // Test Cases 1.2 for PA (Input valid data and click on "Show Plan"),
            // Test Cases 1.3 for TX (Input valid data and click on "Show Plan"),
            // Test Cases 1.4 for NY (Input valid data and click on "Show Plan"),
            // Test Cases 1.5 for FL (Input valid data and click on "Show Plan")
            // Utility.openApplication(browser.params.baseUrl);
            // shopping.State.setText(data.state);
            // shopping.Zipcode.setText(data.zipcode);
            // shopping.Submit.click();
            Utility.openApplication(browser.params.baseUrl + '/aarp/');
            marketPage.state.selectByText(data.state);
            marketPage.continue.click();
            marketPage.Zipcode.setText(data.zipcode);
            marketPage.NoOFCovered.selectByText(data.noofcovered);
            marketPage.viewQuote.click();
            planOptions.back.click();
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

    // Test Scenario 2 (Plan Options Page)
    dataProvider(TestData.states, function(data, description) {
        if (data.Executionflag) {
            // Test Case 2.1 (Validate features on Plan Options Page and click on "Edit"),
            it('Validate features on Plan Options Page and click on "Edit"', function() {
                // Utility.openApplication(browser.params.baseUrl);
                Utility.openApplication(browser.params.baseUrl + '/aarp/');
                // shopping.State.setText(data.state);
                // // Question: Does this zip code input '92115' as per the Excel sheet?

                // //94105
                // shopping.Zipcode.setText(data.zipcode);
                // shopping.Submit.click();
                marketPage.state.selectByText(data.state);
                marketPage.continue.click();
                marketPage.Zipcode.setText(data.zipcode);
                marketPage.NoOFCovered.selectByText(data.noofcovered);
                marketPage.viewQuote.click();
                planOptions.back.click();
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

            // Test Case 2.2 (Change Zip Code, no. of dependents and click on "Show Plans")
            it('Change Zip Code, no. of dependents and click on "Show Plans"', function() {
                // Question: We (Mark and Shounak) don't see the Zip Code being changed from '92115' to '95112', as per the excel sheet!
                // Question: Is there a reason?
                shopping.Zipcode.setText(data.zipcode2);
                shopping.removeDependent.click();
                shopping.removeDependent.click();
                expect(shopping.NoOFCovered_getAQuote.getAttribute('value')).toEqual('1');
                shopping.Showplans.click();
                expect(planOptions.isAt()).toEqual(true);
                planOptions.edit.click();
                expect(shopping.Zipcode.getAttribute('value')).toEqual(data.zipcode2);
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

            // Test Case 2.3 (Click on 'Back Arrow' on Plan Options Page)
            it('Click on Back Arrow on Plan Options Page', function() {
                planOptions.back.click();
                //Suggest: Again this Zip Code should validate '95112', as per the Excel file. Please change accordingly.
                expect(shopping.Zipcode.getAttribute('value')).toEqual(data.zipcode2);
                expect(shopping.NoOFCovered_getAQuote.getAttribute('value')).toEqual('1');

            });

            // Test Case 3.12 (Feedback)
            // Question: We see a change in code flow here, a jump from Test Case 2.3 to Test Case 3.12 and Test 3.13. 
            // Question: While this is ACCEPTABLE, is there any particular reason for not following the Excel Sheet flow?
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

            // Test Case 3.13 (Footer Links)
            it('Verify footer in shopping page', function() {
                footer.verifyFooter();
                shopping.Showplans.click();
            });


            // Test Case 2.4 (Feedback)
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

            // Test Case 2.5 (Footer Links)
            it('Verify footer in plan options page', function() {
                footer.verifyFooter();
            });

            // Test Case 3.09 (Go Back to Plan Details Page, enter feedback)
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
                 feedback.feedback.click();
            });

            // Test Case 3.1 (Click on Footer links and again come to Personal Info)
            it('Verify footer in plan details page', function() {
                footer.verifyFooter();
            });

            // Test Case 3.03 (Accident Coverage for PPO Plan A, Additional Benefits for PPO Plan A)
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


                expect(planDetails.getPlanDetailsByKey('Network dentist').getText()).toContain("near you");
                planDetails.tooltip('Network dentist').click();
                expect(planDetails.getTooltipHeader('Network dentist').getText()).toEqual(data.plan1Details.NetworkDentistTooltipHeader);
                expect(planDetails.getTooltipText('Network dentist').getText()).toEqual(data.plan1Details.NetworkDentistTooltipText);
                planDetails.closeToolTip('Network dentist').click();

                // Validating Accident Coverage
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

                // Validating Additional Benefits
                expect(planDetails.getPlanDetailsByKey('Implants').getText()).toEqual(data.plan1Details.Implants);
                expect(planDetails.getPlanDetailsByKey('Crowns').getText()).toEqual(data.plan1Details.Crowns);
                expect(planDetails.getPlanDetailsByKey('Gum treatments').getText()).toEqual(data.plan1Details.Gumtreatments);
                expect(planDetails.getPlanDetailsByKey('Complete dentures').getText()).toEqual(data.plan1Details.Completedentures);

                /* Question: Where are we verifying that the CTA Button for "See Other Plans" has PPO Plan B on left of the screen...
                and HMO on right of the screen? This is Test Case 3.04 (See Other Plans). This feature is VERY IMPORTANT...
                Where is it being validated? There should be a clear expect statement validating the text in these 2 buttons. */

                expect(planDetails.plan1.getText()).toEqual(data.plan2);
                expect(planDetails.plan2.getText()).toEqual(data.plan3);
            });

            // Test Case 3.05 (Select Other Plans, PPO Plan B)
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


                expect(planDetails.getPlanDetailsByKey('Network dentist').getText()).toContain('near you');
                planDetails.tooltip('Network dentist').click();
                expect(planDetails.getTooltipHeader('Network dentist').getText()).toEqual(data.plan2Details.NetworkDentistTooltipHeader);
                expect(planDetails.getTooltipText('Network dentist').getText()).toEqual(data.plan2Details.NetworkDentistTooltipText);
                planDetails.closeToolTip('Network dentist').click();

                // Validating Accident coverage is NOT displayed for PPO Plan B
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

                // Validating Additional Benefits is displayed for PPO Plan B
                expect(planDetails.getPlanDetailsByKey('Implants').getText()).toEqual(data.plan2Details.Implants);
                expect(planDetails.getPlanDetailsByKey('Crowns').getText()).toEqual(data.plan2Details.Crowns);
                expect(planDetails.getPlanDetailsByKey('Gum treatments').getText()).toEqual(data.plan2Details.Gumtreatments);
                expect(planDetails.getPlanDetailsByKey('Complete dentures').getText()).toEqual(data.plan2Details.Completedentures);

                /* Question: AGAIN,  Where are we verifying that the CTA Button for "See Other Plans" has HMO plan on left of the screen...
                and PPO Plan A on right of the screen? All we have to do is put an expect statement which will check the text...
                of the button on the left and of the buttton on the right to validate if it says HMO and PPO A respectively! */

                expect(planDetails.plan1.getText()).toEqual(data.plan3);
                expect(planDetails.plan2.getText()).toEqual(data.plan1);
            });

            // Test Case 3.05 (Select Other Plans, HMO Plan)
            it('Verify plan details page for plan3', function() {
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


                expect(planDetails.getPlanDetailsByKey('Primary care dentist facilities').getText()).toContain('near you');
                planDetails.tooltip('Primary care dentist facilities').click();
                expect(planDetails.getTooltipHeader('Primary care dentist facilities').getText()).toEqual(data.plan3Details.PrimarycaredentistTooltipHeader);
                expect(planDetails.getTooltipText('Primary care dentist facilities').getText()).toEqual(data.plan3Details.PrimarycareTooltipText);
                planDetails.closeToolTip('Primary care dentist facilities').click();

                // Validating Accident coverage is NOT displayed for HMO
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

                /* Question: AGAIN,  Where are we verifying that the CTA Button for "See Other Plans" has PPO Plan A on left of the screen...
                and PPO Plan B on right of the screen? */

                expect(planDetails.plan1.getText()).toEqual(data.plan1);
                expect(planDetails.plan2.getText()).toEqual(data.plan2);
                /* Question: Where is Test Case 3.07 ("Back Button" on Plan Details Page). This again is a very important feature... 
                You CAN'T just skip it. Everything in the Excel file was for a reason. The resaon this feature is important is because...
                No matter how many times we click on "See Other Plans" options, clicking on "Back at the end of it...
                Should ALWAYS take you to Plan Options Page. WE NEED TO HAVE THIS VALIDATION */

                planDetails.back.click();
                expect(planOptions.isAt()).toBe(true);
                // Test Case 3.08 (Buy Plan)
                planOptions.getPlanDetails(data.plan1).click();
                planDetails.buyPlan.click();
                expect(perInfo.isAt()).toBe(true);

            });
        }
    });




});
