"use strict";
var FacilitiesLocators = require('./facilities-locators');
var ControlBase        = require('../../controls/base-control');
var Button             = require('../../controls/button-control');
var TextBox            = require('../../controls/textbox-control');
var Label              = require('../../controls/label-control');
var Select             = require('../../controls/select-control');
var CheckBox           = require('../../controls/checkbox-control');
var RadioButton        = require('../../controls/radiobutton-control');
var LinkText           = require('../../controls/link-control');

/**
 * Provides access to the functionality of FacilitiesPage
 * @constructor
 */
class FacilitiesPage extends ControlBase {
    constructor() {
        super(null, 'FacilitiesPage');
        this.pageObjects            = new FacilitiesLocators();
        this.zipCode                = new TextBox(this.pageObjects.zipCode);
        this.search                 = new Button(this.pageObjects.search);
        this.moreResults            = new LinkText(this.pageObjects.moreResults);
        this.next                   = new Button(this.pageObjects.next);
        this.back                   = new LinkText(this.pageObjects.back);
        this.premiumAmount          = new Label(this.pageObjects.premiumAmount);
        this.enrollmentFee          = new Label(this.pageObjects.enrollmentFee);
        this.productName            = new Label(this.pageObjects.productName);
        this.validationMessage      = new Label(this.pageObjects.validationMessage);
        this.RecentSelectedFacility = new Label(this.pageObjects.RecentSelectedFacility);
        this.facilityBox            = new Label(this.pageObjects.facilityBox);
        this.enrolleFacNullErr      = new Label(this.pageObjects.enrolleFacNullErr);
        this.enrolleFacNullHelpText = new Label(this.pageObjects.enrolleFacNullHelpText);
        this.depNameVerify          = new Label(this.pageObjects.depNameVerify);
        this.facilityChkBox         = new RadioButton(this.pageObjects.facilityChkBox);
        this.facilityName           = new Label(this.pageObjects.facilityName);
        this.facilityAddress        = new Label(this.pageObjects.facilityAddress);
        this.facilityCity           = new Label(this.pageObjects.facilityCity);
        this.facilityState          = new Label(this.pageObjects.facilityState);
        this.facilityRegion         = new Label(this.pageObjects.facilityRegion);
        this.facilityZipCode        = new Label(this.pageObjects.facilityZipCode);
        this.facilityPhone          = new Label(this.pageObjects.facilityPhone);
        this.facilitySelectiontext  = new Label(this.pageObjects.facilitySelectiontext);
        this.cancel                 = new Label(this.pageObjects.cancel);
        this.update                 = new Label(this.pageObjects.update);
    };
    /**
     * Is used to verify that user in Facilities page or not
     * Returns true if Facilities page is displayed
     * @returns {Promise<Boolean>}
     */
    isAt() {
        return this.zipCode.isPresentAndDisplayed();
    };
    /**
     * Returns Facility locator based on given facility name
     * @param {String} facilityname facility name 
     * @returns {WebElement}
     */
    selectFacilityLocator(facility) {
        return new RadioButton(this.pageObjects.selectFacility(facility));
    };
    /**
     * Returns facility name in purple colour box based on given applicant number 
     * @param {Number} applicant number 
     * @returns {WebElement}
     */
    pbox_facilityName(facno) {
        return new Label(this.pageObjects.pbox_facilityName(facno));
    };
    /**
     * Returns dependent name in purple colour box based on given applicant number 
     * @param {Number} applicant number 
     * @returns {WebElement}
     */
    pbox_dependentName(depno) {
        return new Label(this.pageObjects.pbox_dependentName(depno));
    };
    /**
     * Selects facility based on facility name. If facility not provided Selects first facility and returns selected facility details
     * @param {String} facilityname Optional Name of the facility
     * @param {Number} timeout optional
     * @returns {Promise<Object>} Returns facility details () 
     */
    selectFacility(facility, timeout) {
        var self = this;
        if (facility) {
            return browser.controlFlow().execute(function() {
                var timeout = typeof timeout !== 'undefined' ? timeout : 50000;
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
            });

        } else {
            return browser.controlFlow().execute(function() {
                self.facilityChkBox.select();
                return {
                    facilityName: self.facilityName.getText(),
                    street: self.facilityAddress.getText(),
                    city: self.facilityCity.getText(),
                    region: self.facilityRegion.getText(),
                    postalCode: self.facilityZipCode.getText(),
                    telephone: self.facilityPhone.getText(),
                }
            })
        }
    };

};

/**
 *
 * @type {FacilitiesPage}
 */
module.exports = FacilitiesPage;