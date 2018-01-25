var mkdirp = require('mkdirp');
var rmdir = require('rimraf');
var path = require("path");
var suitesFile = require('./suites.js');


exports.config = {
    framework: 'jasmine2',
    specs: ['./integration/scenarios/dhmo/507PersInfo.test.js'],
    suites: suitesFile.suitesCollection,

    //'./integration/scenarios/dhmo/507PersInfo_Updated.test.js'

    // seleniumServerJar: __dirname + '\\node_modules\\protractor\\node_modules\\webdriver-manager\\selenium\\selenium-server-standalone-3.4.0.jar',
    // chromeDriver: __dirname + '\\node_modules\\protractor\\node_modules\\webdriver-manager\\selenium\\chromedriver_2.30.exe',
    // geckodriver: __dirname + '\\node_modules\\protractor\\node_modules\\webdriver-manager\\selenium\\geckodriver-v0.17.0.exe',


    // chrome capabilities
    capabilities: {
        browserName: 'chrome',
        shardTestFiles: true,
        maxInstances: 1,
        chromeOptions: {
            'args': ["disable-infobars"],
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

    beforeLaunch: function () {
        mkdirp('./PDFDownloads/', function (err) { });
    },


    params: {
        baseUrl: '',
        exeLogging: 'OFF',
        exeInspDelay: 2000,
        isExecutionFromUI: '',
        testDataEnv: '',
        apiurl: '',
	runtimeDebug: 'somthingForLength'   // Testing an Idea
        //  apiurl: 'http://aw-lx0195:19002/providers'
        //  apiurl: 'https://mot-cxservices:8443/providers'

    },


    onPrepare: function () {
        minWait = 1000;
        maxWait = 2000;
        longWait = 40000;
        PAGELOADTIME = 60000;

         product =['DHMO','DPPO','AHMO','APPO']; 
         states =['CA', 'TX', 'PA', 'FL','NY'];
// var product = ['DHMO','DPPO','AHMO','APPO']; 
// var states = ['CA', 'TX', 'PA', 'FL','NY'];


        if (browser.params.isExecutionFromUI == 'false') {
            isExecutionFromUI = false;
        } else {
            isExecutionFromUI = true;
        };
        testDataEnv = browser.params.testDataEnv;
        testExecutionEnv = 'staging';
        highlightElement = true;
        if (browser.params.apiurl.includes('https')) process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
        browser.manage().timeouts().implicitlyWait(browser.params.exeInspDelay);
        browser.manage().window().maximize();
        browser.manage().window().setSize(1050, 1250);
        browser.ignoreSynchronization = true;
        folderName = (new Date()).toString().split('').splice(1, 4).join('');
        require("./integration/utils/element-finder-extensions.js");
        custommatcher = require('./integration/utils/custom_matcher.js');
        Utility = new (require("./integration/utils/common.js"));
        assert = require('assert');
        frisby = require('frisby');
         moment = require('moment');
        frisby.globalSetup({
            request: {
                headers: {
                    'content-type': 'application/json'
                }, timeout: (30 * 6000)
            }
        });
        dataProvider = require('jasmine-data-provider');
        // AllureReporter = require('jasmine-allure-reporter');

        log4js = require('log4js');
        log4js.configure({
            appenders: [
                { type: 'console' },
                { type: 'file', filename: 'results/logs/executionLog.log', category: 'DeltaDental' }
            ]
        });
        logger = log4js.getLogger('DeltaDental');
        logger.setLevel(browser.params.exeLogging);
        //========================================
        monthMap = {
            "1": "Jan",
            "2": "Feb",
            "3": "Mar",
            "4": "Apr",
            "5": "May",
            "6": "Jun",
            "7": "Jul",
            "8": "Aug",
            "9": "Sep",
            "10": "Oct",
            "11": "Nov",
            "12": "Dec"
        };
        currentDate = new Date(),
            currentHoursIn24Hour = currentDate.getHours(),
            currentTimeInHours = currentHoursIn24Hour > 12 ? currentHoursIn24Hour - 12 : currentHoursIn24Hour;
        // totalDateString = currentDate.getDate() + '-' + monthMap[currentDate.getMonth()] + '-' + (currentDate.getYear() + 1900) +
        //     '-' + currentTimeInHours + 'h-' + currentDate.getMinutes() + 'm' + currentDate.getSeconds() + 's';
        totalDateString = (currentDate.getYear() + 1900) + '-' + (currentDate.getMonth() + 1) + '-' + currentDate.getDate() + '-' + currentTimeInHours + currentDate.getMinutes();

        var JasmineLogReporter = require('./integration/utils/jasmine-log-reporter');
        jasmine.getEnv().addReporter(new JasmineLogReporter());

        //  ==================================
        var Jasmine2HtmlReporter = require('delta-protractor-jasmine2-html-reporter');
        jasmine.getEnv().addReporter(new Jasmine2HtmlReporter({
            savePath: './Results/',
            takeScreenshots: true,
            takeScreenshotsOnlyOnFailures: true,
            ignoreSkippedSpecs: false,
            consolidate: true,
            consolidateAll: false,
            preserveDirectory: false,
            filePrefix: '_' + totalDateString,
            fileName: 'TestReport',
            defaultTimeoutInterval: 10 * 60000

        }));
        //==================
        //========================

        // Allure reporter

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

        //=========================
    },
    onComplete: function () {
        cmd = require('node-cmd');
        cmd.get('node dashBoard.js', function () { });
        // cmd.get('node killProcess.js', function () { });

    },

    // onComplete: function() {
    //     cmd = require('node-cmd');
    //     cmd.run('allure-report.bat');        
    // },

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
 // AARP suite on dit env     => npm run acqdit -- --suite=ahe2e
 // AARP suite on mot env     => npm run acqmot -- --suite=ahe2e
 // DELTA suite on dit env    => npm run acqdit -- --suite=dhe2e
 // DELTA suite on mot env    => npm run acqmot -- --suite=dhe2e
 // Shopping suite on dit env => npm run spdit -- --suite=buy2shop
 // Shopping suite on mot env => npm run spmot -- --suite=buy2shop
