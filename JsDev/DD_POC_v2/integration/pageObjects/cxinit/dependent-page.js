"use strict";
var DependentLocators = require('./dependent-locators');
var ControlBase = require('../../controls/base-control');
var Button = require('../../controls/button-control');
var TextBox = require('../../controls/textbox-control');
var Label = require('../../controls/label-control');
var Select = require('../../controls/select-control');
var CheckBox = require('../../controls/checkbox-control');
var RadioButton = require('../../controls/radiobutton-control');
var LinkText = require('../../controls/link-control');

/**
 * Provides access to the functionality of Dependent page
 * @constructor
 */
class DependentPage extends ControlBase {

    constructor() {
        super(null, 'DependentPage');
        this.pageObjects = new DependentLocators();
        this.fieldAddDependents = new Button(this.pageObjects.addDependent);
        //Server Error Locators
        this.serErrorRelationship = new Label(this.pageObjects.serErrorRelationship);
        this.serErrorFirstName = new Label(this.pageObjects.serErrorFirstName);
        this.serErrorLastName = new Label(this.pageObjects.serErrorLastName);
        this.serErrorGender = new Label(this.pageObjects.serErrorGender);
        this.serErrorMonth = new Label(this.pageObjects.serErrorMonth);
        this.serErrorDay = new Label(this.pageObjects.serErrorDay);
        this.serErrorYear = new Label(this.pageObjects.serErrorYear);

        this.back = new LinkText(this.pageObjects.back);
        this.next = new Button(this.pageObjects.next);

        this.premiumChangePopUp = new Label(this.pageObjects.premiumChangePopUp);
        this.continue = new Button(this.pageObjects.continue);
        this.gobackPremiumPopUP = new Label(this.pageObjects.gobackPremiumPopUP);
        this.newAdditionalPrice = new Label(this.pageObjects.newAdditionalPrice);

        this.premiumAmount = new Label(this.pageObjects.premiumAmount);
        this.enrollmentFee = new Label(this.pageObjects.enrollmentFee);
        this.depError = new Label(this.pageObjects.depError);



    }

    /**
     * Returns true if Add Dependent is displayed or not
     * @returns {Promise<Boolean>}
     */
    isAt() {
        return this.fieldAddDependents.isPresentAndDisplayed();
    };

    firstname(dependentName) {
        return new TextBox(this.pageObjects.firstname(dependentName));
    };

    middleName(dependentName) {
        return new TextBox(this.pageObjects.middleName(dependentName));
    };

    lastname(dependentName) {
        return new TextBox(this.pageObjects.lastname(dependentName));
    };

    month(dependentName) {
        return new TextBox(this.pageObjects.month(dependentName));
    };

    date(dependentName) {
        return new TextBox(this.pageObjects.date(dependentName));
    };

    year(dependentName) {
        return new TextBox(this.pageObjects.year(dependentName));
    };
    relationship(dependentName) {
        return new Select(this.pageObjects.relationship(dependentName));
    };
    gender(dependentName) {
        return new Select(this.pageObjects.gender(dependentName));
    };
    deleteDependent(dependentName) {
        return new Button(this.pageObjects.deleteDependent(dependentName));
    };
    isHandicapped(dependentName) {
        return new CheckBox(this.pageObjects.isHandicapped(dependentName));
    };
    handicappedHelpTxt(dependentName) {
        return new Label(this.pageObjects.handicappedHelpTxt(dependentName));
    };
    errorRelationship(dependentName) {
        return new Label(this.pageObjects.errorRelationship(dependentName));
    };
    errorFirstName(dependentName) {
        return new Label(this.pageObjects.errorFirstName(dependentName));
    };
    errorLastName(dependentName) {
        return new Label(this.pageObjects.errorLastName(dependentName));
    };
    errorGender(dependentName) {
        return new Label(this.pageObjects.errorGender(dependentName));
    };
    errorMonth(dependentName) {
        return new Label(this.pageObjects.errorMonth(dependentName));
    };
    errorDay(dependentName) {
        return new Label(this.pageObjects.errorDay(dependentName));
    };
    errorYear(dependentName) {
        return new Label(this.pageObjects.errorYear(dependentName));
    };


    // Please donot delete commented code. We have an issue while building child locator based on Parent Locator


    // middleName(dep) {
    //     return element(this.pageObjects.dependentparent(dep)).element(this.pageObjects.middleName);
    // };

    // lastname(dep) {
    //     return element(this.pageObjects.dependentparent(dep)).element(this.pageObjects.lastname);
    // };

    // month(dep) {
    //     return element(this.pageObjects.dependentparent(dep)).element(this.pageObjects.month);
    // };

    // day(dep) {
    //     return element(this.pageObjects.dependentparent(dep)).element(this.pageObjects.day);
    // };

    // year(dep) {
    //     return element(this.pageObjects.dependentparent(dep)).element(this.pageObjects.year);
    // };
    // relationship(dep) {
    //     return element(this.pageObjects.dependentparent(dep)).element(this.pageObjects.relationship);
    // };
    // gender(dep) {
    //     return element(this.pageObjects.dependentparent(dep)).element(this.pageObjects.gender);
    // };

    fillDependent(dependentName, dataObj, skipAddDependent) {
        if (!skipAddDependent) this.fieldAddDependents.click();
        browser.sleep(1000);
        this.relationship(dependentName).selectByText(dataObj.relationship);
        this.firstname(dependentName).setText(dataObj.firstName);
        this.middleName(dependentName).setText(dataObj.middleName);
        this.lastname(dependentName).setText(dataObj.lastName);
        this.gender(dependentName).selectByText(dataObj.gender);
        this.month(dependentName).setText(Utility.getDatePart(dataObj.DOB, 'MONTH'));
        this.date(dependentName).setText(Utility.getDatePart(dataObj.DOB, 'DATE'));
        this.year(dependentName).setText(Utility.getDatePart(dataObj.DOB, 'YEAR'));
    };

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
