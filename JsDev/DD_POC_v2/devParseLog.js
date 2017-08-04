
var outputStream="";
var fs = require("fs");
var path = "C:\\DD_Repos\\dd-cx-test\\cmdLineArgs.txt";

fs.stat(path, function(error, stats) {
  fs.open(path, "r", function(error, fd) {
   var buffer = new Buffer(stats.size);
    fs.read(fd, buffer, 0, buffer.length, null, function(error, bytesRead, buffer) {
//      var cmdLineArgs_data = buffer.toString("utf8");
    	outputStream = buffer.toString("utf8");
     // console.log('outputStream is: ' +outputStream);
    });
  });
});



//var results = require('c:/cx/result.json');
var results = require('./results.json');

var testFails = '0';
var testPass = '0';
var total = results.length;
var temp_x = 0 ;
var myDuration = 0 ;
var totalDuration = 0 ;


for ( var i = 0; i < results.length; i++ ) {
	if (results[i].assertions[0].passed) {
	    testPass ++;	
	} 
	else { 
	    testFails ++;
	}
	
	myDuration = parseInt(myDuration) + parseInt(results[i].duration)
}
temp_x = myDuration / 60000

totalDuration = Math.round( temp_x * 100 ) / 100
// technique for rounding to two decimal point
// http://www.jacklmoore.com/notes/rounding-in-javascript/

console.log('Before I start, outputStream is: ' + outputStream );

console.log("<html><head><style type='text/css'>tr.fail {background-color: red;}</style><body><p>");
console.log("Generated " + Date() + "</p><table border='1' cellspacing='0' cellpadding='3'>");
//console.log( process.argv);
console.log("<thead><tr><th> Total Tests " + total +",<br\>Total Pass " + testPass + ",<br\>Total Fail " + testFails + ",<br\> Duration  " + totalDuration + " Minutes<br\>" );
console.log("Config and test Suite: " + outputStream +"<br\>")
console.log("</th><th>Result</th><th>Duration</th><th>Error Message</th></tr></thead>");


for (var i = 0; i < results.length; i++) {
	console.log("<tr");
	if (!results[i].assertions[0].passed) {
		console.log(" class='fail'")
	}		

	var result = results[i].assertions[0].passed ? "Passed" : "Failed";
	
	console.log("><td>" + results[i].description + "</td><td>" + result+ "</td><td>" + results[i].duration + "</td><td>");
	if (results[i].assertions[0].passed) {
		console.log("&nbsp;");
		
	} else {
		console.log(results[i].assertions[0].errorMsg);
	}
	console.log("</td></tr>");

 }     

console.log("<tr><td> </td><td> </td><td> </td><td>&nbsp;</td></tr>");
console.log("<tr><td> Test Totals </td><td> Test Cases </td><td>"+ total     +"</td><td></td></tr>");
console.log("<tr><td> Test Pass </td><td> Test Cases </td><td>"  + testPass  +"</td><td></td></tr>");
console.log("<tr><td> Test Fail </td><td> Test Cases </td><td>"  + testFails +"</td><td></td></tr>");



console.log("<tbody></tbody></table><hr /></body></html>");


