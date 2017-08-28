/*Please make selections in the initial opening of the main page.
make a network provider selection.
make the search 
open the refine search control
open the network selection control within
Confirm the same network is selected*/
"use strict"
var TestData = require('../../testData/'+testDataEnv+'/providers/cxinit2-1207.json');
var dirSearch = new(require('../../pageObjects/providers/directory-search-page.js'));
var providerDetails = new(require('../../pageObjects/providers/provider-details-page.js'));

describe('CXINIT2-1208: Prov Dir', function() {
    beforeEach(function() {
        Utility.openApplication('');
    });
           //Select DentalPPO and confirm the same network is Selected in Refine Search
    it('PPOView_1:Should confirm network check in Refine Search', function() {
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
        //Select DentalPremier and confirm the same network is Selected in Refine Search
    it('DDPrem_2: Should confirm network check in Refine Search', function() {
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
            //Select DeltaCareUSA and confirm the same network is Selected in Refine Search
    it('DelCareUsa_3: Should confirm network check in Refine Search', function() {
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
            //Select DentalPPO & DentalPremier and Verify the same network is Selected in Refine Search
    it('PPOView & DDPrem_4: Should confirm network check in Refine Search', function() {
        dirSearch.location.setText(TestData.partialLocation);
        dirSearch.selectHomeAddress(TestData.fullLocation);
        expect(dirSearch.deltaDentalPPO.isPresentAndDisplayed()).toBeTruthy();
        dirSearch.deltaDentalPPO.check();
        expect(dirSearch.deltaDentalPremier.isPresentAndDisplayed()).toBeTruthy();
        dirSearch.deltaDentalPremier.check();
        dirSearch.findDentist.click();
        dirSearch.refineSearch.click();
        dirSearch.filterMenuItem('Networks').click();
        expect(dirSearch.iNDeltaDentalPPO.isPresentAndDisplayed()).toBeTruthy();
        expect(dirSearch.iNDeltaDentalPPO.isSelected()).toBeTruthy();
        expect(dirSearch.iNDeltaDentalPremier.isPresentAndDisplayed()).toBeTruthy();
        expect(dirSearch.iNDeltaDentalPremier.isSelected()).toBeTruthy();
    });
        // Select DentalPremier & DeltaCareUSA and confirm the same network is Selected in Refine Search
    it('DDPrem & DelCareUsa_5: Should confirm network check in Refine Search', function() {
        dirSearch.location.setText(TestData.partialLocation);
        dirSearch.selectHomeAddress(TestData.fullLocation);
        expect(dirSearch.deltaDentalPremier.isPresentAndDisplayed()).toBeTruthy();
        dirSearch.deltaDentalPremier.check();
        expect(dirSearch.deltaCareUSA.isPresentAndDisplayed()).toBeTruthy();
        dirSearch.deltaCareUSA.check();
        dirSearch.findDentist.click();
        dirSearch.refineSearch.click();
        dirSearch.filterMenuItem('Networks').click();
        expect(dirSearch.iNDeltaDentalPremier.isPresentAndDisplayed()).toBeTruthy();
        expect(dirSearch.iNDeltaDentalPremier.isSelected()).toBeTruthy();
         expect(dirSearch.iNDeltaCareUSA.isPresentAndDisplayed()).toBeTruthy();
        expect(dirSearch.iNDeltaCareUSA.isSelected()).toBeTruthy();
    });
        // Select DentalPPO & DeltaCareUSA and confirm the same network is Selected in Refine Search
     it('PPOView & DelCareUsa_6: Should confirm network check in Refine Search', function() {
        dirSearch.location.setText(TestData.partialLocation);
        dirSearch.selectHomeAddress(TestData.fullLocation);
        expect(dirSearch.deltaDentalPPO.isPresentAndDisplayed()).toBeTruthy();
        dirSearch.deltaDentalPPO.check();
        expect(dirSearch.deltaCareUSA.isPresentAndDisplayed()).toBeTruthy();
        dirSearch.deltaCareUSA.check();
        dirSearch.findDentist.click();
        dirSearch.refineSearch.click();
        dirSearch.filterMenuItem('Networks').click();
        expect(dirSearch.iNDeltaDentalPPO.isPresentAndDisplayed()).toBeTruthy();
        expect(dirSearch.iNDeltaDentalPPO.isSelected()).toBeTruthy();
        expect(dirSearch.iNDeltaCareUSA.isPresentAndDisplayed()).toBeTruthy();
        expect(dirSearch.iNDeltaCareUSA.isSelected()).toBeTruthy();
    });
            //Select DentalPPO, DentalPremier & DeltaCareUSA and confirm the same network is Selected in Refine Search
     it('PPOView, DDPrem & DelCareUsa_7: Should confirm network check in Refine Search', function() {
        dirSearch.location.setText(TestData.partialLocation);
        dirSearch.selectHomeAddress(TestData.fullLocation);
        expect(dirSearch.deltaDentalPremier.isPresentAndDisplayed()).toBeTruthy();
        dirSearch.deltaDentalPremier.check();
        expect(dirSearch.deltaCareUSA.isPresentAndDisplayed()).toBeTruthy();
        dirSearch.deltaCareUSA.check();
        dirSearch.findDentist.click();
        dirSearch.refineSearch.click();
        dirSearch.filterMenuItem('Networks').click();
        expect(dirSearch.iNDeltaDentalPremier.isPresentAndDisplayed()).toBeTruthy();
        expect(dirSearch.iNDeltaDentalPremier.isSelected()).toBeTruthy();
         expect(dirSearch.iNDeltaCareUSA.isPresentAndDisplayed()).toBeTruthy();
        expect(dirSearch.iNDeltaCareUSA.isSelected()).toBeTruthy();
    });

});
