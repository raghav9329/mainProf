"use strict";

class ProviderDetailsLocators {
    constructor() {
        this.headerText                = by.css('h1.page-heading');
        this.keywordSearch             = by.id('keyword');
        this.findIcon                  = by.className('form-element form-element--submit');
        this.pageNation                = by.css('ol.pagination li');
        this.page                      = by.linkText('3');
        this.backToSearchResults       = by.css('a.inverted.back-link');
        this.bestMatch                 = by.id('sort_relevance');
        this.sortDistance              = by.id('sort_distance');
        this.asceDist                  = by.xpath('//div[@class="provider__distance"]/span');
        this.providerDistance          = by.css('div.provider__distance span');
        this.providerName              = by.className('provider__name');
        this.providerSpecialty         = by.className('provider__specialty');
        this.providerNetwork           = by.className('provider__network');
        this.providerFacility          = by.className('provider__facility');
        this.bjNetwork                 = by.className('state-indicator provider__network');
        this.bjDeltaCare               = by.xpath('(//span[normalize-space(text()) = "DeltaCare USA network"])[1]');
        this.providerAvailability      = by.className('provider__availability');
        this.providerMap               = by.className('provider__map');
        this.providerPlace             = by.className('provider__place');
        this.providerPlaceName         = by.css('div.provider__place-name a');
        this.yelpReviewCount           = by.css('div.yelpBlock a span');
        this.yelpRating                = by.css('div.yelpBlock a img');
        this.providerYelp              = by.linkText('Find reviews on Yelp');
        this.providerYelpName          = by.css('div.biz-page-header-left.claim-status h1');
        this.providerYelpFind          = by.id('find_desc');
        this.providerYelpNear          = by.id('dropperText_Mast');
        this.placeNameByProvider       = function(providerName) {
            return by.xpath('//a[text()="' + providerName + '"]/ancestor::section/parent::article//div[@class="provider__place-name"]/a');
        }
        this.providerFacility          = by.css('div.provider__facility a');
        this.facilityByProvider        = function(providerName) {
            return by.xpath('//a[text()="' + providerName + '"]/ancestor::section/parent::article//div[@class="provider__facility"]/a');
        }
        this.providerPName             = by.css('div.provider__place.provider__block div:nth-child(2) a');
        this.providerFName             = by.xpath('//*[text()="Office Hours"]/preceding::a[2]');
        //by.css('div.provider__place.provider__block div:nth-child(3) a');
        this.providerAddress           = by.className('provider__address');
        this.providerAddressStreet     = by.className('provider__address-street');
        this.providerAddressCity       = by.className('provider__address-city');
        this.providerAddressState      = by.className('provider__address-state');
        this.providerAddressZip        = by.className('provider__address-zip');
        this.providerAddressPhone      = by.className('provider__phone');
        this.providersList             = by.className('provider__providers-list');
        // Hours
        this.providerHours             = by.className('provider__hours');

        this.letUsKnow                 = by.linkText('Report an error.');
        this.location                  = by.id('location');
        this.officeHoursByDay          = function(day) {
            return by.xpath('//dd[contains(text(),"' + day + '")]');
        };
        // Office access
        this.providerAccess            = by.className('provider__access');

        this.providerAccessByfacility  = function(facility) {
            return by.xpath('//div[contains(text(),"' + facility + '")]/following-sibling::div')
        };
        this.providerLanguage          = by.css('div.practice__languages dl');
        // this.providerLanguage = by.xpath('//dt[text()="Office Access"]/following::div//dl');

        this.providerData              = by.className('provider__data');
        this.providerDataByField       = function(fieldName) {
            return by.xpath('//div[contains(text(),"' + fieldName + '")]/following-sibling::div')
        };


        this.view                      = function(providerName) {
            return by.xpath('//a[text()="' + providerName + '"]/ancestor::section/parent::article//a[normalize-space(text()) = "Details"]');
        };

        this.Office_providerSearch     = function(officeName) {
            return by.xpath('//a[text()="' + officeName + '"]')

        };

        this.workatOffice              = function(officeName) {
            return by.xpath('//label[contains(text(),"' + officeName + '")]');
            //label[contains(text(),'I work at this office.')]

        };
        this.workatOffice_links        = function(links) {
            return by.linkText(links);

        };
        this.feedback_inaccuracy       = by.id('inaccuracy');
        this.dontworkSubmit_inaccuracy = by.id('inaccuracy-submission');
        this.menuButton                = by.id('logInButton');
        this.spanishOption             = by.linkText('En Español');
        this.viewLink                  = by.css('div.provider__link a');

    }

    
}

module.exports = ProviderDetailsLocators;
