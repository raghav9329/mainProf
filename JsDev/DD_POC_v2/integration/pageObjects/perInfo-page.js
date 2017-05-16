"use strict";
var ControlBase = require('../controls/base-control');
var PersInfoLocators = require('./perInfo-locators');
var Button = require('../controls/button-control');
var TextBox = require('../controls/textbox-control');
var Label = require('../controls/label-control');
var Select = require('../controls/select-control');
var CheckBox = require('../controls/checkbox-control');
var RadioButton = require('../controls/radiobutton-control');



/**
 * Provides access to the functionality of Personal Info page
 * @constructor
 */
class PersonalInfoPage extends ControlBase {

    constructor() {
        super(null, 'PersonalInfoPage');
        this.pageObjects = new PersInfoLocators();

        this.fieldFirstName = new TextBox(this.pageObjects.fieldFirstName);
        this.errMsgFirstName = new Label(this.pageObjects.errMsgFirstName);
        this.fieldMidInitial = new TextBox(this.pageObjects.fieldMidInitial);
        this.fieldLastName = new TextBox(this.pageObjects.fieldLastName);
        this.errMsgLastName = new Label(this.pageObjects.errMsgLastName);
        this.fieldGenderSelect = new Select(this.pageObjects.fieldGenderSelect);
        this.errMsgGenderSelect = new Label(this.pageObjects.errMsgGenderSelect);
        this.fieldBdMM = new TextBox(this.pageObjects.fieldBdMM);
        this.errMsgBdMM = new Label(this.pageObjects.errMsgBdMM);
        this.fieldBdDD = new TextBox(this.pageObjects.fieldBdDD);
        this.errMsgBdDD = new Label(this.pageObjects.errMsgBdDD);
        this.fieldBdYyyy = new TextBox(this.pageObjects.fieldBdYyyy);
        this.errMsgBdYyyy = new Label(this.pageObjects.errMsgBdYyyy);
        this.errBirthDate = new Label(this.pageObjects.errBirthDate);
        this.fieldSsn = new TextBox(this.pageObjects.fieldSsn);
        this.errMsgSsn = new Label(this.pageObjects.errMsgSsn);
         this.fieldHomeAddr = new TextBox(this.pageObjects.fieldHomeAddr);
        this.errMsgHomeAddr = new Label(this.pageObjects.errMsgHomeAddr);
        this.errinvalidAddr = new Label(this.pageObjects.errinvalidAddr);
       this.fieldCity = new TextBox(this.pageObjects.fieldCity);
        this.errMsgCity = new Label(this.pageObjects.errMsgCity);
        this.fieldState = new TextBox(this.pageObjects.fieldState);
        this.errMsgState = new Label(this.pageObjects.errMsgState);
        this.fieldZipCode = new TextBox(this.pageObjects.fieldZipCode);
        this.fieldAlternateId = new TextBox(this.pageObjects.fieldAlternateId);
        this.errMsgZipCode = new Label(this.pageObjects.errMsgZipCode);
        // change to check box
        this.chkBoxDiffMailAddr = new CheckBox(this.pageObjects.chkBoxDiffMailAddr);
        this.fieldPhoneSelect = new Select(this.pageObjects.fieldPhoneSelect);
        this.fieldPhoneNumber = new TextBox(this.pageObjects.fieldPhoneNumber);
        this.errMsgPhoneNumber = new Label(this.pageObjects.errMsgPhoneNumber);
        this.fieldEmailAddr = new TextBox(this.pageObjects.fieldEmailAddr);
        this.errMsgEmailAddr = new Label(this.pageObjects.errMsgEmailAddr);
        this.chkBoxPaperless = new CheckBox(this.pageObjects.chkBoxPaperless);
        this.RadBtnBrokerYes = new RadioButton(this.pageObjects.RadBtnBrokerYes);
        this.RadBtnBrokerNo = new RadioButton(this.pageObjects.RadBtnBrokerNo);
        //change to link conrols 
        this.zipPopNewQuote = new Button(this.pageObjects.zipPopNewQuote);
        this.zipPopBack = new Button(this.pageObjects.zipPopBack);
        this.zipPopUp =new Label(this.pageObjects.zipPopUp);
        this.Next = new Button(this.pageObjects.persPageButtonNext);
        this.allerrMsg = new Label(this.pageObjects.allerrMsg);
        this.hiddenfieldMailAddr = new TextBox(this.pageObjects.hiddenfieldMailAddr);
        this.errMsghiddenfieldMailAddr = new Label(this.pageObjects.errMsghiddenfieldMailAddr);
        this.hiddenfieldCity = new TextBox(this.pageObjects.hiddenfieldCity);
        this.errMsghiddenfieldCity = new Label(this.pageObjects.errMsghiddenfieldCity);
        this.hiddenfieldState = new TextBox(this.pageObjects.hiddenfieldState);
        this.errMsghiddenfieldState = new Label(this.pageObjects.errMsghiddenfieldState);
        this.hiddenfieldZipCode = new TextBox(this.pageObjects.hiddenfieldZipCode);
        this.errMsghiddenfieldZipCode = new Label(this.pageObjects.errMsghiddenfieldZipCode);
        this.hiddenfieldBrokerNum = new TextBox(this.pageObjects.hiddenfieldBrokerNum);
        this.errMsghiddenfieldBrokerNum = new Label(this.pageObjects.errMsghiddenfieldBrokerNum);
        this.whatIsThis = new Label(this.pageObjects.whatIsThis);
        this.brokerHelpText = new Label(this.pageObjects.brokerHelpText);
        this.hiddenbrokerName = new TextBox(this.pageObjects.hiddenbrokerName);
        this.homeAddressfromGoogleApi = new Label(this.pageObjects.homeAddressfromGoogleApi);
        this.birthdateerror = new Label(this.pageObjects.birthdateerror);


        this.serverErrMsgFirstName = new Label(this.pageObjects.serverErrMsgFirstName);
        this.serverErrMsgLastName = new Label(this.pageObjects.serverErrMsgLastName);
        this.serverErrMsgGenderSelect = new Label(this.pageObjects.serverErrMsgGenderSelect);
        this.serverErrMsgSsn = new Label(this.pageObjects.serverErrMsgSsn);
        this.serverErrMsgStreetAddress = new Label(this.pageObjects.serverErrMsgStreetAddress);
        this.serverErrMsgCity = new Label(this.pageObjects.serverErrMsgCity);
        this.serverErrMsgState = new Label(this.pageObjects.serverErrMsgState);
        this.serverErrMsgZipCode = new Label(this.pageObjects.serverErrMsgZipCode);
        this.serverErrMsgMonth = new Label(this.pageObjects.serverErrMsgMonth);
        this.serverErrMsgDay = new Label(this.pageObjects.serverErrMsgDay);
        this.serverErrMsgYear = new Label(this.pageObjects.serverErrMsgYear);
        this.serverErrMsgContactNumber = new Label(this.pageObjects.serverErrMsgContactNumber);
        this.serverErrMsgMailingAddress = new Label(this.pageObjects.serverErrMsgMailingAddress);
        this.serverErrMsgMailingCity = new Label(this.pageObjects.serverErrMsgMailingCity);
        this.serverErrMsgMailingState = new Label(this.pageObjects.serverErrMsgMailingState);
        this.serverErrMsgMailingZip = new Label(this.pageObjects.serverErrMsgMailingZip);
    }

    /**
     * Returns true if first  name is displayed or not
     * @returns {Promise<Boolean>}
     */
    isAt() {
        return this.firstName.isPresentAndDisplayed();
    }

    selectHomeAddress(homeaddress) {
        var self = this;
        return browser.controlFlow().execute(function() {
            browser.sleep(2000);
            return self.homeAddressfromGoogleApi.getElements().filter(function(elem, index) {
                return elem.getText().then(function(text) {
                    // console.log("text=========" + text);
                    // console.log("homeaddress==" + homeaddress);
                    return text === homeaddress;
                });
            }).first().clickIt();
        });
    };

    getandVerifyallAddressSuggestions(ptext) {
        var dataarray = [];
        var self = this;
        return browser.controlFlow().execute(function() {
            return self.homeAddressfromGoogleApi.getElements().each(function(element, index) {
                return element.getText().then(function(text) {
                    expect(text).toContain(ptext);
                    return dataarray.push(text);
                });

            }).then(function(data) {
                return dataarray;
            })

        });
    };

    fillPersonalInfo(perinfo) {
        var self = this;
        return browser.controlFlow().execute(function() {
            self.fieldFirstName.setText(perinfo.firstname);
            self.fieldMidInitial.setText(perinfo.mi);
            self.fieldLastName.setText(perinfo.lastname);
            self.fieldGenderSelect.selectByText(perinfo.gender);
            var d = perinfo.dob;
            var datesplit = (d.split('-'))
            self.fieldBdMM.setText(datesplit[0]);
            self.fieldBdDD.setText(datesplit[1]);
            self.fieldBdYyyy.setText(datesplit[2]);
            self.fieldSsn.setText(perinfo.ssn);
            if (!perinfo.alternateid) self.fieldAlternateId.setText(perinfo.alternateid);
        });
    }

    fillAddress(address) {

    }

    fillMailingAddress(mailadd) {

    }

};

/**
 *
 * @type {PersonalInfoPage}
 */
module.exports = PersonalInfoPage;
