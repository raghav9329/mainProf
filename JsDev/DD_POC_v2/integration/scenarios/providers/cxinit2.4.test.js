"use strict"
var TestData = require("../../testData/providers/cxinit2.4.json");
var dirSearch = new(require('../../pageObjects/providers/directory-search-page.js'));
var providerDetails = new(require('../../pageObjects/providers/provider-details-page.js'));

describe('Provider Search Validation', function() {
    beforeEach(function() {
        Utility.openApplication('');
    });
    it('ProvDir_1: Verify all fields and buttons are present and displayed', function() {
        expect(dirSearch.loginheader.isPresentAndDisplayed()).toBeTruthy();
        expect(dirSearch.login.isPresentAndDisplayed()).toBeTruthy();
        expect(dirSearch.headerText.getText()).toContain(TestData.Header_SearchResultsPage);
        expect(dirSearch.location.isPresentAndDisplayed()).toBeTruthy();
        expect(dirSearch.viewDentists.isPresentAndDisplayed()).toBeTruthy();
    });
    it('ProvDir_2: Verify the functionality of view Dentists when we enter invalid Address', function() {
        dirSearch.location.setText(TestData.ZipCode + '\t');
        dirSearch.viewDentists.click();
        expect(dirSearch.refineSearch.isPresentAndDisplayed()).toBeFalsy();
        expect(dirSearch.headerText.getText()).toContain(TestData.Header_InvalidAddress);
    });
    it('ProvDir_3: Verify the functionality of view Dentists with blank Address', function() {
        dirSearch.location.setText('');
        dirSearch.viewDentists.click();
        expect(dirSearch.refineSearch.isPresentAndDisplayed()).toBeFalsy();
        expect(dirSearch.headerText.getText()).toContain(TestData.Header_InvalidAddress);
    });
    it('ProvDir_4: Verify the search results count and provider details ', function() {
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

    it('ProvDir_5: Verify all filter values are displayed or not for refine search functionality', function() {
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

    it('ProvDir_6: Verify the Provider details by selecting specific provider from provider search results', function() {
        dirSearch.location.setText(TestData.HAddress_ZIP.PartialAddress);
        dirSearch.selectHomeAddress(TestData.HAddress_ZIP.FullAddress);
        dirSearch.viewDentists.click();
        expect(dirSearch.providersListing.getCount()).toEqual(1);
        dirSearch.openView('Yuliya Kanatova');

        // Provider distance
        expect(providerDetails.providerDistance.getText()).toEqual('Provider distance');

        // Provider General information
        expect(providerDetails.providerName.getText()).toEqual('provider name');
        expect(providerDetails.providerSpecialty.getText()).toEqual('provider speciality');
        expect(providerDetails.providerNetwork.getText()).toEqual('provider network');
        expect(providerDetails.providerAvailability.getText()).toEqual('provider availability');

        //Provider Address
        expect(providerDetails.providerPlaceName.getText()).toEqual('provider place ');
        expect(providerDetails.providerAddressStreet.getText()).toEqual('Provider street');
        expect(providerDetails.providerAddressCity.getText()).toEqual('provider city');
        expect(providerDetails.providerAddressState.getText()).toEqual('provider state');
        expect(providerDetails.providerAddressZip.getText()).toEqual('provider zip');
        expect(providerDetails.providerAddressPhone.getText()).toEqual('provider phone');


        //Provider Availability
        expect(providerDetails.getOfficeHoursByDay('Monday')).toEqual('Monday');
        expect(providerDetails.getOfficeHoursByDay('Tuesday')).toEqual('-Tuesday');
        expect(providerDetails.getOfficeHoursByDay('Wednesday')).toEqual('-Wednesday');
        expect(providerDetails.getOfficeHoursByDay('Thursday')).toEqual('-Thursday');
        expect(providerDetails.getOfficeHoursByDay('Friday')).toEqual('-Friday');
        expect(providerDetails.getOfficeHoursByDay('Saturday')).toEqual('-Saturday');
        expect(providerDetails.getOfficeHoursByDay('Sunday')).toEqual('-Sunday');

        // Provider Facility
        expect(providerDetails.getProviderAccessByfacility('Free Parking')).toEqual('-Free Parking');
        expect(providerDetails.getProviderAccessByfacility('Wheel Chair Access')).toEqual('-Wheel Chair Access');
        expect(providerDetails.getProviderAccessByfacility('Public Transit Access')).toEqual('-Public Transit Access');
        expect(providerDetails.getProviderAccessByfacility('Internet Access')).toEqual('-Internet Access');

        //Language
        expect(providerDetails.providerLanguage.getText()).toEqual('-');

        //Get Provider Data
        expect(providerDetails.getProviderDataByField('Provider NPI')).toEqual('Provider NPI');
        expect(providerDetails.getProviderDataByField('License #')).toEqual('License #');
        expect(providerDetails.getProviderDataByField('License State')).toEqual('License State');
        expect(providerDetails.getProviderDataByField('Education')).toEqual('Education');
        expect(providerDetails.getProviderDataByField('Gender')).toEqual('Gender');

        providerDetails.backToSearchResults.click();



    });




});
