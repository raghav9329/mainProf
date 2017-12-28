"use strict";

class FooterLocators {
    constructor() {
        this.contactUs = by.linkText('Contact Us');
        this.languageAssistance = by.linkText('Language Assistance');
        this.legalNotices = by.linkText('Legal Notices');
        this.privacy = by.linkText('Privacy');
        this.lastUpdated= by.css('p.last-updated');
        this.disclaimer=by.css('p.disclaimer');
    }

}

module.exports = FooterLocators;
