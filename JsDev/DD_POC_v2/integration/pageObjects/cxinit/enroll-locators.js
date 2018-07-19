"use strict";

class HomePageLocators {
    constructor() {
        this.overridelink      = by.id('overridelink');
        // Home page objects
        this.PlanName          = by.name('planName');
        this.PlanType          = by.name('planType');
        this.PlanCode          = by.name('planCode');
        this.CoverageStartDate = by.name('coverageStartDate');
        this.PlanState         = by.name('planState');
        this.PlanZip           = by.name('planZip');
        this.Country           = by.name('country');
        this.EnrollmentFee     = by.name('enrollmentFee');
        this.AnnualCost        = by.name('annualCost');
        this.CoverageType      = by.name('coverageType');
        this.PlanID            = by.name('planId');
        this.IssuerCode        = by.name('issuerCode');
        this.NoOFCovered       = by.name('noOfCovered');
        this.Dob               = by.name('a_dob');
        this.Submit            = by.xpath('//input[@value="Submit"]');
        this.Zipcode           = by.id('zip');
        this.dob               = by.id('dob');
        this.addDependent      = by.id('addChild');
        this.dependentDOB      = function(depno) {
            console.log("depno====" + depno)
            return element(by.xpath('//a[@id="addChild"]/parent::div/div[' + depno + ']/input'));
        };
        this.enroll            = function(planName) {
          return element(by.xpath('//span[normalize-space(text())="' + planName + '"]/ancestor::td//following-sibling::td//button[@id="applyQuotesPage"]'))
       // return element(by.xpath('//span[normalize-space(text())="' + planName + '"]/ancestor::td//following-sibling::td//a[@class="planDetails"]'))
        }
        this.Coverage_Type     = by.id('coverage_type');
        this.Effcdate          = by.id('effDD');
        this.Go                = by.id('btn_saveBig');
        this.PpoEnrollBtn      = by.xpath('//td[contains(text(),"PPO")]/following-sibling::td//button');
        this.changeSearch      = by.id('modify-search');
        this.quoteInfoTxt      = by.xpath('//div[@class="summary grey-text"]');
        this.quoteZipTxt       = by.xpath('//label[@for="zip"]');
        this.quotesDepTxt      = by.xpath('//label[@for="noofcovered"]');
        this.birtdateText      = by.id('birthdate');
        this.depBirthDayText   = function(depno){
            return by.xpath('//legend[normalize-space(text())="Dependent '+depno+' Birthdate"]')
                                                      
        };
        this.costcoZip         = by.id('zip');
        this.viewPlans = by.xpath('//input[@value="View Plans"]');


    }
}

module.exports = HomePageLocators;