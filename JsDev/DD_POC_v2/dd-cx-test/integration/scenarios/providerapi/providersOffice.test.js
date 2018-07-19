'use strict';

var TestData = require('../../testData/providerapi/providersOffice.json');


describe('Providers', function() {
	// Providers API with multiple "Office ID's @ PracticeLocationNumber" and Verified Response with JSON data sets
    dataProvider(TestData.testdata, function(data, description) {
        it(" Suggestions REST API" + Utility.getapiurl('LOCATIONS', data.practiceLocationNumber, data.params) + " ", function(doneFn) {
        	//Construction of REST API URL HOST+Resource +Params
            let apiurl = Utility.getapiurl('LOCATIONS', data.practiceLocationNumber, data.params);
            console.log(apiurl);
//REST API call using Frisby Node Module & Verifying Status code and Json data set using Frisby expect.
            frisby.get(apiurl)
                .expect('json', data.verify)
                .done(doneFn)
        });
    });

});
