"use strict";

class HomePageLocators {
    constructor() {
        // Home page objects
        this.GetQuote = by.linkText('Get a Quote');
        this.ZIPCode = by.id('zip');
        this.DOB = by.id('dob');
        this.Covered = by.id('coverage_type');
        this.Go = by.id('btn_saveBig');
        this.Enroll = by.id('applyQuotesPage');     
    }
}

module.exports = HomePageLocators;
