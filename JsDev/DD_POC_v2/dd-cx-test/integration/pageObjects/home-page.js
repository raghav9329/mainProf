"use strict";
var ControlBase = require('../controls/base-control');
var HomePageLocators = require('./home-locators');
var Button = require('../controls/button-control');
var TextBox = require('../controls/textbox-control');

/**
 * Provides access to the functionality of Personal Info page
 * @constructor
 */
class HomePage extends ControlBase {

    constructor() {
        super(null, 'HomePage');
        this.pageObjects = new HomePageLocators();
        // Home page objects
        this.GetQuote = new Button(this.pageObjects.GetQuote);
        this.ZIPCode = new TextBox(this.pageObjects.ZIPCode);
        this.DOB = new TextBox(this.pageObjects.DOB);
        this.Covered = new TextBox(this.pageObjects.Covered);
        this.Enroll = new Button(this.pageObjects.Enroll);
        this.Go = new Button(this.pageObjects.Go);

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


