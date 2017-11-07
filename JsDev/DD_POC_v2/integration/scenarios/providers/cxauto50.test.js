var TestData = require('../../testData/' + testDataEnv + '/providers/cxauto50.json');

var dirSearch = new(require('../../pageObjects/providers/directory-search-page.js'));
var providerDetails = new(require('../../pageObjects/providers/provider-details-page.js'));

describe('Providers CXAUTO:50- ', function() {

    beforeEach(function() {
        Utility.openApplication('');
    });

    var restapi, GeneralDentistCount, EndodontistCount, OralSurgeonCount, OrthodontistCount, PediatricDentistCount, PeriodontistCount, ProsthodontistCount, PublicHealthDentistCount, FullTimeFacultyCount, HygienistCount, XRLaboratoryCount, OralPathologyCount, BackendTotal;
    dataProvider(TestData.Location, function(data, description) {

        it("Provider REST API with Zip Code" + Utility.getapiurl('PROVIDERS', '', data.params) + " ", function(doneFn) {
            //Construction of REST API URL HOST+Resource +Params
            let apiurl = Utility.getapiurl('PROVIDERS', '', data.params);
            logger.info("api url ------" + apiurl);
            restapi = apiurl;
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
                    BackendTotal = (GeneralDentistCount + EndodontistCount + OralSurgeonCount + OrthodontistCount + PediatricDentistCount + PeriodontistCount + ProsthodontistCount + PublicHealthDentistCount + FullTimeFacultyCount + HygienistCount + XRLaboratoryCount + OralPathologyCount);
                })
                .done(doneFn);
        });

        it("Verification Total Count of retrived result using" + Utility.getapiurl('PROVIDERS', '', data.params) + " ", function() {
            dirSearch.location.setText(data.verify.zipcode);
            dirSearch.findDentist.click();
            dirSearch.getProvidersCount().then(function(totalCount) {
                logger.info("Front End using Application Total Count==" + totalCount);
                var FrontendTotal = Number(totalCount);
                expect(BackendTotal).toBe(FrontendTotal);
            })
        });

        it("Verification General Dentist Count of retrived result using" + Utility.getapiurl('PROVIDERS', '', data.params) + " ", function() {
            dirSearch.location.setText(data.verify.zipcode);
            dirSearch.findDentist.click();
            dirSearch.refineSearch.click();
            dirSearch.filterMenuItem('Specialties').click();
            expect(dirSearch.generalDentist.isPresentAndDisplayed()).toBeTruthy();
            dirSearch.generalDentist.check();
            dirSearch.apply.click();
            dirSearch.getProvidersCount().then(function(GenDentCount) {
                expect(GeneralDentistCount).toBe(Number(GenDentCount));
            })
        });

        it("Verification endodontist Count of retrived resultusing" + Utility.getapiurl('PROVIDERS', '', data.params) + " ", function() {
            dirSearch.location.setText(data.verify.zipcode);
            dirSearch.findDentist.click();
            dirSearch.refineSearch.click();
            dirSearch.filterMenuItem('Specialties').click();
            expect(dirSearch.endodontist.isPresentAndDisplayed()).toBeTruthy();
            dirSearch.endodontist.check();
            dirSearch.apply.click();
            dirSearch.getProvidersCount().then(function(endodontist) {
                expect(EndodontistCount).toBe(Number(endodontist));
            })
        });


        it("Verification oralSurgeon Count of retrived result using" + Utility.getapiurl('PROVIDERS', '', data.params) + " ", function() {
            dirSearch.location.setText(data.verify.zipcode);
            dirSearch.findDentist.click();
            dirSearch.refineSearch.click();
            dirSearch.filterMenuItem('Specialties').click();
            expect(dirSearch.oralSurgeon.isPresentAndDisplayed()).toBeTruthy();
            dirSearch.oralSurgeon.check();
            dirSearch.apply.click();
            dirSearch.getProvidersCount().then(function(oralSurgeon) {
                expect(OralSurgeonCount).toBe(Number(oralSurgeon));
            })
        });

        it("Verification orthodontist Count of retrived result using" + Utility.getapiurl('PROVIDERS', '', data.params) + " ", function() {
            dirSearch.location.setText(data.verify.zipcode);
            dirSearch.findDentist.click();
            dirSearch.refineSearch.click();
            dirSearch.filterMenuItem('Specialties').click();
            expect(dirSearch.orthodontist.isPresentAndDisplayed()).toBeTruthy();
            dirSearch.orthodontist.check();
            dirSearch.apply.click();
            dirSearch.getProvidersCount().then(function(orthodontist) {
                expect(OrthodontistCount).toBe(Number(orthodontist));
            })
        });

        it("Verification pediatricDentist Count of retrived result using" + Utility.getapiurl('PROVIDERS', '', data.params) + " ", function() {
            dirSearch.location.setText(data.verify.zipcode);
            dirSearch.findDentist.click();
            dirSearch.refineSearch.click();
            dirSearch.filterMenuItem('Specialties').click();
            expect(dirSearch.pediatricDentist.isPresentAndDisplayed()).toBeTruthy();
            dirSearch.pediatricDentist.check();
            dirSearch.apply.click();
            dirSearch.getProvidersCount().then(function(pediatricDentist) {
                expect(PediatricDentistCount).toBe(Number(pediatricDentist));
            })
        });

        it("Verification periodontist Count of retrived result using" + Utility.getapiurl('PROVIDERS', '', data.params) + " ", function() {
            dirSearch.location.setText(data.verify.zipcode);
            dirSearch.findDentist.click();
            dirSearch.refineSearch.click();
            dirSearch.filterMenuItem('Specialties').click();
            expect(dirSearch.periodontist.isPresentAndDisplayed()).toBeTruthy();
            dirSearch.periodontist.check();
            dirSearch.apply.click();
            dirSearch.getProvidersCount().then(function(periodontist) {
                expect(PeriodontistCount).toBe(Number(periodontist));
            })
        });


        it("Verification prosthodontist Count of retrived result using" + Utility.getapiurl('PROVIDERS', '', data.params) + " ", function() {
            dirSearch.location.setText(data.verify.zipcode);
            dirSearch.findDentist.click();
            dirSearch.refineSearch.click();
            dirSearch.filterMenuItem('Specialties').click();
            expect(dirSearch.prosthodontist.isPresentAndDisplayed()).toBeTruthy();
            dirSearch.prosthodontist.check();
            dirSearch.apply.click();
            dirSearch.getProvidersCount().then(function(prosthodontist) {
                expect(ProsthodontistCount).toBe(Number(prosthodontist));
            })
        });

        it("Verification publicHealthDentist Count of retrived result using" + Utility.getapiurl('PROVIDERS', '', data.params) + " ", function() {
            dirSearch.location.setText(data.verify.zipcode);
            dirSearch.findDentist.click();
            dirSearch.refineSearch.click();
            dirSearch.filterMenuItem('Specialties').click();
            expect(dirSearch.publicHealthDentist.isPresentAndDisplayed()).toBeTruthy();
            dirSearch.publicHealthDentist.check();
            dirSearch.apply.click();
            dirSearch.getProvidersCount().then(function(publicHealthDentist) {
                logger.info("Restapi===" + restapi);
                expect(PublicHealthDentistCount).toBe(Number(publicHealthDentist));
            })
        });

        it("Verification fullTimeFaculty Count of retrived result using" + Utility.getapiurl('PROVIDERS', '', data.params) + " ", function() {
            dirSearch.location.setText(data.verify.zipcode);
            dirSearch.findDentist.click();
            dirSearch.refineSearch.click();
            dirSearch.filterMenuItem('Specialties').click();
            expect(dirSearch.fullTimeFaculty.isPresentAndDisplayed()).toBeTruthy();
            dirSearch.fullTimeFaculty.check();
            dirSearch.apply.click();
            dirSearch.getProvidersCount().then(function(fullTimeFaculty) {
                expect(FullTimeFacultyCount).toBe(Number(fullTimeFaculty));
            })
        });

        it("Verification hygienist Count of retrived result using" + Utility.getapiurl('PROVIDERS', '', data.params) + " ", function() {
            dirSearch.location.setText(data.verify.zipcode);
            dirSearch.findDentist.click();
            dirSearch.refineSearch.click();
            dirSearch.filterMenuItem('Specialties').click();
            expect(dirSearch.hygienist.isPresentAndDisplayed()).toBeTruthy();
            dirSearch.hygienist.check();
            dirSearch.apply.click();
            dirSearch.getProvidersCount().then(function(hygienist) {
                expect(HygienistCount).toBe(Number(hygienist));
            })
        });


        it("Verification XRLaboratory Count of retrived result using" + Utility.getapiurl('PROVIDERS', '', data.params) + " ", function() {
            dirSearch.location.setText(data.verify.zipcode);
            dirSearch.findDentist.click();
            dirSearch.refineSearch.click();
            dirSearch.filterMenuItem('Specialties').click();
            expect(dirSearch.XRLaboratory.isPresentAndDisplayed()).toBeTruthy();
            dirSearch.XRLaboratory.check();
            dirSearch.apply.click();
            dirSearch.getProvidersCount().then(function(XRLaboratory) {
                expect(XRLaboratoryCount).toBe(Number(XRLaboratory));
            })
        });

        it("Verification oralPathology Count of retrived result using" + Utility.getapiurl('PROVIDERS', '', data.params) + " ", function() {
            dirSearch.location.setText(data.verify.zipcode);
            dirSearch.findDentist.click();
            dirSearch.refineSearch.click();
            dirSearch.filterMenuItem('Specialties').click();
            expect(dirSearch.oralPathology.isPresentAndDisplayed()).toBeTruthy();
            dirSearch.oralPathology.check();
            dirSearch.apply.click();
            dirSearch.getProvidersCount().then(function(oralPathology) {
                expect(OralPathologyCount).toBe(Number(oralPathology));
            })
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
        data.forEach(function(bb) {
           var specaiality = bb.specialty;
            if (specaiality.toUpperCase()=="GENERAL DENTIST") {
                gCount++
            }
            if (specaiality.toUpperCase()=="ENDODONTIST") {
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
        }

    }
});
