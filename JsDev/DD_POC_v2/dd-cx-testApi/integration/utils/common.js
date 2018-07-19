/*
 * "common.js" file to maintain all reusable functions 
 */
// "mkdirp" node module for make a new directory
var mkdirp                  = require('mkdirp');
// moment node module for date object
var m                       = require('moment');
// fs node module for file system operations
var fs                      = require("fs");
var fileName                = './metadata.json';
var metadata                = {};
// Capturing test suite statrt time
var testSuiteStartTime      = m().format("MM/DD/YYYY HH:mm:ss");
metadata.testSuiteStartTime = testSuiteStartTime;

//Capturing Commandline arguments
var cmdLineFileData         = '';
process.argv.forEach(function(ele, index) {
    if (index > 1) {
        cmdLineFileData = cmdLineFileData + process.argv[index];
    }
})

metadata.executionCommand = "protractor " + cmdLineFileData;

var Utility = function() {

    /*
     * Builds API url based on given arguments
     * @param {resource} API
     * @param {resourceKey}
     * @params {params}
     */
    this.getapiurl = function(resource, resourceKey, params) {
        switch (resource.toUpperCase()) {
            case 'ABOUT':
                return (browser.params.apiurl + '/about');
            case 'FACILITIES':
                return (browser.params.apiurl + '/providers/facilities/' + resourceKey + buildurl(params).slice(0, -1));
            case 'LOCATIONS':
                return (browser.params.apiurl + '/providers/locations/' + resourceKey + buildurl(params).slice(0, -1));
            case 'SUGGESTIONS':
                return (browser.params.apiurl + '/providers/suggestions' + buildurl(params).slice(0, -1));
            case 'PROVIDERKEY':
                return (browser.params.apiurl + '/providers/' + resourceKey + buildurl(params).slice(0, -1));
            case 'PROVIDERS':
                return (browser.params.apiurl + '/providers' + buildurl(params).slice(0, -1));
            case 'INDEXER':
                return (browser.params.apiurl + ':19556/providers/index');
            case 'YELP':
            case 'YELPDOWNLOAD':
            case 'YELPUPLOAD':
                return (browser.params.apiurl + ':19556/providers/yelp');
            case 'CLAIMID':
                return (browser.params.apiurl + ':19581/claims' + '/' + resourceKey);
            case 'ENROLLEES':
                return (browser.params.apiurl + ':19581/enrollees' + '/' + resourceKey + '/claims/');
            case 'FAMILYCONTRACT':
                return (browser.params.apiurl + ':19583/persons' + '/' + resourceKey + '/contracts/');
            case 'FAMILYENROLLEE':
                return (browser.params.apiurl + ':19583/contracts' + '/' + resourceKey + '/enrollees' + buildurl(params).slice(0, -1));
            case 'USAGEENROLLEE':
                return (browser.params.apiurl + ':19582/enrollees' + '/' + resourceKey + '/usages/');
            case 'USAGECONTRACT':
                return (browser.params.apiurl + ':19582/contracts' + '/' + resourceKey + '/usages/');
            case 'OMNIBUSCONTRACT':
                return (browser.params.apiurl + ':19584/contracts' + '/' + resourceKey + '/rules/'+ buildurl(params).slice(0, -1));
            case 'OMNIBUSENROLLEE':
                return (browser.params.apiurl + ':19584/enrollees' + '/' + resourceKey + '/rules/' + buildurl(params).slice(0, -1));

        }





        // function buildurl(o) {
        //     return Object.keys(o).reduce(function(previous, key) {
        //         return previous + key + '=' + o[key] + '&';
        //     }, '?');
        // }
        // return (browser.params.apiurl + buildurl(dataObj).slice(0, -1));

        // Builds url with params and consumed in getapiurl()  function
        function buildurl(o) {
            return Object.keys(o).reduce(function(previous, key) {
                // console.log("type" + typeof o[key]);
                if ((typeof o[key]) === 'object') {
                    var aa = specialty(key, o[key]);
                    // console.log("aa==" + aa);
                    var spl = previous + aa + '&';
                    return spl.slice(0, -1);
                } else {
                    // console.log("key + '=' + o[key] + '&'"+key + '=' + o[key] + '&')
                    return previous + key + '=' + o[key] + '&';
                }

            }, '?');
        }

        // This function is consumed in buildurl() function
        function specialty(k, vals) {
            return vals.reduce(function(p, c) {
                return p + k + '=' + c + '&';

            }, '')
        }


    }

    // Returns Date in specified format
    this.getDateFormatString = function(inputDate) {
        return (new Date(inputDate).getMonth() + 1) + '-' + new Date(inputDate).getDate() + '-' + new Date(inputDate).getFullYear();
    }

    // Used to capture time between two time stamps
    this.getDistanceBetweenTwoPoints = function(lat1, lon1, lat2, lon2, unit) {
        var theta = lon1 - lon2;
        var dist = Math.sin(lat1 * Math.PI / 180.0) * Math.sin(lat2 * Math.PI / 180.0) + Math.cos(lat1 * Math.PI / 180.0) * Math.cos(lat2 * Math.PI / 180.0) * Math.cos(theta * Math.PI / 180.0);
        dist = Math.acos(dist);
        dist = dist * 180 / Math.PI;
        dist = dist * 60 * 1.1515;
        if (unit == "K") {
            dist = dist * 1.609344;
        } else if (unit == "N") {
            dist = dist * 0.8684;
        }
        return (dist);
    }

    /*
     * To capture the duplicate items from an array 
     */
    this.getDuplicateElementsFromArray = function(arr) {
        let i;
        const len = arr.length;
        const result = [];
        const obj = {};
        for (i = 0; i < len; i++) {
            obj[arr[i]] = 0;
        }
        for (i in obj) {
            result.push(i);
        }
        return result;
    }

    /**
     * To generate a random number of given length
     * @param  {String} type (Number or String)
     * @param  {Number} length of the string required
     * @return {Number or String} returns number/string of length provided with random alphabets
     */
    this.randomNo = function(type, length) {
        try {
            var oresult = undefined;
            switch (type.toUpperCase()) {
                case 'STRING':
                    oresult = '';
                    var str = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
                    for (var i = 0; i < length; i++) {
                        oresult = str.charAt(Math.floor(Math.random() * str.length)) + oresult;
                    }
                    logger.info('random string of length ' + length + ' for is :' + oresult);
                    break;
                case 'NUMBER':
                    var oresult = Math.floor(Math.pow(10, length - 1) + Math.random() * 9 * Math.pow(10, length - 1));
                    logger.info('random number of length ' + length + ' for is :' + oresult);
                    break;
                default:
                    oresult = undefined;
                    break;
            }
        } catch (err) {
            logger.info('ERROR', "Failed to retrieving text from alert due to " + err.message);
            return false;
        }

        return oresult;
    };

    /*
     * Renaming dashboardNGTA.html file to dashboardNGTA_timestamp.html and moving all results to previousResults directory
     * This function is used in reporter
     */
    this.renameReports = function(obj) {
        try {
            if (fs.existsSync('./results/') == false) {
                mkdirp('./previousResults/', function(err) {});
                mkdirp('./results/', function(err) {});
            }

            fs.writeFile(fileName, JSON.stringify(metadata), function(err) {});

            fs.readFile('./dashboardNGTA.html', 'utf8', function(err, data) {
                if (!err) {
                    data.replace(/LAST UPDATED AT:-(.*?)<\/h2><\/td>/g, function(
                        match,
                        datestring
                    ) {
                        dt = new Date(datestring)
                        sd = m(dt).format('YYYY-MM-Do-h-mm-ss');
                        console.log(sd);
                        fs.rename('./dashboardNGTA.html', './dashboardNGTA_' + sd + '.html', function(err) {            });

                    });
                }
                fs.rename('./results', './previousResults/results_' + m().format('YYYY-MM-Do-h-mm-ss'), function(err) {
                });
            });
        } catch (err) {
            console.log(err)
        }
    }
}

module.exports = Utility;