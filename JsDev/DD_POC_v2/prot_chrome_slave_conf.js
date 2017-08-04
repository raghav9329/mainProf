exports.config = {
    framework: 'jasmine',
     seleniumAddress: 'http://localhost:4444/wd/hub',

     //specs: ['integration/scenarios/dhmo/dhmo.504.test.js'],
     specs: ['integration/scenarios/051217_E2E_POM_Workflow.js'],

     suites: {
         allCxinit: 	'integration/scenarios/dhmo/*.test.js',
     	
         pers1:[   
         	'integration/scenarios/dhmo/dhmo.507PersInfo.test.js',
     		'integration/scenarios/dhmo/dhmo.519PersInfo.test.js',
     		'integration/scenarios/dhmo/dhmo.489PersInfo.test.js',
     		'integration/scenarios/dhmo/dhmo.504PersInfo.test.js',
     		'integration/scenarios/dhmo/dhmo.483PersInfo.test.js',
     		'integration/scenarios/dhmo/dhmo.471PersInfo.test.js'
     	],
     			  	
     	pers2:[	
     		'integration/scenarios/dhmo/dhmo.720PersInfo.test.js',    			//	'integration/scenarios/dhmo/dhmo.519.test.js',
     		'integration/scenarios/dhmo/dhmo.804PersInfo.test.js',
     		'integration/scenarios/dhmo/dhmo.1361PersInfo.test.js',
     		'integration/scenarios/dhmo/dhmo.1548PersInfo.test.js',
     		'integration/scenarios/dhmo/dhmo.1549PersInfo.test.js'
     	], 

     	deps:[   
     		'integration/scenarios/dhmo/dhmo.1355DepCTA.test.js',
     		'integration/scenarios/dhmo/dhmo.1356DepPremChgPop.test.js',
     		'integration/scenarios/dhmo/dhmo.1357DepChildAge.test.js',
     		'integration/scenarios/dhmo/dhmo.1358DepSpouse-DP.test.js',
     		'integration/scenarios/dhmo/dhmo.1359Dep-15Deps.test.js',
     	],

     	facs:[	
     		'integration/scenarios/dhmo/dhmo.1365FacSearch.test.js',
     		'integration/scenarios/dhmo/dhmo.1366FacSelect.test.js',
     		'integration/scenarios/dhmo/dhmo.1367FacCTA.test.js',
     		'integration/scenarios/dhmo/dhmo.1368FacFeedback.test.js'
     	],

     	payment:[ 	
     		'integration/scenarios/dhmo/dhmo.1403PayCCExp.test.js',
     		'integration/scenarios/dhmo/dhmo.1404PayAddrSug.test.js',
     		'integration/scenarios/dhmo/dhmo.1405PayConAuthChk.test.js',
     		'integration/scenarios/dhmo/dhmo.1406PayCTA.test.js',
     		'integration/scenarios/dhmo/dhmo.1407PayCvv.test.js'
     	],

     	e2e:[	
     		'integration/scenarios/dhmo/dhmo.1408.EndToEndWkFlo1.test.js',
     		'integration/scenarios/dhmo/dhmo.1461.EndToEndWkFlo2.test.js',
    		'integration/scenarios/dhmo/dhmo.1746DirHMO_WrkFlo1.test.js',
    		'integration/scenarios/dhmo/dhmo.1753DirHMO_WrkFlo4.test.js',
    		'integration/scenarios/dhmo/dhmo.1754DirHMO_WrkFlow5.test.js',
    		'integration/scenarios/dhmo/dhmo.1755DirHMO_WrkFlow6.test.js'
     	],
     			
     	cxinit2_4: 	'integration/scenarios/providers/cxinit2.4.test.js',
         cxE2E: 		'integration/scenarios/051217_E2E_POM_Workflow.js',
         cxE2E50:	'integration/scenarios/CAA50*.test.js',
         cxE2E54:	'integration/scenarios/CAA54*.test.js',
         cxE2E55p:	'integration/scenarios/CAA55Plan*.test.js',
         cxE2E55s:	'integration/scenarios/CAA55Simple*.test.js',
     },


//  The proper locaiton of Local drivers  C:\cx\node_modules\protractor\node_modules\webdriver-manager\selenium
//  I am beginnign to see the value of the local installation and having a uniform configuraiton 
//  Across all the users installations.  The proper locaiton of Local drivers
     seleniumServerJar:  __dirname + '\\node_modules\\protractor\\node_modules\\webdriver-manager\\selenium\\selenium-server-standalone-3.4.0.jar',
     chromeDriver:       __dirname + '\\node_modules\\protractor\\node_modules\\webdriver-manager\\selenium\\chromedriver_2.30.exe',
     geckodriver:        __dirname + '\\node_modules\\protractor\\node_modules\\webdriver-manager\\selenium\\geckodriver-v0.18.0.exe',

	
	
      
//	// Chrome capabilities
  capabilities: {
   browserName: 'chrome',
    chromeOptions: {
        'args': ['disable-infobars']
                    }
 	},
	
	
	// Firefox capabilities
//	 capabilities: {      
//     browserName: 'firefox',
//	   acceptInsecureCerts:true
//     },
	  
 
 
//	// InterNet Explorer
//	 capabilities: {      
//	    'browserName': 'internet explorer',
//	    'platform': 'ANY',
//	   'version': '11',
//	  'nativeEvents': false,
//	  'unexpectedAlertBehaviour': 'accept',
//	  'ignoreProtectedModeSettings': true,
//	  'enablePersistentHover': true,
//	  'disable-popup-blocking': true,
//	  'ignoreZoomSetting': true
//    },

     params: {
         //baseUrl: ''
           baseUrl:'https://aw-lx0176.deltadev.ent:3000/enroll/',
         //baseUrl:'https://mot.deltadentalins.com/enroll',
         //baseUrl:'https://mot.deltadentalins.com',
     	  exeInspDelay:'', // Command Line controllable sleep variable for running Debug Inspections
     	  exeLogging:'OFF'  // other: INFO, TRACE, DEBUG
     },

    onPrepare: function() {
        minWait = 1000;
        maxWait = 2000;
        longWait = 40000;
        PAGELOADTIME = 60000;
        //browser.manage().window().maximize();
        browser.manage().window().setSize(1050,1250);
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
//        defaultTimeoutInterval: 10 * 60000   // questioning the size of this value	
        defaultTimeoutInterval: 20000   // questioning the size of this value	

    }
}


// 5/26/17 need to partition the commented out configs
//
//// conf.js execute via bash alias ppcc
////  This file is ONLY for the SF Jenkins SLAVE !!
//exports.config = {
//  framework: 'jasmine',
//  jasmineNodeOpts: {
//	showColors: true,
//	isVerbose:	true,
//	realtimeFailure: true,
//	includeStatckTrace: false
////  defaultTimeOutInterval: 30000
//  },
// 
//  stackTrace: false,
//  
// //directConnect: true,
// //
// // seleniumAddress: 'http://localhost:4444/wd/hub',
// // specs: ['./*.test.js'],
//  
//// specs: ['integration/scenarios/CAA50Senior_Single.test.js'],
//specs: ['integration/scenarios/CAA54IndividualAndFamily.test.js'],
//// specs: ['integration/scenarios/CAA55PlanSelect.dev.js'],
//// specs: ['integration/scenarios/CAA55SimplePlan_WasSenior.dev.js'],
////  specs: ['integration/scenarios/**/*.test.js'],
//// specs: ['integration/scenarios/dhmo/dhmo.507.test.js'],
//
//  
//  suites: {
//	  suite1: 'integration/scenarios/CAA*.test.js',
//	  pomSuite: 'ingegration/scenarios/POM_Test.test.js'
//  },
//  
////  Follow is for running locally on drive C:
//  seleniumServerJar: 'C:\\Users\\SELENIUM_RUNNER\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\webdriver-manager\\selenium\\selenium-server-standalone-3.0.1.jar',
//  chromeDriver:      'C:\\Users\\SELENIUM_RUNNER\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\webdriver-manager\\selenium\\chromedriver_2.27',
//  geckodriver:       'C:\\Users\\SELENIUM_RUNNER\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\webdriver-manager\\selenium\\geckodriver-v0.14.0',
//
////  Follow is for running from DeltaDev Account on Drive P:
////  seleniumServerJar: 'C:\\Users\\DCA60212\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\webdriver-manager\\selenium\\selenium-server-standalone-3.3.1.jar',
////  chromeDriver:      'C:\\Users\\DCA60212\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\webdriver-manager\\selenium\\chromedriver_2.29',
////  geckodriver:       'C:\\Users\\DCA60212\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\webdriver-manager\\selenium\\geckodriver-v0.15.0',
//  
//	onPrepare: function(){
//   
//	  browser.driver.manage().window().setSize(1050,950);
//   
//  /********************************************************************************************   
//   *  Waiting for Angular Synchronization. The following is key when testing non Angular Apps
//   *  Turning browser synchronization off. For further detail see the following
//   *  https://github.com/angular/protractor/blob/master/docs/timeouts.md
//   */ 
//	  browser.ignoreSynchronization = true;
//
//  },
//  
//  capabilities: {
//  	browserName: 'chrome'
//  // count: 5,
//  // browserName: 'firefox'
//  },
//  params: {
        //baseUrl: 'http://DIT3.deltadentalins.com'
//  },
//  
// maxSessions: 1, 
// 
//resultJsonOutputFile: 'results.json'
//
//
//} // End of configurations

// =============================================================================================


// 5/26/17 need to partition the commented out configs.  
// 
//  Previously run configs
//  5/26/17 These below seperated from entire block above
//Interesting Experiment: ran 6 parallel  
//Idea came from http://blog.yodersolutions.com/run-protractor-tests-in-parallel/
//capabilities: {
//	browserName: 'chrome',
//	count: 6,
//	shardTestFiles: true,
//	maxInstances: 2
//
//	// browserName: 'firefox'
//} ,



//multiCapabilities: [{
//'browserName': 'chrome',
//	count: 3
//}, {
//'browserName': 'firefox',
//	count: 2
//}],
//Follow is for running locally on drive C:
//seleniumServerJar: 'C:\\Users\\SELENIUM_RUNNER\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\webdriver-manager\\selenium\\selenium-server-standalone-3.4.0.jar',
//chromeDriver:      'C:\\Users\\SELENIUM_RUNNER\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\webdriver-manager\\selenium\\chromedriver_2.29',
//geckodriver:       'C:\\Users\\SELENIUM_RUNNER\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\webdriver-manager\\selenium\\geckodriver-v0.16.1',


//seleniumServerJar: 'C:\\Users\\DCA60212\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\webdriver-manager\\selenium\\selenium-server-standalone-3.4.0.jar',
//chromeDriver: 'C:\\Users\\DCA60212\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\webdriver-manager\\selenium\\chromedriver_2.29',
//geckodriver: 'C:\\Users\\DCA60212\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\webdriver-manager\\selenium\\geckodriver-v0.16.1',
