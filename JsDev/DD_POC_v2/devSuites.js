module.exports = {

    suitesCollection: {
        independent: 'integration/scenarios/dhmo/1754DirHMO_WrkFlow5.test.js',

        allCxinit: 'integration/scenarios/dhmo/*.test.js',
        smoke: 'integration/scenarios/devTeam/507PersInfo.test.js',

        pers1: [
            'integration/scenarios/dhmo/471PersInfo.test.js',
            'integration/scenarios/dhmo/519PersInfo.test.js'
        ],


        buy2shop: ['integration/scenarios/xproduct/Buying2Shopping.test.js'],
        
    }
}
