"use strict"
var TestData = require("../../testData/providers/cxinit2-1146.json");
var dirSearch = new(require('../../pageObjects/providers/directory-search-page.js'));
var providerDetails = new(require('../../pageObjects/providers/provider-details-page.js'));

describe('CXINIT2-1146: Prov Dir', function() {
    beforeEach(function() {
        Utility.openApplication('');
    });

    dataProvider(TestData.Location, function(data, description) {
        if (data.ExecutionFlag) {
//          it('ProvDir_1: Verify the functionality of view Dentists with in 5 Miles Distance  "' + data.Loc + '"', function() {
            it('Dist_1o13:Should show fewer results on 5 Mile Dist Filter "' + data.Loc + '"', function() {
                dirSearch.location.setText(data.Loc);
                dirSearch.findDentist.click();
                dirSearch.getProvidersCount().then(function(totalCount) {
                    dirSearch.refineSearch.click();
                    expect(dirSearch.distanceSelect.isPresentAndDisplayed()).toBeTruthy();
                    dirSearch.distanceSelect.selectByText(TestData.Distance);
                    dirSearch.apply.click();
                    dirSearch.getProvidersCount().then(function(refineCount) {
                    	console.log('totalCount  & refineCount : ' +totalCount +' -> ' +refineCount );
                        expect(Number(totalCount)).toBeGreaterThan(Number(refineCount));
                    });
                });
            });
        };
    });



    dataProvider(TestData.Location, function(data, description) {
        if (data.ExecutionFlag) {
//          it('ProvDir_1: Verify the functionality of view Dentists with Network Delta Dental PPO  "' + data.Loc + '"', function() {
            it('PPOView_2o13:Should show view of PPO Net "' + data.Loc + '"', function() {
                dirSearch.location.setText(data.Loc);
                dirSearch.findDentist.click();
                dirSearch.getProvidersCount().then(function(totalCount) {
                    dirSearch.refineSearch.click();
                    dirSearch.filterMenuItem('Networks').click();
                    dirSearch.iNDeltaDentalPPO.check();
                    dirSearch.apply.click();
                    dirSearch.getProvidersCount().then(function(refineCount) {
                    	console.log('totalCount  & refineCount : ' +totalCount +' -> ' +refineCount );
                        expect(Number(totalCount)).toBeGreaterThan(Number(refineCount));
                    });
                });
            });
        };
    });

    dataProvider(TestData.Location, function(data, description) {
        if (data.ExecutionFlag) {
//          it('ProvDir_1: Verify the functionality of view Dentists with network Delta Dental premier  "' + data.Loc + '"', function() {
            it('DDPrem_3o13:Should show view of DDPremier Net "' + data.Loc + '"', function() {
                dirSearch.location.setText(data.Loc);
                dirSearch.findDentist.click();
                dirSearch.getProvidersCount().then(function(totalCount) {
                    dirSearch.refineSearch.click();
                    dirSearch.filterMenuItem('Networks').click();
                    dirSearch.iNDeltaDentalPremier.check();
                    dirSearch.apply.click();
                    dirSearch.getProvidersCount().then(function(refineCount) {
                    	console.log('totalCount  & refineCount : ' +totalCount +' -> ' +refineCount );
                        expect(Number(totalCount)).toBeGreaterThan(Number(refineCount));
                    });
                });
            });
        };
    });


    dataProvider(TestData.Location, function(data, description) {
        if (data.ExecutionFlag) {
//          it('ProvDir_1: Verify the functionality of view Dentists with network Delta Care USA "' + data.Loc + '"', function() {
            it('DelCareUsa_4o13:Should show view of DeltaCareUsa Net "' + data.Loc + '"', function() {
                dirSearch.location.setText(data.Loc);
                dirSearch.findDentist.click();
                dirSearch.getProvidersCount().then(function(totalCount) {
                    dirSearch.refineSearch.click();
                    dirSearch.filterMenuItem('Networks').click();
                    dirSearch.iNDeltaCareUSA.check();
                    dirSearch.apply.click();
                    dirSearch.getProvidersCount().then(function(refineCount) {
                    	console.log('totalCount  & refineCount : ' +totalCount +' -> ' +refineCount );
                        expect(Number(totalCount)).toBeGreaterThan(Number(refineCount));
                    });
                });
            });
        };
    });

    dataProvider(TestData.Location, function(data, description) {
        if (data.ExecutionFlag) {
//          it('ProvDir_1: Verify the functionality of view Dentists with language English "' + data.Loc + '"', function() {
          it('ProvDir_5o13:Should show Eng Speak Office "' + data.Loc + '"', function() {
                dirSearch.location.setText(data.Loc);
                dirSearch.findDentist.click();
                dirSearch.getProvidersCount().then(function(totalCount) {
                    dirSearch.refineSearch.click();
                    dirSearch.filterMenuItem('Languages').click();
                    expect(dirSearch.languageFilter.isPresentAndDisplayed()).toBeTruthy();
                    dirSearch.languageFilter.selectByText(TestData.Language1);
                    dirSearch.apply.click();
                    dirSearch.getProvidersCount().then(function(refineCount) {
                    	console.log('totalCount  & refineCount : ' +totalCount +' -> ' +refineCount );
                        expect(Number(totalCount)).toBeGreaterThan(Number(refineCount));
                        providerDetails.verifyProviderLanguage(TestData.Language1, 1)
                    });
                });
            });
        };
    });
    dataProvider(TestData.Location, function(data, description) {
        if (data.ExecutionFlag) {
//          it('ProvDir_1: Verify the functionality of view Dentists with language Spanish "' + data.Loc + '"', function() {
            it('ProvDir_6o13:Should show Spanish Speak Office  "' + data.Loc + '"', function() {
                dirSearch.location.setText(data.Loc);
                dirSearch.findDentist.click();
                dirSearch.getProvidersCount().then(function(totalCount) {
                    dirSearch.refineSearch.click();
                    dirSearch.filterMenuItem('Languages').click();
                    expect(dirSearch.languageFilter.isPresentAndDisplayed()).toBeTruthy();
                    dirSearch.languageFilter.selectByText(TestData.Language2);
                    dirSearch.apply.click();
                    dirSearch.getProvidersCount().then(function(refineCount) {
                    	console.log('totalCount  & refineCount : ' +totalCount +' -> ' +refineCount );
                        expect(Number(totalCount)).toBeGreaterThan(Number(refineCount));
                        providerDetails.verifyProviderLanguage(TestData.Language2, 1)
                    });
                });
            });
        };
    });
    dataProvider(TestData.Location, function(data, description) {
        if (data.ExecutionFlag) {
//          it('ProvDir_1: Verify the functionality of view Dentists with language Chinese "' + data.Loc + '"', function() {
            it('ProvDir_7o13:Should show Chi Speak Office  "' + data.Loc + '"', function() {
                dirSearch.location.setText(data.Loc);
                dirSearch.findDentist.click();
                dirSearch.getProvidersCount().then(function(totalCount) {
                    dirSearch.refineSearch.click();
                    dirSearch.filterMenuItem('Languages').click();
                    expect(dirSearch.languageFilter.isPresentAndDisplayed()).toBeTruthy();
                    dirSearch.languageFilter.selectByText(TestData.Language3);
                    dirSearch.apply.click();
                    dirSearch.getProvidersCount().then(function(refineCount) {
                    	console.log('totalCount  & refineCount : ' +totalCount +' -> ' +refineCount );
                        expect(Number(totalCount)).toBeGreaterThan(Number(refineCount));
                        providerDetails.verifyProviderLanguage(TestData.Language3, 1)
                    });
                });
            });
        };
    });

    dataProvider(TestData.Location, function(data, description) {
        if (data.ExecutionFlag) {
//          it('ProvDir_1: Verify the functionality of view Dentists with language Bosnian "' + data.Loc + '"', function() {
            it('ProvDir_8o13:Should show Bosnian Speak Office "' + data.Loc + '"', function() {
                dirSearch.location.setText(data.Loc);
                dirSearch.findDentist.click();
                dirSearch.getProvidersCount().then(function(totalCount) {
                    dirSearch.refineSearch.click();
                    dirSearch.filterMenuItem('Languages').click();
                    expect(dirSearch.languageFilter.isPresentAndDisplayed()).toBeTruthy();
                    dirSearch.languageFilter.selectByText(TestData.Language4);
                    dirSearch.apply.click();
                    dirSearch.getProvidersCount().then(function(refineCount) {
                    	console.log('totalCount  & refineCount : ' +totalCount +' -> ' +refineCount );
                        expect(Number(totalCount)).toBeGreaterThan(Number(refineCount));
                        providerDetails.verifyProviderLanguage(TestData.Language4, 1)
                    });
                });
            });
        };
    });

    dataProvider(TestData.Location, function(data, description) {
        if (data.ExecutionFlag) {
//          it('ProvDir_1: Verify the functionality of view Dentists with specialty General Dentist "' + data.Loc + '"', function() {
            it('ProvDir_9o13:Should show Filter Gen Dentist View "' + data.Loc + '"', function() {
                dirSearch.location.setText(data.Loc);
                dirSearch.findDentist.click();
                dirSearch.getProvidersCount().then(function(totalCount) {
                    dirSearch.refineSearch.click();
                    dirSearch.filterMenuItem('Specialties').click();
                    expect(dirSearch.generalDentist.isPresentAndDisplayed()).toBeTruthy();
                    dirSearch.generalDentist.check();
                    dirSearch.apply.click();
                    dirSearch.getProvidersCount().then(function(refineCount) {
                    	console.log('totalCount  & refineCount : ' +totalCount +' -> ' +refineCount );
                        expect(Number(totalCount)).toBeGreaterThan(Number(refineCount));
                    });
                });
            });
        };
    });

    dataProvider(TestData.Location, function(data, description) {
        if (data.ExecutionFlag) {
//          it('ProvDir_1: Verify the functionality of view Dentists with specialty Endodontist "' + data.Loc + '"', function() {
            it('ProvDir_10o13:Should show Filter Endodont View "' + data.Loc + '"', function() {
                dirSearch.location.setText(data.Loc);
                dirSearch.findDentist.click();
                dirSearch.getProvidersCount().then(function(totalCount) {
                    dirSearch.refineSearch.click();
                    dirSearch.filterMenuItem('Specialties').click();
                    expect(dirSearch.endodontist.isPresentAndDisplayed()).toBeTruthy();
                    dirSearch.endodontist.check();
                    dirSearch.apply.click();
                    dirSearch.getProvidersCount().then(function(refineCount) {
                    	console.log('totalCount  & refineCount : ' +totalCount +' -> ' +refineCount );
                        expect(Number(totalCount)).toBeGreaterThan(Number(refineCount));
                    });
                });
            });
        };
    });

    dataProvider(TestData.Location, function(data, description) {
        if (data.ExecutionFlag) {
//          it('ProvDir_1: Verify the functionality of view Dentists with specialty OralSurgeon "' + data.Loc + '"', function() {
            it('ProvDir_11o13:Should show Filter OralSurg View "' + data.Loc + '"', function() {
                dirSearch.location.setText(data.Loc);
                dirSearch.findDentist.click();
                dirSearch.getProvidersCount().then(function(totalCount) {
                    dirSearch.refineSearch.click();
                    dirSearch.filterMenuItem('Specialties').click();
                    expect(dirSearch.oralSurgeon.isPresentAndDisplayed()).toBeTruthy();
                    dirSearch.oralSurgeon.check();
                    dirSearch.apply.click();
                    dirSearch.getProvidersCount().then(function(refineCount) {
                    	console.log('totalCount  & refineCount : ' +totalCount +' -> ' +refineCount );
                        expect(Number(totalCount)).toBeGreaterThan(Number(refineCount));
                    });
                });
            });
        };
    });

    dataProvider(TestData.Location, function(data, description) {
        if (data.ExecutionFlag) {
//          it('ProvDir_1: Verify the functionality of view Dentists with specialty Pediatric Dentist "' + data.Loc + '"', function() {
            it('ProvDir_12o13:Should show Filter Pediatric View  "' + data.Loc + '"', function() {
                dirSearch.location.setText(data.Loc);
                dirSearch.findDentist.click();
                dirSearch.getProvidersCount().then(function(totalCount) {
                    dirSearch.refineSearch.click();
                    dirSearch.filterMenuItem('Specialties').click();
                    expect(dirSearch.pediatricDentist.isPresentAndDisplayed()).toBeTruthy();
                    dirSearch.pediatricDentist.check();
                    dirSearch.apply.click();
                    dirSearch.getProvidersCount().then(function(refineCount) {
                    	console.log('totalCount  & refineCount : ' +totalCount +' -> ' +refineCount );
                        expect(Number(totalCount)).toBeGreaterThan(Number(refineCount));
                    });
                });
            });
        };
    });

    dataProvider(TestData.Location, function(data, description) {
        if (data.ExecutionFlag) {
//          it('ProvDir_1: Verify the functionality of view Dentists with specialty Hygienist "' + data.Loc + '"', function() {
            it('ProvDir_13o13:Should show Filter Hygienist View "' + data.Loc + '"', function() {
                dirSearch.location.setText(data.Loc);
                dirSearch.findDentist.click();
                dirSearch.getProvidersCount().then(function(totalCount) {
                    dirSearch.refineSearch.click();
                    dirSearch.filterMenuItem('Specialties').click();
                    expect(dirSearch.hygienist.isPresentAndDisplayed()).toBeTruthy();
                    dirSearch.hygienist.check();
                    dirSearch.apply.click();
                    dirSearch.getProvidersCount().then(function(refineCount) {
                    	console.log('totalCount  & refineCount : ' +totalCount +' -> ' +refineCount );
                        expect(Number(totalCount)).toBeGreaterThan(Number(refineCount));
                    });
                });
            });
        };
    });

});
