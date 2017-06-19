"use strict";

class DirectorySearchLocators {
    constructor() {
        this.headerText = by.xpath('//header[@class="section-heading"]/h1');
        this.loginheader = by.className('inverted');
        this.login = by.xpath('//header[@class="section-heading"]/p/a');
        this.location = by.id('location');
        this.viewDentists = by.buttonText('View Dentists');
        this.refineSearch = by.buttonText('Refine Search');
        this.homeAddressfromGoogleApi = by.xpath('//div[@class="pac-item"]');
        this.distanceSelect = by.id('distance');
        this.generalDentist = by.id('specialty_General-Dentist');
        this.endodontist = by.id('specialty_Endodontist');
        this.oralSurgeon = by.id('specialty_Oral-Surgeon');
        this.orthodontist = by.id('specialty_Orthodontist');
        this.pediatricDentist = by.id('specialty_Pediatric-Dentist');
        this.periodontist = by.id('specialty_Periodontist');
        this.prosthodontist = by.id('specialty_Prosthodontist');
        this.publicHealthDentist = by.id('specialty_Public-Health-Dentist');
        this.fullTimeFaculty = by.id('specialty_Full-Time-Faculty');
        this.hygienist = by.id('specialty_Hygienist');
        this.XRLaboratory = by.id('specialty_XR-Laboratory');
        this.oralPathology = by.id('specialty_Oral-Pathology');

        this.providersListing = by.className('provider-listing');
        //Element for Provider based on provider Name
        this.provider = function(providerName) {
            return by.xpath('//div[text()="' + providerName + '"]/parent::header/parent::section/parent::article');
        };

        this.view = function(providerName) {
            return by.xpath('//div[text()="' + providerName + '"]/parent::header/parent::section/parent::article//a[normalize-space(text()) = "View"]');
        };
        this.specialty = by.className('provider__specialty');
        this.providerPlaceName = by.className('provider__place-name');
        this.providerAddress = by.className('provider__address');
        this.providerNetwork = by.className('provider__network');
        this.apply=by.buttonText('Apply');

    }
}

module.exports = DirectorySearchLocators;
