 exports.config = {

     //directConnect: true,
     framework: 'jasmine2',
     // seleniumAddress: 'http://localhost:4444/wd/hub',

     //specs: ['integration/scenarios/dhmo/dhmo.471PersInfo.test.js'],
     //  specs: ['integration/scenarios/aarphmo/aarphmo.2057E2E_WrkFlow1.test.js'],
     // specs: ['./example_spec.js'],

     suites: {
         independent: 'integration/scenarios/dhmo/dhmo.1754DirHMO_WrkFlow5.test.js',

         allCxinit: 'integration/scenarios/dhmo/*.test.js',

         pers1: [
             'integration/scenarios/dhmo/dhmo.471PersInfo.test.js',
             'integration/scenarios/dhmo/dhmo.483PersInfo.test.js',
             'integration/scenarios/dhmo/dhmo.489PersInfo.test.js',
             'integration/scenarios/dhmo/dhmo.504PersInfo.test.js',
             'integration/scenarios/dhmo/dhmo.507PersInfo.test.js',
             'integration/scenarios/dhmo/dhmo.519PersInfo.test.js'
         ],

         pers2: [
             'integration/scenarios/dhmo/dhmo.720PersInfo.test.js',
             'integration/scenarios/dhmo/dhmo.804PersInfo.test.js',
             'integration/scenarios/dhmo/dhmo.1361PersInfo.test.js',
             'integration/scenarios/dhmo/dhmo.1548PersInfo.test.js',
             'integration/scenarios/dhmo/dhmo.1549PersInfo.test.js'
         ],

         deps: [
             'integration/scenarios/dhmo/dhmo.1355DepCTA.test.js',
             'integration/scenarios/dhmo/dhmo.1356DepPremChgPop.test.js',
             'integration/scenarios/dhmo/dhmo.1357DepChildAge.test.js',
             'integration/scenarios/dhmo/dhmo.1358DepSpouse-DP.test.js',
             'integration/scenarios/dhmo/dhmo.1359Dep-15Deps.test.js'
         ],

         facs: [
             'integration/scenarios/dhmo/dhmo.1365FacSearch.test.js',
             'integration/scenarios/dhmo/dhmo.1366FacSelect.test.js',
             'integration/scenarios/dhmo/dhmo.1367FacCTA.test.js',
             'integration/scenarios/dhmo/dhmo.1368FacFeedback.test.js'
         ],

         payment: [
             'integration/scenarios/dhmo/dhmo.1403PayCCExp.test.js',
             'integration/scenarios/dhmo/dhmo.1404PayAddrSug.test.js',
             'integration/scenarios/dhmo/dhmo.1405PayConAuthChk.test.js',
             'integration/scenarios/dhmo/dhmo.1406PayCTA.test.js',
             'integration/scenarios/dhmo/dhmo.1407PayCvv.test.js'
         ],

         dhe2e: [
             'integration/scenarios/dhmo/dhmo.1408.EndToEndWkFlo1.test.js',
             'integration/scenarios/dhmo/dhmo.1461.EndToEndWkFlo2.test.js',
             'integration/scenarios/dhmo/dhmo.1746DirHMO_WrkFlo1.test.js',
             'integration/scenarios/dhmo/dhmo.1753DirHMO_WrkFlo4.test.js',
             'integration/scenarios/dhmo/dhmo.1754DirHMO_WrkFlow5.test.js',
             'integration/scenarios/dhmo/dhmo.1755DirHMO_WrkFlow6.test.js',
             'integration/scenarios/051217_E2E_POM_Workflow.js',
             'integration/scenarios/addDep_Enroll.DeleteDep_depPage.js'
         ],
         ahpers: ['integration/scenarios/aarphmo/aarphmo.471PersInfo.test.js',
             'integration/scenarios/aarphmo/aarphmo.489PersInfo.test.js',
             'integration/scenarios/aarphmo/aarphmo.504PersInfo.test.js',
             'integration/scenarios/aarphmo/aarphmo.507PersInfo.test.js',
             'integration/scenarios/aarphmo/aarphmo.519PersInfo.test.js',
             'integration/scenarios/aarphmo/aarphmo.672PersInfo.test.js',
             'integration/scenarios/aarphmo/aarphmo.720PersInfo.test.js',
             'integration/scenarios/aarphmo/aarphmo.804PersInfo.test.js'
         ],

         ahdep: [
             'integration/scenarios/aarphmo/aarphmo.1355DepCTA.test.js',
             'integration/scenarios/aarphmo/aarphmo.1356DepPremChgPop.test.js',
             'integration/scenarios/aarphmo/aarphmo.1357DepChildAge.test.js',
             'integration/scenarios/aarphmo/aarphmo.1358DepSpouse-DP.test.js',
             'integration/scenarios/aarphmo/aarphmo.1359Dep-15Deps.test.js'
         ],
         ahfac: [
             'integration/scenarios/aarphmo/aarphmo.1365FacSearch.test.js',
             'integration/scenarios/aarphmo/aarphmo.1366FacSelect.test.js',
             'integration/scenarios/aarphmo/aarphmo.1367FacCTA.test.js',
             'integration/scenarios/aarphmo/aarphmo.1368FacFeedback.test.js'
         ],
         ahe2e: [
             'integration/scenarios/aarphmo/aarphmo.2057E2E_WrkFlow1.test.js',
             'integration/scenarios/aarphmo/aarphmo.2059AarpHMO_WrkFlow1.test.js',
             'integration/scenarios/aarphmo/aarphmo.2058AarpHMO_WrkFlow2.test.js',
             'integration/scenarios/aarphmo/aarphmo.2060AarpHMO_WrkFlow4.test.js',
             'integration/scenarios/aarphmo/aarphmo.2061AarpHMO_WrkFlow5.test.js',
             'integration/scenarios/aarphmo/aarphmo.2062AarpHMO_WrkFlow6.test.js',
             'integration/scenarios/aarphmo/aarphmo.1768_E2E_WrkFlo_1.test.js',
             'integration/scenarios/aarphmo/aarphmo.2090_PaymentOneDep_WorkFlow.js',
             'integration/scenarios/aarphmo/aarphmo.2091_PaymentThreeDep_WorkFlow.js'
         ],
         ape2e: [
             'integration/scenarios/aarpppo/aarpppo.1973WrkFlo1.test.js',
             'integration/scenarios/aarpppo/aarpppo.2092_E2EPayAnn_TwoDep.test.js',
             'integration/scenarios/aarpppo/aarpppo.2093_E2EPayAnn_ThreeDep.test.js',
             'integration/scenarios/aarpppo/aarpppo.2310_E2EPaySemiAnn_TwoDep.test.js',
             'integration/scenarios/aarpppo/aarpppo.2311_E2EPaySemiAnn_ThreeDep.test.js',
             'integration/scenarios/aarpppo/aarpppo.2312_E2EPayQua_TwoDep.test.js',
             'integration/scenarios/aarpppo/aarpppo.2313_E2EPayQua_ThreeDep.test.js',
             'integration/scenarios/aarpppo/aarpppo.2314_E2EPayMon_TwoDep.test.js',
             'integration/scenarios/aarpppo/aarpppo.2315_E2EPayMon_ThreeDep.test.js'
         ],
         dpe2e: [
             'integration/scenarios/dppo/dppo.2317_E2EPayCCAnn_TwoDep.test.js',
             'integration/scenarios/dppo/dppo.2318_E2EPayCCAnn_ThreeDep.test.js',
             'integration/scenarios/dppo/dppo.2319_E2EPayCCMon_TwoDep.test.js',
             'integration/scenarios/dppo/dppo.2320_E2EPayCCMon_ThreeDep.test.js',
             'integration/scenarios/dppo/dppo.2321_E2EPayCCQtr_TwoDep.test.js',
             'integration/scenarios/dppo/dppo.2322_E2EPayCCQtr_ThreeDep.test.js',
             'integration/scenarios/dppo/dppo.2323_E2EPayEFTAnn_TwoDep.test.js',
             'integration/scenarios/dppo/dppo.2324_E2EPayEFTAnn_ThreeDep.test.js',
             'integration/scenarios/dppo/dppo.2325_E2EPayEFTMon_TwoDep.test.js',
             'integration/scenarios/dppo/dppo.2326_E2EPayEFTMon_ThreeDep.test.js',
             'integration/scenarios/dppo/dppo.2327_E2EPayEFTQtr_TwoDep.test.js',
             'integration/scenarios/dppo/dppo.2328_E2EPayEFTQtr_ThreeDep.test.js'

         ],

         dhe2e: [

             'integration/scenarios/dhmo/dhmo.1408.EndToEndWkFlo1.test.js',
             'integration/scenarios/dhmo/dhmo.1461.EndToEndWkFlo2.test.js',
             'integration/scenarios/dhmo/dhmo.1746DirHMO_WrkFlo1.test.js',
             'integration/scenarios/dhmo/dhmo.1753DirHMO_WrkFlo4.test.js',
             'integration/scenarios/dhmo/dhmo.1754DirHMO_WrkFlow5.test.js',
             'integration/scenarios/dhmo/dhmo.1755DirHMO_WrkFlow6.test.js',

         ],
         hclfocus: [ // I will add direct PPO later in week of july 17 - 21
             'integration/scenarios/dhmo/dhmo.1408.EndToEndWkFlo1.test.js',
             'integration/scenarios/dhmo/dhmo.1461.EndToEndWkFlo2.test.js',
             'integration/scenarios/dhmo/dhmo.1746DirHMO_WrkFlo1.test.js',
             'integration/scenarios/dhmo/dhmo.1753DirHMO_WrkFlo4.test.js',
             'integration/scenarios/dhmo/dhmo.1754DirHMO_WrkFlow5.test.js',
             'integration/scenarios/dhmo/dhmo.1755DirHMO_WrkFlow6.test.js',
             'integration/scenarios/051217_E2E_POM_Workflow.js',
             'integration/scenarios/addDep_Enroll.DeleteDep_depPage.js',

             'integration/scenarios/aarphmo/aarphmo.2057E2E_WrkFlow1.test.js',
             'integration/scenarios/aarphmo/aarphmo.2059AarpHMO_WrkFlow1.test.js',
             'integration/scenarios/aarphmo/aarphmo.2058AarpHMO_WrkFlow2.test.js',
             'integration/scenarios/aarphmo/aarphmo.2060AarpHMO_WrkFlow4.test.js',
             'integration/scenarios/aarphmo/aarphmo.2061AarpHMO_WrkFlow5.test.js',
             'integration/scenarios/aarphmo/aarphmo.2062AarpHMO_WrkFlow6.test.js',
             'integration/scenarios/aarphmo/aarphmo.1768_E2E_WrkFlo_1.test.js',
             'integration/scenarios/aarphmo/aarphmo.2090_PaymentOneDep_WorkFlow.js',
             'integration/scenarios/aarphmo/aarphmo.2091_PaymentThreeDep_WorkFlow.js',

             'integration/scenarios/aarpppo/aarpppo.1973WrkFlo1.test.js',
             'integration/scenarios/aarpppo/aarpppo.2092_E2EPayAnn_TwoDep.test.js',
             'integration/scenarios/aarpppo/aarpppo.2093_E2EPayAnn_ThreeDep.test.js',
             'integration/scenarios/aarpppo/aarpppo.2310_E2EPaySemiAnn_TwoDep.test.js',
             'integration/scenarios/aarpppo/aarpppo.2311_E2EPaySemiAnn_ThreeDep.test.js',
             'integration/scenarios/aarpppo/aarpppo.2312_E2EPayQua_TwoDep.test.js',
             'integration/scenarios/aarpppo/aarpppo.2313_E2EPayQua_ThreeDep.test.js',
             'integration/scenarios/aarpppo/aarpppo.2314_E2EPayMon_TwoDep.test.js',
             'integration/scenarios/aarpppo/aarpppo.2315_E2EPayMon_ThreeDep.test.js',

             'integration/scenarios/dppo/dppo.2317_E2EPayCCAnn_TwoDep.test.js',
             'integration/scenarios/dppo/dppo.2318_E2EPayCCAnn_ThreeDep.test.js',
             'integration/scenarios/dppo/dppo.2319_E2EPayCCMon_TwoDep.test.js',
             'integration/scenarios/dppo/dppo.2320_E2EPayCCMon_ThreeDep.test.js',
             'integration/scenarios/dppo/dppo.2321_E2EPayCCQtr_TwoDep.test.js',
             'integration/scenarios/dppo/dppo.2322_E2EPayCCQtr_ThreeDep.test.js',

             'integration/scenarios/dppo/dppo.2323_E2EPayEFTAnn_TwoDep.test.js',
             'integration/scenarios/dppo/dppo.2324_E2EPayEFTAnn_ThreeDep.test.js',
             'integration/scenarios/dppo/dppo.2325_E2EPayEFTMon_TwoDep.test.js',
             'integration/scenarios/dppo/dppo.2326_E2EPayEFTMon_ThreeDep.test.js',
             'integration/scenarios/dppo/dppo.2327_E2EPayEFTQtr_TwoDep.test.js',
             'integration/scenarios/dppo/dppo.2328_E2EPayEFTQtr_ThreeDep.test.js'
         ]

     },

     seleniumServerJar: __dirname + '\\node_modules\\protractor\\node_modules\\webdriver-manager\\selenium\\selenium-server-standalone-3.4.0.jar',
     chromeDriver: __dirname + '\\node_modules\\protractor\\node_modules\\webdriver-manager\\selenium\\chromedriver_2.30.exe',
     geckodriver: __dirname + '\\node_modules\\protractor\\node_modules\\webdriver-manager\\selenium\\geckodriver-v0.17.0.exe',


     // chrome capabilities
     capabilities: {
         browserName: 'chrome',
         shardTestFiles: true,
         maxInstances: 4,
         chromeOptions: {
             'args': ["disable-infobars"]
             //'args': ["disable-infobars", "--headless", "--disable-gpu"]
         }
     },


     // Firefox/IE Capabilities
     // capabilities: {
     //     browserName: 'internet explorer',
     //     acceptInsecureCerts: true
     // },

     params: {
         // baseUrl: 'https://aw-lx0176.deltadev.ent:3000/enroll/DELTA/test',
         // baseUrl: 'http://aw-lx0101.deltadev.ent/indEnroll?issuerCode=AARP',
         // baseUrl: 'http://aw-lx0101.deltadev.ent',
         // baseUrl: 'https://aw-lx0176.deltadev.ent:3000/enroll/',
         baseUrl: 'https://mot.deltadentalins.com',
         // baseUrl: 'http://aw-lx0176/directory-search.html',

         //   baseUrl:'https://aw-lx0076.deltadev.ent:3000/enroll/',
         exeLogging: 'ALL',
         exeInspDelay: 20000

     },


     onPrepare: function() {
         minWait = 1000;
         maxWait = 2000;
         longWait = 40000;
         PAGELOADTIME = 60000;
         isExecutionFromUI = true;
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
         totalDateString = currentDate.getDate() + '-' + monthMap[currentDate.getMonth()] + '-' + (currentDate.getYear() + 1900) +
             '-' + currentTimeInHours + 'h-' + currentDate.getMinutes() + 'm' + currentDate.getSeconds() + 's';

         browser.manage().timeouts().implicitlyWait(browser.params.exeInspDelay);
         browser.manage().window().maximize();
         // browser.manage().window().setSize(375, 667);
         browser.ignoreSynchronization = true;
         folderName = (new Date()).toString().split('').splice(1, 4).join('');
         require("./integration/utils/element-finder-extensions.js");
         Utility = new(require("./integration/utils/common.js"));
         dataProvider = require('jasmine-data-provider');
         AllureReporter = require('jasmine-allure-reporter');

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
         var JasmineLogReporter = require('./integration/utils/jasmine-log-reporter');
         jasmine.getEnv().addReporter(new JasmineLogReporter());

         //==================================
         // var Jasmine2HtmlReporter = require('protractor-jasmine2-html-reporter');
         // jasmine.getEnv().addReporter(new Jasmine2HtmlReporter({
         //     savePath: 'results/' + totalDateString + '/html-reports/',
         //     screenshotsFolder: 'images',
         //     showColors: true,
         //     includeStackTrace: true,
         //     //takeScreenshotsOnlyOnFailures: true,
         //     fileNameDateSuffix: true,
         //     defaultTimeoutInterval: 10 * 60000

         // }));
         //========================

         // Allure reporter

         //jasmine.getEnv().addReporter(new AllureReporter());
         jasmine.getEnv().addReporter(new AllureReporter({
             resultsDir: 'node_modules/jasmine-allure-reporter/allure-results'
         }));
         jasmine.getEnv().afterEach(function(done) {
             browser.takeScreenshot().then(function(png) {
                 allure.createAttachment('Screenshot', function() {
                     return new Buffer(png, 'base64')
                 }, 'image/png')();
                 done();
             })
         });

     },

     onComplete: function() {
         cmd = require('node-cmd');
         cmd.run('allure-report.bat');
         // cmd.run('Marktest-run.bat');
     },

     resultJsonOutputFile: 'results.json',
     jasmineNodeOpts: {
         showColors: true, // Use colors in the command line report.
         defaultTimeoutInterval: 100 * 60000

     }

 }


 //How to Run Script

 //CXINIT -aws-dit
 //protractor protractor.conf.js --params.baseUrl https://aw-lx0176.deltadev.ent:3000/enroll --suite=CXINIT804

 //CXINIT -MOT
 //protractor protractor.conf.js --params.baseUrl https://mot.deltadentalins.com/enroll --suite=CXINIT804

 //CXINIT2
 //protractor Nareshprotractor.conf.js --params.baseUrl http://aw-lx0076/directory-search.html --suite=CXINIT2_4