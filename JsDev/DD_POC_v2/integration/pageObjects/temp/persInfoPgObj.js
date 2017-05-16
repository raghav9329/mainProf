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
    this.errBirthDate = element(by.css('label.error.birthdate-error'));
    this.fieldSsn = element(by.id('ssn'));
    this.errMsgSsn = element(by.id('ssn-error'));
    this.fieldAlternateId = element(by.id('alt_id'));
    this.fieldHomeAddr = element(by.id('streetAddress'));
    this.errMsgHomeAddr = element(by.id('streetAddress-error'));
    this.errCleanseHomeAddr = element(by.css('label.error.cleanse-ajax-error'));
    this.popNewQuoute = element(by.id('zipNewQuote'));
    this.goBack = element(by.id('zipPopBack'));
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
persInfoPage.prototype.enterFirstName = function(fname) {
    browserActions.enterText(this.fieldFirstName, fname, 'Enter First Name' + fname);
};
persInfoPage.prototype.getFirstNameError = function() {
    return browserActions.getText(this.errMsgFirstName);
};
persInfoPage.prototype.enterMiddleName = function(mname) {
    browserActions.enterText(this.fieldMidInitial, mname, 'Enter Middle Initial' + mname);
};
persInfoPage.prototype.enterLastName = function(lname) {
    browserActions.enterText(this.fieldLastName, lname, 'Enter Last Name' + lname);
};
persInfoPage.prototype.getLastNameError = function() {
    return browserActions.getText(this.errMsgLastName);
};
persInfoPage.prototype.selectGender = function(gender) {
    browserActions.selectDropdownbyText(this.fieldGenderSelect, gender, 'Enter Gender' + gender);
};
persInfoPage.prototype.getErrorMessageGender = function() {
    return browserActions.getText(this.errMsgGenderSelect);
};
persInfoPage.prototype.enterMonth = function(month) {
    browserActions.enterText(this.fieldBdMM, month, 'Enter MM' + month);
};
persInfoPage.prototype.getErrorMsgMonth = function() {
    return browserActions.getText(this.errMsgBdMM);
};
persInfoPage.prototype.enterDate = function(date) {
    browserActions.enterText(this.fieldBdDD, date, 'Enter DD' + date);
};
persInfoPage.prototype.getErrorMsgDate = function() {
    return browserActions.getText(this.errMsgBdDD);
};
persInfoPage.prototype.getErrorMsgBirthDate = function() {
    return browserActions.getText(this.errBirthDate);
};
persInfoPage.prototype.enterYear = function(year) {
    browserActions.enterText(this.fieldBdYyyy, year, 'Enter Year' + year);
};
persInfoPage.prototype.getErrorMsgYear = function() {
    return browserActions.getText(this.errMsgBdYyyy);
};
persInfoPage.prototype.enterSSN = function(ssn) {
    browserActions.enterText(this.fieldSsn, ssn, 'Enter SSN' + ssn);
};
persInfoPage.prototype.getErrorMsgSSN = function() {
    return browserActions.getText(this.errMsgSsn);
};
persInfoPage.prototype.enterAlternateID = function(altid) {
    browserActions.enterText(this.fieldAlternateId, altid, 'Enter AlternateId' + altid);
};

persInfoPage.prototype.clickNext = function() {
    browserActions.click(this.persPageButtonNext, 'Click on Next');
};


module.exports = persInfoPage;
