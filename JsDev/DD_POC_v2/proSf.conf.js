exports.config = {
    framework: 'jasmine',
    // seleniumAddress: 'http://localhost:4444/wd/hub',

    specs: ['integration/scenarios/cxinit/cxinit.507C.test.js'],

//    suites: {
//        CXINIT507A: 'integration/scenarios/cxinit/cxinit.507A.test.js',
//        CXINIT507B: 'integration/scenarios/cxinit/cxinit.507B.test.js',
//        CXINIT507C: 'integration/scenarios/cxinit/cxinit.507C.test.js',
//        suite2: 'integration/scenarios/cxinit/cxinit.489.test.js'
//    },

//    seleniumServerJar: __dirname + '\\node_modules\\protractor\\node_modules\\webdriver-manager\\selenium\\selenium-server-standalone-3.4.0.jar',
//   chromeDriver: __dirname + '\\node_modules\\protractor\\node_modules\\webdriver-manager\\selenium\\chromedriver_2.29',
//  geckodriver: __dirname + '\\node_modules\\protractor\\node_modules\\webdriver-manager\\selenium\\geckodriver-v0.16.0',


  seleniumServerJar: 'C:\\Users\\DCA60212\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\webdriver-manager\\selenium\\selenium-server-standalone-3.3.1.jar',
  chromeDriver:      'C:\\Users\\DCA60212\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\webdriver-manager\\selenium\\chromedriver_2.29',
  geckodriver:       'C:\\Users\\DCA60212\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\webdriver-manager\\selenium\\geckodriver-v0.15.0', 

    capabilities: {
        browserName: 'chrome',
        // chromeOptions: {
        //     args: [
        //         "--headless",
        //         "--disable-gpu"
        //     ],
        // },
    },

    params: {
        baseUrl: 'https://aw-lx0076.deltadev.ent:3000/enroll'
    },


    onPrepare: function() {
        minWait = 1000;
        maxWait = 2000;
        longWait = 40000;
        PAGELOADTIME = 60000;
        browser.driver.manage().window().setSize(1050,950);
        //browser.manage().window().maximize();
        browser.ignoreSynchronization = true;
        folderName = (new Date()).toString().split('').splice(1, 4).join('');
        browserActions = new(require("./integration/utils/browserActions.js"));
        require("./integration/utils/element-finder-extensions.js");
        Utility = new(require("./integration/utils/common.js"));
        dataProvider = require('jasmine-data-provider');

        log4js = require('log4js');
        log4js.configure({
            appenders: [
                { type: 'console' },
                { type: 'file', filename: 'results/logs/executionLog.log', category: 'Delta' }
            ]
        });
        logger = log4js.getLogger('Delta');
        var monthMap = {
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
        var currentDate = new Date(),
            currentHoursIn24Hour = currentDate.getHours(),
            currentTimeInHours = currentHoursIn24Hour > 12 ? currentHoursIn24Hour - 12 : currentHoursIn24Hour,
            totalDateString = currentDate.getDate() + '-' + monthMap[currentDate.getMonth()] + '-' + (currentDate.getYear() + 1900) +
            '-' + currentTimeInHours + 'h-' + currentDate.getMinutes() + 'm';

//        var Jasmine2HtmlReporter = require('protractor-jasmine2-html-reporter');
//        jasmine.getEnv().addReporter(new Jasmine2HtmlReporter({
//            savePath: 'results/' + totalDateString + '/html-reports/',
//            screenshotsFolder: 'images',
//            showColors: true,
//            includeStackTrace: true,
//            takeScreenshotsOnlyOnFailures: true,
//            fileNameDateSuffix: true,
//            defaultTimeoutInterval: 10 * 60000
//
//        }));

    }


}
