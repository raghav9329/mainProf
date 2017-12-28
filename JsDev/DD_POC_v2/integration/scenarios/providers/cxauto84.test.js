"use strict"
var TestData = require('../../testData/' + testDataEnv + '/providers/cxauto84.json');
var dirSearch = new(require('../../pageObjects/providers/directory-search-page.js'));
var providerDetails = new(require('../../pageObjects/providers/provider-details-page.js'));
var footer = new(require('../../pageObjects/providers/footer-page.js'));


//CXAUTO-84:Cutover Banner
describe('CXAUTO-84:Spanish', function() {
    beforeEach(function() {
        jasmine.addMatchers(custommatcher.customMatchers);
        Utility.openApplication('');

    });
    var url1, url2;
    //CXAUTO-84:Spanish Language
    it('CXAUTO-84:Cutover Banner:Verify "Go Back" button and functionality in Banner', function() {
        expect(providerDetails.menuButton.isPresentAndDisplayed()).toBeTruthy();
        dirSearch.location.setText(TestData.zipcode);
        dirSearch.findDentist.click();
        dirSearch.refineSearch.click();
        dirSearch.filterMenuItem('Specialties').click();
        dirSearch.selectSpecialities(TestData.specialty);
        dirSearch.filterMenuItem('Networks').click();
        dirSearch.iNDeltaDentalPPO.check();
        dirSearch.apply.click();

        browser.getCurrentUrl().then(function(url) {
            console.log('URL=======' +url)
            url1 = url.slice(16);
            console.log('1st URL===========' + url1);
        })

        providerDetails.menuButton.click();
        expect(providerDetails.spanishOption.isPresentAndDisplayed()).toBeTruthy();
        providerDetails.spanishOption.click();
        browser.getCurrentUrl().then(function(url) {
            url2 = url.slice(29);
            console.log('2nd URL===========' + url2);
        })

        //Validating the URL after slicing         
        expect(url1).toEqual(url2);
    });



    /*it('CXAUTO-84:Cutover Banner:Verify "Go Back" button and functionality in Banner', function() {
        expect(providerDetails.menuButton.isPresentAndDisplayed()).toBeTruthy();

        browser.getCurrentUrl().then(function(url) {
            url1 = url;
            console.log('1st URL===========' + url);
        })

        providerDetails.menuButton.click();
        expect(providerDetails.spanishOption.isPresentAndDisplayed()).toBeTruthy();
        providerDetails.spanishOption.click();
        browser.getCurrentUrl().then(function(url) {
            url2 = url;
            console.log('2nd URL===========' + url);
        })

        dirSearch.location.setText(TestData.zipcode);
        dirSearch.spanish_finddentist.click();
        expect(url1).toContain(url2);
        expect(dirSearch.goBackToOldSite.isPresentAndDisplayed()).toBeTruthy();
        expect(providerDetails.location.getValue()).toEqual(TestData.location);
        expect(dirSearch.goBackToOldSite.isPresentAndDisplayed()).toBeTruthy();
        dirSearch.goBackToOldSite.click();

        expect(dirSearch.checkItOutNewSite.isPresentAndDisplayed()).toBeTruthy();
        expect(dirSearch.oldLocation.getValue()).toEqual(TestData.location);
        dirSearch.checkItOutNewSite.click();
        expect(dirSearch.goBackToOldSite.isPresentAndDisplayed()).toBeTruthy();
        expect(providerDetails.location.getValue()).toEqual(TestData.location);
        expect(dirSearch.filterMenuItem('Resultados de búsqueda')).toEqual(TestData.spanishResults);
        expect(url1).toContain(url2);
    });*/
});
