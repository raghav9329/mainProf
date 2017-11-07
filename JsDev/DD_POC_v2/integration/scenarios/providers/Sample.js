"use strict"
var TestData = require('../../testData/' + testDataEnv + '/providers/keysample.json');
var dirSearch = new(require('../../pageObjects/providers/directory-search-page.js'));
var providerDetails = new(require('../../pageObjects/providers/provider-details-page.js'));

describe('CXINIT2-1146: Prov Dir', function() {
    beforeEach(function() {
        Utility.openApplication('');
    });


    // it('DelCareUsa_4o13:Should show view of DeltaCareUsa Net "' + TestData.ZipCode + '"', function() {
    dataProvider(TestData.Keysearch_ZipCode, function(data, description) {
        if (data.ExecutionFlag) {
            it('DelCareUsa_4o13:Should show view of DeltaCareUsa Net "' + TestData.ZipCode + '"', function() {
                var iterations = 3;
                dirSearch.location.setText(data.loc);
                // dirSearch.location.setText('94949');
                dirSearch.keywordSearch.setText(data.keyword);
                dirSearch.findDentist.click();
                providerDetails.openView(data.keyword);
                expect(providerDetails.providerName.getText()).toEqual(data.keyword);
                dirSearch.backtosearch.click();

            });
        };
    });



    // providerDetails.getProviderInfo().then((providerdetails) => {
    //     Object.keys(providerdetails).map(function(objectKey, index) {
    //         var value = providerdetails[objectKey];
    //         console.log(objectKey + ":" + value);
    //     });
    // });


    // var self = this;
    // browser.controlFlow().execute(function() {
    //     var count = 0;
    //     browser.wait(function() {
    //         return element(by.linkText("Next")).isPresentAndDisplayed().then(function(displayed) {
    //             var providersList = element.all(by.css('li.provider-listing'));
    //             providersList.reduce(function(prev, ele, index) {
    //                 if (iterations > count) {
    //                     count = count + 1;
    //                     console.log("==============**************=================");
    //                     providerDetails.getProviderInfo().then((providerdetails) => {
    //                         Object.keys(providerdetails).map(function(objectKey, index) {
    //                             var value = providerdetails[objectKey];
    //                             console.log(objectKey + ":" + value);
    //                         });
    //                     });

    //                     console.log("===============**************================");
    //                 }

    //             });
    //             // return element(by.linkText("Next")).isPresentAndDisplayed().then(function(displayed) {
    //             if (displayed) {
    //                 if (iterations > count) {
    //                     Utility.scrollToBottom();
    //                     return element(by.linkText("Next")).click().then(function() {
    //                         if (iterations > count) {
    //                             return !displayed;
    //                         } else {
    //                             return displayed;
    //                         }
    //                     })
    //                 } else {
    //                     return true;
    //                 }

    //             } else {
    //                 return !displayed;
    //             }


    //         });
    //     }, 9999999999);
    // });



    // });
});
