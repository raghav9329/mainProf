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
        this.plan1 = new Label(this.pageObjects.plan1);
        this.plan2 = new Label(this.pageObjects.plan2);
        this.accidentCoverage = new Label(this.pageObjects.accidentCoverage);
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
        }
    };

    isAt() {
        return this.headerContent.getText().then(function(header) {
            return header == 'Plan Details';
        })
    };

}

/**
 *
 * @type {PlanDetailsPage}
 */
module.exports = PlanDetailsPage;
