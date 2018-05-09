"use strict";
var ControlBase = require('../../controls/base-control');
var FooterLocators = require('./footer-locators');
var Label = require('../../controls/label-control');
var LinkText = require('../../controls/link-control');

/**
 * FooterPage
 * @constructor
 */
class FooterPage extends ControlBase {

    constructor() {
        super(null, 'FooterPage');
        this.pageObjects        = new FooterLocators();
        this.contactUs          = new LinkText(this.pageObjects.contactUs);
        this.languageAssistance = new LinkText(this.pageObjects.languageAssistance);
        this.legalNotices       = new LinkText(this.pageObjects.legalNotices);
        this.privacy            = new LinkText(this.pageObjects.privacy);
        this.lastUpdated        = new Label(this.pageObjects.lastUpdated);
        this.disclaimer         = new Label(this.pageObjects.disclaimer);
    }

    /**
     * Verifies footer
     * @param {Object} footerdata
     */
    verifyFooter(footerDataObj) {

        expect(this.contactUs.isPresentAndDisplayed()).toBeTruthy();
        expect(this.languageAssistance.isPresentAndDisplayed()).toBeTruthy();
        expect(this.legalNotices.isPresentAndDisplayed()).toBeTruthy();
        expect(this.privacy.isPresentAndDisplayed()).toBeTruthy();
        expect(this.lastUpdated.isPresentAndDisplayed()).toBeTruthy();
        expect(this.disclaimer.isPresentAndDisplayed()).toBeTruthy();

        this.contactUs.click();
        expect(browser.getTitle()).toEqual(footerDataObj.contactUs);
        browser.navigate().back();

        this.languageAssistance.click();
        expect(browser.getTitle()).toEqual(footerDataObj.languageAssistance);
        browser.navigate().back();

        this.legalNotices.click();
        expect(browser.getTitle()).toEqual(footerDataObj.legalNotices);
        browser.navigate().back();

        this.privacy.click();
        expect(browser.getTitle()).toEqual(footerDataObj.privacy);
        browser.navigate().back();

        expect(this.lastUpdated.getText()).toContain(footerDataObj.lastUpdated);

        expect(this.disclaimer.getText()).toContain(footerDataObj.deltaDentalInfo);
        expect(this.disclaimer.getText()).toContain(footerDataObj.serviceInfo);
        expect(this.disclaimer.getText()).toContain(footerDataObj.deltaCareInfo);


    }
}
/**
 *
 * @type {FooterPage}
 */
module.exports = FooterPage;