/*****************************************************************
 *  Protractor.conf.js  This is the default protractor execution 
 *  configuration file.  
 *  4/6/18
 *  More about this file in the future
 *
 *  4/6/18 New Rule.  If code is comment out and pushed to the 
 *  repository, it must be accompanied with a comment as to why
 *  its commented out.
 *
 *  4/6/18 Additionally I am beginning to comment what needs it
 *
 */

var mkdirp = require('mkdirp');
var rmdir = require('rimraf');
var path = require("path");
var suitesFile = require('./suites.js');
var statesFile = require('./states.js');
var testRunRptInternals = require('./rptFileGenerator');
var allStates = statesFile.statesCollection;
var fs = require("fs");
var m = require('moment');

var util = new(require("./integration/utils/common.js"));
util.renameReports();

exports.config = {
    framework: 'jasmine2',
    	suites: suitesFile.suitesCollection,

    // 7_10_2018 Mark need the Specs Line probably for another two weeks
    // specs: ['integration/scenarios/xproduct/pers/471PersInfo.test.js'],  

    // chrome capabilities
    capabilities: {
        browserName: 'chrome',
        shardTestFiles: true,
        maxInstances: 4,
        chromeOptions: {
            'args': ["disable-infobars", "--window-size=800x600"],
            // 'args': ["disable-infobars", "--headless", "--disable-gpu" , "--window-size=800x600"   ], // Enabling script execution in headless mode
            prefs: {
                download: {
                    'prompt_for_download': false,
                    'directory_upgrade': true,
                    'default_directory': process.cwd() + './PDFDownloads/'
                }
            }
        }

    },

    // Firefox/IE Capabilities
    // Enable below capabilities to run scripts on firfox browser

    // capabilities: {
    //     'browserName': 'firefox',
    //     // 'browserName': 'internet explorer',
    //     'platform': 'ANY',
    //     'version': '11',
    //     'nativeEvents': false,
    //     'unexpectedAlertBehaviour': 'accept',
    //     'ignoreProtectedModeSettings': true,
    //     'enablePersistentHover': true,
    //     'disable-popup-blocking': true,
    //     'ignoreZoomSetting': true,
    //     //'acceptInsecureCerts': false,
    //     //  'ie.usePerProcessProxy' : true,
    //     //  'javascriptEnabled' : true,
    //     //  'unexpectedAlertBehaviour' : 'dismiss',
    //     // 'InternetExplorerDriver.IE_ENSURE_CLEAN_SESSION': true,
    //     // 'InternetExplorerDriver.INTRODUCE_FLAKINESS_BY_IGNORING_SECURITY_DOMAINS': true,
    //     // 'ignoreZoomSetting': true,
    //     // 'ignoreProtectedModeSettings': true,

    // },

    params: {
        baseUrl: '',
        exeLogging: 'OFF',
        exeInspDelay: 2000,
        isExecutionFromUI: '',
        testDataEnv: '',
        apiurl: '',
        states: 'oneStateTest', // If nothing is selected, run only for CA and not ALL states
        runtimeDebug: 'somthingForLength' // Testing an Idea [Mark]
    },

    onPrepare: function() {
        minWait = 75;
        maxWait = 150;
        longWait = 2000;
        PAGELOADTIME = 60000;
        product = ['DHMO','DPPO','AHMO', 'APPO'];
        states = [];

        /**
         * Assigning states from states.js file based on commandline argument(Phase1).
         * EX: If user pass cmd arguments like browser.params.states phase1,phase2,phase3, 
         * we are splitting  states argument with separator  "," and assigning states to states array (states =[]) by phase
         * This is used to add all the states supplied  through commandline with multiple phases
         */
        (browser.params.states).split(',').forEach(function(ele) {
            states = states.concat(allStates[ele])
        });

        /****************************************************************
         * Naresh - Enable below states statement and add the states insteadof passing from the cmd
         *****************************************************************/

       // states = ["CA"] // WV,MS,NV,MT,DC,DE

        /******************************************************************
         *  Preparation for execution entry points implement by Dev for
         *  testing purposes.  These test entry points do not go to prod
         */
        if (browser.params.isExecutionFromUI == 'false') {
            isExecutionFromUI = false;
        } else {
            isExecutionFromUI = true;
        };

        /******************************************************************
         *  Control over where the test data is pulled from 
         *  In near future the separation of DIT and MOT test data
         *  will not exist
         */
        testDataEnv = browser.params.testDataEnv;

        /******************************************************************
         * It highlights the element in yellow color before performing any 
         * operation. The idea is, how execution is going on:  
         * Keep it this is good for you.
         */
        highlightElement = true;

        /******************************************************************
         *  Needs an explanation
         *  why do we keep both maximize and setSize 1050 1250 in the same
         *  file
         */
        if (browser.params.apiurl.includes('https')) process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
        browser.manage().timeouts().implicitlyWait(browser.params.exeInspDelay);
        /*Naresh -
         * Instead of setting browser size by pixels, we can call maximize() method.It setthe browser based on current machine screen resolution
         * Mark added "browser.manage().window().setSize(1050, 1250); statement":  Right !  Mark knows this.  Mark didn't want to have his screen
         * realestate consumed completely so he implemented the 1050, 1250 valurs.  What he didn't understand was why you kept both uncommented 
         * I found the file committed to the repo with both values in action.  Seems like only one should be active.  
         * Maybe somethign for another one of those external config files ...... : )
         */
        // browser.manage().window().maximize();
        browser.manage().window().setSize(1050, 1250);
        browser.ignoreSynchronization = true;

        /******************************************************************
         * This is the custom library and builds on top of protractor api.
         * We have implemented wait methods and exception handling methods
         */
        require("./integration/utils/element-finder-extensions.js");

        /******************************************************************
         * Override the jasmine matchers to capture expected and actual values
         * Implemented some custom matchers to ignoring the case
         */
        custommatcher = require('./integration/utils/custom_matcher.js');

        /******************************************************************
         * Framework level reusable functions implemented in common.js file
         */
        Utility = new(require("./integration/utils/common.js"));

        /******************************************************************
         * "assert" node module used in Frisby framework for assertions. 
         */
        assert = require('assert');

        /******************************************************************
         * "frisby" node module is used to test REST api calls
         */
        frisby = require('frisby');

        /******************************************************************
         * "Joi" is one of the module in frisby framework.
         * Using this we can validate fields data types in REST api call response
         */
        Joi = frisby.Joi;

        /******************************************************************
         * "moment" is the date library. 
         * Using this we can get date and time in required format
         */
        moment = require('moment');

        /******************************************************************
         *  Adding timeout in frisby global
         */
        frisby.globalSetup({
            request: {
                headers: {
                    'content-type': 'application/json'
                },
                timeout: (30 * 6000)
            }
        });

        /******************************************************************
         *  "jasmine-data-provider" is used to iterate the set of 
         * statements based on given dataset.
         * This is Key to all UT testing across multiple locations 
         * and  Multiple Client location, Multiple User scenarios
         * Even bigger, this is how we control scalability content testing.
         */
        dataProvider = require('jasmine-data-provider');

        //=============Log4Js Configuration Start =========
        log4js = require('log4js');
        log4js.configure({
            appenders: [
                { type: 'console' },
                { type: 'file', filename: 'results/logs/executionLog.log', category: 'DeltaDental' }
            ]
        });
        logger = log4js.getLogger('DeltaDental');
        logger.setLevel(browser.params.exeLogging);
        //=============Log4Js Configuration End =========//
        //=============Jasmine Logger Started =========//
        var JasmineLogReporter = require('./integration/utils/jasmine-log-reporter');
        jasmine.getEnv().addReporter(new JasmineLogReporter());
        //=============Jasmine Logger End=========//

        /******************************************************************
         *  Needs an explanation
         */
        // Naresh - Generating spec level reports with clear 
        //=============Jasmine Report Start =========//
        var Jasmine2HtmlReporter = require('delta-protractor-jasmine2-html-reporter');
        jasmine.getEnv().addReporter(new Jasmine2HtmlReporter({
            savePath: './Results/',
            takeScreenshots: true,
            takeScreenshotsOnlyOnFailures: true,
            ignoreSkippedSpecs: false,
            consolidate: true,
            consolidateAll: false,
            preserveDirectory: false,
            filePrefix: '_' + moment().format('YYYY-MM-Do-h-mm-ss-a'),
            fileName: 'TestReport',
            defaultTimeoutInterval: 10 * 60000

        }));
        //=============Jasmine Report End =========//   



        //     
    },


    /******************************************************************
    /* Below block will execute one time, after completion of each spec file execution
     * dashBoard.js file generated the consolidated report. 
     */
    onComplete: function() {
        cmd = require('node-cmd');
        cmd.get('node dashBoard.js', function() {});
    },


    /******************************************************************
     * Generates the default jasmine report in .json format. 
     * This is to be kept in place regardless of the reporting modules
     * we develop or implement.
     */
    resultJsonOutputFile: 'results.json',

    // Jasmine framework options
    jasmineNodeOpts: {
        showColors: true, // Use colors in the command line report.
        defaultTimeoutInterval: 100 * 60000

    }

}
/* ****************************************************************************************
 * Uncomment testRunRptInternals()
 * in order to capture Start time, Test Server, Test Host Command Line arguments, etc
 * Note:  This is the proper location right after the last closing brace for this to 
 * run correctly. This is the basis of Marks Reporting
 ******************************************************************************************/
// testRunRptInternals();

//How to Run Script


// PD suite on dit env       => npm run pddit -- --suite=pd2_4
// PD suite on mot env       => npm run pdmot -- --suite=pd2_4

//Run the script from /get-a-quote  URL
// npm run buydit -- --suite=xproduct --params.states phase1
// npm run buymot -- --suite=xproduct --params.states phase1

