"use strict";

class PersonalInfoPageLocators {
    constructor() {
        // Personal info page objects
        // this.firstName = by.id('firstName');
        // this.errMsgFirstName = by.id('firstName-error');
        // this.midInitial = by.id('middleName');
        // this.lastName = by.id('lastName');
        // this.next = by.id('nextButton');



    this.fieldFirstName = by.id('firstName');
    this.errMsgFirstName = by.id('firstName-error');
    this.fieldMidInitial = by.id('middleName');
    this.fieldLastName = by.id('lastName');
    this.errMsgLastName = by.id('lastName-error');
    this.fieldGenderSelect = by.id('gender');
    this.errMsgGenderSelect = by.id('gender-error');
    this.fieldBdMM = by.id('month');
    this.errMsgBdMM = by.id('month-error');
    this.fieldBdDD = by.id('day');
    this.errMsgBdDD = by.id('day-error');
    this.fieldBdYyyy = by.id('year');
    this.errMsgBdYyyy = by.id('year-error');
     this.errBirthDate = by.css('label.error.birthdate-error');
    this.fieldSsn = by.id('ssn');
    this.errMsgSsn = by.id('ssn-error');
    this.fieldHomeAddr = by.id('streetAddress');
    this.fieldAlternateId = by.id('alt_id');
    this.errMsgHomeAddr = by.id('streetAddress-error');
    this.errinvalidAddr=by.css('label.error.cleanse-ajax-error')
    this.fieldCity = by.id('city');
    this.errMsgCity = by.id('city-error');
    this.fieldState = by.id('state');
    this.errMsgState = by.id('state-error');
    this.fieldZipCode = by.id('zipCode');
    this.errMsgZipCode = by.id('zipCode-error');
    this.chkBoxDiffMailAddr = by.id('diffmail');
    this.fieldPhoneSelect = by.id('contactType');
    this.fieldPhoneNumber = by.id('contactNumber');
    this.errMsgPhoneNumber = by.id('contactNumber-error');
    this.fieldEmailAddr = by.id('email');
    this.errMsgEmailAddr = by.id('email-error');
    this.chkBoxPaperless = by.id('paperless');
    this.RadBtnBrokerYes = by.id('brokerYes');
    this.RadBtnBrokerNo = by.id('brokerNo');
    this.linkBackToQuote = by.id('backToQuote');
    this.zipPopBack =by.id('zipPopBack');
    this.persPageButtonNext = by.id('nextButton');
    this.allerrMsg = element.all(by.css('div.error-container.global-margin label'));
    this.hiddenfieldMailAddr = by.id('mailingAddress');
    this.errMsghiddenfieldMailAddr = by.id('mailingAddress-error');
    this.hiddenfieldCity = by.id('mailingCity');
    this.errMsghiddenfieldCity = by.id('mailingCity-error');
    this.hiddenfieldState = by.id('mailingState');
    this.errMsghiddenfieldState = by.id('mailingState-error');
    this.hiddenfieldZipCode = by.id('mailingZipCode');
    this.errMsghiddenfieldZipCode = by.id('mailingZipCode-error');
    this.hiddenfieldBrokerNum = by.id('brokerNumber');
    this.errMsghiddenfieldBrokerNum = by.id('brokerNumber-error');

    }
}

module.exports = PersonalInfoPageLocators;
