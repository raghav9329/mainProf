"use strict"
var TestData = require('../../testData/' + testDataEnv + '/providers/cxauto63.json');
var dirSearch = new(require('../../pageObjects/providers/directory-search-page.js'));
var providerDetails = new(require('../../pageObjects/providers/provider-details-page.js'));

// Navigate to PD URL
describe('CXAUTO63: Prov Dir', function() {
    beforeEach(function() {
        jasmine.addMatchers(custommatcher.customMatchers);
        Utility.openApplication('');
    });
    //CXINIT2-955 Pagination should not show up for single page results and should show up properly for edge cases (2, 3, 4 pages)
    dataProvider(TestData.testdata, function(data, description) {
        it('Validates the Page Count in Provider Details"' + description + '"', function() {
            dirSearch.location.setText(data.actual.zipcode);
            dirSearch.findDentist.click();
            expect(providerDetails.location.getValue()).toEqual(data.expected.loc);
            providerDetails.keywordSearch.setText(data.actual.keyword);
            providerDetails.findIcon.click();
            providerDetails.pageNation.getElements().getText().then(function(pgn) {
                var Page = pgn.toString().trim();
                expect(Page).toEqual(data.expected.pagenation)
            })
        });
        });
        //CXINIT2-16 Pagination support on UI and Node
        it('Validates the Page Nation in Provider Details', function() {
            dirSearch.location.setText('95014');
            dirSearch.findDentist.click();
            browser.actions().mouseMove(element(by.linkText('3'))).perform();
            element(by.linkText('3')).getCssValue('background-color').then(function(color) {
                expect(color).toEqual('rgba(86, 61, 130, 1)');
            })
        });
    
});
