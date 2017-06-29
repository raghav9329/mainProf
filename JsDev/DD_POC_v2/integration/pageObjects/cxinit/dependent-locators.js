"use strict";

class DependentsLocators {
    constructor() {
        // Dependents Info page objects
        this.addDependent = by.id('addDep');
        this.getdependent = by.xpath('//h2[1]');
        this.dependentparent = function(dependentName) {
            var number = dependentName.split('Dependent')[1];
            return by.xpath('//h2[text()="Dependent"]/span[text()="' + number + '"]/parent::h2/parent::div');
        };


        // Please donot delete commented code. We have an issue while building child locator based on Parent Locator

        //this.firstnameNew = by.xpath('//input[contains(@id,"firstname")]');
        // this.middleName = by.xpath('//input[contains(@id,"middleName")]');
        // this.lastname = by.xpath('//input[contains(@id,"lastname")]');
        // this.month = by.xpath('//input[contains(@id,"month")]');
        // this.day = by.xpath('//input[contains(@id,"day")]');
        // this.year = by.xpath('//input[contains(@id,"year")]');
        // this.gender = by.xpath('//select[contains(@id,"gender")]');
        // this.relationship = by.xpath('//select[contains(@id,"relationship")]');

        this.firstname = function(dependentName) {
            var number = dependentName.split('Dependent')[1];
            return by.xpath('(//h2[contains(text(),"Dependent")]/parent::div)[' + number + ']//input[contains(@id,"firstname")]');
        };
        this.middleName = function(dependentName) {
            var number = dependentName.split('Dependent')[1];
            return by.xpath('(//h2[contains(text(),"Dependent")]/parent::div)[' + number + ']//input[contains(@id,"middleName")]');
        };
        this.lastname = function(dependentName) {
            var number = dependentName.split('Dependent')[1];
            return by.xpath('(//h2[contains(text(),"Dependent")]/parent::div)[' + number + ']//input[contains(@id,"lastname")]');
        };
        this.month = function(dependentName) {
            var number = dependentName.split('Dependent')[1];
            return by.xpath('(//h2[contains(text(),"Dependent")]/parent::div)[' + number + ']//input[contains(@id,"month")]');
        };
        this.date = function(dependentName) {
            var number = dependentName.split('Dependent')[1];
            return by.xpath('(//h2[contains(text(),"Dependent")]/parent::div)[' + number + ']//input[contains(@id,"day")]');
        };
        this.year = function(dependentName) {
            var number = dependentName.split('Dependent')[1];
            return by.xpath('(//h2[contains(text(),"Dependent")]/parent::div)[' + number + ']//input[contains(@id,"year")]');
        };
        this.gender = function(dependentName) {
            var number = dependentName.split('Dependent')[1];
            return by.xpath('(//h2[contains(text(),"Dependent")]/parent::div)[' + number + ']//select[contains(@id,"gender")]');
        };
        this.relationship = function(dependentName) {
            var number = dependentName.split('Dependent')[1];
            return by.xpath('(//h2[contains(text(),"Dependent")]/parent::div)[' + number + ']//select[contains(@id,"relationship")]');
        };
        this.deleteDependent = function(dependentName) {
            var number = dependentName.split('Dependent')[1];
            return by.xpath('(//h2[contains(text(),"Dependent")]/parent::div)[' + number + ']//img[@class="float-right deleteDep"]');
        };

        this.isHandicapped = function(dependentName) {
            var number = dependentName.split('Dependent')[1];
            return by.xpath('(//h2[contains(text(),"Dependent")]/parent::div)[' + number + ']//input[contains(@id,"handicapped")]');
        };

        this.handicappedHelpTxt = function(dependentName) {
            var number = dependentName.split('Dependent')[1];
            return by.xpath('(//h2[contains(text(),"Dependent")]/parent::div)[' + number + ']//input[contains(@id,"handicapped")]/parent::label');
        };


        // Client Side Error
        this.errorRelationship = function(dependentName) {
            var number = dependentName.split('Dependent')[1];
            return by.xpath('(//h2[contains(text(),"Dependent")]/parent::div)[' + number + ']//a[contains(@id,"relationship")]');
        };
        this.errorFirstName = function(dependentName) {
            var number = dependentName.split('Dependent')[1];
            return by.xpath('(//h2[contains(text(),"Dependent")]/parent::div)[' + number + ']//a[contains(@id,"firstname")]');
        };
        this.errorLastName = function(dependentName) {
            var number = dependentName.split('Dependent')[1];
            return by.xpath('(//h2[contains(text(),"Dependent")]/parent::div)[' + number + ']//a[contains(@id,"lastname")]');
        };
        this.errorGender = function(dependentName) {
            var number = dependentName.split('Dependent')[1];
            return by.xpath('(//h2[contains(text(),"Dependent")]/parent::div)[' + number + ']//a[contains(@id,"gender")]');
        };
        this.errorMonth = function(dependentName) {
            var number = dependentName.split('Dependent')[1];
            return by.xpath('(//h2[contains(text(),"Dependent")]/parent::div)[' + number + ']//a[contains(@id,"month")]');
        };
        this.errorDay = function(dependentName) {
            var number = dependentName.split('Dependent')[1];
            return by.xpath('(//h2[contains(text(),"Dependent")]/parent::div)[' + number + ']//a[contains(@id,"day")]');
        };
        this.errorYear = function(dependentName) {
            var number = dependentName.split('Dependent')[1];
            return by.xpath('(//h2[contains(text(),"Dependent")]/parent::div)[' + number + ']//a[contains(@id,"year")]');
        };


        //Server Error Locators
        this.serErrorRelationship = by.css('a[class*="relationship"]');
        this.serErrorFirstName = by.css('a[class*="firstname"]');
        this.serErrorLastName = by.css('a[class*="lastname"]');
        this.serErrorGender = by.css('a[class*="gender"]');
        this.serErrorMonth = by.css('a[class*="month"]');
        this.serErrorDay = by.css('a[class*="day"]');
        this.serErrorYear = by.css('a[class*="year"]');

        this.next = by.id('nextButton');
        this.back = by.linkText('Back');

        this.gobackPremiumPopUP = by.id('overlayBackBtn');
        this.continue = by.xpath('//form[@id="dependent_form"]//div[@class="actions"]//input');
        this.newAdditionalPrice = by.xpath('//span[@class="new-price"]');
        this.dependentparentNew = by.xpath('//h2[text()="Dependent"]/parent::div');
        this.premiumChangePopUp = by.xpath('//div[@class="popup alert"]');

        this.premiumAmount = by.css('aside.product-selection-summary div.header-plan span');
        this.enrollmentFee = by.className('enrollment-fee');
        this.depError = by.css('div.error-container.global-margin label');

    }
}

module.exports = DependentsLocators;
