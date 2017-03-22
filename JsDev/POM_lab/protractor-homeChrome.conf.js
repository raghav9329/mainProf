// conf.js execute via bash alias ppcc
exports.config = {
 //baseURL: 'http://dit3.deltadentalins.com/',
 // baseURL: 'http://www.deltadentalins.com/',
  framework: 'jasmine',
 //directConnect: true,
 //seleniumAddress: 'http://localhost:4444/wd/hub',
specs: ['./startGetQuote.js'],
  
  seleniumServerJar: 'C:\\Users\\Owner\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\webdriver-manager\\selenium\\selenium-server-standalone-2.53.1.jar',
  chromeDriver: 'C:\\Users\\Owner\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\webdriver-manager\\selenium\\chromedriver_2.26',
  geckodriver:  'C:\\Users\\Owner\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\webdriver-manager\\selenium\\geckodriver-v0.12.0',


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
	// browserName: 'firefox'
  },
params: {
	baseUrl: 'http://www.deltadentalins.com'
  }

}
