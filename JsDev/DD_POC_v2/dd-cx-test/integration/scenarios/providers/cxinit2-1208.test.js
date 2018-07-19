/*Please make selections in the initial opening of the main page.
make a network provider selection.
make the search 
open the refine search control
open the network selection control within
Confirm the same network is selected*/
"use strict"
var TestData = require("../../testData/providers/cxinit2-1208.json");
var dirSearch = new(require('../../pageObjects/providers/directory-search-page.js'));
var providerDetails = new(require('../../pageObjects/providers/provider-details-page.js'));

describe('CXINIT2-1208: Prov Dir', function() {
    beforeEach(function() {
        Utility.openApplication('');
    });

    it('PPOView_1: Select DentalPPO and confirm the same network is Selected in Refine Search', function() {
        dirSearch.location.setText(TestData.partialLocation);
        dirSearch.selectHomeAddress(TestData.fullLocation);
        expect(dirSearch.deltaDentalPPO.isPresentAndDisplayed()).toBeTruthy();
        dirSearch.deltaDentalPPO.check();
        dirSearch.findDentist.click();
        dirSearch.refineSearch.click();
        dirSearch.filterMenuItem('Networks').click();
        expect(dirSearch.iNDeltaDentalPPO.isPresentAndDisplayed()).toBeTruthy();
        expect(dirSearch.iNDeltaDentalPPO.isSelected()).toBeTruthy();
    });

    it('DDPrem_2: Select DentalPremier and confirm the same network is Selected in Refine Search', function() {
        dirSearch.location.setText(TestData.partialLocation);
        dirSearch.selectHomeAddress(TestData.fullLocation);
        expect(dirSearch.deltaDentalPremier.isPresentAndDisplayed()).toBeTruthy();
        dirSearch.deltaDentalPremier.check();
        dirSearch.findDentist.click();
        dirSearch.refineSearch.click();
        dirSearch.filterMenuItem('Networks').click();
        expect(dirSearch.iNDeltaDentalPremier.isPresentAndDisplayed()).toBeTruthy();
        expect(dirSearch.iNDeltaDentalPremier.isSelected()).toBeTruthy();
    });

    it('DelCareUsa_3: Select DeltaCareUSA and confirm the same network is Selected in Refine Search', function() {
        dirSearch.location.setText(TestData.partialLocation);
        dirSearch.selectHomeAddress(TestData.fullLocation);
        expect(dirSearch.deltaCareUSA.isPresentAndDisplayed()).toBeTruthy();
        dirSearch.deltaCareUSA.check();
        dirSearch.findDentist.click();
        dirSearch.refineSearch.click();
        dirSearch.filterMenuItem('Networks').click();
        expect(dirSearch.iNDeltaCareUSA.isPresentAndDisplayed()).toBeTruthy();
        expect(dirSearch.iNDeltaCareUSA.isSelected()).toBeTruthy();
    });

});
