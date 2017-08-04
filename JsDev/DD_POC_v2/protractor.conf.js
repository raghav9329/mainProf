exports.config = {
    framework: 'jasmine',
    // seleniumAddress: 'http://localhost:4444/wd/hub',

    // I know you are testing with SUITES, but I am testing individually.
    // Please just comment out a line if you don't want it evaluated.

    //specs: ['integration/scenarios/cxinit/cxinit.504.test.js'],
    //specs: ['integration/scenarios/cxinit/cxinit.507.test.js'],
    //specs: ['integration/scenarios/cxinit/cxinit.507.test.js','integration/scenarios/cxinit/cxinit.489.test.js'],
    //specs: ['integration/scenarios/cxinit/cxinit.489.test.js'],

    suites: {

        CXINIT471: 'integration/scenarios/cxinit/cxinit.471.test.js',
        CXINIT483: 'integration/scenarios/cxinit/cxinit.483.test.js',
        CXINIT489: 'integration/scenarios/cxinit/cxinit.489.test.js',
        CXINIT504: 'integration/scenarios/cxinit/cxinit.504.test.js',
        CXINIT507: 'integration/scenarios/cxinit/cxinit.507.test.js',
        CXINIT519: 'integration/scenarios/cxinit/cxinit.519.test.js',
        CXINIT720: 'integration/scenarios/cxinit/cxinit.720.test.js',
        CXINIT804: 'integration/scenarios/cxinit/cxinit.804.test.js',
        CXINIT2_4: 'integration/scenarios/providers/cxinit2.4.test.js'
    },

    seleniumServerJar:  __dirname + '\\node_modules\\protractor\\node_modules\\webdriver-manager\\selenium\\selenium-server-standalone-3.4.0.jar',
    chromeDriver:       __dirname + '\\node_modules\\protractor\\node_modules\\webdriver-manager\\selenium\\chromedriver_2.30.exe',
    geckodriver:        __dirname + '\\node_modules\\protractor\\node_modules\\webdriver-manager\\selenium\\geckodriver-v0.18.0.exe',


    // seleniumServerJar: 'C:\\Users\\DCA60212\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\webdriver-manager\\selenium\\selenium-server-standalone-3.4.0.jar',
    // chromeDriver: 'C:\\Users\\DCA60212\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\webdriver-manager\\selenium\\chromedriver_2.29',
    // geckodriver: 'C:\\Users\\DCA60212\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\webdriver-manager\\selenium\\geckodriver-v0.16.1',

    capabilities: {
        browserName: 'chrome',
        chromeOptions: {
            'args': ['disable-infobars']
        }
        // 5/8/17 the above config get's rid of that browser alert about the 
        // browser window being controlled externally....etc.
    },

    params: {
    	exeInspDelay:'', // Command Line controllable sleep variable for running Debug Inspections See 471 for use
        baseUrl: '',
        exeLogging: ''
    },

    // Please stop deleting the window.setSize(1050,950) line
    // Just comment it out and put yours back in.
    onPrepare: function() {
        minWait = 1000;
        maxWait = 2000;
        longWait = 40000;
        PAGELOADTIME = 60000;
         browser.manage().timeouts().implicitlyWait(browser.params.exeInspDelay);
        //browser.manage().window().maximize();
        browser.manage().window().setSize(1050, 950);
        browser.ignoreSynchronization = true;
        folderName = (new Date()).toString().split('').splice(1, 4).join('');
        require("./integration/utils/element-finder-extensions.js");

        // If possible , I would prefer this Utility line to be duplicated in what ever source code file
        // that needs it.  I was very confused how it was defined in the source code.
        // The same goes for the require line directly above 
        Utility = new(require("./integration/utils/common.js"));
        dataProvider = require('jasmine-data-provider');


         log4js = require('log4js');
        log4js.configure({
            appenders: [
                { type: 'console' },
                { type: 'file', filename: 'results/logs/executionLog.log', category: 'DeltaDental' }
            ]
        });
        logger = log4js.getLogger('DeltaDental');
        logger.setLevel(browser.params.exeLogging);
        var JasmineLogReporter = require('./integration/utils/jasmine-log-reporter');
        jasmine.getEnv().addReporter(new JasmineLogReporter());

        
        // var monthMap = {  // Configs went here  moved below


    },
    resultJsonOutputFile: 'results.json',
    jasmineNodeOpts: {
        showColors: true, // Use colors in the command line report.
        defaultTimeoutInterval: 10 * 60000

    }
}


////////////////////////////////////////////////////////////////
// Config Archive: stuff thats been commented out for some time
////////////////////////////////////////////////////////////////


//  
// 5/8/17 review and act.
// I don't remember if it was Hyderabad team of myself
// who added these options then commented out.
// but as you can see I now need some args implemented
// -- I don't need them: if Hyd team doesn't need then delete --
// chromeOptions: {
//     args: [
//         "--headless",
//         "--disable-gpu"
//     ],
// },

// var monthMap = {
//     "1": "Jan",
//     "2": "Feb",
//     "3": "Mar",
//     "4": "Apr",
//     "5": "May",
//     "6": "Jun",
//     "7": "Jul",
//     "8": "Aug",
//     "9": "Sep",
//     "10": "Oct",
//     "11": "Nov",
//     "12": "Dec"
// };
// var currentDate = new Date(),
//     currentHoursIn24Hour = currentDate.getHours(),
//     currentTimeInHours = currentHoursIn24Hour > 12 ? currentHoursIn24Hour - 12 : currentHoursIn24Hour,
//     totalDateString = currentDate.getDate() + '-' + monthMap[currentDate.getMonth()] + '-' + (currentDate.getYear() + 1900) +
//     '-' + currentTimeInHours + 'h-' + currentDate.getMinutes() + 'm';

// var Jasmine2HtmlReporter = require('protractor-jasmine2-html-reporter');
// jasmine.getEnv().addReporter(new Jasmine2HtmlReporter({
//     savePath: 'results/' + totalDateString + '/html-reports/',
//     screenshotsFolder: 'images',
//     showColors: true,
//     includeStackTrace: true,
//     takeScreenshotsOnlyOnFailures: true,
//     fileNameDateSuffix: true,
//     defaultTimeoutInterval: 10 * 60000

// }));

//How to Run Script

//CXINIT -aws-dit
//protractor protractor.conf.js --params.baseUrl https://aw-lx0176.deltadev.ent:3000/enroll --suite=CXINIT804

//CXINIT -MOT
//protractor protractor.conf.js --params.baseUrl https://mot.deltadentalins.com/enroll --suite=CXINIT804

//CXINIT2
//protractor protractor.conf.js --params.baseUrl http://aw-lx0076/directory-search.html --suite=CXINIT2_4
