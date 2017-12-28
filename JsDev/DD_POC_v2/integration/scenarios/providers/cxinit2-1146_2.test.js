"use strict"
var TestData = require('../../testData/'+testDataEnv+'/providers/cxinit2-1146.json');
var dirSearch = new(require('../../pageObjects/providers/directory-search-page.js'));
var providerDetails = new(require('../../pageObjects/providers/provider-details-page.js'));

describe('CXINIT2-1146: Prov Dir', function() {
    beforeEach(function() {
        jasmine.addMatchers(custommatcher.customMatchers);
        Utility.openApplication('');
    });

    dataProvider(TestData.Location, function(data, description) {
        
	if (data.ExecutionFlag) {
            it('Dist35_Should reduce count on Dist Filter "' + data.Loc + '"', function() {
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
                    	console.log('totalCount  & refineCount : ' +totalCount +' -> ' +refineCount +' '+TestData.Distance35 );
                        expect(Number(totalCount)).toBeGreaterThan(Number(refineCount));
                    });
		    });
		    });
		    };



	if (data.ExecutionFlag) {
            it('DDist25_Should reduce count on Dist Filter "' + data.Loc + '"', function() {
                dirSearch.location.setText(data.Loc);
                dirSearch.findDentist.click();
                dirSearch.getProvidersCount().then(function(totalCount) {
             

                    dirSearch.refineSearch.click();
                    expect(dirSearch.distanceSelect.isPresentAndDisplayed()).toBeTruthy();
                    dirSearch.distanceSelect.selectByText(TestData.Distance25);
                    dirSearch.apply.click();
                    dirSearch.getProvidersCount().then(function(refineCount) {
                    	console.log('totalCount  & refineCount : ' +totalCount +' -> ' +refineCount +' '+TestData.Distance25 );
                        expect(Number(totalCount)).toBeGreaterThan(Number(refineCount));
                    });
		    });
		    });
		    };



	if (data.ExecutionFlag) {
            it('DDist15_Should reduce count on Dist Filter "' + data.Loc + '"', function() {
                dirSearch.location.setText(data.Loc);
                dirSearch.findDentist.click();
                dirSearch.getProvidersCount().then(function(totalCount) {
             
                    dirSearch.refineSearch.click();
                    expect(dirSearch.distanceSelect.isPresentAndDisplayed()).toBeTruthy();
                    dirSearch.distanceSelect.selectByText(TestData.Distance15);
                    dirSearch.apply.click();
                    dirSearch.getProvidersCount().then(function(refineCount) {
                    	console.log('totalCount  & refineCount : ' +totalCount +' -> ' +refineCount +' '+TestData.Distance15 );
                        expect(Number(totalCount)).toBeGreaterThan(Number(refineCount));
                    });
                    });
                    });
		    };



	if (data.ExecutionFlag) {
            it('DDist10_Should reduce count on Dist Filter "' + data.Loc + '"', function() {
                dirSearch.location.setText(data.Loc);
                dirSearch.findDentist.click();
                dirSearch.getProvidersCount().then(function(totalCount) {
             
                    dirSearch.refineSearch.click();
                    expect(dirSearch.distanceSelect.isPresentAndDisplayed()).toBeTruthy();
                    dirSearch.distanceSelect.selectByText(TestData.Distance10);
                    dirSearch.apply.click();
                    dirSearch.getProvidersCount().then(function(refineCount) {
                    	console.log('totalCount  & refineCount : ' +totalCount +' -> ' +refineCount +' '+TestData.Distance10 );
                        expect(Number(totalCount)).toBeGreaterThan(Number(refineCount));
                    });
                    });
                    });
		    };

	if (data.ExecutionFlag) {
            it('DDist 5_Should reduce count on Dist Filter "' + data.Loc + '"', function() {
                dirSearch.location.setText(data.Loc);
                dirSearch.findDentist.click();
                dirSearch.getProvidersCount().then(function(totalCount) {
             
                    dirSearch.refineSearch.click();
                    expect(dirSearch.distanceSelect.isPresentAndDisplayed()).toBeTruthy();
                    dirSearch.distanceSelect.selectByText(TestData.Distance5);
                    dirSearch.apply.click();
                    dirSearch.getProvidersCount().then(function(refineCount) {
                    	console.log('totalCount  & refineCount : ' +totalCount +' -> ' +refineCount +' '+TestData.Distance5 );
                        expect(Number(totalCount)).toBeGreaterThan(Number(refineCount));
                    });

                });
            });


        };// end of if data.ExecutionFlag
    });  // end of DataProvider



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
                    	console.log('totalCount  & refineCount : ' +totalCount +' -> ' +refineCount );
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
                    	console.log('totalCount  & refineCount : ' +totalCount +' -> ' +refineCount );
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
                    	console.log('totalCount  & refineCount : ' +totalCount +' -> ' +refineCount );
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
                    	console.log('totalCount  & refineCount : ' +totalCount +' -> ' +refineCount );
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
