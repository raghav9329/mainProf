var TestData = require('../../testData/' + testDataEnv + '/providers/cxauto50.json');

var dirSearch = new(require('../../pageObjects/providers/directory-search-page.js'));
var providerDetails = new(require('../../pageObjects/providers/provider-details-page.js'));

describe('Providers CXAUTO:50- ', function() {

    beforeEach(function() {
        jasmine.addMatchers(custommatcher.customMatchers);
        Utility.openApplication('');
    });

    var BackendTotal, GeneralDentistCount, EndodontistCount, OralSurgeonCount, OrthodontistCount, PediatricDentistCount, PeriodontistCount, ProsthodontistCount, PublicHealthDentistCount, FullTimeFacultyCount, HygienistCount, XRLaboratoryCount, OralPathologyCount, BackendTotal;
    dataProvider(TestData.Location, function(data, description) {

        it("Provider REST API with Zip Code" + Utility.getapiurl('PROVIDERS', '', data.params) + " ", function(doneFn) {
            //Construction of REST API URL HOST+Resource +Params
            let apiurl = Utility.getapiurl('PROVIDERS', '', data.params);
            logger.info("api url ------" + apiurl);

            //REST API call using Frisby Node Module & Verifying with Jasmine expect's
            frisby.get(apiurl)
                .then(function(res) {
                    let json = res.json;
                    expect(json.providers.length).toBeGreaterThan(1);
                    var allcount = getValueCount(json.providers, 'specialty');
                    GeneralDentistCount = allcount.GeneralDentist;
                    EndodontistCount = allcount.Endodontist;
                    OralSurgeonCount = allcount.OralSurgeon;
                    OrthodontistCount = allcount.Orthodontist;
                    PediatricDentistCount = allcount.PediatricDentist;
                    PeriodontistCount = allcount.Periodontist;
                    ProsthodontistCount = allcount.Prosthodontist;
                    PublicHealthDentistCount = allcount.PublicHealthDentist;
                    FullTimeFacultyCount = allcount.FullTimeFaculty;
                    HygienistCount = allcount.Hygienist;
                    XRLaboratoryCount = allcount.XRLaboratory;
                    OralPathologyCount = allcount.OralPathology;

                    TotalCount = allcount.TotalCount;

                    logger.info("GeneralDentistCount count=======" + GeneralDentistCount)
                    logger.info("EndodontistCount count=======" + EndodontistCount)
                    logger.info("OralSurgeonCount count=======" + OralSurgeonCount)
                    logger.info("OrthodontistCount count=======" + OrthodontistCount)
                    logger.info("PediatricDentistCount count=======" + PediatricDentistCount)
                    logger.info("PeriodontistCount count=======" + PeriodontistCount)
                    logger.info("ProsthodontistCount count=======" + ProsthodontistCount)
                    logger.info("PublicHealthDentistCount count=======" + PublicHealthDentistCount)
                    logger.info("FullTimeFacultyCount count=======" + FullTimeFacultyCount)
                    logger.info("HygienistCount count=======" + HygienistCount)
                    logger.info("XRLaboratoryCount count=======" + XRLaboratoryCount)
                    logger.info("OralPathologyCount count=======" + OralPathologyCount)
                    logger.info("Backend Total Count using REST API ===" + (GeneralDentistCount + EndodontistCount + OralSurgeonCount + OrthodontistCount + PediatricDentistCount + PeriodontistCount + ProsthodontistCount + PublicHealthDentistCount + FullTimeFacultyCount + HygienistCount + XRLaboratoryCount + OralPathologyCount));
                    BackendTotal = TotalCount;
                })
                .done(doneFn);
        });

        

        it("Verification General Dentist Count of retrived result using" + Utility.getapiurl('PROVIDERS', '', data.Sp1) + " ", function(doneFn) {
            let apiurl = Utility.getapiurl('PROVIDERS', '', data.Sp1);
            logger.info("api url ------" + apiurl);
            frisby.get(apiurl)
                .then(function(res) {
                    let json = res.json;
                    Total = json.total;
                    logger.info("Back end Verification Started")
                    expect(GeneralDentistCount).toBe(Number(Total));
                    logger.info("Front end Verification Started")
                    dirSearch.location.setText(data.verify.zipcode);
                    dirSearch.findDentist.click();
                    dirSearch.getProvidersCount().then(function(GenDentCount) {
                        expect(Total).toBe(Number(GenDentCount));
                    })
                })
                .done(doneFn);
        });

        it("Verification endodontist Count of retrived resultusing" + Utility.getapiurl('PROVIDERS', '', data.Sp2) + " ", function(doneFn) {
            let apiurl = Utility.getapiurl('PROVIDERS', '', data.Sp2);
            logger.info("api url ------" + apiurl);
            frisby.get(apiurl)
                .then(function(res) {
                    let json = res.json;
                    Total = json.total;
                    logger.info("Back end Verification Started")
                    expect(EndodontistCount).toBe(Number(Total));
                    logger.info("Front end Verification Started")
                    dirSearch.location.setText(data.verify.zipcode);
                    dirSearch.findDentist.click();
                    dirSearch.refineSearch.click();
                    dirSearch.filterMenuItem('Specialties').click();
                    dirSearch.generalDentist.unCheck();
                    expect(dirSearch.endodontist.isPresentAndDisplayed()).toBeTruthy();
                    dirSearch.endodontist.check();
                    dirSearch.apply.click();
                    dirSearch.getProvidersCount().then(function(endodontist) {
                        expect(Total).toBe(Number(endodontist));
                    })
                })
                .done(doneFn);
        });


        it("Verification oralSurgeon Count of retrived result using" + Utility.getapiurl('PROVIDERS', '', data.Sp3) + " ", function(doneFn) {
            let apiurl = Utility.getapiurl('PROVIDERS', '', data.Sp3);
            logger.info("api url ------" + apiurl);
            frisby.get(apiurl)
                .then(function(res) {
                    let json = res.json;
                    Total = json.total;
                    logger.info("Back end Verification Started")
                    expect(OralSurgeonCount).toBe(Number(Total));
                    logger.info("Front end Verification Started")
                    dirSearch.location.setText(data.verify.zipcode);
                    dirSearch.findDentist.click();
                    dirSearch.refineSearch.click();
                    dirSearch.filterMenuItem('Specialties').click();
                    dirSearch.generalDentist.unCheck();
                    expect(dirSearch.oralSurgeon.isPresentAndDisplayed()).toBeTruthy();
                    dirSearch.oralSurgeon.check();
                    dirSearch.apply.click();
                    dirSearch.getProvidersCount().then(function(oralSurgeon) {
                        expect(Total).toBe(Number(oralSurgeon));
                    })
                })
                .done(doneFn);
        });

        it("Verification orthodontist Count of retrived result using" + Utility.getapiurl('PROVIDERS', '', data.Sp4) + " ", function(doneFn) {
            let apiurl = Utility.getapiurl('PROVIDERS', '', data.Sp4);
            logger.info("api url ------" + apiurl);
            frisby.get(apiurl)
                .then(function(res) {
                    let json = res.json;
                    Total = json.total;
                    logger.info("Back end Verification Started")
                    expect(OrthodontistCount).toBe(Number(Total));
                    logger.info("Front end Verification Started")
                    dirSearch.location.setText(data.verify.zipcode);
                    dirSearch.findDentist.click();
                    dirSearch.refineSearch.click();
                    dirSearch.filterMenuItem('Specialties').click();
                    dirSearch.generalDentist.unCheck();
                    expect(dirSearch.orthodontist.isPresentAndDisplayed()).toBeTruthy();
                    dirSearch.orthodontist.check();
                    dirSearch.apply.click();
                    dirSearch.getProvidersCount().then(function(orthodontist) {
                        expect(Total).toBe(Number(orthodontist));
                    })
                })
                .done(doneFn);
        });

        it("Verification pediatricDentist Count of retrived result using" + Utility.getapiurl('PROVIDERS', '', data.Sp5) + " ", function(doneFn) {
            let apiurl = Utility.getapiurl('PROVIDERS', '', data.Sp5);
            logger.info("api url ------" + apiurl);
            frisby.get(apiurl)
                .then(function(res) {
                    let json = res.json;
                    Total = json.total;
                    logger.info("Back end Verification Started")
                    expect(PediatricDentistCount).toBe(Number(Total));
                    logger.info("Front end Verification Started")
                    dirSearch.location.setText(data.verify.zipcode);
                    dirSearch.findDentist.click();
                    dirSearch.refineSearch.click();
                    dirSearch.filterMenuItem('Specialties').click();
                    dirSearch.generalDentist.unCheck();
                    expect(dirSearch.pediatricDentist.isPresentAndDisplayed()).toBeTruthy();
                    dirSearch.pediatricDentist.check();
                    dirSearch.apply.click();
                    dirSearch.getProvidersCount().then(function(pediatricDentist) {
                        expect(Total).toBe(Number(pediatricDentist));
                    })
                })
                .done(doneFn);
        });

        it("Verification periodontist Count of retrived result using" + Utility.getapiurl('PROVIDERS', '', data.Sp6) + " ", function(doneFn) {
            let apiurl = Utility.getapiurl('PROVIDERS', '', data.Sp6);
            logger.info("api url ------" + apiurl);
            frisby.get(apiurl)
                .then(function(res) {
                    let json = res.json;
                    Total = json.total;
                    logger.info("Back end Verification Started")
                    expect(PeriodontistCount).toBe(Number(Total));
                    logger.info("Front end Verification Started")
                    dirSearch.location.setText(data.verify.zipcode);
                    dirSearch.findDentist.click();
                    dirSearch.refineSearch.click();
                    dirSearch.filterMenuItem('Specialties').click();
                    dirSearch.generalDentist.unCheck();
                    expect(dirSearch.periodontist.isPresentAndDisplayed()).toBeTruthy();
                    dirSearch.periodontist.check();
                    dirSearch.apply.click();
                    dirSearch.getProvidersCount().then(function(periodontist) {
                        expect(Total).toBe(Number(periodontist));
                    })
                })
                .done(doneFn);
        });


        it("Verification prosthodontist Count of retrived result using" + Utility.getapiurl('PROVIDERS', '', data.Sp7) + " ", function(doneFn) {
            let apiurl = Utility.getapiurl('PROVIDERS', '', data.Sp7);
            logger.info("api url ------" + apiurl);
            frisby.get(apiurl)
                .then(function(res) {
                    let json = res.json;
                    Total = json.total;
                    logger.info("Back end Verification Started")
                    expect(ProsthodontistCount).toBe(Number(Total));
                    logger.info("Front end Verification Started")
                    dirSearch.location.setText(data.verify.zipcode);
                    dirSearch.findDentist.click();
                    dirSearch.refineSearch.click();
                    dirSearch.filterMenuItem('Specialties').click();
                    dirSearch.generalDentist.unCheck();
                    expect(dirSearch.prosthodontist.isPresentAndDisplayed()).toBeTruthy();
                    dirSearch.prosthodontist.check();
                    dirSearch.apply.click();
                    dirSearch.getProvidersCount().then(function(prosthodontist) {
                        expect(Total).toBe(Number(prosthodontist));
                    })
                })
                .done(doneFn);
        });

        it("Verification publicHealthDentist Count of retrived result using" + Utility.getapiurl('PROVIDERS', '', data.Sp8) + " ", function(doneFn) {
            let apiurl = Utility.getapiurl('PROVIDERS', '', data.Sp8);
            logger.info("api url ------" + apiurl);
            frisby.get(apiurl)
                .then(function(res) {
                    let json = res.json;
                    Total = json.total;
                    logger.info("Back end Verification Started")
                    expect(PublicHealthDentistCount).toBe(Number(Total));
                    logger.info("Front end Verification Started")
                    dirSearch.location.setText(data.verify.zipcode);
                    dirSearch.findDentist.click();
                    dirSearch.refineSearch.click();
                    dirSearch.filterMenuItem('Specialties').click();
                    dirSearch.generalDentist.unCheck();
                    expect(dirSearch.publicHealthDentist.isPresentAndDisplayed()).toBeTruthy();
                    dirSearch.publicHealthDentist.check();
                    dirSearch.apply.click();
                    dirSearch.getProvidersCount().then(function(publicHealthDentist) {
                        expect(Total).toBe(Number(publicHealthDentist));
                    })
                })
                .done(doneFn);
        });

        it("Verification fullTimeFaculty Count of retrived result using" + Utility.getapiurl('PROVIDERS', '', data.Sp9) + " ", function(doneFn) {
            let apiurl = Utility.getapiurl('PROVIDERS', '', data.Sp9);
            logger.info("api url ------" + apiurl);
            frisby.get(apiurl)
                .then(function(res) {
                    let json = res.json;
                    Total = json.total;
                    logger.info("Back end Verification Started")
                    expect(FullTimeFacultyCount).toBe(Number(Total));
                    logger.info("Front end Verification Started")
                    dirSearch.location.setText(data.verify.zipcode);
                    dirSearch.findDentist.click();
                    dirSearch.refineSearch.click();
                    dirSearch.filterMenuItem('Specialties').click();
                    dirSearch.generalDentist.unCheck();
                    expect(dirSearch.fullTimeFaculty.isPresentAndDisplayed()).toBeTruthy();
                    dirSearch.fullTimeFaculty.check();
                    dirSearch.apply.click();
                    dirSearch.getProvidersCount().then(function(fullTimeFaculty) {
                        expect(Total).toBe(Number(fullTimeFaculty));
                    })
                })
                .done(doneFn);
        });

        it("Verification hygienist Count of retrived result using" + Utility.getapiurl('PROVIDERS', '', data.Sp10) + " ", function(doneFn) {
            let apiurl = Utility.getapiurl('PROVIDERS', '', data.Sp10);
            logger.info("api url ------" + apiurl);
            frisby.get(apiurl)
                .then(function(res) {
                    let json = res.json;
                    Total = json.total;
                    logger.info("Back end Verification Started")
                    expect(HygienistCount).toBe(Number(Total));
                    logger.info("Front end Verification Started")
                    dirSearch.location.setText(data.verify.zipcode);
                    dirSearch.findDentist.click();
                    dirSearch.refineSearch.click();
                    dirSearch.filterMenuItem('Specialties').click();
                    dirSearch.generalDentist.unCheck();
                    expect(dirSearch.hygienist.isPresentAndDisplayed()).toBeTruthy();
                    dirSearch.hygienist.check();
                    dirSearch.apply.click();
                    dirSearch.getProvidersCount().then(function(hygienist) {
                        expect(Total).toBe(Number(hygienist));
                    })
                })
                .done(doneFn);
        });


        it("Verification XRLaboratory Count of retrived result using" + Utility.getapiurl('PROVIDERS', '', data.Sp11) + " ", function(doneFn) {
            let apiurl = Utility.getapiurl('PROVIDERS', '', data.Sp11);
            logger.info("api url ------" + apiurl);
            frisby.get(apiurl)
                .then(function(res) {
                    let json = res.json;
                    Total = json.total;
                    logger.info("Back end Verification Started")
                    expect(XRLaboratoryCount).toBe(Number(Total));
                    logger.info("Front end Verification Started")
                    dirSearch.location.setText(data.verify.zipcode);
                    dirSearch.findDentist.click();
                    dirSearch.refineSearch.click();
                    dirSearch.filterMenuItem('Specialties').click();
                    dirSearch.generalDentist.unCheck();
                    expect(dirSearch.XRLaboratory.isPresentAndDisplayed()).toBeTruthy();
                    dirSearch.XRLaboratory.check();
                    dirSearch.apply.click();
                    dirSearch.getProvidersCount().then(function(XRLaboratory) {
                        expect(Total).toBe(Number(XRLaboratory));
                    })
                })
                .done(doneFn);
        });

        it("Verification oralPathology Count of retrived result using" + Utility.getapiurl('PROVIDERS', '', data.Sp12) + " ", function(doneFn) {
            let apiurl = Utility.getapiurl('PROVIDERS', '', data.Sp12);
            logger.info("api url ------" + apiurl);
            frisby.get(apiurl)
                .then(function(res) {
                    let json = res.json;
                    Total = json.total;
                    logger.info("Back end Verification Started")
                    expect(OralPathologyCount).toBe(Number(Total));
                    logger.info("Front end Verification Started")
                    dirSearch.location.setText(data.verify.zipcode);
                    dirSearch.findDentist.click();
                    dirSearch.refineSearch.click();
                    dirSearch.filterMenuItem('Specialties').click();
                    dirSearch.generalDentist.unCheck();
                    expect(dirSearch.oralPathology.isPresentAndDisplayed()).toBeTruthy();
                    dirSearch.oralPathology.check();
                    dirSearch.apply.click();
                    dirSearch.getProvidersCount().then(function(oralPathology) {
                        expect(Total).toBe(Number(oralPathology));
                    })

                })
                .done(doneFn);
        });

    });

    function getValueCount(data, key) {
        var gCount = 0;
        var enCount = 0;
        var oCount = 0;
        var orthCount = 0;
        var pediCount = 0;
        var perioCount = 0;
        var prostCount = 0;
        var phdCount = 0;
        var fftCount = 0;
        var hygCount = 0;
        var xrCount = 0;
        var opCount = 0;
        var providerKey = 0;
        data.forEach(function(bb) {
            providerKey++;
            var specaiality = bb.specialty;
            if (specaiality.toUpperCase() == "GENERAL DENTIST") {
                gCount++
            }
            if (specaiality.toUpperCase() == "ENDODONTIST") {
                enCount++
            }
            if (specaiality.toUpperCase() == "ORAL SURGEON") {
                oCount++;
            }
            if (specaiality.toUpperCase() == "ORTHODONTIST") {
                orthCount++
            }
            if (specaiality.toUpperCase() == "PEDIATRIC DENTIST") {
                pediCount++
            }
            if (specaiality.toUpperCase() == "PERIODONTIST") {
                perioCount++
            }
            if (specaiality.toUpperCase() == "PROSTHODONTIST") {
                prostCount++
            }
            if (specaiality.toUpperCase() == "PUBLIC HEALTH DENTIST") {
                phdCount++
            }
            if (bb.specialty.toUpperCase() == "FULL TIME FACULTY") {
                fftCount++
            }
            if (specaiality.toUpperCase() == "HYGIENIST") {
                hygCount++
            }
            if (specaiality.toUpperCase() == "XR-LABORATORY") {
                xrCount++
            }
            if (specaiality.toUpperCase() == "ORAL PATHOLOGY") {
                opCount++
            }

        });
        return {
            GeneralDentist: Number(gCount),
            Endodontist: Number(enCount),
            OralSurgeon: Number(oCount),
            Orthodontist: Number(orthCount),
            PediatricDentist: Number(pediCount),
            Periodontist: Number(perioCount),
            Prosthodontist: Number(prostCount),
            PublicHealthDentist: Number(phdCount),
            FullTimeFaculty: Number(fftCount),
            Hygienist: Number(hygCount),
            XRLaboratory: Number(xrCount),
            OralPathology: Number(opCount),
            TotalCount: Number(providerKey)
        }

    }
});
