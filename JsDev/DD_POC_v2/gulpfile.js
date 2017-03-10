"use strict";
var path = require("path");
var gulp = require("gulp");
var Promise = require("bluebird");
var gutil = require("gulp-util");
var options = require("./gulp/utils/commandLineOps.js");
var runSequentially = require("./gulp/utils/runSequentially.js");
var getBundler = require("./gulp/utils/getBundler.js");

var generateVersionInfo = require("./gulp/steps/generateVersionInfo.js");
var cleanTemplates = require("./gulp/steps/cleanTemplates.js");
var cleanTargets = require("./gulp/steps/cleanTargets.js");
var buildCSS = require("./gulp/steps/buildCSS.js");
var build = require("./gulp/steps/build.js");
var bundleJs = require("./gulp/steps/bundleJs.js");
var templates = require("./gulp/steps/templates.js");
var copyFonts = require("./gulp/steps/copyFonts.js");
var intTestReport = require('./gulp/tasks/intTestReport.js');


gutil.log("Using options: " + JSON.stringify(options, null, 2));

const REPORT_PATH = './reports/integration/';

gulp.task("generateJasmineReport", function () {
    var steps = [Promise.promisify(function() {
        var resultsXMLFile = options.file ? options.file : REPORT_PATH + 'int-test-results.xml';
        var exportedFilename = intTestReport.generate(resultsXMLFile);
        console.log('Report generated at: ', exportedFilename);
    })];

    return runSequentially(steps);
});


