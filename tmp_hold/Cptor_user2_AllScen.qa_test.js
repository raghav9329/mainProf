// What is this test file for ?????


"use strict";

var specHelper = require("../utils/intSpecHelper");
var homePage = require("../pageObjects/HomePage.js");
var makePaymentPage = require("../pageObjects/MakePaymentPage.js");
var activityReportPage = require("../pageObjects/ActivityReportPage.js");
var envConfig = specHelper.getConfig();
var zapHelper = require("../utils/zapHelper.js");
var moment = require("moment-timezone");

var enUK = require('../../app/src/assets/js/locales/enUK');
/*
 * Entitlements in Econnect MURANO_SERVICES, UK_SERVICES
 * Entitlements in Murano: PAYMENT_FPS,PAYMENT_CHAPS,PAYMENT_BACS, PAYMENT_FREE_FORM (limit- 110000)
 */
var scenarioUserInfo = envConfig.paymentSubmissionTestUser;
console.log("Lanuching with: ", scenarioUserInfo.loginName);

describe(scenarioUserInfo.loginName, function () {
	beforeAll(function () {
		return specHelper.login(scenarioUserInfo.loginName);
	});

	afterAll(function (done) {
		zapHelper.downloadReport(done, 'ptor_user2');
	});

/* Validate:  Need to know if I should be using homePage.navigate() for every test ????? 
 * What is the nature of where our login navs to ??  Murano Home page ( dashboard ) ???? 
 */

	beforeEach(function () {
		homePage.navigate();
	});

/*	it("should return login success", funcion() { // Test 213.1
	});
	it("should not find an active link to UK paymens", function() { // Test 213.2
	}):
*/
	it("should display the Payment Summary page", function () {
		expect(homePage.getTitleText()).toEqual(enUK['payments.home.header']);
	});
/*	it("should display the make payment link", function () {
		expect(homePage.getMakePaymentLink().isDisplayed()).toEqual(true);
	});
	it("should link to the make payment page", function () {
		homePage.getMakePaymentLink().click();
		expect(makePaymentPage.getTitleText()).toEqual("Make a Payment");
	});*/
});



