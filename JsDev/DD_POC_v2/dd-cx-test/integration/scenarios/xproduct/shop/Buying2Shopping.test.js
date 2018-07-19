var marketPage  = require('../../../pageObjects/cxinit/aarp-market-page.js');
var planOptions = new(require('../../../pageObjects/cxinit/plan-options-page.js'));
var planDetails = new(require('../../../pageObjects/cxinit/plan-details-page.js'));
var perInfo     = new(require('../../../pageObjects/cxinit/perInfo-page.js'));
var enrollPage  = new(require('../../../pageObjects/cxinit/enroll-page.js'));
var getaQuote   = new(require('../../../pageObjects/cxinit/shopping-page.js'));



var TestData    = require('../../testData/' + testDataEnv + '/aarpppo/Buying2Shopping.json');

describe('Buying2Shopping work flow', function() {

    beforeAll(function() {
        Utility.openApplication(browser.params.baseUrl + '/aarp/');
    });
    it('Old Shopping to New Shopping', function() {
        marketPage.state.selectByText(TestData.state);
        marketPage.continue.click();
        marketPage.Zipcode.setText(TestData.zipcode);
        marketPage.NoOFCovered.selectByText(TestData.noofcovered);
        marketPage.viewQuote.click();
        expect(planOptions.isAt()).toEqual(true, 'Verifies that User is at Plan Options Page');
    });
    it('select plan and verify the PD', function() {
        planOptions.getPlanDetails(TestData.plan1).click();
        expect(planDetails.getPlanDetailsByKey('Network dentist').getText()).toContain("near you");
    });
    it('Press back in plan details page and verify user navigated to CX Plan options page', function() {
        planDetails.back.click();
        expect(planOptions.isAt()).toBe(true, 'Verifies that User is at Plan Options Page');
    });

    it('Press back in plan options page and verify that user navigated to CX get a quote page', function() {
        planOptions.back.click();
        expect(getaQuote.isAt()).toBe(true, 'Verifies that User is at Get A Quote Page');
    });
    it('Press back in get a quote page and verify that user navigated to marketing site', function() {
        getaQuote.back.click();
        expect(marketPage.isAt()).toBe(true, 'Verifies that User is at Market Page');
    });
    it('Verify the navigation from marketing site to personal info page', function(doneFn) {
        let apiurl = Utility.getapiurl('PROVIDERS', '', TestData.apitestdata);
        frisby.get(apiurl)
            .then(function(res) {
                let json = res.json;
                marketPage.state.selectByText(TestData.state);
                marketPage.continue.click();
                marketPage.Zipcode.setText(TestData.zipcode);
                marketPage.NoOFCovered.selectByText(TestData.noofcovered);
                marketPage.viewQuote.click();
                expect(planOptions.isAt()).toEqual(true, 'Verifies that User is at Plan Options Page');
                //verify the Delta Dental network providers count
                planOptions.getDeltaDentalNetworkProvidersCount().then(function(nCount) {
                    planOptions.getPlanDetails(TestData.plan1).click();
                    expect(json.total).toBe(Number(nCount), 'Verifies that "Delta Dental networks Provider Count" is ' + Number(nCount));
                    console.log('expected jsonTotal to be 7198.  ');
                    expect(planDetails.getnetworkprovidersCount()).toEqual(nCount, 'Verifies that "Delta Dental networks Provider Count" is ' + nCount);

                    planDetails.back.click();
                    // Verify the Delta Care primary facilities count
                    planOptions.getDeltaCareNetworkProvidersCount().then(function(nCount) {
                        planOptions.getPlanDetails(TestData.plan3).click();
                        expect(planDetails.getPrimaryCareDentistFacilitiesCount()).toEqual(nCount, 'Verifies that "Delta Dental networks Provider Count" is ' + nCount);
                    });
                    planDetails.buyPlan.click();
                    expect(perInfo.isAt()).toBe(true, 'Verifies that User is at Personal Info Page');
                })
            })
            .done(doneFn);
    });
    it('Press back in personal info page and verify that user navigated to CX Plan details page', function() {
        perInfo.backToQuote.click();
        expect(planDetails.isAt()).toBe(true, 'Verifies that User is at Plan Details Page');
    });
    it('Verify the functionality of opening network providers application in new tab', function() {
        planDetails.getPlanDetailsByKey('Primary care dentist facilities').click();
        Utility.switchToWindow(1);
        expect(planDetails.newPDCheckitOut.isPresentAndDisplayed()).toBe(true, 'Verifies that User is at Plan Details Page/ New PD Checkit Out');
        browser.close();
        Utility.switchToWindow(0);

    })
    it('Press back in plan details page and verify user navigated to CX Plan options page', function() {
        planDetails.back.click();
        expect(planOptions.isAt()).toBe(true, 'Verifies that User is at Plan Options Page');
    });

    it('Verify the flow of the user from AARP hCentive get a Quote to CX Plan Options,CX plan details,personal info page', function() {
        isExecutionFromUI = true;
        Utility.openApplication('', 'AARP');
        enrollPage.aarpEnroll(TestData.enrollData);
        enrollPage.Go.click();
        planOptions.getPlanDetails(TestData.plan1).click();
        planDetails.buyPlan.click();
        expect(perInfo.isAt()).toBe(true, 'Verifies that User is at Personal Info Page');
    });
    it('get plan coverage start dates in personal info page', function() {
        perInfo.coverageStartDate.getAllOptions().then(function(option) {
            option.forEach(function(ele) {
                console.log("Options===========" + ele.text);
            });
        })
    })
    it('Verify the navigation of back from personal info page. User came from AARP hCentive get a Quote Page', function() {
        perInfo.backToQuote.click();
        expect(planDetails.isAt()).toBe(true, 'Verifies that User is at Plan Details Page');
        planDetails.back.click();
        expect(planOptions.isAt()).toBe(true, 'Verifies that User is at Plan Options Page');
        planOptions.back.click();
        expect(getaQuote.isAt()).toBe(true, 'Verifies that User is at Get A Quote Page');
        getaQuote.back.click();
        expect(marketPage.isAt()).toBe(true, 'Verifies that User is at Market Page');
    })
    it('Change the Zip code with unsupported in personal info page and verify that zip code popup displayed.User came from AARP hCentive get a Quote Page ', function() {
        isExecutionFromUI = true;
        Utility.openApplication('', 'AARP');
        enrollPage.aarpEnroll(TestData.enrollData);
        enrollPage.Go.click();
        planOptions.getPlanDetails(TestData.plan1).click();
        planDetails.buyPlan.click();
        expect(perInfo.isAt()).toBe(true, 'Verifies that User is at Personal Info Page');
        perInfo.fieldZipCode.setText(TestData.zipcode2);
        perInfo.fieldPhoneNumber.setText('');
        expect(perInfo.zipPopNewQuote.isPresentAndDisplayed()).toBeTruthy('Verifies that ZIP Pop New Quoute is diaplyed');
        expect(perInfo.zipPopBack.isPresentAndDisplayed()).toBeTruthy('Verifies that ZIP Pop Back is diaplyed');

    })
    it('Press new Quote in zipcode popup and verify user navigated to CX get a quote page', function() {
        perInfo.zipPopNewQuote.click();
        expect(getaQuote.isAt()).toBe(true, 'Verifies that User is at Get A Quote Page');
        expect(getaQuote.NoOFCovered_getAQuote.getValue()).toEqual('0', 'Verifies that "NoOFCovered in getAQuote" filed is ' + '0');
        expect(getaQuote.Zipcode.getValue()).toEqual(TestData.zipcode2, 'Verifies that "ZIP Code" should be ' + TestData.zipcode2);

    });
    it('Enter supported another zip code and verify that user navigated to CX plan Options page', function() {
        getaQuote.Zipcode.setText(TestData.zipcode3);
        getaQuote.Showplans.click();
        expect(planOptions.isAt()).toBe(true, 'Verifies that User is at Plan Options Page');
    })

    it('Go back to CX get a Quote page and give unsupported zip code and verify that invalid zip code should be displayed', function() {
        planOptions.back.click();
        getaQuote.Zipcode.setText(TestData.zipcode2);
        getaQuote.Showplans.click();
        expect(getaQuote.zipCodeserverError.getText()).toContain(TestData.zipcodeErrMsg, 'Verifies that "Zip Code" Error Messages Should be ' + TestData.zipcodeErrMsg);
    })
    it('Enter anopther state zipcode and verify that, user is navigated to hCentive get a Quote Page:', function() {
        getaQuote.Zipcode.setText(TestData.zipcode5);
        getaQuote.Showplans.click();
        expect(browser.getCurrentUrl()).toContain('indEnroll/search/quotes', 'Verifies that "Current URL " is indEnroll/search/quotes');

    });

    it('Verify the navigation from hCentive get a Quote to CX plan options page', function() {
        enrollPage.changeSearch.click();
        enrollPage.Zipcode.setText(TestData.zipcode);
        enrollPage.Go.click();
        expect(planOptions.isAt()).toBe(true, 'Verifies that User is at Plan Options Page');
    });
    it('Change the Zip code with unsupported in personal info page and verify that zip code popup displayed.User came from AARP hCentive get a Quote Page ', function() {
        isExecutionFromUI = true;
        Utility.openApplication('', 'AARP');
        enrollPage.aarpEnroll(TestData.enrollData);
        enrollPage.Go.click();
        planOptions.getPlanDetails(TestData.plan1).click();
        planDetails.buyPlan.click();
        expect(perInfo.isAt()).toBe(true, 'Verifies that User is at Personal Info Page');
        perInfo.fieldZipCode.setText(TestData.zipcode5);
        perInfo.fieldPhoneNumber.setText('');
        expect(perInfo.zipPopNewQuote.isPresentAndDisplayed()).toBeTruthy('Verifies that ZIP Pop New Quoute is diaplyed');
        expect(perInfo.zipPopBack.isPresentAndDisplayed()).toBeTruthy('Verifies that ZIP Pop Back is diaplyed');

    })
    it('Press new Quote in zipcode popup and verify user navigated to hCentive plan options page', function() {
        perInfo.zipPopNewQuote.click();
        expect(browser.getCurrentUrl()).toContain('indEnroll/search/quotes', 'Verifies that "Current URL " is indEnroll/search/quotes');
    });

    dataProvider(TestData.zipcodes, function(data, description) {
        it('Verify the functionality of change zip code', function() {
            isExecutionFromUI = true;
            Utility.openApplication('', 'AARP');
            enrollPage.aarpEnroll(TestData.enrollData);
            enrollPage.Go.click();
            planOptions.getPlanDetails(TestData.plan1).click();
            planDetails.buyPlan.click();
            expect(perInfo.isAt()).toBe(true, 'Verifies that User is at Personal Info Page');
            perInfo.fieldZipCode.setText(data.zipcode);
            perInfo.fieldPhoneNumber.setText('');
            expect(perInfo.zipPopNewQuote.isPresentAndDisplayed()).toBeTruthy('Verifies that ZIP Pop New Quoute is diaplyed');
            expect(perInfo.zipPopBack.isPresentAndDisplayed()).toBeTruthy('Verifies that ZIP Pop Back is diaplyed');
            perInfo.zipPopNewQuote.click();
            expect(planOptions.isAt()).toBe(true, 'Verifies that User is at Plan Options Page');

        });
    });

})
