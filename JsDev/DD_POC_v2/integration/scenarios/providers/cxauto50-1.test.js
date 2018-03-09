var TestData = require('../../testData/' + testDataEnv + '/providers/cxauto50-1.json');

var dirSearch = new(require('../../pageObjects/providers/directory-search-page.js'));
var providerDetails = new(require('../../pageObjects/providers/provider-details-page.js'));

describe('Providers CXAUTO:50-1 for Networks Refine Search', function() {

    beforeEach(function() {
        jasmine.addMatchers(custommatcher.customMatchers);
        Utility.openApplication('');
    });

    dataProvider(TestData.Location, function(data, description) {
        var ppoCount = 0;
        var premierCount = 0;
        var deltaCareCount = 0;
        it("Providers with Refine Networks" + Utility.getapiurl('PROVIDERS', '', data.params) + " ", function(doneFn) {
            let apiurl = Utility.getapiurl('PROVIDERS', '', data.params);
            console.log("api url ------" + apiurl);
            frisby.get(apiurl)
                .then(function(res) {
                    let json = res.json;
                    json.providers.forEach(function(providers) {
                        providers.providerNetworks.forEach(function(network) {
                            if (network.networkId == '2PPO') {
                                ppoCount++
                            }
                            if (network.networkId == '2PREMIER') {
                                premierCount++
                            }
                            if (network.networkId == '2DELTACARE') {
                                deltaCareCount++
                            }
                        });
                    })
                    console.log("Total=====" + json.total);
                    console.log("ppoCount=====" + ppoCount);
                    console.log("premierCount=====" + premierCount);
                    console.log("deltaCare=====" + deltaCareCount);
                })
                .done(doneFn);
        });

        it("Providers with Refine Networks" + Utility.getapiurl('PROVIDERS', '', data.ppo) + " ", function(doneFn) {
            let apiurl = Utility.getapiurl('PROVIDERS', '', data.ppo);
            frisby.get(apiurl)
                .then(function(res) {
                    let json = res.json;
                    var RestPPOCount = json.total;
                    console.log("RestPPOCount=====" + RestPPOCount);
                    expect(Number(ppoCount)).toBe(Number(RestPPOCount));
                    dirSearch.location.setText(data.verify.zipcode + '\t');
                    dirSearch.findDentist.click();
                    dirSearch.refineSearch.click();
                    dirSearch.filterMenuItem('Specialties').click();
                    dirSearch.selectSpecialities(data.ppo.specialty);
                    dirSearch.filterMenuItem('Networks').click();
                    dirSearch.iNDeltaDentalPPO.check();
                    dirSearch.apply.click();
                    dirSearch.getProvidersCount().then(function(refineCount) {
                        expect(Number(RestPPOCount)).toBe(Number(refineCount));
                    });
                })
                .done(doneFn);

        });


        it("Providers with Refine Networks" + Utility.getapiurl('PROVIDERS', '', data.premier) + " ", function(doneFn) {
            let apiurl = Utility.getapiurl('PROVIDERS', '', data.premier);
            var status = 'Provider Network ID Should be 2PREMIER';
            var status = false;
            frisby.get(apiurl)
                .then(function(res) {
                    let json = res.json;
                    var RestPremierCount = json.total;
                    console.log("RestPremierCount=====" + RestPremierCount);
                    expect(Number(premierCount)).toBe(Number(RestPremierCount));
                    dirSearch.location.setText(data.verify.zipcode);
                    dirSearch.findDentist.click();
                    dirSearch.refineSearch.click();
                    dirSearch.filterMenuItem('Specialties').click();
                    dirSearch.selectSpecialities(data.premier.specialty);
                    dirSearch.filterMenuItem('Networks').click();
                    dirSearch.iNDeltaDentalPremier.check();
                    dirSearch.apply.click();
                    dirSearch.getProvidersCount().then(function(refineCount) {
                        expect(Number(RestPremierCount)).toBe(Number(refineCount));
                    });
                })
                .done(doneFn);
        });


        it("Providers with Refine Networks" + Utility.getapiurl('PROVIDERS', '', data.deltacare) + " ", function(doneFn) {
            let apiurl = Utility.getapiurl('PROVIDERS', '', data.deltacare);
            var status = 'Provider Network ID Should be 2DELTACARE';
            var status = false;
            frisby.get(apiurl)
                .then(function(res) {
                    let json = res.json;
                    var RestDeltaCareCount = json.total;
                    console.log("RestDeltaCareCount=====" + RestDeltaCareCount);
                    expect(Number(deltaCareCount)).toBe(Number(RestDeltaCareCount));
                    dirSearch.location.setText(data.verify.zipcode);
                    dirSearch.findDentist.click();
                    dirSearch.refineSearch.click();
                    dirSearch.filterMenuItem('Specialties').click();
                    dirSearch.selectSpecialities(data.deltacare.specialty);
                    dirSearch.filterMenuItem('Networks').click();
                    dirSearch.iNDeltaCareUSA.check();
                    dirSearch.apply.click();
                    dirSearch.getProvidersCount().then(function(refineCount) {
                        expect(Number(RestDeltaCareCount)).toBe(Number(refineCount));
                    });
                })
                .done(doneFn);
        });
    });



});

describe('Providers CXAUTO:50_1-1 for NY Networks', function() {
    dataProvider(TestData.Loc, function(data, description) {
        var pPname = data.providerFName + " " + data.providerLName;
            var Addr = data.Address + data.City + data.State;
        fit("Validate Networks Provider = "+pPname+" Loc = "+Addr+" ", function() {
            Utility.openApplication('http://aw-lx0176.deltadev.ent/find-a-dentist/alpha/directory-search.html?location=New%20York,%20NY,%20USA&distance=15&addnetwork=32BJinNY&networkui=false&facilityui=false&specialty=General%20Dentist&sourceNetwork=2nyppo&targetNetwork=2nyppo&lat=40.7127753&long=-74.0059728');
            dirSearch.location.setText(Addr);
            dirSearch.keywordSearch.setText(pPname);
            providerDetails.findIcon.click();
            expect(providerDetails.bjNetwork.getText()).toContain("NY Select");
            providerDetails.bjDeltaCare.isPresentAndDisplayed().then(function(displayed) {
                if (displayed) {
                    expect(providerDetails.bjDeltaCare.getText()).toEqual("DeltaCare USA network");
                    providerDetails.providerFacility.isPresentAndDisplayed().then(function(displayed) {
                        if (displayed) {
                            providerDetails.providerFacility.isEnabled().then(function(displayed) {
                                expect(displayed).toBe("False");
                            })
                        }
                    })
                }
            })

            if (providerDetails.providerName.getText() == pPname) {
                providerDetails.openView(pPname, 'VIEW');
                expect(providerDetails.bjNetwork.getText()).toContain("NY Select");
                providerDetails.bjDeltaCare.isPresentAndDisplayed().then(function(displayed) {
                    if (displayed) {
                        expect(providerDetails.bjDeltaCare.getText()).toEqual("DeltaCare USA network");
                        providerDetails.providerFacility.isPresentAndDisplayed().then(function(displayed) {
                            if (displayed) {
                                providerDetails.providerFacility.isEnabled().then(function(displayed) {
                                    expect(displayed).toBe("False");
                                })
                            }
                        })
                    }
                })
                if (expect(providerDetails.providerPlaceName.isPresentAndDisplayed()).toBeTruthy()) {
                    providerDetails.providerPlaceName.click();
                    expect(providerDetails.bjNetwork.getText()).toContain("NY Select");
                    providerDetails.bjDeltaCare.isPresentAndDisplayed().then(function(displayed) {
                        if (displayed) {
                            expect(providerDetails.bjDeltaCare.getText()).toEqual("DeltaCare USA network");
                            providerDetails.providerFacility.isPresentAndDisplayed().then(function(displayed) {
                                if (displayed) {
                                    providerDetails.providerFacility.isEnabled().then(function(displayed) {
                                        expect(displayed).toBe("False");
                                    })
                                }
                            })
                        }
                    })
                }
            }else{
                expect(providerDetails.providerName.getText()).toEqual(pPname);
            }
        });
    });
});
