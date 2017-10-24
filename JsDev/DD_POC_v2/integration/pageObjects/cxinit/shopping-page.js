"use strict";
var Shoppinglocators = require('./shopping-locators');
var ControlBase = require('../../controls/base-control');
var Button = require('../../controls/button-control');
var TextBox = require('../../controls/textbox-control');
var Label = require('../../controls/label-control');
var Select = require('../../controls/select-control');
var CheckBox = require('../../controls/checkbox-control');
var RadioButton = require('../../controls/radiobutton-control');
var LinkText = require('../../controls/link-control');

/**
 * Provides access to the functionality of Shopping page
 * @constructor
 */
class ShoppingPage extends ControlBase {

    constructor() {
        super(null, 'ShoppingPage');
        this.pageObjects = new Shoppinglocators();
        this.State = new TextBox(this.pageObjects.State);
        this.Zipcode = new TextBox(this.pageObjects.Zipcode);
        this.NoOFCovered = new Select(this.pageObjects.NoOFCovered);
        this.NoOFCovered_getAQuote = new TextBox(this.pageObjects.noofdependents);
        this.Cvgstartdate = new TextBox(this.pageObjects.Effcdate);
        this.Submit = new Button(this.pageObjects.Submit);
        this.Zipcode_error = new Label(this.pageObjects.Zipcode_error);
        this.noofcovered_error = new Label(this.pageObjects.noofcovered_error);
        this.addDependent = new Button(this.pageObjects.addDependent);
        this.removeDependent = new Button(this.pageObjects.removeDependent);
        this.Showplans = new Button(this.pageObjects.Showplans);
        this.serverErrMsgnoofCovered = new Label(this.pageObjects.serverErrMsgnoofCovered);
        this.serverErrMsgZipcode = new Label(this.pageObjects.serverErrMsgZipcode);
        }
};

/**
 *
 * @type {ShoppingPage}
 */
module.exports = ShoppingPage;
