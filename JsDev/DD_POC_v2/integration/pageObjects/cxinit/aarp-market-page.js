"use strict";
var AARPMarketLocators = require('./aarp-market-locators');
var ControlBase        = require('../../controls/base-control');
var Button             = require('../../controls/button-control');
var TextBox            = require('../../controls/textbox-control');
var Label              = require('../../controls/label-control');
var Select             = require('../../controls/select-control');
var CheckBox           = require('../../controls/checkbox-control');
var RadioButton        = require('../../controls/radiobutton-control');
var LinkText           = require('../../controls/link-control');

/**
 * Provides access to the functionality of AARP Market Place page
 * @constructor
 */
class AARPMarketPage extends ControlBase {

    constructor() {
        super(null, 'AARPMarketPage');
        this.pageObjects = new AARPMarketLocators();
        this.state       = new Select(this.pageObjects.state);
        this.continue    = new Button(this.pageObjects.continue);
        this.Zipcode     = new TextBox(this.pageObjects.Zipcode);
        this.NoOFCovered = new Select(this.pageObjects.NoOFCovered);
        this.viewQuote   = new Button(this.pageObjects.viewQuote);
    }
    /**
     * Is used to verify that user in AARP Market Place page or not
     * Returns true if AARP Market Place  page is displayed
     * @returns {Promise<Boolean>}
     */
    isAt() {
        return this.continue.isPresentAndDisplayed();
    };

}

module.exports = new AARPMarketPage();