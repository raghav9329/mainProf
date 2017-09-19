exports.config = {
    framework: 'jasmine',
    // seleniumAddress: 'http://localhost:4444/wd/hub',

    // I know you are testing with SUITES, but I am testing individually.
    // Please just comment out a line if you don't want it evaluated.
    // specs: ['integration/scenarios/dhmo/dhmo.1755DirHMO_WrkFlow6.test.js'],
    //specs: ['integration/scenarios/cxinit/*.test.js'],
    // specs: ['integration/scenarios/*.js', 'integration/scenarios/cxinit/*.js', 'integration/scenarios/aarphmo/*.js'],
    //specs: [

    suites: {

        independent: 'integration/scenarios/dhmo/1754DirHMO_WrkFlow5.test.js',

        allCxinit: 'integration/scenarios/dhmo/*.test.js',

        pers1: [
            'integration/scenarios/dhmo/471PersInfo.test.js',
            'integration/scenarios/dhmo/483PersInfo.test.js',
            'integration/scenarios/dhmo/489PersInfo.test.js',
            'integration/scenarios/dhmo/504PersInfo.test.js',
            'integration/scenarios/dhmo/507PersInfo.test.js',
            'integration/scenarios/dhmo/519PersInfo.test.js'
        ],

        pers2: [
            'integration/scenarios/dhmo/720PersInfo.test.js',
            'integration/scenarios/dhmo/804PersInfo.test.js',
            'integration/scenarios/dhmo/1361PersInfo.test.js',
            'integration/scenarios/dhmo/1548PersInfo.test.js',
            'integration/scenarios/dhmo/1549PersInfo.test.js'
        ],

        deps: [
            'integration/scenarios/dhmo/1355DepCTA.test.js',
            'integration/scenarios/dhmo/1356DepPremChgPop.test.js',
            'integration/scenarios/dhmo/1357DepChildAge.test.js',
            'integration/scenarios/dhmo/1358DepSpouse-DP.test.js',
            'integration/scenarios/dhmo/1359Dep-15Deps.test.js'
        ],

        facs: [
            'integration/scenarios/dhmo/1365FacSearch.test.js',
            'integration/scenarios/dhmo/1366FacSelect.test.js',
            'integration/scenarios/dhmo/1367FacCTA.test.js',
            'integration/scenarios/dhmo/1368FacFeedback.test.js'
        ],

        payment: [
            'integration/scenarios/dhmo/1403PayCCExp.test.js',
            'integration/scenarios/dhmo/1404PayAddrSug.test.js',
            'integration/scenarios/dhmo/1405PayConAuthChk.test.js',
            'integration/scenarios/dhmo/1406PayCTA.test.js',
            'integration/scenarios/dhmo/1407PayCvv.test.js'
        ],

        ahpers: [
            'integration/scenarios/aarphmo/471PersInfo.test.js',
            'integration/scenarios/aarphmo/489PersInfo.test.js',
            'integration/scenarios/aarphmo/504PersInfo.test.js',
            'integration/scenarios/aarphmo/507PersInfo.test.js',
            'integration/scenarios/aarphmo/519PersInfo.test.js',
            'integration/scenarios/aarphmo/672PersInfo.test.js',
            'integration/scenarios/aarphmo/720PersInfo.test.js',
            'integration/scenarios/aarphmo/804PersInfo.test.js'
        ],

        ahdep: [
            'integration/scenarios/aarphmo/1355DepCTA.test.js',
            'integration/scenarios/aarphmo/1356DepPremChgPop.test.js',
            'integration/scenarios/aarphmo/1357DepChildAge.test.js',
            'integration/scenarios/aarphmo/1358DepSpouse-DP.test.js',
            'integration/scenarios/aarphmo/1359Dep-15Deps.test.js'
        ],
        ahfac: [
            'integration/scenarios/aarphmo/1365FacSearch.test.js',
            'integration/scenarios/aarphmo/1366FacSelect.test.js',
            'integration/scenarios/aarphmo/1367FacCTA.test.js',
            'integration/scenarios/aarphmo/1368FacFeedback.test.js'
        ],
        ahe2e: [
            'integration/scenarios/aarphmo/1768_E2E_WrkFlo_1.test.js',
            'integration/scenarios/aarphmo/2057E2E_WrkFlow1.test.js',
            'integration/scenarios/aarphmo/2058AarpHMO_WrkFlow2.test.js',
            'integration/scenarios/aarphmo/2059AarpHMO_WrkFlow1.test.js',
            'integration/scenarios/aarphmo/2060AarpHMO_WrkFlow4.test.js',
            'integration/scenarios/aarphmo/2061AarpHMO_WrkFlow5.test.js',
            'integration/scenarios/aarphmo/2062AarpHMO_WrkFlow6.test.js',
            'integration/scenarios/aarphmo/2090_PaymentOneDep_WorkFlow.js',
            'integration/scenarios/aarphmo/2091_PaymentThreeDep_WorkFlow.js'
        ],
        ape2e: [
            'integration/scenarios/aarpppo/1973WrkFlo1.test.js',
            'integration/scenarios/aarpppo/2092_E2EPayAnn_TwoDep.test.js',
            'integration/scenarios/aarpppo/2093_E2EPayAnn_ThreeDep.test.js',
            'integration/scenarios/aarpppo/2310_E2EPaySemiAnn_TwoDep.test.js',
            'integration/scenarios/aarpppo/2311_E2EPaySemiAnn_ThreeDep.test.js',
            'integration/scenarios/aarpppo/2312_E2EPayQua_TwoDep.test.js',
            'integration/scenarios/aarpppo/2313_E2EPayQua_ThreeDep.test.js',
            'integration/scenarios/aarpppo/2314_E2EPayMon_TwoDep.test.js',
            'integration/scenarios/aarpppo/2315_E2EPayMon_ThreeDep.test.js'
        ],
        dpe2e: [
            'integration/scenarios/dppo/2565dppotx.e2e.test.js',
            'integration/scenarios/dppo/2564dppotx.e2e.test.js',
            'integration/scenarios/dppo/2574dppopa.e2e.test.js',
            'integration/scenarios/dppo/2557dppofl.e2e.test.js',
            'integration/scenarios/dppo/2317_E2EPayCCAnn_TwoDep.test.js',
            'integration/scenarios/dppo/2318_E2EPayCCAnn_ThreeDep.test.js',
            'integration/scenarios/dppo/2319_E2EPayCCMon_TwoDep.test.js',
            'integration/scenarios/dppo/2320_E2EPayCCMon_ThreeDep.test.js',
            'integration/scenarios/dppo/2321_E2EPayCCQtr_TwoDep.test.js',
            'integration/scenarios/dppo/2322_E2EPayCCQtr_ThreeDep.test.js',
            'integration/scenarios/dppo/2323_E2EPayEFTAnn_TwoDep.test.js',
            'integration/scenarios/dppo/2324_E2EPayEFTAnn_ThreeDep.test.js',
            'integration/scenarios/dppo/2325_E2EPayEFTMon_TwoDep.test.js',
            'integration/scenarios/dppo/2326_E2EPayEFTMon_ThreeDep.test.js',
            'integration/scenarios/dppo/2327_E2EPayEFTQtr_TwoDep.test.js',
            'integration/scenarios/dppo/2328_E2EPayEFTQtr_ThreeDep.test.js'
        ],

        dhe2e: [

            'integration/scenarios/dhmo/1408.EndToEndWkFlo1.test.js',
            'integration/scenarios/dhmo/1461.EndToEndWkFlo2.test.js',
            'integration/scenarios/dhmo/1746DirHMO_WrkFlo1.test.js',
            'integration/scenarios/dhmo/1753DirHMO_WrkFlo4.test.js',
            'integration/scenarios/dhmo/1754DirHMO_WrkFlow5.test.js',
            'integration/scenarios/dhmo/1755DirHMO_WrkFlow6.test.js',
            'integration/scenarios/dhmo/1235E2E_POM_Workflow.js',
            'integration/scenarios/dhmo/addDep_Enroll.DeleteDep_depPage.js',
            'integration/scenarios/dhmo/2532dhmotx.e2e.test.js',
            'integration/scenarios/dhmo/2539dhmopa.e2e.test.js',
            'integration/scenarios/dhmo/2546dhmoFL.e2e.test.js'
        ],

        states: [
            'integration/scenarios/dhmo/2532dhmotx.e2e.test.js',
            'integration/scenarios/dhmo/2539dhmopa.e2e.test.js',
            'integration/scenarios/dhmo/2546dhmoFL.e2e.test.js',
            'integration/scenarios/dppo/2565dppotx.e2e.test.js',
            'integration/scenarios/dppo/2564dppotx.e2e.test.js',
            'integration/scenarios/dppo/2574dppopa.e2e.test.js',
            'integration/scenarios/dppo/2557dppofl.e2e.test.js'
        ],

        hclfocus: [ // I will add direct PPO later in week of july 17 - 21
            'integration/scenarios/dhmo/1408.EndToEndWkFlo1.test.js',
            'integration/scenarios/dhmo/1461.EndToEndWkFlo2.test.js',
            'integration/scenarios/dhmo/1746DirHMO_WrkFlo1.test.js',
            'integration/scenarios/dhmo/1753DirHMO_WrkFlo4.test.js',
            'integration/scenarios/dhmo/1754DirHMO_WrkFlow5.test.js',
            'integration/scenarios/dhmo/1755DirHMO_WrkFlow6.test.js',
            'integration/scenarios/051217_E2E_POM_Workflow.js',
            'integration/scenarios/addDep_Enroll.DeleteDep_depPage.js',
            'integration/scenarios/dhmo/2532dhmotx.e2e.test.js',
            'integration/scenarios/dhmo/2539dhmopa.e2e.test.js',
            'integration/scenarios/dhmo/2546dhmoFL.e2e.test.js',


            'integration/scenarios/aarphmo/2057E2E_WrkFlow1.test.js',
            'integration/scenarios/aarphmo/2059AarpHMO_WrkFlow1.test.js',
            'integration/scenarios/aarphmo/2058AarpHMO_WrkFlow2.test.js',
            'integration/scenarios/aarphmo/2060AarpHMO_WrkFlow4.test.js',
            'integration/scenarios/aarphmo/2061AarpHMO_WrkFlow5.test.js',
            'integration/scenarios/aarphmo/2062AarpHMO_WrkFlow6.test.js',
            'integration/scenarios/aarphmo/1768_E2E_WrkFlo_1.test.js',
            'integration/scenarios/aarphmo/2090_PaymentOneDep_WorkFlow.js',
            'integration/scenarios/aarphmo/2091_PaymentThreeDep_WorkFlow.js',

            'integration/scenarios/aarpppo/1973WrkFlo1.test.js',
            'integration/scenarios/aarpppo/2092_E2EPayAnn_TwoDep.test.js',
            'integration/scenarios/aarpppo/2093_E2EPayAnn_ThreeDep.test.js',
            'integration/scenarios/aarpppo/2310_E2EPaySemiAnn_TwoDep.test.js',
            'integration/scenarios/aarpppo/2311_E2EPaySemiAnn_ThreeDep.test.js',
            'integration/scenarios/aarpppo/2312_E2EPayQua_TwoDep.test.js',
            'integration/scenarios/aarpppo/2313_E2EPayQua_ThreeDep.test.js',
            'integration/scenarios/aarpppo/2314_E2EPayMon_TwoDep.test.js',
            'integration/scenarios/aarpppo/2315_E2EPayMon_ThreeDep.test.js',

            'integration/scenarios/dppo/2565dppotx.e2e.test.js',
            'integration/scenarios/dppo/2564dppotx.e2e.test.js',
            'integration/scenarios/dppo/2574dppopa.e2e.test.js',
            'integration/scenarios/dppo/2557dppofl.e2e.test.js',
            'integration/scenarios/dppo/2317_E2EPayCCAnn_TwoDep.test.js',
            'integration/scenarios/dppo/2318_E2EPayCCAnn_ThreeDep.test.js',
            'integration/scenarios/dppo/2319_E2EPayCCMon_TwoDep.test.js',
            'integration/scenarios/dppo/2320_E2EPayCCMon_ThreeDep.test.js',
            'integration/scenarios/dppo/2321_E2EPayCCQtr_TwoDep.test.js',
            'integration/scenarios/dppo/2322_E2EPayCCQtr_ThreeDep.test.js',
            'integration/scenarios/dppo/2323_E2EPayEFTAnn_TwoDep.test.js',
            'integration/scenarios/dppo/2324_E2EPayEFTAnn_ThreeDep.test.js',
            'integration/scenarios/dppo/2325_E2EPayEFTMon_TwoDep.test.js',
            'integration/scenarios/dppo/2326_E2EPayEFTMon_ThreeDep.test.js',
            'integration/scenarios/dppo/2327_E2EPayEFTQtr_TwoDep.test.js',
            'integration/scenarios/dppo/2328_E2EPayEFTQtr_ThreeDep.test.js'
        ]

    },

    seleniumServerJar: __dirname + '\\node_modules\\protractor\\node_modules\\webdriver-manager\\selenium\\selenium-server-standalone-3.4.0.jar',
    chromeDriver: __dirname + '\\node_modules\\protractor\\node_modules\\webdriver-manager\\selenium\\chromedriver_2.30.exe',
    geckodriver: __dirname + '\\node_modules\\protractor\\node_modules\\webdriver-manager\\selenium\\geckodriver-v0.18.0.exe',


    params: {
        //  baseUrl: '' ,  // running this allows you to enter URL at command line
        //baseUrl: 'https://aw-lx0176.deltadev.ent:3000/enroll/',
        // baseUrl: 'http://aw-lx0101.deltadev.ent',
        baseUrl: 'https://deltadentalins.com'
        exeInspDelay: '', // Command Line controllable sleep variable for running Debug Inspections
        // baseUrl: 'https://mot.deltadentalins.com/enroll/delta/test',
        //baseUrl: 'https://mot.deltadentalins.com',
        //  exeLogging:'INFO', // Mark's desire to not display logging
        exeLogging: 'OFF'
    },

    onPrepare: function() {
        minWait = 75;
        maxWait = 120;
        longWait = 1200;
        PAGELOADTIME = 60000;
        isExecutionFromUI = true;
        testDataEnv = 'dit';
        testExecutionEnv = 'staging'
            //browser.manage().window().maximize();
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
        // var monthMap = {  // Configs went here  moved below 

    },

    capabilities: {
        browserName: 'chrome',
        shardTestFiles: true,
        maxInstances: 4,
        //maxInstances: 1,
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
        //includeStackTrace : false,
        showColors: true, // Use colors in the command line report.
        defaultTimeoutInterval: 10 * 60000

    }
}
