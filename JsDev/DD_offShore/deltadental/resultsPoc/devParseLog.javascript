//var results = require('c:/cx/result.json');
var results = require('./results.json');

var testFails = '';
var testPass = '';
var total = results.length;

for ( var i = 0; i < results.length; i++ ) {
	if (results[i].assertions[0].passed) {
	    testPass ++;	
	} 
	else { 
	    testFails ++;
	}
}


console.log("<html><head><style type='text/css'>tr.fail {background-color: red;}</style><body><p>");
console.log("Generated " + Date() + "</p><table border='1' cellspacing='0' cellpadding='3'>");
console.log("<thead><tr><th> Total Tests " + total +",<br\>Total Pass " + testPass + ",<br\>Total Fail " + testFails + ",<br\> Description " );
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


