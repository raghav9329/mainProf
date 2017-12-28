"use strict";
var ReceiptLocators = require('./receipt-locators');
var ControlBase = require('../../controls/base-control');
var Button = require('../../controls/button-control');
var TextBox = require('../../controls/textbox-control');
var Label = require('../../controls/label-control');
var Select = require('../../controls/select-control');
var CheckBox = require('../../controls/checkbox-control');
var RadioButton = require('../../controls/radiobutton-control');
var LinkText = require('../../controls/link-control');
var pixeldata = require('./pixel.js');
/**
 * Provides access to the functionality of ReceiptPage
 * @constructor
 */
class ReceiptPage extends ControlBase {
    constructor() {
        super(null, 'ReceiptPage');
        this.pageObjects = new ReceiptLocators();
        this.applicationNumber = new Label(this.pageObjects.applicationNumber);
        this.planPurchased = new Label(this.pageObjects.planPurchased);
        this.effectiveDate = new Label(this.pageObjects.effectiveDate);
        this.totalPaid = new Label(this.pageObjects.totalPaid);
        this.submit = new Button(this.pageObjects.submit);
        this.printReceipt = new LinkText(this.pageObjects.printReceipt);
        this.saveCompletedApplication = new LinkText(this.pageObjects.saveCompletedApplication);
        this.planName = new Label(this.pageObjects.planName);
        this.thanksMsg = new Label(this.pageObjects.thanksMsg);
        this.queryAnswer = new TextBox(this.pageObjects.queryAnswer);
        this.deltaRating = function (rating) {
            return new RadioButton(this.pageObjects.deltaRating(rating));
        };
        this.planSummary = new Label(this.pageObjects.planSummary);
        this.applicants = new Label(this.pageObjects.applicants);
        this.dependentName = function (dependent, dependentNo) {
            return new Label(this.pageObjects.dependentName(dependent, dependentNo));
        };
        this.facilityName = function (dependent, dependentNo) {
            return new Label(this.pageObjects.facilityName(dependent, dependentNo));
        };
        this.street = function (dependent, dependentNo) {
            return new Label(this.pageObjects.street(dependent, dependentNo));
        };
        this.city = function (dependent, dependentNo) {
            return new Label(this.pageObjects.city(dependent, dependentNo));
        };
        this.region = function (dependent, dependentNo) {
            return new Label(this.pageObjects.region(dependent, dependentNo));
        };
        this.postalCode = function (dependent, dependentNo) {
            return new Label(this.pageObjects.postalCode(dependent, dependentNo));
        };
        this.telephone = function (dependent, dependentNo) {
            return new Label(this.pageObjects.telephone(dependent, dependentNo));
        };
    };
    /**
     * Returns true if application Number iss displayed or not
     * @returns {Promise<Boolean>}
     */
    isAt() {
        return this.applicationNumber.isPresentAndDisplayed();
    };
    getPlanSummaryByKey(summaryKey) {
        return new Label(this.pageObjects.planSummaryValue(summaryKey));
    };
    submitRating(answer) {
        var self = this;
        Utility.switchToFrame(this.pageObjects.feedbackFrame());
        this.deltaRating(answer).select();
        this.submit.click();
        Utility.switchToFrame();
    };
    answerQuery(answer) {
        var self = this;
        Utility.switchToFrame(this.pageObjects.feedbackFrame());
        this.queryAnswer.setText(answer);
        this.submit.click();
        Utility.switchToFrame();
    };
    getThanksMsg() {
        var self = this;
        Utility.switchToFrame(this.pageObjects.feedbackFrame());
        return this.thanksMsg.getText().then(function (thanksmsg) {
            Utility.switchToFrame();
            return thanksmsg;
        });
    };

    // getSelectedFacilityDetails(PRIMARY,1)
    getSelectedFacilityDetails(dependent, dependentNo) {
        var self = this;
        return browser.controlFlow().execute(function () {
            if (dependent.toUpperCase() == 'PRIMARY') var dep = 1;
            if (dependent.toUpperCase() == 'DEPENDENT') var dep = 2;
            if (!dependentNo) dependentNo = 1;
            return {
                name: self.dependentName(dep, dependentNo).getText(),
                facilityName: self.facilityName(dep, dependentNo).getText(),
                street: self.street(dep, dependentNo).getText(),
                city: self.city(dep, dependentNo).getText(),
                region: self.region(dep, dependentNo).getText(),
                postalCode: self.postalCode(dep, dependentNo).getText(),
                telephone: self.telephone(dep, dependentNo).getText(),
            }
        });
    };

    verifyPixel(state, product) {
        var states = ['CA','TX','PA','FL'];

        if (states.indexOf(state) !== -1) {

            if (product == "DPPO" || product == "DHMO") {
               if(state=='CA') expect(browser.getPageSource()).toContainSourceCode(pixeldata.mxptint);
                expect(browser.getPageSource()).toContainSourceCode(pixeldata.fls);
            }
            if (product == "AHMO" || product == "APPO") {
                expect(browser.getPageSource()).toContainSourceCode(pixeldata.ddm);
                expect(browser.getPageSource()).toContainSourceCode(pixeldata.ddnm);
                expect(browser.getPageSource()).toContainSourceCode(pixeldata.adnxs);
                expect(browser.getPageSource()).toContainSourceCode(pixeldata.beacon);
                expect(browser.getPageSource()).toContainSourceCode(pixeldata.facebook);

            }
        }

    }



};

/**
 *
 * @type {ReceiptPage}
 */
module.exports = ReceiptPage;
