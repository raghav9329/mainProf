'use strict';
const Joi = frisby.Joi;

var TestData = require('../../../testData/devEng/providerIndexerApi/providerIndexerApi.json');

describe('Provider Indexer API: ', function() {
    dataProvider(TestData.indexertestdata, function(data, description) {

        it("Validate Indexer Positive API Response" + Utility.getapiurl('INDEXER') + " ", function(doneFn) {

            let apiurl = Utility.getapiurl('INDEXER');

            frisby
                .post(apiurl)
                .then(function(res) {
                    let json = res.json;
                    switch (res.status) {
                        case 200:
                            expect(json.status).toEqual("COMPLETED");
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
        });

        it("Validate Indexer Negative API Response " +
            "With Immeadiate Calls And Verifying running status" + Utility.getapiurl('INDEXER') + " ",
            function(doneFn) {

                let apiurl = Utility.getapiurl('INDEXER');

                //Doing Immeadiate Calls to Indexer

                frisby.post(apiurl)
                frisby.post(apiurl)
                    .then(function(check) {
                        let checkjson = check.json;
                        switch (check.status) {
                            case 412:
                                expect(checkjson.running).toEqual(true);
                                expect(checkjson.operationStartTime = !null && checkjson.operationEndTime === null).toBe(true);
                                break;
                        }
                    })
                    .done(doneFn);
            });

    });
});