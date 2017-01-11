// spec.jsG

describe('Protractor Demo App', function() {


  browser.ignoreSynchronization = true;
 // var getAQuoteButton = element(by.css('.button'));
  var zipField = element(by.id("zip"));
  var howManyWillBeCovered = element(by.id('coverage_type'));
  var commitSearch4Plans_go = element(by.id('btn_saveBig'));
  var firstEnrollButton = element(by.id('applyQuotesPage'));

  browser.get('http://dit3.deltadentalins.com/');

// onPrepare: 
  beforeEach(function() {
    //recho "Second Echo stmt added... first below in src"
    //console.log("Output: beforeEach(function()...  Also call made to URL prot-demo");
    //browser.get('http://dit3.deltadentalins.com/');
  });
  
  afterEach(function() {
    browser.sleep(450);
  });
  
  it('should have a title', function() {
    expect(browser.getTitle()).toEqual('Delta Dental Insurance');
    console.log("getTitle = Delta Dental Insurance")
  });

  it('should find Get A Quote button and click it', function() {
		// var getAQuoteButton = element(by.css('.button'));
		//browser.sleep(250);
		
		//expect(getAhhQuoteButton.getText()).toEqual('Get A Quote');
		// the following technique for getting the button text and checking it
		// was from 
		//http://stackoverflow.com/questions/30702111/getting-the-button-text-in-protractor
		this.getAQuote_button = element(by.css('.button'));
		
		this.getAQuote_button.getText().then(function (text) {
			console.log('button text is = ', text);
		});
		
		if (this.getAQuote_button.getText('Get A Quote'))
			this.getAQuote_button.click();
		
  });	
		
	it('should land on the zip and quantity dialog ', function() {
  		browser.sleep(450);
		zipField.sendKeys("94949");
		browser.sleep(150);
		howManyWillBeCovered.sendKeys("2");
		commitSearch4Plans_go.click();
		browser.sleep(450);
		
		this.enrol1_button = element(by.css('.primaryBtn '));
		
		this.enrol1_button.getText().then(function (text) {
			console.log('button text is = ', text);
		});
		
		if (this.enrol1_button.getText('Enroll'))
			this.enrol1_button.click();	
		
		browser.sleep(450);
		//browser.pause();
  });
  

  
it('it should have nagigated to the Pers Info Page ', function(){
	
// https://dit3.deltadentalins.com/enroll/personal-info	
		browser.sleep(150);
		expect(browser.getCurrentUrl()).toEqual('https://dit3.deltadentalins.com/enroll/personal-info');
		console.log('Pers Info page URL Check complete');
});

it('it should fill in the First Name on the Pers Info Page ', function(){
	
		var testString = "atkmhFname";
		browser.sleep(450);	
		var persFname = element(by.id('firstName'));
		browser.sleep(450);	
		//persFname.sendKeys('atkmhFname');
		persFname.sendKeys(testString);
		
		//expect(persFname.getAttribute('value')).toEqual('notTheCorrectValue');
		expect(persFname.getAttribute('value')).toEqual(testString);
		
		console.log('Pers Info-> Fname Complete ');
});		
	
it('it should fill in the Last Name on the Pers Info Page ', function(){
		var testString = 'atkmhLname';
		var persLname =  element(by.id('lastName'));
		browser.sleep(450);	
		//persLname.sendKeys('atkmhLname');
		persLname.sendKeys(testString);
		
		//expect(persFname.getAttribute('value')).toEqual('an_Incorrect_Value');
		expect(persFname.getAttribute('value')).toEqual(testString);
		
		
		console.log('Pers Info-> Lname Complete');
});		
		
it('it should make a Gender selection of MALE on the Pers Info Page ', function(){		
		//var genderSelect = element(by.css('.gender'));
		var genderSelect = element(by.id('gender'));
		genderSelect.$('[value="Male"]').click();
		console.log('Pers Info-> Gender Complete');
		
});

it('it should fill in the Month on the Pers Info Page ', function(){
	
		var bd_Month = element(by.id('month'));
		bd_Month.sendKeys('02');
		console.log('Pers Info-> Month Complete');
		
});

it('it should fill in the Day on the Pers Info Page ', function(){
		var bd_Day = element(by.id('day'));
		bd_Day.sendKeys('18');
		console.log('Pers Info-> Day Complete');
		
});

it('it should fill in the Year on the Pers Info Page ', function(){
		
		var bd_Year = element(by.id('year'));
		bd_Year.sendKeys('1958');
		console.log('Pers Info-> Year Complete');
		
		
		
		
		var ssn = element(by.id('ssn'));
		ssn.sendKeys('123456789');
		console.log('Pers Info-> SSN');
		
		
		
		var street_Addr = element(by.id('streetAddress'));
		street_Addr.sendKeys('40 Alameda De La Loma');
		console.log('Pers Info-> Street Addr');
		
		
		
		var city_Addr = element(by.id('city'));
		city_Addr.sendKeys('Novato');
		console.log('Pers Info-> City ');
		
		
		
		var state_Addr = element(by.id('state'));
		expect(state_Addr.getAttribute('value')).toEqual('CA');
		//state_Addr.sendKeys('CA');
		console.log('Pers Info-> State');
		
	
		
		
		browser.sleep(450);	
		
		var zip_Addr = element(by.id('zipCode'));
		expect(zip_Addr.getAttribute('value')).toEqual('94949');
		console.log('Pers Info-> Compare Zip');
	
		// a little weak here: lack of coding description
		// I should add unclicking then reSelecting so the below flows
		// http://stackoverflow.com/questions/27866054/how-to-set-a-radio-button-value-in-protractor
		expect(element(by.id('diffmail')).isSelected()).toBeTruthy()
		

			
		var phone_Type = element(by.id('contactType'));
		phone_Type.$('[value="HOME"]').click();
		console.log('Pers Info-> Phone Type');
		
		
		var phone_Number = element(by.id('contactNumber'));
		phone_Number.sendKeys('4155551212');
		console.log('Pers Info-> Phone Number');
		
		var email_Addr = element(by.id('email'));
		email_Addr.sendKeys('antidisestablishment@somedomain.net');

		var radio_BrokerYes = element(by.id('brokerYes'));
		radio_BrokerYes.click();
		
		browser.sleep(850);		
		
		
	
		var radio_BrokerNo = element(by.id('brokerNo'));
		radio_BrokerNo.click();
		
		
		
		//expect(getAhhQuoteButton.getText()).toEqual('Get A Quote');

//browser.pause();
});



});// end of main Describe Protractor Demo Appi


//===================================================================================
/*  Local Repo of lost / unused / unnecessary code
 * 
 *    it('should have a title', function() {
    expect(browser.getTitle()).toEqual('Individual & Families');
    console.log("Individual & Families page");
  });
 * 
 * 
 *	var some_string = 'Personal Info | Enrollment | Delta Dental Insurance Company';
	my_title = browser.getTitle();
	some_name = browser.getTitle().then(function(webpagetitle){
      if (webpagetitle === 'Personal Info | Enrollment | Delta Dental Insurance Company'){
        return 'ERROR';
      }else{
        return 'Personal Info | Enrollment | Delta Dental Insurance Company'
      } 
    });
	
	console.log(some_name);
	expect(some_name).toEqual('Personal Info | Enrollment | Delta Dental Insurance Company');
   
	browser.pause(); 

 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 */



