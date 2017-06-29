"use strict";
var PaymentLocators = require('./payment-locators');
var ControlBase = require('../../controls/base-control');
var Button = require('../../controls/button-control');
var TextBox = require('../../controls/textbox-control');
var Label = require('../../controls/label-control');
var Select = require('../../controls/select-control');
var CheckBox = require('../../controls/checkbox-control');
var RadioButton = require('../../controls/radiobutton-control');
var LinkText = require('../../controls/link-control');


/**
 * Provides access to the functionality of PaymentPage
 * @constructor
 */
class PaymentPage extends ControlBase {
    constructor() {
        super(null, 'PaymentPage');
        this.pageObjects = new PaymentLocators();
        this.nameOnCard = new TextBox(this.pageObjects.nameOnCard);
        this.cardNumber = new TextBox(this.pageObjects.cardNumber);
        this.expMonth = new TextBox(this.pageObjects.expMonth);
        this.expYear = new TextBox(this.pageObjects.expYear);
        this.securityCode = new TextBox(this.pageObjects.securityCode);
        this.billingChkBox = new CheckBox(this.pageObjects.billingChkBox);
        this.streetAddress = new TextBox(this.pageObjects.streetAddress);
        this.city = new TextBox(this.pageObjects.city);
        this.state = new TextBox(this.pageObjects.state);
        this.zipCode = new TextBox(this.pageObjects.zipCode);
        this.saveAddress = new CheckBox(this.pageObjects.saveAddress);
        this.authChkBox = new CheckBox(this.pageObjects.authChkBox);
        this.eCopy = new RadioButton(this.pageObjects.eCopy);
        this.mailedCopy = new RadioButton(this.pageObjects.mailedCopy);
        this.openPlanSummary = new Label(this.pageObjects.openPlanSummary);
        this.openApplicant = new Label(this.pageObjects.openApplicant);
        this.summaryTotalPrice = new Label(this.pageObjects.summaryTotalPrice);
        this.totalPremium = new Label(this.pageObjects.totalPremium);
        this.totalEnrolementFee = new Label(this.pageObjects.totalEnrolementFee);
        this.purchaseNow = new Button(this.pageObjects.purchaseNow);
        this.back = new LinkText(this.pageObjects.Back);
        this.errNameOnCard = new Label(this.pageObjects.errNameOnCard);
        this.errCardNumber = new Label(this.pageObjects.errCardNumber);
        this.errExpMonth = new Label(this.pageObjects.errExpMonth);
        this.errExpYear = new Label(this.pageObjects.errExoYear);
        this.errSecurityCode = new Label(this.pageObjects.errSecurityCode);
        this.errStreetAddress = new Label(this.pageObjects.errStreetAddress);
        this.errCity = new Label(this.pageObjects.errCity);
        this.errState = new Label(this.pageObjects.errState);
        this.errZipCode = new Label(this.pageObjects.errZipCode);
        this.errAuth = new Label(this.pageObjects.errAuth);
        this.serErrCardName = new Label(this.pageObjects.serErrCardName);
        this.serErrCardNumber = new Label(this.pageObjects.serErrCardNumber);
        this.serErrExpMonth = new Label(this.pageObjects.serErrExpMonth);
        this.serErrExpYear = new Label(this.pageObjects.serErrExpYear);
        this.serErrSecurityCode = new Label(this.pageObjects.serErrSecurityCode);
        this.serErrAuth = new Label(this.pageObjects.serErrAuth);
        this.serErrStreetAddress = new Label(this.pageObjects.serErrStreetAddress);
        this.serErrCity = new Label(this.pageObjects.serErrCity);
        this.serErrState = new Label(this.pageObjects.serErrState);
        this.serErrZipCode = new Label(this.pageObjects.serErrZipCode);
        this.homeAddressfromGoogleApi = new Label(this.pageObjects.homeAddressfromGoogleApi);
        this.serErrCvv = new Label(this.pageObjects.serErrCvv);
    };
    /**
     * Returns true if name on card is displayed or not
     * @returns {Promise<Boolean>}
     */
    isAt() {
        return this.nameOnCard.isPresentAndDisplayed();
    };
    getPlanSummaryByKey(summaryKey) {
        return new Label(this.pageObjects.planSummaryValue(summaryKey));
    };

    fillpayment(paymentData, skipAuthChecked) {
        var self = this;
        self.nameOnCard.setText(paymentData.nameOnCard);
        self.cardNumber.setText(paymentData.cardNumber);
        self.expMonth.setText(paymentData.expMonth);
        self.expYear.setText(paymentData.expYear);
        self.securityCode.setText(paymentData.securityCode);
       // if (!isAuthChecked) self.authChkBox.check();
//////////////////////////////////////////////////////////////////////        
// The following is necessary due to the nature of the check box control.
// Fill payment must be considered a will always complete kind of task
// Not a task that has options to consider, and maybe not complete
// It sets Text by force ( within reason )
// IT makesure sure the auth box has a checkmark.
//////////////////////////////////////////////////////////////////////
        
       self.authChkBox.check();
       self.authChkBox.check();
       self.authChkBox.check();
    };

    getCCValidationMessages() {
        var promises = [];
        promises.push(this.errNameOnCard.getText());
        promises.push(this.errCardNumber.getText());
        promises.push(this.errExpMonth.getText());
        promises.push(this.errExpYear.getText());
        promises.push(this.errSecurityCode.getText());
        return protractor.promise.all(promises);
    };
    getBillingAddressValidationMessages() {
        var promises = [];
        promises.push(this.errStreetAddress.getText());
        promises.push(this.errCity.getText());
        promises.push(this.errState.getText());
        promises.push(this.errZipCode.getText());
        return protractor.promise.all(promises);
    };
    getCCServerValidationMessages() {
        var promises = [];
        promises.push(this.serErrCardName.getText());
        promises.push(this.serErrCardNumber.getText());
        promises.push(this.serErrExpMonth.getText());
        promises.push(this.serErrExpYear.getText());
        promises.push(this.serErrSecurityCode.getText());
        return protractor.promise.all(promises);
    };
    getBillingAddressServerValidationMessages() {
        var promises = [];
        promises.push(this.serErrStreetAddress.getText());
        promises.push(this.serErrCity.getText());
        promises.push(this.serErrState.getText());
        promises.push(this.serErrZipCode.getText());
        return protractor.promise.all(promises);
    };

    selectHomeAddress(homeaddress) {
        var self = this;
        return browser.controlFlow().execute(function() {
            browser.sleep(3000);
            return self.homeAddressfromGoogleApi.getElements().filter(function(elem, index) {
                return elem.getText().then(function(text) {
                    console.log("text=========" + text);
                    console.log("homeaddress==" + homeaddress);
                    return text === homeaddress;
                });
            }).first().clickIt();
        });
    };

};

/**
 *
 * @type {PaymentPage}
 */
module.exports = PaymentPage;
