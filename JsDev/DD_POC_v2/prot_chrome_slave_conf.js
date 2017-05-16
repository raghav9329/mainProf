// conf.js execute via bash alias ppcc
//  This file is ONLY for the SF Jenkins SLAVE !!
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
specs: ['integration/scenarios/CAA54IndividualAndFamily.test.js'],
// specs: ['integration/scenarios/CAA55PlanSelect.dev.js'],
// specs: ['integration/scenarios/CAA55SimplePlan_WasSenior.dev.js'],
//  specs: ['integration/scenarios/**/*.test.js'],
// specs: ['integration/scenarios/cxinit/cxinit.507.test.js'],

  
  suites: {
	  suite1: 'integration/scenarios/CAA*.test.js',
	  pomSuite: 'ingegration/scenarios/POM_Test.test.js'
  },
  
//  Follow is for running locally on drive C:
  seleniumServerJar: 'C:\\Users\\SELENIUM_RUNNER\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\webdriver-manager\\selenium\\selenium-server-standalone-3.0.1.jar',
  chromeDriver:      'C:\\Users\\SELENIUM_RUNNER\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\webdriver-manager\\selenium\\chromedriver_2.27',
  geckodriver:       'C:\\Users\\SELENIUM_RUNNER\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\webdriver-manager\\selenium\\geckodriver-v0.14.0',

//  Follow is for running from DeltaDev Account on Drive P:
//  seleniumServerJar: 'C:\\Users\\DCA60212\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\webdriver-manager\\selenium\\selenium-server-standalone-3.3.1.jar',
//  chromeDriver:      'C:\\Users\\DCA60212\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\webdriver-manager\\selenium\\chromedriver_2.29',
//  geckodriver:       'C:\\Users\\DCA60212\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\webdriver-manager\\selenium\\geckodriver-v0.15.0',
  
	onPrepare: function(){
   
	  browser.driver.manage().window().setSize(1050,950);
   
  /********************************************************************************************   
   *  Waiting for Angular Synchronization. The following is key when testing non Angular Apps
   *  Turning browser synchronization off. For further detail see the following
   *  https://github.com/angular/protractor/blob/master/docs/timeouts.md
   */ 
	  browser.ignoreSynchronization = true;

  },
  
  capabilities: {
  	browserName: 'chrome'
  // count: 5,
  // browserName: 'firefox'
  },
  params: {
  	baseUrl: 'http://DIT3.deltadentalins.com'
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
