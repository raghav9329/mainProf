'use strict';
var TestData = require('../../testData/' + testDataEnv + '/providerapi/providers.json');


describe('Provider Directory Search Service retrieve the provider details by Provider API : ', function() {
    var providerdata = TestData.testdata1;
    beforeEach(function() {
        jasmine.addMatchers(custommatcher.customMatchers);
    });
    // Providers API without Zipcode and Verified with "Error Status Code" and response body with "error JSON Data Set".
    it(" Given empty zipcode or lat and long Then validate the response  " + Utility.getapiurl('PROVIDERS', '', TestData.test1.params) + " ", function(doneFn) {

        let apiurl = Utility.getapiurl('PROVIDERS', '', TestData.test1.params);
        let data = TestData.test1;
        console.log("api url -------------" + apiurl);
        frisby.get(apiurl)
            .then(function(res) {
                let json = res.json;
                expect(res.status).toEqual(500, "verify that  status code should be 500 ")
                expect(json.errorCode).toEqual(data.verify.errorCode, "verify that  error  code should be  " + data.verify.errorCode);
                expect(json.shortDescription).toEqual(data.verify.shortDescription, "verify that  error  code should be  " + data.verify.shortDescription);
                expect(json.detailedDescription).toEqual(data.verify.detailedDescription, "verify that  error  code should be  " + data.verify.detailedDescription);
            })

            .done(doneFn);

    });
    it(" Given zipcode = " + providerdata.test1.params.zipcode + "  specialty = " + providerdata.test1.params.specialty +
        " Then validate the response with data types" + Utility.getapiurl('PROVIDERS', '', providerdata.test1.params) + " ",
        function(doneFn) {

            let apiurl = Utility.getapiurl('PROVIDERS', '', providerdata.test1.params);
            let data = providerdata.test1;
            console.log("api url -------------" + apiurl);
            frisby.get(apiurl)
                .then(function(res) {
                    let json = res.json;
                    json.providers.forEach(function(provider) {
                        expect(typeof provider.providerKey).toEqual("string", "verify that  data type is string ");
                        expect(typeof provider.firstName).toEqual("string", "verify that  data type is string ");
                        expect(typeof provider.specialty).toEqual("string", "verify that  data type is string ");
                        expect(typeof provider.officeName).toEqual("string", "verify that  data type is string ");
                        expect(typeof provider.practiceLocationNumber).toEqual("string", "verify that  data type is string ");
                        expect(typeof provider.officePhone).toEqual("string", "verify that  data type is string ");
                        if (provider.facilityId != null) {
                            expect(typeof provider.facilityId).toEqual("string", "verify that  data type is string ");
                        }
                        expect(typeof provider.distance).toEqual("number", "verify that  data type is number ");
                        expect(typeof provider.boardCertified).toEqual("boolean", "verify that  data type is boolean ");

                    })


                })

                .done(doneFn);

        });
    it(" Given zipcode = " + providerdata.test2.params.zipcode + "  specialty = " + providerdata.test2.params.specialty +
        "  Then validate the response with state" + Utility.getapiurl('PROVIDERS', '', providerdata.test2.params) + " ",
        function(doneFn) {

            let apiurl = Utility.getapiurl('PROVIDERS', '', providerdata.test2.params);
            let data = providerdata.test2;
            console.log("api url -------------" + apiurl);
            frisby.get(apiurl)
                .then(function(res) {
                    let json = res.json;
                    expect(res.status).toEqual(200, "verify that  status code should be 200 ");
                    json.providers.forEach(function(provider) {
                        expect(provider.address.state).toEqual(data.verify.state, "verify that  state is " + data.verify.state);

                    })

                })

                .done(doneFn);

        });
    it(" Given lat = " + providerdata.test3.params.lat + " long =" + providerdata.test3.params.long +
        "  specialty = " + providerdata.test3.params.specialty +
        "  Then validate the response with distance " + Utility.getapiurl('PROVIDERS', '', providerdata.test3.params) + " ",
        function(doneFn) {

            let apiurl = Utility.getapiurl('PROVIDERS', '', providerdata.test3.params);
            let data = providerdata.test3;
            console.log("api url -------------" + apiurl);
            frisby.get(apiurl)
                .then(function(res) {
                    let json = res.json;
                    expect(res.status).toEqual(200, "verify that  status code should be 200 ");
                    json.providers.forEach(function(provider) {
                        if (null != data.params.lat && null != data.params.long) {
                            expect(Math.trunc(provider.distance)).toEqual(Math.trunc(Utility.getDistanceBetweenTwoPoints(data.params.lat, data.params.long, provider.address.latitude, provider.address.longitude, "M")), "verify that  distance is  " + Math.trunc(Utility.getDistanceBetweenTwoPoints(data.params.lat, data.params.long, provider.address.latitude, provider.address.longitude, "M")));
                        } else {
                            expect(provider.distance).toEqual(0, "Verify distance is 0");
                        }

                    })

                })

                .done(doneFn);

        });

    it(" Given zipcode = " + providerdata.test4.params.zipcode + "  specialty = " + providerdata.test4.params.specialty +
        "  Then validate the response with specialty, distance , state " + Utility.getapiurl('PROVIDERS', '', providerdata.test4.params) + " ",
        function(doneFn) {

            let apiurl = Utility.getapiurl('PROVIDERS', '', providerdata.test4.params);
            let data = providerdata.test4;
            console.log("api url -------------" + apiurl);
            frisby.get(apiurl)
                .then(function(res) {
                    let json = res.json;
                    expect(res.status).toEqual(200, "verify that  status code should be 200 ");
                    json.providers.forEach(function(provider) {
                        expect(provider.specialty).toEqual(data.verify.speciality, "verify that  speciality " + data.verify.speciality);
                        expect(provider.address.state).toEqual(data.verify.state, "verify that  state is " + data.verify.state);
                        expect(provider.distance).toBeLessThan(data.verify.distance, "verify that  distance is " + data.verify.distance);

                    })

                })

                .done(doneFn);

        });
    it(" Given zipcode = " + providerdata.test5.params.zipcode + "  specialty = " + providerdata.test5.params.specialty +
        "  Then validating the response with meta data number of providers  " + Utility.getapiurl('PROVIDERS', '', providerdata.test5.params) + " ",
        function(doneFn) {

            let apiurl = Utility.getapiurl('PROVIDERS', '', providerdata.test5.params);
            let data = providerdata.test5;
            console.log("api url -------------" + apiurl);
            frisby.get(apiurl)
                .then(function(res) {
                    let json = res.json;
                    expect(res.status).toEqual(200, "verify that  status code should be 200 ");

                    expect(json.metaData.numberOfProviders).toEqual(data.verify.numberOfProviders, "Verify that number of providers are " + data.verify.numberOfProviders);
                    expect(json.metaData.numberOfFacilities).toEqual(data.verify.numberOfFacilities, "Verify that number of Facilities are " + data.verify.numberOfFacilities);
                    expect(json.metaData.numberOfOffices).toEqual(data.verify.numberOfOffices, "Verify that number of Offices are " + data.verify.numberOfOffices);



                })

                .done(doneFn);
        });
    it(" Given zipcode = " + providerdata.test6.params.zipcode + "  specialty = " + providerdata.test6.params.specialty +
        " Network = " + providerdata.test6.params.network + "  Then validating the response with providerNetworks  " + Utility.getapiurl('PROVIDERS', '', providerdata.test6.params) + " ",
        function(doneFn) {

            let apiurl = Utility.getapiurl('PROVIDERS', '', providerdata.test6.params);
            let data = providerdata.test6;
            console.log("api url -------------" + apiurl);

            frisby.get(apiurl)
                .then(function(res) {
                    let json = res.json;
                    expect(res.status).toEqual(200, "verify that  status code should be 200 ");
                    json.providers.forEach(function(provider) {
                        var networks = [];
                        provider.providerNetworks.forEach(function(network) {
                            networks.push(network.networkId);

                        })
                        expect(networks).toContain(data.verify.networkID, "Verify that newtworks contain " + data.verify.networkID);
                    })

                })

                .done(doneFn);
        });
    it(" Given zipcode = " + providerdata.test7.params.zipcode + "  specialty = " + providerdata.test7.params.specialty +
        " free_text = " + providerdata.test7.params.free_text + "  Then validating the response with specialty in generatedFilters  " + Utility.getapiurl('PROVIDERS', '', providerdata.test7.params) + " ",
        function(doneFn) {

            let apiurl = Utility.getapiurl('PROVIDERS', '', providerdata.test7.params);
            let data = providerdata.test7;
            console.log("api url -------------" + apiurl);

            frisby.get(apiurl)
                .then(function(res) {
                    let json = res.json;
                    expect(res.status).toEqual(200, "verify that  status code should be 200 ");
                    expect(json.generatedFilters.specialty).toContain(data.verify.specialty, "Verify that specialty is contained " + data.verify.specialty);
                    expect(json.generatedFilters.specialty).toContain(data.params.specialty, "Verify that specialty is contained " + data.params.specialty);
                    json.providers.forEach(function(provider) {
                        expect(provider.specialty).toContain(data.verify.specialty, "Verify that specialty is contained " + data.params.specialty);
                    })

                })

                .done(doneFn);
        });
    it(" Given zipcode = " + providerdata.test8.params.zipcode + "  specialty = " + providerdata.test8.params.specialty +
        " free_text = " + providerdata.test7.params.boardCertified + "  Then validating the response with boardCertified  " + Utility.getapiurl('PROVIDERS', '', providerdata.test8.params) + " ",
        function(doneFn) {

            let apiurl = Utility.getapiurl('PROVIDERS', '', providerdata.test8.params);
            let data = providerdata.test8;
            console.log("api url -------------" + apiurl);

            frisby.get(apiurl)
                .then(function(res) {
                    let json = res.json;
                    expect(res.status).toEqual(200, "verify that  status code should be 200 ");

                    json.providers.forEach(function(provider) {
                        expect(provider.boardCertified).toEqual(data.verify.boardCertified, "verify that  boardCertified is " + data.verify.boardCertified);
                    })

                })

                .done(doneFn);
        });
    it(" Given lat = " + providerdata.test9.params.lat + " long =" + providerdata.test9.params.long +
        "  sourceNetwork = " + providerdata.test9.params.sourceNetwork + " targetNetwork = " + providerdata.test9.params.targetNetwork + "  Then validating the response with providerNetworks  " + Utility.getapiurl('PROVIDERS', '', providerdata.test9.params) + " ",
        function(doneFn) {

            let apiurl = Utility.getapiurl('PROVIDERS', '', providerdata.test9.params);
            let data = providerdata.test9;
            console.log("api url -------------" + apiurl);

            frisby.get(apiurl)
                .then(function(res) {
                    let json = res.json;
                    expect(res.status).toEqual(200, "verify that  status code should be 200 ");

                    json.providers.forEach(function(provider) {
                        var networks = [];
                        provider.providerNetworks.forEach(function(network) {
                            networks.push(network.networkId);

                        })
                        expect(networks).toContain(data.verify.network, "Verify that newtworks contain " + data.verify.network);
                    })

                })

                .done(doneFn);
        });
    it(" Given lat = " + providerdata.test10.params.lat + " long =" + providerdata.test10.params.long +
        "  sourceNetwork = " + providerdata.test10.params.sourceNetwork + " targetNetwork = " + providerdata.test10.params.targetNetwork + "  Then validating the response with providerNetworks  " + Utility.getapiurl('PROVIDERS', '', providerdata.test10.params) + " ",
        function(doneFn) {

            let apiurl = Utility.getapiurl('PROVIDERS', '', providerdata.test10.params);
            let data = providerdata.test10;
            console.log("api url -------------" + apiurl);

            frisby.get(apiurl)
                .then(function(res) {
                    let json = res.json;
                    expect(res.status).toEqual(200, "verify that  status code should be 200 ");

                    json.providers.forEach(function(provider) {
                        var networks = [];
                        provider.providerNetworks.forEach(function(network) {
                            networks.push(network.networkId);

                        })
                        expect(networks).toContain(data.verify.network, "Verify that newtworks contain " + data.verify.network);
                    })

                })

                .done(doneFn);
        });
    it(" Given lat = " + providerdata.test11.params.lat + " long =" + providerdata.test11.params.long +
        "sort_field" + providerdata.test11.params.sort_field + "sort_order" + providerdata.test11.params.sort_order + "  Then validating the response with distance descending order  " + Utility.getapiurl('PROVIDERS', '', providerdata.test11.params) + " ",
        function(doneFn) {

            let apiurl = Utility.getapiurl('PROVIDERS', '', providerdata.test11.params);
            let data = providerdata.test11;
            console.log("api url -------------" + apiurl);

            frisby.get(apiurl)
                .then(function(res) {
                    let json = res.json;
                    expect(res.status).toEqual(data.verify.status, "verify that  status code should be " + data.verify.status);
                    let distance = [];
                    json.providers.forEach(function(provider) {

                        distance.push(provider.distance);

                    })
                    expect(distance).not.toEqual(distance.sort, "Verify that distance are in descending order");

                })

                .done(doneFn);
        });
    it(" Given lat = " + providerdata.test11.params.lat + " long =" + providerdata.test11.params.long +
        "sort_field" + providerdata.test11.params.sort_field + "sort_order" + providerdata.test11.params.sort_order + "  Then validating the response with distance descending order  " + Utility.getapiurl('PROVIDERS', '', providerdata.test11.params) + " ",
        function(doneFn) {

            let apiurl = Utility.getapiurl('PROVIDERS', '', providerdata.test11.params);
            let data = providerdata.test11;
            console.log("api url -------------" + apiurl);

            frisby.get(apiurl)
                .then(function(res) {
                    let json = res.json;
                    expect(res.status).toEqual(data.verify.status, "verify that  status code should be " + data.verify.status);
                    let distance = [];
                    json.providers.forEach(function(provider) {

                        distance.push(provider.distance);

                    })
                    expect(distance).not.toEqual(distance.sort, "Verify that distance are in descending order");

                })

                .done(doneFn);
        });
    it(" Given lat = " + providerdata.test12.params.lat + " long =" + providerdata.test12.params.long +
        "sort_field" + providerdata.test12.params.sort_field + "sort_order" + providerdata.test12.params.sort_order + "  Then validating the response with distance ascending order  " + Utility.getapiurl('PROVIDERS', '', providerdata.test12.params) + " ",
        function(doneFn) {

            let apiurl = Utility.getapiurl('PROVIDERS', '', providerdata.test12.params);
            let data = providerdata.test12;
            console.log("api url -------------" + apiurl);

            frisby.get(apiurl)
                .then(function(res) {
                    let json = res.json;
                    expect(res.status).toEqual(data.verify.status, "verify that  status code should be " + data.verify.status);
                    let distance = [];
                    json.providers.forEach(function(provider) {

                        distance.push(provider.distance);

                    })
                    expect(distance).toEqual(distance.sort(), "Verify that distance are in ascending order");

                })

                .done(doneFn);
        });
    it(" Given firstName in free_text and zipcode" + providerdata.test13.params.zipcode + " specialty = " + providerdata.test13.params.specialty +
        "freeText" + providerdata.test13.params.free_text + "  Then validating the response with freetext value w.r.t  fullName   " + Utility.getapiurl('PROVIDERS', '', providerdata.test13.params) + " ",
        function(doneFn) {

            let apiurl = Utility.getapiurl('PROVIDERS', '', providerdata.test13.params);
            let data = providerdata.test13;
            console.log("api url -------------" + apiurl);

            frisby.get(apiurl)
                .then(function(res) {
                    let json = res.json;
                    expect(res.status).toEqual(data.verify.status, "verify that  status code should be " + data.verify.status);

                    json.providers.forEach(function(provider) {

                        expect(provider.fullName).toContain(data.verify.free_text, "Verify that firstName is in fullName contain " + data.verify.free_text);

                    })


                })

                .done(doneFn);
        });
    it(" Given lastName in free_text and zipcode = " + providerdata.test14.params.zipcode + " specialty = " + providerdata.test14.params.specialty +
        "freeText" + providerdata.test14.params.free_text + "  Then validating the response with freetext value w.r.t  fullName   " + Utility.getapiurl('PROVIDERS', '', providerdata.test14.params) + " ",
        function(doneFn) {

            let apiurl = Utility.getapiurl('PROVIDERS', '', providerdata.test14.params);
            let data = providerdata.test14;
            console.log("api url -------------" + apiurl);

            frisby.get(apiurl)
                .then(function(res) {
                    let json = res.json;
                    expect(res.status).toEqual(data.verify.status, "verify that  status code should be " + data.verify.status);

                    json.providers.forEach(function(provider) {

                        expect(provider.fullName).toContain(data.verify.free_text, "Verify that firstName is in fullName contain " + data.verify.free_text);

                    })


                })

                .done(doneFn);
        });
    it(" Given alpanumeric value in free_text and zipcode = " + providerdata.test15.params.zipcode + " specialty = " + providerdata.test15.params.specialty +
        " freeText = " + providerdata.test15.params.free_text + "  Then validating the response with freetext value with respect to officeName   " + Utility.getapiurl('PROVIDERS', '', providerdata.test15.params) + " ",
        function(doneFn) {

            let apiurl = Utility.getapiurl('PROVIDERS', '', providerdata.test15.params);
            let data = providerdata.test15;
            console.log("api url -------------" + apiurl);

            frisby.get(apiurl)
                .then(function(res) {
                    let json = res.json;
                    expect(res.status).toEqual(data.verify.status, "verify that  status code should be " + data.verify.status);

                    json.providers.forEach(function(provider) {

                        expect(provider.officeName).toContain(data.verify.free_text, "Verify that firstName is in fullName contain " + data.verify.free_text);

                    })


                })

                .done(doneFn);
        });
    it(" Given npi number in free_text and zipcode = " + providerdata.test16.params.zipcode + " specialty = " + providerdata.test16.params.specialty +
        " freeText = " + providerdata.test16.params.free_text + "  Then validating the response with freetext value with respect to npi   " + Utility.getapiurl('PROVIDERS', '', providerdata.test16.params) + " ",
        function(doneFn) {

            let apiurl = Utility.getapiurl('PROVIDERS', '', providerdata.test16.params);
            let data = providerdata.test16;
            console.log("api url -------------" + apiurl);

            frisby.get(apiurl)
                .then(function(res) {
                    let json = res.json;
                    expect(res.status).toEqual(data.verify.status, "verify that  status code should be " + data.verify.status);
                    json.providers.forEach(function(provider) {

                        let apiurl1 = Utility.getapiurl('PROVIDERKEY', provider.providerKey, '');
                        console.log("API " + apiurl1);
                        return frisby.get(apiurl1)
                            .then(function(providerres) {
                                let response = providerres.json;
                                expect(providerres.status).toEqual(data.verify.status, "verify that  status code should be " + data.verify.status);
                                expect(response.npi).toEqual(data.verify.free_text, "Verify that free_text value equal to " + data.verify.free_text);
                            }).done(doneFn);

                    })

                })




        });
    it(" Given language in free_text and zipcode = " + providerdata.test17.params.zipcode + " specialty = " + providerdata.test17.params.specialty +
        " freeText = " + providerdata.test17.params.free_text + "  Then validating the response with freetext value with respect to npi   " + Utility.getapiurl('PROVIDERS', '', providerdata.test17.params) + " ",
        function(doneFn) {

            let apiurl = Utility.getapiurl('PROVIDERS', '', providerdata.test17.params);
            let data = providerdata.test17;
            console.log("api url -------------" + apiurl);

            frisby.get(apiurl)
                .then(function(res) {
                    let json = res.json;
                    expect(res.status).toEqual(data.verify.status, "verify that  status code should be " + data.verify.status);
                    json.providers.forEach(function(provider) {

                        let apiurl1 = Utility.getapiurl('PROVIDERKEY', provider.providerKey, '');
                        console.log("api url-------- " + apiurl1);

                        frisby.get(apiurl1)
                            .then(function(providerres) {
                                let response = providerres.json;
                                let language = [];

                                if (response.practiceLocationLanguages.length != 0) {
                                    response.practiceLocationLanguages.forEach(function(lan) {
                                        language.push(lan);

                                    })
                                } else {
                                    expect(language).toEqual(0, "Verify that free_text value equal to 0");
                                }

                                expect(language).toContain(data.verify.free_text, "Verify that free_text value equal to " + data.verify.free_text);
                            }).done(doneFn);

                    })

                })




        });
    it(" Given officeName in free_text and zipcode = " + providerdata.test18.params.zipcode + " specialty = " + providerdata.test18.params.specialty +
        "freeText" + providerdata.test18.params.free_text + "  Then validating the response with freetext value w.r.t  fullName   " + Utility.getapiurl('PROVIDERS', '', providerdata.test18.params) + " ",
        function(doneFn) {

            let apiurl = Utility.getapiurl('PROVIDERS', '', providerdata.test18.params);
            let data = providerdata.test18;
            console.log("api url -------------" + apiurl);

            frisby.get(apiurl)
                .then(function(res) {
                    let json = res.json;
                    expect(res.status).toEqual(data.verify.status, "verify that  status code should be " + data.verify.status);

                    json.providers.forEach(function(provider) {

                        expect(provider.officeName).toContain(data.verify.free_text, "Verify that firstName is in fullName contain " + data.verify.free_text);

                    })


                })

                .done(doneFn);
        });
    it(" Given licenseNumber in free_text and zipcode = " + providerdata.test19.params.zipcode + " specialty = " + providerdata.test17.params.specialty +
        " freeText = " + providerdata.test19.params.free_text + "  Then validating the response with freetext value with respect to licenseNumber   " + Utility.getapiurl('PROVIDERS', '', providerdata.test19.params) + " ",
        function(doneFn) {

            let apiurl = Utility.getapiurl('PROVIDERS', '', providerdata.test19.params);
            let data = providerdata.test19;
            console.log("api url -------------" + apiurl);

            frisby.get(apiurl)
                .then(function(res) {
                    let json = res.json;
                    expect(res.status).toEqual(data.verify.status, "verify that  status code should be " + data.verify.status);
                    json.providers.forEach(function(provider) {

                        let apiurl1 = Utility.getapiurl('PROVIDERKEY', provider.providerKey, '');
                        console.log("api url-------- " + apiurl1);

                        frisby.get(apiurl1)
                            .then(function(providerres) {
                                let response = providerres.json;
                                expect(response.license.licenseNumber).toEqual(data.verify.free_text, "Verify that free_text value equal to " + data.verify.free_text);
                            }).done(doneFn);

                    })

                })




        });
    it(" Given providerNetwork in free_text and zipcode" + providerdata.test20.params.zipcode + " specialty" + providerdata.test20.params.specialty +
        " freeText = " + providerdata.test20.params.free_text + "  Then validating the response with freetext value with respect to providerNetworks   " + Utility.getapiurl('PROVIDERS', '', providerdata.test20.params) + " ",
        function(doneFn) {

            let apiurl = Utility.getapiurl('PROVIDERS', '', providerdata.test20.params);
            let data = providerdata.test20;
            console.log("api url -------------" + apiurl);

            frisby.get(apiurl)
                .then(function(res) {
                    let json = res.json;
                    expect(res.status).toEqual(200, "verify that  status code should be 200 ");

                    json.providers.forEach(function(provider) {
                        var networks = [];
                        provider.providerNetworks.forEach(function(network) {
                            networks.push(network.networkId);

                        })
                        expect(networks).toContain(data.verify.free_text, "Verify that newtworks contain " + data.verify.free_text);
                    })

                })

                .done(doneFn);
        });
    it(" Given facilityName in free_text and zipcode" + providerdata.test21.params.zipcode + " specialty = " + providerdata.test21.params.specialty +
        "freeText" + providerdata.test21.params.free_text + "  Then validating the response with freetext value with respect to  facilityName   " + Utility.getapiurl('PROVIDERS', '', providerdata.test21.params) + " ",
        function(doneFn) {

            let apiurl = Utility.getapiurl('PROVIDERS', '', providerdata.test21.params);
            let data = providerdata.test21;
            console.log("api url -------------" + apiurl);

            frisby.get(apiurl)
                .then(function(res) {
                    let json = res.json;
                    expect(res.status).toEqual(data.verify.status, "verify that  status code should be " + data.verify.status);

                    json.providers.forEach(function(provider) {

                        if (provider.facilityId != null) {
                            let apiurl1 = Utility.getapiurl('FACILITIES', provider.facilityId, '');
                            console.log("api url-------- " + apiurl1);
                            frisby.get(apiurl1)
                                .then(function(facilityres) {
                                    let response = facilityres.json;


                                    expect(response.name).toContain(data.verify.free_text, "Verify that free_text value equal to " + data.verify.free_text);
                                }).done(doneFn);


                        }

                    })

                })

        });



});