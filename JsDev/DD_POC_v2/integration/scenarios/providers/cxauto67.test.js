//cxauto67 


"use strict"
var TestData = require('../../testData/' + testDataEnv + '/providers/cxauto67.json');
var dirSearch = new(require('../../pageObjects/providers/directory-search-page.js'));
var providerDetails = new(require('../../pageObjects/providers/provider-details-page.js'));
var feedback = new(require('../../pageObjects/providers/feedback-page.js'));
var perInfo = new(require('../../pageObjects/cxinit/perInfo-page.js'));


describe('cxauto67: Prov Dir', function() {
    beforeEach(function() {
        jasmine.addMatchers(custommatcher.customMatchers);
        Utility.openApplication('');
    });



    it('ProvDir_1: Should verify Provider Page, Facility Page and Office Page by View link', function() {
        dirSearch.location.setText(TestData.Provider_Name.ZipCode);
        dirSearch.findDentist.click();

        providerDetails.openView(TestData.Provider_Name.PName, 'VIEW');

        //Navigating to Inaccurate Information Page
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

        //Facility Details Verefication

       /* expect(browser.getTitle()).toEqual(TestData.Provider_Name.FacilityTitle);
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


        providerDetails.backToSearchResults.click();*/

    });

    


});
