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

/**
 * Provides access to the functionality of Personal Info page
 * @constructor
 */
class EnrollPage extends ControlBase {

    constructor() {
        super(null, 'EnrollPage');
        this.pageObjects = new EnrollPageLocators();
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

    }

    /**
     * Returns true if GetQuote is displayed or not
     * @returns {Promise<Boolean>}
     */
    isAt() {
        return this.GetQuote.isPresentAndDisplayed();
    };
    enroll(planName) {
        return new Button(this.pageObjects.enroll(planName));
    }

    dependentDOB(depno) {
        return new TextBox(this.pageObjects.dependentDOB(depno));
    };

    deltaEnroll(homeObj) {
        var self = this;
        self.Zipcode.setText(homeObj.ZIPcode);
         self.Zipcode.setText(homeObj.ZIPcode);
        browser.sleep(1000);
        self.dob.setText(homeObj.dob);
        browser.controlFlow().execute(function() {
            if (homeObj.dependentsDOB) {
                homeObj.dependentsDOB.forEach(function(depdob, index) {
                    // console.log("depdob====" + depdob);
                    // console.log("index====" + index);
                    self.addDependent.click().then(function() {
                        browser.sleep(1000);
                        var depno = index + 1;
                        element(by.xpath('//a[@id="addChild"]/parent::div/div[' + depno + ']/input')).clear().sendKeys(depdob).then(function() {
                            browser.sleep(1000);
                        })
                    })
                });
            }

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
                            self.deltaEnroll(homeObj);
                            break;
                        case 'AARP':
                            self.aarpEnroll(homeObj);
                            break;
                    };
                    return self.Effcdate.getSelectedText().then(function(cstartDate) {
                        //this.Effcdate.selectByText(homeObj.CoverageStartDate);
                        self.Go.click();
                        browser.sleep(2000);
                        self.pageObjects.enroll(homeObj.PlanName).click();
                        return cstartDate;
                    })
                } else {
                    console.log("else block===============");
                    if (c.get('browserName') == 'internet explorer') HmPage.overridelink.click();
                    self.PlanName.setText(homeObj.PlanName);
                    self.PlanType.setText(homeObj.PlanType);
                    self.PlanCode.setText(homeObj.PlanCode);
                    self.CoverageStartDate.setText(homeObj.CoverageStartDate);
                    self.PlanState.setText(homeObj.State);
                    self.PlanZip.setText(homeObj.ZIPcode);
                    self.Country.setText(homeObj.Country);
                    self.EnrollmentFee.setText(homeObj.EnrollmentFee);
                    self.AnnualCost.setText(homeObj.AnnualCost);
                    self.CoverageType.setText(homeObj.CoverageType);
                    self.PlanID.setText(homeObj.PlanID);
                    self.IssuerCode.setText(homeObj.IssuerCode);
                    self.NoOFCovered.setText(homeObj.NoOfPeopleCovered);
                    if (homeObj.Dob) self.Dob.setText(homeObj.Dob);
                    self.Submit.click();
                }
            })
        });
    };



}

/**
 *
 * @type {EnrollPage}
 */
module.exports = EnrollPage;
