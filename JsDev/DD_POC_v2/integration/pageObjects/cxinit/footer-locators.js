"use strict";

class FooterLocators {
    constructor() {
        // Footer locators
        this.calldelta = by.xpath('//span[text()="Call Delta Dental"]');
        this.legalNotices = by.xpath('//a[text()="Legal Notices"]');
        this.privacy = by.xpath('//a[text()="Privacy"]');
        this.languageAssistance = by.xpath('//a[text()="Language Assistance"]');
        this.joinAARP = by.xpath('//a[text()="Join AARP"]');
        this.renewAARP = by.xpath('//a[text()="Renew AARP"]');
        this.aarporgHome = by.xpath('//a[contains(text(),"AARP.org Home")]');
        this.disclaimer = by.xpath('//p[@class="disclaimer"]');
        
    }
}

module.exports = FooterLocators;
