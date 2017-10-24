exports.config = {
    framework: 'jasmine',
    // seleniumAddress: 'http://localhost:4444/wd/hub',
    
    //specs: ['integration/scenarios/providers/cxinit2.811.test.js'],
    specs: ['integration/scenarios/providers/L7_trainBlock_Test.js'],

    suites: {
       
	    all: ['integration/scenarios/providers/*.test.js', ],
    	

	pd1146:  'integration/scenarios/providers/cxinit2-1146.test.js',
	pd1207:  'integration/scenarios/providers/cxinit2-1207.test.js',
	

	allEnd:[
		'integration/scenarios/providers/cxinit2-1146.test.js',
		'integration/scenarios/providers/cxinit2-1207.test.js',
		],
	
    },

    
    seleniumServerJar:  __dirname + '\\node_modules\\protractor\\node_modules\\webdriver-manager\\selenium\\selenium-server-standalone-3.4.0.jar',
    chromeDriver:       __dirname + '\\node_modules\\protractor\\node_modules\\webdriver-manager\\selenium\\chromedriver_2.30.exe',
    geckodriver:        __dirname + '\\node_modules\\protractor\\node_modules\\webdriver-manager\\selenium\\geckodriver-v0.18.0.exe',
    

    
     capabilities: {
      browserName: 'chrome',
       chromeOptions: {
           'args': ['disable-infobars']
                       }
    	},
	

    
    params: {
       // baseUrl: '',
	// baseUrl:'https://www.deltadentalins.com/find-a-dentist/alpha/directory-search.html',
    baseUrl: 'http://aw-lx0176.deltadev.ent/find-a-dentist/alpha/',
    	  exeInspDelay:'', // Command Line controllable sleep variable for running Debug Inspections
    	  exeLogging:'OFF'  // other: INFO, TRACE, DEBUG
    },

    onPrepare: function() {
        minWait = 75
        maxWait = 120;
        longWait = 1200;
        PAGELOADTIME = 60000;
	isExecutionFromUI = false;	
	testDataEnv='mot'
        //browser.manage().window().maximize();
        browser.manage().window().setSize(1050,1250);
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
    //resultJsonOutputFile: 'results.json',
    resultJsonOutputFile: 'pdMot_results.json',
    jasmineNodeOpts: {
    	//includeStackTrace : false,
        showColors: true, // Use colors in the command line report.
        defaultTimeoutInterval: 10 * 60000

    }
    
}  ////  logical end of the spec conf



