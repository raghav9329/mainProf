var homePg = new(require('../pageObjects/homePgObj.js'));
var perInfo = new(require('../pageObjects/persInfoPgObj.js'));
var HomePage = function() {

};

// Fill Home page details and navigate ti perInfo page
HomePage.prototype.enterHomePageDetails = function(homeObj) {

    browserActions.click(homePg.GetQuote, 'Click on GetQuote Button in Home Page');
    browser.sleep(minWait);
    browserActions.enterText(homePg.ZIPCode, homeObj.ZIPcode, 'Enter ZIP Code' + homeObj.ZIPcode);
    browser.sleep(minWait);
    browserActions.enterText(homePg.DOB, homeObj.DOB, 'Enter DOB' + homeObj.DOB);
    browserActions.selectDropdownbyText(homePg.Covered, homeObj.NoOfPeopleCovered, 'Select People from the drop down' + homeObj.NoOfPeopleCovered);
    browserActions.click(homePg.Go, 'Click on Go');
    browser.sleep(maxWait);
    browserActions.click(homePg.Enroll, 'Click on Enroll');
    browser.sleep(maxWait);

};

module.exports = HomePage;
