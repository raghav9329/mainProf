"use strict"
var TestData = require('../../testData/'+testDataEnv+'/providers/cxinit2.4.json');
var dirSearch = new(require('../../pageObjects/providers/directory-search-page.js'));
var providerDetails = new(require('../../pageObjects/providers/provider-details-page.js'));

describe('Provider Search Validation', function() {
    beforeEach(function() {
        Utility.openApplication('');
    });
    it('ProvDir_1: Verify all fields and buttons are present and displayed', function() {
        expect(dirSearch.headerText.getText()).toContain(TestData.Header_SearchResultsPage);
        expect(dirSearch.location.isPresentAndDisplayed()).toBeTruthy();
        expect(dirSearch.deltaDentalPPO.isPresentAndDisplayed()).toBeTruthy();
        expect(dirSearch.deltaDentalPremier.isPresentAndDisplayed()).toBeTruthy();
        expect(dirSearch.deltaCareUSA.isPresentAndDisplayed()).toBeTruthy();
        expect(dirSearch.keywordSearch.isPresentAndDisplayed()).toBeTruthy();
        expect(dirSearch.findDentist.isPresentAndDisplayed()).toBeTruthy();
    });

    it('ProvDir_2: Verify the functionality of view Dentists when we enter invalid Address', function() {
        dirSearch.location.setText(TestData.ZipCode);
        dirSearch.findDentist.click();
        browser.sleep(2000);
        expect(dirSearch.refineSearch.isPresentAndDisplayed()).toBeTruthy();
    });

    it('ProvDir_3: Verify the functionality of view Dentists with blank Address', function() {
        dirSearch.location.setText('');
        dirSearch.findDentist.click();
        expect(dirSearch.refineSearch.isPresentAndDisplayed()).toBeFalsy();
       
    });

    it('ProvDir_4: Verify the search results count and provider details ', function() {
        dirSearch.location.setText(TestData.HAddress_ZIP.PartialAddress);
        dirSearch.selectHomeAddress(TestData.HAddress_ZIP.FullAddress);
        browser.sleep(2000);
        dirSearch.findDentist.click();
        expect(dirSearch.refineSearch.isPresentAndDisplayed()).toBeTruthy();
        expect(dirSearch.headerText.getText()).toContain(TestData.Header_SearchResultsPage);
        expect(dirSearch.providersListing.getCount()).toEqual(10);
        var data = TestData.Provider_Name1;
        expect(dirSearch.getProviderdetails(data.PName, 'SPECIALTY')).toEqual(data.PSpeciality);
        expect(dirSearch.getProviderdetails(data.PName, 'PLACENAME')).toEqual(data.PPlace);
        expect(dirSearch.getProviderdetails(data.PName, 'ADDRESS')).toContain(data.PAddress);
    });

    it('ProvDir_5: Verify all filter values are displayed or not for refine search functionality', function() {
        dirSearch.location.setText(TestData.HAddress_ZIP.PartialAddress);
        dirSearch.selectHomeAddress(TestData.HAddress_ZIP.FullAddress);
        dirSearch.findDentist.click();
        dirSearch.refineSearch.click();
        expect(dirSearch.distanceSelect.isPresentAndDisplayed()).toBeTruthy();
        expect(dirSearch.filterMenuItem('Networks').isPresentAndDisplayed()).toBeTruthy();
        dirSearch.filterMenuItem('Networks').click();     
        expect(dirSearch.iNDeltaDentalPPO.isPresentAndDisplayed()).toBeTruthy();
        expect(dirSearch.iNDeltaDentalPremier.isPresentAndDisplayed()).toBeTruthy();
        expect(dirSearch.iNDeltaCareUSA.isPresentAndDisplayed()).toBeTruthy();
        expect(dirSearch.filterMenuItem('Specialties').isPresentAndDisplayed()).toBeTruthy();
        dirSearch.filterMenuItem('Specialties').click();
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
        expect(dirSearch.filterMenuItem('Languages').isPresentAndDisplayed()).toBeTruthy();
        dirSearch.filterMenuItem('Languages').click();
        expect(dirSearch.languageFilter.isPresentAndDisplayed()).toBeTruthy();
        expect(dirSearch.apply.isPresentAndDisplayed()).toBeTruthy();
    });

    it('ProvDir_6: Verify the Provider details by selecting specific provider from provider search results', function() {
        var data = TestData.Provider_Name1; 
        dirSearch.location.setText(TestData.HAddress_ZIP.PartialAddress);
        dirSearch.selectHomeAddress(TestData.HAddress_ZIP.FullAddress);
        dirSearch.findDentist.click();
        expect(dirSearch.providersListing.getCount()).toEqual(10);
        dirSearch.openView(data.PName);

        // Provider distance
        expect(providerDetails.providerDistance.getText()).toEqual(data.PDistance);

        // Provider General information
        expect(providerDetails.providerName.getText()).toEqual(data.PName);
        expect(providerDetails.providerSpecialty.getText()).toEqual(data.PSpeciality);
        
        //Provider Address
        expect(providerDetails.providerPlaceName.getText()).toEqual(data.PPlace);
        expect(providerDetails.providerAddressStreet.getText()).toEqual(data.PStreet);
        expect(providerDetails.providerAddressCity.getText()).toEqual(data.PCity);
        expect(providerDetails.providerAddressState.getText()).toEqual(data.PState);
        expect(providerDetails.providerAddressZip.getText()).toEqual(data.PZIP);
        expect(providerDetails.providerAddressPhone.getText()).toEqual(data.PPhone);


        //Provider Availability
        expect(providerDetails.getOfficeHoursByDay('Mon')).toEqual(data.PAvailability);
        expect(providerDetails.getOfficeHoursByDay('Tues')).toEqual(data.PAvailability);
        expect(providerDetails.getOfficeHoursByDay('Wed')).toEqual(data.PAvailability);
        expect(providerDetails.getOfficeHoursByDay('Thurs')).toEqual(data.PAvailability);
        expect(providerDetails.getOfficeHoursByDay('Fri')).toEqual(data.PAvailability);
        expect(providerDetails.getOfficeHoursByDay('Sat')).toEqual(data.PAvailability);
        expect(providerDetails.getOfficeHoursByDay('Sun')).toEqual(data.PAvailability);

        // Provider Facility
        expect(providerDetails.getProviderAccessByfacility('Free Parking')).toEqual(data.PParking);
        expect(providerDetails.getProviderAccessByfacility('Wheelchair Accessible')).toEqual(data.PWheelChair);
        expect(providerDetails.getProviderAccessByfacility('Public Transit')).toEqual(data.PPublicTransport);
        expect(providerDetails.getProviderAccessByfacility('Network Access')).toEqual(data.PInternetAccess);

        //Language
        expect(providerDetails.providerLanguage.getText()).toEqual(data.PLanguage);

        //Get Provider Data
        expect(providerDetails.getProviderDataByField('Provider NPI')).toEqual(data.PNPI);
        expect(providerDetails.getProviderDataByField('License #')).toEqual(data.PLicence);
        expect(providerDetails.getProviderDataByField('License State')).toEqual(data.PLicenceState);
        expect(providerDetails.getProviderDataByField('Education')).toEqual(data.PEducation);
        expect(providerDetails.getProviderDataByField('Gender')).toEqual(data.PGender);

        providerDetails.backToSearchResults.click();
        expect(dirSearch.providersListing.getCount()).toEqual(10);

    });
});
