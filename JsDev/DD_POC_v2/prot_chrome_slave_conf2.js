exports.config = {
    framework: 'jasmine',
     seleniumAddress: 'http://localhost:4444/wd/hub',

   // I know you are testing with SUITES, but I am testing individually.
   // Please just comment out a line if you don't want it evaluated.
    
    //specs: ['integration/scenarios/cxinit/*.test.js'],
      specs: ['integration/scenarios/*.js'],
    //specs: ['integration/scenarios/CAA55Plan*.test.js'],
    //specs: ['integration/scenarios/cxinit/cxinit.504.test.js'],
    //specs: ['integration/scenarios/cxinit/cxinit.507.test.js'],
    //specs: ['integration/scenarios/cxinit/cxinit.507.test.js','integration/scenarios/cxinit/cxinit.489.test.js'],
    //specs: ['integration/scenarios/cxinit/cxinit.489.test.js'],
    //specs: ['integration/scenarios/051217_E2E_POM_Workflow.js'],
    //specs: ['integration/scenarios/providers/cxinit.2.4.test.js'],

    suites: {

        //suite1: 'integration/scenarios/temp/SampleTest.js',
    	cxinit2_4: 'integration/scenarios/providers/cxinit2.4.test.js',
        cx507: 'integration/scenarios/cxinit/cxinit.507.test.js',
        cx489: 'integration/scenarios/cxinit/cxinit.489.test.js',
        cx504: 'integration/scenarios/cxinit/cxinit.504.test.js',
        cx483: 'integration/scenarios/cxinit/cxinit.483.test.js',
        cx471: 'integration/scenarios/cxinit/cxinit.471.test.js',
        cx720: 'integration/scenarios/cxinit/cxinit.720.test.js',
        cx519: 'integration/scenarios/cxinit/cxinit.519.test.js',
        cx804: 'integration/scenarios/cxinit/cxinit.804.test.js',
        cxE2E: 'integration/scenarios/051217_E2E_POM_Workflow.js',
        cxE2E50: 'integration/scenarios/CAA50*.test.js',
        cxE2E54: 'integration/scenarios/CAA54*.test.js',
        cxE2E55p: 'integration/scenarios/CAA55Plan*.test.js',
        cxE2E55s: 'integration/scenarios/CAA55Simple*.test.js',
        	

    },

//Follow is for running locally on drive C:
  seleniumServerJar: 'C:\\Users\\SELENIUM_RUNNER\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\webdriver-manager\\selenium\\selenium-server-standalone-3.4.0.jar',
  chromeDriver:      'C:\\Users\\SELENIUM_RUNNER\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\webdriver-manager\\selenium\\chromedriver_2.29',
  geckodriver:       'C:\\Users\\SELENIUM_RUNNER\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\webdriver-manager\\selenium\\geckodriver-v0.16.1',


//    seleniumServerJar: 'C:\\Users\\DCA60212\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\webdriver-manager\\selenium\\selenium-server-standalone-3.4.0.jar',
//    chromeDriver: 'C:\\Users\\DCA60212\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\webdriver-manager\\selenium\\chromedriver_2.29',
//    geckodriver: 'C:\\Users\\DCA60212\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\webdriver-manager\\selenium\\geckodriver-v0.16.1',

    
    capabilities: {
        browserName: 'chrome',
        chromeOptions: {
            'args': ['disable-infobars']
        }
    	// 5/8/17 the above config get's rid of that browser alert about the 
    	// browser window being controlled externally....etc.
    },

    params: {
        //baseUrl: ''
        //baseUrl:'http://aw-lx0076.deltadev.ent/directory-search.html',
        //baseUrl:'http://aw-lx0076.deltadev.ent:3000/enroll/',
        baseUrl:'https://aw-lx0176.deltadev.ent:3000/enroll/',
    	exeInspDelay:'', // Command Line controllable sleep variable for running Debug Inspections
        //baseUrl:'https://mot.deltadentalins.com/enroll',
        //  baseUrl:'https://mot.deltadentalins.com',
        //exeLogging:'INFO'
        exeLogging:'OFF'
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
        defaultTimeoutInterval: 10 * 60000

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
//// specs: ['integration/scenarios/cxinit/cxinit.507.test.js'],
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
