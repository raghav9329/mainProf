exports.config = {
    framework: 'jasmine',
    // seleniumAddress: 'http://localhost:4444/wd/hub',
    
    //specs: ['integration/scenarios/cxinit/cxinit.504.test.js'],
    // specs: ['integration/scenarios/providers/cxinit2.4.test.js'],
    specs: ['integration/scenarios/providers/cxauto50.test.js'],

    suites: {
       
	    all: ['integration/scenarios/providers/*.test.js', ],
    	
    	facs:[ 'integration/scenarios/cxinit/cxinit.1365FacSearch.test.js',
    		'integration/scenarios/cxinit/cxinit.1366FacSelect.test.js',
    		'integration/scenarios/cxinit/cxinit.1367FacCTA.test.js',
    		'integration/scenarios/cxinit/cxinit.1368FacFeedback.test.js'
    	],
    
	earlyWork:[ 'integration/scenarios/providers/cxinit2.4.test.js',
		'integration/scenarios/providers/cxinit2.73.test.js',
		'integration/scenarios/providers/cxinit2.577.test.js',
		'integration/scenarios/providers/cxinit2.642.test.js',
		'integration/scenarios/providers/cxinit2.811.test.js',
		'integration/scenarios/providers/E2E_WorkFlow.test.js'
	],

	pd1145:  'integration/scenarios/providers/cxinit2-1145.test.js', 
	
	pd1146:  'integration/scenarios/providers/cxinit2-1146.test.js',
	
    	 pd2_4:	 'integration/scenarios/providers/cxinit2.4.test.js',
    	 pd2_73: 'integration/scenarios/proividers/cxinit2.73.test.js',
	cxauto50:  ['integration/scenarios/providers/cxauto50.test.js',],
  
    },

    
    seleniumServerJar:  __dirname + '\\node_modules\\protractor\\node_modules\\webdriver-manager\\selenium\\selenium-server-standalone-3.4.0.jar',
    chromeDriver:       __dirname + '\\node_modules\\protractor\\node_modules\\webdriver-manager\\selenium\\chromedriver_2.30.exe',
    geckodriver:        __dirname + '\\node_modules\\protractor\\node_modules\\webdriver-manager\\selenium\\geckodriver-v0.18.0.exe',
    

    
//   	// Chrome capabilities
     capabilities: {
      browserName: 'chrome',
       chromeOptions: {
           'args': ['disable-infobars']
                       }
    	},
	
	
  	// Firefox capabilities
//  	 capabilities: {      
//        browserName: 'firefox',
//  	   acceptInsecureCerts:true
//        },
	  
    
    
//  	// InterNet Explorer
// 	 capabilities: {      
// 	    'browserName': 'internet explorer',
// 	    'platform': 'ANY',
// 	   'version': '11',
// 	  'nativeEvents': false,
// 	  'unexpectedAlertBehaviour': 'accept',
// 	  'ignoreProtectedModeSettings': true,
// 	  'enablePersistentHover': true,
// 	  'disable-popup-blocking': true,
// 	  'ignoreZoomSetting': true
//       },

    localSeleniumStandaloneOpts: {   //  is this at all useful ?????
        jvmArgs: ["-Dwebdriver.gecko.driver=C:\\DD_Repos\\dd-cx-test\\node_modules\\protractor\\node_modules\\webdriver-manager\\selenium\\geckodriver-v0.17.0.exe"]
      },
    
    params: {
        apiurl : 'http://aw-lx0195:19002/providers',
       // baseUrl: '',
        //baseUrl:'https://aw-lx0176/find-a-dentist/alpha/',
	baseUrl:'http://aw-lx0176.deltadev.ent/find-a-dentist/alpha/directory-search.html',
        //baseUrl:'https://mot.deltadentalins.com/enroll',
        //baseUrl:'https://mot.deltadentalins.com',
    	  exeInspDelay:'', // Command Line controllable sleep variable for running Debug Inspections
    	  exeLogging:'OFF'  // other: INFO, TRACE, DEBUG
    },

    onPrepare: function() {
        assert = require('assert');
        frisby = require('frisby');
        Joi = frisby.Joi;

        minWait = 75
        maxWait = 120;
        longWait = 1200;
        PAGELOADTIME = 60000;
	isExecutionFromUI = false;
	testDataEnv='dit'
        //browser.manage().window().maximize();
        browser.manage().window().setSize(1050,1250);
        browser.executeScript("document.body.style.zoom='50%';");
        browser.ignoreSynchronization = true;
        folderName = (new Date()).toString().split('').splice(1, 4).join('');
        require("./integration/utils/element-finder-extensions.js");
      
        Utility = new(require("./integration/utils/common.js"));
        dataProvider = require('jasmine-data-provider');
        log4js = require('log4js');
        log4js.configure({ appenders: 
        	[ { type: 'console' }, 
        	  { type: 'file', 
        		filename: 'results/logs/executionLog.log', 
        		category: 'Delta' } 
        	] });
        	  
        logger = log4js.getLogger('Delta');
        logger.setLevel(browser.params.exeLogging);
        // var monthMap = {  // Configs went here  moved below 

    },
    resultJsonOutputFile: 'results.json',
    jasmineNodeOpts: {
    	//includeStackTrace : false,
        showColors: true, // Use colors in the command line report.
        defaultTimeoutInterval: 10 * 60000

    }
    
}  ////  logical end of the spec conf



