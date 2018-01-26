//cxauto-36


"use strict"
var TestData = require('../../testData/' + testDataEnv + '/providers/cxauto36.json');
var dirSearch = new(require('../../pageObjects/providers/directory-search-page.js'));
var providerDetails = new(require('../../pageObjects/providers/provider-details-page.js'));

describe('Providers CXAUTO:36 ', function() {
    beforeEach(function() {
        jasmine.addMatchers(custommatcher.customMatchers);
        Utility.openApplication('');
    });

    dataProvider(TestData.Location, function(data, description) {
        var pPname, pSpecialty, pOfficeName, ppracticeLocationNumber, pOfficePhone, pFacilityId, pEmailAddress, pfaxNumber, pwebsite, paddress, pCity, pState, pState, pZipcode, pDistance, pYelpId, pGender, pNPI, plicenseNumber, plicenseState, peducation, ppracticeLocationLanguages, pmondayHours, ptuesdayHours, pwednesdayHours, pthursdayHours, pfridayHours, psaturdayHours, psundayHours, pfreeParking, pwheelChairAccess, ppublicTransitAccess, pinternetAccess, ptreatsChildren, ptreatsChildren, ptreatsDisabledAdults, ptreatsDisabledChildren;
        it("Providers API" + Utility.getapiurl('PROVIDERS', '', data.params) + " ", function(doneFn) {
            let apiurl = Utility.getapiurl('PROVIDERS', '', data.params);
            console.log("api url ------" + apiurl);
            frisby.globalSetup({
                timeout: (99 * 99999999)
            });
            frisby.get(apiurl)
                .then(function(res) {
                    let json = res.json;
                    var providerkey = json.providers[0].providerKey;
                    let providerKeyAPI = Utility.getapiurl('PROVIDERKEY', providerkey, data.params1);
                    console.log("providerKeyAPI=====" + providerKeyAPI);
                    frisby.get(providerKeyAPI)
                        .then(function(res1) {
                            let json = res1.json;
                            pPname = json.firstName + " " + json.lastName;
                            pSpecialty = json.specialty;
                            pOfficeName = json.officeName;
                            ppracticeLocationNumber = json.practiceLocationNumber;
                            pOfficePhone = json.officePhone;
                            pFacilityId = json.facilityId;
                            pEmailAddress = json.emailAddress;
                            pfaxNumber = json.faxNumber;
                            pwebsite = json.website;
                            paddress = json.address.addressLine;
                            pCity = json.address.city;
                            pState = json.address.state;
                            pZipcode = json.address.zipcode;
                            pDistance = json.distance + " mi";

                            pYelpId = json.yelpId
                            pGender = json.gender;
                            pNPI = json.npi
                            plicenseNumber = json.license.licenseNumber;
                            plicenseState = json.license.licenseState;
                            peducation = json.education;
                            ppracticeLocationLanguages = json.practiceLocationLanguages;

                            pmondayHours = providerDetails.getOfficeHours(json.practiceHours.mondayHours);
                            ptuesdayHours = providerDetails.getOfficeHours(json.practiceHours.tuesdayHours);
                            pwednesdayHours = providerDetails.getOfficeHours(json.practiceHours.wednesdayHours);
                            pthursdayHours = providerDetails.getOfficeHours(json.practiceHours.thursdayHours);
                            pfridayHours = providerDetails.getOfficeHours(json.practiceHours.fridayHours);
                            psaturdayHours = providerDetails.getOfficeHours(json.practiceHours.saturdayHours);
                            psundayHours = providerDetails.getOfficeHours(json.practiceHours.sundayHours);

                            pfreeParking = json.accessibility.freeParking;
                            pwheelChairAccess = json.accessibility.wheelChairAccess
                            ppublicTransitAccess = json.accessibility.publicTransitAccess;
                            pinternetAccess = json.accessibility.internetAccess;
                            ptreatsChildren = json.patientConsiderations.treatsChildren;
                            ptreatsDisabledAdults = json.patientConsiderations.treatsDisabledAdults;
                            ptreatsDisabledChildren = json.patientConsiderations.treatsDisabledChildren;
                        })
                })
                .done(doneFn);
        });


        it('ProvDir_1: Should verify Provider Page, Facility Page and Office Page by View link with ' + data.params.zipcode, function() {
            dirSearch.location.setText(data.params.zipcode);
            dirSearch.findDentist.click();
            expect(dirSearch.getProviderdetails(pPname, 'PROVIDER')).toEqual(pPname);
            expect(dirSearch.getProviderdetails(pPname, 'SPECIALTY')).toEqualIgnoreCase(pSpecialty);
            expect(dirSearch.getProviderdetails(pPname, 'PLACENAME')).toEqualIgnoreCase(pOfficeName);
            expect(dirSearch.getProviderdetails(pPname, 'ADDRESS')).toContainIgnoreCase(paddress);
            if (pDistance == "0") {
                pDistance = "<0.1 mi";
                expect(dirSearch.getProviderdetails(pPname, 'MILAGE')).toContainIgnoreCase(pDistance);
            }else{
                expect(dirSearch.getProviderdetails(pPname, 'MILAGE')).toContainIgnoreCase(pDistance);
            }
            
            providerDetails.openView(pPname, 'VIEW');

            //Provider Distance Verefication   
            expect(providerDetails.providerDistance.getText()).toEqualIgnoreCase(pDistance);

            // // Provider General information
            expect(providerDetails.providerName.getText()).toEqual(pPname);
            expect(providerDetails.providerSpecialty.getText()).toEqualIgnoreCase(pSpecialty);

            // //Provider Address
            expect(providerDetails.providerPlaceName.getText()).toEqualIgnoreCase(pOfficeName);
            expect(providerDetails.providerAddressStreet.getText()).toEqualIgnoreCase(paddress);
            expect(providerDetails.providerAddressCity.getText()).toEqualIgnoreCase(pCity);
            expect(providerDetails.providerAddressState.getText()).toEqualIgnoreCase(pState);
            expect(providerDetails.providerAddressZip.getText()).toEqualIgnoreCase(pZipcode);
            expect(providerDetails.providerAddressPhone.getText()).toEqualIgnoreCase(pOfficePhone);



            // //Office Hours

            expect(providerDetails.getOfficeHoursByDay('Mon')).toEqualIgnoreCase(pmondayHours);
            expect(providerDetails.getOfficeHoursByDay('Tues')).toEqualIgnoreCase(ptuesdayHours);
            expect(providerDetails.getOfficeHoursByDay('Wed')).toEqualIgnoreCase(pwednesdayHours);
            expect(providerDetails.getOfficeHoursByDay('Thurs')).toEqualIgnoreCase(pthursdayHours);
            expect(providerDetails.getOfficeHoursByDay('Fri')).toEqualIgnoreCase(pfridayHours);
            expect(providerDetails.getOfficeHoursByDay('Sat')).toEqualIgnoreCase(psaturdayHours);
            expect(providerDetails.getOfficeHoursByDay('Sun')).toEqualIgnoreCase(psundayHours);

            // // Provider Facility

            expect(providerDetails.getProviderAccessByfacility('Free parking')).toEqualIgnoreCase(pfreeParking);
            expect(providerDetails.getProviderAccessByfacility('Wheelchair access')).toEqualIgnoreCase(pwheelChairAccess);
            expect(providerDetails.getProviderAccessByfacility('Public transit access')).toEqualIgnoreCase(ppublicTransitAccess);
            expect(providerDetails.getProviderAccessByfacility('Network access')).toEqualIgnoreCase(pinternetAccess);

            // //Languages
            expect(providerDetails.providerLanguage.getText()).toContainIgnoreCase(ppracticeLocationLanguages);

            // //Get Provider Data

            expect(providerDetails.getProviderDataByField('Dentist NPI')).toEqualIgnoreCase(pNPI);
            expect(providerDetails.getProviderDataByField('License #')).toEqualIgnoreCase(plicenseNumber);
            expect(providerDetails.getProviderDataByField('License State')).toEqualIgnoreCase(plicenseState);
            expect(providerDetails.getProviderDataByField('Gender')).toEqualIgnoreCase(pGender);
            //Checking to Inaccurate Information Page
            expect(providerDetails.letUsKnow.isPresentAndDisplayed()).toBeTruthy();
            providerDetails.letUsKnow.click();
            providerDetails.workatOffice('I work at this office.').click();
            expect(providerDetails.workatOffice_links('log in').isPresentAndDisplayed()).toBeTruthy();
            expect(providerDetails.workatOffice_links('Practice Location Information form').isPresentAndDisplayed()).toBeTruthy();
            expect(providerDetails.workatOffice_links('Log in').isPresentAndDisplayed()).toBeTruthy();
            providerDetails.workatOffice("I don't work at this office.").click();
            expect(providerDetails.feedback_inaccuracy.isPresentAndDisplayed()).toBeTruthy();
            expect(providerDetails.dontworkSubmit_inaccuracy.isPresentAndDisplayed()).toBeTruthy();

            // // Office Detail Verefication
            if (expect(providerDetails.providerPName.isPresentAndDisplayed()).toBeTruthy()) {
                providerDetails.providerPName.click();
                expect(providerDetails.providerName.getText()).toEqualIgnoreCase(pOfficeName);
                expect(providerDetails.providersList.getText()).toContainIgnoreCase(pPname);

                expect(providerDetails.getOfficeHoursByDay('Mon')).toEqualIgnoreCase(pmondayHours);
                expect(providerDetails.getOfficeHoursByDay('Tues')).toEqualIgnoreCase(ptuesdayHours);
                expect(providerDetails.getOfficeHoursByDay('Wed')).toEqualIgnoreCase(pwednesdayHours);
                expect(providerDetails.getOfficeHoursByDay('Thurs')).toEqualIgnoreCase(pthursdayHours);
                expect(providerDetails.getOfficeHoursByDay('Fri')).toEqualIgnoreCase(pfridayHours);
                expect(providerDetails.getOfficeHoursByDay('Sat')).toEqualIgnoreCase(psaturdayHours);
                expect(providerDetails.getOfficeHoursByDay('Sun')).toEqualIgnoreCase(psundayHours);

                expect(providerDetails.getProviderAccessByfacility('Free parking')).toEqualIgnoreCase(pfreeParking);
                expect(providerDetails.getProviderAccessByfacility('Wheelchair access')).toEqualIgnoreCase(pwheelChairAccess);
                expect(providerDetails.getProviderAccessByfacility('Public transit access')).toEqualIgnoreCase(ppublicTransitAccess);
                expect(providerDetails.getProviderAccessByfacility('Network access')).toEqualIgnoreCase(pinternetAccess);

                // //Languages
                expect(providerDetails.providerLanguage.getText()).toContainIgnoreCase(ppracticeLocationLanguages);

                // //Get Provider Data

                expect(providerDetails.getProviderDataByField('Group Practice NPI')).toEqualIgnoreCase(pNPI);

                //Checking to Inaccurate Information Page
                expect(providerDetails.letUsKnow.isPresentAndDisplayed()).toBeTruthy();
                providerDetails.letUsKnow.click();
                providerDetails.workatOffice('I work at this office.').click();
                expect(providerDetails.workatOffice_links('log in').isPresentAndDisplayed()).toBeTruthy();
                expect(providerDetails.workatOffice_links('Practice Location Information form').isPresentAndDisplayed()).toBeTruthy();
                expect(providerDetails.workatOffice_links('Log in').isPresentAndDisplayed()).toBeTruthy();
                providerDetails.workatOffice("I don't work at this office.").click();
                expect(providerDetails.feedback_inaccuracy.isPresentAndDisplayed()).toBeTruthy();
                expect(providerDetails.dontworkSubmit_inaccuracy.isPresentAndDisplayed()).toBeTruthy();
            }


        });
    });

});
