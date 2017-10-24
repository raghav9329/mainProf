"use strict";
var PlanOptionsPageLocators = require('./plan-options-locators');
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
class PlanOptionsPage extends ControlBase {

    constructor() {
        super(null, 'PlanOptionsPage');
       
        this.pageObjects = new PlanOptionsPageLocators();
         this.headerContent = new Label(this.pageObjects.headerContent);
        this.planSummary = new Label(this.pageObjects.planSummary);
        this.edit = new Label(this.pageObjects.edit);
        this.deltaDentalPlanHeader = new Label(this.pageObjects.deltaDentalPlanHeader);
        this.deltaCarePlanHeader = new Label(this.pageObjects.deltaCarePlanHeader);
        this.deltaDentalHighlights = new Label(this.pageObjects.deltaDentalHighlights);
        this.deltaCareHighlights = new Label(this.pageObjects.deltaCareHighlights);
        this.back = new Button(this.pageObjects.back);
    }
    isAt() {
        return this.headerContent.getText().then(function(header) {
            return header == 'Plan Options';
        })
    };
    getPlanPrice(planname) {
        return new Label(this.pageObjects.getPlanPrice(planname));
    };
    getPlanContent(planname) {
        return new Label(this.pageObjects.getPlanContent(planname));
    };
    getPlanDetails(planname) {
        return new Label(this.pageObjects.getPlanDetails(planname));
    };
    getdeltaDentalHighlights() {
        return element.all(this.pageObjects.deltaDentalHighlights).reduce(function(acc, elem) {
            return elem.getText().then(function(text) {
                return acc + text + ' ';
            });
        }, '');
    }
    getdeltaCareHighlights() {
        return element.all(this.pageObjects.deltaCareHighlights).reduce(function(acc, elem) {
            return elem.getText().then(function(text) {
                return acc + text + ' ';
            });
        }, '');
    }
}

/**
 *
 * @type {PlanOptionsPage}
 */
module.exports = PlanOptionsPage;
