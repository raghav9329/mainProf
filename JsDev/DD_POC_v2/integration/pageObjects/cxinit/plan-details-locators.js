"use strict";

class PlanDetailsPageLocators {
    constructor() {
        this.buyPlan                            = by.buttonText('Buy Plan');
        this.headerContent                      = by.css('h1.shopping-header-content');
        this.planPrice                          = by.css('div.shopping-details-hero__details h3');
        this.anualprice                         = by.css('p.annual_price');
        this.enroll_fee                         = by.css('p.enroll_fee');
        this.shopping_details_highlightsByIndex     = (index) => {
        return by.xpath('//ul[@class="shopping-details__icon-highlights"]/li['+index+']/h3');
        }
        this.shopping_details_highlightsInfoBYIndex = (index) => {
          return  by.xpath('//ul[@class="shopping-details__icon-highlights"]/li['+index+']/p');
        }
        this.planStartsHelpText                     = by.css('div.shopping-details-hero__cta p');
        this.shoppingDetailsSummary                 = by.css('div.shopping-details-hero__summary-inner');
        this.back                                   = by.css('i.icon.icon-back-arrow-shopping');
        this.accidentCoverage                       = by.xpath('//h3[text()="Need Accident Coverage?"]');
        this.accidentCoverageText                   = by.xpath('//h3[text()="Need Accident Coverage?"]/parent::div/p');
        this.plan1                                  = by.css('div.option-list a:nth-child(1)');
        this.plan2                                  = by.css('div.option-list a:nth-child(2)');
        this.newPDCheckitOut                        = by.id('r1:0:pt1-template:commandButton2');
        this.benifitsSummary                        = by.css('div.shopping-highlights-block.top h3');
        this.benifitsSummaryFrequency               = by.css('div.shopping-highlights-block.top p');
        this.shoppingFeatureDisclaimer              = by.css('div.shopping-features__disclaimer');
        this.getPlanDetailsDisclaimer               = (shoppingitemname) => {
            return by.xpath('//span[normalize-space(text())="' + shoppingitemname + '"]/span');
        };
        this.pdfText                                = by.css('div.shopping-details-downloads-inner p');
        this.getPlanDetailsByKey                    = (shoppingitemname) => {
            return by.xpath('//span[normalize-space(text())="' + shoppingitemname + '"]/following-sibling::span')
        };
        this.tooltip                                = (shoppingitem) => {
            return by.xpath('//span[normalize-space(text())="' + shoppingitem + '"]/a');
        };
        this.getTooltipHeader                       = (shoppingitem) => {
            return by.xpath('//span[normalize-space(text())="' + shoppingitem + '"]/a/following-sibling::div/h4');
        };
        this.getTooltipText                         = (shoppingitem) => {
            return by.xpath('//span[normalize-space(text())="' + shoppingitem + '"]/a/following-sibling::div/p');
        };
        this.changePlan                             = (planname) => {
            return by.xpath('//p[text()="' + planname + '"]')
        };
        this.closeToolTip                           = (shoppingitem) => {
            return by.xpath('//span[normalize-space(text())="' + shoppingitem + '"]/a/following-sibling::div//i[@class="icon  icon-exit"]')
        };
        this.pdfDocument                            = (docname) => {
            return by.xpath('//p[text()="' + docname + '"]/ancestor::a')
        };
        this.getPDFNameByIndex                      = (index) => {
            return by.xpath('//div[@class="shopping-downloads-list"]/div[' + index + ']/a/span');
        };
        this.getPDFNameInfoByIndex                  = (index) => {
            return by.xpath('//div[@class="shopping-downloads-list"]/div[' + index + ']/p');
        };
        this.seeOtherOptions                        = by.css('div.shopping-details-options-inner h3');
        this.findLink                               = by.xpath('//div[@class="shopping-details-hero__summary"]//a');
    }

}


module.exports = PlanDetailsPageLocators;