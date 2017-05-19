"use strict"
var TestData = require("../../testData/providers/cxinit2.4.json");
var dirSearch = new(require('../../pageObjects/providers/directory-search-page.js'));

describe('Provider Search Validation', function() {
    beforeEach(function() {
        Utility.openApplication('');
    });
    it('Verify all fields and buttons are present and displayed', function() {
        expect(dirSearch.loginheader.isPresentAndDisplayed()).toBeTruthy();
        expect(dirSearch.login.isPresentAndDisplayed()).toBeTruthy();
        expect(dirSearch.headerText.getText()).toContain(TestData.Header_SearchResultsPage);
        expect(dirSearch.location.isPresentAndDisplayed()).toBeTruthy();
        expect(dirSearch.viewDentists.isPresentAndDisplayed()).toBeTruthy();
    });
    it('Verify the functionality of view Dentists when we enter invalid Address', function() {
        dirSearch.location.setText(TestData.ZipCode + '\t');
        dirSearch.viewDentists.click();
        expect(dirSearch.refineSearch.isPresentAndDisplayed()).toBeFalsy();
        expect(dirSearch.headerText.getText()).toContain(TestData.Header_InvalidAddress);
    });
    it('Verify the functionality of view Dentists with blank Address', function() {
        dirSearch.location.setText('');
        dirSearch.viewDentists.click();
        expect(dirSearch.refineSearch.isPresentAndDisplayed()).toBeFalsy();
        expect(dirSearch.headerText.getText()).toContain(TestData.Header_InvalidAddress);
    });
    it('', function() {
        dirSearch.location.setText(TestData.HAddress_ZIP.PartialAddress);
        dirSearch.selectHomeAddress(TestData.HAddress_ZIP.FullAddress);
        browser.sleep(2000);
        expect(dirSearch.location.getAttribute('value')).toBe('40.7409957, -73.9896776');
        dirSearch.viewDentists.click();
        expect(dirSearch.refineSearch.isPresentAndDisplayed()).toBeTruthy();
        expect(dirSearch.headerText.getText()).toContain(TestData.Header_SearchResultsPage);
        expect(dirSearch.providersListing.getCount()).toEqual(10);
        // For Unit testing only hardcoded verification data. Later will move to testdata file
        expect(dirSearch.getProviderdetails('Jeffrey Gold', 'SPECIALTY')).toEqual('General Dentist');
        expect(dirSearch.getProviderdetails('Jeffrey Gold', 'ADDRESSNAME')).toEqual('Aesthetic Dentistry PC');
        expect(dirSearch.getProviderdetails('Jeffrey Gold', 'NETWORK')).toContain('2PREMIER,2PPO');
        expect(dirSearch.getProviderdetails('Jeffrey Gold', 'ADDRESS')).toEqual('156 5th Ave Ste 304, , New York, NY 100108255');
    });

    it('', function() {
        dirSearch.location.setText(TestData.HAddress_ZIP.PartialAddress);
        dirSearch.selectHomeAddress(TestData.HAddress_ZIP.FullAddress);
        dirSearch.viewDentists.click();
        expect(dirSearch.generalDentist.isPresentAndDisplayed()).toBeFalsy();
        expect(dirSearch.endodontist.isPresentAndDisplayed()).toBeFalsy();
        expect(dirSearch.oralSurgeon.isPresentAndDisplayed()).toBeFalsy();
        expect(dirSearch.orthodontist.isPresentAndDisplayed()).toBeFalsy();
        expect(dirSearch.pediatricDentist.isPresentAndDisplayed()).toBeFalsy();
        expect(dirSearch.periodontist.isPresentAndDisplayed()).toBeFalsy();
        expect(dirSearch.prosthodontist.isPresentAndDisplayed()).toBeFalsy();
        expect(dirSearch.publicHealthDentist.isPresentAndDisplayed()).toBeFalsy();
        expect(dirSearch.fullTimeFaculty.isPresentAndDisplayed()).toBeFalsy();
        expect(dirSearch.hygienist.isPresentAndDisplayed()).toBeFalsy();
        expect(dirSearch.XRLaboratory.isPresentAndDisplayed()).toBeFalsy();
        expect(dirSearch.oralPathology.isPresentAndDisplayed()).toBeFalsy();
        dirSearch.refineSearch.click();
        expect(dirSearch.generalDentist.isPresentAndDisplayed()).toBeTruthy();
        expect(dirSearch.endodontist.isPresentAndDisplayed()).toBeTruthy();
        expect(dirSearch.oralSurgeon.isPresentAndDisplayed()).toBeTruthy();
        expect(dirSearch.orthodontist.isPresentAndDisplayed()).toBeTruthy();
        expect(dirSearch.pediatricDentist.isPresentAndDisplayed()).toBeTruthy();
        expect(dirSearch.periodontist.isPresentAndDisplayed()).toBeTruthy();
        expect(dirSearch.prosthodontist.isPresentAndDisplayed()).toBeTruthy();
        expect(dirSearch.publicHealthDentist.isPresentAndDisplayed()).toBeTruthy();
        expect(dirSearch.fullTimeFaculty.isPresentAndDisplayed()).toBeTruthy();
        expect(dirSearch.hygienist.isPresentAndDisplayed()).toBeTruthy();
        expect(dirSearch.XRLaboratory.isPresentAndDisplayed()).toBeTruthy();
        expect(dirSearch.oralPathology.isPresentAndDisplayed()).toBeTruthy();

    });
    it('', function() {
        dirSearch.location.setText(TestData.HAddress_ZIP.PartialAddress);
        dirSearch.selectHomeAddress(TestData.HAddress_ZIP.FullAddress);
        dirSearch.viewDentists.click();
        dirSearch.openView('Jeffrey Gold');
    })


});
