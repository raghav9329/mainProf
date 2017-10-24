"use strict";

class ShoppingPageLocators {
    constructor() {

        // Shopping page objects

        this.State = by.name('state');
        this.Zipcode = by.name('zip');
        this.NoOFCovered = by.id('noofcovered');
        this.noofdependents = by.id('noofdependents');
        this.Effcdate = by.id('eff_date');
        this.Submit = by.xpath('//input[@value="Submit"]');
        this.Zipcode_error = by.id('zip-error');
        this.noofcovered_error = by.id('noofcovered-error');
        this.addDependent = by.id('plusButton');
        this.Showplans = by.id('showPlans');
        this.removeDependent = by.id('minusButton');
        this.serverErrMsgnoofCovered = by.css('a.error.noofcovered-error');
        this.serverErrMsgZipcode = by.css('a.error.zip-error');

        /*this.PlanName = by.name('planName');
        this.PlanType = by.name('planType');
        this.PlanCode = by.name('planCode');
        this.CoverageStartDate = by.name('coverageStartDate');
        this.PlanState = by.name('planState');
        this.PlanZip = by.name('planZip');
        this.Country = by.name('country');
        this.EnrollmentFee = by.name('enrollmentFee');
        this.AnnualCost = by.name('annualCost');
        this.CoverageType = by.name('coverageType');
        this.PlanID = by.name('planId');
        this.IssuerCode = by.name('issuerCode');
        
        this.Dob = by.name('a_dob');
        this.Submit = by.xpath('//input[@value="Submit"]');

        
        this.dob = by.id('dob');
        this.addDependent = by.id('addChild');
        this.dependentDOB = function(depno) {
            console.log("depno===="+depno)
            return element(by.xpath('//a[@id="addChild"]/parent::div/div[' + depno + ']/input'));
        };
        this.enroll = function(planName){
            return element(by.xpath('//span[normalize-space(text())="'+planName+'"]/ancestor::td//following-sibling::td//button[@id="applyQuotesPage"]'))
        }
        this.Coverage_Type = by.id('coverage_type');
        this.Effcdate = by.id('effDD');
        this.Go = by.id('btn_saveBig');
        this.PpoEnrollBtn = by.xpath('//td[contains(text(),"PPO")]/following-sibling::td//button');*/


    }
}

module.exports = ShoppingPageLocators;
