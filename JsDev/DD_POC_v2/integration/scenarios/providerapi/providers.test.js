'use strict';
var TestData        = require('../../testData/providerapi/providers.json');
// var dirSearch       = new(require('../../pageObjects/providers/directory-search-page.js'));
// var providerDetails = new(require('../../pageObjects/providers/provider-details-page.js'));

// Jira ticket No: CXAUTO-41
describe('Providers: ', function() {

    // Providers API without Zipcode and Verified with "Error Status Code" and response body with "error JSON Data Set".
    it(" REST API without Zip Code" + Utility.getapiurl('PROVIDERS', '', TestData.test1.params) + " ", function(doneFn) {
        //Construction of REST API URL HOST+Resource +Params
        let apiurl = Utility.getapiurl('PROVIDERS', '', TestData.test1.params);
        console.log("api url ------" + apiurl);
        //REST API call using Frisby Node Module & Verifying with Frisby expect's
        frisby.get(apiurl)
            .then(function(res) {
                let json = res.json; // converting resp to JSON format
                expect(res.status).toEqual(500)
            })
            .expect('json', TestData.test1.verify)         
            .done(doneFn);
               // 
    });

    it(" REST API without FreeTExt" + Utility.getapiurl('PROVIDERS', '', TestData.test3.params) + " ", function(doneFn) {

        let apiurl = Utility.getapiurl('PROVIDERS', '', TestData.test3.params);
        console.log("api url ------" + apiurl);

        frisby.get(apiurl)
            .then(function(res) {
                let json = res.json;
                console.log("Count of Free Text====" + json.total);
            })
            .done(doneFn);
    });

    it(" REST API without Zip Code" + Utility.getapiurl('PROVIDERS', '', TestData.test3.params) + " ", function(doneFn) {
        //Construction of REST API URL HOST+Resource +Params
        var providerData = [];
        var providerObject = {};

        browser.controlFlow().execute(function() {
            let apiurl = Utility.getapiurl('PROVIDERS', '', TestData.test3.params);
            console.log("api url ------" + apiurl);
            //REST API call using Frisby Node Module & Verifying with Jasmine expect's
            frisby.get(apiurl)
                .then(function(res) {
                    let json = res.json;
                    json.providers.forEach(function(pdata) {

                        // console.log("providerKey=" + pdata.providerKey);
                        // console.log("facilityId=" + pdata.facilityId);
                        // console.log("practiceLocationNumber=" + pdata.practiceLocationNumber);

                        frisby.get((Utility.getapiurl('PROVIDERKEY', pdata.providerKey, '')))
                            .then(function(pkey) {
                                let pkeyres = pkey.json;
                                providerObject.firstName = pkeyres.firstName;
                                providerObject.lastName = pkeyres.lastName;
                                providerObject.specialty = pkeyres.specialty;
                                providerObject.officeName = pkeyres.officeName;
                                providerObject.npi = pkeyres.npi;
                                providerObject.licenseNumber = pkeyres.license.licenseNumber;
                                providerObject.providerLanguages = pkeyres.providerLanguages;
                                providerObject.practiceLocationLanguages = pkeyres.practiceLocationLanguages;

                                // console.log("firstName=" + pkeyres.firstName);
                                // console.log("lastName=" + pkeyres.lastName);
                                // console.log("specialty=" + pkeyres.specialty);
                                // console.log("officeName=" + pkeyres.officeName);
                                // console.log("npi=" + pkeyres.npi);
                                // console.log("licenseNumber=" + pkeyres.license.licenseNumber);
                                // console.log("providerLanguages=" + pkeyres.providerLanguages);
                                // console.log("practiceLocationLanguages=" + pkeyres.practiceLocationLanguages);

                            })

                        frisby.get((Utility.getapiurl('LOCATIONS', pdata.practiceLocationNumber, '')))
                            .then(function(location) {
                                let locres = location.json;
                                providerObject.groupPracticeNpi = locres.groupPracticeNpi;
                                providerObject.practiceLocationNpi = locres.practiceLocationNpi;
                                // console.log("Provider final data111111========" + JSON.stringify(providerObject))

                                // console.log("groupPracticeNpi=" + locres.groupPracticeNpi);
                                // console.log("practiceLocationNpi=" + locres.practiceLocationNpi);
                            })

                        if (pdata.facilityId !== null) {
                            // console.log("facilityId=" + pdata.facilityId);
                            frisby.get((Utility.getapiurl('FACILITIES', pdata.facilityId, '')))
                                .then(function(fres) {
                                    // console.log("facility name=" + fres.name);
                                    providerObject.facilityName = fres.name;
                                    providerData.push(providerObject);
                                    var nData = [];
                                    // console.log("providerObject===============" + providerObject);
                                    // console.log("providerData===============" + providerData);


                                    var stringTokens = TestData.test3.params.free_text.split(" ");
                                    stringTokens.forEach(function(text) {
                                        // console.log("substring ==" + text);
                                        // Object.keys(providerObject).reduce(function(previous, key) {
                                        //     nData.push(providerObject[key]);
                                        // }, '');
                                        expect(Object.values(providerObject)).toContain(text)

                                    })

                                })

                        }
                    });

                })

                .done(doneFn);
        })

    });

});