"use strict";

var specHelper = require("../utils/intSpecHelper");
var activityReportPage = require("../pageObjects/ActivityReportPage.js");
var envConfig = specHelper.getConfig();
var enUK = require('../../app/src/assets/js/locales/enUK');
var makePaymentPage = require("../pageObjects/MakePaymentPage.js");
/*
 * Entitlement: Bank User Wi thout a login
 */
//var zeroEntitlementsUser = envConfig.zeroEntitlement;// We want UK Payments user with zero Entitlements

var noViewNoMakeUser = envConfig.ukUserNoViewNoMake;// We want UK Payments user with zero Entitlements
var paymentSubmissionTestUser = envConfig.paymentSubmissionTestUser;
var paymentSavePayeeTestUser = envConfig.paymentSavePayeeTestUser;

describe(noViewNoMakeUser.loginName, function () {

    describe("Login test:  User with UK Payment creds, but no Entitlements to see Fund Accounts.", function () {

        it(" Alertr: at this time of this writing this test, Accessing the Hover Menus is proving difficult.  ", function () {
            specHelper.login(noViewNoMakeUser.loginName);
            browser.sleep(1500);  // changed from 3000

          // var elementList = element.all(by.repeater('.hover-menu-button'));
          //  expect(elementList.count()).toEqual(5);
          //  expect(elementList.get(1).getText()).toEqual("Home");

         var items = element.all(by.repeater('.hover-menu-button')).filter(function(item){
             return item.element(by.binding('.hover-menu-button')).getText().then(function(label){
                 return label === 'Home'
             });
         });
            items.get(0).element(by.css('.hover-menu-button')).getText().toEqual('Home');

          //expect(element(by.css(".hover-menu-button")).getText()).toEqual("Home");
            // console.log("Did HoverMenu on HOME");
          //expect(element(by.css(".ng-binding")).getText()).toEqual("Accounts");
         // expect(element(by.css(".hover-menu-button")).getText()).toEqual("Deposits & Receivables");
            //expect(element(by.css(".hover-menu-button")).getText()).toEqual("Services");
           // I did have a check here for the URL.  it was before the element|By.css



        });
    });
});//  end describe(failBankUser......)