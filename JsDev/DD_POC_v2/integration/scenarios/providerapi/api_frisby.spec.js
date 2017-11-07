'use strict';
// const frisby = require('frisby');
const Joi = frisby.Joi;

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
            "errors": [{
                "errorCode": "E101",
                "errorSubCode": "FIND-PROVIDERS",
                "shortDescription": "Invalid Latitude:null and Longitude:null request. Check your input.",
                "detailedDescription": "Invalid Latitude:null and Longitude:null request. Check your input.",
                "originator": {
                    "name": "Geocoder",
                    "operation": null
                }
            }]

        }
    },
    "test4": {
        "zipcode": "94105",
        "distance": "60",
        "page": "0",
        "per_page": "5000",
        "max": "5000",
        "specialty": "General Dentist",
        "sourceNetwork": "2PREMIER",
        "meta_data": false

    }
}


describe('Frisby', function() {


    it('Step1:About', function(doneFn) {
        let apiurl = Utility.getapiurl('ABOUT');
        frisby.get(apiurl)
            .then(function(res) {
                let json = res.json;
                expect(json.buildNumber).toBe('680');
                console.log('expected jsonBuildNubmer to be 680.  ')
            })
            .done(doneFn);
    });
    it('Step2:Zipcode', function(doneFn) {
        let apiurl = Utility.getapiurl('PROVIDERS', '', testdata.test2);
        frisby.get(apiurl)
            .then(function(res) {
                let json = res.json;
                expect(json.total).toBe(5752);
                console.log('expected jsonTotal to be 7198.  ')
            })
            .done(doneFn);
    });

    it('Step3:no Zipcode', function(doneFn) {
        let apiurl = Utility.getapiurl('PROVIDERS', '', testdata.test3.params);
        frisby.get(apiurl)
            .expect('status', 400)
            .expect('json', testdata.test3.verify)
            .done(doneFn);
    });


    it('Step4:Verify providers count with lang and lati', function(doneFn) {
        let apiurl = Utility.getapiurl('PROVIDERS', '', testdata.test4);
        frisby.get(apiurl)
            .expect('json', 'providers.*', { "specialty": "General Dentist1" })
            .then(function() {
                return Promise.resolve();
            })
            .catch(function(err) {
                console.log('err' + err);

            })
            .done(doneFn);

    });


    it('Step4:Verify providers count with lang and lati', function(doneFn) {
        let apiurl = Utility.getapiurl('PROVIDERS', '', testdata.test4);
        frisby.get(apiurl)
            .then(function(res) {
                frisby.fromJSON(res.body.providers)
                    .expect('json', '*', { "specialty": "General Dentist" })
                    .then(function(providerArray) {
                        let json = providerArray.body;
                        json.forEach(function(providerInfo) {
                            frisby.fromJSON(providerInfo.providerNetworks)
                                .expect('jsonTypes', '*', {
                                    "networkId": Joi.string().required(),
                                    "networkName": Joi.string().required(),
                                    "acceptsNewPatients": Joi.string().required()
                                })
                                .expect('json', '?', {
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
