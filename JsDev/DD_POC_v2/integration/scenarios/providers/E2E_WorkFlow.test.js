/*
 * E2E workflow for Provider Search
 */
"use strict"
var TestData = require('../../testData/'+testDataEnv+'/providers/E2E_WorkFlow.json');
var dirSearch = new(require('../../pageObjects/providers/directory-search-page.js'));
var providerDetails = new(require('../../pageObjects/providers/provider-details-page.js'));

describe('E2E workflow for Provider Search', function() {
    beforeEach(function() {
        jasmine.addMatchers(custommatcher.customMatchers);
        Utility.openApplication('');
    });

    // Verify that all links and search field is displayed
    it('ProvDir_1: Verify all fields and buttons are present and displayed', function() {
        expect(dirSearch.loginheader.isPresentAndDisplayed()).toBeTruthy();
        expect(dirSearch.login.isPresentAndDisplayed()).toBeTruthy();
        expect(dirSearch.headerText.getText()).toContain(TestData.Header_SearchResultsPage);
        expect(dirSearch.location.isPresentAndDisplayed()).toBeTruthy();
        expect(dirSearch.viewDentists.isPresentAndDisplayed()).toBeTruthy();
    });
    // Verify the functionality of view Dentists when we enter invalid Address
    // Invalid Address should be displayed 
    it('ProvDir_2: Verify the functionality of view Dentists when we enter invalid Address', function() {
        dirSearch.location.setText(TestData.ZipCode + '\t');
        dirSearch.viewDentists.click();
        expect(dirSearch.refineSearch.isPresentAndDisplayed()).toBeFalsy();
        expect(dirSearch.headerText.getText()).toContain(TestData.Header_InvalidAddress);
    });
    // Verify the functionality of view Dentists with blank Address
    // Invalid Address should be displayed 
    it('ProvDir_3: Verify the functionality of view Dentists with blank Address', function() {
        dirSearch.location.setText('');
        dirSearch.viewDentists.click();
        expect(dirSearch.refineSearch.isPresentAndDisplayed()).toBeFalsy();
        expect(dirSearch.headerText.getText()).toContain(TestData.Header_InvalidAddress);
    });
    // Select Address from the address suggestions and click on view dentists button
    // Verify the providers count and provider details
    it('ProvDir_4: Verify the search results count and provider details ', function() {
        dirSearch.location.setText(TestData.HAddress_ZIP.PartialAddress);
        dirSearch.selectHomeAddress(TestData.HAddress_ZIP.FullAddress);
        //expect(dirSearch.location.getAttribute('value')).toBe(TestData.HAddress_ZIP.Dimentions);
        dirSearch.viewDentists.click();
        expect(dirSearch.refineSearch.isPresentAndDisplayed()).toBeTruthy();
        expect(dirSearch.headerText.getText()).toContain(TestData.Header_SearchResultsPage);
        expect(dirSearch.providersListing.getCount()).toEqual(10);
        expect(dirSearch.getProviderdetails(TestData.Provider1.Name, 'SPECIALTY')).toEqual(TestData.Provider1.SPECIALTY);
        expect(dirSearch.getProviderdetails(TestData.Provider1.Name, 'PLACENAME')).toEqual(TestData.Provider1.PLACENAME);
        expect(dirSearch.getProviderdetails(TestData.Provider1.Name, 'NETWORK')).toContain(TestData.Provider1.NETWORK);
        expect(dirSearch.getProviderdetails(TestData.Provider1.Name, 'ADDRESS')).toContain(TestData.Provider1.ADDRESS);
    });

    // Verify all filter values are displayed or not for refine search functionality
    // All filters should be displayed when click on refine buttonH
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
        dirSearch.generalDentist.check();
        dirSearch.endodontist.check();
        dirSearch.pediatricDentist.check();
        dirSearch.apply.click();
        expect(dirSearch.providersListing.getCount()).toEqual(10);
    });
    // Select one provider and verify the all charectorstics of provider
    it('ProvDir_6: Verify the Provider details by selecting specific provider from provider search results', function() {
        dirSearch.location.setText(TestData.HAddress_ZIP.PartialAddress);
        dirSearch.selectHomeAddress(TestData.HAddress_ZIP.FullAddress);
        dirSearch.viewDentists.click();
        expect(dirSearch.providersListing.getCount()).toEqual(10);
        dirSearch.openView(TestData.Provider2.Name);

        // Provider distance
        expect(providerDetails.providerDistance.getText()).toEqual(TestData.Provider2.Distance);

        // Provider General information
        expect(providerDetails.providerName.getText()).toEqual(TestData.Provider2.Name);
        expect(providerDetails.providerSpecialty.getText()).toEqual(TestData.Provider2.SPECIALTY);
        expect(providerDetails.providerNetwork.getText()).toEqual(TestData.Provider2.NETWORK);
        expect(providerDetails.providerAvailability.getText()).toEqual(TestData.Provider2.Availability);


        //Provider Address
        expect(providerDetails.providerPlaceName.getText()).toEqual(TestData.Provider2.Address.Place);
        expect(providerDetails.providerAddressStreet.getText()).toEqual(TestData.Provider2.Address.Street);
        expect(providerDetails.providerAddressCity.getText()).toEqual(TestData.Provider2.Address.City);
        expect(providerDetails.providerAddressState.getText()).toEqual(TestData.Provider2.Address.State);
        expect(providerDetails.providerAddressZip.getText()).toEqual(TestData.Provider2.Address.ZipCode);
        expect(providerDetails.providerAddressPhone.getText()).toEqual(TestData.Provider2.Address.Phone);

        //Provider Availability
        expect(providerDetails.getOfficeHoursByDay('Monday')).toEqual(TestData.Provider2.AvailabilityTime.Monday);
        expect(providerDetails.getOfficeHoursByDay('Tuesday')).toEqual(TestData.Provider2.AvailabilityTime.Tuesday);
        expect(providerDetails.getOfficeHoursByDay('Wednesday')).toEqual(TestData.Provider2.AvailabilityTime.Wednesday);
        expect(providerDetails.getOfficeHoursByDay('Thursday')).toEqual(TestData.Provider2.AvailabilityTime.Thursday);
        expect(providerDetails.getOfficeHoursByDay('Friday')).toEqual(TestData.Provider2.AvailabilityTime.Friday);
        expect(providerDetails.getOfficeHoursByDay('Saturday')).toEqual(TestData.Provider2.AvailabilityTime.Saturday);
        expect(providerDetails.getOfficeHoursByDay('Sunday')).toEqual(TestData.Provider2.AvailabilityTime.Sunday);

        // Provider Facility
        expect(providerDetails.getProviderAccessByfacility('Free Parking')).toEqual(TestData.Provider2.OfficeAccess.FreeParking);
        expect(providerDetails.getProviderAccessByfacility('Wheel Chair Access')).toEqual(TestData.Provider2.OfficeAccess.WheelChairAccess);
        expect(providerDetails.getProviderAccessByfacility('Public Transit Access')).toEqual(TestData.Provider2.OfficeAccess.PublicTransitAccess);
        expect(providerDetails.getProviderAccessByfacility('Internet Access')).toEqual(TestData.Provider2.OfficeAccess.InternetAccess);

        //Language
        expect(providerDetails.providerLanguage.getText()).toEqual(TestData.Provider2.Language);

        //Get Provider Data
        expect(providerDetails.getProviderDataByField('Provider NPI')).toEqual(TestData.Provider2.ProviderData.ProviderNPI);
        expect(providerDetails.getProviderDataByField('License #')).toEqual(TestData.Provider2.ProviderData.License);
        expect(providerDetails.getProviderDataByField('License State')).toEqual(TestData.Provider2.ProviderData.LicenseState);
        expect(providerDetails.getProviderDataByField('Education')).toEqual(TestData.Provider2.ProviderData.Education);
        expect(providerDetails.getProviderDataByField('Gender')).toEqual(TestData.Provider2.ProviderData.Gender);

        providerDetails.backToSearchResults.click();
        expect(dirSearch.providersListing.getCount()).toEqual(10);

    });

});
