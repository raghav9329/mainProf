//Ref: https://jasmine.github.io/2.1/custom_reporter.html
var JasmineLogReporter = function() {
    return {
        jasmineStarted: function(suiteInfo) {
            logger.info("\r\n\r\n\r\n***********************************************************************************");
            logger.info("Running suite(s) with total " + suiteInfo.totalSpecsDefined + " specs.");
        },
        suiteStarted: function(result) {
            logger.info("********************Test suite started: " + result.fullName);
        },
        specStarted: function(result) {
            logger.info("==================== Spec started: " + result.fullName);
        },
        specDone: function(result) {
            logger.info("==================== Spec done with result :'" + result.status + "': " + result.fullName);
            for (var i = 0; i < result.failedExpectations.length; i++) {
                logger.info("==================== Spec failure details:\r\n" +
                    result.failedExpectations[i].message + "\r\n" +
                    result.failedExpectations[i].stack);
            }
        },
        suiteDone: function(result) {
            logger.info("********************Test suite done with result '" + result.status + "': " + result.fullName);
            for (var i = 0; i < result.failedExpectations.length; i++) {
                logger.info("********************Suit failure details:\r\n" +
                    result.failedExpectations[i].message + "\r\n" +
                    result.failedExpectations[i].stack);
            }
        },
        jasmineDone: function() {
            logger.info("Finished running all suite(s).");
            logger.info("\r\n\r\n\r\n***********************************************************************************");
        }
    };
};

/**
 * @memberof module:Helpers
 * @type {JasmineLogReporter}
 */
module.exports = JasmineLogReporter;
