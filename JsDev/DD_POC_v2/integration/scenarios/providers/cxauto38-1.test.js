var TestData = require('../../testData/' + testDataEnv + '/providers/cxauto38-1.json');

var dirSearch = new(require('../../pageObjects/providers/directory-search-page.js'));
var providerDetails = new(require('../../pageObjects/providers/provider-details-page.js'));

describe('Providers CXAUTO:50- ', function() {

    beforeEach(function() {
        Utility.openApplication('');
    });

    var BackendTotal;

    dataProvider(TestData.testdata, function(data, description) {
        it(" REST API without FreeTExt" + Utility.getapiurl('PROVIDERS', '', data.params) + " ", function(doneFn) {

            let apiurl = Utility.getapiurl('PROVIDERS', '', data.params);
            logger.info("api url ------" + apiurl);

            frisby.get(apiurl)
                .then(function(res) {
                    let json = res.json;
                     expect(json.providers.length).toBeGreaterThan(1);
                    BackendTotal = json.total;
                    logger.info("Backend Count of Free Text====" + BackendTotal);
                })
                .done(doneFn);
        });
        it('Verification Total Count of retrived result', function() {
            dirSearch.location.setText(data.verify.zipcode);
            dirSearch.keywordSearch.setText(data.verify.free_text);
            dirSearch.findDentist.click();
            dirSearch.getProvidersCount().then(function(totalCount) {
                logger.info("Front End Count of Free Text====" + totalCount);
                var FrontendTotal = Number(totalCount);
                expect(BackendTotal).toBe(FrontendTotal);
            })
        });
    });

});


//Verefication is in-progress

// 'use strict';
// var TestData = require('../../testData/providerapi/providers.json');

// describe('Providers: ', function() {

//   it(" REST API without Zip Code" + Utility.getapiurl('PROVIDERS', '', TestData.test3.params) + " ", function(doneFn) {
//         //Construction of REST API URL HOST+Resource +Params
//         var providerData = [];
//         var providerObject = {};

//         browser.controlFlow().execute(function() {
//                 let apiurl = Utility.getapiurl('PROVIDERS', '', TestData.test3.params);
//                 logger.info("api url ------" + apiurl);



//                 //REST API call using Frisby Node Module & Verifying with Jasmine expect's
//                 frisby.get(apiurl)
//                     .then(function(res) {
//                         let json = res.json;
//                         json.providers.forEach(function(pdata) {

//                             // logger.info("providerKey=" + pdata.providerKey);
//                             // logger.info("facilityId=" + pdata.facilityId);
//                             // logger.info("practiceLocationNumber=" + pdata.practiceLocationNumber);

//                             frisby.get((Utility.getapiurl('PROVIDERKEY', pdata.providerKey, '')))
//                                 .then(function(pkey) {
//                                     let pkeyres = pkey.json;
//                                     providerObject.firstName = pkeyres.firstName;
//                                     providerObject.lastName = pkeyres.lastName;
//                                     providerObject.specialty = pkeyres.specialty;
//                                     providerObject.officeName = pkeyres.officeName;
//                                     providerObject.npi = pkeyres.npi;
//                                     providerObject.licenseNumber = pkeyres.license.licenseNumber;
//                                     providerObject.providerLanguages = pkeyres.providerLanguages;
//                                     providerObject.practiceLocationLanguages = pkeyres.practiceLocationLanguages;

//                                     // logger.info("firstName=" + pkeyres.firstName);
//                                     // logger.info("lastName=" + pkeyres.lastName);
//                                     // logger.info("specialty=" + pkeyres.specialty);
//                                     // logger.info("officeName=" + pkeyres.officeName);
//                                     // logger.info("npi=" + pkeyres.npi);
//                                     // logger.info("licenseNumber=" + pkeyres.license.licenseNumber);
//                                     // logger.info("providerLanguages=" + pkeyres.providerLanguages);
//                                     // logger.info("practiceLocationLanguages=" + pkeyres.practiceLocationLanguages);

//                                 })

//                             frisby.get((Utility.getapiurl('LOCATIONS', pdata.practiceLocationNumber, '')))
//                                 .then(function(location) {
//                                     let locres = location.json;
//                                     providerObject.groupPracticeNpi = locres.groupPracticeNpi;
//                                     providerObject.practiceLocationNpi = locres.practiceLocationNpi;
//                                     // logger.info("Provider final data111111========" + JSON.stringify(providerObject))

//                                     // logger.info("groupPracticeNpi=" + locres.groupPracticeNpi);
//                                     // logger.info("practiceLocationNpi=" + locres.practiceLocationNpi);
//                                 })

//                             frisby.get((Utility.getapiurl('FACILITIES', pdata.facilityId, '')))
//                                 .then(function(fres) {
//                                     // logger.info("facility name=" + fres.name);
//                                     providerObject.facilityName = fres.name;
//                                     providerData.push(providerObject);
//                                     var nData = [];
//                                     // logger.info("providerObject===============" + providerObject);
//                                     // logger.info("providerData===============" + providerData);


//                                     var stringTokens = TestData.test3.params.free_text.split(" ");
//                                     stringTokens.forEach(function(text) {
//                                         logger.info("substring ==" + text);
//                                         // Object.keys(providerObject).reduce(function(previous, key) {
//                                         //     nData.push(providerObject[key]);
//                                         // }, '');
//                                         expect(Object.values(providerObject)).toContain(text)

//                                     })





//                                 })
//                         });

//                     })


//                 .done(doneFn);
//             })
//             // var self=this;


//     });

// });
