module.exports = {

    suitesCollection: {
        independent: 'integration/scenarios/dhmo/1754DirHMO_WrkFlow5.test.js',

        allCxinit: 'integration/scenarios/dhmo/*.test.js',
        smoke: 'integration/scenarios/dhmo/507PersInfo.test.js',

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

      //hclfocus: this suite grew way beyond the intent I had

        buy2shop: ['integration/scenarios/xproduct/Buying2Shopping.test.js'],
        
	pdall: ['integration/scenarios/providers/*.test.js', ],

        pdearlyWork: [
            'integration/scenarios/providers/cxinit2.4.test.js',
            'integration/scenarios/providers/cxinit2.73.test.js',
            'integration/scenarios/providers/cxinit2.577.test.js',
            'integration/scenarios/providers/cxinit2.642.test.js',
            'integration/scenarios/providers/cxinit2.811.test.js',
            'integration/scenarios/providers/E2E_WorkFlow.test.js'
        ],

        pdNewWork: [
            'integration/scenarios/providers/cxauto84.test.js',
            'integration/scenarios/providers/cxauto-36.test.js',
            'integration/scenarios/providers/cxauto78.test.js',
            'integration/scenarios/providers/cxauto38-1.test.js',
            'integration/scenarios/providers/cxauto77.test.js',
            'integration/scenarios/providers/cxauto38.test.js',
            'integration/scenarios/providers/cxauto76.test.js',
            'integration/scenarios/providers/cxauto50-1.test.js',
            'integration/scenarios/providers/cxauto69.test.js',
            'integration/scenarios/providers/cxauto50-2.test.js',
            'integration/scenarios/providers/cxauto67.test.js',
            'integration/scenarios/providers/cxauto50-3.test.js',
            'integration/scenarios/providers/cxauto65.test.js',
            'integration/scenarios/providers/cxauto50.test.js',
        ],

        pd2_4: 'integration/scenarios/providers/cxinit2.4.test.js',
        pd2_73: 'integration/scenarios/providers/cxinit2.73.test.js',

        pd1146: 'integration/scenarios/providers/cxinit2-1146.test.js',
        pd11462: 'integration/scenarios/providers/cxinit2-1146_2.test.js',
        pd1207: 'integration/scenarios/providers/cxinit2-1207.test.js',
        auto50: ['integration/scenarios/providers/cxauto50.test.js', ],

        pdallEnd: [
            'integration/scenarios/providers/cxinit2-1146.test.js',
            'integration/scenarios/providers/cxinit2-1207.test.js',
        ],



    }
}
