"use strict"
var TestData = require('../../testData/'+testDataEnv+'/providers/cxinit2-1145.json');
var dirSearch = new(require('../../pageObjects/providers/directory-search-page.js'));
var providerDetails = new(require('../../pageObjects/providers/provider-details-page.js'));

describe('CXINIT2-1145:: Provider Search Validation', function() {
    beforeEach(function() {
        jasmine.addMatchers(custommatcher.customMatchers);
        Utility.openApplication('');
    });

    dataProvider(TestData.Location_ZipCode, function(data, description) {
        if (data.ExecutionFlag) {
            it('ProvDir_1: Verify the functionality of view Dentists with in 5 Miles Distance  "' + data.ZIPCode + '"', function() {
                dirSearch.location.setText(data.ZIPCode);
                dirSearch.findDentist.click();
                dirSearch.getProvidersCount().then(function(totalCount) {
                    dirSearch.refineSearch.click();
                    expect(dirSearch.distanceSelect.isPresentAndDisplayed()).toBeTruthy();
                    dirSearch.distanceSelect.selectByText(TestData.Distance);
                    dirSearch.apply.click();
                    dirSearch.getProvidersCount().then(function(refineCount) {
                        expect(Number(totalCount)).toBeGreaterThan(Number(refineCount));
                    });
                });
            });
        };
    });


    dataProvider(TestData.Location_City, function(data, description) {
        if (data.ExecutionFlag) {
            it('ProvDir_1: Verify the functionality of view Dentists with in 5 Miles Distance "' + data.City + '"', function() {
                dirSearch.location.setText(data.City);
                dirSearch.findDentist.click();
                dirSearch.getProvidersCount().then(function(totalCount) {
                    dirSearch.refineSearch.click();
                    expect(dirSearch.distanceSelect.isPresentAndDisplayed()).toBeTruthy();
                    dirSearch.distanceSelect.selectByText(TestData.Distance);
                    dirSearch.apply.click();
                    dirSearch.getProvidersCount().then(function(refineCount) {
                        expect(Number(totalCount)).toBeGreaterThan(Number(refineCount));
                    });
                });
            });
        };
    });


    dataProvider(TestData.Location_ZipCode, function(data, description) {
        if (data.ExecutionFlag) {
            it('ProvDir_1: Verify the functionality of view Dentists with Network Delta Dental PPO  "' + data.ZIPCode + '"', function() {
                dirSearch.location.setText(data.ZIPCode);
                dirSearch.findDentist.click();
                dirSearch.getProvidersCount().then(function(totalCount) {
                    dirSearch.refineSearch.click();
                    dirSearch.filterMenuItem('Networks').click();
                    dirSearch.iNDeltaDentalPPO.check();
                    dirSearch.apply.click();
                    dirSearch.getProvidersCount().then(function(refineCount) {
                        expect(Number(totalCount)).toBeGreaterThan(Number(refineCount));
                    });
                });
            });
        };
    });

    dataProvider(TestData.Location_ZipCode, function(data, description) {
        if (data.ExecutionFlag) {
            it('ProvDir_1: Verify the functionality of view Dentists with network Delta Dental premier  "' + data.ZIPCode + '"', function() {
                dirSearch.location.setText(data.ZIPCode);
                dirSearch.findDentist.click();
                dirSearch.getProvidersCount().then(function(totalCount) {
                    dirSearch.refineSearch.click();
                    dirSearch.filterMenuItem('Networks').click();
                    dirSearch.iNDeltaDentalPremier.check();
                    dirSearch.apply.click();
                    dirSearch.getProvidersCount().then(function(refineCount) {
                        expect(Number(totalCount)).toBeGreaterThan(Number(refineCount));
                    });
                });
            });
        };
    });


    dataProvider(TestData.Location_ZipCode, function(data, description) {
        if (data.ExecutionFlag) {
            it('ProvDir_1: Verify the functionality of view Dentists with network Delta Care USA "' + data.ZIPCode + '"', function() {
                dirSearch.location.setText(data.ZIPCode);
                dirSearch.findDentist.click();
                dirSearch.getProvidersCount().then(function(totalCount) {
                    dirSearch.refineSearch.click();
                    dirSearch.filterMenuItem('Networks').click();
                    dirSearch.iNDeltaCareUSA.check();
                    dirSearch.apply.click();
                    dirSearch.getProvidersCount().then(function(refineCount) {
                        expect(Number(totalCount)).toBeGreaterThan(Number(refineCount));
                    });
                });
            });
        };
    });

    dataProvider(TestData.Location_ZipCode, function(data, description) {
        if (data.ExecutionFlag) {
            it('ProvDir_1: Verify the functionality of view Dentists with language English "' + data.ZIPCode + '"', function() {
                dirSearch.location.setText(data.ZIPCode);
                dirSearch.findDentist.click();
                dirSearch.getProvidersCount().then(function(totalCount) {
                    dirSearch.refineSearch.click();
                    dirSearch.filterMenuItem('Languages').click();
                    expect(dirSearch.languageFilter.isPresentAndDisplayed()).toBeTruthy();
                    dirSearch.languageFilter.selectByText(TestData.Language1);
                    dirSearch.apply.click();
                    dirSearch.getProvidersCount().then(function(refineCount) {
                        expect(Number(totalCount)).toBeGreaterThan(Number(refineCount));
                        providerDetails.verifyProviderLanguage(TestData.Language1,1)
                    });
                });
            });
        };
    });
    dataProvider(TestData.Location_ZipCode, function(data, description) {
        if (data.ExecutionFlag) {
            it('ProvDir_1: Verify the functionality of view Dentists with language Spanish "' + data.ZIPCode + '"', function() {
                dirSearch.location.setText(data.ZIPCode);
                dirSearch.findDentist.click();
                dirSearch.getProvidersCount().then(function(totalCount) {
                    dirSearch.refineSearch.click();
                    dirSearch.filterMenuItem('Languages').click();
                    expect(dirSearch.languageFilter.isPresentAndDisplayed()).toBeTruthy();
                    dirSearch.languageFilter.selectByText(TestData.Language2);
                    dirSearch.apply.click();
                    dirSearch.getProvidersCount().then(function(refineCount) {
                        expect(Number(totalCount)).toBeGreaterThan(Number(refineCount));
                        providerDetails.verifyProviderLanguage(TestData.Language2,1)
                    });
                });
            });
        };
    });
    dataProvider(TestData.Location_ZipCode, function(data, description) {
        if (data.ExecutionFlag) {
            it('ProvDir_1: Verify the functionality of view Dentists with language Chinese "' + data.ZIPCode + '"', function() {
                dirSearch.location.setText(data.ZIPCode);
                dirSearch.findDentist.click();
                dirSearch.getProvidersCount().then(function(totalCount) {
                    dirSearch.refineSearch.click();
                    dirSearch.filterMenuItem('Languages').click();
                    expect(dirSearch.languageFilter.isPresentAndDisplayed()).toBeTruthy();
                    dirSearch.languageFilter.selectByText(TestData.Language3);
                    dirSearch.apply.click();
                    dirSearch.getProvidersCount().then(function(refineCount) {
                        expect(Number(totalCount)).toBeGreaterThan(Number(refineCount));
                        providerDetails.verifyProviderLanguage(TestData.Language3,1)
                    });
                });
            });
        };
    });

    dataProvider(TestData.Location_ZipCode, function(data, description) {
        if (data.ExecutionFlag) {
            it('ProvDir_1: Verify the functionality of view Dentists with language Bosnian "' + data.ZIPCode + '"', function() {
                dirSearch.location.setText(data.ZIPCode);
                dirSearch.findDentist.click();
                dirSearch.getProvidersCount().then(function(totalCount) {
                    dirSearch.refineSearch.click();
                    dirSearch.filterMenuItem('Languages').click();
                    expect(dirSearch.languageFilter.isPresentAndDisplayed()).toBeTruthy();
                    dirSearch.languageFilter.selectByText(TestData.Language4);
                    dirSearch.apply.click();
                    dirSearch.getProvidersCount().then(function(refineCount) {
                        expect(Number(totalCount)).toBeGreaterThan(Number(refineCount));
                        providerDetails.verifyProviderLanguage(TestData.Language4,1)
                    });
                });
            });
        };
    });

    dataProvider(TestData.Location_ZipCode, function(data, description) {
        if (data.ExecutionFlag) {
            it('ProvDir_1: Verify the functionality of view Dentists with specialty General Dentist "' + data.ZIPCode + '"', function() {
                dirSearch.location.setText(data.ZIPCode);
                dirSearch.findDentist.click();
                dirSearch.getProvidersCount().then(function(totalCount) {
                    dirSearch.refineSearch.click();
                    dirSearch.filterMenuItem('Specialties').click();
                    expect(dirSearch.generalDentist.isPresentAndDisplayed()).toBeTruthy();
                    dirSearch.generalDentist.check();
                    dirSearch.apply.click();
                    dirSearch.getProvidersCount().then(function(refineCount) {
                        expect(Number(totalCount)).toBeGreaterThan(Number(refineCount));
                    });
                });
            });
        };
    });

    dataProvider(TestData.Location_ZipCode, function(data, description) {
        if (data.ExecutionFlag) {
            it('ProvDir_1: Verify the functionality of view Dentists with specialty Endodontist "' + data.ZIPCode + '"', function() {
                dirSearch.location.setText(data.ZIPCode);
                dirSearch.findDentist.click();
                dirSearch.getProvidersCount().then(function(totalCount) {
                    dirSearch.refineSearch.click();
                    dirSearch.filterMenuItem('Specialties').click();
                    expect(dirSearch.endodontist.isPresentAndDisplayed()).toBeTruthy();
                    dirSearch.endodontist.check();
                    dirSearch.apply.click();
                    dirSearch.getProvidersCount().then(function(refineCount) {
                        expect(Number(totalCount)).toBeGreaterThan(Number(refineCount));
                    });
                });
            });
        };
    });

    dataProvider(TestData.Location_ZipCode, function(data, description) {
        if (data.ExecutionFlag) {
            it('ProvDir_1: Verify the functionality of view Dentists with specialty OralSurgeon "' + data.ZIPCode + '"', function() {
                dirSearch.location.setText(data.ZIPCode);
                dirSearch.findDentist.click();
                dirSearch.getProvidersCount().then(function(totalCount) {
                    dirSearch.refineSearch.click();
                    dirSearch.filterMenuItem('Specialties').click();
                    expect(dirSearch.oralSurgeon.isPresentAndDisplayed()).toBeTruthy();
                    dirSearch.oralSurgeon.check();
                    dirSearch.apply.click();
                    dirSearch.getProvidersCount().then(function(refineCount) {
                        expect(Number(totalCount)).toBeGreaterThan(Number(refineCount));
                    });
                });
            });
        };
    });

    dataProvider(TestData.Location_ZipCode, function(data, description) {
        if (data.ExecutionFlag) {
            it('ProvDir_1: Verify the functionality of view Dentists with specialty Pediatric Dentist "' + data.ZIPCode + '"', function() {
                dirSearch.location.setText(data.ZIPCode);
                dirSearch.findDentist.click();
                dirSearch.getProvidersCount().then(function(totalCount) {
                    dirSearch.refineSearch.click();
                    dirSearch.filterMenuItem('Specialties').click();
                    expect(dirSearch.pediatricDentist.isPresentAndDisplayed()).toBeTruthy();
                    dirSearch.pediatricDentist.check();
                    dirSearch.apply.click();
                    dirSearch.getProvidersCount().then(function(refineCount) {
                        expect(Number(totalCount)).toBeGreaterThan(Number(refineCount));
                    });
                });
            });
        };
    });

    dataProvider(TestData.Location_ZipCode, function(data, description) {
        if (data.ExecutionFlag) {
            it('ProvDir_1: Verify the functionality of view Dentists with specialty Hygienist "' + data.ZIPCode + '"', function() {
                dirSearch.location.setText(data.ZIPCode);
                dirSearch.findDentist.click();
                dirSearch.getProvidersCount().then(function(totalCount) {
                    dirSearch.refineSearch.click();
                    dirSearch.filterMenuItem('Specialties').click();
                    expect(dirSearch.hygienist.isPresentAndDisplayed()).toBeTruthy();
                    dirSearch.hygienist.check();
                    dirSearch.apply.click();
                    dirSearch.getProvidersCount().then(function(refineCount) {
                        expect(Number(totalCount)).toBeGreaterThan(Number(refineCount));
                    });
                });
            });
        };
    });

});
