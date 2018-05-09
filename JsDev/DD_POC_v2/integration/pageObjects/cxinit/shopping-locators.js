"use strict";

class ShoppingPageLocators {
    constructor() {

        // Shopping page objects
        this.back                       = by.css('a.back-arrow-link');
        this.headerContent              = by.css('h1.shopping-header-content');
        this.State                      = by.name('state');
        this.Zipcode                    = by.name('zip');
        this.NoOFCovered                = by.id('noofcovered');
        this.noofdependents             = by.id('noofdependents');
        this.Effcdate                   = by.id('eff_date');
        this.Submit                     = by.xpath('//input[@value="Submit"]');
        this.Zipcode_error              = by.id('zip-error');
        this.noofcovered_error          = by.id('noofcovered-error');
        this.addDependent               = by.id('plusButton');
        this.Showplans                  = by.id('showPlans');
        this.removeDependent            = by.id('minusButton');
        this.serverErrMsgnoofCovered    = by.css('a.error.noofcovered-error');
        this.serverErrMsgZipcode        = by.css('a.error.zip-error');
        this.serverErrMsgInvalidZipcode = by.css('a.error');
        this.zipCodeserverError         = by.css('div.error-container.global-margin');
        this.fieldBdMM                  = by.id('app0_dob_month');
        this.errorBdMM                  = by.id('app0_dob_month-error');
        this.fieldBdDD                  = by.id('app0_dob_day');
        this.errorBdDD                  = by.id('app0_dob_day-error');
        this.fieldBdYyyy                = by.id('app0_dob_year');
        this.errorBdYyyy                = by.id('app0_dob_year-error');
        this.appErrorMsgs               = by.xpath('//fieldset[@id="birthdate-fieldset"]/following-sibling::div');
        this.errorInvalidDob            = by.css('a.error.birthdate-error');
        this.minAgeError                = by.id('birthdate-fieldset-error');
        this.depDob                     = by.xpath('(//fieldset[contains(@id,"dependent_dob_fieldset")])');
        this.dependentfieldDBMM         = function(dependentName) {
        var number                      = dependentName.split('Dependent')[1];
            return by.xpath('//legend[text()="Dependent ' + number + ' Birthdate "]//following::input[1]');
        };
        this.dependenterrorfieldDBMM    = function(dependentName) {
            var number = dependentName.split('Dependent')[1];
            return by.xpath('(//legend[normalize-space(text())="Dependent ' + number + ' Birthdate"]/ancestor::fieldset/following-sibling::div/a[contains(@id,"dob_month")])[1]');
        };
        this.dependentfieldDBDD         = function(dependentName) {
            var number = dependentName.split('Dependent')[1];
            return by.xpath('//legend[text()="Dependent ' + number + ' Birthdate "]//following::input[2]');
        };
        this.dependenterrorfieldDBDD    = function(dependentName) {
            var number = dependentName.split('Dependent')[1];
            return by.xpath('(//legend[normalize-space(text())="Dependent ' + number + ' Birthdate"]/ancestor::fieldset/following-sibling::div/a[contains(@id,"dob_day")])[1]');
        };
        this.dependentfieldDBYY         = function(dependentName) {
            var number = dependentName.split('Dependent')[1];
            return by.xpath('//legend[text()="Dependent ' + number + ' Birthdate "]//following::input[3]');
        };
        this.dependenterrorfieldDBYY    = function(dependentName) {
            var number = dependentName.split('Dependent')[1];
            return by.xpath('(//legend[normalize-space(text())="Dependent ' + number + ' Birthdate"]/ancestor::fieldset/following-sibling::div/a[contains(@id,"dob_year")])[1]');
        };

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
