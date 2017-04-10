exports.config = {
  framework: 'jasmine',
// seleniumAddress: 'http://localhost:4444/wd/hub',
  //specs: ['integration/scenarios/personalInfo_Approach1.spec.js','integration/scenarios/personalInfo_Approach2.spec.js','integration/scenarios/personalInfo_Approach3.spec.js'],
 specs: ['integration/scenarios/personalInfo_Approach3.spec.js'],
  capabilities: {
    browserName: 'chrome'
  },

  seleniumServerJar: 'C:\\Users\\CA60212\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\webdriver-manager\\selenium\\selenium-server-standalone-2.53.1.jar',
  chromeDriver:      'C:\\Users\\CA60212\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\webdriver-manager\\selenium\\chromedriver_2.26',
  geckodriver:       'C:\\Users\\CA60212\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\webdriver-manager\\selenium\\geckodriver-v0.12.0', 
  
onPrepare: function() {
	minWait = 1000;
	maxWait = 2000;
	longWait = 40000;
//	browser.manage().window().maximize();
	browser.driver.manage().window().setSize(1050,950);
	browserActions = new (require("./integration/utils/browserActions.js"));

	dataProvider = require('jasmine-data-provider');
	
	 log4js = require('log4js');
	log4js.configure({
	  appenders: [
	    { type: 'console' },
	    { type: 'file', filename: 'results/logs/executionLog.log', category: 'Delta' }
	  ]
	});
	 logger = log4js.getLogger('Delta');
	
	var Jasmine2HtmlReporter = require('protractor-jasmine2-html-reporter');
	jasmine.getEnv().addReporter(new Jasmine2HtmlReporter({
		   savePath: 'results/html-reports/',
		   screenshotsFolder: 'images',
		   showColors: true,
			includeStackTrace: true,
			defaultTimeoutInterval: 10 * 60000
			   
		}));
		 
 }


}