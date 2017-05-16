"use strict";

var users = require("./scenarioUsers.js");
var _ = require('lodash');

var config = {};
var defaults = {
	noAccountEntitlementTestUser: users.ptorUserNoAccView,
	bankUser: users.myTroller
};

_.forEach([ 'mot', 'dit3'], (envName) => {
	config[envName] = _.clone(defaults);
});


var config = _.merge(config, {
	mot: {
		baseUrl: "https://mot.deltadentalins.com/"
	},
	dit3: {
		baseUrl: "https://dit3.deltadentalins.com/"
	}
});

module.exports = config;
