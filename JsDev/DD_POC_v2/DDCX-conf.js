// conf.js
exports.config = {
  framework: 'jasmine',
  directConnect: true,
  //seleniumAddress: 'http://localhost:4444/wd/hub',
  //seleniumAddress: 'http://localhost:7055/wd/hub',
  specs: ['DDCX-spec.js'],
  //seleniumServerJar: './node_modules/webdriver-manager/selenium/selenium-server-standalone-2.53.1.jar',
  seleniumServerJar: 'C:\\Users\\CA60212\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\webdriver-manager\\selenium\\selenium-server-standalone-2.53.1.jar',
  //chromeDriver: './node_modules/webdriver-manager/selenium/chromedriver_2.25',
  chromeDriver: 'C:\\Users\\CA60212\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\webdriver-manager\\selenium\\chromedriver_2.26',
  geckodriver: 'C:\\Users\\CA60212\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\webdriver-manager\\selenium\\geckodriver-v0.12.0',
  onPrepare: function(){
   browser.driver.manage().window().setSize(950,950);
  },
capabilities: {
	  browserName: 'firefox'
  }
}
