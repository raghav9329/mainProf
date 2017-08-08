// conf.js execute via bash alias ppcc
exports.config = {
  framework: 'jasmine',
  jasmineNodeOpts: {
	showColors: true,
	isVerbose:	true,
	realtimeFailure: true,
	includeStatckTrace: false
//  defaultTimeOutInterval: 30000
  },
 
  stackTrace: false,
  
 //directConnect: true,
 //
 seleniumAddress: 'http://localhost:4444/wd/hub',
 // specs: ['./*.test.js'],
  
//specs: ['integration/scenarios/CAA50Senior_Single.test.js'],
//specs: ['integration/scenarios/CAA55PlanSelect.test.js'],
// specs: ['integration/scenarios/051217_E2E_POM_Workflow.js'],
// specs: ['integration/scenarios/CAA55PlanSelect.dev.js'],
// specs: ['integration/scenarios/CAA55SimplePlan_WasSenior.dev.js'],
//  specs: ['integration/scenarios/**/*.test.js'],
// specs: ['integration/scenarios/cxinit/cxinit.507.test.js'],

  specs: ['integration/scenarios/providers/*.test.js'],
  
  suites: {
	  suite1: 'integration/scenarios/CAA*.test.js',
	  pomSuite: 'ingegration/scenarios/POM_Test.test.js'
  },
  
//  Follow is for running locally on drive C:
  seleniumServerJar:  __dirname + '\\node_modules\\protractor\\node_modules\\webdriver-manager\\selenium\\selenium-server-standalone-3.4.0.jar',
  chromeDriver:       __dirname + '\\node_modules\\protractor\\node_modules\\webdriver-manager\\selenium\\chromedriver_2.30.exe',
  geckodriver:        __dirname + '\\node_modules\\protractor\\node_modules\\webdriver-manager\\selenium\\geckodriver-v0.18.0.exe',

//  Follow is for running from DeltaDev Account on Drive P:
//  seleniumServerJar: 'C:\\Users\\DCA60212\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\webdriver-manager\\selenium\\selenium-server-standalone-3.3.1.jar',
//  chromeDriver:      'C:\\Users\\DCA60212\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\webdriver-manager\\selenium\\chromedriver_2.29',
//  geckodriver:       'C:\\Users\\DCA60212\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\webdriver-manager\\selenium\\geckodriver-v0.15.0',
  
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
  
  capabilities: {
  	browserName: 'chrome',
    chromeOptions: {
        'args': ['disable-infobars']
    }
	// 5/8/17 the above config get's rid of that browser alert about the 
	// browser window being controlled externally....etc.
  
  // count: 5,
  // browserName: 'firefox'
  },
  params: {
      //baseUrl: 'http://aw-lx0176/directory-search.html'
        baseUrl:'http://aw-lx0176/directory-search.html',
      //baseUrl:'https://mot.deltadentalins.com/enroll',
      //baseUrl:'https://mot.deltadentalins.com',
  	  exeInspDelay:'', // Command Line controllable sleep variable for running Debug Inspections
  	  exeLogging:'OFF'  // other: INFO, TRACE, DEBUG
  },
 maxSessions: 1, 
 
resultJsonOutputFile: 'results.json'


} // End of configurations



//  Previously run configs
//
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
