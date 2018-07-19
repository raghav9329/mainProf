'use strict';

var TestData = require('../../../testData/devEng/providerapi/providersKey.json');

describe('Provider Directory Search service find by ProviderKey API : ', function() {
    it(" Validate ProviderKey API Response by Providing providerKey,latitude and longitude :" + Utility.getapiurl('PROVIDERKEY', TestData.testdata.PK1.providerKey, TestData.testdata.PK1.params) + " ", function(doneFn) {
        let data = TestData.testdata.PK1;
        let apiurl = Utility.getapiurl('PROVIDERKEY', data.providerKey, data.params);
        console.log(apiurl);

        frisby.get(apiurl)
            .then(function(res) {
                let json = res.json;
                expect(res.status).toEqual(200)
                expect(json).toEqual(data.verify)
            })
            .done(doneFn)

    });
    it(" Validate ProviderKey API Response by Providing providerKey and sourceNetwork :" + Utility.getapiurl('PROVIDERKEY', TestData.testdata.PK2.providerKey, TestData.testdata.PK2.params) + " ", function(doneFn) {
        let data = TestData.testdata.PK2;
        let apiurl = Utility.getapiurl('PROVIDERKEY', data.providerKey, data.params);
        console.log(apiurl);

        frisby.get(apiurl)
            .then(function(res) {
                let json = res.json;
                expect(res.status).toEqual(200)
                expect(json).toEqual(data.verify)
            })
            .done(doneFn)

    });
    it(" Validate ProviderKey API Response by Providing providerKey and latitude :" + Utility.getapiurl('PROVIDERKEY', TestData.testdata.PK3.providerKey, TestData.testdata.PK3.params) + " ", function(doneFn) {
        let data = TestData.testdata.PK3;
        let apiurl = Utility.getapiurl('PROVIDERKEY', data.providerKey, data.params);
        console.log(apiurl);

        frisby.get(apiurl)
            .then(function(res) {
                let json = res.json;
                expect(res.status).toEqual(200)
                expect(json).toEqual(data.verify)
            })
            .done(doneFn)

    });
    it(" Validate ProviderKey API Response by Providing providerKey and longitude :" + Utility.getapiurl('PROVIDERKEY', TestData.testdata.PK4.providerKey, TestData.testdata.PK4.params) + " ", function(doneFn) {
        let data = TestData.testdata.PK4;
        let apiurl = Utility.getapiurl('PROVIDERKEY', data.providerKey, data.params);
        console.log(apiurl);

        frisby.get(apiurl)
            .then(function(res) {
                let json = res.json;
                expect(res.status).toEqual(200)
                expect(json).toEqual(data.verify)
            })
            .done(doneFn)

    });
    it(" Validate ProviderKey API Response by Providing providerKey :" + Utility.getapiurl('PROVIDERKEY', TestData.testdata.PK5.providerKey, '') + " ", function(doneFn) {
        let data = TestData.testdata.PK5;
        let apiurl = Utility.getapiurl('PROVIDERKEY', data.providerKey, '');
        console.log(apiurl);
        frisby.get(apiurl)
            .then(function(res) {
                let json = res.json; 
                expect(res.status).toEqual(200)
                expect(json).toEqual(data.verify)
            })
            .done(doneFn)

    });
    it(" Validate ProviderKey API Response by Providing providerKey and sourceNetwork:" + Utility.getapiurl('PROVIDERKEY', TestData.testdata.PK6.providerKey, TestData.testdata.PK6.params) + " ", function(doneFn) {
        let data = TestData.testdata.PK6;
        let apiurl = Utility.getapiurl('PROVIDERKEY', data.providerKey, data.params);
        console.log(apiurl);

        frisby.get(apiurl)
            .then(function(res) {
                let json = res.json;
                expect(res.status).toEqual(200)
                expect(json).toEqual(data.verify)
            })
            .done(doneFn)

    });
    it(" Validate ProviderKey API Response by Providing providerKey and TargetNetwork :" + Utility.getapiurl('PROVIDERKEY', TestData.testdata.PK7.providerKey, TestData.testdata.PK7.params) + " ", function(doneFn) {
        let data = TestData.testdata.PK7;
        let apiurl = Utility.getapiurl('PROVIDERKEY', data.providerKey, data.params);
        console.log(apiurl);

        frisby.get(apiurl)
            .then(function(res) {
                let json = res.json;
                expect(res.status).toEqual(200)
                expect(json).toEqual(data.verify)
            })
            .done(doneFn)

    });
    it(" Validate ProviderKey API Response with each of the data type of Response :" + Utility.getapiurl('PROVIDERKEY', TestData.testdata.PK7.providerKey, TestData.testdata.PK7.params) + " ", function(doneFn) {
        let data = TestData.testdata.PK1;
        let apiurl = Utility.getapiurl('PROVIDERKEY', data.providerKey, data.params);
        console.log(apiurl);

        frisby.get(apiurl)
            .then(function(res) {
                let json = res.json;
                switch (res.status) {
                    case 200:
                        expect(typeof json.providerKey).toEqual('string');
                        expect(typeof json.firstName).toEqual('string');
                        expect(typeof json.lastName).toEqual('string');
                        expect(typeof json.fullName).toEqual('string');
                        expect(typeof json.specialty).toEqual('string');
                        expect(typeof json.officeName).toEqual('string');
                        expect(typeof json.practiceLocationNumber).toEqual('string');
                        expect(typeof json.officePhone).toEqual('string');
                        expect(typeof json.address.addressLine).toEqual('string');
                        expect(typeof json.address.city).toEqual('string');
                        expect(typeof json.address.state).toEqual('string');
                        expect(typeof json.address.zipcode).toEqual('string');
                        expect(typeof json.address.latitude).toEqual('number');
                        expect(typeof json.address.longitude).toEqual('number');
                        expect(typeof json.boardCertified).toEqual('boolean');
                        expect(typeof json.distance).toEqual('number');

                    case 403:
                        expect(json.shortDescription).toEqual(data.shortDescription);
                        expect(json.detailedDescription).toEqual(data.detailedDescription);


                }
            })
            .done(doneFn)

    });
    it(" Validate ProviderKey API Response when provided empty providerKey then we get internal server exception :" + Utility.getapiurl('PROVIDERKEY', TestData.testdata.PK8.providerKey, '') + " ", function(doneFn) {
        let data = TestData.testdata.PK8;
        let apiurl = Utility.getapiurl('PROVIDERKEY', data.providerKey, '');
        console.log(apiurl);

        frisby.get(apiurl)
            .then(function(res) {
                let json = res.json;
                switch (res.status) {
                    

                    case 500:
                        expect(json.shortDescription).toEqual(data.verify.shortDescription);
                        expect(json.detailedDescription).toEqual(data.verify.detailedDescription);


                }
            })
            .done(doneFn)

    });
    it(" Validate ProviderKey API Response when provided invalid providerKey then we get exception :" + Utility.getapiurl('PROVIDERKEY', TestData.testdata.PK9.providerKey, '') + " ", function(doneFn) {
        let data = TestData.testdata.PK9;
        let apiurl = Utility.getapiurl('PROVIDERKEY', data.providerKey, '');
        console.log(apiurl);

        frisby.get(apiurl)
            .then(function(res) {
                let json = res.json;
                switch (res.status) {
                    

                    case 200:
                        expect(json).toEqual(undefined);
                        //expect(json.detailedDescription).toEqual(data.verify.detailedDescription);


                }
            })
            .done(doneFn)

    });

});