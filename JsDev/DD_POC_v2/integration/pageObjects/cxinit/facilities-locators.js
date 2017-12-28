"use strict";

class FacilitiesLocators {
    constructor() {

        this.RecentSelectedFacility = by.id('facility_name');
        this.selectFacility = function(facility) {
            return by.xpath('//span[text()="' + facility + '"]/parent::label/input');
        };
        this.zipCode = by.id('zipCodeBias');
        this.search = by.buttonText('Search');
        this.moreResults = by.partialLinkText('More Results');
        // this.next = by.css('input.btn.multi-btn.primary.inline-block');
        this.next = by.id('nextButton');
        this.back = by.linkText('Back');
        this.premiumAmount = by.css('aside.product-selection-summary div.header-plan span');
        this.enrollmentFee = by.xpath('//span[contains(text(),"Enrollment Fee")]/preceding-sibling::span[1]');
        this.productName = by.css('h2.product-name');
        this.pbox_facilityName = function(no) {
            return by.xpath('(//li/span[@class="applicant-name"]/following-sibling::p)[' + no + ']');
        };
        this.pbox_dependentName = function(no) {
            return by.xpath('(//li/span[@class="applicant-name"])[' + no + ']');
        };

        this.validationMessage = by.css('a.error');
        this.facilityBox = by.xpath('//ul/li[@class="facility-box"]');
        this.enrolleFacNullErr = by.xpath('//a[@class="error"]');
        this.enrolleFacNullHelpText = by.css('div.facility-description.global-margin p');
        this.depNameVerify = by.id('enrolleeName');

        this.facilityName = by.xpath('//ul[@id="facility-container"]/li//span[@class="providerFacilityName"]');
        this.facilityChkBox = by.xpath('//ul[@id="facility-container"]/li//input[@name="selectFacility"]');
        this.facilityAddress = by.xpath('//ul[@id="facility-container"]/li//span[@class="addressLine1"]');
        this.facilityCity = by.xpath('//ul[@id="facility-container"]/li//span[@class="city"]');
        this.facilityState = by.xpath('//ul[@id="facility-container"]/li//span[@class="state"]');
        this.facilityRegion = by.xpath('//ul[@id="facility-container"]/li//span[@class="region"]');
        this.facilityZipCode = by.xpath('//ul[@id="facility-container"]/li//span[@class="zipCode"]');
        this.facilityPhone = by.xpath('//ul[@id="facility-container"]/li//a[@class="practiceLocationPhone tel"]');
    }
}

module.exports = FacilitiesLocators;
