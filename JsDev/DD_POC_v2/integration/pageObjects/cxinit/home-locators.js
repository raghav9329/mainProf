"use strict";

class HomePageLocators {
    constructor() {

        this.overridelink=by.id('overridelink');
        // Home page objects
        this.PlanName = by.name('planName');
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
        this.NoOFCovered = by.name('noOfCovered');
        this.Submit = by.xpath('//input[@name="noOfCovered"]/following-sibling::input');

             
    }
}

module.exports = HomePageLocators;
