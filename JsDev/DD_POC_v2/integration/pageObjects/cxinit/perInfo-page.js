"use strict";
var PersInfoLocators = require('./perInfo-locators');
var ControlBase = require('../../controls/base-control');
var Button = require('../../controls/button-control');
var TextBox = require('../../controls/textbox-control');
var Label = require('../../controls/label-control');
var Select = require('../../controls/select-control');
var CheckBox = require('../../controls/checkbox-control');
var RadioButton = require('../../controls/radiobutton-control');
var LinkText = require('../../controls/link-control');

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
        this.errMsgYear = new Label(this.pageObjects.errMsgYear);
        this.errBirthDate = new Label(this.pageObjects.errBirthDate);
        this.fieldSsn = new TextBox(this.pageObjects.fieldSsn);
        this.coverageStartDate = new Select(this.pageObjects.coverageStartDate);
        this.errMsgSsn = new Label(this.pageObjects.errMsgSsn);
        this.errMsgMemberId = new Label(this.pageObjects.errMsgMemberId);
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
        this.chkBoxDiffMailAddr = new CheckBox(this.pageObjects.chkBoxDiffMailAddr);
        this.fieldPhoneSelect = new Select(this.pageObjects.fieldPhoneSelect);
        this.fieldPhoneNumber = new TextBox(this.pageObjects.fieldPhoneNumber);
        this.errMsgPhoneNumber = new Label(this.pageObjects.errMsgPhoneNumber);
        this.fieldEmailAddr = new TextBox(this.pageObjects.fieldEmailAddr);
        this.errMsgEmailAddr = new Label(this.pageObjects.errMsgEmailAddr);
        this.chkBoxPaperless = new CheckBox(this.pageObjects.chkBoxPaperless);
        this.paperLessTerms = new LinkText(this.pageObjects.paperLessTerms);
        this.RadBtnBrokerYes = new RadioButton(this.pageObjects.RadBtnBrokerYes);
        this.RadBtnBrokerNo = new RadioButton(this.pageObjects.RadBtnBrokerNo);
        this.zipPopNewQuote = new Button(this.pageObjects.zipPopNewQuote);
        this.zipPopBack = new Button(this.pageObjects.zipPopBack);
        this.zipPopUp = new Label(this.pageObjects.zipPopUp);
        this.next = new Button(this.pageObjects.persPageButtonNext);
        this.allerrMsg = new Label(this.pageObjects.allerrMsg);
        this.hiddenfieldMailAddr = new TextBox(this.pageObjects.hiddenfieldMailAddr);
        this.errMsghiddenfieldMailAddr = new Label(this.pageObjects.errMsghiddenfieldMailAddr);
        this.servererrMailAddr = new Label(this.pageObjects.servererrMailAddr);
        this.hiddenfieldCity = new TextBox(this.pageObjects.hiddenfieldCity);
        this.errMsghiddenfieldCity = new Label(this.pageObjects.errMsghiddenfieldCity);
        this.hiddenfieldState = new TextBox(this.pageObjects.hiddenfieldState);
        this.errMsghiddenfieldState = new Label(this.pageObjects.errMsghiddenfieldState);
        this.hiddenfieldZipCode = new TextBox(this.pageObjects.hiddenfieldZipCode);
        this.errMsghiddenfieldZipCode = new Label(this.pageObjects.errMsghiddenfieldZipCode);
        this.hiddenfieldBrokerNum = new TextBox(this.pageObjects.hiddenfieldBrokerNum);
        this.errMsghiddenfieldBrokerNum = new Label(this.pageObjects.errMsghiddenfieldBrokerNum);
        this.whatIsThis = new Label(this.pageObjects.whatIsThis);
        this.brokerToolTip = new Label(this.pageObjects.brokerToolTip);
        this.brokerToolTipText = new Label(this.pageObjects.brokerToolTipText);
        this.hiddenbrokerName = new TextBox(this.pageObjects.hiddenbrokerName);
        this.homeAddressfromGoogleApi = new Label(this.pageObjects.homeAddressfromGoogleApi);
        this.birthdateerror = new Label(this.pageObjects.birthdateerror);
        this.serverErrMsgFirstName = new Label(this.pageObjects.serverErrMsgFirstName);
        this.serverErrMsgLastName = new Label(this.pageObjects.serverErrMsgLastName);
        this.serverErrMsgGenderSelect = new Label(this.pageObjects.serverErrMsgGenderSelect);
        this.serverErrMsgSsn = new Label(this.pageObjects.serverErrMsgSsn);
        this.serverErrMsgMemberId = new Label(this.pageObjects.serverErrMsgMemberId);
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
        this.premiumAmount = new Label(this.pageObjects.premiumAmount);
        this.enrollmentFee = new Label(this.pageObjects.enrollmentFee);
        this.apptFloorNumError = new LinkText(this.pageObjects.apptFloorNumError);

        this.memberId = new TextBox(this.pageObjects.memberId);
        this.referralSource = new Select(this.pageObjects.referralSource);
        this.errorMsgRefferalSource = new Label(this.pageObjects.errorMsgRefferalSource);
        this.backToQuote = new LinkText(this.pageObjects.backToQuote);
    }

    enrollStatus(breadcrumbheader) {
        return new Label(this.pageObjects.enrollStatus(breadcrumbheader));
    };

    /**
     * Returns true if first  name is displayed or not
     * @returns {Promise<Boolean>}
     */
    isAt() {
        return this.fieldFirstName.isPresentAndDisplayed();
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
            }).last().clickIt();
        });
    };

    getandVerifyallAddressSuggestions(ptext) {
        var dataarray = [];
        var self = this;
        return browser.controlFlow().execute(function() {
            return self.homeAddressfromGoogleApi.getElements().each(function(element, index) {
                return element.getText().then(function(text) {
                    console.log("text=========" + text);
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
            if(!perinfo.gender) self.fieldGenderSelect.selectByText(perinfo.gender);
            //expect(self.fieldGenderSelect.getAttribute("class")).toContain(perinfo.ariainvalid);
            var d = perinfo.dob;
            var datesplit = (d.split('-'))
            self.fieldBdMM.setText(datesplit[0]);
            self.fieldBdDD.setText(datesplit[1]);
            self.fieldBdYyyy.setText(datesplit[2]);
            self.fieldBdMM.setText(datesplit[0]);
            if (perinfo.MemberId) self.memberId.setText(perinfo.MemberId);
            if (perinfo.ssn) self.fieldSsn.setText(perinfo.ssn);
            if (!perinfo.alternateid) self.fieldAlternateId.setText('');
            if (!perinfo.alternateid) self.fieldAlternateId.setText(perinfo.alternateid);
            self.fieldHomeAddr.setText('');
            expect(self.fieldFirstName.getAttribute("class")).toContain(perinfo.ariainvalid);
            expect(self.fieldMidInitial.getAttribute("class")).toContain(perinfo.ariainvalid);
            expect(self.fieldLastName.getAttribute("class")).toContain(perinfo.ariainvalid);
            expect(self.fieldBdMM.getAttribute("class")).toContain(perinfo.ariainvalid);
            expect(self.fieldBdDD.getAttribute("class")).toContain(perinfo.ariainvalid);
            expect(self.fieldBdYyyy.getAttribute("class")).toContain(perinfo.ariainvalid);
            if (perinfo.ssn) expect(self.fieldSsn.getAttribute("class")).toContain(perinfo.ariainvalid);
        });
    };

    fillAddress(perinfo) {
        var self = this;
        return browser.controlFlow().execute(function() {
            self.fieldHomeAddr.setText(perinfo.fieldHomeAddr);
            self.fieldCity.setText(perinfo.city);
            self.fieldPhoneNumber.setText('');
            browser.sleep(2000);
             Utility.waitUntilElementNotPresent(element(by.css('img.loaderImg'))); 
            // expect(self.fieldHomeAddr.getAttribute("class")).toContain(perinfo.ariainvalid);
            // expect(self.fieldCity.getAttribute("class")).toContain(perinfo.ariainvalid);
        });
    };
    waitUntilLoderDisapper() {
        var loder = element(by.xpath('//img[@class="loaderImg"]'));
        Utility.waitUntilElementNotPresent(loder, longWait);
    }
    phoneNumberemail(phno) {
        var self = this;
        return browser.controlFlow().execute(function() {
            self.fieldPhoneSelect.selectByText(phno.contactType);
            //expect(self.fieldPhoneSelect.getAttribute("class")).toContain(phno.ariainvalid);
            self.fieldPhoneNumber.setText(phno.phoneNumber);
            if (!phno.fieldEmailAddr) self.fieldEmailAddr.setText(phno.email);
            self.fieldAlternateId.setText('');
            self.fieldPhoneNumber.setText('', true);
            expect(self.fieldPhoneNumber.getAttribute("class")).toContain(phno.ariainvalid);
            expect(self.fieldEmailAddr.getAttribute("class")).toContain(phno.ariainvalid);
        });
    };

    fillBroker(broker) {
        var self = this;
        return browser.controlFlow().execute(function() {
            if (broker.brokernumber.length == 0) {
                self.next.click();
                browser.sleep(2000);
            } else {
                console.log('else block');
                // self.RadBtnBrokerYes.select();
                // self.hiddenfieldBrokerNum.setText(broker.brokernumber);
                self.next.click();
                browser.sleep(2000);
            }
        });
    };

    getProfileValidationMessages() {
        var promises = [];
        promises.push(this.errMsgFirstName.getText());
        promises.push(this.errMsgLastName.getText());
        //promises.push(this.errMsgGenderSelect.getText());
        promises.push(this.errMsgBdMM.getText());
        promises.push(this.errMsgBdDD.getText());
        promises.push(this.errMsgBdYyyy.getText());
        promises.push(this.errMsgSsn.getText());
        return protractor.promise.all(promises);
    };

    getServerProfileValidationMessages() {
        var promises = [];
        promises.push(this.serverErrMsgFirstName.getText());
        promises.push(this.serverErrMsgLastName.getText());
        // promises.push(this.serverErrMsgGenderSelect.getText());
        promises.push(this.serverErrMsgMonth.getText());
        promises.push(this.serverErrMsgDay.getText());
        promises.push(this.serverErrMsgYear.getText());
        promises.push(this.serverErrMsgSsn.getText());
        return protractor.promise.all(promises);
    };

    getContactValidationMessages() {
        var promises = [];
        promises.push(this.errMsgHomeAddr.getText());
        promises.push(this.errMsgCity.getText());
        promises.push(this.errMsgState.getText());
        promises.push(this.errMsgZipCode.getText());
        return protractor.promise.all(promises);
    };

    getServerContactValidationMessages() {
        var promises = [];
        promises.push(this.serverErrMsgStreetAddress.getText());
        promises.push(this.serverErrMsgCity.getText());
        promises.push(this.serverErrMsgState.getText());
        promises.push(this.serverErrMsgZipCode.getText());
        return protractor.promise.all(promises);
    };

    getMailAddressValidationMessages() {
        var promises = [];
        promises.push(this.errMsghiddenfieldMailAddr.getText());
        promises.push(this.errMsghiddenfieldCity.getText());
        promises.push(this.errMsghiddenfieldState.getText());
        promises.push(this.errMsghiddenfieldZipCode.getText());
        return protractor.promise.all(promises);
    };

    getServerMailAddressValidationMessages() {
        var promises = [];
        promises.push(this.serverErrMsgMailingAddress.getText());
        promises.push(this.serverErrMsgMailingCity.getText());
        promises.push(this.serverErrMsgMailingState.getText());
        promises.push(this.serverErrMsgMailingZip.getText());
        return protractor.promise.all(promises);
    };


};

/**
 *
 * @type {PersonalInfoPage}
 */
module.exports = PersonalInfoPage;
