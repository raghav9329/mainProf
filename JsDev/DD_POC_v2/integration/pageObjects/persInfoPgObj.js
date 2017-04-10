var persInfoPage = function persInfoPage() {

    this.tabBreadcrumb = function(txt) {
        return element(by.xpath('//*[text()="' + txt + '"]/parent::li'));
    };
    this.fieldFirstName = element(by.id('firstName'));
    this.errMsgFirstName = element(by.id('firstName-error'));
    this.fieldMidInitial = element(by.id('middleName'));
    this.fieldLastName = element(by.id('lastName'));
    this.errMsgLastName = element(by.id('lastName-error'));
    this.fieldGenderSelect = element(by.id('gender'));
    this.errMsgGenderSelect = element(by.id('gender-error'));
    this.fieldBdMM = element(by.id('month'));
    this.errMsgBdMM = element(by.id('month-error'));
    this.fieldBdDD = element(by.id('day'));
    this.errMsgBdDD = element(by.id('day-error'));
    this.fieldBdYyyy = element(by.id('year'));
    this.errMsgBdYyyy = element(by.id('year-error'));
    this.fieldSsn = element(by.id('ssn'));
    this.errMsgSsn = element(by.id('ssn-error'));
    this.fieldHomeAddr = element(by.id('streetAddress'));
    this.errMsgHomeAddr = element(by.id('streetAddress-error'));
    this.fieldCity = element(by.id('city'));
    this.errMsgCity = element(by.id('city-error'));
    this.fieldState = element(by.id('state'));
    this.errMsgState = element(by.id('state-error'));
    this.fieldZipCode = element(by.id('zipCode'));
    this.errMsgZipCode = element(by.id('zipCode-error'));
    this.chkBoxDiffMailAddr = element(by.id('diffmail'));
    this.fieldPhoneSelect = element(by.id('contactType'));
    this.fieldPhoneNumber = element(by.id('contactNumber'));
    this.errMsgPhoneNumber = element(by.id('contactNumber-error'));
    this.fieldEmailAddr = element(by.id('email'));
    this.errMsgEmailAddr = element(by.id('email-error'));
    this.chkBoxPaperless = element(by.id('paperless'));
    this.RadBtnBrokerYes = element(by.id('brokerYes'));
    this.RadBtnBrokerNo = element(by.id('brokerNo'));
    this.linkBackToQuote = element(by.id('backToQuote'));
    this.persPageButtonNext = element(by.id('nextButton'));
    this.allerrMsg = element.all(by.css('div.error-container.global-margin label'));
    this.hiddenfieldMailAddr = element(by.id('mailingAddress'));
    this.errMsghiddenfieldMailAddr = element(by.id('mailingAddress-error'));
    this.hiddenfieldCity = element(by.id('mailingCity'));
     this.errMsghiddenfieldCity = element(by.id('mailingCity-error'));
    this.hiddenfieldState = element(by.id('mailingState'));
    this.errMsghiddenfieldState = element(by.id('mailingState-error'));
    this.hiddenfieldZipCode = element(by.id('mailingZipCode'));
    this.errMsghiddenfieldZipCode = element(by.id('mailingZipCode-error'));
    this.hiddenfieldBrokerNum = element(by.id('brokerNumber'));
    this.errMsghiddenfieldBrokerNum = element(by.id('brokerNumber-error'));

};

module.exports = persInfoPage;
