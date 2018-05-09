'use strict';

var TestData = require('../../testData/providerapi/providersKey.json');

describe('Providers Key: ', function() {
    // Providers API with multiple Provider Keys and Verified Response with JSON data set
    dataProvider(TestData.testdata, function(data, description) {
        it(" Suggestions REST API" + Utility.getapiurl('PROVIDERKEY', data.providerKey, data.params) + " ", function(doneFn) {
            //Construction of REST API URL HOST+Resource +Params
            let apiurl = Utility.getapiurl('PROVIDERKEY', data.providerKey, data.params);
            console.log(apiurl);
            //REST API call using Frisby Node Module & Verifying Status code and Json data set using Frisby expect.

            // Use can write script in any format

            // Format 1
            // In format 1 - if any assertion(expect()) fail, it will throw unhandled promise exception
            // frisby.get(apiurl)
            //     .expect('json', data.verify)
            //     .done(doneFn)

            // Format 2
            frisby.get(apiurl)
                .then(function(res) {
                    let json = res.json; // converting resp to JSON format
                    expect(json).toEqual(data.verify)
                })
                .done(doneFn)
        });
    });

});