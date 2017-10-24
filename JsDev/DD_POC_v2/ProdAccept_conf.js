exports.config = {
    framework: 'jasmine2',
    // seleniumAddress: 'http://localhost:4444/wd/hub',

     specs:['integration/scenarios/dhmo/Prod_DHMO.test.js','integration/scenarios/dppo/Prod_DPPO.test.js'],


    // seleniumServerJar: __dirname + '\\node_modules\\protractor\\node_modules\\webdriver-manager\\selenium\\selenium-server-standalone-3.4.0.jar',
    // chromeDriver: __dirname + '\\node_modules\\protractor\\node_modules\\webdriver-manager\\selenium\\chromedriver_2.30.exe',
    // geckodriver: __dirname + '\\node_modules\\protractor\\node_modules\\webdriver-manager\\selenium\\geckodriver-v0.18.0.exe',


    params: {
        baseUrl: 'https://deltadentalins.com'
        exeInspDelay: '',
        exeLogging: 'OFF'
    },

    onPrepare: function() {
        minWait = 75;
        maxWait = 120;
        longWait = 1200;
        PAGELOADTIME = 60000;
        isExecutionFromUI = true;
        testDataEnv = 'mot';
        testExecutionEnv = 'staging'
        browser.manage().window().setSize(1050, 1250);
        browser.ignoreSynchronization = true;
        folderName = (new Date()).toString().split('').splice(1, 4).join('');
        require("./integration/utils/element-finder-extensions.js");
        Utility = new(require("./integration/utils/common.js"));
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
        maxInstances: 4,       
        chromeOptions: {
            'args': ["disable-infobars"],
            prefs: {
                download: {
                    'prompt_for_download': false,
                    'directory_upgrade': true,
                    'default_directory': process.cwd() + './PDFDownloads/'
                }
            }
            //'args': ["disable-infobars", "--headless", "--disable-gpu"]
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
        showColors: true, // Use colors in the command line report.
        defaultTimeoutInterval: 10 * 60000

    }
}
