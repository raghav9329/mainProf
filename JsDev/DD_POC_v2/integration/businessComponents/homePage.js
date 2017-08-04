"use strict"
var HmPage = new(require('../pageObjects/cxinit/home-page.js'));
var HomePage = function() {

};

// Fill Home page details and navigate ti perInfo page
HomePage.prototype.enterHomePageDetails = function(homeObj, ppo) {
    browser.getCapabilities().then((c) => {
        if (ppo) {
            HmPage.Zipcode.setText(homeObj.ZIPcode);
            // HmPage.Coverage_Type.selectByText(homeObj.CoverageType);
            // HmPage.Effcdate.selectByText(homeObj.CoverageStartDate);
            
            HmPage.Go.click();
            HmPage.PpoEnrollBtn.click();
        } else {
            if (c.get('browserName') == 'internet explorer') HmPage.overridelink.click();
            HmPage.PlanName.setText(homeObj.PlanName);
            HmPage.PlanType.setText(homeObj.PlanType);
            HmPage.PlanCode.setText(homeObj.PlanCode);
            HmPage.CoverageStartDate.setText(homeObj.CoverageStartDate);
            HmPage.PlanState.setText(homeObj.State);
            HmPage.PlanZip.setText(homeObj.ZIPcode);
            HmPage.Country.setText(homeObj.Country);
            HmPage.EnrollmentFee.setText(homeObj.EnrollmentFee);
            HmPage.AnnualCost.setText(homeObj.AnnualCost);
            HmPage.CoverageType.setText(homeObj.CoverageType);
            HmPage.PlanID.setText(homeObj.PlanID);
            HmPage.IssuerCode.setText(homeObj.IssuerCode);
            HmPage.NoOFCovered.setText(homeObj.NoOfPeopleCovered);
            if (homeObj.Dob) HmPage.Dob.setText(homeObj.Dob);
            HmPage.Submit.click();

        }
    })
};

module.exports = HomePage;
