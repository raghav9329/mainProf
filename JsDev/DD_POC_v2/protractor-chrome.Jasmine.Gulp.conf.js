// conf.js
const SpecReporter = require('jasmine-spec-reporter')
    jasmineReporters = require('jasmine-reporters'),
    Jasmine2HtmlReporter = require('protractor-jasmine2-html-reporter')

exports.config = {
  //framework: 'jasmine',  3/7/2017 changed this to jasmine2 below
  framework: 'jasmine2',
  //directConnect: true,
  //seleniumAddress: 'http://localhost:4444/wd/hub',
  //specs: ['DDCX-HP-5Pg2Dp.test.js'],
  //specs: ['./*.test.js'],
  specs: ['integration/scenarios/CAA55PlanSelect.test.js'],
  seleniumServerJar: 'C:\\Users\\CA60212\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\webdriver-manager\\selenium\\selenium-server-standalone-2.53.1.jar',
  chromeDriver: 'C:\\Users\\CA60212\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\webdriver-manager\\selenium\\chromedriver_2.26',
  geckodriver:  'C:\\Users\\CA60212\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\webdriver-manager\\selenium\\geckodriver-v0.12.0',
   
  jasmineNodeOpts: {
        //The default timeout for a spec.  This may need to increase when the amount of tests in a spec increases.
        defaultTimeoutInterval: 60000,
    },



 onPrepare: function(){
   
      /**
       * Configure terminal reporter for protractor status
       */
//      var options = {
//          displayStacktrace: 'none',    // display stacktrace for each failed assertion, values: (all|specs|summary|none)
//          displayFailuresSummary: true, // display summary of all failures after execution
//          displayPendingSummary: true,  // display summary of all pending specs after execution
//          displaySuccessfulSpec: true,  // display each successful spec
//          displayFailedSpec: true,      // display each failed spec
//          displayPendingSpec: true,    // display each pending spec
//          displaySpecDuration: true,   // display each spec duration
//          displaySuiteNumber: true,    // display each suite number (hierarchical)
//          colors: {
//            success: 'green',
//            failure: 'red',
//            pending: 'yellow'
//      },
//     prefixes: {
//        success: '✓ ',
//        failure: '✗ ',
//        pending: '* '
//        }
//   }
      
      // ** Also See http://stackoverflow.com/questions/37173251/how-can-parametrize-protractor-config-file-for-different-browsers-and-test-suite
      // ** for a similar reporter configuration
   //   jasmine.getEnv().addReporter(new SpecReporter(options));

      /**
       * Configure XML reporter for protractor
       */

      jasmine.getEnv().addReporter(new jasmineReporters.JUnitXmlReporter({
          consolidateAll: true,
          savePath: 'reports/integration',
          filePrefix: 'int-test-results'
      }));
      
      /**
       * Configure XML reporter to not override previous report from yesterday
       */

      // returning the promise makes protractor wait for the reporter config before executing tests
      var promises = [];
      var promise = browser.getProcessedConfig().then(function (config) {
          // you could use other properties here if you want, such as platform and version
          var browserName = config.capabilities.browserName;

          var junitReporter = new jasmineReporters.JUnitXmlReporter({
              consolidateAll: true,
              savePath: 'reports/integration',
              filePrefix: browserName + '.int-test-results'
          });

          jasmine.getEnv().addReporter(junitReporter);
      });
      promises.push(promise);

      promise = browser.getProcessedConfig().then(function (config) {
          var browserName = config.capabilities.browserName;

          var reporter = new Jasmine2HtmlReporter({
              savePath: 'reports/integration',
              reportTitle: 'Integration Test Report',
              showSummary: true,
              showQuickLinks: true,
              takeScreenshots: false,
              filePrefix: browserName + '-DeltaCustExp-test',
              consolidate: true,
              consolidateAll: true
          });
          jasmine.getEnv().addReporter(reporter);
      });
      promises.push(promise);

      
      browser.driver.manage().window().setSize(950,950);
   
  /**************************************************************   
   *  Waiting for Angular Synchronization
   *  The following is key when testing non Angular Apps
   *  Turning browser synchronization off
   *  For further detail see the following
   *  https://github.com/angular/protractor/blob/master/docs/timeouts.md
   */ 
	  browser.ignoreSynchronization = true;

  },
capabilities: {
	browserName: 'chrome'
	// browserName: 'firefox'
  }
}
