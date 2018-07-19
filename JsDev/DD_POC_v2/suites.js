module.exports = {

    suitesCollection: {

        regression: [
            'integration/scenarios/xproduct/bkp/DeltaDirectShopping.test.js',
            'integration/scenarios/xproduct/shop/cxauto40_aarpShop.test.js',
            'integration/scenarios/xproduct/pers/507PersInfo.test.js',
            'integration/scenarios/xproduct/pers/519PersInfo.test.js',
            'integration/scenarios/xproduct/pers/1361PersInfo.test.js',
            'integration/scenarios/xproduct/deps/1356DepPremChgPop.test.js',
            'integration/scenarios/xproduct/deps/1357DepChildAge.test.js',
            'integration/scenarios/xproduct/facs/1365FacSearch.test.js',
            'integration/scenarios/xproduct/facs/1368FacFeedback.test.js', // Feedback form is not getting displayed
            'integration/scenarios/xproduct/facs/1367FacCTA.test.js',
            'integration/scenarios/xproduct/pays/CXAUTO-186_payLater.test.js',
            'integration/scenarios/xproduct/pays/1406PayCTA.test.js',
            'integration/scenarios/xproduct/pays/1404PayAddrSug.test.js',
            'integration/scenarios/xproduct/e2eAP/1408.EndToEndWkFlo1.test.js'
        ],
        pers: [
            'integration/scenarios/xproduct/pers/471PersInfo.test.js',
            'integration/scenarios/xproduct/pers/504PersInfo.test.js',
            'integration/scenarios/xproduct/pers/507PersInfo.test.js',
            'integration/scenarios/xproduct/pers/519PersInfo.test.js',
            'integration/scenarios/xproduct/pers/1361PersInfo.test.js',
            // All the specs in this suite cannot go across states as they are doing address validations
            // We need to see if we can make them go X-State 
            // However, They can go across products
            'integration/scenarios/xproduct/pers/483PersInfo.test.js',
            'integration/scenarios/xproduct/pers/489PersInfo.test.js',
            'integration/scenarios/xproduct/pers/720PersInfo.test.js',
            'integration/scenarios/xproduct/pers/804PersInfo.test.js',
            'integration/scenarios/xproduct/pers/1548PersInfo.test.js',
            'integration/scenarios/xproduct/pers/1549PersInfo.test.js'
        ],

        deps: [
            'integration/scenarios/xproduct/deps/1355DepCTA.test.js',
            'integration/scenarios/xproduct/deps/1356DepPremChgPop.test.js',
            'integration/scenarios/xproduct/deps/1357DepChildAge.test.js',
            'integration/scenarios/xproduct/deps/1358DepSpouse-DP.test.js',
            'integration/scenarios/xproduct/deps/1359Dep-15Deps.test.js'
        ],

        facs: [
            'integration/scenarios/xproduct/facs/1365FacSearch.test.js',
            'integration/scenarios/xproduct/facs/1366FacSelect.test.js',
            'integration/scenarios/xproduct/facs/1367FacCTA.test.js',
            'integration/scenarios/xproduct/facs/1368FacFeedback.test.js'
        ],

        payment: [
            'integration/scenarios/xproduct/pays/1403PayCCExp.test.js',
            'integration/scenarios/xproduct/pays/1404PayAddrSug.test.js',
            'integration/scenarios/xproduct/pays/1405PayConAuthChk.test.js',
            'integration/scenarios/xproduct/pays/1406PayCTA.test.js',
            'integration/scenarios/xproduct/pays/1407PayCvv.test.js',
            'integration/scenarios/xproduct/pays/CXINIT-4897Edit_ChangeFunctionality.test.js'
        ],

        ape2e: [
            'integration/scenarios/xproduct/ape2e/2092_E2EPayAnn_TwoDep.test.js',
            'integration/scenarios/xproduct/ape2e/2093_E2EPayAnn_ThreeDep.test.js',
            'integration/scenarios/xproduct/ape2e/2310_E2EPaySemiAnn_TwoDep.test.js',
            'integration/scenarios/xproduct/ape2e/2311_E2EPaySemiAnn_ThreeDep.test.js',
            'integration/scenarios/xproduct/ape2e/2312_E2EPayQua_TwoDep.test.js',
            'integration/scenarios/xproduct/ape2e/2313_E2EPayQua_ThreeDep.test.js',
            'integration/scenarios/xproduct/ape2e/2314_E2EPayMon_TwoDep.test.js',
            'integration/scenarios/xproduct/ape2e/2315_E2EPayMon_ThreeDep.test.js'
        ],

        dpe2e: [
            'integration/scenarios/xproduct/dpe2e/2317_E2EPayCCAnn_TwoDep.test.js',
            'integration/scenarios/xproduct/dpe2e/2318_E2EPayCCAnn_ThreeDep.test.js',
            'integration/scenarios/xproduct/dpe2e/2319_E2EPayCCMon_TwoDep.test.js',
            'integration/scenarios/xproduct/dpe2e/2320_E2EPayCCMon_ThreeDep.test.js',
            'integration/scenarios/xproduct/dpe2e/2321_E2EPayCCQtr_TwoDep.test.js',
            'integration/scenarios/xproduct/dpe2e/2322_E2EPayCCQtr_ThreeDep.test.js',
            'integration/scenarios/xproduct/dpe2e/2323_E2EPayEFTAnn_TwoDep.test.js',
            'integration/scenarios/xproduct/dpe2e/2324_E2EPayEFTAnn_ThreeDep.test.js',
            'integration/scenarios/xproduct/dpe2e/2325_E2EPayEFTMon_TwoDep.test.js',
            'integration/scenarios/xproduct/dpe2e/2326_E2EPayEFTMon_ThreeDep.test.js',
            'integration/scenarios/xproduct/dpe2e/2327_E2EPayEFTQtr_TwoDep.test.js',
            'integration/scenarios/xproduct/dpe2e/2328_E2EPayEFTQtr_ThreeDep.test.js'
        ],

        e2eAllProds: [
            'integration/scenarios/xproduct/e2eAP/1408.EndToEndWkFlo1.test.js',
            'integration/scenarios/xproduct/e2eAP/1461.EndToEndWkFlo2.test.js',
            'integration/scenarios/xproduct/e2eAP/1746DirHMO_WrkFlo1.test.js',
            'integration/scenarios/xproduct/e2eAP/1753DirHMO_WrkFlo4.test.js',
            'integration/scenarios/xproduct/e2eAP/1754DirHMO_WrkFlow5.test.js',
            'integration/scenarios/xproduct/e2eAP/1755DirHMO_WrkFlow6.test.js',
            'integration/scenarios/xproduct/e2eAP/1235E2E_POM_Workflow.js',
            'integration/scenarios/xproduct/e2eAP/addDep_Enroll.DeleteDep_depPage.js',
            'integration/scenarios/xproduct/e2eAP/cxauto90.test.js',
            'integration/scenarios/xproduct/e2eAP/cxauto91.test.js'
        ],

        aarpShopping: [
            'integration/scenarios/xproduct/shop/cxinit2899_aarpshop_pageval.test.js',
            'integration/scenarios/xproduct/shop/Buying2Shopping.test.js',
            'integration/scenarios/xproduct/shop/cxauto40_aarpShop.test.js'
        ],

        content: [
            'integration/scenarios/xproduct/content/VerifyContent.test.js'
        ],

        xproduct: [
            // 'integration/scenarios/xproduct/pers/471PersInfo.test.js',
            // 'integration/scenarios/xproduct/pers/483PersInfo.test.js',
            // 'integration/scenarios/xproduct/pers/489PersInfo.test.js',
            // 'integration/scenarios/xproduct/pers/504PersInfo.test.js',
            // 'integration/scenarios/xproduct/pers/507PersInfo.test.js',
            // 'integration/scenarios/xproduct/pers/519PersInfo.test.js',
            // 'integration/scenarios/xproduct/pers/720PersInfo.test.js',
            // 'integration/scenarios/xproduct/pers/804PersInfo.test.js',
            // 'integration/scenarios/xproduct/pers/1361PersInfo.test.js',
            // 'integration/scenarios/xproduct/pers/1548PersInfo.test.js',
            // 'integration/scenarios/xproduct/pers/1549PersInfo.test.js',

            'integration/scenarios/xproduct/deps/1355DepCTA.test.js',
            // 'integration/scenarios/xproduct/deps/1356DepPremChgPop.test.js',
            // 'integration/scenarios/xproduct/deps/1357DepChildAge.test.js',
            // 'integration/scenarios/xproduct/deps/1358DepSpouse-DP.test.js',
            // 'integration/scenarios/xproduct/deps/1359Dep-15Deps.test.js',

            // 'integration/scenarios/xproduct/facs/1365FacSearch.test.js',
            // 'integration/scenarios/xproduct/facs/1366FacSelect.test.js',
            // 'integration/scenarios/xproduct/facs/1367FacCTA.test.js',
            // 'integration/scenarios/xproduct/facs/1368FacFeedback.test.js',

            // 'integration/scenarios/xproduct/pays/1403PayCCExp.test.js',
            // 'integration/scenarios/xproduct/pays/1404PayAddrSug.test.js',
            // 'integration/scenarios/xproduct/pays/1405PayConAuthChk.test.js',
            // 'integration/scenarios/xproduct/pays/1406PayCTA.test.js',
            // 'integration/scenarios/xproduct/pays/1407PayCvv.test.js',

            // 'integration/scenarios/xproduct/ape2e/2092_E2EPayAnn_TwoDep.test.js',
            // 'integration/scenarios/xproduct/ape2e/2093_E2EPayAnn_ThreeDep.test.js',
            // 'integration/scenarios/xproduct/ape2e/2310_E2EPaySemiAnn_TwoDep.test.js',
            // 'integration/scenarios/xproduct/ape2e/2311_E2EPaySemiAnn_ThreeDep.test.js',
            // 'integration/scenarios/xproduct/ape2e/2312_E2EPayQua_TwoDep.test.js',
            // 'integration/scenarios/xproduct/ape2e/2313_E2EPayQua_ThreeDep.test.js',
            // 'integration/scenarios/xproduct/ape2e/2314_E2EPayMon_TwoDep.test.js',
            // 'integration/scenarios/xproduct/ape2e/2315_E2EPayMon_ThreeDep.test.js',

            // 'integration/scenarios/xproduct/dpe2e/2317_E2EPayCCAnn_TwoDep.test.js',
            // 'integration/scenarios/xproduct/dpe2e/2318_E2EPayCCAnn_ThreeDep.test.js',
            // 'integration/scenarios/xproduct/dpe2e/2319_E2EPayCCMon_TwoDep.test.js',
            // 'integration/scenarios/xproduct/dpe2e/2320_E2EPayCCMon_ThreeDep.test.js',
            // 'integration/scenarios/xproduct/dpe2e/2321_E2EPayCCQtr_TwoDep.test.js',
            // 'integration/scenarios/xproduct/dpe2e/2322_E2EPayCCQtr_ThreeDep.test.js',
            // 'integration/scenarios/xproduct/dpe2e/2323_E2EPayEFTAnn_TwoDep.test.js',
            // 'integration/scenarios/xproduct/dpe2e/2324_E2EPayEFTAnn_ThreeDep.test.js',
            // 'integration/scenarios/xproduct/dpe2e/2325_E2EPayEFTMon_TwoDep.test.js',
            // 'integration/scenarios/xproduct/dpe2e/2326_E2EPayEFTMon_ThreeDep.test.js',
            // 'integration/scenarios/xproduct/dpe2e/2327_E2EPayEFTQtr_TwoDep.test.js',
            // 'integration/scenarios/xproduct/dpe2e/2328_E2EPayEFTQtr_ThreeDep.test.js',

            // 'integration/scenarios/xproduct/e2eAP/1408.EndToEndWkFlo1.test.js',
            // 'integration/scenarios/xproduct/e2eAP/1461.EndToEndWkFlo2.test.js',
            // 'integration/scenarios/xproduct/e2eAP/1746DirHMO_WrkFlo1.test.js',
            // 'integration/scenarios/xproduct/e2eAP/1753DirHMO_WrkFlo4.test.js',
            // 'integration/scenarios/xproduct/e2eAP/1754DirHMO_WrkFlow5.test.js',
            // 'integration/scenarios/xproduct/e2eAP/1755DirHMO_WrkFlow6.test.js',
            // 'integration/scenarios/xproduct/e2eAP/1235E2E_POM_Workflow.js',
            // 'integration/scenarios/xproduct/e2eAP/addDep_Enroll.DeleteDep_depPage.js',
            // 'integration/scenarios/xproduct/e2eAP/cxauto90.test.js',
            // 'integration/scenarios/xproduct/e2eAP/cxauto91.test.js',

            // 'integration/scenarios/xproduct/content/VerifyContent.test.js',

            // 'integration/scenarios/xproduct/content/cxauto102.PDFValidation.test.js'

        ],

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
            'integration/scenarios/providers/cxauto63.test.js',
            'integration/scenarios/providers/cxautoYelp.test.js'
        ],

        pdallEnd: [
            'integration/scenarios/providers/cxinit2-1146.test.js',
            'integration/scenarios/providers/cxinit2-1207.test.js',
        ],
        test: ['integration/scenarios/xproduct/pers/507PersInfo.test.js',
            // 'integration/scenarios/xproduct/483PersInfo.test.js',
            // 'integration/scenarios/xproduct/489PersInfo.test.js', 
            //'integration/scenarios/xproduct/1355DepCTA.test.js',
            //'integration/scenarios/xproduct/1356DepPremChgPop.test.js',
            //'integration/scenarios/xproduct/1366FacSelect.test.js',

        ],
        api: [
            'integration/scenarios/providerapi/api_frisby.spec.js',
            'integration/scenarios/providerapi/providers.test.js',
            'integration/scenarios/providerapi/providersAbout.test.js',
            'integration/scenarios/providerapi/providersFacilities.test.js',
            'integration/scenarios/providerapi/providersKey.test.js',
            'integration/scenarios/providerapi/providersOffice.test.js',
            'integration/scenarios/providerapi/providersSuggestions.test.js'
        ],

        claimsApi: [
            // 'integration/scenarios/enrollClaimApi/claims.test.js',
            'integration/scenarios/enrollClaimApi/enroll.test.js'
        ],
        enrollee: [
            'integration/scenarios/enrollee/CXAUTO-188_LoginTo_Enrollee_Portal.test.js',
            'integration/scenarios/enrollee/CXAUTO-191_Dashboard_Page_Validation.test.js',
            'integration/scenarios/enrollee/CXAUTO-198_Benefits_Overview.test.js',
            'integration/scenarios/enrollee/CXAUTO-199_Claims_Visits.test.js',
            'integration/scenarios/enrollee/CXAUTO-204_PrintID_Card.test.js',
            'integration/scenarios/enrollee/CXAUTO-205_When_No_Claims_RecentVisits.test.js',
        ],

        newDitMpValidate: [
            'integration/scenarios/xproduct/pers/507PersInfo.test.js',
            'integration/scenarios/xproduct/deps/1355DepCTA.test.js',
            'integration/scenarios/xproduct/dpe2e/2321_E2EPayCCQtr_TwoDep.test.js',
            'integration/scenarios/xproduct/ape2e/2310_E2EPaySemiAnn_TwoDep.test.js'
        ]
    }
}