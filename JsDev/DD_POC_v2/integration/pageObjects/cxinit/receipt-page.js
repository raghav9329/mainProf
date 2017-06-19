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


/**
 * Provides access to the functionality of ReceiptPage
 * @constructor
 */
class ReceiptPage extends ControlBase {
    constructor() {
        super(null, 'ReceiptPage');
        this.pageObjects = new ReceiptLocators();
        this.applicationNumber = new Label(this.pageObjects.applicationNumber);
        this.submit = new Button(this.pageObjects.submit);
        this.printReceipt = new LinkText(this.pageObjects.printReceipt);
        this.planName = new Label(this.pageObjects.planName);
        this.deltaRating = new RadioButton(this.pageObjects.deltaRating);
        this.planSummary = new Label(this.pageObjects.planSummary);
        this.applicants = new Label(this.pageObjects.applicants);
        this.dependentName = function(dependent, dependentNo) {
            return new Label(this.pageObjects.dependentName(dependent, dependentNo));
        };
        this.facilityName = function(dependent, dependentNo) {
            return new Label(this.pageObjects.facilityName(dependent, dependentNo));
        };
        this.street = function(dependent, dependentNo) {
            return new Label(this.pageObjects.street(dependent, dependentNo));
        };
        this.city = function(dependent, dependentNo) {
            return new Label(this.pageObjects.city(dependent, dependentNo));
        };
        this.region = function(dependent, dependentNo) {
            return new Label(this.pageObjects.region(dependent, dependentNo));
        };
        this.postalCode = function(dependent, dependentNo) {
            return new Label(this.pageObjects.postalCode(dependent, dependentNo));
        };
        this.telephone = function(dependent, dependentNo) {
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
        this.deltaRating.select(answer);
        this.submit.click();
        Utility.switchToFrame();
    };
    // getSelectedFacilityDetails(PRIMARY,1)
    getSelectedFacilityDetails(dependent, dependentNo) {
        var self = this;
        return browser.controlFlow().execute(function() {
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
    }


};

/**
 *
 * @type {ReceiptPage}
 */
module.exports = ReceiptPage;
