var statsFileGen = function (){

var moment		= require('moment');
var fs = require ("fs");
var os = require ("os");

var dateObj		= new Date();  // Get a Date
var formatString = "MM/DD/YYYY HH:mm:ss";


//var then_moment_obj     = moment(dateObj).format("MM/DD/YYYY HH:mm:ss");
var then_moment_obj     = moment(dateObj).format(formatString);

var str_ThenMomentObj	= then_moment_obj.toString();

// debug on
// console.log("testing toString() on the momentObject: " +str_ThenMomentObj);
// console.log("this value should be RIGNT NOW    __    CHECK IT")
// console.log("");
// debug off


// ************** File Creation **********************************************************
// File for Start time: In future when run ends, start will be "then", end will be "now"
// File for the runner Host Name
// File for the command Line Arguments
var fileThenMomentStr	= __dirname + "\\FileThen.txt";
var fileHoseName    	= __dirname + "\\FileHostName.txt";
var fileCmdLineArgs		= __dirname + "\\FileCmdLineArgs.txt";
var fileThisSpecConf    = __dirname + "\\str_cmdLineRptGen.conf.js";  // WTF Why do I have this ???
var fileAppServer       = __dirname + "\\FileAppServer.txt";

var bigString           = fs.readFileSync( fileThisSpecConf ).toString();
var start_index         = bigString.indexOf("baseUrl");
var end_index           = bigString.indexOf(',', start_index);
var strAppServer        = bigString.substring( (start_index+9), (end_index-1) );

// Write FileAppServer.txt out to disk
fs.writeFile(fileAppServer, strAppServer, function(error){
	if (error) { console.error("write error: "+error.message);
	} //else { console.log("successful write to "+fileThenMomentStr);
	//}
});


// Write the FileThen.txt out disk
fs.writeFile(fileThenMomentStr, str_ThenMomentObj, function(error){
	if (error) { console.error("write error: "+error.message);
	} //else { console.log("successful write to "+fileThenMomentStr);
	//}
});


// Write the hosename file
var runnerHostName      = os.hostname();
fs.writeFile(fileHoseName, runnerHostName, function(error){
	if (error) { console.error("write error: "+error.message);
	} //else { console.log("successful write to "+fileHoseName);
	//}
});

// Write the command Line Date to file
var specConf              = process.argv[2];  // rename specConf
var suiteExecuted         = process.argv[3];      // rename suiteExecuted
var arg_four     = process.argv[4];
var arg_five     = process.argv[5];
var arg_six      = process.argv[6];
var arg_seven    = process.argv[7];
var arg_eight    = process.argv[8];
var arg_nine    = process.argv[9];
var cmdLineFileData     = specConf+" "+suiteExecuted+" "+arg_four+" "+arg_five+" "+arg_six+" "+arg_seven+" "+arg_eight+" "+arg_nine;
fs.writeFile(fileCmdLineArgs, cmdLineFileData, function(error){
	if (error) { console.error("write error: "+error.message);
	} else { console.log("successful write to "+fileCmdLineArgs);
	}
});

console.log("Files Complete")

}; // end of source file

module.exports = statsFileGen;
