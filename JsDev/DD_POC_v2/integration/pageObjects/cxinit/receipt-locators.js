"use strict";

class ReceiptLocators {
    constructor() {
        this.planSummaryValue         = function(summaryKey) {
            return by.xpath('//td[text()="' + summaryKey + '"]/following-sibling::td');
        };
        this.applicationNumber        = by.xpath('//p[normalize-space(text())="Application Confirmation Number"]/span');
        this.planPurchased            = by.xpath('//span[@id="plan_title"]/parent::p');
        this.effectiveDate            = by.xpath('//p[normalize-space(text())="Effective Date"]/span');
        this.totalPaid                = by.xpath('//p[normalize-space(text())="Total Paid"]/span');
        this.submit                   = by.id('sg_NextButton');
        this.printReceipt             = by.linkText('Print Receipt');
        this.saveCompletedApplication = by.linkText('Save completed application');
        this.planName                 = by.css('div[id="plan-summary"] h4');
        this.queryAnswer              = by.css('textarea.sg-input.sg-input-essay');
        this.thanksMsg                = by.css('div.sg-instructions');
        this.feedbackFrame            = function() {
            return browser.driver.findElement(protractor.By.xpath('//iframe[contains(@src,"Enrollment-Experience")]'));              
        };
        this.applicants               = by.id('applicantPanel');
        this.planSummary              = by.xpath('//*[@id="summaryPanel"]/div[1]');
        this.summaryBenefitsTxt       = by.xpath('//p[@class="details-caption"]');
        this.payLaterConfirmationTxt  = by.xpath('//div[@class="receiptInfo"]');
        this.deltaRating              = function(rating) {

           // return by.xpath('(//td[contains(@class,"sg-cell-data")])[' + rating + ']')
            return by.xpath('(//input[@class="sg-input sg-input-radio"])[' + rating + ']');
        };
        this.dependentName            = function(dependent, dependentNo) {
            return by.xpath('//div[@class="accordion-content"]//ul[' + dependent + ']/li[' + dependentNo + ']');
       // $x('//div[@class="accordion-content"]//ul[1]/li[1]')
        };
        this.facilityName             = function(dependent, dependentNo) {
            return by.xpath('//div[@class="accordion-content"]//ul[' + dependent + ']/li[' + dependentNo + ']//div[@class="org"]');
        };
        this.street                   = function(dependent, dependentNo) {
            return by.xpath('//div[@class="accordion-content"]//ul[' + dependent + ']/li[' + dependentNo + ']//span[@class="street"]');
        };
        this.city                     = function(dependent, dependentNo) {
            return by.xpath('//div[@class="accordion-content"]//ul[' + dependent + ']/li[' + dependentNo + ']//span[@class="city"]');
        };
        this.region                   = function(dependent, dependentNo) {
            return by.xpath('//div[@class="accordion-content"]//ul[' + dependent + ']/li[' + dependentNo + ']//span[@class="region"]');
        };
        this.postalCode               = function(dependent, dependentNo) {
            return by.xpath('//div[@class="accordion-content"]//ul[' + dependent + ']/li[' + dependentNo + ']//span[@class="postal-code"]');
        };
        this.telephone                = function(dependent, dependentNo) {
            return by.xpath('//div[@class="accordion-content"]//ul[' + dependent + ']/li[' + dependentNo + ']//div[@class="tel"]');
        };
    };
}

module.exports = ReceiptLocators;
