exports.config = {
  'autoStartStopServer': true,
  onPrepare: function(){
	   
	  browser.driver.manage().window().setSize(1000,900);
   
  /********************************************************************************************   
   *  Waiting for Angular Synchronization. The following is key when testing non Angular Apps
   *  Turning browser synchronization off. For further detail see the following
   *  https://github.com/angular/protractor/blob/master/docs/timeouts.md
   */ 
	  browser.ignoreSynchronization = true;
  },
  capabilities: {
    'browserName': 'internet explorer',
    	'platform': 'ANY',
    	'version' : '11'
  },
  framework: 'jasmine',
  specs: ['integration/scenarios/**/*.test.js'],
  jasmineNodeOpts: {
    defaultTimeoutInterval: 30000
  }
};
