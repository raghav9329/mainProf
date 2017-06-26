"use strict";
var FacilitiesLocators = require('./facilities-locators');
var ControlBase = require('../../controls/base-control');
var Button = require('../../controls/button-control');
var TextBox = require('../../controls/textbox-control');
var Label = require('../../controls/label-control');
var Select = require('../../controls/select-control');
var CheckBox = require('../../controls/checkbox-control');
var RadioButton = require('../../controls/radiobutton-control');
var LinkText = require('../../controls/link-control');

/**
 * Provides access to the functionality of FacilitiesPage
 * @constructor
 */
class FacilitiesPage extends ControlBase {
    constructor() {
        super(null, 'FacilitiesPage');
        this.pageObjects = new FacilitiesLocators();
        this.zipCode = new TextBox(this.pageObjects.zipCode);
        this.search = new Button(this.pageObjects.search);
        this.moreResults = new LinkText(this.pageObjects.moreResults);
        this.next = new Button(this.pageObjects.next);
        this.back = new LinkText(this.pageObjects.back);
        this.premiumAmount = new Label(this.pageObjects.premiumAmount);
        this.enrollmentFee = new Label(this.pageObjects.enrollmentFee);
        this.productName = new Label(this.pageObjects.productName);

        this.validationMessage = new Label(this.pageObjects.validationMessage);
        this.RecentSelectedFacility = new Label(this.pageObjects.RecentSelectedFacility);
        this.facilityBox = new Label(this.pageObjects.facilityBox);
        this.enrolleFacNullErr = new Label(this.pageObjects.enrolleFacNullErr);
        this.depNameVerify = new Label(this.pageObjects.depNameVerify);

    };
    /**
     * Returns true if zip code is displayed or not
     * @returns {Promise<Boolean>}
     */
    isAt() {
        return this.zipCode.isPresentAndDisplayed();
    };
    selectFacilityLocator(facility) {
        return new RadioButton(this.pageObjects.selectFacility(facility));
    };
    pbox_facilityName(facno) {
        return new Label(this.pageObjects.pbox_facilityName(facno));
    };
    pbox_dependentName(depno) {
        return new Label(this.pageObjects.pbox_dependentName(depno));
    };
    selectFacility(facility, timeout) {
        var self = this;
        return browser.controlFlow().execute(function() {
            timeout = typeof timeout !== 'undefined' ? timeout : 40000;
            return browser.wait(function() {
                return self.selectFacilityLocator(facility).isPresentAndDisplayed().then(function(status) {
                    if (!status) self.moreResults.click();
                    return status;
                });
            }, timeout).then(function() {
                return self.selectFacilityLocator(facility).select();
            })
        }, function(err) {
            return self.selectFacilityLocator(facility).select();
        })
    };

};

/**
 *
 * @type {FacilitiesPage}
 */
module.exports = FacilitiesPage;
