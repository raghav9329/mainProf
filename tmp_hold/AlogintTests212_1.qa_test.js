/*  The intent of 212 to show users without anuthorized logins
    Get a failure notice atlogin.
    Entitlement: Bank User Without a login
 */

"use strict";

var specHelper = require("../utils/intSpecHelper");
var envConfig = specHelper.getConfig();
var zapHelper = require("../utils/zapHelper.js");
var moment = require("moment-timezone");
var enUK = require('../../app/src/assets/js/locales/enUK');
var onScreenLoginFailAlert = "You have entered an invalid User ID and/or password. Please try again.";
var testURLString = "https://qa4.svbconnect.com/auth/security/integratedLoginAuth.do";

var testLoginUser = envConfig.nonExistingUserLogin;

describe(testLoginUser.loginName, function () {
    describe("Login test:  User with out any SVB UK Client or Bank User Credentials", function () {

        it("should fail to allow a session login and see the LoginErr on the page", function () {
            specHelper.login(testLoginUser.loginName);
            expect(element(by.css(".svb-errors-list")).getText()).toEqual(onScreenLoginFailAlert);
            expect(browser.getCurrentUrl()).toEqual(testURLString);
        });
    });
});//  end describe(failBankUser......)

/* I think on may 24, 2016 Im done correting or adding to this file
   end of file
 */
