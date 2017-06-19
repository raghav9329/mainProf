"use strict";

class ReceiptLocators {
    constructor() {
        this.planSummaryValue = function(summaryKey) {
            return by.xpath('//td[text()="' + summaryKey + '"]/following-sibling::td');
        };
        this.applicationNumber = by.xpath('//p[normalize-space(text())="Application Confirmation Number"]/span');
        this.submit = by.id('sg_NextButton');
        this.printReceipt = by.linkText('Print Receipt');
        this.planName = by.css('div[id="plan-summary"] h4');
        this.feedbackFrame = function() {
            return browser.driver.findElement(protractor.By.xpath('//iframe[@title="Feedback Survey"]'))
        };
        this.applicants = by.partialLinkText('Applicants');
        this.planSummary = by.id('plan-summary');
        this.deltaRating = function(rating) {
            return by.xpath('(//input[@class="sg-input sg-input-radio"])[' + rating + ']')
        };

        this.dependentName = function(dependent, dependentNo) {
            return by.xpath('//div[@class="details-body"]//ul[' + dependent + ']/li[' + dependentNo + ']/h5');
        };
        this.facilityName = function(dependent, dependentNo) {
            return by.xpath('//div[@class="details-body"]//ul[' + dependent + ']/li[' + dependentNo + ']//div[@class="org"]');
        };
        this.street = function(dependent, dependentNo) {
            return by.xpath('//div[@class="details-body"]//ul[' + dependent + ']/li[' + dependentNo + ']//span[@class="street"]');
        };
        this.city = function(dependent, dependentNo) {
            return by.xpath('//div[@class="details-body"]//ul[' + dependent + ']/li[' + dependentNo + ']//span[@class="city"]');
        };
        this.region = function(dependent, dependentNo) {
            return by.xpath('//div[@class="details-body"]//ul[' + dependent + ']/li[' + dependentNo + ']//span[@class="region"]');
        };
        this.postalCode = function(dependent, dependentNo) {
            return by.xpath('//div[@class="details-body"]//ul[' + dependent + ']/li[' + dependentNo + ']//span[@class="postal-code"]');
        };
        this.telephone = function(dependent, dependentNo) {
            return by.xpath('//div[@class="details-body"]//ul[' + dependent + ']/li[' + dependentNo + ']//div[@class="tel"]');
        };






    };
}

module.exports = ReceiptLocators;
