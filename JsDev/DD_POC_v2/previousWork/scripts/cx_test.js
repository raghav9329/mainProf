#!/usr/bin/env node

var Executor = require('./test/test_util').Executor;

var passingTests = [
	//CX Field Validation tests
	'node ../built/cli.js ../spec/cx/cxConfg.js'
	/* ,
	'node ../built/cli.js ../spec/cx/cxUseCasesConfig.js',
	'node ../built/cli.js ../spec/cx/cxFunctionalTestConfig.js',
	'node ../built/cli.js ../spec/cx/cxEndToEndTestConfig.js' */
];

var executor = new Executor();

passingTests.forEach(function(passing_test) {
  executor.addCommandlineTest(passing_test)
      .assertExitCodeOnly();
});

///*************************
// *Below are failure tests*
// *************************/
//

executor.execute();
