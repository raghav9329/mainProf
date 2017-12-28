//[Provider Dir] Create Automation Scripts for "Special Keywords Validation" in Provider Directory

"use strict"
var TestData = require('../../testData/' + testDataEnv + '/providers/cxauto38.json');
var dirSearch = new(require('../../pageObjects/providers/directory-search-page.js'));
var providerDetails = new(require('../../pageObjects/providers/provider-details-page.js'));

// Navigate to PD URL
describe('CXAUTO38: Prov Dir', function() {
    beforeEach(function() {
        jasmine.addMatchers(custommatcher.customMatchers);
        Utility.openApplication('');
    });


    /*Verifcation with multiple data sets using data provider concept*/
    dataProvider(TestData.Keysearch, function(data, description) {

        /*Validates the Type of the Key word as Provider/Office/Facility*/
        if (data.Keytype == 'Provider') {
            it('Validates the Provider when the keyword type is Provider "' + description + '"', function() {

                /*Enter Location from JSON file
                Enter corresponding Keyword Data*/

                dirSearch.location.setText(data.loc);
                dirSearch.keywordSearch.setText(data.keyword);
                dirSearch.findDentist.click();
                //Captures the retirved number of results and also checks where no search results are found
                dirSearch.getProvidersCount().then(function(totalCount) {
                    if (Number(totalCount) >= 1) {

                        //VALIDATE if the values displayed in "Keyword" field (on Search Results Page) match the values entered on Previous Page (Provider Search Page)
                        expect(dirSearch.keywordSearch.getValue()).toEqual(data.keyword);

                        /*Navigate through the first 3 pages to VALIDATE if the searched keyword appears either as "Provider Name" or "Office Name". 
                        If we find the keyword in Search Results, click on the KEYWORD (Provider or Office). If the search result is not present on first 3 pages, click on ANY search result on the 3rd page*/

                        providerDetails.openViewControl(data.keyword, 'VIEW', 3);

                        /*VALIDATE if we have landed on the correct "Page"*/
                        expect(providerDetails.providerName.getText()).toEqual(data.keyword);

                        /*Then click on "Back to Search Results", to go back to Search Results Page*/
                        dirSearch.backtosearch.click();

                        //VALIDATE if the values displayed in "Keyword" field (on Search Results Page) match the previously captured "keyword" values
                        expect(dirSearch.keywordSearch.getValue()).toEqual(data.keyword);
                    } else {
                        expect(totalCount).toEqual(0);
                    }
                });
            });

        };

        /*Validates the Type of the Key word as Provider/Office/Facility*/
        if (data.Keytype == 'Office') {
            // if (data.ExecutionFlag) {
            it('Validates the Office Info when the keyword type is Office "' + description + '"', function() {

                /*Enter Location from Excel file
                Enter corresponding Keyword Data*/

                dirSearch.location.setText(data.loc);
                dirSearch.keywordSearch.setText(data.keyword);
                dirSearch.findDentist.click();
                //Captures the retirved number of results and where no search results are found
                dirSearch.getProvidersCount().then(function(totalCount) {
                    if (Number(totalCount) >= 1) {

                        //VALIDATE if the values displayed in "Keyword" field (on Search Results Page) match the values entered on Previous Page (Provider Search Page)
                        expect(dirSearch.keywordSearch.getValue()).toEqual(data.keyword);

                        /*Navigate through the first 3 pages to VALIDATE if the searched keyword appears either as "Provider Name" or "Office Name". 
                        If we find the keyword in Search Results, click on the KEYWORD (Provider or Office). If the search result is not present on first 3 pages, click on ANY search result on the 3rd page*/

                        logger.info("data.keyword===" + data.keyword)
                        providerDetails.openViewControl(data.keyword, 'OFFICE', 3);

                        /*VALIDATE if we have landed on the correct "Page"*/
                        expect(providerDetails.providerName.getText()).toEqual(data.keyword);

                        /*Then click on "Back to Search Results", to go back to Search Results Page*/
                        dirSearch.backtosearch.click();

                        //VALIDATE if the values displayed in "Keyword" field (on Search Results Page) match the previously captured "keyword" values
                        expect(dirSearch.keywordSearch.getValue()).toEqual(data.keyword);
                    } else {
                        expect(totalCount).toEqual(0);
                    }
                });
            });

            // };

            // if (data.Keytype == 'Facility') {
            //     // if (data.ExecutionFlag) {
            //     it('DelCareUsa_4o13:Should show view of DeltaCareUsa Net "' + description + '"', function() {
            //         // var iterations = 3;
            //         dirSearch.location.setText(data.loc);
            //         dirSearch.keywordSearch.setText(data.keyword);
            //         dirSearch.findDentist.click();
            //         dirSearch.getProvidersCount().then(function(totalCount) {
            //             logger.info('Total Count---->' + totalCount);
            //             if (Number(totalCount) > 1) {
            //                 providerDetails.openViewControl(data.keyword, 'FACILITY',3);
            //                 expect(providerDetails.providerName.getText()).toEqual(data.keyword);
            //                 dirSearch.backtosearch.click();
            //             }
            //         });



            //     });

        };

    });

});
