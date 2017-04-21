"use strict";
var ControlBase = require('../controls/base-control');
var PersInfoLocators = require('./perInfo-locators');
var Button = require('../controls/button-control');
var TextBox = require('../controls/textbox-control');
var Label = require('../controls/label-control');
var Select = require('../controls/select-control');


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
        this.fieldCity = new TextBox(this.pageObjects.fieldCity);
        this.errMsgCity = new Label(this.pageObjects.errMsgCity);
        this.fieldState = new TextBox(this.pageObjects.fieldState);
        this.errMsgState = new Label(this.pageObjects.errMsgState);
        this.fieldZipCode = new TextBox(this.pageObjects.fieldZipCode);
         this.fieldAlternateId = new TextBox(this.pageObjects.fieldAlternateId);

        
        this.errMsgZipCode = new Label(this.pageObjects.errMsgZipCode);


        // change to check box
        this.chkBoxDiffMailAddr = new Button(this.pageObjects.chkBoxDiffMailAddr);


        this.fieldPhoneSelect = new TextBox(this.pageObjects.fieldPhoneSelect);
        this.fieldPhoneNumber = new TextBox(this.pageObjects.fieldPhoneNumber);
        this.errMsgPhoneNumber = new Label(this.pageObjects.errMsgPhoneNumber);
        this.fieldEmailAddr = new TextBox(this.pageObjects.fieldEmailAddr);
        this.errMsgEmailAddr = new Label(this.pageObjects.errMsgEmailAddr);


        // change to check box and radio
        this.chkBoxPaperless = new Button(this.pageObjects.chkBoxPaperless);
          // change to Radio box controle
        this.RadBtnBrokerYes = new Button(this.pageObjects.RadBtnBrokerYes);



        this.RadBtnBrokerNo = new TextBox(this.pageObjects.RadBtnBrokerNo);


        //change to link conrols 
        this.linkBackToQuote = new Button(this.pageObjects.linkBackToQuote);

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

    }

    /**
     * Returns true if first  name is displayed or not
     * @returns {Promise<Boolean>}
     */
    isAt() {
        return this.firstName.isPresentAndDisplayed();
    }

}

/**
 *
 * @type {PersonalInfoPage}
 */
module.exports = PersonalInfoPage;
