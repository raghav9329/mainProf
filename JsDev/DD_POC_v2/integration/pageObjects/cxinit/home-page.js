"use strict";
var HomePageLocators = require('./home-locators');
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
class HomePage extends ControlBase {

    constructor() {
        super(null, 'HomePage');
        this.pageObjects = new HomePageLocators();

        this.overridelink = new Label(this.pageObjects.overridelink);


        this.PlanName = new TextBox(this.pageObjects.PlanName);
        this.PlanType = new TextBox(this.pageObjects.PlanType);
        this.PlanCode = new TextBox(this.pageObjects.PlanCode);
        this.CoverageStartDate = new TextBox(this.pageObjects.CoverageStartDate);
        this.PlanState = new TextBox(this.pageObjects.PlanState);
        this.PlanZip = new TextBox(this.pageObjects.PlanZip);
        this.Country = new TextBox(this.pageObjects.Country);
        this.EnrollmentFee = new TextBox(this.pageObjects.EnrollmentFee);
        this.AnnualCost = new TextBox(this.pageObjects.AnnualCost);
        this.CoverageType = new TextBox(this.pageObjects.CoverageType);
        this.PlanID = new TextBox(this.pageObjects.PlanID);
        this.IssuerCode = new TextBox(this.pageObjects.IssuerCode);
        this.NoOFCovered = new TextBox(this.pageObjects.NoOFCovered);
        this.Dob = new TextBox(this.pageObjects.Dob);        
        this.Submit = new Button(this.pageObjects.Submit);

        this.Zipcode = new TextBox(this.pageObjects.Zipcode);
        this.Dob = new TextBox(this.pageObjects.Dob);
        this.Coverage_Type = new Select(this.pageObjects.Coverage_Type);
        this.Effcdate = new Select(this.pageObjects.Effcdate);
        this.Go = new Button(this.pageObjects.Go);
        this.PpoEnrollBtn = new Button(this.pageObjects.PpoEnrollBtn);

    }

    /**
     * Returns true if GetQuote is displayed or not
     * @returns {Promise<Boolean>}
     */
    isAt() {
        return this.GetQuote.isPresentAndDisplayed();
    }

}

/**
 *
 * @type {PersonalInfoPage}
 */
module.exports = HomePage;
