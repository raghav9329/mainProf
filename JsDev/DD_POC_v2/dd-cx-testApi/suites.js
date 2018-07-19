module.exports = {

    suitesCollection: {
       
        providerApi: [
            // 'integration/scenarios/devEng/providerapi/api_frisby.spec.js',
            // 'integration/scenarios/devEng/providerapi/providers.test.js',
            // 'integration/scenarios/devEng/providerapi/providersAbout.test.js',
            // 'integration/scenarios/devEng/providerapi/providersFacilities.test.js',
            'integration/scenarios/devEng/providerapi/providersKey.test.js',
            // 'integration/scenarios/devEng/providerapi/providersOffice.test.js',
            // 'integration/scenarios/devEng/providerapi/providersSuggestions.test.js'

        ],


        devEng: [
            'integration/scenarios/devEng/enrollClaimApi/claims.test.js',
            'integration/scenarios/devEng/enrollClaimApi/enrollee_withPHI.js',
            'integration/scenarios/devEng/enrollClaimApi/enroll.test.js',
            'integration/scenarios/devEng/enrollClaimApi/familyRosterContract.js',
            'integration/scenarios/devEng/enrollClaimApi/familyRosterEnrollee.js',
            'integration/scenarios/devEng/enrollClaimApi/omnibusRule_withContractId.js',
            'integration/scenarios/devEng/enrollClaimApi/omnibusRule_withEnrolleeId.js',
            'integration/scenarios/devEng/enrollClaimApi/UUContract.js',
            'integration/scenarios/devEng/enrollClaimApi/uuEnrollee.js',
          ],



        devAuto: [
            'integration/scenarios/devAuto/enrollClaimApi/claims.test.js',
            'integration/scenarios/devAuto/enrollClaimApi/enroll.test.js',
            'integration/scenarios/devAuto/enrollClaimApi/familyRosterContract.js',
            'integration/scenarios/devAuto/enrollClaimApi/familyRosterEnrollee.js',
            'integration/scenarios/devAuto/enrollClaimApi/omnibusRule_withContractId.js',
            'integration/scenarios/devAuto/enrollClaimApi/omnibusRule_withEnrolleeId.js',
            'integration/scenarios/devAuto/enrollClaimApi/UUContract.js',
            'integration/scenarios/devAuto/enrollClaimApi/uuEnrollee.js',
        ],
        

    }
}
