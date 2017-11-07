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
            frisby.get(apiurl)
                .expect('json', data.verify)
                .done(doneFn)
        });
    });

});
