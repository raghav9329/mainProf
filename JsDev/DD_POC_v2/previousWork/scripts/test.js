#!/usr/bin/env node

var Executor = require('./test/test_util').Executor;

var passingTests = [
	//CX Field Validation tests
	'node built/cli.js spec/cx/cxConfg.js'
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
