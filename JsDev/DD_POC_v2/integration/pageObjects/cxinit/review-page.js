"use strict";
var PaymentLocators = require('./review-locators');
var ControlBase     = require('../../controls/base-control');
var Button          = require('../../controls/button-control');
var TextBox         = require('../../controls/textbox-control');
var Label           = require('../../controls/label-control');
var Select          = require('../../controls/select-control');
var CheckBox        = require('../../controls/checkbox-control');
var RadioButton     = require('../../controls/radiobutton-control');
var LinkText        = require('../../controls/link-control');


/**
 * Provides access to the functionality of ReviewPage
 * @constructor
 */
class ReviewPage extends ControlBase {
    constructor() {
        super(null, 'ReviewPage');
        this.pageObjects             = new PaymentLocators();
        this.primaryEdit             = new LinkText(this.pageObjects.primaryEdit);
        this.dependentsEdit          = new LinkText(this.pageObjects.dependentsEdit);
        this.primaryName             = new Label(this.pageObjects.primaryName);
        this.back                    = new Label(this.pageObjects.back);
        this.openApplicant           = new Label(this.pageObjects.openApplicant);
        this.paymentEdit             = new LinkText(this.pageObjects.paymentEdit);
        this.primaryFacilityChange   = new LinkText(this.pageObjects.primaryFacilityChange);
        this.dependentFacilityChange = function(depno) {
            return new LinkText(this.pageObjects.dependentFacilityChange(depno));
        };
        this.dependentFacilityName   = function(depno) {
            return new Label(this.pageObjects.dependentFacilityName(depno));
        };
        this.primaryFacilityName     = new Label(this.pageObjects.primaryFacilityName);

    };
    /**
     * Is used to verify that user in Review page or not
     * Returns true if Payment page is displayed
     * @returns {Promise<Boolean>}
     */
    isAt() {
        return this.openApplicant.isPresentAndDisplayed();
    };


};

/**
 *
 * @type {ReviewPage}
 */
module.exports = ReviewPage;