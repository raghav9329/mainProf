exports.config = {
  framework: 'jasmine',
  seleniumAddress: 'http://localhost:4444/wd/hub',
  specs: ['test/deltadental.spec.js'],
  capabilities: {
    browserName: 'chrome'
  },

onPrepare: function() {
	minWait = 1000;
	maxWait = 2000;
	longWait = 40000;
	browser.manage().window().maximize();
	browserActions = new (require("./utils/browserActions.js"));
	
	var Jasmine2HtmlReporter = require('protractor-jasmine2-html-reporter');
	jasmine.getEnv().addReporter(new Jasmine2HtmlReporter({
		   savePath: './reports/',
		   screenshotsFolder: 'images',
		   showColors: true,
			includeStackTrace: true,
			defaultTimeoutInterval: 10 * 60000
			   
		}));
		 
 }


}