// Author:  Mark Atkinson
// Purpose: generate a file with the current time in it for devParselog consumption
// Format: Hours : Min   eg, 23:55
var moment	= require('moment');
var fs		= require("fs");

//var endDate_obj	= new Date();
var now_date	= new Date();


//var outFile	= __dirname + "\\cmdLineArgsFile4.txt";
var fileNow 	= __dirname + "\\FileNow.txt"

//var data	= endDate_obj.getHours()+":"+endDate_obj.getMinutes();

// This was the files original file write routing that is being
// re-writen with the new stuff on line 27
// fs.writeFile( outFile, data, function(error){
// 	if (error) { console.error("write error: "+error.message);
// 	} else { console.log("successful write of testRun End time to "+outFile);
// 	}
//});


var nowMoment_obj		= moment(now_date ).format("MM/DD/YYYY HH:mm:ss");
//var nowMoment_obj		= moment(now_date ).format("DD/MM/YYYY HH:mm:ss");
var str_nowMoment_obj	= nowMoment_obj.toString();

fs.writeFile( fileNow , str_nowMoment_obj , function(error){
	if (error) { console.error("write error: "+error.message);
	} else { console.log("successful write of testRun End time to "+fileNow);
	}
});


console.log("from getEndDateCmd.js....")
console.log("FileNow....should be: "+str_nowMoment_obj);
