"use strict";
var ReceiptLocators = require('./receipt-locators');
var ControlBase     = require('../../controls/base-control');
var Button          = require('../../controls/button-control');
var TextBox         = require('../../controls/textbox-control');
var Label           = require('../../controls/label-control');
var Select          = require('../../controls/select-control');
var CheckBox        = require('../../controls/checkbox-control');
var RadioButton     = require('../../controls/radiobutton-control');
var LinkText        = require('../../controls/link-control');
var pixeldata       = require('./pixel.js');
/**
 * Provides access to the functionality of ReceiptPage
 * @constructor
 */
class ReceiptPage extends ControlBase {
    constructor() {
        super(null, 'ReceiptPage');
        this.pageObjects              = new ReceiptLocators();
        this.applicationNumber        = new Label(this.pageObjects.applicationNumber);
        this.planPurchased            = new Label(this.pageObjects.planPurchased);
        this.effectiveDate            = new Label(this.pageObjects.effectiveDate);
        this.totalPaid                = new Label(this.pageObjects.totalPaid);
        this.submit                   = new Button(this.pageObjects.submit);
        this.printReceipt             = new LinkText(this.pageObjects.printReceipt);
        this.saveCompletedApplication = new LinkText(this.pageObjects.saveCompletedApplication);
        this.planName                 = new Label(this.pageObjects.planName);
        this.thanksMsg                = new Label(this.pageObjects.thanksMsg);
        this.queryAnswer              = new TextBox(this.pageObjects.queryAnswer);
        this.summaryBenefitsTxt       = new Label(this.pageObjects.summaryBenefitsTxt);
        /**
         * Returns webelement of delta rating
         * @param {Number} rating rating in number
         * @returns {WebElement}
         */
        this.deltaRating              = function(rating) {
            return new RadioButton(this.pageObjects.deltaRating(rating));
        };
        this.planSummary              = new Label(this.pageObjects.planSummary);
        this.applicants               = new Label(this.pageObjects.applicants);
        /**
         * Returns webelement of applicant/dependent name
         * @param {String} allicant PRIMARY/DEPENDENT
         * @param {Number} applicantno primary or dependent number
         * @returns {WebElement}
         */
        this.dependentName            = function(dependent, dependentNo) {
            return new Label(this.pageObjects.dependentName(dependent, dependentNo));
        };
        /**
         * Returns webelement of facility name based on given applicant/dependent name
         * @param {String} allicant PRIMARY/DEPENDENT
         * @param {Number} applicantno primary or dependent number
         * @returns {WebElement}
         */
        this.facilityName             = function(dependent, dependentNo) {
            return new Label(this.pageObjects.facilityName(dependent, dependentNo));
        };
        /**
         * Returns webelement of street based on given applicant/dependent name
         * @param {String} allicant PRIMARY/DEPENDENT
         * @param {Number} applicantno primary or dependent number
         * @returns {WebElement}
         */
        this.street                   = function(dependent, dependentNo) {
            return new Label(this.pageObjects.street(dependent, dependentNo));
        };
        /**
         * Returns webelement of city based on given applicant/dependent name
         * @param {String} allicant PRIMARY/DEPENDENT
         * @param {Number} applicantno primary or dependent number
         * @returns {WebElement}
         */
        this.city                     = function(dependent, dependentNo) {
            return new Label(this.pageObjects.city(dependent, dependentNo));
        };
        /**
         * Returns webelement of region based on given applicant/dependent name
         * @param {String} allicant PRIMARY/DEPENDENT
         * @param {Number} applicantno primary or dependent number
         * @returns {WebElement}
         */
        this.region                   = function(dependent, dependentNo) {
            return new Label(this.pageObjects.region(dependent, dependentNo));
        };
        /**
         * Returns webelement of postal code based on given applicant/dependent name
         * @param {String} allicant PRIMARY/DEPENDENT
         * @param {Number} applicantno primary or dependent number
         * @returns {WebElement}
         */
        this.postalCode               = function(dependent, dependentNo) {
            return new Label(this.pageObjects.postalCode(dependent, dependentNo));
        };
        /**
         * Returns webelement of telephone based on given applicant/dependent name
         * @param {String} allicant PRIMARY/DEPENDENT
         * @param {Number} applicantno primary or dependent number
         * @returns {WebElement}
         */
        this.telephone                = function(dependent, dependentNo) {
            return new Label(this.pageObjects.telephone(dependent, dependentNo));
        };
    };
    /**
     * Is used to verify that user in receipt page or not
     * Returns true if receipt page is displayed
     * @returns {Promise<Boolean>}
     */
    isAt() {
        return this.applicationNumber.isPresentAndDisplayed();
    };
    /**
     * Returns webelement of plan option based on given plan option
     * @param {String} planoption plan option
     * @returns {WebElement}
     */
    getPlanSummaryByKey(summaryKey) {
        return new Label(this.pageObjects.planSummaryValue(summaryKey));
    };
    /**
     * Submits the rating
     * @param {Number} rank rank points
     */
    submitRating(answer) {
        var self = this;
        Utility.switchToFrame(this.pageObjects.feedbackFrame());
        this.deltaRating(answer).select();
        this.submit.click();
        Utility.switchToFrame();
    };
    /**
     * Answering Query 
     * @param {String} answer Query answer
     */
    answerQuery(answer) {
        var self = this;
        Utility.switchToFrame(this.pageObjects.feedbackFrame());
        this.queryAnswer.setText(answer);
        this.submit.click();
        Utility.switchToFrame();
    };
    /**
     * Returns Thanks message after answering question 
     * @returns {Promise<String>} ThanksMessage
     */
    getThanksMsg() {
        var self = this;
        Utility.switchToFrame(this.pageObjects.feedbackFrame());
        return this.thanksMsg.getText().then(function(thanksmsg) {
            Utility.switchToFrame();
            return thanksmsg;
        });
    };
    /**
     * Returns Facility details based on applicant and dependent number 
     * @param {String} applicant PRIMARY or DEPENDENT
     * @param {Number} applicantno PRIMARY -1, DEPENDENT-2,DEPENDENT-3 ...
     */

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
    };

    /**
     * Verifies the pixels in Receipt page
     */
    verifyPixel(state, product) {
        var states = ['CA', 'TX', 'PA', 'FL'];

        if (states.indexOf(state) !== -1) {

            if (product == "DPPO" || product == "DHMO") {
                if (state == 'CA') expect(browser.getPageSource()).toContainSourceCode(pixeldata.mxptint);
                expect(browser.getPageSource()).toContainSourceCode(pixeldata.fls);
            }
            if (product == "AHMO" || product == "APPO") {
                expect(browser.getPageSource()).toContainSourceCode(pixeldata.ddm);
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