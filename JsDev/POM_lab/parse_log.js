var results = require('c:/cx/result.json');

console.log("<html><head><style type='text/css'>tr.fail {background-color: red;}</style><body><p>");
console.log("Generated " + Date() + "</p><table border='1' cellspacing='0' cellpadding='3'>");
console.log("<thead><tr><th>Description</th><th>Result</th><th>Duration</th><th>Error Message</th></tr></thead>");

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

console.log("<tbody></tbody></table><hr /></body></html>");