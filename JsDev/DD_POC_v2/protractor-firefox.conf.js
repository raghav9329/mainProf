// conf.js execute via bash alias ppff
exports.config = {
  framework: 'jasmine',
  //directConnect: true,
  //seleniumAddress: 'http://localhost:4444/wd/hub',
  //specs: ['DDCX-HP-5Pg2Dp.test.js'],
  //specs: ['./integration/scenarios/DDCX-HP-5Pg2Dp.test.js'],
  //specs: ['integration/scenarios/CAA50Senior_Single.test.js'],
  specs: ['integration/scenarios/CAA55PlanSelect.test.js'],
  
  //seleniumServerJar: './node_modules/webdriver-manager/selenium/selenium-server-standalone-2.53.1.jar',
  seleniumServerJar:  __dirname + '\\node_modules\\protractor\\node_modules\\webdriver-manager\\selenium\\selenium-server-standalone-3.4.0.jar',
  chromeDriver:       __dirname + '\\node_modules\\protractor\\node_modules\\webdriver-manager\\selenium\\chromedriver_2.30.exe',
  geckodriver:        __dirname + '\\node_modules\\protractor\\node_modules\\webdriver-manager\\selenium\\geckodriver-v0.18.0.exe',
  onPrepare: function(){
   browser.driver.manage().window().setSize(950,950);
   browser.ignoreSynchronization = true;
  },
capabilities: {
	browserName: 'firefox'
  },
  
//  resultJsonOutputFile: 'reports/integration/result.json'
  resultJsonOutputFile: 'result.json'
}
