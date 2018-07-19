"use strict";
var EnrollPageLocators = require('./enroll-locators');
var ControlBase        = require('../../controls/base-control');
var Button             = require('../../controls/button-control');
var TextBox            = require('../../controls/textbox-control');
var Label              = require('../../controls/label-control');
var Select             = require('../../controls/select-control');
var CheckBox           = require('../../controls/checkbox-control');
var RadioButton        = require('../../controls/radiobutton-control');
var LinkText           = require('../../controls/link-control');
var shopping           = new(require('./shopping-page.js'));
var planOptions        = new(require('./plan-options-page.js'));
var planDetails        = new(require('./plan-details-page.js'));
var pixeldata          = require('./pixel.js');

/**
 * Provides access to the functionality of get a quote page 
 * @constructor 
 */
class EnrollPage extends ControlBase {

    constructor() {
        super(null, 'EnrollPage');
        this.pageObjects       = new EnrollPageLocators();
        this.changeSearch      = new LinkText(this.pageObjects.changeSearch);
        this.overridelink      = new Label(this.pageObjects.overridelink);
        this.PlanName          = new TextBox(this.pageObjects.PlanName);
        this.PlanType          = new TextBox(this.pageObjects.PlanType);
        this.PlanCode          = new TextBox(this.pageObjects.PlanCode);
        this.CoverageStartDate = new TextBox(this.pageObjects.CoverageStartDate);
        this.PlanState         = new TextBox(this.pageObjects.PlanState);
        this.PlanZip           = new TextBox(this.pageObjects.PlanZip);
        this.Country           = new TextBox(this.pageObjects.Country);
        this.EnrollmentFee     = new TextBox(this.pageObjects.EnrollmentFee);
        this.AnnualCost        = new TextBox(this.pageObjects.AnnualCost);
        this.CoverageType      = new TextBox(this.pageObjects.CoverageType);
        this.PlanID            = new TextBox(this.pageObjects.PlanID);
        this.IssuerCode        = new TextBox(this.pageObjects.IssuerCode);
        this.NoOFCovered       = new TextBox(this.pageObjects.NoOFCovered);
        this.Dob               = new TextBox(this.pageObjects.Dob);
        this.Submit            = new Button(this.pageObjects.Submit);
        // Enroll UI Objects
        this.Zipcode           = new TextBox(this.pageObjects.Zipcode);
        this.dob               = new TextBox(this.pageObjects.dob);
        this.addDependent      = new Label(this.pageObjects.addDependent);
        this.Coverage_Type     = new Select(this.pageObjects.Coverage_Type);
        this.Effcdate          = new Select(this.pageObjects.Effcdate);
        this.Go                = new Button(this.pageObjects.Go);
        this.PpoEnrollBtn      = new Button(this.pageObjects.PpoEnrollBtn);
        this.quoteInfoTxt      = new Label(this.pageObjects.quoteInfoTxt);
        this.quoteZipTxt       = new Label(this.pageObjects.quoteZipTxt);
        this.quotesDepTxt      = new Label(this.pageObjects.quotesDepTxt);
        this.birtdateText      = new Label(this.pageObjects.birtdateText);
        this.costcoZip         = new TextBox(this.pageObjects.costcoZip);
        this.viewPlans         = new Button(this.pageObjects.viewPlans);

    }

    /**
     * Is used to verify that user in Get A Quote page or not
     * Returns true if Get a Quote page is displayed
     * @returns {Promise<Boolean>}
     */
    isAt() {
        return this.GetQuote.isPresentAndDisplayed();
    };
    /**
     * Returns webelement of dependent birthday text based on given dependent number
     * @param {Number} depnumber dependent birthday number
     * @returns {WebElement}
     */
    depBirthDayText(depno) {
        return new Label(this.pageObjects.depBirthDayText(depno))
    }
    enroll(planName) {
        return new Button(this.pageObjects.enroll(planName));
    }
    /**
     * Returns webelement of dependent birthday text field based on given dependent number
     * @param {Number} depnumber dependent birthday number
     * @returns {WebElement}
     */
    dependentDOB(depno) {
        return new TextBox(this.pageObjects.dependentDOB(depno));
    };

    deltaEnroll(homeObj) {
        var self = this;
        var noofdependents = '';
        browser.controlFlow().execute(function() {
            if (homeObj.dependentsDOB) {
                noofdependents = homeObj.dependentsDOB.length + 1;
            } else {
                noofdependents = 1;
            }
            states.forEach(function(state) {
                if (state !== "MD") {

                    expect(browser.getPageSource()).toContainSourceCode(pixeldata.floodlight_getaquote);
                    expect(browser.getPageSource()).toContainSourceCode(pixeldata.vendor_getaquote);

                }
            })
            shopping.Zipcode.setText(homeObj.ZIPcode);
            shopping.enterDOB(homeObj.dob);
            browser.sleep(5000);
            if (homeObj.dependentsDOB) {
                shopping.NoOFCovered.setText(noofdependents + '\t');
                browser.sleep(5000);
                homeObj.dependentsDOB.forEach(function(depdob, index) {
                    var depno = index + 1;
                    shopping.enterDependentDOB('Dependent' + depno, depdob);
                });
            } else {
                shopping.NoOFCovered.setText(noofdependents + '\t');
            }
        });
    };


    aarpEnroll(homeObj) {
        var noofdependents = '';
        browser.controlFlow().execute(function() {
            shopping.Zipcode.setText(homeObj.ZIPcode);
            if (homeObj.dependentsDOB) {
                noofdependents = homeObj.dependentsDOB.length + 1;
            } else {
                noofdependents = 1;
            }
            expect(browser.getPageSource()).toContainSourceCode(pixeldata.secureAccordant);
            shopping.NoOFCovered_getAQuote.setText(noofdependents + '\t');

        })

    }


    /**
     * Fill get a quote page details and navigate to perInfo page
     * @param {Object} enrollData enroll data{
                        "PlanName": "",
                        "CoverageStartDate": "",
                        "ZIPcode": "",
                        "CoverageType": "",
                        "IssuerCode": "",
                        "NoOfPeopleCovered": "",
                        "dob": ""
                    }
     * @returns {String<planstartsdate>} 
     */
    enterHomePageDetails(homeObj) {
        var self = this;
        return browser.controlFlow().execute(function() {
            return browser.getCapabilities().then((c) => {
                if (isExecutionFromUI) {
                    if (homeObj.IssuerCode.toUpperCase() == 'DELTA') {
                        self.deltaEnroll(homeObj);
                    }
                    if (homeObj.IssuerCode.toUpperCase() == 'AARP') {
                        self.aarpEnroll(homeObj);
                    }
                    shopping.Showplans.click();
                    if (homeObj.IssuerCode.toUpperCase() == 'AARP') {
                        // need to enhance the condition
                        // states.forEach(function(state) {
                        //     if (['DE', 'GA', 'MS', 'MT', 'NV', 'UT', 'WV'].indexOf(state) !== -1) {
                        expect(browser.getPageSource()).toContainSourceCode(pixeldata.pOptions1);
                        expect(browser.getPageSource()).toContainSourceCode(pixeldata.pOptions2);

                        //     }
                        // })
                    }
                    return planOptions.getPlanStartsFrom(homeObj.PlanName).getText().then(function(startdate) {
                        console.log("startdate=================" + startdate)

                        planOptions.getPlanDetails(homeObj.PlanName).click();
                        var sDate = startdate.replace(/\r?\n|\r/g, "").slice(-11);
                        var date = new Date(sDate);
                        planDetails.buyPlan.click();
                        if (homeObj.IssuerCode.toUpperCase() == 'DELTA') {
                            states.forEach(function(state) {
                                console.log("===state===========" + state)
                                if (state !== "MD") {
                                    // Naresh - Remove if condition after added pixels for MD -Delta products
                                    if (homeObj.ZIPcode !== "20716") {
                                        expect(browser.getPageSource()).toContainSourceCode(pixeldata.floodlight_perInfo);
                                        expect(browser.getPageSource()).toContainSourceCode(pixeldata.vendor_perInfo);
                                    }
                                }
                            })
                        }
                        return moment(date).format('MM/DD/YYYY')
                    })
                } else {
                    if (homeObj.IssuerCode.toUpperCase() !== 'COSTCO') {
                        Utility.openApplication(browser.params.baseUrl + '/shopping/delta/test');
                        return element(by.id("eff_date")).getAttribute('value').then(function(cdate) {
                            shopping.Zipcode.setText(homeObj.ZIPcode);
                            element(by.name('issuerCode')).clear();
                            element(by.name('issuerCode')).sendKeys(homeObj.IssuerCode.toLowerCase())

                            shopping.Submit.click();
                            if (homeObj.IssuerCode.toUpperCase() == 'AARP') {
                                // need to enhance the condition
                                states.forEach(function(state) {
                                    if (['DE', 'GA', 'MS', 'MT', 'NV', 'UT', 'WV'].indexOf(state) !== -1) {
                                        expect(browser.getPageSource()).toContainSourceCode(pixeldata.pOptions1);
                                        expect(browser.getPageSource()).toContainSourceCode(pixeldata.pOptions2);
                                        expect(browser.getPageSource()).toContainSourceCode(pixeldata.secureAccordant);
                                    }
                                })
                            }
                            planOptions.back.click();
                            if (homeObj.IssuerCode.toUpperCase() == 'DELTA') {
                                self.deltaEnroll(homeObj);
                                shopping.Showplans.click();
                                planOptions.getPlanDetails(homeObj.PlanName).click();
                                planDetails.buyPlan.click();
                            }
                            if (homeObj.IssuerCode.toUpperCase() == 'AARP') {
                                shopping.NoOFCovered_getAQuote.setText((Number(homeObj.NoOfPeopleCovered)) + '\t');
                                browser.sleep(5000)
                                shopping.Showplans.click();
                                planOptions.getPlanDetails(homeObj.PlanName).click();
                                planDetails.buyPlan.click();
                                browser.sleep(3000)
                                states.forEach(function(state) {
                                    if (['DE', 'GA', 'MS', 'MT', 'NV', 'UT', 'WV'].indexOf(state) !== -1) {
                                        expect(browser.getPageSource()).toContainSourceCode(pixeldata.pInfo1);
                                    }
                                })

                            }
                            if (isExecutionFromUI == false) {
                                var date = new Date();
                                var month = date.getMonth() + 1;
                                var d = new Date(month + '/01/2018');
                                return moment(d).add(1, 'month').format('MM/DD/YYYY');
                            } else {

                                return cdate;
                            }

                        })
                    } else {
                        //  Utility.openApplication(browser.params.baseUrl + '/enroll/COSTCO/test');
                        // self.PlanName.setText(homeObj.PlanName);
                        // self.PlanType.setText(homeObj.PlanType);
                        // self.PlanCode.setText(homeObj.PlanCode);
                        // self.CoverageStartDate.setText(homeObj.CoverageStartDate);
                        // self.PlanState.setText(homeObj.State);
                        // self.PlanZip.setText(homeObj.ZIPcode);
                        // self.Country.setText(homeObj.Country);
                        // self.EnrollmentFee.setText(homeObj.EnrollmentFee);
                        // self.AnnualCost.setText(homeObj.AnnualCost);
                        // self.CoverageType.setText(homeObj.CoverageType);
                        // self.PlanID.setText(homeObj.PlanID);
                        // self.IssuerCode.setText(homeObj.IssuerCode);
                        // self.NoOFCovered.setText(homeObj.NoOfPeopleCovered);
                        // if (homeObj.Dob) self.Dob.setText(homeObj.Dob);
                        // self.Submit.click();

                        //========= Hcentive==================
                        Utility.openApplication(browser.params.baseUrl + '/plans_costco/');
                        self.costcoZip.setText(homeObj.ZIPcode);
                        self.viewPlans.click();
                        self.pageObjects.enroll(homeObj.PlanName).click();

                    }

                }
            })
        });
    };
}

/**
 *
 * @type {GetAQuotePage}
 */
module.exports = EnrollPage;