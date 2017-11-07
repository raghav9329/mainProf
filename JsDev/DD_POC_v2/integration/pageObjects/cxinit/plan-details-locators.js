"use strict";

class PlanDetailsPageLocators {
    constructor() {
        this.buyPlan = by.buttonText('Buy Plan');
        this.headerContent = by.css('h1.shopping-header-content');
        this.planPrice = by.css('div.shopping-details-hero__details h3');
        this.planStartsHelpText = by.css('div.shopping-details-hero__cta p');
        this.shoppingDetailsSummary = by.css('div.shopping-details-hero__summary-inner');
        this.back = by.css('i.icon.icon-back-arrow-shopping');
        this.accidentCoverage=by.xpath('//h3[text()="Need Accident Coverage?"]');
        this.plan1= by.css('div.option-list a:nth-child(1)');
        this.plan2= by.css('div.option-list a:nth-child(2)')
        this.getPlanDetailsByKey = (shoppingitemname) => {
            return by.xpath('//span[normalize-space(text())="' + shoppingitemname + '"]/following-sibling::span')
        };
        this.tooltip = (shoppingitem) => {
            return by.xpath('//span[normalize-space(text())="' + shoppingitem + '"]/a');

        }
        this.getTooltipHeader = (shoppingitem) => {
            return by.xpath('//span[normalize-space(text())="' + shoppingitem + '"]/a/following-sibling::div/h4');

        }

        this.getTooltipText = (shoppingitem) => {
            return by.xpath('//span[normalize-space(text())="' + shoppingitem + '"]/a/following-sibling::div/p');

        }
        this.changePlan = (planname) => {
            return by.xpath('//a[text()="' + planname + '"]')
        }

        this.closeToolTip = (shoppingitem)=>{
            return by.xpath('//span[normalize-space(text())="' + shoppingitem + '"]/a/following-sibling::div//i[@class="icon  icon-exit"]')
        }






    }

}


module.exports = PlanDetailsPageLocators;
