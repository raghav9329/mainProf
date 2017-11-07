"use strict"
var TestData = require('../../testData/'+testDataEnv+'/providers/cxinit2-1146.json');
var dirSearch = new(require('../../pageObjects/providers/directory-search-page.js'));
var providerDetails = new(require('../../pageObjects/providers/provider-details-page.js'));
//var isUrlBlocked = new (require (''));



describe('CXINIT2-1146: Prov Dir', function() {
    beforeEach(function() {
        Utility.openApplication('');
    });

    dataProvider(TestData.Location, function(data, description) {
        if (data.ExecutionFlag) {
            it('Dist_1o13:Should reduce result count on Dist Filters "' + data.Loc + '"', function() {
                dirSearch.location.setText(data.Loc);
                dirSearch.findDentist.click();
                console.log('');
                console.log('');
                console.log('Step 1: next create 2 str vars & initialize');
                var myCurrentURL = 'initialized_myCurrentURL';
                var theUrl = 'intitialize_theUrl';
                console.log("step 2: " ,myCurrentURL);
                console.log("step 3: " +theUrl);
                console.log('step 4: now enter the func')

                browser.getCurrentUrl().then(function (theUrl){
                    myCurrentURL = theUrl ;
                    console.log(myCurrentURL);
					console.log("Step 5: is the above URL out to command  line")
                   // console.log('did I get a URL ??? ');
                   // expect(theUrl).urlContains("deltadentalins");
                   // console.log(theUrl);
                   // myCurrentURL = theUrl ;

                });
                console.log('step 6: the stirng value outside of the function...')
                console.log("step 7: " ,myCurrentURL);
                

            });
        };
    });

});