//cxauto67 


"use strict"
var TestData        = require('../../testData/' + testDataEnv + '/providers/cxauto67.json');
var dirSearch       = new(require('../../pageObjects/providers/directory-search-page.js'));
var providerDetails = new(require('../../pageObjects/providers/provider-details-page.js'));
var feedback        = new(require('../../pageObjects/providers/feedback-page.js'));
var perInfo         = new(require('../../pageObjects/cxinit/perInfo-page.js'));


describe('cxauto67: Prov Dir', function() {
    beforeEach(function() {
        jasmine.addMatchers(custommatcher.customMatchers);
        Utility.openApplication('');
    });



    it('ProvDir_1: Should verify Provider Page, Facility Page and Office Page by View link', function() {
        dirSearch.location.setText(TestData.Provider_Name.ZipCode);
        dirSearch.findDentist.click();
        providerDetails.openView(TestData.Provider_Name.PName, 'VIEW');
        providerDetails.letUsKnow.click();
        expect(providerDetails.headerText.getText()).toEqual(TestData.Provider_Name.Heading);
        providerDetails.workatOffice('I work at this office.').click();
        expect(providerDetails.workatOffice_links('log in').isPresentAndDisplayed()).toBeTruthy();
        expect(providerDetails.workatOffice_links('Practice Location Information form').isPresentAndDisplayed()).toBeTruthy();
        expect(providerDetails.workatOffice_links('Log in').isPresentAndDisplayed()).toBeTruthy();
        providerDetails.workatOffice("I don't work at this office.").click();
        expect(providerDetails.feedback_inaccuracy.isPresentAndDisplayed()).toBeTruthy();
        expect(providerDetails.dontworkSubmit_inaccuracy.isPresentAndDisplayed()).toBeTruthy();


    });

    it('ProvDir_2: Should verify Provider Page, Facility Page and Office Page from Providers link', function() {
        dirSearch.location.setText(TestData.Provider_Name.ZipCode);
        dirSearch.findDentist.click();
        providerDetails.openView(TestData.Provider_Name.PName, 'PLACE');
        providerDetails.letUsKnow.click();
        expect(providerDetails.headerText.getText()).toEqual(TestData.Provider_Name.Heading);
        providerDetails.workatOffice('I work at this office.').click();
        expect(providerDetails.workatOffice_links('log in').isPresentAndDisplayed()).toBeTruthy();
        expect(providerDetails.workatOffice_links('Practice Location Information form').isPresentAndDisplayed()).toBeTruthy();
        expect(providerDetails.workatOffice_links('Log in').isPresentAndDisplayed()).toBeTruthy();
        providerDetails.workatOffice("I don't work at this office.").click();
        expect(providerDetails.feedback_inaccuracy.isPresentAndDisplayed()).toBeTruthy();
        expect(providerDetails.dontworkSubmit_inaccuracy.isPresentAndDisplayed()).toBeTruthy();

    });

    it('ProvDir_3: Should verify Provider Page, Facility Page and Office Page by Facility link', function() {
        dirSearch.location.setText(TestData.Provider_Name.ZipCode);
        dirSearch.findDentist.click();
        providerDetails.openView(TestData.Provider_Name.PName, 'Facility');
        providerDetails.letUsKnow.click();
        expect(providerDetails.headerText.getText()).toEqual(TestData.Provider_Name.Heading);
        providerDetails.workatOffice('I work at this office.').click();
        expect(providerDetails.workatOffice_links('log in').isPresentAndDisplayed()).toBeTruthy();
        expect(providerDetails.workatOffice_links('Practice Location Information form').isPresentAndDisplayed()).toBeTruthy();
        expect(providerDetails.workatOffice_links('Log in').isPresentAndDisplayed()).toBeTruthy();
        providerDetails.workatOffice("I don't work at this office.").click();
        expect(providerDetails.feedback_inaccuracy.isPresentAndDisplayed()).toBeTruthy();
        expect(providerDetails.dontworkSubmit_inaccuracy.isPresentAndDisplayed()).toBeTruthy();

    });

});
