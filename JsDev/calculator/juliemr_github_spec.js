// spec.js  
describe('Protractor Demo App', function() {
  var firstNumber = element(by.model('first'));
  var secondNumber = element(by.model('second'));
  var goButton = element(by.id('gobutton'));
  var latestResult = element(by.binding('latest'));

  beforeEach(function() {
    //recho "Second Echo stmt added... first below in src"
    console.log("Output: beforeEach(function()...  Also call made to URL prot-demo");
    browser.get('http://juliemr.github.io/protractor-demo/');
  });
  
  afterEach(function() {
  //  console.log("Output: afterEach(function()...");
  //  browser.pause();
    console.log("Output: browser.sleep(2500)" );
    browser.sleep(2500);
  });

  it('should have a title', function() {
    expect(browser.getTitle()).toEqual('Super Calculator');
  });

  it('should add one and two', function() {
    firstNumber.sendKeys(1);
    secondNumber.sendKeys(2);

    goButton.click();

    expect(latestResult.getText()).toEqual('3');
  });

  it('should add four and six', function() {
    firstNumber.sendKeys(4);
    secondNumber.sendKeys(6);


    firstNumber.sendKeys(18);
    secondNumber.sendKeys(26);


    goButton.click();
    //expect(latestResult.getText()).toEqual('10');
    expect(latestResult.getText()).toEqual('1044');
  });
});
