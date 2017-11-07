//CXINIT2-1899 


"use strict"
var TestData = require('../../testData/' + testDataEnv + '/providers/cxinit2-1899.json');
var dirSearch = new(require('../../pageObjects/providers/directory-search-page.js'));
var providerDetails = new(require('../../pageObjects/providers/provider-details-page.js'));
var feedback = new(require('../../pageObjects/providers/feedback-page.js'));
var perInfo = new(require('../../pageObjects/cxinit/perInfo-page.js'));


describe('CXINIT2-1899: Prov Dir', function() {
    beforeEach(function() {
        Utility.openApplication('');
    });



    it('ProvDir_1: Should verify Provider Page, Facility Page and Office Page by View link', function() {
        dirSearch.location.setText(TestData.Provider_Name.ZipCode);
        dirSearch.findDentist.click();

        providerDetails.openView(TestData.Provider_Name.PName, 'VIEW');

        //Provider Distance Verefication   
        expect(providerDetails.providerDistance.getText()).toEqual(TestData.Provider_Name.PDistance);

        // Provider General information
        expect(providerDetails.providerName.getText()).toEqual(TestData.Provider_Name.PName);
        expect(providerDetails.providerSpecialty.getText()).toEqual(TestData.Provider_Name.PSpeciality);

        //Provider Address
        expect(providerDetails.providerPlaceName.getText()).toEqual(TestData.Provider_Name.PPlace);
        expect(providerDetails.providerAddressStreet.getText()).toEqual(TestData.Provider_Name.PStreet);
        expect(providerDetails.providerAddressCity.getText()).toEqual(TestData.Provider_Name.PCity);
        expect(providerDetails.providerAddressState.getText()).toEqual(TestData.Provider_Name.PState);
        expect(providerDetails.providerAddressZip.getText()).toEqual(TestData.Provider_Name.PZIP);
        expect(providerDetails.providerAddressPhone.getText()).toEqual(TestData.Provider_Name.PPhone);



        //Office Hours

        expect(providerDetails.getOfficeHoursByDay('Mon')).toEqual(TestData.Provider_Name.PAvailability);
        expect(providerDetails.getOfficeHoursByDay('Tues')).toEqual(TestData.Provider_Name.PAvailability);
        expect(providerDetails.getOfficeHoursByDay('Wed')).toEqual(TestData.Provider_Name.PAvailability);
        expect(providerDetails.getOfficeHoursByDay('Thurs')).toEqual(TestData.Provider_Name.PAvailability);
        expect(providerDetails.getOfficeHoursByDay('Fri')).toEqual(TestData.Provider_Name.PAvailability);
        expect(providerDetails.getOfficeHoursByDay('Sat')).toEqual(TestData.Provider_Name.PClosed);
        expect(providerDetails.getOfficeHoursByDay('Sun')).toEqual(TestData.Provider_Name.PClosed);

        // Provider Facility
        expect(providerDetails.getProviderAccessByfacility('Free Parking')).toEqual(TestData.Provider_Name.PParking);
        expect(providerDetails.getProviderAccessByfacility('Wheelchair Access')).toEqual(TestData.Provider_Name.PWheelChair);
        expect(providerDetails.getProviderAccessByfacility('Public Transit')).toEqual(TestData.Provider_Name.PPublicTransport);
        expect(providerDetails.getProviderAccessByfacility('Network Access')).toEqual(TestData.Provider_Name.PInternetAccess);

        //Languages
        expect(providerDetails.providerLanguage.getText()).toContain(TestData.Provider_Name.PLanguage);

        //Get Provider Data
        expect(providerDetails.getProviderDataByField('Provider NPI')).toEqual(TestData.Provider_Name.PNPI);
        expect(providerDetails.getProviderDataByField('License #')).toEqual(TestData.Provider_Name.PLicence);
        expect(providerDetails.getProviderDataByField('License State')).toEqual(TestData.Provider_Name.PLicenceState);
        expect(providerDetails.getProviderDataByField('Gender')).toEqual(TestData.Provider_Name.PGender);


        // Office Detail Verefication
        providerDetails.providerPName.click();
        expect(browser.getTitle()).toEqual(TestData.Provider_Name.OfficeTitle);
        expect(providerDetails.providerPlaceName.getText()).toEqual(TestData.Provider_Name.PPlace);
        expect(providerDetails.providersList.getText()).toContain(TestData.Provider_Name.PName);

        //Facility Details Verefication
        providerDetails.providerFName.click();
        expect(browser.getTitle()).toEqual(TestData.Provider_Name.FacilityTitle);
        expect(providerDetails.providerPlaceName.getText()).toEqual(TestData.Provider_Name.PPlace);
        expect(providerDetails.providersList.getText()).toContain(TestData.Provider_Name.PName);

        //Back to Search Resukts
        providerDetails.backToSearchResults.click();

    });

    it('ProvDir_2: Should verify Provider Page, Facility Page and Office Page from Providers link', function() {
        dirSearch.location.setText(TestData.Provider_Name.ZipCode);
        dirSearch.findDentist.click();

        providerDetails.openView(TestData.Provider_Name.PName, 'PLACE');

        // Office Detail Verefication
        expect(browser.getTitle()).toEqual(TestData.Provider_Name.OfficeTitle);
        expect(providerDetails.providerPlaceName.getText()).toEqual(TestData.Provider_Name.PPlace);
        expect(providerDetails.providersList.getText()).toContain(TestData.Provider_Name.PName);

        //Provider Address
        expect(providerDetails.providerPlaceName.getText()).toEqual(TestData.Provider_Name.PPlace);
        expect(providerDetails.providerAddressStreet.getText()).toEqual(TestData.Provider_Name.PStreet);
        expect(providerDetails.providerAddressCity.getText()).toEqual(TestData.Provider_Name.PCity);
        expect(providerDetails.providerAddressState.getText()).toEqual(TestData.Provider_Name.PState);
        expect(providerDetails.providerAddressZip.getText()).toEqual(TestData.Provider_Name.PZIP);
        expect(providerDetails.providerAddressPhone.getText()).toEqual(TestData.Provider_Name.PPhone);



        //Office Hours

        expect(providerDetails.getOfficeHoursByDay('Mon')).toEqual(TestData.Provider_Name.PAvailability);
        expect(providerDetails.getOfficeHoursByDay('Tues')).toEqual(TestData.Provider_Name.PAvailability);
        expect(providerDetails.getOfficeHoursByDay('Wed')).toEqual(TestData.Provider_Name.PAvailability);
        expect(providerDetails.getOfficeHoursByDay('Thurs')).toEqual(TestData.Provider_Name.PAvailability);
        expect(providerDetails.getOfficeHoursByDay('Fri')).toEqual(TestData.Provider_Name.PAvailability);
        expect(providerDetails.getOfficeHoursByDay('Sat')).toEqual(TestData.Provider_Name.PClosed);
        expect(providerDetails.getOfficeHoursByDay('Sun')).toEqual(TestData.Provider_Name.PClosed);

        // Provider Facility
        expect(providerDetails.getProviderAccessByfacility('Free Parking')).toEqual(TestData.Provider_Name.PParking);
        expect(providerDetails.getProviderAccessByfacility('Wheelchair Access')).toEqual(TestData.Provider_Name.PWheelChair);
        expect(providerDetails.getProviderAccessByfacility('Public Transit')).toEqual(TestData.Provider_Name.PPublicTransport);
        expect(providerDetails.getProviderAccessByfacility('Network Access')).toEqual(TestData.Provider_Name.PInternetAccess);

        //Languages
        expect(providerDetails.providerLanguage.getText()).toContain(TestData.Provider_Name.PLanguage);


        providerDetails.backToSearchResults.click();

    });

    it('ProvDir_3: Should verify Provider Page, Facility Page and Office Page by Facility link', function() {
        dirSearch.location.setText(TestData.Provider_Name.ZipCode);
        dirSearch.findDentist.click();

        providerDetails.openView(TestData.Provider_Name.PName, 'Facility');

        //Facility Details Verefication

        expect(browser.getTitle()).toEqual(TestData.Provider_Name.FacilityTitle);
        expect(providerDetails.providerPlaceName.getText()).toEqual(TestData.Provider_Name.PPlace);
        expect(providerDetails.providersList.getText()).toContain(TestData.Provider_Name.PName);

        //Provider Address
        expect(providerDetails.providerPlaceName.getText()).toEqual(TestData.Provider_Name.PPlace);
        expect(providerDetails.providerAddressStreet.getText()).toEqual(TestData.Provider_Name.PStreet);
        expect(providerDetails.providerAddressCity.getText()).toEqual(TestData.Provider_Name.PCity);
        expect(providerDetails.providerAddressState.getText()).toEqual(TestData.Provider_Name.PState);
        expect(providerDetails.providerAddressZip.getText()).toEqual(TestData.Provider_Name.PZIP);
        expect(providerDetails.providerAddressPhone.getText()).toEqual(TestData.Provider_Name.PPhone);



        //Office Hours

        expect(providerDetails.getOfficeHoursByDay('Mon')).toEqual(TestData.Provider_Name.PAvailability);
        expect(providerDetails.getOfficeHoursByDay('Tues')).toEqual(TestData.Provider_Name.PAvailability);
        expect(providerDetails.getOfficeHoursByDay('Wed')).toEqual(TestData.Provider_Name.PAvailability);
        expect(providerDetails.getOfficeHoursByDay('Thurs')).toEqual(TestData.Provider_Name.PAvailability);
        expect(providerDetails.getOfficeHoursByDay('Fri')).toEqual(TestData.Provider_Name.PAvailability);
        expect(providerDetails.getOfficeHoursByDay('Sat')).toEqual(TestData.Provider_Name.PClosed);
        expect(providerDetails.getOfficeHoursByDay('Sun')).toEqual(TestData.Provider_Name.PClosed);

        // Provider Facility
        expect(providerDetails.getProviderAccessByfacility('Free Parking')).toEqual(TestData.Provider_Name.PParking);
        expect(providerDetails.getProviderAccessByfacility('Wheelchair Access')).toEqual(TestData.Provider_Name.PWheelChair);
        expect(providerDetails.getProviderAccessByfacility('Public Transit')).toEqual(TestData.Provider_Name.PPublicTransport);
        expect(providerDetails.getProviderAccessByfacility('Network Access')).toEqual(TestData.Provider_Name.PInternetAccess);

        //Languages
        expect(providerDetails.providerLanguage.getText()).toContain(TestData.Provider_Name.PLanguage);


        providerDetails.backToSearchResults.click();

    });

    it('ProvDir_4: Verify feedback submition', function() {
        dirSearch.location.setText(TestData.Provider_Name.ZipCode);
        dirSearch.findDentist.click();
        feedback.feedback.click();
        Utility.switchToFrame(feedback.feedbackFrame());
        expect(feedback.answer1.isPresentAndDisplayed()).toBe(true);
        feedback.answer1.click();
        expect(feedback.answer2.isPresentAndDisplayed()).toBe(true);
        feedback.answer2.click();
        expect(feedback.answer3.isPresentAndDisplayed()).toBe(true);
        feedback.answer3.click();
        expect(feedback.answer4.isPresentAndDisplayed()).toBe(true);
        feedback.answer4.click();
        expect(feedback.answer5.isPresentAndDisplayed()).toBe(true);
        feedback.answer5.setText('Good');
        feedback.submit.click();
        expect(feedback.endOfSurvey.getText()).toContain('We thank you for your time spent taking this survey.');
    });

   
});
