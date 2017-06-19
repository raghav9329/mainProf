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
        this.next = by.css('input.btn.multi-btn.primary.inline-block');
        this.back = by.linkText('Back');
        this.premiumAmount = by.css('aside.product-selection-summary div.header-plan span');
        this.enrollmentFee = by.className('enrollment-fee');
        this.validationMessage = by.css('label.error');
        this.facilityBox = by.xpath('//ul/li[@class="facility-box"]');
        this.enrolleFacNullErr = by.xpath('//label[@class="error"]');
        this.depNameVerify = by.id('enrolleeName');      

    }
}

module.exports = FacilitiesLocators;
