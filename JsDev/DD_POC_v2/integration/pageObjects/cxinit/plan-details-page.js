"use strict";
var PlanOptionsPageLocators = require('./plan-details-locators');
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
class PlanDetailsPage extends ControlBase {

    constructor() {
        super(null, 'PlanDetailsPage');
        this.pageObjects = new PlanOptionsPageLocators();
        this.buyPlan = new Button(this.pageObjects.buyPlan);
        this.headerContent = new Label(this.pageObjects.headerContent);
        this.planStartsHelpText = new Label(this.pageObjects.planStartsHelpText);
        this.shoppingDetailsSummary = new Label(this.pageObjects.shoppingDetailsSummary);
        this.back = new Button(this.pageObjects.back);
        this.planPrice = new Label(this.pageObjects.planPrice);

        this.anualprice = new Label(this.pageObjects.anualprice);
        this.enroll_fee = new Label(this.pageObjects.enroll_fee);
        this.shopping_details_highlightsByIndex = function(index) {
            new Label(this.pageObjects.shopping_details_highlightsByIndex(index));
        };

        this.shopping_details_highlightsInfoBYIndex = function(index) {
            new Label(this.pageObjects.shopping_details_highlightsInfoBYIndex(index));
        };

        this.plan1 = new Label(this.pageObjects.plan1);
        this.plan2 = new Label(this.pageObjects.plan2);
        this.accidentCoverage = new Label(this.pageObjects.accidentCoverage);
        this.newPDCheckitOut = new Button(this.pageObjects.newPDCheckitOut);

        this.benifitsSummary = new Label(this.pageObjects.benifitsSummary);
        this.benifitsSummaryFrequency = new Label(this.pageObjects.benifitsSummaryFrequency);
        this.shoppingFeatureDisclaimer = new Label(this.pageObjects.shoppingFeatureDisclaimer);
        this.getPlanDetailsDisclaimer = function(key) {
            return new Label(this.pageObjects.getPlanDetailsDisclaimer(key));
        };

        this.pdfText = new Label(this.pageObjects.pdfText);

        this.getPlanDetailsByKey = function(key) {
            return new Label(this.pageObjects.getPlanDetailsByKey(key));
        };
        this.tooltip = function(key) {
            return new Button(this.pageObjects.tooltip(key));
        };
        this.getTooltipHeader = function(key) {
            return new Label(this.pageObjects.getTooltipHeader(key));
        };
        this.getTooltipText = function(key) {
            return new Label(this.pageObjects.getTooltipText(key));
        };

        this.changePlan = function(planname) {
            return new Label(this.pageObjects.changePlan(planname));
        };
        this.closeToolTip = function(planname) {
            return new Label(this.pageObjects.closeToolTip(planname));
        };

        this.pdfDocument = function(docname) {
            return new Label(this.pageObjects.pdfDocument(docname));
        };

        this.getPDFNameByIndex = function(key) {
            return new Label(this.pageObjects.getPDFNameByIndex(key));
        };
        this.getPDFNameInfoByIndex = function(key) {
            return new Label(this.pageObjects.getPDFNameInfoByIndex(key));
        };
        this.seeOtherOptions = new Label(this.pageObjects.seeOtherOptions);


    };

    isAt() {
        return this.headerContent.getText().then(function(header) {
            return header == 'Plan Details';
        })
    };
    getnetworkprovidersCount() {
        return this.getPlanDetailsByKey('Network dentist').getText().then(function(providerstext) {
            var providers = providerstext.split(" ");
            console.log("providers" + providers);
            return providers[0];
        })
    }

    getPrimaryCareDentistFacilitiesCount() {
        return this.getPlanDetailsByKey('Primary care dentist facilities').getText().then(function(providerstext) {
            var providers = providerstext.split(" ");
            console.log("providers" + providers);
            return providers[0];
        })
    }




}

/**
 *
 * @type {PlanDetailsPage}
 */
module.exports = PlanDetailsPage;