"use strict";
var EnrollPageLocators = require('./enroll-locators');
var ControlBase = require('../../controls/base-control');
var Button = require('../../controls/button-control');
var TextBox = require('../../controls/textbox-control');
var Label = require('../../controls/label-control');
var Select = require('../../controls/select-control');
var CheckBox = require('../../controls/checkbox-control');
var RadioButton = require('../../controls/radiobutton-control');
var LinkText = require('../../controls/link-control');

var shopping = new(require('./shopping-page.js'));
var planOptions = new(require('./plan-options-page.js'));
var planDetails = new(require('./plan-details-page.js'));
/**
 * Provides access to the functionality of Personal Info page
 * @constructor
 */
class EnrollPage extends ControlBase {

    constructor() {
        super(null, 'EnrollPage');
        this.pageObjects = new EnrollPageLocators();
        this.changeSearch = new LinkText(this.pageObjects.changeSearch);
        this.overridelink = new Label(this.pageObjects.overridelink);
        this.PlanName = new TextBox(this.pageObjects.PlanName);
        this.PlanType = new TextBox(this.pageObjects.PlanType);
        this.PlanCode = new TextBox(this.pageObjects.PlanCode);
        this.CoverageStartDate = new TextBox(this.pageObjects.CoverageStartDate);
        this.PlanState = new TextBox(this.pageObjects.PlanState);
        this.PlanZip = new TextBox(this.pageObjects.PlanZip);
        this.Country = new TextBox(this.pageObjects.Country);
        this.EnrollmentFee = new TextBox(this.pageObjects.EnrollmentFee);
        this.AnnualCost = new TextBox(this.pageObjects.AnnualCost);
        this.CoverageType = new TextBox(this.pageObjects.CoverageType);
        this.PlanID = new TextBox(this.pageObjects.PlanID);
        this.IssuerCode = new TextBox(this.pageObjects.IssuerCode);
        this.NoOFCovered = new TextBox(this.pageObjects.NoOFCovered);
        this.Dob = new TextBox(this.pageObjects.Dob);
        this.Submit = new Button(this.pageObjects.Submit);

        // Enroll UI Objects
        this.Zipcode = new TextBox(this.pageObjects.Zipcode);
        this.dob = new TextBox(this.pageObjects.dob);
        this.addDependent = new Label(this.pageObjects.addDependent);

        this.Coverage_Type = new Select(this.pageObjects.Coverage_Type);
        this.Effcdate = new Select(this.pageObjects.Effcdate);
        this.Go = new Button(this.pageObjects.Go);
        this.PpoEnrollBtn = new Button(this.pageObjects.PpoEnrollBtn);

        this.quoteInfoTxt = new Label(this.pageObjects.quoteInfoTxt);
        this.quoteZipTxt = new Label(this.pageObjects.quoteZipTxt);
        this.quotesDepTxt = new Label(this.pageObjects.quotesDepTxt);
        this.birtdateText = new Label(this.pageObjects.birtdateText);


    }

    /**
     * Returns true if GetQuote is displayed or not
     * @returns {Promise<Boolean>}
     */
    isAt() {
        return this.GetQuote.isPresentAndDisplayed();
    };
    depBirthDayText(depno) {
        return new Label(this.pageObjects.depBirthDayText(depno))
    }
    enroll(planName) {
        return new Button(this.pageObjects.enroll(planName));
    }

    dependentDOB(depno) {
        return new TextBox(this.pageObjects.dependentDOB(depno));
    };

    olddeltaEnroll(homeObj) {
        var self = this;
        self.Zipcode.setText(homeObj.ZIPcode);
        self.Zipcode.setText(homeObj.ZIPcode);
        browser.sleep(1000);
        self.dob.setText(homeObj.dob);
    };

    deltaEnroll(homeObj) {
        var self = this;
        var noofdependents = '';

        browser.controlFlow().execute(function() {
            if (homeObj.dependentsDOB) {
                noofdependents = homeObj.dependentsDOB.length;
            } else {
                noofdependents = 0;
            }
            if (isExecutionFromUI == true) planOptions.back.click();
            shopping.enterDOB(homeObj.dob);
            browser.sleep(10000);
            if (homeObj.dependentsDOB) {
                shopping.NoOFCovered_getAQuote.setText(noofdependents + '\t');
                browser.sleep(10000);
                homeObj.dependentsDOB.forEach(function(depdob, index) {
                    var depno = index + 1;
                    shopping.enterDependentDOB('Dependent' + depno, depdob);
                });
            } else {
                shopping.NoOFCovered_getAQuote.setText(noofdependents + '\t');
            }
            shopping.Showplans.click();
            planOptions.getPlanDetails(homeObj.PlanName).click();
            planDetails.buyPlan.click();
        });
    };


    aarpEnroll(homeObj) {
        this.Zipcode.setText(homeObj.ZIPcode);
        this.Zipcode.setText(homeObj.ZIPcode);
        browser.sleep(2000);
        this.Coverage_Type.selectByText(homeObj.NoOfPeopleCovered);
    }


    // Fill Home page details and navigate ti perInfo page
    enterHomePageDetails(homeObj, ppoo) {
        var self = this;
        return browser.controlFlow().execute(function() {
            return browser.getCapabilities().then((c) => {
                if (isExecutionFromUI) {
                    switch (homeObj.IssuerCode.toUpperCase()) {
                        case 'DELTA':
                            self.olddeltaEnroll(homeObj);
                            break;
                        case 'AARP':
                            self.aarpEnroll(homeObj);
                            break;
                    };
                    return self.Effcdate.getSelectedText().then(function(cstartDate) {
                        self.Go.click();
                        if (homeObj.IssuerCode.toUpperCase() == 'DELTA') {
                            self.deltaEnroll(homeObj)
                            return cstartDate;
                        }
                        if (homeObj.IssuerCode.toUpperCase() == 'AARP') {
                            planOptions.getPlanDetails(homeObj.PlanName).click();
                            planDetails.buyPlan.click();
                            return cstartDate;
                        }
                    })
                } else {

                    Utility.openApplication(browser.params.baseUrl + '/shopping/delta/test');
                    return element(by.id("eff_date")).getAttribute('value').then(function(cdate) {
                        shopping.Zipcode.setText(homeObj.ZIPcode);
                        element(by.name('issuerCode')).clear();
                        element(by.name('issuerCode')).sendKeys(homeObj.IssuerCode.toLowerCase())

                        shopping.Submit.click();
                        planOptions.back.click();
                        if (homeObj.IssuerCode.toUpperCase() == 'DELTA') {
                            self.deltaEnroll(homeObj);
                        }
                        if (homeObj.IssuerCode.toUpperCase() == 'AARP') {
                            shopping.NoOFCovered_getAQuote.setText((Number(homeObj.NoOfPeopleCovered)) + '\t');
                            browser.sleep(5000)
                            shopping.Showplans.click();
                            planOptions.getPlanDetails(homeObj.PlanName).click();
                            planDetails.buyPlan.click();
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
                }



                //  else {
                //     console.log("else block===============");
                //     if (c.get('browserName') == 'internet explorer') self.overridelink.click();
                //     self.PlanName.setText(homeObj.PlanName);
                //     self.PlanType.setText(homeObj.PlanType);
                //     self.PlanCode.setText(homeObj.PlanCode);
                //     self.CoverageStartDate.setText(homeObj.CoverageStartDate);
                //     self.PlanState.setText(homeObj.State);
                //     self.PlanZip.setText(homeObj.ZIPcode);
                //     self.Country.setText(homeObj.Country);
                //     self.EnrollmentFee.setText(homeObj.EnrollmentFee);
                //     self.AnnualCost.setText(homeObj.AnnualCost);
                //     self.CoverageType.setText(homeObj.CoverageType);
                //     self.PlanID.setText(homeObj.PlanID);
                //     self.IssuerCode.setText(homeObj.IssuerCode);
                //     self.NoOFCovered.setText(homeObj.NoOfPeopleCovered);
                //     if (homeObj.Dob) self.Dob.setText(homeObj.Dob);
                //     self.Submit.click();
                // }
            })
        });
    };



}

/**
 *
 * @type {EnrollPage}
 */
module.exports = EnrollPage;