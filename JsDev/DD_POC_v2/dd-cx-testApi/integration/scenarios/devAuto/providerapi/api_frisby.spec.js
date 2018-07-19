'use strict';
// const frisby = require('frisby');
const Joi = frisby.Joi;

/*
Please refer below link for the frisby documentation
https://www.frisbyjs.com/http.html
*/
var testdata = {
    "test2": {
        "zipcode": "94105",
        "distance": "60",
        "page": "0",
        "pe_page": "10",
        "max": "1500",
        "meta_data": false
    },
    "test3": {
        "params": {
            "distance": "60",
            "page": "0",
            "per_page": "10",
            "max": "1500",
            "meta_data": false
        },
        "verify": {
            "errorCode": "PDS000",
            "shortDescription": "General exception.",
            "detailedDescription": "General exception."
        }
    },
    "test4": {
        "zipcode": "94105",
        "distance": "60",
        "page": "0",
        "per_page": "10",
        "max": "5000",
        "specialty": "General Dentist",
        "sourceNetwork": "2PREMIER",
        "meta_data": false

    }
}


describe('Sample API calls with Frisby API testing framework', function() {

    it('Step1:About', function(doneFn) {
        /* Utility.getapiurl(resource, resourceKey, params) is the custom function to build the final end point url 
         * Based on given params.
         * @resource - api name
         * @resourceKey - facilities key, locationid,PROVIDERKEY
         * @params - params
         */
        let apiurl = Utility.getapiurl('ABOUT');
        console.log("apiurl=" + apiurl)
            /*
            frisby.get(url)
            Issues an HTTP GET request.
            Don't forget to call done at the end of your it since Frisby is making an async HTTP call.
            */
        frisby.get(apiurl)
            .then(function(res) {
                let json = res.json; // converting resp to JSON format
                // Jasmine expect() statement with matcher toBe()
                expect(json.buildNumber).toBe('333');
                // console.log('expected jsonBuildNubmer to be 333.  ')
            })
            .done(doneFn);
    });
    it('Step2:Zipcode', function(doneFn) {
        let apiurl = Utility.getapiurl('PROVIDERS', '', testdata.test2);
        console.log("apiurl=" + apiurl)
        frisby.get(apiurl)
            .then(function(res) {
                let json = res.json; // converting resp to JSON format
                expect(json.total).toBe(12067);
                // console.log('expected jsonTotal to be 12067.  ')
            })
            .done(doneFn);
    });

    xit('Step3:no Zipcode', function(doneFn) {
        let apiurl = Utility.getapiurl('PROVIDERS', '', testdata.test3.params);
        console.log("apiurl=" + apiurl)
        frisby.get(apiurl)
            .then(function(res) {
                let json = res.json; // converting resp to JSON format
                expect(res.status).toEqual(500)
            })
            .expect('json', testdata.test3.verify) //Verifying set of key and values in response 
            .done(doneFn);
    });


    it('Step4:Verify providers count with lang and lati', function(doneFn) {
        let apiurl = Utility.getapiurl('PROVIDERS', '', testdata.test4);
        console.log("apiurl=" + apiurl)
        frisby.get(apiurl)
            // Frisby extended the Jasmine expect() function and verifying resp contains given object
            .then(function(res) {
                let json = res.json;
                json.providers.forEach(function(element) {
                    expect(element.specialty).toEqual("General Dentist")
                })

            })

        .done(doneFn);

    });


    it('Step4:Verify providers count with lang and lati', function(doneFn) {
        let apiurl = Utility.getapiurl('PROVIDERS', '', testdata.test4);
        frisby.get(apiurl)
            .then(function(res) {
                frisby.fromJSON(res.body.providers) // Passing .get(url) call resp as argument and verifying the res
                    .expect('json', '*', { "specialty": "General Dentist" })
                    .then(function(providerArray) {
                        let json = providerArray.body;
                        json.forEach(function(providerInfo) {
                            frisby.fromJSON(providerInfo.providerNetworks)
                                .expect('jsonTypes', '*', { // jsonTypes- used to verify the type of the key in res
                                    "networkId": Joi.string().required(),
                                    "networkName": Joi.string().required(),
                                    "acceptsNewPatients": Joi.string().required()
                                })
                                .expect('json', '?', { // Verifying with tocontain given object
                                    "networkId": "2PREMIER",
                                    "networkName": "Delta Dental Premier",
                                    "acceptsNewPatients": "Y"
                                })
                        })
                    })
            })
            .done(doneFn);
    });

});
