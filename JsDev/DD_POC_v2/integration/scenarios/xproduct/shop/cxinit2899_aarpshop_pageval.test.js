/*To run this spec update config file with below 

1. Base url in params section 
baseUrl: 'https://aw-lx0176.deltadev.ent:3001/shopping/aarp/test',

2. isExecutionFromUI = false; in onprepare section*/



var shopping = new(require('../../../pageObjects/cxinit/shopping-page.js'));
var planOptions = new(require('../../../pageObjects/cxinit/plan-options-page.js'));
var planDetails = new(require('../../../pageObjects/cxinit/plan-details-page.js'));

var footer = new(require('../../../pageObjects/cxinit/footer-page.js'));
var feedback = new(require('../../../pageObjects/cxinit/feedback-page.js'));
var TestData = {
    "state": "CA",
    "zipcode": "94105",
    "noofcovered": "Self",
    "cvgstartdate": "11/01/2017",
    "deltadentalheader": "Delta Dental PPOSM Plans",
    "deltacareheader": "DeltaCare® USA Plans",
    "deltadentalhighlights": "Freedom to visit any dentist Save with 1,500 network dentists near you Implants covered after 1 year 3 cleanings and exams a year ",
    "deltacarehighlights": "Freedom to visit any dentist Save with 1,500 network dentists near you Implants covered after 1 year 3 cleanings and exams a year ",
    "ppoplanA_price": "$14249",
    "ppoplanA_Content": "Get the highest coverage for services at a slightly higher monthly rate.",
    //"Get the highest coverage for services at a slightly higher monthly rate.",
    "ppoplanB_price": "$9614",
    "ppoplanB_Content": "Get a lower monthly rate with slightly lower coverage for some services.",
    //"Get the highest coverage for services at a slightly higher monthly rate.",
    "DeltaCareUSAPlan15B_price": "$4697",
    "DeltaCareUSAPlan15B_Content": "Get quality dental benefits at a low monthly rate with our dental HMO-style plan.",
    //"Get the highest coverage for services at a slightly higher monthly rate.",

    "getAQuoteDataSet": {
        "getAQuoteDataSet1": {
            "Zipcode": " ",
            "NoOfCovered": " ",
            "ErrNoofCovered": false,
            "ErrZipCode": "Please enter a zipcode."
        },
        "getAQuoteDataSet2": {
            "Zipcode": "12",
            "NoOfCovered": "99",
            "ErrNoofCovered": false,
            // "ErrNoofCovered": "Number of covered can't be more than 16",
            "ErrZipCode": "ZIP code must contain at least 5 numbers"
        },
        "getAQuoteDataSet3": {
            "Zipcode": "94105",
            "NoOfCovered": "2",
            "ErrNoofCovered": false,
            "ErrZipCode": false
        },
        "getAQuoteDataSet4": {
            "Zipcode": "abcd",
            "NoOfCovered": "2",
            "ErrNoofCovered": false,
            "ErrZipCode": "Please enter a zipcode."
        },
        "getAQuoteDataSet5": {
            "Zipcode": "!@#$%",
            "NoOfCovered": "2",
            "ErrNoofCovered": false,
            "ErrZipCode": "Please enter a zipcode."
        },
        "getAQuoteDataSet6": {
            "Zipcode": "1a2!3",
            "NoOfCovered": "2",
            "ErrNoofCovered": false,
            "ErrZipCode": "ZIP code must contain at least 5 numbers"
        },
        "getAQuoteDataSet7": {
            "Zipcode": "94105454",
            "NoOfCovered": "2",
            "ErrNoofCovered": false,
            "ErrZipCode": false
        }

    },
    "zipcodeSet": {
        "zipcode1": {
            "state": "CA",
            "zipcode": "94560",
            "noofcovered": "Self",
            "cvgstartdate": "11/01/2017",
            "deltadentalheader": "Delta Dental PPOSM Plans",
            "deltacareheader": "DeltaCare® USA Plans",
            "plan1": "PPO Plan A",
            "plan2": "PPO Plan B",
            "plan3": "DeltaCare ® USA Plan 15B",
            "deltadentalhighlights": "Freedom to visit any dentist Save with 1027 network dentists near you Implants covered after 1 year 3 cleanings and exams a year ",
            "deltacarehighlights": "Choose from 50 primary care dentist facilities near you No waiting period for covered services Orthodontics coverage 2 cleanings and exams a year ",
            "ppoplanA_price": "$7210",
            "ppoplanA_Content": "Get the highest coverage for services at a slightly higher monthly rate.",
            "ppoplanB_price": "$4887",
            "ppoplanB_Content": "Get a lower monthly rate with slightly lower coverage for some services.",
            "DeltaCareUSAPlan15B_price": "$2884",
            "DeltaCareUSAPlan15B_Content": "Get quality dental benefits at a low monthly rate with our dental HMO-style plan.",
            "ErrNoofCovered": false,
            "ErrZipCode": false
        },
        "zipcode2": {
            "state": "CA",
            "zipcode": "94105",
            "noofcovered": "Self",
            "cvgstartdate": "11/01/2017",
            "deltadentalheader": "Delta Dental PPOSM Plans",
            "deltacareheader": "DeltaCare® USA Plans",
            "plan1": "PPO Plan A",
            "plan2": "PPO Plan B",
            "plan3": "DeltaCare ® USA Plan 15B",
            "deltadentalhighlights": "Freedom to visit any dentist Save with 1027 network dentists near you Implants covered after 1 year 3 cleanings and exams a year ",
            "deltacarehighlights": "Choose from 50 primary care dentist facilities near you No waiting period for covered services Orthodontics coverage 2 cleanings and exams a year ",
            "ppoplanA_price": "$7210",
            "ppoplanA_Content": "Get the highest coverage for services at a slightly higher monthly rate.",
            "ppoplanB_price": "$4887",
            "ppoplanB_Content": "Get a lower monthly rate with slightly lower coverage for some services.",
            "DeltaCareUSAPlan15B_price": "$2884",
            "DeltaCareUSAPlan15B_Content": "Get quality dental benefits at a low monthly rate with our dental HMO-style plan.",
            "ErrNoofCovered": false,
            "ErrZipCode": false

        },
        "zipcode3": {
            "state": "CA",
            "zipcode": "92115",
            "noofcovered": "Self",
            "cvgstartdate": "11/01/2017",
            "deltadentalheader": "Delta Dental PPOSM Plans",
            "deltacareheader": "DeltaCare® USA Plans",
            "plan1": "PPO Plan A",
            "plan2": "PPO Plan B",
            "plan3": "DeltaCare ® USA Plan 15B",
            "deltadentalhighlights": "Freedom to visit any dentist Save with 1027 network dentists near you Implants covered after 1 year 3 cleanings and exams a year ",
            "deltacarehighlights": "Choose from 50 primary care dentist facilities near you No waiting period for covered services Orthodontics coverage 2 cleanings and exams a year ",
            //"Freedom to visit any dentist Save with 1,500 network dentists near you Implants covered after 1 year 3 cleanings and exams a year ",
            "ppoplanA_price": "$7210",
            "ppoplanA_Content": "Get the highest coverage for services at a slightly higher monthly rate.",
            "ppoplanB_price": "$4887",
            "ppoplanB_Content": "Get a lower monthly rate with slightly lower coverage for some services.",
            "DeltaCareUSAPlan15B_price": "$2884",
            "DeltaCareUSAPlan15B_Content": "Get quality dental benefits at a low monthly rate with our dental HMO-style plan.",
            "ErrNoofCovered": false,
            "ErrZipCode": false
        },
        "zipcode4": {
            "state": "PA",
            "zipcode": "15001",
            "noofcovered": "Self",
            "cvgstartdate": "11/01/2017",
            "deltadentalheader": "Delta Dental PPOSM Plans",
            "deltacareheader": "DeltaCare® USA Plans",
            "plan1": "PPO Plan A",
            "plan2": "PPO Plan B",
            "plan3": "DeltaCare ® USA Plan 15B",
            "deltadentalhighlights": "Freedom to visit any dentist Save with 1027 network dentists near you Implants covered after 1 year 3 cleanings and exams a year ",
            "deltacarehighlights": "Choose from 50 primary care dentist facilities near you No waiting period for covered services Orthodontics coverage 2 cleanings and exams a year ",
            "ppoplanA_price": "$6048",
            "ppoplanA_Content": "Get the highest coverage for services at a slightly higher monthly rate.",
            "ppoplanB_price": "$4096",
            "ppoplanB_Content": "Get a lower monthly rate with slightly lower coverage for some services.",
            "DeltaCareUSAPlan15B_price": "$2595",
            "DeltaCareUSAPlan15B_Content": "Get quality dental benefits at a low monthly rate with our dental HMO-style plan.",
            "ErrNoofCovered": false,
            "ErrZipCode": false
        },
        "zipcode5": {
            "state": "FL",
            "zipcode": "32003",
            "noofcovered": "Self",
            "cvgstartdate": "11/01/2017",
            "deltadentalheader": "Delta Dental PPOSM Plans",
            "deltacareheader": "DeltaCare® USA Plans",
            "plan1": "PPO Plan A",
            "plan2": "PPO Plan B",
            "plan3": "DeltaCare ® USA Plan 15B",
            "deltadentalhighlights": "Freedom to visit any dentist Save with 1027 network dentists near you Implants covered after 1 year 3 cleanings and exams a year ",
            "deltacarehighlights": "Choose from 50 primary care dentist facilities near you No waiting period for covered services Orthodontics coverage 2 cleanings and exams a year ",
            "ppoplanA_price": "$6393",
            "ppoplanA_Content": "Get the highest coverage for services at a slightly higher monthly rate.",
            "ppoplanB_price": "$4332",
            "ppoplanB_Content": "Get a lower monthly rate with slightly lower coverage for some services.",
            "DeltaCareUSAPlan15B_price": "$3371",
            "DeltaCareUSAPlan15B_Content": "Get quality dental benefits at a low monthly rate with our dental HMO-style plan.",
            "ErrNoofCovered": false,
            "ErrZipCode": false
        },
        "zipcode6": {
            "state": "NY",
            "zipcode": "10001",
            "noofcovered": "Self",
            "cvgstartdate": "11/01/2017",
            "deltadentalheader": "Delta Dental PPOSM Plans",
            "deltacareheader": "DeltaCare® USA Plans",
            "plan1": "PPO Plan A",
            "plan2": "PPO Plan B",
            "plan3": "DeltaCare ® USA Plan 15B",
            "deltadentalhighlights": "Freedom to visit any dentist Save with 1027 network dentists near you Implants covered after 1 year 3 cleanings and exams a year ",
            "deltacarehighlights": "Choose from 50 primary care dentist facilities near you No waiting period for covered services Orthodontics coverage 2 cleanings and exams a year ",
            "ppoplanA_price": "$7004",
            "ppoplanA_Content": "Get the highest coverage for services at a slightly higher monthly rate.",
            "ppoplanB_price": "$4747",
            "ppoplanB_Content": "Get a lower monthly rate with slightly lower coverage for some services.",
            "DeltaCareUSAPlan15B_price": "$3186",
            "DeltaCareUSAPlan15B_Content": "Get quality dental benefits at a low monthly rate with our dental HMO-style plan.",
            "ErrNoofCovered": false,
            "ErrZipCode": false
        },
        "zipcode7": {
            "state": "TX",
            "zipcode": "78251",
            "noofcovered": "Self",
            "cvgstartdate": "11/01/2017",
            "deltadentalheader": "Delta Dental DPOSM Plans",
            "deltacareheader": "DeltaCare® USA Plans",
            "plan1": "DPO Plan A",
            "plan2": "DPO Plan B",
            "plan3": "DeltaCare ® USA Plan 15B",
            "deltadentalhighlights": "Freedom to visit any dentist Save with 1027 network dentists near you Implants covered after 1 year 3 cleanings and exams a year ",
            "deltacarehighlights": "Choose from 50 primary care dentist facilities near you No waiting period for covered services Orthodontics coverage 2 cleanings and exams a year ",
            "ppoplanA_price": "$6393",
            "ppoplanA_Content": "Get the highest coverage for services at a slightly higher monthly rate.",
            "ppoplanB_price": "$4332",
            "ppoplanB_Content": "Get a lower monthly rate with slightly lower coverage for some services.",
            "DeltaCareUSAPlan15B_price": "$3269",
            "DeltaCareUSAPlan15B_Content": "Get quality dental benefits at a low monthly rate with our dental HMO-style plan.",
            "ErrNoofCovered": false,
            "ErrZipCode": false
        }
    }

}

describe('2899:Plan_Options', function() {

    beforeEach(function() {
        Utility.openApplication(browser.params.baseUrl + '/shopping/aarp/test');
    });

    it('step1:Verify all fields displayed in get a quote page', function() {
        shopping.Submit.click();
        expect(shopping.Zipcode.isPresentAndDisplayed()).toBeTruthy();
        expect(shopping.NoOFCovered_getAQuote.isPresentAndDisplayed()).toBeTruthy();
        expect(shopping.addDependent.isPresentAndDisplayed()).toBeTruthy();
        expect(shopping.removeDependent.isPresentAndDisplayed()).toBeTruthy();
        expect(shopping.Showplans.isPresentAndDisplayed()).toBeTruthy();
    });
    it('Step2:Verify the functionality of + and - buttons', function() {
        shopping.Submit.click();
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

    })

    dataProvider(TestData.getAQuoteDataSet, function(data, description) {
        it('step3:Verify get a quote page with different data set : ' + description, function() {
            shopping.Submit.click();
            shopping.Zipcode.setText(data.Zipcode);
            shopping.NoOFCovered_getAQuote.setText(data.NoOfCovered);
            shopping.Showplans.click();
            expect(shopping.serverErrMsgnoofCovered.getText()).toEqual(data.ErrNoofCovered);
            expect(shopping.serverErrMsgZipcode.getText()).toEqual(data.ErrZipCode);

        })
    })

    it('step3.1:Verify Footer : ', function() {
        shopping.Submit.click();
        footer.verifyFooter();

    })

    dataProvider(TestData.zipcodeSet, function(data, description) {
        it('step4:Verify the plan options page with different zipcode: ' + description, function() {
            shopping.State.setText(data.state);
            shopping.Zipcode.setText(data.zipcode);
            shopping.NoOFCovered.selectByText(data.noofcovered);
            shopping.Cvgstartdate.setText(data.cvgstartdate);
            shopping.Submit.click();
            expect(planOptions.planSummary.getText()).toContain(data.zipcode);
            expect(planOptions.edit.isPresentAndDisplayed()).toBe(true);

            expect(planOptions.deltaDentalPlanHeader.getText()).toEqual(data.deltadentalheader);
            expect(planOptions.deltaCarePlanHeader.getText()).toEqual(data.deltacareheader);

            expect(planOptions.getdeltaDentalHighlights()).toEqual(data.deltadentalhighlights);
            expect(planOptions.getdeltaCareHighlights()).toEqual(data.deltacarehighlights);

            expect(planOptions.getPlanPrice(data.plan1).getText()).toEqual(data.ppoplanA_price);
            expect(planOptions.getPlanContent(data.plan1).getText()).toEqual(data.ppoplanA_Content);
            expect(planOptions.getPlanDetails(data.plan1).isPresentAndDisplayed()).toBe(true);

            expect(planOptions.getPlanPrice(data.plan2).getText()).toEqual(data.ppoplanB_price);
            expect(planOptions.getPlanContent(data.plan2).getText()).toEqual(data.ppoplanB_Content);
            expect(planOptions.getPlanDetails(data.plan2).isPresentAndDisplayed()).toBe(true);

            expect(planOptions.getPlanPrice(data.plan3).getText()).toEqual(data.DeltaCareUSAPlan15B_price);
            expect(planOptions.getPlanContent(data.plan3).getText()).toEqual(data.DeltaCareUSAPlan15B_Content);
            expect(planOptions.getPlanDetails(data.plan3).isPresentAndDisplayed()).toBe(true);

            //  Verify that High plan is displayed first
            var prices = [];
            element.all(by.css('div.plan-options-box__amount')).each(function(element, index) {
                element.getText().then(function(text) {
                    prices[index] = text;
                });
            });
            expect(prices.reverse()).toEqual(prices.sort());

            planOptions.edit.click();
            expect(shopping.Zipcode.getAttribute('value')).toEqual(data.zipcode);
            shopping.Showplans.click();
            planOptions.back.click();
            expect(shopping.Zipcode.getAttribute('value')).toEqual(data.zipcode);

        });
    });
    it('Navigate to personal info page', function() {
        shopping.State.setText(TestData.state);
        shopping.Zipcode.setText(TestData.zipcode);
        shopping.NoOFCovered.selectByText(TestData.noofcovered);
        shopping.Cvgstartdate.setText(TestData.cvgstartdate);
        shopping.Submit.click();
        planOptions.getPlanDetails('DeltaCare ® USA Plan 15B').click();
        planDetails.buyPlan.click();
        feedback.feedback.click();
        Utility.switchToFrame(feedback.feedbackFrame());
        expect(feedback.feedbackTitle.getText()).toEqual('We want to hear from you');
        expect(feedback.questionTitle.getText()).toEqual('1. Do you have any questions or comments? We want to hear from you.');
        feedback.answer.setText('test data');
        feedback.submit.click();
        expect(feedback.thankyouMsg.getText()).toContain('Thank you for taking the time to let us hear from you.');
    })

    it('Navigate to personal info page', function() {
        shopping.State.setText(TestData.state);
        shopping.Zipcode.setText(TestData.zipcode);
        shopping.NoOFCovered.selectByText(TestData.noofcovered);
        shopping.Cvgstartdate.setText(TestData.cvgstartdate);
        shopping.Submit.click();
        planOptions.getPlanDetails('DeltaCare ® USA Plan 15B').click();

        expect(planDetails.isAt()).toEqual(true);
        // expect(planDetails.planStartsHelpText.getText()).toEqual('-');
        expect(planDetails.shoppingDetailsSummary.getText()).toEqual('You choose a primary care dentist facility and visit a dentist at this facility to receive benefits.');
        // expect(planDetails.planPrice.getText()).toEqual('-');
        // expect(planDetails.getPlanDetailsByKey('Annual deductible').getText()).toEqual('-');
        // expect(planDetails.getPlanDetailsByKey('feature text').getText()).toEqual('-');

    });
});
