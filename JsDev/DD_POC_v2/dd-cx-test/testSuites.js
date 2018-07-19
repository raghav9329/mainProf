module.exports = {

    suitesCollection: {
        pers: [ 'integration/scenarios/xproduct/pers/*.js'         ],
        deps: [ 'integration/scenarios/xproduct/deps/*.js'         ],
        facs: [ 'integration/scenarios/xproduct/facs/*.js'         ],
        pays: [ 'integration/scenarios/xproduct/pays/*.js'         ],
        ape2e: [ 'integration/scenarios/xproduct/ape2e/*.js'       ],
        dpe2e: [ 'integration/scenarios/xproduct/dpe2e/*.js'       ],
        e2eAllProds: [ 'integration/scenarios/xproduct/e2eAP/*.js' ],
        aarpShopping: [ 'integration/scenarios/xproduct/shop/*.js' ],
        content: [ 'integration/scenarios/xproduct/content/*.js'   ],
        xproduct: [ 'integration/scenarios/xproduct/**/*.js'       ],
        xproduct2: [ ],

        //hclfocus: this suite grew way beyond the intent I had

        pdall: ['integration/scenarios/providers/*.test.js',       ],
        api: [ 'integration/scenarios/providerapi/*.js',           ]
    }
}
