
var env = require('../environment.js');
var fs = require('fs');
var Structures = require('./framework/cx_structures.js');

// The main suite of Protractor tests.
exports.config = {
  seleniumAddress: env.seleniumAddress,

  framework: 'jasmine',

  // Spec patterns are relative to this directory.
  specs: [
    'validations/*.js'
  ],

  // Exclude patterns are relative to this directory.
  exclude: [
	'validations/exclude*.js'
  ],

  multiCapabilities: [ 
  {
    'browserName': 'chrome'
  }],
  /* ,
  {
	  'browserName': 'internet explorer'
  },{
    'browserName': 'firefox',
	'firefox_binary': '%CX_FIREFOX_HOME%\\Mozilla\ Firefox\\firefox.exe',
	'binary_' : '%CX_FIREFOX_HOME%\\Mozilla\ Firefox\\firefox.exe',
	'binary' : '%CX_FIREFOX_HOME%\\Mozilla\ Firefox\\firefox.exe'
	
	'browserName': 'firefox',
	'firefox_binary': 'C:\\Users\\ca59747\\AppData\\Local\\Mozilla\ Firefox\\firefox.exe',
	'binary_' : 'C:\\Users\\ca59747\\AppData\\Local\\Mozilla\ Firefox\\firefox.exe',
	'binary' : 'C:\\Users\\ca59747\\AppData\\Local\\Mozilla\ Firefox\\firefox.exe'
  },{
    'browserName': 'chrome'
  },,{
    'browserName': 'gecko'
  } ], */

  //--- capabilities: env.capabilities,

  resultJsonOutputFile: '..\\spec\\cx\\reports\\output.json',

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
	jasmine.DEFAULT_TIMEOUT_INTERVAL = 60000;
	//--- add XML Reporter
/*     require('jasmine-reporters');
    jasmine.getEnv().addReporter(
      new jasmine.JUnitXmlReporter('.\\reports', true, true));
	  jasmine.getEnv().addReporter(new jasmine.ConsoleReporter(console.log)); */

	global.delta_cx = browser.driver;
	global.delta_cx_dir_screenshots = '..\\spec\\cx\\reports\\screenshots\\';
	global.delta_cx_automation_suite = 'Automation Test Development:';
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
	


//////	//--- Build CX App HTTP Request as expected behavior of navigation from Delta Dental Enrollment Page.
//////	flow = protractor.promise.controlFlow()
//////	
//////	flow.await(setup_data({data: 'test'})).then( function(result) {
//////		console.log(result);
//////	})
////
//////	//--- add console reporter
//////	var ConsoleReporter = jasmineRequire.ConsoleReporter();
//////	var options : {
//////		timer: new jasmine.Timer, 
//////		print: function () {
//////			console.log.apply(console,arguments);
//////		}};
//////	consoleReporter = new ConsoleReporter(options); // initialize ConsoleReporter
//////	jasmine.getEnv().addReporter(consoleReporter); //add reporter to execution environment
////
//////	//--- add HTML reporter
//////	jasmine.getEnv().afterEach(function() {
//////        if (jasmine.getEnv().currentSpec.results_.failedCount > 0) {
//////            var filename = '.\\reports\\failed-' + jasmine.getEnv().currentSpec.getFullName() + '-' + Date.now();
//////            browser.takeScreenshot().then(function(png) {
//////                var stream = fs.createWriteStream(filename + '.png');
//////                stream.write(new Buffer(png, 'base64'));
//////                stream.end();
//////            });
//////            element(by.css('html')).getOuterHtml().then(function(html) {
//////                fs.writeFile(filename + '.html', html);
//////            });
//////        }
//////    });

  }

};

var env = require('../environment.js');
var fs = require('fs');

// The main suite of Protractor tests.
exports.config = {
  seleniumAddress: env.seleniumAddress,

  framework: 'jasmine',

  // Spec patterns are relative to this directory.
  specs: [
    'validations/*.js'
  ],

  // Exclude patterns are relative to this directory.
  exclude: [
	'validations/exclude*.js'
  ],

  multiCapabilities: [ 
  {
    'browserName': 'chrome'
  }],
  /* ,
  {
	  'browserName': 'internet explorer'
  },{
    'browserName': 'firefox',
	'firefox_binary': '%CX_FIREFOX_HOME%\\Mozilla\ Firefox\\firefox.exe',
	'binary_' : '%CX_FIREFOX_HOME%\\Mozilla\ Firefox\\firefox.exe',
	'binary' : '%CX_FIREFOX_HOME%\\Mozilla\ Firefox\\firefox.exe'
	
	'browserName': 'firefox',
	'firefox_binary': 'C:\\Users\\ca59747\\AppData\\Local\\Mozilla\ Firefox\\firefox.exe',
	'binary_' : 'C:\\Users\\ca59747\\AppData\\Local\\Mozilla\ Firefox\\firefox.exe',
	'binary' : 'C:\\Users\\ca59747\\AppData\\Local\\Mozilla\ Firefox\\firefox.exe'
  },{
    'browserName': 'chrome'
  },,{
    'browserName': 'gecko'
  } ], */

  //--- capabilities: env.capabilities,

  resultJsonOutputFile: '..\\spec\\cx\\reports\\output.json',

  rootElement: 'delta_cx_automation',

  //--- baseUrl: 'https://cxint-4cfb8.firebaseapp.com/',
  //--- baseUrl: 'http://rc-lx7999.ut.dentegra.lab:3000/enroll/',
  baseUrl : 'http://localhost:3000/enroll/',
  

  params: {
    login: {
      user: '',
      password: ''
    },
	environments: {
		current : 'LOCAL'
	}
  },
  
  onPrepare: function() {
	jasmine.DEFAULT_TIMEOUT_INTERVAL = 60000;
	//--- add XML Reporter
/*     require('jasmine-reporters');
    jasmine.getEnv().addReporter(
      new jasmine.JUnitXmlReporter('.\\reports', true, true));
	  jasmine.getEnv().addReporter(new jasmine.ConsoleReporter(console.log)); */

	global.delta_cx = browser.driver;
	global.delta_cx_dir_screenshots = '..\\spec\\cx\\reports\\screenshots\\';
	global.delta_cx_automation_suite = 'Automation Test Development:';
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
	


//////	//--- Build CX App HTTP Request as expected behavior of navigation from Delta Dental Enrollment Page.
//////	flow = protractor.promise.controlFlow()
//////	
//////	flow.await(setup_data({data: 'test'})).then( function(result) {
//////		console.log(result);
//////	})
////
//////	//--- add console reporter
//////	var ConsoleReporter = jasmineRequire.ConsoleReporter();
//////	var options : {
//////		timer: new jasmine.Timer, 
//////		print: function () {
//////			console.log.apply(console,arguments);
//////		}};
//////	consoleReporter = new ConsoleReporter(options); // initialize ConsoleReporter
//////	jasmine.getEnv().addReporter(consoleReporter); //add reporter to execution environment
////
//////	//--- add HTML reporter
//////	jasmine.getEnv().afterEach(function() {
//////        if (jasmine.getEnv().currentSpec.results_.failedCount > 0) {
//////            var filename = '.\\reports\\failed-' + jasmine.getEnv().currentSpec.getFullName() + '-' + Date.now();
//////            browser.takeScreenshot().then(function(png) {
//////                var stream = fs.createWriteStream(filename + '.png');
//////                stream.write(new Buffer(png, 'base64'));
//////                stream.end();
//////            });
//////            element(by.css('html')).getOuterHtml().then(function(html) {
//////                fs.writeFile(filename + '.html', html);
//////            });
//////        }
//////    });

  }

};
