 var mkdirp = require('mkdirp');
 var rmdir = require('rimraf');
 var path = require('path');
 var suitesFile = require('./suites.js');
 exports.config = {
     framework: 'jasmine2',
     // seleniumAddress: 'http://localhost:4444/wd/hub',

     //specs: ['integration/scenarios/cxinit/*.test.js'],
     // specs: ['integration/scenarios/*.js', 'integration/scenarios/cxinit/*.js', 'integration/scenarios/aarphmo/*.js'],

	suites: suitesFile.suitesCollection,


     seleniumServerJar: __dirname + '\\node_modules\\protractor\\node_modules\\webdriver-manager\\selenium\\selenium-server-standalone-3.6.0.jar',
     chromeDriver: __dirname + '\\node_modules\\protractor\\node_modules\\webdriver-manager\\selenium\\chromedriver_2.33.exe',
     geckodriver: __dirname + '\\node_modules\\protractor\\node_modules\\webdriver-manager\\selenium\\geckodriver-v0.19.0.exe',

     beforeLaunch: function() {
         mkdirp('./PDFDownloads/', function(err) {});
     },


     params: {
         //  baseUrl: '' ,  // running this allows you to enter URL at command line
         // baseUrl: 'https://aw-lx0176.deltadev.ent:3000/enroll/',
         // baseUrl: 'http://aw-lx0101.deltadev.ent',
         // baseUrl: 'https://mot.deltadentalins.com/enroll/delta/test',
         baseUrl: 'https://mot.deltadentalins.com',
         exeLogging: 'OFF',
         exeInspDelay: 2000,
         isExecutionFromUI: '',
         testDataEnv: '',
         apiurl: 'http://aw-lx0195:19002/providers'
     },

     onPrepare: function() {
         minWait = 75;
         maxWait = 120;
         longWait = 1200;
         PAGELOADTIME = 60000;        
         isExecutionFromUI = true;
         testDataEnv = 'mot';
         testExecutionEnv = 'staging';
         browser.manage().window().setSize(1050, 1250);
         browser.ignoreSynchronization = true;
         folderName = (new Date()).toString().split('').splice(1, 4).join('');
         require("./integration/utils/element-finder-extensions.js");

         Utility = new(require("./integration/utils/common.js"));
         assert = require('assert');
         frisby = require('frisby');
         dataProvider = require('jasmine-data-provider');

         log4js = require('log4js');
         log4js.configure({
             appenders: [{ type: 'console' }, {
                 type: 'file',
                 filename: 'results/logs/executionLog.log',
                 category: 'Delta'
             }]
         });

         logger = log4js.getLogger('Delta');
         logger.setLevel(browser.params.exeLogging);
     },

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
         // ======================================= 
         //  browserName: 'firefox',
         //  acceptInsecureCerts:true

         // =======================================

         //  browserName: 'internet explorer',
         //  platform: 'ANY',
         //  version: '11',
         //  nativeEvents: false,
         //  unexpectedAlertBehaviour: 'accept',
         //  ignoreProtectedModeSettings: true,
         //  enablePersistentHover: true,
         //  disable-popup-blocking: true,
         //  ignoreZoomSetting: true
     },


     resultJsonOutputFile: 'results.json',
     jasmineNodeOpts: {
         //includeStackTrace : false,
         showColors: true, // Use colors in the command line report.
         defaultTimeoutInterval: 10 * 60000

     }
 }
