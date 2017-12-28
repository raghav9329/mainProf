//  here we go : )
//  small edit for git add
var mkdirp = require('mkdirp');
var rmdir = require('rimraf');
var path = require("path");
var suitesFile = require('./suites.js');


exports.config = {
    framework: 'jasmine2',
    // seleniumAddress: 'http://localhost:4444/wd/hub',
    specs: ['integration/scenarios/dhmo/471PersInfo.test.js'],
    suites: suitesFile.suitesCollection,


   // seleniumServerJar: __dirname + '\\node_modules\\protractor\\node_modules\\webdriver-manager\\selenium\\selenium-server-standalone-3.6.0.jar',
   // chromeDriver: __dirname + '\\node_modules\\protractor\\node_modules\\webdriver-manager\\selenium\\chromedriver_2.33.exe',
   // geckodriver: __dirname + '\\node_modules\\protractor\\node_modules\\webdriver-manager\\selenium\\geckodriver-v0.19.0.exe',
 
    beforeLaunch: function() {
        mkdirp('./PDFDownloads/', function(err) {});
    },

    params: {
       
        exeInspDelay: 20, // Command Line controllable sleep variable for running Debug Inspections
        apiurl: 'http://aw-lx0195:19002/providers',
        baseUrl:'https://mot.deltadentalins.com',
        //  exeLogging:'INFO', // Mark's desire to not display logging
        exeLogging: 'OFF',
        isExecutionFromUI: ''
    },

    onPrepare: function() {
        minWait = 75;
        maxWait = 120;
        longWait = 2000;
        PAGELOADTIME = 60000;
       
        // if (browser.params.isExecutionFromUI == 'false') {
        //     isExecutionFromUI = false;
        // } else {
        //     isExecutionFromUI = true;
        isExecutionFromUI = true;
      //browser.manage().window().maximize();
      //testDataEnv = browser.params.testDataEnv;
      //testDataEnv = 'mot';
		testDataEnv = 'dit';
        testExecutionEnv = 'staging';
        highlightElement = true; 
        browser.manage().timeouts().implicitlyWait(browser.params.exeInspDelay);      
        browser.manage().window().setSize(1050, 1250);
        browser.ignoreSynchronization = true;
        folderName = (new Date()).toString().split('').splice(1, 4).join('');
        require("./integration/utils/element-finder-extensions.js");
        custommatcher = require('./integration/utils/custom_matcher.js');
	    Utility = new(require("./integration/utils/common.js"));
        assert = require('assert');
        frisby = require('frisby');
        dataProvider = require('jasmine-data-provider');

        log4js = require('log4js');
        log4js.configure({
            appenders: [{ type: 'console' }, {
                type: 'file', filename: 'results/logs/executionLog.log', category: 'Delta' }
            ]
        });

        logger = log4js.getLogger('DeltaDental');
        logger.setLevel(browser.params.exeLogging);
        // var monthMap = {  // Configs went here  moved below 

    },

    capabilities: {
        browserName: 'chrome',
	//ardTestFiles: true,
        maxInstances: 1,
        chromeOptions: {
            'args': ['disable-infobars'],
             // 'args': ["disable-infobars", "--headless", "--disable-gpu"],
             prefs: {
                download: {
                    'prompt_for_download': false,
                    'directory_upgrade': true,
                    'default_directory': process.cwd() + './PDFDownloads/'
                }
            }
        }
    },


    resultJsonOutputFile: 'results.json',
    jasmineNodeOpts: {
        //includeStackTrace : false,
        showColors: true, // Use colors in the command line report.
        defaultTimeoutInterval: 10 * 60000

    }

}
/////////////////////////////////////////////////////////////////////////////
//  Extra Caricullar Function
// **************************************************************************
var moment		= require('moment');
var fs = require ("fs");
var os = require ("os");

var dateObj		= new Date();  // Get a Date
var formatString = "MM/DD/YYYY HH:mm:ss";


//var then_moment_obj     = moment(dateObj).format("MM/DD/YYYY HH:mm:ss");
var then_moment_obj     = moment(dateObj).format(formatString);

var str_ThenMomentObj	= then_moment_obj.toString();

// debug on
// console.log("testing toString() on the momentObject: " +str_ThenMomentObj);
// console.log("this value should be RIGNT NOW    __    CHECK IT")
// console.log("");
// debug off


// ************** File Creation **********************************************************
// File for Start time: In future when run ends, start will be "then", end will be "now"
// File for the runner Host Name
// File for the command Line Arguments
var fileThenMomentStr	= __dirname + "\\FileThen.txt";
var fileHoseName    	= __dirname + "\\FileHostName.txt";
var fileCmdLineArgs		= __dirname + "\\FileCmdLineArgs.txt";
var fileThisSpecConf    = __dirname + "\\str_cmdLineRptGen.conf.js";
var fileAppServer       = __dirname + "\\FileAppServer.txt";

var bigString           = fs.readFileSync( fileThisSpecConf ).toString();
var start_index         = bigString.indexOf("baseUrl");
var end_index           = bigString.indexOf(',', start_index);
var strAppServer        = bigString.substring( (start_index+9), (end_index-1) );

// Write FileAppServer.txt out to disk
fs.writeFile(fileAppServer, strAppServer, function(error){
	if (error) { console.error("write error: "+error.message);
	} //else { console.log("successful write to "+fileThenMomentStr);
	//}
});


// Write the FileThen.txt out disk
fs.writeFile(fileThenMomentStr, str_ThenMomentObj, function(error){
	if (error) { console.error("write error: "+error.message);
	} //else { console.log("successful write to "+fileThenMomentStr);
	//}
});


// Write the hosename file
var runnerHostName      = os.hostname();
fs.writeFile(fileHoseName, runnerHostName, function(error){
	if (error) { console.error("write error: "+error.message);
	} //else { console.log("successful write to "+fileHoseName);
	//}
});

// Write the command Line Date to file
var specConf            = process.argv[2];  // rename specConf
var suiteExecuted       = process.argv[3];      // rename suiteExecuted
var cmdLineFileData     = specConf+" "+suiteExecuted;
fs.writeFile(fileCmdLineArgs, cmdLineFileData, function(error){
	if (error) { console.error("write error: "+error.message);
	}// else { console.log("successful write to "+fileCmdLineArgs);
	//}
});

console.log("Files Complete")
// ?? are we done ??
//  WE ARE DONE !

// EndOfFile
