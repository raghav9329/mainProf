'use strict';
const Joi = frisby.Joi;
var TestData = require('../../testData/providerapi/providersFacilities.json');

describe('Providers Facilities: ', function() {
	// Providers API with multiple Facility ID and Verified Response with JSON data set
    dataProvider(TestData.testdata, function(data, description) {
        it('Retrieves facility details for the given facilityId :"'+Utility.getapiurl('FACILITIES',data.facilityId ,data.params)+'"', function(doneFn) {
        	//Construction of REST API URL HOST+Resource +Params
            let apiurl = Utility.getapiurl('FACILITIES',data.facilityId ,data.params);
            console.log("api url ------" + apiurl);
             //REST API call using Frisby Node Module & Verifying Status code and Json data set using Frisby expect.
            frisby.get(apiurl)
                .expect('status', 200)
                .expect('json', data.verify)
                .done(doneFn);
        });
    });
});
