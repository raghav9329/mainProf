"use strict";

class PersonalInfoPageLocators {
    constructor() {
        // Personal info page objects
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
        this.errMsgBdYyyy = by.id('birthdate-fieldset-error');
        this.errMsgYear=by.id('year-error') //year-error
        this.errBirthDate = by.css('label.error.birthdate-error');
        this.fieldSsn = by.id('ssn');
        this.errMsgSsn = by.id('ssn-error');
        this.errMsgMemberId = by.id('memberId-error');
        this.coverageStartDate= by.id('startDate');
        this.fieldHomeAddr = by.id('streetAddress');
        this.fieldAlternateId = by.id('alt_id');
        this.errMsgHomeAddr = by.id('streetAddress-error');
        this.errinvalidAddr = by.xpath('//div[@class="ajax-error-container"]/a');
        this.fieldCity = by.id('city');
        this.errMsgCity = by.id('city-error');
        this.fieldState = by.id('state');
        this.errMsgState = by.id('state-error');
        this.fieldZipCode = by.id('zipCode');
        this.errMsgZipCode = by.id('zipCode-error');
        this.chkBoxDiffMailAddr = by.css('label.diffmail input');
        //xpath('//label[contains(text(), "My mailing address is the same as my home address.")]');
        //label[@class="diffmail"]');
        this.fieldPhoneSelect = by.id('contactType');
        this.fieldPhoneNumber = by.id('contactNumber');
        this.errMsgPhoneNumber = by.id('contactNumber-error');
        this.fieldEmailAddr = by.id('email');
        this.errMsgEmailAddr = by.id('email-error');
        this.chkBoxPaperless = by.id('paperless');
        this.paperLessTerms = by.partialLinkText('Terms and Conditions');
        // this.RadBtnBrokerYes = by.css('id.brokerYes');
        this.RadBtnBrokerYes = by.id('brokerYes');
        this.RadBtnBrokerNo = by.id('brokerNo');
        this.zipPopUp = by.css('div.popup.alert');
        this.zipPopNewQuote = by.id('zipNewQuote');
        this.zipPopBack = by.id('zipPopBack');
        this.persPageButtonNext = by.id('nextButton');
        this.allerrMsg = element.all(by.css('div.error-container.global-margin label'));
        this.hiddenfieldMailAddr = by.id('mailingAddress');
        this.errMsghiddenfieldMailAddr = by.id('mailingAddress-error');
        this.servererrMailAddr = by.xpath('//div[@class="ajax-error-container"]/a');
        this.hiddenfieldCity = by.id('mailingCity');
        this.errMsghiddenfieldCity = by.id('mailingCity-error');
        this.hiddenfieldState = by.id('mailingState');
        this.errMsghiddenfieldState = by.id('mailingState-error');
        this.hiddenfieldZipCode = by.id('mailingZipCode');
        this.errMsghiddenfieldZipCode = by.id('mailingZipCode-error');
        this.hiddenfieldBrokerNum = by.id('brokerNumber');
        this.errMsghiddenfieldBrokerNum = by.id('brokerNumber-error');
        this.whatIsThis = by.id('brokerTip');
        this.brokerToolTip = by.id('brokerNumberQuestionMark'); 
        this.brokerToolTipText = by.id('brokerNumber_popup');
        this.hiddenbrokerName = by.id('brokerName');
        this.homeAddressfromGoogleApi = by.xpath('//div[@class="pac-item"]');
        this.birthdateerror = by.className('error birthdate-error');
        //Server Error Message Locators
        this.serverErrMsgFirstName = by.css('a.error.firstName-error');
        this.serverErrMsgLastName = by.css('a.error.lastName-error');
        this.serverErrMsgGenderSelect = by.css('a.error.gender-error');
        this.serverErrMsgSsn = by.css('a.error.ssn-error');
        this.serverErrMsgMemberId = by.css('a.error.memberId-error');
        this.serverErrMsgStreetAddress = by.css('a.error.streetAddress-error');
        this.serverErrMsgCity = by.css('a.error.city-error');
        this.serverErrMsgState = by.css('a.error.state-error');
        this.serverErrMsgZipCode = by.css('a.error.zipCode-error');
        this.serverErrMsgMonth = by.css('a.error.month-error');
        this.serverErrMsgDay = by.css('a.error.day-error');
        this.serverErrMsgYear = by.css('a.error.year-error');
        this.serverErrMsgContactNumber = by.css('a.error.contactNumber-error');
        this.serverErrMsgMailingAddress = by.css('a.error.mailingAddress-error');
        this.serverErrMsgMailingCity = by.css('a.error.mailingCity-error');
        this.serverErrMsgMailingState = by.css('a.error.mailingState-error');
        this.serverErrMsgMailingZip = by.css('a.error.mailingZipCode-error');
        this.enrollStatus = function(breadcrumbheader) {
            return by.xpath('//*[text()="' + breadcrumbheader + '"]/preceding-sibling::div');
        };
        this.premiumAmount = by.css('aside.product-selection-summary div.header-plan span');
        this.enrollmentFee = by.className('enrollment-fee');
        this.apptFloorNumError = by.xpath('//div[@class="ajax-error-container"]/a');
        // AARP Locators
        this.memberId = by.name('memberId');
        this.referralSource = by.id('referralSource');
        this.errorMsgRefferalSource = by.id('referralSource-error');
        this.backToQuote = by.id('backToQuote');
        

    }
}

module.exports = PersonalInfoPageLocators;
