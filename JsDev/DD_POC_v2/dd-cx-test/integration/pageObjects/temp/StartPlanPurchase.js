"use strict";


var specHelper = require("../utils/intSpecHelper");
var envConfig  = specHelper.getConfig();

// // function StartPlanPurchase = { this initiall generated an error in Eclipse
//  and htis got rid of the error StartPlanPurchase = function StartPlanPurchase () {
//
StartPlanPurchase = function StartPlanPurchase () {


	navigate: function navigate () {
		//require("Navbar.js").selectLink("Payments & Transfers", "Some Payment"); //NOSONAR
		//The link to the payments app isn't actually in the navbar, so we can't click our way to the page
		//like we should. Hit the url directly, appending the hash part explicitly to workaround
		//a bug in the qa environments apache/load balancer config that causes requests without the hash
		//to get bounced out of https to http.
		
		browser.get(envConfig.baseUrl + "#/");
	} 
	
	getTitleText: function getTitleText () {
		return $(".page-title").getText();
	}
	
	isActivePage: function isActivePage () {
		return this.getTitleText().then(function (pageTitle) {
			return pageTitle === "Delta Dental Insurance";
		});
	}
	
};
