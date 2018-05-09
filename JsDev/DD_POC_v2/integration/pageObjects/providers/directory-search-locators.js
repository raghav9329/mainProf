"use strict";

class DirectorySearchLocators {
    constructor() {
        this.headerText               = by.css('h1.page-heading');
        this.headerTextError          = by.xpath('//header[@class="section-heading"]/h1');
        this.location                 = by.id('location');
        this.deltaDentalPPO           = by.id('network_PPO');
        this.deltaDentalPremier       = by.id('network_Premier');
        this.deltaCareUSA             = by.id('network_DeltaCare');
        this.keywordSearch            = by.id('keyword');
        this.autoSearch               = by.id('autosuggest-container');
        this.findDentist              = by.buttonText('Find dentists');
        this.resultFreeText           = by.id('result-freetext');
        this.refineSearch             = by.xpath('//span[contains(text(),"+ Refine")]');
        this.homeAddressfromGoogleApi    = by.xpath('//div[@class="pac-item"]');
        this.distanceSelect           = by.id('distance');
        this.providerYelp             = by.linkText('Find reviews on Yelp');
        this.yelpReviewCount          = by.css('div.yelpBlock a span');
        this.yelpRating               = by.css('div.yelpBlock a img');
        this.filterMenuItem           = function(FilterSearch) {
            return by.xpath('//span[normalize-space(text())="' + FilterSearch + '"]');
        };
        this.checkSpecialty              = function(CheckSpecialty) {
            return by.id('specialty_'+CheckSpecialty);
        };
        this.checkNetwork                = function(CheckNetwork) {
            return by.id('network_'+CheckNetwork);
        };
        this.iNDeltaDentalPPO            = by.id('network_PPO');
        this.iNDeltaDentalPremier        = by.id('network_Premier');
        this.iNDeltaCareUSA              = by.id('network_DeltaCare');
        this.Specialty                   = by.id('specialty-menu');
        this.generalDentist              = by.id('specialty_General-Dentist');
        this.endodontist                 = by.id('specialty_Endodontist');
        this.oralSurgeon                 = by.id('specialty_Oral-Surgeon');
        this.orthodontist                = by.id('specialty_Orthodontist');
        this.pediatricDentist            = by.id('specialty_Pediatric-Dentist');
        this.periodontist                = by.id('specialty_Periodontist');
        this.prosthodontist              = by.id('specialty_Prosthodontist');
        this.publicHealthDentist         = by.id('specialty_Public-Health-Dentist');
        this.fullTimeFaculty             = by.id('specialty_Full-Time-Faculty');
        this.hygienist                   = by.id('specialty_Hygienist');
        this.XRLaboratory                = by.id('specialty_XR-Laboratory');
        this.oralPathology               = by.id('specialty_Oral-Pathology');
        this.languages                   = by.id('language-menu');
        this.languageFilter              = by.id('language_filter');
        this.providersListing            = by.className('provider-listing');
        //Element for Provider based on provider Name
        this.provider                    = function(providerName) {
            return by.xpath('//a[text()="' + providerName + '"]/ancestor::section/parent::article')
        };
        this.view                        = function(providerName) {
            return by.xpath('//a[text()="' + providerName + '"]/ancestor::section/parent::article//a[normalize-space(text()) = "Details"]');
        };
        this.countOfProviders            = by.xpath('//div[@class="provider-results"]/p');
        this.headerTextProviderListError = by.css('h1.error-message__header');
        this.providerName                = by.className('provider__name');
        this.specialty                   = by.className('provider__specialty');
        this.providerPlaceName           = by.className('provider__place-name');
        this.providerAddress             = by.className('provider__address');
        this.providerNetwork             = by.className('provider__network');
        this.providerDistance            = by.className('provider__distance');
        this.filterReset                 = by.id('filter_reset');
        this.apply                       = by.xpath('//button[contains(text(),"Apply")]');
        this.backtosearch                = by.xpath('//span[text()="Back to search results"]');
        this.goBackToOldSite             = by.css('div.banner a');
        this.checkItOutNewSite           = by.id('r1:0:pt1-template:commandButton2');
        this.oldLocation                 = by.id('r1:0:inputText1::content');
        this.oldKeyword                  = by.id('r1:0:inputText2::content');
        this.oldDeltaDentalPPO           = by.id('r1:0:itrdefnetwork:0:sbcb::content');
        this.oldDeltaDentalPremier       = by.id('r1:0:itrdefnetwork:1:sbcb::content');
        this.oldDeltaDentalUSA           = by.id('r1:0:itrdefnetwork:2:sbcb::content');
        this.oldSearch                   = by.id('r1:0:commandButton1');
        this.spanish_finddentist         = by.buttonText('Busque dentistas');

    }
}

module.exports = DirectorySearchLocators;
