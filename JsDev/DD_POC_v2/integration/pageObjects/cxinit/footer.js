"use strict";
var footerLocators = require('./footer-locators');
var ControlBase = require('../../controls/base-control');
var Button = require('../../controls/button-control');
var TextBox = require('../../controls/textbox-control');
var Label = require('../../controls/label-control');
var Select = require('../../controls/select-control');
var CheckBox = require('../../controls/checkbox-control');
var RadioButton = require('../../controls/radiobutton-control');
var LinkText = require('../../controls/link-control');

/**
 * Provides access to the functionality of Footer
 * @constructor
 */
class Footer extends ControlBase {
    constructor() {
        super(null, 'Footer');
        this.pageObjects = new footerLocators();
        this.calldelta = new Label(this.pageObjects.calldelta);
        this.legalNotices = new LinkText(this.pageObjects.legalNotices);
        this.privacy =new LinkText(this.pageObjects.privacy);
        this.languageAssistance =new LinkText(this.pageObjects.languageAssistance);
        this.joinAARP =new LinkText(this.pageObjects.joinAARP);
        this.renewAARP =new LinkText(this.pageObjects.renewAARP);
        this.aarporgHome =new LinkText(this.pageObjects.aarporgHome);
        this.copyrightFooter = new Label(this.pageObjects.copyrightFooter);

    };

    verifylegalNotices(){
        var self = this;

        self.legalNotices.click();
        Utility.switchToWindow(1);
        expect(browser.getCurrentUrl()).toContain('https://www.deltadentalins.com/about/legal/');
        browser.close();
        Utility.switchToWindow(0);
    };

    verifyprivacy(){
        var self = this;
        self.privacy.click();
        Utility.switchToWindow(1);
        expect(browser.getCurrentUrl()).toContain('https://www.deltadentalins.com/about/privacy/');
        browser.close();
        Utility.switchToWindow(0);
    };

    verifylanguageAssistance(){
        var self = this;
        self.languageAssistance.click();
        Utility.switchToWindow(1);
        expect(browser.getCurrentUrl()).toContain('https://www.deltadentalins.com/individuals/guidance/language-assistance.html');
        browser.close();
        Utility.switchToWindow(0);
    };

    verifyjoinAARP(){
        var self = this;
        self.joinAARP.click();
        Utility.switchToWindow(1);
        expect(browser.getCurrentUrl()).toContain('https://appsec.aarp.org/membership/join/start');
        browser.close();
        Utility.switchToWindow(0);
    };

    verifyrenewAARP(){
        var self = this;
        self.renewAARP.click();
        Utility.switchToWindow(1);
        expect(browser.getCurrentUrl()).toContain('https://appsec.aarp.org/membership/renew/start#/rp');
        browser.close();
        Utility.switchToWindow(0);
    };

    verifyaarporgHome(){
        var self = this;
        self.aarporgHome.click();
        Utility.switchToWindow(1);
        expect(browser.getCurrentUrl()).toContain('http://www.aarp.org/');
        browser.close();
        Utility.switchToWindow(0);
    };

    verifyFooter(){
        expect(this.legalNotices.isPresentAndDisplayed()).toBeTruthy();
        expect(this.privacy.isPresentAndDisplayed()).toBeTruthy();
        expect(this.languageAssistance.isPresentAndDisplayed()).toBeTruthy();
        expect(this.joinAARP.isPresentAndDisplayed()).toBeTruthy();
        expect(this.renewAARP.isPresentAndDisplayed()).toBeTruthy();
        expect(this.aarporgHome.isPresentAndDisplayed()).toBeTruthy();
        this.verifylegalNotices();
        this.verifyprivacy();
        this.verifylanguageAssistance();
        this.verifyjoinAARP();
        this.verifyrenewAARP();
        this.verifyaarporgHome();

    };

};

/**
 *
 * @type {Footer}
 */
module.exports = Footer;
