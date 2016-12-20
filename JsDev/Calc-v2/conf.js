// conf.js
exports.config = {
  framework: 'jasmine',
  //seleniumAddress: 'http://localhost:4444/wd/hub',
  specs: ['spec.js'],
  seleniumServerJar: './node_modules/webdriver-manager/selenium/selenium-server-standalone-2.53.1.jar',
  chromeDriver: './node_modules/webdriver-manager/selenium/chromedriver_2.25',
  onPrepare: function(){
   browser.driver.manage().window().setSize(450,650);
  }
}
