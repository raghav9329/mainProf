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
        this.headerContent = new Label(this.pageObjects.headerContent);
        this.back = new Button(this.pageObjects.back);
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
        this.serverErrMsgInvalidZipcode = new Label(this.pageObjects.serverErrMsgInvalidZipcode);
        this.zipCodeserverError = new Label(this.pageObjects.zipCodeserverError);
        this.fieldBdMM = new TextBox(this.pageObjects.fieldBdMM);
        this.fieldBdDD = new TextBox(this.pageObjects.fieldBdDD);
        this.fieldBdYyyy = new TextBox(this.pageObjects.fieldBdYyyy);
        this.appErrorMsgs = new Label(this.pageObjects.appErrorMsgs);

    }

    isAt() {
        return this.headerContent.getText().then(function(header) {
            return header == 'Get-a-Quote';
        })
    };

    dateOfBirthValidation(dependentName) {
        var promises = [];
        promises.push(this.dependenterrorfieldDBMM(dependentName).getText());
        promises.push(this.dependenterrorfieldDBDD(dependentName).getText());
        promises.push(this.dependenterrorfieldDBYY(dependentName).getText());
        return protractor.promise.all(promises);
    };

    dependentfieldDBMM(dependentName) {
        return new TextBox(this.pageObjects.dependentfieldDBMM(dependentName));
    };
    dependentfieldDBDD(dependentName) {
        return new TextBox(this.pageObjects.dependentfieldDBDD(dependentName));
    };
    dependentfieldDBYY(dependentName) {
        return new TextBox(this.pageObjects.dependentfieldDBYY(dependentName));
    };

dependenterrorfieldDBMM(dependentName) {
        return new TextBox(this.pageObjects.dependenterrorfieldDBMM(dependentName));
    };
    dependenterrorfieldDBDD(dependentName) {
        return new TextBox(this.pageObjects.dependenterrorfieldDBDD(dependentName));
    };
    dependenterrorfieldDBYY(dependentName) {
        return new TextBox(this.pageObjects.dependenterrorfieldDBYY(dependentName));
    };


    addDependentDob(Dependent, datepart, date, dependentaddition) {
        var self = this;
        if (dependentaddition) this.addDependent.click();

        var d = date
        var datesplit = (d.split('-'))
        switch (datepart.toUpperCase()) {
            case 'MONTH':
            this.dependentfieldDBMM(Dependent).setText(datesplit[0])
            break;

            case 'DAY':
            this.dependentfieldDBDD(Dependent).setText(datesplit[1]);
            break;

            case 'YEAR':
            this.dependentfieldDBYY(Dependent).setText(datesplit[2]);
            break;

            default:
            this.dependentfieldDBMM(Dependent).setText(datesplit[0]);
            this.dependentfieldDBDD(Dependent).setText(datesplit[1]);
            this.dependentfieldDBYY(Dependent).setText(datesplit[2]);

        }
    };
};

/**
 *
 * @type {ShoppingPage}
 */
module.exports = ShoppingPage;
