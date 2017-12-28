"use strict";

class PlanOptionsPageLocators {
    constructor() {
        this.planSummary = by.css('div.plan-options__summary.grey-text');
        this.headerContent = by.css('h1.shopping-header-content');
        this.edit = by.linkText('Edit');
        this.deltaDentalPlanHeader = by.css('div.plan-options__left-side h2');
        this.deltaCarePlanHeader = by.css('div.plan-options__right-side h2');
        this.back = by.css('a.back-arrow-link');
        this.getPlanPrice = function(planname) {
            return by.xpath('//h4[text()="' + planname + '"]/parent::div//div[@class="plan-options-box__amount"]');
        };
        this.getPlanContent = function(planname) {
            return by.xpath('//h4[text()="' + planname + '"]/parent::div/following-sibling::div//p[1]');
        };
        this.getPlanDetails = function(planname) {
            return by.xpath('//h4[text()="' + planname + '"]/parent::div/following-sibling::div//a')
        };
        this.deltaDentalHighlights = by.css('div.plan-options__left-side div.plan-options__plan-highlights li');
        this.deltaCareHighlights = by.css('div.plan-options__right-side div.plan-options__plan-highlights li');
        this.ppoNetworkProviders = by.xpath('//li[contains(text(),"Save with")]');
        this.deltaCareNetworkProviders = by.xpath('//li[contains(text(),"Choose from")]');


    }
}


module.exports = PlanOptionsPageLocators;
