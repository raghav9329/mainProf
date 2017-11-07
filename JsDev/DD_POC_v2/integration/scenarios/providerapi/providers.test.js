'use strict';
var TestData = require('../../testData/providerapi/providers.json');

var dirSearch = new(require('../../pageObjects/providers/directory-search-page.js'));
var providerDetails = new(require('../../pageObjects/providers/provider-details-page.js'));

// Jira ticket No: CXAUTO-41
describe('Providers: ', function() {

    // Providers API without Zipcode and Verified with "Error Status Code" and response body with "error JSON Data Set".
    // it(" REST API without Zip Code" + Utility.getapiurl('PROVIDERS', '', TestData.test1.params) + " ", function(doneFn) {
    //     //Construction of REST API URL HOST+Resource +Params
    //     let apiurl = Utility.getapiurl('PROVIDERS', '', TestData.test1.params);
    //     console.log("api url ------" + apiurl);
    //     //REST API call using Frisby Node Module & Verifying with Frisby expect's
    //     frisby.get(apiurl)
    //         .expect('status', 400)
    //         .expect('json', TestData.test1.verify)
    //         .done(doneFn);
    // });

    // fit(" REST API without FreeTExt" + Utility.getapiurl('PROVIDERS', '', TestData.test3.params) + " ", function(doneFn) {

    //     let apiurl = Utility.getapiurl('PROVIDERS', '', TestData.test3.params);
    //     console.log("api url ------" + apiurl);

    //     frisby.get(apiurl)
    //         .then(function(res) {
    //             let json = res.json;
    //             console.log("Count of Free Text====" + json.total);
    //         })
    //         .done(doneFn);
    // });

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
                                        console.log("substring ==" + text);
                                        // Object.keys(providerObject).reduce(function(previous, key) {
                                        //     nData.push(providerObject[key]);
                                        // }, '');
                                        expect(Object.values(providerObject)).toContain(text)

                                    })





                                })
                        });

                    })


                .done(doneFn);
            })
            // var self=this;


    });

    // it('Dist_1o13:Should reduce result count on Dist Filters', function() {
    //     Utility.openApplication('');
    //     dirSearch.location.setText(TestData.test2.params.zipcode);
    //     dirSearch.findDentist.click();
    //     dirSearch.getProvidersCount().then(function(totalCount) {

    //         console.log("Front End Total Count==" + totalCount);

    //         var FrontendTotal = Number(totalCount);
    //         expect(BackendTotal).toBe(FrontendTotal);

    //     })
    // });


    // Providers API with multiple Zip codes and Verefied with Distance City and State
    // dataProvider(TestData.testdata1, function(data, description) {
    //     it(" REST API with Zipcode" + Utility.getapiurl('PROVIDERS', '', data.params) + " ", function(doneFn) {
    //         //Construction of REST API URL HOST+Resource +Params
    //         let apiurl = Utility.getapiurl('PROVIDERS', '', data.params);
    //         console.log("api url ------" + apiurl);
    //         //REST API call using Frisby Node Module & Verifying with Jasmine expect's
    //         frisby.get(apiurl)
    //             .then(function(res) {
    //                 let json = res.json;
    //                 json.providers.forEach(function(providerResp) {
    //                     expect(providerResp.distance).toBeLessThan(data.verify.distance);
    //                     expect(providerResp.address.city).toBe(data.verify.city);
    //                     expect(providerResp.address.state).toBe(data.verify.state);
    //                 })
    //             })
    //             .done(doneFn);
    //     });
    // });

    // // Providers API with multiple Specialities and Verefied with Speciality, Distance City and State
    // dataProvider(TestData.testdata2, function(data, description) {
    //     it(" REST API with Speciality" + Utility.getapiurl('PROVIDERS', '', data.params) + " ", function(doneFn) {
    //         //Construction of REST API URL HOST+Resource +Params
    //         let apiurl = Utility.getapiurl('PROVIDERS', '', data.params);
    //         console.log("api url ------" + apiurl);
    //         //REST API call using Frisby Node Module & Verifying with Jasmine expect's
    //         frisby.get(apiurl)
    //             .then(function(res) {
    //                 let json = res.json;
    //                 json.providers.forEach(function(providerResp) {
    //                     expect(providerResp.distance).toBeLessThan(data.verify.distance);
    //                     expect(providerResp.address.city).toBe(data.verify.city);
    //                     expect(providerResp.address.state).toBe(data.verify.state);
    //                     expect(providerResp.specialty).toBe(data.verify.Speciality);
    //                 })
    //             })
    //             .done(doneFn);
    //     });
    // });
    // // Providers API with multiple Network ID's and Verefied with Distance City, State and NetworkId
    // dataProvider(TestData.testdata3, function(data, description) {
    //     it(" REST API with Network" + Utility.getapiurl('PROVIDERS', '', data.params) + " ", function(doneFn) {
    //         //Construction of REST API URL HOST+Resource +Params
    //         let apiurl = Utility.getapiurl('PROVIDERS', '', data.params);
    //         //REST API call using Frisby Node Module & Verifying with Jasmine expect's
    //         console.log("api url ------" + apiurl);
    //         frisby.get(apiurl)
    //             .then(function(res) {
    //                 let json = res.json;
    //                 json.providers.forEach(function(providerResp) {
    //                     expect(providerResp.distance).toBeLessThan(data.verify.distance);
    //                     expect(providerResp.address.city).toBe(data.verify.city);
    //                     expect(providerResp.address.state).toBe(data.verify.state);
    //                     expect(providerResp.providerNetworks[0].networkId).toBe(data.verify.networkID);
    //                 })
    //             })
    //             .done(doneFn);
    //     });
    // });
    // // Providers API with multiple with Freetext and Verifying with Speciality, Distance City and State
    // dataProvider(TestData.testdata4, function(data, description) {
    //     it(" REST API with Free Text" + Utility.getapiurl('PROVIDERS', '', data.params) + " ", function(doneFn) {
    //         //Construction of REST API URL HOST+Resource +Params
    //         let apiurl = Utility.getapiurl('PROVIDERS', '', data.params);
    //         console.log("api url ------" + apiurl);
    //         //REST API call using Frisby Node Module & Verifying with Jasmine expect's
    //         frisby.get(apiurl)
    //             .then(function(res) {
    //                 let json = res.json;
    //                 json.providers.forEach(function(providerResp) {
    //                     expect(providerResp.distance).toBeLessThan(data.verify.distance);
    //                     expect(providerResp.address.city).toBe(data.verify.city);
    //                     expect(providerResp.address.state).toBe(data.verify.state);
    //                     expect(providerResp.specialty).toContain(data.verify.Speciality);

    //                 })
    //             })
    //             .done(doneFn);
    //     });
    // });

    // function getValueCount(data, key) {
    //     var gCount = 0;
    //     var enCount = 0;
    //     var oCount = 0;
    //     var orthCount = 0;
    //     var pediCount = 0;
    //     var perioCount = 0;
    //     var prostCount = 0;
    //     var phdCount = 0;
    //     var fftCount = 0;
    //     var hygCount = 0;
    //     var xrCount = 0;
    //     var opCount = 0;
    //     data.forEach(function(bb) {
    //         if (bb.specialty == "General Dentist") {
    //             gCount++
    //         }
    //         if (bb.specialty == "Endodontist") {
    //             enCount++
    //         }
    //         if (bb.specialty == "Oral Surgeon") {
    //             oCount++;
    //         }
    //         if (bb.specialty == "Orthodontist") {
    //             orthCount++
    //         }
    //         if (bb.specialty == "Pediatric Dentist") {
    //             pediCount++
    //         }
    //         if (bb.specialty == "Periodontist") {
    //             perioCount++
    //         }
    //         if (bb.specialty == "Prosthodontist") {
    //             prostCount++
    //         }
    //         if (bb.specialty == "Public Health Dentist") {
    //             phdCount++
    //         }
    //         if (bb.specialty == "Full Time Faculty") {
    //             fftCount++
    //         }
    //         if (bb.specialty == "Hygienist") {
    //             hygCount++
    //         }
    //         if (bb.specialty == "XR-Laboratory") {
    //             xrCount++
    //         }
    //         if (bb.specialty == "Oral Pathology") {
    //             opCount++
    //         }

    //     });
    //     return {
    //         GeneralDentist: Number(gCount),
    //         Endodontist: Number(enCount),
    //         OralSurgeon: Number(oCount),
    //         Orthodontist: Number(orthCount),
    //         PediatricDentist: Number(pediCount),
    //         Periodontist: Number(perioCount),
    //         Prosthodontist: Number(prostCount),
    //         PublicHealthDentist: Number(phdCount),
    //         FullTimeFaculty: Number(fftCount),
    //         Hygienist: Number(hygCount),
    //         XRLaboratory: Number(xrCount),
    //         OralPathology: Number(opCount),
    //     }
    // }

});
