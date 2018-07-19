'use strict';
const Joi = frisby.Joi;

var TestData = require('../../../testData/devEng/providerIndexerApi/providerIndexerYelpAPI.json');

const fs = require('fs')
const path = require('path')
const FormData = require('form-data')

describe('Validating Provider Indexer Yelp API', function() {
    beforeAll(function() {
        jasmine.addMatchers(custommatcher.customMatchers);
    });
    dataProvider(TestData.indexeryelptestdata, function(data, description) {
        it('Validating Provider Indexer Yelp API With OfficePhones', function(doneFn) {

            let apiurl = Utility.getapiurl('YELP');

            var file = path.resolve(__dirname, '../../testData/providerIndexerApi/officePhone.json')

            var form = new FormData()
            form.append('officePhones', fs.createReadStream(file));

            frisby.post(apiurl, { headers: form.getHeaders(), body: form })
                .then(function(res) {
                    let json = res.json;
                    switch (res.status) {
                        case 200:
                            expect(json.desc).toEqual("Successfully Processed yelp data to the yelp collection", "Verify desc should be equal to - Successfully Processed yelp data to the yelp collection");
                            break;
                        case 400:
                            expect(json.shortDescription).toEqual(data.shortDescription);
                            expect(json.detailedDescription).toEqual(data.detailedDescription);
                        case 401:
                            expect(json.shortDescription).toEqual(data.shortDescription);
                            expect(json.detailedDescription).toEqual(data.detailedDescription);
                        case 403:
                            expect(json.shortDescription).toEqual(data.shortDescription);
                            expect(json.detailedDescription).toEqual(data.detailedDescription);
                        case 404:
                            expect(json.shortDescription).toEqual(data.shortDescription);
                            expect(json.detailedDescription).toEqual(data.detailedDescription);
                        case 500:
                            expect(json.shortDescription).toEqual(data.shortDescription);
                            expect(json.detailedDescription).toEqual(data.detailedDescription);
                    }
                })
                .done(doneFn);

        })

        it('Validating Provider Indexer Yelp API With ProviderKeys', function(doneFn) {

            let apiurl = Utility.getapiurl('YELP');

            var providerKeysFile = path.resolve(__dirname, '../../testData/providerIndexerApi/providerKeys.json')

            var providerKeysForm = new FormData()
            providerKeysForm.append('providerKeys', fs.createReadStream(providerKeysFile));

            frisby.post(apiurl, { headers: providerKeysForm.getHeaders(), body: providerKeysForm })
                .then(function(response) {
                    let json = response.json;
                    switch (response.status) {
                        case 200:
                            expect(json.desc).toEqual("Successfully Processed yelp data to the yelp collection", "Verify desc should be equal to - Successfully Processed yelp data to the yelp collection");
                            expect(json.startTime != null).toBe(true, "Verify startTime should not be NULL");
                            expect(json.endTime != null).toBe(true, "Verify endTime should not be NULL");
                            expect(json.error == null).toBe(true, "Verify error should be NULL");
                            break;
                        case 400:
                            expect(json.shortDescription).toEqual(data.shortDescription);
                            expect(json.detailedDescription).toEqual(data.detailedDescription);
                        case 401:
                            expect(json.shortDescription).toEqual(data.shortDescription);
                            expect(json.detailedDescription).toEqual(data.detailedDescription);
                        case 403:
                            expect(json.shortDescription).toEqual(data.shortDescription);
                            expect(json.detailedDescription).toEqual(data.detailedDescription);
                        case 404:
                            expect(json.shortDescription).toEqual(data.shortDescription);
                            expect(json.detailedDescription).toEqual(data.detailedDescription);
                        case 500:
                            expect(json.shortDescription).toEqual(data.shortDescription);
                            expect(json.detailedDescription).toEqual(data.detailedDescription);
                    }
                })
                .done(doneFn);

        })

        it('Validating Provider Indexer Yelp API With OfficeNumbers', function(doneFn) {

            let apiurl = Utility.getapiurl('YELP');

            var file = path.resolve(__dirname, '../../testData/providerIndexerApi/officeNumber.json')

            var form = new FormData()
            form.append('officeNumber', fs.createReadStream(file));

            frisby.post(apiurl, { headers: form.getHeaders(), body: form })
                .then(function(res) {
                    let json = res.json;
                    switch (res.status) {
                        case 200:
                            expect(json.desc).toEqual("Successfully Processed yelp data to the yelp collection", "Verify desc should be equal to - Successfully Processed yelp data to the yelp collection");
                            expect(json.startTime != null).toBe(true, "Verify startTime should not be NULL");
                            expect(json.endTime != null).toBe(true, "Verify endTime should not be NULL");
                            expect(json.error == null).toBe(true, "Verify error should be NULL");
                            break;
                        case 400:
                            expect(json.shortDescription).toEqual(data.shortDescription);
                            expect(json.detailedDescription).toEqual(data.detailedDescription);
                        case 401:
                            expect(json.shortDescription).toEqual(data.shortDescription);
                            expect(json.detailedDescription).toEqual(data.detailedDescription);
                        case 403:
                            expect(json.shortDescription).toEqual(data.shortDescription);
                            expect(json.detailedDescription).toEqual(data.detailedDescription);
                        case 404:
                            expect(json.shortDescription).toEqual(data.shortDescription);
                            expect(json.detailedDescription).toEqual(data.detailedDescription);
                        case 500:
                            expect(json.shortDescription).toEqual(data.shortDescription);
                            expect(json.detailedDescription).toEqual(data.detailedDescription);
                    }
                })
                .done(doneFn);

        })

        it('Validating Provider Indexer Yelp Download API', function(doneFn) {

            let apiurl = Utility.getapiurl('YELPDOWNLOAD') + '/download';

            frisby.get(apiurl)
                .then(function(res) {
                    let json = res.json;
                    switch (res.status) {
                        case 200:
                            expect(res.status).toEqual(200);
                            break;
                        case 400:
                            expect(json.shortDescription).toEqual(data.shortDescription);
                            expect(json.detailedDescription).toEqual(data.detailedDescription);
                        case 401:
                            expect(json.shortDescription).toEqual(data.shortDescription);
                            expect(json.detailedDescription).toEqual(data.detailedDescription);
                        case 403:
                            expect(json.shortDescription).toEqual(data.shortDescription);
                            expect(json.detailedDescription).toEqual(data.detailedDescription);
                        case 404:
                            expect(json.shortDescription).toEqual(data.shortDescription);
                            expect(json.detailedDescription).toEqual(data.detailedDescription);
                        case 500:
                            expect(json.shortDescription).toEqual(data.shortDescription);
                            expect(json.detailedDescription).toEqual(data.detailedDescription);
                    }
                })
                .done(doneFn);

        })

        it('Validating Provider Indexer Yelp Download API', function(doneFn) {

            let apiurl = Utility.getapiurl('YELPUPLOAD') + '/upload';

            var file = path.resolve(__dirname, '../../testData/providerIndexerApi/upload.json');

            var form = new FormData()
            form.append('file', fs.createReadStream(file));

            frisby.post(apiurl, { headers: form.getHeaders(), body: form })
                .then(function(res) {
                    let json = res.json;
                    switch (res.status) {
                        case 200:
                            expect(res.status).toEqual(200);
                            expect(json).toBe(true);
                            break;
                        case 400:
                            expect(json.shortDescription).toEqual(data.shortDescription);
                            expect(json.detailedDescription).toEqual(data.detailedDescription);
                        case 401:
                            expect(json.shortDescription).toEqual(data.shortDescription);
                            expect(json.detailedDescription).toEqual(data.detailedDescription);
                        case 403:
                            expect(json.shortDescription).toEqual(data.shortDescription);
                            expect(json.detailedDescription).toEqual(data.detailedDescription);
                        case 404:
                            expect(json.shortDescription).toEqual(data.shortDescription);
                            expect(json.detailedDescription).toEqual(data.detailedDescription);
                        case 500:
                            expect(json.shortDescription).toEqual(data.shortDescription);
                            expect(json.detailedDescription).toEqual(data.detailedDescription);
                    }
                })
                .done(doneFn);

        })
    });
})