"use strict";

class ProviderDetailsLocators {
    constructor() {
        this.backToSearchResults = by.css('a.inverted.back-link');
        this.providerDistance = by.css('div.provider__distance span');
        this.providerName = by.className('provider__name');
        this.providerSpecialty = by.className('provider__specialty');
        this.providerNetwork = by.className('provider__network');
        this.providerAvailability = by.className('provider__availability');
        this.providerMap = by.className('provider__map');
        this.providerPlace = by.className('provider__place');
        this.providerPlaceName = by.className('provider__place-name');
        this.providerFacility = by.className('provider__facility');
        this.providerAddress = by.className('provider__address');
        this.providerAddressStreet = by.className('provider__address-street');
        this.providerAddressCity = by.className('provider__address-city');
        this.providerAddressState = by.className('provider__address-state');
        this.providerAddressZip = by.className('provider__address-zip');
        this.providerAddressPhone = by.className('provider__phone');
        // Hours
        this.providerHours = by.className('provider__hours');

        this.letUsKnow = by.linkText('Let us know.');

        this.officeHoursByDay = function(day) {
            return by.xpath('//dd[contains(text(),"' + day + '")]');
        };
        // Office access
        this.providerAccess = by.className('provider__access');

        this.providerAccessByfacility = function(facility) {
            return by.xpath('//div[contains(text(),"' + facility + '")]/following-sibling::div')
        };
        this.providerLanguage = by.css('div.practice__languages dl');
        this.providerData = by.className('provider__data');
        this.providerDataByField = function(fieldName) {
            return by.xpath('//div[contains(text(),"' + fieldName + '")]/following-sibling::div')
        }; 
          this.view = function(providerName) {
            return by.xpath('//a[text()="' + providerName + '"]/ancestor::section/parent::article//a[normalize-space(text()) = "View"]');
        };
    }
}

module.exports = ProviderDetailsLocators;
