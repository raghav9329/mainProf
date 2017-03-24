'use strict';


//var ddStartTest = require('./appRootPg.js');
var appRootCheck_Go = require('./appRootCheck_Go.js');

describe('start the test sequence',function(){
	
	it('begin',function(){
	
		console.log('baseUrl: ', browser.params.baseUrl);
		
		appRootCheck_Go;
		
	});
});