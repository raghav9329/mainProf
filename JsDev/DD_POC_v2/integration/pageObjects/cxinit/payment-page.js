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
        this.pageObjects                = new PaymentLocators();
        this.nameOnCard                 = new TextBox(this.pageObjects.nameOnCard);
        this.cardNumber                 = new TextBox(this.pageObjects.cardNumber);
        this.expMonth                   = new TextBox(this.pageObjects.expMonth);
        this.expYear                    = new TextBox(this.pageObjects.expYear);
        this.securityCode               = new TextBox(this.pageObjects.securityCode);
        this.billingChkBox              = new CheckBox(this.pageObjects.billingChkBox);
        this.billingAddress             = new Label(this.pageObjects.billingAddress);
        this.streetAddress              = new TextBox(this.pageObjects.streetAddress);
        this.city                       = new TextBox(this.pageObjects.city);
        this.state                      = new TextBox(this.pageObjects.state);
        this.zipCode                    = new TextBox(this.pageObjects.zipCode);
        this.saveAddress                = new CheckBox(this.pageObjects.saveAddress);
        this.authChkBox                 = new CheckBox(this.pageObjects.authChkBox);
        this.eCopy                      = new RadioButton(this.pageObjects.eCopy);
        this.mailedCopy                 = new RadioButton(this.pageObjects.mailedCopy);
        this.openPlanSummary            = new Label(this.pageObjects.openPlanSummary);
        this.openApplicant              = new Label(this.pageObjects.openApplicant);
        this.summaryTotalPrice          = new Label(this.pageObjects.summaryTotalPrice);
        this.totalPremium               = new Label(this.pageObjects.totalPremium);
        this.totalEnrolementFee         = new Label(this.pageObjects.totalEnrolementFee);
        this.purchaseNow                = new Button(this.pageObjects.purchaseNow);
        this.purchaseNowText            = new Label(this.pageObjects.purchaseNowText);
        this.back                       = new LinkText(this.pageObjects.Back);
        this.errNameOnCard              = new Label(this.pageObjects.errNameOnCard);
        this.errCardNumber              = new Label(this.pageObjects.errCardNumber);
        this.errExpMonth                = new Label(this.pageObjects.errExpMonth);
        this.errExpYear                 = new Label(this.pageObjects.errExoYear);
        this.errSecurityCode            = new Label(this.pageObjects.errSecurityCode);
        this.errStreetAddress           = new Label(this.pageObjects.errStreetAddress);
        this.errCity                    = new Label(this.pageObjects.errCity);
        this.errState                   = new Label(this.pageObjects.errState);
        this.errZipCode                 = new Label(this.pageObjects.errZipCode);
        this.errAuth                    = new Label(this.pageObjects.errAuth);
        this.serErrCardName             = new Label(this.pageObjects.serErrCardName);
        this.serErrCardNumber           = new Label(this.pageObjects.serErrCardNumber);
        this.serErrExpMonth             = new Label(this.pageObjects.serErrExpMonth);
        this.serErrExpYear              = new Label(this.pageObjects.serErrExpYear);
        this.serErrSecurityCode         = new Label(this.pageObjects.serErrSecurityCode);
        this.serErrAuth                 = new Label(this.pageObjects.serErrAuth);
        this.serErrStreetAddress        = new Label(this.pageObjects.serErrStreetAddress);
        this.serErrCity                 = new Label(this.pageObjects.serErrCity);
        this.serErrState                = new Label(this.pageObjects.serErrState);
        this.serErrZipCode              = new Label(this.pageObjects.serErrZipCode);
        this.homeAddressfromGoogleApi   = new Label(this.pageObjects.homeAddressfromGoogleApi);
        this.serErrCvv                  = new Label(this.pageObjects.serErrCvv);
        this.EFTBankTransfer            = new RadioButton(this.pageObjects.EFTBankTransfer);
        this.checking                   = new RadioButton(this.pageObjects.checking);
        this.saving                     = new RadioButton(this.pageObjects.saving);
        this.bankName                   = new TextBox(this.pageObjects.bankName);
        this.accountHolderName          = new TextBox(this.pageObjects.accountHolderName);
        this.routingNumber              = new TextBox(this.pageObjects.routingNumber);
        this.accountNumberToolTipText   = new Label(this.pageObjects.accountNumberToolTipText);
        this.accountNumber              = new TextBox(this.pageObjects.accountNumber);
        this.routingNumberToolTipText   = new Label(this.pageObjects.routingNumberToolTipText);
        this.accountNumberRetype        = new TextBox(this.pageObjects.accountNumberRetype);
        this.frequencySemiAnnual        = new RadioButton(this.pageObjects.frequencySemiAnnual);
        this.frequencyQuterly           = new RadioButton(this.pageObjects.frequencyQuterly);
        this.frequencyAnnualy           = new RadioButton(this.pageObjects.frequencyAnnualy);
        this.bankNameError              = new Label(this.pageObjects.bankNameError);
        this.accountHolderNameError     = new Label(this.pageObjects.accountHolderNameError);
        this.routingNumberError         = new Label(this.pageObjects.routingNumberError);
        this.accountNumberError         = new Label(this.pageObjects.accountNumberError);
        this.discloser                  = new Label(this.pageObjects.discloser);
        this.authorizetxt               = new Label(this.pageObjects.authorizetxt);
        this.paymentagreementTxt        = new Label(this.pageObjects.paymentagreementTxt);
        this.disclouserFormOption1      = new Label(this.pageObjects.disclouserFormOption1);
        this.disclouserFormOption2      = new Label(this.pageObjects.disclouserFormOption2);
        this.refundCCpaymentsTxt        = new Label(this.pageObjects.refundCCpaymentsTxt);
        this.paymentAuthorizationTxt    = new Label(this.pageObjects.paymentAuthorizationTxt);
        this.enrollmentfeeTxt           = new Label(this.pageObjects.enrollmentfeeTxt);
        this.discloserTxt               = new Label(this.pageObjects.discloserTxt);
        this.chargesAgreemetTxt         = new Label(this.pageObjects.chargesAgreemetTxt);
        this.billingFreqmonthlyTxt      = new Label(this.pageObjects.billingFreqmonthlyTxt);
        this.billingFreqQuarterlyTxt    = new Label(this.pageObjects.billingFreqQuarterlyTxt);
        this.billingFreqSemiAnnuallyTxt = new Label(this.pageObjects.billingFreqSemiAnnuallyTxt);
        this.billingFreqAnnuallyTxt     = new Label(this.pageObjects.billingFreqAnnuallyTxt);
        this.billingStreetaddressTxt    = new Label(this.pageObjects.billingStreetaddressTxt);
        this.billingLocalityTxt         = new Label(this.pageObjects.billingLocalityTxt);
        this.routing_no_link            = new Button(this.pageObjects.routing_no_link);
        this.acc_no_link                = new Button(this.pageObjects.acc_no_link);
        this.routing_close              = new Button(this.pageObjects.routing_close);
        this.account_Close              = new Button(this.pageObjects.account_Close);
    };
    /**
     * Is used to verify that user in Payment page or not
     * Returns true if Payment page is displayed
     * @returns {Promise<Boolean>}
     */
    isAt() {
        return this.nameOnCard.isPresentAndDisplayed();
    };
    /**
     * Returns webelement of plan option based on given plan option
     * @param {String} planoption plan option
     * @returns {WebElement}
     */
    getPlanSummaryByKey(summaryKey) {
        return new Label(this.pageObjects.planSummaryValue(summaryKey));
    };
    /**
     * Fills payment information
     * @param {Object} paymentinformation {"nameOnCard":"","cardNumber":"","expMonth":"","expYear":"","securityCode":""}
     * @param {Boolean} authChkBox if false, checks auth checkbox
     * @returns {WebElement}
     */
    fillpayment(paymentData, skipAuthChecked) {
        var self = this;
        self.nameOnCard.setText(paymentData.nameOnCard);
        self.cardNumber.setText(paymentData.cardNumber);
        self.expMonth.setText(paymentData.expMonth);
        self.expYear.setText(paymentData.expYear);
        self.securityCode.setText(paymentData.securityCode);
        if (!skipAuthChecked) self.authChkBox.check();
    };
    /**
     * Fills Bank Details
     * @param {Object} bankdetails {"bankName":"","accountHolderName":"","routingNumber":"","accountNumber":"","accountNumberRetype":""}
     */
    fillBankDetails(bankData) {
        this.routing_no_link.click();
        expect(this.routingNumberToolTipText.getText()).toContain('13');
        this.routing_close.click();
        this.acc_no_link.click();
        expect(this.accountNumberToolTipText.getText()).toContain('17');
        this.account_Close.click();
        this.bankName.setText(bankData.bankName);
        this.accountHolderName.setText(bankData.accountHolderName);
        this.routingNumber.setText(bankData.routingNumber);

        this.accountNumber.setText(bankData.accountNumber);

        this.accountNumberRetype.setText(bankData.accountNumberRetype);
    };
    /**
     * Returns Credit card Client  validation messages 
     * @returns {Promise<Array>} errmsgarray CC client Validation Messages
     */
    getCCValidationMessages() {
        var promises = [];
        promises.push(this.errNameOnCard.getText());
        promises.push(this.errCardNumber.getText());
        promises.push(this.errExpMonth.getText());
        promises.push(this.errExpYear.getText());
        promises.push(this.errSecurityCode.getText());
        return protractor.promise.all(promises);
    };
    /**
     * Returns Billing address Client validation messages 
     * @returns {Promise<Array>} errmsgarray Billing Client validation messages
     */
    getBillingAddressValidationMessages() {
        var promises = [];
        promises.push(this.errStreetAddress.getText());
        promises.push(this.errCity.getText());
        promises.push(this.errState.getText());
        promises.push(this.errZipCode.getText());
        return protractor.promise.all(promises);
    };
    /**
     * Returns Credit card Server  validation messages 
     * @returns {Promise<Array>} errmsgarray CC Server Validation Messages
     */
    getCCServerValidationMessages() {
        var promises = [];
        promises.push(this.serErrCardName.getText());
        promises.push(this.serErrCardNumber.getText());
        promises.push(this.serErrExpMonth.getText());
        promises.push(this.serErrExpYear.getText());
        promises.push(this.serErrSecurityCode.getText());
        return protractor.promise.all(promises);
    };
    /**
     * Returns Billing address Client validation messages 
     * @returns {Promise<Array>} errmsgarray Billing Client validation messages
     */
    getBillingAddressServerValidationMessages() {
        var promises = [];
        promises.push(this.serErrStreetAddress.getText());
        promises.push(this.serErrCity.getText());
        promises.push(this.serErrState.getText());
        promises.push(this.serErrZipCode.getText());
        return protractor.promise.all(promises);
    };
    /**
     * Selects Home address based on provided address 
     * @param {String} homeaddress Home address to select from home address text field
     */
    selectHomeAddress(homeaddress) {
        var self = this;
        return browser.controlFlow().execute(function() {
            browser.sleep(3000);
            return self.homeAddressfromGoogleApi.getElements().filter(function(elem, index) {
                return elem.getText().then(function(text) {
                    // console.log("text=========" + text);
                    // console.log("homeaddress==" + homeaddress);
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