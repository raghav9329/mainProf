/*
 * Purpose and tickets covered by this file
 *
 */

"use strict";


var specHelper = require("../utils/intSpecHelper");
var homePage = require("../pageObjects/HomePage.js");
var makePaymentPage = require("../pageObjects/MakePaymentPage.js");
var activityReportPage = require("../pageObjects/ActivityReportPage.js");
var envConfig = specHelper.getConfig();
var zapHelper = require("../utils/zapHelper.js");
var moment = require("moment-timezone");

var enUK = require('../../app/src/assets/js/locales/enUK');

var scenarioUserInfo = envConfig.paymentSubmisisonTestUser;

/*
Comment__ 214.1 Negative test with user who cannot get to MPay.  but is the user UK ok ?
*/

describe( scenarioUserInfo.loginName, function() {

    beforeAll( function () {
        return specHelper.login( scenarioUserInfo.loginName);
    });//


/*	afterAll(function (done) {
		zapHelper.downloadReport(done, 'ptor_user2');
	});
*/

    it("should display the Payment Summary page", function () {
        expect(homePage.getTitleText()).toEqual(enUK['payments.home.header']);
    });



});// end-214_1User...





//var my214_1User = envConfig.paymentSubmisisonTestUser;
