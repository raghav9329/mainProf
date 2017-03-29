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
 // seleniumAddress: 'http://localhost:4444/wd/hub',
 // specs: ['./*.test.js'],
  
// specs: ['integration/scenarios/CAA50Senior_Single.test.js'],
// specs: ['integration/scenarios/CAA54IndividualAndFamily.test.js'],
// specs: ['integration/scenarios/CAA55PlanSelect.test.js'],
// specs: ['integration/scenarios/CAA55SimplePlan_WasSenior.test.js'],
  
  specs: ['integration/scenarios/**/*.test.js'],

  
  suites: {
	  suite1: 'integration/scenarios/CAA*.test.js',
	  pomSuite: 'ingegration/scenarios/POM_Test.test.js'
  },
  
  seleniumServerJar: 'C:\\Users\\CA60212\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\webdriver-manager\\selenium\\selenium-server-standalone-2.53.1.jar',
  chromeDriver:      'C:\\Users\\CA60212\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\webdriver-manager\\selenium\\chromedriver_2.26',
  geckodriver:       'C:\\Users\\CA60212\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\webdriver-manager\\selenium\\geckodriver-v0.12.0',
//  geckodriver:       'C:\\Users\\CA60212\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\webdriver-manager\\selenium\\geckodriver-v0.12.0',
  onPrepare: function(){
   
	  browser.driver.manage().window().setSize(1050,950);
   
  /********************************************************************************************   
   *  Waiting for Angular Synchronization. The following is key when testing non Angular Apps
   *  Turning browser synchronization off. For further detail see the following
   *  https://github.com/angular/protractor/blob/master/docs/timeouts.md
   */ 
	  browser.ignoreSynchronization = true;
  },
  

  params: {
  	baseUrl: 'http://DIT3.deltadentalins.com'
  },
  
  multiCapabilities: [{
	    'browserName': 'chrome',
	    	//count: 1
	  }, {
	    'browserName': 'firefox',
	    	//count: 1
	  }], 
	  
	//  {
	//	    'browserName': 'internet explorer',
	//    	'platform': 'ANY',
	//    	'version' : '11'
	//  }],

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


//capabilities: {
//browserName: 'chrome'
//// browserName: 'firefox'
//},
