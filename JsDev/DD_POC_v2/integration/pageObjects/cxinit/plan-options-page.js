"use strict";
var PlanOptionsPageLocators = require('./plan-options-locators');
var ControlBase             = require('../../controls/base-control');
var Button                  = require('../../controls/button-control');
var TextBox                 = require('../../controls/textbox-control');
var Label                   = require('../../controls/label-control');
var Select                  = require('../../controls/select-control');
var CheckBox                = require('../../controls/checkbox-control');
var RadioButton             = require('../../controls/radiobutton-control');
var LinkText                = require('../../controls/link-control');

/**
 * Provides access to the functionality of Plan Options page
 * @constructor
 */
class PlanOptionsPage extends ControlBase {

    constructor() {
        super(null, 'PlanOptionsPage');
        this.pageObjects                  = new PlanOptionsPageLocators();
        this.headerContent                = new Label(this.pageObjects.headerContent);
        this.planSummary                  = new Label(this.pageObjects.planSummary);
        this.edit                         = new Button(this.pageObjects.edit);
        this.deltaDentalPlanHeader        = new Label(this.pageObjects.deltaDentalPlanHeader);
        this.deltaCarePlanHeader          = new Label(this.pageObjects.deltaCarePlanHeader);
        this.deltaDentalHighlights        = new Label(this.pageObjects.deltaDentalHighlights);
        this.deltaCareHighlights          = new Label(this.pageObjects.deltaCareHighlights);
        this.dDeltaDentalHighlights       = new Label(this.pageObjects.dDeltaDentalHighlights);
        this.dDeltaCareHighlights         = new Label(this.pageObjects.dDeltaCareHighlights);
        this.back                         = new Button(this.pageObjects.back);
        this.ppoNetworkProviders          = new Label(this.pageObjects.ppoNetworkProviders);
        this.deltaCareNetworkProviders    = new Label(this.pageObjects.deltaCareNetworkProviders);
        this.aDeltaDentalHighlightsHeader = new Label(this.pageObjects.aDeltaDentalHighlightsHeader);
        this.aDeltaCareHighlightsHeader   = new Label(this.pageObjects.aDeltaCareHighlightsHeader);

    }

    /**
     * Is used to verify that user in Plan Options page or not
     * Returns true if Plan Options page is displayed
     * @returns {Promise<Boolean>}
     */
    isAt() {
        return this.headerContent.getText().then(function(header) {
            return header == 'Plan Options';
        })
    };
    /**
     * Returns WebElement of plan price based on given plan
     * @param {String} planname plan name
     * @returns {WebElement}
     */
    getPlanPrice(planname) {
        return new Label(this.pageObjects.getPlanPrice(planname));
    };
    /**
     * Returns WebElement of plan price information based on given plan
     * @param {String} planname plan name
     * @returns {WebElement}
     */
    getPlanPriceDetails(planname) {
        return new Label(this.pageObjects.getPlanPriceDetails(planname));
    };
    /**
     * Returns WebElement of plan information based on given plan
     * @param {String} planname plan name
     * @returns {WebElement}
     */
    getPlanContent(planname) {
        return new Label(this.pageObjects.getPlanContent(planname));
    };
    /**
     * Returns WebElement of plan details based on given plan
     * @param {String} planname plan name
     * @returns {WebElement}
     */
    getPlanDetails(planname) {
        return new Label(this.pageObjects.getPlanDetails(planname));
    };
    /**
     * Returns WebElement of plan starts from based on given plan
     * @param {String} planname plan name
     * @returns {WebElement}
     */
    getPlanStartsFrom(planname) {
        return new Label(this.pageObjects.getPlanStartsFrom(planname));
    };

    /**
     * Used to get deltaDental Highlights for product AARP
     * @returns {Promise<String>}
     */
    getdeltaDentalHighlights() {
        return element.all(this.pageObjects.deltaDentalHighlights).reduce(function(acc, elem) {
            return elem.getText().then(function(text) {
                return acc + text + ' ';
            });
        }, '');
    }
    /**
     * Used to get deltaCare Highlights for product AARP
     * @returns {Promise<String>}
     */
    getdeltaCareHighlights() {
        return element.all(this.pageObjects.deltaCareHighlights).reduce(function(acc, elem) {
            return elem.getText().then(function(text) {
                return acc + text + ' ';
            });
        }, '');
    }
    /**
     * Used to get deltaDental Highlights for DELTA
     * @returns {Promise<String>}
     */
    getdDeltaDentalHighlights() {
        return element.all(this.pageObjects.dDeltaDentalHighlights).reduce(function(acc, elem) {
            return elem.getText().then(function(text) {
                return acc + text + ' ';
            });
        }, '');
    }
    /**
     * Used to get deltaCare Highlights for DELTA
     * @returns {Promise<String>}
     */
    getdDeltaCareHighlights() {
        return element.all(this.pageObjects.dDeltaCareHighlights).reduce(function(acc, elem) {
            return elem.getText().then(function(text) {
                return acc + text + ' ';
            });
        }, '');
    }
    /**
     * Used to get network providers count for delta dental
     * @returns {Promise<String>}
     */
    getDeltaDentalNetworkProvidersCount() {
        return this.ppoNetworkProviders.getText().then(function(networkproviders) {
            var nProviders = networkproviders.split(" ");
            console.log("nProviders" + nProviders)
            return nProviders[2];
        })
    };
    /**
     * Used to get network providers count for delta care
     * @returns {Promise<String>}
     */
    getDeltaCareNetworkProvidersCount() {
        return this.deltaCareNetworkProviders.getText().then(function(networkproviders) {
            var nProviders = networkproviders.split(" ");
            console.log("nProviders" + nProviders)
            return nProviders[2];
        })
    }
}

/**
 *
 * @type {PlanOptionsPage}
 */
module.exports = PlanOptionsPage;