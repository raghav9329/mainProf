/////////////////////////////////////////////////////////////////////////////////////////
//
var results = require('c:/cx/result.json');
// There was a quesiton about why the line below is differfent from the line above
//var results	= require('./results.json'); 
// Answer:  parsing the results.json file needs to be done where  results.json file is generated.
// The initial development and use of the code was done from a base session
// this willl have to be made windows batch file runnable and may need 
// explisitly naming the path to the file as the first line identifies.

// The following three lines are reuired to  r/w on Files 
// calculation of dates acqusition of the runner ???? do I need that ????			
var moment	= require('moment');
var fs = require("fs");
var os = require("os");	// I've alreaday got the runner from the spec conf.  
						// now I need to grep the server URL we point at 


//  Folloiwng six lines are for calculations used for the HTML Output.
var testFails	= '0';
var testPass	= '0';
var total	= results.length;
var temp_x	= 0 ;
var myDuration	= 0 ;
var internalDuration = 0 ;

// ================================================================================================
// have a look at the following in order to be able to execut shell command form within javascript
// grep baseUrl <spec config> | grep -v "\s//"   
// this 

//https://stackoverflow.com/questions/1880198/how-to-execute-shell-command-in-javascript

//======================================================================
// Following small three line section reads in values from a small file spec conf writes these values out to a file thie reads it in
// https://www.google.com/search?q=example+javascript+io+file+read+synchronization&rlz=1C1NHXL_enUS726US726&oq=example+javascript+io+file+read+synchronization&aqs=chrome..69i57.16087j0j1&sourceid=chrome&ie=UTF-8&safe=active
// http://www.daveeddy.com/2013/03/26/synchronous-file-io-in-nodejs/
//======================================================================

// 11/27/17  Late in development:  I have not resolved the issue of finding the app server string
// from the spec.conf.js file.  
// Algorithm:  Find string baseUrl in the file, get the whole string, then do JavaScript String 
// Methods str.search str.indexof str.slice functions in order to get mot.deltadentalins.com/yada/yada/blablabla
// in the mean time still will have to use devUtillityFile_AppServerName.txt

// *************** File Specification ***************************************************************
// Files objects
// Test run start time is FileThen.txt Test runner machine is FileHostName.txt
// Test run spec.conf.js and suites executed is FileCmdLineArgs.txt
// devUtilityFile_AppServerName.txt is a temporary solution for getting
// the app server name out of baseUrl string.
var fileThen				= __dirname + "\\FileThen.txt";
var fileHostname			= __dirname + "\\FileHostName.txt";
var fileCmdLineArgs			= __dirname + "\\FileCmdLineArgs.txt";
var file5AppServer			= __dirname + "\\devUtilityFile__AppServerName.txt";
var fileNow				= __dirname + "\\FileNow.txt";
var fileRJMd5				= __dirname + "\\FileRJMd5.txt";


// This list zeroth value is a place holder to make Jan === 1  not zero (0)
var monthNames		= ["null", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov",  "Dec"];

// Generate Strings from file content.
var str_hostname		= fs.readFileSync( fileHostname ).toString();
var str_cmdLineArgs		= fs.readFileSync( fileCmdLineArgs ).toString();
var str_appServer		= fs.readFileSync( file5AppServer ).toString();
var now					= fs.readFileSync( fileNow ).toString();
var then				= fs.readFileSync( fileThen ).toString();
var rsltJsonMD5				= fs.readFileSync( fileRJMd5 ).toString();

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
//var externalDuration	= ( 1440*d.days() );
//var externalDuration	= 245;
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
thenFormatted 		= thenFormatted+" "+then.slice(3,5)+" "+then.slice(6);
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

console.log( "Total Tests &nbsp &nbsp" + total +"<br\>Total Pass " + testPass + " &nbsp &nbsp &nbsp TotalFail " + testFails );

console.log( "<br\> Internal execution time " + internalDuration + " Min &nbsp <br\> External Duration " +externalDuration+ " Min <br\>" );

console.log( "Test Runner HostName, &nbsp &nbsp  Config file,  &nbsp &nbsp Test Suites<br\> ");

console.log( str_hostname+"  " + str_cmdLineArgs +"	<br\>");

console.log( "Web App Server: " +str_appServer+ "<br\>");

console.log(rsltJsonMD5);

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


