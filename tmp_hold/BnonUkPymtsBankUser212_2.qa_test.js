// *************************************
//  what is this test about : login as ttoller.  See the describe statement
//  Get the Banking user page.  
//  Check : user ttoller refers to Tim Toller, but that is all page Object defintions.
// 
//  I think the real test is looking for Banking User specific things,
//  And looking and NOT finding Murano Payment things like the UK Services UnionJack
"use strict";

var specHelper = require("../utils/intSpecHelper");
//var homePage = require("../pageObjects/HomePage.js");
//var makePaymentPage = require("../pageObjects/MakePaymentPage.js");
//var activityReportPage = require("../pageObjects/ActivityReportPage.js");
var envConfig = specHelper.getConfig();
var zapHelper = require("../utils/zapHelper.js");
var moment = require("moment-timezone");
var enUK = require('../../app/src/assets/js/locales/enUK');

// We want bankUser ttoller in environments file
// * = *.bankUser represents ttoller in environments.qa.bankUser: users.ttoller
var testLoginUser = envConfig.bankUser;


	console.log("The Login name is: ", testLoginUser.loginName);
	console.log("The Users Full Name is: ",testLoginUser.fullName);

describe(testLoginUser.loginName, function () {
    describe("Login test: ttoller user with Bank User Creds, but not UK Payment creds.", function () {

        it(" Should pass because bankUser.fullName is only associated bankUser.loginName.  ", function () {
            specHelper.login(testLoginUser.loginName);
            //browser.sleep(1500);  // changed from 3000
            expect(element(by.css(".svb-header-user-menu-container")).getText()).toEqual(testLoginUser.fullName);
//		console.log("The Login name is: ", testLoginUser.loginName);
//		console.log("The Users Full Name is: ",testLoginUser.fullName);

        });
/*   
 *  Ok, It occurs to me that after logging in with a Banking user who doesn't have Murano payments
 *  Access, that I should search for the UK services Menu AND NOT FIND IT. 
 *  It seems like that would be the test
 */

    });
});


