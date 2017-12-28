"use strict"
var TestData = require('../../testData/' + testDataEnv + '/providers/cxinit2-1146.json');
var dirSearch = new(require('../../pageObjects/providers/directory-search-page.js'));
var providerDetails = new(require('../../pageObjects/providers/provider-details-page.js'));
var feedback = new(require('../../pageObjects/providers/feedback-page.js'));
var perInfo = new(require('../../pageObjects/cxinit/perInfo-page.js'));

describe('CXINIT2-1146: Prov Dir', function() {
    beforeEach(function() {
        jasmine.addMatchers(custommatcher.customMatchers);
        Utility.openApplication('');
    });

    dataProvider(TestData.Location, function(data, description) {
        if (data.ExecutionFlag) {
            it('Dist_1o13:Should reduce result count on Dist Filters "' + data.Loc + '"', function() {
                dirSearch.location.setText(data.Loc);
                dirSearch.findDentist.click();
                dirSearch.getProvidersCount().then(function(totalCount) {

                    // 9/27/17 remove comment when this action is completed
                    // should implement a looping construct 
                    // to iterate through the multiple distances 
                    // Same code, just a different dist varialble each time
                    dirSearch.refineSearch.click();
                    expect(dirSearch.distanceSelect.isPresentAndDisplayed()).toBeTruthy();
                    dirSearch.distanceSelect.selectByText(TestData.Distance35);
                    dirSearch.apply.click();
                    dirSearch.getProvidersCount().then(function(refineCount) {
                        console.log('totalCount  & refineCount : ' + totalCount + ' -> ' + refineCount + ' ' + TestData.Distance35);
                        expect(Number(totalCount)).toBeGreaterThan(Number(refineCount));
                    });

                    dirSearch.refineSearch.click();
                    expect(dirSearch.distanceSelect.isPresentAndDisplayed()).toBeTruthy();
                    dirSearch.distanceSelect.selectByText(TestData.Distance25);
                    dirSearch.apply.click();
                    dirSearch.getProvidersCount().then(function(refineCount) {
                        console.log('totalCount  & refineCount : ' + totalCount + ' -> ' + refineCount + ' ' + TestData.Distance25);
                        expect(Number(totalCount)).toBeGreaterThan(Number(refineCount));
                    });

                    dirSearch.refineSearch.click();
                    expect(dirSearch.distanceSelect.isPresentAndDisplayed()).toBeTruthy();
                    dirSearch.distanceSelect.selectByText(TestData.Distance15);
                    dirSearch.apply.click();
                    dirSearch.getProvidersCount().then(function(refineCount) {
                        console.log('totalCount  & refineCount : ' + totalCount + ' -> ' + refineCount + ' ' + TestData.Distance15);
                        expect(Number(totalCount)).toBeGreaterThan(Number(refineCount));
                    });

                    dirSearch.refineSearch.click();
                    expect(dirSearch.distanceSelect.isPresentAndDisplayed()).toBeTruthy();
                    dirSearch.distanceSelect.selectByText(TestData.Distance10);
                    dirSearch.apply.click();
                    dirSearch.getProvidersCount().then(function(refineCount) {
                        console.log('totalCount  & refineCount : ' + totalCount + ' -> ' + refineCount + ' ' + TestData.Distance10);
                        expect(Number(totalCount)).toBeGreaterThan(Number(refineCount));
                    });

                    dirSearch.refineSearch.click();
                    expect(dirSearch.distanceSelect.isPresentAndDisplayed()).toBeTruthy();
                    dirSearch.distanceSelect.selectByText(TestData.Distance5);
                    dirSearch.apply.click();
                    dirSearch.getProvidersCount().then(function(refineCount) {
                        console.log('totalCount  & refineCount : ' + totalCount + ' -> ' + refineCount + ' ' + TestData.Distance5);
                        expect(Number(totalCount)).toBeGreaterThan(Number(refineCount));
                    });

                });
            });
        };
    });



    dataProvider(TestData.Location, function(data, description) {
        if (data.ExecutionFlag) {
            it('PPOView_2o13:Should show view of PPO Net "' + data.Loc + '"', function() {
                dirSearch.location.setText(data.Loc);
                dirSearch.findDentist.click();
                dirSearch.getProvidersCount().then(function(totalCount) {
                    dirSearch.refineSearch.click();
                    dirSearch.filterMenuItem('Networks').click();
                    dirSearch.iNDeltaDentalPPO.check();
                    dirSearch.apply.click();
                    dirSearch.getProvidersCount().then(function(refineCount) {
                        console.log('totalCount  & refineCount : ' + totalCount + ' -> ' + refineCount);
                        expect(Number(totalCount)).toBeGreaterThan(Number(refineCount));
                    });
                });
            });
        };
    });

    dataProvider(TestData.Location, function(data, description) {
        if (data.ExecutionFlag) {
            it('DDPrem_3o13:Should show view of DDPremier Net "' + data.Loc + '"', function() {
                dirSearch.location.setText(data.Loc);
                dirSearch.findDentist.click();
                dirSearch.getProvidersCount().then(function(totalCount) {
                    dirSearch.refineSearch.click();
                    dirSearch.filterMenuItem('Networks').click();
                    dirSearch.iNDeltaDentalPremier.check();
                    dirSearch.apply.click();
                    dirSearch.getProvidersCount().then(function(refineCount) {
                        console.log('totalCount  & refineCount : ' + totalCount + ' -> ' + refineCount);
                        expect(Number(totalCount)).toBeGreaterThan(Number(refineCount));
                    });
                });
            });
        };
    });


    dataProvider(TestData.Location, function(data, description) {
        if (data.ExecutionFlag) {
            it('DelCareUsa_4o13:Should show view of DeltaCareUsa Net "' + data.Loc + '"', function() {
                dirSearch.location.setText(data.Loc);
                dirSearch.findDentist.click();
                dirSearch.getProvidersCount().then(function(totalCount) {
                    dirSearch.refineSearch.click();
                    dirSearch.filterMenuItem('Networks').click();
                    dirSearch.iNDeltaCareUSA.check();
                    dirSearch.apply.click();
                    dirSearch.getProvidersCount().then(function(refineCount) {
                        console.log('totalCount  & refineCount : ' + totalCount + ' -> ' + refineCount);
                        expect(Number(totalCount)).toBeGreaterThan(Number(refineCount));
                    });
                });
            });
        };
    });

    dataProvider(TestData.Location, function(data, description) {
        if (data.ExecutionFlag) {
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
                        console.log('totalCount  & refineCount : ' + totalCount + ' -> ' + refineCount);
                        expect(Number(totalCount)).toBeGreaterThan(Number(refineCount));
                        providerDetails.verifyProviderLanguage(TestData.Language1, 1);

                    });
                });
            });
        };
    });
    dataProvider(TestData.Location, function(data, description) {
        if (data.ExecutionFlag) {
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
                        console.log('totalCount  & refineCount : ' + totalCount + ' -> ' + refineCount);
                        expect(Number(totalCount)).toBeGreaterThan(Number(refineCount));
                        providerDetails.verifyProviderLanguage(TestData.Language2, 1)
                    });
                });
            });
        };
    });
    dataProvider(TestData.Location, function(data, description) {
        if (data.ExecutionFlag) {
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
                        console.log('totalCount  & refineCount : ' + totalCount + ' -> ' + refineCount);
                        expect(Number(totalCount)).toBeGreaterThan(Number(refineCount));
                        providerDetails.verifyProviderLanguage(TestData.Language3, 1)
                    });
                });
            });
        };
    });

    dataProvider(TestData.Location, function(data, description) {
        if (data.ExecutionFlag) {
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
                        console.log('totalCount  & refineCount : ' + totalCount + ' -> ' + refineCount);
                        expect(Number(totalCount)).toBeGreaterThan(Number(refineCount));
                        providerDetails.verifyProviderLanguage(TestData.Language4, 1)
                    });
                });
            });
        };
    });

    dataProvider(TestData.Location, function(data, description) {
        if (data.ExecutionFlag) {
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
                        console.log('totalCount  & refineCount : ' + totalCount + ' -> ' + refineCount);
                        expect(Number(totalCount)).toBeGreaterThan(Number(refineCount));
                    });
                });
            });
        };
    });

    dataProvider(TestData.Location, function(data, description) {
        if (data.ExecutionFlag) {
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
                        console.log('totalCount  & refineCount : ' + totalCount + ' -> ' + refineCount);
                        expect(Number(totalCount)).toBeGreaterThan(Number(refineCount));
                    });
                });
            });
        };
    });

    dataProvider(TestData.Location, function(data, description) {
        if (data.ExecutionFlag) {
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
                        console.log('totalCount  & refineCount : ' + totalCount + ' -> ' + refineCount);
                        expect(Number(totalCount)).toBeGreaterThan(Number(refineCount));
                    });
                });
            });
        };
    });

    dataProvider(TestData.Location, function(data, description) {
        if (data.ExecutionFlag) {
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
                        console.log('totalCount  & refineCount : ' + totalCount + ' -> ' + refineCount);
                        expect(Number(totalCount)).toBeGreaterThan(Number(refineCount));
                    });
                });
            });
        };
    });

    dataProvider(TestData.Location, function(data, description) {
        if (data.ExecutionFlag) {
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
                        console.log('totalCount  & refineCount : ' + totalCount + ' -> ' + refineCount);
                        expect(Number(totalCount)).toBeGreaterThan(Number(refineCount));
                    });
                });
            });
        };
    });

    it('ProvDir_4: Verify feedback submition', function() {
        dirSearch.location.setText(TestData.ZipCode);
        dirSearch.findDentist.click();
        feedback.feedback.click();
        Utility.switchToFrame(feedback.feedbackFrame());
        expect(feedback.answer1.isPresentAndDisplayed()).toBe(true);
        feedback.answer1.click();
        expect(feedback.answer2.isPresentAndDisplayed()).toBe(true);
        feedback.answer2.click();
        expect(feedback.answer3.isPresentAndDisplayed()).toBe(true);
        feedback.answer3.click();
        expect(feedback.answer4.isPresentAndDisplayed()).toBe(true);
        feedback.answer4.click();
        expect(feedback.answer5.isPresentAndDisplayed()).toBe(true);
        feedback.answer5.setText('Good');
        feedback.submit.click();
        expect(feedback.endOfSurvey.getText()).toContain('We thank you for your time spent taking this survey.');
    });

});
