"use strict";
var DependentLocators = require('./dependent-locators');
var ControlBase       = require('../../controls/base-control');
var Button            = require('../../controls/button-control');
var TextBox           = require('../../controls/textbox-control');
var Label             = require('../../controls/label-control');
var Select            = require('../../controls/select-control');
var CheckBox          = require('../../controls/checkbox-control');
var RadioButton       = require('../../controls/radiobutton-control');
var LinkText          = require('../../controls/link-control');


/**
 * Provides access to the functionality of Dependent page
 * @constructor
 */
class DependentPage extends ControlBase {

    constructor() {
        super(null, 'DependentPage');
        this.pageObjects              = new DependentLocators();
        this.fieldAddDependents       = new Button(this.pageObjects.addDependent);
        //Server Error Locators
        this.serErrorRelationship     = new Label(this.pageObjects.serErrorRelationship);
        this.serErrorFirstName        = new Label(this.pageObjects.serErrorFirstName);
        this.serErrorLastName         = new Label(this.pageObjects.serErrorLastName);
        this.serErrorGender           = new Label(this.pageObjects.serErrorGender);
        this.serErrorMonth            = new Label(this.pageObjects.serErrorMonth);
        this.serErrorDay              = new Label(this.pageObjects.serErrorDay);
        this.serErrorYear             = new Label(this.pageObjects.serErrorYear);
        this.back                     = new LinkText(this.pageObjects.back);
        this.next                     = new Button(this.pageObjects.next);
        this.premiumChangePopUp       = new Label(this.pageObjects.premiumChangePopUp);
        this.continue                 = new Button(this.pageObjects.continue);
        this.gobackPremiumPopUP       = new Label(this.pageObjects.gobackPremiumPopUP);
        this.newAdditionalPrice       = new Label(this.pageObjects.newAdditionalPrice);
        this.premiumAmount            = new Label(this.pageObjects.premiumAmount);
        this.enrollmentFee            = new Label(this.pageObjects.enrollmentFee);
        this.depError                 = new Label(this.pageObjects.depError);
        this.depPremiumChangepopupTxt = new Label(this.pageObjects.depPremiumChangepopupTxt);
        this.depChildmaxageerror      = new Label(this.pageObjects.depChildmaxageerror);
        this.cancel                   = new Label(this.pageObjects.cancel);
        this.update                   = new Label(this.pageObjects.update);
    }

    /**
     * Is used to verify that user in Dependent page or not
     * Returns true if Dependent page is displayed
     * @returns {Promise<Boolean>}
     */
    isAt() {
        return this.fieldAddDependents.isPresentAndDisplayed();
    };
    /**
     * Returns webelement of first name based on given dependent name
     * @param {String} dependentName dependent name(Ex:Dependent1)
     * @returns {WebElement}
     */
    firstname(dependentName) {
        return new TextBox(this.pageObjects.firstname(dependentName));
    };
    /**
     * Returns webelement of middle name based on given dependent name
     * @param {String} dependentName dependent name(Ex:Dependent1)
     * @returns {WebElement}
     */
    middleName(dependentName) {
        return new TextBox(this.pageObjects.middleName(dependentName));
    };
    /**
     * Returns webelement of last name based on given dependent name
     * @param {String} dependentName dependent name(Ex:Dependent1)
     * @returns {WebElement}
     */
    lastname(dependentName) {
        return new TextBox(this.pageObjects.lastname(dependentName));
    };
    /**
     * Returns webelement of month based on given dependent name
     * @param {String} dependentName dependent name(Ex:Dependent1)
     * @returns {WebElement}
     */
    month(dependentName) {
        return new TextBox(this.pageObjects.month(dependentName));
    };
    /**
     * Returns webelement of date based on given dependent name
     * @param {String} dependentName dependent name(Ex:Dependent1)
     * @returns {WebElement}
     */
    date(dependentName) {
        return new TextBox(this.pageObjects.date(dependentName));
    };
    /**
     * Returns webelement of year based on given dependent name
     * @param {String} dependentName dependent name(Ex:Dependent1)
     * @returns {WebElement}
     */
    year(dependentName) {
        return new TextBox(this.pageObjects.year(dependentName));
    };
    /**
     * Returns webelement of relationship based on given dependent name
     * @param {String} dependentName dependent name(Ex:Dependent1)
     * @returns {WebElement}
     */
    relationship(dependentName) {
        return new Select(this.pageObjects.relationship(dependentName));
    };
    /**
     * Returns webelement of gender based on given dependent name
     * @param {String} dependentName dependent name(Ex:Dependent1)
     * @returns {WebElement}
     */
    gender(dependentName) {
        return new Select(this.pageObjects.gender(dependentName));
    };
    /**
     * Returns webelement of delete button based on given dependent name
     * @param {String} dependentName dependent name(Ex:Dependent1)
     * @returns {WebElement}
     */
    deleteDependent(dependentName) {
        return new Button(this.pageObjects.deleteDependent(dependentName));
    };
    /**
     * Returns webelement of handicapped checkbox based on given dependent name
     * @param {String} dependentName dependent name(Ex:Dependent1)
     * @returns {WebElement}
     */
    isHandicapped(dependentName) {
        return new CheckBox(this.pageObjects.isHandicapped(dependentName));
    };
    /**
     * Returns webelement of handicapped help text based on given dependent name
     * @param {String} dependentName dependent name(Ex:Dependent1)
     * @returns {WebElement}
     */
    handicappedHelpTxt(dependentName) {
        return new Label(this.pageObjects.handicappedHelpTxt(dependentName));
    };
    /**
     * Returns webelement of relationship client error message based on given dependent name
     * @param {String} dependentName dependent name(Ex:Dependent1)
     * @returns {WebElement}
     */
    errorRelationship(dependentName) {
        return new Label(this.pageObjects.errorRelationship(dependentName));
    };
    /**
     * Returns webelement of first name client error message based on given dependent name
     * @param {String} dependentName dependent name(Ex:Dependent1)
     * @returns {WebElement}
     */
    errorFirstName(dependentName) {
        return new Label(this.pageObjects.errorFirstName(dependentName));
    };
    /**
     * Returns webelement of last name client error message based on given dependent name
     * @param {String} dependentName dependent name(Ex:Dependent1)
     * @returns {WebElement}
     */
    errorLastName(dependentName) {
        return new Label(this.pageObjects.errorLastName(dependentName));
    };
    /**
     * Returns webelement of gender client error message based on given dependent name
     * @param {String} dependentName dependent name(Ex:Dependent1)
     * @returns {WebElement}
     */
    errorGender(dependentName) {
        return new Label(this.pageObjects.errorGender(dependentName));
    };
    /**
     * Returns webelement of Month client error message based on given dependent name
     * @param {String} dependentName dependent name(Ex:Dependent1)
     * @returns {WebElement}
     */
    errorMonth(dependentName) {
        return new Label(this.pageObjects.errorMonth(dependentName));
    };
    /**
     * Returns webelement of Day client error message based on given dependent name
     * @param {String} dependentName dependent name(Ex:Dependent1)
     * @returns {WebElement}
     */
    errorDay(dependentName) {
        return new Label(this.pageObjects.errorDay(dependentName));
    };
    /**
     * Returns webelement of Year client error message based on given dependent name
     * @param {String} dependentName dependent name(Ex:Dependent1)
     * @returns {WebElement}
     */
    errorYear(dependentName) {
        return new Label(this.pageObjects.errorYear(dependentName));
    };

    /**
     * Fill dependent information
     * @param {String} dependentname dependent name (Ex:Dependent1)
     * @param {Object}  dependenttestdata dependent test data ("relationship":"","firstName":"","middleName":"","lastName":"",
     *  "gender":"","DOB":"") 
     * @param {Boolean}  boolean
     */
    fillDependent(dependentName, dataObj, skipAddDependent) {

        if (!skipAddDependent) this.fieldAddDependents.click();
        browser.sleep(1000);
        this.relationship(dependentName).selectByText(dataObj.relationship);
        this.firstname(dependentName).setText(dataObj.firstName);
        this.middleName(dependentName).setText(dataObj.middleName);
        this.lastname(dependentName).setText(dataObj.lastName);
        if (!dataObj.gender) this.gender(dependentName).selectByText(dataObj.gender);
        this.month(dependentName).setText(Utility.getDatePart(dataObj.DOB, 'MONTH'));
        this.date(dependentName).setText(Utility.getDatePart(dataObj.DOB, 'DATE'));
        this.year(dependentName).setText(Utility.getDatePart(dataObj.DOB, 'YEAR') + '\t');
    };
    /**
     * Return dependent client side error messages
     * @param {String} dependentname dependent name (Ex:Dependent1)
     * @returns {Promise<Array>} 
     */
    getValidationMessages(dependentName) {
        var promises = [];
        promises.push(this.errorRelationship(dependentName).getText());
        promises.push(this.errorFirstName(dependentName).getText());
        promises.push(this.errorLastName(dependentName).getText());
        promises.push(this.errorMonth(dependentName).getText());
        promises.push(this.errorDay(dependentName).getText());
        promises.push(this.errorYear(dependentName).getText());
        return protractor.promise.all(promises);
    };
    /**
     * Return dependent Server side error messages
     * @returns {Promise<Array>} 
     */
    getServerValidationMessages() {
        var promises = [];
        promises.push(this.serErrorRelationship.getText());
        promises.push(this.serErrorFirstName.getText());
        promises.push(this.serErrorLastName.getText());
        promises.push(this.serErrorMonth.getText());
        promises.push(this.serErrorDay.getText());
        promises.push(this.serErrorYear.getText());
        return protractor.promise.all(promises);
    };

};

/**
 *
 * @type {DependentPage}
 */
module.exports = DependentPage;