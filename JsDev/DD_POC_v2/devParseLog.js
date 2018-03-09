/////////////////////////////////////////////////////////////////////////////////////////
//
//var results = require('c:/cx/result.json');
// There was a quesiton about why the line below is differfent from the line above
var results	= require('./results.json'); 
// Answer:  parsing the results.json file needs to be done where  results.json file is generated.  The initial development and use 
// of the code was done from a base session this will have to be made windows batch file runnable and may need explisitly naming the
// path to the file as the first line identifies.
// ================================================================================================
// Following small three line section reads in values from a small file spec conf writes these values out to a file thie reads it in
// https://www.google.com/search?q=example+javascript+io+file+read+synchronization&rlz=1C1NHXL_enUS726US726&oq=example+javascript+io+file+read+synchronization&aqs=chrome..69i57.16087j0j1&sourceid=chrome&ie=UTF-8&safe=active
// http://www.daveeddy.com/2013/03/26/synchronous-file-io-in-nodejs/
//======================================================================

// The following three lines are reuired to  r/w on Files and date & duration calculation
var moment	= require('moment');
var fs = require("fs");
var os = require("os");	

var testFails	= '0';			// HTML Output initial value
var testPass	= '0';			// HTML Output initial value
var total	= results.length;	// JSON FILE size, I think
var temp_x	= 0 ;				// HTML Output initial value
var myDuration	= 0 ;			// HTML Output initial value
var internalDuration = 0 ;		// HTML Output initial value


// *************** File Specification ***************************************************************

var fileThen					= __dirname + "\\FileThen.txt";					// When the test was started
var fileNow						= __dirname + "\\FileNow.txt";					// When the test finished
var fileHostname				= __dirname + "\\FileHostName.txt";				// Host name of machine that runs test
var fileCmdLineArgs				= __dirname + "\\FileCmdLineArgs.txt";			// command line arguments after "protractor"
//var fileAppServer				= __dirname + "\\devUtilityFile__AppServerName.txt"; // replaced by FileAppServer
var fileAppServer				= __dirname + "\\FileAppServer.txt";			// BaseUrl of the Web App Server
var fileRJMd5					= __dirname + "\\FileRJMd5.txt";				// MD5 Hash of the Results.json


// This list zeroth value is a place holder to make 1 === Jan  not 0 === Jan )
var monthNames		= ["null", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov",  "Dec"];

// Generate Strings from file content.
var str_hostname				= fs.readFileSync( fileHostname ).toString();
var str_cmdLineArgs				= fs.readFileSync( fileCmdLineArgs ).toString();
var str_appServer				= fs.readFileSync( fileAppServer ).toString();
var now							= fs.readFileSync( fileNow ).toString();
var then						= fs.readFileSync( fileThen ).toString();
var rsltJsonMD5					= fs.readFileSync( fileRJMd5 ).toString();

//debug on
//console.log("then was: .... "+then); //console.log("now is: .... "+now); //console.log("<br\>")
// debug off

//var ms			= moment(now,  "DD/MM/YYYY HH:mm:ss").diff(moment(then,"DD/MM/YYYY HH:mm:ss"));
var ms			= moment(now,  "MM/DD/YYYY HH:mm:ss").diff(moment(then,"MM/DD/YYYY HH:mm:ss"));
var tempStr		= ms.toString();

//debug on
//console.log("ms value in miliseconds is: "+tempStr);   //console.log("<br\>")
// debug off

var d 		= moment.duration(ms)
var s		= Math.floor(d.asHours()) + moment.utc(ms).format(":mm:ss");
var externalDuration	= (( 1440*d.days()) + (60*d.hours() ) + (d.minutes()) );
var monVal	="";


// debug on
// console.log(" moment d is: " +d.toString() );    // console.log("<br\>")
// debug off

if (then.substr(0,1) === "0")  {
	monVal	= then.slice(1,2) ;
	} else {
	monVal	= then.slice(0,2);
}


// DEBUG Statement  console.log(" the then monthy value === " +monVal);
var thenFormatted	= monthNames[monVal];
thenFormatted 		= thenFormatted+" "+then.slice(3,5)+" "+then.slice(6); // slice used with just one arg , EOL is assumed
// DEBUG Statement console.log(" then Formatted is now " +thenFormatted);

monVal = "";  // set to null

if (now.substr(0,1) === "0")  {
	monVal	= now.slice(1,2) ;
	} else {
	monVal	= now.slice(0,2);
}

// DEBUG Statement console.log(" the number of the month is: "+monVal);
var nowFormatted		=monthNames[monVal];
nowFormatted	= nowFormatted+" "+now.slice(3,5)+" "+now.slice(6);


// debug on
// console.log("<br\>"); // console.log("now Formatted starts: "+nowFormatted); // console.log("<br\>") // console.log("externalDuration has value :" +externalDuration);


// console.log("or the answer in days, hours, min, sec is : "+d.days()+" " +d.hours()+" " +d.minutes() +" " +d.seconds());
// console.log("<br\>") // console.log(" and the answer is: " +s);;
// console.log(" And Finally total sum or Min is: " +externalDuration	); // console.log( " <br\>");
// debug off

// ******************  first pass through resulst.json *****************************
// one pass throught he results.json file in order to summ up 
// the number of  Passes and Failes for reporting
for ( var i = 0; i < results.length; i++ ) {
	if (results[i].assertions[0].passed) {
	    testPass ++;	
	} else { testFails ++;
	}
	myDuration = parseInt(myDuration) + parseInt(results[i].duration)
}
temp_x = myDuration / 60000

internalDuration = Math.round( temp_x * 100 ) / 100
// technique for rounding to two decimal point
// http://www.jacklmoore.com/notes/rounding-in-javascript/


console.log("<html><head><style type='text/css'>tr.fail {background-color: red;}</style><body><p>");
console.log("</p><table border='1' cellspacing='0' cellpadding='3'>");
//csole.log( "<thead><tr><th width='650'> |&nbsp TestDate:StartTime &nbsp|&nbsp TestDate : EndTime &nbsp|&nbsp <br\>");
console.log( "<thead><tr><th width='34%'> |&nbsp TestDate:StartTime &nbsp|&nbsp TestDate : EndTime &nbsp|&nbsp <br\>");

console.log(thenFormatted+" &nbsp |&nbsp "+nowFormatted +"<br\> ");

console.log( "Total Tests&nbsp&nbsp "+"<b id=totalTests>" +total+"<br\>Total Pass "+"<b id=totalPass>" +testPass+ " &nbsp &nbsp &nbsp TotalFail "+"<b id=totalFail>" + testFails );

console.log( "<br\> Internal execution time "+"<b id=internalDuration>" + internalDuration + " Min &nbsp <br\> External Duration "+"<b id=externalDuration>" +externalDuration+ " Min <br\>" );

console.log( "Test Runner HostName, &nbsp &nbsp  Config file,  &nbsp &nbsp Test Suites<br\> ");

console.log("<b id=hostname>"+ str_hostname+"  "+"<b id=cdlArgs>" + str_cmdLineArgs +"	<br\>");

console.log( "Web App Server: "+"<b id=appSrvName>" +str_appServer+ "<br\>");

console.log("<b id=md5Hash>"+rsltJsonMD5);

console.log( "</th><th>Result</th><th>Duration</th><th>Error Message</th></tr></thead>");


for (var i = 0; i < results.length; i++) {
	console.log("<tr");
	if (!results[i].assertions[0].passed) {
		console.log(" class='fail'")
	}		

	var result = results[i].assertions[0].passed ? "Passed" : "Failed";
	
	console.log("><td>" + results[i].description + "</td><td>" + result+ "</td><td>" + results[i].duration + "</td><td>");
	if (results[i].assertions[0].passed) {
		console.log("&nbsp;");
	} else { console.log(results[i].assertions[0].errorMsg);
	}
	console.log("</td></tr>");

 }     

console.log("<tr><td> </td><td> </td><td> </td><td>&nbsp;</td></tr>");
console.log("<tr><td> Test Totals </td><td> Test Cases </td><td>"+ total     +"</td><td></td></tr>");
console.log("<tr><td> Test Pass </td><td> Test Cases </td><td>"  + testPass  +"</td><td></td></tr>");
console.log("<tr><td> Test Fail </td><td> Test Cases </td><td>"  + testFails +"</td><td></td></tr>");



console.log("<tbody></tbody></table><hr /></body></html>");


