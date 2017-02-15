
var env = require('../environment.js');
var fs = require('fs');

// The main suite of Protractor tests.
exports.config = {
  seleniumAddress: env.seleniumAddress,

  framework: 'jasmine',

  // Spec patterns are relative to this directory.
  specs: [
    'validations/cx_e2e_*.js'
  ],

  // Exclude patterns are relative to this directory.
  exclude: [
	'validations/exclude*.js'
  ],

  multiCapabilities: [{
	  'browserName': 'internet explorer'
  },{
    'browserName': 'firefox',
	'binary' : ''
  },{
    'browserName': 'chrome'
  }],

  /* capabilities: env.capabilities, */

  resultJsonOutputFile: '..\\spec\\cx\\reports\\endtoendoutput.json',

  rootElement: 'delta_cx_automation',

  //--- baseUrl: 'https://cxint-4cfb8.firebaseapp.com/',
  //--- baseUrl: 'http://rc-lx7999.ut.dentegra.lab:3000/enroll/',
  baseUrl : 'http://localhost:3000/enroll/',


  params: {
    login: {
      user: '',
      password: ''
    },
	cx: {
		link : Structures.Environments.DIT,
		plan : "DeltaCare® USA CAA50 Senior Dental Program", 
		type : "DHMO",
		code : "DHMO-code",
		startdate : "11/09/2016", 
		state : "CA", 
		zip : "94538", 
		country : "USA", 
		fee : "10.00", 
		cost : "80.00", 
		coverage : "Basic", 
		issuercode : "DELTA",
		appId : "5967817",
		applicants : "1",
		planidentifier : "70422",
		planidentifers : {
			regular : "70422",
			senior : "72230"
		}
	}
  },

  onPrepare: function() {
	jasmine.DEFAULT_TIMEOUT_INTERVAL = 5000;
	global.delta_cx = browser.driver;
	global.delta_cx_dir_screenshots = '..\\spec\\cx\\reports\\screenshots\\';
	global.delta_cx_automation_suite = 'End To End Test Scenarios:';
	global.delta_cx_current_plan = {
		"enrollidenfier" : "",
		"cost" : "", 
		"fee" : "10.00",
		"startdate" : "",
		"name" : "",
		"planid" : "",
		"plancode" : "",
		"subsidy" : ""
	};
  }

};
