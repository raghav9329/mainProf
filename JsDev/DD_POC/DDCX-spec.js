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
    browser.sleep(250);
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
  		browser.sleep(250);
		zipField.sendKeys("94949");
		browser.sleep(150);
		howManyWillBeCovered.sendKeys("2");
		commitSearch4Plans_go.click();
		browser.sleep(250);
		
		this.enrol1_button = element(by.css('.primaryBtn '));
		
		this.enrol1_button.getText().then(function (text) {
			console.log('button text is = ', text);
		});
		
		if (this.enrol1_button.getText('Enroll'))
			this.enrol1_button.click();	
		
		browser.sleep(250);
		//browser.pause();
  });
  
//===================================================================================
  
it('should have nagigated to the Pers Info Page ', function(){
	
// https://dit3.deltadentalins.com/enroll/personal-info	
		browser.sleep(150);
		expect(browser.getCurrentUrl()).toEqual('https://dit3.deltadentalins.com/enroll/personal-info');
		console.log('Pers Info page URL Check complete');
});

it('should fill in the First Name on the Pers Info Page ', function(){
	
		var testString = "atkmhFname";
		browser.sleep(250);	
		var persFname = element(by.id('firstName'));
		browser.sleep(250);	
		//persFname.sendKeys('atkmhFname');
		persFname.sendKeys(testString);
		
		//expect(persFname.getAttribute('value')).toEqual('notTheCorrectValue');
		expect(persFname.getAttribute('value')).toEqual(testString);
		
		console.log('Pers Info-> Fname Complete ');
});		
	
it('should fill in the Last Name on the Pers Info Page ', function(){
		var testString = 'atkmhLname';
		var persLname =  element(by.id('lastName'));
		browser.sleep(250);	
		//persLname.sendKeys('atkmhLname');
		persLname.sendKeys(testString);
		//expect(persFname.getAttribute('value')).toEqual('an_Incorrect_Value');
		expect(persLname.getAttribute('value')).toEqual(testString);
		console.log('Pers Info-> Lname Complete');
});		
		
it('should make a Gender selection of MALE on the Pers Info Page ', function(){		
		//var genderSelect = element(by.css('.gender'));
		var genderSelect = element(by.id('gender'));
		genderSelect.$('[value="Male"]').click();
		console.log('Pers Info-> Gender Complete');
		
});

it('should fill in the Month on the Pers Info Page ', function(){
	
		var bd_Month = element(by.id('month'));
		bd_Month.sendKeys('02');
		console.log('Pers Info-> Month Complete');
		
});

it('should fill in the Day on the Pers Info Page ', function(){
		var bd_Day = element(by.id('day'));
		bd_Day.sendKeys('18');
		console.log('Pers Info-> Day Complete');
});

it('should fill in the Year on the Pers Info Page ', function(){
		
		var bd_Year = element(by.id('year'));
		bd_Year.sendKeys('1958');
		console.log('Pers Info-> Year Complete');
});		
		
		
it('should fill in SSN with a reasonable value', function(){
		var ssn = element(by.id('ssn'));
		ssn.sendKeys('546757867');
		console.log('Pers Info-> SSN');
});		

it('should set the street address value', function(){		
		var street_Addr = element(by.id('streetAddress'));
		street_Addr.sendKeys('40 Alameda De La Loma');
		console.log('Pers Info-> Street Addr');
});		


it('should set the City field to my Address City', function(){		
		
		var city_Addr = element(by.id('city'));
		city_Addr.sendKeys('Novato');
		console.log('Pers Info-> City ');
});		


it('should set the state field to CA', function(){		
		var state_Addr = element(by.id('state'));
		expect(state_Addr.getAttribute('value')).toEqual('CA');
		//state_Addr.sendKeys('CA');
		console.log('Pers Info-> State');
	
});		


it('should set the zip code address I"m using', function(){		
		browser.sleep(250);	
		var zip_Addr = element(by.id('zipCode'));
		expect(zip_Addr.getAttribute('value')).toEqual('94949');
		console.log('Pers Info-> Compare Zip');
	
		// a little weak here: lack of coding description
		// I should add unclicking then reSelecting so the below flows
		// http://stackoverflow.com/questions/27866054/how-to-set-a-radio-button-value-in-protractor
		expect(element(by.id('diffmail')).isSelected()).toBeTruthy()
});		


it('should should select the phone type as HOME', function(){
			
		var phone_Type = element(by.id('contactType'));
		phone_Type.$('[value="HOME"]').click();
		console.log('Pers Info-> Phone Type');
});		


it('should set the phone number', function(){		
		var phone_Number = element(by.id('contactNumber'));
		phone_Number.sendKeys('4155551212');
		console.log('Pers Info-> Phone Number');
});		


it('should set an email id', function(){		
		
		var email_Addr = element(by.id('email'));
		email_Addr.sendKeys('antidisestablishment@somedomain.net');
		console.log('Pers Info-> Email Set');
		
});		


it('should set the broker radio button to YES', function(){		
		var radio_BrokerYes = element(by.id('brokerYes'));
		radio_BrokerYes.click();
		
		browser.sleep(250);		
		console.log('Pers Info-> Broker RadBtn YES');
});		


it('should set the broker radio button to NO', function(){		
	
		var radio_BrokerNo = element(by.id('brokerNo'));
		radio_BrokerNo.click();
		console.log('Pers Info-> Broker RadBtn NO ');
});		


it('should find the PersInfo Next button and click it', function(){		
		//var persInfoNextPage_Button = element(by.id('nextButton')).click();
		persInfoNextPage_Button = element(by.id('nextButton')).click();
		console.log('Pers Info-> Click Next ');
});

//===================================================================================

it('should land on the Dependents page',function(){
	// add the URL check , but for now just move on......
	browser.wait(element(by.id('page-footer')).isPresent());
	browser.sleep(3450);	
	expect(browser.getCurrentUrl()).toEqual('https://dit3.deltadentalins.com/enroll/dependents');
	console.log('Landed on the dependents page: moving to my 1st Dep');
	
});



it('should let me select dependent relationship SPOUSE',function(){
	
		
	var dependent_Relationship = element(by.css('.select-gender'));
	dependent_Relationship.$('[value="Spouse"]').click();
	console.log('Dependent 1 Info-> Dependent Identified');
});

it('should find and set dependent 1 First name', function(){
	var depFName = element(by.id('firstName_1'));
	depFName.sendKeys('SpouseAlphaFname');
	console.log('Dependent 1 Info-> Fname Complete');	
//	should find and set dependent 1 First name
	
});

it('should find and set dependent 1 Last name', function(){	
	var depLName = element(by.id('lastName_1'));
	depLName.sendKeys('AlphaLastName');
	console.log('Dependent 1 Info-> Lname Complete');	
});

it('should find and set dependent 1 Gender to Female  ', function(){	
	var depSpouseGenderSelect = element(by.id('gender_1'));
	depSpouseGenderSelect.$('[value="Female"]').click();
	console.log('Dependent 1 Info-> Gender Selected');	
});

it('should find and set dependent 1 bday Month ', function(){	
	var depBd_Month = element(by.id('month_1'));
	depBd_Month.sendKeys('08');
	console.log('Dependent 1 Info-> Month Complete');	
});

it('should find and set dependent 1 bday Month ', function(){	
	var depBd_Day = element(by.id('day_1'));
	depBd_Day.sendKeys('11');
	console.log('Dependent 1 Info-> Day Complete');
});

it('should find and set dependent 1 bday Year ', function(){	
	var depBd_Year = element(by.id('year_1'));
	depBd_Year.sendKeys('1963');
	console.log('Dependent 1 Info-> Year Complete');	
});


it('should find the Dependent 1 Next button and click it', function(){		
	//var persInfoNextPage_Button = element(by.id('nextButton')).click();
	dependent1NextPage_Button = element(by.id('nextButton')).click();
	console.log('Dependent 1 Info-> Click Next ');
});

it('should find the Overlay Continue button and click Continue', function(){		
	browser.sleep(4450);			
	//var persInfoNextPage_Button = element(by.id('nextButton')).click();
	overlayContinue_Button = element(by.id('overlayContinueBtn')).click();
	console.log('Dependent 1 Info-> Overlay Continue Button Click ');	
});


//===================================================================================

it('should find facility ID DC053682', function() {
	browser.sleep(3450);
	var selectAFacility = element(by.id('DC053682'));
	selectAFacility.click();
	console.log('Facilities Info-> First Facility Selected ');
});

it('should click the next button to commit 1st facility ID   ', function() {	
	browser.sleep(2450);	
	facilitiesNextPage_Button = element(by.id('nextButton')).click();
	console.log('Facilities Info-> Facility 1 Selected Next Button ');
});

it('should find facility ID DC055009', function(){
	browser.sleep(2450);
	var selectAFacility = element(by.id('DC055009'));
	selectAFacility.click();
	console.log('Facilities Info-> Second Facility Selected ');
});

it('should click the next button to commit 2nd facility ID   ', function() {	
	browser.sleep(2450);
	dependent1NextPage_Button = element(by.id('nextButton')).click();
	console.log('Facilities Info-> Facility 2 Selected Next Button ');

	
	browser.pause();
	
});

//===================================================================================





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



