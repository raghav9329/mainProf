//CX Automation Framework Libraries - Reporting Functionalities.
//--- Author : Uday Thombre (UThombre@delta.org)

var Structures = require('./cx_structures.js');
var FileSystem = require('fs');

var cxFRMWRKReporter = {

	//--- Valid parameter names : Message
	takeScreenShot : function(parameters) {
		this.log({'Message': 'Screen Shot at : ' + parameters.Message,
				  'Location' : Structures.ReportLocations.Console});
		var fileName = delta_cx_automation_suite.replace(':', '_').replace(' ', '_');
		fileName = fileName.concat(parameters.Message.toString());
		fileName = fileName.concat(Math.random());
		/* var thisBrowser = 'internet explorer';
		browser.getCapabilities().then(function(caps){
			thisBrowser = caps.caps_.browserName;
		});
		fileName = thisBrowser.concat('_').concat(fileName); */
		fileName = fileName.replace(/:/g, '_');
		fileName = fileName.replace(' ', '_');
		fileName = fileName.replace('.', '-');
		fileName = fileName.replace('/', '');
		fileName = fileName.replace('(', '');
		fileName = fileName.replace(')', '');
		fileName = fileName.replace('\\', '');
		fileName = fileName.concat(".png");		
		var toScreenshotFile = delta_cx_dir_screenshots.concat(fileName);
		browser.takeScreenshot().then(
			function(png) {
				var fs = require('fs');
				var stream = fs.createWriteStream(toScreenshotFile);
				stream.write(new Buffer(png, 'base64'));
				stream.end();
			});
	},

	//--- Valid parameter names : Message, Location, ScreenShot
	log : function(parameters) { 
		switch (parameters.Location)
		{
			case Structures.ReportLocations.Console:
				this.writer({'DataCSS' : parameters.Message,
							 'Directory' : Structures.ReportFiles.Directory,
							 'File' : Structures.ReportFiles.ConsoleLog,
							 'WriterType' : Structures.Writers.ASCII});
				break;
			case Structures.ReportLocations.XML:
				break;
			case Structures.ReportLocations.HTML:
				break;
			case Structures.ReportLocations.JSON:
				break;
			case Structures.ReportLocations.All:
				this.generateReports(Structures.ReportLocations.Console);
				this.generateReports(Structures.ReportLocations.XML);
				this.generateReports(Structures.ReportLocations.HTML);
				this.generateReports(Structures.ReportLocations.JSON);
				break;
			default:
				this.log({'Message' : parameters.Message,
						  'Location' : Structures.ReportLocations.All,
						  'ScreenShot' : true});
				break;
		}
		if (parameters.ScreenShot == true) {
			this.takeScreenShot({'Message' : parameters.Message});
		}
	},

	//--- Valid parameter names : DataCSS, Directory, File, WriterType
	writer : function(parameters) {
		var _file = parameters.Directory + parameters.File;
		switch(parameters.WriterType) {
			case Structures.Writers.ASCII:
				FileSystem.appendFile(_file, parameters.DataCSS + String.fromCharCode(13), function (err) {
				  if (err) throw err;
				  //--- DEBUG LoggerOnly : console.log(parameters.DataCSS + ' >> ('+_file+')!');
				});				
				break;
				
			case Structures.Writers.HTML:
				break;
				
			case Structures.Writers.CSV:
				break;
				
			default:
				break;
		}
	}
};
 
module.exports = cxFRMWRKReporter;
