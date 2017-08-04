exports.config = {
    framework: 'jasmine',
     seleniumAddress: 'http://localhost:4444/wd/hub',
    
    specs: ['integration/scenarios/aarphmo/aarp.471PersInfo.test.js'],
    //specs: ['integration/scenarios/051217_E2E_POM_Workflow.js'],

    suites: {
        allaarp: 	'integration/scenarios/aarphmo/*.test.js',
    	
        pers1:[   
        	'integration/scenarios/aarphmo/aarp.471PersInfo.test.js',
         	'integration/scenarios/aarphmo/aarp.483PersInfo.test.js',
        	'integration/scenarios/aarphmo/aarp.489PersInfo.test.js',
        //'integration/scenarios/aarphmo/aarp.504PersInfo.test.js',
          	'integration/scenarios/aarphmo/aarp.507PersInfo.test.js',
        	'integration/scenarios/aarphmo/aarp.519PersInfo.test.js',
         //	'integration/scenarios/aarphmo/aarp.720PersInfo.test.js',
         //	'integration/scenarios/aarphmo/aarp.804PersInfo.test.js'
    	],
    			  	
    	pers2:[	
    	], 

    	deps:[   
    	],

    	facs:[	
    	],

    	payment:[ 	
    	],

    	e2e:[	
        	'integration/scenarios/aarphmo/aarp.1768_E2E_WrkFlo_1.test.js',
        	'integration/scenarios/aarphmo/aarp.1408E2E_WrkFlow1.test.js',
        	'integration/scenarios/aarphmo/aarp.1746AarpHMO_WrkFlow1.test.js',
        	'integration/scenarios/aarphmo/aarp.1461AarpHMO_WrkFlow2.test.js',
        	'integration/scenarios/aarphmo/aarp.1753AarpHMO_WrkFlow4.test.js',
        	'integration/scenarios/aarphmo/aarp.1754AarpHMO_WrkFlow5.test.js',
        	'integration/scenarios/aarphmo/aarp.1755AarpHMO_WrkFlow6.test.js'
    	]
    			
    },

    
// C:\DD_Repos\dd-cx-test\node_modules\protractor\node_modules\webdriver-manager\selenium    
//  I am beginnign to see the value of the local installation and having a uniform configuraiton 
//  Across all the users installations.  The proper locaiton of Local drivers
    seleniumServerJar:  __dirname + '\\node_modules\\protractor\\node_modules\\webdriver-manager\\selenium\\selenium-server-standalone-3.4.0.jar',
    chromeDriver:       __dirname + '\\node_modules\\protractor\\node_modules\\webdriver-manager\\selenium\\chromedriver_2.30.exe',
    geckodriver:        __dirname + '\\node_modules\\protractor\\node_modules\\webdriver-manager\\selenium\\geckodriver-v0.18.0.exe',
    

    
//   	// Chrome capabilities
     capabilities: {
      browserName: 'chrome',
       chromeOptions: {
           'args': ['disable-infobars']
                       }
    	},
	
	
  	// Firefox capabilities
//  	 capabilities: {      
//        browserName: 'firefox',
//  	   acceptInsecureCerts:true
//        },
	  
    
    
//  	// InterNet Explorer
// 	 capabilities: {      
// 	    'browserName': 'internet explorer',
// 	    'platform': 'ANY',
// 	   'version': '11',
// 	  'nativeEvents': false,
// 	  'unexpectedAlertBehaviour': 'accept',
// 	  'ignoreProtectedModeSettings': true,
// 	  'enablePersistentHover': true,
// 	  'disable-popup-blocking': true,
// 	  'ignoreZoomSetting': true
//       },

    localSeleniumStandaloneOpts: {   //  is this at all useful ?????
        jvmArgs: ["-Dwebdriver.gecko.driver=C:\\DD_Repos\\dd-cx-test\\node_modules\\protractor\\node_modules\\webdriver-manager\\selenium\\geckodriver-v0.17.0.exe"]
      },
    
    params: {
        //baseUrl: ''
          baseUrl:'https://aw-lx0176.deltadev.ent:3000/enroll/',
        //baseUrl:'https://mot.deltadentalins.com/enroll',
        //baseUrl:'https://mot.deltadentalins.com',
    	  exeInspDelay:'', // Command Line controllable sleep variable for running Debug Inspections
    	  exeLogging:'OFF'  // other: INFO, TRACE, DEBUG
    },

    onPrepare: function() {
        minWait = 1000;
        maxWait = 2000;
        longWait = 40000;
        PAGELOADTIME = 60000;
        //browser.manage().window().maximize();
        browser.manage().window().setSize(1000,1250);
        browser.executeScript("document.body.style.zoom='50%';");
        browser.ignoreSynchronization = true;
        folderName = (new Date()).toString().split('').splice(1, 4).join('');
        require("./integration/utils/element-finder-extensions.js");
      
        Utility = new(require("./integration/utils/common.js"));
        dataProvider = require('jasmine-data-provider');
        log4js = require('log4js');
        log4js.configure({ appenders: 
        	[ { type: 'console' }, 
        	  { type: 'file', 
        		filename: 'results/logs/executionLog.log', 
        		category: 'Delta' } 
        	] });
        	  
        logger = log4js.getLogger('Delta');
        logger.setLevel(browser.params.exeLogging);
        // var monthMap = {  // Configs went here  moved below 

    },
    resultJsonOutputFile: 'results.json',
    jasmineNodeOpts: {
    	//includeStackTrace : false,
        showColors: true, // Use colors in the command line report.
        defaultTimeoutInterval: 10 * 60000

    }
}


////////////////////////////////////////////////////////////////
//Config Archive: stuff thats been commented out for some time
////////////////////////////////////////////////////////////////


//	
//5/8/17 review and act.
//I don't remember if it was Hyderabad team of myself
//who added these options then commented out.
//but as you can see I now need some args implemented
//-- I don't need them: if Hyd team doesn't need then delete --
//chromeOptions: {
//  args: [
//      "--headless",
//      "--disable-gpu"
//  ],
//},

//var monthMap = {
//  "1": "Jan",
//  "2": "Feb",
//  "3": "Mar",
//  "4": "Apr",
//  "5": "May",
//  "6": "Jun",
//  "7": "Jul",
//  "8": "Aug",
//  "9": "Sep",
//  "10": "Oct",
//  "11": "Nov",
//  "12": "Dec"
//};
//var currentDate = new Date(),
//  currentHoursIn24Hour = currentDate.getHours(),
//  currentTimeInHours = currentHoursIn24Hour > 12 ? currentHoursIn24Hour - 12 : currentHoursIn24Hour,
//  totalDateString = currentDate.getDate() + '-' + monthMap[currentDate.getMonth()] + '-' + (currentDate.getYear() + 1900) +
//  '-' + currentTimeInHours + 'h-' + currentDate.getMinutes() + 'm';

//var Jasmine2HtmlReporter = require('protractor-jasmine2-html-reporter');
//jasmine.getEnv().addReporter(new Jasmine2HtmlReporter({
//  savePath: 'results/' + totalDateString + '/html-reports/',
//  screenshotsFolder: 'images',
//  showColors: true,
//  includeStackTrace: true,
//  takeScreenshotsOnlyOnFailures: true,
//  fileNameDateSuffix: true,
//  defaultTimeoutInterval: 10 * 60000

//}));


// Other config details
//
//baseUrl:'http://aw-lx0076.deltadev.ent/directory-search.html',
//baseUrl:'http://aw-lx0076.deltadev.ent:3000/enroll/',


//  Wrong path.  Needed to a protractor path.  see above
//seleniumServerJar: 'C:\\DD_Repos\\dd-cx-test\\node_modules\\webdriver-manager\\selenium\\selenium-server-standalone-2.53.1.jar',
//chromeDriver:      'C:\\DD_Repos\\dd-cx-test\\node_modules\\webdriver-manager\\selenium\\chromedriver_2.25',
//geckodriver:       'C:\\ DD_Repos\\dd-cx-test\\node_modules\\webdriver-manager\\selenium\\geckodriver-v0.9.0',

//seleniumServerJar: __dirname + '\\node_modules\\protractor\\node_modules\\webdriver-manager\\selenium\\selenium-server-standalone-3.4.0.jar',
//chromeDriver: __dirname + '\\node_modules\\protractor\\node_modules\\webdriver-manager\\selenium\\chromedriver_2.30',
//geckodriver: __dirname + '\\node_modules\\protractor\\node_modules\\webdriver-manager\\selenium\\geckodriver-v0.17.0',

//Global path addresses
//seleniumServerJar: 'C:\\Users\\DCA60212\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\webdriver-manager\\selenium\\selenium-server-standalone-3.4.0.jar',
//chromeDriver: 'C:\\Users\\DCA60212\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\webdriver-manager\\selenium\\chromedriver_2.29',
//geckodriver: 'C:\\Users\\DCA60212\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\webdriver-manager\\selenium\\geckodriver-v0.16.1',

