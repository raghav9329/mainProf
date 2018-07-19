"use strict";

class ReviewLocators {
    constructor() {
        this.openApplicant           = by.id('applicantPanel');
        this.primaryEdit             = by.xpath('//div[text()="Primary"]/a');
        this.dependentsEdit          = by.xpath('//div[text()="Dependents"]/a');
        this.primaryName             = by.css('div.enrollee-facility big');
        this.back                    = by.xpath('//a[text()="Back"]');
        this.paymentEdit             = by.xpath('//div[@id="payment"]/a');
        this.primaryFacilityChange   = by.css('div.facility-details a');
        this.dependentFacilityChange = function(depno) {
            return by.xpath('//ul[@id="dependentList"]/li[' + depno + ']//div[@class="facility-details"]/a')
        };
        this.primaryFacilityName     = by.css('div.facility-details div.org');
        this.dependentFacilityName   = function(depno) {
            return by.xpath('//ul[@id="dependentList"]/li[' + depno + ']//div[@class="facility-details"]/div[@class="org"]')
        };

    }

}

module.exports = ReviewLocators;