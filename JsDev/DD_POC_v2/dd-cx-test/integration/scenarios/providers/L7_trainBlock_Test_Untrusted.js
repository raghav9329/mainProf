"use strict"
var TestData        = require('../../testData/' + testDataEnv + '/providers/cxinit2-1146.json');
var dirSearch       = new(require('../../pageObjects/providers/directory-search-page.js'));
var providerDetails = new(require('../../pageObjects/providers/provider-details-page.js'));
//var isUrlBlocked = new (require (''));



describe('CXINIT2-1146: Prov Dir', function() {
    var myCurrentURL;
    var unTrustedURLS = [];
    beforeEach(function() {
        Utility.openApplication('');
    });

    dataProvider(TestData.Location, function(data, description) {
        if (data.ExecutionFlag) {
            it('Dist_1o13:Should reduce result count on Dist Filters "' + data.Loc + '"', function() {
                dirSearch.location.setText(data.Loc);
                dirSearch.findDentist.click();
                browser.getCurrentUrl().then(function(myCurrentURL) {
                    //Captures any changes(appending any string and navigating to other URL's) other than Current URL.
                    if (myCurrentURL.includes("long=")) {
                        var cURL = myCurrentURL.split("long=");
                        if (cURL[1].length > 15) {
                            unTrustedURLS.push(myCurrentURL);
                        }
                    } else {
                        unTrustedURLS.push(myCurrentURL); //Captures any redirections other than current URl
                    }


                });
                console.log('Un Trusted Sites====' + unTrustedURLS);
                // install node module== npm install fs-extra
                var fs = require('fs-extra')

                fs.writeJson('./unTrustedURLS.json', { URLS: unTrustedURLS }, err => {
                    if (err) return console.error(err)

                    console.log('success!')
                })

            });
        };
    });

});
