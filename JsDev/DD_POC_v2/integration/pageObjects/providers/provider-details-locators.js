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

        this.officeHoursByDay = function(day) {
            return by.xpath('//dd[contains(text(),"' + day + '")]');
        };
        // Office access
        this.providerAccess = by.className('provider__access');

        this.providerAccessByfacility = function(facility) {
            return by.xpath('//dd[contains(text(),"' + facility + '")]')
        };
        this.providerLanguage = by.css('div.provider__languages dd');
        this.providerData = by.className('provider__data');
        this.providerDataByField = function(fieldName) {
            return by.xpath('//th[contains(text(),"' + fieldName + '")]/parent::tr/td')
        };
    }
}

module.exports = ProviderDetailsLocators;
