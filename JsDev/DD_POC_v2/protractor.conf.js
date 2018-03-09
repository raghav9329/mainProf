var mkdirp = require('mkdirp');
var rmdir = require('rimraf');
var path = require("path");
var suitesFile = require('./suites.js');
var moment = require('moment');


var allStates = {
    "all": ['CA', 'TX', 'PA', 'FL', 'NY', 'DC', 'LA', 'MD', 'PR', 'TN', 'VI', 'AK', 'AL', 'DE', 'GA', 'MS', 'MT', 'NV', 'UT', 'WV'],
    "phase0": ['CA', 'TX', 'PA', 'FL', 'NY'],
    "phase1": ['DC', 'LA', 'MD', 'PR', 'TN', 'VI', 'AK', 'AL'],
    "phase2": ['DE', 'GA', 'MS', 'MT', 'NV', 'UT', 'WV']
}

exports.config = {
    framework: 'jasmine2',
    suites: suitesFile.suitesCollection,

    // seleniumServerJar: __dirname + '\\node_modules\\protractor\\node_modules\\webdriver-manager\\selenium\\selenium-server-standalone-3.4.0.jar',
    // chromeDriver: __dirname + '\\node_modules\\protractor\\node_modules\\webdriver-manager\\selenium\\chromedriver_2.30.exe',
    // geckodriver: __dirname + '\\node_modules\\protractor\\node_modules\\webdriver-manager\\selenium\\geckodriver-v0.17.0.exe',


    // chrome capabilities
    capabilities: {
        browserName: 'chrome',
        shardTestFiles: true,
        maxInstances: 2,
        chromeOptions: {
               'args': ["disable-infobars", "--window-size=800x600"   ],
            // 'args': ["disable-infobars", "--headless", "--disable-gpu" , "--window-size=800x600"   ],
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

    beforeLaunch: function() {
        rmdir('./PDFDownloads/*.pdf', function(err) {});
        mkdirp('./PDFDownloads/', function(err) {});
    },


    params: {
        baseUrl: '',
        exeLogging: 'OFF',
        exeInspDelay: 2000,
        isExecutionFromUI: '',
        testDataEnv: '',
        apiurl: '',
        states: 'all',
        runtimeDebug: 'somthingForLength' // Testing an Idea
        //  apiurl: 'http://aw-lx0195:19002/providers'
        //  apiurl: 'https://mot-cxservices:8443/providers'

    },



    onPrepare: function() {
        IE_ENSURE_CLEAN_SESSION
        minWait = 75;
        maxWait = 150;
        longWait = 2000;
        PAGELOADTIME = 60000;

        product = ['DHMO', 'DPPO', 'AHMO', 'APPO'];
        states = [];
        (browser.params.states).split(',').forEach(function(ele) {
            states = states.concat(allStates[ele])
        })


        //states = ['CA', 'TX', 'PA', 'FL','NY','DC','LA','MD','PR','TN','VI','AK','AL']; 
        // var product = ['DHMO','DPPO','AHMO','APPO']; 
        // var states = ['CA', 'TX', 'PA', 'FL','NY','DC','LA','MD','PR','TN','VI','AK','DE','GA','MS','MT','NV','UT','WV'];


        if (browser.params.isExecutionFromUI == 'false') {
            isExecutionFromUI = false;
        } else {
            isExecutionFromUI = true;
        };
        testDataEnv = browser.params.testDataEnv;
        testExecutionEnv = 'staging';
        highlightElement = false;
        if (browser.params.apiurl.includes('https')) process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
        browser.manage().timeouts().implicitlyWait(browser.params.exeInspDelay);
        browser.manage().window().maximize();
        browser.manage().window().setSize(1050, 1250);
        browser.ignoreSynchronization = true;
        folderName = (new Date()).toString().split('').splice(1, 4).join('');
        require("./integration/utils/element-finder-extensions.js");
        custommatcher = require('./integration/utils/custom_matcher.js');
        Utility = new(require("./integration/utils/common.js"));
        assert = require('assert');
        frisby = require('frisby');
        moment = require('moment');
        frisby.globalSetup({
            request: {
                headers: {
                    'content-type': 'application/json'
                },
                timeout: (30 * 6000)
            }
        });
        dataProvider = require('jasmine-data-provider');
        // AllureReporter = require('jasmine-allure-reporter');
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

        //=============Allure reporter Start =========//        

        //jasmine.getEnv().addReporter(new AllureReporter());
        // jasmine.getEnv().addReporter(new AllureReporter({
        //     resultsDir: 'node_modules/jasmine-allure-reporter/allure-results'
        // }));
        // jasmine.getEnv().afterEach(function(done) {
        //     browser.takeScreenshot().then(function(png) {
        //         allure.createAttachment('Screenshot', function() {
        //             return new Buffer(png, 'base64')
        //         }, 'image/png')();
        //         done();
        //     })
        // });

        //=============Allure reporter End =========//
    },
    onComplete: function() {
        cmd = require('node-cmd');
        cmd.get('node dashBoard.js', function() {});
        // cmd.get('node killProcess.js', function () { });
        // cmd.run('allure-report.bat');

    },

    resultJsonOutputFile: 'results.json',
    jasmineNodeOpts: {
        showColors: true, // Use colors in the command line report.
        defaultTimeoutInterval: 100 * 60000

    }

}


//How to Run Script

// single spec               => npm run acqmot
// PD suite on dit env       => npm run pddit -- --suite=pd2_4
// PD suite on mot env       => npm run pdmot -- --suite=pd2_4
// AARP suite on dit env     => npm run buydit -- --suite=ahe2e
// AARP suite on mot env     => npm run buymot -- --suite=ahe2e
// DELTA suite on dit env    => npm run buydit -- --suite=dhe2e
// DELTA suite on mot env    => npm run buymot -- --suite=dhe2e
// Shopping suite on dit env => npm run spdit -- --suite=buy2shop
// Shopping suite on mot env => npm run spmot -- --suite=buy2shop


//Run the script from /test URL

//npm run buydittest -- --suite=xproduct
// npm run buymottest -- --suite=xproduct --params.states phase1

//Run the script from hCentive application UI

//npm run buydit -- --suite=xproduct